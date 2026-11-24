# YuneVoix Changelog

## v0.7.1 (2026-11-20)

*Änderungen seit v0.7.0.*

### Behoben

- **AMD**: Problem behoben, bei dem sich YuneVoix beim Drücken von **START** auf Computern schloss, deren Prozessor auch über integrierte AMD-Grafik verfügt, und bei deaktivierter integrierter Grafik mit `ShapeInferenceNotRegistered` abbrach. Das AMD-Paket nutzt nun standardmäßig **DirectML** auf der dedizierten Karte (kein Windows-Update-Download, kein anfängliches Modell-Kompilieren). **MIGraphX** kann weiterhin unter `Settings → General → "AMD graphics engine"` gewählt werden (experimentell, gilt nach Neustart). Lizenzen, Stimmen und Einstellungen aus `v0.7.0` funktionieren weiter.

### Neu

- **AMD**: Windows 10 und Windows 11-Versionen vor 24H2 werden wieder unterstützt (`24H2` wird nur für die experimentelle **MIGraphX**-Engine benötigt).
- **AMD**: die Content-Engine **`WavLM+`** und die Modellmethode **`FlowEdit 3+1`** funktionieren nun auch auf AMD-Karten (**DirectML**) - in **LIVE**, **Covers** und **Karaoke**. Wenn **AMD MIGraphX** gewählt ist, stehen sie nicht zur Verfügung (mit MIGraphX laufen alle Modellmethoden als Classic, 10 × Euler).

---

## v0.7.0 (2026-11-19)

*Änderungen seit v0.6.0.*

### Neu

- **Model method** (`Settings → Voice & Timbre`, und separat unter `Settings → Song Cover` für Covers und Karaoke; gilt beim nächsten **START**):
  - **Classic**: wie bisher (Optionen für Schritte, Solver und Guidance).
  - **Learned 4 steps**: abgestimmt auf den Klang von 10 Schritten bei etwa **40%** der GPU-Zeit und weniger VRAM - ideal fürs Spielen und langsamere Karten.
  - **FlowEdit 3+1 (NVIDIA)** *(AMD: seit v0.7.1)*: startet von deiner eigenen Stimme statt von Rauschen und ändert nur die Stimmidentität, sodass Atemzüge, Flüstern, Lachen und Artikulation deutlich besser durchkommen (etwa **60%** der GPU-Zeit des Modells). In **LIVE** nutzt es deine Stimmprobe (`Voice & Timbre → "Sample of your voice…"`; falls in einer früheren Version gesetzt, einmal neu auswählen). In Covers und Karaoke nutzt es den Gesang selbst. Funktioniert sowohl mit **Whisper** als auch mit **WavLM+**. Ohne Stimmprobe fällt FlowEdit auf **Learned 4 steps** zurück (in der LIVE-Statuszeile angezeigt); auf AMD MIGraphX laufen alle Modellmethoden als **Classic**.
- **Karaoke (PREMIUM)**: singe einen Song selbst mit Liedtext auf dem Bildschirm - YUNE wandelt deinen Gesang in die gewählte Stimme um und mischt ihn mit der Musik. Liedtexte werden automatisch abgeglichen (eingefügter Text oder `.lrc`; Japanisch auch in Romaji).
  - Singe zum Backing-Track (bei **PREPARE** getrennt) oder zum Originalsong (startet in Sekunden; beim ersten Rendern getrennt).
  - Sanftes Scrollen mit zentrierter aktueller Zeile; `Space` = Pause, `Esc` = Stopp (endet 5 s danach), `F11` = Vollbild, plus Mikrofonpegelanzeige im Textfenster.
  - `Settings → Karaoke`: Kopfhörer, Mikrofon, Originalgesangs- und Musiklautstärke, Textgröße, Aufnahmereinigung (`DF3`), Content-Engine, Oktave, Anziehen an Originalmelodie, Gesangspegel, Hall, Begleitgesang, Original-Gesangspegel folgen, Platz für Gesang schaffen und Vocal Fry glätten.
  - **Tonartanpassung**: ein paar Halbtöne höher oder tiefer zu singen verstimmt das Cover nicht mehr; **"Pull to the original melody"** korrigiert die Töne.
  - **"Follow the original vocal's level"**: folgt der Dynamik des Originals und führt Spitzen durch einen Limiter, statt das gesamte Cover leiser zu machen.
  - **"Make room for the vocal"** (standardmäßig an): senkt Musik vor allem in den `1-4 kHz`-Bändern ab, während du singst, und lässt Instrumentalpassagen unangetastet.
  - **Karaoke octave `Auto`**: folgt dem Register des Originalsängers innerhalb des Zielstimmenbereichs.
- **"Smooth out vocal fry"** (`Settings → Voice & Timbre`, und `Settings → Karaoke`): hält sehr tiefes oder knarzendes Sprechen/Singen stimmhaft und glättet Tonhöhensprünge, ohne Luftigkeit zu verlieren.
- **Monitoring in LIVE** (`Settings → General`): Eingangs- und Ausgangspegel in dB mit Limiter-Anzeige, **"Listen to input"** (was die Engine nach der Reinigung hört) und **"Listen to output"** (konvertierte Stimme) auf einem separaten Monitor-Gerät.

