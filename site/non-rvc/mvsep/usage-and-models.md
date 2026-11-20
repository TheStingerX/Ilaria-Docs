# MVSep Guide: Recommended Models & Presets

Below are the best MVSep presets for preparing ultra-clean vocal tracks (for RVC training, covers, or voice conversion), complete with **direct links** that pre-select the exact separation algorithm and options for you.

## 1. Vocals and SFX Removal

Use these first to strip background music, sound effects, and ambient noise from your original audio.

- **BS Polarformer** - [Open preset on MVSep](https://mvsep.com/home?sep_type=56&add_opt1=2&add_opt2=1&add_opt3=0)
  - A high-precision Band-Split Roformer variant using **Polar Positional Embeddings (PoPE)** for long-context separation.
  - **When to use**: your primary first-pass choice for clean vocals and minimal instrumental bleed.
- **MVSep DnR v3** - [Open preset on MVSep](https://mvsep.com/home?sep_type=123&add_opt1=163)
  - A cinematic multi-stem (*Divide and Remaster*) model designed to split audio into **speech, music, and SFX**.
  - **When to use**: game dialogue, movies, videos, or clips with heavy sound effects.

> **Recommendation**: **BS Polarformer** is generally stronger on its own, but running **both** (passing the output through the second) eliminates almost any chance of leftover background music or SFX.

## 2. Separating Lead and Back Vocals

- **MVSep Karaoke** - [Open preset on MVSep](https://mvsep.com/home?sep_type=49&add_opt1=5&add_opt2=0)
  - Isolates **lead vocals** from **backing vocals / harmonies**.
  - **Note**: this model can be a little finicky and may occasionally confuse backing vocals with lead vocals depending on how the track is mixed - listen to both stems before deleting anything. Even with that quirk, it remains very useful.

## 3. Reverb Removal

Run these on your isolated vocal stem to turn "wet" studio/room vocals into dry recordings.

- **DeReverb Stereo** - [Open preset on MVSep](https://mvsep.com/home?sep_type=22&add_opt1=7&add_opt2=1)
  - Targets stereo vocal reverb and reflections.
- **DeReverb Room** - [Open preset on MVSep](https://mvsep.com/home?sep_type=22&add_opt1=6&add_opt2=1)
  - Targets room acoustics and natural room echo.

> **Recommendation**: it is best to use **both** to eliminate any remaining reverb. Whichever one you run first depends on your specific audio - test both orders on a short clip if the reverb is heavy.

## 4. Background Noise Removal

- **DeNoise by aufr33 and gabox** - [Open preset on MVSep](https://mvsep.com/home?sep_type=47&add_opt1=1)
  - A specialized community Mel-Roformer denoising model designed to clean hiss, static, and residual artifacts without dulling high frequencies.
  - **Recommendation**: use this as your **final step** to polish the audio and ensure it is clean. *(Keep in mind it can occasionally miss certain types of noise, so always verify the final WAV by ear.)*

## 5. Experimental & Miscellaneous

- **DeEffect** - [Open preset on MVSep](https://mvsep.com/en/home?sep_type=47&add_opt1=1)
  - Removes heavy vocal modulation effects and reverb, and can even act as a fallback instead of a dedicated lead/reverb pass or remove some background noise.
  - **Warning**: **do not rely on DeEffect for anything other than removing voice effects and reverb** - use the dedicated models above for vocal/SFX splitting and final denoising.

## Suggested step-by-step workflow

1. **Extract Vocals / Speech**: run **BS Polarformer** (and optionally **MVSep DnR v3** if SFX remain).
2. **Isolate Lead Vocal** *(songs with harmonies only)*: run **MVSep Karaoke**.
3. **Remove Reverb**: run **DeReverb Stereo** and **DeReverb Room** (plus **DeEffect** only if heavy vocal effects/reverb persist).
4. **Final Clean**: finish with **DeNoise by aufr33 and gabox** and download the **WAV** result.
