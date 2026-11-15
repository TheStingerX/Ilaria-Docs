---
label: "⚙️ Contrôles et flux de travail de formation"
order: 87
permalink: /ilaria-rvc/training-controls/
---
# Contrôles de formation et flux de travail

## Quatre étapes

 | Étape | Entrées | Vérifier avant de continuer |
| --- | --- | --- |
 | Données de processus | Chemin de l'ensemble de données, débit, nom de l'expérience et threads du processeur | Importation terminée, l'audio utilisable a été lu et les journaux appartiennent à l'expérience prévue. |
 | Extraction de fonctionnalités | Audio préparé, guidage de pitch, extracteur et intégration de formation | L'étape terminée en utilisant les paramètres attendus. |
 | Entraîner Pth | Caractéristiques, paire G/D, cible, GPU, lot et précision | Les avancées de progression et les points de contrôle périodiques sont écrits. |
 | Train Feature Index | Fonctionnalités extraites et algorithme d'index | L'index généré appartient à cette exécution et peut être associé à son exportation d'inférence. |

## Architecture et performances

La version 2.1.0 propose des réglages 32, 40 et 48 kHz avec des combinaisons disponibles déterminées par le vocodeur. HiFi-GAN et RefineGAN ont des contraintes différentes. Vérifiez la paire compatible avant le prétraitement. Le guidage de pas contrôle si les fonctionnalités F0 conditionnent le modèle. Configurez les threads du processeur pour la machine et sélectionnez un GPU NVIDIA pris en charge pour la formation. FP32 est la valeur par défaut dans l'interface utilisateur cochée. FP16 peut réduire la pression de la mémoire sur le matériel pris en charge. La taille du lot contrôle le nombre d’échantillons traités ensemble. Si la VRAM est épuisée, réduisez le lot et désactivez la mise en cache facultative.

**Fichiers de formation silencieux** contrôle le nombre d'exemples silencieux inclus dans l'application. Comparez les mêmes pauses lors de l’évaluation d’un changement. **Algorithme d'index** propose Auto, Faiss et KMeans. Conservez l'index généré avec son modèle correspondant et désactivez la récupération lors de l'évaluation du point de contrôle seul.

## Cibles d'époque et d'étape

Une époque couvre une itération sur l'ensemble de données préparé. Le mode étape cible un nombre total de mises à jour par lots et prend en charge la reprise au cours d'une époque. La mise en cache des ensembles de données GPU doit être désactivée en mode étape dans cette version. La fréquence de sauvegarde est mesurée en époques, même lors de l'utilisation d'un objectif de pas. Utilisez un objectif au-dessus de la progression déjà réalisée lors de la prolongation d'une exécution. D'autres étapes valent la peine d'être testées lorsque le son comparable s'améliore.

## Conserver un enregistrement reproductible

Enregistrez la révision de l'ensemble de données, la fréquence d'échantillonnage, l'encodeur, l'extracteur, le vocodeur, les pré-entraînements, la précision, la taille du lot et enregistrez la cadence. Si vous réutilisez le même nom avec un tarif incompatible, l'interface utilisateur peut signaler la non-concordance. Démarrez une expérience distincte pour une nouvelle configuration et conservez l’ancienne expérience disponible à des fins de comparaison.
