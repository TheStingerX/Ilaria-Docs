---
label: "📦 VCClient installieren"
order: 100
permalink: /ilaria-rvc/okada/installation/
---
# w-okada VCClient installieren

VCClient konvertiert Live-Mikrofon-Audio. Die Schnittstelle ist der **Client** und der Konvertierungsprozess ist der **Server**. Führen Sie für Ihren ersten Test beide auf demselben Computer aus. Die Client-Version (v1 oder v2) und die Modellversion (RVC V1 oder V2) identifizieren unterschiedliche Dinge. Überprüfen Sie die Modellunterstützung des Pakets, bevor Sie eine Datei auswählen.

## Vor dem Herunterladen

1. Überprüfen Sie Ihr Betriebssystem und Ihre Prozessorarchitektur. Öffnen Sie unter Windows **Task-Manager → Leistung** und lesen Sie das GPU-Modell. Öffnen Sie auf dem Mac **Über diesen Mac** und suchen Sie nach einem Apple-Chip oder Intel-Prozessor.
2. Schließen Sie Ihr Mikrofon und Ihre Kopfhörer an. Machen Sie eine kurze Aufnahme im Betriebssystem, um das Mikrofon unabhängig vom VCClient zu überprüfen.
3. Halten Sie ein bekanntermaßen funktionierendes RVC-Inferenzmodell bereit. Ein `.pth` ist ein PyTorch-Modell, während ein `.onnx` eine ONNX-Laufzeit verwendet. Verwenden Sie das optionale Matching `.index` nur mit dem Modell, zu dem es gehört. Siehe [Modelle und Dateien](../../start/models.md), wenn Sie eine ZIP-Datei oder eine Reihe von Trainingskontrollpunkten erhalten haben.

## Wählen Sie ein Paket aus

Öffnen Sie [VCClient-Downloads auf Hugging Face](https://huggingface.co/wok000/vcclient000/tree/main). Wählen Sie eine Datei aus den w-okada-Releases aus, die dieser Tabelle entspricht. Die Versionsnummer steht für den variablen Teil des Dateinamens.

| Ihr Computer | Zu suchendes Paket | Was überprüft werden muss |
| --- | --- | --- |
| Windows mit unterstützter NVIDIA-GPU | v2 Windows CUDA, `vcclient_win_cuda_….zip` | Wählen Sie die tatsächliche NVIDIA-Karte in der App aus. Verwenden Sie eine CPU oder einen Standard-Build, wenn die installierte Laufzeit Ihre GPU nicht nutzen kann. |
| Windows mit AMD oder ein reines CPU-Setup | v2 Windows-Standard, `vcclient_win_std_….zip` | Testen Sie das DirectML-Gerät, sofern es unterstützt wird. Eine CPU-Konvertierung ist eine Option, wobei die Geschwindigkeit vom Modell und Prozessor abhängt. Überprüfen Sie die verfügbaren Anbieter, bevor Sie ein Modell importieren. |
| Windows mit Intel-Grafik | Eine kompatible Standard- oder Legacy-Version | Im dokumentierten v1-Windows-Setup gilt die AMD- und Intel-GPU-Beschleunigung für ONNX-Modelle. Wählen Sie CPU, wenn Ihr Standardpaket keinen verwendbaren GPU-Anbieter für Ihr Modell erkennt. |
| Apple Silicon Mac | v2 Mac, `vcclient_mac_….zip` | Überprüfen Sie, ob das Asset auf Apple Silicon abzielt. Testen Sie mit den in dieser Version aufgeführten Anbieter- und RVC-Modellformaten. |
| Linux | Quellverteilung und unterstützte Laufzeit | Das dedizierte Quell- oder Container-Setup erfolgt getrennt von den Windows- und Mac-Binärdateien. Passen Sie CUDA, unterstützte AMD-Laufzeitumgebung oder CPU an Ihre Hardware an. |

Für Windows v2 listet das Projekt sowohl Torch- als auch ONNX-Unterstützung auf. Eine bestimmte Datei kann weiterhin einen anderen Anbieter als eine andere Datei im selben Build verwenden. Behalten Sie das Originalmodell bei, wenn Sie ein anderes Format ausprobieren. Durch das Umbenennen der Dateinamenerweiterung wird diese nicht konvertiert.

## Starten Sie unter Windows

1. Extrahieren Sie die gesamte ZIP-Datei in einen normalen beschreibbaren Ordner. Verwenden Sie für jeden Build, den Sie testen, einen separaten Ordner. Das Ausführen eines Launchers aus dem Archiv heraus kann dazu führen, dass dieser seine Laufzeit nicht findet.
2. Öffnen Sie den extrahierten Ordner und führen Sie `start_http.bat` für eine Einrichtung auf demselben Computer aus. Lassen Sie die Konsole geöffnet. Wenn das Paket mehrere Launcher bietet, wählen Sie den für die heruntergeladene Laufzeit und die lokale Verbindung aus.
3. Warten Sie auf den Start und alle erstmaligen Asset-Downloads. Öffnen Sie die in der Konsole angezeigte lokale Adresse, wenn sich die Schnittstelle nicht von selbst öffnet.
4. Überprüfen Sie, ob Modellsteckplätze und Steuerelemente zum Starten der Konvertierung angezeigt werden. Lassen Sie die Webseite und die Konsole für den [ersten Mikrofontest](live-audio.md)] geöffnet.

