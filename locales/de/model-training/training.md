---
label: "🛠️ Trainieren Sie ein Sprachmodell"
order: 94
permalink: /training/
description: "Beim Training wird eine Zielstimme aus einer vorbereiteten Audiosammlung gelernt."
---
# Trainieren Sie ein RVC-Sprachmodell

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Beim Training wird eine Zielstimme aus einer vorbereiteten Audiosammlung gelernt. Verwenden Sie diese Anleitung, wenn Sie ein Modell aus Ihren eigenen oder autorisierten Aufnahmen erstellen möchten. Wenn Sie bereits über ein Inferenzmodell verfügen, lesen Sie [RVC-Modelle und -Dateien](../start/models.md)], um mit der Verwendung zu beginnen.

## Planen Sie Ihren ersten Lauf

Bereiten Sie das Audio mit der [Datensatzanleitung](dataset-preparation.md) vor und wählen Sie es dann unter **Training** aus. Geben Sie dem Experiment einen eindeutigen Namen und wählen Sie eine kurze Aufnahme außerhalb des Trainingssatzes für Hörtests aus. Beginnen Sie mit einem bescheidenen Lauf, der alle Phasen abschließen und einen brauchbaren Export erzeugen kann. Dadurch erhalten Sie eine Grundlage für Änderungen an Daten oder Einstellungen.

Notieren Sie die Anwendungsversion, die Datensatzrevision, das Modellformat und die Abtastrate, den Einbetter, die Pitch-Methode, das vorab trainierte Paar, die Stapelgröße und das geplante Speicherintervall. Fügen Sie den Namen des vorgehaltenen Testclips hinzu. Wenn sich ein späterer Lauf anders anhört, können Sie anhand dieser Notizen erkennen, was sich geändert hat.

## Kompatible Einstellungen auswählen

 | Einstellung | Was zu überprüfen ist |
| --- | --- |
 | Modellformat, Vocoder und Abtastrate | Wählen Sie eine Kombination aus, die von der App und dem vorgesehenen Wiedergabe-Client unterstützt wird. Eine forkspezifische Architektur kann den Ladeort Ihres Modells einschränken. |
 | Tonhöhenführung und -extraktion | Die Tonhöhenführung ist nützlich für die Modellierung von tonhöhenabhängigem Material, insbesondere Gesang. Wählen Sie einen Extraktor aus, der für die Schulung in Ihrem Build verfügbar ist. |
 | Einbetter | Dies definiert die aus Audio extrahierte Darstellung. Notieren Sie die Auswahl, damit Sie die passende Darstellung in unterstützten Inferenz-Clients verwenden können. |
 | Vorab trainierter Generator und Diskriminator | Verwenden Sie ein passendes Paar, das mit der ausgewählten Architektur, Rate und Tonhöhenkonfiguration kompatibel ist. Generator- und Diskriminatordateien erfüllen beim Training unterschiedliche Rollen. |
 | Stapelgröße | Steuert, wie viele Daten pro Aktualisierung verarbeitet werden. Beginnen Sie mit einer Einstellung, die für Ihre GPU geeignet ist, und verringern Sie sie, wenn beim Training nicht mehr genügend Arbeitsspeicher zur Verfügung steht. |
 | Ziel- und Prüfpunktintervall | Eine Epoche ist ungefähr ein Durchgang durch den vorbereiteten Datensatz. Schritte sind einzelne Trainingsaktualisierungen. Speichern Sie regelmäßig, damit Sie Exporte vergleichen und nach einer Unterbrechung wiederherstellen können. |

Verwenden Sie die Vortrainingsoptionen, die von Ihrem installierten Build als kompatibel angezeigt werden. In Ilaria RVC 2.1.0 dokumentiert das Projekt beispielsweise das RefineGAN-Training bei 32 kHz mit RVC V2 und Pitch-Guide. Die gleiche Version dokumentiert auch einen Downloader für kompatible vorab trainierte Paare.

### Praktische Trainingstipps

