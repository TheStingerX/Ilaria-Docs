---
label: "🗂️ Fichiers Index (.index)"
order: 87
permalink: /indexes/
description: "Guide complet des fichiers .index RVC (Feature Retrieval) : différence entre added_*.index et trained_*.index, réglage d'Index Rate et régénération d'index."
---
# Fichiers Index RVC et Feature Retrieval (`.index`)

Lorsque vous téléchargez ou entraînez un modèle vocal RVC, vous voyez souvent deux fichiers : un `.pth` et un `.index`. Si le `.pth` est indispensable, le fichier `.index` est souvent mal compris.

Ce guide explique le rôle réel d'un `.index`, la différence clé entre `added_*.index` et `trained_*.index`, comment régler **Index Rate**, quand le baisser ou le couper, et comment réagir s'il manque.

---

## 1. Qu'est-ce qu'un fichier `.index` (Feature Retrieval) ?

Une conversion vocale RVC repose sur deux éléments :
1. **Le fichier `.pth` (le Générateur) :** Le réseau neuronal qui a appris à transformer les traits vocaux en timbre de la voix cible.
2. **Le fichier `.index` (la Base de traits) :** Un **index vectoriel FAISS** stockant les vrais vecteurs acoustiques extraits par l'[embedder](embedders.md) (comme `contentvec`) sur chaque extrait du dataset d'entraînement.

Lors de la conversion, **Feature Retrieval** compare chaque micro-tranche de votre audio d'entrée avec la base `.index`, trouve les passages les plus proches des enregistrements d'origine du locuteur et les mélange avant d'alimenter le générateur `.pth`.

**En termes simples :**
- Le `.pth` est le **moteur** (obligatoire).
- Le `.index` est une **bibliothèque des habitudes vocales réelles** du locuteur (optionnel) : respirations, grain des voyelles, léger voile et nuances d'inflexion qu'un `.pth` seul peut lisser.

!!!tip
**Compatibilité :**
Un modèle `.pth` fonctionne très bien **sans** fichier `.index` (`Index Rate = 0`). Si un modèle téléchargé n'a pas d'`.index`, vous pouvez tout de même l'utiliser normalement.
!!!

---

## 2. `added_*.index` vs `trained_*.index`

Quand RVC crée l'index dans `logs/<nom_expérience>/`, il produit généralement deux fichiers `.index` :

| Nom du fichier | Contenu | Faut-il l'utiliser ? |
| --- | --- | --- |
| **`added_*.index`** | L'index FAISS complet **contenant tous les vecteurs du dataset ajoutés** (ex. `added_IVF256_Flat_nprobe_1_MaVoix_v2.index`). | **OUI. Utilisez toujours celui-ci** pour l'inférence et le partage. |
| **`trained_*.index`** | Uniquement la structure de clusters intermédiaire créée avant l'ajout des vecteurs du dataset. | **NON.** Ne le sélectionnez pas et ne le partagez pas ; il donne des résultats faibles ou nuls. |

Lorsque vous exportez ou partagez un modèle (ex. via **Export model ZIP** dans Ilaria RVC), associez toujours **`added_*.index`** au `.pth`, jamais `trained_*.index`.

---

## 3. Comment régler `Index Rate` (de `0` à `1.0`)

Le curseur **Index Rate** (parfois appelé *Search Feature Ratio* ou *Retrieval Ratio*) contrôle la force avec laquelle la base `.index` tire la sortie vers les extraits exacts du dataset :

| Index Rate | Effet sur la voix | Meilleur usage |
| --- | --- | --- |
| **`0.0` (Désactivé)** | 100 % poids `.pth`, 0 % `.index`. | Prononciation la plus nette, charge CPU minimale, base idéale pour le dépannage, le direct et les modèles fusionnés. |
| **`0.25 - 0.50`** | Ajoute une texture vocale naturelle tout en préservant votre prononciation et votre rythme. | **Parole**, **conversion inter-langues** (ex. français sur un modèle anglais/japonais), ou datasets légèrement bruités. |
| **`0.60 - 0.75`** | Forte ressemblance et réalisme sans écraser votre audio d'entrée. | **Valeur par défaut conseillée** pour chant propre et voix off dans la même langue. |
| **`0.85 - 1.00`** | Récupération maximale ; colle au plus près des trames du dataset. | Uniquement pour datasets studio irréprochables dans la même langue. Risque élevé de mots mâchés ou de souffle du dataset. |

