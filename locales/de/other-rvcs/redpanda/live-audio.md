---
label: "Testen Sie Live-Audio in Redpanda-vc"
icon: ":studio_microphone:"
order: 98
permalink: /ilaria-rvc/redpanda/live-audio/
description: "Der Windows-Desktop-Echtzeit-Launcher verwendet die Geräte, die diesem lokalen Prozess ausgesetzt sind."
---
# Testen Sie Live-Audio in Redpanda-vc

## Wählen Sie Desktop oder Browser

Der Windows-Desktop-Echtzeit-Launcher verwendet die Geräte, die diesem lokalen Prozess ausgesetzt sind. Die WebUI-Echtzeitregisterkarte erfasst Mikrofoneingaben über den Browser und leitet Audio an das ausgewählte Inferenzgerät weiter. Verwenden Sie einen Pfad für Ihren ersten Test und lassen Sie den anderen geschlossen, um die Diagnose von Rückmeldungen und Konkurrenzjobs zu erleichtern.

1. Laden Sie ein kompatibles RVC-Modell, wählen Sie den erwarteten Einbetter aus, an dem er freigelegt wird, und beginnen Sie bei neutraler Tonhöhe mit dem Standardpuffer.
2. Wählen Sie das physische Mikrofon aus. Erteilen Sie im Browsermodus der lokalen Seite die Mikrofonberechtigung und überprüfen Sie die tatsächliche Quelle in den Browserberechtigungen.
3. Kopfhörer anschließen und über den Monitor abspielen. Sagen Sie einen kurzen Satz, der sowohl leise als auch laute Wörter enthält, gefolgt von einer Pause. Überprüfen Sie Stimmidentität, Lautstärke und Aussetzer.
4. Stoppen Sie den Stream, bevor Sie die Engine wechseln oder ein anderes Inferenzgerät auswählen. Führen Sie nach der erneuten Verbindung einen weiteren Test durch.

## Wählen Sie das Rechengerät aus.

In WebUI-Builds mit **Inferenzgerät** weist **Automatisch** einem verfügbaren Gerät einen neuen Stream zu. Wählen Sie eine bestimmte GPU, wenn Sie wiederholbare Ergebnisse vergleichen oder eine GPU für eine andere Arbeitslast frei lassen möchten. Ein Stream bleibt auf dem ihm zugewiesenen Gerät. Mehrere GPUs können separate Streams verarbeiten; Das Ändern des Selektors ist keine Möglichkeit, ihre Kapazität in einem Stream zu kombinieren. Beatrice verwendet in der dokumentierten Implementierung einen separaten CPU-Pfad.

## Leiten Sie das Signal nach einem sauberen Test weiter

> **Correct Audio Routing**
>
> **1. Im Voice Changer**
> - **Input Device:** Dein physisches Mikrofon.
> - **Output Device:** `Line 1` (VAC, empfohlen) oder `CABLE Input` (VB-CABLE).
>
> **2. In Discord, Spielen, OBS oder anderen Anwendungen**
> - **Input Device:** `Line 1` (VAC, empfohlen) oder `CABLE Output` (VB-CABLE).
> - **Output Device:** Deine Kopfhörer oder Lautsprecher.
>
> ```text
> Your Microphone → Voice Changer → Line 1 (VAC) or CABLE Input/Output (VB-CABLE) → Discord / Game / OBS
> ```
>
> Audio aus Discord, dem Spiel oder anderen Apps muss direkt auf deine **Kopfhörer** gehen (niemals zurück in das virtuelle Kabel).
>
> - **VAC vs. VB-CABLE:** **VAC** (`Line 1`) wird immer empfohlen. Falls du auch (oder nur) **VB-CABLE** nutzt, sendet der Voice Changer an **`CABLE Input`**, während Discord / Spiele **`CABLE Output`** empfangen.
> - **Monitoring:** Das Mithören der eigenen konvertierten Stimme im Kopfhörer ist eine separate optionale Funktion, die nur bei Bedarf aktiviert werden sollte. Vermeide doppelte Audiowege, Echo und Loopback.

Wenn Ihr Wiedergabepfad auf ein virtuelles Kabel abzielen kann, wählen Sie dort den Wiedergabeendpunkt des Kabels aus. Wählen Sie in der empfangenden App den Aufnahmeendpunkt des Begleiters als Mikrofon aus. Behalten Sie das physische Mikrofon als Konverter-Eingang und -Ausgang des Anrufs über Kopfhörer bei. Im Browsermodus kann das Wiedergabeziel von den Ausgabeeinstellungen des Browsers und des Betriebssystems abhängen. Überprüfen Sie den Empfänger anhand einer lokalen Aufzeichnung, bevor Sie den Live-Stream in einem Anruf beurteilen.

| Was Sie hören | Was Sie testen sollten |
| --- | --- |
| Der Monitor funktioniert, aber der Anruf hat rohes Audio | Wählen Sie den Kabelendpunkt im Anruf aus und deaktivieren Sie zusätzliche Mikrofonquellen. |
| Die Verzögerung nimmt zu oder der Ton stottert. | Stoppen Sie andere Streams, verwenden Sie den Standardpuffer und testen Sie lokal mit einer Registerkarte. |
| Browser-Mikrofonanzeige bewegt sich nie | Bestätigen Sie die Site-Berechtigung, das ausgewählte physische Gerät und ob eine andere App exklusiven Zugriff hat. |
| Nur ein Spiel führt zu Audioausfällen | Testen Sie, während das Spiel läuft, geben Sie der Konvertierungs-GPU etwas Spielraum oder wählen Sie eine andere verfügbare GPU. |

Der Browser-Stream versucht den WebSocket-Transport und kann bei Bedarf auf HTTP-Streaming zurückgreifen. Stellen Sie ein sauberes lokales Ergebnis her, bevor Sie die Qualität der Remoteverbindung untersuchen.
