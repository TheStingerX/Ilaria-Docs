---
label: "🚀 Mise en route"
order: 95
permalink: /getting-started/
---
# Mise en route

Vous pouvez aussi utiliser Ilaria RVC sur Kaggle avec son GPU distant, même si votre ordinateur n’a pas de GPU NVIDIA. [Ilaria RVC on Kaggle](../ilaria-rvc/kaggle.md)

Pour installer, configurer ou dépanner une application, consultez les [guides pas à pas par application](../other-rvcs/app-guides.md).

## Ilaria RVC

1. Obtenez le package Windows à partir du [référentiel Ilaria's Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC). Vérifiez les instructions de votre version avant de mettre à jour votre pilote NVIDIA ou de modifier les dépendances.
2. Extrayez le package complet dans un dossier accessible en écriture. Exécutez le lanceur à partir de ce dossier afin qu’il puisse trouver le runtime et les outils audio fournis.
3. Ouvrez `ILARIA_RVC.bat`. Si le démarrage échoue, fermez cette tentative et utilisez `ILARIA_RVC_LOGS.bat` pour voir la console.
4. Si l'interface ne s'ouvre pas automatiquement, utilisez [http://127.0.0.1:6969](http://127.0.0.1:6969) sur le même PC. Gardez le lanceur en marche pendant que vous travaillez.

### Convertir un premier clip

1. Importer un modèle compatible depuis **Autre**. Conservez son index de correspondance facultatif avec le point de contrôle.
2. Ouvrez **Single Inference**, sélectionnez votre modèle et ajoutez un enregistrement vocal court et sec.
3. Commencez par l'extracteur de pitch par défaut. Réglez le pitch shift et le **Index Ratio** sur zéro pour une ligne de base.
4. Convertissez le clip et écoutez le début, la phrase la plus forte et toutes les consonnes qui semblent plus douces que dans l'original.
5. Exportez une référence WAV. Suivez [Conversion vocale](../conversion/voice-conversion.md) pour comparer d'autres paramètres sur la même source.

### Mettre à jour et sauvegarder

Pour une installation existante, utilisez **Autre → Mettre à jour Ilaria RVC** et lisez les notes de version avant d'appliquer la mise à jour. Enregistrez une copie de vos ensembles de données, de vos modèles exportés, de vos points de contrôle d'entraînement et de l'audio converti avant de changer de version. Séparez les points de contrôle de formation des modèles d’inférence que vous utilisez ou partagez.

Utilisez les enregistrements et les modèles vocaux que vous êtes autorisé à utiliser. Pour les démos de modèles et la disponibilité, consultez le [catalogue](https://ilariarvc.shop/en/demos/).

[Sources Ilaria RVC et notes d'installation](https://github.com/TheStingerX/Ilaria-RVC) · [Notes de version](https://github.com/TheStingerX/Ilaria-RVC/blob/main/CHANGELOG.md)


## Vonovox

> **Dernière version (bêta)** · [Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

1. Sous Windows avec NVIDIA, téléchargez l'archive de votre génération GPU à partir de [Vonovox sur Hugging Face](https://huggingface.co/dr87/vonovox/tree/main). Extrayez le package complet et démarrez l’application incluse.
2. Chargez un modèle RVC V2 et sélectionnez votre microphone et vos écouteurs dans les paramètres du périphérique audio.
3. Démarrez la conversion avec le tampon par défaut et prononcez une courte phrase. Confirmez que le moniteur sonne clairement avant de [le router vers une autre application](../conversion/real-time.md).

## w-okada VCClient

1. Obtenez un package pour votre plate-forme et votre backend à partir de [VCClient on Hugging Face](https://huggingface.co/wok000/vcclient000/tree/main). Vérifiez qu'il prend en charge RVC et le format de votre modèle. Le matériel pris en charge peut différer entre les modèles PyTorch et ONNX.
2. Extrayez la version et démarrez son serveur ou son lanceur fourni. Ouvrez le client à partir de l'adresse locale indiquée au démarrage s'il ne s'ouvre pas automatiquement.
3. Importez la voix dans un emplacement de modèle, sélectionnez cet emplacement et définissez les périphériques d'entrée et de surveillance. Démarrez la conversion et écoutez avec des écouteurs avant de connecter la sortie à un appel.

## Fourche développée Okada TG

1. Choisissez un package parmi [TGR releases](https://github.com/tg-develop/voice-changer/releases). Sous Windows, utilisez CUDA pour une carte NVIDIA prise en charge ou la version DirectML pour un GPU AMD ou Intel pris en charge.
2. Lancez la build extraite, sélectionnez le périphérique de calcul correspondant et importez la voix dans un emplacement RVC.
3. Réglez le moniteur de votre microphone et de votre casque, puis testez avec le tampon par défaut. Choisissez un extracteur de pitch disponible dans votre build lors de la recréation d'un préréglage à partir d'un autre backend.

## RVC GUI

1. Téléchargez le package de bureau à partir de [RVC GUI releases](https://github.com/Tiger14n/RVC-GUI/releases). Cette application archivée est destinée aux configurations héritées compatibles.
2. Extrayez et lancez l'application. Importez un ZIP contenant le point de contrôle d'inférence et son index correspondant s'il est fourni, puis sélectionnez la voix importée.
3. Choisissez un enregistrement vocal court, commencez à zéro demi-ton et convertissez-le. Écoutez le résultat et enregistrez une copie de référence.

## Applio

1. Obtenez le programme d'installation ou le package pour votre plateforme à partir de [Téléchargements Applio](https://applio.org/). Dans Desktop, terminez la configuration du moteur et confirmez votre périphérique de calcul. Pour une version packagée de Gradio, extrayez l'archive complète, démarrez le lanceur et ouvrez son adresse locale.
2. Ajoutez une voix à la bibliothèque de modèles et ouvrez **Convert Audio**. Dans les anciennes versions de Gradio, l'onglet peut être appelé **Inférence**.
3. Sélectionnez le modèle, l'embedder correspondant et l'index optionnel, puis convertissez un WAV court et propre avec un pitch à zéro. Continuez avec le [workflow de conversion Applio](../conversion/voice-conversion.md#convert-a-recording-in-applio) pour des exemples de lots et de paramètres.

## RVC WebUI (ligne principale)

1. Choisissez un package compatible parmi [versions RVC WebUI](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/releases). Pour un package Windows qui l'inclut, extrayez l'archive et exécutez `go-web.bat`. Gardez la console ouverte lorsque vous utilisez WebUI.
2. Placez le point de contrôle d'inférence dans `assets/weights` et son index de récupération correspondant sous `logs`. Actualisez les listes et sélectionnez votre voix.
3. Entrez le chemin complet d'un court fichier audio, gardez la hauteur à zéro et cliquez sur **Convertir**. Utilisez le contrôle de téléchargement du lecteur de sortie pour l'enregistrer. Consultez le [workflow de conversion principal](../conversion/voice-conversion.md#convert-a-recording-in-mainline-rvc) pour des vérifications supplémentaires.

## Redpanda-vc

1. Obtenez [Redpanda-vc](https://github.com/redpanda343/Redpanda-vc) et démarrez WebUI avec une version adaptée à votre système. Le projet fournit une option de conteneur CUDA pour NVIDIA.
2. Sélectionnez le moteur RVC et chargez une voix RVC compatible avec son index optionnel. Redpanda-vc propose également d'autres familles de modèles, chacune avec son propre format de modèle.
3. Pour un test du microphone du navigateur, autorisez l'accès au microphone, choisissez le GPU prévu si les paramètres de flux exposent la sélection de périphérique et démarrez le flux. Vérifiez le moniteur du casque au tampon par défaut avant de réduire la latence.

Pour une comparaison côte à côte, voir [Outils RVC](../reference/tools.md). Pour le routage, la latence et les pertes du microphone, voir [Conversion vocale en temps réel](../conversion/real-time.md).
