# Redpanda-vc vs Andere RVC-Versionen - Vollständiger Funktionsvergleich

[Redpanda-vc einrichten](first-run.md) · [RVC-Modelle trainieren (EMA & Steps)](training.md) · [Live-Audio testen](live-audio.md)

Diese Anleitung vergleicht **Redpanda-vc** direkt mit **RVC Mainline**, **Applio** und **Ilaria RVC** anhand statischer Quellcode-Prüfung der jeweiligen `main`-Branches.

---

## Was macht Redpanda-vc anders?

- **RVC:** Eine Familie von Stimmkonvertierungs-Architekturen.
- **RVC Mainline:** Ursprüngliche Referenz-Implementierung (`RVC-Project/Retrieval-based-Voice-Conversion-WebUI`).
- **Applio:** RVC-Anwendung mit erweiterter WebUI, Vocodern, TTS und Tools.
- **Redpanda-vc:** Fork von **Applio** (`redpanda343/Redpanda-vc`) mit Generator EMA, schrittbasiertem RVC-Speichern, **Rectified Flow**, **Beatrice 2** und **dediziertem Vocoder-Training**.
- **Ilaria RVC:** Eigene Implementierung auf Basis von RVC Mainline (`TheStingerX/Ilaria-RVC`) mit `Training Target: Steps`, RefineGAN/MRF HiFi-GAN in der UI, Audio Analyzer, Voice Blender und TTS.

---

## Funktionsvergleich im Überblick

| Funktion | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **RVC V1** | **Yes** | **V1 inference supported; current training UI focuses on V2** | **Yes** | **Yes** |
| **RVC V2** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Epochen vs. Steps** | Epochen | Epochen | Step-Ziel & Step-Saves (`Total Steps` / `Save Every X Steps`) | Epochen oder `Training Target: Steps` *(Saves folgen `save_every_epoch`)* |
| **Generator EMA** | **No - verified** | **No - verified** | **Yes** (`GeneratorEMA`) | **No - verified** |
| **Rectified Flow / Beatrice 2 / Vocoder** | **No - verified** | **No - verified** | **Yes** | **No - verified** *(Beatrice nur F0-Extraktor)* |
| **HiFi-GAN / RefineGAN** | HiFi-GAN | **Yes** | **Yes** | **Yes** *(RefineGAN 32 kHz)* |
| **MRF HiFi-GAN** | **No - verified** | **Supported in code / CLI; not selectable in the standard training WebUI** | **Supported in code / CLI; not selectable in the standard training WebUI** | **Yes** *(in Trainings-WebUI wählbar, v2 f0)* |
| **LR Warmup & Cosine** | **No - verified** | **No - verified** | **Yes** (`Warmup Steps`, `Exponential` / `Cosine`) | **No - verified** |
| **Text-to-Speech (TTS)** | **No - verified** *(externes TTS nötig)* | **Yes** *(`tabs/tts/` + CLI)* | **No - verified** *(kein `tts`-Tab in `tabs/`)* | **Yes** *(Kokoro, ElevenLabs, Windows TTS + RVC)* |
| **Echtzeit (Realtime)** | **Yes** (`realtime_gui.py`) | **Yes** (`tabs/realtime`) | **Yes** (Windows-GUI + WebSocket/HTTP + Multi-GPU) | **No - verified** *(nur Offline/Batch)* |
| **Monitoring** | TensorBoard | TensorBoard | TensorBoard | TensorBoard + Audio Analyzer + Training Previews |

### Plattformen & Backends

| Plattform / Backend | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **Windows-Launcher** | `go-webui.bat`, `go-realtime_gui.bat` | `run-install.bat`, `run-applio.bat`, `run-tensorboard.bat`, `run-updater.bat` | `run-install.bat`, `run-applio.bat`, `run-tensorboard.bat`, `run-realtime-gui.bat` | `RUN_ILARIA_RVC.bat`, `RUN_ILARIA_RVC_LOGS.bat` |
| **Linux- / macOS-Launcher** | Manueller Python-Start | `run-install.sh`, `run-applio.sh`, `run-tensorboard.sh` | `run-install.sh`, `run-applio.sh` *(kein `.sh` für `realtime_gui.py`)* | Manueller Python-Start |
| **Backends im Code** | CUDA / MPS / CPU | CUDA / MPS / CPU | CUDA / MPS / CPU *(Beatrice auf CPU)* | CUDA / DirectML (AMD & Intel) / CPU |

---

## Modellkompatibilität

| Modelltyp | Redpanda-vc | RVC Mainline | Applio | Ilaria RVC | Andere kompatible Clients |
| --- | --- | --- | --- | --- | --- |
| **RVC V1 / V2 HiFi-GAN (`.pth`)** | **Yes** | **Yes** | **Yes** *(V1-Inferenz; Trainings-UI auf V2)* | **Yes** | **Supported by clients implementing this architecture** |
| **RVC V2 RefineGAN / MRF** | **Yes** *(MRF: Inferenz + CLI)* | **No - verified** | **Yes** *(MRF: Inferenz + CLI)* | **Yes** *(UI + Inferenz)* | **Requires compatible decoder** (**Version-dependent**) |
| **Rectified Flow (`.pth`)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **Requires compatible decoder** |
| **Beatrice 2 (Ordner)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **Version-dependent** *(Beatrice-Clients/VST)* |
| **Checkpoints (`G_*`/`D_*`) & `.index`** | **Yes** *(RVC)* | **Yes** | **Yes** | **Yes** | **`.index` in RVC-Clients / `G_*` nein** |

---

## Welche Version wählen? & Quellen

Wähle **RVC Mainline** für die Original-Referenz, **Applio** für Epochen-Workflows mit integriertem **TTS**, **Redpanda-vc** für EMA, Step-Saves, Rectified Flow, Beatrice 2, Vocoder-Training oder WebSocket/Multi-Stream-Echtzeit (ohne `tts`-Tab), und **Ilaria RVC** für Offline-Studio-Workflows mit `Training Target: Steps`, `MRF HiFi-GAN` / `RefineGAN` in der WebUI, integriertem **TTS**, `Audio Analyzer` und `Voice Blender`.

Geprüft auf `main` am **2026-11-22**: [Redpanda-vc](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80) (`55a3a80`) · [Applio](https://github.com/IAHispano/Applio/tree/445b0f6) (`445b0f6`) · [RVC Mainline](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/tree/81eed5e) (`81eed5e`) · [Ilaria RVC](https://github.com/TheStingerX/Ilaria-RVC/tree/a887ba5) (`a887ba5`).
