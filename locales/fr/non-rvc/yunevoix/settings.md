---
label: "Paramètres et Qualité Audio"
icon: ":gear:"
order: 96
permalink: /fr/non-rvc/yunevoix/settings/
description: "Guide complet pour débutants de chaque paramètre de YuneVoix v0.7.1 dans General, Voice & Timbre, Pitch & Autotune, EQ & Filters et Effects."
---
# Paramètres de YuneVoix Expliqués - Guide Complet de Qualité Audio

[Aperçu et Configuration Requise](overview.md) · [Voice Bank et Utilisation en Direct](usage.md) · [Song Cover et Karaoke](song-cover-karaoke.md)

Cette référence explique chaque paramètre documenté dans YuneVoix **v0.7.1** (NVIDIA et AMD). Dans la documentation du développeur :
- **"Works live"** signifie que le changement prend effet immédiatement pendant que LIVE fonctionne.
- **"At the next START"** signifie que vous devez arrêter LIVE puis appuyer de nouveau sur **START** pour appliquer le changement.

---

## Settings → General

Ces contrôles gèrent le nettoyage d'entrée, le monitoring, le niveau de sortie, la mémoire tampon et la sélection du backend graphique AMD (s'applique à **LIVE**, tandis que `Models folder` et `AMD graphics engine` agissent globalement) :

| Contrôle | Défaut | Application | Ce que c'est et ce que ça fait | Quand l'utiliser et risques possibles |
| --- | --- | --- | --- | --- |
| **Input cleaning** (`DF3`, `Gentle`, `Sidon`, `Off`) | `DF3` | Au prochain START | Nettoie l'audio du micro avant conversion. `DF3` supprime frappe, clics et souffle tout en rehaussant les micros faibles (`+30 ms`). `Gentle` retire bruit continu/clics en gardant rires et respirations. `Sidon` reconstruit la parole sur GPU (`+~200 ms`). `Off` désactive le nettoyage. | Utilisez `DF3` en pièce normale/bruyante, `Gentle` en pièce calme, `Off` uniquement avec un micro studio propre. **N'utilisez pas `Sidon` pour chanter** (documenté comme inadapté au chant). |
| **Speech gate** | `Off` | En direct | Coupe la sortie entre les mots. | Activez uniquement en pièce bruyante pour de la parole simple ; **les rires et soupirs sont coupés**, laissez donc désactivé si vous riez souvent. |
| **Microphone level** | Vumètre (cible `−6 dBFS`) | Vumètre seul | Affiche le niveau du microphone en dB. | Montez le gain micro dans Windows jusqu'à ce que la parole forte atteigne des crêtes vers **`−6 dBFS`**. Une entrée trop faible donne un son robotique ou "sous l'eau". |
| **Monitor device** | Sortie Windows par défaut | Monitoring LIVE | Choisit où jouent **"Listen to input"** / **"Listen to output"**. | Sélectionnez votre **casque**, jamais le câble virtuel utilisé en sortie LIVE (évite les boucles de rétroaction). |
| **Monitor volume** | `−6 dB` | Monitoring LIVE | Règle le volume de la sortie de monitoring intégrée. | Baissez si le monitoring est trop fort ; n'affecte pas ce que reçoivent Discord/OBS. |
| **Output volume** | `−6 dB` | En direct | Contrôle le niveau de sortie converti envoyé vers le périphérique LIVE. | YUNE joue plus fort que la plupart des enregistrements ; gardez autour de `−6 dB` sauf besoin particulier de l'app réceptrice. |
| **Peak limiter (`−1 dBFS`)** | `On` | En direct | Plafonne les crêtes de sortie à `−1 dBFS` pour éviter l'écrêtage numérique. | Laissez sur **On** sauf test volontaire de la dynamique brute. |
| **Output buffer** | `200 ms` | Au prochain START | Taille du tampon audio avant lecture. | Des valeurs plus grandes réduisent coupures/craquements au prix d'une latence plus élevée ; trop bas provoque des coupures audio. |
| **Models folder** | Vide (`models` à côté de `.exe`) | Global | Pointe vers un dossier personnalisé pour les modèles et voix. | Laissez vide sauf si vous stockez `models` ailleurs. |
| **Save diagnostic recordings** | `Off` | Diagnostic | Enregistre des fichiers WAV de ce que le moteur a entendu et produit (s'arrête après 10 min ; repasse à Off au redémarrage). | Activez **uniquement** pour signaler un bug ; vérifiez l'absence de propos privés avant partage. |
| **Restore default settings** | Bouton d'action | Global | Réinitialise tous les paramètres par défaut. | Vos voix enregistrées et périphériques audio sélectionnés restent intacts. |
| **AMD graphics engine** *(version AMD uniquement)* | `DirectML` | Après redémarrage | Bascule entre **DirectML** (par défaut, GPU dédié) et l'expérimental **MIGraphX**. | Laissez sur **DirectML** pour `WavLM+` et `FlowEdit 3+1`. **MIGraphX** exige Windows 11 24H2+, Adrenalin 25.10.13.09+, 10-30 min de première compilation, et désactive `WavLM+`, `FlowEdit 3+1`, `Learned 4 steps` et les options réservées à Classic (tout s'exécute en Classic, 10 × Euler). |

