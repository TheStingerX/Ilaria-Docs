# YuneVoix Song Cover & Karaoke - Vollständige Einsteiger-Anleitung

[Übersicht & Anforderungen](overview.md) · [Einstellungen & Audioqualität](settings.md) · [Premium, Lizenz & Hilfe](premium-and-troubleshooting.md)

**Song Cover** und **Karaoke** sind Offline-Musikfunktionen, die in **YuneVoix PREMIUM** (`license.yvl`) freigeschaltet werden. Anders als im **LIVE**-Modus haben Song Cover und Karaoke eigene Einstellungs-Tabs, damit LIVE-Änderungen deine Cover-Renders nicht versehentlich verändern.

---

## 1. Song Cover (Schritt für Schritt)

Song Cover trennt einen Song in Gesang und Instrumental, wandelt den Gesang in deine gewählte Voice-Bank-Stimme um und mischt den fertigen Track ab (dauert auf der GPU etwa **1.3×** der Songlänge - z. B. braucht ein 5-Minuten-Song laut Entwicklernotizen etwa 6-7 Minuten).

1. Öffne den Tab **Song Cover** (erfordert eine aktive `license.yvl`).
2. **Song auswählen:** Lade eine Audiodatei (WAV, MP3, FLAC, M4A, AAC, OGG, WMA oder AIFF, bis zu **15 Minuten**).
3. **Zielstimme wählen:** Wähle eine `.yvoice`-Stimme aus deiner Voice Bank.
4. **Stimmentrennung konfigurieren:**
   - **Vocal separator:** **`YUNE`** (Standard, empfohlen, ~2× schneller).
   - **Vocals to convert:** **`Lead vocal only`** (Standard, sauberstes Ergebnis).
5. **Öffne `Settings → Song Cover`** *(oder klicke zweimal auf **Copy settings from LIVE**, um Modell, Timbre, Filter und Effekte aus LIVE zu übernehmen)*.
6. **Octave festlegen:** Lasse **`Auto`** (Standard); klingt das Ergebnis zu hoch oder zu tief, stelle `−12`, `0` oder `+12` ein.
7. **Content engine wählen:** **`Whisper`** (Standard, näher am Ziel-Timbre) oder **`WavLM+`** (weniger Summen bei hauchigen Tönen, Wörter minimal ungenauer; unterstützt auf NVIDIA und AMD DirectML).
8. **Model & Model method wählen:**
   - **Model:** **`base`** (Standard, empfohlen) oder **`fine-tuned`**.
   - **Model method:** **`Classic`** (`10 × Euler` empfohlen für Cover), **`Learned 4 steps`** oder **`FlowEdit 3+1`**.
   - **Prompt length** (`20 s`), **Timbre change** (`50%`), **Roughness** (`off`), **CFG** (`0.7`) und **Fix pitch detector errors** (`on`) entsprechen ihren LIVE-Gegenstücken.
9. **Pegel, Hall & Exportformat einstellen:**
   - **Vocal level:** `+2 dB` (Standard).
   - **Vocal reverb:** eigener Pegel `−17 dB` (Standard), wie Original oder kein Hall.
   - **Keep the separated tracks:** `Off` (Standard); schalte auf **On**, um die Trennung zu überspringen, wenn du denselben Song erneut renderst.
   - **File format:** **`WAV 24-bit`** (Standard) oder **`MP3 320 kbps`** (erfordert den Windows-MP3-Encoder).
10. Cover **erzeugen & exportieren**.

### FlowEdit 3+1 in Song Cover

Anders als im LIVE-Modus **nutzt FlowEdit 3+1 in Song Cover den getrennten Originalgesang des Songs selbst als Quelle**, nicht deine `my_voice.yvoice`-Probe. Das bedeutet, dass FlowEdit in Song Cover darauf abzielt, Atemzüge und Artikulation des Originalsängers zu bewahren, ohne dass eine Aufnahme deiner eigenen Stimme nötig ist.

---

## 2. Karaoke (Schritt für Schritt: PREPARE → SING → RENDER COVER)

Mit Karaoke singst du einen Song selbst mit synchronisiertem Liedtext auf dem Bildschirm, woraufhin deine aufgenommene Stimme in die Zielstimme konvertiert und in den Track gemischt wird.

### Schritt 1: PREPARE

1. Öffne den Tab **Karaoke** und lade deinen **Song** sowie den **Liedtext** (eingefügter Klartext oder `.lrc`-Datei; Japanisch funktioniert auch in Romaji, und ältere Kodierungen wie Shift-JIS werden unterstützt).
2. Wähle unter **`Settings → Karaoke`** bei **Sing along to**:
   - **`Backing track`** (Standard): trennt den Song während **PREPARE** (beim ersten Mal 2-3 Minuten) und liefert die genaueste Textausrichtung.
   - **`Original song`**: startet in Sekunden und führt die Trennung beim ersten Rendern aus.
