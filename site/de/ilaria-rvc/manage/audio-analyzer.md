# Audio Analyzer

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Öffne **Other → Audio Analyzer** und füge bis zu acht Audiodateien hinzu (Original, Referenzkonvertierung und Varianten mit je einer geänderten Einstellung).

## Was jede Ansicht misst

| Ansicht | Direkte Anzeige | Beantwortete Frage |
| --- | --- | --- |
| **Waveform** | Lautstärkeverlauf | Wo liegen Spitzen, flaches Clipping, Pausen oder harte Schnitte? |
| **Spectrogram** | Frequenzenergie über Zeit | Welche Frequenzen treten beim Start eines Artefakts auf? |
| **Average spectrum** | Mittlere Frequenzbalance | Klingt eine Version dauerhaft dumpfer oder schärfer? |
| **Pitch estimation** | Geschätzte F0-Kurve | Folgt die Tonhöhe sauber ohne Oktavsprünge? |
| **Level & silence tables** | Gemessene Pegel & Stille | Vergleicht man bei gleicher Lautstärke und Stille-Schwelle? |

> **Messung vs. Hinweis:** Audio Analyzer misst Pegel, Stille, Spektrum und geschätzten F0, bewertet aber Stimmqualität **nicht** selbstständig. **Höre den Bereich immer ab**, bevor du ein visuelles Detail als Fehler wertest.

## Praxisbeispiele

- **Clipping:** Flache abgeschnittene Spitzen in der **Waveform** → Eingangspegel senken.
- **Hintergrundrauschen:** Durchgehendes Band im **Spectrogram** in Pausen → mit UVR5 oder MVSep bereinigen.
- **Lange Stille / Pegelunterschiede:** Über **Level & silence tables** prüfen.
- **Hall & Verzerrung:** Verschwommene Nachhallfahnen im **Spectrogram**.
- **Stimmlose Laute (`s`, `f`, `t`):** Unruhiges F0 bei Atemgeräuschen ist normal.

Exportiere **CSV**, **JSON** oder ein **ZIP mit Diagrammen** bei identischem **FFT window**.
