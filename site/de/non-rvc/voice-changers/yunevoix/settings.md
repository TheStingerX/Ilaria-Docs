# YuneVoix-Einstellungen Erklärt - Vollständiger Audioqualitäts-Leitfaden

[Übersicht & Anforderungen](overview.md) · [Voice Bank & Live-Nutzung](usage.md) · [Song Cover & Karaoke](song-cover-karaoke.md)

Diese Referenz erklärt jede dokumentierte Einstellung in YuneVoix **v0.7.1** (NVIDIA und AMD). In der Entwicklerdokumentation gilt:
- **"Works live"** bedeutet, dass die Änderung sofort wirkt, während LIVE läuft.
- **"At the next START"** bedeutet, dass du LIVE stoppen und erneut **START** drücken musst, damit die Änderung greift.

---

## Settings → General

Diese Regler steuern Eingangsreinigung, Monitoring, Ausgangspegel, Puffer und die Wahl des AMD-Grafik-Backends (gilt für **LIVE**, wobei `Models folder` und `AMD graphics engine` global wirken):

| Regler | Standard | Gilt | Was es ist & was es tut | Wann nutzen & was schiefgehen kann |
| --- | --- | --- | --- | --- |
| **Input cleaning** (`DF3`, `Gentle`, `Sidon`, `Off`) | `DF3` | Beim nächsten START | Reinigt Mikrofon-Audio vor der Konvertierung. `DF3` entfernt Tippen, Klicks und Zischen und hebt leise Mikros an (`+30 ms`). `Gentle` entfernt konstantes Rauschen/Klicks bei Erhalt von Lachen und Atemzügen. `Sidon` rekonstruiert Sprache auf der GPU (`+~200 ms`). `Off` deaktiviert die Reinigung. | Nutze `DF3` in normalen/lauten Räumen, `Gentle` in ruhigen Räumen, `Off` nur bei sauberem Studiomikro. **Verwende `Sidon` nicht zum Singen** (als ungeeignet für Gesang dokumentiert). |
| **Speech gate** | `Off` | Wirkt live | Schaltet die Ausgabe zwischen Wörtern stumm. | Nur in lauten Räumen bei normalem Sprechen aktivieren; **Lachen und Seufzer werden abgeschnitten**, daher bei häufigem Lachen aus lassen. |
| **Microphone level** | Pegelanzeige (`−6 dBFS` Ziel) | Nur Anzeige | Zeigt deinen Mikrofonpegel in dB. | Hebe die Windows-Mikrofonverstärkung an, bis laute Sprache Spitzen nahe **`−6 dBFS`** erreicht. Zu leiser Eingang führt zu robotischem oder "Unterwasser"-Klang. |
| **Monitor device** | Windows-Standardausgabe | LIVE-Monitoring | Wählt aus, worüber **"Listen to input"** / **"Listen to output"** laufen. | Auf deine **Kopfhörer** stellen, niemals auf das virtuelle Kabel des LIVE-Ausgangs (vermeidet Rückkopplung). |
| **Monitor volume** | `−6 dB` | LIVE-Monitoring | Regelt die Lautstärke des integrierten Monitor-Ausgangs. | Senken, wenn das Monitoring zu laut ist; beeinflusst nicht, was Discord/OBS empfangen. |
| **Output volume** | `−6 dB` | Wirkt live | Steuert den Pegel der konvertierten Ausgabe zum LIVE-Ausgabegerät. | YUNE spielt lauter als die meisten Aufnahmen; um `−6 dB` lassen, sofern die empfangende App nichts anderes braucht. |
| **Peak limiter (`−1 dBFS`)** | `On` | Wirkt live | Begrenzt Ausgangsspitzen auf `−1 dBFS` gegen digitales Clipping. | Auf **On** lassen, außer du testest gezielt unbegrenzte Dynamik. |
| **Output buffer** | `200 ms` | Beim nächsten START | Audiopuffergröße vor der Wiedergabe. | Größere Werte reduzieren Aussetzer/Knackser auf Kosten höherer Latenz; zu niedrige Werte erzeugen Aussetzer. |
| **Models folder** | Leer (`models` neben `.exe`) | Global | Verweist auf einen eigenen Ordner für Modelle/Stimmen. | Leer lassen, außer `models` liegt woanders. |
| **Save diagnostic recordings** | `Off` | Diagnose | Speichert WAV-Dateien dessen, was die Engine hörte und erzeugte (stoppt nach 10 Min automatisch; beim Neustart wieder aus). | **Nur** für Fehlerberichte einschalten; Aufnahmen vor dem Teilen auf private Sprache prüfen. |
| **Restore default settings** | Aktionsbutton | Global | Setzt alle Einstellungen auf Standardwerte zurück. | Gespeicherte Stimmen und gewählte Audiogeräte bleiben erhalten. |
| **AMD graphics engine** *(nur AMD-Build)* | `DirectML` | Nach Neustart | Wechselt zwischen **DirectML** (Standard, dedizierte GPU) und experimentellem **MIGraphX**. | Auf **DirectML** lassen für `WavLM+` und `FlowEdit 3+1`. **MIGraphX** erfordert Windows 11 24H2+, Adrenalin 25.10.13.09+, 10-30 Min Erstkompilierung und deaktiviert `WavLM+`, `FlowEdit 3+1`, `Learned 4 steps` sowie die Classic-exklusiven Optionen (alles läuft als Classic, 10 × Euler). |

