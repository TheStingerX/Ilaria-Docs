---
label: "Song Cover & Karaoke"
icon: ":musical_note:"
order: 95
permalink: /non-rvc/yunevoix/song-cover-karaoke/
description: "Complete beginner tutorial for YuneVoix PREMIUM offline Song Cover and Karaoke features, including FlowEdit source differences, controls, keyboard shortcuts, and troubleshooting."
---
# YuneVoix Song Cover & Karaoke - Complete Beginner Guide

[Overview & Requirements](overview.md) · [Settings & Audio Quality](settings.md) · [Premium, Licensing & Help](premium-and-troubleshooting.md)

**Song Cover** and **Karaoke** are offline music features unlocked in **YuneVoix PREMIUM** (`license.yvl`). Unlike **LIVE** mode, Song Cover and Karaoke have their own dedicated settings tabs so LIVE tweaks do not accidentally alter your cover renders.

---

## 1. Song Cover (Step-by-Step)

Song Cover separates a song into vocals and instrumental, converts the vocals into your chosen Voice Bank voice, and mixes the finished track (taking roughly **1.3×** the song length on the GPU - e.g. a 5-minute song takes about 6–7 minutes per developer notes).

1. Open the **Song Cover** tab (requires an active `license.yvl`).
2. **Choose your song:** Load an audio file (WAV, MP3, FLAC, M4A, AAC, OGG, WMA, or AIFF, up to **15 minutes**).
3. **Select target voice:** Pick a `.yvoice` voice from your Voice Bank.
4. **Configure vocal separation:**
   - **Vocal separator:** **`YUNE`** (default, recommended, ~2× faster).
   - **Vocals to convert:** **`Lead vocal only`** (default, cleanest result).
5. **Open `Settings → Song Cover`** *(or click **Copy settings from LIVE** twice to pull model, timbre, filters, and effects from LIVE)*.
6. **Set Octave:** Keep **`Auto`** (default); if the output sounds too high or too deep, set `−12`, `0`, or `+12`.
7. **Choose Content engine:** **`Whisper`** (default, closer timbre) or **`WavLM+`** (less buzzing on breathy notes, slightly less exact words; supported on NVIDIA and AMD DirectML).
8. **Choose Model & Model method:**
   - **Model:** **`base`** (default, recommended) or **`fine-tuned`**.
   - **Model method:** **`Classic`** (`10 × Euler` recommended for covers), **`Learned 4 steps`**, or **`FlowEdit 3+1`**.
   - **Prompt length** (`20 s`), **Timbre change** (`50%`), **Roughness** (`off`), **CFG** (`0.7`), and **Fix pitch detector errors** (`on`) match their LIVE counterparts.
9. **Configure level, reverb & export format:**
   - **Vocal level:** `+2 dB` (default).
   - **Vocal reverb:** own level `−17 dB` (default), match original, or none.
   - **Keep the separated tracks:** `Off` (default); turn **On** to skip separation if re-rendering the same song.
   - **File format:** **`WAV 24-bit`** (default) or **`MP3 320 kbps`** (requires the Windows MP3 encoder).
10. **Generate & export** the cover.

### FlowEdit 3+1 in Song Cover

Unlike LIVE mode, **FlowEdit 3+1 in Song Cover uses the song's own separated original vocal as its source**, not your `my_voice.yvoice` sample. That means FlowEdit in Song Cover aims to keep the original singer's breaths and articulation without requiring a recording of your own voice.

---

## 2. Karaoke (Step-by-Step: PREPARE → SING → RENDER COVER)

Karaoke lets you sing a song yourself with synchronized on-screen lyrics, then converts your recorded vocal into the target voice and mixes it into the track.

### Step 1: PREPARE

1. Open the **Karaoke** tab and load your **song** and **lyrics** (pasted plain text or `.lrc` file; Japanese also works in romaji, and legacy encodings like Shift-JIS are supported).
2. In **`Settings → Karaoke`**, choose **Sing along to**:
   - **`Backing track`** (default): separates the song during **PREPARE** (2–3 minutes the first time) and gives the most accurate lyrics alignment.
   - **`Original song`**: starts in seconds and runs separation at the first render.
