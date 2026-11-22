---
label: "🎙️ Sprachkonvertierung"
order: 95
permalink: /voice-conversion/
description: "Die Sprachkonvertierung beginnt mit einer Aufführung."
---
# Konvertieren Sie eine Aufnahme mit Ilaria RVC

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Die Sprachkonvertierung beginnt mit einer Aufführung. Die Ausgabe folgt normalerweise den Quellwörtern, dem Timing, der Artikulation und der Tonhöhenkontur und verändert gleichzeitig den Klang der Stimme. Entscheidungen über die Auslieferung beginnen immer noch mit der Originalaufnahme. Planen Sie für ein gesungenes Cover, einen isolierten Hauptgesang umzuwandeln und den umgewandelten Gesang anschließend mit dem Instrumental zu mischen.

## Führen Sie eine Basiskonvertierung durch.

1. Öffnen Sie Ilaria RVC und importieren Sie das Inferenzmodell, das Sie verwenden möchten. Ein optionaler Index gehört zu dem Prüfpunkt, für den er erstellt wurde. Wenn im Selektor keine importierte Stimme vorhanden ist, siehe [RVC-Modelle und -Dateien](../start/models.md)].
2. Öffnen Sie **Single Inference**, wählen Sie die Stimme aus und ziehen Sie eine kurze Aufnahme hinein, die Sie am Gehör erkennen können. Eine Phrase mit einer Pause, mehreren Konsonanten und einem längeren Vokal ist eine nützliche Referenz.
3. Setzen Sie **Pitch** auf Null und **Index Ratio** auf Null. Passen Sie den Inhaltseinbetter an den im Training verwendeten an, wenn der Modellautor ihn bereitstellt. Beginnen Sie mit dem Standard-Pitch-Extraktor der App und lassen Sie die optionale Audioverarbeitung deaktiviert.
4. Konvertieren Sie die Datei und überprüfen Sie die Ausgabe. Verwenden Sie den Waveform-Player, um dieselbe Phrase erneut aufzurufen, und speichern Sie dann eine WAV- oder FLAC-Kopie als Basislinie.
5. Vergleichen Sie den Original- und den konvertierten Clip bei ähnlichen Wiedergabepegeln. Notieren Sie sich das erste hörbare Problem und entscheiden Sie anhand von [Tonhöhe und Audioqualität](audio-quality.md)], was geändert werden soll.

Aktuelle Versionen von Ilaria RVC suchen automatisch nach einem passenden Index, wenn Sie eine Stimme auswählen. Die Auswahl eines Index und die Gewährung von Einfluss sind separate Aktionen. Ein geladener Index leistet nur dann einen Beitrag, wenn das **Indexverhältnis** über Null liegt. Ältere Builds zeigen möglicherweise ein anderes Layout oder fordern Sie auf, den Index manuell auszuwählen.

## Wählen Sie eine Quelle, die zur Aufgabe passt

 | Arbeitsablauf | Bereiten Sie die Quelle vor | Achten Sie auf |
| --- | --- | --- |
 | Dialog oder Erzählung | Verwenden Sie einen Lautsprecher pro Eingabespur und halten Sie eine kurze natürliche Pause zwischen den Zeilen ein. | Klare Wörter, intakte Wortendungen und einheitlicher Ton zwischen den Sätzen. |
 | Eine Hauptstimme über der Musik. | Isolieren Sie die Hauptstimme. Belassen Sie das Instrumental, die Hintergrundstimmen und die Harmonien in ihren eigenen Spuren. | Stabile anhaltende Noten und Konsonanten, die immer noch im Takt sind. |
 | Mehrere Takes | Beschriften Sie jede Aufnahme nach Szene oder Abschnitt und behalten Sie die ursprünglichen Dateinamen in Ihren Notizen bei. | Eine konsistente Stimme über Takes hinweg, die mit unterschiedlichen Pegeln oder Tonhöhen aufgenommen wurden. |
 | Gesprochener Text über TTS | Vorschau der generierten Sprache vor der Anwendung des Modells. Passen Sie zunächst die Zeichensetzung oder Formulierung im Text an. | Korrekte Aussprache und absichtliches Tempo vor der RVC-Stufe. |

Wenn eine getrennte Gesangsstimme noch laute Becken oder einen anderen Sänger enthält, vergleichen Sie sie mit einer saubereren Aufnahme oder Trennung. Diese Geräusche erreichen die Konvertierungs-Engine zusammen mit der beabsichtigten Stimme. Behalten Sie Atemzüge und Wortendungen dort bei, wo sie für die Darbietung wichtig sind.

