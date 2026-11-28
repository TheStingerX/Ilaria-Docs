---
label: "Guides by app"
icon: ":books:"
order: 80
permalink: /ilaria-rvc/app-guides/
description: "Use Ilaria RVC to train a model or convert a recording."
---
# Step-by-step guides by app

<div role="group" aria-label="What do you want to do?" style="margin:1.4rem 0 2rem;padding:1rem;border:1px solid #db78a888;border-radius:1rem;background:#db78a810">
  <p style="margin:0 0 .85rem;text-align:center;font-weight:700">What do you want to do?</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,13rem),1fr));gap:.65rem">
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Training or file conversion</strong><br><span aria-hidden="true">↓</span> <a href="../installation/">Ilaria RVC</a></div>
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Live microphone</strong><br>NVIDIA <span aria-hidden="true">→</span> <a href="../vonovox/installation/">Vonovox</a><br>AMD / Intel <span aria-hidden="true">→</span> <a href="../tgr/installation/">Okada TG Developed Fork</a></div>
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Other workflows</strong><br><span aria-hidden="true">↓</span> <a href="../applio/installation/">Applio</a> · <a href="../redpanda/first-run/">Redpanda-vc</a></div>
  </div>
</div>

## Choose by task and graphics card

Use **Ilaria RVC** to train a model or convert a recording. For a live microphone on Windows, use **Vonovox** with a supported NVIDIA GPU, or **Okada TG Developed Fork** with a compatible AMD or Intel GPU. For other workflows, start with **Applio** or **Redpanda-vc**.

[Install Ilaria RVC](../ilaria-rvc/install/installation.md) · [GPU compatibility](../ilaria-rvc/install/gpu-compatibility.md) · [Run on Kaggle](../ilaria-rvc/cloud/kaggle.md)

## Train with Ilaria RVC

Prepare a dataset of clean recordings from one speaker. Start with the dataset guide and work through preprocessing, feature extraction and training in order. Save checkpoints at regular intervals and compare them using the same short test clips. Keep the checkpoint that sounds best on unfamiliar material. Keep its optional index with the model it belongs to.

[Prepare a dataset](../ilaria-rvc/train/datasets.md) · [Training workflow](../ilaria-rvc/train/training-workflow.md) · [Training controls](../ilaria-rvc/train/training-controls.md)

## Convert recordings with Ilaria RVC

Import a compatible inference `.pth` and add its matching `.index` if you have it. Convert one short, dry WAV first. Save that output as a reference, then adjust pitch or retrieval one setting at a time. Use batch conversion once the settings work on several representative clips. On a machine without a suitable local GPU, use the Kaggle guide for offline training or conversion.

[Single and batch inference](../ilaria-rvc/convert/inference.md) · [Inference controls](../ilaria-rvc/convert/inference-buttons.md)

## Convert a microphone live

With NVIDIA on Windows, install Vonovox and select the package for your GPU. With AMD or Intel on Windows, start with the DirectML build of Okada TG Developed Fork if your GPU supports it. Confirm that the app can pick up your microphone and convert it to headphones before routing the output. Send the converted audio to the playback side of a virtual cable, then select its recording side as the microphone in Discord, OBS, a game or another app. If audio breaks up, increase the buffer and retest with the destination app running.

[Install Vonovox](voice-changers/vonovox/installation.md) · [Route and tune Vonovox](voice-changers/vonovox/live-audio.md) · [Install Okada TG Developed Fork](voice-changers/tgr/installation.md) · [Route and tune TGR](voice-changers/tgr/live-audio.md)

## Use Applio or Redpanda-vc for other workflows

Choose Applio for text-to-speech and model management. Redpanda VC provides RVC and Causal Voice Changer training, file conversion and realtime in a desktop app and browser WebUI. Use `.pth` with the RVC engine and `.cvc` with CVC.

[Install Applio](training/applio/installation.md) · [Applio TTS](training/applio/tts.md) · [Applio model library](training/applio/models.md) · [Set up Redpanda-vc](training/redpanda/first-run.md) · [Redpanda-vc live modes](training/redpanda/live-audio.md)

## Keep a baseline and fix one issue at a time

For file conversion, compare the same input clip at the same output volume. For live conversion, record a short test in the receiving app and check for doubled audio, dropouts and delay. If the voice sounds wrong in both tests, verify the model, engine and pitch. If only the receiving app sounds wrong, check the virtual cable, selected microphone and monitoring first.

## Training & Inference