> **Reinigung vs. Lautstärke vs. Limiter vs. Puffer:** *Input cleaning* entfernt Hintergrundgeräusche, bevor die KI dich hört; *Output volume* ändert die Lautstärke; *Peak limiter* verhindert plötzliche Verzerrung; *Output buffer* tauscht Latenz gegen Stabilität vor Knacksern.

---

## Settings → Voice & Timbre (LIVE)

Steuert, wie stark die Ausgabe der Voice-Bank-Stimme statt deiner eigenen ähnelt und welche Modellmethode läuft:

- **Timbre strength** (`100%` Standard): Unter `100%` wird deine eigene Klangfarbe über **`Sample of your voice…`** (5-20 s normale Sprache, gespeichert als `my_voice.yvoice`) beigemischt. Wirkt in LIVE.
- **Timbre change when you raise or lower your voice** (`50%` Standard): `100%` lässt die Klangfarbe natürlich mit der Tonhöhe wandern; `0%` hält die Farbe über deinen gesamten Stimmumfang konstant.
- **Prompt length** (`20 s` Standard, empfohlen): Länge des Referenz-Prompts für das Diffusionsmodell. `20 s` liefert das stabilste Timbre; kürzere Werte sparen GPU-Speicher (**Beim nächsten START**).
- **Model method** (`Classic` Standard, **Beim nächsten START**):
  - **`Classic`:** Verhalten früherer Versionen; aktiviert die vier Classic-exklusiven Regler unten.
  - **`Learned 4 steps`:** Auf den Klang von 10 Schritten abgestimmt, während das Modell etwa **40%** seiner GPU-Zeit und weniger GPU-Speicher benötigt (laut Entwicklernotizen).
  - **`FlowEdit 3+1`:** Startet von deiner eigenen Stimme (`Sample of your voice…`, 5-20 s) statt von Rauschen und ändert nur die Stimmidentität, wodurch Atemzüge, Flüstern, Lachen und Artikulation besser erhalten bleiben (etwa **60%** der Modell-GPU-Zeit). Fällt ohne Sample auf `Learned 4 steps` zurück (wird in der LIVE-Statuszeile angezeigt). Auf **AMD MIGraphX** laufen alle Modellmethoden als `Classic` (10 × Euler).
- **Classic-exklusive Regler** *(nur aktiv bei `Model method = Classic`)*:
  - **Model steps** (`10` Standard): `8`, `6` (`≈ −0.75 GB` VRAM) oder `4` (`≈ −1.1 GB` VRAM) laufen schneller mit weniger VRAM.
  - **Solver** (`Euler` Standard): Bei `4-6` Schritten auf `DPM++ 2M` wechseln.
  - **Guidance (CFG) only in the first half of the steps** (`Off` Standard): Spart GPU-Speicher, vor allem bei `4-6` Schritten nützlich.
  - **Timbre guidance** (`0 = off` Standard): `0.5-1` verstärkt Luftigkeit bei hauchigen Zielaufnahmen; kostet zusätzliche GPU-Zeit.
