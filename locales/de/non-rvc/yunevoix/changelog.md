---
label: "Changelog"
icon: ":memo:"
order: 95
permalink: /non-rvc/yunevoix/changelog/
---
# YuneVoix-Changelog

## v0.7.1 (20.11.2026)

*Änderungen seit v0.7.0.*

### Behoben

- **AMD**: behoben, dass YuneVoix beim Drücken von **START** auf Computern geschlossen wurde, deren Prozessor auch eine integrierte AMD-Grafik besitzt. Das AMD-Paket verwendet nun standardmäßig **DirectML** auf der dedizierten Karte. **MIGraphX** kann weiterhin unter `Settings → General → "AMD graphics engine"` gewählt werden (experimentell, nach Neustart). Lizenzen, Stimmen und Einstellungen aus `v0.7.0` funktionieren weiter.

### Neu

- **AMD**: die **`WavLM+`** Content-Engine und die **`FlowEdit 3+1`**-Modellmethode funktionieren jetzt auch auf AMD-Karten (**DirectML**) - in **LIVE**, **Covers** und **Karaoke**. Wenn **AMD MIGraphX** ausgewählt ist, sind sie nicht verfügbar.

---

## v0.7.0 (19.11.2026)

*Änderungen seit v0.6.0.*

### Neu

- **Modellmethode** (`Settings → Voice & Timbre`, sowie separat unter `Settings → Song Cover` für Covers und Karaoke; gilt ab dem nächsten **START**):
  - **Classic**: wie bisher (Optionen für Steps, Solver und Guidance).
  - **Learned 4 steps**: so abgestimmt, dass es wie 10 Steps klingt, aber nur etwa **40 %** der GPU-Zeit und weniger VRAM benötigt - ideal für Spiele und schwächere Grafikkarten.
  - **FlowEdit 3+1 (NVIDIA)**: startet von deiner eigenen Stimme statt von Rauschen und ändert nur die Stimmidentität, sodass Atmen, Flüstern, Lachen und Artikulation viel besser durchkommen (etwa **60 %** der GPU-Zeit des Modells). In **LIVE** nutzt es die Aufnahme deiner Stimme (`Voice & Timbre → "Sample of your voice…"` - falls in einer früheren Version gesetzt, einmal neu auswählen); bei Covers und Karaoke nutzt es die Gesangsspur selbst. Funktioniert mit **Whisper** und **WavLM+**. Ohne Stimmprobe oder auf AMD fällt FlowEdit auf **Learned 4 steps** zurück (wird in der LIVE-Statuszeile angezeigt).
- **Karaoke (PREMIUM)**: singe selbst einen Song mit Liedtext auf dem Bildschirm - YUNE wandelt deinen Gesang in die gewählte Stimme um und mischt ihn mit der Musik. Texte werden automatisch angepasst (eingefügter Text oder `.lrc`; Japanisch auch in Romaji).
  - Singe zum Backing Track (bei **PREPARE** getrennt) oder zum Originalsong (startet in Sekunden; Trennung beim ersten Rendern).
  - Sanftes Scrollen mit zentrierter aktueller Zeile; `Leertaste` = Pause, `Esc` = Stopp (endet 5 s danach), `F11` = Vollbild, plus Mikrofonpegel im Textfenster.
  - `Settings → Karaoke`: Kopfhörer, Mikrofon, Lautstärke von Originalgesang und Musik, Textgröße, Aufnahmereinigung (`DF3`), Content-Engine, Oktave, an Originalmelodie angleichen, Gesangspegel, Reverb, Backing Vocals, Pegel des Originalgesangs folgen, Platz für Gesang schaffen und Vocal Fry glätten.
  - **Tonartanpassung**: ein paar Halbtöne höher oder tiefer als das Original zu singen verstimmt das Cover nicht mehr; **„Pull to the original melody“** korrigiert die Töne.
  - **„Follow the original vocal's level“**: verleiht der konvertierten Stimme eine ähnliche Dynamik wie dem Original und schickt Spitzen durch einen Limiter, statt das ganze Cover abzusenken.
  - **„Make room for the vocal“** (standardmäßig an): senkt die Musik beim Singen vor allem in den Bändern `1–4 kHz` ab, während reine Instrumentalpassagen unberührt bleiben.
  - **Karaoke-Oktave `Auto`**: folgt der Lage des Originalsängers und bleibt im Bereich der Zielstimme.
- **„Smooth out vocal fry“** (`Settings → Voice & Timbre` und `Settings → Karaoke`): sehr tiefes oder knarrendes Sprechen/Singen macht die Zielstimme nicht mehr rau, während Luftigkeit erhalten bleibt.
- **Monitoring in LIVE** (`Settings → General`): Eingangs- und Ausgangspegel in dB mit Limiter-Anzeige, **„Listen to input“** (was die Engine nach der Reinigung hört) und **„Listen to output“** (konvertierte Stimme) auf einem separaten Monitor-Gerät.

### Verbessert

