# Présentation d'Ilaria RVC

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · Le paquet Windows complet est la version 2.4.7. Le ZIP de mise à jour 2.5.0 exclut le runtime et les poids des modèles. De la version 2.4.2 à la 2.4.8, utilisez **Other → Update Ilaria RVC → Check for updates → Download and restart**.

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Vous pouvez aussi utiliser Ilaria RVC sur Kaggle avec son GPU distant, même si votre ordinateur n’a pas de GPU NVIDIA. [Ilaria RVC on Kaggle](cloud/kaggle.md)

Ilaria RVC 2.4.2 est une application Windows basée sur RVC WebUI (Mainline - Original RVC). Son interface s'ouvre dans un navigateur, tandis que son moteur fourni fonctionne sur le PC. Le package Windows actuel cible NVIDIA. La version comprend l'inférence, le TTS, la formation de modèles, une bibliothèque de modèles et l'analyse audio.

 | Où | Ce que vous pouvez faire |
| --- | --- |
 | Formation | Importez et vérifiez des ensembles de données, prétraitez, extrayez des fonctionnalités, exécutez ou mettez en file d'attente des expériences, prévisualisez les points de contrôle et créez des index de récupération. |
 | Inférence | Convertissez un clip ou un dossier, générez de la parole, sélectionnez des encodeurs et des extracteurs de hauteur et appliquez un traitement facultatif. |
 | Autre | Importez, téléchargez, inspectez, fusionnez et exportez des modèles. Installez des intégrations et des pré-entraînements en option, analysez l'audio, analysez le matériel et mettez à jour l'application. |
 | Tableau de bord des formations | Suivez les exécutions actives, inspectez les journaux existants, ouvrez TensorBoard et générez un rapport de diagnostic. |
 | Glossaire | Consultez les paramètres et les flux de travail dans l'application. |

Commencez par [installation](install/installation.md), puis suivez [inférence unique et par lots](convert/inference.md), [une expérience de formation](train/training-workflow.md) ou [gestion de modèles](manage/model-library.md). Pour la terminologie courante, ouvrez le [glossaire](../reference/glossary.md).

## Ce qui fonctionne localement

Le lanceur démarre un service local sur le port 6969 par défaut. La conversion de fichiers et la formation utilisent des fichiers de modèle locaux. Le téléchargement de modèles, la mise à jour de l'application et l'utilisation d'Edge TTS nécessitent une connectivité. Pour la génération vocale hors ligne, choisissez une voix Windows installée. Le navigateur est également lié au cycle de vie du service dans cette version. Terminez ou enregistrez en toute sécurité le travail actif avant de fermer le dernier onglet.

[Commandes d’entraînement](train/training-buttons.md) · [Commandes d’inférence](convert/inference-buttons.md) · [Panneaux de Other](manage/other-buttons.md)
