---
label: "🎧 Bereiten Sie einen Datensatz vor"
order: 95
permalink: /dataset-preparation/
description: "Jeder Clip bringt dem Modell etwas über seine Zielstimme bei."
---
# Bereiten Sie einen Sprachdatensatz vor

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Jeder Clip bringt dem Modell etwas über seine Zielstimme bei. Entscheiden Sie vor dem Training, welche Teile dieser Stimme das Modell bearbeiten soll, und machen Sie dann Aufnahmen, die diese Teile deutlich zeigen. Beginnen Sie mit dem Material, zu dessen Verwendung Sie für Schulungen berechtigt sind, und bewahren Sie eine separate Kopie der Originaldateien auf.

## Wählen Sie Aufnahmen für Ihr Ziel aus.

 | Ziel. | Was Sie sammeln sollten. |
| --- | --- |
 | Konversationsrede. | Fragen, Aussagen, längere Sätze und kurze Antworten mit verschiedenen Konsonanten und Vokalen. |
 | Ausdrucksstarke Rede | Die beabsichtigten Vortragsstile sowohl auf ruhiger als auch auf nachdrücklicher Ebene. Zeichnen Sie Variationen über mehrere Phrasen hinweg auf. |
 | Singen | Ausgehaltene Vokale, Notenwechsel und Beispiele in der Nähe der angenehmen hohen und tiefen Enden des beabsichtigten Bereichs. |
 | Mehr als eine Sprache | Anschauliche Beispiele für die Laute und Phrasierungen, die sich in den verschiedenen Sprachen unterscheiden, aufgenommen vom selben Sprecher. |

> ContentVec kann mehrsprachige Modelle einschränken. Auch mit Trainingsdaten in der Zielsprache kann der Encoder Lautunterschiede verlieren. Lege Testaufnahmen pro Sprache zurück und vergleiche ihre Aussprache nach einem kurzen Trainingslauf. Wenn dieselben Fehler bei sauberen Testaufnahmen wiederholt auftreten, dokumentiere die Einschränkung für diese Sprache. Ein anderer Encoder oder andere Trainingseinstellungen beheben sie nicht zuverlässig.

Ein sauberer, abwechslungsreicher Satz von Aufnahmen ist ein besserer Ausgangspunkt als eine größere Sammlung wiederholter Phrasen oder beschädigter Audiodaten. Es gibt keine Dauer, die ein gutes Ergebnis garantiert. Prüfen Sie, was die Aufnahmen abdecken, bevor Sie entscheiden, ob Sie mehr Material benötigen.

## Planen Sie eine ausdrucksstarke Aufnahmesitzung

Eine Aufnahme kann frei von Rauschen sein und dennoch nur sehr wenig Stimme abdecken. Bauen Sie die Sitzung auf die Leistung auf, die Sie voraussichtlich konvertieren werden. Zeichnen Sie zum Erzählen eine klare Lektüre mit bewusster Formulierung auf. Berücksichtigen Sie bei Gesprächen spontane Antworten und Tempowechsel. Sammeln Sie zum Singen trockene A-cappella-Stücke im vorgesehenen Register, mit gehaltenen Vokalen und Übergängen zwischen den Noten. Allein die gesprochenen Zeilen geben dem Modell kaum Zugang zu diesen singenden Klängen.

Nehmen Sie sich selbst auf oder vereinbaren Sie vor der Aufnahme mit dem Darsteller das beabsichtigte Modell und dessen Verwendung. Lassen Sie bei einem Ferngespräch den Sprecher sein eigenes Mikrofon lokal aufzeichnen und verwenden Sie nur diese Spur.

 | Sitzungsblock | Beispielzuordnung | Was festgehalten werden soll |
| --- | --- | --- |
 | Ausdrucksstarke Erzählung | 10 Minuten | Lesen Sie eine Passage mit wechselnden Schwerpunkten, Emotionen und Tempo. |
 | Konversation | 10 Minuten | Sammeln Sie ungeschriebene Reden mit Fragen, kurzen Reaktionen und längeren Antworten. |
 | Phonetische Abdeckung | 10 Minuten | Verwenden Sie Material wie Harvard Sentences, The Rainbow Passage oder Comma Gets a Cure, um Vokale, Diphthonge, Stopps wie P/B/T/K und Zischlaute wie S/Z/SH zu üben. |
 | Leistungsbereich | 20 Minuten | Zeichnen Sie die Darbietung auf, die das Modell benötigt, von sanfter Sprache bis hin zu Projektion. Probieren Sie unterschiedliche Tempi, Emotionen und deutliches Kichern oder Seufzen aus, wo relevant. Berücksichtigen Sie bei einem mehrsprachigen Modell die gezielte Abdeckung der Zielsprachen. |

Dieser 50-Minuten-Plan ist ein Beispiel für ausdrucksstarke Sprache. Ein konzentrierter zehnminütiger Satz kann nützlicher sein als ein größerer Satz sich wiederholender oder beschädigter Aufnahmen. Fügen Sie Material hinzu, um eine hörbare Lücke in der Abdeckung zu schließen. Die Dauer des Datensatzes allein bestimmt nicht die Überanpassung.

