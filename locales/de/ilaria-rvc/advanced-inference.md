---
label: "🎛️ Verarbeitung und Export"
order: 89
permalink: /ilaria-rvc/advanced-inference/
---
# Verarbeitung und Export

## Richten Sie eine Voreinstellung ein

Öffnen Sie **Inferenzeinstellungen** für Einzeln oder Stapel. Wählen Sie das Modell und überprüfen Sie die **Sprecher-ID** für einen Prüfpunkt mit mehreren Lautsprechern. Zero ist der übliche Slot für eine einzelne Stimme. Lassen Sie die Tonhöhe auf Null, den Abruf auf Null und die Verarbeitung für eine erste Referenz ausgeschaltet. Ein geladener Index hat bei Null keine Abrufwirkung. Aktivieren Sie jeweils eine Option und spielen Sie dieselbe Quellphrase ab.

 | Steuerung | Wo es wirkt | Worauf Sie achten sollten |
| --- | --- | --- |
 | Audio teilen | Findet ruhige Orte, um eine Aufnahme zu teilen und dabei das Timing beizubehalten. | Überprüfen Sie Verbindungen, Wortendungen, Atemzüge und Lücken. |
 | Autotune | Verschiebt das stimmhafte F0 in Richtung benachbarter chromatischer Noten. Verwendet Tonhöhenführung. | Vergleichen Sie exponierte Noten und Vibrato. |
 | Vorgeschlagener Pitch | Verwendet eine Zielfrequenz und die mittlere Stimmtonhöhe der Quelle, um eine begrenzte Verschiebung abzuschätzen. | Testen Sie vor einem vollständigen Lauf die Höhen und Tiefen der Leistung. |
 | Formantenverschiebung | Ändert die Stimmresonanz vor der Umwandlung. Bei einem Verhältnis von 1 bleibt die Grundlinie erhalten. | Vergleichen Sie Vokale mit der gleichen Tonhöhe und Hörlautstärke. |
 | Clean Audio | Wendet die Rauschunterdrückung nach der Konvertierung an. | Achten Sie auf wässrige Ausläufer oder verlorene Konsonanten. |
 | Nachbearbeitung | Wendet ausgewählte Effekte auf die konvertierte Ausgabe an. Gain, Pitch Shift und Limiter stellen Steuerelemente zur Verfügung. | Vergleiche Level-Matching mit ausgeschalteten Effekten. Bewahren Sie einen trockenen Export zur späteren Bearbeitung auf. |

Der Inferenzabschnitt **Nachbearbeitung** wendet Effekte auf konvertiertes Audio an. Die **Prozessdaten** von Training verfügen über eine eigene Ebenenanpassung pro Segment.

## Pitch und Inhaltsextraktion

RMVPE ist der Grundtonhöhenschätzer. FCPE, Swift, Beatrice und Parselmouth sind verfügbar, sofern der ausgewählte Betrieb sie unterstützt. Vergleichen Sie Pitch-Methoden mit einem engen A/B-Test. Die Pitch-Methode schätzt F0, während der [embedder](embedders.md) Features extrahiert, die zum Modell passen müssen.

## Exportieren und vergleichen

Wählen Sie WAV oder FLAC zum Bearbeiten und Archivieren von Kopien. MP3, OGG und M4A sind kleinere Verbreitungsmöglichkeiten. Der Ausgabeplayer lädt das ausgewählte Format herunter. Batch schreibt Dateien auch in das ausgewählte Ausgabeverzeichnis. Überprüfen Sie die erste Ausgabe und ihren Namen, bevor Sie viele Eingaben verarbeiten.

Der Waveform-Player unterstützt Wiedergabe und Suche, einschließlich Pfeiltastensprüngen bei Fokussierung. Bei sehr langen, großen oder nicht unterstützten Eingaben wird möglicherweise der Standardplayer des Browsers verwendet. Für einen nützlichen A/B-Vergleich passen Sie die Volumina an und achten Sie auf identische Zeitstempel.
