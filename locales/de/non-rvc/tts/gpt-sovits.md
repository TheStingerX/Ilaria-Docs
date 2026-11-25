---
label: "GPT-SoVITS"
icon: ":studio_microphone:"
order: 97
permalink: /non-rvc/tts/gpt-sovits/
---

# GPT-SoVITS

## Arbeitsablauf wählen

Beginne mit Zero-Shot-Synthese aus einer Referenzaufnahme, ihrem Transkript und einem neuen Satz. Für das Fine-Tuning brauchst du beschriftete Clips. Es entstehen GPT- und SoVITS-Gewichte. Nutze Stimmen mit Erlaubnis und wähle Gewichte aus derselben Modellfamilie.

## WebUI installieren und starten

Entpacke unter Windows das im offiziellen Repository verlinkte Komplettpaket vollständig und starte `go-webui.bat`, falls vorhanden. Öffne die lokale Adresse aus dem Terminal und lasse den Prozess laufen. Für Quellcode nutze eine Conda-Umgebung mit Python 3.10 und das zur Version passende Installationsskript. Windows bietet CUDA oder CPU, Linux zusätzlich ROCm und macOS MPS oder CPU. Behalte die Unterordner unter `GPT_SoVITS/pretrained_models` bei und prüfe bei Bedarf FFmpeg.

## Ersten Satz erzeugen

1. Öffne **1C-inference**, aktualisiere bei Bedarf die Modellpfade und starte die TTS-Oberfläche.
2. Wähle kompatible GPT- und SoVITS-Gewichte. Nimm einen kurzen Clip mit einer Stimme ohne Musik. Ältere Oberflächen erwarten 3 bis 10 Sekunden. Maßgeblich ist die Angabe deiner Version.
3. Gib das genaue Transkript und seine Sprache an. Trage den zu erzeugenden Text und dessen Sprache separat ein.
4. Erzeuge einen kurzen Satz und achte auf Anfang, Ende und Pausen. Teile längere Texte und ändere jeweils nur eine Einstellung.

## Datensatz vorbereiten

1. Behalte die Originale und lege Testsätze beiseite. Teste **Audio Slicer** mit wenigen Clips und kontrolliere die Schnittstellen.
2. Wähle die geschnittenen Clips und die passende Sprache für die automatische Transkription. Öffne die erzeugte `.list` im Annotationseditor und korrigiere die Texte.
3. Prüfe die Dateipfade und speichere die Korrekturen vor dem Formatieren.

~~~text
audio/clip01.wav|speaker01|en|This is the first recording.
~~~

## Formatieren und trainieren

1. Wähle in **1A-Dataset formatting** Modellfamilie, Experimentname und die geprüfte `.list`. Kontrolliere das Protokoll auf fehlende Dateien.
2. Nutze in **1B-Fine-tuned training** dasselbe Experiment für SoVITS und GPT. Trainiere auf einer GPU nacheinander und beginne mit Standardeinstellungen und deaktiviertem DPO.
3. Aktualisiere die Modellliste und vergleiche Checkpoints mit separaten Testsätzen. Sichere GPT `.ckpt`, SoVITS `.pth`, Version und Annotationen gemeinsam.

## Fehlerbehebung

Öffnet sich die Seite nicht, kontrolliere das Terminal. Fehlen Gewichte, prüfe Ordner und Modellfamilie. Bei Wiederholungen prüfe das Transkript und teile lange Sätze. Bei zu wenig VRAM reduziere die Batchgröße und starte die Phasen einzeln.

[GitHub · RVC-Boss](https://github.com/RVC-Boss/GPT-SoVITS)
