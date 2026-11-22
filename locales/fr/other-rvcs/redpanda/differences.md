---
label: "Redpanda-vc vs autres versions RVC"
icon: ":scales:"
order: 96
permalink: /ilaria-rvc/redpanda/comparison/
description: "Comparatif vérifié dans le code entre Redpanda-vc, RVC Mainline, Applio et Ilaria RVC : Generator EMA, sauvegarde par étapes, Rectified Flow, Beatrice 2, entraînement vocoder, TTS, temps réel et compatibilité."
---
# Redpanda-vc vs Autres Versions RVC - Comparatif Complet

[Configurer Redpanda-vc](first-run.md) · [Entraîner des modèles RVC (EMA & Steps)](training.md) · [Tester l'audio en direct](live-audio.md)

Ce guide compare **Redpanda-vc** à **RVC Mainline**, **Applio** et **Ilaria RVC** d'après l'inspection statique des branches `main`.

---

## Qu'est-ce qui distingue Redpanda-vc ?

- **RVC :** Famille d'architectures de conversion vocale.
- **RVC Mainline :** Implémentation de référence d'origine (`RVC-Project/Retrieval-based-Voice-Conversion-WebUI`).
- **Applio :** Application enrichie autour de RVC (WebUI, vocoders, TTS, outils).
- **Redpanda-vc :** Fork d'**Applio** (`redpanda343/Redpanda-vc`) ajoutant Generator EMA, sauvegarde RVC par étapes, **Rectified Flow**, **Beatrice 2** et **entraînement dédié de vocoders**.
- **Ilaria RVC :** Implémentation personnalisée basée sur RVC Mainline (`TheStingerX/Ilaria-RVC`) avec `Training Target: Steps`, RefineGAN/MRF HiFi-GAN en UI, Audio Analyzer, Voice Blender et TTS.

---

## Tableau comparatif général

| Fonctionnalité | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **RVC V1** | **Yes** | **V1 inference supported; current training UI focuses on V2** | **Yes** | **Yes** |
| **RVC V2** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Entraînement par époques / steps** | Époques | Époques | Cible et sauvegarde par steps (`Total Steps` / `Save Every X Steps`) | Époques ou `Training Target: Steps` *(sauvegarde par `save_every_epoch`)* |
| **Generator EMA** | **No - verified** | **No - verified** | **Yes** (`GeneratorEMA`) | **No - verified** |
| **Rectified Flow / Beatrice 2 / Vocoder** | **No - verified** | **No - verified** | **Yes** | **No - verified** *(Beatrice = extracteur F0 uniquement)* |
| **HiFi-GAN / RefineGAN** | HiFi-GAN | **Yes** | **Yes** | **Yes** *(RefineGAN 32 kHz)* |
| **MRF HiFi-GAN** | **No - verified** | **Supported in code / CLI; not selectable in the standard training WebUI** | **Supported in code / CLI; not selectable in the standard training WebUI** | **Yes** *(sélectionnable en WebUI, v2 f0)* |
| **LR Warmup & Cosine** | **No - verified** | **No - verified** | **Yes** (`Warmup Steps`, `Exponential` / `Cosine`) | **No - verified** |
| **Text-to-Speech (TTS)** | **No - verified** *(TTS externe requis)* | **Yes** *(`tabs/tts/` + CLI)* | **No - verified** *(onglet `tts` absent de `tabs/`)* | **Yes** *(Kokoro, ElevenLabs, Windows TTS + RVC)* |
| **Temps réel** | **Yes** (`realtime_gui.py`) | **Yes** (`tabs/realtime`) | **Yes** (Desktop Windows + WebSocket/HTTP + multi-GPU) | **No - verified** *(hors ligne uniquement)* |
| **Outils de suivi** | TensorBoard | TensorBoard | TensorBoard | TensorBoard + Audio Analyzer + Training Previews |

### Plateformes & Backends

| Plateforme / Backend | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **Lanceurs Windows** | `go-webui.bat`, `go-realtime_gui.bat` | `run-install.bat`, `run-applio.bat`, `run-tensorboard.bat`, `run-updater.bat` | `run-install.bat`, `run-applio.bat`, `run-tensorboard.bat`, `run-realtime-gui.bat` | `RUN_ILARIA_RVC.bat`, `RUN_ILARIA_RVC_LOGS.bat` |
| **Lanceurs Linux / macOS** | Lancement Python manuel | `run-install.sh`, `run-applio.sh`, `run-tensorboard.sh` | `run-install.sh`, `run-applio.sh` *(pas de `.sh` pour `realtime_gui.py`)* | Lancement Python manuel |
| **Backends dans le code** | CUDA / MPS / CPU | CUDA / MPS / CPU | CUDA / MPS / CPU *(Beatrice sur CPU)* | CUDA / DirectML (AMD & Intel) / CPU |

---

## Compatibilité des Modèles

| Type de modèle | Redpanda-vc | RVC Mainline | Applio | Ilaria RVC | Autres Clients Compatibles |
| --- | --- | --- | --- | --- | --- |
| **RVC V1 / V2 HiFi-GAN (`.pth`)** | **Yes** | **Yes** | **Yes** *(inférence V1 ; UI entraînement V2)* | **Yes** | **Supported by clients implementing this architecture** |
| **RVC V2 RefineGAN / MRF** | **Yes** *(MRF : inférence + CLI)* | **No - verified** | **Yes** *(MRF : inférence + CLI)* | **Yes** *(UI + inférence)* | **Requires compatible decoder** (**Version-dependent**) |
| **Rectified Flow (`.pth`)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **Requires compatible decoder** |
| **Beatrice 2 (dossier)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **Version-dependent** *(clients/VST Beatrice)* |
| **Checkpoints (`G_*`/`D_*`) & `.index`** | **Yes** *(RVC)* | **Yes** | **Yes** | **Yes** | **`.index` via clients RVC / `G_*` non** |

---

## Quel programme choisir ? & Sources

Choisissez **RVC Mainline** pour la référence d'origine, **Applio** pour son écosystème par époques avec **TTS**, **Redpanda-vc** pour EMA / sauvegarde par steps / Rectified Flow / Beatrice 2 / vocoders / temps réel multi-flux (sans onglet `tts`), et **Ilaria RVC** pour un studio hors ligne avec `Training Target: Steps`, `MRF HiFi-GAN` / `RefineGAN` en WebUI, **TTS**, `Audio Analyzer` et `Voice Blender`.

Vérifié sur `main` le **2026-11-22** : [Redpanda-vc](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80) (`55a3a80`) · [Applio](https://github.com/IAHispano/Applio/tree/445b0f6) (`445b0f6`) · [RVC Mainline](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/tree/81eed5e) (`81eed5e`) · [Ilaria RVC](https://github.com/TheStingerX/Ilaria-RVC/tree/a887ba5) (`a887ba5`).
