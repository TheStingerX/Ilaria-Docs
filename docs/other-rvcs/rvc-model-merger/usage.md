---
label: "Merge RVC models"
icon: ":jigsaw:"
order: 99
permalink: /ilaria-rvc/rvc-model-merger/
description: "How to install and use RVC Model Merger by Ardha27 to blend two compatible RVC v2 voice models with adjustable merge ratios."
---
# RVC Model Merger

[GitHub](https://github.com/mojowozo/RVC-model-merger)

> **Important notes before you start**
> - **This tool is strictly a model merger**: it does not convert audio, run live microphone conversion, or train new models. It only blends two or more existing RVC `.pth` models into a new `.pth` file.
> - **Cross-sample-rate merging is supported**: despite what the repository README states, you **can** merge models with **different sample rates** (e.g. `32k`, `40k`, `48k`) using **Encoder-only merge**, as long as they share the **same RVC version** (`v1` or `v2`) and **same vocoder architecture** (`HiFi-GAN` or `RefineGAN`).

## Compatibility rules

| Requirement | Standard merge | Encoder-only merge |
| --- | --- | --- |
| **RVC version** (`v1` vs `v2`) | Must match | Must match |
| **Vocoder architecture** (`HiFi-GAN` vs `RefineGAN`) | Must match | Must match |
| **Sample rate** (`32k`, `40k`, `48k`) | Must match | **Can differ** (decoder is taken from one base model) |

## Installation

### Compiled version (Windows)

1. Download the release archive from [GitHub](https://github.com/mojowozo/RVC-model-merger).
2. Extract it into a writable folder and run the `.exe`.

### From source (Python)

1. Clone or download the repository from [GitHub](https://github.com/mojowozo/RVC-model-merger).
2. Install dependencies:
   ```bat
   pip install -r requirements.txt
   ```
   *(Uses `torch==2.10.0` and `numpy==1.26.4`; `tkinterdnd2==0.6.2` is optional for drag-and-drop.)*
3. Launch the app with `run.bat` or:
   ```bat
   python main.py
   ```

## How to merge models

1. **Load models**: use **Browse** (or drag-and-drop `.pth` files) in the slots. Click **+ Add Slot** to merge more than two models. Each slot automatically detects the model's vocoder (`HiFi-GAN` / `RefineGAN`), sample rate, RVC version, and `f0`.
2. **Set weights**: use each slot's **Strength** slider/box (`0–100`) to control how much each model contributes. Slots set to `0` are skipped.
3. **Choose merge mode**:
   - Leave **Encoder-only** unchecked for a full merge when all models share the same sample rate.
   - Enable **Encoder-only** to merge models with **different sample rates** (or when you only want to blend the encoder while keeping one model's decoder).
4. **Name & presets (optional)**: keep the **Auto** output name or enter a custom name. You can also save/load slot setups using **Preset → Save / Delete**.
5. **Merge**: click **Merge Models**. The resulting `.pth` file is saved inside the `merges/` folder (click **Open Folder** or **Open merges folder** to access it).
