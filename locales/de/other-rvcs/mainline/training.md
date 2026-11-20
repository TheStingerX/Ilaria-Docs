---
label: "Trainieren und exportieren Sie ein Modell"
icon: ":test_tube:"
order: 20
permalink: /ilaria-rvc/mainline/training/
description: "Beginnen Sie mit einem einzelnen Sprecher und einem neuen Experimentnamen."
---

# Trainieren und exportieren Sie ein RVC WebUI (Mainline - Original RVC)-Modell

Beginnen Sie mit einem einzelnen Sprecher und einem neuen Experimentnamen. Durch das Training entsteht ein Modell, das Sie an neuen Leistungen in der [Inferenzschnittstelle](inference.md)] testen können. Bewahren Sie Rohton und das Experimentprotokoll auf, damit Sie Ihr Ergebnis reproduzieren können.

## Bereiten Sie die Dateien vor.

1. Legen Sie saubere Sprachaufnahmen in einem lokalen Ordner wie `C:\RVC\datasets\voice_a` ab. Bewahren Sie Backups an anderer Stelle auf. Verwenden Sie Aufzeichnungen, mit denen Sie trainieren dürfen. Überprüfen Sie, ob Sie mehrere Dateien abspielen können und ob diese die gewünschte Stimme ohne Hintergrundmusik oder unabhängige Lautsprecher enthalten.
2. Halten Sie eine oder zwei kurze Aufzeichnungen verschiedener Phrasen außerhalb des Datensatzes. Verwenden Sie diese als Testeingaben für jeden Kontrollpunkt. Stellen Sie bei einem Datensatz zum Singen sicher, dass Sie über Material mit dem entsprechenden Stimmumfang verfügen, und testen Sie es mit einer isolierten Stimme.
3. Wenn Sie von der Quelle installiert haben, öffnen Sie dieselbe Umgebung, die zum Ausführen der WebUI verwendet wurde, und rufen Sie die passenden vorab trainierten Gewichtungen und Silence-Assets ab. Paketversionen können sie bereits enthalten.

```text
hf download lj1995/VoiceConversionWebUI --include "pretrained/*" "pretrained_v2/*" --local-dir assets
hf download lj1995/VoiceConversionWebUI mute.zip --local-dir .model-downloads
python -m zipfile -e .model-downloads/mute.zip logs
```

Siehe [Datensatzvorbereitung](../../model-training/dataset-preparation.md) für Einzelheiten zur Aufzeichnung und Bereinigung.

## Konfigurieren Sie das Experiment und verarbeiten Sie Audio.

1. Öffnen Sie **Train**. Verwenden Sie einen neuen Namen wie `voice_a_v2_40k`, damit RVC WebUI (Mainline - Original RVC) einen separaten Ordner unter `logs/` erstellt.
2. Wählen Sie eine Ziel-Abtastrate und eine Architekturversion, die von Ihrer Version unterstützt wird. V2 ist ein sinnvoller Ausgangspunkt, wenn Sie planen, einen kompatiblen V2-Inferenz-Client zu verwenden. Rate, Architektur und Tonhöhenführung müssen mit den Generator- und Diskriminator-Vorzügen übereinstimmen. Verwenden Sie die Tonhöhenführung für ein normales tonhöhengesteuertes Sprachmodell.
3. Wählen Sie einen Datensatz mit einem einzigen Sprecher aus, bei dem der Build eine Auswahl bietet. Verwenden Sie für den ersten Durchgang die Sprecher-ID `0`. Fügen Sie den vollständigen Datensatzordnerpfad ein und klicken Sie dann auf **Daten verarbeiten** oder die entsprechende Vorverarbeitungsschaltfläche.
4. Warten Sie, bis die Vorverarbeitung abgeschlossen ist. Überprüfen Sie die Warnungen in der Ausgabe und stellen Sie sicher, dass das Experiment verarbeitetes Audio erzeugt hat. Wenn der Lauf nichts ergibt, überprüfen Sie den Pfad und testen Sie, ob die enthaltenen Audiodateien dekodiert werden. Beheben Sie dieses Problem, bevor Sie mit der Extraktion beginnen.

Halten Sie für ein Experiment mit mehreren Sprechern in einem Build mit **Multi-Speaker Dataset Helper** die Dateien jedes Sprechers getrennt und weisen Sie stabile Sprecher-IDs zu. Überprüfen Sie das generierte Manifest und verwenden Sie dieselben IDs später bei der Konvertierung. Führen Sie zunächst einen Durchgang mit nur einem Sprecher durch, damit Sie über eine funktionierende Grundlinie verfügen.

## Tonhöhe und Funktionen extrahieren

1. Wählen Sie den GPU-Index, der von der Schnittstelle angezeigt wird. Für eine GPU ist die ID üblicherweise `0`. Gerätefelder für verschiedene Vorgänge können getrennt sein. Kopieren Sie die verfügbaren IDs, anstatt einen bestimmten Steckplatz anzunehmen.
2. Wählen Sie einen Pitch-Extraktor aus, den der Build ausführen kann. Wenn eine GPU-RMVPE-Option verfügbar ist und auf Ihrem System funktioniert, beginnen Sie dort. Eine CPU-Option kann dabei helfen, ein Backend-Problem einzugrenzen. Für die Feature-Extraktion sind außerdem die in [setup](installation.md)] installierten freigegebenen HuBERT-Assets erforderlich.
3. Führen Sie **Feature-Extraktion** aus und warten Sie, bis sowohl der erforderliche Pitch als auch die Content-Feature-Phase abgeschlossen sind. Wenn eine Stufe keine verwendbaren Dateien protokolliert, stoppen Sie den Vorgang und beheben Sie die Ursache. Durch das Ändern des Datensatzes, der Modellversion oder der Zielrate ändert sich das Experiment. Verwenden Sie beim Vergleich inkompatibler Einstellungen einen neuen Experimentnamen.

