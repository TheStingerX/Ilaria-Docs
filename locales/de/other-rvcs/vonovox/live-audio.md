---
label: "Routen und stimmen Sie Vonovox ab"
icon: ":studio_microphone:"
order: 98
permalink: /ilaria-rvc/vonovox/live-audio/
description: "Verwenden Sie drei Endpunkte: Ihr physisches Mikrofon für die Eingabe, ein virtuelles Kabel für das umgewandelte Signal und Kopfhörer für die Überwachung."
---
# Routen und stimmen Sie Vonovox ab

## Richten Sie die Route ein

Verwenden Sie drei Endpunkte: Ihr physisches Mikrofon für die Eingabe, ein virtuelles Kabel für das umgewandelte Signal und Kopfhörer für die Überwachung. Ein virtuelles Kabel hat eine Wiedergabeseite für die App, die Audio sendet, und eine Aufnahmeseite für die App, die es empfängt. Einige Treiber zeigen auf beiden Seiten den gleichen Leitungsnamen an.

1. Stellen Sie in Vonovox **Eingabegerät** auf das physische Mikrofon ein. Stellen Sie **Ausgabegerät** auf die virtuelle Zeile ein, die unter Windows-Wiedergabegeräte aufgeführt ist.
2. Wählen Sie in der empfangenden App unter den Mikrofoneinstellungen die passende Leitung aus. Vermeiden Sie es, die App auf **Standard** zu belassen, wenn sie das physische Mikrofon auswählt. Lassen Sie den Lautsprecherausgang der empfangenden App auf Ihren Kopfhörer eingestellt.
3. Um lokal zuzuhören, öffnen Sie **Einstellungen → System → Ton → Weitere Toneinstellungen → Aufnahme**. Öffnen Sie die Eigenschaften des Aufnahmeendpunkts des Kabels, wählen Sie **Dieses Gerät anhören** und senden Sie die Wiedergabe an Kopfhörer. Schalten Sie das Abhören aus, wenn Sie bereits über eine andere App überwachen.
4. Testen Sie in der empfangenden App mit einer privaten Aufnahme oder einem Mikrofontest. Sagen Sie einen normalen Satz, warten Sie ruhig und sagen Sie dann einen lauteren Satz. Stellen Sie sicher, dass die Aufnahme die konvertierte Stimme, saubere Pausen und keine zweite Kopie Ihres Rohmikrofons enthält.

Der Entwickler verwendet eine 48-kHz-Audioroute. Wenn Ihr Mikrofon und Ihr virtueller Treiber diese Rate aufweisen, stellen Sie deren Geräteformate auf 48 kHz ein. Dieses Geräteformat ist von der Trainingsrate des Modells getrennt.

## Stellen Sie eine wiederholbare Reihenfolge ein.

| Symptom. | Wechseln Sie, um zuerst zu testen. |
| --- | --- |
| Knisternde oder fehlende Silben. | Erhöhen Sie die **Blockgröße** um einen Schritt und wiederholen Sie denselben Satz. |
| Reinigen Sie den Ton mit zu großer Verzögerung | Reduzieren Sie die **Blockgröße** um einen Schritt. Stellen Sie den letzten sauberen Wert wieder her, wenn es zu Audioausfällen kommt. |
| Flüstern oder Singen verschwindet. | Deaktivieren Sie **RNNoise** und **VAD Noise Reduction**, falls aktiviert, und überprüfen Sie alle nachgeschalteten Voice Gates. |
| Lokaler Ton ist klar, aber gesendetes Audio ist stumm. | Überprüfen Sie, ob die empfangende App den Aufnahmeendpunkt des Kabels abhört. |
| Die Stimme wird wiederholt oder hallt wider. | Deaktivieren Sie die Doppelüberwachung und stellen Sie sicher, dass die Anrufausgabe direkt an die Kopfhörer weitergeleitet wird. |
| Der Ton bricht nur beim Spielen ab. | Testen Sie unter normaler Spiellast. Geben Sie dem Konverter GPU-Spielraum oder erhöhen Sie die Blockgröße. |

