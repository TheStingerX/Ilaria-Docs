---
label: "🎚️ Hauteur et qualité audio"
order: 94
permalink: /audio-quality/
description: "Guide vérifié dans le code pour améliorer la qualité audio d'inférence RVC dans Ilaria RVC : base diagnostique, hauteur, méthodes F0, Index Ratio, Protect, Formant Shifting, Volume Envelope et Post-Process."
---
# Améliorer la Qualité Audio d'Inférence RVC

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Dans la conversion vocale RVC, la **qualité audio** dépend de deux moitiés qui travaillent ensemble : l'**enregistrement source** en entrée et le **modèle + réglages d'inférence** appliqués. Dans les modèles RVC guidés par la F0, la conversion synthétise le timbre de la voix cible à partir du contour F0 extrait de votre enregistrement source ; la voix cible n'impose pas automatiquement sa propre tessiture (le résultat dépend aussi des données d'entraînement et des limites du modèle). RVC **ne peut pas** réparer un écrêtage, une musique de fond forte, un écho de pièce ou une diction brouillée déjà présents dans le fichier d'entrée.

## Commencez par une base diagnostique concrète

Avant de toucher aux curseurs avancés, lancez une passe propre dans **Ilaria RVC** pour savoir ce que fait le générateur `.pth` seul sur votre audio source :

