---
label: "Intégrateurs et pré-entraînements"
icon: ":jigsaw:"
order: 88
permalink: /ilaria-rvc/embedders/
description: "Ouvrez Paramètres d'intégration ci-dessous Traitement audio."
---
# Intégrateurs et pré-entraînements

[Télécharger Ilaria RVC 2.4.0 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

> **Nouveautés de la 2.3.0** · Portuguese HuBERT Base est disponible en inférence. En entraînement RVC v2, importez et enregistrez un HuBERT personnalisé. Sa configuration est conservée dans le modèle exporté.

> **2.4.0** · Le paquet Windows déplace l’application et le runtime dans app/. Les modèles restent à la racine dans models/. Ajout de Colab, Lightning AI Studio, des indications de téléchargement des embedders, et de Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). pip est réparé et pywin32 est inclus.

## Intégrateurs d'inférence

Ouvrez **Paramètres d'intégration** ci-dessous **Traitement audio**. Lit automatiquement les métadonnées du modèle stocké et utilise ContentVec lorsqu'aucun intégrateur n'est enregistré. Si l'éditeur spécifie un encodeur, utilisez cet encodeur. Un index de récupération a besoin de fonctionnalités compatibles issues de la même expérience. Laissez la récupération désactivée lorsque l’appairage est incertain.

Les encodeurs d'inférence disponibles incluent ContentVec, Spin, Spin-v2 et la base HuBERT chinoise, japonaise et coréenne. Ouvrez **Autre → Télécharger les modules intégrés** pour installer les modèles facultatifs un par un. Pour les ressources HuBERT personnalisées, sélectionnez **custom**, nommez le dossier, fournissez les poids et les fichiers de configuration correspondants (.bin et .json) et installez-les ensemble.

> Les checkpoints HuBERT génériques sont déconseillés comme encodeur par défaut pour la conversion vocale. Entraînés pour représenter la parole, ils peuvent conserver des informations sur le timbre de la voix source dans le résultat. Utilisez l’encodeur attendu par le modèle RVC, par exemple ContentVec si le modèle a été entraîné avec lui.

## Compatibilité des formations

La formation expose ContentVec et Spin-v2. Changer l'encodeur nécessite de nouvelles fonctionnalités et un nom d'expérience distinct. Faites correspondre votre paire de générateur et de discriminateur au vocodeur, à la fréquence d'échantillonnage d'entraînement, à la génération RVC et à la configuration du pitch, et suivez les exigences de l'encodeur de l'éditeur de la paire. Ilaria RVC 2.1.0 prend en charge la formation RefineGAN spécifiquement à 32 kHz avec RVC V2 et le guidage de pitch. Le téléchargeur peut répertorier d’autres tarifs à utiliser ailleurs.

## Obtenez une paire G/D

Sous **Autre → Télécharger des modèles pré-entraînés**, utilisez un référentiel ou une archive pré-entraînée, ou saisissez un lien vers le point de contrôle G et son point de contrôle D correspondant si la découverte a besoin d'aide. Le sélecteur de **Pré-entraînements recommandés** affiche les variantes de catalogue disponibles et leurs taux d'échantillonnage. Vérifiez la variante choisie avant d'installer les deux fichiers. Revenez à Formation, actualisez la liste et sélectionnez la paire installée. Si vous utilisez intentionnellement l’initialisation aléatoire, choisissez Aucun. Séparez les modèles d’inférence et les pré-entraînements de formation.

Si la formation se termine immédiatement après la sélection d'une paire, vérifiez les deux fichiers et la configuration de l'expérience enregistrée avant de modifier la taille du lot ou de démarrer une nouvelle exécution.