Schauen Sie sich für den ersten Test die Voreinstellung an. Ändern Sie es erst, nachdem Sie eine stabile Blockgröße gefunden haben. Stimmen Sie Tonhöhe und Formant unabhängig voneinander ab und pausieren Sie zwischen den Änderungen, damit sich resultierende Artefakte leichter isolieren lassen. Überprüfen Sie beim Testen der Dateiwiedergabe in Echtzeit die aktive Quelle in der Benutzeroberfläche, bevor Sie mit der Verwendung des Mikrofons fortfahren. Eine abgespielte Datei kann das physische Mikrofon vorübergehend ersetzen.

## Anleitung für virtuelle Windows-Kabel

> **Correct Audio Routing**
>
> **1. Im Voice Changer**
> - **Input Device:** Dein physisches Mikrofon.
> - **Output Device:** `Line 1` (VAC, empfohlen) oder `CABLE Input` (VB-CABLE).
>
> **2. In Discord, Spielen, OBS oder anderen Anwendungen**
> - **Input Device:** `Line 1` (VAC, empfohlen) oder `CABLE Output` (VB-CABLE).
> - **Output Device:** Deine Kopfhörer (dringend statt Lautsprechern empfohlen).
>
> ```text
> Your Microphone → Voice Changer → Line 1 (VAC) or CABLE Input/Output (VB-CABLE) → Discord / Game / OBS
> ```
>
> Audio aus Discord, dem Spiel oder anderen Apps muss direkt auf deine **Kopfhörer** gehen (niemals zurück in das virtuelle Kabel).
>
> - **VAC vs. VB-CABLE:** **VAC** (`Line 1`) wird immer empfohlen. Falls du auch (oder nur) **VB-CABLE** nutzt, sendet der Voice Changer an **`CABLE Input`**, während Discord / Spiele **`CABLE Output`** empfangen.
> - **Lautsprecher & Übersprechen bei Headsets:** Vermeide Lautsprecher: Der Ton kann ins Mikrofon gelangen und Doppelton, Echo oder sogar die Konvertierung fremder Stimmen verursachen. Das kann auch bei Headsets passieren, wenn sie zu laut oder nicht geschlossen und gut genug isoliert sind.
> - **Monitoring:** Das Mithören der eigenen konvertierten Stimme im Kopfhörer ist eine separate optionale Funktion, die nur bei Bedarf aktiviert werden sollte. Vermeide doppelte Audiowege, Echo und Loopback.

### Wählen Sie VAC Lite oder VB-CABLE

