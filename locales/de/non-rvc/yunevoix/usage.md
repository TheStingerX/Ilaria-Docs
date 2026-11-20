---
label: "Voice Bank & Live-Nutzung"
icon: ":studio_microphone:"
order: 97
permalink: /non-rvc/yunevoix/usage/
description: "Nutze diese Anleitung, um Stimmen in der Voice Bank zu erstellen, YuneVoix an Discord, OBS, Spiele oder VRChat zu routen und die Audioeinstellungen für..."
---
# Voice Bank und Live-Nutzung

Nutze diese Anleitung, um Stimmen in der **Voice Bank** zu erstellen, YuneVoix an **Discord, OBS, Spiele oder VRChat** zu routen und die Audioeinstellungen für eine saubere Live-Konvertierung abzustimmen.

## 1. Stimmen erstellen und teilen (Voice Bank)

YuneVoix benötigt **kein Modelltraining**.

1. Öffne den Tab **Voice Bank**.
2. Wähle **10–25 Sekunden** klare Aufnahmen der Zielstimme:
   - Am besten: nur eine Person, trockenes Audio ohne Musik oder Effekte.
   - Natürliches **Lachen, Atmen, „mmm“ und Gesang** helfen der Engine, Ausdruck einzufangen.
3. Lasse die Reinigung auf **„Separate voice + remove reverb“**, falls Hintergrundgeräusche oder Hall vorhanden sind.
4. Die Stimme ist in Sekunden bereit und wird als kleine `.yvoice`-Datei gespeichert.

Zum Teilen oder Sichern nutze **Voice Bank → Open folder** für die `.yvoice`-Datei, oder lade eine über **Import .yvoice…**.

> **Verantwortungsvolle Nutzung**: Nutze nur Stimmen, die du verwenden darfst (deine eigene oder mit Einverständnis). Nutze YuneVoix niemals, um echte Personen nachzuahmen, zu täuschen, zu belästigen oder Betrug zu begehen.

## 2. Live-Audio-Routing einrichten

> **Trage immer Kopfhörer** im Live-Betrieb. Über Lautsprecher gelangt die konvertierte Stimme zurück ins Mikrofon - Echo, Brummen und Rückkopplung.

### Routing zu Discord, OBS, Spielen oder VRChat

1. Installiere ein virtuelles Audiokabel (z. B. das kostenlose **VB-CABLE**).
2. Wähle in **YuneVoix** dein physisches Mikrofon als Eingang und **`CABLE Input`** als Ausgabegerät.
3. Wähle in **Discord, OBS, VRChat oder deinem Spiel** **`CABLE Output`** als Mikrofon.
4. *(Optional)* Um dich selbst zu hören: öffne **Windows-Soundeinstellungen → Aufnahme → CABLE Output → Eigenschaften → Abhören**, aktiviere **„Dieses Gerät als Wiedergabequelle verwenden“** und wähle deine Kopfhörer.
5. **In Discord** deaktiviere **Rauschunterdrückung (Krisp)** und die **automatische Eingangsempfindlichkeit** für dieses Mikrofon - sie schneiden Atemzüge und leise Wörter ab, und YuneVoix reinigt den Eingang bereits.

### Erwartete Latenz

Mit Standardeinstellungen liegt die Verzögerung bei etwa **0,7 Sekunden**. Ideal für Streaming, Voice-Chat und Aufnahmen, aber zu hoch, um exakt im Takt zu einem Beat zu singen. Ein kleinerer **Output buffer** senkt die Latenz leicht, kann aber zu Aussetzern führen.

## 3. Empfohlene Einstellungen

### Mikrofonpegel & Eingangsreinigung

- Gehe zu **Settings → General** und prüfe **Microphone level**. Erhöhe die Mikrofonverstärkung in Windows, sodass lautes Sprechen bei etwa **−6 dBFS** liegt. Ein zu leises Mikrofon ist der häufigste Grund für robotische oder „Unterwasser“-Stimmen.
- Belasse **Input cleaning** in lauten Umgebungen auf **`DF3`**. In einem ruhigen Raum kannst du **Speech gate** deaktivieren und **`Gentle`** testen, falls Lachen, Atmen oder Flüstern abgeschnitten werden.

### Pitch & Autotune

Gehe zu **Settings → Pitch & Autotune**:
- **Pitch shift**:
  - **`+12`** für männliche Stimme → weibliches Ziel
  - **`0`** für eine Stimme in deiner eigenen Tonlage
  - **`−12`** für weibliche Stimme → männliches Ziel
  - Oder aktiviere **automatischen Pitch**.
- Für Gesang kannst du **Autotune** (mit Tonarterkennung), **Pitch Stabilizer**, **Vibrato Depth** und **Live-Harmonie** (Terzen, Quinten, Oktaven) aktivieren.

### Stimmcharakter, Effekte & GPU-Last

- **Voice character**: passe Timbre-Stärke, Formant, Wärme und Präsenz an oder starte mit einem Preset.
- **Vocal effects**: De-Esser, Kompressor, Reverb und Peak-Limiter.
- **Content-Engines & FlowEdit 3+1** (**Settings → Voice & Timbre**):
  - Teste **WavLM+** (unterstützt auf NVIDIA und AMD DirectML; nicht verfügbar bei gewähltem AMD MIGraphX), um Lachen, Flüstern und Atmen deiner eigenen Stimme zu übernehmen.
  - Der **FlowEdit 3+1**-Modus (unterstützt auf NVIDIA und AMD DirectML) bewahrt mehr von deiner natürlichen Atmung und Artikulation (benötigt im LIVE-Betrieb eine Stimmprobe von dir).
  - Auf AMD wird standardmäßig **DirectML** auf deiner dedizierten GPU genutzt; unter `Settings → General → "AMD graphics engine"` kannst du optional **MIGraphX** (experimentell, nach Neustart) wählen, wobei `WavLM+` und `FlowEdit 3+1` DirectML voraussetzen.
  - Wenn du **gleichzeitig spielst** und Ruckler hörst, senke die Spielgrafik/FPS, reduziere **Model steps**, nutze einen kürzeren Prompt oder deaktiviere **Harmony**.
