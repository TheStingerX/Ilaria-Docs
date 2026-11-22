---
label: "📦 Modèles et fichiers RVC"
order: 93
permalink: /fr/models/
description: "Un modèle RVC modifie le timbre d'une interprétation existante. L'enregistrement source continue de fournir les mots, le phrasé et le rythme."
---
# Modèles et fichiers RVC

Un modèle RVC modifie le timbre d'une interprétation existante. L'enregistrement source continue de fournir les mots, le phrasé et le rythme. Vous avez besoin d'un modèle d'inférence compatible et d'un enregistrement ou d'un signal micro. Commencez avec une seule voix isolée afin d'entendre clairement ce que fait le modèle.

## Ce que font les fichiers

| Fichier | Contenu | Que faire |
| --- | --- | --- |
| `.pth` d'inférence | Les poids du modèle utilisés pour la conversion. | Chargez-le dans le sélecteur de modèle. |
| `.index` correspondant | Des caractéristiques que l'application peut récupérer pendant la conversion. | Ajoutez-le s'il est disponible. Vous pouvez convertir sans lui. |
| `.zip` | Une archive pouvant contenir le modèle, l'index et un README. | Utilisez l'import ZIP si votre application le prend en charge, ou extrayez-le et sélectionnez les fichiers individuellement. |
| Checkpoints d'entraînement, comme `G_*.pth` et `D_*.pth` | Fichiers intermédiaires servant à reprendre l'entraînement, selon l'application. | Utilisez le modèle d'inférence exporté dans votre convertisseur. L'extension `.pth` seule n'identifie pas le rôle du fichier. |

## Quel index dois-je utiliser ?

Dans l'entraînement de RVC WebUI (Mainline - RVC original), `trained_*.index` est l'index FAISS après qu'il a appris à organiser les caractéristiques, avant l'ajout des vecteurs de caractéristiques. `added_*.index` est la version peuplée. Pour la conversion, choisissez le `added_*.index` correspondant si les deux existent. Si vous n'avez que `trained_*.index`, laissez la récupération (retrieval) désactivée ou générez l'index peuplé depuis l'expérience. D'autres applications peuvent utiliser des noms de fichiers différents.

Un `.index` fourni avec un modèle exporté est très probablement déjà peuplé, même si son nom ne comporte pas le préfixe `added_`. Le nom seul ne peut pas confirmer son contenu.

## Que sont les dossiers d'entraînement ?

Ces dossiers apparaissent couramment dans `logs/<experiment>/`. Ce sont des fichiers de travail pour l'entraînement et l'évaluation. Une voix terminée n'a besoin que de son `.pth` d'inférence exporté et, en option, de l'index peuplé correspondant.

| Dossier | Contenu |
| --- | --- |
| `0_gt_wavs` | Extraits vocaux prétraités à la fréquence d'échantillonnage de l'expérience. Ils servent de cibles audio pendant l'entraînement. |
| `1_16k_wavs` | Copies à 16 kHz des extraits utilisées pour l'extraction de caractéristiques. |
| `2a_f0` | Hauteur extraite enregistrée sous forme de valeurs discrètes pour les modèles conditionnés par la hauteur. |
| `2b-f0nsf` | Hauteur continue en hertz pour les modèles conditionnés par la hauteur. |
| `3_feature768` | Vecteurs de caractéristiques par extrait à 768 dimensions au format RVC v2. Ces caractéristiques servent à l'entraînement et peuvent aussi peupler l'index de récupération. |
| `eval` | Sortie d'évaluation, comme les fichiers d'événements TensorBoard si le build les écrit ici. Son contenu dépend de l'entraîneur. |

## Choisir un modèle adapté

Écoutez des démos ressemblant à votre entrée prévue. Pour la parole, écoutez les consonnes, les mots faibles et les pauses naturelles. Pour le chant, vérifiez les notes tenues ainsi que les extrémités grave et aiguë de votre tessiture. Si vous prévoyez un usage en direct, testez en parlant librement et en variant le volume. Vérifiez le moteur et la version du modèle documentés, les limitations de langue connues et les conditions d'utilisation. Un modèle qui sonne bien dans une langue peut paraître inégal dans une autre, même si le dataset d'entraînement inclut les deux.

## Importer et organiser vos modèles

1. Téléchargez depuis une source fiable et lisez les notes incluses. Les fichiers de modèle peuvent être dangereux lorsqu'ils sont chargés par des logiciels désérialisant des objets arbitraires.
2. Conservez chaque voix et chaque version dans son propre dossier, avec le `.pth` exporté, son `.index` optionnel et les notes. Les noms de fichiers seuls ne suffisent pas pour associer un index à un modèle.
3. Dans Ilaria RVC, ouvrez **Other → Import Local Models**. Choisissez le `.pth` d'inférence ou un ZIP pris en charge, puis ajoutez le `.index` correspondant si vous l'avez. D'autres applications peuvent demander d'actualiser la liste des modèles après import.

## Lancer une première conversion

1. Enregistrez environ dix secondes d'une seule voix dans une pièce calme, sans musique, sans forte réverbération ni écrêtage.
2. Sélectionnez le modèle souhaité, laissez la récupération d'index désactivée et commencez à décalage de hauteur nul. Enregistrez le WAV converti comme référence.
3. Si le registre paraît forcé, comparez de petits décalages de hauteur en demi-tons sur la même entrée. Le décalage de hauteur change le registre, jugez-le donc séparément de l'identité vocale.
4. Une fois la hauteur réglée, testez une légère augmentation de la récupération avec l'index correspondant. Écoutez si le caractère vocal devient plus net, puis vérifiez si les respirations ou consonnes deviennent rugueuses. Gardez le réglage qui sonne le mieux, y compris zéro.

## Diagnostiquer les problèmes courants

| Symptôme | Quoi vérifier |
| --- | --- |
| L'application ne parvient pas à charger le modèle | Confirmez le moteur, la version et le type de fichier. Extrayez le ZIP si l'importateur le refuse, puis sélectionnez les poids d'inférence exportés. |
| Le résultat sonne encore comme la source | Comparez avec un autre modèle fiable sur le même extrait. Un timbre source persistant peut venir du modèle ou de son embedder d'entraînement, y compris des variantes HuBERT. Augmenter la récupération peut ne pas suffire. |
| Les respirations ou consonnes sonnent métalliques | Comparez avec la récupération désactivée. Si le problème persiste sur des entrées propres et différents réglages, il peut venir du modèle et nécessiter un réentraînement. |
| Seule la sortie en direct saccade | Testez le même modèle sur un fichier. Si la conversion de fichier fonctionne, vérifiez le microphone, le routage audio et le tampon dans l'application en direct. |

## Garder un modèle prêt à réutiliser

Notez la version fonctionnelle de l'application, la version du modèle, la hauteur choisie et les réglages de récupération avec un court extrait de référence. Testez à nouveau après un changement d'application ou une mise à jour du modèle. Si vous entraînez vos propres voix, conservez l'export pour l'inférence et les fichiers nécessaires à la reprise de l'entraînement dans des dossiers séparés.

## Continuer avec les guides

- [Guides d'applications](../other-rvcs/app-guides.md)
- [Bibliothèque de modèles Ilaria RVC](../ilaria-rvc/manage/model-library.md)
- [Inférence](../ilaria-rvc/convert/inference.md)
- [Préparation du dataset](../model-training/dataset-preparation.md)
- [Dépannage](../reference/troubleshooting.md)
