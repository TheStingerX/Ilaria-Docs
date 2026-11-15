---
label: "🎛️ Processing and export"
order: 89
permalink: /ilaria-rvc/advanced-inference/
---
# Processing and export

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

RMVPE is the baseline pitch estimator. FCPE, Swift, Beatrice and Parselmouth are available where the selected operation supports them. Compare pitch methods on a narrow A/B test. The pitch method estimates F0, while the [embedder](embedders.md) extracts features that must fit the model.

## Export and compare

Select WAV or FLAC for editing and archival copies. MP3, OGG and M4A are smaller distribution options. The output player downloads the selected format. Batch also writes files to the chosen output directory. Check the first output and its name before processing many inputs.

The waveform player supports playback and seeking, including arrow-key jumps when focused. Very long, large or unsupported inputs may use the browser's standard player. For a useful A/B comparison, match volumes and listen to identical timestamps.
