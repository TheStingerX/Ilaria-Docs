---
label: "Training and checkpoints"
icon: ":test_tube:"
order: 94
permalink: /ilaria-rvc/training-workflow/
description: "Select a dataset and choose compatible RVC architecture, sample rate, pitch guidance, embedder and generator/discriminator pretrains. Use a unique..."
---
# Training and checkpoints

[Download Ilaria RVC 2.4.0 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

## Prepare an experiment

Select a dataset and choose compatible RVC architecture, sample rate, pitch guidance, embedder and generator/discriminator pretrains. Use a unique experiment name and a batch size that fits VRAM. Run **Process Data**, then extract pitch and content features before training.

## Compare previews and exports

Hold out a short test clip before training. Enable **Training previews** if your release offers it, and use the same clip across checkpoints. Compare diction, pitch and unwanted artifacts. Use the dashboard for timing and counts, and use listening tests to select an export.

## Resume and export

Use **Stop and save**, wait for confirmation, then keep the experiment folder and the matching G/D checkpoints together. For inference, export the compact voice checkpoint and keep its matching index. See [Train an RVC voice model](../../model-training/training.md) for tuning and recovery.
