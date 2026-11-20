---
label: "Voice Bank & Live Usage"
icon: ":studio_microphone:"
order: 97
permalink: /non-rvc/yunevoix/usage/
---
# Voice Bank and Live Usage

Use this guide to create voices in the **Voice Bank**, route YuneVoix into **Discord, OBS, games, or VRChat**, and tune the audio settings for clean live conversion.

## 1. Create and share voices (Voice Bank)

YuneVoix requires **no model training**.

1. Open the **Voice Bank** tab.
2. Provide **10–25 seconds** of clear recordings of the target voice:
   - Best results: one speaker only, dry audio without music or effects.
   - Including natural **laughter, breaths, "mmm", and singing** helps the engine capture vocal expression.
3. Keep cleaning set to **"Separate voice + remove reverb"** if the sample has any background noise or room echo.
4. Your voice is ready in seconds and saved as a small `.yvoice` file.

To share or back up a voice, use **Voice Bank → Open folder** to find the `.yvoice` file, or load one via **Import .yvoice…**.

> **Responsible use**: Only use voices you have the right to use (your own, or someone's who agreed). Never use YuneVoix to impersonate real people, deceive, harass, or commit fraud.

## 2. Set up live audio routing

> **Always wear headphones** for live use. With speakers, the converted voice feeds back into your microphone and causes echo, buzzing, and feedback loops.

### Routing to Discord, OBS, games, or VRChat

1. Install a virtual audio cable (such as the free **VB-CABLE**).
2. In **YuneVoix**, select your physical microphone as the input and **`CABLE Input`** as the output device.
3. In **Discord, OBS, VRChat, or your game**, select **`CABLE Output`** as the microphone.
4. *(Optional)* To hear your own converted voice: open Windows **Sound settings → Recording → CABLE Output → Properties → Listen**, enable **"Listen to this device"**, and choose your headphones.
5. **In Discord**, turn off **Noise Suppression (Krisp)** and **automatic input sensitivity** for this mic - they cut off breaths and quiet words, and YuneVoix already cleans the input.

### Latency expectations

At default settings, total delay is about **0.7 seconds**. This is great for streaming, voice chat, and recordings, though too high for singing strictly on-beat with a live track. Lowering the **Output buffer** reduces latency slightly, at the risk of audio dropouts.

## 3. Recommended tuning

### Microphone level & input cleaning

- Go to **Settings → General** and watch **Microphone level**. Raise your mic gain in Windows so loud speech peaks around **−6 dBFS**. A quiet mic is the most common cause of robotic or "underwater" output.
- Keep **Input cleaning** on **`DF3`** for noisy rooms. In a quiet room, if laughs, breaths, or whispers are getting cut off, turn off **Speech gate** and try **`Gentle`**.

### Pitch & Autotune

Go to **Settings → Pitch & Autotune**:
- **Pitch shift**:
  - **`+12`** for male voice → female target
  - **`0`** for a target voice in your own range
  - **`−12`** for female voice → male target
  - Or enable **automatic pitch**.
- For singing, you can enable **autotune** (with key detection), **pitch stabilizer**, **vibrato depth**, and **live harmony** (thirds, fifths, octaves).

### Voice character, effects & GPU load

- **Voice character**: adjust timbre strength, formant, warmth, and presence, or start from a built-in preset.
- **Vocal effects**: de-esser, compressor, reverb, and peak limiter.
- **Content engines & FlowEdit 3+1** (**Settings → Voice & Timbre**):
  - Try **WavLM+** (supported on NVIDIA and AMD DirectML; unavailable if experimental AMD MIGraphX is selected) to carry over laughter, whispers, and breaths from your own voice.
  - **FlowEdit 3+1** mode (supported on NVIDIA and AMD DirectML) preserves more of your natural breath and articulation (requires a sample of your voice in LIVE).
  - On AMD, **DirectML** on your dedicated GPU is used by default; you can optionally test **MIGraphX** (experimental, after restart) under `Settings → General → "AMD graphics engine"`, though `WavLM+` and `FlowEdit 3+1` require DirectML.
  - If you are **gaming simultaneously** and notice stutters, lower the game's graphics/FPS, reduce **Model steps**, use a shorter prompt, or turn off **Harmony**.
