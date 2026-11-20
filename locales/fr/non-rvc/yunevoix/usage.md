---
label: "Voice Bank et utilisation live"
icon: ":studio_microphone:"
order: 97
permalink: /non-rvc/yunevoix/usage/
---
# Voice Bank et utilisation en direct

Suivez ce guide pour créer des voix dans le **Voice Bank**, router YuneVoix vers **Discord, OBS, les jeux ou VRChat** et régler les paramètres audio pour une conversion en direct propre.

## 1. Créer et partager des voix (Voice Bank)

YuneVoix ne nécessite **aucun entraînement de modèle**.

1. Ouvrez l'onglet **Voice Bank**.
2. Fournissez **10–25 secondes** d'enregistrements clairs de la voix cible :
   - Meilleurs résultats : une seule personne, audio sec sans musique ni effets.
   - Inclure des **rires, respirations, « mmm » et du chant** aide le moteur à capturer l'expressivité vocale.
3. Gardez le nettoyage sur **« Separate voice + remove reverb »** si l'échantillon contient du bruit de fond ou de la réverbération.
4. Votre voix est prête en quelques secondes et enregistrée dans un petit fichier `.yvoice`.

Pour partager ou sauvegarder une voix, utilisez **Voice Bank → Open folder** pour trouver le fichier `.yvoice`, ou chargez-en un via **Import .yvoice…**.

> **Utilisation responsable** : n'utilisez que des voix que vous avez le droit d'utiliser (la vôtre ou celle d'une personne ayant donné son accord). N'utilisez jamais YuneVoix pour usurper l'identité de personnes réelles, tromper, harceler ou commettre une fraude.

## 2. Configurer le routage audio en direct

> **Portez toujours un casque** en utilisation live. Avec des haut-parleurs, la voix convertie revient dans le microphone et crée de l'écho, des bourdonnements et du Larsen.

### Routage vers Discord, OBS, les jeux ou VRChat

1. Installez un câble audio virtuel (comme le logiciel gratuit **VB-CABLE**).
2. Dans **YuneVoix**, choisissez votre microphone physique en entrée et **`CABLE Input`** comme périphérique de sortie.
3. Dans **Discord, OBS, VRChat ou votre jeu**, sélectionnez **`CABLE Output`** comme microphone.
4. *(Optionnel)* Pour vous entendre : ouvrez les **Paramètres audio Windows → Enregistrement → CABLE Output → Propriétés → Écouter**, cochez **« Écouter ce périphérique »** et choisissez votre casque.
5. **Dans Discord**, désactivez la **Suppression du bruit (Krisp)** et la **sensibilité d'entrée automatique** pour ce micro - elles coupent les respirations et les mots faibles, et YuneVoix nettoie déjà l'entrée.

### Latence attendue

Avec les réglages par défaut, le délai total est d'environ **0,7 seconde**. C'est parfait pour le streaming, le chat vocal et l'enregistrement, mais trop élevé pour chanter exactement en rythme sur une piste. Réduire **Output buffer** diminue légèrement la latence au risque de coupures audio.

## 3. Réglages recommandés

### Niveau du micro et nettoyage d'entrée

- Allez dans **Settings → General** et observez **Microphone level**. Augmentez le gain du micro dans Windows pour que la parole forte atteigne des pics autour de **−6 dBFS**. Un micro trop faible est la cause la plus fréquente d'une voix robotique ou « sous l'eau ».
- Gardez **Input cleaning** sur **`DF3`** dans les pièces bruyantes. Dans une pièce calme, si les rires, respirations ou chuchotements sont coupés, désactivez **Speech gate** et essayez **`Gentle`**.

### Hauteur (Pitch) et Autotune

Allez dans **Settings → Pitch & Autotune** :
- **Pitch shift** :
  - **`+12`** pour voix masculine → cible féminine
  - **`0`** pour une voix dans votre propre tessiture
  - **`−12`** pour voix féminine → cible masculine
  - Ou activez le **pitch automatique**.
- Pour le chant, vous pouvez activer l'**autotune** (avec détection de tonalité), le **pitch stabilizer**, la **vibrato depth** et l'**harmonie live** (tierces, quintes, octaves).

### Caractère vocal, effets et charge GPU

- **Voice character** : ajustez l'intensité du timbre, le formant, la chaleur et la présence, ou partez d'un préréglage.
- **Vocal effects** : dé-esseur, compresseur, réverbération et limiteur de crête.
- **Moteurs de contenu et FlowEdit 3+1** (**Settings → Voice & Timbre**) :
  - Essayez **WavLM+** (pris en charge sur NVIDIA et AMD DirectML ; indisponible si AMD MIGraphX expérimental est sélectionné) pour conserver les rires, chuchotements et respirations de votre propre voix.
  - Le mode **FlowEdit 3+1** (pris en charge sur NVIDIA et AMD DirectML) préserve davantage votre respiration et votre articulation naturelles (nécessite un échantillon de votre voix en LIVE).
  - Sur AMD, **DirectML** sur votre GPU dédié est utilisé par défaut ; vous pouvez éventuellement tester **MIGraphX** (expérimental, après redémarrage) dans `Settings → General → "AMD graphics engine"`, mais `WavLM+` et `FlowEdit 3+1` nécessitent DirectML.
  - Si vous **jouez en même temps** et constatez des saccades, baissez les graphismes/FPS du jeu, réduisez **Model steps**, utilisez un prompt plus court ou désactivez **Harmony**.
