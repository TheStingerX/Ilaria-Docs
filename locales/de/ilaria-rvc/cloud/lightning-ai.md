---
label: "Lightning AI Studio"
icon: ":zap:"
order: 96
permalink: /ilaria-rvc/lightning-ai/
---
# Lightning AI Studio

[Notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-LightningAI.ipynb) · [Lightning AI Studio](https://lightning.ai/)

## Vor dem Start

Bereite eine kurze, saubere WAV-Datei, ein passendes Inferenzmodell und bei Bedarf eine Sicherung des Trainingsdatensatzes vor.

1. Erstelle ein GPU-Studio und öffne das hochgeladene Notebook in JupyterLab.
2. Führe die Zellen 1 bis 4 aus, um GPU, Abhängigkeiten und Modellgewichte einzurichten und die Oberfläche zu starten.
3. Öffne in **Port viewer** den angezeigten Port (Standard 7865) und halte ihn privat.

## Zellen überprüfen

Prüfe, ob die erste Zelle eine NVIDIA-GPU erkennt. Warte auf die Installation. Für reine Inferenz setze `TRAINING_SAMPLE_RATES = []`. Behalte `DOWNLOAD_FCPE` für FCPE bei.

{{ include "kaggle.md#cloud-inference-dataset" }}

{{ include "kaggle.md#cloud-training" }}

## Exportieren und beenden

Setze `EXPORT = True` und bei Bedarf `INCLUDE_CHECKPOINTS`. Lade das ZIP herunter, bevor du `STOP = True` ausführst.

### ZIP prüfen

Prüfe WAV und Modell im Export. Aktiviere `INCLUDE_CHECKPOINTS` zum Fortsetzen des Trainings und sichere den Originaldatensatz getrennt.

## Fehler beheben

Lies die erste Fehlermeldung und wiederhole die Zelle nach der Korrektur. Fehlt das Modell, prüfe das Importprotokoll. Verkleinere bei GPU-Speichermangel den Batch.

[Ilaria RVC in der Cloud](cloud.md)
