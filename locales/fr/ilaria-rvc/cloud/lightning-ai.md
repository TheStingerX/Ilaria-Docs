---
label: "Lightning AI Studio"
icon: ":zap:"
order: 96
permalink: /ilaria-rvc/lightning-ai/
description: "Préparez un WAV court et propre, un modèle d’inférence compatible et, pour l’entraînement, un jeu de données sauvegardé séparément."
---
# Lightning AI Studio

[Notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-LightningAI.ipynb) · [Lightning AI Studio](https://lightning.ai/)

## Avant de commencer

Préparez un WAV court et propre, un modèle d’inférence compatible et, pour l’entraînement, un jeu de données sauvegardé séparément.

1. Créez un Studio GPU et ouvrez le notebook importé dans JupyterLab.
2. Exécutez les cellules 1 à 4 dans l’ordre pour vérifier le GPU, installer les dépendances, télécharger les poids et lancer l’interface.
### Crédits, offre gratuite et disponibilité GPU

Lightning AI fonctionne par **crédits** (1 crédit =  USD à la seconde ; voir [Tarifs Lightning AI](https://lightning.ai/pricing)) :

- **Offre gratuite :** Inclut **un Studio 4-CPU gratuit** (jusqu'à 4h continues avant redémarrage) et **10 Go de stockage gratuits**.
- **Crédits de départ vs offres payantes :** Les nouveaux comptes reçoivent des crédits de départ après vérification (pas d'heures GPU gratuites renouvelées chaque mois). Les plans **Pro** incluent des crédits mensuels.
- **Vérifier le solde et les GPU :** Consultez votre solde dans le tableau de bord du Studio et préparez l'environnement sur le Studio CPU gratuit avant d'activer un GPU.

3. Ouvrez le port affiché dans **Port viewer** (7865 par défaut) et gardez-le privé.

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
