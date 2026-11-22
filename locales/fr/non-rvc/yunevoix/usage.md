---
label: "Voice Bank et Utilisation en Direct"
icon: ":studio_microphone:"
order: 97
permalink: /fr/non-rvc/yunevoix/usage/
description: "Tutoriel complet pour débutants pour créer des profils Voice Bank .yvoice, router YuneVoix vers Discord, OBS, les jeux ou VRChat, utiliser le monitoring intégré et choisir Classic, Learned 4 steps ou FlowEdit 3+1."
---
# Voice Bank et Utilisation en Direct

Utilisez ce guide pour créer des voix dans le **Voice Bank**, router YuneVoix vers **Discord, OBS, des jeux ou VRChat**, utiliser les contrôles de monitoring intégrés et choisir le bon **Model method** pour la conversion LIVE. Pour le détail de chaque curseur, consultez [Paramètres et Qualité Audio](settings.md).

## 1. Créer et partager des voix (Voice Bank)

Contrairement au RVC traditionnel, la création d'un profil **Voice Bank** dans YuneVoix **n'entraîne pas un réseau neuronal à partir de zéro** : elle construit en quelques secondes une référence légère `.yvoice` du locuteur.

1. Ouvrez l'onglet **Voice Bank**.
2. Fournissez **10-25 secondes** d'enregistrements clairs de la voix cible :
   - **À utiliser :** Un seul locuteur, parole ou chant propre et sec, sans musique de fond, sans forte réverbération ni voix superposées.
   - **Variété utile :** Inclure des **rires naturels, respirations, "mmm" et du chant** aide YUNE à capter l'expressivité du timbre.
   - **À éviter :** Extraits de moins de 10 secondes, audio saturé/écrêté, plusieurs personnes parlant en même temps ou fort écho de pièce (ce qui peut rendre la voix convertie bruitée ou instable).
3. Laissez le nettoyage réglé sur **"Separate voice + remove reverb (recommended)"** si l'extrait source contient du bruit de fond ou de l'écho de pièce.
4. Enregistrez la voix : elle est stockée en fichier `.yvoice` dans `models\yune\voices`.
5. Cliquez sur **Play sample** dans Voice Bank pour l'écouter (depuis la v0.7.0, **Play sample** passe par votre sortie Windows par défaut / casque plutôt que par la sortie LIVE).

Pour partager ou sauvegarder une voix, utilisez **Voice Bank → Open folder** afin de trouver le fichier `.yvoice`, ou chargez-en un via **Import .yvoice…**.

