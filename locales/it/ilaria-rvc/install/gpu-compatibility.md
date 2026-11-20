---
label: "GPU compatibili"
icon: ":desktop_computer:"
order: 79
permalink: /ilaria-rvc/gpu-compatibility/
description: "Lo ZIP Windows pesa circa 5,00 GB. Estrailo in una nuova cartella e avvia RUN_ILARIA_RVC.bat. Per i log usa RUN_ILARIA_RVC_LOGS.bat. ContentVec e RMVPE..."
---
# GPU compatibili

[Scarica Ilaria RVC 2.4.0 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

## Windows

Lo ZIP Windows pesa circa 5,00 GB. Estrailo in una nuova cartella e avvia `RUN_ILARIA_RVC.bat`. Per i log usa `RUN_ILARIA_RVC_LOGS.bat`. ContentVec e RMVPE sono inclusi. Scarica gli encoder facoltativi da Other → Download embedders.

Il pacchetto include PyTorch 2.10.0 con CUDA 12.8, già pronto per le RTX serie 50 con driver compatibile. Sui PC con sole GPU Maxwell, Pascal o Volta il launcher scarica e verifica PyTorch 2.10.0 con CUDA 12.6 al primo avvio e riutilizza `runtime-cu126`. Segui i progressi in `cu126-runtime-install.log`.

## Verifiche

Le prove di calcolo, retropropagazione e caricamento di ContentVec sono state eseguite su una RTX 4070. Per le altre GPU, la tabella indica la compatibilità prevista in base all’architettura. La compatibilità delle singole schede resta da verificare e non è garantita.

## Modelli

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

[Funziona su Kaggle](../cloud/kaggle.md).

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
