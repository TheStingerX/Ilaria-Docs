# YuneVoix (YUNE)

[Hugging Face (Download)](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Support & Premium)](https://ko-fi.com/yunevoix)

YuneVoix is a real-time AI voice conversion application for Windows, powered by the **YUNE** engine. Just like RVC, it transforms your voice into someone else's - for both speech and singing, live or offline - but **without training an individual voice model**. Everything runs locally on your own graphics card: no cloud, no account, and your audio never leaves your PC.

> **Guide map:** [1. Overview & Requirements](overview.md) · [2. Install & Update](installation.md) · [3. Voice Bank & Live Usage](usage.md) · [4. Settings & Audio Quality](settings.md) · [5. Song Cover & Karaoke](song-cover-karaoke.md) · [6. Premium, Licensing & Help](premium-and-troubleshooting.md) · [7. Changelog](changelog.md)

## How it works

Instead of spending hours training a model on a dataset, YUNE creates a **Voice Bank** profile from a short reference recording of the target voice (**10–25 seconds**). *(Separate from that, the **FlowEdit 3+1** LIVE method also uses a **5–20 second** sample of your own plain voice as its starting point - for example, 15 seconds of your target voice in Voice Bank vs. 10 seconds of your own natural speech in `Settings → Voice & Timbre → Sample of your voice…`.)*

According to the developer documentation, the YUNE pipeline splits your voice into *what you say* and *how you say it*:

1. **Voice Bank & Speaker identity:** Stores a vocal profile (`.yvoice`) from a 10–25 second target recording without training a separate neural network from scratch.
2. **Content engine (`Whisper` or `WavLM+`):** Captures your words, timing, and articulation.
3. **Pitch tracking:** Follows your melody and intonation.
4. **Diffusion-based conversion:** Rebuilds the audio in the target speaker's timbre using the Voice Bank reference.
5. **Neural vocoder (`PC-NSF`):** Outputs full-band **44.1 kHz** audio.
6. **Audio processing:** Applies input cleaning, pitch/autotune tools, EQ/filters, and effects.

In **LIVE** mode, audio is processed in small blocks of about **160 ms**, with roughly **0.7 seconds** of total end-to-end delay at default settings (as reported by the developer).

## BASIC vs. PREMIUM

| Feature | BASIC (Free) | PREMIUM |
| --- | --- | --- |
| **LIVE voice changer** (speech & singing) | Included | Included |
| **Voice Bank** (create & share `.yvoice` voices) | Included | Included |
| **Pitch tools** (shift, autotune, stabilizer, harmony) | Included | Included |
| **Voice character & vocal effects** | Included | Included |
| **Input cleaning** (noise/click removal, speech gate) | Included | Included |
| **Song Cover** (separate vocals, convert, remix) | - | Included |
| **Karaoke** (sing along with on-screen lyrics) | - | Included |
| **Offline licence** | Not required | Per-PC `license.yvl` |

> **YuneVoix PREMIUM** is available to supporters on [Ko-fi](https://ko-fi.com/yunevoix). Access is handled privately via Ko-fi or DMs, and the licence works completely offline. See [Song Cover & Karaoke](song-cover-karaoke.md) and [Premium, Licensing & Help](premium-and-troubleshooting.md) for details.

## Key features

- **LIVE voice changer**: microphone in, converted voice out to any audio device (Discord, OBS, games, VRChat). Works for speaking and singing.
- **Voice Bank**: create a new `.yvoice` profile from **10–25 seconds** of clear recordings. YuneVoix can automatically separate the voice from music/noise and remove reverb.
- **Three model methods** (per developer documentation):
  - **Classic:** Earlier-version behavior with configurable `Model steps`, `Solver`, and guidance controls.
  - **Learned 4 steps:** Designed to achieve results similar to Classic 10 steps while using about **40%** of the model's GPU time and less GPU memory.
  - **FlowEdit 3+1:** Starts from your own source voice (5–20 second own-voice sample in LIVE; the song's vocal in Song Cover) instead of noise and aims to preserve breaths, whispers, laughter, and articulation better (reported at about **60%** of the model's GPU time).
- **Content engines**: **Whisper** (default) and **WavLM+** (on NVIDIA and AMD DirectML, aimed at clearer live speech and preserving laughter, whispers, and breaths).
- **Pitch tools**: manual or automatic pitch shift, autotune with key detection, gentle pitch stabilizer, vibrato depth, and live harmony (thirds, fifths).
- **Voice character, EQ & effects**: timbre strength, formant, warmth, softness, presence, de-esser, dynamic EQ, compressor, saturation, bitcrush, reverb, and peak limiter. See [Settings & Audio Quality](settings.md).
- **Song Cover & Karaoke (PREMIUM)**: re-sing full songs with automatic vocal separation or sing along to on-screen lyrics.
- **UI language selector**: English, German, Italian, Spanish, Polish, and Portuguese.

## System requirements

YuneVoix requires a **dedicated GPU** and cannot run on CPU only. Intel integrated/Arc graphics, macOS, and Linux are not supported.

| Component | NVIDIA (Recommended) | AMD |
| --- | --- | --- |
| **OS** | Windows 10 / 11 64-bit | Windows 10 / 11 64-bit |
| **GPU** | 8 GB+ VRAM (**12 GB recommended**), GeForce RTX recommended | Radeon **RX 7000 series** or newer, 12 GB+ VRAM (**16 GB recommended**) |
| **Driver** | Current NVIDIA driver | Current AMD Software: Adrenalin Edition driver |
| **Audio** | Microphone + **headphones** (required for live use) | Microphone + **headphones** (required for live use) |

> **Footnote (AMD):** Windows 11 24H2+ and Adrenalin 25.10.13.09+ are required only for the experimental **MIGraphX** engine, available under `Settings → General → "AMD graphics engine"`.

### AMD DirectML vs. AMD MIGraphX

- **AMD DirectML (Default in v0.7.1):** Built in and used on the dedicated AMD GPU by default. Works immediately without a Windows Update download or initial model compiling, and supports both **`WavLM+`** and **`FlowEdit 3+1`** according to the developer documentation.
- **AMD MIGraphX (Experimental):** Must be enabled explicitly in `Settings → General → "AMD graphics engine"` and requires a restart. Windows Update may download MIGraphX components, first-time model preparation can take **10–30 minutes**, and **`WavLM+`**, **`FlowEdit 3+1`**, and **`Learned 4 steps`** are **not** available under MIGraphX (the model always runs as Classic, 10 × Euler).

Next step: [Install and update YuneVoix](installation.md).
