# RVC Blue (RVC-Realtime-GUI)

[GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI)

RVC Blue ist ein Windows-Desktop-Sprachwechsler, der auf der Echtzeit-GUI von RVC WebUI (Mainline - Original RVC) basiert. Es konvertiert Mikrofon, Audiodatei und unterstütztes Windows-Anwendungsaudio in Echtzeit. Modelle werden in einer separaten Anwendung trainiert. Die Dateieingabe erfolgt über die Live-Engine und kann im WAV-Format aufgezeichnet werden.

## Installieren Sie das Windows-Paket

1. Überprüfen Sie das Modell Ihrer NVIDIA-GPU unter **Task-Manager → Leistung**. Öffnen Sie [RVC Blue Downloads](https://huggingface.co/niel-blue/RVC-Realtime-GUI) und wählen Sie das Paket für Ihre Hardware aus. Das Projekt bietet ein Standardpaket **CUDA 12.8**, einschließlich Blackwell-Unterstützung, und ein Kompatibilitätspaket **CUDA 11.8**. Verwenden Sie einen Treiber, der mit dem ausgewählten Build kompatibel ist.
2. Extrahieren Sie das gesamte Archiv in einen beschreibbaren lokalen Ordner. Python, PyTorch, FFmpeg und die erforderlichen Inferenzressourcen sind im Paket enthalten.
3. Führen Sie für CUDA 12.8 `RVC-Realtime-GUI-CUDA128.bat` aus diesem Ordner aus. Verwenden Sie für CUDA 11.8 den mitgelieferten Launcher. Warten Sie, bis der erste Start das Laden der GPU-Laufzeit abgeschlossen hat.
4. Beginnen Sie mit der enthaltenen Stimme oder legen Sie Ihre eigene Schlussfolgerung `.pth` und den zugehörigen Index in einem modellspezifischen Ordner unter `models/` ab. Platzieren Sie beispielsweise `MyVoice.pth` und `added_MyVoice.index` innerhalb von `models/MyVoice/`. Der Ordnername erscheint in der Modellliste. Aktualisieren Sie die App oder öffnen Sie sie erneut, nachdem Sie ein Modell hinzugefügt haben.

## Testen Sie die Stimme lokal

Wählen Sie Ihr physisches Mikrofon als Eingang. Wählen Sie Kopfhörer zur Überwachung aus, wählen Sie eine Stimme und klicken Sie auf **Start**. Sprechen Sie einen kurzen Satz und halten Sie inne. Behalten Sie die Standardeinstellungen für Puffer und Tonhöhe für den ersten Test bei. Die App ermöglicht unabhängige Eingabe-, Ausgabe- und Überwachungsgeräte. Beginnen Sie mit WASAPI, wenn Sie keine ASIO-Hardware verwenden. Wenn Sie natives ASIO verwenden, beginnen Sie mit dem vom Treiber empfohlenen Puffer.

## Leiten Sie Audio zu einem Spiel oder Anruf weiter

Wählen Sie den virtuellen Kabelwiedergabeendpunkt als Konverterausgang. Wählen Sie in der Ziel-App den Aufnahmeendpunkt als Mikrofon aus. Behalten Sie die Spiel- oder Anrufwiedergabe auf Ihren Kopfhörern bei. **VAC Lite** und **VB-CABLE** sind Optionen. Überprüfen Sie die Gerätenamen in der [Komplettlösung für virtuelle Kabel](../vonovox/live-audio.md). Machen Sie eine kurze lokale Aufnahme am Zielort, bevor Sie an einem Anruf teilnehmen.

## Verwenden Sie eine Datei oder eine andere Anwendung als Eingabe.

Wählen Sie für eine Audiodatei den Dateieingabemodus und testen Sie eine kurze WAV-Datei. Wählen Sie vor dem Start ein Ausgabe- und Überwachungsgerät. Verwenden Sie die Aufnahmesteuerung, um die WAV-Ausgabe zu speichern. Die App bietet außerdem Optionen zum unabhängigen Aufzeichnen der Eingabe und Ausgabe oder in einem kombinierten Layout.

Wechseln Sie in Builds, die Anwendungserfassung beinhalten, die Eingabequelle zu einer Anwendung, aktualisieren Sie die Liste und wählen Sie die App aus, die Audio abspielt. Dabei wird die prozessbezogene Audioerfassung von Windows verwendet. Die direkte ASIO-Ausgabe kann den Aufnahmepfad umgehen. Der ursprüngliche Anwendungston bleibt hörbar, es sei denn, Sie passen die Wiedergabe separat an.

## Fehlerbehebung beim ersten Test

| Symptom | Was zu überprüfen ist |
| --- | --- |
| Das Programm wird beim Start geschlossen | Führen Sie den mitgelieferten Launcher aus seinem extrahierten Ordner aus und lesen Sie den ersten Fehler. Überprüfen Sie den ausgewählten CUDA-Build und NVIDIA-Treiber. |
| Es erscheint keine neue Stimme. | Überprüfen Sie den Ordner pro Modell und aktualisieren Sie die Modellliste. Verwenden Sie einen Inferenzexport anstelle eines Trainingsprüfpunkts. |
| Kopfhörer funktionieren, aber Discord oder das Spiel ist stumm. | Wählen Sie den virtuellen Kabelaufzeichnungsendpunkt im Ziel aus. Überprüfen Sie den Wandlerausgang separat. |
| Du hörst zwei Stimmen | Prüfen Sie, ob die Original-App noch hörbar ist oder ob zwei Überwachungsrouten aktiv sind. |
| Audio wird unter Last unterbrochen. | Stellen Sie den Standardpuffer wieder her oder erhöhen Sie ihn leicht. Wiederholen Sie den Test, während die andere App ausgeführt wird. |

[Projektquelle und Versionshinweise](https://github.com/niel-blue/RVC-Realtime-GUI/tree/main)
