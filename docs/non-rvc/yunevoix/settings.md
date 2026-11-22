---
label: "Settings & Audio Quality"
icon: ":sliders:"
order: 96
permalink: /non-rvc/yunevoix/settings/
description: "Complete beginner-friendly guide to every YuneVoix v0.7.1 setting across General, Voice & Timbre, Pitch & Autotune, EQ & Filters, and Effects."
---
# YuneVoix Settings Explained - Complete Audio Quality Guide

[Overview & Requirements](overview.md) · [Voice Bank & Live Usage](usage.md) · [Song Cover & Karaoke](song-cover-karaoke.md)

This reference explains every setting documented in YuneVoix **v0.7.1** (NVIDIA and AMD). In the developer documentation:
- **"Works live"** means the change takes effect immediately while LIVE is running.
- **"At the next START"** means you must stop LIVE and press **START** again for the change to take effect.

---

## Settings → General

These controls manage input cleanup, monitoring, output level, buffering, and AMD graphics backend selection (applies to **LIVE**, with `Models folder` and `AMD graphics engine` affecting the app globally):

| Control | Default | Applies | What It Is & What It Does | When to Use & What Can Go Wrong |
| --- | --- | --- | --- | --- |
| **Input cleaning** (`DF3`, `Gentle`, `Sidon`, `Off`) | `DF3` | At next START | Cleans microphone audio before conversion. `DF3` removes typing, clicks, and hiss while boosting quiet mics (`+30 ms`). `Gentle` removes steady noise/clicks while keeping laughter and breaths. `Sidon` rebuilds speech on GPU (`+~200 ms`). `Off` disables cleaning. | Use `DF3` in normal/noisy rooms, `Gentle` in quiet rooms, `Off` only for a clean studio mic. **Do not use `Sidon` for singing** (documented as not for singing). |
| **Speech gate** | `Off` | Works live | Silences output between words. | Enable only for noisy rooms during plain speech; **laughter and sighs get cut**, so leave off if you laugh a lot. |
| **Microphone level** | Meter (`−6 dBFS` target) | Meter only | Displays your microphone level in dB. | Raise Windows microphone gain until loud speech peaks near **`−6 dBFS`**. Quiet input causes robotic/underwater output. |
| **Monitor device** | Windows default output | LIVE monitoring | Chooses where **"Listen to input"** / **"Listen to output"** play. | Set to your **headphones**, never the virtual cable used as LIVE Output (avoids feedback loops). |
| **Monitor volume** | `−6 dB` | LIVE monitoring | Adjusts volume of the built-in monitor output. | Lower if monitoring feels loud; does not affect what Discord/OBS receives. |
| **Output volume** | `−6 dB` | Works live | Controls the converted output level sent to your LIVE output device. | YUNE plays louder than most recordings; keep around `−6 dB` unless your receiving app needs adjustment. |
| **Peak limiter (`−1 dBFS`)** | `On` | Works live | Caps output peaks at `−1 dBFS` to prevent digital clipping. | Keep **On** unless intentionally testing raw dynamics. |
| **Output buffer** | `200 ms` | At next START | Audio buffer size before playback. | Larger values reduce dropouts/crackles at the cost of higher delay; lowering too far causes audio dropouts. |
| **Models folder** | Empty (`models` next to `.exe`) | Global | Points to a custom folder for models/voices. | Leave empty unless storing `models` elsewhere. |
| **Save diagnostic recordings** | `Off` | Diagnostic | Saves WAV files of what the engine heard and produced (auto-stops after 10 min; resets to off on restart). | Turn on **only** when reporting a bug; check recordings for private speech before sharing. |
| **Restore default settings** | Action button | Global | Resets all settings to defaults. | Your saved voices and selected audio devices stay intact. |
| **AMD graphics engine** *(AMD build only)* | `DirectML` | After restart | Switches between **DirectML** (default, dedicated GPU) and experimental **MIGraphX**. | Leave on **DirectML** for `WavLM+` and `FlowEdit 3+1`. **MIGraphX** requires Windows 11 24H2+, Adrenalin 25.10.13.09+, 10–30 min first compile, and disables `WavLM+` / `FlowEdit 3+1`. |

> **Cleaning vs. Volume vs. Limiter vs. Buffer:** *Input cleaning* removes background noise before the AI hears you; *Output volume* changes loudness; *Peak limiter* prevents sudden distortion; *Output buffer* trades latency for stability against crackles.

---

