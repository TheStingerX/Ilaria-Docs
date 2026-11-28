# Restore music with Apollo

[GitHub · Apollo](https://github.com/JusperLee/Apollo) · [Ilaria Audio Upscaler V2](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v2)

## When to use it

Apollo is available in Ilaria Audio Upscaler V2. It processes music locally at **44.1 kHz** on CPU or NVIDIA CUDA. Try it on a low-bitrate MP3 with swishy cymbals or blurred transients. It estimates musical detail from the available signal. If you have a clean original, use that as your reference.

## First restoration

Choose **Apollo** in the engine selector. Use the model download button if needed. The download is about **63.5 MiB** and the app stores it in `App/checkpoints/Apollo`. Leave the device on **Auto**, add a short excerpt and select **Enhance audio**.

## Compare and save

Listen to the same few seconds at **1×** and similar volume. Check cymbal tails, consonants and drum attacks for harshness or distortion. If you prefer the result, choose **Save result**. WAV defaults to **24-bit PCM**. Use **WAV (PCM 16-bit)** when required by the destination.

## Troubleshooting

If the model is missing, select Apollo before downloading it. If CUDA fails, select **CPU** and retry with a short WAV. If the result sounds worse, keep the original or try a cleaner copy of the source.
