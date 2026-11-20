---
label: "Guide et modèles recommandés"
icon: ":scissors:"
order: 97
permalink: /non-rvc/uvr5/usage-and-models/
---
# Guide UVR5 et modèles recommandés

Utilisez ce guide pour bien configurer UVR5 et choisir les meilleurs modèles pour isoler les voix, retirer chœurs/harmonies, supprimer réverbération/écho et nettoyer le bruit (y compris les modèles des configurations recommandées).

## 1. Fenêtre principale et réglages clés

- **Select Input / Output** : choisissez vos fichiers audio et le dossier de sortie. Utilisez **`WAV`** pour préparer des datasets RVC (`Additional Settings` permet aussi l'export en float 64 bits).
- **GPU Conversion** : laissez **coché** si vous avez un GPU NVIDIA, AMD, Intel ou Apple Silicon compatible.
  - *Note* : sur GTX 10XX, si la sortie est silencieuse, laissez **Inference Mode** décoché dans `Settings → Advanced MDX-Net Options → Multi-Network`. Sur RTX / GTX 16, vous pouvez l'activer pour gagner en vitesse.
- **Vocals Only / Instrumental Only** : cochez une option si vous ne voulez qu'une piste (ex. **Instrumental Only** si vous ne voulez que l'instrumental ou la piste traitée selon le modèle).
- **Segment Size** (onglet `MDX-Net`, ex. **`256`**) : règle la mémoire utilisée par les modèles MDX-Net classiques.
  - *Note pour les Roformers* : lorsque **Segment Default** est coché dans Advanced MDX-Net Options, UVR5 lit `chunk_size` directement dans le `.yaml` du modèle au lieu du menu Segment Size.
- **Overlap** (pour les Roformers) : **`4`** offre le meilleur équilibre vitesse/qualité SDR ; **`8`** apporte un peu plus de régularité, tandis que `16–32` ralentit fortement pour un gain minime. Le réglage de l'interface remplace celui du `.yaml`.
- **Réglages VR Architecture** :
  - **Window Size** : `512` (plus précis) ou `320` (plus rapide / apprécié sur le metal et en ensemble).
  - **Aggression Setting** : en général `5`–`10` pour voix/karaoké ; **`3.0–5.0`** pour `UVR-DeEcho-DeReverb` ; valeurs négatives (**`-10` à `-25`**) pour `UVR-DeNoise` sur la voix afin de ne pas la creuser.
  - **TTA** *(Test-Time Augmentation)* : améliore la séparation pour un temps environ doublé.

## 2. Modèles recommandés par tâche

### Modèles MDX-Net et BS-Roformer

| Modèle | Rôle | Notes |
| --- | --- | --- |
| **`BS-Roformer-Viperx-1297`** | **Séparation principale Voix / Instrumental** | Modèle BS-Roformer de référence. Excellent pour extraire des instrumentaux et voix propres, et pilier des ensembles (`1296 + 1297 + MDX23C HQ`). |
| **`UVR-MDX-NET Inst HQ 4`** | **Séparation propre Instrumental / Voix** | Modèle MDX-Net v2 très rapide et net. Souvent associé en ensemble à `1_HP-UVR` ou aux BS-Roformer. |
| **`dereverb_bs_roformer_anvuew_sdr_22.5050.ckpt`** | **De-Reverb (Roformer)** | Modèle BS-Roformer moderne par anvuew (entraîné sur plugins VST & presets Waves IR1). Plus propre sur la réverbération vocale que les anciens modèles mono. |

### Modèles VR Architecture

