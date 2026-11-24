# rvc-cli · Installation

[GitHub](https://github.com/blaisewf/rvc-cli) · [Geprüfte Version](https://github.com/blaisewf/rvc-cli/releases/tag/1.2.4)

!!!warning Veraltete Software · Nicht empfohlen
**rvc-cli** ist auf GitHub archiviert und wird nicht mehr gepflegt. Die Software ist veraltet und für Neuinstallationen nicht empfohlen. [Anleitungen nach Anwendung](../app-guides.md)
!!!

## Version und Umfang

Diese Anleitung behandelt **blaisewf/rvc-cli 1.2.4**. Laut Repository wird es nicht mehr gepflegt. Die gepflegte CLI befindet sich bei Applio. Verwende für alte Projekte einen eigenen Ordner und eine eigene Python-Umgebung. Das Tool bietet Datei-Inferenz, Stapelverarbeitung und Training.

## Windows mit install.bat

Entpacke den Quellcode des Tags, öffne ein Terminal im Projektordner und starte `install.bat`. Miniconda erstellt eine Python-3.9-Umgebung in `env/` und installiert PyTorch-Wheels für CUDA 12.1. Warte auf den Abschluss und nutze danach den Interpreter der Umgebung. Das Skript heißt `rvc_cli.py`.

~~~powershell
.\install.bat
.\env\python.exe rvc_cli.py -h
.\env\python.exe rvc_cli.py prerequisites -h
~~~

## Linux mit virtueller Umgebung

Das Tag-Skript `install.sh` erstellt `venv/` mit dem verfügbaren `python3`. Nutze wie im README empfohlen Python 3.9 und aktiviere die Umgebung im aktuellen Terminal. Prüfe `prerequisites -h` und installiere die benötigten Dateien. Bei fehlenden Modulen prüfe Interpreter und Installation.

~~~bash
bash install.sh
source venv/bin/activate
python rvc_cli.py -h
python rvc_cli.py prerequisites -h
~~~

[Nutzung und Fehlerbehebung](usage.md)
