---
label: "Installation et mises à jour"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/installation/
description: "Téléchargez la version NVIDIA prise en charge à partir de Hugging Face."
---
# Installation et mises à jour

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · Le paquet Windows complet est la version 2.4.7. Le ZIP de mise à jour 2.5.0 exclut le runtime et les poids des modèles. De la version 2.4.2 à la 2.4.8, utilisez **Other → Update Ilaria RVC → Check for updates → Download and restart**.

[GitHub](https://github.com/TheStingerX/Ilaria-RVC) · [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC)

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

## Installez le package Windows

Téléchargez la version NVIDIA prise en charge à partir de [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC). Extrayez l'intégralité de l'archive dans un dossier local accessible en écriture et exécutez-y `RUN_ILARIA_RVC.bat`. Le lanceur et le runtime fourni doivent rester ensemble. Si aucun onglet du navigateur ne s'ouvre, essayez `http://127.0.0.1:6969` sur le même PC.

## Avant le premier lancement

Le ZIP complet de Windows fait environ 5,00 Go. Prévoyez de l'espace pour l'archive et les fichiers extraits. Extrayez-le dans un nouveau dossier local dans lequel vous pouvez écrire des fichiers. Conservez le lanceur, le runtime et les ressources ensemble. ContentVec et RMVPE sont inclus. Des encodeurs facultatifs sont disponibles sous **Autre → Télécharger les intégrateurs**.

## Quel runtime CUDA Ilaria RVC utilisera-t-il ?

Ouvrez **Task Manager → Performance → GPU** et lisez le nom exact du modèle. Comparez-le avec le [Tableau de compatibilité GPU](gpu-compatibility.md). La version CUDA ci-dessous fait référence à l'environnement PyTorch utilisé par l'application. Le pilote NVIDIA est un composant système distinct et doit prendre en charge cet environnement.

| GPU présents dans le PC | Runtime | À quoi s'attendre |
| --- | --- | --- |
| GeForce GTX 16 ou RTX 20, 30, 40 ou 50 | PyTorch 2.10.0 avec CUDA 12.8 | Le ZIP complet inclut ce runtime. Extrayez-le et exécutez le lanceur. Sur RTX 50, PyTorch est déjà inclus et prêt à être utilisé avec un pilote NVIDIA compatible. |
| Uniquement NVIDIA Maxwell, Pascal ou Volta | PyTorch 2.10.0 avec CUDA 12.6 | Au premier lancement, le lanceur télécharge et vérifie l'ancien runtime. Il le conserve en `runtime-cu126` et le réutilise lors des lancements ultérieurs. Laissez le lanceur ouvert et autorisez l’accès à Internet et l’espace disque. |
| Aucun GPU NVIDIA local adapté | GPU NVIDIA distant | [Ilaria RVC dans le cloud](../cloud/cloud.md) · [Kaggle](../cloud/kaggle.md) · [Google Colab](../cloud/colab.md) · [Lightning AI Studio](../cloud/lightning-ai.md) |

Si vous disposez de plusieurs GPU, lisez le journal du lanceur pour voir quel runtime a réellement démarré. Le chemin CUDA 12.6 décrit ci-dessus s'applique lorsque tous les GPU NVIDIA du PC proviennent de familles plus anciennes.


### Pourquoi ne pas mettre à jour PyTorch manuellement

Ilaria RVC embarque une combinaison testée de **PyTorch (2.10.0)**, **CUDA (12.8 ou 12.6)**, `torchaudio`, `torchvision`, `faiss` et dépendances audio. N'exécutez **pas** `pip install --upgrade torch` manuellement :

- Mettre à jour PyTorch seul peut casser `torchaudio`, `fairseq`, `onnxruntime` ou des extensions C++/CUDA.
- Des versions plus récentes peuvent supprimer des architectures plus anciennes (Maxwell, Pascal, Volta) ou provoquer des UnpicklingError.
- Attendez toujours une mise à jour officielle d'Ilaria RVC.

## Vérifiez que l'application a démarré correctement

1. Exécutez `RUN_ILARIA_RVC.bat` à partir du dossier extrait. Attendez que l'interface s'ouvre. Si l'ancien runtime est en cours de téléchargement, vérifiez `cu126-runtime-install.log` pour la progression.
2. Si la fenêtre se ferme ou si l'interface ne s'ouvre jamais, exécutez `RUN_ILARIA_RVC_LOGS.bat` et inspectez la première erreur. Vérifiez s'il mentionne le GPU, le pilote, l'accès au téléchargement ou l'espace disque libre. Une page de navigateur vierge peut être le résultat d'une panne du lanceur.
3. Une fois l'interface ouverte, convertissez un court WAV propre avec un modèle d'inférence compatible connu. Vérifiez le résultat avant d'exécuter un gros lot ou de commencer l'entraînement. Voir [Inférence unique et par lots](../convert/inference.md).

Les tests de calcul et de rétropropagation ainsi que le chargement de ContentVec ont été vérifiés sur une RTX 4070. La compatibilité sur d'autres cartes est attendue de par leur architecture et leur sélection d'exécution, et n'a pas été garantie modèle par modèle.

## Passer à la 2.4.7

Téléchargez le ZIP complet (`ILARIA_RVC-2.4.7.zip`), extrayez-le dans un nouveau dossier et lancez `RUN_ILARIA_RVC.bat`.

Gardez l’ancienne installation comme sauvegarde. Copiez les modèles dans models/, les jeux de données dans app/datasets/ et les expériences dans app/logs/. La mise à jour intégrée de la 2.3.0 utilise l’ancienne structure.

[GPU compatibles](gpu-compatibility.md)

### Mettre à jour depuis 2.4.2 - 2.4.8

Si vous utilisez déjà une version de **2.4.2** à **2.4.8**, ouvrez **Other → Update Ilaria RVC → Check for updates** et choisissez **Download and restart**. Depuis **2.4.0** ou **2.4.1**, mettez d'abord à jour vers **2.4.2** ou extrayez le ZIP complet de **2.4.7**.