**VAC Lite ist die empfohlene erste Wahl für Vonovox.** Dies ist auch die Einstellung im Windows-Setup des Vonovox-Projekts. Verwenden Sie [VAC Lite](https://software.muzychenko.net/freeware/vac470lite.zip), wenn Sie bei Null anfangen. [VB-CABLE](https://vb-audio.com/Cable/) ist eine brauchbare Alternative, wenn es bereits installiert ist oder besser mit Ihrem speziellen Audio-Setup funktioniert. Installieren Sie zuerst einen Treiber, damit die Geräteliste leicht zu verstehen ist.

Öffnen Sie nach der Installation des Treibers den Konverter und die Anruf- oder Aufnahme-App erneut, damit sie die neuen Audio-Endpunkte sehen können. Starten Sie Windows neu, wenn Sie vom Installationsprogramm dazu aufgefordert werden. Die folgenden Beispielnamen können einen Treibernamen oder ein Nummerierungssuffix enthalten.

| Treiber | Konverter-Ausgang (Wiedergabe-Endpunkt) | Discord, OBS, Spiele oder andere Apps (Aufnahmegerät) |
| --- | --- | --- |
| VAC Lite | **Leitung 1** unter Wiedergabe | **Leitung 1** unter Aufnahme |
| VB-CABLE | **CABLE Input** | **CABLE Output** |

### Verdrahten Sie die vier Geräte richtig.

1. Stellen Sie im Sprachwechsler **Eingang** auf Ihr physisches Mikrofon ein. Sprechen Sie, um zu bestätigen, dass sich die Eingangsanzeige bewegt.
2. Stellen Sie im Sprachwechsler **Ausgabe** auf den Wiedergabeendpunkt des ausgewählten Kabels ein. Lassen Sie den Konverter laufen.
3. Wählen Sie in Discord den passenden Aufnahmeendpunkt unter **Sprache & Video → Eingabegerät** aus. Fügen Sie in OBS eine **Audio Input Capture**-Quelle für diesen Aufzeichnungsendpunkt hinzu. Schalten Sie während des Tests alle doppelten Mikrofonquellen stumm.
4. Stellen Sie die Discord- oder Windows-Wiedergabe auf Ihre Kopfhörer ein. Halten Sie Systemgeräusche und die Stimme der anderen Person vom Kabel fern. Zeichnen Sie den Mikrofontest der Ziel-App auf oder verwenden Sie ihn, um zu bestätigen, was tatsächlich ankommt.

### Beobachten Sie kurz und überprüfen Sie das Audioformat

Öffnen Sie **Einstellungen → System → Ton → Weitere Toneinstellungen → Aufnahme**. Wählen Sie den Aufnahmeendpunkt des Kabels, öffnen Sie **Eigenschaften → Hören**, aktivieren Sie **Dieses Gerät hören** und wählen Sie Kopfhörer für die Wiedergabe aus. Testen Sie bei geringer Lautstärke. Wenn der Konverter oder OBS bereits eine Überwachung bietet, verwenden Sie jeweils einen Monitor, um ein Echo zu vermeiden. Sie können die Windows-Überwachung nach dem Test ausschalten und das Kabel weiterhin an das Ziel senden.

Beginnen Sie für Vonovox mit dem WASAPI-Freigabemodus, sofern verfügbar. Verwenden Sie 48 kHz an den Mikrofon- und Kabelendpunkten, sofern diese dies unterstützen. Das Windows-Geräteformat ist von der Trainingsrate des Modells getrennt. Wenn das Gerät nur ein anderes unterstütztes Format verwenden kann, testen Sie die tatsächliche Route, bevor Sie andere Einstellungen ändern.

### Finden Sie heraus, welches Glied in der Kette ausgefallen ist

| Was passiert | Erste Prüfung |
| --- | --- |
| Nichts bewegt sich in Vonovox | Überprüfen Sie die Windows-Mikrofonberechtigung und den physischen Mikrofoneingang. |
| Vonovox empfängt Ihr Mikrofon, aber das Kabel hat kein Signal | Überprüfen Sie, ob die Konvertierung läuft und der Konverterausgang der Endpunkt für die Kabelwiedergabe ist. |
| Das Kabel hat Signal, aber Discord sendet das Rohmikrofon. | Wählen Sie den Kabelaufzeichnungsendpunkt explizit in der Anruf-App aus. |
| Sie hören Ihre Stimme zweimal. | Deaktivieren Sie die doppelte Überwachung und stellen Sie sicher, dass das physische Mikrofon nicht separat erfasst wird. |
| Die Stimmen anderer Personen kommen als Echo zurück. | Leiten Sie die Anrufausgabe an Kopfhörer weiter und entfernen Sie Desktop- oder Anrufaudio vom Kabel. |
| Der Ton klingt gut, bis der PC unter Last steht. | Stellen Sie den Standardpuffer wieder her oder erhöhen Sie ihn und testen Sie ihn bei laufendem Spiel oder laufender Streaming-App. |
| Silben verschwinden, wenn Sie flüstern oder singen. | Testen Sie mit jeweils deaktivierter Sprachaktivitätserkennung und Geräuschunterdrückung. |

Passen Sie die **Blockgröße** an, nachdem die gesamte Route funktioniert. Senken Sie es um eine Stufe und wiederholen Sie den gleichen Satz. Wenn Sie Klicks oder fehlende Wörter erhalten, stellen Sie den letzten sauberen Wert wieder her. Lassen Sie Lookahead und andere Effekte auf ihren Standardwerten, bis Sie eine stabile Grundlinie haben.

> **Optional:** Treten auf einer unterstützten NVIDIA-Karte GPU-Delay-Spitzen auf? Siehe [Erweiterte Leistungsoptimierung: NVIDIA GPU Clock Locking](advanced-performance-optimization.md).