## Auf dem Mac starten

1. Erweitern Sie das Apple Silicon-Archiv und halten Sie die gebündelten Dateien zusammen.
2. Öffnen Sie den lokalen Launcher des Bundles (`startHttp.command`, sofern bereitgestellt). Lassen Sie das Setup abschließen und öffnen Sie bei Bedarf die von der Konsole gemeldete Adresse.
3. Wenn das System fragt, ob der Browser oder die App das Mikrofon verwenden darf, gewähren Sie Zugriff für den Test. Wenn die Berechtigung zuvor verweigert wurde, ändern Sie sie in **Systemeinstellungen → Datenschutz & Sicherheit → Mikrofon** und öffnen Sie die App erneut.
4. Bestätigen Sie, dass der Server läuft, bevor Sie eine zweite Kopie öffnen. Das Schließen des Servers stoppt die Konvertierung, auch wenn der Browser noch geöffnet ist.

## Wenn es vor dem Öffnen fehlschlägt

| Was Sie sehen | Was zu überprüfen ist |
| --- | --- |
| Der Launcher wird sofort geschlossen | Führen Sie es aus dem vollständig extrahierten Ordner aus und lesen Sie den ersten Konsolenfehler. Überprüfen Sie die Architektur und Laufzeitkompatibilität erneut. |
| Der Download beim ersten Durchlauf bleibt unvollständig. | Lassen Sie den Prozess geöffnet und überprüfen Sie seinen Fortschritt und Netzwerkfehler. Versuchen Sie es erneut mit demselben offiziellen Paket, nachdem die Verbindung wiederhergestellt ist. |
| Die lokale Seite gibt einen Verbindungsfehler aus. | Überprüfen Sie, ob der Server noch läuft, und verwenden Sie die gedruckte Adresse. Die Browserseite kann einen gestoppten lokalen Server nicht starten. |
| NVIDIA-Hardware ist installiert, aber die CPU ist aktiv. | Überprüfen Sie den Backend-Dateinamen, den installierten Treiber und die in VCClient ausgewählte GPU. Testen Sie den CPU-Pfad separat, um ein Modellproblem von einem GPU-Problem zu unterscheiden. |
| Das Modellfenster wird geöffnet, aber die Mikrofonliste ist leer. | Überprüfen Sie die Eingabeanzeige des Betriebssystems und die Browser-Site-Berechtigung. Laden Sie im Client-Modus neu, nachdem Sie die Erlaubnis erteilt haben. Aktualisieren Sie im Servermodus die eigene Geräteliste des Servers. |

Weiter mit [Live-Audio, Routing und Fehlerbehebung](live-audio.md).