> **Nettoyage vs. Volume vs. Limiteur vs. Tampon :** *Input cleaning* enlève le bruit de fond avant que l'IA vous entende ; *Output volume* ajuste le volume ; *Peak limiter* évite la distorsion soudaine ; *Output buffer* échange de la latence contre de la stabilité face aux craquements.

---

## Settings → Voice & Timbre (LIVE)

Contrôle la proximité avec la voix du Voice Bank par rapport à votre propre voix, ainsi que l'architecture/méthode de modèle exécutée :

- **Timbre strength** (`100%` par défaut) : En dessous de `100%`, mélange votre propre timbre vocal grâce à **`Sample of your voice…`** (5-20 s de parole normale, enregistré dans `my_voice.yvoice`). Fonctionne en LIVE.
- **Timbre change when you raise or lower your voice** (`50%` par défaut) : `100%` laisse la couleur vocale évoluer naturellement avec la hauteur ; `0%` garde la même couleur sur toute votre tessiture.
- **Prompt length** (`20 s` par défaut, recommandé) : Durée du prompt de référence utilisé par le modèle de diffusion. `20 s` donne le timbre le plus stable ; des valeurs plus courtes économisent de la VRAM (**Au prochain START**).
- **Model method** (`Classic` par défaut, **Au prochain START**) :
  - **`Classic` :** Comportement des versions précédentes ; active les quatre réglages réservés à Classic ci-dessous.
  - **`Learned 4 steps` :** Calibré pour sonner comme 10 étapes tout en n'exigeant qu'environ **40%** du temps GPU et moins de VRAM (selon les notes du développeur).
  - **`FlowEdit 3+1` :** Part de votre propre voix (`Sample of your voice…`, 5-20 s) au lieu du bruit et ne change que l'identité vocale, préservant mieux respirations, chuchotements, rires et articulation (environ **60%** du temps GPU du modèle). Repasse sur `Learned 4 steps` sans échantillon (affiché dans la ligne d'état LIVE). Sous **AMD MIGraphX**, toutes les méthodes de modèle s'exécutent en `Classic` (10 × Euler).
- **Contrôles réservés à Classic** *(actifs uniquement quand `Model method = Classic`)* :
  - **Model steps** (`10` par défaut) : `8`, `6` (`≈ −0.75 Go` VRAM) ou `4` (`≈ −1.1 Go` VRAM) tournent plus vite avec moins de VRAM.
  - **Solver** (`Euler` par défaut) : Passez sur `DPM++ 2M` avec `4-6` étapes.
  - **Guidance (CFG) only in the first half of the steps** (`Off` par défaut) : Économise de la VRAM, surtout utile avec `4-6` étapes.
  - **Timbre guidance** (`0 = off` par défaut) : `0.5-1` renforce le souffle sur des enregistrements cibles soufflés ; consomme plus de temps GPU.
