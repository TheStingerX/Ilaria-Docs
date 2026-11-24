---
label: "Redpanda VC et les autres applications RVC"
icon: ":clipboard:"
order: 94
permalink: /ilaria-rvc/redpanda/comparison/
description: "Redpanda VC réunit RVC et Causal Voice Changer dans une interface commune au bureau et au navigateur. Les anciennes versions utilisaient Gradio et incluaient des moteurs et outils retirés de la version actuelle."
---

# Redpanda VC et les autres applications RVC

[Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Redpanda VC réunit RVC et Causal Voice Changer dans une interface commune au bureau et au navigateur. Les anciennes versions utilisaient Gradio et incluaient des moteurs et outils retirés de la version actuelle.

## Formats et moteurs pris en charge

La version actuelle inclut l’entraînement, l’inférence et le temps réel pour RVC et CVC. Beatrice, Rectified Flow et l’entraînement autonome des vocodeurs ont été retirés. HiFi-GAN et RefineGAN restent disponibles pour RVC. Une voix `.cvc` nécessite un moteur CVC. Avant de transférer un `.pth` vers Mainline, Applio ou Ilaria RVC, vérifiez son architecture, son vocodeur et son embedder.

| Application | Interface | Principale différence |
| --- | --- | --- |
| Redpanda VC | Bureau et navigateur | RVC et CVC dans une interface |
| RVC WebUI (Mainline - Original RVC) | Navigateur et lanceur temps réel séparé | Implémentation RVC d’origine |
| Applio | WebUI | Flux RVC et synthèse vocale |
| Ilaria RVC | Interface navigateur | Paquet Windows pour NVIDIA et notebooks dans le cloud |

[Installer Redpanda VC](first-run.md) · [Inférence sur fichier](inference.md) · [Conversion vocale en temps réel](live-audio.md) · [Entraînement avec Causal Voice Changer](causal-training.md) · [RVC Training](training.md)

## Code source et version

[Release README](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/README.md) · [Interface migration](https://github.com/redpanda343/Redpanda-vc/commit/2b1367c8c) · [Engine changes](https://github.com/redpanda343/Redpanda-vc/commit/577f02066)
