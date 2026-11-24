---
label: "Voice Bank & Live-Nutzung"
icon: ":studio_microphone:"
order: 97
permalink: /non-rvc/yunevoix/usage/
description: "Vollständige Einsteiger-Anleitung zum Erstellen von Voice Bank .yvoice-Profilen, Audio-Routing zu Discord, OBS, Spielen oder VRChat, integriertem Monitoring und Wahl zwischen Classic, Learned 4 steps und FlowEdit 3+1."
---
# Voice Bank und Live-Nutzung

Nutze diese Anleitung, um Stimmen in der **Voice Bank** zu erstellen, YuneVoix an **Discord, OBS, Spiele oder VRChat** zu routen, die integrierten Monitoring-Regler zu nutzen und die richtige **Model method** für LIVE auszuwählen. Eine vollständige Erklärung jedes Reglers findest du unter [Einstellungen & Audioqualität](settings.md).

## 1. Stimmen erstellen und teilen (Voice Bank)

Anders als beim klassischen RVC wird beim Erstellen eines **Voice Bank**-Profils in YuneVoix **kein neuronales Netz von Grund auf trainiert** - es erstellt in Sekunden eine schlanke `.yvoice`-Sprecherreferenz.

1. Öffne den Tab **Voice Bank**.
2. Stelle **10-25 Sekunden** klare Aufnahmen der Zielstimme bereit:
   - **Was geeignet ist:** Nur ein Sprecher, saubere und trockene Sprache oder Gesang ohne Hintergrundmusik, starken Hall oder überlappende Stimmen.
   - **Hilfreiche Vielfalt:** Natürliches **Lachen, Atemzüge, "mmm" und Gesang** helfen YUNE, ausdrucksstarke Klangfarbe einzufangen.
   - **Was zu vermeiden ist:** Clips unter 10 Sekunden, übersteuertes/verzerrtes Audio, mehrere Personen gleichzeitig oder starker Raumhall (dadurch kann die konvertierte Stimme verrauscht oder instabil klingen).
3. Belasse die Reinigung auf **"Separate voice + remove reverb (recommended)"**, wenn der Quellclip Hintergrundgeräusche oder Raumhall enthält.
4. Speichere die Stimme - sie wird als `.yvoice`-Datei in `models\yune\voices` abgelegt.
5. Klicke in der Voice Bank auf **Play sample**, um sie probezuhören (ab v0.7.0 spielt **Play sample** über dein Windows-Standardausgabegerät / Kopfhörer statt über den LIVE-Ausgang).

Zum Teilen oder Sichern einer Stimme nutze **Voice Bank → Open folder**, um die `.yvoice`-Datei zu finden, oder lade eine über **Import .yvoice…**.

> **Verantwortungsvolle Nutzung:** Verwende nur Stimmen, zu deren Nutzung du berechtigt bist (deine eigene oder mit Zustimmung der Person). Nutze YuneVoix niemals, um echte Menschen nachzuahmen, zu täuschen, zu belästigen oder Betrug zu begehen.

---

## 2. Live-Audio-Routing & Monitoring einrichten

> **Trage beim Live-Einsatz immer Kopfhörer.** Bei Lautsprechern (oder lauten, schlecht isolierten offenen Kopfhörern) kann die konvertierte Stimme zurück ins Mikrofon gelangen und Doppelton, Echo oder Rückkopplungen verursachen.

### Routing zu Discord, OBS, Spielen oder VRChat

Bei einem virtuellen Audiokabel wie **VB-CABLE** (oder **VAC** `Line 1`) hat das Kabel zwei Seiten: **YuneVoix** sendet Audio *in* das Kabel, und **Discord / OBS / Spiele** empfangen Audio *aus* dem Kabel:

1. **In YuneVoix (Tab LIVE):**
   - **Input (Microphone):** Dein physisches Mikrofon.
   - **Output:** **`CABLE Input`** (VB-CABLE) oder **`Line 1`** (VAC).
2. **In Discord, OBS, VRChat oder deinem Spiel:**
   - **Eingabegerät (Mikrofon):** **`CABLE Output`** (VB-CABLE) oder **`Line 1`** (VAC).
   - **Ausgabegerät (Lautsprecher/Kopfhörer):** Deine **Kopfhörer** (niemals das virtuelle Kabel).
3. **In Discord:** Schalte **Rauschunterdrückung (Krisp)** und **automatische Eingabeempfindlichkeit** für dieses virtuelle Mikrofon aus - sie schneiden Atemzüge und leise Wörter ab, und YuneVoix übernimmt die Eingangsreinigung bereits selbst.

### Dich selbst hören (Integriertes Monitoring)

Verwende **nicht** die Windows-Option *"Dieses Gerät als Wiedergabequelle verwenden"* auf dem virtuellen Kabel. YuneVoix bietet eigene Monitoring-Regler:

