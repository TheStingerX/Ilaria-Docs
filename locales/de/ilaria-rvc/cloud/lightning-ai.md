---
label: "Lightning AI Studio"
icon: ":zap:"
order: 96
permalink: /de/ilaria-rvc/lightning-ai/
description: "Führe Ilaria RVC im Browser mit einer von der Cloud-Plattform bereitgestellten GPU aus. Wähle unten ein Notebook. Aktiviere vor dem Ausführen der ersten Zelle einen NVIDIA-Beschleuniger."
---
# Lightning AI Studio

[Notebook öffnen · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-LightningAI.ipynb) · [Lightning AI Studio](https://lightning.ai/)

Führe Ilaria RVC im Browser mit einer von der Cloud-Plattform bereitgestellten GPU aus. Wähle unten ein Notebook. Aktiviere vor dem Ausführen der ersten Zelle einen NVIDIA-Beschleuniger.

## Bevor du startest

Bereite eine kurze, saubere WAV-Datei und ein kompatibles Inferenzmodell vor. Für das Training bewahre das Original-Dataset und einige separate Testclips auf deinem eigenen Computer auf. Das Notebook läuft auf einer entfernten Linux-Maschine.

### Credits, Gratis-Tarif und GPU-Verfügbarkeit

Lightning AI nutzt ein **creditbasiertes Abrechnungsmodell** (`1 Credit = $1 USD`, sekundengenau für GPU-Rechenzeit abgerechnet; siehe [Lightning AI Preise](https://lightning.ai/pricing)):

- **Gratis-Tarif:** Enthält **ein kostenloses 4-CPU-Studio** (bis zu 4 Stunden am Stück vor einem Neustart) sowie **10 GB kostenlosen Speicher** (Speicher über 10 GB wird monatlich abgerechnet).
- **Startguthaben vs. Bezahl-Tarife:** Neue Konten erhalten nach Registrierung/Verifizierung üblicherweise ein Startguthaben (keine monatlich erneuerten Gratis-GPU-Stunden). Bezahlte **Pro**-Abos bieten ein monatliches Credit-Kontingent.
- **Guthaben und GPUs prüfen:** Öffne dein Studio-Dashboard bzw. Abrechnungspanel, um dein verbleibendes Credit-Guthaben vor dem Start einer GPU-Instanz zu prüfen, und bedenke, dass bestimmte GPU-Typen (wie T4, L4 oder L40) der regionalen und kontospezifischen Verfügbarkeit unterliegen. Führe die Einrichtung der Abhängigkeiten zuerst im kostenlosen CPU-Studio durch und wechsle erst dann zur GPU, wenn du bereit für Inferenz oder Training bist.

## Auf Lightning AI Studio ausführen

1. Erstelle ein GPU Studio, lade das Notebook hoch und öffne es in JupyterLab.
2. Führe die Zellen 1-4 der Reihe nach aus. Sie prüfen die GPU, installieren Abhängigkeiten, laden Basisgewichte herunter und starten die Web UI. Setze `TRAINING_SAMPLE_RATES` auf `[]` für reine Inferenz oder wähle die Abtastraten für dein geplantes Training.
3. Öffne den **Port viewer** in deinem Studio und wähle den von der Startzelle ausgegebenen Port (`7865` standardmäßig). Halte den Port privat.

## Jede Zelle vor dem Fortfahren prüfen

Die GPU-Prüfung muss ein NVIDIA-Gerät erkennen. Falls nicht, wechsle zuerst den Beschleuniger. Warte, bis die Installation der Abhängigkeiten abgeschlossen ist, bevor du Gewichte lädst. Setze `TRAINING_SAMPLE_RATES = []` für reine Inferenz. Für das Training wähle die Abtastrate passend zu Modell und Pretrained-Paar. Lasse `DOWNLOAD_FCPE` aktiviert, wenn du FCPE nutzen willst.

{{ include "kaggle.md#cloud-inference-dataset" }}

{{ include "kaggle.md#cloud-training" }}

## Exportieren und stoppen

Setze `EXPORT = True` und führe die Export-Zelle aus. Aktiviere `INCLUDE_CHECKPOINTS`, wenn du das Training fortsetzen musst. Speichere das ZIP lokal, bevor du die Sitzung beendest, und führe dann die Stopp-Zelle mit `STOP = True` aus.

## Wenn der Start fehlschlägt

Wenn die erste Zelle die GPU nicht erkennt, prüfe deinen Beschleuniger und führe sie erneut aus. Öffnet sich die Oberfläche nicht, lies die Ausgabe der Startzelle, bestätige dass der Server bereit ist und öffne die Ansicht neu.

### Ausgabe-ZIP prüfen

Prüfe bei Inferenz deine exportierte WAV-Datei und Modelldateien. Für das Training aktiviere `INCLUDE_CHECKPOINTS`, um die Experiment-Logs einzuschließen, und prüfe das Archiv vor dem Schließen der Sitzung. Bewahre das Original-Dataset getrennt auf.

## Häufige Probleme beheben

Schlägt die Installation fehl, lies den ersten Fehler und führe die fehlgeschlagene Zelle nach der Behebung erneut aus. Öffnet sich die App, aber dein Modell fehlt, prüfe das Import-Log und aktualisiere die Liste. Bei Fehlern wegen vollem Speicher (OOM) beginne mit einem kürzeren Clip oder senke die Trainings-Batch-Size. Schließt sich die Web UI, öffne sie über dieselbe Startzelle oder denselben Port erneut, solange die Sitzung noch aktiv ist.

[Ilaria RVC in der Cloud](cloud.md)