1. Ouvrez l'onglet **Inference**.
2. Sélectionnez votre voix cible dans **Voice Model** (cliquez sur **Refresh** si vous venez de l'ajouter).
3. Restez dans le sous-onglet **Single Inference**.
4. Chargez votre enregistrement dans **Audio to convert**. *(Un court extrait aide à isoler plus vite un passage précis, mais les clips courts ne sont jamais obligatoires.)*
5. Réglez **Pitch** sur `0`.
6. Sous **Inference Settings**, choisissez **RMVPE** dans **Pitch Extraction**.
7. Réglez **Index Ratio** sur `0` (désactive la recherche FAISS pour entendre le générateur `.pth` sans mélange d'index).
8. Laissez décochées (**OFF**) toutes les options facultatives d'**Audio Processing** (**Split Audio**, **Autotune**, **Proposed Pitch**, **Clean Audio**, **Formant Shifting**, **Post-Process**) et **RMVPE High Register**.
9. Cliquez sur **Convert**.
10. Écoutez **Output Audio** et lisez **Output Log** pour le statut de conversion, les durées et les détails disponibles sur l'index ou l'embedder. Ces messages ne confirment pas nécessairement que la recherche FAISS a réussi (un index peut être sélectionné et indiqué comme activé dans les paramètres alors que le chargement FAISS échoue ou est ignoré, et `Embedder` peut ne pas s'afficher explicitement lorsque `Auto (model default)` est choisi). Vérifiez la console de diagnostic si le chargement d'index échoue ou si le résultat est inattendu.

> **Base diagnostique uniquement :** Ce réglage de départ sert à isoler l'action du générateur `.pth` sans recherche FAISS ni post-traitement ; il ne garantit pas une qualité finale optimale. Modifiez un seul paramètre à la fois à partir de cette base et comparez à volume d'écoute égal.

---

## A. Obtenir une conversion propre

- **Audio source et voix isolées :** RVC attend une voix seule, sèche et propre. Des outils comme [UVR5](../non-rvc/uvr5/overview.md) ou [MVSep](../non-rvc/mvsep/overview.md) peuvent aider à séparer les voix de l'accompagnement, et des modèles spécialisés ciblent le débruitage, la déréverbération, le dé-essing ou la restauration selon le modèle utilisé (aucun outil ne supprime tout type de bruit ou de réverbération).
- **Parole vs. chant :** La parole tolère souvent de légers ajustements de **Pitch**, alors que le chant sur une piste instrumentale garde généralement **Pitch** à `0` pour rester dans la tonalité de l'accompagnement (une transposition autre que l'octave peut convenir si la tonalité de l'accompagnement change également).
- **Compatibilité modèle et embedder :** Laissez **Embedder Model** sur `Auto (model default)` sauf si vous avez volontairement entraîné ou téléchargé un modèle nécessitant un encodeur précis (`contentvec`, `spin-v2`, `klm-vocal-contentvec`, etc.). Un embedder incompatible peut provoquer une erreur ou dégrader la conversion et casser la correspondance d'index.
- **Index optionnel et export sans perte :** Gardez **Index Ratio** à `0` pour la base, puis testez votre `added_*.index` correspondant si souhaité. Utilisez `wav` ou `flac` pour des exports sans perte ; `flac` réduit la taille du fichier sans compression destructive. `mp3`, `ogg` et `m4a` utilisent un encodage avec perte dans l'exportateur actuel d'Ilaria RVC, et le format d'export n'ajoute jamais de détail que le modèle n'a pas produit.

---

## B. Corriger les problèmes de hauteur et de chant

- **Pitch (Demi-tons) :** Pitch modifie le contour F0 extrait par demi-tons (`-24` à `+24` ; `12` demi-tons = 1 octave). À `0`, la conversion guidée par la hauteur suit la hauteur source sans transposition supplémentaire. Choisissez une autre valeur uniquement si la performance cible ou l'arrangement musical l'exige (en chant, une transposition autre que l'octave peut convenir si la tonalité de l'accompagnement est aussi modifiée). Il n'existe aucun décalage de hauteur universel pour convertir entre différents types de voix. Nécessite un modèle guidé par la hauteur (`if_f0 == 1`).
- **Pitch Extraction (F0) dans Ilaria RVC :** Estime la fréquence fondamentale (F0) depuis l'entrée `16 kHz` avant la synthèse (distinct de la transposition de hauteur).
  - **Inférence Simple et par Lots (CUDA) :** `rmvpe` (par défaut), `swift`, `beatrice`, `fcpe`, `parselmouth`, `harvest`, `crepe`. *(Sous DirectML : `pm`, `harvest`, `rmvpe`, `fcpe`.)*
  - **Extraction des traits en Entraînement uniquement :** Inclut `rmvpe_gpu` (et `dio`) ; `rmvpe_gpu` n'est **pas** un bouton séparé dans Inférence.
  - *Note :* Si `rmvpe` produit un saut d'octave sur une note précise, testez `fcpe`, `swift`, `beatrice` ou `crepe` sur ce même passage plutôt que de supposer qu'une méthode est universellement « meilleure » ou plus rapide pour chaque voix.
- **RMVPE High Register** *(visible uniquement si `rmvpe` est sélectionné)* :
  - **Enable high register :** Active la correction secondaire des erreurs d'octave pour les notes chantées très aiguës. Ne le laissez **pas** activé par défaut pour la parole normale ou le chant médium.
  - **Mode (`true_pitch` / `fold`) :** `true_pitch` conserve la F0 corrigée jusqu'à **Maximum F0 (Hz)** (`1000–2000`, défaut `1250`) ; `fold` garde les notes corrigées une octave plus bas.
  - **Advanced (`Activation threshold` `800–1500` Hz défaut `1040`, `Sensitivity`, `Minimum note duration` `0–300` ms défaut `60`) :** Règle le déclenchement de la correction du registre aigu.
  - **Preview original and corrected F0 :** Trace les 30 premières secondes de F0 estimée vs. corrigée sans lancer la conversion vocale complète. Un tracé plus propre aide à diagnostiquer les sauts d'octave, mais ne garantit pas automatiquement un meilleur rendu audio.
- **Autotune et Autotune Strength (`0–1`, défaut `1.0`) :** Cale les trames F0 voisées sur la note chromatique tempérée la plus proche (`G1`–`C6`), modulé par **Autotune Strength**. Comme il attire vers *chaque* demi-ton chromatique (il n'y a **pas** de sélecteur de tonalité ou de gamme dans Ilaria RVC), une force élevée peut aplatir le vibrato naturel ou les glissés expressifs.
- **Proposed Pitch et Target Pitch (Hz) (`50–1200`, défaut `155`) :** Calcule la médiane des trames F0 voisées interpolées sur l'audio source et ajoute un décalage automatique en demi-tons (`-12` à `+12`) vers **Target Pitch (Hz)** en plus de votre curseur **Pitch**. Utile comme test rapide de transposition, même si la hauteur mathématiquement centrée n'est pas toujours la meilleure musicalement ou vocalement. **Autotune** et **Proposed Pitch** exigent un modèle guidé par la hauteur (`if_f0 == 1`).

---

## C. Corriger l'identité vocale et le timbre

- **Content Embedder vs. Voice Generator (`.pth`) :** Le générateur `.pth` entraîné produit la voix cible, tandis que le content embedder (par défaut `Auto (model default)`, typiquement `contentvec`) extrait les traits de parole de l'enregistrement source. L'embedder est conçu pour réduire les informations d'identité du locuteur source, sans être nécessairement totalement indépendant du locuteur, et il ne définit pas l'identité de la voix cible. Utilisez l'embedder attendu par le modèle pour préserver la compatibilité et éviter les artefacts de conversion. Les embedders HuBERT Base chinois, japonais, coréen et portugais exigent un modèle **RVC v2**.
- **Comment fonctionne réellement `Index Ratio` (`0–1`, défaut `0`) :** Un générateur `.pth` est **toujours** utilisé quel que soit l'Index Ratio. Lorsqu'une base FAISS `added_*.index` est chargée et que `Index Ratio > 0`, RVC cherche les 8 vecteurs de traits les plus proches dans l'index et les mélange avec les traits extraits de votre entrée *avant* le générateur `.pth` :
  `features = retrieved_features * index_rate + original_features * (1 - index_rate)`
  - **`Index Ratio = 0`** désactive la recherche FAISS (`original_features` uniquement) tandis que le générateur `.pth` reste actif, offrant une base diagnostique utile sans récupération de traits FAISS.
  - **Index sélectionné vs. Recherche appliquée :** Choisir un `.index` et régler `Index Ratio > 0` fait afficher `Voice index setting: enabled` dans **Output Log**, mais si le fichier est absent ou si `faiss.read_index()` échoue, le backend continue sans recherche.
  - **Augmenter Index Ratio** rapproche les traits des vecteurs stockés dans l'index. Un index compatible peut améliorer certaines conversions, mais aussi en dégrader d'autres (diction étouffée ou artefacts du dataset) selon l'audio et le modèle. Aucune valeur ne garantit une meilleure prononciation.
- **Formant Shifting (`apply_formant_shift`, `0.7–1.4`, défaut `1.0`) :** Utilise Praat/Parselmouth (`Change gender`) **avant** la synthèse RVC sur l'entrée `16 kHz` pour décaler les résonances du conduit vocal. `1.0` est neutre ; les valeurs inférieures à `1.0` visent à assombrir/approfondir la résonance vocalique, tandis que celles supérieures à `1.0` visent à l'éclaircir. L'algorithme vise à préserver hauteur et durée, mais des artefacts peuvent apparaître, surtout aux extrêmes. **Formant Shifting** n'équivaut ni à changer **Pitch** ni à **Post-Process → Pitch Shift** (qui décale la hauteur en sortie après RVC).

---

## D. Corriger les consonnes et les respirations

- **Comment fonctionne `Protect clear consonants and breathing sounds` (`0–0.5`, défaut `0.33`) :**
  - Dans le pipeline d'inférence (`vc()`), lorsque `protect < 0.5` **et** que le modèle est guidé par la hauteur (`if_f0 == 1`), RVC sauvegarde une copie des traits d'origine non mélangés (`feats0`) *avant* la recherche FAISS.
  - Après la recherche, les trames non voisées / F0 basse (`pitchf < 1`) sont re-mélangées vers `feats0` : des valeurs plus basses rapprochent ces trames de `feats0`, tandis que **`0.5` désactive la protection**.
  - **Limite critique :** Puisque `Protect` mélange vers `feats0` (les traits avant recherche), **quand `Index Ratio = 0`, `feats` et `feats0` sont identiques**, donc modifier `Protect` produit peu ou pas de différence. De plus, `Protect` n'est pas un débruiteur ni un filtre de restauration et ne peut pas réparer des consonnes déjà écrêtées ou distordues dans la source ou le modèle.

---

## E. Corriger le volume, le bruit et la distorsion

- **Volume Envelope (`0=Input source volume, 1=Normalized Output`, défaut `0.25`) :** Utilise `change_rms()` pour mélanger l'enveloppe d'amplitude RMS de l'audio source (`1 - rate`) avec celle de la sortie RVC (`rate`).
  - `0` fait suivre de près à la sortie l'**enveloppe RMS de l'audio source**.
  - `1` conserve l'**enveloppe RMS propre du générateur RVC**.
  - Note : Malgré le libellé de l'interface, `1` ne normalise **pas** vers un niveau LUFS fixe et n'est **ni** un compresseur ni un limiteur. Ajuster `Volume Envelope` modifie l'adaptation dynamique de niveau, utile quand des silences ou écarts provoquent un effet de pompage.
- **Clean Audio et Clean Strength (`0–1`, défaut `0.5`) :** Exécute `noisereduce` **après** la conversion RVC sur l'audio converti, avec **Clean Strength** contrôlant l'intensité. Selon l'enregistrement et le bruit présent, une réduction trop agressive peut altérer consonnes, souffles et détails vocaux ; il n'existe pas de seuil universellement correct. `Clean Audio` est une réduction de bruit en post-traitement, pas une restauration audio : il ne répare pas l'écrêtage et ne corrige pas un modèle mal entraîné.
- **Post-Process Effects** *(appliqués après conversion via FFmpeg/librosa ; laissez OFF pour la base)* :
  - `Pitch Shift (-12..+12)` : Décalage de hauteur post-RVC par librosa (modifie l'audio final plutôt que le contour F0 RVC).
  - `Limiter (-24..0 dBFS, défaut -6)` et `Gain (-24..+24 dB)` : Dans la chaîne actuelle de filtres FFmpeg (`ilaria_inference_effects.py`), **Limiter** est placé **avant** **Gain** quand les deux sont activés. Comme `Gain` s'applique après `Limiter`, un `Gain` positif peut ramener les crêtes en écrêtage ; `Limiter` ne garantit pas une sortie sans écrêtage si un `Gain` positif suit.
  - Effets créatifs/utilitaires : `Reverb`, `Distortion`, `Chorus`, `Bitcrush`, `Clipping`, `Compressor`, `Delay`.
- **Resampling (`0–48000`, `0=none`) et Export Format :** Laissez `0` pour conserver la fréquence native du modèle (`32k`/`40k`/`48k`). Ne réglez `44100` ou `48000` que si votre DAW/projet l'exige (le rééchantillonnage change la fréquence d'échantillonnage, pas la qualité intrinsèque de synthèse). Utilisez `wav` ou `flac` pour des exports sans perte durant vos tests.

---

## F. Enregistrements longs et Batch Inference

- **Split Audio :** Appelle `silence_split_points()` pour insérer des découpes alignées sur les trames dans les pauses silencieuses tout en conservant les découpes normales des longs fichiers (`opt_ts`). Cela modifie la taille des segments passés à la synthèse et peut changer le comportement aux jonctions. Cela n'évite **pas** nécessairement le chargement complet de l'audio en mémoire, n'élimine **pas** toutes les causes d'usage mémoire excessif et ne corrige **ni** le volume, ni la distorsion, ni la qualité vocale.
- **Single vs. Batch Inference :** Les deux onglets exposent les mêmes réglages principaux (`Pitch`, `Pitch Extraction`, `Index Ratio`, `Resampling`, `Volume Envelope`, `Protect`, `Export Format`, `Audio Processing`, `Embedder Settings` et `RMVPE High Register`). Utilisez **Single Inference** pour régler les paramètres sur un fichier avec écoute immédiate ; utilisez **Batch Inference** (`InferOutput/` ou dossier choisi) une fois vos réglages validés pour convertir plusieurs fichiers d'un coup.

---

## Matrice Diagnostique de Dépannage

| Symptôme | Causes possibles | Vérifier d'abord | Ajustement à tester | Résultat attendu | Si cela ne suffit pas |
| --- | --- | --- | --- | --- | --- |
| **Voix trop aiguë / trop brillante** | **Pitch** trop élevé, décalage **Proposed Pitch**, **Formant Ratio** élevé ou modèle entraîné plus haut | Vérifiez **Pitch**, **Proposed Pitch** et **Formant Shifting** | Mettez **Pitch** à `0` (ou baissez si besoin) et coupez **Proposed Pitch** et **Formant Shifting** | F0 suit la source sans montée supplémentaire | Distinguez hauteur F0 et résonance : testez une petite baisse de **Formant Ratio** sous `1.0` (exemple facultatif : `0.9`) ou vérifiez les limites du modèle |
| **Voix trop grave / étouffée** | **Pitch** trop bas, **Formant Ratio < 1.0** ou décalage modèle/index | Vérifiez **Pitch**, **Formant Shifting** et **Index Ratio** | Mettez **Pitch** à `0` (ou montez si besoin) et coupez **Formant Shifting** | Présence médium/aigu plus nette sans baisse | Testez **Index Ratio = 0** pour isoler la clarté du `.pth`, ou une petite hausse de **Formant Ratio** au-dessus de `1.0` (exemple facultatif : `1.1`) |
| **Timbre métallique / cassant** | **Index Ratio** excessif ou incompatible, **Clean Audio** ou **Autotune** | Vérifiez **Audio Processing** actifs et **Output Log** | Mettez **Index Ratio = 0**, coupez **Clean Audio** et **Autotune** | Isole le timbre de base du `.pth` | Testez un autre extracteur F0 (`fcpe`, `swift`, `beatrice` ou `crepe`) |
| **Identité vocale cible faible** | Mauvais modèle `.pth`, incompatibilité d'embedder, index absent/incompatible, limites source ou entraînement | Vérifiez **Voice Model**, **Embedder Model**, qualité source et statut index en console/log | Confirmez le bon `.pth` et son `added_*.index` (testez `Index Ratio > 0` si compatible) | Timbre cible plus net si modèle et index correspondent | Vérifiez `Model information` pour la compatibilité embedder et testez sur une prise sèche plus propre |
| **Trop proche du locuteur source** | Incompatibilité modèle/embedder, fuite d'identité ou grand écart de tessiture | Comparez la source à l'embedder attendu et à la tessiture du modèle | Réglez **Embedder Model** sur `Auto (model default)` et testez un `added_*.index` compatible si disponible | Meilleure séparation par rapport au locuteur source | Ajustez **Pitch** uniquement si nécessaire pour la performance cible ou testez un autre modèle |
| **Consonnes mâchées / abîmées** | **Index Ratio** excessif ou incompatible, **Protect** désactivé (`0.5`) ou diction source floue | Vérifiez **Index Ratio** et **Protect** (`0.5` = off ; défaut `0.33`) | Baissez **Index Ratio** (ou testez `0`) et réglez **Protect** sous `0.5` avec un index sur modèle F0 | Préserve mieux les traits non voisés source (`feats0`) lors du mélange | Vérifiez la diction de la source sèche ; `Protect` ne répare pas des consonnes déjà mâchées ou écrêtées |
| **Sifflantes dures (`s`/`ch`)** | Micro source brillant, **Formant Ratio** élevé ou distorsion **Post-Process** | Écoutez la source sèche dans Audio Analyzer | Coupez **Formant Shifting** et **Post-Process** ; testez **Index Ratio = 0** | Transitoires `s`/`ch` adoucies | Appliquez un dé-esseur sur l'audio source sec avant RVC |
| **Respirations distordues ou absentes** | Gate/bruit dans la source, limites du modèle, **Volume Envelope** ou **Clean Audio** post-conversion | Comparez les respirations source avec la sortie | Coupez **Clean Audio** et testez **Volume Envelope** (ex. `0` vs `0.25` défaut) | Les respirations suivent mieux la dynamique source | Baissez **Index Ratio** (ou mettez `0`) si la recherche ramène des trames bruitées |
| **Sauts d'octave sur notes tenues** | Détecteur F0 trompé par des harmoniques ou notes très aiguës | Vérifiez forme d'onde/F0 dans **Audio Analyzer** | Alternez **RMVPE** / **FCPE** / **Swift** / **CREPE**, ou testez **RMVPE High Register** | Suivi F0 plus stable sur notes tenues | Vérifiez les résidus d'instruments ou d'harmonies dans la piste source |
| **Vibrato artificiel / glissés plats** | **Autotune** activé sur chant expressif | Vérifiez **Audio Processing → Autotune** | Coupez **Autotune** ou réduisez **Autotune Strength** (exemple facultatif : `0.3`) | Retour du vibrato naturel et des glissés | Comparez la fluidité F0 de **RMVPE** vs **CREPE** |
| **Hauteur instable / chevrotante** | Source bruitée/réverbérante ou suivi `parselmouth`/`harvest` | Écoutez la piste vocale source isolée | Séparez/débruitez/déréverbérez la source avant RVC et utilisez **RMVPE** | Contour F0 plus stable | Montez `filter_radius` (`>= 3`) si vous utilisez spécifiquement `harvest` |
| **Voix robotique / effet vocoder** | Mauvais **Embedder**, incompatibilité `v1`/`v2` (pouvant aussi provoquer une erreur bloquante) ou graves erreurs F0 | Vérifiez **Output Log** et la console pour les alertes embedder/F0 | Réglez **Embedder Model** sur `Auto (model default)` et vérifiez **RMVPE** | Synthèse vocale naturelle | Testez sur un enregistrement source sec plus propre |
| **Souffle de fond / artefacts de débruitage** | **Clean Audio** trop fort ou enregistrement source bruité | Comparez avec **Clean Audio** OFF | Coupez **Clean Audio** ou réduisez **Clean Strength** | Moins d'artefacts aqueux | Appliquez un débruitage/déréverbération dédié *avant* RVC |
| **Écrêtage / distorsion dure** | Écrêtage déjà dans la source, en inférence, **Gain** positif (même après **Limiter**), FX **Distortion/Clipping** ou à l'export | Repérez où apparaît d'abord la distorsion (source vs. sortie dans **Audio Analyzer**) | Coupez **Post-Process** (surtout **Gain** positif après **Limiter**) | Stoppe l'écrêtage post-RVC | Baisser le volume d'un audio déjà écrêté **ne** reconstruit pas les échantillons perdus ; réenregistrez ou utilisez une source saine |
| **Volume irrégulier / pompage** | **Volume Envelope** inadapté à la dynamique source | Comparez **Volume Envelope** `0` vs `0.25` (défaut) vs `1.0` | Ajustez **Volume Envelope** vers `0` (RMS source) ou `1.0` (RMS modèle) | Niveau de phrase plus régulier | Appliquez **Compressor** / **Limiter** doux (sans **Gain** positif après) seulement si besoin |
| **Erreurs de resampling / export / lot** | Taux `Resampling` invalide, FFmpeg absent (pour `mp3`/`ogg`/`m4a`) ou chemin invalide | Lisez le message exact dans **Output Log** et console | Réglez `Resampling = 0`, exportez `wav` ou `flac`, utilisez des chemins ASCII simples | Export sans perte propre | Lancez `RUN_ILARIA_RVC_LOGS.bat` pour voir la trace complète |

## Guides associés

- [Inférence simple et par lots](../ilaria-rvc/convert/inference.md) · [Contrôles d'inférence](../ilaria-rvc/convert/inference-buttons.md) · [Inférence avancée](../ilaria-rvc/convert/advanced-inference.md)
- [Fichiers index (.index)](../start/indexes.md) · [Extracteurs de hauteur](../start/pitch-extractors.md) · [Embedders](../start/embedders.md) · [Audio Analyzer](../ilaria-rvc/manage/audio-analyzer.md)
