---
label: "🧠 PTH-Dateien (.pth)"
order: 88
permalink: /pth/
description: "Ausführlicher Guide zu RVC-.pth-Dateien: exportierte Stimmmodelle vs. rohe G- und D-Checkpoints, FP16 vs. FP32 Dateigrößen, Kompatibilität und Fehlerbehebung."
---
# RVC PTH-Dateien (`.pth`)

Wenn du eine RVC-Stimme herunterlädst, trainierst oder teilst, ist die **`.pth`-Datei** die wichtigste Datei überhaupt. Während eine [`.index`-Datei](indexes.md) optional ist, ist die `.pth`-Datei **zwingend nötig**: Ohne sie kann RVC keine Stimme konvertieren.

Dieser Guide erklärt, was in einer `.pth`-Datei steckt, den entscheidenden Unterschied zwischen einem exportierten Stimmmodell und rohen Trainings-Checkpoints (`G_*.pth` / `D_*.pth`), warum Dateigrößen variieren und wie du typische Fehler löst.

---

## 1. Was ist eine `.pth`-Datei?

Eine **`.pth`-Datei** ist ein **PyTorch-Checkpoint**, der das trainierte neuronale Netz (den **Generator**) speichert, mit dem die Klangfarbe deiner Zielstimme erzeugt wird.

In einer sauber exportierten RVC-Inferenz-`.pth` stecken zwei Bestandteile:
1. **Modellgewichte (`weight`):** Millionen während des Trainings gelernte Zahlen, die Stimmfarbe, Resonanz und Charakter bestimmen.
2. **Stimmkonfiguration (`config` und Metadaten):** Beim Export gespeicherte Werte:
   - **Abtastrate (Sample Rate):** `32 kHz`, `40 kHz` oder `48 kHz` (`44.1 kHz` bei bestimmten RefineGAN-Varianten).
   - **RVC-Architektur:** `v1` (256-d) oder `v2` (768-d).
   - **Pitch Guidance (`f0`):** Aktiv (`1`) oder deaktiviert (`0`).
   - **Vocoder:** `HiFi-GAN`, `MRF HiFi-GAN` oder `RefineGAN`.
   - **Embedder:** Zum Beispiel `contentvec`, `spin-v2` oder `klm-vocal-contentvec`.

---

## 2. Exportierte `.pth` vs. Rohe Checkpoints (`G_*.pth` / `D_*.pth`)

Einer der häufigsten Anfängerfehler ist, die falsche `.pth`-Datei aus `logs/` zu nehmen:

| Dateityp | Typischer Ordner | Typische Größe | Wofür gedacht |
| --- | --- | --- | --- |
| **Exportierte Stimm-`.pth`** (z. B. `MeineStimme.pth`) | `models/` (Ilaria RVC 2.4.0+) oder `weights/` | **45 - 110 MB** (`fp16` vs `fp32`) | **Inferenz & Teilen.** Enthält nur schlanke Generator-Gewichte + Stimmkonfiguration. |
| **Rohe Generator- (`G_*.pth`) & Diskriminator- (`D_*.pth`) Checkpoints** | `logs/<Experimentname>/` | **je 200+ MB** | **Nur fürs Weitertrainieren & Pretrains.** Enthalten vollständigen Optimizer-Zustand. **Niemals** für Inferenz nach `models/` kopieren! |

Wenn du eine rohe `G_*.pth` nach `models/` kopierst und Audio konvertierst, stürzt RVC mit `Missing key(s) in state_dict` ab oder meldet fehlende Stimmkonfiguration. Nutze immer die **Export**-Funktion deiner App.

---

## 3. Dateigröße (`FP16` vs. `FP32`) & Formate (`.pth` vs. `.safetensors` / `.onnx`)

