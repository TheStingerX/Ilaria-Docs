---
label: "Training Voices (.cvc)"
icon: ":mortar_board:"
order: 97
permalink: /non-rvc/causal-voice-changer/training/
description: "Building a voice in Causal Voice Changer fine-tunes the base decoder on your target audio."
---
# Training a Voice in CVC

Building a voice in Causal Voice Changer fine-tunes the base decoder on your target audio. Unlike many older tools, **you do not need to slice your audio files or manually cut out silences**, and your recordings can be at **any sample rate**.

> **License reminder**: Voices trained on the included pretrained base model cannot be used for commercial purposes.

## 1. Prepare your audio

- Gather clean recordings of **one speaker** (no background music, heavy reverb, or overlapping voices).
- You can point CVC to a **single audio file** or a **folder** containing multiple audio files.
- No manual slicing or resampling is needed - CVC handles it automatically.

## 2. Train using the Training Window (Beginner method)

1. Launch **`run-training.bat`** (Windows) or **`run-training.sh`** (Linux).
2. Fill in the form:
   - **Dataset path**: browse to your audio file or folder.
   - **Model name**: choose a short name without special characters (e.g., `myvoice`).
   - **Batch size**: default is **`8`** (lower it if you run out of GPU memory).
   - **Steps**: default is **`10,000` steps** (takes roughly **35 minutes** on an RTX 4080).
   - **Save every**: how often to save a `.cvc` checkpoint (default `10,000`).
   - **Custom base** *(optional)*: toggle on if you want to train from a custom base placed in `custom-base/` instead of the default EARS base.
3. Click **Start**.
4. You can **Stop** (or close the window) at any time - CVC saves a checkpoint so you can **resume** later if the model name matches.

## 3. Train using the Command Line (Optional)

If you prefer the terminal:

```bash
uv run python -m causalvc.build --name NAME --audio /path/to/folder-or-file
```

Useful optional flags:
- `--save-every N`: save a checkpoint every `N` steps.
- `--app-models DIR`: automatically copy each saved voice into a realtime app's `models/` folder.
- `--base VALUE`: use `default`, a folder name inside `custom-base/`, or a path to a base model.

## 4. Understanding & sharing `.cvc` voice files

Every saved checkpoint is stored as a single, self-contained **`.cvc`** file at:
```text
runs/models/voice-NAME/voices/NAME-STEPs.cvc
```

A `.cvc` file contains everything needed for that voice (and newly built voices also include their **index** inside the `.cvc`, adding about 12 MB). Nothing in the file depends on the PC that trained it.

### How to load a `.cvc` voice into Realtime

- **Drag and drop** the `.cvc` file directly onto the **CausalVC Realtime** window, **or**
- Copy it into `realtime/models/` and click **Reload** in the app.

### Exporting, converting older voices & adding an Index

- **Export a voice**: in the **Library** page, click **Export** to save an installed voice (along with its saved pitch and gain settings) back into a shareable `.cvc` file.
- **Convert old folder-based voices**: if you have voices from older CVC versions stored as folders, convert them with:
  ```bash
  python -m causalvc.voice cvc FOLDER
  ```
  or using the standalone script `scripts/convert_to_cvc.py`.
- **Add an index to an older `.cvc` voice**:
  ```bash
  python -m causalvc.index VOICE.cvc --audio /path/to/training-audio
  ```
