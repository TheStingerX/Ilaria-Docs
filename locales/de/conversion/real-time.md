---
label: "⚡ Echtzeit-Konvertierung"
order: 92
permalink: /real-time/
description: "Bei einer Aufnahme oder einem Cover kannst du mit der Dateikonvertierung mehrere Takes rendern und vergleichen."
---
# Echtzeit-Stimmenkonvertierung

Bei einer Aufnahme oder einem Cover kannst du mit der Dateikonvertierung mehrere Takes rendern und vergleichen. Im Live-Betrieb muss der Konverter jeden Audioblock schnell genug abschließen, um den Mikrofonstream flüssig zu halten. Richte zuerst ein zuverlässiges lokales Signal ein und verbinde es dann mit einer Anruf-, Aufnahme- oder Streaming-Anwendung.

## Wähle das passende Werkzeug

Siehe das [RVC-Tool-Verzeichnis](../reference/tools.md) für Downloads und Hardwarehinweise, einschließlich Vonovox für NVIDIA-GPUs.

| Tool | Wo anfangen |
| --- | --- |
| Vonovox | Ein Echtzeit-Konverter für RVC-V2-Modelle unter Windows mit NVIDIA-GPU. Lade einen Build für deine GPU herunter, lade das Modell und teste dein Mikrofon über Kopfhörer, bevor du das konvertierte Signal an eine andere App routest. [Vonovox-Downloads](https://huggingface.co/dr87/vonovox/tree/main) · [Projektdokumentation](https://github.com/dr87/Vonovox) |
| RVC WebUI (Mainline - Original RVC) | Das Hauptprojekt bietet eine Trainings- und Inferenz-WebUI sowie eine eigene Echtzeit-GUI. Beachte die Release- und Startanweisungen für deine Plattform. |
| Applio | Seine Desktop- und Gradio-Oberflächen besitzen eigene Echtzeit-Workflows. Folge den Einrichtungsanweisungen für deine installierte Oberfläche und Version. |
| w-okada VCClient | Ein Voice Changer für Live-Nutzung. RVC-Verfügbarkeit hängt von Edition und Plattform ab. Prüfe unterstützte Modelle vor der Installation. [w-okada VCClient](https://github.com/w-okada/voice-changer) |
| Deiteris und Tg-Develop | Eigenständige w-okada-Forks mit eigenen Builds und Einstellungen. Lies die Release-Notes des Forks, bevor du Anleitungen einer anderen Edition übernimmst. [Deiteris-Repository](https://github.com/deiteris/voice-changer) · [Tg-Develop-Repository](https://github.com/tg-develop/voice-changer) |

## Zuerst ein sauberes Signal abhören

1. Schließe Mikrofon und Kopfhörer an. Wähle im Konverter dein physisches Mikrofon als Eingang und deine Kopfhörer als Ausgang.
2. Lade ein bekanntermaßen kompatibles Inferenzmodell und den passenden Index, falls du Retrieval nutzt. Eine erfolgreiche kurze [Dateikonvertierung](../start/getting-started.md) ist eine nützliche Referenz vor dem Live-Test.
3. Starte den Stream und sprich in normaler Lautstärke. Prüfe die Pegelanzeige oder mache eine trockene Aufnahme. Senke den Eingangspegel, falls Spitzen vor der Konvertierung clippen.
4. Prüfe, ob sich das Kopfhörersignal beim Umschalten der Konvertierung ändert. Hörst du gleichzeitig das Original, prüfe direktes Hardware-Monitoring oder einen zweiten Pfad im Betriebssystem.
5. Teste länger als ein einzelnes Wort. Nutze leise Sprache, einen lauten Satz und eine kurze Pause. Achte auf Abbrüche, Drift oder Störungen unter derselben Auslastung wie im Live-Einsatz.

Vermeide Wiedergabe über Lautsprecher neben einem aktiven Mikrofon. Kopfhörer helfen dir, Routing-Probleme zu erkennen, ohne den Ausgang zurück in den Eingang zu leiten.

## Geräte-Rollen und Audio-Backends verstehen

> **Korrektes Audio-Routing (Correct Audio Routing)**
>
> **1. Im Voice Changer**
> - **Eingabegerät (Input Device):** Dein physisches Mikrofon.
> - **Ausgabegerät (Output Device):** `Line 1` (VAC, empfohlen) oder `CABLE Input` (VB-CABLE).
>
> **2. In Discord, Spielen, OBS oder anderen Anwendungen**
> - **Eingabegerät (Input Device):** `Line 1` (VAC, empfohlen) oder `CABLE Output` (VB-CABLE).
> - **Ausgabegerät (Output Device):** Deine Kopfhörer (gegenüber Lautsprechern dringend empfohlen).
>
> ```text
> Dein Mikrofon → Voice Changer → Line 1 (VAC) oder CABLE Input/Output (VB-CABLE) → Discord / Spiel / OBS
> ```
>
> Audio aus Discord, deinem Spiel oder anderen Apps muss direkt an deine **Kopfhörer** gehen (niemals zurück ins virtuelle Kabel).
>
> - **VAC vs. VB-CABLE:** **VAC** (`Line 1`) wird immer empfohlen. Falls du auch (oder stattdessen) **VB-CABLE** installiert hast, beachte, dass der Voice Changer an **`CABLE Input`** ausgibt, während Discord / Spiele von **`CABLE Output`** abhören.
> - **Lautsprecher & Kopfhörer-Übersprechen:** Vermeide Lautsprecher; Ton aus Lautsprechern kann ins Mikrofon gelangen und Doppelton, Echo oder das Konvertieren fremder Stimmen verursachen. Das kann auch mit Kopfhörern passieren, wenn die Lautstärke zu hoch ist oder die Ohrmuscheln nicht geschlossen und isoliert genug sind.
> - **Monitoring:** Deine eigene konvertierte Stimme über Kopfhörer zu hören ist eine separate optionale Funktion, die nur bei Bedarf aktiviert werden sollte. Vermeide doppelte Audiopfade, Echo und Loopback.

Bevor du eine App verbindest, kläre die Aufgabe jedes Endpunkts:

| Begriff | Was es ist |
| --- | --- |
| **Input Device** | Dein physisches Mikrofon (oder Audio-Interface-Kanal), das rohe Sprache an den Voice Changer sendet. |
| **Output Device** | Wohin die konvertierte Stimme geht (dein **virtueller Kabel-Wiedergabe-Endpunkt** für Discord/OBS/Spiele oder Kopfhörer für einen lokalen Test). |
| **Monitor Device** | Optionaler zweiter Ausgang, um deine eigene konvertierte Stimme im Kopfhörer zu hören, während **Output Device** ein virtuelles Kabel speist. |
| **Virtual Cable Input** *(Wiedergabe-Seite)* | Erscheint unter Windows-Wiedergabe (z. B. `Line 1` bei VAC Lite oder `CABLE Input` bei VB-CABLE). Als **Output Device** im Voice Changer wählen. |
| **Virtual Cable Output** *(Aufnahme-Seite)* | Erscheint unter Windows-Aufnahme (z. B. `Line 1` bei VAC Lite oder `CABLE Output` bei VB-CABLE). Als **Mikrofon** in Discord, OBS oder Spielen wählen. |

### USB-Mikrofone, Audio-Interfaces und Backends

- **USB-Mikrofone:** Direkt an einen hinteren USB-Port des Mainboards anschließen (keine passiven Hubs), Windows-Format auf **48000 Hz** stellen und selektives USB-Energiesparen deaktivieren, falls das Mikrofon aussetzt.
- **Audio-Interfaces (XLR):** Nutze **ASIO**, wenn vom Voice Changer unterstützt (z. B. RVC Blue oder w-okada), für geringere Treiberpuffer-Latenz, oder **WASAPI** beim Routing an normale virtuelle Windows-Kabel.
- **WASAPI Shared vs. WASAPI Exclusive:** **WASAPI Shared** ist der sicherste Startpunkt, da Windows und virtuelle Kabel `48000 Hz`-Streams sauber teilen können. **WASAPI Exclusive** umgeht den Windows-Mixer für geringere Treiberlatenz (sofern unterstützt), sperrt das Gerät aber für andere Apps.

## App-spezifische Einrichtung (Discord, OBS, Spiele, Anrufe, Aufnahme)

- **Discord / Anruf-Apps:** Stelle **Input Device** auf den Aufnahme-Endpunkt deines virtuellen Kabels (`Line 1` / `CABLE Output`), **Output Device** auf deine Kopfhörer, und schalte Krisp, Echounterdrückung und automatische Eingabeempfindlichkeit **AUS**, falls Discord Atemzüge oder Wortenden abschneidet.
- **OBS Studio & lokale Aufnahme:** Füge eine **Audio-Eingabeaufnahme**-Quelle mit dem Aufnahme-Endpunkt des virtuellen Kabels hinzu, schalte jede separate rohe Mikrofonquelle stumm und nimm einen kurzen Testclip auf, um Sync und Pegel zu prüfen.
- **Spiele:** Wähle den Aufnahme-Endpunkt des virtuellen Kabels als In-Game-Mikrofon (oder setze ihn als Windows-Standardkommunikationsgerät). Begrenze immer Spiel-FPS oder lasse GPU-Reserve, damit das Spiel den Voice Changer nicht aushungert.

## Konvertiertes Audio an eine andere App senden

Ein virtuelles Audiogerät bietet einen Wiedergabe-Endpunkt für den Konverter und einen passenden Aufnahme-Endpunkt für die empfangende App. Endpunktnamen hängen vom Treiber ab. Beispielsweise kann ein virtuelles Kabel seinen Wiedergabe-Endpunkt "Input" und seinen Aufnahme-Endpunkt "Output" nennen, weil die Bezeichnungen aus Sicht des Kabels gewählt sind.

```text
Physisches Mikrofon → RVC-Konverter → virtueller Wiedergabe-Endpunkt
                                               ↓
                                passender Aufnahme-Endpunkt → Anruf oder Stream
```

Wähle den passenden Aufnahme-Endpunkt als Mikrofon in der empfangenden App und mache dort eine kurze Testaufnahme. Klingt dein lokaler Monitor sauber, aber die Aufnahme nicht, prüfe den Zieleingang und entferne doppelte Mikrofonquellen. Wenn du das konvertierte Audio abhörst, nutze einen separaten Kopfhörerausgang. Leite niemals deinen gesamten Desktop-Mix oder das Audio der empfangenden App zurück in den Konverter.

## Latenz ohne Stabilitätsverlust optimieren

**Verarbeitungslatenz vs. gesamte Ende-zu-Ende-Latenz:** Der **GPU Delay** / die Inferenzzeit im Voice Changer zeigt **nur**, wie lange die GPU zum Konvertieren eines Blocks braucht. Die **gesamte Ende-zu-Ende-Latenz** addiert Mikrofon-Eingabepuffer, **Block Size / Chunk Size**, Crossfade-/Kontext-Overhead, Puffer des virtuellen Kabels und Audiopuffer von Discord/OBS/Spiel. Verwechsle keinen niedrigen GPU Delay (z. B. `15 ms`) mit der gesamten Round-Trip-Latenz.

| Regler | Praktische Anpassung |
| --- | --- |
| Block- oder Chunk-Größe | Erhöhen, wenn Sprache unter Last abbricht. Sobald stabil, kleineren Wert testen und nur behalten, wenn normale Sprache sauber bleibt. Kleinere Blöcke lassen weniger Rechenzeit. |
| Crossfade | Vorsichtig erhöhen, wenn du raue Übergänge zwischen Blöcken hörst. Ändert die Überlappung benachbarter Blöcke. |
| Extra-Kontext | Weniger Kontext testen, falls der Konverter hinterherhinkt. Hilft dem Modell bei Übergängen, kostet aber mehr Rechenzeit. |
| Pitch-Prädiktor | Verursacht eine Einstellung instabiles Timing, vergleiche verfügbare Prädiktoren mit denselben Sätzen. Wähle denjenigen, der deinen Tonumfang mit genug Reserve verarbeitet. |
| Stille-Erkennung / Eingangsschwelle | Schwelle senken, falls leise Silben abgeschnitten werden. In Pausen und bei leisem Sprechen prüfen, nicht nur bei konstant lauter Eingabe. |
| Geräte-Abtastrate | Prüfe Abtastraten von Gerät und virtuellem Kabel bei falscher Geschwindigkeit oder Knistern. Starte mit einheitlichen Einstellungen in der gesamten Kette. |

Starte mit den App-Standardwerten und ändere immer nur eine Einstellung auf einmal. Teilt sich ein Spiel oder eine andere GPU-lastige App den PC, wiederhole den Test währenddessen. Speichere ein funktionierendes Preset, um es vor dem Live-Einsatz wiederherstellen zu können. [RVC WebUI (Mainline - Original RVC) Echtzeit-GUI](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/main/realtime_gui.py)

## Fehlerbehebung nach Fehlerort

| Symptom | Zuerst prüfen |
| --- | --- |
| Weder Konverter-Pegel noch trockene Mikrofonaufnahme reagieren | Windows-Mikrofonberechtigungen, physischen Mute-Schalter und Input-Device-Auswahl prüfen. |
| Trockenes Mikrofon geht, aber konvertierter Ausgang ist stumm | Prüfen, ob Stream läuft, Modell geladen und Output Device korrekt gesetzt ist. VAD-/Stille-Schwelle senken. |
| Lokaler Monitor geht, aber im Anruf kommt die Originalstimme an | Virtuellen Aufnahme-Endpunkt (`CABLE Output` / `Line 1`) als Anruf-Mikrofon wählen und separate rohe Mikrofonquellen deaktivieren. |
| Doppeltes Monitoring / Echo / Rückkopplung | Niemals Lautsprecher neben einem aktiven Mikrofon nutzen. Windows **"Dieses Gerät als Wiedergabequelle verwenden"** ausschalten, falls die App bereits abhört, und nie Desktop-/Anruf-Audio ins virtuelle Kabel routen. |
| Knackser, Stottern oder Puffer-Underruns | **Alle** Endpunkte (Mikro, Kopfhörer, Cable Input/Output) auf **48000 Hz** (`mmsys.cpl`) angleichen, **Block/Chunk Size** eine Stufe erhöhen und CPU-Last prüfen. |
| Roboterstimme oder abgehackte Silben | Pitch-Extraktor zu schwer (`crepe` full) -> auf **RMVPE** oder **FCPE** wechseln oder **Index Ratio** senken. |
| Hoher **GPU Delay** oder Knackser nur beim Spielen | **GPU-Sättigung**: Spiel-FPS begrenzen, schwere GPU-Einstellungen senken oder **Block Size** erhöhen. |
| Modell geht bei Dateien, scheitert aber live | Edition des Live-Clients, Architektur und Embedder-Unterstützung prüfen. Ein im Client als kompatibel gelistetes Modell testen, bevor Audiogeräte geändert werden. |

[RVC-Grundlagen](../start/rvc-fundamentals.md) · [Fehlerbehebung](../reference/troubleshooting.md)

## RVC Blue

Desktop-Stimmenkonvertierung unter Windows. [Installation und Einrichtung](../other-rvcs/voice-changers/rvc-blue/installation.md).
