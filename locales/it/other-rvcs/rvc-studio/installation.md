---
label: "Installazione"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/rvc-studio/installation/
---

# RVC Studio · Installazione

[GitHub](https://github.com/SayanoAI/RVC-Studio) · [Hugging Face](https://huggingface.co/datasets/SayanoAI/RVC-Studio/tree/main) · [`91c4011`](https://github.com/SayanoAI/RVC-Studio/tree/91c40119b9ff209eba23debdb0871931b9fd8127)

!!!warning Software datato · Sconsigliato
Questi progetti sono datati e non risultano più mantenuti attivamente. rvc-cli è archiviato e i rami principali di RVC Studio e Mangio RVC Fork sono fermi da anni. Le guide restano disponibili per chi lavora su progetti esistenti. Per una nuova installazione, scegli un’app ancora mantenuta. [Guide per app](../app-guides.md)
!!!

RVC Studio di SayanoAI è una WebUI Streamlit per addestrare modelli vocali e creare cover a partire da registrazioni. I passaggi si riferiscono alla revisione GitHub indicata qui sopra. Il progetto descrive il ramo principale come sperimentale.

## Configurazione

Su Windows estrai il sorgente in una cartella dedicata e avvia `conda-installer.bat`. Se Miniconda è già presente, prova `conda-start.bat`. Il launcher crea un ambiente Python 3.10 quando serve, installa le dipendenze e avvia Streamlit. Apri l’indirizzo locale mostrato nel terminale. Per l’installazione manuale, attiva un ambiente separato e lancia i comandi qui sotto dalla cartella che contiene `Home.py`.

~~~bash
python -m pip install -r requirements.txt
streamlit run Home.py
~~~

## Modelli di base

Scarica i modelli di base dall’app o dal dataset ufficiale su Hugging Face. Il checkpoint della voce che vuoi usare va aggiunto separatamente. Per errori di FFmpeg o eSpeak, consulta le istruzioni ufficiali sugli strumenti inclusi. Il repository offre anche un notebook Colab e un file Docker Compose configurato per richiedere la GPU NVIDIA 0. Per usare le periferiche audio collegate al tuo PC parti dall’installazione locale.

[Colab](https://colab.research.google.com/github/SayanoAI/RVC-Studio/blob/main/RVC_Studio.ipynb) · [FFmpeg / eSpeak](https://github.com/SayanoAI/RVC-Studio/blob/main/dist/README.md)

[→ Prima cover](usage.md)
