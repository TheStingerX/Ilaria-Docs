---
label: "RVC-Modelle zusammenführen"
icon: ":jigsaw:"
order: 99
permalink: /ilaria-rvc/rvc-model-merger/
---
# RVC Model Merger

[GitHub](https://github.com/mojowozo/RVC-model-merger)

> **Wichtige Hinweise vorab**
> - **Dieses Tool ist ausschließlich ein Model Merger**: Es konvertiert kein Audio, bietet keine Live-Mikrofonkonvertierung und trainiert keine neuen Modelle. Es mischt lediglich zwei oder mehr vorhandene RVC-`.pth`-Modelle zu einer neuen `.pth`-Datei.
> - **Zusammenführen über verschiedene Sample-Raten hinweg wird unterstützt**: Entgegen der Angabe in der Repository-README kannst du Modelle mit **unterschiedlichen Sample-Raten** (z. B. `32k`, `40k`, `48k`) über **Encoder-only** zusammenführen - Voraussetzung sind lediglich **dieselbe RVC-Version** (`v1` oder `v2`) und **dieselbe Vocoder-Architektur** (`HiFi-GAN` oder `RefineGAN`).

## Kompatibilitätsregeln

| Anforderung | Standard-Merge | Encoder-only-Merge |
| --- | --- | --- |
| **RVC-Version** (`v1` vs `v2`) | Muss übereinstimmen | Muss übereinstimmen |
| **Vocoder-Architektur** (`HiFi-GAN` vs `RefineGAN`) | Muss übereinstimmen | Muss übereinstimmen |
| **Sample-Rate** (`32k`, `40k`, `48k`) | Muss übereinstimmen | **Darf abweichen** (Decoder stammt von einem Basismodell) |

## Installation

### Kompilierte Version (Windows)

1. Lade das Release-Archiv von [GitHub](https://github.com/mojowozo/RVC-model-merger) herunter.
2. Entpacke es in einen beschreibbaren Ordner und starte die `.exe`.

### Aus dem Quellcode (Python)

1. Klone oder lade das Repository von [GitHub](https://github.com/mojowozo/RVC-model-merger) herunter.
2. Installiere die Abhängigkeiten:
   ```bat
   pip install -r requirements.txt
   ```
   *(Verwendet `torch==2.10.0` und `numpy==1.26.4`; `tkinterdnd2==0.6.2` ist optional für Drag-and-Drop.)*
3. Starte die App mit `run.bat` oder:
   ```bat
   python main.py
   ```

## Modelle zusammenführen

1. **Modelle laden**: Nutze **Browse** (oder ziehe `.pth`-Dateien in die Slots). Klicke auf **+ Add Slot**, um mehr als zwei Modelle zu mischen. Jeder Slot erkennt automatisch Vocoder (`HiFi-GAN` / `RefineGAN`), Sample-Rate, RVC-Version und `f0`.
2. **Gewichtung festlegen**: Stelle über **Strength** (`0–100`) den Anteil jedes Modells ein. Slots mit `0` werden übersprungen.
3. **Merge-Modus wählen**:
   - Lasse **Encoder-only** deaktiviert für einen vollständigen Merge bei gleicher Sample-Rate.
   - Aktiviere **Encoder-only**, um Modelle mit **unterschiedlichen Sample-Raten** zusammenzuführen (oder wenn nur der Encoder gemischt und der Decoder eines Modells beibehalten werden soll).
4. **Name & Presets (optional)**: Behalte den automatischen Namen (**Auto**) oder vergib einen eigenen. Konfigurationen lassen sich über **Preset → Save / Delete** speichern und laden.
5. **Zusammenführen**: Klicke auf **Merge Models**. Die fertige `.pth`-Datei wird im Ordner `merges/` gespeichert (über **Open Folder** oder **Open merges folder** direkt erreichbar).