## Settings → Voice & Timbre (LIVE)

Controls how closely the output matches the target Voice Bank vs. your own voice, and which model architecture/method runs:

- **Timbre strength** (`100%` default): Below `100%` mixes in your own vocal timbre using **`Sample of your voice…`** (5–20 s of normal speech, saved as `my_voice.yvoice`). Works in LIVE.
- **Timbre change when you raise or lower your voice** (`50%` default): `100%` lets vocal color shift naturally with pitch; `0%` keeps the same color across your range.
- **Prompt length** (`20 s` default, recommended): Length of the reference prompt used by the diffusion model. `20 s` gives the steadiest timbre; shorter values save GPU memory (**At the next START**).
- **Model method** (`Classic` default, **At the next START**):
  - **`Classic`:** Earlier-version behavior; enables the four Classic-only controls below.
  - **`Learned 4 steps`:** Tuned to sound like 10 steps while the model needs about **40%** of its GPU time and less GPU memory (per developer notes).
  - **`FlowEdit 3+1`:** Starts from your own voice (`Sample of your voice…`, 5–20 s) instead of noise and changes only voice identity, keeping breaths, whispers, laughter, and articulation better (about **60%** of model GPU time). Falls back to `Learned 4 steps` if no sample is set or on **AMD MIGraphX** (shown in LIVE status line).
- **Classic-only controls** *(active only when `Model method = Classic`)*:
  - **Model steps** (`10` default): `8`, `6` (`≈ −0.75 GB` VRAM), or `4` (`≈ −1.1 GB` VRAM) run faster with less VRAM.
  - **Solver** (`Euler` default): Switch to `DPM++ 2M` when using `4–6` steps.
  - **Guidance (CFG) only in the first half of the steps** (`Off` default): Saves GPU memory, mainly useful with `4–6` steps.
  - **Timbre guidance** (`0 = off` default): `0.5–1` strengthens breathiness on breathy target recordings; costs extra GPU time.
- **Content engine** (`Whisper` default, **At the next START**):
  - **`Whisper`:** Closer target timbre accuracy.
  - **`WavLM+`** *(NVIDIA and AMD DirectML only; unavailable on AMD MIGraphX)*: Clearer live speech, preserves your laughter, whispers, and breaths with much less buzzing, though timbre can be slightly less exact. Because `WavLM+` uses its own model, **`Fine-tuned model`** and **`Breathiness`** are disabled when `WavLM+` is active.
- **Fine-tuned model** (`Off` default, **At the next START**, Whisper only): Follows your breath and grit more closely, with slightly less exact target timbre.
- **Breathiness** *(Fine-tuned model only)*: Default `as you sing`; `×1` / `×2` adds extra air.
- **Roughness from your voice** (`Off` default): Restores vocal growl where your own voice is rough.
- **Smooth out vocal fry** (`Off` default, **Works live**): Prevents very low or creaky speech/singing from sounding raspy while preserving breathiness.
- **Guidance (CFG)** (`0.7` default, recommended as trained): Controls adherence to the target timbre prompt.

---

## Settings → Pitch & Autotune (LIVE)

- **Pitch shift** (`+12 st` default in developer docs as an example for male voice → female target; `0` for same range; `−12` for female → male): Shifts pitch in semitones. There is no single "correct" shift for every voice - choose the shift that fits your own voice and target character.
- **Automatic pitch** (`Off` default): `Off` uses the Pitch shift slider. **`Octave from the target voice`** keeps singing in key; **`Match the target voice's pitch`** adjusts talking pitch toward the target.
- **Melody mode** (`Follow my pitch` default):
  - **`Follow my pitch`:** Natural pitch tracking.
  - **`Autotune`:** Snaps notes to the key/scale (`Retune speed` `40 ms` default: `25–60 ms` natural, `0–10 ms` robotic; `Stability` `50%`; `Pull to the nearest note` `50%`; `Note change threshold` `20 cents`).
  - **`Stabilize`:** Steadies held notes while keeping vibrato.
- **I sing without a backing track** (`On` default): Turn **Off** when singing along with a song.
- **Key / Scale** (`Auto` default): Automatically detects or locks musical scale for Autotune/Harmony.
- **Vibrato** (`100%` default): Keeps your natural vibrato at `100%`.
- **Fix pitch detector errors** (`On` default, recommended): Smooths sudden pitch tracker jumps.
- **Harmony** (`Off` default): Adds live thirds/fifths following the key (`Harmony volume` `−6 dB`); costs extra GPU time.