- **Warum ist eine `.pth` ~50 MB groß und eine andere ~105 MB?**
  Der Unterschied liegt meist in der Export-Präzision des Modells (siehe [Präzision](precision.md)). `FP16` speichert Gewichte mit 16 statt 32 Bit und halbiert die Dateigröße gegenüber `FP32` bei gleicher Architektur um rund 50 %. Beide liefern nahezu identische Audioqualität, und auf unterstützten NVIDIA-GPUs kann `FP16`-Inferenz zudem schneller laufen. Wichtig: Die Export-Präzision ist unabhängig von der Inferenz-Präzision. Die meisten RVC-Apps laden ein `FP16`-Modell und wandeln die Gewichte auf älteren NVIDIA-GPUs, DirectML oder CPU automatisch in `FP32` um, sodass ein `FP32`-Export dort nicht zwingend nötig ist.
- **`.pth` vs. `.safetensors`:**
  `.pth` nutzt Pythons `pickle`-Format (weshalb PyTorch `2.6+` `weights_only=True` erzwingt), während `.safetensors` Gewichte ohne ausführbaren Code speichert. In **Ilaria RVC 2.4.5+** kannst du über den [Safetensors ↔ PTH Konverter](../ilaria-rvc/manage/safetensors-converter.md) zwischen beiden umwandeln.
- **`.pth` vs. `.onnx`:**
  Standard-Training und Inferenz in RVC nutzen `.pth`. Einige Live-Voice-Changer (z. B. w-okada oder Deiteris DirectML) unterstützen auch `.onnx`-Exporte für AMD/Intel-GPUs.

---

## 4. Kompatibilitätsregeln

1. **Passender Embedder:** Wurde eine `.pth` mit `contentvec` trainiert (Standard), konvertiere mit `contentvec` (oder lasse Embedder auf `Auto`). Falsche Embedder verzerren die Aussprache oder lassen deine eigene Stimme durchscheinen.
2. **Unterstützter Vocoder:** Prüfe, ob deine App den Vocoder der `.pth` unterstützt. Modelle mit `MRF HiFi-GAN` oder `RefineGAN` brauchen eine aktuelle App (**Ilaria RVC 2.3.0+** oder **Applio**).
3. **`UnpicklingError` unter PyTorch 2.6+:** Ältere `.pth`-Dateien oder ältere Apps können `Weights only load failed` (`fairseq.data.dictionary.Dictionary`) melden. Ein Update auf **Ilaria RVC 2.4.0+** oder aktuelles **Applio** behebt dies.

---

## 5. Wo `.pth`-Dateien liegen & wie du sie prüfst

- **Speicherort:** In **Ilaria RVC 2.4.0+** entpacke zuerst eventuelle `.zip`-Archive und lege die `.pth` (samt passender `added_*.index`) in den Hauptordner **`models/`** (andere Apps nutzen `assets/weights/` oder `weights/`). Klicke in **Inference** auf **Refresh**.
- **Unbekannte `.pth` prüfen:** Öffne in Ilaria RVC **Other → Model information**, wähle die `.pth` und klicke **Read model information**, um Abtastrate, RVC-Version, Vocoder, Embedder und Präzision auszulesen.
- **Stimme sauber teilen:** Nutze **Other → Export model ZIP**, um `.pth` und `added_*.index` ohne Trainingslogs oder private Aufnahmen zu verpacken.

---

## 6. Häufige `.pth`-Fehler & schnelle Lösungen

| Fehler oder Symptom | Ursache | Lösung |
| --- | --- | --- |
| **Modell erscheint nicht in der Liste** | **Refresh** vergessen, `.pth` noch im `.zip` oder falscher Ordner. | `.zip` entpacken, `.pth` direkt nach `models/` (oder `weights/`) legen und **Refresh** klicken. |
| `EOFError` / `invalid load key` / `File is not a zip archive` | Download abgebrochen oder HTML-Webseite statt Modell gespeichert. | Dateigröße prüfen: Eine echte `.pth` ist **40 - 110+ MB** groß, nicht wenige KB. Löschen und neu laden. |
| `Missing key(s) in state_dict` / `Sizes of tensors must match` | Roher Trainings-Checkpoint `G_*.pth` statt exportierter `.pth` geladen. | Modell sauber exportieren statt `G_*.pth` aus `logs/` zu kopieren. |
| `UnpicklingError` / `Weights only load failed` | PyTorch 2.6+ blockiert alte Pickle-Objekte in veralteter RVC-App. | Auf **Ilaria RVC 2.4.0+** oder das neueste **Applio** aktualisieren. |
