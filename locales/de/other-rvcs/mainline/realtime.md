---
label: "Echtzeit-Mikrofon-Setup"
icon: ":headphones:"
order: 10
permalink: /ilaria-rvc/mainline/realtime/
---

# Verwenden Sie den RVC WebUI (Mainline - Original RVC)-Echtzeit-Sprachwechsler

> Wähle das physische Mikrofon im Voice Changer, leite dessen Ausgabe an das Wiedergabegerät des virtuellen Kabels und wähle das zugehörige Aufnahmegerät in Discord oder OBS. Für Vonovox ist **VAC Lite** die erste Wahl, **VB-CABLE** eine Alternative. Lies vor dem Anruf die vollständige Anleitung. [VAC Lite / VB-CABLE](../vonovox/live-audio.md)

Diese Anleitung gilt für die separate Echtzeit-GUI, die in unterstützten RVC WebUI (Mainline - Original RVC)-Builds enthalten ist. Es kann ein Mikrofon kontinuierlich durch ein Modell laufen lassen, während die WebUI für Aufzeichnungen und Schulungen verwendet wird. Hören Sie zunächst direkt über Kopfhörer zu und senden Sie dann den verarbeiteten Ton an Ihre andere App.

## Öffnen Sie die Schnittstelle und wählen Sie Ihre Dateien aus.

1. Beenden Sie die [Installation](installation.md) und überprüfen Sie das Modell mit einer [kurzen Dateikonvertierung](inference.md). Dies gibt Ihnen einen unabhängigen Test, falls ein Mikrofonproblem auftritt.
2. In einem Windows-Paket mit `go-realtime_gui.bat` starten Sie es aus dem entpackten Programmordner. Aktivieren Sie im aktuellen Quellzweig die Umgebung über das Setup und führen Sie `python realtime_gui.py` aus dem Repository-Verzeichnis aus. Die Namen der Paketstarter variieren.
3. Wählen Sie im Echtzeitfenster die kleine Inferenz `.pth` aus. Wenn der passende Eintrag `.index` ausgefüllt ist, wählen Sie ihn hier aus. Belassen Sie die **Indexrate** für den ersten Hörtest bei `0`. Wenn Ihr Build einen Index in der Dateiauswahl erfordert, geben Sie den Index für das ausgewählte Modell an.
4. Wählen Sie eine Sound-Host-Schnittstelle und dann Ihr physisches Mikrofon als Eingang und Kopfhörer als Ausgang. Wählen Sie die normalen Werte für Tonhöhe und Samplerate, die Ihr Build bietet. Beginnen Sie mit den Standardleistungseinstellungen.

## Überprüfen Sie das Mikrofon, bevor Sie eine App verbinden.

1. Verringern Sie die Kopfhörerlautstärke, bevor Sie beginnen. Wenn die GUI **Eingabe-Sprachüberwachung** bietet, verwenden Sie diese, um das ausgewählte Mikrofon zu bestätigen. Sprechen Sie einen kurzen Satz und halten Sie inne. Stellen Sie sicher, dass Sie während der Pause eine direkte Stimme und Stille hören.
2. Wechseln Sie zu **Konvertierte Stimme ausgeben** und starten Sie die Konvertierung. Warten Sie auf die Initialisierung. Wiederholen Sie denselben Satz auf normalem Sprachniveau und achten Sie auf Konsonanten und Wortendungen. Überprüfen Sie die Rückmeldung, bevor Sie die Lautstärke erhöhen.
3. Wenn der Stream startet, aber Wörter abschneidet, überprüfen Sie die Geräteauswahl und den Eingabepegel. Wenn wiederholt Lücken auftreten, kehren Sie zur Standardlänge des Verarbeitungsblocks zurück. Eine klare, leicht verzögerte Stimme ist eine bessere Grundlinie als ein Signal mit geringer Latenz, das ständig abbricht.
4. Stoppen Sie den Stream, bevor Sie das Audiogerät wechseln oder einen anderen Prüfpunkt laden. Starten Sie den gleichen Hörtest neu und wiederholen Sie ihn.

## Hauptleitung in einen Anruf oder Rekorder leiten

Richten Sie ein virtuelles Kabel oder ein anderes Paar verbundener Wiedergabe- und Aufnahmegeräte ein. Das Wiedergabeende empfängt Ton von RVC WebUI (Mainline - Original RVC). Das Aufnahmeende liefert diesen Ton an Ihren Anruf oder Rekorder.

```text
Physical microphone → RVC WebUI (Mainline - Original RVC) GUI → Virtual cable playback input
                                           ↓
                       Call or recording app ← Virtual cable recording output
```

