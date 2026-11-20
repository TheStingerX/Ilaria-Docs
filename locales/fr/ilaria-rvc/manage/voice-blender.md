---
label: "Voice Blender (Merge Models)"
icon: ":twisted_rightwards_arrows:"
order: 92
permalink: /ilaria-rvc/voice-blender/
description: "Dans Ilaria RVC, la fonction Voice Blender se trouve dans l'onglet Other sous Merge models. Elle permet de fusionner les poids de deux modèles vocaux .pth..."
---
# Voice Blender (Fusion de Modèles)

[Télécharger Ilaria RVC 2.4.0 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Dans **Ilaria RVC**, la fonction Voice Blender se trouve dans l'onglet **Other** sous **Merge models**. Elle permet de fusionner les poids de deux modèles vocaux `.pth` compatibles pour créer une nouvelle voix hybride sans réentraîner de zéro.

## Avant de fusionner : règles de compatibilité

Deux voix qui se ressemblent ne sont **pas** forcément compatibles. Les deux modèles sources doivent correspondre techniquement :

- **Fichiers `.pth` d'inférence uniquement :** Utilisez les modèles exportés de `weights/`. N'utilisez jamais les checkpoints bruts (`G_*.pth` / `D_*.pth`) ni les fichiers `.onnx`.
- **Même version RVC :** Les deux doivent partager la même architecture (`v1` 256-d ou `v2` 768-d).
- **Même sample rate :** Les deux doivent avoir été entraînés au même taux d'échantillonnage (ex. tous deux `40k` ou `48k`).
- **Même embedder / dimensions internes :** Les deux doivent avoir des formes de tenseurs compatibles.

!!!tip
Cliquez toujours sur **Check model compatibility** dans Ilaria RVC avant de fusionner. Si la vérification échoue, les deux `.pth` ne peuvent pas être mélangés.
!!!

## Comment fusionner deux voix dans Ilaria RVC

1. Ouvrez l'onglet **Other** et descendez jusqu'à **Merge models**.
2. Sélectionnez **Model A** et **Model B** dans les listes (cliquez d'abord sur **Refresh** si vous venez d'ajouter un `.pth`).
3. Cliquez sur **Check model compatibility** et vérifiez que le journal indique qu'ils sont compatibles.
4. Réglez **Model A contribution (%)** :
   - `50` donne un mélange égal **50% / 50%** entre Modèle A et Modèle B.
   - `70` donne **70% Modèle A** et **30% Modèle B**.
   - `100` produit uniquement le Modèle A ; `0` uniquement le Modèle B.
5. Choisissez **Sample rate** (`Auto` si disponible, ou le taux exact des deux modèles).
6. Choisissez **Output precision** :
   - `fp16` crée un fichier plus léger et plus rapide sur GPU NVIDIA CUDA récents.
   - `fp32` est plus lourd mais fonctionne partout, y compris anciens GPU, DirectML et CPU.
7. Saisissez un **Output model name** clair (ex. `Alice70_Bob30`) et des notes optionnelles.
8. Cliquez sur **Merge and save model** et vérifiez **Merge Log** pour confirmer la sauvegarde du `.pth`.

## Tests, réglages et comportement des `.index`

- **Aucun `.index` n'est créé :** La fusion combine uniquement les poids `.pth` et **ne génère pas** de nouveau fichier `.index`.
- **Testez d'abord sans Index :** Allez dans **Inference**, cliquez sur **Refresh**, choisissez votre nouveau `.pth` fusionné et testez-le sur un clip `.wav` propre de 10-20 secondes avec **Index Rate = 0**.
- **Comparez côte à côte :** Écoutez le même clip avec le Modèle A, le Modèle B et le modèle fusionné au même volume. Ajustez **Model A contribution (%)** par petits paliers (`40%`, `50%`, `60%`) jusqu'à trouver le bon équilibre.
- **Test optionnel d'Index :** Une fois le `.pth` satisfaisant, vous pouvez tester l'`.index` du Modèle A ou B à faible **Index Rate** (`0.2` à `0.4`) pour voir s'il améliore la netteté sans trop ramener vers une seule source.
- **Gardez vos originaux :** Un `.pth` fusionné sert uniquement à l'**inférence**. Il ne contient pas l'état d'entraînement et ne permet pas de reprendre un entraînement.
