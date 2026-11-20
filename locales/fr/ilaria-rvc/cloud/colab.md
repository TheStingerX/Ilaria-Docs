---
label: "Google Colab"
icon: ":tangerine:"
order: 97
permalink: /ilaria-rvc/colab/
description: "Préparez un WAV court et propre, un modèle d’inférence compatible et, pour l’entraînement, un jeu de données sauvegardé séparément."
---
# Google Colab

[Notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb) · [Google Colab](https://colab.research.google.com/github/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb)

## Avant de commencer

Préparez un WAV court et propre, un modèle d’inférence compatible et, pour l’entraînement, un jeu de données sauvegardé séparément.

1. Ouvrez le notebook dans Colab avec un environnement GPU.
2. Exécutez les cellules 1 à 4 dans l’ordre pour vérifier le GPU, installer les dépendances, télécharger les poids et lancer l’interface.
3. Ouvrez la vue intégrée et gardez la session connectée.

## Vérifier les cellules

Vérifiez que la première cellule détecte une GPU NVIDIA. Attendez la fin de l’installation avant de télécharger les poids. Pour l’inférence seule, utilisez `TRAINING_SAMPLE_RATES = []`. Gardez `DOWNLOAD_FCPE` si vous utilisez FCPE.

{{ include "kaggle.md#cloud-inference-dataset" }}

{{ include "kaggle.md#cloud-training" }}

## Exporter et arrêter

Activez `EXPORT = True` et, pour reprendre l’entraînement, `INCLUDE_CHECKPOINTS`. Téléchargez le ZIP avant d’exécuter `STOP = True`.

### Vérifier le ZIP

Vérifiez le WAV et le modèle exportés. Activez `INCLUDE_CHECKPOINTS` pour reprendre un entraînement et conservez le jeu de données séparément.

## Résoudre les problèmes

Lisez la première erreur, corrigez-la et relancez la cellule. Si le modèle est absent, vérifiez le journal d’importation. Si la mémoire GPU est saturée, réduisez la taille du lot.

[Ilaria RVC dans le cloud](cloud.md)
