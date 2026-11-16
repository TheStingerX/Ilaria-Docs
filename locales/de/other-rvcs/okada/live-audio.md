---
label: "🎙️ Live-Audio und Routing"
order: 90
permalink: /ilaria-rvc/okada/live-audio/
---
# Konvertieren Sie Ihr Mikrofon in w-okada VCClient

> Wähle das physische Mikrofon im Voice Changer, leite dessen Ausgabe an das Wiedergabegerät des virtuellen Kabels und wähle das zugehörige Aufnahmegerät in Discord oder OBS. Für Vonovox ist **VAC Lite** die erste Wahl, **VB-CABLE** eine Alternative. Lies vor dem Anruf die vollständige Anleitung. [VAC Lite / VB-CABLE](../vonovox/live-audio.md)

Beginnen Sie mit Kopfhörern und einem einzigen lokalen Audiopfad. Wenn Sie im Kopfhörer eine sauber umgewandelte Stimme hören, schließen Sie ihn an einen Anruf oder einen Rekorder an. Mit dieser Reihenfolge können Sie Probleme lokalisieren, bevor Sie das virtuelle Kabel hinzufügen.

## Fügen Sie ein Modell hinzu und hören Sie das erste Ergebnis.

1. Schließen Sie Ihr Mikrofon und Ihre Kopfhörer an, bevor Sie VCClient öffnen. Sprechen Sie im Betriebssystem in das Mikrofon und prüfen Sie, ob sich die Eingangsanzeige bewegt. Pausieren Sie Discord, OBS und andere Capture-Apps während dieses Tests.
2. Wählen Sie unter **Modellauswahl** ein kompatibles Beispielmodell aus, sofern eines verfügbar ist. Für Ihr eigenes Modell verwenden Sie **Bearbeiten**, wählen Sie einen freien Steckplatz aus und wählen Sie **Hochladen**. Wählen Sie **RVC**, wenn das Dialogfeld einen Modelltyp anfordert. Geben Sie die von Ihrem Release akzeptierte Inferenzdatei und einen optionalen passenden Index an. Warten Sie den Upload ab und wählen Sie dann in der Hauptansicht den gefüllten Slot aus.
3. Wählen Sie in den Audio-Steuerelementen **Client** für einen ersten browserseitigen Test. Wählen Sie den genauen Namen des physischen Mikrofons und den genauen Namen des Kopfhörers aus. Wenn der Browser um Erlaubnis bittet, erlauben Sie den Mikrofonzugriff für die lokale Seite.
4. Deaktivieren Sie Passthrough, belassen Sie Pitch und Index auf Null und behalten Sie die Standardeinstellungen für Chunk, Kontext, Crossfade und Pitch Estimator bei. Wenn Sie einen Index importiert haben, können Sie ihn nach Anhören der Baseline auswerten.
5. Drücken Sie **Start**, warten Sie, bis das Modell aufgewärmt ist, und sprechen Sie mindestens 30 Sekunden lang. Fügen Sie einen ruhigen Satz, einen normalen Satz, einen lauteren Satz und eine kurze Pause ein. Wenn die Konvertierung aktiviert ist, sollten Sie die ausgewählte Stimme hören. Drücken Sie **Stop**, wenn Sie Änderungen vornehmen, die einen Neustart des Streams erfordern.
6. Wenn Sie Stille hören, testen Sie dieselben Geräte in einem einfachen Rekorder. Wenn Sie Ihre Originalstimme zweimal hören oder sie neben der Konvertierung hören, deaktivieren Sie die direkte Mikrofonüberwachung auf Ihrer Schnittstelle oder entfernen Sie den doppelten Softwarepfad.

## Client- und Server-Gerätemodus verstehen

**Client** verwendet Geräte, die dem Client/Browser zur Verfügung stehen. Mikrofonberechtigungen und die Ausgabeauswahl des Browsers können sich auf die Geräteliste auswirken. **Server** öffnet Geräte auf dem Computer, auf dem die Konvertierungs-Engine ausgeführt wird. Dies ist auf zwei Computern von Bedeutung: Ein am Client angeschlossenes USB-Mikrofon erscheint nicht automatisch auf dem Server.

Testen Sie auf einem PC zunächst den einfacheren Client-Pfad. Wechseln Sie zu Server, wenn Ihr Build einen separaten Monitor verfügbar macht oder der Browser den gewünschten Ausgabeendpunkt nicht auswählen kann. Wählen Sie im Servermodus die vom Server angebotene Host-API und Gerätenamen aus. Wenn mehrere Einträge denselben Namen haben, versuchen Sie, für die Ein- und Ausgabe dieselbe Audio-API zu verwenden. Sobald das Signal stabil ist, können Sie Alternativen auf Latenz testen.

## Konvertierung an Discord, OBS oder eine andere App senden

