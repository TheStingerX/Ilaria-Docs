---
label: "Guia e modelos recomendados"
icon: ":scissors:"
order: 97
permalink: /non-rvc/uvr5/usage-and-models/
---
# Guia do UVR5 e modelos recomendados

Usa este guia para configurar o UVR5 corretamente e escolher os melhores modelos para separar vozes, remover harmonias/coros, tirar reverberação/eco e limpar ruído (incluindo os modelos das configurações recomendadas).

## 1. Janela principal e definições principais

- **Select Input / Output**: escolhe os ficheiros de áudio e a pasta de saída. Usa **`WAV`** ao preparar datasets RVC (`Additional Settings` também permite exportação em 64-bit float).
- **GPU Conversion**: mantém **marcado** se tiveres uma GPU NVIDIA, AMD, Intel ou Apple Silicon suportada.
  - *Nota*: em GPUs GTX 10XX, se a saída sair em silêncio, deixa **Inference Mode** desligado em `Settings → Advanced MDX-Net Options → Multi-Network`. Em RTX / GTX 16 podes ativá-lo para ganhar velocidade.
- **Vocals Only / Instrumental Only**: marca um se quiseres apenas uma faixa (ex. **Instrumental Only** se precisares apenas do instrumental ou da faixa tratada consoante o modelo).
- **Segment Size** (separador `MDX-Net`, ex. **`256`**): controla o uso de memória para modelos MDX-Net padrão.
  - *Nota para Roformers*: quando **Segment Default** está ativo nas opções avançadas de MDX-Net, o UVR5 lê `chunk_size` diretamente do `.yaml` do modelo em vez da lista Segment Size.
- **Overlap** (para Roformers): **`4`** oferece o melhor equilíbrio entre velocidade e qualidade SDR; **`8`** dá um pouco mais de consistência, enquanto `16–32` abranda bastante com ganho mínimo. O valor na interface sobrepõe o do `.yaml`.
- **Definições VR Architecture**:
  - **Window Size**: `512` (mais preciso) ou `320` (mais rápido / popular em metal e ensembles).
  - **Aggression Setting**: normalmente `5`–`10` para voz/karaoke; **`3.0–5.0`** para `UVR-DeEcho-DeReverb`; valores negativos (**`-10` a `-25`**) para `UVR-DeNoise` em voz para não a afinar demais.
  - **TTA** *(Test-Time Augmentation)*: melhora a qualidade duplicando cerca de 2× o tempo.

## 2. Modelos recomendados por tarefa

### Modelos MDX-Net e BS-Roformer

| Modelo | Função | Notas |
| --- | --- | --- |
| **`BS-Roformer-Viperx-1297`** | **Separação principal Voz / Instrumental** | Modelo BS-Roformer clássico de topo. Excelente para extrair instrumentais e vozes limpas e base comum em ensembles (`1296 + 1297 + MDX23C HQ`). |
| **`UVR-MDX-NET Inst HQ 4`** | **Separação limpa Instrumental / Voz** | Modelo MDX-Net v2 muito rápido e limpo. Frequentemente combinado em ensembles com `1_HP-UVR` ou modelos BS-Roformer. |
| **`dereverb_bs_roformer_anvuew_sdr_22.5050.ckpt`** | **De-Reverb (Roformer)** | Modelo BS-Roformer moderno de anvuew (treinado em VSTs e presets Waves IR1). Soa mais limpo na reverberação vocal do que modelos mono antigos. |

### Modelos VR Architecture

| Modelo | Função | Notas |
| --- | --- | --- |
| **`1_HP-UVR`** | **Separação Voz / Instrumental** | Modelo VR high-pass clássico. Útil sozinho ou em ensembles (especialmente em faixas densas/rock/metal) com modelos MDX-Net. |
| **`5_HP-Karaoke-UVR`** | **Voz principal vs. Coros** | Separa a voz principal dos coros/harmonias. Funciona melhor sobre **vozes já isoladas** (ou via *Settings → Vocal Splitter Options*). |
| **`UVR-De-Echo-Normal`** | **De-Echo suave** | Remove delay e eco ligeiro preservando melhor o timbre; pode ser usado após ou junto a DeReverb. |
| **`UVR-DeEcho-DeReverb`** | **De-Echo + De-Reverb forte** | Remove eco e reverberação mono/estéreo quando outros modelos falham. Mantém **Aggression** por volta de **`3.0–5.0`** (teto de frequência ~17.5 kHz). |
| **`UVR-DeNoise`** | **De-Noise intenso** | Denoiser da FoxJoy para chiado, ruído branco e artefactos. Em vozes isoladas experimenta **agressividade negativa (`-10` a `-25`)** para não adelgaçar a voz. |
| **`UVR-DeNoise-Lite`** | **De-Noise ligeiro** | Menos agressivo que `UVR-DeNoise` (corte a `20 kHz`) e mais seguro para harmónicos; agressividade recomendada por volta de `4`. |

### Modelos Demucs

| Modelo | Função | Notas |
| --- | --- | --- |
| **`v4 \| htdemucs`** *(e `htdemucs_ft`)* | **Separação em 4 stems** | Divide faixas em **Vocals, Drums, Bass e Other**. Ótimo para extrair bateria/baixo ou limpar fugas em ensembles multi-stem. |

## 3. Fluxo recomendado para limpar datasets RVC

1. **Passo 1 - Isolar a voz**: passa a faixa em **`BS-Roformer-Viperx-1297`** (separador MDX-Net, GPU Conversion ativo).
2. **Passo 2 - Remover harmonias / coros** *(se existirem)*: passa a faixa vocal isolada em **`5_HP-Karaoke-UVR`** (separador VR Architecture).
3. **Passo 3 - Remover reverberação e eco**: aplica **`dereverb_bs_roformer_anvuew_sdr_22.5050.ckpt`** (ou **`UVR-DeEcho-DeReverb`** em Aggression `3–5` / **`UVR-De-Echo-Normal`**).
4. **Passo 4 - De-Noise final** *(apenas se sobrar chiado ou artefactos)*: usa **`UVR-DeNoise`** (com agressividade baixa ou negativa em voz) ou **`UVR-DeNoise-Lite`**. Ouve sempre com auscultadores comparando com o passo anterior para não cortar consoantes.

## 4. Resolução de problemas comuns

- **Erro de memória (`RuntimeError`) ou bloqueio nos 5% em DirectML (AMD/Intel)**:
  - Abre **Choose MDX-Net Model → Edit Model Config** (ou edita o `.yaml` em `models\MDX_Net_Models\model_data\mdx_c_configs\`) e reduz `chunk_size` (confirma que **Segment Default** está ativo nas opções MDX avançadas):
    - `352800` (8s) - predefinição da maioria dos modelos; máximo para GPUs AMD/Intel de 8 GB.
    - `220500` (5s) ou `200655` (4,5s) - seguro para placas de 4–6 GB VRAM.
    - `112455` (2,55s) - mínimo seguro se os erros persistirem.
  - Em NVIDIA de 2–4 GB VRAM, define **CUDA Sysmem Fallback Policy** para **Prefer Sysmem Fallback** no Painel de Controlo NVIDIA.
- **Roformer não aparece em Ensemble / Vocal Splitter**: abre o `.yaml` e renomeia os stems de `other` / `vocals` / `Karaoke` para **`Instrumental`** e **`Vocals`** (respeitando maiúsculas).
- **O PC bloqueia durante a separação**: define a prioridade do UVR para **Baixa (Idle)** no Gestor de Tarefas do Windows.
