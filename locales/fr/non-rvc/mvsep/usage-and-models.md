---
label: "Modèles et presets recommandés"
icon: ":control_knobs:"
order: 97
permalink: /non-rvc/mvsep/usage-and-models/
---
# Guide MVSep : modèles et presets recommandés

Voici les meilleurs presets MVSep pour obtenir des pistes vocales ultra-propres (pour entraînement RVC, covers ou conversion vocale), avec des **liens directs** pré-sélectionnant l'algorithme et les options exactes.

## 1. Suppression de musique et d'effets (Vocals & SFX Removal)

Utilisez ces modèles en premier pour retirer musique de fond, bruitages et sons ambiants.

- **BS Polarformer** - [Ouvrir le preset sur MVSep](https://mvsep.com/home?sep_type=56&add_opt1=2&add_opt2=1&add_opt3=0)
  - Variante haute précision de Band-Split Roformer utilisant les **Polar Positional Embeddings (PoPE)** pour un contexte long et propre.
  - **Quand l'utiliser** : votre premier choix principal pour des voix nettes avec un minimum de résidus instrumentaux.
- **MVSep DnR v3** - [Ouvrir le preset sur MVSep](https://mvsep.com/home?sep_type=123&add_opt1=163)
  - Modèle cinématique multi-stems (*Divide and Remaster*) qui sépare l'audio en **parole, musique et effets sonores (SFX)**.
  - **Quand l'utiliser** : dialogues de jeux vidéo, films, vidéos ou extraits chargés en bruitages.

> **Recommandation** : **BS Polarformer** est généralement meilleur seul, mais passer par **les deux** élimine pratiquement tout risque de bruit de fond ou de SFX restants.

## 2. Séparer voix principale et chœurs (Lead & Back Vocals)

- **MVSep Karaoke** - [Ouvrir le preset sur MVSep](https://mvsep.com/home?sep_type=49&add_opt1=5&add_opt2=0)
  - Isole la **voix principale (lead)** des **chœurs / secondes voix (backing vocals)**.
  - **Note** : ce modèle peut être un peu capricieux et parfois confondre chœurs et voix principale selon le mixage ; écoutez toujours les deux pistes obtenues avant de supprimer quoi que ce soit - il reste néanmoins très utile.

## 3. Suppression de la réverbération (Reverb Removal)

Appliquez ces presets sur votre piste vocale isolée pour rendre secs les enregistrements avec écho ou réverbération.

- **DeReverb Stereo** - [Ouvrir le preset sur MVSep](https://mvsep.com/home?sep_type=22&add_opt1=7&add_opt2=1)
  - Cible la réverbération vocale stéréo et les réflexions.
- **DeReverb Room** - [Ouvrir le preset sur MVSep](https://mvsep.com/home?sep_type=22&add_opt1=6&add_opt2=1)
  - Cible l'acoustique de pièce et l'écho naturel de salle.

> **Recommandation** : il est préférable d'utiliser **les deux** pour éliminer toute trace de réverbération ; l'ordre dans lequel les exécuter dépend uniquement de votre audio spécifique.

## 4. Suppression du bruit de fond (Background Noise Removal)

- **DeNoise by aufr33 and gabox** - [Ouvrir le preset sur MVSep](https://mvsep.com/home?sep_type=47&add_opt1=1)
  - Modèle Mel-Roformer communautaire conçu pour supprimer souffle, statique et artefacts sans ternir les hautes fréquences.
  - **Recommandation** : utilisez-le comme **étape finale** pour peaufiner votre audio et vous assurer qu'il soit propre. *(Il peut tout de même laisser passer certains bruits, donc vérifiez toujours le WAV final à l'oreille.)*

## 5. Expérimental et divers (Experimental & Miscellaneous)

- **DeEffect** - [Ouvrir le preset sur MVSep](https://mvsep.com/en/home?sep_type=47&add_opt1=1)
  - Très efficace pour retirer la réverbération et les effets vocaux marqués (peut même remplacer un modèle lead dans certains cas ou enlever un peu de bruit de fond).
  - **Avertissement** : **ne comptez absolument pas sur DeEffect pour autre chose que retirer les effets vocaux et la réverbération** - utilisez les modèles dédiés ci-dessus pour l'extraction de voix/SFX et le débruitage final.

## Enchaînement étape par étape conseillé

1. **Extraire la voix / parole** : passez par **BS Polarformer** (puis **MVSep DnR v3** si des SFX persistent).
2. **Isoler la voix principale** *(uniquement chansons avec chœurs)* : utilisez **MVSep Karaoke**.
3. **Retirer la réverbération** : passez **DeReverb Stereo** et **DeReverb Room** (plus **DeEffect** seulement si des effets vocaux ou de la réverbe lourde restent).
4. **Nettoyage final** : terminez avec **DeNoise by aufr33 and gabox** et téléchargez le résultat en **WAV**.