3. Klicke auf **PREPARE**. Falls der Text leicht driftet, wird deine Sync-Korrektur gespeichert.

### Schritt 2: SING

1. Prüfe **Headphones** (Windows-Standardausgabe) und **Microphone** (wie in LIVE) unter `Settings → Karaoke`.
2. Klicke auf **SING**, um das Liedtext-Fenster zu öffnen (der Start von Karaoke gibt die LIVE-Engine auf der GPU frei).
3. **Steuerung im Liedtext-Fenster:**
   - **`Space`:** Pause / Fortsetzen.
   - **`Esc`:** Singen beenden (das Cover endet 5 Sekunden nach dem Stopp).
   - **`F11`:** Vollbild umschalten.
4. Beobachte die integrierte Mikrofon-Pegelanzeige und singe den Song durch (YuneVoix gleicht Taktabweichungen aus und warnt, wenn keine Stimme aufgenommen wurde oder das Mikrofon übersteuert hat).

### Schritt 3: RENDER COVER

1. Passe bei Bedarf die Mix-Optionen unter **`Settings → Karaoke`** an.
2. Klicke auf **RENDER COVER**. Modell, Modellmethode, Timbre, Filter, Effekte und Exportdateiformat stammen aus **`Settings → Song Cover`**.

### Karaoke-Einstellungen: Monitoring vs. Finales Render

| Einstellung (`Settings → Karaoke`) | Standard | Beeinflusst, was du beim Singen hörst | Beeinflusst das fertige gerenderte Cover |
| --- | --- | --- | --- |
| **Original vocal in headphones** | `20%` | Ja | Nein |
| **Backing vocals** | `On` | Ja | Bleiben im Mix |
| **Music volume** | `0 dB` | Ja | Mix-Referenz |
| **Lyrics size** | `Normal` | Ja (Anzeige) | Nein |
| **Clean the recording** (`Off` / `DF3`) | `Off` | Nein | Ja |
| **Content engine** (`Whisper` / `WavLM+`) | `Whisper` | Nein | Ja |
| **Octave** | `Auto` (Register des Sängers im Zielbereich) | Nein | Ja |
| **Pull to the original melody** | `Off` (`50-70%` natürlich) | Nein | Ja |
| **Follow the original vocal's level** | `70%` (Dynamik + Limiter) | Nein | Ja |
| **Make room for the vocal** | `Up to 60%` (senkt `1-4 kHz` beim Singen ab) | Nein | Ja |
| **Smooth out vocal fry** | `Off` | Nein | Ja |

---

## 3. Song Cover & Karaoke Fehlerbehebung

| Symptom | Was prüfen & ausprobieren |
| --- | --- |
| **Liedtext nicht synchron** | Nutze **`Sing along to → Backing track`** bei **PREPARE**, lade eine zeitgestempelte `.lrc`-Datei falls vorhanden, oder wende in Karaoke eine Sync-Korrektur an (wird pro Song gespeichert). |
| **Mikrofon nicht erkannt / nichts aufgenommen** | Prüfe **Microphone** unter `Settings → Karaoke`, die Windows-Mikrofon-Datenschutzberechtigungen und achte auf die Pegelanzeige im Textfenster. |
| **Aufgenommene Stimme zu leise** | Erhöhe die Windows-Mikrofonverstärkung Richtung `−6 dBFS`, aktiviere **Follow the original vocal's level** (`70%` Standard) und lasse **Make room for the vocal** aktiv. |
| **Falsche Tonhöhe / schief** | Prüfe **Octave** (`Auto`, `−12`, `0` oder `+12`) und teste **Pull to the original melody** (`50-70%`) unter `Settings → Karaoke`. |
| **Ruckeln während Karaoke** | Schließe andere GPU-lastige Apps, nutze **`Backing track`** (bereits bei PREPARE getrennt) oder prüfe die Audiopuffer-Einstellungen. |
| **Musik zu laut / Stimme geht unter** | Erhöhe **Vocal level** (`+2 dB` Standard), lasse **Make room for the vocal** an oder senke **Music volume** beim Singen. |
| **Atemzüge oder Flüstern fehlen im Cover** | Vergleiche **`WavLM+`** vs. **`Whisper`**, oder wechsle **Model method** auf **`FlowEdit 3+1`** unter `Settings → Song Cover`. |
| **Zu viel Hall auf dem Cover-Gesang** | Senke **Reverb on the vocal** (`−17 dB` Standard) oder stelle ihn unter `Settings → Song Cover` auf keinen. |
| **Artefakte bei Stimmtrennung / Duette** | Lasse **Vocal separator** auf **`YUNE`** und **Vocals to convert** auf **`Lead vocal only`** (Duette mit zwei Hauptsängern können nicht automatisch auf eine einzelne Stimme isoliert werden). |

Nächster Schritt: [Premium, Lizenz & Hilfe](premium-and-troubleshooting.md).
