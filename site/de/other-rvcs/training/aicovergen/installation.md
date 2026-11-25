# AICoverGen · Installation

[GitHub](https://github.com/SociallyIneptWeeb/AICoverGen)

!!!warning Veraltete Software · Nicht empfohlen
**AICoverGen** ist eine ältere RVC-v2-Pipeline für Song-Cover, die nicht mehr aktiv gepflegt wird und auf Abhängigkeiten aus der Zeit von Python 3.9+ basiert. Wähle für eine Neuinstallation eine aktiv gepflegte Anwendung. [Anleitungen nach Anwendung](../../app-guides.md)
!!!

## Was AICoverGen macht

AICoverGen ist eine automatisierte WebUI- und CLI-Pipeline zur Erstellung von KI-Song-Covern mit vorhandenen **RVC-v2**-Stimmmodellen. Ausgehend von einem YouTube-Link oder einer lokalen Audiodatei trennt es die Hauptstimme per MDX-Net vom Instrumental, konvertiert den Gesang mit deinem `.pth`-Modell (und optionaler `.index`-Datei), wendet Mischung sowie Hall an und setzt den Track wieder zusammen. Es trainiert keine neuen Modelle, sondern nutzt vorhandene RVC-v2-Inferenzdateien.

## Voraussetzungen

- **Python 3.9+** (Python 3.10 empfohlen)
- **NVIDIA-GPU mit CUDA** empfohlen für akzeptable Konvertierungszeiten
- **FFmpeg** und **SoX (`sox`)** installiert und im System-`PATH` verfügbar

## Lokale Installation

Klone das Repository, installiere die Python-Abhängigkeiten, lade die benötigten Basismodelle (MDX-Net-Separation und HuBERT-Basismodell) herunter und starte die Gradio-WebUI (standardmäßig unter `http://127.0.0.1:7860`):

~~~bash
git clone https://github.com/SociallyIneptWeeb/AICoverGen.git
cd AICoverGen
pip install -r requirements.txt
python src/download_models.py
python src/webui.py
~~~

`python src/download_models.py` lädt die für die erste Cover-Erzeugung benötigten MDX-Net- und HuBERT-Gewichte automatisch herunter.

## Google Colab

Wenn dein Rechner keine geeignete NVIDIA-GPU besitzt, enthält das Repository das offizielle Notebook (`AICoverGen_colab.ipynb`), um Systemabhängigkeiten (einschließlich `sox`) zu installieren, Basisgewichte herunterzuladen und die Gradio-Oberfläche auf einer Cloud-GPU zu starten.

[Nutzung und Fehlerbehebung](usage.md)
