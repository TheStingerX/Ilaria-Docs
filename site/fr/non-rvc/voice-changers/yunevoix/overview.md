# YuneVoix (YUNE)

[Hugging Face (Téléchargement)](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Soutien et Premium)](https://ko-fi.com/yunevoix)

YuneVoix est une application de conversion vocale par IA en temps réel pour Windows, propulsée par le moteur **YUNE**. Tout comme RVC, elle transforme votre voix en celle d'une autre personne - pour la parole comme pour le chant, en direct ou hors ligne - mais **sans entraîner de modèle vocal individuel**. Tout s'exécute localement sur votre carte graphique : sans cloud, sans compte, et votre audio ne quitte jamais votre PC.

> **Plan du guide :** [1. Aperçu et Configuration Requise](overview.md) · [2. Installer et Mettre à Jour](installation.md) · [3. Voice Bank et Utilisation en Direct](usage.md) · [4. Paramètres et Qualité Audio](settings.md) · [5. Song Cover et Karaoke](song-cover-karaoke.md) · [6. Premium, Licence et Aide](premium-and-troubleshooting.md) · [7. Journal des Modifications](changelog.md)

## Comment ça fonctionne

Au lieu de passer des heures à entraîner un modèle sur un jeu de données, YUNE crée un profil **Voice Bank** à partir d'un court enregistrement de référence de la voix cible (**10-25 secondes**). *(Par ailleurs, la méthode LIVE **FlowEdit 3+1** utilise également un échantillon de **5-20 secondes** de votre propre voix naturelle comme point de départ - par exemple, 15 secondes de la voix cible dans Voice Bank contre 10 secondes de votre propre parole naturelle dans `Settings → Voice & Timbre → Sample of your voice…`.)*

Selon la documentation du développeur, le pipeline YUNE sépare votre voix en *ce que vous dites* et *comment vous le dites* :

1. **Voice Bank et identité du locuteur :** Enregistre un profil vocal (`.yvoice`) à partir d'un extrait cible de 10-25 secondes sans entraîner un réseau neuronal distinct à partir de zéro.
2. **Moteur de contenu (`Whisper` ou `WavLM+`) :** Capture vos mots, votre rythme et votre articulation.
3. **Suivi de la hauteur (pitch) :** Suit votre mélodie et votre intonation.
4. **Conversion par diffusion :** Reconstruit l'audio avec le timbre du locuteur cible grâce à la référence Voice Bank.
5. **Vocodeur neuronal (`PC-NSF`) :** Produit un signal audio pleine bande à **44.1 kHz**.
6. **Traitement audio :** Applique le nettoyage d'entrée, les outils de pitch/autotune, l'égalisation/filtres et les effets.

En mode **LIVE**, l'audio est traité par petits blocs d'environ **160 ms**, avec une latence totale de bout en bout d'environ **0.7 seconde** avec les réglages par défaut (selon le développeur).

## BASIC vs. PREMIUM

| Fonctionnalité | BASIC (Gratuit) | PREMIUM |
| --- | --- | --- |
| **Modificateur de voix LIVE** (parole et chant) | Inclus | Inclus |
| **Voice Bank** (créer et partager des voix `.yvoice`) | Inclus | Inclus |
| **Outils de hauteur** (transposition, autotune, stabilisateur, harmonie) | Inclus | Inclus |
| **Caractère vocal et effets vocaux** | Inclus | Inclus |
| **Nettoyage d'entrée** (suppression bruit/clics, speech gate) | Inclus | Inclus |
| **Song Cover** (séparer les voix, convertir, remixer) | - | Inclus |
| **Karaoke** (chanter avec paroles à l'écran) | - | Inclus |
| **Licence hors ligne** | Non requise | `license.yvl` par PC |

> **YuneVoix PREMIUM** est proposé aux soutiens sur [Ko-fi](https://ko-fi.com/yunevoix). L'accès est géré en privé via Ko-fi ou message privé, et la licence fonctionne entièrement hors ligne. Consultez [Song Cover et Karaoke](song-cover-karaoke.md) et [Premium, Licence et Aide](premium-and-troubleshooting.md) pour les détails.

## Fonctionnalités clés

- **Modificateur de voix LIVE** : microphone en entrée, voix convertie vers n'importe quel périphérique audio (Discord, OBS, jeux, VRChat). Fonctionne pour parler et chanter.
- **Voice Bank** : créez un nouveau profil `.yvoice` à partir de **10-25 secondes** d'enregistrements propres. YuneVoix peut séparer automatiquement la voix de la musique/du bruit et supprimer la réverbération.
- **Trois méthodes de modèle** (selon la documentation du développeur) :
  - **Classic :** Comportement des versions précédentes avec contrôles configurables de `Model steps`, `Solver` et guidance.
  - **Learned 4 steps :** Conçu pour obtenir des résultats proches de Classic 10 étapes tout en utilisant environ **40%** du temps GPU du modèle et moins de VRAM.
  - **FlowEdit 3+1 :** Part de votre propre voix source (échantillon de 5-20 secondes de votre voix en LIVE ; la voix du morceau dans Song Cover) au lieu du bruit et vise à mieux préserver respirations, chuchotements, rires et articulation (environ **60%** du temps GPU du modèle selon les notes).
- **Moteurs de contenu** : **Whisper** (par défaut) et **WavLM+** (sur NVIDIA et AMD DirectML, pensé pour une parole en direct plus claire et pour préserver rires, chuchotements et respirations).
- **Outils de hauteur** : transposition manuelle ou automatique, autotune avec détection de tonalité, stabilisateur de hauteur doux, profondeur de vibrato et harmonie en direct (tierces, quintes).
- **Caractère vocal, EQ et effets** : force du timbre, formants, chaleur, douceur, présence, dé-esseur, EQ dynamique, compresseur, saturation, bitcrush, réverbération et limiteur de crête. Voir [Paramètres et Qualité Audio](settings.md).
- **Song Cover et Karaoke (PREMIUM)** : rechantez des morceaux complets avec séparation vocale automatique ou chantez sur des paroles à l'écran.
- **Sélecteur de langue de l'interface** : anglais, allemand, italien, espagnol, polonais et portugais.

## Configuration requise

YuneVoix nécessite un **GPU dédié** et ne peut pas fonctionner uniquement sur CPU. Les puces intégrées/Arc Intel, macOS et Linux ne sont pas pris en charge.

| Composant | NVIDIA (Recommandé) | AMD |
| --- | --- | --- |
| **OS** | Windows 10 / 11 64-bit | Windows 10 / 11 64-bit |
| **GPU** | 8 Go+ VRAM (**12 Go recommandés**), GeForce RTX recommandé | Radeon **série RX 7000** ou plus récente, 12 Go+ VRAM (**16 Go recommandés**) |
| **Pilote** | Pilote NVIDIA à jour | Pilote AMD Software: Adrenalin Edition à jour |
| **Audio** | Microphone + **casque** (indispensable en direct) | Microphone + **casque** (indispensable en direct) |

> **Note (AMD) :** Windows 11 24H2+ et Adrenalin 25.10.13.09+ ne sont requis que pour le moteur expérimental **MIGraphX**, disponible dans `Settings → General → "AMD graphics engine"`.

### AMD DirectML vs. AMD MIGraphX

- **AMD DirectML (Par défaut dans v0.7.1) :** Intégré et utilisé par défaut sur le GPU AMD dédié. Fonctionne immédiatement sans téléchargement Windows Update ni compilation initiale des modèles, et prend en charge **`WavLM+`** ainsi que **`FlowEdit 3+1`** selon la documentation du développeur.
- **AMD MIGraphX (Expérimental) :** Doit être activé explicitement dans `Settings → General → "AMD graphics engine"` et nécessite un redémarrage. Windows Update peut télécharger des composants MIGraphX, la préparation initiale des modèles peut prendre **10-30 minutes**, et **`WavLM+`**, **`FlowEdit 3+1`** et **`Learned 4 steps`** ne sont **pas** disponibles sous MIGraphX (le modèle s'exécute toujours en Classic, 10 × Euler).

Étape suivante : [Installer et mettre à jour YuneVoix](installation.md).
