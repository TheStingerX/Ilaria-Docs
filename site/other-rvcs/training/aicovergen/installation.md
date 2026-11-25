# AICoverGen · Installation

[GitHub](https://github.com/SociallyIneptWeeb/AICoverGen)

!!!warning Legacy software · Not recommended
**AICoverGen** is an older RVC v2 song-cover pipeline that is no longer actively maintained and relies on Python 3.9+ era dependencies. For a new setup, choose a maintained app. [Guides by app](../../app-guides.md)
!!!

## What AICoverGen does

AICoverGen is an automated WebUI and CLI pipeline that generates AI song covers using existing **RVC v2** voice models. Given a YouTube link or local audio file, it separates lead vocals from the instrumental track with MDX-Net, converts the vocals using your chosen `.pth` model (and optional `.index`), applies mixing/reverb effects, and combines everything back into a song. It does not train new RVC models — you bring pre-trained RVC v2 inference files.

## Prerequisites

- **Python 3.9+** (Python 3.10 recommended)
- **NVIDIA GPU with CUDA** recommended for reasonable conversion speed
- **FFmpeg** and **SoX (`sox`)** installed and available on your system `PATH`

## Local installation

Clone the repository, install the Python dependencies, download the required MDX-Net vocal-separation and HuBERT base models, and launch the Gradio WebUI (by default at `http://127.0.0.1:7860`):

~~~bash
git clone https://github.com/SociallyIneptWeeb/AICoverGen.git
cd AICoverGen
pip install -r requirements.txt
python src/download_models.py
python src/webui.py
~~~

Running `python src/download_models.py` automatically downloads the MDX-Net separation weights and HuBERT base model needed before the first cover generation.

## Google Colab

If your computer does not have a suitable NVIDIA GPU, the repository includes an official companion notebook (`AICoverGen_colab.ipynb`) to install system dependencies (including `sox`), fetch base weights, and launch the Gradio interface on a cloud GPU.

[Usage and troubleshooting](usage.md)
