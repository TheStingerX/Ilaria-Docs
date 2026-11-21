---
label: "Inference controls explained"
icon: ":control_knobs:"
order: 81
permalink: /ilaria-rvc/inference-buttons/
description: "Inference uses a trained voice to convert a recording. For a first test, upload a short clean WAV, select a voice, leave Pitch at zero and keep optional features off."
---

# Every Inference control explained

[Download Ilaria RVC 2.4.7 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Inference uses a trained voice to convert a recording. For a first test, upload a short clean WAV, select a voice, leave Pitch at zero and keep optional features off. Compare the input and output before changing one value.

> **What’s new in 2.3.0** · [RMVPE High Register](advanced-inference.md#rmvpe-high-register)

## Voice, audio and output

| Control | What it does |
| --- | --- |
| `Voice Model` | Loads the selected inference export. Choose the intended voice after importing. A G or D training checkpoint is for continuing training. |
| `Refresh` | Scans the model library again. Check the selected voice afterward. |
| `Unload Voice from VRAM` | Releases the loaded voice from GPU memory. Use it to free memory for another task. |
| `Audio to convert` | Chooses the source recording. Use a dry vocal rather than a mix with instruments for a clean test. |
| `Pitch` | Changes the pitch by semitones, from −24 to +24. Zero preserves the source register. Twelve semitones is an octave. |
| `Convert` | Starts the job. Read Output Log and listen to Output Audio. Save the output from the player when available. |
| `Audio folder` and `Output` in Batch Inference | Choose the input folder and destination for multiple files. Test one representative file first and use a separate output folder. |

## Inference Settings

| Control | What it does and how to test it |
| --- | --- |
| `Speaker ID` | Chooses a voice slot supported by the model. Use the default for a normal single-voice model. |
| `Pitch Extraction` | Estimates the source pitch. Start with RMVPE and compare another available method only if notes jump or the contour sounds unstable. |
| `Path of index` and `Auto-detect index path` | Select a matching optional index by path or from the detected list. Check that it belongs to this model and encoder. |
| `Index Ratio` | Mixes retrieved features into conversion. Zero turns retrieval off. Increase gradually with a matching index and compare the same phrase. |
| `Resampling, 0=none` | Changes the output audio rate. Zero keeps the model’s output rate. Resampling cannot restore missing detail. |
| `Input source volume / Normalized Output` | Blends the source and converted loudness envelopes. Near zero follows the source dynamics more closely. A setting of one leaves the converted envelope in place. |
| `Protect clear consonants and breathing sounds` | Reduces the impact of retrieval on unvoiced sounds in pitch-guided conversion. Lower values strengthen protection; 0.5 turns it off. Its effect can be limited with retrieval disabled. |
| `Median filter` | Smooths Harvest pitch estimation when the displayed threshold is enabled. Start with the default and test it only when troubleshooting Harvest. |
| `Export Format` | WAV and FLAC are lossless. MP3, OGG and M4A can save space for delivery. Use WAV for your first comparison. |
| `F0 curve file` | Advanced input for a custom pitch curve in builds that expose it. Leave empty for everyday conversion. |

## Audio Processing and Embedder Settings

- **Split Audio** processes sections separated by quiet passages. Try it for long inputs and listen across the joins.
- **Autotune** moves voiced notes toward nearby chromatic notes. **Autotune Strength** controls how strongly it does so. Start with it off.
- **Proposed Pitch** uses the median voiced pitch and **Target Pitch (Hz)** to estimate a shift. Try it on a representative short clip.
- **Clean Audio** applies noise reduction after conversion. **Clean Strength** controls its intensity. Compare with the unprocessed output for damaged breaths or sibilants.
- **Formant Shifting** changes resonance before conversion. A **Formant Ratio** of 1 keeps the baseline. Listen to the same vowels while testing.
- **Post-Process** runs the selected **Effects** on the converted audio. **Post Pitch Shift** adjusts output pitch, **Gain** changes level and **Limiter Threshold** controls where the limiter starts acting. Use one effect at a time when diagnosing an issue.
- **Embedder Model** selects the content encoder. Auto uses the model information where available. **Custom Embedder** accepts the corresponding .bin weights and .json configuration. Give it a Folder Name, click **Install custom embedder**, check Embedder Import Status and use **Refresh embedders** if needed. Select the encoder the voice was trained with before testing its index.

If your release exposes **TTS**, try a short sentence first. Choose Edge for an online voice or an available Windows voice for offline synthesis, select the language and voice, and preview the result. Adjust rate, volume or source pitch only where supported. If pronunciation is wrong before conversion, fix the source speech first. See [Text to speech](speech.md).


> **2.2.1** · The shared waveform player has a playback volume slider for inputs, results and previews. Use it to listen more quietly or compare clips at similar levels. It adjusts playback only. To change the level of the converted file, adjust Gain in Post-Process and convert again.
