# Precisão no Treino e na Inferência (`FP16`, `FP32`, `BF16`)

Ao treinar ou converter vozes no RVC, você verá frequentemente uma opção chamada **Precision** (com escolhas como `FP32`, `FP16` e `BF16`).

Para quem está começando, essas siglas parecem técnicas, mas a ideia por trás delas é bem simples. Este guia explica o que cada modo faz, qual combina com a sua placa de vídeo e como evitar os erros mais comuns.

---

## 1. O que é "Precisão" em palavras simples?

Um modelo de voz por IA é feito de milhões de números decimais (chamados de **pesos**). Toda vez que o RVC treina ou converte sua voz, a placa de vídeo multiplica milhões desses números por segundo.

A **Precisão** apenas define **o quanto cada número é detalhado** (quantos bits de memória cada número usa):

- **`FP32` (Precisão Total, 32 bits):** Mantém todo o detalhe decimal e um intervalo enorme de números. É o modo mais seguro e compatível, **mas** gasta mais VRAM e roda mais devagar.
- **`FP16` (Meia Precisão, 16 bits):** Usa metade da memória do `FP32` e roda muito mais rápido em GPUs NVIDIA modernas. Como o intervalo de números é menor, picos muito altos durante o treino podem transbordar (`NaN loss`). Também não funciona bem em placas antigas (GTX 10), DirectML (AMD/Intel) ou CPU.
- **`BF16` (Brain Float 16, 16 bits):** Usa a **mesma pouca memória do `FP16`**, **mas** mantém o enorme intervalo seguro do `FP32` (abrindo mão apenas de alguns dígitos decimais mínimos). Em resumo: `BF16` entrega velocidade e baixa VRAM como o `FP16` com quase a estabilidade do `FP32`.

!!!tip
**Regra simples:**
Pense no **`FP32`** como um caminhão forte que nunca atola, no **`FP16`** como um carro esportivo rápido que precisa de pista lisa (áudio limpo), e no **`BF16`** como um esportivo moderno com suspensão off-road (rápido, leve na VRAM e muito difícil de travar).
!!!

---

## 2. Comparação `FP32` vs `FP16` vs `BF16`

| Característica | `FP32` (Single / Full) | `FP16` (Half Precision) | `BF16` (Brain Float 16) |
| --- | --- | --- | --- |
| **Memória por número** | 32 bits (maior) | 16 bits (metade) | 16 bits (metade) |
| **Velocidade de treino** | Mais lenta | **Rápida** (em Tensor Cores) | **Rápida** (em Tensor Cores RTX 30+) |
| **Uso de VRAM** | Mais alto | **Baixo (~40-50% menos)** | **Baixo (~40-50% menos)** |
| **Risco de erro `NaN loss`** | Mínimo (quase zero) | Moderado (se o dataset estourar) | **Muito baixo** (mesmo intervalo seguro do `FP32`) |
| **Suporte de hardware** | **Tudo** (todas GPUs, DirectML, CPU) | NVIDIA GTX 16 / RTX 20+ / T4 (falha em GTX 10, DirectML, CPU) | **NVIDIA RTX 30 / 40 / 50**, A100, L4, H100 (não em RTX 20, GTX 16, T4, GTX 10) |
| **Qualidade final da voz** | Padrão de referência | Praticamente idêntica | Praticamente idêntica |

---

## 3. Qual Precisão VOCÊ deve escolher? (Por GPU)

A escolha certa depende quase totalmente de **qual placa de vídeo você tem**:

### NVIDIA RTX série 30 / 40 / 50 (e A100 / L4 / H100)
- **Melhor escolha:** **`BF16`** (se o seu app RVC oferecer, como **Ilaria RVC** ou **Applio**). Treino rápido, pouca VRAM e muito menos travamentos `NaN` que no `FP16`.
- **Alternativa:** **`FP16`** também funciona muito bem se `BF16` não aparecer no app.

### NVIDIA RTX série 20, GTX série 16 ou T4 na nuvem (Colab / Kaggle)
- **Melhor escolha:** **`FP16`**. Essas placas não têm suporte de hardware para `BF16`, então o `FP16` traz o maior ganho de velocidade e VRAM.
- **Quando mudar:** Se der `NaN loss` no treino, veja se há áudio estourado no dataset ou mude para **`FP32`**.

### NVIDIA GTX série 10 (1060, 1070, 1080 Ti) ou mais antigas
- **Melhor escolha:** **Apenas `FP32`**. A série GTX 10 (Pascal) não tem Tensor Cores rápidos para `FP16`, e forçar `FP16` costuma dar erro `HalfTensor` ou rodar até *mais devagar* que `FP32`.

### GPUs AMD / Intel (DirectML) ou apenas CPU
- **Melhor escolha:** **Apenas `FP32`**. DirectML e CPU geralmente travam em `FP16` ou `BF16` com `expected scalar type Half but found Float`.

---

## 4. Precisão de Treino vs Exportação / Inferência

Iniciantes costumam confundir a **precisão de treino** com a **precisão ao salvar/converter**:

### Durante o Treino (Mixed Precision / AMP)
- Treinadores RVC modernos usam **Automatic Mixed Precision (AMP)** quando você escolhe `FP16` ou `BF16`: os cálculos pesados na GPU rodam rápido em 16 bits, enquanto valores principais ficam protegidos em 32 bits.
- Treinar em `BF16` ou `FP16` **não** deixa a voz final pior ou robótica: modelos bem treinados em `BF16`, `FP16` e `FP32` soam praticamente iguais.

### Durante Inferência, Exportação e Voice Blender
- **Inferência / salvar `.pth` em `FP16`:** Corta o tamanho do `.pth` quase pela metade (cerca de 45-55 MB em vez de 95-110 MB) e roda mais rápido em GPUs NVIDIA CUDA sem perda audível.
- **Inferência / salvar `.pth` em `FP32`:** Gera um `.pth` maior, **mas** funciona em qualquer setup (incluindo GTX 10, DirectML e CPU).
- Você pode usar normalmente um `.pth` exportado em `FP16` em um app rodando `FP32` (ele converte automaticamente ao carregar), ou escolher `fp16`/`fp32` no [Voice Blender](../ilaria-rvc/manage/voice-blender.md).

---

## 5. Erros comuns de Precisão e como resolver

| Erro ou Sintoma | Por que aconteceu | Como resolver |
| --- | --- | --- |
| `RuntimeError: expected scalar type Half but found Float` / `HalfTensor` | `FP16` estava ligado em uma GPU ou backend incompatível (GTX 10, DirectML ou CPU). | Desative **`FP16`** nas configurações e mude para **`FP32`**. |
| `BF16 is not supported on this device` | Você escolheu `BF16` em uma GPU mais antiga (RTX 20, GTX 16, T4, GTX 10) ou CPU. | Mude para **`FP16`** (em RTX 20 / GTX 16 / T4) ou **`FP32`** (em GTX 10 / DirectML / CPU). |
| `NaN loss` ou modelo exportado mudo no treino `FP16` | Áudio estourado ou gradientes extremos transbordaram o intervalo menor do `FP16`. | Cheque o dataset com o [Dataset Checker](../ilaria-rvc/train/datasets.md) e mude para **`BF16`** (RTX 30+) ou **`FP32`** em um novo treino. |
| `CUDA out of memory` treinando em `FP32` | `FP32` usa quase o dobro de VRAM por batch comparado aos modos de 16 bits. | Diminua o **Batch Size** (ex. `4` -> `2` -> `1`) ou mude para **`BF16`** / **`FP16`** se sua GPU suportar. |
