---
label: "Overview & Requirements"
icon: ":book:"
order: 99
permalink: /non-rvc/causal-voice-changer/overview/
---
# Causal Voice Changer (CVC)

[GitHub](https://github.com/mojowozo/Causal-Voice-Changer) · [Releases](https://github.com/mojowozo/Causal-Voice-Changer/releases)

**Causal Voice Changer (CVC)** is a **48 kHz** real-time AI voice changer built to bridge the gap between ultra-low-latency systems (like Beatrice) and slower, high-fidelity systems (like RVC). Instead of trading away sound quality for speed—or speed for quality—CVC uses a distilled version of **ContentVec** and **RMVPE** in a causal architecture to deliver both clean audio and low delay.

## How CVC differs from RVC (explained simply)

Traditional **RVC** was originally designed to convert complete audio files, not live streams:

1. RVC grabs a block of your voice, converts it, and stitches it onto the previous block using a **crossfade**.
2. When you lower the block size to reduce delay, RVC has less context—so quality and pitch accuracy drop. If you hold a note or draw out a word, you can often hear the seams between blocks as warbling or crackling.

**Causal Voice Changer (CVC)** works differently:

- It is **causal**: it converts audio continuously as it arrives, looking mostly backward with only a **60 ms lookahead buffer**.
- Because it streams continuously instead of stitching independent chunks, **sustained sounds and held notes stay smooth** without breaking or warbling.
- You keep nearly all the quality of RVC at a much lower latency (for example, around **130 ms total end-to-end** on Linux with JACK audio).

## Important license & commercial use notice

While CVC's source code is under the **MIT license**, the included pretrained base model was trained on **EARS (CC BY-NC)**, **VCTK**, and **LibriTTS-R**.

> **Non-commercial use only**: Because of the EARS dataset, you may **not** use the included pretrained base model—or **any voice finetuned from it**—for commercial purposes.

## Supported platforms & hardware

| Platform | UI | GPU / Backend Support |
| --- | --- | --- |
| **Windows 10/11 (x64)** | WinUI 3 (acrylic) or Tk fallback | **NVIDIA** (CUDA), **AMD Radeon RX 7000/9000 / PRO W7000 / Ryzen AI** (ROCm 7.2.1), **AMD RX 6000 / PRO W6000** (`rocm-rdna2` nightly); older Radeons run on CPU (set Chunk ≥ `60 ms`) |
| **Linux (x86_64)** | COSMIC (Rust) or Tk fallback | glibc 2.35+ (Ubuntu 22.04, Debian 12, or newer); NVIDIA / AMD; **JACK / PipeWire** recommended for lowest latency |

## What you can do with CVC

- **Train your own voices** from raw audio without manually slicing files or trimming silence, at any sample rate.
- **Share voices easily** as single self-contained `.cvc` files (drag-and-drop into the live app).
- **Convert your microphone live** with native Windows/Linux GUIs, built-in noise reduction (**Hushwire** or **RNNoise**), pitch matching, LUFS loudness metering, and recording.
- **Convert whole audio files** offline via `causalvc.infer` or the file input source in the live app.
