# Tonhöhe und Audioqualität einstellen

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Wählen Sie einen kurzen Auszug aus, der das Problem enthält. Führen Sie eine Referenzkonvertierung durch und vergleichen Sie diese mit jeweils einer geänderten Einstellung. Hören Sie bei ähnlichen Lautstärken, sodass ein lauteres Ergebnis den Vergleich nicht allein aufgrund der Lautstärke gewinnt. Vergleichen Sie bei Musik zunächst den umgewandelten Gesang einzeln und dann im Mix.

## Tonhöhe, Reichweite und Resonanz

Die Tonhöhe misst, wie hoch oder tief ein stimmhafter Ton ist. **F0** oder Grundfrequenz ist der periodische Teil des Signals, aus dem ein Tonhöhenextraktor die Kontur schätzt. Ein höhengesteuertes Modell verwendet diese Kontur, wenn es die Ausgabe synthetisiert.

**Pitch** verschiebt diese Kontur um Halbtöne. Positive Werte erhöhen ihn, negative Werte senken ihn. Jede Oktave hat 12 Halbtöne. Wenn Sie beispielsweise `+12` auf eine stimmhafte Note bei 220 Hz anwenden, erhalten Sie 440 Hz. Bei der Einstellung Null bleibt die Tonhöhenreferenz der Aufnahme erhalten.

Beginnen Sie beim Sprechen bei Null. Wenn der Clip weit außerhalb des angenehmen Bereichs des Zielmodells liegt oder angestrengt klingt, vergleichen Sie ihn mit einer kleinen Verschiebung nach oben oder unten. Um über ein vorhandenes Instrument zu singen, vergleichen Sie zuerst Null. Eine Verschiebung, die die Tonart des Gesangs ändert, kann mit dem Backing-Track kollidieren. Oktavverschiebungen behalten die Notennamen bei, das Modell muss jedoch weiterhin den resultierenden Bereich verarbeiten. Vergleichen Sie die tiefsten und höchsten Noten, bevor Sie sich auf ein ganzes Lied festlegen.

**Formanten** beschreiben Resonanzen, die dabei helfen, Vokale und Stimmcharakter zu unterscheiden. Verwenden Sie die Formantverarbeitung erst, nachdem die Tonhöhenkontur funktioniert. Tonhöhe und Resonanz können unterschiedliche Anpassungen erfordern. In Builds mit Inferenztonhöhe und einem Pitch-Shift-Effekt ändert ersterer die extrahierte Tonhöhe vor der Synthese und letzterer wirkt sich auf das resultierende Audio aus.

## Vergleichen Sie Tonhöhenextraktoren

Beginnen Sie mit **RMVPE**, der Standardeinstellung für die aktuelle Ilaria RVC-Inferenz. Wenn die Tonhöhe instabil ist, testen Sie einen anderen in Ihrem Build verfügbaren Extraktor, z. B. **FCPE** oder **Swift**. Behalten Sie für jeden Lauf die gleiche Eingabe, Tonhöhenverschiebung, das gleiche Indexverhältnis und das gleiche Ausgabeformat bei.

- Achten Sie bei einer gehaltenen Note auf eine plötzliche Verdoppelung oder Halbierung der Tonhöhe. Wenn mehrere Extraktoren gleichzeitig ausfallen, prüfen Sie, ob ein anderer Sänger, ein Instrument im Stimmstamm oder starke Übersteuerung vorliegt.
- Stellen Sie für leises Sprechen sicher, dass die Eingabe einen deutlich stimmhaften Vokal enthält. Das Erhöhen des Pegels eines Clips, der hauptsächlich Rauschen enthält, kann die Diagnose erschweren.
- Vergleichen Sie bei einer großen Menge zunächst einen Auszug aus der tiefsten und höchsten Quellstimme. Vergleichen Sie die Verarbeitungszeit mit derselben Datei und denselben Einstellungen auf dem vorgesehenen Computer.

Pitch-Extraktion und Inhaltsextraktion sind separate Phasen. Durch Ändern des F0-Extraktors wird eine andere Tonhöhenkontur aus demselben Audio geschätzt. Der Inhaltseinbetter muss weiterhin mit dem Modell übereinstimmen.

## Nehmen Sie gezielte Anpassungen vor.

 | Wenn Sie | hören, versuchen Sie es zuerst | Worauf Sie achten sollten |
| --- | --- | --- |
 | Eine Note springt, trällert oder verschwindet | Vergleichen Sie einen zweiten unterstützten F0-Extraktor mit demselben Auszug. | Ausgehaltene Noten, die der Quelle ohne plötzliche Oktavsprünge folgen. |
 | Das Ziel-Timbre ist schwach. | Überprüfen Sie das Modell, den Embedder und den passenden Index. Vergleichen Sie den deaktivierten Index mit einem kleinen Anstieg des **Indexverhältnisses**. | Ein besser erkennbarer Ton mit noch verständlichen Wörtern. |
 | Wörter werden nach zunehmender Abfrage unscharf. | Verringern Sie das **Indexverhältnis** und spielen Sie dieselben Konsonanten ab. | Silben werden klarer, ohne den gewünschten Charakter zu verlieren. |