## Konvertieren Sie einen Stapel

Öffnen Sie **Batch Inference**, nachdem eine einzelne Datei ein brauchbares Ergebnis liefert. Gruppieren Sie Dateien, die das gleiche Modell, die gleiche Steigung und das gleiche Verarbeitungsprofil benötigen. Führen Sie eine repräsentative Datei von jeder Gruppe aus und speichern Sie sie an einem separaten Ausgabeort, damit Sie die Ergebnisse sicher vergleichen können.

Hören Sie sich bei einem langen Song einen Abschnitt mit sichtbaren hohen oder tiefen Noten an, bevor Sie die gesamte Datei konvertieren. **Split Audio** kann bei langen Aufnahmen oder Speicherbeschränkungen helfen. Hören Sie nach dem Lauf über Segmentverbindungen und Pausen hinweg. Wenn eine Version der App ein Konsolen- oder Konvertierungsprotokoll bereitstellt, identifizieren Sie damit alle fehlgeschlagenen Elemente und versuchen Sie es separat mit diesen Dateien.

## Konvertieren Sie generierte Sprache

Geben Sie in einer Version mit dem **TTS**-Arbeitsbereich Text oder eine UTF-8-Textdatei an. Aktuelle Ilaria RVC-Versionen bieten Microsoft Edge-Online-Stimmen und installierte Windows-Stimmen für Offline-TTS. Wählen Sie eine Quellstimme in der Sprache des Skripts aus, achten Sie auf Aussprache und Pausen und wenden Sie dann das RVC-Modell auf die generierte Aufnahme an. Wenn in der ersten Stufe ein Name falsch vorgelesen wird, korrigieren Sie zuerst den Text oder ändern Sie die TTS-Stimme. RVC übernimmt im Allgemeinen die Auswahl der Quellaussprache.

Wenn Datenschutz oder eine unzuverlässige Verbindung wichtig sind, wählen Sie eine installierte Windows-Stimme aus und prüfen Sie, ob sie mit Ihrem Text funktioniert, bevor Sie mit einer längeren Arbeit beginnen. Für die Edge-Option ist eine Netzwerkverbindung erforderlich.

## Speichern Sie die Konvertierung und Ihre Einstellungen

- Behalten Sie einen unbearbeiteten WAV- oder FLAC-Master bei, bevor Sie Komprimierung, Hall oder Begrenzung hinzufügen.
- Gleichen Sie bei Musik die konvertierte Stimme mit dem Original ab, überprüfen Sie das Timing bei Konsonanten und hören Sie sich vor dem Export sowohl Solo als auch im Mix an.
- Speichern Sie Ihre Einstellungen zusammen mit dem Ergebnis. Geben Sie die Quelldatei, die Modell- und Indexversionen, ggf. die Sprecher-ID, den Embedder, den Tonhöhenextraktor, die Tonhöhenverschiebung, das Indexverhältnis, die Verarbeitung und das Ausgabeformat an.
- Wenn ein Modell fehlt oder die Inferenz vor der Audioproduktion fehlschlägt, beginnen Sie mit [Fehlerbehebung](../reference/troubleshooting.md). Informationen zur Mikrofonkonvertierung finden Sie unter [Sprachkonvertierung in Echtzeit](real-time.md).

## Konvertieren Sie eine Aufnahme in RVC WebUI (Mainline - Original RVC). {#convert-a-recording-in-mainline-rvc}

### Richten Sie die WebUI ein

Verwenden Sie unter Windows ein RVC WebUI (Mainline - Original RVC)-Paket, das mit Ihrer Hardware kompatibel ist. Extrahieren Sie das gesamte Archiv in ein lokales Verzeichnis, bevor Sie den Launcher ausführen. Windows-Pakete, die `go-web.bat` enthalten, verwenden es, um die lokale WebUI zu starten. Lassen Sie die Konsole während der Konvertierung geöffnet. Wenn der Browser nicht automatisch geöffnet wird, verwenden Sie die in der Konsole aufgedruckte lokale Adresse.

### Laden Sie das Modell und konvertieren Sie

