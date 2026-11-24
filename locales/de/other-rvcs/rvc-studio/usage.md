---
label: "Nutzung und Fehlerbehebung"
icon: ":headphones:"
order: 98
permalink: /ilaria-rvc/rvc-studio/usage/
---

# RVC Studio · Nutzung und Fehlerbehebung

[GitHub](https://github.com/SayanoAI/RVC-Studio) · [Hugging Face](https://huggingface.co/datasets/SayanoAI/RVC-Studio/tree/main) · [`91c4011`](https://github.com/SayanoAI/RVC-Studio/tree/91c40119b9ff209eba23debdb0871931b9fd8127)

!!!warning Veraltete Software · Nicht empfohlen
Der Hauptbranch von **RVC Studio** ist seit Jahren inaktiv. Die Software ist veraltet und für Neuinstallationen nicht empfohlen. [Anleitungen nach Anwendung](../app-guides.md)
!!!

## Erstes Cover

Starte das Backend unter **RVC Server**. Öffne **Inference** und klicke nach dem Hinzufügen der Dateien auf **Refresh Data**. Wähle einen kurzen WAV-, FLAC-, OGG- oder MP3-Ausschnitt aus `songs/`. Lege den RVC-v2-Checkpoint in `models/RVC/` und den passenden Index, falls vorhanden, in `models/RVC/.index/` ab. Wähle Stimme und Gesangstrennung. Die zusätzliche Vorverarbeitung ist freiwillig. Klicke auf **Save Options** und **1-Click VC**. Fehlt die Stimme, prüfe den Ordner und aktualisiere die Liste.

## Eine Stimme trainieren

Wähle unter **Train** den Datenordner und einen Experimentnamen. Bereite die Daten vor, extrahiere Merkmale und starte das Training. Prüfe die Pretrains für Generator und Diskriminator. Erstelle den Index bei Bedarf separat. Ist ein Schritt deaktiviert, prüfe die Ausgaben des vorherigen Schritts. Vergleiche Checkpoints mit derselben Aufnahme.

## TTS und Live-Konvertierung

Wähle unter **Text to Speech** Synthese und RVC-Stimme. Höre zuerst einen kurzen Satz an, klicke auf **Convert Speech** und speichere das Ergebnis. Im Quellcode gibt es auch **Realtime Conversion**. Wähle Ein- und Ausgabegerät auf dem Rechner, auf dem die App läuft. Teste mit Kopfhörern, bevor du die Anwendung live einsetzt.

[← Einrichtung](installation.md)
