---
label: "Datasets, Checker & Audio Analyzer"
icon: ":level_slider:"
order: 95
permalink: /ilaria-rvc/datasets/
description: "Your dataset is the single biggest factor deciding how natural, clean, and expressive your RVC voice model will sound."
---
# Datasets, Dataset Checker & Audio Analyzer

[Download Ilaria RVC 2.4.7 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Your dataset is the single biggest factor deciding how natural, clean, and expressive your RVC voice model will sound. Even the best training settings cannot fix noisy, reverberant, or distorted source recordings.

!!!tip
**Golden rule: Quality always beats quantity.**
10 minutes of dry, clean, varied single-speaker audio will train a much better voice model than 60 minutes of echoey, noisy, or repetitive clips.
!!!

## 1. What makes a great RVC dataset

### Length and vocal variety
- **Minimum usable length:** Around **5 to 10 minutes** of pure speech or singing (excluding silence) can produce a working voice if the audio is very clean.
- **Recommended target:** **15 to 30+ minutes** of clean, varied audio gives the model enough phonetic coverage to handle different words, pitches, and emotions naturally.
- **Vocal variety matters:** Include calm speech, energetic speech, different pitches, soft and loud phrases, and clear consonants (`s`, `f`, `t`, `k`). If you only train on monotone speech, the model will struggle when you sing or speak expressively.

### Audio cleanliness and format
- **One speaker only:** Never leave overlapping voices, crowd noise, or backing harmonies in the dataset.
- **Dry room (minimal reverb):** RVC learns room echo as part of the voice timbre. Close-mic studio recordings or dry voiceovers work best.
- **Lossless format:** Prefer **PCM `.wav`** (or `.flac`) over low-bitrate `.mp3` files whenever possible, so compression artifacts are not baked into the model.
- **No music or sound effects:** Remove all background music, game audio, and SFX before preprocessing.

## 2. Preparing & cleaning your audio

1. **Separate vocals from music/SFX:** If your source comes from songs, videos, or games, extract dry vocals first using [UVR5](../../non-rvc/uvr5/overview.md) or [MVSep](../../non-rvc/mvsep/overview.md).
2. **Be careful with heavy denoising or dereverb:** Only apply noise or reverb removal when truly needed. Aggressive filters can strip crisp high frequencies and create watery, metallic artifacts. Always A/B listen to the original vs processed clip.
3. **Trim dead air and bad noises:** Cut long silent pauses, loud mic bumps, coughs, clicks, and extreme clipping. Keep short, natural pauses between words so phrasing stays human.
4. **Keep clip lengths reasonable:** Split very long recordings into clean segments (roughly **3 to 15 seconds** each), or let Ilaria RVC's preprocessing slicer segment them cleanly.
5. **Use simple file paths:** Store your dataset in a short folder path without spaces, accents, or special symbols (for example `C:\RVC\datasets\my_voice\`).

## 3. Using Ilaria RVC's Dataset Checker

Before spending GPU time training, run Ilaria RVC's built-in **Dataset Checker** to catch hidden audio problems early:

- **Clipping detection:** Finds segments where peaks hit `0 dBFS` and flatten out, which can cause harsh distortion or `NaN loss` during training.
- **Long silences:** Flags clips that are mostly empty air so you can trim or remove them.
- **Unreadable or broken files:** Catches corrupted headers, zero-byte files, or clips shorter than 1 second that would crash preprocessing (`zero-size array`).
- **Inconsistent active levels:** Highlights clips that are dramatically quieter or louder than the rest of the dataset.

**Recommended workflow:**
1. Point the **Dataset Checker** to your dataset folder and run the scan.
2. Listen to every flagged file before deleting or editing it.
3. Preserve natural quiet delivery and intentional pauses when they belong to the voice, and remove or re-clean only genuinely broken, clipped, or noisy clips.

## 4. Using Ilaria RVC's Audio Analyzer

Use the **Audio Analyzer** to inspect *why* a recording or conversion sounds wrong:

- **Waveform peaks:** Flat-topped waves indicate hard digital clipping. Lower the gain or replace the clipped recording.
- **Spectrogram:** Look at silent gaps between words. A constant horizontal line at 50/60 Hz points to electrical hum; bright vertical smudges or wash across frequencies indicate leftover music bleed or room reverb.
- **Pitch & active levels:** Check whether the speaker's pitch jumps unnaturally (tracking error) or whether levels drop too low.
- **Before vs After comparison:** Load the exact same region of both the original input and the converted output to tell whether an artifact came from the dataset, the separation step, or inference settings.

## 5. Common dataset mistakes to avoid

| Mistake | What happens to the trained model | How to fix it |
| --- | --- | --- |
| **Leaving reverb/echo in dataset** | The voice always sounds like it is in a bathroom or cave. | Use drier source recordings, or carefully clean with UVR5/MVSep DeReverb. |
| **Background music bleed** | Random musical warbles or metallic artifacts in converted speech. | Re-separate vocals with `BS-Roformer` / `BS Polarformer` and delete dirty clips. |
| **Multiple speakers in one dataset** | Voice timbre shifts unpredictably mid-sentence. | Keep strictly one speaker per dataset folder. |
| **Tiny repetitive dataset (< 2 min)** | Model memorizes noise ("overfitting") and breaks on new words. | Add more varied phrases and stop training earlier (fewer epochs). |
| **Clipped / distorted loud recordings** | Harsh crackling, robotic voice, or `NaN loss` crash. | Remove clipped takes and normalize clean audio safely below `0 dBFS`. |

Read [Prepare a voice dataset](../../model-training/dataset-preparation.md) for more general recording and evaluation guidelines.
