---
label: "Aperçu et prérequis"
icon: ":book:"
order: 99
permalink: /non-rvc/uvr5/overview/
---
# Ultimate Vocal Remover (UVR5)

[GitHub](https://github.com/Anjok07/ultimatevocalremovergui) · [Releases officielles](https://github.com/Anjok07/ultimatevocalremovergui/releases) · [Patchs Beta Roformer](https://github.com/TRvlvr/model_repo/releases/tag/uvr_update_patches)

**UVR5** (Ultimate Vocal Remover v5 GUI) est une application bureautique gratuite et open-source de **séparation de sources audio par IA**. Elle fonctionne localement sur votre PC et permet de séparer chansons ou dialogues en voix propre, instrumental, chœurs, pistes séparées (batterie, basse, autres) et de supprimer réverbération, écho et bruit de fond - l'un des outils les plus populaires pour préparer des datasets RVC et des covers.

## Architectures IA prises en charge

- **VR Architecture** (`v4`, `v5`, `v5.1`) : modèles rapides et fiables pour voix, karaoké (voix principale vs chœurs), de-echo, de-reverb et débruitage.
- **MDX-Net** (`v2`, `MDX23C`, ainsi que **BS-Roformer**, **Mel-Roformer**, **SCNet** et **Bandit** dans les patchs bêta Roformer) : architectures de pointe regroupées dans le menu MDX-Net de UVR5.
- **Demucs** (`v1`–`v4`, tels que `htdemucs` et `htdemucs_ft`) : modèles multi-pistes de Meta (4 stems : voix, batterie, basse, autres ; ou 6 stems), parfaits pour isoler des instruments ou créer des ensembles.
- **Outils audio intégrés** : **Manual Ensemble** (combine les sorties de plusieurs modèles par Min/Max Spec ou Average), **Ensemble Mode**, **Vocal Splitter**, **Demudder** (patch Windows #14+) et upscaler audio **Apollo**.

## Configuration requise et support GPU

| Plateforme | Prérequis et notes d'accélération |
| --- | --- |
| **Windows 10/11 (64 bits)** | **Doit être installé sur le lecteur `C:\`** (un autre disque peut causer de l'instabilité). Les CPU Intel Pentium et Celeron ne sont pas garantis. |
| **GPU NVIDIA (CUDA)** | Maxwell (série GTX 900, compute 5.0) ou plus récent. GTX 600 / GT 700 et antérieurs ne sont pas supportés en CUDA. **6 Go+ VRAM** (ex. RTX 3050 6–8 Go ou mieux) recommandés pour les Roformers ; 2–4 Go fonctionnent en réduisant `chunk_size` / `dim_t`. La série **RTX 5000** nécessite le patch dédié CUDA 12.8. |
| **GPU AMD et Intel (DirectML)** | Utilise **DirectML** (appelé *OpenCL* dans les anciennes versions v5.6.0). Testé sur AMD RX 4 Go+ (RX 6600 XT / 7600+ conseillées pour Roformers) et Intel Arc / iGPU Xe. **16 Go VRAM** recommandés pour conserver le `chunk_size` par défaut (sinon baissez-le). *Note : Apollo, Bandit et SCNet basculent sur CPU avec DirectML.* |
| **macOS** | macOS Big Sur ou plus récent (Catalina ou antérieur non garanti). L'accélération Apple Silicon (**MPS**) fonctionne pour Demucs, MDX-Net et Roformers. Placez UVR directement dans `/Applications`. |
| **Linux** | Branche native `v5.6.0_roformer_add+directml`, ou exécution de l'installateur Windows via **Bottles** (profil WINE Gaming dans `drive_c`) pour profiter des patchs récents avec GPU. |
