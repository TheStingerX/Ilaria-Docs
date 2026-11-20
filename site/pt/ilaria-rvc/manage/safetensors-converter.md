# Conversor Safetensors ↔ PTH (`Convert model weights`)

[Descarregar o Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

A partir do **Ilaria RVC 2.4.5**, a aba **Other** traz **Convert model weights**, um conversor integrado para transformar modelos de voz `.pth` em `.safetensors` e arquivos `.safetensors` de volta em `.pth`.

---

## 1. O que são `.pth` e `.safetensors`? (Em palavras simples)

Ao baixar modelos de voz por IA, você geralmente encontra arquivos `.pth` e às vezes `.safetensors`:

- **`.pth` (formato PyTorch):** O formato clássico do RVC. Guarda os pesos da rede neural **mais** a configuração da voz RVC (sample rate, pitch guidance, versão RVC, embedder). Porém usa o formato `pickle` do Python, por isso versões novas do PyTorch (`2.6+`) restringem o carregamento por segurança.
- **`.safetensors` (formato SafeTensors):** Um formato moderno criado pelo Hugging Face que salva os pesos **sem código executável**. É muito mais seguro para compartilhar e baixar.

**Por que converter entre eles?**
- Converta **`.pth` → `.safetensors`** para arquivar ou compartilhar seu modelo com mais segurança mantendo as configurações RVC intactas.
- Converta **`.safetensors` → `.pth`** quando baixar um modelo em `.safetensors` e precisar de um `.pth` para usar na **Inferência** do Ilaria RVC ou de outro app RVC.

---

## 2. Como funciona o conversor do Ilaria RVC

Em **Other → Convert model weights**, o Ilaria RVC faz a conversão com segurança na **CPU** (sem precisar de GPU/VRAM):

- **Instalação automática inicial:** Se `safetensors` ainda não estiver instalado, o Ilaria RVC baixa e instala `safetensors==0.8.0` em `assets/weight_converter/dependencies` no primeiro uso (precisa de internet apenas na primeira vez).
- **Preservação de metadados RVC:** Ao converter um `.pth` exportado do RVC para `.safetensors`, as configurações da voz são guardadas na tag `ilaria_rvc_checkpoint`. Ao converter de volta para `.pth`, tudo é restaurado automaticamente para funcionar na Inferência.
- **Arquivos só de tensores:** Se o `.safetensors` veio de outro programa sem metadados RVC, ele gera um `.pth` apenas de pesos, sem os dados necessários para Inferência automática nem **Move .pth to models**.
- **Checkpoints de treino bloqueados:** Checkpoints brutos (`G_*.pth` ou `D_*.pth` de `logs/`) não podem ser convertidos aqui. Exporte seu modelo final antes.

---

## 3. Passo a passo: converter `.pth` ↔ `.safetensors`

1. Abra a aba **Other** e expanda **Convert model weights**.
2. Arraste ou selecione seu arquivo `.pth` ou `.safetensors` em **Choose or drop a .pth or .safetensors file**.
3. Clique em **Convert weights**.
4. Acompanhe **Conversion Log** (`5% | Preparing Safetensors...` → `10% | Reading weights on CPU...` → concluído).
5. Baixe o arquivo convertido em **Download converted weights**.

### Usar **Move .pth to models** (`.safetensors` → `.pth`)
Depois de converter uma voz `.safetensors` (com metadados RVC) em `.pth`:
1. Clique em **Move .pth to models**.
2. O Ilaria RVC confirma que o `.pth` possui os dados completos de voz (`config`, `weight`, `emb_g.weight`) e o move direto para `models/`.
3. Vá em **Inference**, clique em **Refresh** e a voz estará pronta.

!!!tip
**Ele sobrescreve um modelo existente?**
Não. Se já existir um `.pth` com o mesmo nome em `models/`, **Move .pth to models** cancela por segurança e avisa você.
!!!

---

## 4. Mensagens comuns e solução de problemas

| Mensagem em Conversion Log | O que significa | Como resolver |
| --- | --- | --- |
| `Could not download Safetensors. Check your internet connection and retry.` | A instalação inicial do `safetensors` falhou por estar offline ou bloqueado por VPN/firewall. | Conecte à internet (ou pause VPN/firewall restritivo) e clique em **Convert weights** uma vez. Depois funciona offline. |
| `This checkpoint contains training state or unsupported metadata. Export a voice model first.` | Você enviou um checkpoint bruto `G_*.pth` ou `D_*.pth` em vez de um modelo exportado. | Use primeiro a ferramenta **Export** do experimento e depois converta o `.pth` exportado. |
| `This .pth contains only weights or is missing required RVC data.` | Você clicou em **Move .pth to models** em um `.pth` só de pesos (sem metadados RVC). | Apenas arquivos `.pth` RVC completos com configuração vocal podem ir direto para `models/`. |
| `A model named ... already exists.` | Já existe um `.pth` com esse mesmo nome em `models/`. | Renomeie o arquivo ou mova/faça backup do antigo em `models/`. |
