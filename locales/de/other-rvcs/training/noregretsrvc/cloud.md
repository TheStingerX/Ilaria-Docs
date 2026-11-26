---
label: "Cloud"
icon: ":cloud:"
order: 97
permalink: /ilaria-rvc/noregretsrvc/cloud/
---

# NoRegretsRVC · Cloud

NoRegretsRVC Beta 0.0 bereitet Applio-Workflows in einer Weboberfläche vor und erzeugt Notebooks.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Kaggle notebook](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/NoRegretsRVC_Kaggle.ipynb)

## Kaggle

Exportiere die `.ipynb`-Datei und importiere sie in ein privates Kaggle-Notebook. Prüfe die Zellen. Aktiviere GPU und bei Downloads Internet. Starte mit der Einrichtung und prüfe den Datenpfad.

Schütze Zugangsdaten und Tunneladresse. Lade das Modell und Checkpoints herunter, bevor du die Sitzung beendest.

[Kaggle](https://www.kaggle.com/code)

## Ressourcen und Wiederherstellung auf Kaggle

Die WebUI erkennt Datensätze in `/kaggle/input`. Dual-T4-Parität soll ab Batchgröße 4 und unter 300 Epochen die Applio-Optimierungsschritte erhalten. Turbo ist optional. Die Vorprüfung sucht WAV, `.npy` und `filelist.txt`. Die Zeitprognose nutzt die Browseruhr. Prüfe die exportierte `.pth` und sichere die Checkpoints zur Wiederaufnahme.

[Installation](installation.md) · [Nutzung](usage.md)
