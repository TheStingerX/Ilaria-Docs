# Jede Trainingssteuerung erklärt

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Training erstellt aus Aufnahmen ein neues Sprachmodell. Verwenden Sie für ein erstes Experiment einen eindeutigen Namen, einen kleinen sauberen Datensatz und ein kompatibles vorab trainiertes Paar. Halten Sie eine Aufnahme aus dem Datensatz heraus, damit Sie das Modell in einem Clip anhören können, den es noch nie gesehen hat. Beginnen Sie mit dem [Trainingsworkflow](training-workflow.md), wenn Sie die Schritte in der richtigen Reihenfolge ausführen möchten.

## Name, Audio und Modelldesign

| Steuerung | Was es tut und wann es verwendet wird |
| --- | --- |
| `Model Name` | Identifiziert Ihr Experiment und seine gespeicherten Dateien. Verwenden Sie einen neuen Namen für einen neuen Datensatz oder eine inkompatible Konfiguration. Um fortzufahren, verwenden Sie den ursprünglichen Namen mit seinen ursprünglichen Einstellungen. Ein Platzhalter im leeren Feld ist ein Beispiel. |
| `Path to Dataset` | Ordner, den die App zum Training vorliest. Überprüfen Sie nach dem Hochladen den aktualisierten Pfad, bevor Sie auf „Daten verarbeiten“ klicken. |
| `Drop dataset audio files or a ZIP` | Importiert Aufzeichnungen in die Datensatzbibliothek der App. Warten Sie, bis das Dataset-Importprotokoll abgeschlossen ist, bevor Sie es verarbeiten. |
| `Manage datasets` | Datensätze aktualisieren lädt die Liste neu. Der zu entfernende Datensatz wählt ein importiertes Element aus. Mit „Ausgewählten Datensatz löschen“ wird das importierte Element entfernt. Überprüfen Sie zunächst den Namen und bewahren Sie eine separate Kopie Ihrer Originale auf. Das Datensatzentfernungsprotokoll meldet, was passiert ist. |
| `Sample Rate` | Wählt die Trainingsrate des Modells aus, 32, 40 oder 48 kHz, sofern kompatibel. Passen Sie das Architektur- und G/D-Paar an. Durch Erhöhen der Rate können fehlende Details in Ihren Aufnahmen nicht wiederhergestellt werden. |
| `Pitch Guidance` | Gibt dem Generator während des Trainings einen geschätzten Pitch-Track. Verwenden Sie die Standardeinstellung für ein typisches Modell und passen Sie das vorab trainierte Paar an. Wenn Sie es deaktivieren, ändert sich, was das Modell erwartet. |
| `CPU Threads` | Steuert, wie viel CPU-Parallelität die Vorbereitungs- oder Extraktionsphase verwendet. Reduzieren Sie den Wert, wenn die Vorverarbeitung den System-RAM erschöpft oder den PC unbrauchbar macht. |
| `Vocoder` | Wählt den Wellenformgenerator aus. Beginnen Sie mit HiFi-GAN, es sei denn, Sie haben einen kompatiblen Grund, sich für RefineGAN zu entscheiden. In diesem Build benötigt das RefineGAN-Training RVC V2 bei 32 kHz mit Tonhöhenführung. |
| `Embedder Model` | Wählt die vom Trainer verwendeten Inhaltsfunktionen aus. Die Schulung stellt ContentVec und Spin-v2 vor. Um es zu ändern, sind neu extrahierte Funktionen und ein kompatibles Experiment erforderlich. Verwenden Sie bei der Inferenz den passenden Encoder. |
| `Silent training files` | Legt fest, wie viele stille Beispiele das Experiment umfasst. Vergleichen Sie die gleichen natürlichen Pausen, wenn Sie sie ändern. |
| `Index Algorithm` | Wählt aus, ob alle Merkmalsvektoren beibehalten oder geclustert werden sollen, bevor der Abrufindex erstellt wird. Siehe [Auto, Faiss und KMeans](training-controls.md). |
| `Speaker ID` | Wählt die den Daten zugeordnete Sprechernummer aus. Behalten Sie die Standardeinstellung für ein erstes Einzellautsprechermodell bei. |
| `Pitch extraction algorithm` | Schätzt die Tonhöhe stimmhafter Teile. Beginnen Sie mit RMVPE. Vergleichen Sie Alternativen zum gleichen Material, wenn die Tonhöhenverfolgung das eigentliche Problem darstellt. |

## Wie lange trainiert und was gespeichert werden soll