| Atemgeräusche oder Konsonanten klingen metallisch | Teste dasselbe Modell mit mehreren sauberen Aufnahmen. Bleibt der Fehler, prüfe die Trainingsdaten auf Übersteuerung, zu starke Rauschminderung und zu wenige saubere Atemgeräusche und Konsonanten. Korrigiere die Daten und trainiere das Modell erneut. Die Bereinigung des Eingabesignals bei der Inferenz entfernt keine erlernten Artefakte. | Klare Atemgeräusche und Konsonanten wie `s` und `f` ohne metallisches Summen. |
 | Die Lautstärke sinkt innerhalb einer Phrase | Vergleichen Sie eine andere **Volume Envelope**-Einstellung. Überprüfen Sie die Quelle auf ein Gate und testen Sie dann **Split Audio**, wenn das Problem nur bei langen Clips auftritt. | Konsistente Wortendungen, ohne natürliche Pausen zu verschlucken. |
 | Eine bearbeitete Stimme klingt brüchig. | Schalten Sie die Reinigung, die automatische Tonhöhenkorrektur und die Ausgabeeffekte aus. Fügen Sie sie nach einer sauberen Konvertierung einzeln wieder hinzu. | Weniger Artefakte bei Zischlauten und anhaltenden Vokalen. |
 | Ausgangsspitzen verzerren | Prüfen Sie, ob die ursprüngliche oder konvertierte Wellenform übersteuert ist. Reduzieren Sie unnötige Verstärkung und vergleichen Sie, bevor Sie einschränken. | Klare Spitzen und kein Knistern bei lauten Silben. |

Vermeiden Sie es, den Embedder zu wechseln, um einem Sound nachzujagen. Es muss mit der Feature-Darstellung übereinstimmen, auf der das Modell trainiert wurde. **Indexverhältnis** fügt Features, die aus einem passenden Trainingsindex abgerufen wurden, in die Konvertierung ein. Es bietet keinen allgemeinen Qualitätsschub. Eine hohe Mischung kann die Aussprache weniger deutlich machen, insbesondere bei einer unbekannten Quelle.

In der Datei-Engine von Applio folgt eine **Volume Envelope**-Einstellung näher bei Null der Quelldynamik besser. Für **Stimmlose Konsonanten schützen** verstärken Werte unter 0,5 den Schutz und 0,5 deaktiviert ihn in dieser Engine. Überprüfen Sie den Tooltip und die Versionshinweise Ihrer App, bevor Sie diese Zahlen auf einen anderen Fork übertragen.

## Diagnostizieren Sie nach Gehör und mit dem Analysegerät

1. Markieren Sie den Zeitstempel des Problems. Prüfen Sie, ob es in der Quelle, im abgetrennten Gesang oder nur im konvertierten Ergebnis vorkommt.
2. Wenn es sich in der Quelle befindet, korrigieren Sie zuerst die Eingabe. Vergleichen Sie eine alternative Aufnahme, bevor Sie eine starke Rauschunterdrückung verwenden. Durch Verringern der Lautstärke einer abgeschnittenen Aufnahme können die fehlenden Spitzen nicht wiederhergestellt werden.
3. Wenn es in der Konvertierung erscheint, vergleichen Sie Effekte aus, Index aus und einen kompatiblen Pitch-Extraktor in separaten Durchgängen. Überprüfen Sie den Einbetter und das Modellpaket, bevor Sie davon ausgehen, dass der Prüfpunkt fehlerhaft ist.
4. Verwenden Sie den **Audioanalysator** von Ilaria RVC, sofern verfügbar, um Wellenformen, Tonhöhenschätzungen, Spektren und Pegel zu vergleichen. Ein Pitch-Plot kann Sie auf einen verdächtigen Sprung hinweisen, und der Quellton verrät Ihnen, ob er Teil der Aufführung war.
5. Bestätigen Sie die Verbesserung an einem zweiten Auszug. Behalten Sie die Einstellung nur bei, wenn sie für das gesamte Material funktioniert, das Sie exportieren möchten.

Zum Singen testen Sie Atemzüge, Konsonanten, Vibrato und gehaltene Noten. Testen Sie zum Sprechen leise und laute Sätze sowie mindestens einen Satz mit scharfen Konsonanten. Wenn die Ausgabe immer noch fehlschlägt, senden Sie ein kurzes zulässiges Beispiel und Ihre Einstellungen mit einem [Fehlerbehebungsbericht](../reference/troubleshooting.md).
