---
label: "Redpanda-vc vs andere RVC-Versionen"
icon: ":scales:"
order: 96
permalink: /ilaria-rvc/redpanda/comparison/
description: "Code-verifizierter Vergleich von Redpanda-vc mit RVC Mainline, Applio und Ilaria RVC: Generator EMA, schrittbasiertes Speichern, Rectified Flow, Beatrice 2, Vocoder-Training, Echtzeit und Kompatibilität."
---
# Redpanda-vc vs Andere RVC-Versionen - Vollständiger Funktionsvergleich

[Redpanda-vc einrichten](first-run.md) · [RVC-Modelle trainieren (EMA & Steps)](training.md) · [Live-Audio testen](live-audio.md)

Diese Anleitung vergleicht **Redpanda-vc** direkt mit **RVC Mainline**, **Applio** und **Ilaria RVC** anhand der jeweiligen `main`-Branches.

---

## Was macht Redpanda-vc anders?

- **RVC:** Eine Familie von Stimmkonvertierungs-Architekturen.
- **RVC Mainline:** Die ursprüngliche Referenz-Implementierung (`RVC-Project/Retrieval-based-Voice-Conversion-WebUI`).
- **Applio:** Eine weit verbreitete RVC-Anwendung mit erweiterter WebUI und Werkzeugen.
- **Redpanda-vc:** Ein Fork von **Applio** (`redpanda343/Redpanda-vc`), der Generator EMA, schrittbasiertes RVC-Speichern, **Rectified Flow**, **Beatrice 2** und **dediziertes Vocoder-Training** ergänzt.
- **Ilaria RVC:** Eine eigene Implementierung auf Basis von RVC Mainline (`TheStingerX/Ilaria-RVC`) mit `Training Target: Steps`, RefineGAN/MRF HiFi-GAN, Audio Analyzer, Voice Blender und TTS.

---

## Funktionsvergleich im Überblick

| Funktion | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **RVC V1 / V2** | **Yes** | **Yes** *(UI-Fokus `RVC (V2)` & `Applio`)* | **Yes** | **Yes** |
| **Epochenbasiertes Training** | **Yes** | **Yes** | **Different implementation** *(Step-Ziel)* | **Yes** |
| **Step-Ziel-Training** | **No - verified** | **No - verified** | **Yes** (`Total Steps`) | **Yes** (`Training Target: Steps`) |
| **Checkpoints nach Epochen** | **Yes** | **Yes** (`save_every_epoch`) | **No - verified** | **Yes** (`save_every_epoch`) |
| **Checkpoints nach Steps** | **No - verified** | **No - verified** | **Yes** (`Save Every X Steps`) | **No - verified** *(Epochen-Intervall; Partial-Epoch am Stopp/Ende)* |
| **Generator EMA** | **No - verified** | **No - verified** | **Yes** (`GeneratorEMA`) | **No - verified** |
| **Rectified Flow / Beatrice 2 / Vocoder-Training** | **No - verified** | **No - verified** | **Yes** | **No - verified** *(Beatrice nur als F0-Extraktor)* |
| **HiFi-GAN / RefineGAN / MRF** | HiFi-GAN | **Yes** (alle 3) | **Yes** (alle 3) | **Yes** (RefineGAN 32 kHz) |
| **LR Warmup & Cosine Schedule** | **No - verified** | **No - verified** | **Yes** (`Warmup Steps`, `Exponential` / `Cosine`) | **No - verified** |
| **Echtzeit (Realtime)** | **Yes** (`realtime_gui.py`) | **Yes** (`tabs/realtime`) | **Yes** (Desktop + WebSocket/HTTP + Multi-GPU-Streams) | **No - verified** *(nur Offline/Batch)* |

---

## Wichtige Unterschiede & Kompatibilität

- **Generator EMA (`rvc/train/train.py`):** Laufender Durchschnitt der Generator-Gewichte (`Generator EMA Decay` `0`–`0.9999`, Standard `0.999`), in keinem der anderen drei Projekte vorhanden. Siehe [RVC-Modelle in Redpanda-vc trainieren](training.md).
- **Steps vs. Epochen:** Redpanda-vc speichert alle `Save Every X Steps` (`1000`). **Ilaria RVC** kennt `Training Target: Steps`, speichert reguläre Zwischen-`.pth`-Exporte aber weiterhin nur an vollen `save_every_epoch`-Grenzen.
- **Rectified Flow, Beatrice 2 & Vocoder:** Rectified Flow nutzt ein DiffSinger-ähnliches Akustikmodell mit ContentVec-Merkmalen (`standard`, `meanflow`, `smaller`) und separatem Vocoder (`PC-NSF-HiFiGAN`, `NSF-HiFiGAN`, `Vocos`) - **kein** RVC V2 trotz `.pth`-Endung. Beatrice 2 ist eine eigene CPU-Architektur.
- **Multi-GPU-Echtzeit:** Ermöglicht parallele Streams auf getrennten GPUs, beschleunigt aber keinen einzelnen Stream.

| Modelltyp | Redpanda-vc | RVC Mainline | Applio | Ilaria RVC | Andere Clients |
| --- | --- | --- | --- | --- | --- |
| **RVC V1 / V2 HiFi-GAN (`.pth`)** | **Yes** | **Yes** | **Yes** | **Yes** | **Yes** |
| **RVC V2 RefineGAN / MRF** | **Yes** | **No - verified** | **Yes** | **Yes** | **No - verified** |
| **Rectified Flow (`.pth`)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **No - verified** |
| **Beatrice 2 (Ordner)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **Version-dependent** *(Beatrice-Clients/VST)* |

---

## Welche Version wählen? & Quellen

Wähle **RVC Mainline** für die Original-Referenz, **Applio** für das klassische Epochen-Workflow-Paket, **Redpanda-vc** für EMA, Step-Saves, Rectified Flow, Beatrice 2, Vocoder-Training oder WebSocket/Multi-Stream-Echtzeit, und **Ilaria RVC** für Offline-Studio-Workflows mit `Training Target: Steps`, `Audio Analyzer` und `Voice Blender`.

Geprüft auf `main` am **2026-11-22**: [Redpanda-vc](https://github.com/redpanda343/Redpanda-vc) (`55a3a80`) · [Applio](https://github.com/IAHispano/Applio) (`445b0f6`) · [RVC Mainline](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) (`81eed5e`) · [Ilaria RVC](https://github.com/TheStingerX/Ilaria-RVC) (`a887ba5`).
