---
label: "Redpanda-vc vs other RVC versions"
icon: ":scales:"
order: 96
permalink: /ilaria-rvc/redpanda/comparison/
description: "Code-verified comparison of Redpanda-vc against RVC Mainline, Applio, and Ilaria RVC: Generator EMA, step-based checkpoints, Rectified Flow, Beatrice 2, vocoder training, TTS, realtime, and compatibility."
---
# Redpanda-vc vs Other RVC Versions - Complete Feature Comparison

[Set up Redpanda-vc](first-run.md) · [Train RVC models (EMA & Steps)](training.md) · [Test live audio](live-audio.md)

This guide compares **Redpanda-vc** directly against **RVC Mainline**, **Applio**, and **Ilaria RVC** based on static source-code inspection of each project's `main` branch (without running live audio benchmarks or cross-OS hardware tests).

---

## What Makes Redpanda-vc Different?

If you are new to AI voice conversion, it helps to know that these programs are **not** sequential versions of a single app. They are related projects with different goals:

- **RVC:** A family of voice conversion architectures and models (Retrieval-based Voice Conversion).
- **RVC Mainline:** The original reference implementation (`RVC-Project/Retrieval-based-Voice-Conversion-WebUI`).
- **Applio:** A widely used RVC application that expands the WebUI, vocoders, TTS, and tooling around RVC.
- **Redpanda-vc:** A fork of **Applio** (`redpanda343/Redpanda-vc`) that adds Generator EMA, step-based RVC checkpoint saving, **Rectified Flow** training/inference, **Beatrice 2** training/realtime, and **dedicated Vocoder training**.
- **Ilaria RVC:** A customized implementation built from RVC Mainline (`TheStingerX/Ilaria-RVC`) with its own inference pipeline, `Training Target: Steps`, RefineGAN/MRF HiFi-GAN support in the UI, Audio Analyzer, Voice Blender, and TTS tools.

A fork is **not** automatically better than the original in every area: each project trades simplicity, stability, model compatibility, and extra architectures differently.

*(Quick terms for beginners: **Inference** means converting audio using an already-trained model; **CLI** means running commands in a terminal instead of clicking buttons in the **WebUI**; a **vocoder** turns acoustic features into an audible waveform; a **decoder** is the part of a program that knows how to read a specific model architecture.)*

---

## Feature Comparison Overview

Status labels below reflect static source-code inspection of each repository's `main` branch (commits listed in [Sources and Technical References](#sources-and-technical-references)):

