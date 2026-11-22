---
label: "Google Colab"
icon: ":tangerine:"
order: 97
permalink: /ilaria-rvc/colab/
description: "Führe Ilaria RVC im Browser mit einer von der Cloud-Plattform bereitgestellten GPU aus. Wähle unten ein Notebook. Aktiviere vor dem Ausführen der ersten Zelle einen NVIDIA-Beschleuniger."
---
# Google Colab

[Notebook öffnen · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb) · [Google Colab](https://colab.research.google.com/github/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb)

Führe Ilaria RVC im Browser mit einer von der Cloud-Plattform bereitgestellten GPU aus. Wähle unten ein Notebook. Aktiviere vor dem Ausführen der ersten Zelle einen NVIDIA-Beschleuniger.

## Bevor du startest

Bereite eine kurze, saubere WAV-Datei und ein kompatibles Inferenzmodell vor. Für das Training bewahre das Original-Dataset und einige separate Testclips auf deinem eigenen Computer auf. Das Notebook läuft auf einer entfernten Linux-Maschine.

### Limits, Compute Units und Richtlinien von Google Colab

Bevor du einen langen Lauf startest, verstehe, wie [Google Colab](https://research.google.com/colaboratory/faq.html) Ressourcen verwaltet:

- **Kostenlose Stufe vs. Bezahl-Tarife (Compute Units):** Die kostenlose Stufe von Colab bietet GPUs nach Verfügbarkeit, aber Laufzeitlänge, Inaktivitäts-Timeouts und GPU-Typ (z. B. T4) sind dynamisch und niemals garantiert. Bezahl-Tarife (**Colab Pro**, **Pro+** und **Pay As You Go**) verbrauchen **Compute Units** dynamisch je nach gewählter GPU/TPU; ist dein Guthaben aufgebraucht, fällt das Konto auf die Limits der kostenlosen Stufe zurück.
- **Unzulässige Aktivitäten & WebUI-Einschränkungen:** Googles Richtlinie zu [Unzulässigen Aktivitäten](https://research.google.com/colaboratory/faq.html#disallowed-activities) verbietet das Hosten von Dateien, das Bereitstellen öffentlicher Web-Apps ohne Bezug zu interaktivem Computing, Remote-Proxys, das Umgehen von Sicherheits-/Zugriffslimits, Mehrfachkonten zur Kontingent-Umgehung sowie Deepfakes. Interaktive Gradio-Notebooks sind zwar nicht pauschal in jedem Fall verboten, doch dauerhafte öffentliche WebUI-Tunnel in der kostenlosen Stufe führen häufig zu Laufzeitabbrüchen oder Richtlinienwarnungen.
- **Verbindungsabbrüche, Speichern & Datenschutz:** Colab kann inaktive oder lange Sitzungen trennen und den lokalen VM-Speicher löschen. Exportiere deine Ergebnisse (`EXPORT = True`) oder synchronisiere wichtige Checkpoints regelmäßig nach Google Drive, und lade niemals vertrauliche Audiodateien oder Zugangsdaten in öffentliche oder geteilte Notebooks hoch.
- **Alternativen:** Wenn Colab abbricht oder keine GPU verfügbar ist, nutze [Kaggle](kaggle.md) (kostenloses wöchentliches GPU-Kontingent nach Telefonverifizierung) oder [Lightning AI Studio](lightning-ai.md).

## Auf Google Colab ausführen

1. In Colab öffnen und eine GPU-Laufzeit auswählen.
2. Zellen 1-4 der Reihe nach ausführen. Sie prüfen die GPU, installieren Abhängigkeiten, laden Basisgewichte herunter und starten die Web UI. Setze `TRAINING_SAMPLE_RATES` auf `[]` für reine Inferenz oder wähle die Abtastraten für dein geplantes Training.
3. Öffne die eingebettete Ansicht, die von der Startzelle erzeugt wird. Halte die Laufzeit verbunden.

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