1. Stoppen Sie die Konvertierung und stellen Sie das RVC WebUI (Mainline - Original RVC)-Ausgabegerät auf das Wiedergabeende des Kabels. Lassen Sie das physische Mikrofon als RVC WebUI (Mainline - Original RVC)-Eingang ausgewählt.
2. Wählen Sie in der Ziel-App das Aufnahmeende des Kabels als Mikrofon aus. Wählen Sie Ihre Kopfhörer für die Wiedergabe dieser App aus, damit der Ton des Anrufs nicht über das Kabel zurückgesendet wird.
3. Starten Sie die Konvertierung und machen Sie eine private Aufnahme oder nutzen Sie den Mikrofontest der App. Bestätigen Sie, dass die konvertierte Stimme einmal erfasst wird. Wenn Sie auch eine lokale Überwachung benötigen, nutzen Sie die Überwachung der Ziel-App, sofern verfügbar, und halten Sie sie vom Kabeleingang getrennt.
4. Wenn die Ziel-App leise Silben abschneidet, vergleichen Sie zur Diagnose ein kurzes Beispiel mit ausgeschalteter automatischer Geräuschverarbeitung. Stellen Sie jede Verarbeitung wieder her, die das Ergebnis verbessert, ohne Worte zu verlieren.

## Reduzieren Sie die Verzögerung, ohne dass es zu Aussetzern kommt

Verringern Sie die **Sample-Länge** oder die entsprechende Blocksteuerung um jeweils ein Inkrement. Ein kürzerer Block verkürzt die Wartezeit, gibt der Engine jedoch weniger Zeit zum Fertigstellen. Wiederholen Sie nach jedem Wechsel einen leisen Satz und einen lauteren Satz. Bei Klickgeräuschen, Aussetzern oder sich wiederholenden Silben kehren Sie zum letzten stabilen Wert zurück. Sobald die Blockgröße stabil ist, passen Sie jeweils eine weitere Einstellung an, wenn Ihr Build sie verfügbar macht:

- **Fade-Länge** verschmilzt überlappende Blöcke. Bei Klicks an Chunk-Grenzen kann eine Änderung hilfreich sein.
- **Zusätzliche Inferenzzeit** gibt dem Modell mehr Kontext rund um den aktuellen Block. Reduzieren Sie es vorsichtig und achten Sie auf Instabilität.
- **Pitch-Extraktion** wirkt sich sowohl auf die Pitch-Qualität als auch auf die Arbeitsbelastung aus. Vergleichen Sie eine unterstützte Alternative, wenn schwierige Notizen wackeln oder die Verarbeitung zu lange dauert.
- **Indexrate** und Rauschunterdrückung erhöhen die Verarbeitung. Probieren Sie eine stabile Basislinie mit deaktivierten optionalen Funktionen aus, bevor Sie die einzelnen Funktionen anpassen.

Verwenden Sie denselben Test, während Ihr Anruf-, Spiel- oder Aufzeichnungs-Workload ausgeführt wird. Die Hin- und Rückfahrtverzögerung, die Sie hören, umfasst auch Fahrer, das virtuelle Kabel und die Ziel-App. Eine vom Konverter angezeigte Zeitzahl berücksichtigt nur einen Teil dieses Pfads.

| Symptom | Zuerst prüfen |
| --- | --- |
| Gerät fehlt | Stoppen Sie den Stream, laden Sie die Geräteliste neu und versuchen Sie es mit einer anderen Host-Schnittstelle, die das Mikrofon und den Ausgang freigibt. Überprüfen Sie die Berechtigung für das Systemmikrofon. |
| Die Downstream-App empfängt die Rohstimme. | Stellen Sie das Downstream-Mikrofon auf das Aufnahmeende des Kabels. Deaktivieren Sie eine zweite Aufnahmequelle, wenn die App beide Quellen mischt. |
| Heulen oder doppelte Stimme | Verwenden Sie Kopfhörer, stellen Sie sicher, dass kein Eingang auf die eigene Rückleitung des Kabels verweist, und schalten Sie die doppelte Überwachung aus. |
| Guter Monitorton, leises Ziel | Bestätigen Sie, dass Sie die beiden Enden desselben Kabels ausgewählt haben. Testen Sie beide Endpunkte mit einer lokalen Aufzeichnungs-App. |
| Modell startet nicht | Testen Sie denselben Inferenzexport in der WebUI und bestätigen Sie die übereinstimmenden Assets. Überprüfen Sie den ersten GUI-Fehler, bevor Sie Geräte- und Modelleinstellungen gemeinsam ändern. |

Siehe [Grundlagen der Echtzeitkonvertierung](../../conversion/real-time.md) für andere unterstützte Apps und allgemeine Routing-Terminologie.
