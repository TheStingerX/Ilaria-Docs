---
label: "Guide & Recommended Models"
icon: ":scissors:"
order: 97
permalink: /non-rvc/uvr5/usage-and-models/
description: "Use this guide to configure UVR5 properly and pick the best models for separating vocals, removing harmonies/backing vocals, stripping reverb/echo, and cleaning noise (including the exact models shown in the recommended setups)."
---
# UVR5 Guide & Recommended Models

Use this guide to configure UVR5 properly and pick the best models for separating vocals, removing harmonies/backing vocals, stripping reverb/echo, and cleaning noise (including the exact models shown in the recommended setups).

## 1. Main window & key settings

- **Select Input / Output**: choose your audio file(s) and output folder. Use **`WAV`** for RVC dataset preparation (`Additional Settings` also lets you enable 64-bit float output).
- **GPU Conversion**: keep this **checked** whenever you have a supported NVIDIA, AMD, Intel, or Apple Silicon GPU.
  - *Note*: if you get silent output on a GTX 10XX GPU, leave **Inference Mode** off under `Settings → Advanced MDX-Net Options → Multi-Network`. Newer RTX / GTX 16 GPUs can enable it for extra speed.
- **Vocals Only / Instrumental Only**: check one if you only need one stem (for example, check **Instrumental Only** if you only want the instrumental or the de-echoed/dereverbed track depending on the model).
- **Segment Size** (`MDX-Net` tab, e.g. **`256`**): controls chunk memory usage for standard MDX-Net models.
  - *Note for Roformers*: when **Segment Default** is enabled in Advanced MDX-Net Options, UVR5 reads `chunk_size` directly from the model's `.yaml` file instead of the main window's Segment Size dropdown.
- **Overlap** (for Roformers): **`4`** offers the best balance of speed and SDR quality; **`8`** can give slightly smoother consistency, while `16–32` is much slower for very little gain. The GUI Overlap value overrides the `.yaml`.
- **VR Architecture settings**:
  - **Window Size**: `512` (more accurate) or `320` (faster / popular in metal & ensembles).
  - **Aggression Setting**: usually `5`–`10` for vocals/karaoke; **`3.0–5.0`** for `UVR-DeEcho-DeReverb`; and negative values (**`-10` to `-25`**) for `UVR-DeNoise` on vocals to avoid hollowing out the voice.
  - **TTA** *(Test-Time Augmentation)*: improves separation quality at ~2× processing time.

## 2. Recommended models by task

### MDX-Net & BS-Roformer models

| Model | Purpose | Notes |
| --- | --- | --- |
| **`BS-Roformer-Viperx-1297`** | **Main Vocal / Instrumental split** | Classic top-performing BS-Roformer model. Excellent for extracting clean instrumentals and vocals, and a staple in high-quality ensembles (such as `1296 + 1297 + MDX23C HQ`). |
| **`UVR-MDX-NET Inst HQ 4`** | **Clean Instrumental / Vocal split** | Very fast and clean MDX-Net v2 model. Often combined in ensembles with `1_HP-UVR` or BS-Roformer models for fuller instrumentals. |
| **`dereverb_bs_roformer_anvuew_sdr_22.5050.ckpt`** | **De-Reverb (Roformer)** | Modern BS-Roformer de-reverb model by anvuew (trained on VST & Waves IR1 presets). Sounds cleaner and more aggressive on vocal reverb than older mono models. |

### VR Architecture models

| Model | Purpose | Notes |
| --- | --- | --- |
| **`1_HP-UVR`** | **Vocal / Instrumental split** | Classic high-pass VR model. Useful on its own or in ensembles (especially dense/rock/metal tracks) alongside MDX-Net models. |
| **`5_HP-Karaoke-UVR`** | **Lead vs. Backing Vocals** | Separates lead vocals from backing vocals/harmonies. Works best when run on **already-isolated vocals** (or via *Settings → Vocal Splitter Options*). |
| **`UVR-De-Echo-Normal`** | **Gentle De-Echo** | Removes delay and light echo. Sometimes preserves vocal tone better than aggressive de-echo models; can be run after or alongside DeReverb. |
| **`UVR-DeEcho-DeReverb`** | **Strong De-Echo + De-Reverb** | Handles both echo and mono/stereo reverb when MDX models miss it. Keep **Aggression** around **`3.0–5.0`** (note: has a ~17.5 kHz frequency ceiling). |
| **`UVR-DeNoise`** | **Strong De-Noise** | FoxJoy denoiser for background hiss, static, and artifacts. On isolated vocals, try **negative aggression (`-10` to `-25`)** so vocals don't get thinned out. |
| **`UVR-DeNoise-Lite`** | **Lighter De-Noise** | Less aggressive than `UVR-DeNoise` (`20 kHz` cutoff) and safer for instruments/harmonics; recommended aggression around `4`. |

### Demucs models

| Model | Purpose | Notes |
| --- | --- | --- |
| **`v4 \| htdemucs`** *(and `htdemucs_ft`)* | **4-stem separation** | Splits tracks into **Vocals, Drums, Bass, and Other**. Great for extracting drum/bass stems or cleaning bleed in multi-stem ensembles. |

## 3. Recommended RVC dataset cleaning workflow

1. **Step 1 - Separate Vocals**: run your track through **`BS-Roformer-Viperx-1297`** (MDX-Net tab, GPU Conversion on).
2. **Step 2 - Remove Harmonies / Backing Vocals** *(if present)*: pass the isolated vocal stem through **`5_HP-Karaoke-UVR`** (VR Architecture tab).
3. **Step 3 - Remove Reverb & Echo**: run **`dereverb_bs_roformer_anvuew_sdr_22.5050.ckpt`** (or **`UVR-DeEcho-DeReverb`** at Aggression `3–5` / **`UVR-De-Echo-Normal`**).
4. **Step 4 - Final De-Noise** *(only if hiss or artifacts remain)*: run **`UVR-DeNoise`** (with low or negative aggression on vocals) or **`UVR-DeNoise-Lite`**. Listen to the dry output in headphones and compare against the previous step so you don't over-process consonants.

## 4. Troubleshooting common errors

- **Out of Memory (`RuntimeError`) or stuck at 5% on DirectML (AMD/Intel)**:
  - Open **Choose MDX-Net Model → Edit Model Config** (or edit the model's `.yaml` in `models\MDX_Net_Models\model_data\mdx_c_configs\`) and lower `chunk_size` (ensure **Segment Default** is checked in Advanced MDX Options):
    - `352800` (8s) - default for most models; max for ~8 GB AMD/Intel GPUs.
    - `220500` (5s) or `200655` (4.5s) - safe for 4–6 GB VRAM cards.
    - `112455` (2.55s) - minimum safe starting point if crashes persist.
  - On NVIDIA cards with 2–4 GB VRAM, set **CUDA Sysmem Fallback Policy** to **Prefer Sysmem Fallback** in NVIDIA Control Panel.
- **Roformer missing from Ensemble / Vocal Splitter**: open its `.yaml` and rename stem labels from `other` / `vocals` / `Karaoke` to case-sensitive **`Instrumental`** and **`Vocals`**.
- **PC freezes during separation**: set UVR's priority to **Idle** in Windows Task Manager.
