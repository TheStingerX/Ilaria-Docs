# GPU compatibles

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

## Windows

Le ZIP Windows pèse environ 5,00 Go. Extrayez-le puis lancez `RUN_ILARIA_RVC.bat`, ou `RUN_ILARIA_RVC_LOGS.bat` pour les journaux. ContentVec et RMVPE sont inclus.

PyTorch 2.10.0 avec CUDA 12.8 est inclus. Sur un PC équipé uniquement de GPU Maxwell, Pascal ou Volta, le lanceur télécharge et vérifie PyTorch 2.10.0 avec CUDA 12.6 puis réutilise `runtime-cu126`. Consultez `cu126-runtime-install.log`.

## Vérification

Les tests de calcul, de rétropropagation et de chargement de ContentVec ont été réalisés sur une RTX 4070. Pour les autres GPU, le tableau indique la compatibilité prévue selon l’architecture. La compatibilité de chaque carte reste à vérifier et ne peut être garantie.

## Modèles

### Vue d'ensemble des architectures et runtimes

| Famille GPU | Architecture | Compute Capability | Runtime attendu | Entraînement & Inférence | Précision | Statut et limites |
| --- | --- | --- | --- | --- | --- | --- |
| **RTX 40** (ex. RTX 4070) | Ada Lovelace | 8.9 | CUDA 12.8 (2.10.0) | Inférence & Entraînement | FP32, FP16, BF16 | **Tested** (RTX 4070) ; autres **Expected** |
| **RTX 50** | Blackwell | 12.0 | CUDA 12.8 (2.10.0) | Inférence & Entraînement | FP32, FP16, BF16 | **Expected** (pilote compatible requis) |
| **RTX 30** | Ampere | 8.6 | CUDA 12.8 (2.10.0) | Inférence & Entraînement | FP32, FP16, BF16 | **Expected** |
| **RTX 20 / GTX 16** | Turing | 7.5 | CUDA 12.8 (2.10.0) | Inférence & Entraînement | FP32 (FP16 sur RTX 20) | **Expected** |
| **Maxwell / Pascal / Volta** (GTX 900/10) | 5.x/6.x/7.0 | 5.0–7.0 | Auto untime-cu126 (CUDA 12.6) | Inférence & Entraînement | FP32 | **Expected** |
| **Workstation / Datacenter** (T4, L4, RTX A) | Turing / Ampere / Ada | 7.5–8.9 | CUDA 12.8 (2.10.0) | Inférence & Entraînement | FP32, FP16 (BF16 Ampere+) | **Expected** |
| **Multi-GPU** | Plusieurs NVIDIA | Variable | Runtime actif | Entraînement | Selon GPU actifs | **Expected** ; les VRAM ne s'additionnent **pas** |
| **AMD / Intel / Intégré** | RDNA / Arc / iGPU | N/A | Aucun en local Windows | **Unsupported** en local | N/A | **Unsupported** ; utilisez [Cloud](../../ilaria-rvc/cloud/cloud.md) ou DirectML |

### Vérifier son GPU sous Windows et diagnostiquer

1. Faites Ctrl + Maj + Échap → **Performances → GPU** (ou 
vidia-smi).
2. **
o kernel image is available** : build CUDA inadapté à l'architecture.
3. **CUDA driver version is insufficient** : mettez à jour le pilote NVIDIA.
4. **CUDA out of memory** : baissez **Batch Size** ou activez **Split Audio**.

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

[Fonctionne sur Kaggle](../cloud/kaggle.md).

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
