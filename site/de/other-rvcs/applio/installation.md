# Applio installieren und Engine überprüfen

[GitHub](https://github.com/IAHispano/Applio) · [Hugging Face](https://huggingface.co/IAHispano/Applio)

Applio bietet **zwei Download-Optionen**, die **exakt dieselbe Engine** ausführen - nur die **Oberfläche und die Installation** unterscheiden sich:
1. **Desktop App**: öffnet ein natives Anwendungsfenster und richtet beim ersten Start die Python-Umgebung ein.
2. **Gradio Web Interface**: startet die Python-Anwendung und öffnet eine lokale Web-Oberfläche im Browser (als kompiliertes Windows-ZIP oder als Python-Quellcode-Installation verfügbar).

## 1. Desktop App

1. Öffnen Sie die [offiziellen Desktop-Downloads](https://github.com/IAHispano/Applio-App/releases/latest). Suchen Sie nach **Assets** und erweitern Sie die Liste, wenn das benötigte Installationsprogramm ausgeblendet ist. Wählen Sie das Asset für Ihr Betriebssystem. Die Quellcode-Archive sind für Entwickler.
2. Führen Sie unter Windows die ausführbare Setup-Datei aus und wählen Sie einen Ordner aus, in den Ihr Konto schreiben kann. Die gepackte App verwendet neben ihrer ausführbaren Datei ein Verzeichnis `data`. Verwenden Sie unter macOS das Disk-Image für Ihren Prozessor, ARM64 für Apple Silicon oder x64 für Intel. Installieren Sie unter Linux das verfügbare Debian-Paket oder machen Sie AppImage ausführbar und öffnen Sie es.
3. Starten Sie die App und lesen Sie die Erstausführungsbedingungen. Lassen Sie die App geöffnet, während sie Python einrichtet, die Engine-Anforderungen installiert, Assets abruft und die Installation überprüft. Verwenden Sie **Installieren/Reparieren**, wenn Ihr Build dies bietet, wenn eine Prüfung fehlschlägt.
4. Überprüfen Sie nach Abschluss der Überprüfung das im Setup erkannte Computergerät. Notieren Sie das Backend und die Hardware, die die App meldet. Eine Maschine mit mehr als einer GPU kann ein anderes Gerät als das erwartete melden.
5. Öffnen Sie **Modelle**. Wenn es geöffnet wird und die Engine bereit ist, fahren Sie mit [eine Stimme installieren](models.md)] fort. Führen Sie die [kurze Konvertierung](inference.md) aus, bevor Sie den Live-Modus oder das Training ausprobieren.

Sie können ein offizielles Desktop-Paket ohne Node.js oder pnpm installieren. Diese Tools dienen zum Erstellen der App aus dem Quellcode.

## 2. Gradio Web Interface

1. **Kompiliertes Windows-Paket**: Laden Sie ein Windows-ZIP von den [kompilierten Gradio-Downloads](https://huggingface.co/IAHispano/Applio/tree/main/Compiled/Windows) herunter oder klonen Sie das [GitHub-Repository](https://github.com/IAHispano/Applio) für eine manuelle Python-Installation aus dem Quellcode.
2. Extrahieren Sie die vollständige ZIP-Datei in einen einfachen Pfad, der Ihnen gehört, zum Beispiel `C:\Applio-Gradio`. Öffnen Sie diesen Ordner im Explorer. Wenn Sie einen zweiten Ordner sehen, der den Launcher enthält, öffnen Sie ihn.
3. Führen Sie `run-applio.bat` aus (oder `python app.py` bei einer manuellen Python-Installation; `python app.py --help` zeigt Server-Optionen). Lassen Sie die Konsole geöffnet, warten Sie auf die lokale Adresse und öffnen Sie genau diese Adresse in Ihrem Browser.
4. Suchen Sie je nach Version nach **Modellen** oder **Download**. Öffnen Sie dann **Audio konvertieren** oder **Inferenz**. Sollte der Browser die Verbindung verlieren, prüfen Sie, ob der Launcher noch läuft, bevor Sie die Seite erneut öffnen.

## Wenn das Setup stoppt

| Was Sie sehen | Erstes, was Sie überprüfen sollten |
| --- | --- |
| Aus der ZIP-Datei wird nichts geöffnet | Extrahieren Sie alle Dateien, bevor Sie den Launcher ausführen. |
| Der Download- oder Verifizierungsschritt schlägt fehl. | Lesen Sie den frühesten Fehler im Setup-Protokoll. Überprüfen Sie die Konnektivität, den verfügbaren Speicherplatz und den Schreibzugriff, bevor Sie den fehlgeschlagenen Schritt wiederholen. |
| Gradio stoppt, bevor eine Adresse angezeigt wird. | Lesen Sie in der Konsole über der letzten Zeile nach, ob der erste relevante Fehler vorliegt. Der Browser kann keine Verbindung herstellen, bis der Dienst gestartet wird. |
| Audiodateien können nicht geöffnet oder exportiert werden. | Überprüfen Sie die Engine-Überprüfung und den FFmpeg-Status. Testen Sie mit einem lokalen WAV, das Sie in einer anderen Anwendung abspielen können. |
| Die Dateikonvertierung wird gestartet, es ist jedoch nicht mehr genügend Speicher vorhanden | Schließen Sie konkurrierende Jobs und testen Sie ein paar Sekunden Audio mit ausgeschalteten Effekten. Probieren Sie ein von Ihrem Build unterstütztes Gerät aus. |

Bevor Sie eine neue Version installieren oder Ordner verschieben, speichern Sie Ihr Arbeitsaudio und sichern Sie benutzerdefinierte Modelle, Indizes, Datensätze und vollständige Trainingsexperimente. Bestätigen Sie nach der Aktualisierung mit derselben kurzen Aufnahme und Stimme, dass die neue Engine ein brauchbares Ergebnis liefert.

[Interaktive RVC-Kompatibilitätsmatrix](../../reference/compatibility-matrix.md)
