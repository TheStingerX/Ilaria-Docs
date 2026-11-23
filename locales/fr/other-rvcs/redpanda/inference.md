---
label: "Inférence sur fichier"
icon: ":headphones:"
order: 98
permalink: /ilaria-rvc/redpanda/inference/
description: "Utilisez Inference pour convertir un enregistrement ou un dossier entier. Une voix RVC utilise un modèle .pth d’inférence et une voix Casual Voice Changer utilise .cvc."
---

# Inférence sur fichier

[Version précompilée pour Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) · [Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Utilisez Inference pour convertir un enregistrement ou un dossier entier. Une voix RVC utilise un modèle .pth d’inférence et une voix Casual Voice Changer utilise .cvc.

## Convertir un enregistrement

Ouvrez **Inference**. Dans **Voice model**, choisissez un `.pth` RVC d’inférence ou une voix `.cvc`. Pour RVC, ajoutez l’`.index` associé s’il est disponible. Gardez **Index rate** à zéro pour le premier essai sans index. Les checkpoints `G_*.pth` et `D_*.pth` servent dans Training.

## Tester et convertir un dossier

Commencez par un WAV court et propre, zéro demi-ton et un export WAV. Choisissez une sortie séparée dans **Save as** et écoutez le résultat avant de modifier la hauteur ou le modèle. Activez ensuite **Folder mode**, choisissez un petit dossier et une destination séparée, puis vérifiez quelques conversions avant de tout traiter.

[Installer Redpanda VC](first-run.md) · [Conversion vocale en temps réel](live-audio.md) · [Entraînement avec Casual Voice Changer](causal-training.md) · [RVC Training](training.md)

## Code source et version

[Inference UI](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/desktop/ui/index.html) · [Conversion](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/shared/desktop/convert.py)
