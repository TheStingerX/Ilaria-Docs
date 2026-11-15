---
label: "💿 Vonovox installieren"
order: 99
permalink: /ilaria-rvc/vonovox/installation/
---
# Vonovox installieren

Vonovox ist ein Windows Live-Sprachkonverter für unterstützte NVIDIA-GPUs. Verwenden Sie diese Anleitung, um einen sauberen lokalen Mikrofontest durchzuführen, bevor Sie Discord, OBS oder ein Spiel öffnen.

> **Neueste Beta im Download-Repository verfügbar** · [Vonovox 2.0.0 Beta 3 (ZIP) herunterladen](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

## 1. Sammeln Sie die Dateien und Geräte

- Öffnen Sie Windows **Task-Manager → Leistung** und identifizieren Sie die Grafikkarte anhand des Namens. Verwenden Sie die [offizielle Paketliste](https://huggingface.co/dr87/vonovox/tree/main), um bei Bedarf einen Build- oder hardwarespezifischen Patch aufzulösen. Bewahren Sie ältere funktionierende Builds in ihren eigenen Ordnern auf.
- Bereiten Sie einen inferenzbereiten RVC V2-Prüfpunkt vor und prüfen Sie, welchen Einbetter das Modell erwartet. Ein Trainingskontrollpunkt wie `G_*.pth` dient der Wiederaufnahme des Trainings. Wählen Sie für die erste Ausführung ein Modell mit bekannter Herkunft und führen Sie es ohne Index aus, sofern der Build dies bietet.
- Schließen Sie ein physisches Mikrofon und kabelgebundene Kopfhörer an. Schließen Sie andere Programme, die die ausschließliche Kontrolle über die Audiogeräte übernehmen könnten, und stellen Sie sicher, dass Windows Ihr Rohmikrofon aufzeichnen kann.

## 2. Starten Sie die App

1. Laden Sie die ZIP-Datei herunter, verwenden Sie dann **Alle extrahieren** und legen Sie das gesamte Paket in einem beschreibbaren lokalen Ordner wie `C:\VoiceTools\Vonovox` ab. Führen Sie Launcher aus dem extrahierten Ordner aus, mit den unterstützenden Dateien daneben.
2. Installieren Sie in der vom Entwickler dokumentierten Distribution die [Microsoft Visual C++ x64-Laufzeitumgebung](https://aka.ms/vs/16/release/vc_redist.x64.exe), führen Sie `setup.bat` und dann `start.bat` aus. Verwenden Sie den mitgelieferten Launcher für genau das Archiv, das Sie extrahiert haben. Der erste Start kann länger dauern, während Abhängigkeiten initialisiert werden.
3. Warten Sie auf die Schnittstelle. Wenn das Fenster sofort geschlossen wird, führen Sie denselben Launcher über eine geöffnete Eingabeaufforderung aus, damit der letzte Fehler sichtbar bleibt. Stellen Sie sicher, dass Sie das gesamte Archiv extrahiert und einen kompatiblen GPU-Build ausgewählt haben.
4. Wählen Sie im Modellbereich das RVC V2-Modell aus. Wählen Sie den erwarteten Einbetter aus, wenn er von der Benutzeroberfläche verfügbar gemacht wird. Beginnen Sie mit neutralen Tonhöhen- und Formant-Steuerelementen, standardmäßiger Blockgröße und deaktivierten optionalen Effekten.

## 3. Überprüfen Sie das erste Signal

Wählen Sie Ihr physisches Mikrofon als **Eingabegerät** und einen geeigneten Kopfhörermonitor oder das Wiedergabeende Ihres virtuellen Kabels als **Ausgabegerät**. Wenn die Benutzeroberfläche das Audio-Backend verfügbar macht, beginnen Sie mit WASAPI und dem freigegebenen Modus. Drücken Sie **Start**, warten Sie einen Moment und sagen Sie einen Satz, gefolgt von einer Pause. Sie sollten die umgewandelte Stimme hören, gefolgt von Stille. Drücken Sie **Stop**, bevor Sie die Audiogeräte wechseln oder mit dem nächsten Test beginnen.

Wenn das Modell nicht geladen werden kann, überprüfen Sie RVC V2 und den Embedder, bevor Sie die Audioeinstellungen ändern. Wenn überhaupt keine Stimme zu hören ist, überprüfen Sie das Mikrofon und die Ausgabegeräte separat. Fahren Sie mit [Mikrofon-Routing und -Abstimmung](live-audio.md) fort, sobald das Modell startet.
