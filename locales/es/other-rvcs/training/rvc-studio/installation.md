---
label: "Instalación"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/rvc-studio/installation/
---

# RVC Studio · Instalación

[GitHub](https://github.com/SayanoAI/RVC-Studio) · [Hugging Face](https://huggingface.co/datasets/SayanoAI/RVC-Studio/tree/main) · [`91c4011`](https://github.com/SayanoAI/RVC-Studio/tree/91c40119b9ff209eba23debdb0871931b9fd8127)

!!!warning Software antiguo · No recomendado
La rama principal de **RVC Studio** lleva años inactiva. La aplicación está desactualizada y se desaconseja para nuevas instalaciones. [Guías por aplicación](../../app-guides.md)
!!!

RVC Studio de SayanoAI es una interfaz web en Streamlit para entrenar voces y crear versiones a partir de grabaciones. Los pasos corresponden a la revisión enlazada. El proyecto considera experimental su rama principal.

## Configuración

En Windows, extrae el código y abre `conda-installer.bat`. Si ya tienes Miniconda, usa `conda-start.bat`. El iniciador crea un entorno Python 3.10 si hace falta, instala las dependencias y ejecuta Streamlit. Abre la URL local. Para la instalación manual, activa un entorno separado y ejecuta los comandos desde la carpeta de `Home.py`.

~~~bash
python -m pip install -r requirements.txt
streamlit run Home.py
~~~

## Recursos base

Descarga los recursos base desde la aplicación o Hugging Face. Añade por separado el modelo de voz. Para errores de FFmpeg o eSpeak consulta las instrucciones oficiales. El proyecto incluye un cuaderno de Colab y Docker Compose con una solicitud de la GPU NVIDIA 0. Para tus dispositivos de audio, empieza con una instalación local.

[Colab](https://colab.research.google.com/github/SayanoAI/RVC-Studio/blob/main/RVC_Studio.ipynb) · [FFmpeg / eSpeak](https://github.com/SayanoAI/RVC-Studio/blob/main/dist/README.md)

[→ Primera versión](usage.md)