| Kontrolle | Was es ändert |
| --- | --- |
| `Training Precision` | FP32 nutzt die volle Präzision. FP16 kann VRAM auf kompatibler Hardware sparen. Behalten Sie beim Vergleichen oder Fortsetzen eines Laufs die ursprüngliche Präzision bei. |
| `GPU IDs` und `GPU Information` | Lesen Sie die aufgelisteten Geräte, bevor Sie IDs eingeben. Eine Liste wie 0-2 bedeutet GPUs 0 und 2. Separate Vorbereitungssteuerungen können eine andere Geräteliste als das Training verwenden. |
| `Batch Size` | Anzahl der für ein Update gruppierten Beispiele. Reduzieren Sie den Wert, wenn Ihnen der GPU-Speicher ausgeht. Überprüfen Sie das Trainingsprotokoll auf die effektive Charge, insbesondere bei [Kaggle](../cloud/kaggle.md). |
| `Training Target`, `Total Epochs`, `Total Steps` | Die Epochenzählung durchläuft den vorbereiteten Datensatz. Schritte zählen Aktualisierungen. Das Ziel ist die Gesamtsumme, die Sie erreichen möchten, einschließlich aller bereits abgeschlossenen Teile. |
| `Save frequency` | Steuert das Intervall zwischen den Speicherungen in Epochen. Wählen Sie ein Intervall, mit dem Sie mehrere Snapshots vergleichen können, ohne das Laufwerk zu füllen. |
| `Save last ckpt as final Model` | Wählt das Aufbewahrungsverhalten für den neuesten Prüfpunkt aus. Behalten Sie frühere Schnappschüsse, wenn Sie sie vergleichen oder zu ihnen zurückkehren möchten, und haben Sie Platz. |
| `Create model at save frequency` | Erstellt Inferenzexporte im ausgewählten Speicherrhythmus, sodass Sie fortgeschrittene Modelle anhören können. Bewahren Sie das G/D-Paar und den Experimentstatus getrennt auf, wenn Sie fortfahren möchten. |
| `Cache data to GPU` | Speichert vorbereitete Daten im VRAM. Lassen Sie es für einen ersten Test ausgeschaltet, wenn der Speicher knapp ist, und für einen Schritt-Ziel-Lauf, falls erforderlich. |
| `Pretrained model (G + D)` | Wählt ein kompatibles Generator- und Diskriminatorpaar. Aktualisieren Sie die vorab trainierte Liste nach dem Herunterladen eines Paares. Pretrained Log erklärt die Auswahl. Wenn Sie „Keine“ wählen, beginnen Sie ohne vorab trainierte Gewichte. |

## Die vier nummerierten Tasten

1. **Daten verarbeiten** liest den Datensatz, bereitet Slices vor und führt ein Resampling für die ausgewählte Trainingskonfiguration durch. Lesen Sie das Vorprozessprotokoll, bevor Sie fortfahren.
2. **Feature-Extraktion** extrahiert die Darstellung und, wenn aktiviert, die Tonhöhe. Überprüfen Sie das Feature-Extraktionsprotokoll auf Fehler und Asset-Namen.
3. **Train Index** erstellt den optionalen Abrufindex aus kompatiblen extrahierten Features. Das Modell kann auch ohne umgebaut werden. Behalten Sie den Index mit der passenden Stimme bei.
4. **Train Pth** beginnt mit dem Krafttraining. Sehen Sie sich das Trainingsprotokoll an. Um sicher zu unterbrechen, klicken Sie auf **Stoppen und speichern**, warten Sie, bis **Stopp/Fortsetzen** den Schreibvorgang bestätigt, und laden Sie dann das Experiment herunter oder sichern Sie es.

## Dataset Checker, Vorschauen, Warnungen und Warteschlange

- **Dataset Checker** liest die ausgewählten Aufzeichnungen. Der Schweigeschwellenwert definiert, was als leise gilt. Mit „Flag“ wird die Stummschaltung länger als festgelegt, wie lange die Meldung erfolgen soll, und mit „Lautstärkeunterschiedswarnung“ wird der Pegelunterschied auf „Flag“ gesetzt. **Datensatz prüfen** führt den Scan aus. Wählen Sie eine Aufnahme aus, legen Sie die Startzeit fest oder aktivieren Sie „Start kurz vor der längsten Stille“ und verwenden Sie dann **12-Sekunden-Vorschau laden**, um die betroffene Stelle anzuhören. Überprüfen Sie Protokoll, Status und Audio, bevor Sie die Quelle bearbeiten.
- **Trainingsvorschauen** sind optional. Aktivieren Sie **Trainingsvorschauen generieren**, wählen Sie eine Quelle von bis zu 30 Sekunden, legen Sie „Vorschau alle N Epochen“ fest und verwenden Sie „Vorschau-Tonhöhe“ und „Vorschau-Tonhöhenextraktion“, um die Vergleichseinstellungen zu korrigieren. Wählen Sie eine gespeicherte Vorschau-Epoche aus und verwenden Sie **Vorschauen aktualisieren**, um die Liste zu aktualisieren. Vorschauprotokoll und Trainingsvorschau-Audio zeigen das Ergebnis.
- Mit **Trainingsbenachrichtigungen** können Sie Desktop-Benachrichtigungen und akustische Warnungen für Abschluss oder Fehler auswählen. **Testwarnungen** prüft die ausgewählten Optionen. Lesen Sie das Benachrichtigungstestprotokoll, wenn nichts angezeigt oder abgespielt wird.
- **Trainingswarteschlange** speichert die aktuellen Einstellungen als Job. Die automatische Vorbereitung führt für diesen Job „Daten verarbeiten“, „Feature-Extraktion“ und „Index trainieren“ durch. Verwenden Sie **Warteschlange starten** zum Starten und **Pause nach aktuellem Modell** zum Stoppen nach dem aktiven Job. **Aktualisierungswarteschlange** aktualisiert die Anzeige. Wählen Sie einen Job aus, bevor Sie **Ausgewählten erneut versuchen** oder **Ausgewählten Job entfernen**. Lesen Sie das Warteschlangenaktionsprotokoll und das Warteschlangenprotokoll, bevor Sie es erneut versuchen.
