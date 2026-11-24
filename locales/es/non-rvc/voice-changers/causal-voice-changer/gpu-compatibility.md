---
label: "GPUs compatibles"
icon: ":desktop_computer:"
order: 93
permalink: /non-rvc/causal-voice-changer/gpu-compatibility/
description: "Lista completa de tarjetas NVIDIA, AMD Radeon y configuraciones CPU compatibles con Causal Voice Changer (CVC), incluyendo soporte v0.3.3.1 para GTX 900/10."
---
# GPUs compatibles con Causal Voice Changer

[Lanzamientos en GitHub](https://github.com/mojowozo/Causal-Voice-Changer/releases)

Desde la versión **v0.3.3.1**, **Causal Voice Changer (CVC)** es compatible con tarjetas modernas **NVIDIA RTX / GTX 16**, tarjetas **NVIDIA anteriores (Maxwell / Pascal / Volta)** y GPUs **AMD Radeon**, con detección automática en Windows y Linux.

## Resumen de backends

| Backend (`CAUSALVC_GPU`) | Runtime | GPUs compatibles | Lanzador / Notas |
| --- | --- | --- | --- |
| **`cuda`** | PyTorch CUDA 13 | NVIDIA GeForce GTX 16 y RTX series 20, 30, 40, 50 | Se selecciona automáticamente en tarjetas NVIDIA modernas. |
| **`cuda-pascal`** | PyTorch CUDA 12.6 | NVIDIA antiguas GTX 900, GTX 10, TITAN X/Xp/V, Quadro M/P (añadido en **v0.3.3.1**) | Se selecciona automáticamente, o usa `run-realtime-gtx10.bat` / `run-training-gtx10.bat` si no la detecta. |
| **`rocm`** | AMD ROCm 7.2.1 | AMD Radeon RX 7000, RX 9000, PRO W7000, gráficos Ryzen AI | Selección automática en GPUs AMD RDNA 3/4 compatibles. |
| **`rocm-rdna2`** | AMD ROCm nightly | Series AMD Radeon RX 6000 y PRO W6000 | Selección automática en GPUs RDNA 2 (confirmado en RX 6700 XT). |
| **Alternativa CPU** | CPU | AMD Radeon antiguas, GPUs Intel o PCs sin GPU compatible | En vivo solo funciona con **Chunk** altos (`60 ms+`); entrenar es muy lento. |

---

## GPUs NVIDIA modernas (`cuda`, CUDA 13)

| Familia | Modelos compatibles |
| --- | --- |
| **GTX 16 (Turing)** | GTX 1630, GTX 1650, GTX 1650 SUPER, GTX 1660, GTX 1660 SUPER, GTX 1660 Ti (Escritorio y Portátil) |
| **RTX 20 (Turing)** | RTX 2060, RTX 2060 SUPER, RTX 2070, RTX 2070 SUPER, RTX 2080, RTX 2080 SUPER, RTX 2080 Ti (Escritorio y Portátil) |
| **RTX 30 (Ampere)** | RTX 3050, RTX 3060, RTX 3060 Ti, RTX 3070, RTX 3070 Ti, RTX 3080, RTX 3080 Ti, RTX 3090, RTX 3090 Ti (Escritorio y Portátil) |
| **RTX 40 (Ada Lovelace)** | RTX 4060, RTX 4060 Ti, RTX 4070, RTX 4070 SUPER, RTX 4070 Ti, RTX 4070 Ti SUPER, RTX 4080, RTX 4080 SUPER, RTX 4090 (Escritorio y Portátil) |
| **RTX 50 (Blackwell)** | RTX 5050, RTX 5060, RTX 5060 Ti, RTX 5070, RTX 5070 Ti, RTX 5080, RTX 5090 (Escritorio y Portátil) |

---

## GPUs NVIDIA antiguas (`cuda-pascal`, CUDA 12.6 - v0.3.3.1+)

CUDA 13 dejó de dar soporte a arquitecturas anteriores, por lo que **v0.3.3.1** instala la última compilación PyTorch con **CUDA 12.6** para estas tarjetas. Si no se detecta automáticamente, inicia CVC con **`run-realtime-gtx10.bat`** o **`run-training-gtx10.bat`** (o define `CAUSALVC_GPU=cuda-pascal`).

| Familia | Modelos compatibles |
| --- | --- |
| **GTX 900 (Maxwell)** | GTX 950, GTX 960, GTX 970, GTX 980, GTX 980 Ti |
| **GTX 10 (Pascal)** | GTX 1050, GTX 1050 Ti, GTX 1060, GTX 1070, GTX 1070 Ti, GTX 1080, GTX 1080 Ti |
| **TITAN y Quadro** | TITAN X, TITAN Xp, TITAN V, Quadro serie M, Quadro serie P |

---

## GPUs AMD Radeon (`rocm` y `rocm-rdna2`)

| Familia | Backend | Modelos compatibles |
| --- | --- | --- |
| **Radeon RX 7000 / 9000 y Ryzen AI** | `rocm` (ROCm 7.2.1) | RX 7600, RX 7700 XT, RX 7800 XT, RX 7900 GRE / XT / XTX, RX 9070 / 9070 XT, Radeon PRO W7000, gráficos Ryzen AI |
| **Radeon RX 6000 (RDNA 2)** | `rocm-rdna2` (ROCm nightly) | RX 6600 / XT, RX 6700 / XT, RX 6750 XT, RX 6800 / XT, RX 6900 XT, RX 6950 XT, Radeon PRO W6000 |
| **AMD antiguas / GPUs Intel** | Alternativa CPU | Solo en CPU (pon **Chunk** en tiempo real en `60 ms` o más) |