- **(Optional) Um dich selbst zu hören:** Nutze **"Listen to input"** (was die Engine nach der Eingangsreinigung hört) oder **"Listen to output"** (die konvertierte Stimme) im Tab **LIVE**.
- Wähle dein **Monitor device** (deine Kopfhörer, niemals das virtuelle Kabel des LIVE-Ausgangs) und **Monitor volume** (Standard `-6 dB`) unter **`Settings → General`**.
- **Hinweis zu Direct Monitoring:** Das hardwareseitige *Direct Monitoring* deines Headsets oder Audio-Interfaces hat zwar überhaupt keine Verzögerung, gibt aber deine **unbearbeitete Originalstimme** wieder, nicht die konvertierte Stimme.

### Erwartete Latenz

Mit Standardeinstellungen (`Output buffer` `200 ms`) beträgt die gesamte Ende-zu-Ende-Verzögerung etwa **0.7 Sekunden** (laut Entwicklerangaben). Das funktioniert gut für Sprachchat, Streaming und Aufnahmen, ist jedoch zu hoch, um live exakt im Takt zu einem Track zu singen (für Gesang zu Musik siehe [Song Cover & Karaoke](song-cover-karaoke.md)).

---

## 3. Model Method: Classic vs. Learned 4 Steps vs. FlowEdit 3+1

Du kannst **Model method** unter **`Settings → Voice & Timbre`** (und separat unter **`Settings → Song Cover`** für Cover und Karaoke) wählen. Änderungen greifen **beim nächsten START**.

### Classic (Standard)

- Arbeitet wie in früheren Versionen.
- **Model steps** (`10` Standard, oder `8` / `6` / `4`), **Solver** (`Euler` / `DPM++ 2M`), **Guidance (CFG) only in the first half of the steps** und **Timbre guidance** gelten **nur** im Classic-Modus.

### Learned 4 steps

- Darauf abgestimmt, wie Classic mit 10 Schritten zu klingen, während das Modell etwa **40%** seiner GPU-Zeit und weniger GPU-Speicher benötigt (laut Entwicklernotizen).
- Beste Wahl zum Ausprobieren beim gleichzeitigen Spielen oder mit schwächeren Grafikkarten.

### FlowEdit 3+1

- Startet von **deiner eigenen Stimme** statt von Rauschen und ändert nur die Stimmidentität, um **Atemzüge, Flüstern, Lachen und Artikulation** besser zu erhalten (laut Angaben bei etwa **60%** der GPU-Zeit des Modells).
- **LIVE-Voraussetzung:** Benötigt eine **5-20 Sekunden** lange Probe deiner eigenen normalen Sprache unter **`Settings → Voice & Timbre → "Sample of your voice…"`** (gespeichert als `my_voice.yvoice`).
- **Automatischer Fallback:** Ohne diese Probe fällt FlowEdit 3+1 automatisch auf **Learned 4 steps** zurück, und die LIVE-Statuszeile weist dich darauf hin. Mit der experimentellen **AMD MIGraphX**-Engine laufen alle Modellmethoden als **Classic** (10 × Euler).
- **Raum- & Mikrofon-Tipp:** Da FlowEdit mehr von deinem eigenen Timbre und Raumklang behält, helfen ein ruhiger Raum oder die Eingangsreinigung **`DF3`**, die Ausgabe sauber zu halten.

---

## 4. Empfohlene Abstimmung & Vocal Fry

- **Microphone level (`Settings → General`):** Beobachte die Pegelanzeige und stelle die Windows-Mikrofonverstärkung so ein, dass laute Sprache Spitzen nahe **`−6 dBFS`** erreicht. Ein zu leises Mikrofon ist die häufigste Ursache für robotische oder "Unterwasser"-Ausgabe.
- **Input cleaning (`Settings → General`):** Lasse **`DF3`** in lauteren Räumen an (entfernt Tippen, Klicks und Rauschen; `+30 ms`). In ruhigen Räumen, falls Lachen oder Atemzüge abgeschnitten werden, lasse **Speech gate** aus und teste **`Gentle`**.
- **Smooth out vocal fry (`Settings → Voice & Timbre`, und `Settings → Karaoke`):** Wenn du sehr tief oder mit knarziger Stimme sprichst/singst und das Ziel kratzig klingt, aktiviere **Smooth out vocal fry** (wirkt live; Luftigkeit bleibt erhalten).
- **Pitch & Content-Engine:** Stelle **Pitch shift** (`Settings → Pitch & Autotune`) oder einen **Automatic pitch**-Modus ein und vergleiche **Whisper** (Standard) vs. **WavLM+** (`Settings → Voice & Timbre`, unterstützt auf NVIDIA und AMD DirectML) nach Gehör.

### Spielen während LIVE läuft

Falls du beim Spielen Ruckler bemerkst:
1. Begrenze die **FPS** des Spiels.
2. Stelle **Model method** auf **`Learned 4 steps`**.
3. Verkürze **Prompt length** (z. B. unter `20 s`).
4. Schalte **Harmony** aus, wenn du sie nicht brauchst.
5. Prüfe die gesamte GPU-Auslastung (das Verringern von **Model steps** gilt nur für den Modus **Classic**).

Nächster Schritt: [Einstellungen & Audioqualität](settings.md).
