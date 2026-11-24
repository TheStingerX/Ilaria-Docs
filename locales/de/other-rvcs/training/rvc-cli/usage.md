---
label: "Nutzung und Fehlerbehebung"
icon: ":keyboard:"
order: 98
permalink: /ilaria-rvc/rvc-cli/usage/
---

# rvc-cli · Nutzung und Fehlerbehebung

[GitHub](https://github.com/blaisewf/rvc-cli) · [Geprüfte Version](https://github.com/blaisewf/rvc-cli/releases/tag/1.2.4)

!!!warning Veraltete Software · Nicht empfohlen
**rvc-cli** ist auf GitHub archiviert und wird nicht mehr gepflegt. Die Software ist veraltet und für Neuinstallationen nicht empfohlen. [Anleitungen nach Anwendung](../../app-guides.md)
!!!

## Einzeldatei und Ordner

Beginne mit einer kurzen WAV, einem exportierten Inferenz-`.pth` und dem passenden Index. Der Parser von 1.2.4 verlangt `--index_path`; `--index_rate 0` deaktiviert Retrieval. Verwende für Ordner `batch_infer` mit `--input_folder` und `--output_folder`. Teste zuerst wenige Dateien in einem getrennten Zielordner. Aktiviere die passende Umgebung. Unter Windows kannst du `python` durch `.\env\python.exe` ersetzen.

~~~bash
python rvc_cli.py infer --input_path "input.wav" --output_path "output.wav" --pth_path "voice.pth" --index_path "voice.index" --f0_method rmvpe --pitch 0 --index_rate 0
python rvc_cli.py batch_infer -h
~~~

## Trainingsschritte

Nutze `preprocess` für die Daten, `extract` für Pitch und Merkmale, `train` für Gewichte und `index` für den optionalen Retrieval-Index. Behalte Modellname und kompatible Einstellungen für Rate, RVC-Version, Embedder und Pitch bei. Lies jeweils die Hilfe. Prüfe bei unerwarteter Wiederaufnahme den Experimentnamen. Bei Ladefehlern unterscheide Inferenzexporte von Trainingscheckpoints.

~~~bash
python rvc_cli.py preprocess -h
python rvc_cli.py extract -h
python rvc_cli.py train -h
python rvc_cli.py index -h
~~~

[Installation](installation.md)
