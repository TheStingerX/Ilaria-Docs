# Formation et points de contrôle

[Télécharger Ilaria RVC 2.4.0 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

## Préparer une expérience

Sélectionnez un ensemble de données et choisissez l'architecture RVC compatible, la fréquence d'échantillonnage, le guidage de pitch, l'intégration et les pré-entraînements générateur/discriminateur. Utilisez un nom d'expérience unique et une taille de lot adaptée à la VRAM. Exécutez **Process Data**, puis extrayez les fonctionnalités de présentation et de contenu avant l'entraînement.

## Comparez les aperçus et les exports

Présentez un court clip de test avant l'entraînement. Activez les **Aperçus de formation** si votre version le propose et utilisez le même clip entre les points de contrôle. Comparez la diction, la hauteur et les artefacts indésirables. Utilisez le tableau de bord pour le timing et les décomptes, et utilisez des tests d'écoute pour sélectionner une exportation.

## Reprendre et exporter

Utilisez **Arrêter et enregistrer**, attendez la confirmation, puis conservez le dossier d'expérience et les points de contrôle G/D correspondants ensemble. À des fins d'inférence, exportez le point de contrôle vocal compact et conservez son index correspondant. Voir [Former un modèle vocal RVC](../../model-training/training.md) pour le réglage et la récupération.