- **Epochen:** Versuchen Sie einen ersten Vergleichslauf mit einem Ziel von etwa 200 Epochen und hören Sie sich mehrere frühere Speicherungen an. Dies ist ein Ausgangspunkt für das Vorsprechen, da der stärkste Kontrollpunkt früher oder später erfolgen kann. Ein 1.000-Epochen-Lauf bietet keine Qualitätsgarantie.
- **Charge und Präzision:** Beginnen Sie mit einer moderaten Charge, zum Beispiel 8, und betrachten Sie 16 als konservativen oberen Ausgangspunkt. Reduzieren Sie es, wenn der Speicher knapp wird. Die gemischte FP16-Präzision kann die VRAM-Nutzung reduzieren und das Training auf unterstützter Hardware beschleunigen. Überprüfen Sie, ob Ihr Build dies bereits ermöglicht, und versuchen Sie es mit FP32, wenn gemischte Präzision zu nicht endlichen Verlusten führt.
- **TensorBoard:** Verwenden Sie Metriken, um den Fortschritt zu verfolgen und blockierte oder instabile Läufe zu erkennen. Verlustkurven allein können nicht sagen, welcher Prüfpunkt am besten klingt. Vergleichen Sie Konvertierungen derselben ausgehaltenen Clips.
- **Normalisierung:** In Applio-Builds mit diesen Steuerelementen passt die Voreinstellung die Pegel vor dem Slicing an und die Post-Anpassung nach dem Slicing. Verwenden Sie „Keine“, wenn die ursprünglichen Ebenen bereits geeignet sind. In Ilaria RVC wendet Process Data die Pegelanpassung automatisch auf jedes Slice an. Die öffentliche Implementierung verfügt über keinen separaten Post-Schalter.
- **Rauschfilterung:** Beginnen Sie mit deaktivierter optionaler Rauschunterdrückung für saubere Aufnahmen. Wenn das Frontend auch über einen Hochpassfilter verfügt, verwenden Sie diesen für hörbares tieffrequentes Rumpeln und vergleichen Sie das Ergebnis nach Gehör. Hochpassfilterung und Rauschunterdrückung sind separate Vorgänge.
- **GPU-Dataset-Cache:** Lassen Sie es für eine Basislinie deaktiviert. Es verbraucht zusätzlichen VRAM. Messen Sie die Zeit pro Epoche, bevor Sie sie für einen längeren Zeitraum aktivieren.
- **Vorab trainierte Gewichte:** Passen Sie das G/D-Paar an die Architektur, den Vocoder, die Abtastrate und die Tonhöhenkonfiguration an und verwenden Sie den vom Autor des Vortrainings angegebenen Einbetter. Wählen Sie für mit ContentVec erstellte Standard-RVC-Vorschulungen ContentVec für die Merkmalsextraktion und -inferenz aus.

### Wählen Sie eine Rate anhand der Quellbandbreite

