---
label: "Performance, nettoyage et outils"
icon: ":wrench:"
order: 95
permalink: /non-rvc/causal-voice-changer/performance-and-tools/
description: "Enregistrez vos sessions directement dans CausalVC Realtime (démarrez d'abord la conversion) :"
---
# Performance, nettoyage du son et outils

## 1. Performance et latence (page `Performance`)

### Buffering

- **Chunk** (par pas de `20 ms`) : quantité d'audio convertie à la fois. Le délai total correspond au lookahead fixe de **60 ms** de CVC + **1 chunk** + les tampons de la carte son/du câble virtuel.
  - Chunks plus courts = latence plus faible, mais GPU plus sollicité.
  - En cas de craquements ou de coupures (ou sur CPU avec une ancienne carte AMD), montez **Chunk** à `40 ms` ou `60 ms+`.
- **Extra inference buffer** : quantité de parole récente examinée en arrière pour chaque bloc. Plus de contexte stabilise le timbre et la hauteur à faible coût GPU, **sans ajouter de délai**.

### Inférence et GPU

- **Pitch detector** :
  - **RMVPE (recommandé)** : le plus précis.
  - **FCPE** : plus léger pour le GPU.
  - **PM (fastest)** : le plus rapide, mais plus approximatif.
- **Pitch smoothing** *(RMVPE uniquement)* : suit la hauteur en ligne continue pour éviter les sauts d'octave ou tremblements sur les notes tenues (sans délai ajouté).
- **Volume envelope** : `0` suit exactement le volume de votre micro ; `1` garde le volume propre du modèle.
- **Fast GPU replay** *(activé par défaut)* : enregistre le travail GPU une fois et le rejoue à chaque bloc - environ **2× plus rapide** et bien plus stable (ex. une RTX 5050 convertit un chunk de `20 ms` en `4,4 ms` au lieu de `9,7 ms`). Désactivez uniquement si votre GPU produit des erreurs.
- **Aides de qualité et raccords** :
  - **Soften sudden treble** : adoucit les brefs clics dans les aigus en milieu de mot (ajoute `5 ms` de délai).
  - **Match level across seams** : maintient le niveau des hautes fréquences entre blocs (sans délai ajouté).
  - **Hold context during silence** : garde en mémoire vos derniers mots pendant les pauses pour éviter que le premier mot après un silence ne soit brouillé.
  - **Silence detection** : **Loudness** (`-50 dBFS`) convient aux pièces calmes ; **Voice detection (expérimental)** utilise RNNoise pour ignorer ventilateurs et bourdonnements.

## 2. Nettoyage du son (`Noise Reduction`)

- **Input noise reduction** : supprime clavier, ventilateurs et bruits ambiants avant conversion :
  - **Hushwire (Amazon Voice Focus)** *(par défaut)* : nettoyage le plus efficace et naturel ; ajoute environ **55 ms** de délai. Son modèle est téléchargé une fois depuis les serveurs d'Amazon après votre acceptation.
  - **RNNoise** : nettoyage plus léger avec moins de délai (**20 ms**).
- **Output noise reduction** : atténue le souffle en sortie par porte spectrale. Laissez **désactivé** sauf si vous entendez du souffle, car cela peut ternir légèrement la voix.

## 3. Enregistrement (page `Recording`)

Enregistrez vos sessions directement dans CausalVC Realtime (démarrez d'abord la conversion) :
- **Separate files** : enregistre l'entrée brute et la sortie convertie dans deux fichiers séparés.
- **Mix** : enregistre entrée + sortie mixées.
- **Split L/R** : entrée brute à gauche, sortie convertie à droite.

## 4. Bibliothèque, conversion hors ligne et journaux

- **Page Library** : recherchez et triez vos voix, utilisez **Rename**, **Move to Trash**, **Open folder**, **Add/Replace `.index`**, ou **Export** pour exporter une voix en `.cvc` avec ses réglages.
- **Conversion hors ligne de fichiers complets** : utilisez le module `causalvc.infer` en ligne de commande :
  ```bash
  uv run python -m causalvc.infer --help
  ```
- **Page Log** : en cas de problème, ouvrez **Log** et cliquez sur **Save log** pour exporter les journaux de diagnostic.
