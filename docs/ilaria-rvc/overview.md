---
label: "Ilaria RVC overview"
icon: ":sparkling_heart:"
order: 100
permalink: /ilaria-rvc/overview/
description: "You can also run Ilaria RVC on Kaggle using its remote GPU. This option works even if your computer has no NVIDIA GPU. Ilaria RVC on Kaggle"
---
# Ilaria RVC overview

[Download Ilaria RVC 2.4.2 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

You can also run Ilaria RVC on Kaggle using its remote GPU. This option works even if your computer has no NVIDIA GPU. [Ilaria RVC on Kaggle](cloud/kaggle.md)

Ilaria RVC 2.4.2 is a Windows application based on RVC WebUI (Mainline - Original RVC). Its interface opens in a browser, while its bundled engine runs on the PC. The current Windows package targets NVIDIA. The release includes inference, TTS, model training, a model library and audio analysis.

| Where | What you can do |
| --- | --- |
| Training | Import and check datasets, preprocess, extract features, run or queue experiments, preview checkpoints and build retrieval indexes. |
| Inference | Convert one clip or a folder, generate speech, select encoders and pitch extractors, and apply optional processing. |
| Other | Import, download, inspect, merge and export models. Install optional embedders and pretrains, analyze audio, scan hardware and update the application. |
| Training Dashboard | Follow active runs, inspect existing logs, open TensorBoard and generate a diagnostic report. |
| Glossary | Review settings and workflows inside the app. |

Start with [installation](install/installation.md), then follow [single and batch inference](convert/inference.md), [a training experiment](train/training-workflow.md), or [model management](manage/model-library.md). For common terminology, open the [glossary](../reference/glossary.md).

## What runs locally

The launcher starts a local service at port 6969 by default. File conversion and training use local model files. Downloading models, updating the app and using Edge TTS require connectivity. For offline speech generation, choose an installed Windows voice. The browser is also tied to the service lifecycle in this release. Finish or safely save active work before closing the last tab.

[Training controls](train/training-buttons.md) · [Inference controls](convert/inference-buttons.md) · [Other panels](manage/other-buttons.md)
