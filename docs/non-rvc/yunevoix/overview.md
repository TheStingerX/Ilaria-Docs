---
label: "Overview & Requirements"
icon: ":book:"
order: 99
permalink: /non-rvc/yunevoix/overview/
---
# YuneVoix (YUNE)

[Hugging Face (Download)](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Support & Premium)](https://ko-fi.com/yunevoix)

YuneVoix is a real-time AI voice conversion application for Windows, powered by the **YUNE** engine. Just like RVC, it transforms your voice into someone else's — for both speech and singing, live or offline — but **without training a voice model**. Everything runs locally on your own graphics card: no cloud, no account, and your audio never leaves your PC.

## How it works

Instead of spending hours training a model on a dataset, YUNE only needs a short reference audio sample of the target voice (about **5–20 seconds**). It splits your voice into *what you say* and *how you say it*:

1. **Speech encoder**: captures your words, articulation, and timing.
2. **Pitch tracker**: follows your melody and intonation.
3. **Diffusion-transformer model**: rebuilds the audio in the target voice's timbre using the short reference recording.
4. **Neural vocoder**: outputs full-band **44.1 kHz** audio.

In **LIVE** mode, audio is processed in small blocks of about **160 ms**, with roughly **0.7 seconds** of total end-to-end delay at default settings.

## BASIC vs. PREMIUM

| Feature | BASIC (Free) | PREMIUM |
| --- | --- | --- |
| **LIVE voice changer** (speech & singing) | Included | Included |
| **Voice Bank** (create & share `.yvoice` voices) | Included | Included |
| **Pitch tools** (shift, autotune, stabilizer, harmony) | Included | Included |
| **Voice character & vocal effects** | Included | Included |
| **Input cleaning** (noise/click removal, speech gate) | Included | Included |
| **Song Cover** (separate vocals, convert, remix) | — | Included |
| **Karaoke** (sing along with on-screen lyrics) | — | Included |
| **Offline licence** | Not required | Per-PC `license.yvl` |

> **YuneVoix PREMIUM** is available to supporters on [Ko-fi](https://ko-fi.com/yunevoix). Access is handled privately via Ko-fi or DMs, and the licence works completely offline.

## Key features

- **LIVE voice changer**: microphone in, converted voice out to any audio device (Discord, OBS, games, VRChat). Works for speaking and singing, preserving breaths, whispers, and laughter.
- **Voice Bank**: create a new voice from 10–25 seconds of clear recordings. YuneVoix can automatically separate the voice from music/noise and remove reverb.
- **Pitch tools**: manual or automatic octave shift, autotune with key detection, gentle pitch stabilizer, vibrato depth, and live harmony (thirds, fifths, octaves).
- **Voice character**: timbre strength, formant, warmth, and presence controls with presets.
- **Clean input**: noise and click removal (`DF3` / `Gentle`), speech gate, and input/output monitoring.
- **Vocal effects**: de-esser, compressor, reverb, and peak limiter.
- **Quality vs. speed options**: two content engines (including **WavLM+** on NVIDIA to preserve your own laughter, whispers, and breaths) and several model methods. Faster modes use about 40% of the GPU time, and **FlowEdit** mode keeps more of your own breath and articulation.
- **Song Cover & Karaoke (PREMIUM)**: re-sing full songs with automatic vocal separation or sing along to on-screen lyrics.
- **Interface in 6 languages**: English, German, Italian, Spanish, Polish, and Portuguese.

## System requirements

YuneVoix requires a **dedicated GPU** and cannot run on CPU only. Intel integrated/Arc graphics, macOS, and Linux are not supported.

| Component | NVIDIA (Recommended) | AMD (DirectML) |
| --- | --- | --- |
| **OS** | Windows 10 / 11 64-bit | Windows 11 **24H2** or newer (64-bit) |
| **GPU** | 8 GB+ VRAM (**12 GB recommended**), GeForce RTX recommended | Radeon **RX 7000 series** or newer, 12 GB+ VRAM (**16 GB recommended**) |
| **Driver** | Current NVIDIA driver | AMD Adrenalin **25.10.13.09** or newer |
| **Audio** | Microphone + **headphones** (required for live use) | Microphone + **headphones** (required for live use) |

> **Note for NVIDIA vs. AMD**: Some modes (such as the `WavLM+` content engine) are NVIDIA-only. On AMD, Windows may automatically download **AMD MIGraphX** through Windows Update on first setup.