| Feature | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **RVC V1** | **Yes** | **V1 inference supported; current training UI focuses on V2** | **Yes** | **Yes** |
| **RVC V2** | **Yes** | **Yes** | **Yes** | **Yes** |
| **RVC training** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Epoch-based training** | **Yes** | **Yes** | **Different implementation** *(step-targeted)* | **Yes** |
| **Step-target training** | **No - verified** | **No - verified** | **Yes** (`Total Steps`) | **Yes** (`Training Target: Steps`) |
| **Epoch-interval checkpoints** | **Yes** | **Yes** (`save_every_epoch`) | **No - verified** *(uses step intervals)* | **Yes** (`save_every_epoch`) |
| **Step-interval checkpoints** | **No - verified** | **No - verified** | **Yes** (`Save Every X Steps`) | **No - verified** *(saves follow epochs; partial epoch on stop/final step)* |
| **Generator EMA** | **No - verified** | **No - verified** | **Yes** (`GeneratorEMA`) | **No - verified** |
| **Resume training (`G`/`D`)** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Intermediate `.pth` export** | **Yes** | **Yes** (`save_every_weights`) | **Yes** (`Save Every Weights`) | **Yes** *(at full `save_every_epoch` boundaries)* |
| **Rectified Flow training** | **No - verified** | **No - verified** | **Yes** | **No - verified** |
| **Beatrice 2 training** | **No - verified** | **No - verified** | **Yes** | **No - verified** *(Beatrice is F0 extractor only)* |
| **Dedicated vocoder training** | **No - verified** | **No - verified** | **Yes** (`tabs/train/nsf_hifigan.py`) | **No - verified** |
| **HiFi-GAN** | **Yes** | **Yes** | **Yes** | **Yes** |
| **RefineGAN** | **No - verified** | **Yes** | **Yes** | **Yes** *(32 kHz v2 f0)* |
| **MRF HiFi-GAN** | **No - verified** | **Supported in code / CLI; not selectable in the standard training WebUI** | **Supported in code / CLI; not selectable in the standard training WebUI** | **Yes** *(selectable in training WebUI, v2 f0)* |
| **Custom pretraineds** | **Yes** | **Yes** | **Yes** | **Yes** |
| **LR warmup** | **No - verified** | **No - verified** *(fixed schedule)* | **Yes** (`Warmup Steps`) | **No - verified** |
| **LR scheduling** | **Different implementation** *(epoch exponential)* | **Different implementation** *(epoch exponential)* | **Yes** (`Exponential` / `Cosine`) | **Different implementation** *(epoch exponential)* |
| **Batch control** | **Yes** (`batch_size`) | **Yes** (`batch_size`) | **Yes** (`Batch Size` + `Max Audio per Batch`) | **Yes** (`batch_size`) |
| **VRAM optimization** | **Different implementation** *(FP16, GPU cache)* | **Yes** (`Checkpointing`, GPU cache) | **Yes** (`Checkpointing`, GPU cache) | **Different implementation** *(FP16/BF16, GPU cache)* |
| **Feature & Pitch extraction** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Voice inference (offline)** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Text-to-Speech (TTS)** | **No - verified** *(requires external TTS + RVC)* | **Yes** *(integrated `tabs/tts/` + CLI `rvc/lib/tools/tts.py`)* | **No - verified** *(Applio `tts` tab removed from `tabs/`)* | **Yes** *(integrated Kokoro, ElevenLabs, Windows TTS + RVC)* |
| **Real-time conversion** | **Yes** | **Yes** | **Yes** | **No - verified** *(offline & batch only)* |
| **Desktop realtime GUI** | **Yes** (`realtime_gui.py`) | **WebUI realtime; separate standalone desktop GUI not verified** | **Yes** (`run-realtime-gui.bat`, Windows launcher) | **No - verified** |
| **Browser realtime** | **No - verified** | **Yes** (`tabs/realtime`) | **Yes** (WebSocket + HTTP fallback) | **No - verified** |
| **Multi-GPU training** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Concurrent multi-GPU realtime** | **No - verified** | **Not verified** | **Yes** *(1 GPU per stream)* | **No - verified** |
| **Multi-family model support** | **No - verified** *(RVC only)* | **RVC family with additional vocoder options** *(hidden `Architecture` selector; not separate families like RF/Beatrice)* | **Yes** *(RVC + Rectified Flow + Beatrice)* | **No - verified** *(RVC only)* |
| **Monitoring tools** | TensorBoard | TensorBoard | TensorBoard | TensorBoard + Audio Analyzer + Training Previews |

### Platform & Backend Support

Having a `.sh` launcher does **not** prove every feature is tested on Linux or macOS, so the table below separates launchers from backend code:

| Platform / Backend | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **Windows launchers** | `go-webui.bat`, `go-realtime_gui.bat` | `run-install.bat`, `run-applio.bat`, `run-tensorboard.bat`, `run-updater.bat` | `run-install.bat`, `run-applio.bat`, `run-tensorboard.bat`, `run-realtime-gui.bat` | `RUN_ILARIA_RVC.bat`, `RUN_ILARIA_RVC_LOGS.bat` |
| **Linux / macOS launchers** | Manual Python launch | `run-install.sh`, `run-applio.sh`, `run-tensorboard.sh` | `run-install.sh`, `run-applio.sh` *(no `.sh` for `realtime_gui.py`)* | Manual Python launch *(Windows-focused `.bat`)* |
| **Compute backends in code** | **CUDA / DirectML / CPU** *(DirectML for inference via `--dml` / fallback; training uses CUDA or CPU)* | CUDA / MPS / CPU | CUDA / MPS / CPU *(Beatrice realtime on CPU)* | CUDA / DirectML (AMD & Intel) / CPU |
| **Cross-OS runtime status** | Not tested in this audit | Not tested in this audit | Not tested in this audit | Not tested in this audit |

