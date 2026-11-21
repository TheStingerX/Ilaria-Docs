---
label: "GPU compatibili"
icon: ":desktop_computer:"
order: 93
permalink: /non-rvc/causal-voice-changer/gpu-compatibility/
description: "Elenco completo delle schede video NVIDIA, AMD Radeon e configurazioni CPU compatibili con Causal Voice Changer (CVC), incluso il supporto v0.3.3.1 per GTX 900/10."
---
# GPU compatibili per Causal Voice Changer

[Release su GitHub](https://github.com/mojowozo/Causal-Voice-Changer/releases)

Dalla versione **v0.3.3.1**, **Causal Voice Changer (CVC)** supporta le moderne schede **NVIDIA RTX / GTX 16**, le **NVIDIA precedenti (Maxwell / Pascal / Volta)** e le GPU **AMD Radeon**, con rilevamento automatico su Windows e Linux.

## Panoramica dei backend

| Backend (`CAUSALVC_GPU`) | Runtime | GPU supportate | Launcher / Note |
| --- | --- | --- | --- |
| **`cuda`** | PyTorch CUDA 13 | NVIDIA GeForce GTX 16 e RTX serie 20, 30, 40, 50 | Selezionato automaticamente sulle schede NVIDIA moderne. |
| **`cuda-pascal`** | PyTorch CUDA 12.6 | NVIDIA precedenti GTX 900, GTX 10, TITAN X/Xp/V, Quadro M/P (aggiunto in **v0.3.3.1**) | Selezionato automaticamente, oppure avvia `run-realtime-gtx10.bat` / `run-training-gtx10.bat` se non viene rilevata. |
| **`rocm`** | AMD ROCm 7.2.1 | AMD Radeon RX 7000, RX 9000, PRO W7000, grafica Ryzen AI | Selezionato automaticamente su GPU AMD RDNA 3/4 supportate. |
| **`rocm-rdna2`** | AMD ROCm nightly | Serie AMD Radeon RX 6000 e PRO W6000 | Selezionato automaticamente su GPU RDNA 2 (confermato su RX 6700 XT). |
| **Ripiego CPU** | CPU | Vecchie AMD Radeon, GPU Intel o PC senza GPU supportata | Il realtime funziona solo con **Chunk** alti (`60 ms+`); il training è molto lento. |

---

## GPU NVIDIA moderne (`cuda`, CUDA 13)

| Famiglia | Modelli supportati |
| --- | --- |
| **GTX 16 (Turing)** | GTX 1630, GTX 1650, GTX 1650 SUPER, GTX 1660, GTX 1660 SUPER, GTX 1660 Ti (Desktop e Laptop) |
| **RTX 20 (Turing)** | RTX 2060, RTX 2060 SUPER, RTX 2070, RTX 2070 SUPER, RTX 2080, RTX 2080 SUPER, RTX 2080 Ti (Desktop e Laptop) |
| **RTX 30 (Ampere)** | RTX 3050, RTX 3060, RTX 3060 Ti, RTX 3070, RTX 3070 Ti, RTX 3080, RTX 3080 Ti, RTX 3090, RTX 3090 Ti (Desktop e Laptop) |
| **RTX 40 (Ada Lovelace)** | RTX 4060, RTX 4060 Ti, RTX 4070, RTX 4070 SUPER, RTX 4070 Ti, RTX 4070 Ti SUPER, RTX 4080, RTX 4080 SUPER, RTX 4090 (Desktop e Laptop) |
| **RTX 50 (Blackwell)** | RTX 5050, RTX 5060, RTX 5060 Ti, RTX 5070, RTX 5070 Ti, RTX 5080, RTX 5090 (Desktop e Laptop) |

---

## GPU NVIDIA datate (`cuda-pascal`, CUDA 12.6 - v0.3.3.1+)

CUDA 13 ha rimosso il supporto alle architetture NVIDIA più vecchie, quindi la **v0.3.3.1** installa per queste schede l'ultima build PyTorch basata su **CUDA 12.6**. Se la tua scheda non viene riconosciuta in automatico, avvia CVC tramite **`run-realtime-gtx10.bat`** o **`run-training-gtx10.bat`** (oppure imposta `CAUSALVC_GPU=cuda-pascal`).

| Famiglia | Modelli supportati |
| --- | --- |
| **GTX 900 (Maxwell)** | GTX 950, GTX 960, GTX 970, GTX 980, GTX 980 Ti |
| **GTX 10 (Pascal)** | GTX 1050, GTX 1050 Ti, GTX 1060, GTX 1070, GTX 1070 Ti, GTX 1080, GTX 1080 Ti |
| **TITAN e Quadro** | TITAN X, TITAN Xp, TITAN V, Quadro serie M, Quadro serie P |

---

## GPU AMD Radeon (`rocm` e `rocm-rdna2`)

| Famiglia | Backend | Modelli supportati |
| --- | --- | --- |
| **Radeon RX 7000 / 9000 e Ryzen AI** | `rocm` (ROCm 7.2.1) | RX 7600, RX 7700 XT, RX 7800 XT, RX 7900 GRE / XT / XTX, RX 9070 / 9070 XT, Radeon PRO W7000, grafica integrata Ryzen AI |
| **Radeon RX 6000 (RDNA 2)** | `rocm-rdna2` (ROCm nightly) | RX 6600 / XT, RX 6700 / XT, RX 6750 XT, RX 6800 / XT, RX 6900 XT, RX 6950 XT, Radeon PRO W6000 |
| **Vecchie AMD / GPU Intel** | Ripiego CPU | Funziona solo su CPU (imposta **Chunk** realtime a `60 ms` o superiore) |
