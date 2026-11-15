---
label: "⚙️ Training controls and workflow"
order: 87
permalink: /ilaria-rvc/training-controls/
---
# Training controls and workflow

## Four stages

| Stage | Inputs | Check before continuing |
| --- | --- | --- |
| Process Data | Dataset path, rate, experiment name and CPU threads | Import completed, usable audio was read, and logs belong to the intended experiment. |
| Feature Extraction | Prepared audio, pitch guidance, extractor and training embedder | The stage completed using the expected settings. |
| Train Pth | Features, G/D pair, target, GPU, batch and precision | Progress advances and the periodic checkpoints are written. |
| Train Feature Index | Extracted features and index algorithm | The generated index belongs to this run and can be paired with its inference export. |

## Architecture and performance

Version 2.1.0 offers 32, 40 and 48 kHz settings with available combinations determined by the vocoder. HiFi-GAN and RefineGAN have different constraints. Check the compatible pair before preprocessing. Pitch guidance controls whether F0 features condition the model. Configure CPU threads for the machine, and select a supported NVIDIA GPU for training. FP32 is the default in the checked UI. FP16 can reduce memory pressure on supported hardware. Batch size controls how many samples are processed together. If VRAM runs out, reduce the batch and disable optional caching.

**Silent training files** controls how many silent examples the app includes. Compare the same held-out pauses when evaluating a change. **Index Algorithm** offers Auto, Faiss and KMeans. Preserve the generated index with its matching model and keep retrieval off when evaluating the checkpoint alone.

## Epoch and step targets

An epoch covers an iteration over the prepared dataset. Step mode targets a total count of batch updates and supports resuming within an epoch. GPU dataset caching must be off in step mode in this release. Save frequency is measured in epochs even when using a step target. Use a target above the already completed progress when extending a run. More steps are worth testing when comparable held-out audio improves.

## Keep a reproducible record

Record the dataset revision, sample rate, encoder, extractor, vocoder, pretrains, precision, batch size and save cadence. If you reuse the same name with an incompatible rate, the UI can report the mismatch. Start a separate experiment for a new configuration and keep the old experiment available for comparison.
