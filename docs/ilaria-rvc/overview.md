---
label: "💖 Ilaria RVC overview"
order: 100
permalink: /ilaria-rvc/overview/
---
# Ilaria RVC overview

You can also run Ilaria RVC on Kaggle using its remote GPU. This option works even if your computer has no NVIDIA GPU. [Ilaria RVC on Kaggle](kaggle.md)

Ilaria RVC 2.1.2 is a Windows application based on Mainline RVC. Its interface opens in a browser, while its bundled engine runs on the PC. The current Windows package targets NVIDIA. The release includes inference, TTS, model training, a model library and audio analysis.

| Where | What you can do |
| --- | --- |
| Training | Import and check datasets, preprocess, extract features, run or queue experiments, preview checkpoints and build retrieval indexes. |
| Inference | Convert one clip or a folder, generate speech, select encoders and pitch extractors, and apply optional processing. |
| Other | Import, download, inspect, merge and export models. Install optional embedders and pretrains, analyze audio, scan hardware and update the application. |
| Training Dashboard | Follow active runs, inspect existing logs, open TensorBoard and generate a diagnostic report. |
| Glossary | Review settings and workflows inside the app. |

Start with [installation](installation.md), then follow [single and batch inference](inference.md), [a training experiment](training-workflow.md), or [model management](model-library.md). For common terminology, open the [glossary](../reference/glossary.md).

## What runs locally

The launcher starts a local service at port 6969 by default. File conversion and training use local model files. Downloading models, updating the app and using Edge TTS require connectivity. For offline speech generation, choose an installed Windows voice. The browser is also tied to the service lifecycle in this release. Finish or safely save active work before closing the last tab.