- **Spiele und LIVE**: solange LIVE läuft, erhöht YuneVoix seine Priorität (Prozess, GPU, Audio-Threads) und deaktiviert Windows-Hintergrunddrosselung (auch unter Windows 10), damit Vollbildspiele die Stimme weniger beeinträchtigen.
- **Geringere, stabilere Eingangsverzögerung**: das Mikrofon wird gelesen, sobald Windows neues Audio liefert (etwa alle **10 ms** statt 50 ms).
- **Karaoke-Aufnahmen**: gleicht Clock-Drift zwischen Mikrofon und Kopfhörern aus, speichert die Aufnahme im Hintergrund und warnt, wenn keine Stimme aufgenommen wurde oder das Mikrofon übersteuert hat.
- Liedtexte in älteren Kodierungen (z. B. japanisches **Shift-JIS**) öffnen korrekt.
- Text-Synchronisation läuft auf Nicht-NVIDIA-Karten (AMD-Paket) auf der CPU.
- Beim Singen in Karaoke wird die LIVE-Engine von der GPU freigegeben.
- **„Play sample“** in der Voice Bank spielt jetzt über das Windows-Standardausgabegerät (deine Kopfhörer) statt über den LIVE-Ausgang.
- **Microphone level** unter `Settings → General` wird in dB angezeigt.
- Neue integrierte Tipps (*„Playing games with YUNE“*, *„Monitoring and audio devices“*, *„Karaoke“*, sowie Tipps zu Modellmethode und Vocal Fry) und erweiterte `FAQ.txt` im Paket.

### Behoben

- Das Abziehen oder Wechseln eines Audiogeräts während LIVE oder Karaoke stoppt nun sauber mit Begründung, statt stumm „weiterzulaufen“.
- Ein beim Start getrenntes Gerät wird in den Einstellungen nicht mehr automatisch durch ein anderes ersetzt.
- Verständliche Meldungen bei häufigen Audiofehlern (Exklusivmodus, Windows-Mikrofon-Datenschutzsperre, nicht unterstütztes Format, Gerät getrennt, Windows-Audiodienst gestoppt).
- Gepacktes 24-Bit-Mikrofonaudio wird in LIVE korrekt gelesen.
- Sicheres Speichern der Einstellungen (verhindert Zurücksetzen bei Absturz/Stromausfall) mit Sicherungskopie.
- Es kann nur ein YuneVoix-Fenster gleichzeitig laufen.
- Vorheriges Log (`live-diag.prev.log`) und `crash.log` bleiben nach einem Absturz für den Support erhalten.
- Diagnoseaufnahmen stoppen nach 10 Minuten automatisch und sind bei jedem Start aus.
- **Cancel** beendet nun hängende Aufgaben.
- Klare Meldung, wenn das NVIDIA-Paket ohne NVIDIA-GPU gestartet wird; das AMD-Paket läuft auch auf anderen DirectML-Karten.

### Kompatibilität

- **PREMIUM**-Lizenzen aus `v0.6.0` funktionieren weiter: kopiere `license.yvl` neben die neue `YuneVoix.exe`, zusammen mit `models\yune\voices`, `yune.json` und `settings.json`. Neue Optionen starten mit ihren Standardwerten (`Model method: Classic`).

---

## v0.6.0 (05.11.2026)

*Änderungen seit v0.4.0 (`v0.5.0` war ein interner Build und wurde nicht veröffentlicht).*

### Neu

- **Zwei Editionen**: **BASIC** (Live-Stimmkonvertierung, Voice Bank, alle Effekte) und **PREMIUM** (alles aus BASIC + Song Cover).
- **PREMIUM-Lizenz pro PC**: `Song Cover → "Copy request code"` → `"Load license…"` (läuft nie ab, offline, bleibt gültig bei Änderung von 1 Teil aus Mainboard, Systemlaufwerk oder Windows-Installation).
- **Content-Engine `WavLM+`** (`Settings → Voice & Timbre → Content engine`; `Settings → Song Cover` für Covers - **nur NVIDIA**): klarere Live-Sprache, übernimmt eigenes Lachen, Flüstern und Atmen und reduziert Brummen bei Lachen/Seufzern. `Whisper` bleibt Standard für genaueres Timbre.
- **Schalter „Silence stays silent“** (`Settings → EQ & Filters → YUNE output` und `Settings → Song Cover`; standardmäßig an).
- **Ko-fi-Link** (`ko-fi.com/yunevoix`) und Editionsanzeige unter der Versionsnummer.

### Geändert & Entfernt

- Kürzere, genauere Beschreibungen und Tipps in allen sechs Sprachen, passend zu den Schaltflächennamen.
- `YuneVoix.exe --check` meldet nun auch Edition, PREMIUM-Lizenzstatus und `WavLM+`-Modelldateien.
- **Entfernt**: `BigVGAN`-Vocoder-Option - **PC-NSF** ist jetzt der einzige Vocoder (zuvor Standard, besser für Gesang und Atmung).
- Veraltete Hinweise auf den in `v0.4.0` entfernten Frame-Artefakt-Filter gestrichen.
