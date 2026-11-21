---
label: "🧠 Arquivos PTH (.pth)"
order: 88
permalink: /pth/
description: "Guia completo de arquivos .pth no RVC: modelos exportados vs checkpoints brutos G e D, tamanhos FP16 vs FP32, compatibilidade e erros comuns."
---
# Arquivos PTH do RVC (`.pth`)

Quando você baixa, treina ou compartilha uma voz RVC, o **arquivo `.pth`** é o arquivo mais importante de todos. Enquanto o [arquivo `.index`](indexes.md) é opcional, o `.pth` é **obrigatório**: sem ele, o RVC não consegue converter nenhuma voz.

Este guia explica o que há dentro de um `.pth`, a diferença fundamental entre um modelo exportado e os checkpoints brutos de treino (`G_*.pth` / `D_*.pth`), por que o tamanho muda e como corrigir erros comuns.

---

## 1. O que é um arquivo `.pth`?

Um **arquivo `.pth`** é um **checkpoint PyTorch** que guarda a rede neural treinada (o **Gerador**) responsável por sintetizar o timbre da voz alvo.

Dentro de um `.pth` RVC exportado corretamente há duas partes:
1. **Pesos do modelo (`weight`):** Milhões de valores aprendidos no treino que definem timbre, ressonância e caráter vocal.
2. **Configuração vocal (`config` e metadados):** Parâmetros salvos na exportação:
   - **Sample rate:** `32 kHz`, `40 kHz` ou `48 kHz` (`44.1 kHz` em variantes RefineGAN específicas).
   - **Arquitetura RVC:** `v1` (256-d) ou `v2` (768-d).
   - **Pitch guidance (`f0`):** Ativado (`1`) ou desativado (`0`).
   - **Vocoder:** `HiFi-GAN`, `MRF HiFi-GAN` ou `RefineGAN`.
   - **Embedder:** Por exemplo `contentvec`, `spin-v2` ou `klm-vocal-contentvec`.

---

## 2. `.pth` exportado vs Checkpoints brutos (`G_*.pth` / `D_*.pth`)

Um dos erros mais comuns de iniciantes é pegar o `.pth` errado em `logs/`:

| Tipo de arquivo | Pasta típica | Tamanho típico | Para que serve |
| --- | --- | --- | --- |
| **`.pth` vocal exportado** (ex. `MinhaVoz.pth`) | `models/` (Ilaria RVC 2.4.0+) ou `weights/` | **45 - 110 MB** (`fp16` vs `fp32`) | **Inferência e compartilhamento.** Contém apenas os pesos leves do Gerador + config vocal. |
| **Gerador (`G_*.pth`) e Discriminador (`D_*.pth`) brutos** | `logs/<nome_experimento>/` | **200+ MB cada** | **Apenas retomada de treino e pretrains.** Contêm estado completo do otimizador. **Nunca** copie para `models/` para inferência! |

Se você copiar um `G_*.pth` bruto para `models/` e tentar converter áudio, o RVC falhará com `Missing key(s) in state_dict` ou avisará que falta configuração de voz. Use sempre a ferramenta **Export** do app.

---

## 3. Tamanho (`FP16` vs `FP32`) e formatos (`.pth` vs `.safetensors` / `.onnx`)

- **Por que um `.pth` tem ~50 MB e outro ~105 MB?**
  A diferença é a **Precisão**: um `.pth` exportado em `FP16` ocupa cerca de metade de um `FP32` (veja [Precisão](precision.md)). Em GPUs NVIDIA CUDA modernas ambos soam praticamente iguais, enquanto `FP32` garante compatibilidade em GTX 10, DirectML e CPU.
- **`.pth` vs `.safetensors`:**
  `.pth` usa `pickle` do Python (por isso o PyTorch `2.6+` impõe `weights_only=True`), enquanto `.safetensors` salva tensores sem código executável. No **Ilaria RVC 2.4.5+**, converta entre `.pth` e `.safetensors` no [Conversor Safetensors ↔ PTH](../ilaria-rvc/manage/safetensors-converter.md).
- **`.pth` vs `.onnx`:**
  Treino e inferência padrão no RVC usam `.pth`. Alguns voice changers ao vivo (w-okada, Deiteris DirectML) também usam exportações `.onnx` em GPUs AMD/Intel.

---

## 4. Regras de compatibilidade

1. **Embedder correspondente:** Se um `.pth` foi treinado com `contentvec` (padrão), converta com `contentvec` (ou deixe em `Auto`). Misturar embedders distorce a pronúncia ou vaza sua voz original.
2. **Vocoder suportado:** Confirme que o app suporta o vocoder do `.pth`. Modelos com `MRF HiFi-GAN` ou `RefineGAN` exigem um app atualizado (**Ilaria RVC 2.3.0+** ou **Applio**).
3. **`UnpicklingError` no PyTorch 2.6+:** Arquivos `.pth` antigos ou apps desatualizados podem dar `Weights only load failed` (`fairseq.data.dictionary.Dictionary`). Atualizar para **Ilaria RVC 2.4.0+** ou o último **Applio** resolve.

---

## 5. Onde colocar os `.pth` e como inspecioná-los

- **Onde colocar:** No **Ilaria RVC 2.4.0+**, extraia qualquer `.zip` antes e coloque o `.pth` (junto ao `added_*.index`) na pasta raiz **`models/`** (outros apps usam `assets/weights/` ou `weights/`). Clique em **Refresh** em **Inference**.
- **Inspecionar `.pth` desconhecidos:** No Ilaria RVC abra **Other → Model information**, selecione o `.pth` e clique em **Read model information** para ver sample rate, versão RVC, vocoder, embedder e precisão.
- **Compartilhar uma voz limpa:** Use **Other → Export model ZIP** para empacotar `.pth` e `added_*.index` sem logs de treino nem gravações privadas.

---

## 6. Erros comuns com `.pth` e soluções rápidas

| Erro ou Sintoma | O que aconteceu | Como resolver |
| --- | --- | --- |
| **O modelo não aparece na lista** | Esqueceu **Refresh**, deixou o `.pth` dentro de um `.zip` ou colocou na pasta errada. | Extraia o `.zip`, coloque o `.pth` direto em `models/` (ou `weights/`) e clique em **Refresh**. |
| `EOFError` / `invalid load key` / `File is not a zip archive` | Download interrompido ou página HTML salva no lugar do arquivo. | Confira o tamanho: um `.pth` válido tem **40 - 110+ MB**, não poucos KB. Apague e baixe de novo. |
| `Missing key(s) in state_dict` / `Sizes of tensors must match` | Carregou um checkpoint bruto `G_*.pth` em vez de um `.pth` exportado. | Exporte o modelo final corretamente em vez de copiar `G_*.pth` de `logs/`. |
| `UnpicklingError` / `Weights only load failed` | PyTorch 2.6+ bloqueou objetos pickle antigos em um app RVC antigo. | Atualize para **Ilaria RVC 2.4.0+** ou o último **Applio**. |
