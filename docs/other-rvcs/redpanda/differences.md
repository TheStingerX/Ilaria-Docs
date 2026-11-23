---
label: "Redpanda VC compared with other RVC apps"
icon: ":clipboard:"
order: 94
permalink: /ilaria-rvc/redpanda/comparison/
description: "Redpanda VC combines RVC and Casual Voice Changer in a shared desktop and browser interface. Older Redpanda builds used Gradio and included engines and tools removed from the current release."
---

# Redpanda VC compared with other RVC apps

[Windows x64 precompiled release](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) · [Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Redpanda VC combines RVC and Casual Voice Changer in a shared desktop and browser interface. Older Redpanda builds used Gradio and included engines and tools removed from the current release.

## Model formats and supported engines

The current release includes RVC and CVC workflows for training, file conversion and realtime. Beatrice, Rectified Flow and standalone vocoder training were removed. HiFi-GAN and RefineGAN remain choices inside RVC training. A CVC `.cvc` voice requires a CVC engine. For RVC, check the model architecture, vocoder and embedder before moving a `.pth` to Mainline, Applio or Ilaria RVC.

| App | Interface | Main distinction |
| --- | --- | --- |
| Redpanda VC | Desktop + browser | RVC and CVC in one UI |
| RVC WebUI (Mainline - Original RVC) | Browser + separate realtime launcher | Original RVC implementation |
| Applio | WebUI | RVC workflows including TTS |
| Ilaria RVC | Browser interface | Windows NVIDIA package and cloud notebooks |

[Set up Redpanda VC](first-run.md) · [File inference](inference.md) · [Realtime voice conversion](live-audio.md) · [Casual Voice Changer training](causal-training.md) · [RVC Training](training.md)

## Source and release

[Release README](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/README.md) · [Interface migration](https://github.com/redpanda343/Redpanda-vc/commit/2b1367c8c) · [Engine changes](https://github.com/redpanda343/Redpanda-vc/commit/577f02066)
