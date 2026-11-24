# Modèles de base Pretrained RVC

Un **modèle de base pretrained** (ou **pretrain**) est une paire de points de contrôle de départ : un **Générateur (`G_*.pth`)** et un **Discriminateur (`D_*.pth`)**, déjà entraînés sur des centaines d'heures d'audio multi-locuteurs. Lorsque vous entraînez une nouvelle voix RVC, l'entraînement ne part pas de zéro, mais effectue un **fine-tuning** de cette paire sur le dataset de votre voix cible.

## Ce que font les pretrained et pourquoi ils existent

Partir d'un pretrain permet à RVC d'apprendre une voix en quelques minutes ou heures plutôt qu'en plusieurs semaines :

1. **Le Générateur (`G`)** sait déjà transformer les features de contenu et la hauteur en parole ou en chant naturel.
2. **Le Discriminateur (`D`)** sait déjà distinguer un audio réaliste d'un audio artificiel.
3. **Votre entraînement** adapte ces poids existants à votre voix cible.

Chaque paire pretrained est liée à des paramètres architecturaux précis qui **doivent correspondre exactement à votre entraînement** :
- **Fréquence d'échantillonnage** (`32 kHz`, `40 kHz`, `44.1 kHz` ou `48 kHz`)
- **Architecture vocodeur** (`HiFi-GAN`, `RefineGAN` ou `MRF HiFi-GAN`)
- **Version RVC et guidage de hauteur** (la quasi-totalité des pretrains communautaires sont en RVC v2 avec F0)
- **Embedder attendu** (généralement `contentvec`, bien que certaines variantes exigent `spin-v2`)

Si un seul de ces réglages ne correspond pas, l'entraînement plantera immédiatement ou produira un son fortement déformé.

---

## Modèles pretrained RVC connus

> [!WARNING]
> **À titre purement informatif - utilisation fortement déconseillée**
>
> Toutes les informations ci-dessous concernant les modèles pretrained alternatifs sont fournies **à titre purement informatif**. **Nous recommandons fortement de NE PAS utiliser de pretrained alternatifs** : les **réglages stock de RVC** (pretrained RVC v2 HiFi-GAN par défaut) sont les meilleurs et les plus fiables. Les pretrains personnalisés peuvent facilement introduire des artefacts métalliques, de l'instabilité, du surapprentissage ou une mauvaise qualité de conversion hors ligne et en ligne (en direct).

