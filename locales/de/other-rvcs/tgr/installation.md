---
label: "TG Developed Fork installieren"
icon: ":package:"
order: 100
permalink: /ilaria-rvc/tgr/installation/
---
# Okada TG Developed Fork installieren

[GitHub](https://github.com/tg-develop/voice-changer)

TG Developed Fork (TGR) stammt aus dem Deiteris-Zweig der w-okada-Familie. Der Herausgeber dokumentiert diesen Fork als RVC-only. Es verfügt über eigene Release-Dateien, Starter und Gerätebeschränkungen. Bewahren Sie es in einem eigenen Ordner auf, damit eine funktionierende VCClient- oder Deiteris-Installation zum Vergleich verfügbar bleibt.

## Laden Sie den Build herunter, der zu Ihrem Computer passt.

Überprüfen Sie **Task-Manager → Leistung** unter Windows oder **Über diesen Mac** unter macOS. Lesen Sie den tatsächlichen GPU- oder Chipnamen. Im Dateinamen der Veröffentlichung bezieht sich `amd64` auf die Prozessorarchitektur, die von standardmäßigen 64-Bit-Intel- und AMD-PCs verwendet wird.

| Setup | Zu suchende Datei auf [TGR-Versionen](https://github.com/tg-develop/voice-changer/releases) |
| --- | --- |
| Windows mit unterstütztem NVIDIA CUDA | Die `voice-changer-windows-amd64-cuda.zip` teilen Teile aus derselben Version auf. |
| Windows mit AMD, unterstützter Intel-Grafik oder reinem CPU-Betrieb | `voice-changer-windows-amd64-dml.zip`. Wählen Sie in der App CPU aus, wenn Sie ohne nutzbare GPU testen. |
| Apple Silicon Mac | `voice-changer-macos-arm64-cpu.tar.gz` falls enthalten. Der Herausgeber bezeichnet die macOS-Unterstützung als experimentell. |
| Intel Mac | `voice-changer-macos-amd64-cpu.tar.gz` falls enthalten. Die Beschleunigung hängt von der installierten Grafik und dem Build ab. |
| Linux | Verwenden Sie die explizit für Linux gekennzeichneten Release-Assets, sofern verfügbar, oder das Quell-Setup des Forks. |

## Windows Schritt für Schritt

1. Erweitern Sie auf der Release-Seite **Assets** für ein Release. Laden Sie die DirectML-ZIP-Datei oder jeden CUDA-Teil herunter. Ein Split-Beispiel umfasst `.001` und `.002`. Die Teile müssen mit ihren heruntergeladenen Namen nebeneinander bleiben.
2. Verwenden Sie für CUDA ein Archivierungstool, das geteilte Dateien und Extrahieren aus `.001` unterstützt. Es liest die späteren Teile während der Extraktion. Extrahieren Sie für DirectML die einzelne ZIP-Datei. Wählen Sie einen Ordner aus, in den Sie schreiben können, und lassen Sie die extrahierten Ordner intakt.
3. Öffnen Sie das extrahierte Paket, dann `MMVCServerSIO` und starten Sie dann `MMVCServerSIO.exe`.
4. Lassen Sie das Startfenster geöffnet, während alle erforderlichen Gewichte heruntergeladen werden. Wenn der Browser geöffnet wird, halten Sie diese Konsole für Diagnosezwecke verfügbar. Wenn die Seite nicht automatisch geöffnet wird, verwenden Sie die vom Server gedruckte lokale Adresse.
5. Der Start der ersten CUDA-Konvertierung kann einige Sekunden dauern. Warten Sie die Aufwärmphase ab, bevor Sie wiederholt „Start“ drücken oder das Gerät wechseln.

## macOS oder Linux

Entpacken Sie unter macOS das Archiv für Ihre genaue Chip-Architektur und öffnen Sie die gebündelte `MMVCServerSIO` ausführbare Datei. Wenn macOS den Start blockiert, vergewissern Sie sich, dass die Datei aus der offiziellen Version stammt, und überprüfen Sie die Blockierung, bevor Sie Systemänderungen vornehmen. Gewähren Sie dem Browser Zugriff auf das Mikrofon für die Browseraufnahme oder auf die lokale App, wenn diese das Mikrofon direkt öffnet.

Verwenden Sie für eine Linux-Quellinstallation das eigene Quellarchiv des Forks und die dokumentierte Python 3.10-Umgebung. Öffnen Sie ein Terminal im Ordner `server` des Repos. Das Installationsprogramm ist `vc_install.sh`; Wählen Sie das Backend aus, das zu Ihrem System passt, wenn Sie dazu aufgefordert werden. Verwenden Sie das in dieser Version enthaltene Startskript und öffnen Sie die auf dem Terminal gedruckte lokale Adresse. Skriptnamen unterscheiden sich je nach Snapshot. Um die bereitgestellten Einstiegspunkte zu identifizieren, listen Sie die Dateien im Ordner `server` auf, bevor Sie einen ausführen. Entpacken Sie für eine Release-Binärdatei das Paket für Ihre Architektur und starten Sie die enthaltene ausführbare Datei. Das Windows DirectML-Archiv ist eine separate Laufzeit.

## Startfehler isolieren

| Symptom | Erste Prüfung |
| --- | --- |
| Die Extraktion stoppt bei einer fehlenden Datei | Bestätigen Sie, dass alle CUDA-Teile vorhanden sind und aus derselben Version stammen. Starten Sie die Extraktion erneut ab `.001`. |
| Ein Gewicht besteht die Überprüfung nicht | Lesen Sie den Dateinamen im Startprotokoll. Schließen Sie den Vorgang, benennen Sie nur die heruntergeladene Abhängigkeit als Backup um und starten Sie dann neu, um den Download erneut zu versuchen. Halten Sie Ihre Sprachmodellbibliothek und Indexdateien intakt. |
| Der Browser zeigt einen Verbindungsfehler an. | Überprüfen Sie, ob die Serverkonsole eine bereite Adresse meldet. Starten Sie eine Instanz und lassen Sie sie geöffnet, während Sie die Seite verwenden. |
| DirectML wird gestartet, aber die GPU ist langsam oder fehlt. | Bestätigen Sie den ausgewählten GPU-Namen und testen Sie die CPU oder ein anderes unterstütztes Gerät mit demselben Modell. Das Projekt meldet eine schlechte Leistung bei einigen integrierten Intel-Konfigurationen. |
| Das Öffnen des Mikrofons schlägt fehl. | Überprüfen Sie die Eingabeberechtigungen im Betriebssystem und Browser und wiederholen Sie den Vorgang in einem Chromium-basierten Browser, wenn Firefox ESR die Geräteliste nicht anzeigt. |

Wenn die Seite geladen wird, fahren Sie mit [Erstes Modell, Mikrofon und virtuelles Kabel](live-audio.md) fort.
