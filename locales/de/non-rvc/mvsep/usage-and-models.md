---
label: "Empfohlene Modelle & Presets"
icon: ":control_knobs:"
order: 97
permalink: /non-rvc/mvsep/usage-and-models/
---
# MVSep-Anleitung: empfohlene Modelle & Presets

Hier findest du die besten MVSep-Presets für extrem saubere Vocal-Spuren (für RVC-Training, Cover oder Stimmkonvertierung) — mit **Direktlinks**, die Algorithmus und Optionen passend vorauswählen.

## 1. Vocals und SFX trennen (Vocals & SFX Removal)

Nutze diese zuerst, um Hintergrundmusik, Soundeffekte und Umgebungsgeräusche zu entfernen.

- **BS Polarformer** — [Preset auf MVSep öffnen](https://mvsep.com/home?sep_type=56&add_opt1=2&add_opt2=1&add_opt3=0)
  - Hochpräzise Band-Split-Roformer-Variante mit **Polar Positional Embeddings (PoPE)** für langen Audiokontext.
  - **Wann nutzen**: erste Wahl für saubere Vocals mit minimalem Instrumental-Bleed.
- **MVSep DnR v3** — [Preset auf MVSep öffnen](https://mvsep.com/home?sep_type=123&add_opt1=163)
  - Filmisches Multi-Stem-Modell (*Divide and Remaster*), das Audio in **Sprache, Musik und SFX** aufteilt.
  - **Wann nutzen**: Spieldialoge, Filme, Videos oder Clips mit vielen Soundeffekten.

> **Empfehlung**: **BS Polarformer** ist allein meist besser, aber die Kombination **beider** beseitigt nahezu jede Restchance auf Hintergrundgeräusche oder SFX.

## 2. Lead- und Backing-Vocals trennen (Lead & Back Vocals)

- **MVSep Karaoke** — [Preset auf MVSep öffnen](https://mvsep.com/home?sep_type=49&add_opt1=5&add_opt2=0)
  - Trennt **Lead-Vocals** von **Backing-Vocals / Harmonien**.
  - **Hinweis**: Dieses Modell kann je nach Mix etwas eigenwillig sein und gelegentlich Lead- und Backing-Vocals verwechseln — höre dir immer beide Stems an, es bleibt aber trotzdem sehr nützlich.

## 3. Hall entfernen (Reverb Removal)

Wende diese auf deine isolierte Vocal-Spur an, um trockene Aufnahmen ohne Raumhall zu erhalten.

- **DeReverb Stereo** — [Preset auf MVSep öffnen](https://mvsep.com/home?sep_type=22&add_opt1=7&add_opt2=1)
  - Entfernt Stereo-Vocal-Hall und Reflexionen.
- **DeReverb Room** — [Preset auf MVSep öffnen](https://mvsep.com/home?sep_type=22&add_opt1=6&add_opt2=1)
  - Entfernt Raumakustik und natürlichen Raumhall.

> **Empfehlung**: Am besten nutzt du **beide**, um jeden möglichen Hall zu beseitigen; welches du zuerst verwendest, hängt allein von deinem Audio ab.

## 4. Hintergrundrauschen entfernen (Background Noise Removal)

- **DeNoise by aufr33 and gabox** — [Preset auf MVSep öffnen](https://mvsep.com/home?sep_type=47&add_opt1=1)
  - Spezialisiertes Mel-Roformer-Denoising-Modell aus der Community für Rauschen und Artefakte ohne dumpfe Höhen.
  - **Empfehlung**: Als **letzten Schritt** nutzen, um dein Audio abzuschließen und sicherzustellen, dass es sauber ist. *(Es kann dennoch manches Rauschen übersehen — prüfe das Ergebnis daher per Ohr.)*

## 5. Experimentell & Sonstiges (Experimental & Miscellaneous)

- **DeEffect** — [Preset auf MVSep öffnen](https://mvsep.com/en/home?sep_type=47&add_opt1=1)
  - Entfernt am besten Hall und Effekte auf der Stimme (kann mitunter sogar statt eines Lead-Modells genutzt werden oder etwas Hintergrundrauschen mindern).
  - **Warnung**: **Verlasse dich bei DeEffect auf keinen Fall für etwas anderes als das Entfernen von Stimmeffekten und Hall** — für Vocals/SFX und finales Denoising immer die dedizierten Modelle oben verwenden.

## Empfohlener Schritt-für-Schritt-Workflow

1. **Vocals / Sprache extrahieren**: **BS Polarformer** anwenden (und bei verbleibenden SFX zusätzlich **MVSep DnR v3**).
2. **Lead-Vocal isolieren** *(nur bei Songs mit Harmonien)*: **MVSep Karaoke** anwenden.
3. **Hall entfernen**: **DeReverb Stereo** und **DeReverb Room** ausführen (plus **DeEffect** nur bei starken Stimmeffekten/Hall).
4. **Endbereinigung**: Mit **DeNoise by aufr33 and gabox** abschließen und als **WAV** herunterladen.
