# MVSep-Anleitung: empfohlene Modelle & Presets

Hier findest du die besten MVSep-Presets für extrem saubere Vocal-Spuren (für RVC-Training, Cover oder Stimmkonvertierung) - mit **Direktlinks**, die Algorithmus und Optionen passend vorauswählen.

## 1. Vocals und SFX trennen (Vocals & SFX Removal)

Beginne mit [MelBand Roformer · becruily deux](https://mvsep.com/home?sep_type=48&add_opt1=11), um Gesang und Instrumental zu trennen. Vergleiche mit **BS Polarformer**. Für Dialoge mit Soundeffekten eignet sich **MVSep DnR v3**.

[BS Polarformer](https://mvsep.com/home?sep_type=56&add_opt1=2&add_opt2=1&add_opt3=0) · [MVSep DnR v3](https://mvsep.com/home?sep_type=123&add_opt1=163)

[BS Roformer 124 bands](https://mvsep.com/en/home?sep_type=40&add_opt1=171). Laut einem Bericht aus der Community sind für dieses Modell **5 kostenlose Trennungen pro Tag** möglich. Prüfe vor der Verarbeitung das in MVSEP angezeigte Kontingent.

## 2. Lead- und Backing-Vocals trennen (Lead & Back Vocals)

Nutze [BS Roformer · anvuew](https://mvsep.com/home?sep_type=49&add_opt1=7&add_opt2=0) für den **Leadgesang** und [BS Roformer · anvuew](https://mvsep.com/home?sep_type=49&add_opt1=7&add_opt2=0). For **backing vocals (BGV)**, start with [BS Roformer · frazer & becruily](https://mvsep.com/home?sep_type=49&add_opt1=5&add_opt2=0) für den **Hintergrundgesang (BGV)**. Vergleiche die Ergebnisse am selben Refrain.

## 3. Hall entfernen (Reverb Removal)

Wende diese auf deine isolierte Vocal-Spur an, um trockene Aufnahmen ohne Raumhall zu erhalten.

- **DeReverb Stereo** - [Preset auf MVSep öffnen](https://mvsep.com/home?sep_type=22&add_opt1=7&add_opt2=1)
  - Entfernt Stereo-Vocal-Hall und Reflexionen.
- **DeReverb Room** - [Preset auf MVSep öffnen](https://mvsep.com/home?sep_type=22&add_opt1=6&add_opt2=1)
  - Entfernt Raumakustik und natürlichen Raumhall.

> **Empfehlung**: Am besten nutzt du **beide**, um jeden möglichen Hall zu beseitigen; welches du zuerst verwendest, hängt allein von deinem Audio ab.

## 4. Hintergrundrauschen entfernen (Background Noise Removal)

- **DeNoise by aufr33 and gabox** - [Preset auf MVSep öffnen](https://mvsep.com/home?sep_type=47&add_opt1=1)
  - Spezialisiertes Mel-Roformer-Denoising-Modell aus der Community für Rauschen und Artefakte ohne dumpfe Höhen.
  - **Empfehlung**: Als **letzten Schritt** nutzen, um dein Audio abzuschließen und sicherzustellen, dass es sauber ist. *(Es kann dennoch manches Rauschen übersehen - prüfe das Ergebnis daher per Ohr.)*

## 5. Experimentell & Sonstiges (Experimental & Miscellaneous)

- **DeEffect** - [Preset auf MVSep öffnen](https://mvsep.com/en/home?sep_type=47&add_opt1=1)
  - Entfernt am besten Hall und Effekte auf der Stimme (kann mitunter sogar statt eines Lead-Modells genutzt werden oder etwas Hintergrundrauschen mindern).
  - **Warnung**: **Verlasse dich bei DeEffect auf keinen Fall für etwas anderes als das Entfernen von Stimmeffekten und Hall** - für Vocals/SFX und finales Denoising immer die dedizierten Modelle oben verwenden.

## Empfohlener Schritt-für-Schritt-Workflow

1. **Vocals / Sprache extrahieren**: Vergleiche Deux und BS Polarformer bei Songs. Nutze DnR v3 für Dialoge mit Soundeffekten.
2. **Lead-Vocal isolieren** *(nur bei Songs mit Harmonien)*: Nutze anvuew für den Leadgesang und frazer & becruily für den Hintergrundgesang.
3. **Hall entfernen**: **DeReverb Stereo** und **DeReverb Room** ausführen (plus **DeEffect** nur bei starken Stimmeffekten/Hall).
4. **Endbereinigung**: Mit **DeNoise by aufr33 and gabox** abschließen und als **WAV** herunterladen.
