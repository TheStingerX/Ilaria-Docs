---
label: "Overview"
icon: ":speaker:"
order: 99
permalink: /non-rvc/ilaria-audio-upscaler/overview/
---

# Ilaria Audio Upscaler

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [V2](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v2)

## Choose an engine

Ilaria Audio Upscaler processes recordings locally on Windows. Choose **Sidon** for speech affected by noise, room reflections or compression. Choose **AP-BWE** for speech that is reasonably clean but sounds bandwidth-limited, such as a telephone recording. Both are designed for speech. Compare against the original before using the result in a voice dataset.

## Apollo

**Apollo** restores music affected by lossy compression at **44.1 kHz**, on CPU or NVIDIA CUDA. Start with a short excerpt that contains cymbals or other bright sounds. Select **Apollo**, download its weights if prompted, then add the file and click **Enhance audio**. Compare the original and result at **1×** before using **Save result**. Keep the original to compare changes in tone and transients.

[Apollo](https://github.com/JusperLee/Apollo)

## First test

Keep the source file. Process a short passage using one engine and export WAV. Compare the two at similar listening levels, paying attention to consonants, pauses and changes in timbre. The higher frequencies are synthesized from the available signal. A 48 kHz output does not recover the exact original waveform.

[Installation and models](installation.md) · [Restore speech with Sidon](sidon.md) · [Extend speech bandwidth with AP-BWE](ap-bwe.md) · [Preview, export and troubleshooting](export.md)

## Sources

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [Sidon](https://github.com/sarulab-speech/Sidon) · [AP-BWE](https://github.com/yxlu-0102/AP-BWE)
