---
label: "Redpanda-vc vs altre versioni RVC"
icon: ":scales:"
order: 96
permalink: /ilaria-rvc/redpanda/comparison/
description: "Confronto verificato sul codice tra Redpanda-vc, RVC Mainline, Applio e Ilaria RVC: Generator EMA, checkpoint per step, Rectified Flow, Beatrice 2, training vocoder, TTS, realtime e compatibilità."
---
# Redpanda-vc vs Altre Versioni RVC - Confronto Completo delle Funzionalità

[Configurare Redpanda-vc](first-run.md) · [Addestrare modelli RVC (EMA e Step)](training.md) · [Testare l'audio dal vivo](live-audio.md)

Questa guida confronta **Redpanda-vc** direttamente con **RVC Mainline**, **Applio** e **Ilaria RVC** mediante analisi statica del codice sorgente sui rispettivi branch `main` (senza eseguire benchmark audio dal vivo o test hardware multi-OS).

---

## Cosa rende diverso Redpanda-vc?

Per chi si avvicina per la prima volta alla conversione vocale AI, questi programmi **non** sono versioni successive dello stesso software, ma progetti correlati con obiettivi diversi:

- **RVC:** Una famiglia di tecniche e modelli per la conversione vocale (Retrieval-based Voice Conversion).
- **RVC Mainline:** L'implementazione originale di riferimento (`RVC-Project/Retrieval-based-Voice-Conversion-WebUI`).
- **Applio:** Un'applicazione molto diffusa che amplia interfaccia WebUI, vocoder, TTS e strumenti attorno a RVC.
- **Redpanda-vc:** Un fork di **Applio** (`redpanda343/Redpanda-vc`) che aggiunge Generator EMA, salvataggio dei checkpoint per step in RVC, training/inference **Rectified Flow**, training/realtime **Beatrice 2** e **training dedicato dei vocoder**.
- **Ilaria RVC:** Un'implementazione personalizzata basata su RVC Mainline (`TheStingerX/Ilaria-RVC`) con propria pipeline di inferenza, `Training Target: Steps`, supporto RefineGAN/MRF HiFi-GAN nella UI, Audio Analyzer, Voice Blender e strumenti TTS.

Un fork **non** è automaticamente migliore dell'originale sotto ogni aspetto: ciascun progetto bilancia diversamente semplicità, stabilità, compatibilità dei modelli e architetture extra.

*(Termini rapidi per principianti: **Inference** significa convertire audio con un modello già allenato; **CLI** significa eseguire comandi da terminale anziché usare i pulsanti della **WebUI**; un **vocoder** trasforma le feature acustiche in forma d'onda audio; un **decoder** è la parte del programma che sa leggere una specifica architettura.)*

---

## Panoramica delle differenze principali

Le etichette nella tabella riflettono l'analisi statica dei branch `main` (commit indicati in [Fonti e riferimenti tecnici](#fonti-e-riferimenti-tecnici)):

| Funzionalità | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **RVC V1** | **Yes** | **V1 inference supported; current training UI focuses on V2** | **Yes** | **Yes** |
| **RVC V2** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Training RVC** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Training basato su epoche** | **Yes** | **Yes** | **Different implementation** *(obiettivo in step)* | **Yes** |
| **Training con obiettivo in step** | **No - verified** | **No - verified** | **Yes** (`Total Steps`) | **Yes** (`Training Target: Steps`) |
| **Checkpoint a intervalli di epoche** | **Yes** | **Yes** (`save_every_epoch`) | **No - verified** *(usa intervalli di step)* | **Yes** (`save_every_epoch`) |
| **Checkpoint a intervalli di step** | **No - verified** | **No - verified** | **Yes** (`Save Every X Steps`) | **No - verified** *(salva a epoche; epoca parziale su stop/step finale)* |
| **EMA del generatore** | **No - verified** | **No - verified** | **Yes** (`GeneratorEMA`) | **No - verified** |
| **Ripresa del training (`G`/`D`)** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Esportazione `.pth` intermedi** | **Yes** | **Yes** (`save_every_weights`) | **Yes** (`Save Every Weights`) | **Yes** *(a epoche intere `save_every_epoch`)* |
| **Training Rectified Flow** | **No - verified** | **No - verified** | **Yes** | **No - verified** |
| **Training Beatrice 2** | **No - verified** | **No - verified** | **Yes** | **No - verified** *(Beatrice è solo pitch extractor F0)* |
| **Training dedicato dei vocoder** | **No - verified** | **No - verified** | **Yes** (`tabs/train/nsf_hifigan.py`) | **No - verified** |
| **HiFi-GAN** | **Yes** | **Yes** | **Yes** | **Yes** |
| **RefineGAN** | **No - verified** | **Yes** | **Yes** | **Yes** *(32 kHz v2 f0)* |
| **MRF HiFi-GAN** | **No - verified** | **Supported in code / CLI; not selectable in the standard training WebUI** | **Supported in code / CLI; not selectable in the standard training WebUI** | **Yes** *(selezionabile nella WebUI di training, v2 f0)* |
| **Pretrained personalizzati** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Warmup del learning rate** | **No - verified** | **No - verified** *(schedule fisso)* | **Yes** (`Warmup Steps`) | **No - verified** |
| **Learning rate scheduling** | **Different implementation** *(esponenziale per epoca)* | **Different implementation** *(esponenziale per epoca)* | **Yes** (`Exponential` / `Cosine`) | **Different implementation** *(esponenziale per epoca)* |
| **Controllo del batch** | **Yes** (`batch_size`) | **Yes** (`batch_size`) | **Yes** (`Batch Size` + `Max Audio per Batch`) | **Yes** (`batch_size`) |
| **Ottimizzazione VRAM** | **Different implementation** *(FP16, GPU cache)* | **Yes** (`Checkpointing`, GPU cache) | **Yes** (`Checkpointing`, GPU cache) | **Different implementation** *(FP16/BF16, GPU cache)* |
| **Feature & Pitch extraction** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Inferenza vocale (offline)** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Text-to-Speech (TTS)** | **No - verified** *(richiede TTS esterno + RVC)* | **Yes** *(`tabs/tts/` + CLI `rvc/lib/tools/tts.py`)* | **No - verified** *(tab `tts` rimossa da `tabs/`)* | **Yes** *(Kokoro, ElevenLabs, Windows TTS + RVC)* |
| **Conversione real-time** | **Yes** | **Yes** | **Yes** | **No - verified** *(solo offline & batch)* |
| **GUI desktop realtime** | **Yes** (`realtime_gui.py`) | **Different implementation** *(WebUI / Desktop)* | **Yes** (`run-realtime-gui.bat`, launcher Windows) | **No - verified** |
| **Realtime nel browser** | **No - verified** | **Yes** (`tabs/realtime`) | **Yes** (WebSocket + fallback HTTP) | **No - verified** |
| **Multi-GPU training** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Flussi realtime multi-GPU** | **No - verified** | **Not verified** | **Yes** *(1 GPU per flusso)* | **No - verified** |
| **Supporto multi-famiglia** | **No - verified** *(solo RVC)* | **Partial** *(RVC + Applio)* | **Yes** *(RVC + Rectified Flow + Beatrice)* | **No - verified** *(solo RVC)* |
| **Monitoraggio** | TensorBoard | TensorBoard | TensorBoard | TensorBoard + Audio Analyzer + Training Previews |

### Supporto Piattaforme e Backend

La presenza di uno script `.sh` **non** dimostra che ogni funzione sia testata su Linux o macOS:

| Piattaforma / Backend | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **Launcher Windows** | `go-webui.bat`, `go-realtime_gui.bat` | `run-install.bat`, `run-applio.bat`, `run-tensorboard.bat`, `run-updater.bat` | `run-install.bat`, `run-applio.bat`, `run-tensorboard.bat`, `run-realtime-gui.bat` | `RUN_ILARIA_RVC.bat`, `RUN_ILARIA_RVC_LOGS.bat` |
| **Launcher Linux / macOS** | Avvio manuale Python | `run-install.sh`, `run-applio.sh`, `run-tensorboard.sh` | `run-install.sh`, `run-applio.sh` *(nessun `.sh` per `realtime_gui.py`)* | Avvio manuale Python *(launcher `.bat` per Windows)* |
| **Backend di calcolo nel codice** | CUDA / MPS / CPU | CUDA / MPS / CPU | CUDA / MPS / CPU *(Beatrice realtime su CPU)* | CUDA / DirectML (AMD & Intel) / CPU |
| **Stato test multi-OS** | Non testato in questo audit | Non testato in questo audit | Non testato in questo audit | Non testato in questo audit |

---

## Generator EMA, Step, Rectified Flow, Beatrice e Vocoder

- **Generator EMA (`rvc/train/train.py`):** Mantiene in memoria una media mobile esponenziale dei pesi del generatore (distinta dai momenti interni di Adam). `Generator EMA Decay` (`0`–`0.9999`, default `0.999`, step `0.0001`) smussa le oscillazioni tra step nell'export senza garantire qualità migliore, senza eliminare l'overfitting e senza velocizzare il training. Vedi [Addestrare modelli RVC in Redpanda-vc - EMA e Salvataggio per Step](training.md).
- **Training basato su step:** Redpanda-vc usa `Total Steps` (`10000`) e `Save Every X Steps` (`1000`), salvando anche a metà epoca e allo step finale. Applio e RVC Mainline salvano per epoche; **Ilaria RVC** supporta `Training Target: Steps` per fermarsi a uno step preciso, ma la frequenza di salvataggio ed export `.pth` intermedio resta basata su epoche intere (`save_every_epoch`).
- **Rectified Flow (`rectified_flow/`):** Architettura acustica ispirata a DiffSinger basata su feature ContentVec (preset `standard`, `meanflow`, `smaller`) + vocoder separato. **Non** è RVC V2 anche se usa l'estensione `.pth`.
- **Beatrice 2 (`beatrice/`):** Architettura separata per CPU (training e realtime in cartella dedicata), distinta dall'uso di Beatrice come solo pitch extractor F0.
- **Training vocoder (`tabs/train/nsf_hifigan.py`):** Allena o fa fine-tuning di `PC-NSF-HiFiGAN`, `NSF-HiFiGAN` e `Vocos` (24 kHz) abbinati alle configurazioni mel di Rectified Flow.

---

## Realtime, Controlli Avanzati e Compatibilità

In Redpanda-vc, `run-realtime-gui.bat` supporta RVC, Beatrice e Rectified Flow; la WebUI usa WebSocket binario con fallback HTTP e permette flussi concorrenti su più GPU (1 GPU per stream, senza accelerare uno stream singolo).

| Tipo di modello | Redpanda-vc | RVC Mainline | Applio | Ilaria RVC | Altri Client Compatibili |
| --- | --- | --- | --- | --- | --- |
| **RVC V1 (`.pth` inference)** | **Yes** | **Yes** | **Inferenza supportata; UI training focalizzata su V2** | **Yes** | **Supportato dai client con questa architettura** |
| **RVC V2 HiFi-GAN (`.pth`)** | **Yes** | **Yes** | **Yes** | **Yes** | **Supportato dai client con questa architettura** |
| **RVC V2 RefineGAN (`.pth`)** | **Yes** | **No - verified** | **Yes** | **Yes** *(32 kHz)* | **Richiede decoder compatibile** (**Version-dependent**) |
| **RVC V2 MRF HiFi-GAN (`.pth`)** | **Yes** *(inferenza + CLI)* | **No - verified** | **Yes** *(inferenza + CLI)* | **Yes** *(UI + inferenza)* | **Richiede decoder compatibile** (**Version-dependent**) |
| **Rectified Flow (`.pth`)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **Richiede decoder compatibile** *(non è RVC V2 standard)* |
| **Beatrice 2 (cartella)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **Version-dependent** *(solo client/VST Beatrice)* |
| **Vocoder custom (`nsf_hifigan`)** | **Yes** *(per Rectified Flow)* | **No - verified** | **No - verified** | **No - verified** | **Richiede decoder compatibile** |
| **Checkpoint training (`G_*`/`D_*`)** | **Yes** *(RVC)* | **Yes** *(RVC)* | **Yes** *(RVC)* | **Yes** *(RVC)* | **No - verified** *(solo ripresa training)* |
| **File FAISS `.index`** | **Yes** *(stesso embedder/dim)* | **Yes** | **Yes** | **Yes** | **Supportato dai client RVC con retrieval** *(stesso embedder/dim)* |

---

## Quale Versione Scegliere? e FAQ

- **RVC Mainline:** Per il workflow di riferimento originale e `realtime_gui.py`.
- **Applio:** Per un ambiente RVC completo basato su epoche con **TTS** integrato.
- **Redpanda-vc:** Per **Generator EMA**, **salvataggio per step**, **Rectified Flow**, **Beatrice 2**, **training vocoder** o **realtime WebSocket / multi-stream** (nota: la tab `tts` di Applio non è presente in Redpanda-vc).
- **Ilaria RVC:** Per uno studio RVC offline con `Training Target: Steps`, `MRF HiFi-GAN` / `RefineGAN` selezionabili in WebUI, **TTS** integrato (Kokoro, ElevenLabs, Windows), `Audio Analyzer`, `Voice Blender`, `RMVPE High Register` e `Proposed Pitch`.

**FAQ:** Un fork deriva da un progetto esistente per aggiungerne altri; Redpanda-vc deriva da Applio ma aggiunge EMA, salvataggio per step, Rectified Flow, Beatrice 2 e vocoder omettendo la tab `tts`; i `.pth` RVC V1/V2 HiFi-GAN funzionano nei client che implementano quei decoder, mentre Rectified Flow, Beatrice, RefineGAN e MRF HiFi-GAN richiedono decoder specifici; `MRF HiFi-GAN` in Applio e Redpanda-vc è supportato nel codice/CLI ma non selezionabile nella normale WebUI di training.

---

## Fonti e riferimenti tecnici

Confronto statico verificato sui branch `main` il **2026-11-22**:

- **Redpanda-vc** (commit [`55a3a80`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80), 2026-10-31): [Repository](https://github.com/redpanda343/Redpanda-vc) · [`tabs/train/train.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/tabs/train/train.py) · [`tabs/train/rvc.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/tabs/train/rvc.py) · [`rvc/train/train.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/rvc/train/train.py) · [`rectified_flow/`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80/rectified_flow) · [`beatrice/`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80/beatrice) · [`nsf_hifigan/`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80/nsf_hifigan) · [`tabs/inference/realtime.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/tabs/inference/realtime.py) · [`realtime_gui.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/realtime_gui.py)
- **Applio** (commit [`445b0f6`](https://github.com/IAHispano/Applio/tree/445b0f6), 2026-11-19): [Repository](https://github.com/IAHispano/Applio) · [`tabs/train/train.py`](https://github.com/IAHispano/Applio/blob/445b0f6/tabs/train/train.py) · [`rvc/infer/infer.py`](https://github.com/IAHispano/Applio/blob/445b0f6/rvc/infer/infer.py) · [`core.py`](https://github.com/IAHispano/Applio/blob/445b0f6/core.py) · [`rvc/train/train.py`](https://github.com/IAHispano/Applio/blob/445b0f6/rvc/train/train.py) · [`tabs/tts/`](https://github.com/IAHispano/Applio/tree/445b0f6/tabs/tts) · [`tabs/realtime/`](https://github.com/IAHispano/Applio/tree/445b0f6/tabs/realtime)
- **RVC Mainline** (commit [`81eed5e`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/tree/81eed5e), 2026-08-04): [Repository](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [`train/train.py`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/81eed5e/train/train.py) · [`realtime_gui.py`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/81eed5e/realtime_gui.py)
- **Ilaria RVC** (commit [`a887ba5`](https://github.com/TheStingerX/Ilaria-RVC/tree/a887ba5), 2026-11-21): [Repository](https://github.com/TheStingerX/Ilaria-RVC) · [`app/ILARIA_RVC.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/a887ba5/app/ILARIA_RVC.py) · [`app/infer/modules/train/train.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/a887ba5/app/infer/modules/train/train.py) · [`app/ilaria/ilaria_tts.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/a887ba5/app/ilaria/ilaria_tts.py)