| App | Capabilities | Hardware / notes | Guides |
| --- | --- | --- | --- |
| **Ilaria RVC** | Training, single/batch inference, TTS, audio analyzer | NVIDIA CUDA (Windows) · [AMD Preview](../ilaria-rvc/install/amd-preview.md) · Kaggle | [Installation](../ilaria-rvc/install/installation.md) · [Inference](../ilaria-rvc/convert/inference.md) · [Training](../ilaria-rvc/train/training-workflow.md) |
| **Applio** | Training, file inference, TTS, model library, realtime | NVIDIA CUDA, AMD ROCm, Apple MPS | [Installation](training/applio/installation.md) · [Inference](training/applio/inference.md) · [Training](training/applio/training.md) · [Android / Termux](training/applio/android.md) |
| **RVC WebUI (Mainline - Original RVC)** | Upstream training & file inference (+ separate realtime launcher) | NVIDIA CUDA, CPU / DirectML | [Installation](training/mainline/installation.md) · [Inference](training/mainline/inference.md) · [Training](training/mainline/training.md) |
| **Redpanda-vc** | RVC + Causal Voice Changer training, file inference & realtime | NVIDIA CUDA / CPU (Desktop & WebUI) | [First run](training/redpanda/first-run.md) · [Inference](training/redpanda/inference.md) · [Training](training/redpanda/training.md) |
| **AICoverMaker** | Applio fork for covers, vocal separation and conversion | — | [Installation](training/aicovermaker/installation.md) · [First cover](training/aicovermaker/usage.md) |
| **NoRegretsRVC** | Applio workflow setup for training and file inference | Beta 0.1.0 · Local studio and Kaggle / Applio runtime | [Installation](training/noregretsrvc/installation.md) · [Usage](training/noregretsrvc/usage.md) · [Cloud](training/noregretsrvc/cloud.md) · [Release history](training/noregretsrvc/version-history.md) |
| **RVC Model Merger** | Model merging utility for RVC `.pth` files | Offline utility | [Usage](rvc-model-merger/usage.md) |

### Legacy / Not recommended

!!!warning Legacy software · Not recommended
These projects are outdated, archived, or no longer actively maintained. The guides are kept for existing projects. For a new setup, choose a maintained app above.
!!!

| App | Capabilities | Status / notes | Guides |
| --- | --- | --- | --- |
| **rvc-cli** | File/batch inference & training (CLI) | Archived | [Installation](training/rvc-cli/installation.md) · [Usage](training/rvc-cli/usage.md) |
| **RVC Studio** | Training & file inference (WebUI) | Inactive | [Installation](training/rvc-studio/installation.md) · [Usage](training/rvc-studio/usage.md) |
| **Mangio RVC Fork** | Training & file inference | Inactive | [Installation](training/mangio/installation.md) · [Usage](training/mangio/usage.md) |
| **Replay** | Training & file conversion | Discontinued (Weights.gg closed) | [Installation](training/replay/installation.md) · [Usage](training/replay/usage.md) |
| **AICoverGen** | RVC v2 song-cover pipeline (inference only, WebUI / CLI / Colab) | Unmaintained | [Installation](training/aicovergen/installation.md) · [Usage](training/aicovergen/usage.md) |
| **RVC GUI** | Desktop file conversion only | Archived | [File conversion](voice-changers/rvc-gui/file-conversion.md) |

## Voice Changers (Realtime)

| App | Engine / focus | Hardware / notes | Guides |
| --- | --- | --- | --- |
| **Vonovox** | Realtime RVC v2 (recommended on NVIDIA Windows) | NVIDIA CUDA | [Installation](voice-changers/vonovox/installation.md) · [Live audio](voice-changers/vonovox/live-audio.md) · [Performance](voice-changers/vonovox/advanced-performance-optimization.md) |
| **w-okada VCClient** | Cross-platform realtime RVC (client/server) | NVIDIA CUDA, DirectML, Apple MPS, CPU | [Installation](voice-changers/okada/installation.md) · [Live audio](voice-changers/okada/live-audio.md) |
| **Okada TG Developed Fork (TGR)** | Active community realtime RVC fork | NVIDIA CUDA, DirectML (AMD/Intel), CPU, Linux, exp. macOS | [Installation](voice-changers/tgr/installation.md) · [Live audio](voice-changers/tgr/live-audio.md) · [Cloud](voice-changers/tgr/cloud.md) |
| **Deiteris w-okada Fork** | Realtime w-okada fork | NVIDIA CUDA, DirectML, Apple MPS, CPU | [Installation](voice-changers/deiteris/installation.md) · [Live audio](voice-changers/deiteris/live-audio.md) · [Cloud](voice-changers/deiteris/cloud.md) |
| **RVC Blue** | Windows desktop realtime & real-time file input | NVIDIA CUDA 12.8 / 11.8 | [Installation](voice-changers/rvc-blue/installation.md) |

Multi-mode RVC apps with built-in realtime modes: **Applio** ([Realtime](training/applio/realtime.md)), **Redpanda-vc** ([Live audio](training/redpanda/live-audio.md)), and **RVC WebUI (Mainline)** ([Realtime](training/mainline/realtime.md)).

### Non-RVC Realtime Voice Changers

| App | Capabilities | Guides |
| --- | --- | --- |
| **Causal Voice Changer** | Low-latency non-RVC realtime voice changer (`.cvc` models) | [Overview](../non-rvc/voice-changers/causal-voice-changer/overview.md) · [Installation](../non-rvc/voice-changers/causal-voice-changer/installation.md) · [Realtime](../non-rvc/voice-changers/causal-voice-changer/realtime.md) |
| **YuneVoix** | Non-RVC realtime voice changer & song cover / karaoke | [Overview](../non-rvc/voice-changers/yunevoix/overview.md) · [Installation](../non-rvc/voice-changers/yunevoix/installation.md) · [Usage](../non-rvc/voice-changers/yunevoix/usage.md) |

[Compare all apps](../reference/tools.md)
