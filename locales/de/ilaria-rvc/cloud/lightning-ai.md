---
label: "Lightning AI Studio"
icon: ":zap:"
order: 96
permalink: /ilaria-rvc/lightning-ai/
description: "Bereite eine kurze, saubere WAV-Datei, ein passendes Inferenzmodell und bei Bedarf eine Sicherung des Trainingsdatensatzes vor."
---
# Lightning AI Studio

[Notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-LightningAI.ipynb) · [Lightning AI Studio](https://lightning.ai/)

## Vor dem Start

Bereite eine kurze, saubere WAV-Datei, ein passendes Inferenzmodell und bei Bedarf eine Sicherung des Trainingsdatensatzes vor.

1. Erstelle ein GPU-Studio und öffne das hochgeladene Notebook in JupyterLab.
2. Führe die Zellen 1 bis 4 aus, um GPU, Abhängigkeiten und Modellgewichte einzurichten und die Oberfläche zu starten.
### Credits, Gratis-Tarif und GPU-Verfügbarkeit

Lightning AI nutzt ein **Credit-System** (1 Credit =  USD pro Sekunde; siehe [Lightning AI Preise](https://lightning.ai/pricing)):

- **Gratis-Tarif:** Enthält **ein kostenloses 4-CPU-Studio** (bis zu 4 Std. am Stück vor Neustart) und **10 GB freien Speicher**.
- **Startguthaben vs. Bezahl-Tarife:** Neue Konten erhalten meist Start-Credits nach Verifizierung (keine monatlich erneuerten Gratis-GPU-Stunden). **Pro**-Tarife enthalten monatliche Credits.
- **Guthaben & GPUs prüfen:** Prüfe dein Guthaben im Studio-Dashboard und richte die Umgebung zuerst im kostenlosen CPU-Studio ein.

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
