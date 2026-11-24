# rvc-cli · Installazione

[GitHub](https://github.com/blaisewf/rvc-cli) · [Versione consultata](https://github.com/blaisewf/rvc-cli/releases/tag/1.2.4)

!!!warning Software datato · Sconsigliato
Questi progetti sono datati e non risultano più mantenuti attivamente. rvc-cli è archiviato e i rami principali di RVC Studio e Mangio RVC Fork sono fermi da anni. Le guide restano disponibili per chi lavora su progetti esistenti. Per una nuova installazione, scegli un’app ancora mantenuta. [Guide per app](../app-guides.md)
!!!

## Versione e ambito

Questa guida riguarda **blaisewf/rvc-cli 1.2.4**. Il repository dichiara il progetto non più mantenuto e rimanda ad Applio per la CLI aggiornata. Usa una cartella e un ambiente Python separati per i progetti storici. Lo strumento offre comandi per inferenza da file, conversione di cartelle e training.

## Windows con install.bat

Estrai il sorgente del tag, apri un terminale nella cartella principale ed esegui `install.bat`. Usa Miniconda per creare un ambiente Python 3.9 in `env/` e installa le wheel PyTorch per CUDA 12.1. Attendi la fine. Poi usa l’interprete dell’ambiente. Lo script effettivo è `rvc_cli.py`.

~~~powershell
.\install.bat
.\env\python.exe rvc_cli.py -h
.\env\python.exe rvc_cli.py prerequisites -h
~~~

## Linux con un ambiente virtuale

Lo script `install.sh` del tag crea `venv/` con il `python3` disponibile. Usa Python 3.9 come indicato dal README della release e attiva l’ambiente nella shell corrente dopo l’installazione. Leggi `prerequisites -h` e prepara i file necessari prima della prima conversione. Un modulo mancante spesso indica un interprete diverso o un’installazione incompleta.

~~~bash
bash install.sh
source venv/bin/activate
python rvc_cli.py -h
python rvc_cli.py prerequisites -h
~~~

[Uso e risoluzione dei problemi](usage.md)