1. Installieren Sie ein virtuelles Kabel für Ihr Betriebssystem und öffnen Sie beide Anwendungen erneut, damit ihre Gerätelisten aktualisiert werden. Es sollte einen Wiedergabeendpunkt und einen entsprechenden Aufnahmeendpunkt verfügbar machen.
2. Stellen Sie den VCClient-Eingang auf das physische Mikrofon ein. Stellen Sie den Ausgang des Konverters auf den **Wiedergabe-Endpunkt** des Kabels ein. Bei VB-CABLE ist dies üblicherweise **CABLE Input**.
3. Wenn die App ein separates **Monitor**-Gerät bereitstellt, stellen Sie es auf die Kopfhörer ein. Lassen Sie die Lautsprecher der Zielanwendung auf den Kopfhörern.
4. Wählen Sie den **Aufnahme-Endpunkt** des Kabels als Zielmikrofon aus. Bei VB-CABLE ist das üblicherweise **CABLE-Ausgang**. Wählen Sie in OBS dieses Gerät für die Audioeingangsaufnahme aus und schalten Sie jede zweite Aufnahme des physischen Mikrofons stumm.
5. Nutzen Sie einen Testanruf oder machen Sie eine kurze lokale Aufnahme in der Ziel-App. Testen Sie leises und lautes Sprechen. Bestätigen Sie, dass das Stoppen von VCClient oder das Stummschalten der konvertierten Quelle dazu führt, dass die Anzeige stoppt. Wenn dies weiterhin der Fall ist, ist für das Ziel ein anderer Eingang aktiv oder es empfängt eine unbeabsichtigte Route.
6. Vergleichen Sie die Zielrauschunterdrückung oder die automatische Verstärkung nur dann, wenn der Konverter lokal gut klingt und das Ziel Silben zerhackt oder den Pegel ändert. Behalten Sie die Optionen bei, die für Ihren Raum und Ihr Mikrofon geeignet sind.

```text
Physical microphone → VCClient → cable playback → cable recording → call or recorder
                           └── optional monitor → headphones
```

## Optimieren Sie ein Setup, das bereits funktioniert

Beginnen Sie mit dem Standardblock und testen Sie ihn unter Ihrer tatsächlichen Arbeitslast. Wenn auf der Benutzeroberfläche die Blockdauer und die Konvertierungszeit angezeigt werden, vergleichen Sie diese in passenden Einheiten. Jeder Block benötigt genügend Zeit, um fertig zu werden. Lassen Sie Spielraum für Spitzen, während Sie ein Spiel ausführen oder streamen. Reduzieren Sie den Block Schritt für Schritt und achten Sie auf Aussetzer, bevor Sie die Änderung beibehalten. Wenn Wörter ausgelassen werden, erhöhen Sie sie erneut oder reduzieren Sie den zusätzlichen Kontext. Crossfade trägt dazu bei, Grenzen aufzuweichen, verbraucht aber auch einen Teil des verfügbaren Verarbeitungsbudgets.

Wählen Sie einen Tonhöhenschätzer, der Ihren normalen Sprechumfang berücksichtigt. Vergleichen Sie bei jeder Einstellung denselben Satz. Die Tonhöhe ändert das Register, während die Indexmischung ändert, wie stark die Inferenz Merkmale verwendet, die aus dem passenden Trainingsindex abgerufen werden. Erhöhen Sie eine davon schrittweise und notieren Sie das Ergebnis. Halten Sie die Modell- und Mikrofonverstärkung während des Vergleichs konstant.

| Symptom | Spezifischer Test |
| --- | --- |
| Originalstimme erreicht den Anruf | Schalten Sie Passthrough aus und wählen Sie das Kabel als einziges Mikrofon in der empfangenden App. |
| Verzerrungen sind bereits in der einfachen Mikrofonaufnahme vorhanden. | Verringern Sie die physische Eingangsverstärkung, bevor Sie das Modell abstimmen. |
| Erste Silbe verschwindet nach einer Pause | Vergleichen Sie die Eingabeschwelle und die Zielsprachaktivierung. Versuchen Sie eine Aufnahme mit deaktivierter Sprachaktivierung, um die Bühne zu isolieren. |
| Lokaler Monitor ist in Ordnung, aber Kabel-Audio knistert. | Passen Sie die unterstützten Abtastraten im Soundpanel des Betriebssystems an und öffnen Sie beide Streams erneut. Suchen Sie nach einer zweiten Anwendung, die den Endpunkt im exklusiven Modus hält. |
| GPU-Konvertierung schlägt fehl und CPU funktioniert | Überprüfen Sie das ausgewählte Paket, das Modellformat und den Rechenanbieter separat. Testen Sie auf jedem Gerät mit demselben nachweislich funktionierenden Modell. |
| Die Konvertierung fällt zurück, wenn ein Spiel geöffnet wird. | Erhöhen Sie die Blockgröße oder reduzieren Sie die konkurrierende GPU-Arbeitslast. Wiederholen Sie eine längere Aufnahme, bevor Sie live gehen. |

Halten Sie den Namen des Arbeitspakets, das Modell, den Audiomodus, die Gerätenamen, die Tonhöhenmethode und die Puffersteuerungen in einer Notiz fest. So erhalten Sie nach einem Geräte- oder Software-Update eine zuverlässige Ausgangslage.
