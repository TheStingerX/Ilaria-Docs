# Audio Analyzer

[Download Ilaria RVC 2.4.7 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Open **Other → Audio Analyzer**. Add up to eight audio files to compare. A useful set contains the original input, a baseline conversion, and one or two variants made with a single changed setting.

## What each view measures

| View | What it directly shows | Question to answer |
| --- | --- | --- |
| **Waveform** | Amplitude over time | Where are loud peaks, flat-topped clipping, quiet passages, or abrupt joins? |
| **Spectrogram** | Frequency energy over time | Which frequencies are present at the exact moment hiss, buzz, or an artifact starts? |
| **Average spectrum** | Overall frequency balance | Does one version sound noticeably brighter, duller, or have a persistent resonance? |
| **Pitch estimation** | Estimated F0 contour over voiced segments | Does the converted pitch follow the intended melody/inflection without octave jumps? |
| **Level & silence tables** | Measured loudness/peak levels and silence segments | Are you comparing files at similar volumes and using the same silence threshold? |

> **What Audio Analyzer measures vs. what it suggests:** Audio Analyzer directly plots and measures signal levels, silence intervals, spectral energy, and estimated F0 contours. It does **not** automatically diagnose "good" vs. "bad" voice timbre on its own. Always **listen to the selected region** in the built-in player before treating a visual difference as a problem.

## Practical examples: what to look for

- **Clipping:** Flat-topped peaks hitting the maximum amplitude in the **Waveform** (often heard as harsh crackle). Lower input gain or normalize the source before training or conversion.
- **Background noise / hiss:** A constant horizontal band or bright floor across mid/high frequencies in the **Spectrogram** during pauses. Clean the source with UVR5 or MVSep before training.
- **Excessive silence or dead gaps:** Long flat sections in the **Waveform** and high silence ratios in the **Level and silence tables**. Trim long pauses in datasets so training does not waste steps on silence.
- **Too quiet / too loud volume:** Very thin waveform amplitude (risks noisy amplification) or near-max peaks. Check the **Level and silence tables** so A/B comparisons are judged at matched loudness.
- **Distortion & reverb:** Blurry, smeared horizontal tails extending after words end in the **Spectrogram** indicate room reverb; harsh vertical spikes or smeared harmonics suggest distortion or over-processing.
- **Dataset quality check:** Inspect raw source clips *before* training, then compare the same phrase across checkpoints. When pitch estimation looks erratic during breaths or unvoiced consonants (`s`, `f`, `t`), listen first: unvoiced sounds naturally have no stable pitch.

## Comparison tips & exports

Choose a matching time range and channel view, and keep the same **FFT window**, frequency scale, and silence threshold across comparisons. A larger FFT window improves frequency detail while smoothing fast time events. Export **CSV** or **JSON** for numeric measurements, or a **ZIP with charts** for later review.
