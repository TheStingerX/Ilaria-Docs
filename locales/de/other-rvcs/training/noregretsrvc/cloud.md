---
label: "Cloud"
icon: ":cloud:"
order: 97
permalink: /ilaria-rvc/noregretsrvc/cloud/
---

# NoRegretsRVC · Cloud

NoRegretsRVC Beta 0.1.0 bereitet Applio-Workflows in einer Weboberfläche vor und erzeugt Notebooks.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Changelog](version-history.md) · [Kaggle notebook](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/NoRegretsRVC_Kaggle.ipynb)

## Kaggle

Exportiere die `.ipynb`-Datei und importiere sie in ein privates Kaggle-Notebook. Prüfe die Zellen. Aktiviere GPU und bei Downloads Internet. Starte mit der Einrichtung und prüfe den Datenpfad.

Schütze Zugangsdaten und Tunneladresse. Lade das Modell und Checkpoints herunter, bevor du die Sitzung beendest.

[Kaggle](https://www.kaggle.com/code)

## Ressourcen und Wiederherstellung auf Kaggle

Die WebUI erkennt Datensätze in `/kaggle/input`. Turbo ist optional. Die Vorprüfung sucht WAV, `.npy` und `filelist.txt`. Die Zeitprognose nutzt die Browseruhr. Prüfe die exportierte `.pth` und sichere die Checkpoints zur Wiederaufnahme.

## Dual T4 und effektive Batchgröße

Beta 0.1.0 entfernt den Applio-Paritätsschalter für eine GPU. Bei zwei GPUs werden aus 2 oder 4 pro GPU effektiv 4 oder 8.

Ohne erkannten Datensatz bleibt der Pfad leer. Die ETA filtert Aufwärm- und Speicherzeiten. Die Anzeige korrigiert die Epochenzahl und doppelte Speichermarker. Interne `.nr_*`-Dateien liegen außerhalb von `logs/`.

[Installation](installation.md) · [Nutzung](usage.md)
