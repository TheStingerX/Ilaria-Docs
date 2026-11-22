---
label: "Router et régler Deiteris"
icon: ":studio_microphone:"
order: 99
permalink: /ilaria-rvc/deiteris/live-audio/
description: "Portez toujours un casque en conversion en direct. Avec des haut-parleurs, la voix convertie revient dans le micro et provoque écho et Larsen."
---
# Router et régler Deiteris w-okada Fork

Portez toujours un **casque** en conversion en direct. Avec des haut-parleurs, la voix convertie revient dans le micro et provoque écho et Larsen.

## 1. Configurer les périphériques audio

> **Correct Audio Routing**
>
> **1. Dans le Voice Changer**
> - **Input Device :** Votre microphone physique.
> - **Output Device :** `Line 1` (VAC, recommandé) ou `CABLE Input` (VB-CABLE).
>
> **2. Dans Discord, les jeux, OBS ou d'autres applications**
> - **Input Device :** `Line 1` (VAC, recommandé) ou `CABLE Output` (VB-CABLE).
> - **Output Device :** Vos écouteurs ou haut-parleurs.
>
> ```text
> Your Microphone → Voice Changer → Line 1 (VAC) or CABLE Input/Output (VB-CABLE) → Discord / Game / OBS
> ```
>
> L'audio reçu depuis Discord, le jeu ou une autre app doit être envoyé directement vers votre **casque** (jamais renvoyé dans le câble virtuel).
>
> - **VAC vs. VB-CABLE :** **VAC** (`Line 1`) est toujours recommandé. Si vous avez aussi (ou uniquement) **VB-CABLE**, le voice changer envoie vers **`CABLE Input`** et Discord / les jeux écoutent **`CABLE Output`**.
> - **Monitoring :** Entendre votre propre voix convertie dans votre casque est une fonction optionnelle séparée à n'activer qu'en cas de besoin. Évitez les chemins audio dupliqués, l'écho et le loopback.

1. Réglez **Audio Input** sur votre microphone physique.
2. Réglez **Audio Output** sur votre casque pour un premier test local, ou sur **`CABLE Input`** (côté lecture du câble virtuel) pour router vers d'autres applis.
3. Dans **Discord, OBS, VRChat ou votre jeu**, sélectionnez **`CABLE Output`** comme microphone.
   - Dans Discord, désactivez la **Suppression du bruit (Krisp)** et la **sensibilité d'entrée automatique** pour éviter de couper les respirations et fins de mots.

## 2. Charger un modèle et régler les paramètres

1. Importez ou sélectionnez un modèle **RVC `.pth`** d'inférence et son fichier **`.index`** optionnel.
2. **Chunk / Block size** : démarrez autour de `0.3s` - `0.5s` (ou `192` / `256`+ selon le curseur) pour équilibrer latence et fluidité. Descendre trop bas provoque des saccades robotiques.
3. **Extra Data / Context** : gardez une valeur modérée (`0.5s` - `1.0s`) pour un timbre stable sans saturer le GPU.
4. **Détecteur F0 / Pitch** : utilisez **RMVPE** (plus précis) ou **FCPE** (plus léger/rapide en direct) ; évitez Crepe Full en direct si l'inférence dépasse la taille du chunk.
5. **Tune (Pitch)** : `+12` pour homme -> femme, `-12` pour femme -> homme, `0` pour le même registre.
6. **Index ratio** : commencez à `0.0` pour vérifier la conversion propre, puis montez doucement (`0.3` - `0.6`) si besoin.

## 3. Correctifs fréquents

- **Latence élevée ou saccades robotiques** : fermez les jeux/onglets lourds sur le GPU, montez Chunk d'un cran et testez si besoin la désactivation de **HAGS** (redémarrez, comparez avant/après et réactivez si inchangé).
- **Erreur PortAudio / périphérique** : alignez tous vos périphériques audio sur la même fréquence (`48000 Hz`) dans les paramètres Son Windows et fermez les applis en mode exclusif.