### Verbessert

- **Spiele und LIVE**: während LIVE läuft, erhöht YuneVoix die eigene Priorität (Prozess, GPU, Audio-Threads) und deaktiviert Windows-Hintergrunddrosselung (auch unter Windows 10), sodass Vollbildspiele die Stimme weniger stören.
- **Geringere, stabilere Eingangsverzögerung**: das Mikrofon wird ausgelesen, sobald Windows neues Audio hat (etwa alle **10 ms** statt 50 ms).
- **Karaoke-Takes**: gleicht Taktabweichungen zwischen Mikrofon und Kopfhörern aus, speichert Takes im Hintergrund und warnt, wenn keine Stimme aufgenommen wurde oder das Mikrofon verzerrt hat.
- Liedtext-Dateien in älteren Kodierungen (wie japanisches **Shift-JIS**) öffnen korrekt.
- Text-Synchronisation läuft auf Nicht-NVIDIA-Karten auf der CPU (AMD-Paket).
- Der Start des Singens in Karaoke gibt die LIVE-Engine auf der GPU frei.
- **"Play sample"** in der Voice Bank spielt nun auf dem Windows-Standardausgabegerät (deinen Kopfhörern), nicht auf dem LIVE-Ausgang.
- **Microphone level** unter `Settings → General` wird in dB angezeigt.
- Neue integrierte Tipps (*"Playing games with YUNE"*, *"Monitoring and audio devices"*, *"Karaoke"*, plus Tipps zu Modellmethode und Vocal Fry) und eine erweiterte `FAQ.txt` im Paket.

### Behoben

- Das Trennen oder Wechseln eines Audiogeräts während LIVE oder Karaoke stoppt nun sauber und erklärt den Grund, statt still "laufend" zu bleiben.
- Ein beim Start getrenntes Gerät wird nicht mehr stillschweigend durch ein anderes in deinen Einstellungen ersetzt.
- Klare, verständliche Meldungen für häufige Audiofehler (exklusiver Modus, Windows-Mikrofon-Datenschutzblock, nicht unterstütztes Format, getrenntes Gerät, gestoppter Windows-Audiodienst).
- Gepackte 24-Bit-Mikrofone werden in LIVE korrekt gelesen.
- Sicheres Speichern von Einstellungen (verhindert Zurücksetzen bei Absturz/Stromausfall) mit Sicherungskopie.
- Einzelinstanz-Prüfung (immer nur ein YuneVoix-Fenster gleichzeitig).
- Bewahrt nach einem Absturz das vorherige Protokoll (`live-diag.prev.log`) und `crash.log` für den Support auf.
- Diagnoseaufnahmen stoppen automatisch nach 10 Minuten und stehen bei jedem Start wieder auf Aus.
- **Cancel** beendet nun nicht mehr reagierende Aufgaben.
- Klare Fehlermeldung, wenn das NVIDIA-Paket ohne NVIDIA-GPU gestartet wird; das AMD-Paket läuft auch auf anderen DirectML-fähigen Karten.

### Kompatibilität

- **PREMIUM**-Lizenzen aus `v0.6.0` funktionieren weiter: kopiere `license.yvl` neben die neue `YuneVoix.exe`, zusammen mit `models\yune\voices`, `yune.json` und `settings.json`. Neue Optionen starten mit ihren Standardwerten (`Model method: Classic`).

---

## v0.6.0 (2026-11-05)

*Änderungen seit v0.4.0 (`v0.5.0` war ein interner Build und wurde nie veröffentlicht).*

### Neu

- **Zwei Editionen**: **BASIC** (Live-Stimmenkonvertierung, Voice Bank, alle Effekte) und **PREMIUM** (alles aus BASIC + Song Cover).
- **PC-gebundene PREMIUM-Lizenz**: `Song Cover → "Copy request code"` → `"Load license…"` (läuft nie ab, offline, gültig bei Änderung von 1 aus Mainboard / Systemfestplatte / Windows-Installation).
- **Content-Engine `WavLM+`** (`Settings → Voice & Timbre → Content engine`; `Settings → Song Cover` für Covers - **nur NVIDIA**; *AMD: seit v0.7.1*): klarere Live-Sprache, bewahrt eigenes Lachen, Flüstern und Atemzüge und reduziert Summen bei Lachen/Seufzern. `Whisper` bleibt Standard für nähere Timbre-Treue.
- **Schalter "Silence stays silent"** (`Settings → EQ & Filters → YUNE output` und `Settings → Song Cover`; standardmäßig an).
- **Ko-fi-Link** (`ko-fi.com/yunevoix`) und Editions-Abzeichen unter der Versionsnummer.

### Geändert & Entfernt

- Kürzere, genauere Beschreibungen und Tipps in allen sechs Sprachen, passend zu den Schaltflächennamen.
- `YuneVoix.exe --check` meldet nun auch Edition, PREMIUM-Lizenzstatus und `WavLM+`-Modelldateien.
- **Entfernt**: `BigVGAN`-Vocoder-Option - **PC-NSF** ist nun der einzige Vocoder (zuvor Standard, besser für Gesang und Atem).
- Veraltete Hinweise auf den Frame-Artefakt-Filter entfernt (in `v0.4.0` entfernt).
