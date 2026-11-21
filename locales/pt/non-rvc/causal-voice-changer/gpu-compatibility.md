---
label: "GPUs compatíveis"
icon: ":desktop_computer:"
order: 93
permalink: /non-rvc/causal-voice-changer/gpu-compatibility/
description: "Lista completa de placas de vídeo NVIDIA, AMD Radeon e configurações CPU compatíveis com o Causal Voice Changer (CVC), incluindo suporte v0.3.3.1 para GTX 900/10."
---
# GPUs compatíveis com o Causal Voice Changer

[Lançamentos no GitHub](https://github.com/mojowozo/Causal-Voice-Changer/releases)

A partir da versão **v0.3.3.1**, o **Causal Voice Changer (CVC)** suporta placas modernas **NVIDIA RTX / GTX 16**, placas **NVIDIA antigas (Maxwell / Pascal / Volta)** e GPUs **AMD Radeon**, com detecção automática no Windows e Linux.

## Visão geral dos backends

| Backend (`CAUSALVC_GPU`) | Runtime | GPUs suportadas | Launcher / Notas |
| --- | --- | --- | --- |
| **`cuda`** | PyTorch CUDA 13 | NVIDIA GeForce GTX 16 e RTX séries 20, 30, 40, 50 | Selecionado automaticamente em placas NVIDIA modernas. |
| **`cuda-pascal`** | PyTorch CUDA 12.6 | NVIDIA antigas GTX 900, GTX 10, TITAN X/Xp/V, Quadro M/P (adicionado na **v0.3.3.1**) | Selecionado automaticamente, ou use `run-realtime-gtx10.bat` / `run-training-gtx10.bat` se não for reconhecida. |
| **`rocm`** | AMD ROCm 7.2.1 | AMD Radeon RX 7000, RX 9000, PRO W7000, gráficos Ryzen AI | Selecionado automaticamente em GPUs AMD RDNA 3/4 suportadas. |
| **`rocm-rdna2`** | AMD ROCm nightly | Séries AMD Radeon RX 6000 e PRO W6000 | Selecionado automaticamente em GPUs RDNA 2 (confirmado na RX 6700 XT). |
| **Modo CPU** | CPU | AMD Radeon antigas, GPUs Intel ou PCs sem GPU suportada | Em tempo real funciona só com **Chunk** alto (`60 ms+`); o treino é bem lento. |

---

## GPUs NVIDIA modernas (`cuda`, CUDA 13)

| Família | Modelos suportados |
| --- | --- |
| **GTX 16 (Turing)** | GTX 1630, GTX 1650, GTX 1650 SUPER, GTX 1660, GTX 1660 SUPER, GTX 1660 Ti (Desktop e Notebook) |
| **RTX 20 (Turing)** | RTX 2060, RTX 2060 SUPER, RTX 2070, RTX 2070 SUPER, RTX 2080, RTX 2080 SUPER, RTX 2080 Ti (Desktop e Notebook) |
| **RTX 30 (Ampere)** | RTX 3050, RTX 3060, RTX 3060 Ti, RTX 3070, RTX 3070 Ti, RTX 3080, RTX 3080 Ti, RTX 3090, RTX 3090 Ti (Desktop e Notebook) |
| **RTX 40 (Ada Lovelace)** | RTX 4060, RTX 4060 Ti, RTX 4070, RTX 4070 SUPER, RTX 4070 Ti, RTX 4070 Ti SUPER, RTX 4080, RTX 4080 SUPER, RTX 4090 (Desktop e Notebook) |
| **RTX 50 (Blackwell)** | RTX 5050, RTX 5060, RTX 5060 Ti, RTX 5070, RTX 5070 Ti, RTX 5080, RTX 5090 (Desktop e Notebook) |

---

## GPUs NVIDIA antigas (`cuda-pascal`, CUDA 12.6 - v0.3.3.1+)

Como o CUDA 13 removeu arquiteturas antigas, a **v0.3.3.1** instala a última build do PyTorch com **CUDA 12.6** para essas placas. Se sua placa não for detectada automaticamente, abra o CVC com **`run-realtime-gtx10.bat`** ou **`run-training-gtx10.bat`** (ou defina `CAUSALVC_GPU=cuda-pascal`).

| Família | Modelos suportados |
| --- | --- |
| **GTX 900 (Maxwell)** | GTX 950, GTX 960, GTX 970, GTX 980, GTX 980 Ti |
| **GTX 10 (Pascal)** | GTX 1050, GTX 1050 Ti, GTX 1060, GTX 1070, GTX 1070 Ti, GTX 1080, GTX 1080 Ti |
| **TITAN e Quadro** | TITAN X, TITAN Xp, TITAN V, Quadro série M, Quadro série P |

---

## GPUs AMD Radeon (`rocm` e `rocm-rdna2`)

| Família | Backend | Modelos suportados |
| --- | --- | --- |
| **Radeon RX 7000 / 9000 e Ryzen AI** | `rocm` (ROCm 7.2.1) | RX 7600, RX 7700 XT, RX 7800 XT, RX 7900 GRE / XT / XTX, RX 9070 / 9070 XT, Radeon PRO W7000, gráficos Ryzen AI |
| **Radeon RX 6000 (RDNA 2)** | `rocm-rdna2` (ROCm nightly) | RX 6600 / XT, RX 6700 / XT, RX 6750 XT, RX 6800 / XT, RX 6900 XT, RX 6950 XT, Radeon PRO W6000 |
| **AMD antigas / GPUs Intel** | Modo CPU | Roda apenas na CPU (defina **Chunk** em tempo real para `60 ms` ou maior) |
