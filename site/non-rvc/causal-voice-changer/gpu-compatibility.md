# Compatible GPUs for Causal Voice Changer

[GitHub Releases](https://github.com/mojowozo/Causal-Voice-Changer/releases)

Starting in **v0.3.3.1**, **Causal Voice Changer (CVC)** supports modern **NVIDIA RTX/GTX 16** cards, **older NVIDIA Maxwell/Pascal/Volta** cards, and **AMD Radeon** GPUs, with automatic backend detection on Windows and Linux.

## Backend overview

| Backend (`CAUSALVC_GPU`) | Runtime | Supported GPUs | Launcher / Notes |
| --- | --- | --- | --- |
| **`cuda`** | PyTorch CUDA 13 | NVIDIA GeForce GTX 16 & RTX 20, 30, 40, 50 series | Selected automatically on modern NVIDIA cards. |
| **`cuda-pascal`** | PyTorch CUDA 12.6 | Older NVIDIA GTX 900, GTX 10, TITAN X/Xp/V, Quadro M/P (added in **v0.3.3.1**) | Selected automatically, or use `run-realtime-gtx10.bat` / `run-training-gtx10.bat` if not recognized. |
| **`rocm`** | AMD ROCm 7.2.1 | AMD Radeon RX 7000, RX 9000, PRO W7000, Ryzen AI graphics | Selected automatically on supported AMD RDNA 3/4 GPUs. |
| **`rocm-rdna2`** | AMD ROCm nightly | AMD Radeon RX 6000 & PRO W6000 series | Selected automatically on RDNA 2 GPUs (confirmed on RX 6700 XT). |
| **CPU fallback** | CPU | Older AMD Radeons, Intel GPUs, or systems without a supported GPU | Real-time works only with higher **Chunk** sizes (`60 ms+`); training is very slow. |

---

## NVIDIA GPUs (Modern - `cuda`, CUDA 13)

| Family | Supported Models |
| --- | --- |
| **GTX 16 (Turing)** | GTX 1630, GTX 1650, GTX 1650 SUPER, GTX 1660, GTX 1660 SUPER, GTX 1660 Ti (Desktop & Laptop) |
| **RTX 20 (Turing)** | RTX 2060, RTX 2060 SUPER, RTX 2070, RTX 2070 SUPER, RTX 2080, RTX 2080 SUPER, RTX 2080 Ti (Desktop & Laptop) |
| **RTX 30 (Ampere)** | RTX 3050, RTX 3060, RTX 3060 Ti, RTX 3070, RTX 3070 Ti, RTX 3080, RTX 3080 Ti, RTX 3090, RTX 3090 Ti (Desktop & Laptop) |
| **RTX 40 (Ada Lovelace)** | RTX 4060, RTX 4060 Ti, RTX 4070, RTX 4070 SUPER, RTX 4070 Ti, RTX 4070 Ti SUPER, RTX 4080, RTX 4080 SUPER, RTX 4090 (Desktop & Laptop) |
| **RTX 50 (Blackwell)** | RTX 5050, RTX 5060, RTX 5060 Ti, RTX 5070, RTX 5070 Ti, RTX 5080, RTX 5090 (Desktop & Laptop) |

---

## Older NVIDIA GPUs (`cuda-pascal`, CUDA 12.6 - v0.3.3.1+)

CUDA 13 dropped older NVIDIA architectures, so **v0.3.3.1** installs the last PyTorch build with **CUDA 12.6** for these cards. If your card is not detected automatically, start CVC using **`run-realtime-gtx10.bat`** or **`run-training-gtx10.bat`** (or set `CAUSALVC_GPU=cuda-pascal`).

| Family | Supported Models |
| --- | --- |
| **GTX 900 (Maxwell)** | GTX 950, GTX 960, GTX 970, GTX 980, GTX 980 Ti |
| **GTX 10 (Pascal)** | GTX 1050, GTX 1050 Ti, GTX 1060, GTX 1070, GTX 1070 Ti, GTX 1080, GTX 1080 Ti |
| **TITAN & Quadro** | TITAN X, TITAN Xp, TITAN V, Quadro M series, Quadro P series |

---

## AMD Radeon GPUs (`rocm` & `rocm-rdna2`)

| Family | Backend | Supported Models |
| --- | --- | --- |
| **Radeon RX 7000 / 9000 & Ryzen AI** | `rocm` (ROCm 7.2.1) | RX 7600, RX 7700 XT, RX 7800 XT, RX 7900 GRE / XT / XTX, RX 9070 / 9070 XT, Radeon PRO W7000, Ryzen AI integrated graphics |
| **Radeon RX 6000 (RDNA 2)** | `rocm-rdna2` (ROCm nightly) | RX 6600 / XT, RX 6700 / XT, RX 6750 XT, RX 6800 / XT, RX 6900 XT, RX 6950 XT, Radeon PRO W6000 |
| **Older AMD / Intel GPUs** | CPU fallback | Runs on CPU only (set real-time **Chunk** to `60 ms` or higher) |
