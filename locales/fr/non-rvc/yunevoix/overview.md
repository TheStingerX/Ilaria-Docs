---
label: "Aperçu et prérequis"
icon: ":book:"
order: 99
permalink: /non-rvc/yunevoix/overview/
---
# YuneVoix (YUNE)

[Hugging Face (Téléchargement)](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Support et Premium)](https://ko-fi.com/yunevoix)

YuneVoix est une application de conversion vocale IA en temps réel pour Windows, propulsée par le moteur **YUNE**. Tout comme RVC, elle transforme votre voix en celle de quelqu'un d'autre - pour la parole comme pour le chant, en direct ou hors ligne - mais **sans avoir besoin d'entraîner un modèle vocal**. Tout tourne localement sur votre carte graphique : aucun cloud, aucun compte et votre audio ne quitte jamais votre PC.

## Comment ça fonctionne

Au lieu de passer des heures à entraîner un modèle sur un jeu de données, YUNE n'a besoin que d'un court échantillon audio de référence de la voix cible (environ **5–20 secondes**). Il sépare votre voix entre *ce que vous dites* et *comment vous le dites* :

1. **Encodeur vocal** : capture vos mots, votre articulation et votre rythme.
2. **Suivi de hauteur (Pitch tracker)** : suit votre mélodie et votre intonation.
3. **Modèle diffusion-transformer** : reconstruit l'audio avec le timbre de la voix cible à partir du court enregistrement de référence.
4. **Vocodeur neuronal** : produit un audio pleine bande à **44,1 kHz**.

En mode **LIVE**, l'audio est traité par petits blocs d'environ **160 ms**, avec un délai total d'environ **0,7 seconde** par défaut.

## BASIC vs. PREMIUM

| Fonctionnalité | BASIC (Gratuit) | PREMIUM |
| --- | --- | --- |
| **Changeur de voix LIVE** (parole et chant) | Inclus | Inclus |
| **Voice Bank** (créer et partager des voix `.yvoice`) | Inclus | Inclus |
| **Outils de hauteur** (shift, autotune, stabilisateur, harmonie) | Inclus | Inclus |
| **Caractère vocal et effets** | Inclus | Inclus |
| **Nettoyage d'entrée** (suppression bruit/clics, speech gate) | Inclus | Inclus |
| **Song Cover** (séparation vocale, conversion, mixage) | - | Inclus |
| **Karaoké** (chanter avec paroles à l'écran) | - | Inclus |
| **Licence hors ligne** | Non requise | `license.yvl` par PC |

> **YuneVoix PREMIUM** est disponible pour les personnes qui soutiennent le projet sur [Ko-fi](https://ko-fi.com/yunevoix). L'accès est géré en privé via Ko-fi ou DM, et la licence fonctionne entièrement hors ligne.

## Fonctionnalités principales

- **Changeur de voix LIVE** : entrée microphone, sortie convertie vers n'importe quel périphérique audio (Discord, OBS, jeux, VRChat). Fonctionne pour la parole et le chant, en conservant respirations, chuchotements et rires.
- **Voice Bank** : créez une nouvelle voix à partir de 10–25 secondes d'enregistrements clairs. YuneVoix peut séparer automatiquement la voix de la musique/du bruit de fond et supprimer la réverbération.
- **Outils de hauteur** : décalage d'octave manuel ou automatique, autotune avec détection de tonalité, stabilisateur de hauteur, profondeur du vibrato et harmonie en direct (tierces, quintes, octaves).
- **Caractère vocal** : contrôles d'intensité du timbre, formant, chaleur et présence avec préréglages.
- **Nettoyage d'entrée** : suppression du bruit et des clics (`DF3` / `Gentle`), speech gate et monitoring entrée/sortie.
- **Effets vocaux** : dé-esseur, compresseur, réverbération et limiteur de crête.
- **Options qualité vs. vitesse** : deux moteurs de contenu (dont **WavLM+** sur NVIDIA et AMD DirectML pour préserver vos rires, chuchotements et respirations) et plusieurs méthodes de modèle. Les modes rapides utilisent environ 40 % du temps GPU, et le mode **FlowEdit 3+1** préserve davantage votre respiration et votre articulation naturelles.
- **Song Cover & Karaoké (PREMIUM)** : rechantez des morceaux complets avec séparation vocale automatique ou chantez avec les paroles à l'écran.
- **Interface en 6 langues** : Anglais, Allemand, Italien, Espagnol, Polonais et Portugais.

## Configuration requise

YuneVoix nécessite un **GPU dédié** et ne peut pas fonctionner sur CPU seul. Les cartes graphiques Intel, macOS et Linux ne sont pas pris en charge.

| Composant | NVIDIA (Recommandé) | AMD (DirectML) |
| --- | --- | --- |
| **OS** | Windows 10 / 11 64 bits | Windows 11 **24H2** ou plus récent (64 bits) |
| **GPU** | 8 Go+ VRAM (**12 Go recommandés**), GeForce RTX recommandée | Radeon **série RX 7000** ou supérieure, 12 Go+ VRAM (**16 Go recommandés**) |
| **Pilote** | Pilote NVIDIA à jour | AMD Adrenalin **25.10.13.09** ou plus récent |
| **Audio** | Microphone + **casque** (obligatoire en direct) | Microphone + **casque** (obligatoire en direct) |

> **Note NVIDIA vs. AMD** : depuis la **v0.7.1**, le paquet AMD utilise **DirectML** sur la carte dédiée par défaut, et **`WavLM+`** comme **`FlowEdit 3+1`** fonctionnent aussi sous AMD DirectML (en LIVE, covers et karaoké). Vous pouvez éventuellement passer `Settings → General → "AMD graphics engine"` sur le moteur expérimental **MIGraphX** (après redémarrage ; avec MIGraphX, `WavLM+` et `FlowEdit 3+1` sont indisponibles et Windows peut télécharger MIGraphX via Windows Update).
