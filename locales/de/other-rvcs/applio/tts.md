---
label: "🗣️ Sprache aus Text generieren"
order: 92
permalink: /ilaria-rvc/applio/tts/
---
# Wandeln Sie ein kurzes Skript in konvertierte Sprache um

Applio verwendet eine Online-Edge-TTS-Stimme zum Vorlesen Ihres Textes und ein RVC-Modell zum Ändern der generierten Stimme. Die Ausgangsstimme bestimmt die Aussprache, das Tempo und die vorgelesene Sprache. Verwenden Sie Text, den Sie problemlos an den Online-Synthesedienst senden können.

1. Öffnen Sie den Text-to-Speech-Arbeitsbereich, nachdem die Engine bereit ist und das [Sprachmodell funktioniert](inference.md).
2. Geben Sie einen kurzen Satz mit Satzzeichen ein. Wählen Sie eine TTS-Quellenstimme für die Sprache dieses Satzes. Beginnen Sie mit der normalen Sprechgeschwindigkeit.
3. Wählen Sie Ihre RVC-Inferenzstimme, den passenden Embedder und seinen Index aus, falls Sie einen verwenden. Beginnen Sie mit der Tonhöhenverschiebung auf 0 und den Effekten aus.
4. Generieren Sie Sprache und hören Sie sich die Ausgabe an. Wenn Ihre Schnittstelle die synthetisierte Quelle verfügbar macht, spielen Sie sie auch ab. Wenn die Quelle ein Akronym falsch liest oder seltsame Pausen macht, ändern Sie die Zeichensetzung, buchstabieren Sie das Akronym oder wählen Sie zuerst eine andere Quellenstimme aus.
5. Wenn die Phrase richtig klingt, speichern Sie das Audio und notieren Sie die Quellstimme, die Sprechgeschwindigkeit, das RVC-Modell, den Embedder und die Tonhöhe. Verwenden Sie für längere Skripte kleine Abschnitte mit natürlichen Haltepunkten und halten Sie deren Einstellungen konsistent.

Wenn der Sprachgenerierungsschritt fehlschlägt, testen Sie eine andere Quellstimme und überprüfen Sie die Verbindung der Engine zum Sprachdienst. Wenn die Sprachgenerierung erfolgreich ist und nur die Konvertierung fehlschlägt, führen Sie eine kurze aufgezeichnete Datei über dasselbe RVC-Modell aus. Dieser Test deckt Modell- oder Embedder-Probleme auf, ohne das Skript zu ändern.
