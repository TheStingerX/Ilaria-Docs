# GPU compatibles avec Causal Voice Changer

[Releases sur GitHub](https://github.com/mojowozo/Causal-Voice-Changer/releases)

Depuis la version **v0.3.3.1**, **Causal Voice Changer (CVC)** prend en charge les cartes **NVIDIA RTX / GTX 16** récentes, les **anciens GPU NVIDIA (Maxwell / Pascal / Volta)** et les GPU **AMD Radeon**, avec détection automatique sous Windows et Linux.

## Aperçu des backends

| Backend (`CAUSALVC_GPU`) | Runtime | GPU pris en charge | Lanceur / Notes |
| --- | --- | --- | --- |
| **`cuda`** | PyTorch CUDA 13 | NVIDIA GeForce GTX 16 et RTX séries 20, 30, 40, 50 | Sélectionné automatiquement sur les GPU NVIDIA récents. |
| **`cuda-pascal`** | PyTorch CUDA 12.6 | Anciens NVIDIA GTX 900, GTX 10, TITAN X/Xp/V, Quadro M/P (ajouté en **v0.3.3.1**) | Sélectionné automatiquement, sinon lancez `run-realtime-gtx10.bat` / `run-training-gtx10.bat`. |
| **`rocm`** | AMD ROCm 7.2.1 | AMD Radeon RX 7000, RX 9000, PRO W7000, Ryzen AI | Sélectionné automatiquement sur GPU AMD RDNA 3/4 compatibles. |
| **`rocm-rdna2`** | AMD ROCm nightly | Séries AMD Radeon RX 6000 et PRO W6000 | Sélectionné automatiquement sur GPU RDNA 2 (confirmé sur RX 6700 XT). |
| **Mode CPU** | CPU | Anciennes AMD Radeon, GPU Intel ou PC sans GPU compatible | Temps réel possible uniquement avec un **Chunk** élevé (`60 ms+`) ; entraînement très lent. |

---

## GPU NVIDIA récents (`cuda`, CUDA 13)

| Famille | Modèles compatibles |
| --- | --- |
| **GTX 16 (Turing)** | GTX 1630, GTX 1650, GTX 1650 SUPER, GTX 1660, GTX 1660 SUPER, GTX 1660 Ti (Bureau et Portable) |
| **RTX 20 (Turing)** | RTX 2060, RTX 2060 SUPER, RTX 2070, RTX 2070 SUPER, RTX 2080, RTX 2080 SUPER, RTX 2080 Ti (Bureau et Portable) |
| **RTX 30 (Ampere)** | RTX 3050, RTX 3060, RTX 3060 Ti, RTX 3070, RTX 3070 Ti, RTX 3080, RTX 3080 Ti, RTX 3090, RTX 3090 Ti (Bureau et Portable) |
| **RTX 40 (Ada Lovelace)** | RTX 4060, RTX 4060 Ti, RTX 4070, RTX 4070 SUPER, RTX 4070 Ti, RTX 4070 Ti SUPER, RTX 4080, RTX 4080 SUPER, RTX 4090 (Bureau et Portable) |
| **RTX 50 (Blackwell)** | RTX 5050, RTX 5060, RTX 5060 Ti, RTX 5070, RTX 5070 Ti, RTX 5080, RTX 5090 (Bureau et Portable) |

---

## Anciens GPU NVIDIA (`cuda-pascal`, CUDA 12.6 - v0.3.3.1+)

CUDA 13 ayant abandonné les architectures plus anciennes, la **v0.3.3.1** installe la dernière build PyTorch avec **CUDA 12.6** pour ces cartes. Si la carte n'est pas détectée automatiquement, lancez CVC via **`run-realtime-gtx10.bat`** ou **`run-training-gtx10.bat`** (ou définissez `CAUSALVC_GPU=cuda-pascal`).

| Famille | Modèles compatibles |
| --- | --- |
| **GTX 900 (Maxwell)** | GTX 950, GTX 960, GTX 970, GTX 980, GTX 980 Ti |
| **GTX 10 (Pascal)** | GTX 1050, GTX 1050 Ti, GTX 1060, GTX 1070, GTX 1070 Ti, GTX 1080, GTX 1080 Ti |
| **TITAN & Quadro** | TITAN X, TITAN Xp, TITAN V, Quadro série M, Quadro série P |

---

## GPU AMD Radeon (`rocm` & `rocm-rdna2`)

| Famille | Backend | Modèles compatibles |
| --- | --- | --- |
| **Radeon RX 7000 / 9000 & Ryzen AI** | `rocm` (ROCm 7.2.1) | RX 7600, RX 7700 XT, RX 7800 XT, RX 7900 GRE / XT / XTX, RX 9070 / 9070 XT, Radeon PRO W7000, graphismes Ryzen AI |
| **Radeon RX 6000 (RDNA 2)** | `rocm-rdna2` (ROCm nightly) | RX 6600 / XT, RX 6700 / XT, RX 6750 XT, RX 6800 / XT, RX 6900 XT, RX 6950 XT, Radeon PRO W6000 |
| **Anciennes AMD / GPU Intel** | Mode CPU | CPU uniquement (réglez le **Chunk** temps réel à `60 ms` ou plus) |