---

## 4. Quand baisser ou couper `Index Rate`

Monter **Index Rate** vers `1.0` n'améliore **pas** automatiquement la voix. Baissez-le vers `0.2 - 0.4` (ou `0`) dès que vous constatez :

1. **Retour de souffle, grésillement ou réverbération :** Comme l'`.index` puise directement dans les prises d'entraînement, tout bruit ou écho du dataset revient dans votre sortie.
2. **Mots brouillés ou accent bizarre :** Si vous parlez une autre langue que celle du dataset, un Index Rate élevé force des voyelles/consonnes étrangères sur vos phrases.
3. **Modèles fusionnés (Voice Blender) :** Fusionner deux `.pth` dans [Voice Blender](../ilaria-rvc/manage/voice-blender.md) ne crée **pas** de nouvel `.index`. Testez toujours les modèles fusionnés à `Index Rate = 0` d'abord.
4. **Coupures en Voice Changer en direct :** Chercher dans un gros index FAISS à chaque bloc audio charge le CPU. Baisser ou couper `Index Rate` réduit latence et saccades.

---

## 5. Règles de compatibilité (pourquoi ne pas mélanger les `.index`)

Un fichier `.index` est strictement lié au **modèle exact** et à l'**embedder** d'origine :

- **Même dimension / version RVC :** Un modèle `v1` utilise **256 dimensions** (`3_feature256`), tandis qu'un `v2` utilise **768 dimensions** (`3_feature768`). Mélanger `v1` et `v2` provoque une erreur de dimensions.
- **Même embedder :** Un index généré avec `contentvec` ne correspond pas à un modèle utilisant un autre encodeur.
- **Même locuteur :** Mettre l'`.index` de la Voix A sur le `.pth` de la Voix B ne mélange **pas** proprement deux voix ; cela envoie de mauvais traits au décodeur et dégrade le son.

---

## 6. Comment régénérer un fichier `.index` manquant

### Cas A : Vous n'avez qu'un fichier `.pth` téléchargé
Vous ne **pouvez pas** recréer un vrai `.index` uniquement depuis un `.pth`. L'`.index` est bâti à partir des vecteurs extraits (`.npy`) de l'audio d'entraînement d'origine, absents d'un `.pth` exporté. Mettez simplement **Index Rate = 0** et utilisez le `.pth` seul.

### Cas B : Vous avez entraîné le modèle et gardé `logs/<nom_expérience>/`
Si le dossier contient encore les vecteurs extraits (`3_feature256` ou `3_feature768`), vous pouvez reconstruire l'index en quelques secondes sans réentraîner :
1. Ouvrez l'onglet **Train** dans Ilaria RVC (ou Applio / RVC Mainline).
2. Saisissez exactement le même **Nom d'expérience**, **Version RVC (`v1`/`v2`)**, **Sample Rate** et **Embedder**.
3. Cliquez uniquement sur **Train Feature Index** (sans relancer le prétraitement ni l'entraînement).
4. Une fois terminé, récupérez le nouveau **`added_*.index`** dans `logs/<nom_expérience>/`.

### Cas C : La création de l'index plante par manque de RAM / Pagefile
Les gros datasets (milliers de clips) consomment beaucoup de RAM pendant le clustering FAISS. Si cela plante avec `WinError 1455` ou fige Windows, fermez d'autres applis, augmentez la **Mémoire virtuelle (Pagefile)** (voir [Dépannage](../reference/troubleshooting.md)) ou retirez les clips redondants.
