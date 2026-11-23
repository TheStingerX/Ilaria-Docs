---
label: "Redpanda VC im Vergleich mit anderen RVC-Apps"
icon: ":clipboard:"
order: 94
permalink: /ilaria-rvc/redpanda/comparison/
description: "Redpanda VC vereint RVC und Casual Voice Changer in einer gemeinsamen Desktop- und Browseroberfläche. Ältere Builds nutzten Gradio und enthielten Engines und Werkzeuge, die in der aktuellen Version entfallen sind."
---

# Redpanda VC im Vergleich mit anderen RVC-Apps

[Vorkompilierte Version für Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) · [Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Redpanda VC vereint RVC und Casual Voice Changer in einer gemeinsamen Desktop- und Browseroberfläche. Ältere Builds nutzten Gradio und enthielten Engines und Werkzeuge, die in der aktuellen Version entfallen sind.

## Modellformate und unterstützte Engines

Die aktuelle Version bietet Training, Datei-Inferenz und Echtzeit für RVC und CVC. Beatrice, Rectified Flow und separates Vocoder-Training wurden entfernt. HiFi-GAN und RefineGAN bleiben im RVC-Training verfügbar. Eine `.cvc`-Stimme braucht eine CVC-Engine. Prüfe Architektur, Vocoder und Embedder, bevor du ein `.pth` mit Mainline, Applio oder Ilaria RVC verwendest.

| App | Oberfläche | Hauptunterschied |
| --- | --- | --- |
| Redpanda VC | Desktop und Browser | RVC und CVC in einer Oberfläche |
| RVC WebUI (Mainline - Original RVC) | Browser und separater Echtzeit-Launcher | Ursprüngliche RVC-Implementierung |
| Applio | WebUI | RVC-Abläufe und Sprachsynthese |
| Ilaria RVC | Browseroberfläche | Windows-Paket für NVIDIA und Cloud-Notebooks |

[Redpanda VC einrichten](first-run.md) · [Datei-Inferenz](inference.md) · [Stimmkonvertierung in Echtzeit](live-audio.md) · [Training mit Casual Voice Changer](causal-training.md) · [RVC Training](training.md)

## Quellcode und Release

[Release README](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/README.md) · [Interface migration](https://github.com/redpanda343/Redpanda-vc/commit/2b1367c8c) · [Engine changes](https://github.com/redpanda343/Redpanda-vc/commit/577f02066)