| Pretrained | Sample rate(s) | Vocodeur | Embedder | Dépôt / Source |
| --- | --- | --- | --- | --- |
| **Stock RVC v2 (Par défaut)** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN | `contentvec` | **Recommandé (Stock RVC)** |
| **AnimePretrain** | `32 kHz` | HiFi-GAN | Non spécifié | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **BlackTone** *(Standard / Large)* | `32 kHz` | Non spécifié | Non spécifié | [SeoulStreamingStation/BlackTone_RVC_Pretrained](https://huggingface.co/SeoulStreamingStation/BlackTone_RVC_Pretrained) |
| **DMR v2** | `32 kHz` | HiFi-GAN | Non spécifié | [ourbz/DMR-V2-ReUpload](https://huggingface.co/ourbz/DMR-V2-ReUpload) |
| **GuideVocalPretrain** | `48 kHz` | HiFi-GAN | Non spécifié | [Essid/GuideVocalPretrain](https://huggingface.co/Essid/GuideVocalPretrain) |
| **IMA** | `32 kHz` | HiFi-GAN | Non spécifié | [Loren85/IMA-TEST-V1](https://huggingface.co/Loren85/IMA-TEST-V1) |
| **Itaila** | `32 kHz` | HiFi-GAN | `contentvec` | [TheStinger/itaila](https://huggingface.co/TheStinger/itaila) |
| **KLM - BeatzForge** *(V1 / V2)* | `32 kHz`, `48 kHz` | HiFi-GAN / Non spécifié | Non spécifié | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) |
| **KLM BeatMaster V1** | `48 kHz` | Non spécifié | Non spécifié | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) |
| **KLM 4 / 4.1 / 4.2 / 4.3** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN / Non spécifié | Non spécifié | [SeoulStreamingStation/KLM49_HFG](https://huggingface.co/SeoulStreamingStation/KLM49_HFG), [KLM4](https://huggingface.co/SeoulStreamingStation/KLM4), [KLM4.1](https://huggingface.co/SeoulStreamingStation/KLM4.1), [KLM4.2](https://huggingface.co/SeoulStreamingStation/KLM4.2), [KLM43](https://huggingface.co/SeoulStreamingStation/KLM43) |
| **KLM 4.4 (X1 / X2 / X2B)** | `32 kHz`, `40 kHz` | MRF HiFi-GAN / Non spécifié | Non spécifié | [SeoulStreamingStation/KLM4.4](https://huggingface.co/SeoulStreamingStation/KLM4.4) *(compatibilité variable)* |
| **KLM 5 RefineGAN** | `32 kHz`, `40 kHz` | RefineGAN | Non spécifié | [SeoulStreamingStation/KLM5](https://huggingface.co/SeoulStreamingStation/KLM5) |
| **KLM 6 Experimental (6.1 / 6.2 / Exp / Dev)** | `32 kHz`, `40 kHz`, `48 kHz` | Non spécifié | Non spécifié | [SeoulStreamingStation/KLM6_Experimental](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM 9 HFG** | `32 kHz` | HiFi-GAN | Non spécifié | [SeoulStreamingStation/RVC_KLM9_HFG_PretrainModel](https://huggingface.co/SeoulStreamingStation/RVC_KLM9_HFG_PretrainModel) |
| **KLM-HF Trainer** | `32 kHz`, `40 kHz`, `48 kHz` | Non spécifié | Non spécifié | [SeoulStreamingStation/KLM_RVC_KLM-HF_Trainer](https://huggingface.co/SeoulStreamingStation/KLM_RVC_KLM-HF_Trainer) |
| **KLM-X** | `32 kHz` | HiFi-GAN | Non spécifié | [SeoulStreamingStation/RVC_KLM-X-10_Pretrained-Model](https://huggingface.co/SeoulStreamingStation/RVC_KLM-X-10_Pretrained-Model) |
| **KLM KpopUniverse (I / II)** | `32 kHz`, `40 kHz`, `48 kHz` | Non spécifié | Non spécifié | [SeoulStreamingStation/KLM_KpopUniverse](https://huggingface.co/SeoulStreamingStation/KLM_KpopUniverse) |
| **Legacy Core V1.5** | `32 kHz` | HiFi-GAN | `contentvec` | [sxndypz/legacy-core-1.5](https://huggingface.co/sxndypz/legacy-core-1.5/tree/main) |
| **Legacy Core V1.5** | `40 kHz` | HiFi-GAN | `contentvec` | [sxndypz/legacy-core-1.5](https://huggingface.co/sxndypz/legacy-core-1.5/tree/main) |
| **Legacy Core V1.5v2** | `32 kHz` | HiFi-GAN | `contentvec` | [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) |
| **Legacy Core V1.6** | `32 kHz` | HiFi-GAN | `contentvec` | [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) |
| **Mandagues V2** | `40 kHz` | HiFi-GAN | `contentvec` | [juaow/mandaguesv2](https://huggingface.co/juaow/mandaguesv2) |
| **Nanashi Anime** *(Normal)* | `32 kHz` | HiFi-GAN | Non spécifié | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nanashi v1** *(v1.7)* | `32 kHz` | HiFi-GAN | Non spécifié | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nanashi v2 Beta** *(Base / Fine-tuned)* | `32 kHz` | HiFi-GAN | Non spécifié | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nezox** | `32 kHz` | HiFi-GAN | Non spécifié | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Ov2Super** | `32 kHz` | HiFi-GAN | `contentvec` | [poiqazwsx/Ov2Super32kfix](https://huggingface.co/poiqazwsx/Ov2Super32kfix) |
| **PaBP** | `32 kHz` | HiFi-GAN | Non spécifié | [Razer112/pabp-v.5](https://huggingface.co/Razer112/pabp-v.5) |
| **RefGanVCTKV2** | `32 kHz`, `40 kHz` | RefineGAN | `contentvec` | [SimplCup/RefGanVCTKV2](https://huggingface.co/SimplCup/RefGanVCTKV2) |
| **RefineGAN Base Pretrains (Exp v3)** | `32 kHz` | RefineGAN | `contentvec` / `spin-v2` | [Aznamir/RefineGAN](https://huggingface.co/Aznamir/RefineGAN) |
| **RefineGanVCTKV1** | `44.1 kHz` | RefineGAN | `contentvec` | [SimplCup/RefineGanVCTKV1](https://huggingface.co/SimplCup/RefineGanVCTKV1) |
| **Rigel** *(Base / Fine-tuned)* | `32 kHz` | Non spécifié | Non spécifié | [MUSTAR/Rigel-rvc-base-pretrained-model](https://huggingface.co/MUSTAR/Rigel-rvc-base-pretrained-model) |
| **RIN_E3** | `40 kHz` | HiFi-GAN | Non spécifié | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **SingerPreTrain** *(Updated)* | `32 kHz` | HiFi-GAN | `contentvec` | [Sztef/SingerPreTrained](https://huggingface.co/Sztef/SingerPreTrained) |
| **Snowie** | `40 kHz` | HiFi-GAN | Non spécifié | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie V2** | `40 kHz`, `48 kHz` | HiFi-GAN | Non spécifié | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie V3.1** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN | Non spécifié | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie × RIN** | `40 kHz` | HiFi-GAN | Non spécifié | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Titan** *(Medium)* | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN | `contentvec` | [blaise-tk/TITAN](https://huggingface.co/blaise-tk/TITAN) |
| **UKA** | `32 kHz` | HiFi-GAN | Non spécifié | [Plasmati/Pretrains](https://huggingface.co/Plasmati/Pretrains) |
| **UKR** | `32 kHz` | HiFi-GAN | Non spécifié | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **VocalCore** et **VocalCore Try3b** | `48 kHz` | HiFi-GAN | Non spécifié | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |

> **Note de compatibilité** : dans Ilaria RVC, l'entraînement RefineGAN est pris en charge spécifiquement à `32 kHz` avec RVC v2 et guidage F0. Choisir un pretrain RefineGAN `40 kHz` ou `44.1 kHz` tout en réglant l'entraînement sur `32 kHz` échouera ou produira un résultat inutilisable.

!!!note
**Note sur Legacy Core (`V1.5`, `V1.5v2` et `V1.6`) :**
- **Legacy Core V1.5** (`32 kHz`, `40 kHz`): [sxndypz/legacy-core-1.5](https://huggingface.co/sxndypz/legacy-core-1.5/tree/main). Disponible via la copie indiquée. La source originale `lyery/mode4` a été retirée du téléchargeur d’Ilaria RVC en version 2.4.4.
- **Legacy Core V1.5v2** et **Legacy Core V1.6** (`32 kHz`) sont de nouveau disponibles avec l'accord de l'auteur d'origine via [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) et ont été restaurés dans Ilaria RVC `2.4.7`.
- **Important pour Legacy Core V1.6** : dans le dépôt de reupload, les noms **G** et **D** sont **inversés** (`D_LegacyCoreOld.pth` est **G** et `G_LegacyCoreOld.pth` est **D**). Veillez à placer chaque fichier dans le bon emplacement.
!!!