Platzieren Sie den Inferenzprüfpunkt in `assets/weights` und seinen passenden Abrufindex, falls angegeben, unter `logs`. Öffnen Sie **Model Inference** und aktualisieren Sie die Sprach- und Indexlisten. Wählen Sie den Prüfpunkt und den passenden Index. Setzen Sie das Abrufverhältnis für Modelle ohne Index auf Null.

Geben Sie der WebUI den vollständigen Pfad zu einer kurzen lokalen WAV-Datei. Wenn der Pfad fehlschlägt, kopieren Sie die Testdatei an einen einfachen Speicherort wie `C:\RVC\input\test.wav`. Halten Sie die Transposition beim ersten Durchgang auf Null und wählen Sie RMVPE, wenn Ihr Build dies bietet. Klicken Sie auf **Konvertieren**, hören Sie sich dann den Ausgabeplayer an und speichern Sie das Ergebnis mit der Download-Steuerung. Wenn die Generierung fehlschlägt, lesen Sie die Konsolenmeldung, bevor Sie die Einstellungen ändern. Ein Modell, das nicht in der Liste angezeigt wird, muss normalerweise in das Gewichtungsverzeichnis verschoben oder mithilfe der Aktualisierung neu ermittelt werden.

## Konvertieren Sie eine Aufnahme in Applio. {#convert-a-recording-in-applio}

### Richten Sie einen Einzeldateitest ein

Warten Sie in Desktop, bis die Engine bereit ist, fügen Sie das Inferenzmodell zur Bibliothek hinzu und öffnen Sie **Convert Audio** im Einzeldateimodus. Öffnen Sie in Gradio die Browseroberfläche und wählen Sie je nach Version **Audio konvertieren** oder **Inferenz** aus. Aktualisieren Sie die Modellliste, nachdem Sie einen Prüfpunkt hinzugefügt haben, falls dieser fehlt.

Wählen Sie die Stimme und den zugehörigen Index aus und bestätigen Sie dann den von diesem Modell erwarteten Inhaltseinbetter. Laden Sie eine kurze Aufnahme und wählen Sie für den Test WAV oder FLAC. Überprüfen Sie, ob Einstellungen aus einem vorherigen Lauf übernommen wurden, insbesondere Tonhöhe, Abruf und Effekte. Eine nützliche Grundlinie beginnt bei null Halbtönen und deaktivierten Effekten. Starten Sie den Job einmal, warten Sie auf die Ausgabe und vergleichen Sie die gleiche Phrase in beiden Aufnahmen.

### Optimieren Sie den Test, bevor Sie eine Charge ausführen.

 | Was Sie hören. | Was Sie ausprobieren sollten |
| --- | --- |
 | Noten springen oder wackeln | Vergleichen Sie Tonhöhenextraktoren mit derselben Phrase und testen Sie dann die Transposition separat. |
| Die konvertierte Stimme behält die ursprüngliche Klangfarbe | Generische HuBERT-Encoder können Sprechermerkmale erhalten. Prüfe, ob der Encoder zum Modell passt, und teste saubere Aufnahmen ohne Retrieval. Wenn der Trainingsencoder die Ausgangsstimme durchlässt, trainiere mit einem kompatiblen Encoder wie ContentVec neu und erstelle den Index erneut. |
| Verzerrte Zischlaute oder Atemgeräusche | Teste weniger Retrieval und stärkeren Schutz stimmloser Laute getrennt. Wenn der Fehler bei mehreren sauberen Aufnahmen bleibt, korrigiere oder ergänze entsprechende Trainingsbeispiele und trainiere neu. |
 | Die Lautstärke der Sprache ist ungleichmäßig. | Passen Sie die Lautstärke an oder pegeln Sie den fertigen Titel ein. Überprüfen Sie, ob die Quelle selbst sauber ist. |

Wenn die Baseline funktioniert, wechseln Sie zu **Batch** und wählen Sie je nach Edition mehrere Dateien oder ein Eingabeverzeichnis aus. Bewahren Sie die Ausgabe an einem separaten Ort auf. Verwenden Sie einen anderen Lauf für Dateien, die unterschiedliche Tonhöheneinstellungen erfordern, und hören Sie sich mindestens ein Ergebnis jeder Gruppe an, bevor Sie den gesamten Stapel verwenden.

Für Probleme beim Modellimport und detaillierte Einstellungserklärungen verwenden Sie [RVC-Modelle und -Dateien](../start/models.md), [Tonhöhe und Audioqualität](audio-quality.md) und [Fehlerbehebung](../reference/troubleshooting.md)].
