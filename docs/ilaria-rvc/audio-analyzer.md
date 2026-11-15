---
label: "📈 Audio Analyzer"
order: 85
permalink: /ilaria-rvc/audio-analyzer/
---
# Audio Analyzer

Open **Other → Audio Analyzer**. Add up to eight audio files to compare. A useful set contains the original input, a baseline conversion and one or two variants made with one changed setting.

| View | Question to answer |
| --- | --- |
| Waveform | Where are loud peaks, quiet passages or abrupt joins? |
| Spectrogram | Which frequencies are present at the time an artifact starts? |
| Average spectrum | Does one version have a persistent frequency imbalance? |
| Pitch estimation | Does the converted F0 follow the intended contour in voiced passages? |
| Level and silence tables | Are you comparing at similar volumes and using the same definition of silence? |

Choose a time range and channel view. Use the same FFT window, frequency scale and silence threshold in comparisons. A larger FFT window improves frequency resolution and smooths fast events in time. Listen to the selected region in the player before deciding whether a visible difference is a problem.

Export CSV or JSON for measurements, or a ZIP with charts for later review. If you want to diagnose a noisy dataset clip, check the unprocessed source first and compare the same interval in the export. When pitch results look odd in breaths or unvoiced consonants, listen to the audio before interpreting the estimate.
