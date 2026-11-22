# Voice Bank and Live Usage

Use this guide to create voices in the **Voice Bank**, route YuneVoix into **Discord, OBS, games, or VRChat**, use the built-in monitoring controls, and pick the right **Model method** for LIVE conversion. For a full breakdown of every slider, see [Settings & Audio Quality](settings.md).

## 1. Create and share voices (Voice Bank)

Unlike traditional RVC, creating a **Voice Bank** profile in YuneVoix **does not train a neural network from scratch** - it builds a lightweight `.yvoice` speaker reference in seconds.

1. Open the **Voice Bank** tab.
2. Provide **10–25 seconds** of clear recordings of the target voice:
   - **What to use:** One speaker only, clean and dry speech or singing without background music, heavy reverb, or overlapping voices.
   - **Helpful variety:** Including natural **laughter, breaths, "mmm", and singing** helps YUNE capture expressive tone.
   - **What to avoid:** Clips under 10 seconds, distorted/clipped audio, multiple people talking at once, or loud room echo (which can make the converted voice sound noisy or unstable).
3. Keep cleaning set to **"Separate voice + remove reverb (recommended)"** if the source clip has background noise or room echo.
4. Save the voice - it is stored as a `.yvoice` file inside `models\yune\voices`.
5. Click **Play sample** in Voice Bank to preview it (as of v0.7.0, **Play sample** plays through your Windows default output / headphones rather than the LIVE output).

To share or back up a voice, use **Voice Bank → Open folder** to find the `.yvoice` file, or load one via **Import .yvoice…**.

> **Responsible use:** Only use voices you have the right to use (your own, or someone's who agreed). Never use YuneVoix to impersonate real people, deceive, harass, or commit fraud.

---

## 2. Set up live audio routing & monitoring

> **Always wear headphones** for live use. With speakers (or loud, poorly isolated open-back headsets), the converted voice can leak back into your microphone and cause double audio, echo, or feedback loops.

### Routing to Discord, OBS, games, or VRChat

With a virtual audio cable such as **VB-CABLE** (or **VAC** `Line 1`), remember that the cable has two sides: **YuneVoix** sends audio *into* the cable, and **Discord / OBS / games** receive audio *from* the cable:

1. **Inside YuneVoix (LIVE tab):**
   - **Input (Microphone):** Your physical microphone.
   - **Output:** **`CABLE Input`** (VB-CABLE) or **`Line 1`** (VAC).
2. **Inside Discord, OBS, VRChat, or your game:**
   - **Input Device (Microphone):** **`CABLE Output`** (VB-CABLE) or **`Line 1`** (VAC).
   - **Output Device (Speakers/Headphones):** Your **headphones** (never the virtual cable).
3. **In Discord:** Turn off **Noise Suppression (Krisp)** and **automatic input sensitivity** for this virtual mic - they cut off breaths and quiet words, and YuneVoix already handles input cleaning.

### Hearing yourself (Built-in Monitoring)

Do **not** use Windows *"Listen to this device"* on the virtual cable. YuneVoix provides built-in monitoring controls:

- **(Optional) To hear yourself:** Use **"Listen to input"** (what the engine hears after input cleaning) or **"Listen to output"** (the converted voice) in the **LIVE** tab.
- Choose your **Monitor device** (your headphones, never the LIVE virtual-cable output) and **Monitor volume** (default `-6 dB`) in **`Settings → General`**.
- **Direct monitoring note:** Your headset's or audio interface's hardware *direct monitoring* has no delay at all, but it plays your **original unprocessed voice**, not the converted voice.

### Latency expectations

At default settings (`Output buffer` `200 ms`), total end-to-end delay is about **0.7 seconds** (as reported by the developer). This works well for voice chat, streaming, and recordings, though it is too high for singing strictly on-beat with a live track (for singing over music, see [Song Cover & Karaoke](song-cover-karaoke.md)).

---

## 3. Model Method: Classic vs. Learned 4 Steps vs. FlowEdit 3+1

You can choose **Model method** in **`Settings → Voice & Timbre`** (and separately in **`Settings → Song Cover`** for covers and karaoke). Changes apply **at the next START**.

### Classic (Default)

- Works as in earlier versions.
- **Model steps** (`10` default, or `8` / `6` / `4`), **Solver** (`Euler` / `DPM++ 2M`), **Guidance (CFG) only in the first half of the steps**, and **Timbre guidance** apply **only** in Classic mode.

### Learned 4 steps

- Tuned to sound like Classic 10 steps while the model needs about **40%** of its GPU time and less GPU memory (per developer notes).
- Best choice to try when gaming simultaneously or using slower graphics cards.

### FlowEdit 3+1

- Starts from **your own voice** instead of noise and changes only the voice identity, aiming to preserve **breaths, whispers, laughter, and articulation** better (reported at about **60%** of the model's GPU time).
- **LIVE requirement:** Needs a **5–20 second** sample of your own plain speech selected in **`Settings → Voice & Timbre → "Sample of your voice…"`** (stored as `my_voice.yvoice`).
- **Automatic fallback:** Without that sample, or when using **AMD MIGraphX**, FlowEdit 3+1 automatically falls back to **Learned 4 steps** and the LIVE status line tells you so.
- **Room & mic tip:** Because FlowEdit keeps more of your own timbre and room ambience, a quiet room or **`DF3`** input cleaning helps keep the output clean.

---

## 4. Recommended tuning & Vocal Fry

- **Microphone level (`Settings → General`):** Watch the meter and raise Windows mic gain so loud speech peaks near **`−6 dBFS`**. A quiet mic is the most common cause of robotic or "underwater" output.
- **Input cleaning (`Settings → General`):** Keep **`DF3`** on in noisy rooms (removes typing, clicks, and hiss; `+30 ms`). In quiet rooms, if laughs or breaths are clipped, keep **Speech gate** off and try **`Gentle`**.
- **Smooth out vocal fry (`Settings → Voice & Timbre`, and `Settings → Karaoke`):** If you speak or sing very low or with a creaky voice and the target sounds raspy, turn on **Smooth out vocal fry** (works live; breathiness is kept).
- **Pitch & Content engine:** Set **Pitch shift** (`Settings → Pitch & Autotune`) or an **Automatic pitch** mode, and compare **Whisper** (default) vs. **WavLM+** (`Settings → Voice & Timbre`, supported on NVIDIA and AMD DirectML) by ear.

### Gaming while using LIVE

If you notice stutters while gaming:
1. Limit the game's **FPS**.
2. Set **Model method** to **`Learned 4 steps`**.
3. Shorten **Prompt length** (e.g., below `20 s`).
4. Turn off **Harmony** if you do not need it.
5. Check overall GPU load (reducing **Model steps** only applies to **Classic** mode).

Next step: [Settings & Audio Quality](settings.md).
