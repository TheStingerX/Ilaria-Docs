---
label: "🧠 Fichiers PTH (.pth)"
order: 88
permalink: /pth/
description: "Guide complet des fichiers .pth RVC : modèles vocaux exportés vs checkpoints bruts G et D, tailles FP16 vs FP32, compatibilité et erreurs courantes."
---
# Fichiers PTH RVC (`.pth`)

Lorsque vous téléchargez, entraînez ou partagez une voix RVC, le **fichier `.pth`** est le fichier le plus important. Tandis que le [fichier `.index`](indexes.md) est optionnel, le `.pth` est **indispensable** : sans lui, RVC ne peut convertir aucune voix.

Ce guide explique ce que contient un `.pth`, la différence cruciale entre un modèle exporté et les checkpoints bruts (`G_*.pth` / `D_*.pth`), pourquoi la taille varie et comment résoudre les erreurs courantes.

---

## 1. Qu'est-ce qu'un fichier `.pth` ?

Un **fichier `.pth`** est un **checkpoint PyTorch** stockant le réseau neuronal entraîné (le **Générateur**) qui sait reproduire le timbre de la voix cible.

Dans un `.pth` RVC correctement exporté figurent deux éléments :
1. **Les poids du modèle (`weight`) :** Des millions de valeurs apprises pendant l'entraînement qui façonnent le timbre, la résonance et le caractère vocal.
2. **La configuration vocale (`config` et métadonnées) :** Réglages enregistrés à l'export :
   - **Sample rate :** `32 kHz`, `40 kHz` ou `48 kHz` (`44.1 kHz` sur certaines variantes RefineGAN).
   - **Architecture RVC :** `v1` (256-d) ou `v2` (768-d).
   - **Pitch guidance (`f0`) :** Activé (`1`) ou désactivé (`0`).
   - **Vocodeur :** `HiFi-GAN`, `MRF HiFi-GAN` ou `RefineGAN`.
   - **Embedder :** Par exemple `contentvec`, `spin-v2` ou `klm-vocal-contentvec`.

---

## 2. `.pth` exporté vs Checkpoints bruts (`G_*.pth` / `D_*.pth`)

L'une des erreurs les plus fréquentes chez les débutants consiste à prendre le mauvais `.pth` dans `logs/` :

| Type de fichier | Emplacement type | Taille type | Utilité |
| --- | --- | --- | --- |
| **`.pth` vocal exporté** (ex. `MaVoix.pth`) | `models/` (Ilaria RVC 2.4.0+) ou `weights/` | **45 - 110 Mo** (`fp16` vs `fp32`) | **Inférence et partage.** Contient uniquement les poids légers du Générateur + config vocale. |
| **Générateur (`G_*.pth`) et Discriminateur (`D_*.pth`) bruts** | `logs/<nom_expérience>/` | **200+ Mo chacun** | **Reprise d'entraînement et pretrains uniquement.** Contiennent l'état de l'optimiseur. Ne les copiez **jamais** dans `models/` pour l'inférence ! |

Si vous placez un `G_*.pth` brut dans `models/` et tentez une conversion, RVC plantera avec `Missing key(s) in state_dict` ou signalera une configuration vocale manquante. Utilisez toujours l'outil **Export** de votre application.

---

## 3. Taille (`FP16` vs `FP32`) et formats (`.pth` vs `.safetensors` / `.onnx`)

- **Pourquoi un `.pth` pèse ~50 Mo et un autre ~105 Mo ?**
  La différence vient généralement de la précision d'export du modèle (voir [Précision](precision.md)). `FP16` stocke les poids sur 16 bits au lieu de 32, réduisant la taille d'environ 50 % par rapport au `FP32` à architecture égale. Les deux offrent une qualité audio quasi identique et, sur GPU NVIDIA compatibles, l'inférence `FP16` peut aussi améliorer les performances. Point essentiel : la précision d'export est indépendante de la précision d'inférence. La plupart des apps RVC chargent un modèle `FP16` et convertissent automatiquement ses poids en `FP32` sur anciens GPU NVIDIA, DirectML ou CPU ; un modèle exporté en `FP32` n'est donc pas indispensable pour la compatibilité tant que l'app gère cette conversion automatique.
