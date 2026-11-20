---
label: "Contrôles et flux de travail de formation"
icon: ":gear:"
order: 87
permalink: /ilaria-rvc/training-controls/
description: "La version 2.1.0 propose des réglages 32, 40 et 48 kHz avec des combinaisons disponibles déterminées par le vocodeur. HiFi-GAN et RefineGAN ont des..."
---
# Contrôles de formation et flux de travail

[Télécharger Ilaria RVC 2.4.0 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

[Commandes d’entraînement](training-buttons.md)

> **Nouveautés de la 2.3.0** · MRF HiFi-GAN prend en charge l’entraînement et l’inférence. Le catalogue ajoute 15 paires générateur/discriminateur, dont KLM 4.4 X1 et X2 à 40 kHz. Portuguese HuBERT Base est disponible en inférence. En entraînement RVC v2, importez et enregistrez un HuBERT personnalisé. Sa configuration est conservée dans le modèle exporté.

> **2.4.0** · Le paquet Windows déplace l’application et le runtime dans app/. Les modèles restent à la racine dans models/. Ajout de Colab, Lightning AI Studio, des indications de téléchargement des embedders, et de Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). pip est réparé et pywin32 est inclus.

## Quatre étapes

 | Étape | Entrées | Vérifier avant de continuer |
| --- | --- | --- |
 | Données de processus | Chemin de l'ensemble de données, débit, nom de l'expérience et threads du processeur | Importation terminée, l'audio utilisable a été lu et les journaux appartiennent à l'expérience prévue. |
 | Extraction de fonctionnalités | Audio préparé, guidage de pitch, extracteur et intégration de formation | L'étape terminée en utilisant les paramètres attendus. |
 | Entraîner Pth | Caractéristiques, paire G/D, cible, GPU, lot et précision | Les avancées de progression et les points de contrôle périodiques sont écrits. |
 | Train Feature Index | Fonctionnalités extraites et algorithme d'index | L'index généré appartient à cette exécution et peut être associé à son exportation d'inférence. |

## Architecture et performances

La version 2.1.0 propose des réglages 32, 40 et 48 kHz avec des combinaisons disponibles déterminées par le vocodeur. HiFi-GAN et RefineGAN ont des contraintes différentes. Vérifiez la paire compatible avant le prétraitement. Le guidage de pas contrôle si les fonctionnalités F0 conditionnent le modèle. Configurez les threads du processeur pour la machine et sélectionnez un GPU NVIDIA pris en charge pour la formation. FP32 est la valeur par défaut dans l'interface utilisateur cochée. FP16 peut réduire la pression de la mémoire sur le matériel pris en charge. La taille du lot contrôle le nombre d’échantillons traités ensemble. Si la VRAM est épuisée, réduisez le lot et désactivez la mise en cache facultative.

**Fichiers de formation silencieux** contrôle le nombre d'exemples silencieux inclus dans l'application. Comparez les mêmes pauses lors de l’évaluation d’un changement.

## Comment fonctionne l'algorithme d'indexation

Chaque option produit un **index de récupération FAISS**. Le sélecteur modifie les vecteurs de caractéristiques extraits qui entrent dans l'index, indépendamment de la formation du modèle vocal. Un vecteur de caractéristiques représente une courte trame audio. Les seuils ci-dessous comptent les vecteurs, et non les clips, les époques ou les minutes.

| Option | Ce que fait Ilaria RVC | Quand l'essayer |
| --- | --- | --- |
| **Auto** | Conserve tous les vecteurs jusqu'à **200 000**. Au-delà, il tente de les réduire à **10 000** centres de cluster. Si le clustering échoue, il conserve les vecteurs d'origine. | Commencez ici pour un premier index. Consultez le journal de l'index des trains pour voir quel chemin Auto a emprunté. |
| **Faiss** | Conserve tous les vecteurs extraits et construit l'index FAISS sans passe de réduction KMeans. | Essayez-le lorsque vous souhaitez conserver des exemples dans lesquels un index plus petit pourrait faire la moyenne et disposer de suffisamment de RAM et d'espace disque. |
| **KMéans** | Utilise MiniBatchKMeans pour représenter des vecteurs similaires avec des centres partagés. Il conserve normalement environ un centre pour dix vecteurs, dans une plage de **39 à 10 000** centres et toujours moins que le nombre d'entrées. Il conserve tous les vecteurs pour les entrées de **39 ou moins** et signale une erreur de clustering plutôt que de reculer silencieusement. | Comparez-le lorsque vous souhaitez un index plus petit. La passe de clustering nécessite un travail supplémentaire et l'index réduit peut perdre des détails fins. |

Un index plus petit est généralement plus léger à stocker. Cela ne garantit pas une construction plus rapide ou une meilleure conversion. Le clustering nécessite toujours le chargement des fonctionnalités extraites. Si Auto s'appuie sur un grand ensemble de données, la construction à partir de tous les vecteurs peut toujours manquer de mémoire.

### Comparez les résultats avant de choisir

1. Terminez **Feature Extraction**, puis exécutez **Train Index**. Vérifiez le journal pour le nombre de vecteurs ou de centres. Faites une copie de l'index résultant avant d'en générer un deuxième avec un autre paramètre.
2. Utilisez la même inférence `.pth` et un enregistrement propre et tenu en attente. Réglez d'abord **Index Ratio** sur zéro pour entendre le point de contrôle seul. L'index est facultatif pour la conversion.
3. Comparez les deux index correspondants au même **Rapport d'indice** non nul, avec la hauteur et les effets maintenus constants. Écoutez les consonnes claires, les voyelles soutenues, les sons inhabituels et la quantité de caractère de la voix cible conservée. Gardez celui qui sonne mieux sur plusieurs clips.
4. Conservez l'index choisi avec le modèle et la configuration des fonctionnalités qui l'ont produit. Si vous modifiez l'algorithme, reconstruisez l'index à partir des fonctionnalités compatibles existantes. Si vous modifiez l'intégration de formation, extrayez les fonctionnalités correspondantes pour cette expérience au lieu de réutiliser l'ancien index.

## Cibles d'époque et d'étape

Une époque couvre une itération sur l'ensemble de données préparé. Le mode étape cible un nombre total de mises à jour par lots et prend en charge la reprise au cours d'une époque. La mise en cache des ensembles de données GPU doit être désactivée en mode étape dans cette version. La fréquence de sauvegarde est mesurée en époques, même lors de l'utilisation d'un objectif de pas. Utilisez un objectif au-dessus de la progression déjà réalisée lors de la prolongation d'une exécution. D'autres étapes valent la peine d'être testées lorsque le son comparable s'améliore.

## Conserver un enregistrement reproductible

Enregistrez la révision de l'ensemble de données, la fréquence d'échantillonnage, l'encodeur, l'extracteur, le vocodeur, les pré-entraînements, la précision, la taille du lot et enregistrez la cadence. Si vous réutilisez le même nom avec un tarif incompatible, l'interface utilisateur peut signaler la non-concordance. Démarrez une expérience distincte pour une nouvelle configuration et conservez l’ancienne expérience disponible à des fins de comparaison.
