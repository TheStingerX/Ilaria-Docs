---
label: "Anleitung & empfohlene Modelle"
icon: ":scissors:"
order: 97
permalink: /non-rvc/uvr5/usage-and-models/
description: "Nutze diese Anleitung, um UVR5 richtig einzustellen und die besten Modelle zum Trennen von Vocals, Entfernen von Harmonien/Backing Vocals, Hall/Echo und..."
---
# UVR5-Anleitung & empfohlene Modelle

Nutze diese Anleitung, um UVR5 richtig einzustellen und die besten Modelle zum Trennen von Vocals, Entfernen von Harmonien/Backing Vocals, Hall/Echo und Rauschen zu wählen (inklusive der empfohlenen Setup-Modelle).

## 1. Hauptfenster & wichtigste Einstellungen

- **Select Input / Output**: Eingabedateien und Ausgabeordner wählen. Für RVC-Datasets **`WAV`** nutzen (unter `Additional Settings` ist optional auch 64-Bit-Float möglich).
- **GPU Conversion**: **aktiviert** lassen, sofern eine unterstützte NVIDIA-, AMD-, Intel- oder Apple-Silicon-GPU vorhanden ist.
  - *Hinweis*: Bei stummer Ausgabe auf GTX-10XX-Karten **Inference Mode** unter `Settings → Advanced MDX-Net Options → Multi-Network` aus lassen. Auf RTX / GTX 16 bringt Aktivieren oft mehr Tempo.
- **Vocals Only / Instrumental Only**: aktivieren, wenn nur ein Stem benötigt wird (z. B. **Instrumental Only**, wenn nur das Instrumental oder die bereinigte Spur exportiert werden soll).
- **Segment Size** (`MDX-Net`-Tab, z. B. **`256`**): steuert den Speicherbedarf normaler MDX-Net-Modelle.
  - *Hinweis für Roformer*: Wenn **Segment Default** in den erweiterten MDX-Net-Optionen aktiv ist, liest UVR5 `chunk_size` direkt aus der `.yaml` des Modells statt aus dem Hauptfenster.
- **Overlap** (für Roformer): **`4`** bietet das beste Verhältnis aus Geschwindigkeit und SDR-Qualität; **`8`** liefert etwas mehr Konstanz, während `16–32` stark verlangsamt bei kaum Gewinn. Der GUI-Wert überschreibt die `.yaml`.
- **VR Architecture-Einstellungen**:
  - **Window Size**: `512` (genauer) oder `320` (schneller / beliebt für Metal & Ensembles).
  - **Aggression Setting**: meist `5`–`10` für Vocals/Karaoke; **`3.0–5.0`** für `UVR-DeEcho-DeReverb`; negative Werte (**`-10` bis `-25`**) für `UVR-DeNoise` auf Vocals, damit die Stimme nicht dünn klingt.
  - **TTA** *(Test-Time Augmentation)*: steigert die Qualität bei etwa doppelter Laufzeit.

## 2. Empfohlene Modelle nach Aufgabe

### MDX-Net- & BS-Roformer-Modelle

| Modell | Zweck | Hinweise |
| --- | --- | --- |
| **`BS-Roformer-Viperx-1297`** | **Haupttrennung Vocals / Instrumental** | Klassisches Top-BS-Roformer-Modell. Ideal für saubere Instrumentals und Vocals sowie als Basis in Ensembles (`1296 + 1297 + MDX23C HQ`). |
| **`UVR-MDX-NET Inst HQ 4`** | **Saubere Instrumental-/Vocal-Trennung** | Sehr schnelles und sauberes MDX-Net-v2-Modell. Oft im Ensemble mit `1_HP-UVR` oder BS-Roformern kombiniert. |
| **`dereverb_bs_roformer_anvuew_sdr_22.5050.ckpt`** | **De-Reverb (Roformer)** | Modernes BS-Roformer-Dereverb-Modell von anvuew (trainiert auf VST- & Waves-IR1-Hall). Klingt bei Vocal-Reverb sauberer als ältere Mono-Modelle. |

### VR Architecture-Modelle