### Richten Sie das Mikrofon ein

Nehmen Sie ein einzelnes Mikrofon auf einer Monospur auf. Verwenden Sie einen Pop-Filter oder einen Windschutz, halten Sie den Mikrofonabstand konstant und stellen Sie die Verstärkung ein, während Sie die geplante Leitung mit der höchsten Lautstärke testen. Ein ruhiger Raum mit weichen Möbeln reduziert Reflexionen an der Quelle. Bevorzugen Sie ein trockenes Original gegenüber einer stark gereinigten Aufnahme mit hörbarem Hall oder Trennungsartefakten. Wenn Sie vorhandene Stereoaufnahmen in Mono umwandeln, hören Sie sich beide Kanäle und das Fold-Down an. Verwenden Sie einen sauberen Kanal, wenn das kombinierte Signal hohl klingt oder Details verliert.

### Überprüfen Sie das vorbereitete Audio

- **Abtastrate:** Behalten Sie die Originale in ihrer Aufnahmerate bei. Wählen Sie eine Trainingsrate, die von der Architektur und den vorab trainierten Gewichten unterstützt wird. Die Vorverarbeitungsstufe kann bei Bedarf ein erneutes Abtasten durchführen. Beim Upsampling werden der Originalaufnahme keine Details hinzugefügt.
- **Stufen:** Vergleichen Sie Sitzungsstufen und beheben Sie große Verstärkungsunterschiede, die durch die Platzierung des Mikrofons oder die Aufnahmeeinstellungen verursacht werden. Bewahren Sie absichtliche Änderungen in der Übermittlung auf. Überprüfen Sie, was das Trainings-Frontend bereits normalisiert, bevor Sie einen separaten Lautstärkedurchlauf anwenden.
- **Atemzüge und Reaktionen:** Behalten Sie natürliche Atemzüge bei und reinigen Sie Ausdruckssignale dort, wo sie dem beabsichtigten Zweck dienen. Geschnittenes Lachen, harsches Keuchen und explosive Ausbrüche. Hören Sie unsichere Bearbeitungen über Kopfhörer vor.
- **Pausen:** Behalten Sie natürliche Pausen bei und entfernen Sie lange leere Abschnitte. Wenn Sie einen eigenständigen Stille-Clip testen möchten, führen Sie einen Vergleich mit denselben Einstellungen durch und hören Sie sich die ausgehaltenen Pausen an. Einige Vorverarbeitungspipelines verarbeiten bereits Stille.

## Nehmen Sie sauberes Material auf oder wählen Sie es aus.

- Verwenden Sie einen Lautsprecher für ein erstes Modell. Schließen Sie überlappende Stimmen, Publikumsreaktionen und Dialoge aus, bei denen der Sprecher mitten im Clip wechselt.
- Achten Sie auf Lüftergeräusche, Echos, Musik und digitale Verzerrungen. Ein Clip, der in einem lauten Mix akzeptabel klingt, kann dennoch Probleme enthalten, die offensichtlich sind, wenn die Stimme isoliert ist.
- Wenn Sie eine neue Sitzung aufzeichnen, verwenden Sie eine einheitliche Mikrofonposition und lassen Sie maximalen Headroom. Testen Sie die lauteste Phrase, bevor Sie die gesamte Sitzung aufzeichnen.
- Wenn Sie Sitzungen kombinieren, hören Sie sie nebeneinander. Behalten Sie nützliche Variationen in der Stimme bei und vermeiden Sie abrupte Unterschiede, die durch starke Effekte, Raumgeräusche oder ein unzuverlässiges Mikrofon verursacht werden.
- Entfernen Sie doppelte Takes, wenn sie wenig Abwechslung bieten. Legen Sie verschiedene Sitzungen oder Passagen zur Auswertung beiseite, bevor Sie benachbarte Schnitte im Schulungsordner bearbeiten.

## Bereinigen Sie eine Arbeitskopie.

1. **Isolieren Sie die Zielstimme.** Wenn die Quelle eine Begleitung enthält, versuchen Sie, den resultierenden Stimmstamm zu trennen und anzuhören. Lehnen Sie Abschnitte mit Instrumentenausblutungen, Hintergrundgesang oder offensichtlichen Trennungsartefakten ab.
2. **Schneiden Sie an natürlichen Grenzen.** Schneiden Sie lange tote Luft ab und entfernen Sie unbrauchbare Abschnitte. Achten Sie bei jedem Schnitt auf verlorene Konsonanten, abrupte Änderungen oder darauf, ob ein zweiter Sprecher hinzukommt.
3. **Wenden Sie nur die Bereinigung an, die für die Aufnahme erforderlich ist.** Vergleichen Sie alle Entrauschungsdurchgänge mit dem Original. Wenn die bereinigte Version Konsonanten verschluckt, Silben verwischt oder einen pulsierenden Ton einführt, reduzieren Sie die Verarbeitung oder ersetzen Sie den Take.
4. **Überprüfen Sie die Pegel aller Dateien.** Sorgen Sie für ausreichend Spielraum für laute Passagen und gleichen Sie große Unterschiede im Aufnahmepegel aus. Wenn Sie die Lautstärke einer bereits ausgeschnittenen Datei verringern, bleiben die beschädigten Spitzen in der Aufnahme erhalten.
5. **Exportieren Sie in einem verlustfreien Format, das Ihr Build lesen kann.** WAV ist ein praktisches Arbeitsformat. Durch die Neukodierung einer komprimierten Datei als WAV bleibt das Ergebnis dieser Dekodierung erhalten und verlorene Details können nicht wiederhergestellt werden.