- **Content engine** (`Whisper` Standard, **Beim nächsten START**):
  - **`Whisper`:** Nähere Treue zum Ziel-Timbre.
  - **`WavLM+`** *(nur NVIDIA und AMD DirectML; nicht verfügbar unter AMD MIGraphX)*: Klarere Live-Sprache, bewahrt Lachen, Flüstern und Atemzüge mit deutlich weniger Summen, wobei das Timbre minimal ungenauer sein kann. Da `WavLM+` ein eigenes Modell nutzt, sind **`Fine-tuned model`** und **`Breathiness`** deaktiviert, wenn `WavLM+` aktiv ist.
- **Fine-tuned model** (`Off` Standard, **Beim nächsten START**, nur Whisper): Folgt Atem und Rauheit genauer, mit etwas weniger exaktem Ziel-Timbre.
- **Breathiness** *(nur Fine-tuned model)*: Standard `as you sing`; `×1` / `×2` fügt extra Luft hinzu.
- **Roughness from your voice** (`Off` Standard): Stellt Stimmrauheit dort wieder her, wo deine eigene Stimme rau ist.
- **Smooth out vocal fry** (`Off` Standard, **Wirkt live**): Verhindert, dass sehr tiefes oder knarzendes Sprechen/Singen kratzig klingt, und erhält dabei die Luftigkeit.
- **Guidance (CFG)** (`0.7` Standard, wie trainiert empfohlen): Steuert die Bindung an den Ziel-Timbre-Prompt.

---

## Settings → Pitch & Autotune (LIVE)

- **Pitch shift** (`+12 st` Standard in der Entwickler-Doku als Beispiel für Männerstimme → weibliches Ziel; `0` für gleichen Umfang; `−12` für weiblich → männlich): Verschiebt die Tonhöhe in Halbtönen. Es gibt keinen einzigen "richtigen" Wert für jede Stimme - wähle die Verschiebung passend zu deiner Stimme und Zielstimme.
- **Automatic pitch** (`Off` Standard): `Off` nutzt den Pitch-shift-Regler. **`Octave from the target voice`** hält Gesang in der Tonart; **`Match the target voice's pitch`** passt Sprechtonhöhe an das Ziel an.
- **Melody mode** (`Follow my pitch` Standard):
  - **`Follow my pitch`:** Natürliche Tonhöhenverfolgung.
  - **`Autotune`:** Rastet Töne auf Tonart/Skala ein (`Retune speed` `40 ms` Standard: `25-60 ms` natürlich, `0-10 ms` robotisch; `Stability` `50%`; `Pull to the nearest note` `50%`; `Note change threshold` `20 cents`).
  - **`Stabilize`:** Beruhigt gehaltene Töne bei Erhalt des Vibratos.
- **I sing without a backing track** (`On` Standard): Auf **Off** stellen, wenn du zu einem Song singst.
- **Key / Scale** (`Auto` Standard): Erkennt oder fixiert automatisch die musikalische Skala für Autotune/Harmonie.
- **Vibrato** (`100%` Standard): Behält dein natürliches Vibrato zu `100%`.
- **Fix pitch detector errors** (`On` Standard, empfohlen): Glättet plötzliche Sprünge des Pitch-Detektors.
- **Harmony** (`Off` Standard): Fügt live Terzen/Quinten passend zur Tonart hinzu (`Harmony volume` `−6 dB`); kostet zusätzliche GPU-Zeit.

---

## Settings → EQ & Filters (LIVE)

Alle Regler hier formen den Klang und entfernen Schärfe in **LIVE** (und werden bei Klick auf **Copy settings from LIVE** in Cover übernommen):

- **Voice character** (`Off (as before)` Standard): Integrierte Presets (**Soft**, **Warm**, **Bright**, **Calm**, **Expressive**) oder manuelle Regler für **Formants**, **Intonation range**, **Pitch smoothing**, **Warmth** (`≈250 Hz`), **Softness** (`0.5-3 kHz`) und **Presence** (`≈3.5 kHz`).
- **Breath smoothing** (`100%` Standard): Entfernt leises Knistern in Atemzügen.
- **Silence stays silent** (`On` Standard): Erzwingt echte Stille in Pausen; mit `WavLM+` kannst du auch **Off** testen.
- **Smooth top** (`100%` Standard) & **Brightness** (`0 dB` Standard): **Smooth top** mildert Hochtonschärfe/-körnigkeit. Hebe **Brightness** nur an, wenn die Ausgabe dumpf klingt (und setze **Smooth top** auf `0`, wenn du Brightness erhöhst).
- **Filters, De-esser, Dynamic EQ** (`Off` Standard): Wähle zuerst ein Preset und feinjustiere dann, wenn Zischlaute (`s`/`sch`) oder bestimmte Frequenzen hart wirken.

