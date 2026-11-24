# Processing and export

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · RefineGAN training and inference support 32, 40 and 44.1 kHz with RVC v2 and Pitch Guidance. The app automatically generates the 44.1 kHz mute waveform. Choose **None** to train from scratch if a pretrained pair uses a different architecture, including the tested KLM 5 (40 kHz) and VCTK (44.1 kHz) pairs.

[Download Ilaria RVC 2.4.7 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

> **What’s new in 2.3.0** · [RMVPE High Register](#rmvpe-high-register)

## RMVPE High Register

Open Inference Settings, select `rmvpe`, expand **RMVPE High Register** and turn on **Enable high register**. Use this when a very high sung note drops an octave or disappears from the detected pitch.

**Mode** starts at `true_pitch`, which uses the corrected pitch. `fold` keeps corrected high notes an octave lower. **Maximum F0** (1250 Hz by default) sets the ceiling. Under **Advanced**, **Activation threshold** (1040 Hz) sets where correction can start, **Sensitivity** starts on **Balanced**, and **Minimum note duration** (60 ms) limits correction to notes held long enough.

Upload a short clip with the problem and click **Preview original and corrected F0**. The plot compares pitch on the first 30 seconds. Then convert the same clip with the feature off and on, leaving all other settings unchanged, and listen for the note that was wrong.

## Establish a preset

Open **Inference Settings** for Single or Batch. Choose the model and check **Speaker ID** for a multi-speaker checkpoint. Zero is the usual slot for a single voice. Leave pitch at zero, retrieval at zero, and processing off for a first reference. A loaded index has no retrieval effect at zero. Turn on one option at a time and replay the same source phrase.

| Control | Where it acts | What to listen for |
| --- | --- | --- |
| Split Audio | Finds quiet places to split a recording while preserving timing. | Check joins, word endings, breaths and gaps. |
| Autotune | Moves voiced F0 toward nearby chromatic notes. Uses pitch guidance. | Compare exposed notes and vibrato. |
| Proposed Pitch | Uses a target frequency and the source median voiced pitch to estimate a limited shift. | Test the high and low ends of the performance before a full run. |
| Formant Shifting | Changes vocal resonance before conversion. A ratio of 1 keeps the baseline. | Compare vowels at the same pitch and listening level. |
| Clean Audio | Applies noise reduction after conversion. | Listen for watery tails or lost consonants. |
| Post-Process | Applies selected effects to the converted output. Gain, Pitch Shift and Limiter expose controls. | Compare level-matched with effects off. Keep a dry export for later editing. |

The inference **Post-Process** section applies effects to converted audio. Training's **Process Data** has its own per-slice level adjustment.

## Pitch and content extraction

RMVPE is the baseline pitch estimator. FCPE, Swift, Beatrice and Parselmouth are available where the selected operation supports them. Compare pitch methods on a narrow A/B test. The pitch method estimates F0, while the [embedder](../train/embedders.md) extracts features that must fit the model.

## Export and compare

Select WAV or FLAC for editing and archival copies. MP3, OGG and M4A are smaller distribution options. The output player downloads the selected format. Batch also writes files to the chosen output directory. Check the first output and its name before processing many inputs.

The waveform player supports playback and seeking, including arrow-key jumps when focused. Very long, large or unsupported inputs may use the browser's standard player. For a useful A/B comparison, match volumes and listen to identical timestamps.

> **2.2.1** · The shared waveform player has a playback volume slider for inputs, results and previews. Use it to listen more quietly or compare clips at similar levels. It adjusts playback only. To change the level of the converted file, adjust Gain in Post-Process and convert again.
