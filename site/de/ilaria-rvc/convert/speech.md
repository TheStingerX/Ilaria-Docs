# Text-zu-Sprache

[Ilaria RVC 2.4.0 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Verwenden Sie **Inferenz → TTS**, um geschriebenen Text in eine Aufzeichnung umzuwandeln. Sie können die generierte Sprache direkt anhören oder mit einem RVC-Modell konvertieren. Die beiden Stufen erfüllen unterschiedliche Aufgaben: Die Sprachmaschine entscheidet über die Aussprache und das Tempo des Skripts, während RVC den Sprachcharakter der Aufnahme ändert. Wenn im ersten Ergebnis ein Name falsch ausgesprochen wird, korrigieren Sie das Skript oder die Quellstimme, bevor Sie RVC optimieren.

> **Neuerungen in 2.3.0** · ElevenLabs ist als TTS-Engine verfügbar. Gib deinen ElevenLabs-API-Schlüssel ein, wähle eine Stimme und teste einen kurzen Satz.

> **Neuerungen in 2.4.1** · Kokoro v1.0. Installiere Kokoro separat unter **Inference → TTS → Kokoro (local)**. Es benötigt installiert rund 528 MB. Wähle eine Stimme und teste einen kurzen Satz. Edge benötigt Internet, Windows verwendet installierte Stimmen und ElevenLabs benötigt einen API-Schlüssel.

## Wählen Sie eine Quellstimme

| Engine | Wann Sie sie auswählen sollten | Was Sie überprüfen sollten |
| --- | --- | --- |
| Microsoft Edge | Sie möchten Online-Stimmen nach Sprache durchsuchen. | Der Dienst benötigt eine Internetverbindung und sendet den Text zur Synthese an Microsoft. Wählen Sie eine Stimme, die die Sprache des Drehbuchs spricht. |
| Windows | Sie möchten eine Offline-Synthese auf der lokalen Windows-Installation. | Die Liste hängt von den unterstützten Desktop-Stimmen ab, die auf diesem PC installiert sind. Wenn die Stimme fehlt, überprüfen Sie die Windows-Spracheinstellungen und aktualisieren Sie die Liste. |
| ElevenLabs | Du möchtest eine Stimme aus deinem ElevenLabs-Konto nutzen. | Du brauchst Internet und einen ElevenLabs-API-Schlüssel. Der Text wird für die Synthese an ElevenLabs gesendet. |
| Kokoro (local) | Du möchtest Sprache lokal mit Kokoro v1.0 erzeugen. | Installiere Kokoro im TTS-Tab. Es benötigt rund 528 MB und bietet 54 Stimmen, darunter Sara und Nicola auf Italienisch. |

Die Quellstimme spricht die Worte. **Voice Model** ist das RVC-Modell, das die Klangfarbe später ändert. Beginnen Sie beispielsweise mit einer italienischen Quellstimme für ein italienisches Drehbuch und wählen Sie dann das Ziel-RVC-Modell separat aus. Ein starkes Stimmmodell fügt keine phonetischen Unterscheidungen hinzu, die in der Quelle fehlen.

## Machen Sie eine erste Aufnahme

1. Öffnen Sie **Inferenz → TTS**. Geben Sie einen kurzen Satz ein oder importieren Sie eine UTF-8 `.txt`-Datei. Das Textfeld unterstützt bis zu **10.000 Zeichen**. Beginnen Sie mit einem Absatz, bevor Sie ein langes Skript importieren.
2. Wählen Sie die Sprachmaschine aus. Filtern Sie die Liste nach Sprache, wählen Sie eine Quellstimme aus und verwenden Sie **Stimmen aktualisieren**, wenn die Liste veraltet ist.
3. Belassen Sie Rate und Lautstärke in der Nähe ihrer Standardwerte und lassen Sie die RVC-Konvertierung für den ersten Test ausgeschaltet. Generieren Sie die Rede und hören Sie sich das Originalergebnis an.
4. Überprüfen Sie Namen, Zeichensetzung und Pausen. Wenn eine Zeile überstürzt klingt, teilen Sie den Satz auf oder passen Sie die Geschwindigkeit an. Wenn eine Abkürzung falsch gelesen wird, versuchen Sie, sie auszuschreiben. Generieren Sie den gleichen kurzen Ausschnitt noch einmal und vergleichen Sie ihn.
5. Bewahren Sie diese erste gute Version als Referenz auf, bevor Sie die RVC-Steuerung ändern.

## Konvertieren Sie die generierte Sprache.

1. Wählen Sie das Ziel-**Sprachmodell** über dem TTS-Bedienfeld. Verwenden Sie einen Rückschluss `.pth`, der mit Ihrer App kompatibel ist. Sein Matching `.index` ist optional.
2. Aktivieren Sie **RVC-Konvertierung**. Beginnen Sie mit der Konvertierung der Tonhöhe bei **0 Halbtönen**, dem standardmäßigen Tonhöhenextraktor, **Indexverhältnis 0** und deaktivierten optionalen Effekten. Verwenden Sie den vom Zielmodell erwarteten Inhaltsencoder.
3. Führen Sie die Konvertierung durch und hören Sie sich dann den ursprünglichen und den konvertierten Player getrennt an. Vergleichen Sie denselben Satz mit einer ähnlichen Wiedergabestufe. Verwenden Sie die Download-Steuerung des konvertierten Players, um die WAV-Datei zu speichern.
4. Wenn Sie über den passenden Index verfügen, versuchen Sie es mit einer kleinen Erhöhung des **Indexverhältnisses** und vergleichen Sie erneut. Belassen Sie den Wert bei Null, wenn Sie keinen Index verwenden. Beim Ändern des Abrufs kann ein Wort, das die TTS-Engine falsch gelesen hat, nicht korrigiert werden.

## Was jede Einstellung ändert

| Steuerung | Was sie ändert | Erste Anpassung zum Ausprobieren |
| --- | --- | --- |
| Sprechgeschwindigkeit | Die Geschwindigkeit der Quellstimme vor der Konvertierung. | Machen Sie etwas langsamer, wenn Silben zusammenlaufen. Überprüfen Sie das Timing, bevor Sie die Tonhöhe stimmen. |
| Quelllautstärke | Der Pegel der erzeugten Sprache vor der Konvertierung. | Halten Sie die Quelle sauber und auf einem nützlichen Niveau. Vergleichen Sie Dateien mit ähnlicher Lautstärke. |
| Quelltonhöhe in Hz | Ändert die Tonhöhe während der Edge-Synthese, sofern unterstützt. | Belassen Sie es zunächst auf der Standardeinstellung. Ändern Sie es getrennt von der RVC-Steigung. |
| RVC-Tonhöhe in Halbtönen | Transponiert die erzeugte Stimme während der Konvertierung. | Beginnen Sie bei Null und testen Sie kleine Verschiebungen. Überprüfen Sie die niedrigsten und höchsten Wörter im Beispiel. |
| Tonhöhenextraktion | Schätzt die Tonhöhenkontur aus dem generierten Audio. | Vergleichen Sie Extraktoren nur, wenn die umgewandelte Tonhöhe springt oder wackelt. |
| Indexverhältnis | Steuert, wie stark die Konvertierung den ausgewählten Index verwendet. | Beginnen Sie bei Null. Verwenden Sie einen bescheidenen Wert nur mit dem genau passenden Index. |
| Player-Lautstärke | Steuert die Hörlautstärke. | Verwenden Sie es, um die Wiedergabepegel zu vergleichen. Verwenden Sie die Konvertierungs- oder Exporteinstellungen, wenn Sie die resultierende Datei ändern müssen. |

## Bereiten Sie ein längeres Drehbuch vor.

Teilen Sie ein langes Drehbuch an Absatz- oder Szenengrenzen. Behalten Sie in allen Abschnitten die gleichen Einstellungen für Quellstimme, Rate, Zielmodell und Konvertierung bei. Speichern Sie Ausgaben mit geordneten Namen wie `01-intro.wav` und `02-main.wav`. Begleiten Sie sie in einem Audio-Editor und hören Sie über alle Grenzen hinweg zu. Passen Sie Pausen und Lautstärke an, bevor Sie die endgültige Datei exportieren.

Testen Sie bei Skripten mit mehr als einer Sprache vor dem Rendern einen kurzen Satz in jeder Sprache. Verwenden Sie bei Bedarf separate Quellstimmen oder -abschnitte. Einige phonetische Kontraste können nach der Konvertierung aufgrund des Zielmodells oder seines Inhaltsencoders schwierig bleiben.

## Fehlerbehebung

| Was Sie hören oder sehen | Was Sie überprüfen sollten |
| --- | --- |
| Edge erzeugt keine Sprache | Überprüfen Sie den Internetzugang, aktualisieren Sie die Stimmenliste und versuchen Sie es mit einem kurzen Klartextsatz mit einer anderen kompatiblen Stimme. |
| Die Windows-Liste ist leer. | Überprüfen Sie, welche Desktop-Sprachstimmen installiert und für die App verfügbar sind. Die Offline-Synthese hängt von der lokalen Windows-Umgebung ab. |
| Die Quell- und konvertierten Clips sprechen dasselbe Wort falsch aus. | Ändern Sie die Quellstimme oder schreiben Sie das Wort im Skript neu und generieren Sie dann die Quelle neu. |
| Das Original ist klar, aber die Umwandlung verzerrt Konsonanten oder springt in die Tonhöhe | Testen Sie dieselbe Quelle mit deaktiviertem Abruf und deaktivierten Effekten. Überprüfen Sie den Encoder und die Tonhöhenextraktion. Wenn dasselbe Modell mehrere saubere Eingaben verzerrt, überprüfen Sie die Trainingsdaten und erwägen Sie ein erneutes Training. |
| Die konvertierte Stimme klingt immer noch wie die Quelle | Überprüfen Sie das ausgewählte Modell und den Encoder. Vergleichen Sie einen anderen sauberen Clip, bevor Sie den Abruf erhöhen. |
| Es erscheint kein konvertiertes Ergebnis. | Überprüfen Sie, ob die **RVC-Konvertierung** aktiviert ist und dass es sich bei der ausgewählten Stimme um ein Inferenzmodell handelt. Lesen Sie den ersten Fehler im Protokoll. |

Weitere Konvertierungseinstellungen finden Sie unter [Inferenzkontrollen](inference-buttons.md). Informationen zur Diagnose finden Sie unter [Fehlerbehebung](../../reference/troubleshooting.md).
