---
label: "Premium, licence et assistance"
icon: ":wrench:"
order: 96
permalink: /non-rvc/yunevoix/premium-and-troubleshooting/
---
# Premium, licence et dépannage

## YuneVoix PREMIUM : Song Cover et Karaoké

Les soutiens sur [Ko-fi](https://ko-fi.com/yunevoix) accèdent à **YuneVoix PREMIUM**, qui débloque des fonctionnalités musicales hors ligne en plus de tout ce qui est inclus dans BASIC :

- **Song Cover** : choisissez un morceau et une voix cible. YuneVoix sépare la voix de l'instrumental, convertit la voix principale (et éventuellement les chœurs) et remixe le tout.
  - **Formats pris en charge** : WAV, MP3, FLAC, M4A, AAC, OGG, WMA, AIFF (jusqu'à **15 minutes**).
  - **Temps de traitement** : environ **1,3×** la durée du morceau (un titre de 5 minutes prend environ 6–7 minutes).
  - **Formats de sortie** : **WAV 24-bit** ou **MP3 320 kbps**.
- **Karaoké** : chantez avec les paroles à l'écran ; votre prise est convertie dans la voix choisie et mixée avec la musique, ajustée à la tonalité et au niveau de l'original.

### Conseils pour Song Cover

- **Mauvaise tonalité** : réglez manuellement **Settings → Song Cover → Octave** sur **`−12`**, **`0`** ou **`+12`** au lieu de `Auto`.
- **Duos et chœurs** : **« Lead vocal only »** donne le résultat le plus propre. S'il y a deux chanteurs principaux, les deux reçoivent la voix choisie (impossible d'isoler un seul chanteur).
- **Droits d'auteur** : le morceau appartient toujours à ses auteurs — vérifiez les règles de la plateforme et les droits avant de publier des reprises.

## Licence PREMIUM et activation

1. Ouvrez l'onglet **Song Cover** et cliquez sur **« Copy request code »**.
2. Envoyez ce code avec votre achat Ko-fi.
3. Vous recevrez un fichier `license.yvl`. Cliquez sur **« Load license… »** et sélectionnez-le.

### Fonctionnement de la licence

- **N'expire jamais** et fonctionne **100 % hors ligne**.
- **Mises à jour** : copiez `license.yvl` à côté du nouveau `YuneVoix.exe` (ou rechargez-le).
- **Un PC par licence** : copier le dossier PREMIUM ou la licence sur un autre ordinateur ne débloquera pas Song Cover.
- **Changements matériels** : la licence est liée à la **carte mère**, au **disque système** et à l'**installation Windows**.
  - Changer **un seul** de ces éléments ne pose pas de problème (et changer de GPU, RAM ou écran ne compte pas du tout).
  - En changer **deux à la fois** (par exemple un nouveau disque système avec une nouvelle installation Windows) nécessite une nouvelle licence : copiez le nouveau request code et contactez le support avec votre commande.

## Dépannage

| Symptôme | À vérifier en premier |
| --- | --- |
| **Voix robotique, faible ou « sous l'eau »** | Augmentez le gain du micro dans Windows pour que la parole forte atteigne environ **−6 dBFS** (`Settings → General → Microphone level`) et gardez Input cleaning sur **`DF3`**. |
| **Mauvaise octave / voix de tamia** | Dans `Settings → Pitch & Autotune`, réglez **Pitch shift** (`+12` homme→femme, `0` même registre, `−12` femme→homme) ou activez le pitch automatique. |
| **Rires, respirations ou chuchotements coupés** | Désactivez **Speech gate**, passez Input cleaning sur **`Gentle`** (dans une pièce calme) et essayez le moteur **WavLM+** (pris en charge sur NVIDIA et AMD DirectML). |
| **AMD : se ferme sur START / WavLM+ ou FlowEdit indisponibles** | Mettez à jour vers la **v0.7.1** (corrige les plantages sur CPU avec GPU AMD intégré en utilisant DirectML sur la carte dédiée par défaut). Si vous avez activé MIGraphX expérimental dans `Settings → General → "AMD graphics engine"`, revenez sur **DirectML** et redémarrez pour réactiver `WavLM+` et `FlowEdit 3+1`. |
| **Craquements ou brèves coupures** | Augmentez **Output buffer** (`Settings → General`), fermez les autres apps utilisant le GPU, réduisez **Model steps** ou la longueur du prompt et désactivez **Harmony**. |
| **Saccades en jeu** | Baissez les graphismes ou la limite FPS du jeu, ou réduisez **Model steps** et la longueur du prompt dans `Settings → Voice & Timbre`. |
| **L'Explorateur Windows dit que le ZIP est invalide** | Utilisez **7-Zip** ou **WinRAR** (l'archive est chiffrée en AES-256) avec le mot de passe `yunevoix`. |

## Diagnostics et assistance

Si quelque chose ne fonctionne toujours pas :

1. Ouvrez l'Invite de commandes dans le dossier YuneVoix (tapez `cmd` dans la barre d'adresse de l'Explorateur Windows et appuyez sur Entrée).
2. Exécutez :
   ```bat
   YuneVoix.exe --check
   ```
3. Envoyez le fichier **`check.txt`** généré ainsi que **`live-diag.log`** lorsque vous demandez de l'aide dans **`yune-support`**, par DM ou sur [ko-fi.com/yunevoix](https://ko-fi.com/yunevoix).