---

## Generator EMA: Smoother Exported Weights

Inside a neural network, **weights** are the internal numbers that adjust after every training batch. Because each batch is only a small slice of your dataset, the live generator weights can wobble slightly from step to step.

**EMA (Exponential Moving Average)** keeps a separate running average of the generator's weights in memory (distinct from Adam's internal optimizer moments). In `rvc/train/train.py`, Redpanda-vc implements `GeneratorEMA`:

- After every generator optimizer step (on rank `0`), `GeneratorEMA.update()` blends the live generator weights into the running average (excluding `enc_q`, which is only used during training).
- **Generator EMA Decay** (`0` to `0.9999`, default `0.999`, step `0.0001`) controls how slowly the average updates. Setting **`0`** disables EMA and exports the raw live generator weights.
- Neither **RVC Mainline**, **Applio**, nor **Ilaria RVC** includes `GeneratorEMA` in their verified training scripts.

EMA can smooth step-to-step weight fluctuations, but it does **not** guarantee better audio quality, does **not** eliminate overfitting or training randomness, and does **not** make training faster. For full beginner explanations and math details, see [Train RVC Models in Redpanda-vc - EMA & Step-Based Saving](training.md).

---

## Step-Based Training and Saving

In RVC training, an **epoch** is one full pass over the prepared dataset, while a **step** is one weight update after processing a single batch. *(Hypothetical example: if a dataset produces 100 steps per epoch, 1,000 steps is roughly 10 epochs, though the exact ratio depends on dataset length and batch size.)*

The four programs handle step targets and checkpoint saving differently:

- **Redpanda-vc:** Uses **Total Steps** (default `10000`) and **Save Every X Steps** (default `1000`). It saves resumable `G`/`D` checkpoints (and an inference `.pth` when **Save Every Weights** is on) at exact step intervals, even mid-epoch, plus a mandatory **Final Save** at `Total Steps`. **Save Only Latest** overwrites `G_2333333.pth` / `D_2333333.pth` to save disk space.
- **Applio & RVC Mainline:** Both train by **total epochs** and save checkpoints on **epoch** intervals (`save_every_epoch`).
- **Ilaria RVC:** Includes **Training Target: Steps** (`ILARIA_RVC.py`, `train.py`) so it **can** also stop at a target step count. However, Ilaria RVC's save frequency still counts **epochs** (`save_every_epoch`), and intermediate `.pth` weight exports only occur on completed `epoch % save_every_epoch == 0` boundaries (not on a `partial_epoch` mid-epoch), whereas resumable training state saves on `save_every_epoch`, stop, or `final_epoch`.

---

## Rectified Flow: A Different Voice Conversion Architecture

One of Redpanda-vc's biggest additions is **Rectified Flow** (`tabs/train/rectified_flow.py`, `rectified_flow/`). It is **not** a variant of RVC V2:

- **Acoustic model:** Uses an architecture inspired by **DiffSinger**'s acoustic model, taking **ContentVec** speech features in place of phonemes (`README.md`).
- **Output & vocoder:** The flow model predicts mel-spectrogram representations, which a separate **vocoder** (such as `PC-NSF-HiFiGAN`, `NSF-HiFiGAN`, or `Vocos`) converts into an audio waveform.
- **Training presets:** Includes `standard`, `meanflow` (MeanVC2-inspired), and `smaller` presets under `rectified_flow/presets/`.
- **Realtime support:** Supported in Redpanda-vc's realtime GUI and WebUI realtime tab.
- **Compatibility warning:** Even if an exported file uses `.pth`, a Rectified Flow model **is not an RVC V2 model** and will not load in standard RVC loaders unless a client explicitly implements that Rectified Flow decoder.

*(No verified cross-architecture benchmarks exist in the repository proving Rectified Flow is universally faster, more natural, or higher quality than RVC.)*

---

## Beatrice 2 Support

**Beatrice** is a separate, CPU-friendly voice conversion architecture (integrated from `beatrice-trainer` in `tabs/train/beatrice.py`, `beatrice/`, `beatrice/realtime.py`):

