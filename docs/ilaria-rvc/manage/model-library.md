---
label: "Model library and merging"
icon: ":card_index_dividers:"
order: 93
permalink: /ilaria-rvc/model-library/
description: "Import, inspect, and manage RVC .pth, .index, .safetensors, embedders, and Voice Blender merges in Ilaria RVC."
---
# Model library and merging

[Download Ilaria RVC 2.4.7 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

[Other panels](other-buttons.md)

## Format compatibility matrix

| File / Asset | Used for | Compatible operations in Ilaria RVC | Guide |
| --- | --- | --- | --- |
| **Inference `.pth`** | Voice conversion | Single/Batch Inference, Voice Blender, Safetensors conversion | [`.pth` files](../../start/pth-files.md) |
| **Training checkpoints (`G_*.pth` / `D_*.pth`)** | Resuming training | RVC v2 Training resume only (cannot be used directly in Inference) | [Training workflow](../train/training-workflow.md) |
| **Feature index (`added_*.index`)** | Optional timbre retrieval | Inference (paired with its matching voice `.pth`) | [Index files](../../start/indexes.md) |
| **`.onnx` models** | ONNX real-time engines | Used by external DirectML/real-time clients (AMD/Intel), not standard Ilaria RVC `.pth` inference | [`.onnx` files](../../start/onnx-files.md) |
| **`.safetensors`** | Safe weight storage | Convert to/from `.pth` via **Safetensors Converter** before standard `.pth` inference | [Safetensors Converter](safetensors-converter.md) |
| **Embedders** | Feature extraction | Inference & Training (must match the model's training embedder) | [Embedders](../../start/embedders.md) |
| **Pretrained G/D pairs** | Base weights for new training | RVC Training only | [Pretrained models](../../start/pretrained.md) |
| **Voice Blender** | Blending two voices | Merges two compatible inference `.pth` models into a new `.pth` | [Voice Blender](voice-blender.md) |

> **Why a training checkpoint is NOT an inference model:** Raw `G_*.pth` and `D_*.pth` files inside `app/logs/<experiment>/` contain full training/optimizer state and discriminator weights. They are for **resuming training** only. Always use an exported **inference `.pth`** (typically ~40–110 MB) in `models/` for conversion or sharing.

## Import, inspect, and safety

1. Open **Other → Import local models** (or **Download models from Hugging Face, Google Drive or MEGA**).
2. Keep each inference `.pth` and its matching `added_*.index` together.
3. Click **Refresh** in **Inference** and verify the model with **Model information** (sample rate, RVC version, embedder, and export precision).
4. **Safety note:** Standard PyTorch `.pth` files use `pickle` serialization. Only load `.pth` files from trusted authors/sources, or prefer `.safetensors` when archiving/sharing and convert with the built-in [Safetensors Converter](safetensors-converter.md).

## Merge compatible voices

Choose two compatible **inference** `.pth` checkpoints in [Voice Blender](voice-blender.md) and run the compatibility check first (same RVC version, sample rate, pitch guidance, and embedder). Adjust the blending ratio, save under a fresh name, and test the result with retrieval disabled (`Index Ratio = 0`) because an old `.index` belongs only to the original unblended model.