| Modell | Zweck | Hinweise |
| --- | --- | --- |
| **`1_HP-UVR`** | **Vocal- / Instrumental-Trennung** | Klassisches High-Pass-VR-Modell. Gut allein oder im Ensemble (besonders bei dichtem Rock/Metal) zusammen mit MDX-Net. |
| **`5_HP-Karaoke-UVR`** | **Lead- vs. Backing-Vocals** | Trennt Hauptgesang von Chören/Harmonien. Funktioniert am besten auf **bereits isolierten Vocals** (oder über *Settings → Vocal Splitter Options*). |
| **`UVR-De-Echo-Normal`** | **Sanftes De-Echo** | Entfernt Delay und leichtes Echo meist schonender für das Stimmtimbre; gut nach oder zusammen mit DeReverb. |
| **`UVR-DeEcho-DeReverb`** | **Starkes De-Echo + De-Reverb** | Entfernt sowohl Echo als auch Mono-/Stereo-Hall. **Aggression** bei **`3.0–5.0`** halten (~17,5-kHz-Frequenzgrenze). |
| **`UVR-DeNoise`** | **Starkes De-Noise** | FoxJoy-Denoiser gegen Rauschen, Zischen und Artefakte. Auf isolierten Vocals **negative Aggression (`-10` bis `-25`)** testen, um die Stimme nicht auszudünnen. |
| **`UVR-DeNoise-Lite`** | **Leichtes De-Noise** | Weniger aggressiv als `UVR-DeNoise` (`20-kHz`-Limit) und schonender für Obertöne; empfohlene Aggression um `4`. |

### Demucs-Modelle

| Modell | Zweck | Hinweise |
| --- | --- | --- |
| **`v4 \| htdemucs`** *(und `htdemucs_ft`)* | **4-Stem-Trennung** | Zerlegt Tracks in **Vocals, Drums, Bass und Other**. Ideal für einzelne Instrumente oder zum Bereinigen von Bleed in Multi-Stem-Ensembles. |

## 3. Empfohlener Workflow für RVC-Datasets

1. **Schritt 1 - Vocals trennen**: Track durch **`BS-Roformer-Viperx-1297`** schicken (Tab MDX-Net, GPU Conversion an).
2. **Schritt 2 - Harmonien / Backing Vocals entfernen** *(falls vorhanden)*: isolierten Vocal-Stem durch **`5_HP-Karaoke-UVR`** schicken (Tab VR Architecture).
3. **Schritt 3 - Hall & Echo entfernen**: **`dereverb_bs_roformer_anvuew_sdr_22.5050.ckpt`** anwenden (oder **`UVR-DeEcho-DeReverb`** bei Aggression `3–5` / **`UVR-De-Echo-Normal`**).
4. **Schritt 4 - Finales De-Noise** *(nur falls Rauschen bleibt)*: **`UVR-DeNoise`** (mit niedriger/negativer Aggression) oder **`UVR-DeNoise-Lite`** nutzen. Immer per Kopfhörer gegen den vorherigen Schritt vergleichen, um Konsonanten zu schützen.

## 4. Häufige Fehler beheben

- **Speicherfehler (`RuntimeError`) oder Hänger bei 5 % unter DirectML (AMD/Intel)**:
  - Öffne **Choose MDX-Net Model → Edit Model Config** (oder bearbeite die `.yaml` unter `models\MDX_Net_Models\model_data\mdx_c_configs\`) und senke `chunk_size` (stelle sicher, dass **Segment Default** aktiviert ist):
    - `352800` (8s) - Standard; Maximum für 8-GB-AMD/Intel-GPUs.
    - `220500` (5s) oder `200655` (4,5s) - sicher für 4–6-GB-VRAM-Karten.
    - `112455` (2,55s) - sicherer Minimalwert bei anhaltenden Abstürzen.
  - Bei NVIDIA mit 2–4 GB VRAM in der NVIDIA Systemsteuerung **CUDA Sysmem Fallback Policy** auf **Prefer Sysmem Fallback** stellen.
- **Roformer fehlt in Ensemble / Vocal Splitter**: in der `.yaml` die Stem-Namen von `other` / `vocals` / `Karaoke` exakt (Groß-/Kleinschreibung beachten) auf **`Instrumental`** und **`Vocals`** ändern.
- **PC friert beim Trennen ein**: UVR-Priorität im Windows-Task-Manager auf **Niedrig (Idle)** stellen.