- **Separate from RVC:** Beatrice uses its own model format (exported as a model folder, not an RVC `.pth`) and runs its realtime inference on the **CPU** (`README.md`).
- **Do not confuse with F0 pitch extraction:** Some apps (such as Ilaria RVC) include `beatrice` as an **F0 pitch extractor** option during RVC inference. Redpanda-vc goes further by supporting **full Beatrice 2 model training and Beatrice voice conversion** in both its WebUI and `run-realtime-gui.bat`.
- Models trained in Redpanda-vc's Beatrice tab work with Beatrice-compatible loaders (such as Beatrice VST / Beatrice clients), not as RVC V2 `.pth` files.

---

## Custom Vocoder Training

Redpanda-vc includes a dedicated **Vocoder** training tab (`tabs/train/nsf_hifigan.py`, `nsf_hifigan/`):

- **Supported vocoders:** `PC-NSF-HiFiGAN`, `NSF-HiFiGAN`, and `Vocos` (24 kHz).
- **Modes:** Train from scratch or fine-tune from a supported pretrained vocoder checkpoint (for example, `PC-NSF-HiFiGAN 2025.02` or `Vocos 24 kHz`).
- **Acoustic model vs. vocoder:** An acoustic model (like Rectified Flow) predicts spectral features (mel-spectrograms); a vocoder turns those features into audible sound waves.
- **Important limitation:** This tab is tightly paired with **Rectified Flow**'s mel configurations (`check_registry_vocoder` / `mel_mismatch` in `tabs/train/rectified_flow.py`). Selecting `HiFi-GAN` or `RefineGAN` inside the **RVC** training WebUI uses RVC's own integrated generator/vocoder architecture; you **cannot** arbitrarily plug a vocoder trained here into any standard RVC model.

---

## Real-Time Conversion Differences

| Real-Time Capability | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **Desktop Realtime GUI** | **Yes** (`realtime_gui.py`) | **WebUI realtime; separate standalone desktop GUI not verified** | **Yes** (`run-realtime-gui.bat`, RVC + Beatrice + RF) | **No - verified** |
| **Browser WebUI Realtime** | **No - verified** | **Yes** (`tabs/realtime`) | **Yes** (binary WebSocket + HTTP streaming fallback) | **No - verified** |
| **Multi-GPU Stream Assignment** | **No - verified** | **Not verified** | **Yes** (`Inference Device: Automatic` or specific GPU) | **No - verified** |

In Redpanda-vc's WebUI realtime tab (`README.md`, `tabs/inference/realtime.py`):
- **Multi-GPU concurrency:** Two GPUs can run **two separate concurrent streams** (one stream per GPU to preserve audio state). Additional GPUs **do not** merge to make a single stream faster.
- **Transport:** Uses binary WebSocket audio (including over `--share`), with bounded queues and automatic fallback to HTTP streaming if WebSockets are blocked.

---

## Advanced Training Controls

Beyond **Generator EMA Decay** and **Total Steps**, Redpanda-vc exposes several extra controls in **Training** (`tabs/train/rvc.py`):

- **Training dynamics:** `Learning Rate Schedule` (`Exponential` or `Cosine`), `Warmup Steps`, `Learning Rate Decay Every X Steps`, `Final Learning Rate`, `Reset Optimizer State`, and `Max Audio per Batch (sec)`.
- **Memory optimization:** `Checkpointing` (activation checkpointing, inherited from Applio, trades speed for lower VRAM) and `Cache Dataset in GPU` (inherited).
- **Saving & exports:** `Save Every X Steps`, `Save Only Latest`, `Save Every Weights`, and `Generator EMA Decay`.

Beginners do **not** need to tune cosine schedules, warmup steps, or custom learning-rate decay on their first RVC model.

---

## Model Compatibility: What Works Where?

Having a `.pth` file extension does **not** mean two models are interchangeable. Compatibility depends on architecture, checkpoint format, expected embedder, vocoder decoder, and matching FAISS index:

