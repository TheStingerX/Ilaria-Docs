---
label: "Installation"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/rvc-studio/installation/
---

# RVC Studio · Installation

[GitHub](https://github.com/SayanoAI/RVC-Studio) · [Hugging Face](https://huggingface.co/datasets/SayanoAI/RVC-Studio/tree/main) · [`91c4011`](https://github.com/SayanoAI/RVC-Studio/tree/91c40119b9ff209eba23debdb0871931b9fd8127)

!!!warning Legacy software · Not recommended
The main branch of **RVC Studio** has been inactive for years. This outdated app is not recommended for new installations. [Guides by app](../app-guides.md)
!!!

RVC Studio by SayanoAI is a Streamlit WebUI for training voice models and making covers from recordings. These steps refer to the GitHub revision linked above. The project describes its main branch as experimental.

## Setup

On Windows, extract the source into its own folder and run `conda-installer.bat`. If Miniconda is already installed, start with `conda-start.bat`. The launcher creates a Python 3.10 environment if needed, installs the dependencies and opens Streamlit. Open the local URL printed by Streamlit. For manual setup, activate a separate environment and run the commands below from the folder containing `Home.py`.

~~~bash
python -m pip install -r requirements.txt
streamlit run Home.py
~~~

## Base assets

Use the app’s downloads or the upstream Hugging Face dataset for base assets. Keep these separate from the voice checkpoint you want to use. If FFmpeg or eSpeak fails, check the upstream bundled-tools instructions. The repository also includes a Colab notebook and a Docker Compose file configured to request NVIDIA GPU 0. Start with the local setup for audio devices connected to your computer.

[Colab](https://colab.research.google.com/github/SayanoAI/RVC-Studio/blob/main/RVC_Studio.ipynb) · [FFmpeg / eSpeak](https://github.com/SayanoAI/RVC-Studio/blob/main/dist/README.md)

[→ First cover](usage.md)
