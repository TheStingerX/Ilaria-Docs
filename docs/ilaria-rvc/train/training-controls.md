---
label: "Training controls and workflow"
icon: ":gear:"
order: 87
permalink: /ilaria-rvc/training-controls/
description: "Version 2.1.0 offers 32, 40 and 48 kHz settings with available combinations determined by the vocoder. HiFi-GAN and RefineGAN have different constraints."
---
# Training controls and workflow

[Download Ilaria RVC 2.4.0 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

[Training controls](training-buttons.md)

> **What’s new in 2.3.0** · MRF HiFi-GAN is available for training and inference. The pretrained catalog adds 15 generator/discriminator pairs, including KLM 4.4 X1 and X2 at 40 kHz. Match the pair to your vocoder and sample rate. Portuguese HuBERT Base is an optional inference embedder. In RVC v2 Training you can upload and save a custom HuBERT embedder. The app selects it and carries its configuration into the exported model.

> **2.4.0** · The Windows package moves the app and runtime into app/ and voice models to the root models/ folder. Adds Colab and Lightning AI Studio notebooks, optional embedder download guidance in Training, and Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). The bundled runtime repairs pip and includes pywin32.

> **2.4.3** · Adds native **BF16** mixed-precision training, automatically selected on RTX 30, 40 and 50 series GPUs when supported (Kaggle T4 defaults to FP16). Manual FP16/FP32 choices are remembered, existing runs keep their saved precision, and the Training Queue and PC training advisor reflect the new precision options. Feature extraction stays in FP32.

## Four stages

| Stage | Inputs | Check before continuing |
| --- | --- | --- |
| Process Data | Dataset path, rate, experiment name and CPU threads | Import completed, usable audio was read, and logs belong to the intended experiment. |
| Feature Extraction | Prepared audio, pitch guidance, extractor and training embedder | The stage completed using the expected settings. |
| Train Pth | Features, G/D pair, target, GPU, batch and precision | Progress advances and the periodic checkpoints are written. |
| Train Feature Index | Extracted features and index algorithm | The generated index belongs to this run and can be paired with its inference export. |

## Architecture and performance

Version 2.1.0 offers 32, 40 and 48 kHz settings with available combinations determined by the vocoder. HiFi-GAN and RefineGAN have different constraints. Check the compatible pair before preprocessing. Pitch guidance controls whether F0 features condition the model. Configure CPU threads for the machine, and select a supported NVIDIA GPU for training. FP32 is the default in the checked UI. FP16 can reduce memory pressure on supported hardware. Batch size controls how many samples are processed together. If VRAM runs out, reduce the batch and disable optional caching.

**Silent training files** controls how many silent examples the app includes. Compare the same held-out pauses when evaluating a change.

## How Index Algorithm works

Every option produces a **FAISS retrieval index**. The selector changes which extracted feature vectors go into the index, independently of the training of the voice model. A feature vector represents a short audio frame. The thresholds below count vectors, not clips, epochs or minutes.

| Option | What Ilaria RVC does | When to try it |
| --- | --- | --- |
| **Auto** | Keeps all vectors up to **200,000**. Above that it attempts to reduce them to **10,000** cluster centers. If clustering fails, it retains the original vectors. | Start here for a first index. Check the Train Index log to see which path Auto took. |
| **Faiss** | Keeps all extracted vectors and builds the FAISS index without a KMeans reduction pass. | Try it when you want to preserve examples that a smaller index might average out and have enough RAM and disk space. |
| **KMeans** | Uses MiniBatchKMeans to represent similar vectors with shared centers. It normally keeps about one center per ten vectors, within a range of **39 to 10,000** centers and always fewer than the input count. It keeps all vectors for inputs of **39 or fewer**, and reports a clustering error rather than silently falling back. | Compare it when you want a smaller index. The clustering pass takes extra work, and the reduced index can lose fine detail. |

A smaller index is usually lighter to store. It does not guarantee a faster build or better conversion. Clustering still requires loading the extracted features. If Auto falls back on a large dataset, building from all vectors can still run out of memory.

### Compare results before choosing

1. Finish **Feature Extraction**, then run **Train Index**. Check the log for the vector or center count. Make a copy of the resulting index before generating a second one with another setting.
2. Use the same inference `.pth` and a clean held-out recording. Set **Index Ratio** to zero first to hear the checkpoint alone. The index is optional for conversion.
3. Compare the two matching indexes at the same nonzero **Index Ratio**, with pitch and effects held constant. Listen to clear consonants, sustained vowels, unusual sounds and how much target voice character is retained. Keep the one that sounds better on several clips.
4. Keep the chosen index with the model and the feature configuration that produced it. If you change the algorithm, rebuild the index from the existing compatible features. If you change the training embedder, extract matching features for that experiment instead of reusing the old index.

## Epoch and step targets

An epoch covers an iteration over the prepared dataset. Step mode targets a total count of batch updates and supports resuming within an epoch. GPU dataset caching must be off in step mode in this release. Save frequency is measured in epochs even when using a step target. Use a target above the already completed progress when extending a run. More steps are worth testing when comparable held-out audio improves.

## Keep a reproducible record

Record the dataset revision, sample rate, encoder, extractor, vocoder, pretrains, precision, batch size and save cadence. If you reuse the same name with an incompatible rate, the UI can report the mismatch. Start a separate experiment for a new configuration and keep the old experiment available for comparison.