- **`.pth` vs `.safetensors` :**
  `.pth` utilise `pickle` de Python (d'où les contrôles `weights_only=True` sous PyTorch `2.6+`), tandis que `.safetensors` stocke les tenseurs sans code exécutable. Dans **Ilaria RVC 2.4.5+**, convertissez entre `.pth` et `.safetensors` via [Convertisseur Safetensors ↔ PTH](../ilaria-rvc/manage/safetensors-converter.md).
- **`.pth` vs `.onnx` :**
  L'entraînement et l'inférence RVC standard utilisent `.pth`. Certains voice changers temps réel (w-okada, Deiteris DirectML) utilisent aussi des exports `.onnx` sur GPU AMD/Intel.

---

## 4. Règles de compatibilité

1. **Même Embedder :** Si un `.pth` a été entraîné avec `contentvec` (par défaut), convertissez avec `contentvec` (ou laissez sur `Auto`). Mélanger les embedders brouille la prononciation ou laisse filtrer votre voix source.
2. **Vocodeur pris en charge :** Vérifiez que votre application gère le vocodeur du `.pth`. Les modèles `MRF HiFi-GAN` ou `RefineGAN` exigent une application récente (**Ilaria RVC 2.3.0+** ou **Applio**).
3. **`UnpicklingError` sous PyTorch 2.6+ :** D'anciens `.pth` ou d'anciennes apps peuvent afficher `Weights only load failed` (`fairseq.data.dictionary.Dictionary`). Passez à **Ilaria RVC 2.4.0+** ou au dernier **Applio**.

---

## 5. Où placer les `.pth` et comment les inspecter

- **Emplacement :** Dans **Ilaria RVC 2.4.0+**, extrayez d'abord tout `.zip` et placez le `.pth` (avec son `added_*.index`) dans le dossier racine **`models/`** (d'autres apps utilisent `assets/weights/` ou `weights/`). Cliquez sur **Refresh** dans **Inférence**.
- **Inspecter un `.pth` inconnu :** Dans Ilaria RVC, ouvrez **Other → Model information**, choisissez le `.pth` et cliquez sur **Read model information** pour afficher sample rate, version RVC, vocodeur, embedder et précision.
- **Partager proprement une voix :** Utilisez **Other → Export model ZIP** pour empaqueter `.pth` et `added_*.index` sans journaux d'entraînement ni enregistrements privés.

---

## 6. Erreurs courantes avec `.pth` et solutions rapides

| Erreur ou Symptôme | Cause | Solution |
| --- | --- | --- |
| **Le modèle n'apparaît pas dans la liste** | Oubli de cliquer sur **Refresh**, `.pth` encore dans un `.zip` ou mauvais dossier. | Extrayez le `.zip`, mettez le `.pth` directement dans `models/` (ou `weights/`) et cliquez sur **Refresh**. |
| `EOFError` / `invalid load key` / `File is not a zip archive` | Téléchargement interrompu ou page HTML enregistrée à la place du fichier. | Vérifiez la taille : un `.pth` valide fait **40 - 110+ Mo**, pas quelques Ko. Supprimez et retéléchargez. |
| `Missing key(s) in state_dict` / `Sizes of tensors must match` | Vous avez chargé un checkpoint brut `G_*.pth` au lieu d'un `.pth` exporté. | Exportez proprement le modèle final au lieu de copier `G_*.pth` depuis `logs/`. |
| `UnpicklingError` / `Weights only load failed` | PyTorch 2.6+ a bloqué d'anciens objets pickle sur une app RVC obsolète. | Mettez à jour vers **Ilaria RVC 2.4.0+** ou le dernier **Applio**. |
