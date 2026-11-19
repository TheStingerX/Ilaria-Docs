---
label: "Vonovox installieren"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/vonovox/installation/
---
# Vonovox installieren

[GitHub](https://github.com/dr87/Vonovox) · [Hugging Face](https://huggingface.co/dr87/vonovox)

Vonovox ist ein Windows Live-Sprachkonverter für unterstützte NVIDIA-GPUs. Verwenden Sie diese Anleitung, um einen sauberen lokalen Mikrofontest durchzuführen, bevor Sie Discord, OBS oder ein Spiel öffnen.

> **Neueste Beta im Download-Repository verfügbar** · [Vonovox 2.0.0 Beta 3 (ZIP) herunterladen](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

## 1. Sammeln Sie die Dateien und Geräte

- Öffnen Sie Windows **Task-Manager → Leistung** und identifizieren Sie die Grafikkarte anhand des Namens. Verwenden Sie die [offizielle Paketliste](https://huggingface.co/dr87/vonovox/tree/main), um bei Bedarf einen Build- oder hardwarespezifischen Patch aufzulösen. Bewahren Sie ältere funktionierende Builds in ihren eigenen Ordnern auf.
- Bereiten Sie einen inferenzbereiten RVC V2-Prüfpunkt vor und prüfen Sie, welchen Einbetter das Modell erwartet. Ein Trainingskontrollpunkt wie `G_*.pth` dient der Wiederaufnahme des Trainings. Wählen Sie für die erste Ausführung ein Modell mit bekannter Herkunft und führen Sie es ohne Index aus, sofern der Build dies bietet.
- Schließen Sie ein physisches Mikrofon und kabelgebundene Kopfhörer an. Schließen Sie andere Programme, die die ausschließliche Kontrolle über die Audiogeräte übernehmen könnten, und stellen Sie sicher, dass Windows Ihr Rohmikrofon aufzeichnen kann.

## 2. Starten Sie die App

1. Laden Sie die ZIP-Datei herunter, verwenden Sie dann **Alle extrahieren** und legen Sie das gesamte Paket in einem beschreibbaren lokalen Ordner wie `C:\VoiceTools\Vonovox` ab. Führen Sie Launcher aus dem extrahierten Ordner aus, mit den unterstützenden Dateien daneben.
2. Das Paket ist vorkompiliert. Öffne den entpackten Ordner und starte `start.bat`. Du kannst `setup.bat` überspringen.
3. Warten Sie auf die Schnittstelle. Wenn das Fenster sofort geschlossen wird, führen Sie denselben Launcher über eine geöffnete Eingabeaufforderung aus, damit der letzte Fehler sichtbar bleibt. Stellen Sie sicher, dass Sie das gesamte Archiv extrahiert und einen kompatiblen GPU-Build ausgewählt haben.
4. Wählen Sie im Modellbereich das RVC V2-Modell aus. Wählen Sie den erwarteten Einbetter aus, wenn er von der Benutzeroberfläche verfügbar gemacht wird. Beginnen Sie mit neutralen Tonhöhen- und Formant-Steuerelementen, standardmäßiger Blockgröße und deaktivierten optionalen Effekten.

## 3. Überprüfen Sie das erste Signal

Wählen Sie Ihr physisches Mikrofon als **Eingabegerät** und einen geeigneten Kopfhörermonitor oder das Wiedergabeende Ihres virtuellen Kabels als **Ausgabegerät**. Wenn die Benutzeroberfläche das Audio-Backend verfügbar macht, beginnen Sie mit WASAPI und dem freigegebenen Modus. Drücken Sie **Start**, warten Sie einen Moment und sagen Sie einen Satz, gefolgt von einer Pause. Sie sollten die umgewandelte Stimme hören, gefolgt von Stille. Drücken Sie **Stop**, bevor Sie die Audiogeräte wechseln oder mit dem nächsten Test beginnen.

Wenn das Modell nicht geladen werden kann, überprüfen Sie RVC V2 und den Embedder, bevor Sie die Audioeinstellungen ändern. Wenn überhaupt keine Stimme zu hören ist, überprüfen Sie das Mikrofon und die Ausgabegeräte separat. Fahren Sie mit [Mikrofon-Routing und -Abstimmung](live-audio.md) fort, sobald das Modell startet.

## Checkliste für die erste Ausführung

### Überprüfen Sie die GPU vor dem Herunterladen

1. Drücken Sie unter Windows **Strg + Umschalt + Esc** und öffnen Sie **Leistung**. Wählen Sie jeden GPU-Eintrag aus und lesen Sie seinen Namen. Auf einem Laptop sehen Sie möglicherweise sowohl integrierte Grafiken als auch eine dedizierte NVIDIA-GPU.
2. Ordnen Sie die dedizierte GPU dem vom Entwickler verfügbaren Paket zu. Verwenden Sie für diese Version den Beta-3-Link oben. Wenn die Paketliste einen hardwarespezifischen Build oder Patch enthält, prüfen Sie vor der Installation, ob dieser auf Ihr Archiv anwendbar ist.
3. Lassen Sie Platz für die ZIP-Datei und den extrahierten Ordner. Verwenden Sie einen lokalen Ordner, in den Sie schreiben können. Vermeiden Sie es, direkt aus der ZIP-Datei zu starten oder einen Launcher aus seinem Ordner zu kopieren.
4. Schließen Sie Ihr Mikrofon und Ihre Kopfhörer an. Öffnen Sie **Einstellungen → System → Ton → Eingang** und sprechen Sie. Wenn Windows hier kein Signal erkennt, korrigieren Sie die Eingabe- oder Mikrofonberechtigung, bevor Sie Vonovox öffnen.

### Überprüfen Sie, ob die Einrichtung tatsächlich abgeschlossen ist

1. Das Paket ist vorkompiliert. Öffne den entpackten Ordner und starte `start.bat`. Du kannst `setup.bat` überspringen.
2. Schließt sich das Fenster sofort, öffne die Eingabeaufforderung im Ordner, führe `start.bat` aus und lies die erste Fehlermeldung.
3. Wenn das Setup eine fehlende Microsoft-Laufzeit meldet, installieren oder reparieren Sie die verknüpfte Visual C++-Laufzeit und versuchen Sie es erneut. Wenn gemeldet wird, dass CUDA nicht initialisiert werden kann, überprüfen Sie den NVIDIA-Treiber und die Build-Kompatibilität. Halten Sie das Gesamtpaket zusammen.
4. Wenn Sie eine funktionierende Installation aktualisieren, extrahieren Sie sie in einen neuen Ordner und halten Sie die vorherige Version verfügbar. Testen Sie die neue Version, bevor Sie ein nachweislich funktionierendes Setup ersetzen.

### Laden Sie eine Stimme und überprüfen Sie sie, bevor Sie einen Anruf eröffnen

1. Entpacken Sie das Spracharchiv bei Bedarf. Finden Sie die Schlussfolgerung `.pth`. Dateien mit Namen wie `G_*.pth` oder `D_*.pth` sind normalerweise Trainingskontrollpunkte.
2. Wählen Sie die RVC V2-Stimme aus und verwenden Sie den vom Herausgeber angegebenen Embedder. Halten Sie für den ersten Test die Tonhöhe neutral, die Effekte ausgeschaltet und den Puffer auf der Standardeinstellung.
3. Wählen Sie das physische Mikrofon aus. Senden Sie die Ausgabe für einen direkten Test an Kopfhörer, sofern dies unterstützt wird, oder verwenden Sie das virtuelle Kabel und die Windows-Überwachung, die in [Vonovox routen und einstellen](live-audio.md)] beschrieben wird.
4. Starten Sie den Konverter und sprechen Sie einen kurzen Satz, dann machen Sie eine Pause. Die Ausgabe sollte Ihr Timing und Ihre Worte mit der Klangfarbe der ausgewählten Stimme haben. Wenn Sie Ihr normales Mikrofon oder Stille hören, befolgen Sie die Routing-Prüfungen, bevor Sie Tonhöhe oder Effekte ändern.

| Symptom | Zuerst prüfen |
| --- | --- |
| Kein GPU- oder CUDA-Fehler | Prüfen Sie, ob das Paket Ihre dedizierte NVIDIA-GPU unterstützt und dass Windows es erkennt. |
| Eine Stimme kann nicht geladen werden | Überprüfen Sie die RVC-Version und den Encoder. Testen Sie einen kompatiblen Inferenzexport, bevor Sie die Audioeinstellungen ändern. |
| Kein Mikrofonsignal | Testen Sie das physische Mikrofon in Windows und wählen Sie dann dasselbe Gerät in Vonovox erneut aus. |
| Guter lokaler Klang, aber Stille während eines Anrufs | Gehen Sie die Kabelendpunkte und die Auswahl des Zielmikrofons im Routing-Leitfaden durch. |
| Audiounterbrechungen nur während eines Spiels | Testen Sie bei geöffnetem Spiel und erhöhen Sie die Blockgröße bei Bedarf um eine Stufe. |
