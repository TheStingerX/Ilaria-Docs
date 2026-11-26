# Glossar

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

 | Begriff | Bedeutung |
| --- | --- |
 | Inferenz | Verwendung eines trainierten Modells zum Konvertieren einer Aufnahme. |
 | Checkpoint | Datei mit gelernten Modellgewichten. Lebenslaufkontrollpunkte und Inferenzexporte haben unterschiedliche Rollen. |
 | Embedder | Komponente, die eine Darstellung des Quellaudios für die Konvertierungs-Engine extrahiert. |
 | Index | Optionale Sammlung erlernter Merkmalsvektoren, die beim Abruf verwendet werden. |
 | Indexverhältnis | Wie stark eine Implementierung abgerufene Features während der Konvertierung nutzt. |
 | F0 | Grundfrequenz, wird zur Darstellung der Tonhöhe über der Zeit verwendet. |
 | Tonhöhenextraktor | Algorithmus, der F0 aus einer Aufnahme schätzt. |
 | Halbton | Ein Zwölftel einer Oktave. Eine Änderung von 12 Halbtönen entspricht einer Oktave. |
 | Vocoder | Der Teil der Pipeline, der die Wellenform aus seinen Konditionierungseingängen generiert. |
 | Abtastrate | Die Anzahl der Audio-Samples pro Sekunde. Es unterscheidet sich von der Modellversion und der Tonhöhentransposition. |
 | Vor dem Training | Startgewichte, die beim Training eines neuen Modells verwendet werden. |
 | Epoche | Ein Durchgang durch den Trainingsdatensatz im üblichen Trainingsaufbau. |
 | Schritt | Ein Trainingsupdate. Die Stapelgröße und die Datensatzgröße wirken sich auf die Beziehung zwischen Schritten und Epochen aus. |
 | Stem | Ein isolierter Teil einer Mischung, normalerweise ein Gesangs- oder Instrumentalteil. |
 | Latenz | Die Zeit zwischen einem Eingabeereignis und seiner hörbaren Ausgabe. |

Siehe [RVC-Grundlagen](../start/rvc-fundamentals.md), [Modelle und Dateien](../start/models.md) und [Schulung](../model-training/training.md)] für diese Begriffe im Kontext.

## Ilaria RVC-Steuerelemente

Diese Einträge sind aus dem in Ilaria RVC integrierten Glossar übernommen. Die verfügbaren Steuerelemente können je nach Version variieren.

 | Steuerung | Bedeutung |
| --- | --- |
 | Sprachmodell | Wählt einen Inferenzprüfpunkt aus und sucht nach seinem passenden Index. |
 | Aktualisieren | Scannt die Modellbibliothek erneut. Überprüfen Sie Ihre Auswahl anschließend noch einmal. |
 | Stimme aus VRAM entladen | Gibt Inferenzressourcen frei, um GPU-Speicher für andere Aufgaben freizugeben. |
 | Sprecher-ID | Wählt einen Sprachslot innerhalb des geladenen Modells aus. Verwenden Sie 0 für ein typisches Modell mit einem Lautsprecher. |
 | RMVPE und FCPE | Pitch-Extraktoren, die F0 über die Zeit schätzen. |
 | ContentVec / HuBERT | ContentVec ist ein Inhaltsencoder im HuBERT-Stil, der in Standard-RVC-Workflows verwendet wird. Passen Sie den im Training verwendeten Encoder an. |
 | Lautstärke-Hüllkurvenmischung | Legt fest, wie genau die Ausgangsdynamik der Quelle folgt. |
 | Schützen | Reduziert den Einfluss des Abrufs auf stimmlose Konsonanten und Atemzüge. Ein niedrigerer Wert bietet einen stärkeren Schutz. Ein Wert von 0,5 deaktiviert es. |
 | Resampling | Passt die Ausgaberate an. Ein Wert von 0 behält die Ausgaberate des Modells bei. |
 | Daten verarbeiten | Bereitet Aufzeichnungen vor, resampelt sie und schneidet sie in Slices. Ilaria RVC passt in dieser Phase den Pegel jedes Slice an. |
 | Merkmalsextraktion | Berechnet Inhaltsmerkmale und Tonhöheninformationen für tonhöhengesteuerte Modelle. |
 | Dataset Checker | Kennzeichnet mögliches Abschneiden, lange Pausen, unlesbare Dateien und Ebenenunterschiede, ohne die Quelle zu bearbeiten. |
 | Trainingsvorschauen | Konvertieren Sie dieselbe kurze Referenzaufnahme über mehrere Epochen hinweg zum Vergleich nach Gehör. |
 | Generator und Diskriminator | Der Generator lernt, Audio zu synthetisieren und der Diskriminator gibt Feedback. Ihr G/D-Kontrollpunktpaar wird verwendet, um das Training fortzusetzen. |
 | Anhalten und speichern | Fordert einen fortsetzbaren Kontrollpunkt an. Warten Sie vor dem Schließen auf die Bestätigung. |
 | Gesamtepochen | Endgültiges Epochenziel, einschließlich der vor der Wiederaufnahme abgeschlossenen Epochen. |
 | Modellinformationen | Zeigt gespeicherte Prüfpunkteigenschaften wie Geschwindigkeit, Neigungsführung und Präzision an, sofern verfügbar. |
 | Modelle zusammenführen | Mischt kompatible Inferenzgewichte. Beginnen Sie mit dem Testen der zusammengeführten Stimme bei deaktiviertem Abruf. |
 | FP16 und FP32 | Numerische Präzisionsformate. Die Gewichtsgenauigkeit bei einem Export beschreibt die gespeicherte Datei. |
| [Formant Shift](../ilaria-rvc/convert/advanced-inference.md#formant-shift) | Verschiebt Stimmresonanzen, um die Klangfarbe zu ändern. |

> Generische HuBERT-Checkpoints sind als Standardencoder für Stimmkonvertierung nicht empfohlen. Sie wurden für Sprachrepräsentationen trainiert und können Merkmale der Klangfarbe der Ausgangsstimme in die Ausgabe übertragen. Verwende den Encoder, den das RVC-Modell erwartet, etwa ContentVec, wenn das Modell damit trainiert wurde.

Siehe [Sprachkonvertierung](../conversion/voice-conversion.md) und [Schulung](../model-training/training.md)] für Arbeitsabläufe, die diese Steuerelemente verwenden.