---

## Settings → Effects (LIVE)

- **Compressor, Saturation, Bitcrush, Reverb** (`Off` Standard): Jeder Effekt bietet Presets und **wirkt live** (ändert sich übergangslos auch beim Singen). Sparsam einsetzen, um das Ziel-Timbre nicht zu verdecken oder unerwünschte Verzerrung/Hall hinzuzufügen.

---

## Kurzreferenz-Tabellen

### Empfohlener Startpunkt (aus der Entwicklerdokumentation)

| Bereich | Startwert | Hinweise |
| --- | --- | --- |
| **Input cleaning** | `DF3` (`Gentle` in ruhigen Räumen) | `Speech gate` `Off` |
| **Microphone level** | Spitzen nahe `−6 dBFS` | In den Windows-Soundeinstellungen regeln |
| **Output / Monitor volume** | `−6 dB` / `−6 dB` | `Peak limiter (−1 dBFS)` `On` |
| **Output buffer** | `200 ms` | Erhöhen, falls Audio knackst |
| **Prompt length / CFG** | `20 s` / `0.7` | `Timbre strength` `100%` |
| **Model method / Content engine** | `Classic` (oder `Learned 4 steps` für Spiele) / `Whisper` | `WavLM+` / `FlowEdit 3+1` für Atem & Lachen testen |
| **EQ & Effects** | `Smooth top` `100%`, `Brightness` `0 dB`, `Breath smoothing` `100%` | `Effects` `Off` |

### Wann Änderungen greifen (`Works live` vs. `At the next START`)

| Wirkt sofort (`Works live`) | Erfordert Stop → `START` (`At the next START`) |
| --- | --- |
| `Speech gate`, `Output volume`, `Peak limiter` | `Input cleaning`, `Output buffer` |
| `Smooth out vocal fry`, `Timbre strength`, `Guidance (CFG)` | `Prompt length`, `Model method` (`Classic` / `Learned 4 steps` / `FlowEdit 3+1`) |
| `Pitch & Autotune`-Regler, `EQ & Filters`, `Effects` | `Content engine` (`Whisper` / `WavLM+`), `Fine-tuned model` |

### Classic-exklusive Regler vs. AMD-Backend-Kompatibilität

| Funktion | Nur Classic? | NVIDIA | AMD DirectML | AMD MIGraphX (Experimentell) |
| --- | --- | --- | --- | --- |
| `Model steps`, `Solver`, `1st-half CFG`, `Timbre guidance` | **Ja** | Ja | Ja | **Nein** *(fest 10 × Euler)* |
| `Learned 4 steps` | Nein | Ja | Ja | **Nein** *(Fallback auf Classic)* |
| `WavLM+` | Nein | Ja | Ja | **Nein** *(nicht verfügbar)* |
| `FlowEdit 3+1` | Nein | Ja | Ja | **Nein** *(Fallback auf Classic)* |

> Auf AMD MIGraphX führt YUNE immer die Classic-Methode mit 10 Euler-Schritten aus; `Learned 4 steps`, `FlowEdit 3+1` und die Classic-exklusiven Optionen sind dort nicht verfügbar.

### Startunterschiede zwischen Sprechen und Singen

| Einstellung | Sprechen (Discord / Streaming) | Singen |
| --- | --- | --- |
| **Input cleaning** | `DF3` (oder `Gentle` in ruhigem Raum) | `DF3` oder `Gentle` (**niemals `Sidon`**) |
| **Automatic pitch** | `Match the target voice's pitch` (oder `Off` + Regler) | `Octave from the target voice` (oder `Off` + `0`/`±12`) |
| **I sing without a backing track** | `On` | `Off` beim Singen zu Musik |
| **Melody mode** | `Follow my pitch` | `Follow my pitch`, `Stabilize` oder `Autotune` |

Nächster Schritt: [Song Cover & Karaoke - Vollständige Einsteiger-Anleitung](song-cover-karaoke.md).
