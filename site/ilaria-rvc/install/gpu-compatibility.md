# Compatible GPUs

> [Ilaria RVC 2.5.1 AMD Preview](amd-preview.md) · The AMD Preview is a separate 2.5.1 build for compatible Radeon GPUs. It runs on Windows 11 through WSL2 with Ubuntu 22.04 or on native Ubuntu 22.04. It uses Python 3.10, PyTorch 2.6.0 and ROCm 6.4.2. The package and launcher have been checked. Full training, checkpoint resume and end-to-end voice conversion still need validation on Radeon hardware.

[Download Ilaria RVC 2.4.7 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

## Windows

The Windows ZIP is about 5.00 GB. Extract it to a new folder and run `RUN_ILARIA_RVC.bat`, or `RUN_ILARIA_RVC_LOGS.bat` for logs. ContentVec and RMVPE are included. Optional embedders are under Other → Download embedders.

PyTorch 2.10.0 with CUDA 12.8 is included and ready for RTX 50 with a compatible driver. On PCs with only Maxwell, Pascal or Volta GPUs, the launcher downloads and verifies PyTorch 2.10.0 with CUDA 12.6 once, then reuses `runtime-cu126`. See `cu126-runtime-install.log`.

## Validation

Compute, backpropagation and ContentVec loading were tested on an **RTX 4070**. For other GPUs, the tables below show **Expected** compatibility based on architecture and CUDA runtime selection. Compatibility with individual cards is not guaranteed model by model.

### Architecture & Runtime Overview

| GPU Family | Architecture | Compute Capability | Expected Runtime | Training & Inference | Precision | Limitations & Status |
| --- | --- | --- | --- | --- | --- | --- |
| **RTX 40 series** (e.g. RTX 4070) | Ada Lovelace | `8.9` | CUDA 12.8 (`2.10.0`) | Inference & Training | `FP32`, `FP16`, `BF16` | **Tested** (RTX 4070); other models **Expected** |
| **RTX 50 series** | Blackwell | `12.0` | CUDA 12.8 (`2.10.0`) | Inference & Training | `FP32`, `FP16`, `BF16` | **Expected** (requires compatible NVIDIA driver) |
| **RTX 30 series** | Ampere | `8.6` | CUDA 12.8 (`2.10.0`) | Inference & Training | `FP32`, `FP16`, `BF16` | **Expected**; lower-VRAM cards (e.g. 6–8 GB) need smaller batch sizes |
| **RTX 20 series** | Turing | `7.5` | CUDA 12.8 (`2.10.0`) | Inference & Training | `FP32`, `FP16` | **Expected**; no native `BF16` |
| **GTX 16 series** | Turing (no Tensor) | `7.5` | CUDA 12.8 (`2.10.0`) | Inference & Training | `FP32` (safer; `FP16` varies) | **Expected**; `FP16` can be slower or error on some GTX 16 cards |
| **Maxwell / Pascal / Volta** (GTX 900/10, Titan V) | `5.x` / `6.x` / `7.0` | `5.0`–`7.0` | Auto `runtime-cu126` (CUDA 12.6) | Inference & Training | `FP32` | **Expected**; first launch downloads `runtime-cu126`; GTX 10-series often fail with `FP16` |
| **Workstation / Datacenter** (Quadro RTX, RTX A-series, T4, L4) | Turing / Ampere / Ada | `7.5`–`8.9` | CUDA 12.8 (`2.10.0`) | Inference & Training | `FP32`, `FP16` (`BF16` on Ampere+) | **Expected**; T4 in Kaggle defaults to `FP16` |
| **Multi-GPU systems** | Mixed or matched NVIDIA | Varies | Matched to lowest/active set | Training (DDP in Kaggle/supported setups) | Matches active GPUs | **Expected**; two GPUs do **not** combine into one larger VRAM pool |
| **AMD Radeon** | RDNA | — | ROCm 6.4.2 · WSL2 / Ubuntu 22.04 | Training and conversion pending validation | `FP32` | [AMD Preview](amd-preview.md) |
| **Intel / Integrated** | Arc / iGPU | N/A (No CUDA) | None in local Windows build | **Unsupported** locally | N/A | **Unsupported** locally in Ilaria RVC Windows; use [Cloud](../cloud/cloud.md) or DirectML apps |

### Check Your GPU Model & Diagnose Errors on Windows

1. Press `Ctrl + Shift + Esc` → **Performance → GPU** (or run `nvidia-smi` in Command Prompt) to read your exact GPU name, VRAM, and driver version.
2. **`no kernel image is available`**: The CUDA build does not match your GPU architecture (e.g., Maxwell/Pascal needing `runtime-cu126`).
3. **`CUDA driver version is insufficient`**: Update your NVIDIA driver via the NVIDIA App or official website, then restart.
4. **`CUDA out of memory`**: Your GPU VRAM is full; lower **Batch Size**, disable dataset GPU caching, or enable **Split Audio** during inference.

## Models

## GTX 16

| GPU | CUDA |
| --- | --- |
| GTX 1630 | 12.8 |
| GTX 1650 | 12.8 |
| GTX 1650 SUPER | 12.8 |
| GTX 1650 Laptop GPU | 12.8 |
| GTX 1650 Ti Laptop GPU | 12.8 |
| GTX 1660 | 12.8 |
| GTX 1660 SUPER | 12.8 |
| GTX 1660 Ti | 12.8 |
| GTX 1660 Ti Laptop GPU | 12.8 |

## RTX 20

| GPU | CUDA |
| --- | --- |
| RTX 2060 | 12.8 |
| RTX 2060 SUPER | 12.8 |
| RTX 2070 | 12.8 |
| RTX 2070 SUPER | 12.8 |
| RTX 2080 | 12.8 |
| RTX 2080 SUPER | 12.8 |
| RTX 2080 Ti | 12.8 |
| RTX 2060 Laptop GPU | 12.8 |
| RTX 2070 Laptop GPU | 12.8 |
| RTX 2070 SUPER Laptop GPU | 12.8 |
| RTX 2080 Laptop GPU | 12.8 |
| RTX 2080 SUPER Laptop GPU | 12.8 |

## RTX 30

| GPU | CUDA |
| --- | --- |
| RTX 3050 | 12.8 |
| RTX 3060 | 12.8 |
| RTX 3060 Ti | 12.8 |
| RTX 3070 | 12.8 |
| RTX 3070 Ti | 12.8 |
| RTX 3080 | 12.8 |
| RTX 3080 Ti | 12.8 |
| RTX 3090 | 12.8 |
| RTX 3090 Ti | 12.8 |
| RTX 3050 Laptop GPU | 12.8 |
| RTX 3050 Ti Laptop GPU | 12.8 |
| RTX 3060 Laptop GPU | 12.8 |
| RTX 3070 Laptop GPU | 12.8 |
| RTX 3070 Ti Laptop GPU | 12.8 |
| RTX 3080 Laptop GPU | 12.8 |
| RTX 3080 Ti Laptop GPU | 12.8 |

## RTX 40

| GPU | CUDA |
| --- | --- |
| RTX 4060 | 12.8 |
| RTX 4060 Ti | 12.8 |
| RTX 4070 | 12.8 |
| RTX 4070 SUPER | 12.8 |
| RTX 4070 Ti | 12.8 |
| RTX 4070 Ti SUPER | 12.8 |
| RTX 4080 | 12.8 |
| RTX 4080 SUPER | 12.8 |
| RTX 4090 | 12.8 |
| RTX 4050 Laptop GPU | 12.8 |
| RTX 4060 Laptop GPU | 12.8 |
| RTX 4070 Laptop GPU | 12.8 |
| RTX 4080 Laptop GPU | 12.8 |
| RTX 4090 Laptop GPU | 12.8 |

## RTX 50

| GPU | CUDA |
| --- | --- |
| RTX 5050 | 12.8 |
| RTX 5060 | 12.8 |
| RTX 5060 Ti | 12.8 |
| RTX 5070 | 12.8 |
| RTX 5070 Ti | 12.8 |
| RTX 5080 | 12.8 |
| RTX 5090 | 12.8 |
| RTX 5050 Laptop GPU | 12.8 |
| RTX 5060 Laptop GPU | 12.8 |
| RTX 5070 Laptop GPU | 12.8 |
| RTX 5070 Ti Laptop GPU | 12.8 |
| RTX 5080 Laptop GPU | 12.8 |
| RTX 5090 Laptop GPU | 12.8 |

## NVIDIA T4

[Works on Kaggle](../cloud/kaggle.md).

## Maxwell

| GPU | CUDA |
| --- | --- |
| GTX 750 | 12.6 |
| GTX 750 Ti | 12.6 |
| GTX 950 | 12.6 |
| GTX 960 | 12.6 |
| GTX 970 | 12.6 |
| GTX 980 | 12.6 |
| GTX 980 Ti | 12.6 |
| GTX 950M | 12.6 |
| GTX 960M | 12.6 |
| GTX 965M | 12.6 |
| GTX 970M | 12.6 |
| GTX 980M | 12.6 |
| GTX TITAN X | 12.6 |
| Quadro M2000 | 12.6 |
| Quadro M4000 | 12.6 |
| Quadro M5000 | 12.6 |
| Quadro M6000 | 12.6 |
| Tesla M40 | 12.6 |
| Tesla M60 | 12.6 |

## Pascal

| GPU | CUDA |
| --- | --- |
| GT 1030 | 12.6 |
| GTX 1050 | 12.6 |
| GTX 1050 Ti | 12.6 |
| GTX 1060 | 12.6 |
| GTX 1070 | 12.6 |
| GTX 1070 Ti | 12.6 |
| GTX 1080 | 12.6 |
| GTX 1080 Ti | 12.6 |
| GTX 1050 Laptop GPU | 12.6 |
| GTX 1050 Ti Laptop GPU | 12.6 |
| GTX 1060 Laptop GPU | 12.6 |
| GTX 1070 Laptop GPU | 12.6 |
| GTX 1080 Laptop GPU | 12.6 |
| TITAN X (Pascal) | 12.6 |
| TITAN Xp | 12.6 |
| Quadro P400 | 12.6 |
| Quadro P600 | 12.6 |
| Quadro P620 | 12.6 |
| Quadro P1000 | 12.6 |
| Quadro P2000 | 12.6 |
| Quadro P2200 | 12.6 |
| Quadro P4000 | 12.6 |
| Quadro P5000 | 12.6 |
| Quadro P6000 | 12.6 |
| Tesla P4 | 12.6 |
| Tesla P40 | 12.6 |
| Tesla P100 | 12.6 |

## Volta

| GPU | CUDA |
| --- | --- |
| TITAN V | 12.6 |
| Quadro GV100 | 12.6 |
| Tesla V100 | 12.6 |

[NVIDIA CUDA GPUs](https://developer.nvidia.com/cuda/gpus) · [NVIDIA legacy CUDA GPUs](https://developer.nvidia.com/cuda/gpus/legacy)
