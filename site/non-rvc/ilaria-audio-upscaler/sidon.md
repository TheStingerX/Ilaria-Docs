# Restore speech with Sidon

## Restore a recording

Choose **Sidon**, download **Sidon INT8**, add a short noisy or reverberant clip, select **WAV (PCM)** and run **Enhance audio**. Listen for quieter pauses and clearer words. Also check breaths, soft consonants and whether a speaker’s timbre has changed. Keep the original if restoration removes details you need.

## How Sidon works in the app

The app resamples the input to 16 kHz for feature extraction. The Sidon ONNX predictor estimates clean speech features and the DAC decoder synthesizes audio at 48 kHz. The app processes each channel separately in segments of about six seconds with surrounding context, then applies a fixed FFmpeg denoising filter. INT8 denotes quantized model weights. It does not set the output bit depth.

[Overview](overview.md) · [Installation and models](installation.md) · [Extend speech bandwidth with AP-BWE](ap-bwe.md) · [Preview, export and troubleshooting](export.md)

## Sources

[Sidon](https://github.com/sarulab-speech/Sidon) · [Sidon-ONNX](https://huggingface.co/soniqo/Sidon-ONNX) · [Speech Core](https://github.com/soniqo/speech-core) · [studio_sidon.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio_sidon.py)