Überprüfen Sie die Abtastrate in den Dateimetadaten und untersuchen Sie mehrere repräsentative Clips in einem Spektrogramm-Viewer wie [Spek](https://www.spek.cc/p/download). Suchen Sie nach nützlichen Gesangsdetails und nicht nach isoliertem Rauschen oder einem scharfen Cutoff, der durch die Komprimierung entsteht. Die Hälfte der Trainingsabtastrate ist die höchste Häufigkeit, die diese Rate darstellen kann. Ein 32-kHz-Modell kann Frequenzen bis zu 16 kHz darstellen, ein 40-kHz-Modell bis zu 20 kHz und ein 48-kHz-Modell bis zu 24 kHz. Für nutzbare Details über 20 kHz wählen Sie 48 kHz, wenn die Architektur und das Vortraining dies unterstützen. Verwenden Sie die niedrigere kompatible Rate, wenn diese bereits die Quellbandbreite abdeckt. Durch die Vorverarbeitung können Aufnahmen erneut abgetastet, fehlende Details jedoch nicht wiederhergestellt werden.

## Führen Sie die Phasen der Reihe nach aus.

 | Phase | Was sie erzeugt. | Was überprüft werden muss. |
| --- | --- | --- |
 | Datensatzvorverarbeitung | Für die Modellkonfiguration des Experiments vorbereitetes Audio. | Das Protokoll benennt den vorgesehenen Ordner und meldet die erfolgreiche Verarbeitung verwendbarer Dateien. Überprüfen Sie die übersprungenen Dateien, bevor Sie fortfahren. |
 | Merkmalsextraktion | Inhaltsmerkmale sowie Tonhöhendaten, wenn die gewählte Konfiguration dies erfordert. | Die Extraktion wird für das aktuelle Experiment mit der ausgewählten Einbettungs- und Pitch-Methode abgeschlossen. |
 | Modellschulung | Prüfpunkte und Inferenzexporte gemäß den konfigurierten Speicheroptionen. | Trainingsschritte werden vorgezogen und erwartete Dateien werden gespeichert. Lesen Sie den ersten Fehler, wenn der Fortschritt stoppt. |
 | Abrufindex | Eine durchsuchbare Sammlung von Datensatzfunktionen zur optionalen Verwendung während der Konvertierung. | Der Index gehört zu diesem Experiment und entspricht der exportierten Stimme. Wenn Sie es übersprungen haben, testen Sie das Modell unabhängig. |

Nutzen Sie den automatischen Workflow, sofern verfügbar, oder schließen Sie jede Phase ab und überprüfen Sie sie, bevor Sie mit der nächsten beginnen. Ein geänderter Datensatz oder eine geänderte Abtastrate kann vorbereitetes Audio und extrahierte Funktionen ungültig machen. Ein geänderter Einbetter erfordert eine neue Feature-Extraktion. Wenn Sie eine inkompatible Konfiguration testen, starten Sie ein separates Experiment, damit vorhandene Caches und Prüfpunkte verfügbar bleiben.

## Verfolgen Sie den Fortschritt in Ilaria RVC.

- Verwenden Sie das **Trainings-Dashboard**, um die Schrittzahl, die Zeit pro Epoche und die Verlustkurven zu überprüfen. Eine Kurve kann helfen, einen ins Stocken geratenen Lauf zu erklären, während Hörtests Aufschluss darüber geben, wie die Ausgabe klingt.
- Konfigurieren Sie **Trainingsvorschauen** mit einem konstanten Testclip, damit die App beim Speichern von Kontrollpunkten vergleichbare Conversions generieren kann.
- Wenn Sie die **Trainingswarteschlange** verwenden, legen Sie für jeden Job einen eindeutigen Experimentnamen und einen eindeutigen Datensatz fest. Bevor Sie fortfahren oder es erneut versuchen, bestätigen Sie, welche Phasen der Auftrag abgeschlossen hat und wo die Ausgabe gespeichert wird.
- Wenn Ihre Version **Stoppen und speichern** verfügbar macht, verwenden Sie diese Option, wenn Sie unterbrechen und später fortfahren müssen. Warten Sie, bis der Checkpoint mit dem Schreiben fertig ist, bevor Sie die App schließen.

Ilaria RVC 2.1.0 unterstützt Epochen- und Gesamtschrittziele, einschließlich der Wiederaufnahme während einer Epoche für Schrittziele. Andere Frontends können andere Steuerelemente verfügbar machen und das Verhalten fortsetzen.

### Vergleichen Sie Trainingsbudgets schrittweise

Eine Epoche ist ein Durchgang durch den vorbereiteten Datensatz. Ein Trainingsschritt ist ein Batch-Update. Teilen Sie die Anzahl der Clips nach der Vorverarbeitung durch die effektive Stapelgröße, um die Schritte pro Epoche abzuschätzen. Beispielsweise ergeben 10.000 Clips bei einer Stapelgröße von 8 1.250 Stapel pro Epoche in einem Einzelarbeiterlauf. Verworfene Teilstapel, mehrere GPUs oder die Akkumulation von Farbverläufen können die Art und Weise ändern, wie der Trainer Aktualisierungen zählt. Verwenden Sie beim Vergleich von Experimenten die von Ihrem Lauf gemeldete Anzahl.

Wählen Sie ein Speicherintervall, das Ihnen mehrere Prüfpunkte zum Anhören bietet. Das Speichern etwa alle 40 Epochen ist ein möglicher Ausgangspunkt für einen Lauf, der in Hunderten von Epochen gemessen wird. Verwenden Sie für jeden Vergleich dieselben zurückgehaltenen Clips und Inferenzeinstellungen. Achten Sie auf Verständlichkeit, stabile Tonhöhe, natürliche Pausen und Konsonanten, die klar bleiben. Wenn spätere Exporte härter klingen oder nur bei wenigen Phrasen gut funktionieren, vergleichen Sie sie mit einem früheren Prüfpunkt und überprüfen Sie den Datensatz auf wiederholte Aufnahmen oder Artefakte. Wählen Sie den Prüfpunkt aus, der für Ihre beabsichtigten Eingaben am besten funktioniert.

## Vergleichen Sie Exporte durch Zuhören

Öffnen Sie die Inferenz mit einer exportierten `.pth`. Verwenden Sie dieselben kurzzeitigen Aufzeichnungen und dieselben Konvertierungseinstellungen, um Modelle von verschiedenen Kontrollpunkten zu vergleichen. Wenn Sie einen Indexvergleich durchführen, halten Sie den Prüfpunkt ruhig und vergleichen Sie denselben Clip mit deaktiviertem und aktiviertem Abruf.

Vergleichen Sie diese vier Eigenschaften bei allen Exporten.

1. **Timbre.** Ähnelt die konvertierte Aufnahme dem beabsichtigten Gesangscharakter in der gesamten Phrase?
2. **Verständlichkeit.** Sind Konsonanten und Wortendungen noch leicht zu verstehen?
3. **Tonhöhenstabilität.** Springen, trillern oder verlieren Noten oder Silben ihren beabsichtigten Tonfall?
4. **Artefakte.** Fügt die Ausgabe Brummen, eingebettete Raumgeräusche, scharfe Ausläufer oder seltsame Übergänge hinzu?

Behalten Sie den am besten klingenden Export und seine Testausgänge bei. Es kann sich lohnen, weitere Epochen auszuprobieren, wenn sich die Ergebnisse in mehreren Beispielen verbessern. Wenn spätere Exporte nur einen Clip verbessern oder beginnen, Fehler im Datensatz zu reproduzieren, kehren Sie zur besten Ausgangslage zurück und überprüfen Sie die Aufnahmen.

## Exportieren, fortsetzen oder teilen

- **In Inferenz verwenden.** Wählen Sie das exportierte Modell `.pth`. Halten Sie das entsprechende `.index` daneben, wenn Sie es abrufen möchten. Notieren Sie alle erforderlichen Embedder-, unterstützten Client- und Sample-Rate-Informationen.
- **Training fortsetzen.** Sichern Sie das Experiment und behalten Sie die passenden Prüfpunkte für das Generator- und Diskriminatortraining bei, die allgemein als `G_*.pth` und `D_*.pth` bezeichnet werden. Fahren Sie mit demselben Experiment und der gleichen kompatiblen Konfiguration fort und überprüfen Sie dann das Protokoll auf den erwarteten Prüfpunkt und Schritt oder die erwartete Epoche. Bei einem Inferenzexport allein fehlt der vollständige Trainingszustand.
- **Teilen Sie ein Modell.** Geben Sie nur Dateien frei, für deren Verbreitung Sie berechtigt sind. Fügen Sie Hörbeispiele, Kompatibilitätshinweise, ggf. den passenden Index und alle vom Empfänger benötigten Nutzungsbedingungen hinzu.

In Ilaria RVC verwenden aktuelle Versionen die Modellbibliothek für Inferenzexporte und zugehörige Indizes. Exportpfade und Benennung können je nach Frontend unterschiedlich sein. Speichern Sie die Experimentprotokolle separat, wenn Sie das Modell später neu erstellen möchten.

## Diagnostizieren Sie einen fehlgeschlagenen Lauf.

 | Symptom. | Zuerst prüfen. |
| --- | --- |
 | Bei der Vorverarbeitung wurde kein Audio gefunden. | Überprüfen Sie den ausgewählten Datensatzordner und spielen Sie einen Eingabeclip ab. Überprüfen Sie, ob Ihr Build verschachtelte Ordner liest. |
 | Die Extraktion schlägt fehl oder meldet ein fehlendes Modell. | Überprüfen Sie die ausgewählten Embedder- und Pitch-Modell-Assets und lesen Sie die erste Meldung im Extraktionsprotokoll. |
 | GPU-Speicher geht zur Neige | Reduzieren Sie die Stapelgröße, stoppen Sie konkurrierende GPU-Jobs und deaktivieren Sie das GPU-Dataset-Caching, wenn Ihr Build diese Kontrolle bietet. Wiederholen Sie die fehlgeschlagene Phase. |
 | Das Training beginnt von vorne. | Überprüfen Sie, ob das Experiment auf kompatible Trainingskontrollpunkte verweist und dass alle Neustartoptionen deaktiviert sind. |
 | Ein `.pth` wird nicht zur Konvertierung geladen | Überprüfen Sie, ob Sie einen Trainingsprüfpunkt anstelle eines Inferenzexports ausgewählt haben, und überprüfen Sie die Architektur und die Embedder-Kompatibilität mit dem Client. |
 | Ein verwendbares Modell hat keinen Index | Überprüfen Sie, ob die Indexgenerierung übersprungen wurde oder fehlgeschlagen ist. Exportieren und testen Sie den Prüfpunkt unabhängig und erstellen Sie dann bei Bedarf seinen Index aus dem passenden Experiment. |

Behalten Sie die erste Fehlermeldung und die mit dem Lauf verknüpfte Konfiguration bei. Weitere Überprüfungen finden Sie unter [Fehlerbehebung](../reference/troubleshooting.md).
