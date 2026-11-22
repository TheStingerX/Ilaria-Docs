# Lightning AI Studio

[Notebook öffnen · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-LightningAI.ipynb) · [Lightning AI Studio](https://lightning.ai/)

Führe Ilaria RVC im Browser mit einer von der Cloud-Plattform bereitgestellten GPU aus. Wähle unten ein Notebook. Aktiviere vor dem Ausführen der ersten Zelle einen NVIDIA-Beschleuniger.

## Bevor du startest

Bereite eine kurze, saubere WAV-Datei und ein kompatibles Inferenzmodell vor. Für das Training bewahre das Original-Dataset und einige separate Testclips auf deinem eigenen Computer auf. Das Notebook läuft auf einer entfernten Linux-Maschine.

### Credits, Gratis-Tarif und GPU-Verfügbarkeit

Lightning AI nutzt ein **creditbasiertes Abrechnungsmodell** (`1 Credit = $1 USD`, sekundengenau für GPU-Rechenzeit abgerechnet; siehe [Lightning AI Preise](https://lightning.ai/pricing)):

- **Gratis-Tarif:** Enthält **ein kostenloses 4-CPU-Studio** (bis zu 4 Stunden am Stück vor einem Neustart) sowie **10 GB kostenlosen Speicher** (Speicher über 10 GB wird monatlich abgerechnet).
- **Startguthaben vs. Bezahl-Tarife:** Neue Konten erhalten nach Registrierung/Verifizierung üblicherweise ein Startguthaben (keine monatlich erneuerten Gratis-GPU-Stunden). Bezahlte **Pro**-Abos bieten ein monatliches Credit-Kontingent.
- **Guthaben und GPUs prüfen:** Öffne dein Studio-Dashboard bzw. Abrechnungspanel, um dein verbleibendes Credit-Guthaben vor dem Start einer GPU-Instanz zu prüfen, und bedenke, dass bestimmte GPU-Typen (wie T4, L4 oder L40) der regionalen und kontospezifischen Verfügbarkeit unterliegen. Führe die Einrichtung der Abhängigkeiten zuerst im kostenlosen CPU-Studio durch und wechsle erst dann zur GPU, wenn du bereit für Inferenz oder Training bist.

## Auf Lightning AI Studio ausführen

1. Erstelle ein GPU Studio, lade das Notebook hoch und öffne es in JupyterLab.
2. Führe die Zellen 1-4 der Reihe nach aus. Sie prüfen die GPU, installieren Abhängigkeiten, laden Basisgewichte herunter und starten die Web UI. Setze `TRAINING_SAMPLE_RATES` auf `[]` für reine Inferenz oder wähle die Abtastraten für dein geplantes Training.
3. Öffne den **Port viewer** in deinem Studio und wähle den von der Startzelle ausgegebenen Port (`7865` standardmäßig). Halte den Port privat.

## Jede Zelle vor dem Fortfahren prüfen

Die GPU-Prüfung muss ein NVIDIA-Gerät erkennen. Falls nicht, wechsle zuerst den Beschleuniger. Warte, bis die Installation der Abhängigkeiten abgeschlossen ist, bevor du Gewichte lädst. Setze `TRAINING_SAMPLE_RATES = []` für reine Inferenz. Für das Training wähle die Abtastrate passend zu Modell und Pretrained-Paar. Lasse `DOWNLOAD_FCPE` aktiviert, wenn du FCPE nutzen willst.

## 4. Konvertieren Sie eine Aufnahme

1. Öffnen Sie im Browser-Tab von Ilaria RVC **Andere → Lokale Modelle importieren**. Lade das Inferenzmodell (`.pth`) und optional den dazugehörigen Index (`.index`) hoch. Du kannst auch ein unterstütztes ZIP mit diesen Dateien hochladen. Warten Sie, bis der Import abgeschlossen ist. Alternativ öffne **Other → Download models from Hugging Face, Google Drive or MEGA**, füge einen öffentlich zugänglichen Downloadlink zu einer unterstützten ZIP-, `.pth`- oder `.index`-Datei ein und klicke auf **Download and install model**. Lade Modell und optionalen Index bei getrennten Links nacheinander herunter.
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

UVR unterteilt eine Audiodatei in Spuren, die als Stems bezeichnet werden. Verwenden Sie es, wenn die Zielstimme mit Musik, Soundeffekten oder anderen Stimmen gemischt wird. Wenn Sie bereits eine saubere Sprachaufnahme haben, behalten Sie das Original. UVR verarbeitet Audio auf Ihrem Computer, nachdem die erforderlichen Modelle heruntergeladen wurden. Cloud führt den späteren RVC-Trainingsjob separat aus.

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

## 5. Trainieren Sie Ihre Stimme und speichern Sie Ihre Arbeit

1. Wählen Sie unter **Schulung** einen neuen **Modellnamen**. Importieren Sie Ihr Audio oder ZIP über die Steuerelemente zum Hochladen von Datensätzen. Warten Sie, bis der Import abgeschlossen ist, und bestätigen Sie, dass **Pfad zum Datensatz** auf die importierten Aufzeichnungen verweist.
2. Führen Sie den **Dataset Checker** aus und hören Sie sich alle verdächtigen Aufzeichnungen an. Bestätigen Sie, dass Ihre RVC V2-Architektur, die Abtastrate, der Embedder und die Tonhöheneinstellungen mit Ihren ausgewählten G/D-Pretrains übereinstimmen, wenn Sie diese verwenden. Beginnen Sie mit einer Batchgröße, die zur zugewiesenen GPU passt.
3. Führen Sie **Process Data** und dann **Feature Extraction** aus. Lesen Sie den jeweiligen Status, bevor Sie fortfahren. Wenn Sie den Datensatz oder Encoder ändern, bereiten Sie vor dem Training neue Dateien für dieses Experiment vor.
4. Führen Sie **Train Pth** mit einem bescheidenen ersten Ziel aus und speichern Sie regelmäßige Kontrollpunkte. Halten Sie einen kurzen Testclip aus den Trainingsdaten heraus. Vergleichen Sie exportierte Prüfpunkte für denselben Clip, bevor Sie einen längeren Lauf starten.
5. Erstellen Sie den Feature-Index, wenn Sie einen Abruf benötigen, und versuchen Sie dann zunächst den Inferenzexport mit **Indexverhältnis 0**. Eine ausführliche Erläuterung der einzelnen Einstellungen finden Sie unter [Trainingssteuerung und Arbeitsablauf](../train/training-controls.md)“.
6. Wenn Sie mitten im Lauf anhalten möchten, verwenden Sie **Stoppen und speichern** in Ilaria RVC und warten Sie, bis das Protokoll das Speichern bestätigt. Laden Sie die Ergebnisse herunter, während die Cloud-Sitzung noch aktiv ist.

## Exportieren und stoppen

Setze `EXPORT = True` und führe die Export-Zelle aus. Aktiviere `INCLUDE_CHECKPOINTS`, wenn du das Training fortsetzen musst. Speichere das ZIP lokal, bevor du die Sitzung beendest, und führe dann die Stopp-Zelle mit `STOP = True` aus.

## Wenn der Start fehlschlägt

Wenn die erste Zelle die GPU nicht erkennt, prüfe deinen Beschleuniger und führe sie erneut aus. Öffnet sich die Oberfläche nicht, lies die Ausgabe der Startzelle, bestätige dass der Server bereit ist und öffne die Ansicht neu.

### Ausgabe-ZIP prüfen

Prüfe bei Inferenz deine exportierte WAV-Datei und Modelldateien. Für das Training aktiviere `INCLUDE_CHECKPOINTS`, um die Experiment-Logs einzuschließen, und prüfe das Archiv vor dem Schließen der Sitzung. Bewahre das Original-Dataset getrennt auf.

## Häufige Probleme beheben

Schlägt die Installation fehl, lies den ersten Fehler und führe die fehlgeschlagene Zelle nach der Behebung erneut aus. Öffnet sich die App, aber dein Modell fehlt, prüfe das Import-Log und aktualisiere die Liste. Bei Fehlern wegen vollem Speicher (OOM) beginne mit einem kürzeren Clip oder senke die Trainings-Batch-Size. Schließt sich die Web UI, öffne sie über dieselbe Startzelle oder denselben Port erneut, solange die Sitzung noch aktiv ist.

[Ilaria RVC in der Cloud](cloud.md)
