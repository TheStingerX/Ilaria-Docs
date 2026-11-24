# Datasets, Dataset Checker & Audio Analyzer

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Dein Dataset ist der wichtigste Faktor dafür, wie natürlich, sauber und ausdrucksstark dein RVC-Stimmenmodell klingt. Selbst die besten Trainingseinstellungen können verrauschte, hallige oder übersteuerte Quellaufnahmen nicht retten.

!!!tip
**Goldene Regel: Qualität schlägt immer Quantität.**
10 Minuten trockenes, sauberes und abwechslungsreiches Audio eines einzelnen Sprechers trainieren ein deutlich besseres Modell als 60 Minuten halliges, verrauschtes oder monotones Material.
!!!

## 1. Was ein gutes RVC-Dataset ausmacht

### Länge und stimmliche Vielfalt
- **Sinnvolles Minimum:** Etwa **5 bis 10 Minuten** reine Sprache oder Gesang (ohne Stille) reichen bei sehr sauberem Audio bereits für ein brauchbares Modell.
- **Empfohlenes Ziel:** **15 bis 30+ Minuten** sauberes, abwechslungsreiches Audio geben dem Modell genug phonetische Breite für verschiedene Wörter, Tonhöhen und Emotionen.
- **Vielfalt zählt:** Nimm ruhige Sprache, energische Sprache, verschiedene Tonlagen, leise wie laute Stellen und klare Konsonanten (`s`, `f`, `t`, `k`) auf. Wer nur monoton trainiert, bekommt beim Singen oder lebhaften Sprechen Probleme.

### Audiosauberkeit und Format
- **Nur ein Sprecher:** Lasse niemals überlappende Stimmen, Hintergrundgespräche oder Chöre im Dataset.
- **Trockener Raum (kaum Hall):** RVC lernt Raumhall als Teil der Stimmfarbe mit. Trockene Nahbesprechung im Studio funktioniert am besten.
- **Verlustfreies Format:** Bevorzuge **PCM-`.wav`** (oder `.flac`) gegenüber stark komprimierten `.mp3`-Dateien, damit keine Kompressionsartefakte im Modell landen.
- **Keine Musik oder Soundeffekte:** Entferne vor dem Preprocessing jegliche Hintergrundmusik, Spielaudio und SFX.

## 2. Audio vorbereiten & bereinigen

1. **Stimme von Musik/SFX trennen:** Falls deine Quelle aus Songs, Videos oder Spielen stammt, isoliere zuerst trockene Vocals mit [UVR5](../../non-rvc/audio-separation-tools/uvr5/overview.md) oder [MVSep](../../non-rvc/audio-separation-tools/mvsep/overview.md).
2. **Vorsicht bei starkem Denoise/Dereverb:** Nutze Rausch- oder Hallentfernung nur bei echtem Bedarf. Aggressive Filter beschneiden Höhen und erzeugen wässrige oder metallische Artefakte. Vergleiche immer Original und bearbeiteten Clip.
3. **Lange Stille und Störgeräusche schneiden:** Entferne lange leere Pausen, Mikrofonstöße, Husten, Klicks und starkes Clipping. Behalte kurze, natürliche Wortpausen bei.
4. **Sinnvolle Cliplängen:** Teile sehr lange Aufnahmen in saubere Stücke (etwa **3 bis 15 Sekunden**) oder überlasse das Schneiden dem Preprocessing von Ilaria RVC.
5. **Einfache Pfade nutzen:** Speichere das Dataset in einem kurzen Pfad ohne Leerzeichen, Umlaute oder Sonderzeichen (z. B. `C:\RVC\datasets\meine_stimme\`).

## 3. Den Dataset Checker von Ilaria RVC nutzen

Prüfe dein Material vor dem GPU-Training mit dem integrierten **Dataset Checker**, um versteckte Fehler früh zu finden:

- **Clipping-Erkennung:** Findet Stellen, an denen Pegelspitzen bei `0 dBFS` abgeschnitten werden, was zu Verzerrung oder `NaN loss` beim Training führen kann.
- **Lange Stille:** Markiert Clips, die fast nur aus Leere bestehen, zum Kürzen oder Entfernen.
- **Unlesbare/defekte Dateien:** Erkennt beschädigte Header, 0-Byte-Dateien oder Clips unter 1 Sekunde, die beim Preprocessing (`zero-size array`) abstürzen würden.
- **Schwankende Lautstärke:** Zeigt Clips, die deutlich leiser oder lauter als der Rest sind.

**Empfohlener Ablauf:**
1. Wähle im **Dataset Checker** den Dataset-Ordner und starte den Scan.
2. Höre dir jede markierte Datei an, bevor du sie löschst oder bearbeitest.
3. Behalte natürliche leise Passagen und bewusste Pausen bei und entferne oder bereinige nur wirklich defekte, übersteuerte oder verrauschte Clips.

## 4. Den Audio Analyzer von Ilaria RVC nutzen

Mit dem **Audio Analyzer** erkennst du, *warum* eine Aufnahme oder Konvertierung schlecht klingt:

- **Wellenform-Spitzen:** Flach abgeschnittene Spitzen zeigen digitales Clipping. Senke den Gain oder ersetze die Aufnahme.
- **Spektrogramm:** Prüfe stille Lücken zwischen Wörtern. Eine konstante horizontale Linie bei 50/60 Hz deutet auf Netzbrummen hin; verschwommene Flächen auf Restmusik oder Raumhall.
- **Pitch & Pegel:** Sieh nach, ob die Tonhöhe unnatürlich springt oder der Pegel zu stark abfällt.
- **Vorher/Nachher-Vergleich:** Lade exakt denselben Bereich von Original und konvertierter Ausgabe, um zu trennen, ob ein Fehler aus dem Dataset, der Trennung oder der Inferenz stammt.

## 5. Häufige Dataset-Fehler vermeiden

| Fehler | Auswirkung auf das Modell | So behebst du es |
| --- | --- | --- |
| **Hall/Echo im Dataset lassen** | Die Stimme klingt dauerhaft wie im Bad oder in einer Höhle. | Trockenere Aufnahmen nutzen oder vorsichtig mit UVR5/MVSep DeReverb säubern. |
| **Reste von Hintergrundmusik** | Zufälliges musikalisches Leiern oder metallische Artefakte. | Vocals mit `BS-Roformer` / `BS Polarformer` neu trennen und unsaubere Clips löschen. |
| **Mehrere Sprecher gemischt** | Stimmfarbe springt mitten im Satz unvorhersehbar. | Strikt nur einen Sprecher pro Dataset-Ordner verwenden. |
| **Winziges, monotones Dataset (< 2 Min.)** | Modell lernt Rauschen auswendig ("Overfitting") und scheitert an neuen Wörtern. | Mehr abwechslungsreiche Sätze hinzufügen und Training früher beenden (weniger Epochen). |
| **Übersteuerte / clippende Aufnahmen** | Hartes Knacken, Roboterstimme oder `NaN loss`-Absturz. | Übersteuerte Takes entfernen und sauberes Audio sicher unter `0 dBFS` normalisieren. |

Lies auch [Ein Stimm-Dataset vorbereiten](../../model-training/dataset-preparation.md) für weitere allgemeine Aufnahme- und Bewertungsregeln.
