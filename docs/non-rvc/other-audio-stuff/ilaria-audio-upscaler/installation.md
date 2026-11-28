---
label: "Installation and models"
icon: ":cd:"
order: 98
permalink: /non-rvc/ilaria-audio-upscaler/installation/
---

# Installation and models

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [V2](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v2) · [ZIP](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/archive/refs/tags/v2.zip)

## Windows setup

**1.** Download the project from GitHub and extract it into a writable local folder. Install **64-bit Python 3.10**. **2.** Run `Setup.cmd` and wait for it to install dependencies and FFmpeg, create `Ilaria Audio Upscaler.exe` and open the app. **3.** Launch the EXE directly next time. Keep it with the app folder. The source package excludes the built executable, Python environment and model weights.

## Device and checkpoints

Setup tries CUDA on compatible NVIDIA hardware and can fall back to CPU. Start with **Auto**. Select **CPU** to isolate CUDA issues. Select **CUDA** and the GPU explicitly when you know the runtime supports it. Choose **Download Sidon INT8** for Sidon (about 286 MiB) or **Download checkpoint** for the selected AP-BWE profile. Weights live in `App/checkpoints`. Downloads and initial setup require Internet access.

For Apollo, select **Apollo** and click the model download button. The weights take about **63.5 MiB** and are stored under `App/checkpoints/Apollo`.

[Overview](overview.md) · [Restore speech with Sidon](sidon.md) · [Extend speech bandwidth with AP-BWE](ap-bwe.md) · [Preview, export and troubleshooting](export.md)

## Sources

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [V2](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v2) · [Python 3.10](https://www.python.org/downloads/release/python-31011/) · [Setup.cmd](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/Setup.cmd)
