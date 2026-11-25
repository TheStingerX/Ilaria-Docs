---
label: "Convertisseur ONNX ↔ PTH"
icon: ":repeat:"
order: 87
permalink: /ilaria-rvc/onnx-converter/
---

# Convertisseur ONNX ↔ PTH

Dans **Other → Convert model weights**, choisissez un modèle installé ou fournissez un fichier. Exportez un modèle RVC HiFi-GAN avec guidage de hauteur en ONNX pour un client externe compatible. La restauration exacte en `.pth` est disponible pour les ONNX exportés par Ilaria RVC. Gardez le `.pth` original si vous utilisez un autre exportateur. [Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)

## Exporter un modèle en ONNX

Choisissez un modèle d’inférence installé ou indiquez le `.pth` exporté. Sélectionnez la conversion en ONNX et enregistrez le résultat. Chargez-le dans le client externe et testez-le avec un court enregistrement.

## Restaurer le PTH d’origine

Indiquez le fichier `.onnx` exporté par Ilaria RVC. Sélectionnez la conversion en `.pth`, enregistrez le modèle restauré et testez-le dans **Inference**.

[Safetensors ↔ PTH](safetensors-converter.md)
