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

## Bereiten Sie Ihren Datensatz vor und planen Sie einen Trainingslauf.

### Reinigen Sie den Ton mit MVSEP nur dort, wo es nötig ist.

Behalten Sie eine unberührte Kopie Ihrer Aufnahmen. Wenn sie bereits eine einzelne saubere, trockene Stimme enthalten, überspringen Sie die Trennung. Verwenden Sie Material, zu dessen Hochladen auf [MVSEP](https://mvsep.com/en/home)] und zum Trainieren Sie berechtigt sind. Bereinigen Sie vertrauliche Aufzeichnungen lokal.

1. **Isolieren Sie die Stimme.** Laden Sie ein kurzes Beispiel hoch und wählen Sie eine Option zur Stimmtrennung. Laden Sie den Stimmstamm im WAV-Format herunter, sofern verfügbar. Spielen Sie es im Vergleich zum Original ab und achten Sie über Kopfhörer auf Musik, andere Stimmen, abgeschnittene Silben und wässrige oder metallische Artefakte.
2. **Backing-Vocals nur entfernen, wenn vorhanden.** Für Songs mit Harmonien oder einem Refrain unterhalb des Ziels verwenden Sie eine Option zur Trennung von Lead und Backing am Stimmstamm. Behalten Sie die Lead-Ausgabe bei. Wenn sich die Sänger immer noch überschneiden oder der Lead Lücken aufweist, verwenden Sie einen sauberen Abschnitt oder einen anderen Take.
3. **Reduzieren Sie den Hall nur dort, wo er hörbar ist.** Wenn die Stimme eine breite Stereo-Hallfahne hat, testen Sie zunächst eine Stereo-De-Reverb-Option an einer Kopie. Für verbleibende Raumreflexionen vergleichen Sie einen Raum-De-Reverb-Pass. Sie können jede Phase überspringen. Achten Sie bei jedem Durchgang auf abgeschnittene Konsonanten und Atemzüge.
4. **Echo nur entfernen, wenn die Stimme wiederholt wird.** Eine hörbare verzögerte Wiederholung erfordert einen separaten kurzen Test. Behalten Sie das Original oder ersetzen Sie es, wenn beim Entfernen Wörter verloren gehen. Vermeiden Sie das Stapeln von Durchgängen bei ansonsten sauberem Audio.
5. **Bereiten Sie die endgültigen Clips vor.** Schneiden Sie unbrauchbares Rauschen und lange leere Abschnitte in einem Editor wie Audacity ab und behalten Sie dabei nützliche Atemzüge und natürliche Phrasierung bei. Exportieren Sie saubere WAVs. Fassen Sie die genehmigten Dateien in einer ZIP-Datei zusammen und bewahren Sie einige saubere Clips zur Auswertung außerhalb der ZIP-Datei auf.

Testen Sie die vollständige Bereinigungskette einige Sekunden lang, bevor Sie den gesamten Datensatz behandeln. Ein Modell kann Artefakte lernen, die in seinem Trainingsaudio verbleiben. Überprüfen Sie vor dem Hochladen mehrere Clips aus verschiedenen Sitzungen.

### Bereinigen Sie einen Datensatz lokal mit Ultimate Vocal Remover (UVR)

UVR unterteilt eine Audiodatei in Spuren, die als Stems bezeichnet werden. Verwenden Sie es, wenn die Zielstimme mit Musik, Soundeffekten oder anderen Stimmen gemischt wird. Wenn Sie bereits eine saubere Sprachaufnahme haben, behalten Sie das Original. UVR verarbeitet Audio auf Ihrem Computer, nachdem die erforderlichen Modelle heruntergeladen wurden. Kaggle führt den späteren RVC-Trainingsjob separat aus.

#### Installieren Sie UVR und bereiten Sie einen Testclip vor.

1. Laden Sie das Installationsprogramm oder Paket für Ihr Betriebssystem von [UVR-Releases](https://github.com/Anjok07/ultimatevocalremovergui/releases)] herunter. Starten Sie die Desktop-App nach der Installation.
2. Erstellen Sie eine 15–30 Sekunden lange Kopie eines Beispiels, die eine klare Linie und einen Abschnitt enthält, in dem die Musik diese überlappt. Bewahren Sie das Original gut auf.
3. Klicken Sie auf **Eingabe auswählen** und wählen Sie den Testclip aus. Verwenden Sie **Ausgabe auswählen**, um einen neuen beschreibbaren Ordner auszuwählen, z. B. `uvr-test`. Wählen Sie **WAV** als Ausgabeformat.
4. Select a **Process Method** and a model that separates **vocals** from **instrumental**, for example a vocals model under **MDX-Net**. If the list is empty, open the settings **Download Center**, select the corresponding model family and download a suitable model. Kehren Sie zum Hauptfenster zurück und wählen Sie es aus.
5. Enable **GPU Conversion** only if your installed build recognizes a supported device. If that option causes an error, turn it off and test on the CPU. CPU processing can be slower, so start with a short clip.

#### Trennen Sie den Gesang und hören Sie zu

Klicken Sie auf **Verarbeitung starten**. When it finishes, find the vocals stem in the output folder. Einige Modelle schreiben auch einen Instrumentalstamm. Play the original and the vocals stem at similar volume. Check consonants, breaths, held notes, and sections where the accompaniment is loud. If you still hear instruments or the voice sounds watery or metallic, compare another model on the same test clip before processing the full dataset.

If you've selected the wrong stem, check the filenames or listen to each output. Keep the one that contains your target lead voice.

#### Clean the remaining problems one at a time

| What remains | What to try in UVR |
| --- | --- |
| Backing vocals or harmonies | Feed the isolated vocal stem into a model intended for lead and backing separation, if your installation offers one. Keep the lead output and verify that the target vocal is complete. |
| Hallfahnen zwischen Phrasen | Probieren Sie, falls verfügbar, ein Modell aus, das für die Nachhallreduzierung vorgesehen ist. Vergleichen Sie Vorher und Nachher an derselben Passage. Behalten Sie den ursprünglichen Stiel bei, wenn durch De-Reverb Konsonanten oder gehaltene Noten beschädigt werden. |
| Akustische verzögerte Wiederholungen | Testen Sie ein Echoentfernungsmodell, falls verfügbar. Wenn dadurch Wörter entfernt oder Atemzüge verzerrt werden, verwenden Sie eine andere Einstellung oder schließen Sie den betroffenen Abschnitt aus. |
| Raumbrummen, abgeschnittene Spitzen oder andere Stimmen | Überprüfen Sie das Original. Wenn die Behandlung die Stimme weiterhin schädigt, tauschen Sie den Clip aus oder schließen Sie ihn aus. Durch die Trennung können durch Clipping verlorene Peaks nicht rekonstruiert werden. |

Verarbeiten Sie den vollständigen Satz erst, nachdem ein kurzer Vergleich richtig klingt. Verwenden Sie Audacity oder einen anderen Editor, um unbrauchbares Material zuzuschneiden. Behalten Sie natürliche Pausen und Atemzüge bei, exportieren Sie die genehmigten Clips als WAV und packen Sie nur diese Clips in die ZIP-Datei des Datensatzes. Halten Sie die instrumentellen und zurückgewiesenen Stämme aus dem ZIP fern. Laden Sie es anschließend in **Training** auf Ilaria RVC hoch und bestätigen Sie, dass **Pfad zum Datensatz** auf die importierten Aufzeichnungen verweist.

### Übersetzen Sie den ursprünglichen Applio-Workflow in Ilaria RVC.

| Schritt im ursprünglichen Workflow. | Was in diesem Ilaria RVC-Notizbuch zu tun ist. |
| --- | --- |
| Richten Sie ein Kaggle-Konto ein und überprüfen Sie es. | Melden Sie sich an und prüfen Sie, ob Sie GPU und Internet aktivieren können. Vollständige Verifizierung, wenn Kaggle danach fragt. |
| Wählen Sie einen Tunnel- oder Persistenzmodus. | Führen Sie das offizielle Notebook der Reihe nach aus und öffnen Sie die Gradio-URL aus Schritt 4. Sie verwaltet den Tunnel. Sichern Sie das Experiment außerhalb der temporären Sitzung mithilfe der Exportzelle. |
| Laden Sie den Datensatz hoch und fügen Sie seinen Pfad ein. | Verwenden Sie die Upload-Auswahl in Ilaria RVC, warten Sie, bis der Vorgang abgeschlossen ist, und bestätigen Sie, dass **Pfad zum Datensatz** auf Ihre vorbereiteten Dateien verweist. Ordnen Sie den Modellnamen dem Namen zu, den Sie beim Exportieren von Prüfpunkten eingeben. |
| Wählen Sie einen Slicer und Post-Normalisierung | **Prozessdaten** übernimmt das Slicing und passt jedes Slice automatisch an. Der Ilaria RVC-Workflow verfügt über keinen separaten Applio Post-Schalter. Passen Sie die Trainingsabtastrate an die Architektur und die Vorzüge an. Durch Resampling können fehlende Details nicht wiederhergestellt werden. |
| Setzen Sie stille Trainingsdateien auf Null. | Belassen Sie **Stille Trainingsdateien** für Ihren ersten Lauf auf der Standardeinstellung. Wenn Ihre Clips bereits natürliche Pausen und keine langen leeren Abschnitte haben, vergleichen Sie einen separaten Lauf mit Null. Überprüfen Sie beide Ausgänge auf die gleichen ausgehaltenen Pausen. |
| Wählen Sie die Stapelgröße nach Datensatzlänge. | Beginnen Sie bei 2 oder 4, wenn Sie sich nicht sicher sind, und verwenden Sie 8 nur, wenn die GPU Spielraum hat und die Konfiguration funktioniert. Überprüfen Sie das Protokoll und den VRAM. Reduzieren Sie den Stapel nach einem Fehler wegen unzureichendem Arbeitsspeicher. Kaggle impliziert keinen festen Batch-Multiplikator und die Datensatzlänge allein bestimmt nicht die Batch-Größe. |
| Trainieren Sie, bis das Modell richtig klingt | Speichern Sie alle 5 oder 10 Epochen, wenn Ihre verfügbare Zeit und Ihr Speicherplatz dies zulassen. Vergleichen Sie gespeicherte Inferenzexporte für dieselben Testclips. Es gibt kein universelles Epochenziel und die Ausweitung eines Laufs auf 500 Epochen kann einen schlechten Datensatz nicht reparieren. |

#### Hören Sie zu, bevor Sie entscheiden, welchen Kontrollpunkt Sie behalten möchten.

Verwenden Sie einen kurzen Satz hingehaltener Clips. Fügen Sie einen einfachen Satz, einen mit scharfen Konsonanten und eine Pause ein. Testen Sie beim Singen auch eine gehaltene Note und einen Übergang zwischen Registern. Beginnen Sie mit einer Tonhöhe von Null, deaktiviertem Abruf und deaktivierten optionalen Effekten. Behalten Sie das Modell bei, dessen Ergebnisse im gesamten Satz am klarsten sind. Wenn alle Versionen die gleichen metallischen Atemzüge oder gedämpften Wörter haben, schauen Sie sich den Datensatz noch einmal an, anstatt den Lauf blind zu verlängern.

Behalten Sie den Inferenzexport und den zugehörigen Index bei, falls Sie einen verwendet haben. Um einen Lauf später fortzusetzen, speichern Sie das gesamte Experiment mit der Notebook-Exportzelle und bewahren Sie Ihren Originaldatensatz separat auf. Öffnen Sie die heruntergeladene ZIP-Datei und überprüfen Sie ihren Inhalt, bevor Sie die Kaggle-Sitzung beenden.

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
