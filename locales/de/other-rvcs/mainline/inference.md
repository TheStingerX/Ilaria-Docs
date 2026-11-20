---
label: "Aufnahmen konvertieren"
icon: ":studio_microphone:"
order: 30
permalink: /ilaria-rvc/mainline/inference/
description: "Beginnen Sie mit einer kurzen Aufnahme, die Sie in einem normalen Mediaplayer deutlich hören können, sowie einem exportierten RVC-Modell, zu dessen..."
---

# Aufnahmen in RVC WebUI (Mainline - Original RVC) konvertieren

Beginnen Sie mit einer kurzen Aufnahme, die Sie in einem normalen Mediaplayer deutlich hören können, sowie einem exportierten RVC-Modell, zu dessen Verwendung Sie berechtigt sind. Das Model verändert die Stimme in der Aufnahme. Die Quelle liefert den Text, den Rhythmus und den Vortrag. Verwenden Sie für einen Song im ersten Durchgang eine separat aufgenommene oder isolierte Gesangsspur.

## Platzieren Sie jede Datei an der richtigen Stelle.

| Was Sie erhalten haben. | Wo sie hingehört. |
| --- | --- |
| Eine ZIP-Datei oder 7z mit einem darin enthaltenen Modell. | Extrahieren Sie die Dateien, bevor Sie sie zu RVC WebUI (Mainline - Original RVC) hinzufügen. |
| Eine Inferenzdatei `.pth` | Kopieren Sie sie nach `assets/weights/` im RVC WebUI (Mainline - Original RVC)-Ordner. Wenn Sie es selbst trainiert haben, verwenden Sie das exportierte kleine Modell. |
| Ein ausgefülltes `.index` für genau dieses Modell | Kopieren Sie es in aktuellen Builds nach `assets/indices/`. Ältere Builds erkennen häufig Indizes unter `logs/`. Wenn die automatische Erkennung fehlschlägt, wählen Sie es aus oder geben Sie den vollständigen Pfad manuell ein. |
| Ein `G_*.pth` oder `D_*.pth` Trainingskontrollpunkt | Behalten Sie das Experiment in `logs/` bei. Verwenden Sie den [Schulungsleitfaden](training.md), um ein Modell zur Inferenz zu identifizieren oder zu exportieren. |

Verwenden Sie `added_*.index`, wenn beim Training sowohl `trained_`- als auch `added_`-Dateien erstellt wurden. Letzterer enthält die durchsuchbaren Merkmalsvektoren. Ihr Modell kann ohne Index arbeiten. Setzen Sie **Indexrate** auf Null, wenn Sie den Index überspringen oder die passende Datei nicht identifizieren können.

## Konvertieren Sie Ihren ersten Clip

1. Öffnen Sie die WebUI und suchen Sie die Registerkarte **Modellinferenz**. Aktualisieren Sie die Modell- und Indexlisten nach dem Kopieren der Dateien und wählen Sie dann im Sprach-Dropdown die Schlussfolgerung `.pth` aus. Geben Sie der Schnittstelle Zeit, den Prüfpunkt zu lesen.
2. Wählen Sie eine kurze WAV-Datei, bei der eine Stimme alleine spricht oder singt. Neuere Builds stellen eine Upload-Steuerung zur Verfügung. Wenn Ihr Build ein Pfadfeld anzeigt, geben Sie ihm einen vollständigen Pfad, z. B. `C:\RVC\test\voice.wav`. Versuchen Sie es mit einem kurzen lokalen Pfad, wenn Sie den Dateizugriff in einem älteren Paket diagnostizieren.
3. Stellen Sie die Tonhöhenverschiebung für den ersten Durchgang auf `0` ein. Stellen Sie **Indexrate** oder **Suchfunktionsverhältnis** auf `0` ein und lassen Sie die zusätzlichen Einstellungen unverändert. Wählen Sie `rmvpe`, falls verfügbar und die Gewichte sind installiert. Beginnen Sie bei einem Kontrollpunkt mit nur einem Sprecher mit der Sprecher-ID `0`.
4. Klicken Sie einmal auf **Konvertieren** und warten Sie auf das Status- und Wiedergabefeld. Spielen Sie das Ergebnis von Anfang an ab. Wenn es brauchbar klingt, laden Sie es über das Menü des Audioplayers herunter. Wenn die Konvertierung fehlschlägt, lesen Sie den Status oder das Terminal, bevor Sie die Einstellungen ändern.
5. Geben Sie dieselbe Quelle wieder und geben Sie sie hintereinander aus. Überprüfen Sie das erste Wort, die höchsten und tiefsten Noten sowie mehrere Pausen. Ändern Sie ein Steuerelement und rendern Sie dieselbe Eingabe erneut, um festzustellen, welche Änderung geholfen hat.

## Machen Sie sich mit den Steuerelementen vertraut, die Sie wahrscheinlich berühren werden.