- **Content engine** (`Whisper` par défaut, **Au prochain START**) :
  - **`Whisper` :** Fidélité plus proche du timbre cible.
  - **`WavLM+`** *(NVIDIA et AMD DirectML uniquement ; indisponible sous AMD MIGraphX)* : Parole en direct plus claire, préserve rires, chuchotements et respirations avec beaucoup moins de bourdonnement, au prix d'un timbre parfois légèrement moins exact. Comme `WavLM+` utilise son propre modèle, **`Fine-tuned model`** et **`Breathiness`** sont désactivés lorsque `WavLM+` est actif.
- **Fine-tuned model** (`Off` par défaut, **Au prochain START**, Whisper uniquement) : Suit de plus près votre souffle et votre grain, avec un timbre cible légèrement moins exact.
- **Breathiness** *(Fine-tuned model uniquement)* : Par défaut `as you sing` ; `×1` / `×2` ajoute de l'air supplémentaire.
- **Roughness from your voice** (`Off` par défaut) : Restitue le grain/éraillé là où votre propre voix est rauque.
- **Smooth out vocal fry** (`Off` par défaut, **Fonctionne en direct**) : Évite qu'une voix très grave ou craquante paraisse râpeuse tout en gardant le souffle.
- **Guidance (CFG)** (`0.7` par défaut, recommandé tel qu'entraîné) : Contrôle l'adhérence au prompt de timbre cible.

---

## Settings → Pitch & Autotune (LIVE)

- **Pitch shift** (`+12 st` par défaut dans la doc développeur en exemple voix masculine → cible féminine ; `0` pour même tessiture ; `−12` pour féminine → masculine) : Décale la hauteur en demi-tons. Il n'existe pas un seul réglage "correct" pour toutes les voix : choisissez le décalage adapté à votre voix et au personnage cible.
- **Automatic pitch** (`Off` par défaut) : `Off` utilise le curseur Pitch shift. **`Octave from the target voice`** garde le chant juste ; **`Match the target voice's pitch`** ajuste la hauteur de parole vers la cible.
- **Melody mode** (`Follow my pitch` par défaut) :
  - **`Follow my pitch` :** Suivi naturel de la hauteur.
  - **`Autotune` :** Cale les notes sur la tonalité/gamme (`Retune speed` `40 ms` par défaut : `25-60 ms` naturel, `0-10 ms` robotique ; `Stability` `50%` ; `Pull to the nearest note` `50%` ; `Note change threshold` `20 cents`).
  - **`Stabilize` :** Stabilise les notes tenues tout en gardant le vibrato.
- **I sing without a backing track** (`On` par défaut) : Passez sur **Off** quand vous chantez sur un morceau.
- **Key / Scale** (`Auto` par défaut) : Détecte ou verrouille automatiquement la gamme musicale pour Autotune/Harmony.
- **Vibrato** (`100%` par défaut) : Conserve votre vibrato naturel à `100%`.
- **Fix pitch detector errors** (`On` par défaut, recommandé) : Lisse les sauts brusques du détecteur de hauteur.
- **Harmony** (`Off` par défaut) : Ajoute tierces/quintes en direct selon la tonalité (`Harmony volume` `−6 dB`) ; consomme du temps GPU supplémentaire.

---

## Settings → EQ & Filters (LIVE)

Tous ces contrôles façonnent le timbre et adoucissent les duretés en **LIVE** (et sont copiés vers les covers si vous cliquez sur **Copy settings from LIVE**) :

- **Voice character** (`Off (as before)` par défaut) : Préréglages intégrés (**Soft**, **Warm**, **Bright**, **Calm**, **Expressive**) ou curseurs manuels pour **Formants**, **Intonation range**, **Pitch smoothing**, **Warmth** (`≈250 Hz`), **Softness** (`0.5-3 kHz`) et **Presence** (`≈3.5 kHz`).
- **Breath smoothing** (`100%` par défaut) : Supprime de légers grésillements dans les respirations.
- **Silence stays silent** (`On` par défaut) : Force les pauses à un vrai silence ; avec `WavLM+` vous pouvez comparer avec **Off**.
- **Smooth top** (`100%` par défaut) et **Brightness** (`0 dB` par défaut) : **Smooth top** adoucit la dureté/le grain dans les hautes fréquences. N'augmentez **Brightness** que si la sortie paraît sourde (et mettez **Smooth top** à `0` si vous montez Brightness).
- **Filters, De-esser, Dynamic EQ** (`Off` par défaut) : Choisissez d'abord un préréglage, puis affinez si les sifflantes (`s`/`ch`) ou certaines fréquences semblent agressives.

---

## Settings → Effects (LIVE)

- **Compressor, Saturation, Bitcrush, Reverb** (`Off` par défaut) : Chaque effet inclut des préréglages et **fonctionne en direct** (évolue sans coupure même en chantant). À doser avec modération pour ne pas masquer le timbre cible ni ajouter de distorsion ou d'écho indésirables.

---

## Tableaux Récapitulatifs Rapides

### Point de Départ Recommandé (Documentation du Développeur)

| Domaine | Valeur de Départ | Notes |
| --- | --- | --- |
| **Input cleaning** | `DF3` (`Gentle` en pièce calme) | `Speech gate` `Off` |
| **Microphone level** | Crêtes vers `−6 dBFS` | Régler dans les paramètres audio Windows |
| **Output / Monitor volume** | `−6 dB` / `−6 dB` | `Peak limiter (−1 dBFS)` `On` |
| **Output buffer** | `200 ms` | Augmenter si l'audio craque |
| **Prompt length / CFG** | `20 s` / `0.7` | `Timbre strength` `100%` |
| **Model method / Content engine** | `Classic` (ou `Learned 4 steps` en jeu) / `Whisper` | Tester `WavLM+` / `FlowEdit 3+1` pour respirations et rires |
| **EQ & Effects** | `Smooth top` `100%`, `Brightness` `0 dB`, `Breath smoothing` `100%` | `Effects` `Off` |

### Quand les Changements s'Appliquent (`Works live` vs. `At the next START`)

| Appliqué Immédiatement (`Works live`) | Nécessite Stop → `START` (`At the next START`) |
| --- | --- |
| `Speech gate`, `Output volume`, `Peak limiter` | `Input cleaning`, `Output buffer` |
| `Smooth out vocal fry`, `Timbre strength`, `Guidance (CFG)` | `Prompt length`, `Model method` (`Classic` / `Learned 4 steps` / `FlowEdit 3+1`) |
| Contrôles `Pitch & Autotune`, `EQ & Filters`, `Effects` | `Content engine` (`Whisper` / `WavLM+`), `Fine-tuned model` |

### Contrôles Réservés à Classic vs. Compatibilité des Backends AMD

| Fonction | Classic Uniquement ? | NVIDIA | AMD DirectML | AMD MIGraphX (Expérimental) |
| --- | --- | --- | --- | --- |
| `Model steps`, `Solver`, `1st-half CFG`, `Timbre guidance` | **Oui** | Oui | Oui | **Non** *(fixe 10 × Euler)* |
| `Learned 4 steps` | Non | Oui | Oui | **Non** *(repli sur Classic)* |
| `WavLM+` | Non | Oui | Oui | **Non** *(indisponible)* |
| `FlowEdit 3+1` | Non | Oui | Oui | **Non** *(repli sur Classic)* |

> Sous AMD MIGraphX, YUNE exécute toujours la méthode Classic avec 10 étapes Euler ; `Learned 4 steps`, `FlowEdit 3+1` et les options réservées à Classic n'y sont pas disponibles.

### Différences de Départ entre Parole et Chant

| Paramètre | Parole (Discord / Streaming) | Chant |
| --- | --- | --- |
| **Input cleaning** | `DF3` (ou `Gentle` en pièce calme) | `DF3` ou `Gentle` (**jamais `Sidon`**) |
| **Automatic pitch** | `Match the target voice's pitch` (ou `Off` + curseur) | `Octave from the target voice` (ou `Off` + `0`/`±12`) |
| **I sing without a backing track** | `On` | `Off` en chantant sur de la musique |
| **Melody mode** | `Follow my pitch` | `Follow my pitch`, `Stabilize` ou `Autotune` |

Étape suivante : [Song Cover et Karaoke - Guide Complet pour Débutants](song-cover-karaoke.md).
