---
label: "Configuration requise"
icon: ":clipboard:"
order: 83
permalink: /ilaria-rvc/requirements/
description: "Ilaria RVC fonctionne localement sur votre PC avec PyTorch 2.10.0 et NVIDIA CUDA."
---
# Configuration requise pour Ilaria RVC

> **[Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)** · Le paquet Windows complet est la version 2.4.7. Pour passer de 2.4.2–2.5.0 à la dernière version, utilisez **Other → Update Ilaria RVC → Check for updates → Download and restart**. Le ZIP de mise à jour exclut l’environnement d’exécution et les poids des modèles. [ZIP de mise à jour Windows](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.5.1/ILARIA_RVC-update-2.5.1.zip?download=true)

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true) · [GPU compatibles](gpu-compatibility.md) · [Options Cloud](../cloud/cloud.md)

Ilaria RVC fonctionne localement sur votre PC avec **PyTorch 2.10.0** et **NVIDIA CUDA**. La conversion vocale (inférence) et l'entraînement de modèles ayant des besoins très différents, consultez les deux tableaux ci-dessous avant l'installation.

> **Pas de GPU NVIDIA compatible ?** Vous pouvez exécuter Ilaria RVC à distance sur GPU cloud via les guides [Kaggle](../cloud/kaggle.md), [Google Colab](../cloud/colab.md) ou [Lightning AI Studio](../cloud/lightning-ai.md).

## 1. Résumé rapide : Minimale vs. Recommandée

| Composant | Minimale (Inférence / Usage basique) | Recommandée (Inférence fluide & Entraînement) |
| --- | --- | --- |
| **Système d'exploitation** | Windows 10 64 bits | Windows 10 ou Windows 11 (64 bits, à jour) |
| **GPU** | GPU **NVIDIA** dédié avec **4 Go VRAM** (Maxwell, Pascal, Volta, GTX 16 ou RTX) | GPU **NVIDIA RTX** dédié avec **8–12 Go+ VRAM** (ex. RTX 3060 12 Go, RTX 4060 Ti / 4070 ou plus récent) |
| **Runtime CUDA** | CUDA **12.8** (inclus) ou CUDA **12.6** (téléchargé auto pour Maxwell/Pascal/Volta) | CUDA **12.8** (inclus dans le ZIP pour GTX 16 / RTX 20–50) |
| **RAM système** | **8 Go** | **16 Go** ou **32 Go** (surtout pour l'entraînement et l'index) |
| **Stockage** | **25 Go** d'espace libre (ZIP + app extraite + modèles) | **50 Go+ libres sur SSD** (datasets, checkpoints, pré-entraînés) |
| **CPU** | Processeur x64 4 cœurs moderne | Processeur x64 6–8+ cœurs (accélère prétraitement et recherche d'index) |
| **Navigateur** | Tout navigateur moderne (pour `http://127.0.0.1:6969`) | Chrome, Edge ou Firefox (à jour) |

## 2. Exigences détaillées GPU et VRAM

La version Windows d'Ilaria RVC est conçue pour les **GPU NVIDIA**. Les graphiques intégrés Intel, Intel Arc et les GPU AMD ne sont pas pris en charge par le paquet Windows.

### Par génération de GPU (runtime CUDA)

- **GeForce GTX 16 et RTX 20, 30, 40, 50** : utilise directement le runtime **PyTorch 2.10.0 + CUDA 12.8** inclus après extraction. Gardez votre pilote NVIDIA à jour (surtout sur la série RTX 50).
- **Maxwell, Pascal et Volta** (ex. séries GTX 750/900/1000, TITAN X/V, Tesla P4/P40/P100/V100) : au premier lancement, `RUN_ILARIA_RVC.bat` télécharge et vérifie automatiquement **PyTorch 2.10.0 + CUDA 12.6** dans `runtime-cu126` et le réutilise ensuite.
- **Note de validation** : le calcul, la rétropropagation et le chargement de ContentVec ont été vérifiés sur une **RTX 4070**. Les autres cartes de la [liste des GPU compatibles](gpu-compatibility.md) sont attendues comme compatibles selon leur architecture et le support CUDA.

### Par capacité de VRAM (ce que vous pouvez exécuter)

| VRAM | Inférence (Conversion audio) | Entraînement (Création de modèles) |
| --- | --- | --- |
| **4 Go** | Fonctionne sur des extraits courts ; fermez les applis utilisant le GPU (jeux, navigateurs avec accélération matérielle). | Très limité ; uniquement petits batch sizes (`1–2`) en FP16/bas sample rate, ou risque de manque de mémoire. |
| **6 Go** | Fluide pour l'inférence simple et par lots. | Possible avec un batch size réduit (`2–4`) et précision FP16. |
| **8 Go** | Sans effort pour l'inférence et la conversion par lots. | Bon pour l'entraînement `32k` / `40k` / `48k` avec batch sizes moyens (`4–8`). |
| **12 Go+** | Fluide même avec d'autres applis ouvertes. | **Idéal** : batch sizes confortables (`8–16+`), époques plus rapides et entraînement `48k` sans erreur mémoire. |

## 3. Stockage, RAM et Réseau

### Détail de l'espace disque

- **Archive à télécharger** : ~**5,00 Go** (`ILARIA_RVC-2.4.7.zip`). Prévoyez de la place pour le ZIP et le dossier extrait lors de l'installation.
- **App extraite** : ~**10–15 Go** (inclut runtime PyTorch/CUDA, **ContentVec** et **RMVPE**).
- **Espace supplémentaire éventuel** :
  - `runtime-cu126` (Maxwell/Pascal/Volta uniquement) : plusieurs Go supplémentaires téléchargés au premier lancement.
  - Encodeurs optionnels (**Other → Download embedders**) et paires pré-entraînées G/D.
  - **Checkpoints d'entraînement** (`app/logs/`) et **datasets** (`app/datasets/`) : chaque entraînement peut prendre **2–10+ Go** selon la fréquence de sauvegarde.
- **SSD recommandé** : l'extraction, le chargement des modèles et la lecture des datasets sont nettement plus rapides sur SSD NVMe/SATA que sur disque dur mécanique.

### RAM système

- **8 Go de RAM** suffisent pour convertir des extraits courts en fermant les applis lourdes en arrière-plan.
- **16 Go+ de RAM** sont vivement recommandés pour l'**entraînement**, le **prétraitement audio**, la **construction d'index FAISS** et **Audio Analyzer** sur plusieurs fichiers.

### Connexion Internet

- **Requise** pour : télécharger le ZIP, télécharger CUDA 12.6 au premier lancement sur Maxwell/Pascal/Volta, récupérer des embedders/pré-entraînés optionnels, importer depuis Hugging Face/Google Drive/MEGA ou vérifier les mises à jour (**2.4.0 → 2.4.1**).
- **Non requise** pour : exécuter l'inférence ou l'entraînement une fois les runtimes et modèles présents sur le PC.

## 4. Analyser votre PC automatiquement

Ilaria RVC intègre un assistant dans **Other → PC training advisor** :

1. Choisissez **Sample rate to plan for**, **Precision to evaluate** et **GPU to evaluate**.
2. Cliquez sur **Scan PC and suggest settings**.
3. Consultez **PC Advisor Log** pour obtenir des réglages initiaux adaptés (précision, batch size) et vérifiez la VRAM réelle lors d'un court test.
