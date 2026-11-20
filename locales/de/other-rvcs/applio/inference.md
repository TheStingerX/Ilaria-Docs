---
label: "Konvertieren Sie eine Aufnahme"
icon: ":studio_microphone:"
order: 95
permalink: /ilaria-rvc/applio/inference/
description: "Beginnen Sie mit einer kurzen Aufnahme, die Sie sofort wiedererkennen. Gesprochenes Testmaterial könnte sein: „Könnten Sie das blaue Buch ans Fenster..."
---
# Konvertieren Sie eine Aufnahme in Applio

Beginnen Sie mit einer kurzen Aufnahme, die Sie sofort wiedererkennen. Gesprochenes Testmaterial könnte sein: „Könnten Sie das blaue Buch ans Fenster stellen?“ gefolgt von einer ruhigen Pause. Verwenden Sie für einen Song einige Sekunden einer isolierten Hauptstimme. Die Engine empfängt den in dieser Datei vorhandenen Ton, einschließlich Raumgeräuschen, Begleitgeräuschen oder anderen Lautsprechern.

## Führen Sie eine Referenzkonvertierung durch.

1. Öffnen Sie **Audio konvertieren**. Suchen Sie in älteren Gradio-Versionen nach **Inferenz**. Wählen Sie den Einzeldateimodus.
2. Wählen Sie die von Ihnen [installierte](models.md)] Inferenzstimme aus und bestätigen Sie den Embedder und die Sprecher-ID. Wenn die Einstellungen beim Ändern der Stimmen in Desktop wiederhergestellt wurden, überprüfen Sie sie, bevor Sie die neue Stimme verwenden.
3. Fügen Sie Ihre Audioaufnahme hinzu. Verwenden Sie **Pitch** bei 0 und deaktivieren Sie zusätzliche Verarbeitung und Effekte. Beginnen Sie mit einem Abrufeinfluss von 0. Wählen Sie WAV oder FLAC, damit Sie verlustfreie Ergebnisse vergleichen können.
4. Starten Sie die Konvertierung einmal. Sehen Sie sich in Desktop den Auftragsstatus an, wenn das Ergebnis in der Warteschlange steht. Lassen Sie in Gradio die Startkonsole geöffnet, um Fehler anzuzeigen, die nicht in den Browser passen.
5. Spielen Sie beide Dateien ab. Überprüfen Sie, ob die Wörter an den gleichen Stellen landen und dass die Ausgabe die Zielstimme enthält. Speichern Sie die Ausgabe in einem von Ihnen kontrollierten Ordner und notieren Sie die von Ihnen verwendeten Einstellungen.

## Ändern Sie jeweils einen Regler

| Regler | Ein nützliches erstes Experiment |
| --- | --- |
| Tonhöhenverschiebung | Versuchen Sie eine kleine Halbtonverschiebung, wenn die Quelle außerhalb des angenehmen Bereichs der Zielstimme liegt. +12 verdoppelt die Frequenz und −12 halbiert sie. Spielen Sie eine hohe und eine tiefe Phrase noch einmal ab, bevor Sie die Änderung auf einen Song anwenden. |
| Tonhöhenextraktor | Vergleichen Sie verfügbare Schätzer, wenn eine Note springt oder eine leise Phrase ihre Stimme verliert. Halten Sie das Modell, die Transposition und die Eingabe fest. |
| Suchfunktionsverhältnis | Wenn der richtige Index geladen ist, erhöhen Sie den Einfluss in kleinen Schritten. Achten Sie auf stärkere Zielcharaktere, gedämpfte Konsonanten oder unerwünschte Quellenlecks. |
| Lautstärkehüllkurve | Ein Wert nahe 0 folgt der Quelldynamik besser. Ein Wert nahe 1 behält mehr von der erzeugten Dynamik bei. Vergleichen Sie leise und laute Silben bei angepasster Wiedergabelautstärke. |
| Stimmlose Konsonanten schützen | Bei der aktuellen tonhöhengesteuerten Engine aktivieren Einstellungen unter 0,5 den Schutz. Niedrigere Werte erhöhen es. Versuchen Sie es mit einer Phrase mit Atemzügen und Konsonanten wie S, F oder T. |

**Split Audio** kann dabei helfen, eine lange Datei in Stücke zu verarbeiten. Hören Sie über die Verbindungen hinweg. **Clean Audio** kann unerwünschtes Rauschen reduzieren. Vergleichen Sie es daher mit einer sauberen Basislinie, um Änderungen an den Details vorzunehmen. **Vorgeschlagene Tonhöhe** leitet eine zielgerichtete Verschiebung ab und kann mit der manuellen Transposition interagieren. Testen Sie jedes einzeln. Durch **Post-Process** aktivierte Effekte gelten für das generierte Audio und können ein Konvertierungsproblem verschleiern.

## Führen Sie einen kleinen Batch aus.

1. Legen Sie zwei Arbeitsdateien und ein ruhigeres oder längeres Beispiel in einem Testeingabeordner ab.
2. Wählen Sie den Batch-Modus. Wählen Sie die Eingabe aus und verwenden Sie ein anderes Ziel, in das die Engine schreiben kann. Damit Gradio auf einem anderen Computer ausgeführt werden kann, müssen Pfade auf diesem Computer vorhanden sein.
3. Kopieren Sie die getesteten Modell-, Embedder-, Index- und Pitch-Einstellungen. Starten Sie den Test und überprüfen Sie die Ergebnisse, bevor Sie eine gesamte Sammlung verarbeiten.
4. Wenn eine Eingabe fehlschlägt, konvertieren Sie nur diese Datei mit denselben Einstellungen. Wenn dies nur im Batch fehlschlägt, überprüfen Sie den Pfad und die Ausgabebenennung. Speichern Sie die Dateien, die Sie behalten möchten, außerhalb des temporären Arbeitsspeichers.

## Diagnostizieren Sie das Ergebnis

- **Der Job hat kein Audio erzeugt.** Lesen Sie zuerst den Fehler. Überprüfen Sie, ob die Eingabe abgespielt wird, die Engine überprüft und das ausgewählte Modell ein Inferenzexport ist.
- **Tonhöhe klingt sprunghaft oder elektronisch.** Testen Sie den richtigen Embedder, einen Tonhöhenschätzer und einen sauberen Eingang ohne Effekte. Spielen Sie das Original erneut ab, um festzustellen, ob das Geräusch oder der Sprung bereits vorhanden war.
- **Sprache ist vorhanden, aber die Zielstimme klingt schwach.** Überprüfen Sie die Sprecher-ID und vergleichen Sie den Abruf nur, wenn Sie über den richtigen Index verfügen.
- **Die Datei schneidet oder pulsiert.** Testen Sie auf einem niedrigeren Quellenpegel und schalten Sie die Verarbeitung aus, die die Verstärkung ändert. Vergleichen Sie beim Singen den isolierten Gesang, bevor Sie ihn wieder in den Backing-Track mischen.