| Steuerelement | Wie man es verwendet. |
| --- | --- |
| Tonhöhenverschiebung. | Transponiert die Quelle in Halbtönen. `+12` erhöht ihn um eine Oktave, `-12` senkt ihn um eine Oktave. Machen Sie zunächst kleine Bewegungen, wenn Wörter oder Noten angestrengt klingen. |
| Tonhöhenextraktion | Schätzt die Tonhöhenkontur, die bei der tonhöhengesteuerten Konvertierung verwendet wird. Versuchen Sie eine andere Methode, wenn bei bestimmten Noten Stimmunterbrechungen auftreten. Vergleichen Sie denselben Clip und lassen Sie alles andere konstant. |
| Indexrate | Mischt nahegelegene Funktionen der Zielstimme ein, wenn ein passender Index vorhanden ist. Erhöhen Sie den Wert schrittweise, wenn das Ergebnis zu viel von der ursprünglichen Klangfarbe beibehält. Machen Sie einen Schritt zurück, wenn die Diktion unklar wird. |
| Schützen | Steuert, wie stark bei der Konvertierung stimmlose Details wie Atemzüge und Konsonanten erhalten bleiben. Niedrigere Werte verstärken den Schutz bei der üblichen RVC WebUI (Mainline - Original RVC)-`0–0.5`-Steuerung. Versuchen Sie eine kleine Anpassung, nachdem der Indexabruf funktioniert hat. |
| Lautstärke-Hüllkurve | Ändert, wie genau das Ergebnis lauten und leisen Momenten in der Eingabe folgt. Näher an Null folgt die Quelle stärker. |
| Sprecher-ID | Wählt eine Stimme innerhalb eines Kontrollpunkts mit mehreren Sprechern aus. Wählen Sie eine ID, die tatsächlich in diesem Modell vorhanden ist. |
| Resample-Ausgabe | Legt die exportierte Audio-Abtastrate dort fest, wo der Build sie verfügbar macht. Behalten Sie beim ersten Test die Standardeinstellung des Modells bei. |

### Ein wiederholbarer Tuning-Test

Speichern Sie eine unverarbeitete 10-Sekunden-Quelle als `test.wav`. Konvertieren Sie es ohne Tonhöhenverschiebung und ohne Index, um `baseline.wav` zu erhalten. Laden Sie den passenden Index und erhöhen Sie seine Rate um `retrieval.wav`. Vergleichen Sie diese beiden Dateien mit ähnlicher Lautstärke. Nachdem Sie eine Abrufeinstellung ausgewählt haben, versuchen Sie eine Tonhöhenanpassung und speichern Sie eine dritte Datei. Behalten Sie die Einstellung bei, die dieselbe problematische Linie verbessert, ohne den Rest zu verschlechtern.

## Einen Ordner konvertieren

1. Beenden Sie einen erfolgreichen Einzeldateitest mit derselben Stimme und denselben Einstellungen.
2. Erstellen Sie separate Ordner `input` und `output`. Fügen Sie in `input` nur die Audiodaten ein, die Sie konvertieren möchten.
3. Wählen Sie unter **Batch-Inferenz** Ihre Dateien aus oder geben Sie den vollständigen Eingabeordnerpfad ein. Legen Sie den Pfad zum Ausgabeordner explizit fest und wählen Sie WAV, wenn Sie das Audio später bearbeiten möchten.
4. Beginnen Sie mit zwei kurzen Dateien. Bestätigen Sie, dass jedes Ergebnis im Ausgabeordner erscheint und bis zum Ende abgespielt wird. Führen Sie dann den gesamten Satz aus. Überprüfen Sie den Status auf einzelne Fehler, damit Sie nur die betroffenen Dateien erneut versuchen können.

## Häufige Dateikonvertierungsfehler diagnostizieren

| Symptom | Nächster Test |
| --- | --- |
| Modellliste ist leer | Bestätigen Sie, dass `.pth` unter `assets/weights/` der aktiven Installation extrahiert und nach der Aktualisierung sichtbar ist. |
| Das Modell wird angezeigt, kann aber nicht geladen werden. | Überprüfen Sie, ob es sich bei der Datei um einen kompatiblen Inferenzexport handelt. Ein Trainingskontrollpunkt oder ein Modell einer anderen Sprach-Engine kann in der Liste angezeigt werden, ohne dass sie verwendet werden können. |
| Der Index schlägt fehl oder es gibt kein hörbares Ergebnis. | Setzen Sie den Abruf auf Null, führen Sie eine Konvertierung durch und bestätigen Sie, dass der Prüfpunkt funktioniert. Wählen Sie dann den passenden gefüllten Index aus und versuchen Sie es erneut. |
| Die Ausgabe ist grobkörnig oder die Silben wackeln | Hören Sie sich zunächst den Input an. Testen Sie einen klaren Gesang noch einmal mit ausgeschaltetem Index. Vergleichen Sie dann die Tonhöhenmethoden und eine geringfügige Änderung der Transposition. |
| Die Ausgabe fehlt im Batch-Modus. | Stellen Sie sicher, dass die Eingabedateien geöffnet werden, der Zielordner beschreibbar ist und das Terminal den Erfolg für den entsprechenden Dateinamen meldet. |

Weitere Hintergrundinformationen finden Sie unter [RVC-Modelle und -Dateien](../../start/models.md) und [Audioqualität](../../conversion/audio-quality.md)].