| Modèle | Rôle | Notes |
| --- | --- | --- |
| **`1_HP-UVR`** | **Séparation Voix / Instrumental** | Modèle VR passe-haut classique. Utile seul ou en ensemble (notamment sur rock/metal dense) avec des modèles MDX-Net. |
| **`5_HP-Karaoke-UVR`** | **Voix principale vs Chœurs** | Sépare la voix principale des chœurs/harmonies. Efficace surtout sur **voix déjà isolées** (ou via *Settings → Vocal Splitter Options*). |
| **`UVR-De-Echo-Normal`** | **De-Echo doux** | Supprime délai et écho léger tout en préservant mieux le timbre ; utilisable après ou en complément d'un DeReverb. |
| **`UVR-DeEcho-DeReverb`** | **De-Echo + De-Reverb puissant** | Supprime à la fois écho et réverbération mono/stéréo. Gardez **Aggression** vers **`3.0–5.0`** (plafond fréquentiel ~17,5 kHz). |
| **`UVR-DeNoise`** | **De-Noise puissant** | Débruiteur FoxJoy pour souffle, bruit blanc et artefacts. Sur voix isolées, essayez une **agressivité négative (`-10` à `-25`)** pour ne pas affiner la voix. |
| **`UVR-DeNoise-Lite`** | **De-Noise léger** | Moins agressif que `UVR-DeNoise` (coupure à `20 kHz`) et plus sûr pour les harmoniques ; agressivité recommandée vers `4`. |

### Modèles Demucs

| Modèle | Rôle | Notes |
| --- | --- | --- |
| **`v4 \| htdemucs`** *(et `htdemucs_ft`)* | **Séparation en 4 pistes** | Sépare en **Vocals, Drums, Bass et Other**. Idéal pour isoler batterie/basse ou nettoyer les résidus en ensemble multi-stems. |

## 3. Flux recommandé pour nettoyer un dataset RVC

1. **Étape 1 - Isoler la voix** : passez le morceau dans **`BS-Roformer-Viperx-1297`** (onglet MDX-Net, GPU Conversion activé).
2. **Étape 2 - Retirer harmonies / chœurs** *(si présents)* : passez la piste vocale isolée dans **`5_HP-Karaoke-UVR`** (onglet VR Architecture).
3. **Étape 3 - Supprimer réverbération et écho** : passez **`dereverb_bs_roformer_anvuew_sdr_22.5050.ckpt`** (ou **`UVR-DeEcho-DeReverb`** à Aggression `3–5` / **`UVR-De-Echo-Normal`**).
4. **Étape 4 - Débruitage final** *(uniquement si du souffle ou des artefacts restent)* : utilisez **`UVR-DeNoise`** (agressivité basse ou négative sur voix) ou **`UVR-DeNoise-Lite`**. Écoutez toujours au casque par rapport à l'étape précédente pour ne pas abîmer les consonnes.

## 4. Dépannage courant

- **Erreur mémoire (`RuntimeError`) ou blocage à 5 % sous DirectML (AMD/Intel)** :
  - Ouvrez **Choose MDX-Net Model → Edit Model Config** (ou éditez le `.yaml` dans `models\MDX_Net_Models\model_data\mdx_c_configs\`) et réduisez `chunk_size` (vérifiez que **Segment Default** est coché dans les options MDX avancées) :
    - `352800` (8s) - valeur par défaut ; maximum conseillé sur GPU AMD/Intel 8 Go.
    - `220500` (5s) ou `200655` (4,5s) - sûr pour les cartes 4–6 Go VRAM.
    - `112455` (2,55s) - minimum sûr si les plantages persistent.
  - Sur NVIDIA 2–4 Go VRAM, réglez **CUDA Sysmem Fallback Policy** sur **Prefer Sysmem Fallback** dans le Panneau de configuration NVIDIA.
- **Roformer absent dans Ensemble / Vocal Splitter** : ouvrez son `.yaml` et renommez les pistes `other` / `vocals` / `Karaoke` en **`Instrumental`** et **`Vocals`** (respectez les majuscules).
- **Le PC fige pendant la séparation** : passez la priorité d'UVR sur **Basse (Idle)** dans le Gestionnaire des tâches Windows.
