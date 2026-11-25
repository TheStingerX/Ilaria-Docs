# Modèles de base Pretrained RVC

> **[Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)** · Ajoute l’export ONNX pour les modèles RVC HiFi-GAN avec guidage de hauteur, la restauration exacte en `.pth` des ONNX créés par Ilaria RVC, un sélecteur de modèles installés et 49 entrées de préentraînement. Certaines sont proposées uniquement au téléchargement et assorties de notes de compatibilité.

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
| **Stock RVC v2 (Par défaut)** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | `contentvec` | **Recommandé (Stock RVC)** |
| **AnimePretrain** | `32 kHz` | `HiFi-GAN` | Non spécifié | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **BlackTone Standard** | `32 kHz` | Non spécifié | Non spécifié | [SeoulStreamingStation/BlackTone_RVC_Pretrained](https://huggingface.co/SeoulStreamingStation/BlackTone_RVC_Pretrained) |
| **BlackTone Large** | `32 kHz` | Non spécifié | `SPIN` | [SeoulStreamingStation/BlackTone_RVC_Pretrained](https://huggingface.co/SeoulStreamingStation/BlackTone_RVC_Pretrained) · [README](https://huggingface.co/SeoulStreamingStation/BlackTone_RVC_Pretrained/blob/main/ReadMe.md) |
| **DMR v2** | `32 kHz` | `HiFi-GAN` | Non spécifié | [ourbz/DMR-V2-ReUpload](https://huggingface.co/ourbz/DMR-V2-ReUpload) |
| **GuideVocalPretrain** | `48 kHz` | `HiFi-GAN` | Non spécifié | [Essid/GuideVocalPretrain](https://huggingface.co/Essid/GuideVocalPretrain) |
| **IMA** | `32 kHz` | `HiFi-GAN` | Non spécifié | [Loren85/IMA-TEST-V1](https://huggingface.co/Loren85/IMA-TEST-V1) |
| **Itaila** | `32 kHz` | `HiFi-GAN` | `contentvec` | [TheStinger/itaila](https://huggingface.co/TheStinger/itaila) |
| **Legacy Core V1.5** | `32 kHz` | `HiFi-GAN` | `contentvec` | [sxndypz/legacy-core-1.5](https://huggingface.co/sxndypz/legacy-core-1.5/tree/main) |
| **Legacy Core V1.5** | `40 kHz` | `HiFi-GAN` | `contentvec` | [sxndypz/legacy-core-1.5](https://huggingface.co/sxndypz/legacy-core-1.5/tree/main) |
| **Legacy Core V1.5v2** | `32 kHz` | `HiFi-GAN` | `contentvec` | [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) |
| **Legacy Core V1.6** | `32 kHz` | `HiFi-GAN` | `contentvec` | [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) |
| **Mandagues V2** | `40 kHz` | `HiFi-GAN` | `contentvec` | [juaow/mandaguesv2](https://huggingface.co/juaow/mandaguesv2) |
| **Nanashi Anime v1** | `32 kHz` | `HiFi-GAN` | `Japanese HuBERT` | [v1_anime](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1_anime) · [AI Hub](https://discord.com/channels/1159260121998827560/1235952130855010365) |
| **Nanashi v1** *(v1.7)* | `32 kHz` | `HiFi-GAN` | Non spécifié | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nanashi v2 Beta** *(Base / Fine-tuned)* | `32 kHz` | `HiFi-GAN` | Non spécifié | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nezox** | `32 kHz` | `HiFi-GAN` | Non spécifié | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Ov2Super** | `32 kHz` | `HiFi-GAN` | `contentvec` | [poiqazwsx/Ov2Super32kfix](https://huggingface.co/poiqazwsx/Ov2Super32kfix) |
| **PaBP** | `32 kHz` | `HiFi-GAN` | Non spécifié | [Razer112/pabp-v.5](https://huggingface.co/Razer112/pabp-v.5) |
| **RefGanVCTKV2** | `32 kHz`, `40 kHz` | `RefineGAN` | `contentvec` | [SimplCup/RefGanVCTKV2](https://huggingface.co/SimplCup/RefGanVCTKV2) |
| **RefineGAN Base Pretrains (Exp v3)** | `32 kHz` | `RefineGAN` | `contentvec` / `spin-v2` | [Aznamir/RefineGAN](https://huggingface.co/Aznamir/RefineGAN) |
| **RefineGanVCTKV1** | `44.1 kHz` | `RefineGAN` | `contentvec` | [SimplCup/RefineGanVCTKV1](https://huggingface.co/SimplCup/RefineGanVCTKV1) |
| **Rigel** *(Base / Fine-tuned)* | `32 kHz`, `40 kHz` | `HiFi-GAN` | Non spécifié | [MUSTAR/Rigel-rvc-base-pretrained-model](https://huggingface.co/MUSTAR/Rigel-rvc-base-pretrained-model) · [Politrees](https://huggingface.co/Politrees/RVC_resources) |
| **RIN_E3** | `40 kHz` | `HiFi-GAN` | Non spécifié | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **SingerPreTrain** *(Updated)* | `32 kHz` | `HiFi-GAN` | `contentvec` | [Sztef/SingerPreTrained](https://huggingface.co/Sztef/SingerPreTrained) |
| **Snowie** | `40 kHz` | `HiFi-GAN` | Non spécifié | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie V2** | `40 kHz`, `48 kHz` | `HiFi-GAN` | Non spécifié | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie V3.1** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | Non spécifié | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie × RIN** | `40 kHz` | `HiFi-GAN` | Non spécifié | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Titan** *(Medium)* | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | `contentvec` | [blaise-tk/TITAN](https://huggingface.co/blaise-tk/TITAN) |
| **UKA** | `32 kHz` | `HiFi-GAN` | Non spécifié | [Plasmati/Pretrains](https://huggingface.co/Plasmati/Pretrains) |
| **UKR** | `32 kHz` | `HiFi-GAN` | Non spécifié | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **VocalCore** et **VocalCore Try3b** | `48 kHz` | `HiFi-GAN` | Non spécifié | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · RefineGAN prend en charge l’entraînement et l’inférence à 32, 40 et 44,1 kHz avec RVC v2 et Pitch Guidance. L’application génère automatiquement l’audio silencieux à 44,1 kHz. Choisissez **None** pour entraîner à partir de zéro si les poids utilisent une autre architecture, comme pour les paires testées KLM 5 (40 kHz) et VCTK (44,1 kHz).

!!!note
**Note sur Legacy Core (`V1.5`, `V1.5v2` et `V1.6`) :**
- **Legacy Core V1.5** (`32 kHz`, `40 kHz`): [sxndypz/legacy-core-1.5](https://huggingface.co/sxndypz/legacy-core-1.5/tree/main).
- **Legacy Core V1.5v2** et **Legacy Core V1.6** (`32 kHz`) sont de nouveau disponibles avec l'accord de l'auteur d'origine via [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) et ont été restaurés dans Ilaria RVC `2.4.7`.
- **Ilaria RVC 2.4.8** ajoute Legacy Core V1.5 à 32 et 40 kHz au téléchargeur. Les quatre options Legacy Core utilisent `HiFi-GAN` + `ContentVec`. [Notes de version](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.4.8)
!!!

## Paires préentraînées supplémentaires

| Modèle | Fréquences d’échantillonnage | Vocodeur | Embedder | Source |
| --- | --- | --- | --- | --- |
| **Stock RVC v1 · F0** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN NSF` | `HuBERT Base · 256` | [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main/pretrained) |
| **Stock RVC v1 · No F0** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | `HuBERT Base · 256` | [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main/pretrained) |
| **Stock RVC v2 · No F0** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | `HuBERT Base · 768` | [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main/pretrained_v2) |
| **Aurora v2** | `48 kHz` | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/48k/Aurora) |
| **Sench Pretrain** | `48 kHz` | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/Shashashasha/Sench_Pretrain_48k_RVC) |
| **RingFormer v1** | `40 kHz` | `RingFormer` | `SPIN v2` | [Hugging Face](https://huggingface.co/its5Q/rvc-ringformer-pretrain) |
| **Applio RefineGAN (DMS)** | `24 kHz`, `32 kHz` | `RefineGAN` | Non confirmé | [Hugging Face](https://huggingface.co/DanielMarius/dms-applio-refinegan-pretrained) |
| **DMR v0.5 / v0.8 / v1** | `32 kHz` | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/DMR) |
| **Nanashi v1** | `32 kHz` | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1) |
| **Nanashi v1.5** | `32 kHz` | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1.5) |
| **Nanashi v1.5 Rigel** | `32 kHz` | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1.5_Rigel_Version) |
| **Nanashi Anime Normal** | `32 kHz` | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1_anime/normal) |
| **Nanashi Anime Resized** | `32 kHz` | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1_anime/resized) |
| **SingerPreTrain v1** | `32 kHz` | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/Singer) |
| **Snowie v3.1 · Japanese HuBERT** | Non confirmé | Non confirmé | `Japanese HuBERT` | [Hugging Face](https://huggingface.co/MUSTAR/Snowie_V3.1_pretrain_on_JPhubert) |
| **Snowie RuPretrain · No F0** | `40 kHz` | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/MUSTAR/Snowie_RuPretrain_noP_40k) |
| **Snowie v3 × RIN E3** | `40 kHz` | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/MUSTAR/SnowieV3-X-RINE3-40K) |
| **Ov2Super · F0** | `40 kHz` | `HiFi-GAN` | Non confirmé | [Hugging Face](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/40k/Ov2) |

## Variantes KLM

| Modèle | Fréquences d’échantillonnage | Vocodeur | Embedder | Source |
| --- | --- | --- | --- | --- |
| **KLM 4.0** | `32 kHz`, `40 kHz`, `48 kHz` | Non confirmé | Non confirmé | [32 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/KLM) · [40 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/40k/KLM) · [48 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/48k/KLM) |
| **KLM 4.1** | `32 kHz`, `48 kHz` | Non confirmé | Non confirmé | [32 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/KLM) · [48 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/48k/KLM) |
| **KLM 4.1 T2** | `32 kHz` | Non confirmé | Non confirmé | [32 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/KLM) |
| **KLM 4.2 T1** | `32 kHz`, `40 kHz` | Non confirmé | Non confirmé | [32 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/KLM) · [40 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/40k/KLM) |
| **KLM 4.2 T2 / T3 / T4** | `40 kHz` | Non confirmé | Non confirmé | [40 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/40k/KLM) |
| **KLM 4.2 X10** | `32 kHz` | Non confirmé | Non confirmé | [32 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/KLM) |
| **KLM 4.3 X1 / X2** | `32 kHz` | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM43) |
| **KLM 4.3 X3 / X4** | `32 kHz`, `40 kHz`, `48 kHz` | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM43) |
| **KLM 4.4 X1 / X2 / X2B** | `32 kHz` | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM4.4) |
| **KLM 4.4 X1 MRF / X2 MRF** | `40 kHz` | `MRF HiFi-GAN` | Non confirmé | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM4.4) |
| **KLM 6 Experimental 1** | `32 kHz`, `48 kHz` | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM 6 Experimental 2** | `32 kHz`, `40 kHz` | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM 6 Experimental 3 L6** | `32 kHz` | `HiFi-GAN` | `SPIN (7–12)` | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM 6.1 Dev / Dev Ranger25** | `48 kHz` | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM-X1 / KLM-HF Mini T** | `32 kHz` | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM_RVC_KLM-HF_Trainer) |
| **KLM RVC PT / RVC OG** | `32 kHz`, `40 kHz`, `48 kHz` | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM_RVC_KLM-HF_Trainer) |
| **KLM 9 HFG** | `32 kHz` | `HiFi-GAN` | Non confirmé | [Hugging Face](https://huggingface.co/SeoulStreamingStation/RVC_KLM9_HFG_PretrainModel) |
| **KLM X 10.0** | `32 kHz` | `HiFi-GAN` | Non confirmé | [Hugging Face](https://huggingface.co/SeoulStreamingStation/RVC_KLM-X-10_Pretrained-Model) |
| **KLM - BeatzForge V2** | `32 kHz` | Non spécifié | Non spécifié | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) · [AI Hub](https://discord.com/channels/1159260121998827560/1235952130855010365) |
| **KLM - BeatzForge V1** | `48 kHz` | `HiFi-GAN` | Non spécifié | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) |
| **KLM BeatMaster V1** | `48 kHz` | Non spécifié | Non spécifié | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) |
| **KLM 4 HiFi-GAN** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | Non spécifié | [SeoulStreamingStation/KLM49_HFG](https://huggingface.co/SeoulStreamingStation/KLM49_HFG) · [AI Hub](https://discord.com/channels/1159260121998827560/1235952130855010365) |
| **KLM 5 RefineGAN** | `32 kHz`, `40 kHz` | `RefineGAN` | Non spécifié | [SeoulStreamingStation/KLM5](https://huggingface.co/SeoulStreamingStation/KLM5) |
| **KLM KpopUniverse (I / II)** | `32 kHz`, `40 kHz`, `48 kHz` | Non spécifié | Non spécifié | [SeoulStreamingStation/KLM_KpopUniverse](https://huggingface.co/SeoulStreamingStation/KLM_KpopUniverse) |

## Paires Convbased Studio

| Modèle | Fréquences d’échantillonnage | Vocodeur | Embedder | Source |
| --- | --- | --- | --- | --- |
| **Convbased HiFi-GAN NSF · ContentVec** | `48 kHz` | `HiFi-GAN NSF` | `ContentVec` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/contentvec/HiFiGAN/476sid) |
| **Convbased SiFi-GAN · ContentVec** | `48 kHz` | `SiFi-GAN` | `ContentVec` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/contentvec/SiFiGAN) |
| **Convbased BigVGAN · ContentVec** | `40 kHz` | `BigVGAN` | `ContentVec` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/contentvec/BigVGAN) |
| **Convbased HiFi-GAN NSF · SPIN** | `48 kHz` | `HiFi-GAN NSF` | `SPIN` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/spin/HiFiGAN) |
| **Convbased SiFi-GAN · SPIN** | `48 kHz` | `SiFi-GAN` | `SPIN` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/spin/SiFiGAN) |
| **Convbased BigVGAN · SPIN v2** | `40 kHz` | `BigVGAN` | `SPIN v2` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/spin-v2/BigVGAN) |
| **Convbased HiFi-GAN NSF · Chinese HuBERT Base** | `48 kHz` | `HiFi-GAN NSF` | `Chinese HuBERT Base` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/chinese-hubert-base/HiFiGAN) |

## Fichiers expérimentaux et archives

| Modèle | Fréquences d’échantillonnage | Vocodeur | Embedder | Source |
| --- | --- | --- | --- | --- |
| **7subpretrain** | `40 kHz` | Non confirmé | Non confirmé | [Hugging Face · ZIP](https://huggingface.co/makiligon/rvc-sub-pretrain-moment/blob/main/7subpretrain40k.zip) |
| **Genshin EN Pretrain** | `32 kHz`, `40 kHz` | Non confirmé | Non confirmé | [Hugging Face · 32 kHz ZIP](https://huggingface.co/makiligon/rvc-sub-pretrain-moment/blob/main/GenshinENPretrain32K.zip) · [Hugging Face · 40 kHz ZIP](https://huggingface.co/makiligon/rvc-sub-pretrain-moment/blob/main/GenshinENPretrain40K.zip) |
| **SingingPretrain** | Non confirmé | Non confirmé | Non confirmé | [Hugging Face · ZIP](https://huggingface.co/makiligon/rvc-sub-pretrain-moment/blob/main/SingingPretrain.zip) |
| **DeepFake Audio Rangers Pretrain** | Non confirmé | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/DeepFake-Audio-Rangers/rvc_pretrain) |
| **RVC v2 Pretrain Voice** | Non confirmé | Non confirmé | Non confirmé | [Hugging Face](https://huggingface.co/Coolwowsocoolwow/RVC_V2_Pretrain_Voice) |
| **RingFormer v2 · failed** | `40 kHz` | `RingFormer v2` | `SPIN v2` | [Hugging Face](https://huggingface.co/its5Q/rvc-ringformer-v2-pretrain/tree/main/failed) |

La liste confirme la disponibilité. Respectez l’architecture, le mode de hauteur et l’encodeur de chaque paire. La provenance et la licence du RefineGAN DMS restent à vérifier. KLM X 10.0 exige KLM Trainer 0.5.0 et indique CC BY-NC 2.0. Le contenu des ZIP et les droits des données restent à vérifier. RingFormer v2 provient du dossier des checkpoints échoués.
