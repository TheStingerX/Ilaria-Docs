# Redpanda-vc vs Otras Versiones RVC - Comparativa Completa de Funciones

[Configurar Redpanda-vc](first-run.md) · [Entrenar modelos RVC (EMA y Steps)](training.md) · [Probar audio en vivo](live-audio.md)

Esta guía compara **Redpanda-vc** directamente con **RVC Mainline**, **Applio** e **Ilaria RVC** mediante análisis estático del código fuente en sus ramas `main`.

---

## ¿Qué hace diferente a Redpanda-vc?

- **RVC:** Familia de arquitecturas de conversión de voz.
- **RVC Mainline:** Implementación de referencia original (`RVC-Project/Retrieval-based-Voice-Conversion-WebUI`).
- **Applio:** Aplicación que amplía WebUI, vocoders, TTS y herramientas de RVC.
- **Redpanda-vc:** Fork de **Applio** (`redpanda343/Redpanda-vc`) que añade Generator EMA, guardado por pasos en RVC, **Rectified Flow**, **Beatrice 2** y **entrenamiento dedicado de vocoders**.
- **Ilaria RVC:** Implementación personalizada basada en RVC Mainline (`TheStingerX/Ilaria-RVC`) con `Training Target: Steps`, RefineGAN/MRF HiFi-GAN en UI, Audio Analyzer, Voice Blender y TTS.

---

## Comparativa general de funciones

| Función | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **RVC V1** | **Yes** | **V1 inference supported; current training UI focuses on V2** | **Yes** | **Yes** |
| **RVC V2** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Entrenamiento por épocas / pasos** | Épocas | Épocas | Objetivo y guardado por pasos (`Total Steps` / `Save Every X Steps`) | Épocas o `Training Target: Steps` *(guardado por `save_every_epoch`)* |
| **Generator EMA** | **No - verified** | **No - verified** | **Yes** (`GeneratorEMA`) | **No - verified** |
| **Rectified Flow / Beatrice 2 / Vocoder** | **No - verified** | **No - verified** | **Yes** | **No - verified** *(Beatrice solo extractor F0)* |
| **HiFi-GAN / RefineGAN** | Solo HiFi-GAN | **Yes** | **Yes** | **Yes** *(RefineGAN 32 kHz)* |
| **MRF HiFi-GAN** | **No - verified** | **Supported in code / CLI; not selectable in the standard training WebUI** | **Supported in code / CLI; not selectable in the standard training WebUI** | **Yes** *(seleccionable en WebUI, v2 f0)* |
| **LR Warmup & Cosine Schedule** | **No - verified** | **No - verified** | **Yes** (`Warmup Steps`, `Exponential` / `Cosine`) | **No - verified** |
| **Text-to-Speech (TTS)** | **No - verified** *(requiere TTS externo)* | **Yes** *(`tabs/tts/` + CLI)* | **No - verified** *(sin pestaña `tts` en `tabs/`)* | **Yes** *(Kokoro, ElevenLabs, Windows TTS + RVC)* |
| **Conversión en tiempo real** | **Yes** (`realtime_gui.py`) | **Yes** (`tabs/realtime`) | **Yes** (Desktop Windows + WebSocket/HTTP + multi-GPU) | **No - verified** *(solo offline y lotes)* |
| **Monitorización** | TensorBoard | TensorBoard | TensorBoard | TensorBoard + Audio Analyzer + Training Previews |

### Soporte de Plataformas y Backends

| Plataforma / Backend | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **Launchers Windows** | `go-webui.bat`, `go-realtime_gui.bat` | `run-install.bat`, `run-applio.bat`, `run-tensorboard.bat`, `run-updater.bat` | `run-install.bat`, `run-applio.bat`, `run-tensorboard.bat`, `run-realtime-gui.bat` | `RUN_ILARIA_RVC.bat`, `RUN_ILARIA_RVC_LOGS.bat` |
| **Launchers Linux / macOS** | Inicio manual Python | `run-install.sh`, `run-applio.sh`, `run-tensorboard.sh` | `run-install.sh`, `run-applio.sh` *(sin `.sh` para `realtime_gui.py`)* | Inicio manual Python |
| **Backends en código** | CUDA / MPS / CPU | CUDA / MPS / CPU | CUDA / MPS / CPU *(Beatrice en CPU)* | CUDA / DirectML (AMD/Intel) / CPU |

---

## Compatibilidad de Modelos

| Tipo de modelo | Redpanda-vc | RVC Mainline | Applio | Ilaria RVC | Otros Clientes Compatibles |
| --- | --- | --- | --- | --- | --- |
| **RVC V1 / V2 HiFi-GAN (`.pth`)** | **Yes** | **Yes** | **Yes** *(inferencia V1; UI entrenamiento V2)* | **Yes** | **Supported by clients implementing this architecture** |
| **RVC V2 RefineGAN / MRF (`.pth`)** | **Yes** *(MRF: inferencia + CLI)* | **No - verified** | **Yes** *(MRF: inferencia + CLI)* | **Yes** *(UI + inferencia)* | **Requires compatible decoder** (**Version-dependent**) |
| **Rectified Flow (`.pth`)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **Requires compatible decoder** |
| **Beatrice 2 (carpeta)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **Version-dependent** *(clientes/VST Beatrice)* |
| **Checkpoints (`G_*`/`D_*`) & `.index`** | **Yes** *(RVC)* | **Yes** | **Yes** | **Yes** | **`.index` en clientes RVC / `G_*` no** |

---

## ¿Qué versión elegir? y Fuentes

- **RVC Mainline:** Referencia original y `realtime_gui.py`.
- **Applio:** Entorno por épocas con **TTS** integrado.
- **Redpanda-vc:** Para **Generator EMA**, **guardado por pasos**, **Rectified Flow**, **Beatrice 2**, **vocoders** o **realtime WebSocket / multi-GPU** (sin pestaña `tts`).
- **Ilaria RVC:** Estudio RVC offline con `Training Target: Steps`, `MRF HiFi-GAN` / `RefineGAN` en WebUI, **TTS** integrado, `Audio Analyzer`, `Voice Blender`, `RMVPE High Register` y `Proposed Pitch`.

Verificado en ramas `main` el **2026-11-22**:
- **Redpanda-vc** ([`55a3a80`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80), 2026-10-31) · **Applio** ([`445b0f6`](https://github.com/IAHispano/Applio/tree/445b0f6), 2026-11-19) · **RVC Mainline** ([`81eed5e`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/tree/81eed5e), 2026-08-04) · **Ilaria RVC** ([`a887ba5`](https://github.com/TheStingerX/Ilaria-RVC/tree/a887ba5), 2026-11-21).
