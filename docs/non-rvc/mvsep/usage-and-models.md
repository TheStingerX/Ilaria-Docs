---
label: "Recommended Models & Presets"
icon: ":control_knobs:"
order: 97
permalink: /non-rvc/mvsep/usage-and-models/
description: "Below are the best MVSep presets for preparing ultra-clean vocal tracks (for RVC training, covers, or voice conversion), complete with direct links that pre-select the exact separation algorithm and options for you."
---
# MVSep Guide: Recommended Models & Presets

Below are the best MVSep presets for preparing ultra-clean vocal tracks (for RVC training, covers, or voice conversion), complete with **direct links** that pre-select the exact separation algorithm and options for you.

## 1. Vocals and SFX Removal

Start with [MelBand Roformer · becruily deux](https://mvsep.com/home?sep_type=48&add_opt1=11) to separate vocals from the instrumental. Compare with **BS Polarformer** if you hear instrumental bleed or missing syllables. For dialogue with sound effects, try **MVSep DnR v3**.

[BS Polarformer](https://mvsep.com/home?sep_type=56&add_opt1=2&add_opt2=1&add_opt3=0) · [MVSep DnR v3](https://mvsep.com/home?sep_type=123&add_opt1=163)

## 2. Separating Lead and Back Vocals

For the **lead vocal**, try [BS Roformer · anvuew](https://mvsep.com/home?sep_type=49&add_opt1=7&add_opt2=0). For **backing vocals (BGV)**, start with [BS Roformer · frazer & becruily](https://mvsep.com/home?sep_type=49&add_opt1=5&add_opt2=0) and keep its backing-vocal output. Try both on the same short chorus and check for lead bleed in the harmonies or missing words in the lead.

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

1. **Extract Vocals / Speech**: Compare Deux and BS Polarformer for songs. Use DnR v3 for dialogue with sound effects.
2. **Isolate Lead Vocal** *(songs with harmonies only)*: Use anvuew for the lead and frazer & becruily for the backing vocals.
3. **Remove Reverb**: run **DeReverb Stereo** and **DeReverb Room** (plus **DeEffect** only if heavy vocal effects/reverb persist).
4. **Final Clean**: finish with **DeNoise by aufr33 and gabox** and download the **WAV** result.
