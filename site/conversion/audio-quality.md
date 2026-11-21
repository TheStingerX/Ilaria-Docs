# Improve RVC Inference Audio Quality

[Download Ilaria RVC 2.4.7 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

In RVC voice conversion, **audio quality** depends on two halves working together: the **source recording** you feed in and the **model + inference settings** you apply. In pitch-guided RVC models, conversion synthesizes the target voice's timbre using the F0 contour extracted from your source recording; the target voice does not automatically impose its own pitch range (results still depend on the model's training data and range limits). RVC **cannot** repair clipping, heavy background music, room echo, or slurred diction already present in the input file.

## Start with a concrete diagnostic baseline

Before changing advanced sliders, run one diagnostic conversion in **Ilaria RVC**. This helps you assess the selected model without FAISS feature retrieval or optional audio effects; the default Volume Envelope handling still applies.

1. Open the **Inference** tab.
2. Select your target voice in **Voice Model** (click **Refresh** if you just added it).
3. Stay on the **Single Inference** sub-tab.
4. Load your recording in **Audio to convert**. *(A short excerpt can help isolate a specific timestamp faster, but short clips are never a requirement.)*
5. Set **Pitch** to `0`.
6. Under **Inference Settings**, select **RMVPE** in **Pitch Extraction**.
7. Set **Index Ratio** to `0` (disables FAISS feature retrieval so you hear the `.pth` generator without index blending).
8. Leave all optional **Audio Processing** checkboxes (**Split Audio**, **Autotune**, **Proposed Pitch**, **Clean Audio**, **Formant Shifting**, **Post-Process**) and **RMVPE High Register** turned **OFF**.
9. Click **Convert**.
10. Listen to **Output Audio** and read **Output Log** for conversion status, timing information, and available index or embedder details. These messages do not necessarily confirm that FAISS retrieval completed successfully (an index can be selected and reported as enabled in settings while FAISS loading fails or is skipped, and `Embedder` may not be printed explicitly when `Auto (model default)` is selected). Check the console diagnostics if index loading fails or the result is unexpected.

> **Diagnostic baseline only:** This setup disables FAISS retrieval and optional audio effects, but it does not bypass the normal RVC processing pipeline or its default **Volume Envelope** value (`0.25`). It is not a guarantee of optimal final quality. If you need to compare the generator output without source-RMS envelope matching, set **Volume Envelope** to `1` as a separate test. Change one control at a time and compare at similar listening levels.

---

## A. Getting a Clean Conversion