> Generische HuBERT-Checkpoints sind als Standardencoder für Stimmkonvertierung nicht empfohlen. Sie wurden für Sprachrepräsentationen trainiert und können Merkmale der Klangfarbe der Ausgangsstimme in die Ausgabe übertragen. Verwende den Encoder, den das RVC-Modell erwartet, etwa ContentVec, wenn das Modell damit trainiert wurde.

## Kontrollpunkte trainieren und speichern

1. Überprüfen Sie die Generator- und Diskriminatorfelder im Trainingsbereich. Sie sollten sich auf ein passendes Paar für die von Ihnen ausgewählte Version, Samplerate und Pitch-Modus beziehen. Wenn in einem Protokoll steht, dass die Dateien übersprungen wurden, stellen Sie sicher, dass Sie mit der beabsichtigten Einrichtung trainieren, bevor Sie fortfahren.
2. Beginnen Sie mit einem Stapel, der in den Speicher passt, und lassen Sie das Dataset-Caching für den ersten Test ausgeschaltet. Wenn der GPU nicht mehr genügend Arbeitsspeicher zur Verfügung steht, stoppen Sie den fehlgeschlagenen Auftrag und verringern Sie die Stapelgröße. Vermeiden Sie es, parallel zum ersten Trainingslauf eine Live-Konvertierung durchzuführen.
3. Legen Sie ein begrenztes Testziel und ein Intervall fest, das mehrere Kontrollpunkte speichert, die Sie später vergleichen können. Wenn Sie möchten, dass Zwischenmodelle für die Inferenz bereitstehen, aktivieren Sie, sofern verfügbar, den Export kleinerer Modelle zum Speichern von Zeit. Das Beibehalten nur der neuesten Trainingskontrollpunkte spart Platz, schränkt aber die Wiederaufnahme von früheren Versionen ein.
4. Klicken Sie auf **Modell trainieren**. Beobachten Sie den Experimentstatus und bestätigen Sie die Fortschritte im Trainingsprotokoll über die Epochen hinweg. Verwenden Sie die Stoppsteuerung der Anwendung, sofern verfügbar, und warten Sie, bis das Schreiben der Dateien abgeschlossen ist, bevor Sie den Vorgang schließen.

Trainingskurven zeigen, ob der Job läuft oder Fehler produziert. Wählen Sie das endgültige Modell, indem Sie dieselben Testaufzeichnungen mit mehreren gespeicherten Inferenzexporten konvertieren. Vergleichen Sie Wörter, Konsonanten, Pausen und schwierige Noten in ähnlicher Lautstärke. Je nach Datensatz können weitere Epochen helfen, die Ergebnisse stabilisieren oder verschlechtern.

## Erstellen, testen und sichern

1. Klicken Sie nach erfolgreicher Extraktion auf **Funktionsindex trainieren**, wenn Sie einen Abrufindex wünschen. Suchen Sie in der Experimentausgabe nach der ausgefüllten `added_*.index`, mit einer erkennbaren Kopie oder einem Link, sofern Ihr Build dies bereitstellt. Überspringen Sie den Abruf, wenn Sie nur den Prüfpunkt selbst auswerten möchten.
2. Finden Sie das kleine exportierte Modell unter `assets/weights/`. Wenn Sie nur über einen Generator-Prüfpunkt verfügen, verwenden Sie **ckpt Processing** und das kleine Modellextraktionstool und liefern die passende Rate, das Pitch-Flag und die Version. Aktualisieren Sie die Modellliste in Inferenz und wählen Sie den kleinen Export aus.
3. Konvertieren Sie einen zurückgehaltenen Clip mit einer Indexrate von Null. Sobald das funktioniert, versuchen Sie es mit dem passenden gefüllten Index. Speichern Sie beide Ausgaben zum Vergleich.
4. Sichern Sie das kleine Inferenzmodell und seinen passenden Index, um es zu verwenden oder zu teilen. Bewahren Sie den Experimentordner, einschließlich der passenden `G_*.pth` und `D_*.pth`, Konfiguration und Protokolle, auf, wenn Sie planen, das Training fortzusetzen.

| Symptom | Wo suchen |
| --- | --- |
| Die Vorverarbeitung wird ohne Audio beendet | Überprüfen Sie den Datensatzpfad, die Berechtigungen, die unterstützten Formate und ob die WAV-Dateien außerhalb von RVC geöffnet werden. |
| Die Merkmalsextraktion stoppt. | Identifizieren Sie, ob die Inhalts- oder Tonhöhenextraktion fehlgeschlagen ist. Überprüfen Sie die Modellressourcen und probieren Sie ein unterstütztes Backend aus. |
| Das Training beginnt und dann geht der VRAM aus | Reduzieren Sie die Stapelgröße, schalten Sie das Caching aus und geben Sie VRAM frei, bevor Sie es erneut versuchen. |
| Die Inferenz schlägt mit einem Prüfpunkt fehl. | Bestätigen Sie, dass Sie ein exportiertes Inferenzmodell ausgewählt haben. Testen Sie einen bekanntermaßen funktionierenden Prüfpunkt mit derselben Eingabe und ohne Index. |
| Die Indexgenerierung findet keine Features. | Wiederholen Sie die erfolgreiche Feature-Extraktion für dasselbe Experiment. Überprüfen Sie Versions- und Ordnernamen, bevor Sie versuchen, Dateien wiederzuverwenden. |
