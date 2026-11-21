---
label: "Convertisseur Safetensors ↔ PTH"
icon: ":repeat:"
order: 88
permalink: /ilaria-rvc/safetensors-converter/
description: "Guide simple et complet du convertisseur Safetensors et PTH dans l'onglet Other d'Ilaria RVC, avec préservation des métadonnées RVC et Move .pth to models."
---
# Convertisseur Safetensors ↔ PTH

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Depuis **Ilaria RVC 2.4.5**, l'onglet **Other** inclut **Convert model weights**, un convertisseur intégré transformant les modèles vocaux `.pth` en `.safetensors` et inversement.

---

## 1. Que sont `.pth` et `.safetensors` ? (En mots simples)

Lorsque vous téléchargez des modèles vocaux IA, vous voyez surtout des fichiers `.pth` et parfois `.safetensors` :

- **`.pth` (format PyTorch) :** Le format classique RVC. Il stocke les poids du réseau neuronal **et** la configuration vocale RVC (sample rate, pitch guidance, version RVC, embedder). Il utilise toutefois `pickle` de Python, ce qui explique pourquoi PyTorch récent (`2.6+`) en restreint le chargement par sécurité.
- **`.safetensors` (format SafeTensors) :** Un format moderne créé par Hugging Face stockant les poids **sans code exécutable**. Il est bien plus sûr à partager ou télécharger.

**Pourquoi convertir entre les deux ?**
- Convertissez **`.pth` → `.safetensors`** pour archiver ou partager votre modèle dans un format plus sûr tout en gardant ses réglages RVC.
- Convertissez **`.safetensors` → `.pth`** si vous avez téléchargé un modèle `.safetensors` et avez besoin d'un `.pth` pour l'utiliser dans **Inférence**.

---

## 2. Fonctionnement du convertisseur d'Ilaria RVC

Dans **Other → Convert model weights**, Ilaria RVC effectue la conversion sur le **CPU** (aucune VRAM requise) :

- **Installation automatique initiale :** Si `safetensors` manque, Ilaria RVC installe `safetensors==0.8.0` dans `assets/weight_converter/dependencies` au premier usage (connexion requise la première fois uniquement).
- **Préservation des métadonnées RVC :** Lors de la conversion `.pth` → `.safetensors`, la configuration vocale est stockée dans la métadonnée `ilaria_rvc_checkpoint`. Lors du retour `.safetensors` → `.pth`, la configuration est restaurée pour une utilisation directe en Inférence.
- **Fichiers tenseurs uniquement :** Un `.safetensors` sans métadonnées RVC devient un `.pth` contenant uniquement les poids, inutilisable tel quel avec **Move .pth to models**.
- **Checkpoints d'entraînement bloqués :** Les checkpoints bruts (`G_*.pth` / `D_*.pth` dans `logs/`) ne peuvent pas être convertis ici. Exportez d'abord le modèle vocal final.

---

## 3. Étape par étape : convertir `.pth` ↔ `.safetensors`

1. Ouvrez l'onglet **Other** et dépliez **Convert model weights**.
2. Déposez votre fichier `.pth` ou `.safetensors` dans **Choose or drop a .pth or .safetensors file**.
3. Cliquez sur **Convert weights**.
4. Suivez **Conversion Log** (`5% | Preparing Safetensors...` → `10% | Reading weights on CPU...` → terminé).
5. Téléchargez le résultat sous **Download converted weights**.

### Utiliser **Move .pth to models** (`.safetensors` → `.pth`)
Après avoir converti une voix `.safetensors` (avec métadonnées RVC) en `.pth` :
1. Cliquez simplement sur **Move .pth to models**.
2. Ilaria RVC vérifie la présence de la configuration RVC (`config`, `weight`, `emb_g.weight`) et place le fichier dans `models/`.
3. Allez dans **Inférence**, cliquez sur **Refresh** et votre voix est prête.

!!!tip
**Écrase-t-il un modèle existant ?**
Non. Si un `.pth` portant le même nom existe déjà dans `models/`, **Move .pth to models** s'arrête par sécurité et vous prévient.
!!!

---

## 4. Messages courants et dépannage

| Message dans Conversion Log | Signification | Solution |
| --- | --- | --- |
| `Could not download Safetensors. Check your internet connection and retry.` | L'installation initiale de `safetensors` a échoué (hors ligne ou VPN/pare-feu). | Connectez-vous à internet (ou coupez temporairement le VPN/pare-feu) puis relancez **Convert weights** une fois. |
| `This checkpoint contains training state or unsupported metadata. Export a voice model first.` | Vous avez fourni un checkpoint brut `G_*.pth` ou `D_*.pth`. | Utilisez d'abord l'outil **Export** de votre expérience, puis convertissez le `.pth` exporté. |
| `This .pth contains only weights or is missing required RVC data.` | Vous avez cliqué sur **Move .pth to models** pour un `.pth` sans métadonnées RVC. | Seuls les `.pth` RVC complets avec configuration vocale peuvent être déplacés vers `models/`. |
| `A model named ... already exists.` | Un fichier `.pth` du même nom existe déjà dans `models/`. | Renommez le fichier ou déplacez l'ancien modèle dans `models/`. |
