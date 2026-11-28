# NoRegretsRVC · Version history

> **Latest release** · [Beta 0.1.0](https://github.com/HunterThatsMe/NoRegretsRVC/releases/tag/v0.1.0)

## Beta 0.1.0

Adds generator EMA, multi-scale Mel loss (512, 1024 and 2048), gradient clipping and FAISS `nprobe` tuning. Dataset normalization defaults to −20 LUFS. The default sample rate remains 32 kHz.

Removes the single-GPU Applio parity toggle. With Dual T4, per-GPU batches of 2 and 4 give effective batches of 4 and 8. ETA filtering, epoch totals and duplicate save markers are fixed. The dataset path stays blank when no dataset is detected.

[Release history · 0.1.0](https://github.com/HunterThatsMe/NoRegretsRVC/releases/tag/v0.1.0) · [Cloud](cloud.md)

## Beta 0.0.0

Initial public beta. The release notes identify it as the base release.

[Release history · 0.0.0](https://github.com/HunterThatsMe/NoRegretsRVC/releases/tag/v0.0.0)
