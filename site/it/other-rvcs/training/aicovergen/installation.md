# AICoverGen · Installazione

[GitHub](https://github.com/SociallyIneptWeeb/AICoverGen)

!!!warning Software datato · Sconsigliato
**AICoverGen** è una pipeline datata per cover con RVC v2, non più mantenuta attivamente e basata su dipendenze dell’era Python 3.9+. Per una nuova installazione, scegli un’app ancora mantenuta. [Guide per app](../../app-guides.md)
!!!

## Cosa fa AICoverGen

AICoverGen è una pipeline automatizzata con WebUI e CLI per generare cover musicali AI usando modelli vocali **RVC v2** già pronti. A partire da un link YouTube o da un file audio locale, separa la voce principale dalla base strumentale con MDX-Net, converte la voce con il tuo file `.pth` (e l’eventuale `.index`), applica effetti e riverbero e ricostruisce il brano finale. Non addestra nuovi modelli RVC: utilizza file di inferenza RVC v2 esistenti.

## Prerequisiti

- **Python 3.9+** (consigliato Python 3.10)
- **GPU NVIDIA con CUDA** consigliata per tempi di elaborazione adeguati
- **FFmpeg** e **SoX (`sox`)** installati e presenti nel `PATH` di sistema

## Installazione locale

Clona il repository, installa le dipendenze Python, scarica i modelli base richiesti (MDX-Net per la separazione vocale e HuBERT base) e avvia la WebUI Gradio (di default su `http://127.0.0.1:7860`):

~~~bash
git clone https://github.com/SociallyIneptWeeb/AICoverGen.git
cd AICoverGen
pip install -r requirements.txt
python src/download_models.py
python src/webui.py
~~~

Il comando `python src/download_models.py` scarica automaticamente i pesi MDX-Net e il modello HuBERT necessari prima della prima generazione.

## Google Colab

Se il computer non dispone di una GPU NVIDIA adatta, il repository include il notebook ufficiale (`AICoverGen_colab.ipynb`) per installare le dipendenze di sistema (incluso `sox`), scaricare i modelli base e avviare l’interfaccia Gradio su GPU cloud.

[Uso e risoluzione dei problemi](usage.md)
