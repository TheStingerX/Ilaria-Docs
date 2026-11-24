---
label: "Installation"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/rvc-studio/installation/
---

# RVC Studio · Installation

[GitHub](https://github.com/SayanoAI/RVC-Studio) · [Hugging Face](https://huggingface.co/datasets/SayanoAI/RVC-Studio/tree/main) · [`91c4011`](https://github.com/SayanoAI/RVC-Studio/tree/91c40119b9ff209eba23debdb0871931b9fd8127)

RVC Studio de SayanoAI est une interface Streamlit pour entraîner des voix et créer des reprises à partir d’enregistrements. Les étapes suivent la révision liée. La branche principale est décrite comme expérimentale.

## Configuration

Sous Windows, extrayez le code et lancez `conda-installer.bat`. Si Miniconda est déjà installé, utilisez `conda-start.bat`. Le lanceur crée si nécessaire un environnement Python 3.10, installe les dépendances et démarre Streamlit. Ouvrez l’adresse locale. Pour une installation manuelle, activez un environnement séparé et lancez les commandes dans le dossier de `Home.py`.

~~~bash
python -m pip install -r requirements.txt
streamlit run Home.py
~~~

## Ressources de base

Téléchargez les ressources de base via l’application ou Hugging Face. Ajoutez séparément le checkpoint de voix. Consultez les instructions officielles en cas de problème avec FFmpeg ou eSpeak. Le dépôt propose aussi un notebook Colab et un fichier Docker Compose qui demande le GPU NVIDIA 0. Pour les périphériques audio de votre ordinateur, commencez en local.

[Colab](https://colab.research.google.com/github/SayanoAI/RVC-Studio/blob/main/RVC_Studio.ipynb) · [FFmpeg / eSpeak](https://github.com/SayanoAI/RVC-Studio/blob/main/dist/README.md)

[→ Première reprise](usage.md)
