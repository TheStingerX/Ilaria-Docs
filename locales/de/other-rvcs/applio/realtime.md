---
label: "Richten Sie ein Live-Mikrofon ein"
icon: ":headphones:"
order: 93
permalink: /ilaria-rvc/applio/realtime/
description: "Beweisen Sie, dass Ihr Modell mit einem aufgenommenen Clip funktioniert, bevor Sie Live-Audio einrichten. Verwenden Sie zur Überwachung Kopfhörer, damit..."
---
# Verwenden Sie Applio mit einem Mikrofon

> Wähle das physische Mikrofon im Voice Changer, leite dessen Ausgabe an das Wiedergabegerät des virtuellen Kabels und wähle das zugehörige Aufnahmegerät in Discord oder OBS. Für Vonovox ist **VAC Lite** die erste Wahl, **VB-CABLE** eine Alternative. Lies vor dem Anruf die vollständige Anleitung. [VAC Lite / VB-CABLE](../vonovox/live-audio.md)

Beweisen Sie, dass Ihr Modell mit [einem aufgenommenen Clip](inference.md) funktioniert, bevor Sie Live-Audio einrichten. Verwenden Sie zur Überwachung Kopfhörer, damit das Mikrofon die Lautsprecher nicht wieder erfassen kann. Stoppen Sie Trainings- oder Dateikonvertierungsjobs, die dieselbe GPU verwenden.

## Hören Sie die konvertierte Stimme lokal.

1. Öffnen Sie **Echtzeit**. Erteilen Sie in Desktop die Mikrofonberechtigung, wenn Sie dazu aufgefordert werden, und wählen Sie dann **Eingabegerät** und **Ausgabegerät** aus. Aktualisieren Sie die Liste, wenn Sie nach dem Öffnen von Applio ein Gerät angeschlossen haben.
2. Verwenden Sie für diesen ersten Test Ihr physisches Mikrofon als Eingang und Ihre Kopfhörer als Ausgang oder Monitor. Wählen Sie in Gradio die Geräte unter **Audiogeräte** aus. PortAudio-Gerätenamen können von Windows-Namen oder den in Desktop angezeigten Bezeichnungen abweichen.
3. Wählen Sie das getestete Modell, den passenden Embedder und den optionalen Index aus, falls Sie ihn verwenden. Starten Sie den Stream und warten Sie auf den Bereitschaftszustand. Aktivieren Sie in Desktop **Sich selbst hören**, um zu überwachen und eine angenehme Lautstärke einzustellen.
4. Sagen Sie „eins, zwei, drei“, machen Sie eine Pause und wiederholen Sie den Vorgang dann in Ihrer normalen Sprechstufe. Achten Sie auf die umgewandelte Stimme, fehlende Silben oder Klickgeräusche. Wenn Sie Ihre unveränderte Stimme hören, aktivieren Sie **Passthrough** und prüfen Sie, ob das Mikrofon an anderer Stelle überwacht wird.

## Leiten Sie es zu Ihrem Chat oder Ihrer Streaming-App weiter.

Sobald der Kopfhörertest funktioniert, stoppen Sie den Stream und wählen Sie ein installiertes virtuelles Audiokabel oder ein gleichwertiges Betriebssystemgerät. Das virtuelle Kabel verfügt über einen Endpunkt, der die Wiedergabe empfängt, und einen anderen, der dieses Signal als Aufnahmeeingang bereitstellt.

```text
Physical microphone
  → Applio Realtime input
  → virtual cable playback endpoint
  → virtual cable recording endpoint
  → Discord, OBS or your recording application
```

1. Behalten Sie den Applio-Eingang am physischen Mikrofon bei und wählen Sie den Wiedergabeendpunkt des Kabels als Ausgang.
2. Wählen Sie in der empfangenden App den Aufnahmeendpunkt des Kabels als Mikrofon aus. Wenn Sie eine Überwachung benötigen, verwenden Sie Kopfhörer. Deaktivieren Sie Überwachungspfade, die das Kabel in sich selbst zurückschicken.
3. Starten Sie Applio und verwenden Sie dann den Mikrofontest der empfangenden Anwendung oder machen Sie eine private Testaufnahme. Überprüfen Sie, ob das umgewandelte Signal empfangen wird. Deaktivieren Sie die doppelten physischen Mikrofoneingänge, wenn Sie zwei Stimmen hören.
4. Wenn die Kopfhörer richtig klingen, die empfangende App aber stumm ist, überprüfen Sie die Gerätenamen, den Zielpegel und die Eingangsauswahl, bevor Sie die Stimme oder den Index ändern.

## Balance zwischen Verzögerung und Audiostabilität

Verwenden Sie zunächst die automatische Chunk-Größenbestimmung, sofern verfügbar. Wenn der Ton unterbrochen wird, erhöhen Sie die **Chunk Size** und wiederholen Sie dann genau denselben Satz. Kleinere Blöcke können die Verzögerung reduzieren und der Engine gleichzeitig weniger Zeit für die Fertigstellung jedes Blocks lassen. **Crossfade Overlap** glättet Verbindungen und **Extra Conversion Size** bietet mehr Kontext zu einem geringeren Rechenaufwand. Ändern Sie eine Kontrolle pro Test. Behalten Sie eine stabile Einstellung bei, zu der Sie zurückkehren können.

Wenn leise Anfänge oder Wortenden verschwinden, aktivieren Sie **VAD** oder **Schweigenschwelle**. Wenn laute Vokale knistern, überprüfen Sie das Rohmikrofon und verringern Sie die Eingangsverstärkung. Wenn der Stream nur dann fehlschlägt, wenn ein bestimmtes Spiel oder ein bestimmter GPU-Job ausgeführt wird, versuchen Sie es erneut, während dieser Job geschlossen ist. Stoppen Sie den Live-Modus, bevor Sie zum Training oder zur GPU-Arbeit in der Warteschlange zurückkehren.