| Model Type | Redpanda-vc | RVC Mainline | Applio | Ilaria RVC | Other Compatible Clients |
| --- | --- | --- | --- | --- | --- |
| **RVC V1 (`.pth` inference)** | **Yes** | **Yes** | **Inference supported; training UI focuses on V2** | **Yes** | **Supported by clients implementing this architecture** |
| **RVC V2 HiFi-GAN (`.pth`)** | **Yes** | **Yes** | **Yes** | **Yes** | **Supported by clients implementing this architecture** |
| **RVC V2 RefineGAN (`.pth`)** | **Yes** | **No - verified** | **Yes** | **Yes** *(32 kHz)* | **Requires compatible decoder** (**Version-dependent**) |
| **RVC V2 MRF HiFi-GAN (`.pth`)** | **Yes** *(inference + CLI)* | **No - verified** | **Yes** *(inference + CLI)* | **Yes** *(UI + inference)* | **Requires compatible decoder** (**Version-dependent**) |
| **Rectified Flow (`.pth`)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **Requires compatible decoder** *(not standard RVC V2)* |
| **Beatrice 2 (model folder)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **Version-dependent** *(Beatrice loaders/VST only)* |
| **Custom Vocoder (`nsf_hifigan`)** | **Yes** *(for Rectified Flow)* | **No - verified** | **No - verified** | **No - verified** | **Requires compatible decoder** |
| **Training Checkpoints (`G_*`/`D_*`)** | **Yes** *(RVC)* | **Yes** *(RVC)* | **Yes** *(RVC)* | **Yes** *(RVC)* | **No - verified** *(training-only)* |
| **FAISS `.index` files** | **Yes** *(matched embedder & dim)* | **Yes** *(matched embedder & dim)* | **Yes** *(matched embedder & dim)* | **Yes** *(matched embedder & dim)* | **Supported by RVC retrieval clients** *(matched embedder & dim)* |

---

## Which RVC Version Should You Choose?