- **Source audio & isolated vocals:** RVC expects a single, dry, clean vocal. Tools such as [UVR5](../non-rvc/uvr5/overview.md) or [MVSep](../non-rvc/mvsep/overview.md) can help separate vocals from backing tracks, and specialized models target tasks like denoising, dereverberation, de-essing, or audio restoration depending on the model used (no single tool removes every type of noise or reverb).
- **Speech vs. singing:** Speech often tolerates small **Pitch** adjustments, whereas singing over an instrumental track usually keeps **Pitch** at `0` to stay in key with the backing track (a non-octave transposition may be appropriate if the accompaniment's key is also changed).
- **Model & embedder compatibility:** Leave **Embedder Model** on `Auto (model default)` unless you intentionally trained or downloaded a model requiring a specific encoder (`contentvec`, `spin-v2`, `klm-vocal-contentvec`, etc.). Using an incompatible embedder can cause an error or degrade conversion quality and break index matching.
- **Non-pitch-guided (`if_f0 == 0`) vs. pitch-guided (`if_f0 == 1`) models:**
  - **Non-pitch-guided models (`if_f0 == 0`):** Skip F0 extraction (`pitch` and `pitchf` are not passed to the `.pth` generator). Because there is no F0 conditioning, **Pitch**, **Pitch Extraction**, **RMVPE High Register**, **Autotune**, **Proposed Pitch**, and **Protect** (hidden in the UI when `if_f0 == 0`) do not apply. **Embedder**, **Index Ratio**, **Formant Shifting**, **Volume Envelope**, **Clean Audio**, and **Post-Process** (including **Post-Process → Pitch Shift**) still run normally.
  - **Pitch-guided models (`if_f0 == 1`):** Extract an F0 contour from the `16 kHz` input and pass it to the `.pth` generator alongside the content features. **Pitch Extraction**, **Pitch**, **RMVPE High Register**, **Autotune**, **Proposed Pitch**, and **Protect** (when `Index Ratio > 0` and `protect < 0.5`) are all active, making these models suitable for singing and pitch-controlled speech.
- **Optional index & lossless export:** Keep **Index Ratio** at `0` for your baseline, then test your matching `added_*.index` if desired. Use `wav` or `flac` for lossless exports; `flac` reduces file size without lossy audio compression. `mp3`, `ogg`, and `m4a` use lossy encoding in the current Ilaria RVC exporter, and the export format never adds detail that the model did not produce.

---

## B. Fixing Pitch and Singing Problems

- **Pitch (Semitones):** Pitch changes the extracted F0 contour by semitones (`-24` to `+24`; `12` semitones = 1 octave). At `0`, pitch-guided conversion follows the source pitch without an additional transposition. Choose a different value only when needed for the target performance or musical arrangement (for singing, a non-octave transposition may be appropriate if the accompaniment's key is also changed). There is no universal pitch shift for converting between different voice types. Requires a pitch-guided model (`if_f0 == 1`).
- **Pitch Extraction (F0) in Ilaria RVC:** Estimates fundamental frequency (F0) from the `16 kHz` input before synthesis (separate from **Pitch** shifting).
  - **Single & Batch Inference (standard, non-DirectML backend):** `rmvpe` (default), `swift`, `beatrice`, `fcpe`, `parselmouth`, `harvest`, `crepe`. These options do not all run on CUDA: for example, `swift` uses ONNX Runtime on the CPU in the current implementation. *(On DirectML builds: `pm`, `harvest`, `rmvpe`, `fcpe`.)*
  - **Training feature extraction only:** Includes `rmvpe_gpu` (and `dio`); `rmvpe_gpu` is **not** a separate button in Inference.
  - **Median filter (Harvest only):** `filter_radius` values `0–2` disable the optional median filter. Values `3–7` all enable the same three-sample median filter; increasing from `3` to `7` does **not** increase its strength. The UI default is `3`.
  - *Note:* If `rmvpe` produces an octave jump on a specific note, test `fcpe`, `swift`, `beatrice`, or `crepe` on that same passage rather than assuming one method is universally "best" or fastest for every voice.
- **RMVPE High Register** *(visible only when `rmvpe` is selected)*:
  - **Enable high register:** Enables secondary octave-error correction for very high singing notes. Do **not** leave it enabled by default for normal speech or mid-range singing.
  - **Mode (`true_pitch` / `fold`):** `true_pitch` keeps corrected F0 up to **Maximum F0 (Hz)** (`1000–2000`, default `1250`); `fold` keeps corrected notes an octave lower.
  - **Advanced (`Activation threshold` `800–1500` Hz default `1040`, `Sensitivity`, `Minimum note duration` `0–300` ms default `60`):** Tunes when high-register correction triggers.
  - **Preview original and corrected F0:** Plots the first 30 seconds of estimated vs. corrected F0 without running full voice conversion. A cleaner plot helps diagnose octave flips, but does not automatically guarantee better sounding audio.
- **Autotune & Autotune Strength (`0–1`, default `1.0`):** Snaps voiced F0 frames toward the nearest equal-tempered chromatic note (`G1`–`C6`), scaled by **Autotune Strength**. Because it pulls toward *every* chromatic semitone (there is **no** musical key/scale selector in Ilaria RVC), high strength can flatten natural vibrato or expressive pitch slides.
- **Proposed Pitch & Target Pitch (Hz) (`50–1200`, default `155`):** Computes the median of interpolated voiced F0 frames across the source audio and adds an automatic semitone offset (`-12` to `+12`) toward **Target Pitch (Hz)** on top of your **Pitch** slider. Useful as a quick transposition test, though the mathematically centered pitch is not always the best musical or vocal fit. Both **Autotune** and **Proposed Pitch** require a pitch-guided (`if_f0 == 1`) model.

---

## C. Fixing Voice Identity and Timbre

- **Content Embedder vs. Voice Generator (`.pth`):** The trained `.pth` generator produces the target voice, while the content embedder (default `Auto (model default)`, typically `contentvec`) extracts speech features from the source recording. The embedder is intended to reduce source speaker-identity information, though it is not necessarily completely speaker-independent, and it does not define the target voice identity. Use the embedder expected by the model to preserve compatibility and avoid conversion artifacts. Chinese, Japanese, Korean, and Portuguese HuBERT Base embedders require an **RVC v2** model.
- **How `Index Ratio` (`0–1`, default `0`) actually works:** A `.pth` generator is **always** used regardless of Index Ratio. When an `added_*.index` FAISS database is loaded and `Index Ratio > 0`, RVC searches the 8 nearest feature vectors in the index and blends them with your input's extracted features *before* the `.pth` generator:
  `features = retrieved_features * index_rate + original_features * (1 - index_rate)`
  - **`Index Ratio = 0`** disables FAISS feature retrieval (`original_features` only) while the `.pth` generator remains active, providing a useful diagnostic baseline without FAISS feature retrieval.
  - **Index Selected vs. Retrieval Applied:** If `Index Ratio > 0` but the selected index file is missing, **Output Log** reports `Voice index: off (no index file found)`. If the file exists but FAISS cannot load it, the backend catches the loading error and proceeds without retrieval, although **Output Log** can still say `Voice index setting: enabled`. Check the console traceback when a seemingly enabled index produces unexpected results.
  - **Increasing Index Ratio** pulls features closer to the index's stored feature vectors. A matching index can improve some conversions, but it can also worsen results (for example, muffled diction or dataset artifacts) depending on the audio and model. No single value guarantees better pronunciation.
- **Formant Shifting (`apply_formant_shift`, `0.7–1.4`, default `1.0`):** Uses Praat/Parselmouth (`Change gender`) **before** RVC synthesis on the `16 kHz` input to shift vocal tract resonances. `1.0` is neutral; values below `1.0` aim to darken/deepen vowel resonance, while values above `1.0` aim to brighten it. The algorithm aims to preserve pitch and duration, though artifacts can still appear, especially at extreme values. **Formant Shifting** is not equivalent to changing **Pitch** or **Post-Process → Pitch Shift** (which shifts output pitch post-RVC).

---

## D. Fixing Consonants and Breathing

- **How `Protect clear consonants and breathing sounds` (`0–0.5`, default `0.33`) works:**
  - In the inference pipeline (`vc()`), when `protect < 0.5` **and** the model uses pitch guidance (`if_f0 == 1`), RVC saves a copy of the original un-blended features (`feats0`) *before* FAISS index retrieval.
  - After retrieval, **unvoiced frames (frames with no detected F0, `pitchf < 1`)** are blended back toward `feats0`: lower values move those frames closer to `feats0`, while **`0.5` disables protection**. This is not a general adjustment for low-pitched voiced speech.
  - **Critical limitation:** Because `Protect` blends back to `feats0` (the pre-retrieval features), **when `Index Ratio = 0`, `feats` and `feats0` are identical**, so changing `Protect` produces little to no difference. Furthermore, `Protect` is not an audio denoiser or restoration filter and cannot fix clipped or distorted consonants already present in the source audio or model.

---

## E. Fixing Volume, Noise and Distortion

- **Volume Envelope (`0=Input source volume, 1=Normalized Output`, default `0.25`):** Uses `change_rms()` to blend the RMS amplitude envelope of the input audio (`1 - rate`) with the RVC output's RMS envelope (`rate`).
  - `0` makes the converted audio follow the **source audio's RMS envelope** closely.
  - `1` keeps the **RVC generator's own output RMS envelope**.
  - Note: Despite the UI label, `1` does **not** normalize to a fixed LUFS loudness target and is **not** a compressor or limiter. Changing `Volume Envelope` adjusts dynamic level matching, which can help when silent gaps or level differences cause pumping.
- **Clean Audio & Clean Strength (`0–1`, default `0.5`):** Runs `noisereduce` **after** RVC conversion on the converted audio, with **Clean Strength** controlling reduction intensity. Depending on the recording and noise present, overly aggressive reduction can alter consonants, breaths, and vocal details; there is no universally correct threshold. `Clean Audio` is post-processing noise reduction, not audio restoration: it cannot repair clipping or fix a poorly trained model.
- **Post-Process Effects** *(applied after conversion via FFmpeg/librosa; leave OFF for baseline testing)*:
  - `Pitch Shift (-12..+12)`: Post-RVC librosa pitch shift (alters the finished audio rather than the RVC F0 contour).
  - `Limiter (-24..0 dBFS, default -6)` & `Gain (-24..+24 dB)`: In the current FFmpeg filter chain (`ilaria_inference_effects.py`), **Limiter** runs **before** **Gain** when both are enabled. Because `Gain` is applied after `Limiter`, positive `Gain` can push peaks back into clipping; `Limiter` does not guarantee clipping-free final output when positive `Gain` follows it.
  - Creative/utility effects: `Reverb`, `Distortion`, `Chorus`, `Bitcrush`, `Clipping`, `Compressor`, `Delay`.
- **Resampling (`0–48000`, `0=none`) & Export Format:** Leave `0` to keep the model's native sample rate (`32k`/`40k`/`48k`). In this backend, resampling occurs only when the requested rate is **at least `16000` Hz** and **different from the model's output sample rate**; selecting a nonzero value below `16000` does not trigger resampling. Set `44100` or `48000` only if your DAW/project requires that output rate (resampling changes sample rate, not underlying synthesis quality). Use `wav` or `flac` for lossless exports during quality checks.

---

## F. Long Recordings and Batch Inference

- **Split Audio:** Calls `silence_split_points()` to insert frame-aligned cut points inside quiet pauses while retaining RVC's normal long-audio cuts (`opt_ts`). This changes the segment sizes passed to synthesis and can alter behavior at join boundaries. It does **not** necessarily avoid loading the full audio into memory, does **not** eliminate all causes of excessive memory usage, and is **not** a fix for volume, distortion, or voice quality.
- **Single vs. Batch Inference:** Both tabs expose the same core settings (`Pitch`, `Pitch Extraction`, `Index Ratio`, `Resampling`, `Volume Envelope`, `Protect`, `Export Format`, `Audio Processing`, `Embedder Settings`, and `RMVPE High Register`). Use **Single Inference** to dial in settings on one file with immediate playback; use **Batch Inference** (`InferOutput/` or chosen folder) once settings are verified to convert multiple files in one pass.

---

## Diagnostic Troubleshooting Matrix

| Symptom | Possible Causes | Check First | Adjustment to Try | Expected Result | If It Does Not Work |
| --- | --- | --- | --- | --- | --- |
| **Voice too high / too bright** | **Pitch** shifted too high, **Proposed Pitch** offset, high **Formant Ratio**, or model trained on higher range | Check **Pitch**, **Proposed Pitch**, and **Formant Shifting** | Set **Pitch** to `0` (or lower if needed) and turn **Proposed Pitch** & **Formant Shifting** OFF | F0 follows source without extra upward shift | Distinguish F0 height from resonance: test a small **Formant Ratio** change below `1.0` (optional example: `0.9`) or check model range limits |
| **Voice too deep / muffled** | **Pitch** shifted too low, **Formant Ratio < 1.0**, or model/index mismatch | Check **Pitch**, **Formant Shifting**, and **Index Ratio** | Set **Pitch** to `0` (or raise if needed) and turn **Formant Shifting** OFF | Clearer mid/high presence without downward shift | Test **Index Ratio = 0** to isolate `.pth` clarity, or test a small **Formant Ratio** change above `1.0` (optional example: `1.1`) |
| **Metallic / brittle timbre** | Over-applied or mismatched **Index Ratio**, **Clean Audio**, or **Autotune** | Check active **Audio Processing** and **Output Log** | Set **Index Ratio = 0**, disable **Clean Audio** & **Autotune** | Isolates core `.pth` timbre | Test another F0 extractor (`fcpe`, `swift`, `beatrice`, or `crepe`) |
| **Weak target voice identity** | Wrong `.pth` model, embedder mismatch, incompatible/missing index, source limitations, or model training limits | Verify **Voice Model**, **Embedder Model**, source quality, and console/log index status | Confirm the intended `.pth` model and matching `added_*.index` (test `Index Ratio > 0` if compatible) | Clearer target timbre if model and index match | Check `Model information` for embedder compatibility and test on a cleaner dry recording |
| **Too close to source speaker** | Model/embedder mismatch, speaker leakage in source/embedder, or wide pitch-range gap | Compare source recording against model's expected embedder and training range | Set **Embedder Model** to `Auto (model default)` and test compatible `added_*.index` if available | Stronger separation from source speaker | Adjust **Pitch** only if needed for the target performance, or test another voice model |
| **Slurred / ruined consonants** | Over-applied or mismatched **Index Ratio**, **Protect** disabled (`0.5`), or unclear source diction | Check **Index Ratio** and **Protect** (`0.5` = off; default `0.33`) | Lower **Index Ratio** (or test `0`) and set **Protect** below `0.5` when using an index on a pitch-guided model | Preserves unvoiced source features (`feats0`) better during index blending | Check dry source diction; `Protect` cannot fix slurred or clipped input consonants |
| **Harsh sibilants (`s`/`sh`)** | Bright source mic, high **Formant Ratio**, or **Post-Process** distortion | Listen to dry source audio in Audio Analyzer | Turn **Formant Shifting** and **Post-Process** OFF; test **Index Ratio = 0** | Smoother `s`/`sh` transients | De-ess the dry source recording before running RVC |
| **Distorted or missing breaths** | Source gating/noise, model training limits, **Volume Envelope**, or post-conversion **Clean Audio** | Compare dry source breaths against converted audio | Turn **Clean Audio** OFF and test **Volume Envelope** (e.g. `0` vs `0.25` default) | Breaths follow source dynamics more closely | Lower **Index Ratio** (or set `0`) if index retrieval pulls noisy frames |
| **Octave jumps on held notes** | F0 tracker misreading harmonics or very high notes | Check waveform/pitch in **Audio Analyzer** | Switch **RMVPE** / **FCPE** / **Swift** / **CREPE**, or test **RMVPE High Register** | Steadier F0 tracking on held notes | Check source stem for instrumental or harmony bleed |
| **Unnatural vibrato / flat slides** | **Autotune** enabled on expressive singing | Check **Audio Processing → Autotune** | Turn **Autotune** OFF or lower **Autotune Strength** (e.g. test `0.3` as an optional example) | Natural vibrato and slides return | Compare **RMVPE** vs **CREPE** F0 smoothness |
| **Unstable / warbling pitch** | Noisy/reverberant source or inaccurate F0 tracking | Listen to the isolated source and check the selected pitch extractor | Try **RMVPE** or another supported extractor; use suitable source cleanup only if needed | More stable pitch tracking may result | If using **Harvest**, check whether the median filter is enabled (`0–2`: off; `3–7`: the same three-sample filter; default `3`). Increasing beyond `3` does not strengthen filtering. |
| **Robotic / vocoder-like voice** | Wrong **Embedder**, `v1`/`v2` mismatch (which can also trigger a conversion error), or severe F0 errors | Check **Output Log** and console for embedder/F0 warnings | Set **Embedder Model** to `Auto (model default)` and verify **RMVPE** | Natural vocal synthesis | Test on a cleaner, dry source recording |
| **Background hiss / denoising artifacts** | **Clean Audio** too strong or noisy source recording | Compare with **Clean Audio** OFF | Turn **Clean Audio** OFF or reduce **Clean Strength** | Fewer watery denoising artifacts | Apply dedicated denoising/dereverberation *before* RVC |
| **Clipping / harsh distortion** | Clipping already in source audio, inference clipping, positive **Gain** (even after **Limiter**), **Distortion/Clipping** FX, or export clipping | Inspect where distortion first appears (dry source vs. output in **Audio Analyzer**) | Turn **Post-Process** OFF (especially positive **Gain** after **Limiter**) | Stops post-RVC clipping | Lowering volume on already-clipped audio does **not** reconstruct missing samples; re-record or use an unclipped source |
| **Uneven / pumping volume** | **Volume Envelope** mismatch with source dynamics | Compare **Volume Envelope** `0` vs `0.25` (default) vs `1.0` | Adjust **Volume Envelope** toward `0` (source RMS) or `1.0` (model RMS) | More consistent phrase loudness | Apply gentle **Compressor** / **Limiter** (without positive **Gain** after it) only if needed |
| **Resampling / export / batch errors** | Unsupported or ineffective `Resampling` setting, missing FFmpeg (needed for `mp3`/`ogg`/`m4a` export and several **Post-Process** effects), or invalid folder path | Read exact message in **Output Log** and console | Set `Resampling = 0`, export `wav` or `flac`, and verify input/output paths | The export may complete after the actual cause is corrected | Run `RUN_ILARIA_RVC_LOGS.bat` to inspect the full traceback |

## Related guides

- [Single and batch inference](../ilaria-rvc/convert/inference.md) · [Inference controls](../ilaria-rvc/convert/inference-buttons.md) · [Advanced inference](../ilaria-rvc/convert/advanced-inference.md)
- [Index files (.index)](../start/indexes.md) · [Pitch extractors](../start/pitch-extractors.md) · [Embedders](../start/embedders.md) · [Audio Analyzer](../ilaria-rvc/manage/audio-analyzer.md)
