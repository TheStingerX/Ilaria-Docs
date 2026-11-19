---
label: "Redpanda-vc einrichten"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/redpanda/first-run/
---
# Redpanda-vc einrichten

[GitHub](https://github.com/redpanda343/Redpanda-vc)

Redpanda-vc erweitert Applio und bietet mehrere Sprachmodellfamilien. In dieser exemplarischen Vorgehensweise wird durchgehend die **RVC**-Familie verwendet. Wählen Sie eine Installation aus und halten Sie deren Abhängigkeiten von anderen RVC-Programmen getrennt.

## 1. Wählen Sie einen Startpfad.

1. Laden Sie die Quelle oder ein kompatibles Paket vom [Redpanda-vc-Projekt](https://github.com/redpanda343/Redpanda-vc)] herunter. Extrahieren Sie ein Quell-Setup in einen lokalen beschreibbaren Ordner und prüfen Sie, ob die Abhängigkeitsdatei und der Launcher des Projekts vorhanden sind. Installieren Sie die für Ihren Checkout erforderlichen Abhängigkeiten in einer dedizierten Python-Umgebung. CUDA-Installationen benötigen einen PyTorch-Build, der die verwendete NVIDIA-GPU und den verwendeten Treiber unterstützt.
2. Beginnen Sie unter Windows mit `run-install.bat` und lassen Sie die Vorbereitung der gebündelten Projektumgebung abschließen. Verwenden Sie dann `run-applio.bat` für die Browser-WebUI oder `run-realtime-gui.bat` für das eigenständige Echtzeitfenster. Beide Launcher erwarten die im Projektordner erstellte Umgebung. Öffnen Sie ein Terminal im Projektordner, wenn Sie Startprotokolle lesen müssen. Lassen Sie es während des Gebrauchs laufen.
3. Warten Sie auf die Benutzeroberfläche oder öffnen Sie die vom Prozess gedruckte Loopback-Adresse. Wenn der Launcher beendet wird, ohne eine Seite zu öffnen, überprüfen Sie die Terminalausgabe auf einen Importfehler, einen CUDA-Initialisierungsfehler oder einen Portkonflikt. Beheben Sie das genannte Problem in dieser Installation, bevor Sie sie erneut öffnen.
4. Bestätigen Sie das richtige Ausführungsgerät. Testen Sie jeweils einen Job mit der lokalen Schnittstelle, bevor Sie Browser-Streams oder andere GPU-lastige Jobs hinzufügen.

## 2. Wählen Sie den Motor und das Modell

Wählen Sie in der entsprechenden Konvertierungsansicht den **RVC**-Workflow aus, wählen Sie einen kompatiblen Inferenzprüfpunkt aus und koppeln Sie ihn erst dann mit dem passenden Index, wenn Sie ihn haben. Die App stellt Beatrice und Rectified Flow auch in unterstützten Ansichten zur Verfügung. Jeder verwendet sein eigenes Modellformat. Ein Modell, das zu einer anderen Familie gehört, benötigt einen eigenen Motor.

Wenn Ihr Build eine Offline-Konvertierung ermöglicht, beginnen Sie mit einem trockenen, kurzen gesprochenen WAV und keiner Transposition. Speichern Sie eine neue Ausgabe und überprüfen Sie die gleichen Wörter in beiden Dateien. Wenn Sie hauptsächlich eine Mikrofonumwandlung benötigen, gehen Sie direkt zum [Echtzeittest](live-audio.md)] mit einem bekanntermaßen kompatiblen Modell über.

## 3. Diagnostizieren Sie den Start, bevor Sie die Audioeinstellungen ändern.

- **Importfehler**: Stellen Sie sicher, dass der Interpreter, der den Launcher ausführt, derjenige in Ihrer Projektumgebung ist und über die Abhängigkeiten des Builds verfügt.
- **Modell fehlt**: Überprüfen Sie noch einmal den von Ihrem Build erwarteten Ordner, die aktuelle Engine und ob es sich bei der Datei um einen Inferenzexport handelt.
- **CUDA-Fehler**: Bestätigen Sie das ausgewählte RVC-Gerät und testen Sie es mit anderen geschlossenen GPU-Jobs. Zeichnen Sie den ersten Fehler auf, anstatt die endgültige Meldung zum Herunterfahren zu interpretieren.
- **Unklare Kompatibilität**: Beachten Sie die Checkout- oder Paketversion, die GPU und die vorgesehene Modellfamilie. Testen Sie eine Baseline, bevor Sie benutzerdefinierte Vocoder oder Funktionen ausprobieren.
