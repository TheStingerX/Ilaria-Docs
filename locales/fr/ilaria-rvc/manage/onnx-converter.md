---
label: "Convertisseur ONNX ↔ PTH"
icon: ":repeat:"
order: 87
permalink: /ilaria-rvc/onnx-converter/
---

# Convertisseur ONNX ↔ PTH

Dans **Other → Convert model weights**, choisissez un modèle installé ou fournissez un fichier. Exportez un modèle RVC HiFi-GAN avec guidage de hauteur en ONNX pour un client externe compatible. La restauration exacte en `.pth` est disponible pour les ONNX exportés par Ilaria RVC. Gardez le `.pth` original si vous utilisez un autre exportateur. [Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)

[ZIP de mise à jour Windows](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.5.1/ILARIA_RVC-update-2.5.1.zip?download=true)

## Ce que contient chaque fichier

Le `.pth` est le checkpoint d’inférence d’Ilaria RVC. Le `.onnx` contient un graphe et des poids destinés à un client compatible. Gardez l’`.index` à part et utilisez-le si le client prend en charge la recherche de caractéristiques.

## Avant l’exportation

Utilisez **Ilaria RVC 2.5.1 ou plus récent** et **PyTorch 2.6 ou plus récent**. Il faut un modèle d’inférence **HiFi-GAN** avec guidage de hauteur et un `.pth` de **512 MiB** maximum. Si vous avez uniquement des checkpoints d’entraînement, exportez d’abord la voix. L’export se fait sur le CPU.

## Exporter un modèle en ONNX

Choisissez un modèle d’inférence installé ou indiquez le `.pth` exporté. Sélectionnez la conversion en ONNX et enregistrez le résultat. Chargez-le dans le client externe et testez-le avec un court enregistrement.

Choisissez **ONNX** comme format de sortie. Avec un `.pth`, **Auto** sélectionne Safetensors. Lancez la conversion, puis téléchargez le fichier après la fin du traitement.

## Comment fonctionne la restauration exacte

L’exportateur intègre les octets du `.pth` original dans l’ONNX. Le convertisseur les extrait et vérifie la configuration RVC et les poids. L’optimisation ou le réexport peut supprimer ces données.

## Restaurer le PTH d’origine

Indiquez le fichier `.onnx` exporté par Ilaria RVC. Sélectionnez la conversion en `.pth`, enregistrez le modèle restauré et testez-le dans **Inference**.

Avec un ONNX, choisissez **Auto** ou **PTH**. Lancez la conversion et téléchargez le résultat. Si vous avez l’original, comparez les empreintes SHA-256 des deux fichiers.

## Vérifier le résultat

Essayez l’ONNX dans le client cible avec un court enregistrement. Testez le PTH restauré dans Ilaria RVC avec le même extrait et les paramètres d’origine.

## Dépannage

Vérifiez le vocodeur, le guidage de hauteur, la taille et la version de PyTorch si l’export échoue. Si le checkpoint intégré manque, reprenez l’ONNX intact ou le PTH sauvegardé. Si le client refuse l’ONNX, vérifiez les formats RVC acceptés.

[Safetensors ↔ PTH](safetensors-converter.md)