Die Trainings-Engine kann Dateien in eigene Segmente unterteilen und sie an die ausgewählte Modellkonfiguration anpassen. Halten Sie verwendbare Wörter und Phrasen während der manuellen Bearbeitung intakt und lassen Sie die Trainingsvorverarbeitungsphase ihre eigene Segmentierung durchführen.

## Organisieren Sie den Datensatz und die Hörtests.

Bewahren Sie Vergleichseingaben, verworfene Aufzeichnungen und konvertierte Ausgaben außerhalb des Trainingsordners auf. In diesem Beispiel werden separate Ordner für Originale, Schulung und Bewertung verwendet.

```text
my-voice-project/
  originals/
  training-audio/
    session-a-01.wav
    session-a-02.wav
    session-b-01.wav
  evaluation/
    speech-test.wav
    expressive-test.wav
  notes.md
```

Punktvorverarbeitung bei `training-audio/`. Halten Sie `evaluation/` getrennt. Ein nützlicher Vergleichssatz könnte eine unbekannte gesprochene Phrase mit scharfen Konsonanten, eine ruhige Passage und eine kurze ausdrucksstarke Phrase umfassen. Fügen Sie für ein Gesangsmodell eine gehaltene Note und eine Phrase ein, die Register kreuzt. Halten Sie nach Möglichkeit ganze Passagen oder Sitzungen zurück, damit der Testton keine Duplikate in der Nähe von Trainingsclips darstellt.

Wenn Sie mit einer Schnittstelle trainieren, die mehr als einen Lautsprecher unterstützt, befolgen Sie die Regeln für Lautsprecherordner und ID. Ein Einzellautsprecher-Ordner mit Audiodateien direkt darin lässt sich beim ersten Durchlauf leichter prüfen.

## Überprüfen Sie den Datensatz in Ilaria RVC

Mit den neuesten RVC-Builds von Ilaria können Sie Audio- oder ZIP-Datensätze in die Trainingsoberfläche ziehen und dort importierte Datensätze verwalten. Wählen Sie den gewünschten Datensatz aus und führen Sie den **Dataset Checker** aus. Verwenden Sie die kurzen Vorschauen, um Dateien zu überprüfen, die aufgrund von Stille, Übersteuerung, inkonsistenten Pegeln oder Dekodierungsproblemen gekennzeichnet sind. Der **Audioanalysator** kann beim Vergleich verdächtiger Dateien mithilfe von Wellenform-, Tonhöhen- und Pegelmessungen helfen. Bestätigen Sie die Diagnose, indem Sie zuhören, bevor Sie ansonsten nützliches Material entfernen. Verfügbarkeits- und Kontrollbezeichnungen folgen Ihrer installierten Version.

 | Was Ihnen auffällt | Was vor dem Training zu tun ist |
| --- | --- |
 | Datei wird nicht dekodiert | Überprüfen Sie, ob sie in einem Editor abgespielt wird. Führen Sie nach Möglichkeit einen erneuten Export vom Original durch und überprüfen Sie, ob die Kopie geöffnet wird. |
 | Abschnitte der Beinahe-Stille | Hören Sie sich den markierten Bereich an und kürzen Sie leere Bereiche. Halten Sie natürliche Pausen ein, um die Phrasengrenzen beizubehalten. |
 | Verzerrte oder abgeflachte Spitzen | Vergleichen Sie mit der Originalaufnahme. Ersetzen Sie einen hörbar abgeschnittenen Take, wenn Sie eine saubere Alternative haben. |
 | Hintergrundgeräusche folgen der Stimme. | Hören Sie sich den isolierten Stamm im Kopfhörer an und schließen Sie die betroffenen Teile aus, wenn die Trennung instabil klingt. |
 | Eine Sitzung ist viel leiser | Überprüfen Sie, ob die Leistung des Lautsprechers absichtlich leise ist. Passen Sie Unterschiede in der Aufnahmeverstärkung an und bewahren Sie gleichzeitig die nützliche natürliche Dynamik. |

Bevor Sie fortfahren, spielen Sie einige Clips aus jeder Sitzung ab, bestätigen Sie, dass Sie den vorbereiteten Ordner ausgewählt haben, und notieren Sie die Ordnerversion in Ihren Notizen. Dann [führen Sie ein Trainingsexperiment durch](training.md).

[VRAM- und Trainingsrechner](../reference/vram-estimator.md)
