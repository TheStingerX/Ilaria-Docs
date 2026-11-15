---
label: "☁️ Führen Sie Ilaria RVC auf Kaggle aus."
order: 97
permalink: /ilaria-rvc/kaggle/
---
# Führen Sie Ilaria RVC 2.1 auf Kaggle aus.

Kaggle führt das Notebook auf einem Remote-Linux-Computer aus. Wenn Sie den NVIDIA-GPU-Beschleuniger einschalten, erledigt die Remote-GPU die Arbeit. Ihr eigener Computer benötigt lediglich einen Browser und einen Internetzugang. Dies ist eine Alternative für Leute mit AMD- oder Intel-Grafik, integrierter Grafik oder einer lokalen GPU, die für den Job zu langsam ist.

[Öffnen Sie das offizielle Kaggle-Notizbuch](https://www.kaggle.com/code/ilarialopez/ilaria-rvc) · [Holen Sie sich die Notizbuchdatei von GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/Ilaria-RVC-2.1-Kaggle.ipynb)

!!!warning Halten Sie den App-Link privat
Schritt 4 erstellt eine öffentliche Gradio-URL. Jeder mit dieser URL kann die App verwenden, während sie ausgeführt wird. Die Sichtbarkeit Ihres Kaggle-Notizbuchs ist vom Zugriff auf diese URL getrennt. Verwenden Sie eine Sitzung ohne privates Material und halten Sie die URL aus Screenshots, öffentlichen Beiträgen und geteilten Ausgaben fern.
!!!

## 1. Bereiten Sie einen kurzen Test vor

- Melden Sie sich bei Kaggle an und lassen Sie den Notizbuch-Editor geöffnet, während Sie arbeiten.
- Für die Konvertierung benötigen Sie eine kompatible Inferenzdatei `.pth` und, falls verfügbar, die passende `.index`. Der erste Test funktioniert ohne Index. Speichern Sie eine 10-sekündige WAV-Datei mit einer klaren Stimme ohne Musik.
- Bewahren Sie für das Training eine lokale Kopie des Quelldatensatzes auf. Bereiten Sie eine ZIP-Datei mit verwendbaren Aufzeichnungen vor, zu deren Verwendung Sie berechtigt sind. Halten Sie einen separaten kurzen Clip außerhalb des Trainingsdatensatzes bereit, damit Sie Ihr Modell an etwas testen können, das es noch nicht gehört hat.
- Beginnen Sie mit einem Feilentest, bevor Sie einen langen Trainingslauf versuchen. Kaggle kontrolliert die GPU-Verfügbarkeit und -Grenzwerte. Überprüfen Sie daher die in Ihrer eigenen Sitzung angezeigte Zeit und Ressourcen.

## 2. Erstellen Sie eine bearbeitbare Kopie und schalten Sie die GPU ein.

1. Öffnen Sie das [veröffentlichte Notizbuch](https://www.kaggle.com/code/ilarialopez/ilaria-rvc). Melden Sie sich an, wenn Sie dazu aufgefordert werden. Verwenden Sie **Kopieren & Bearbeiten** oder die entsprechende Kopieraktion, um Ihre eigene bearbeitbare Version zu öffnen.
2. Wenn Sie stattdessen von GitHub aus starten, laden Sie die Rohdatei `Ilaria-RVC-2.1-Kaggle.ipynb` herunter, erstellen Sie ein Notizbuch in Kaggle und importieren Sie die Datei über den Notizbuch-Editor. Öffnen Sie das resultierende Notebook auf Kaggle, anstatt es auf Ihrem eigenen Computer auszuführen.
3. Öffnen Sie die Sitzungseinstellungen im Editor. Wählen Sie für **Beschleuniger** eine verfügbare **GPU**-Option aus. Wenn Kaggle nach der Änderung zum Neustart der Sitzung auffordert, akzeptieren Sie dies, bevor Sie Dateien hinzufügen oder einen Lauf starten.
4. Aktivieren Sie **Internet** in denselben Sitzungseinstellungen. Das Notebook benötigt eine Verbindung, um den Code, die Abhängigkeiten und Gewichtungen herunterzuladen und dann seinen Gradio-Link zu öffnen.
5. Wenn eine der Einstellungen nicht verfügbar ist, lesen Sie die Erklärung von Kaggle. Überprüfen Sie die Berechtigung Ihres Kontos und die aktuelle Verfügbarkeit des Accelerators. Versuchen Sie es erneut, wenn Sie beide Einstellungen aktivieren können.

## 3. Führen Sie die vier Hauptabschnitte aus

Klicken Sie im Editor auf **Alle ausführen**. Sie können die vier Codezellen auch einzeln von oben nach unten ausführen. Warten Sie, bis jede Zelle fertig ist, bevor Sie die nächste ausführen. Die optionalen Export- und Stoppzellen führen in ihren Standardeinstellungen nichts aus.

| Notizbuchabschnitt | Was ein erfolgreicher Lauf bewirkt | Was zu überprüfen ist, wenn er stoppt |
| --- | --- | --- |
| **1. GPU prüfen** | Zeigt den GPU-Namen, den Speicher und den Treiber an. Schauen Sie sich die angeheftete Ilaria RVC-Veröffentlichung unter `/kaggle/working/ilaria-rvc` an. | Wenn NVIDIA-Tools fehlen, wählen Sie eine verfügbare GPU aus und starten Sie die Sitzung neu, bevor Sie sie erneut ausführen. Wenn Git das Repo nicht erreichen kann, überprüfen Sie das Internet. |
| **2. Abhängigkeiten installieren** | Bereitet die Notebook-Umgebung vor und prüft, ob PyTorch die GPU erkennt. Suchen Sie nach `GPU ready:` gefolgt von seinem Namen. | Lesen Sie die erste Abhängigkeit oder den Compilerfehler. Ein fehlendes CUDA-Gerät bedeutet, dass die App die GPU immer noch nicht nutzen kann. |
| **3. Modellgewichte herunterladen** | Lädt die vom Notebook benötigten Assets herunter und überprüft sie. | Lassen Sie den integrierten Wiederholungsversuch abschließen. Wenn es weiterhin fehlschlägt, überprüfen Sie den Netzwerkzugriff und den freien Speicherplatz. |
| **4. Öffne Ilaria RVC** | Startet die Schnittstelle und gibt **Öffne Ilaria RVC** in der Zellenausgabe aus. | Wenn die Registerkarte nicht automatisch geöffnet wurde, klicken Sie auf diese Schaltfläche. Wenn das Notebook meldet, dass der Gradio-Link nicht verfügbar ist, überprüfen Sie das Internet und führen Sie Schritt 4 erneut aus, nachdem die Schritte 1–3 erfolgreich waren. |

Öffnen Sie den aktuellen Link aus Schritt 4 in einem anderen Tab. Lassen Sie die Kaggle-Sitzung laufen. Verwenden Sie nach einem Zurücksetzen der Sitzung oder einem Neustart des Starts den neu generierten Link.

## 4. Konvertieren Sie eine Aufnahme

1. Öffnen Sie im Browser-Tab von Ilaria RVC **Andere → Lokale Modelle importieren**. Fügen Sie den Inferenzprüfpunkt oder eine unterstützte ZIP-Datei hinzu und fügen Sie den gepaarten Index hinzu, falls vorhanden. Warten Sie, bis der Import abgeschlossen ist.
2. Öffnen Sie **Inferenz**, aktualisieren Sie bei Bedarf die Stimmenliste, wählen Sie die gewünschte Stimme aus und gehen Sie zu **Einzelne Inferenz**.
3. Laden Sie die kurze WAV-Datei hoch. Beginnen Sie bei **Pitch 0** und **Index Ratio 0**. Lassen Sie die optionalen Effekte ausgeschaltet und verwenden Sie den vom Modell erwarteten Einbetter.
4. Klicken Sie einmal auf die Konvertierungssteuerung und warten Sie auf die Ausgabe. Spielen Sie das Ergebnis ab und laden Sie es dann vom Player herunter, falls verfügbar. Behalten Sie die WAV-Eingabe bei, damit Sie den gleichen Satz später vergleichen können.
5. Wenn Sie den Abruf testen möchten, wählen Sie den passenden Index aus und versuchen Sie eine kleine Erhöhung von Null. Wenn die Ausgabe fehlschlägt oder die Stimme schwerer zu verstehen ist, kehren Sie zur Basislinie zurück und überprüfen Sie die Modell-Index-Paarung.

Wenn die Stimme nie erscheint, überprüfen Sie zuerst das Importprotokoll. Ein als G- oder D-Datei gespeicherter Trainingskontrollpunkt gehört zu einem Experiment und erfordert einen Inferenzexport, bevor er hier ausgewählt werden kann.

## 5. Trainieren Sie Ihre Stimme und speichern Sie Ihre Arbeit

1. Wählen Sie unter **Schulung** einen neuen **Modellnamen**. Importieren Sie Ihr Audio oder ZIP über die Steuerelemente zum Hochladen von Datensätzen. Warten Sie, bis der Import abgeschlossen ist, und bestätigen Sie, dass **Pfad zum Datensatz** auf die importierten Aufzeichnungen verweist.
2. Führen Sie den **Dataset Checker** aus und hören Sie sich alle verdächtigen Aufzeichnungen an. Bestätigen Sie, dass Ihre RVC V2-Architektur, die Abtastrate, der Embedder und die Tonhöheneinstellungen mit Ihren ausgewählten G/D-Pretrains übereinstimmen, wenn Sie diese verwenden. Beginnen Sie mit einer Batchgröße, die zur zugewiesenen GPU passt.
3. Führen Sie **Process Data** und dann **Feature Extraction** aus. Lesen Sie den jeweiligen Status, bevor Sie fortfahren. Wenn Sie den Datensatz oder Encoder ändern, bereiten Sie vor dem Training neue Dateien für dieses Experiment vor.
4. Führen Sie **Train Pth** mit einem bescheidenen ersten Ziel aus und speichern Sie regelmäßige Kontrollpunkte. Halten Sie einen kurzen Testclip aus den Trainingsdaten heraus. Vergleichen Sie exportierte Prüfpunkte für denselben Clip, bevor Sie einen längeren Lauf starten.
5. Erstellen Sie den Feature-Index, wenn Sie einen Abruf benötigen, und versuchen Sie dann zunächst den Inferenzexport mit **Indexverhältnis 0**. Eine ausführliche Erläuterung der einzelnen Einstellungen finden Sie unter [Trainingssteuerung und Arbeitsablauf](training-controls.md)“.
6. Wenn Sie mitten im Lauf anhalten möchten, verwenden Sie **Stoppen und speichern** in Ilaria RVC und warten Sie, bis das Protokoll das Speichern bestätigt. Laden Sie die Ergebnisse herunter, während die Kaggle-Sitzung noch aktiv ist.

## 6. Laden Sie ein Backup herunter, bevor Sie gehen

Die optionale Zelle **Ergebnisse exportieren** des Notebooks erstellt ein Archiv in `/kaggle/working/Ilaria-RVC-results.zip`. Eine Live-Sitzung ist vorübergehend. Stellen Sie sicher, dass Sie das Backup auf Ihrem eigenen Computer haben, bevor Sie die Sitzung beenden oder zurücksetzen.

- **Nur für Inferenzdateien:** Setzen Sie `EXPORT = True` und belassen Sie `TRAINING_MODEL = ""`. Das Archiv umfasst `.pth`- und `.index`-Dateien in `models` sowie Dateien, die in `InferOutput` geschrieben wurden. Verwenden Sie die Download-Schaltfläche des Players für jede Konvertierung, bei der dort keine Datei geschrieben wurde.
- **Um ein fortsetzbares Trainingsexperiment beizubehalten:** Warten Sie, bis **Stoppen und speichern** oder bis das Training abgeschlossen ist. Stellen Sie `EXPORT = True` ein und geben Sie in `TRAINING_MODEL` den genauen Experimentnamen ein. Geben Sie nur den Namen ohne Ordnerpfad ein. Der Export umfasst seinen `logs/<name>`-Baum neben den regulären Ausgaben.
- Führen Sie diese Codezelle aus. Öffnen Sie den angezeigten Link oder laden Sie **Ilaria-RVC-results.zip** über Kaggle **Output** herunter. Öffnen Sie die ZIP-Datei lokal und bestätigen Sie, dass sie das enthält, was Sie benötigen. Bewahren Sie Ihren Originaldatensatz separat auf. Die Exportzelle verpackt `datasets` nicht.

Um nur die App zu stoppen, setzen Sie `STOP = True` in **Stoppen oder neu starten** und führen Sie diese optionale Zelle nach dem Speichern aus. Führen Sie Schritt 4 erneut aus, um es in derselben Sitzung erneut zu öffnen. Das Stoppen oder Zurücksetzen der gesamten Kaggle-Sitzung ist eine separate Aktion.

## Fehlerbehebung

| Was Sie sehen | Was zuerst zu tun ist |
| --- | --- |
| Schritt 1 besagt, dass eine GPU aktiviert werden soll | Wählen Sie eine GPU unter **Beschleuniger** aus, starten Sie neu, wenn Sie dazu aufgefordert werden, und führen Sie dann erneut ab Schritt 1 aus. |
| Das Notebook meldet einen anderen Checkout oder Commit | Beginnen Sie in einer sauberen Sitzung mit dem Beamten Notizbuch. Sichern Sie alle vorhandenen Ergebnisse, bevor Sie die Sitzung ändern oder zurücksetzen. |
| Die Registerkarte „Gradio“ ist leer oder abgelaufen. | Bestätigen Sie, dass die Sitzung noch läuft. Verwenden Sie den neuesten Link aus Schritt 4. Wenn der Link nicht erstellt werden kann, überprüfen Sie die Internetverbindung und lesen Sie die Zellenausgabe. |
| Konvertierung oder Training haben keinen Speicher mehr | Schließen Sie konkurrierende Jobs in der Sitzung ab und probieren Sie einen kurzen Clip aus. Reduzieren Sie für das Training die Batchgröße und deaktivieren Sie das optionale GPU-Dataset-Caching, falls verfügbar. Speichern Sie, bevor Sie einen Lauf unterbrechen. |
| Beim Exportieren wird angezeigt, dass keine Ergebnisse vorliegen. | Zuerst eine Stimme konvertieren oder exportieren. Überprüfen Sie das Ausgabeverzeichnis und stellen Sie sicher, dass der optionale Experimentname des Archivs genau mit **Modellname** übereinstimmt. |
| Einige Dateien verschwinden nach einem Reset | Starten Sie das Setup erneut und importieren Sie Ihre lokalen Backups erneut. Der Arbeitsordner gehört zur aktiven Sitzung. |

Wenn sich ein Problem wiederholt, notieren Sie den fehlerhaften Abschnitt, den GPU-Namen aus Schritt 1 und den ersten Fehler aus der Zellenausgabe. Das Notebook schreibt auch das App-Startprotokoll unter `/kaggle/working/.ilaria-notebook/startup.log`. Entfernen Sie die Gradio-URL aus jedem Protokoll, das Sie teilen. Informationen zur Modell- und Audiodiagnose finden Sie unter [Fehlerbehebung bei RVC](../reference/troubleshooting.md)“.