---

## Settings → EQ & Filters (LIVE)

All controls here shape tone and clean up harshness in **LIVE** (and are copied to covers if you click **Copy settings from LIVE**):

- **Voice character** (`Off (as before)` default): Built-in presets (**Soft**, **Warm**, **Bright**, **Calm**, **Expressive**) or manual sliders for **Formants**, **Intonation range**, **Pitch smoothing**, **Warmth** (`≈250 Hz`), **Softness** (`0.5–3 kHz`), and **Presence** (`≈3.5 kHz`).
- **Breath smoothing** (`100%` default): Removes faint crackle in breaths.
- **Silence stays silent** (`On` default): Forces pauses to true silence; with `WavLM+` you can compare it **Off**.
- **Smooth top** (`100%` default) & **Brightness** (`0 dB` default): **Smooth top** softens high-frequency harshness/grain. Only raise **Brightness** if the output sounds muffled (and set **Smooth top** to `0` if raising Brightness).
- **Filters, De-esser, Dynamic EQ** (`Off` default): Pick a preset first, then fine-tune if sibilants (`s`/`sh`) or specific frequencies feel harsh.

---

## Settings → Effects (LIVE)

- **Compressor, Saturation, Bitcrush, Reverb** (`Off` default): Each effect includes presets and **works live** (changes smoothly even while singing). Use sparingly to avoid masking target timbre or adding unwanted distortion/echo.

---

## Quick Reference Summary Tables

### Recommended Starting Point (from Developer Docs)

| Area | Starting Value | Notes |
| --- | --- | --- |
| **Input cleaning** | `DF3` (`Gentle` in quiet rooms) | `Speech gate` `Off` |
| **Microphone level** | Peaks near `−6 dBFS` | Set in Windows Sound settings |
| **Output / Monitor volume** | `−6 dB` / `−6 dB` | `Peak limiter (−1 dBFS)` `On` |
| **Output buffer** | `200 ms` | Raise if audio crackles |
| **Prompt length / CFG** | `20 s` / `0.7` | `Timbre strength` `100%` |
| **Model method / Content engine** | `Classic` (or `Learned 4 steps` for games) / `Whisper` | Test `WavLM+` / `FlowEdit 3+1` for breaths & laughs |
| **EQ & Effects** | `Smooth top` `100%`, `Brightness` `0 dB`, `Breath smoothing` `100%` | `Effects` `Off` |

### When Changes Apply (`Works live` vs. `At the next START`)

| Applies Immediately (`Works live`) | Requires Stop → `START` (`At the next START`) |
| --- | --- |
| `Speech gate`, `Output volume`, `Peak limiter` | `Input cleaning`, `Output buffer` |
| `Smooth out vocal fry`, `Timbre strength`, `Guidance (CFG)` | `Prompt length`, `Model method` (`Classic` / `Learned 4 steps` / `FlowEdit 3+1`) |
| `Pitch & Autotune` controls, `EQ & Filters`, `Effects` | `Content engine` (`Whisper` / `WavLM+`), `Fine-tuned model` |

### Classic-Only Controls vs. AMD Backend Compatibility

| Feature | Classic Only? | NVIDIA | AMD DirectML | AMD MIGraphX (Experimental) |
| --- | --- | --- | --- | --- |
| `Model steps`, `Solver`, `1st-half CFG`, `Timbre guidance` | **Yes** | Yes | Yes | Yes *(Classic mode)* |
| `Learned 4 steps` | No | Yes | Yes | Yes |
| `WavLM+` | No | Yes | Yes | **No** *(unavailable)* |
| `FlowEdit 3+1` | No | Yes | Yes | **No** *(falls back to `Learned 4 steps`)* |

### Speech vs. Singing Starting Differences

| Setting | Speaking (Discord / Streaming) | Singing |
| --- | --- | --- |
| **Input cleaning** | `DF3` (or `Gentle` in quiet room) | `DF3` or `Gentle` (**never `Sidon`**) |
| **Automatic pitch** | `Match the target voice's pitch` (or `Off` + slider) | `Octave from the target voice` (or `Off` + `0`/`±12`) |
| **I sing without a backing track** | `On` | `Off` when singing along with music |
| **Melody mode** | `Follow my pitch` | `Follow my pitch`, `Stabilize`, or `Autotune` |

Next step: [Song Cover & Karaoke - Complete Beginner Guide](song-cover-karaoke.md).
