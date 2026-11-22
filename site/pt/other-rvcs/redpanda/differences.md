# Redpanda-vc vs Outras Versões RVC - Comparação Completa de Recursos

[Configurar Redpanda-vc](first-run.md) · [Treinar modelos RVC (EMA e Steps)](training.md) · [Testar áudio ao vivo](live-audio.md)

Este guia compara o **Redpanda-vc** diretamente com **RVC Mainline**, **Applio** e **Ilaria RVC** com base na análise estática do código-fonte dos respectivos branches `main`.

---

## O que torna o Redpanda-vc diferente?

- **RVC:** Família de arquiteturas de conversão de voz.
- **RVC Mainline:** Implementação de referência original (`RVC-Project/Retrieval-based-Voice-Conversion-WebUI`).
- **Applio:** Aplicação que expande WebUI, vocoders, TTS e ferramentas em torno do RVC.
- **Redpanda-vc:** Fork do **Applio** (`redpanda343/Redpanda-vc`) que adiciona Generator EMA, salvamento por passos no RVC, **Rectified Flow**, **Beatrice 2** e **treino dedicado de vocoders**.
- **Ilaria RVC:** Implementação personalizada baseada no RVC Mainline (`TheStingerX/Ilaria-RVC`) com `Training Target: Steps`, RefineGAN/MRF HiFi-GAN na UI, Audio Analyzer, Voice Blender e TTS.

---

## Visão geral comparativa

| Recurso | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **RVC V1** | **Yes** | **V1 inference supported; current training UI focuses on V2** | **Yes** | **Yes** |
| **RVC V2** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Épocas vs. Steps** | Épocas | Épocas | Meta e salvamento por steps (`Total Steps` / `Save Every X Steps`) | Épocas ou `Training Target: Steps` *(saves seguem `save_every_epoch`)* |
| **Generator EMA** | **No - verified** | **No - verified** | **Yes** (`GeneratorEMA`) | **No - verified** |
| **Rectified Flow / Beatrice 2 / Vocoder** | **No - verified** | **No - verified** | **Yes** | **No - verified** *(Beatrice apenas extrator F0)* |
| **HiFi-GAN / RefineGAN** | HiFi-GAN | **Yes** | **Yes** | **Yes** *(RefineGAN 32 kHz)* |
| **MRF HiFi-GAN** | **No - verified** | **Supported in code / CLI; not selectable in the standard training WebUI** | **Supported in code / CLI; not selectable in the standard training WebUI** | **Yes** *(selecionável na WebUI, v2 f0)* |
| **LR Warmup & Cosine** | **No - verified** | **No - verified** | **Yes** (`Warmup Steps`, `Exponential` / `Cosine`) | **No - verified** |
| **Text-to-Speech (TTS)** | **No - verified** *(requer TTS externo)* | **Yes** *(`tabs/tts/` + CLI)* | **No - verified** *(sem aba `tts` em `tabs/`)* | **Yes** *(Kokoro, ElevenLabs, Windows TTS + RVC)* |
| **Tempo real** | **Yes** (`realtime_gui.py`) | **Yes** (`tabs/realtime`) | **Yes** (Desktop Windows + WebSocket/HTTP + multi-GPU) | **No - verified** *(apenas offline/lote)* |
| **Monitoramento** | TensorBoard | TensorBoard | TensorBoard | TensorBoard + Audio Analyzer + Training Previews |

### Plataformas e Backends

| Plataforma / Backend | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **Launchers Windows** | `go-webui.bat`, `go-realtime_gui.bat` | `run-install.bat`, `run-applio.bat`, `run-tensorboard.bat`, `run-updater.bat` | `run-install.bat`, `run-applio.bat`, `run-tensorboard.bat`, `run-realtime-gui.bat` | `RUN_ILARIA_RVC.bat`, `RUN_ILARIA_RVC_LOGS.bat` |
| **Launchers Linux / macOS** | Execução manual Python | `run-install.sh`, `run-applio.sh`, `run-tensorboard.sh` | `run-install.sh`, `run-applio.sh` *(sem `.sh` para `realtime_gui.py`)* | Execução manual Python |
| **Backends no código** | CUDA / MPS / CPU | CUDA / MPS / CPU | CUDA / MPS / CPU *(Beatrice em CPU)* | CUDA / DirectML (AMD & Intel) / CPU |

---

## Compatibilidade de Modelos

| Tipo de modelo | Redpanda-vc | RVC Mainline | Applio | Ilaria RVC | Outros Clientes Compatíveis |
| --- | --- | --- | --- | --- | --- |
| **RVC V1 / V2 HiFi-GAN (`.pth`)** | **Yes** | **Yes** | **Yes** *(inferência V1; UI treino V2)* | **Yes** | **Supported by clients implementing this architecture** |
| **RVC V2 RefineGAN / MRF** | **Yes** *(MRF: inferência + CLI)* | **No - verified** | **Yes** *(MRF: inferência + CLI)* | **Yes** *(UI + inferência)* | **Requires compatible decoder** (**Version-dependent**) |
| **Rectified Flow (`.pth`)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **Requires compatible decoder** |
| **Beatrice 2 (pasta)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **Version-dependent** *(clientes/VST Beatrice)* |
| **Checkpoints (`G_*`/`D_*`) & `.index`** | **Yes** *(RVC)* | **Yes** | **Yes** | **Yes** | **`.index` em clientes RVC / `G_*` não** |

---

## Qual escolher? e Fontes

Escolha **RVC Mainline** pela referência original, **Applio** pelo fluxo por épocas com **TTS** integrado, **Redpanda-vc** por EMA, salvamento por passos, Rectified Flow, Beatrice 2, treino de vocoder ou WebSocket/multi-GPU ao vivo (sem aba `tts`), e **Ilaria RVC** para estúdio offline com `Training Target: Steps`, `MRF HiFi-GAN` / `RefineGAN` na WebUI, **TTS** integrado, `Audio Analyzer` e `Voice Blender`.

Verificado nos branches `main` em **2026-11-22**: [Redpanda-vc](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80) (`55a3a80`) · [Applio](https://github.com/IAHispano/Applio/tree/445b0f6) (`445b0f6`) · [RVC Mainline](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/tree/81eed5e) (`81eed5e`) · [Ilaria RVC](https://github.com/TheStingerX/Ilaria-RVC/tree/a887ba5) (`a887ba5`).