> **Utilisation responsable :** N'utilisez que des voix que vous avez le droit d'utiliser (la vôtre, ou celle d'une personne ayant donné son accord). N'utilisez jamais YuneVoix pour usurper l'identité de personnes réelles, tromper, harceler ou frauder.

---

## 2. Configurer le routage audio et le monitoring en direct

> **Portez toujours un casque** en utilisation en direct. Avec des haut-parleurs (ou un casque ouvert trop fort et peu isolé), la voix convertie peut repasser dans votre microphone et provoquer un double son, de l'écho ou du Larsen.

### Routage vers Discord, OBS, les jeux ou VRChat

Avec un câble audio virtuel tel que **VB-CABLE** (ou **VAC** `Line 1`), rappelez-vous que le câble a deux côtés : **YuneVoix** envoie l'audio *dans* le câble, et **Discord / OBS / les jeux** reçoivent l'audio *depuis* le câble :

1. **Dans YuneVoix (onglet LIVE) :**
   - **Input (Microphone) :** Votre microphone physique.
   - **Output :** **`CABLE Input`** (VB-CABLE) ou **`Line 1`** (VAC).
2. **Dans Discord, OBS, VRChat ou votre jeu :**
   - **Périphérique d'entrée (Microphone) :** **`CABLE Output`** (VB-CABLE) ou **`Line 1`** (VAC).
   - **Périphérique de sortie (Haut-parleurs/Casque) :** Votre **casque** (jamais le câble virtuel).
3. **Dans Discord :** Désactivez la **Suppression du bruit (Krisp)** et la **sensibilité d'entrée automatique** pour ce micro virtuel : ils coupent les respirations et les mots faibles, et YuneVoix gère déjà le nettoyage en entrée.

### S'entendre soi-même (Monitoring intégré)

N'utilisez **pas** l'option Windows *"Écouter ce périphérique"* sur le câble virtuel. YuneVoix propose des contrôles de monitoring intégrés :

- **(Optionnel) Pour vous entendre :** Utilisez **"Listen to input"** (ce que le moteur entend après nettoyage) ou **"Listen to output"** (la voix convertie) dans l'onglet **LIVE**.
- Choisissez votre **Monitor device** (votre casque, jamais le câble virtuel de sortie LIVE) et **Monitor volume** (par défaut `-6 dB`) dans **`Settings → General`**.
- **Note sur le monitoring direct :** Le *direct monitoring* matériel de votre casque ou interface audio n'a aucune latence, mais il diffuse votre **voix originale non traitée**, et non la voix convertie.

### Latence attendue

Avec les réglages par défaut (`Output buffer` `200 ms`), la latence totale de bout en bout est d'environ **0.7 seconde** (selon le développeur). Cela convient très bien au chat vocal, au streaming et à l'enregistrement, mais reste trop élevé pour chanter strictement en rythme sur une piste en direct (pour chanter sur de la musique, voir [Song Cover et Karaoke](song-cover-karaoke.md)).

---

## 3. Model Method : Classic vs. Learned 4 Steps vs. FlowEdit 3+1

Vous pouvez choisir **Model method** dans **`Settings → Voice & Timbre`** (et séparément dans **`Settings → Song Cover`** pour les covers et le karaoke). Les changements s'appliquent **au prochain START**.

### Classic (Par défaut)

- Fonctionne comme dans les versions précédentes.
- **Model steps** (`10` par défaut, ou `8` / `6` / `4`), **Solver** (`Euler` / `DPM++ 2M`), **Guidance (CFG) only in the first half of the steps** et **Timbre guidance** s'appliquent **uniquement** en mode Classic.

### Learned 4 steps

- Calibré pour sonner comme Classic 10 étapes tout en n'utilisant qu'environ **40%** du temps GPU du modèle et moins de VRAM (selon les notes du développeur).
- Le meilleur choix à tester si vous jouez en même temps ou utilisez une carte graphique plus modeste.

### FlowEdit 3+1

- Part de **votre propre voix** au lieu du bruit et ne modifie que l'identité vocale, afin de mieux préserver **respirations, chuchotements, rires et articulation** (environ **60%** du temps GPU du modèle selon les notes).
- **Exigence en LIVE :** Nécessite un échantillon de **5-20 secondes** de votre propre parole naturelle sélectionné dans **`Settings → Voice & Timbre → "Sample of your voice…"`** (enregistré sous `my_voice.yvoice`).
- **Repli automatique :** Sans cet échantillon, FlowEdit 3+1 repasse automatiquement sur **Learned 4 steps** et la ligne d'état LIVE vous l'indique. Avec le moteur expérimental **AMD MIGraphX**, toutes les méthodes de modèle s'exécutent en **Classic** (10 × Euler).
- **Conseil pièce et micro :** Comme FlowEdit conserve davantage votre propre timbre et l'acoustique de la pièce, une pièce calme ou le nettoyage d'entrée **`DF3`** aide à garder un rendu propre.

---

## 4. Réglages recommandés et Vocal Fry

- **Microphone level (`Settings → General`) :** Surveillez le vumètre et montez le gain du micro dans Windows pour que la parole forte atteigne des crêtes proches de **`−6 dBFS`**. Un micro trop faible est la cause la plus fréquente d'un rendu robotique ou "sous l'eau".
- **Input cleaning (`Settings → General`) :** Gardez **`DF3`** activé dans les pièces bruyantes (supprime clavier, clics et souffle ; `+30 ms`). Dans une pièce calme, si les rires ou respirations sont coupés, laissez **Speech gate** désactivé et essayez **`Gentle`**.
- **Smooth out vocal fry (`Settings → Voice & Timbre`, et `Settings → Karaoke`) :** Si vous parlez ou chantez très grave ou avec une voix éraillée (vocal fry) et que la voix cible paraît râpeuse, activez **Smooth out vocal fry** (agit en direct ; conserve le souffle).
- **Hauteur et moteur de contenu :** Réglez **Pitch shift** (`Settings → Pitch & Autotune`) ou un mode **Automatic pitch**, et comparez à l'oreille **Whisper** (par défaut) face à **WavLM+** (`Settings → Voice & Timbre`, pris en charge sur NVIDIA et AMD DirectML).

### Jouer tout en utilisant LIVE

Si vous constatez des saccades en jeu :
1. Limitez les **FPS** du jeu.
2. Passez **Model method** sur **`Learned 4 steps`**.
3. Raccourcissez **Prompt length** (par ex. sous `20 s`).
4. Désactivez **Harmony** si vous n'en avez pas besoin.
5. Vérifiez la charge GPU globale (la réduction de **Model steps** ne s'applique qu'au mode **Classic**).

Étape suivante : [Paramètres et Qualité Audio](settings.md).
