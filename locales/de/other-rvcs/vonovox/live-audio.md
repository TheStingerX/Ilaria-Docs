---
label: "🎙️ Routen und stimmen Sie Vonovox ab"
order: 98
permalink: /ilaria-rvc/vonovox/live-audio/
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
