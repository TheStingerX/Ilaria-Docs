---
label: "Single and batch inference"
icon: ":studio_microphone:"
order: 97
permalink: /ilaria-rvc/inference/
description: "Open Single Inference, choose a voice and load a short, dry clip. Set Pitch and Index Ratio to zero."
---
# Single and batch inference

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · RefineGAN training and inference support 32, 40 and 44.1 kHz with RVC v2 and Pitch Guidance. The app automatically generates the 44.1 kHz mute waveform. Choose **None** to train from scratch if a pretrained pair uses a different architecture, including the tested KLM 5 (40 kHz) and VCTK (44.1 kHz) pairs.

[Download Ilaria RVC 2.4.7 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

[Inference controls](inference-buttons.md)

## Establish a reference

Open **Single Inference**, choose a voice and load a short, dry clip. Set **Pitch** and **Index Ratio** to zero. Use the embedder expected by the model, start with RMVPE, and leave optional effects off. Save a WAV and compare it with your input at matching loudness.

## Tune in separate passes

If a matching index is available, raise retrieval in small increments. Listen for clearer voice character and possible muffling. Lower **Protect** to give consonants and breaths more protection in pitch-guided conversion. The effect depends on retrieval, which contributes only above zero. Compare pitch settings separately.

## Process multiple files

In **Batch Inference**, group recordings by model and pitch setting. Use a separate destination folder. Run one representative clip first, then check the batch log and listen to a result from each group.
