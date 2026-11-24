# rvc-cli · Installation

[GitHub](https://github.com/blaisewf/rvc-cli) · [Version consultée](https://github.com/blaisewf/rvc-cli/releases/tag/1.2.4)

!!!warning Logiciels anciens · Déconseillés
**rvc-cli** est archivé sur GitHub et n’est plus maintenu. Ce logiciel est ancien et déconseillé pour une nouvelle installation. [Guides par application](../app-guides.md)
!!!

## Version et périmètre

Ce guide concerne **blaisewf/rvc-cli 1.2.4**. Le dépôt indique qu’il n’est plus maintenu et renvoie à Applio pour la CLI maintenue. Utilisez un dossier et un environnement Python distincts. L’outil propose l’inférence sur fichier, le traitement par lots et l’entraînement.

## Windows avec install.bat

Extrayez le code du tag, ouvrez un terminal à la racine et lancez `install.bat`. Il crée avec Miniconda un environnement Python 3.9 dans `env/` et installe PyTorch pour CUDA 12.1. Attendez la fin, puis utilisez l’interpréteur de cet environnement. Le fichier s’appelle `rvc_cli.py`.

~~~powershell
.\install.bat
.\env\python.exe rvc_cli.py -h
.\env\python.exe rvc_cli.py prerequisites -h
~~~

## Linux avec un environnement virtuel

Le script `install.sh` du tag crée `venv/` avec le `python3` disponible. Utilisez Python 3.9 comme le recommande le README et activez l’environnement dans le terminal courant. Consultez `prerequisites -h` et installez les ressources nécessaires. Si un module manque, vérifiez l’interpréteur et l’installation.

~~~bash
bash install.sh
source venv/bin/activate
python rvc_cli.py -h
python rvc_cli.py prerequisites -h
~~~

[Utilisation et dépannage](usage.md)
