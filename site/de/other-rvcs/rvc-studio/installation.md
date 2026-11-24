# RVC Studio · Installation

[GitHub](https://github.com/SayanoAI/RVC-Studio) · [Hugging Face](https://huggingface.co/datasets/SayanoAI/RVC-Studio/tree/main) · [`91c4011`](https://github.com/SayanoAI/RVC-Studio/tree/91c40119b9ff209eba23debdb0871931b9fd8127)

!!!warning Veraltete Software · Nicht empfohlen
Diese Projekte sind veraltet und werden offenbar nicht mehr aktiv gepflegt. rvc-cli ist archiviert, und die Hauptbranches von RVC Studio und Mangio RVC Fork sind seit Jahren inaktiv. Die Anleitungen bleiben für bestehende Projekte verfügbar. Wähle für eine Neuinstallation eine aktiv gepflegte Anwendung. [Anleitungen nach Anwendung](../app-guides.md)
!!!

RVC Studio von SayanoAI ist eine Streamlit-Oberfläche für Stimmtraining und Covers aus vorhandenen Aufnahmen. Diese Schritte beziehen sich auf die verlinkte Revision. Der Hauptbranch gilt laut Projekt als experimentell.

## Einrichtung

Entpacke unter Windows den Quellcode und starte `conda-installer.bat`. Ist Miniconda bereits installiert, verwende `conda-start.bat`. Der Launcher erstellt bei Bedarf eine Python-3.10-Umgebung, installiert die Abhängigkeiten und startet Streamlit. Öffne die lokale Adresse. Für die manuelle Installation aktiviere eine eigene Umgebung und führe die Befehle im Ordner mit `Home.py` aus.

~~~bash
python -m pip install -r requirements.txt
streamlit run Home.py
~~~

## Basisressourcen

Lade die Basisressourcen über die Anwendung oder Hugging Face. Füge den Stimmcheckpoint separat hinzu. Bei FFmpeg- oder eSpeak-Fehlern helfen die Anweisungen im Repository. Es gibt auch ein Colab-Notebook und eine Docker-Compose-Datei, die NVIDIA-GPU 0 anfordert. Für angeschlossene Audiogeräte beginne mit einer lokalen Installation.

[Colab](https://colab.research.google.com/github/SayanoAI/RVC-Studio/blob/main/RVC_Studio.ipynb) · [FFmpeg / eSpeak](https://github.com/SayanoAI/RVC-Studio/blob/main/dist/README.md)

[→ Erstes Cover](usage.md)
