---
label: "Trainieren und testen Sie ein Modell"
icon: ":test_tube:"
order: 94
permalink: /ilaria-rvc/applio/training/
description: "Ein erster Durchlauf beweist, dass Ihre Aufnahmen, Konfiguration und Hardware einen Export erzeugen können, mit dem Sie konvertieren können. Arbeiten Sie..."
---
# Trainieren, bewerten und exportieren Sie eine Stimme in Applio

Ein erster Durchlauf beweist, dass Ihre Aufnahmen, Konfiguration und Hardware einen Export erzeugen können, mit dem Sie konvertieren können. Arbeiten Sie an kopierten Aufnahmen, zu deren Verwendung Sie berechtigt sind. Bewahren Sie zwei oder drei Sätze außerhalb des Trainingsordners auf, damit Sie das Verhalten anhand von Aufzeichnungen überprüfen können, die das Modell noch nie gesehen hat.

## Bereiten Sie Eingaben vor.

1. Erstellen Sie einen kurzen, erkennbaren Experimentnamen, z. B. `speaking_trial_01`. Bewahren Sie Kratztests unter ihrem eigenen Namen auf, damit Sie spätere Prüfpunkte finden können.
2. Überprüfen Sie die Aufnahmen am Anfang, in der Mitte und am Ende nach Gehör. Entfernen Sie Clips mit einem anderen Lautsprecher, Musik, Clipping oder langen stillen Abschnitten. Wenn Desktop über Tools zur Datensatzüberprüfung verfügt, überprüfen Sie markierte Clips und bereiten Sie dort eine Trainingskopie vor. Durch das Trimmen der Stille und das Anpassen des Pegels können hörbare Verzerrungen nicht behoben werden.
3. Wählen Sie den kopierten Datensatz in **Training** aus. Wenn Gradio nach einem Ordnerpfad fragt, verwenden Sie einen auf dem Computer, auf dem die Engine ausgeführt wird. Behalten Sie für einen unterstützten Arbeitsablauf mit mehreren Sprechern numerische Ordner wie `0` und `1` bei und notieren Sie, welche Person jede ID repräsentiert.
4. Wählen Sie einen Vocoder und eine Sampling-Rate, die gemeinsam unterstützt werden. Wählen Sie ein kompatibles Generator/Diskriminator-Paar aus, wenn Sie Vortraining verwenden. Übereinstimmungsrate, Pitch-Anleitung, Architektur und die Embedder-Anforderungen des Herausgebers. Notieren Sie den genauen Einbetter und alle benutzerdefinierten Dateien für spätere Rückschlüsse.
5. Wählen Sie eine Stapelgröße, die zum GPU-Speicher passt, und speichern Sie einige Zwischenexporte. Wählen Sie ein anfängliches Epochenziel für einen Pipelinetest. Erweitern Sie es später, wenn sich durch ausgehaltene Tests eine Besserung ergibt.

## Führen Sie die Etappen durch

In Desktop können Sie **Automatisches Training** auswählen, nachdem Sie den Datensatz, die Modellkonfiguration, die Epochen und die Speichereinstellungen überprüft haben. Starten Sie den Job einmal und folgen Sie seiner Konsole. Für eine separate Steuerung jeder Stufe verwenden Sie **Manuelle Trainingseinrichtung**. Gradio stellt die entsprechenden Schritte in seinem Arbeitsbereich **Training** bereit.

| Phase | Was passiert | Was Sie vor dem Fortfahren bestätigen müssen |
| --- | --- | --- |
| Vorverarbeitung | Applio liest den Datensatz, bereitet Clips vor und führt ein Resampling für die gewählte Rate durch. | Das Protokoll zeigt verwendbare Audiodaten aus dem vorgesehenen Ordner. Wenn Ihr Build eine **Post-Normalisierung** bietet, passt er jedes Segment nach der Aufteilung an. Verwenden Sie es nur, wenn Sie diese Behandlung wünschen. |
| Extrahieren | Applio erstellt die Inhaltsfunktionen des Modells und alle für die Konfiguration erforderlichen Tonhöheninformationen. | Der vorgesehene Einbetter geladen und die Extraktion abgeschlossen. Wenn Sie den Encoder wechseln, führen Sie die Extraktion für diese Auswahl erneut durch. |
| Zug | Das Experiment lernt aus diesen Merkmalen Stimmeigenschaften. | Der Epochenfortschritt und die konfigurierten Prüfpunkte oder Exportdateien werden angezeigt. Stoppen Sie bei Fehlern wegen unzureichendem Arbeitsspeicher andere GPU-Arbeiten, verringern Sie die Stapelgröße und erwägen Sie die Deaktivierung des Datensatz-Cachings. |
| Index generieren | Applio erstellt optionale Abrufdaten aus dem Experiment. | Behalten Sie den generierten Index mit dem passenden Export bei. Wenn Sie diesen Schritt überspringen möchten, lassen Sie den Abruf während Ihres Tests deaktiviert. |

Wenn eine Stufe fehlschlägt, kopieren Sie ihren ersten Fehler und bestätigen Sie ihre Eingaben, bevor Sie sie erneut ausführen. Wenn sich Aufzeichnungen, Geschwindigkeit oder Architektur wesentlich ändern, hilft ein neues Experiment dabei, inkompatible Dateien auseinanderzuhalten. Stoppen Sie Echtzeit, bevor Sie mit dem Desktop-GPU-Training beginnen.

## Vergleichen Sie Kontrollpunkte, bevor Sie einen Gewinner auswählen

Öffnen Sie **Modelle → Exportieren** in Desktop oder suchen Sie in Gradio nach der Trainingsexportsteuerung. Speichern Sie eine Schlussfolgerung `.pth` von einem Zwischenkontrollpunkt und einem späteren sowie den Index, falls generiert. Konvertieren Sie für jeden Export dieselben zurückgehaltenen Phrasen mit derselben Sprecher-ID, demselben Einbetter, denselben Tonhöheneinstellungen und derselben Lautstärke. Achten Sie auf Verständlichkeit, Stimmkonsistenz bei leisen und lauten Silben und Artefakte bei Atemzügen. Trainingsmetriken können fehlgeschlagene Fortschritte aufdecken. Zuhören hilft bei der Entscheidung, welcher Export beibehalten werden soll.

## Fahren Sie fort, ohne das Experiment neu zu erstellen

Behalten Sie das Experimentverzeichnis zusammen mit seinen Vorverarbeitungsdateien, Funktionen und den Trainingskontrollpunkten `G_*.pth` und `D_*.pth`. Behalten Sie beim Fortfahren den gleichen Namen, die gleiche Architektur, die gleiche Rate und den gleichen Einbetter bei. Wählen Sie ein neues **Gesamt**-Epochenziel, das höher ist als die Anzahl der abgeschlossenen Epochen. Lassen Sie im Desktop **Fresh Training** deaktiviert. Überprüfen Sie die ersten Protokollzeilen, um zu sehen, welcher Prüfpunkt geladen wurde, und stoppen Sie, wenn der Lauf unerwartet von vorne beginnt. Der kleine Inferenzexport ist die Datei, die Sie im Konverter verwenden. Für die Fortsetzung des Trainings ist der Trainingsstatus des Experiments erforderlich.