- **Choose RVC Mainline** if you want the original reference codebase and classic `realtime_gui.py` workflow.
- **Choose Applio** if you want a full-featured RVC workspace with epoch-based training and integrated **TTS**.
- **Choose Redpanda-vc** if you specifically want **Generator EMA**, **step-based checkpoint saving**, **Rectified Flow**, **Beatrice 2 training/realtime**, **custom vocoder training**, or **WebSocket/multi-stream realtime** (note that Applio's `tts` tab is not present in Redpanda-vc).
- **Choose Ilaria RVC** if you want an offline-focused RVC studio with `Training Target: Steps`, WebUI-selectable `MRF HiFi-GAN` / `RefineGAN`, integrated **TTS** (Kokoro, ElevenLabs, Windows), `Audio Analyzer`, `Voice Blender`, `RMVPE High Register`, and `Proposed Pitch`.

---

## Beginner FAQ

**What is a fork of RVC?**
A separate project that copies an existing RVC codebase and modifies or adds features on top of it.

**Is Redpanda-vc the same as Applio?**
No. Redpanda-vc is forked from Applio, so it shares Applio's base UI, but adds Generator EMA, step-based saving, Rectified Flow, Beatrice 2, and vocoder training, while omitting Applio's `tts` tab.

**Does Redpanda-vc produce better RVC models?**
Not automatically. Voice quality depends primarily on your dataset, preprocessing, and settings; EMA and extra schedules are tools to test, not guarantees.

**What is EMA?**
Exponential Moving Average: a running average of the generator's weights maintained during training and used when exporting inference models.

**Why does Redpanda-vc save by steps?**
Because step-based saving lets you save at exact update intervals (e.g., every `1000` steps) regardless of how small or large your dataset is.

**Does Ilaria RVC also support step-based training?**
Yes, via `Training Target: Steps`, though its `Save frequency` still counts epochs rather than arbitrary step intervals.

**What is Rectified Flow?**
A diffusion/flow-matching acoustic architecture inspired by DiffSinger that uses ContentVec features and a separate vocoder.

**Is Rectified Flow the same as RVC V2?**
No. They are completely different architectures and are not cross-compatible.

**What is Beatrice?**
A separate, CPU-friendly voice conversion architecture (from `beatrice-trainer`), distinct from RVC and distinct from using Beatrice solely as an F0 pitch extractor.

**What does a vocoder do?**
It converts acoustic features (such as mel-spectrograms) into an audible audio waveform.

**Can I use a Redpanda-vc model in another RVC program?**
Standard **RVC V1 / V2 HiFi-GAN** models exported from Redpanda-vc work in clients implementing those decoders; **Rectified Flow**, **Beatrice**, **RefineGAN**, and **MRF HiFi-GAN** require clients that explicitly support those decoders.

**Can Redpanda-vc train normal RVC models?**
Yes, under the **Train → RVC** tab (`HiFi-GAN` and `RefineGAN` in the WebUI; `MRF HiFi-GAN` in code/CLI).

**Does Redpanda-vc support realtime conversion?**
Yes, both via the WebUI **Realtime** tab and `run-realtime-gui.bat`.

**Does multi-GPU realtime make one voice conversion faster?**
No. Each stream stays on one GPU; extra GPUs allow multiple concurrent streams.

**Should beginners choose RVC, Rectified Flow, or Beatrice?**
Start with **RVC** if you want the widest model and client compatibility; explore **Rectified Flow** or **Beatrice** only if you specifically want their workflows.

**Which features are genuinely unique to Redpanda-vc among these four?**
Combining **Generator EMA**, **step-interval RVC saving (`Save Every X Steps`)**, **Rectified Flow**, **Beatrice 2 training/realtime**, and **dedicated `nsf_hifigan` vocoder training** in one Applio-based fork.

---

## Sources and Technical References

Static source-code comparison verified on `main` branches on **2026-11-22**:

- **Redpanda-vc** (commit [`55a3a80`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80), 2026-10-31): [Repository](https://github.com/redpanda343/Redpanda-vc) · [`tabs/train/train.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/tabs/train/train.py) · [`tabs/train/rvc.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/tabs/train/rvc.py) · [`rvc/train/train.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/rvc/train/train.py) · [`rectified_flow/`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80/rectified_flow) · [`beatrice/`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80/beatrice) · [`nsf_hifigan/`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80/nsf_hifigan) · [`tabs/inference/realtime.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/tabs/inference/realtime.py) · [`realtime_gui.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/realtime_gui.py)
- **Applio** (commit [`445b0f6`](https://github.com/IAHispano/Applio/tree/445b0f6), 2026-11-19): [Repository](https://github.com/IAHispano/Applio) · [`tabs/train/train.py`](https://github.com/IAHispano/Applio/blob/445b0f6/tabs/train/train.py) · [`rvc/infer/infer.py`](https://github.com/IAHispano/Applio/blob/445b0f6/rvc/infer/infer.py) · [`core.py`](https://github.com/IAHispano/Applio/blob/445b0f6/core.py) · [`rvc/train/train.py`](https://github.com/IAHispano/Applio/blob/445b0f6/rvc/train/train.py) · [`tabs/tts/`](https://github.com/IAHispano/Applio/tree/445b0f6/tabs/tts) · [`tabs/realtime/`](https://github.com/IAHispano/Applio/tree/445b0f6/tabs/realtime) · [`rvc/realtime/`](https://github.com/IAHispano/Applio/tree/445b0f6/rvc/realtime)
- **RVC Mainline** (commit [`81eed5e`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/tree/81eed5e), 2026-08-04): [Repository](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [`configs/config.py`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/81eed5e/configs/config.py) · [`train/train.py`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/81eed5e/train/train.py) · [`realtime_gui.py`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/81eed5e/realtime_gui.py)
- **Ilaria RVC** (commit [`a887ba5`](https://github.com/TheStingerX/Ilaria-RVC/tree/a887ba5), 2026-11-21): [Repository](https://github.com/TheStingerX/Ilaria-RVC) · [`app/ILARIA_RVC.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/a887ba5/app/ILARIA_RVC.py) · [`app/infer/modules/train/train.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/a887ba5/app/infer/modules/train/train.py) · [`app/ilaria/ilaria_tts.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/a887ba5/app/ilaria/ilaria_tts.py)
