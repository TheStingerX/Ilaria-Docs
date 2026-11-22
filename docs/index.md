---
label: "🏠 Home"
order: 100
---
# Ilaria RVC documentation

<div class="docs-welcome" data-author-note="ilaria">

**A note from Ilaria**

Hi, I’m Ilaria. I wrote these guides to share what I’ve learned about RVC while developing Ilaria RVC, training voice models and working with other tools. The explanations and recommendations reflect my experience and what I understand at the time of writing. I can misunderstand a setting, miss an exception or describe a step that changes in a later release.

The same instructions can give different results on another computer. For example, a button might move after an update, a feature may depend on your GPU or driver, and settings that work for one voice might sound worse on another. When you see a suggested value, treat it as a starting point. Try it on a short clip and compare the result before using it on a whole project. Before replacing files or updating a working installation, keep a copy you can come back to.

If something doesn’t match what you see, check the app name, version and exact error first. Then compare with the release notes or the instructions for your build. If you spot a mistake, let me know which page and step you followed, which version you used and what happened. That gives me enough information to test the issue and improve the guide.

<div style="border-left:4px solid #FFC0CB;padding:.75rem 1rem;margin:1rem 0;background:#ffc0cb12;border-radius:.3rem">

For any problems, suggestions or updates, contact me on Discord.

[**Discord · thestingerx**](https://discord.com/users/740255187234717838)

</div>

&#45; Ilaria

</div>

<div class="docs-welcome">

Ilaria RVC is a Windows application for converting recordings and training voice models. Its interface opens in a browser and the conversion engine runs on your computer. The Windows package is built for NVIDIA GPUs.

If your computer doesn’t have a suitable NVIDIA GPU, you can run Ilaria RVC on Kaggle. In the notebook settings, turn on Internet access and select a GPU accelerator. Choose GPU T4 ×2 if it’s available. Kaggle’s remote NVIDIA GPU handles the voice conversion and model training. Follow the [Ilaria RVC on Kaggle guide](ilaria-rvc/cloud/kaggle.md) to set up the notebook and save your results before the session ends.

[Download Ilaria RVC 2.4.7 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true) · [Browse voice demos](https://ilariarvc.shop/en/demos/) · [Read the changelog](ilaria-rvc/install/version-history.md)

</div>

## Start with your setup

### Windows with an NVIDIA GPU

Check your exact model in [GPU compatibility](ilaria-rvc/install/gpu-compatibility.md), then follow [Installation and updates](ilaria-rvc/install/installation.md). When the app opens, use a short clean WAV and an inference model in [Single Inference](ilaria-rvc/convert/inference.md). The matching index is optional. Save the first output so you have a reference before changing effects or pitch.

### A computer without a suitable GPU

Use the [Kaggle walkthrough](ilaria-rvc/cloud/kaggle.md) to run Ilaria RVC on a remote GPU. It covers starting the notebook, accessing the interface, running a test, and downloading results before the session ends.

## Choose the right workflow

- **I have a recording and want a different voice.** Use [Inference controls](ilaria-rvc/convert/inference-buttons.md) to choose a model, convert the file and find the exported audio.
- **I have text and want spoken audio.** Start with [Text to speech](ilaria-rvc/convert/speech.md). Listen to the source voice before applying an RVC model so you can fix pronunciation early.
- **I want to create my own voice model.** Prepare recordings you have permission to use, keep a short clip aside for testing, then follow [Training step by step](ilaria-rvc/train/training-workflow.md). Use the [Training controls reference](ilaria-rvc/train/training-buttons.md) when you need to understand a setting.
- **I want to use a converted microphone in a call or game.** Choose an app in [Other RVCs](other-rvcs/app-guides.md), then follow [live audio routing](conversion/real-time.md) to test the mic, converter and destination in that order.

## When something goes wrong

If the app does not start, keep the log open and look for the first error. If the app starts but the audio sounds wrong, compare the same short clip with optional processing off. The [troubleshooting guide](reference/troubleshooting.md) groups fixes by symptom. The [glossary](reference/glossary.md) explains terms such as checkpoint, embedder and index, and [Other controls](ilaria-rvc/manage/other-buttons.md) shows how to inspect, import and export models.

| I want to… | Start here |
| --- | --- |
| Explore the Ilaria RVC app in detail | [App overview](ilaria-rvc/overview.md), [installation](ilaria-rvc/install/installation.md), [inference](ilaria-rvc/convert/inference.md), and [training workflow](ilaria-rvc/train/training-workflow.md) |
| Install the app and convert my first clip | [Getting started](start/getting-started.md) |
| Understand how RVC works | [RVC fundamentals](start/rvc-fundamentals.md) and [models and files](start/models.md) |
| Convert audio, compare settings, or process a folder | [Voice conversion](conversion/voice-conversion.md) and [audio quality](conversion/audio-quality.md) |
| Generate a spoken source from text | [Text to speech](conversion/text-to-speech.md) |
| Convert a microphone signal live | [Real-time voice conversion](conversion/real-time.md) |
| Record a dataset and train my own model | [Dataset preparation](model-training/dataset-preparation.md) and [training](model-training/training.md) |
| Separate a vocal or finish a music project | [Stems and mixing](conversion/stems-and-mixing.md) |
| Compare Ilaria RVC, Vonovox, Applio and more | [RVC tools](reference/tools.md) |
| Fix an error or recover an installation | [Troubleshooting](reference/troubleshooting.md) |

Use the navigation to find setup, conversion, training, and troubleshooting guides for Ilaria RVC and other RVC applications.


---

## Documentation at a glance

- **Pages in total:** **97** pages (`96` guides + Home)
- **Total pages across all 6 languages (`en`, `it`, `es`, `fr`, `de`, `pt`):** **582** pages (`97 x 6`)

## A few fun facts about the site and Ilaria

- **Born from real troubleshooting:** Ilaria (`TheStingerX` / `thestingerx` on Discord) wrote and expanded these docs directly while building **Ilaria RVC**, training models (such as *Itaila*), and testing real setups on Windows, Kaggle, Google Colab, and Lightning AI.
- **From `1.1 Beta` to `2.4.7`:** Ilaria RVC started as a themed Windows WebUI and evolved to support **NVIDIA RTX 50 series (Blackwell)** on CUDA 12.8, **native BF16 training**, **Kokoro v1.0 TTS**, **Safetensors ↔ PTH** conversion, and built-in model/pretrain catalogs.
- **More than one app:** Over time, **Ilaria Docs** grew into a full voice-conversion hub covering **11 RVC apps and forks** (Ilaria RVC, Applio, Mainline, Okada, TGR, Deiteris, Vonovox, RedPanda, RVC Blue, RVC-GUI, and RVC Model Merger) plus **Non-RVC** tools like **YuneVoix**, **Causal Voice Changer**, **UVR5**, and **MVSep**.
- **Synchronized in 6 languages:** Every single guide on this site is maintained 1:1 across English, Italian, Spanish, French, German, and Portuguese.