3. Click **PREPARE**. If lyrics drift slightly, your sync correction is remembered.

### Step 2: SING

1. Check your **Headphones** (Windows default output) and **Microphone** (same as LIVE) in `Settings → Karaoke`.
2. Click **SING** to open the lyrics window (starting Karaoke frees the LIVE engine from the GPU).
3. **Lyrics window controls:**
   - **`Space`:** Pause / resume.
   - **`Esc`:** Stop singing (the cover ends 5 seconds after stopping).
   - **`F11`:** Toggle full screen.
4. Watch the built-in microphone meter and sing through the song (YuneVoix compensates clock drift and warns if no voice was recorded or if your mic clipped).

### Step 3: RENDER COVER

1. Adjust **`Settings → Karaoke`** mix options if needed.
2. Click **RENDER COVER**. Model, model method, timbre, filters, effects, and export file format come from **`Settings → Song Cover`**.

### Karaoke Settings: Monitoring vs. Final Render

| Setting (`Settings → Karaoke`) | Default | Affects What You Hear While Singing | Affects Final Rendered Cover |
| --- | --- | --- | --- |
| **Original vocal in headphones** | `20%` | Yes | No |
| **Backing vocals** | `On` | Yes | No (the cover keeps backing vocals as in Song Cover) |
| **Music volume** | `0 dB` | Yes | No |
| **Lyrics size** | `Normal` | Yes (display) | No |
| **Clean the recording** (`Off` / `DF3`) | `Off` | No | Yes |
| **Content engine** (`Whisper` / `WavLM+`) | `Whisper` | No | Yes |
| **Octave** | `Auto` (singer's register within target range) | No | Yes |
| **Pull to the original melody** | `Off` (`50–70%` natural) | No | Yes |
| **Follow the original vocal's level** | `70%` (dynamics + limiter) | No | Yes |
| **Make room for the vocal** | `Up to 60%` (ducks `1–4 kHz` when singing) | No | Yes |
| **Smooth out vocal fry** | `Off` | No | Yes |

---

## 3. Song Cover & Karaoke Troubleshooting

| Symptom | What to Check & Try |
| --- | --- |
| **Lyrics out of sync** | Use **`Sing along to → Backing track`** at **PREPARE**, load a timed `.lrc` file if available, or apply sync correction in Karaoke (saved per song). |
| **Microphone not detected / nothing recorded** | Verify **Microphone** in `Settings → Karaoke`, Windows mic privacy permissions, and watch the meter in the lyrics window. |
| **Recorded voice too quiet** | Raise Windows microphone gain toward `−6 dBFS`, enable **Follow the original vocal's level** (`70%` default), and keep **Make room for the vocal** enabled. |
| **Wrong pitch / out of tune** | Check **Octave** (`Auto`, `−12`, `0`, or `+12`) and try **Pull to the original melody** (`50–70%`) in `Settings → Karaoke`. |
| **Stuttering during Karaoke** | Close other GPU-heavy apps, use **`Backing track`** (already separated at PREPARE), or check audio buffer settings. |
| **Music too loud / voice buried** | Raise **Vocal level** (`+2 dB` default; `Settings → Song Cover` for covers, `Settings → Karaoke` for karaoke), keep **Make room for the vocal** enabled, or lower **Music volume** while singing. |
| **Breaths or whispers lost in cover** | Compare **`WavLM+`** vs. **`Whisper`**, or switch **Model method** to **`FlowEdit 3+1`** in `Settings → Song Cover`. |
| **Too much reverb on cover vocal** | Lower **Reverb on the vocal** (`−17 dB` default) or set it to none - in `Settings → Song Cover` for covers, in `Settings → Karaoke` for karaoke. |
| **Vocal separation artifacts / duets** | Keep **Vocal separator** on **`YUNE`** and **Vocals to convert** on **`Lead vocal only`** (duets with two lead singers cannot isolate a single singer automatically). |

Next step: [Premium, Licensing & Help](premium-and-troubleshooting.md).
