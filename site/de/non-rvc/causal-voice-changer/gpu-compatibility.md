# Kompatible GPUs für Causal Voice Changer

[GitHub-Releases](https://github.com/mojowozo/Causal-Voice-Changer/releases)

Ab **v0.3.3.1** unterstützt **Causal Voice Changer (CVC)** moderne **NVIDIA RTX / GTX 16**-Karten, **ältere NVIDIA-Karten (Maxwell / Pascal / Volta)** sowie **AMD Radeon**-GPUs mit automatischer Erkennung unter Windows und Linux.

## Backend-Übersicht

| Backend (`CAUSALVC_GPU`) | Runtime | Unterstützte GPUs | Launcher / Hinweise |
| --- | --- | --- | --- |
| **`cuda`** | PyTorch CUDA 13 | NVIDIA GeForce GTX 16 & RTX 20, 30, 40, 50 Serie | Auf modernen NVIDIA-Karten automatisch gewählt. |
| **`cuda-pascal`** | PyTorch CUDA 12.6 | Ältere NVIDIA GTX 900, GTX 10, TITAN X/Xp/V, Quadro M/P (neu in **v0.3.3.1**) | Automatisch gewählt, sonst starte `run-realtime-gtx10.bat` / `run-training-gtx10.bat`. |
| **`rocm`** | AMD ROCm 7.2.1 | AMD Radeon RX 7000, RX 9000, PRO W7000, Ryzen AI Grafik | Auf unterstützten AMD RDNA 3/4 GPUs automatisch gewählt. |
| **`rocm-rdna2`** | AMD ROCm nightly | AMD Radeon RX 6000 & PRO W6000 Serie | Auf RDNA-2-GPUs automatisch gewählt (bestätigt auf RX 6700 XT). |
| **CPU-Fallback** | CPU | Ältere AMD Radeon, Intel GPUs oder Systeme ohne unterstützte GPU | Echtzeit nur mit höherem **Chunk** (`60 ms+`); Training sehr langsam. |

---

## Moderne NVIDIA-GPUs (`cuda`, CUDA 13)

| Familie | Unterstützte Modelle |
| --- | --- |
| **GTX 16 (Turing)** | GTX 1630, GTX 1650, GTX 1650 SUPER, GTX 1660, GTX 1660 SUPER, GTX 1660 Ti (Desktop & Laptop) |
| **RTX 20 (Turing)** | RTX 2060, RTX 2060 SUPER, RTX 2070, RTX 2070 SUPER, RTX 2080, RTX 2080 SUPER, RTX 2080 Ti (Desktop & Laptop) |
| **RTX 30 (Ampere)** | RTX 3050, RTX 3060, RTX 3060 Ti, RTX 3070, RTX 3070 Ti, RTX 3080, RTX 3080 Ti, RTX 3090, RTX 3090 Ti (Desktop & Laptop) |
| **RTX 40 (Ada Lovelace)** | RTX 4060, RTX 4060 Ti, RTX 4070, RTX 4070 SUPER, RTX 4070 Ti, RTX 4070 Ti SUPER, RTX 4080, RTX 4080 SUPER, RTX 4090 (Desktop & Laptop) |
| **RTX 50 (Blackwell)** | RTX 5050, RTX 5060, RTX 5060 Ti, RTX 5070, RTX 5070 Ti, RTX 5080, RTX 5090 (Desktop & Laptop) |

---

## Ältere NVIDIA-GPUs (`cuda-pascal`, CUDA 12.6 - ab v0.3.3.1)

Da CUDA 13 ältere Architekturen entfernt hat, installiert **v0.3.3.1** für diese Karten das letzte PyTorch-Build mit **CUDA 12.6**. Wird deine Karte nicht automatisch erkannt, starte CVC mit **`run-realtime-gtx10.bat`** oder **`run-training-gtx10.bat`** (oder setze `CAUSALVC_GPU=cuda-pascal`).

| Familie | Unterstützte Modelle |
| --- | --- |
| **GTX 900 (Maxwell)** | GTX 950, GTX 960, GTX 970, GTX 980, GTX 980 Ti |
| **GTX 10 (Pascal)** | GTX 1050, GTX 1050 Ti, GTX 1060, GTX 1070, GTX 1070 Ti, GTX 1080, GTX 1080 Ti |
| **TITAN & Quadro** | TITAN X, TITAN Xp, TITAN V, Quadro M-Serie, Quadro P-Serie |

---

## AMD Radeon-GPUs (`rocm` & `rocm-rdna2`)

| Familie | Backend | Unterstützte Modelle |
| --- | --- | --- |
| **Radeon RX 7000 / 9000 & Ryzen AI** | `rocm` (ROCm 7.2.1) | RX 7600, RX 7700 XT, RX 7800 XT, RX 7900 GRE / XT / XTX, RX 9070 / 9070 XT, Radeon PRO W7000, Ryzen AI Grafik |
| **Radeon RX 6000 (RDNA 2)** | `rocm-rdna2` (ROCm nightly) | RX 6600 / XT, RX 6700 / XT, RX 6750 XT, RX 6800 / XT, RX 6900 XT, RX 6950 XT, Radeon PRO W6000 |
| **Ältere AMD / Intel-GPUs** | CPU-Fallback | Läuft nur auf CPU (Echtzeit-**Chunk** auf `60 ms` oder höher stellen) |
