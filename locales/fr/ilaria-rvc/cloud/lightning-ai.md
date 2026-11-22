---
label: "Lightning AI Studio"
icon: ":zap:"
order: 96
permalink: /fr/ilaria-rvc/lightning-ai/
description: "Exécutez Ilaria RVC dans un navigateur avec un GPU fourni par la plateforme cloud. Choisissez un notebook ci-dessous. Activez un accélérateur NVIDIA avant d'exécuter la première cellule."
---
# Lightning AI Studio

[Ouvrir le notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-LightningAI.ipynb) · [Lightning AI Studio](https://lightning.ai/)

Exécutez Ilaria RVC dans un navigateur avec un GPU fourni par la plateforme cloud. Choisissez un notebook ci-dessous. Activez un accélérateur NVIDIA avant d'exécuter la première cellule.

## Avant de commencer

Préparez un court fichier WAV propre et un modèle d'inférence compatible. Pour l'entraînement, conservez le dataset d'origine et quelques extraits de test séparés sur votre propre ordinateur. Le notebook s'exécute sur une machine Linux distante.

### Crédits, offre gratuite et disponibilité GPU

Lightning AI utilise un **modèle de facturation par crédits** (`1 crédit = $1 USD`, facturé à la seconde de calcul GPU ; voir [Tarifs Lightning AI](https://lightning.ai/pricing)) :

- **Offre gratuite :** Inclut **un Studio gratuit à 4 CPU** (jusqu'à 4 heures continues avant redémarrage) et **10 Go de stockage gratuit** (le stockage au-delà de 10 Go est facturé mensuellement).
- **Crédits de départ vs offres payantes :** Les nouveaux comptes reçoivent généralement des crédits initiaux après inscription/vérification (pas d'heures GPU gratuites renouvelées chaque mois). Les abonnements payants **Pro** fournissent une allocation mensuelle de crédits.
- **Vérifiez votre solde et les GPU :** Ouvrez le tableau de bord / panneau de facturation de votre Studio pour vérifier votre solde de crédits restant avant de démarrer une instance GPU, et rappelez-vous que les types de GPU spécifiques (comme T4, L4 ou L40) dépendent de la disponibilité régionale et du compte. Effectuez d'abord l'installation des dépendances sur le Studio CPU gratuit, puis basculez sur GPU uniquement lorsque vous êtes prêt à lancer l'inférence ou l'entraînement.

## Exécuter sur Lightning AI Studio

1. Créez un GPU Studio, importez le notebook et ouvrez-le dans JupyterLab.
2. Exécutez les cellules 1 à 4 dans l'ordre. Elles vérifient le GPU, installent les dépendances, téléchargent les poids de base et lancent la Web UI. Réglez `TRAINING_SAMPLE_RATES` sur `[]` pour l'inférence seule ou choisissez les taux d'échantillonnage avec lesquels vous comptez entraîner.
3. Ouvrez **Port viewer** dans votre Studio et sélectionnez le port affiché par la cellule de lancement (`7865` par défaut). Gardez le port privé.

## Vérifier chaque cellule avant de continuer

La vérification du GPU doit identifier un périphérique NVIDIA. Sinon, changez d'abord l'accélérateur. Attendez la fin de l'installation des dépendances avant de télécharger les poids. Réglez `TRAINING_SAMPLE_RATES = []` pour l'inférence seule. Pour l'entraînement, choisissez le taux correspondant à votre modèle et à votre paire de pré-entraînés. Laissez `DOWNLOAD_FCPE` activé si vous prévoyez d'utiliser FCPE.

{{ include "kaggle.md#cloud-inference-dataset" }}

{{ include "kaggle.md#cloud-training" }}

## Exporter et arrêter

Définissez `EXPORT = True` et exécutez la cellule d'exportation. Activez `INCLUDE_CHECKPOINTS` si vous devez reprendre l'entraînement. Enregistrez le ZIP localement avant d'arrêter la session, puis exécutez la cellule d'arrêt avec `STOP = True`.

## Si le démarrage échoue

Si la première cellule ne voit pas le GPU, vérifiez votre accélérateur et relancez-la. Si l'interface ne s'ouvre pas, lisez la sortie de la cellule de lancement, confirmez que le serveur est prêt et rouvrez la vue.

### Vérifier le ZIP de sortie

Pour l'inférence, vérifiez votre WAV exporté et les fichiers du modèle. Pour l'entraînement, activez `INCLUDE_CHECKPOINTS` afin d'inclure les journaux d'expérience, puis vérifiez l'archive avant de fermer la session. Conservez le dataset d'origine séparément.

## Résoudre les problèmes courants

Si l'installation échoue, lisez la première erreur et relancez la cellule en échec après l'avoir corrigée. Si l'application s'ouvre mais que votre modèle manque, vérifiez le journal d'importation et actualisez la liste. En cas d'erreur de mémoire insuffisante (OOM), commencez par un extrait plus court ou réduisez la taille de lot (batch size) d'entraînement. Si la Web UI se ferme, rouvrez-la depuis la même cellule de lancement ou le même port tant que la session est active.

[Ilaria RVC dans le cloud](cloud.md)
