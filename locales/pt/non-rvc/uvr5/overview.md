---
label: "Visão geral e requisitos"
icon: ":book:"
order: 99
permalink: /non-rvc/uvr5/overview/
description: "UVR5 (Ultimate Vocal Remover v5 GUI) é uma aplicação de ambiente de trabalho gratuita e open-source para separação de áudio por IA."
---
# Ultimate Vocal Remover (UVR5)

[GitHub](https://github.com/Anjok07/ultimatevocalremovergui) · [Releases oficiais](https://github.com/Anjok07/ultimatevocalremovergui/releases) · [Patches Beta Roformer](https://github.com/TRvlvr/model_repo/releases/tag/uvr_update_patches)

!!!warning
**Próximo lançamento: o UVR6 está chegando!**
O **Ultimate Vocal Remover 6 (UVR6)** chega ao **Windows em 11 de dezembro de 2026**, seguido logo depois pelo **Mac** e depois pelo **Linux**. Como o **UVR5** será substituído em breve por essa nova geração, acompanhe a página oficial de releases perto da data de lançamento se quiser atualizar.
!!!

**UVR5** (Ultimate Vocal Remover v5 GUI) é uma aplicação de ambiente de trabalho gratuita e open-source para **separação de áudio por IA**. Corre localmente no teu PC e permite separar músicas ou diálogos em voz limpa, instrumental, coros, stems individuais (bateria, baixo, outros) e remover reverberação, eco e ruído de fundo - sendo uma das ferramentas mais populares para preparar datasets RVC e covers.

## Arquiteturas de IA suportadas

- **VR Architecture** (`v4`, `v5`, `v5.1`): modelos rápidos e fiáveis para vozes, karaoke (voz principal vs. coros), de-echo, de-reverb e remoção de ruído.
- **MDX-Net** (`v2`, `MDX23C`, além de **BS-Roformer**, **Mel-Roformer**, **SCNet** e **Bandit** nos patches beta Roformer): arquiteturas de ponta agrupadas no menu MDX-Net do UVR5.
- **Demucs** (`v1`–`v4`, como `htdemucs` e `htdemucs_ft`): modelos multi-stem da Meta (4 stems: voz, bateria, baixo, outros; ou 6 stems), ideais para isolar instrumentos ou criar ensembles.
- **Ferramentas de áudio integradas**: **Manual Ensemble** (combina saídas de vários modelos via Min/Max Spec ou Average), **Ensemble Mode**, **Vocal Splitter**, **Demudder** (patch Windows #14+) e upscaler de áudio **Apollo**.

## Requisitos do sistema e suporte a GPU

| Plataforma | Requisitos e notas de aceleração |
| --- | --- |
| **Windows 10/11 (64-bit)** | **Tem de ser instalado na unidade `C:\`** (instalar noutra unidade pode causar instabilidade). CPUs Intel Pentium e Celeron não são garantidos. |
| **GPUs NVIDIA (CUDA)** | Maxwell (série GTX 900, compute 5.0) ou superior. GTX 600 / GT 700 e anteriores não são suportadas em CUDA. **6 GB+ VRAM** (ex. RTX 3050 6–8 GB ou superior) recomendados para Roformers; 2–4 GB funcionam reduzindo `chunk_size` / `dim_t`. A série **RTX 5000** requer o patch dedicado CUDA 12.8. |
| **GPUs AMD e Intel (DirectML)** | Usa **DirectML** (chamado *OpenCL* em compilações v5.6.0 antigas). Testado em AMD RX 4 GB+ (RX 6600 XT / 7600+ recomendadas para Roformers) e Intel Arc / iGPUs Xe. **16 GB VRAM** recomendados para manter o `chunk_size` predefinido (caso contrário baixa-o). *Nota: Apollo, Bandit e SCNet correm na CPU em DirectML.* |
| **macOS** | macOS Big Sur ou mais recente (Catalina ou inferior não garantido). Aceleração Apple Silicon (**MPS**) funciona para Demucs, MDX-Net e Roformers. Coloca o UVR diretamente em `/Applications`. |
| **Linux** | Branch nativo `v5.6.0_roformer_add+directml`, ou executa o instalador Windows via **Bottles** (perfil WINE Gaming dentro de `drive_c`) para ter patches recentes com aceleração GPU. |
