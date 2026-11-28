---
label: "Preview, export and troubleshooting"
icon: ":headphones:"
order: 94
permalink: /non-rvc/ilaria-audio-upscaler/export/
---

# Preview, export and troubleshooting

## Preview and save

Add one or more files, choose a format and run **Enhance audio**. Compare the original and enhanced audio in the player at **1×**. **Speed** changes playback only. Select the enhanced result and click **Save result** to store it permanently. Unsaved previews are temporary. Start with WAV or FLAC for further editing. WAV export defaults to **24-bit PCM**. Choose **WAV (PCM 16-bit)** when the receiving app requires it. Bit depth affects how the result is stored. It cannot restore information already lost in the source.

## Common problems

**Model missing:** Download the checkpoint for the engine and profile currently selected. **CUDA fails:** Try **CPU** with a short WAV to separate a device issue from an input issue. **Audio will not open or export:** Test a known-good WAV and check FFmpeg, free space and write permissions. **Slow processing:** Test a shorter clip on Auto or a supported CUDA GPU. **Output sounds worse:** Compare with the unprocessed source and switch engine or profile based on the type of damage.

**WAV (PCM 24-bit)** · **WAV (PCM 16-bit)** · **FLAC** · **MP3** · **M4A (AAC)** · **M4A (ALAC)** · **AAC (ADTS)** · **OGG (Vorbis)** · **Opus** · **AIFF (PCM)** · **WavPack** · **WMA**

[Overview](overview.md) · [Installation and models](installation.md) · [Restore speech with Sidon](sidon.md) · [Extend speech bandwidth with AP-BWE](ap-bwe.md)

## Sources

[studio.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio.py) · [studio_formats.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio_formats.py)
