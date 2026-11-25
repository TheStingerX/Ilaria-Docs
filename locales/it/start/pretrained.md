---
label: "🧱 Modelli pretrained"
order: 90
permalink: /pretrained/
description: "Un modello pretrained di base (o pretrain) è una coppia di checkpoint iniziali: un Generatore (G_.pth) e un Discriminatore (D_.pth), già addestrati su centinaia di ore di audio multi-parlante."
---
# Modelli Pretrained di RVC

Un **modello pretrained di base** (o **pretrain**) è una coppia di checkpoint iniziali: un **Generatore (`G_*.pth`)** e un **Discriminatore (`D_*.pth`)**, già addestrati su centinaia di ore di audio multi-parlante. Quando addestri una nuova voce RVC, il training non parte da zero, ma esegue un **fine-tuning** di questa coppia sul dataset della tua voce target.

## Cosa fanno i pretrained e a cosa servono

Partire da un pretrained permette a RVC di imparare una nuova voce in minuti o ore anziché settimane:

1. **Il Generatore (`G`)** sa già come trasformare le feature di contenuto e il pitch in parlato o canto naturale.
2. **Il Discriminatore (`D`)** sa già distinguere l'audio realistico da quello artificiale.
3. **Il tuo addestramento** adatta questi pesi esistenti alla voce target.

Ogni coppia pretrained è vincolata a parametri precisi che **devono coincidere esattamente con il tuo training**:
- **Sample rate** (`32 kHz`, `40 kHz`, `44.1 kHz` o `48 kHz`)
- **Architettura vocoder** (`HiFi-GAN`, `RefineGAN` o `MRF HiFi-GAN`)
- **Versione RVC e pitch guidance** (quasi tutti i pretrain della community sono RVC v2 con pitch F0)
- **Embedder atteso** (di solito `contentvec`, anche se alcune varianti richiedono `spin-v2`)

Se anche uno solo di questi parametri non coincide, il training si bloccherà subito oppure produrrà audio pesantemente distorto.

---

## Modelli pretrained RVC conosciuti

> [!WARNING]
> **Solo a scopo informativo - uso fortemente sconsigliato**
>
> Tutto ciò che è elencato qui sotto riguardo ai modelli pretrained alternativi è **esclusivamente a scopo informativo**. **È fortemente consigliato il NON utilizzo di pretrained alternativi**: i **settaggi stock di RVC** (pretrained RVC v2 HiFi-GAN predefinito) sono i migliori e i più affidabili. I pretrained personalizzati possono facilmente causare artefatti metallici, instabilità, overfitting o una pessima conversione sia offline che online (in tempo reale).

| Pretrained | Sample rate | Vocoder | Embedder | Repository / Fonte |
| --- | --- | --- | --- | --- |
| **Stock RVC v2 (Predefinito)** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | `contentvec` | **Consigliato (Stock RVC)** |
| **AnimePretrain** | `32 kHz` | `HiFi-GAN` | Non specificato | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **BlackTone Standard** | `32 kHz` | Non specificato | Non specificato | [SeoulStreamingStation/BlackTone_RVC_Pretrained](https://huggingface.co/SeoulStreamingStation/BlackTone_RVC_Pretrained) |
| **BlackTone Large** | `32 kHz` | Non specificato | `SPIN` | [SeoulStreamingStation/BlackTone_RVC_Pretrained](https://huggingface.co/SeoulStreamingStation/BlackTone_RVC_Pretrained) · [README](https://huggingface.co/SeoulStreamingStation/BlackTone_RVC_Pretrained/blob/main/ReadMe.md) |
| **DMR v2** | `32 kHz` | `HiFi-GAN` | Non specificato | [ourbz/DMR-V2-ReUpload](https://huggingface.co/ourbz/DMR-V2-ReUpload) |
| **GuideVocalPretrain** | `48 kHz` | `HiFi-GAN` | Non specificato | [Essid/GuideVocalPretrain](https://huggingface.co/Essid/GuideVocalPretrain) |
| **IMA** | `32 kHz` | `HiFi-GAN` | Non specificato | [Loren85/IMA-TEST-V1](https://huggingface.co/Loren85/IMA-TEST-V1) |
| **Itaila** | `32 kHz` | `HiFi-GAN` | `contentvec` | [TheStinger/itaila](https://huggingface.co/TheStinger/itaila) |
| **KLM - BeatzForge V2** | `32 kHz` | Non specificato | Non specificato | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) · [AI Hub](https://discord.com/channels/1159260121998827560/1235952130855010365) |
| **KLM - BeatzForge V1** | `48 kHz` | `HiFi-GAN` | Non specificato | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) |
| **KLM BeatMaster V1** | `48 kHz` | Non specificato | Non specificato | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) |
| **KLM 4 HiFi-GAN** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | Non specificato | [SeoulStreamingStation/KLM49_HFG](https://huggingface.co/SeoulStreamingStation/KLM49_HFG) · [AI Hub](https://discord.com/channels/1159260121998827560/1235952130855010365) |
| **KLM 5 RefineGAN** | `32 kHz`, `40 kHz` | `RefineGAN` | Non specificato | [SeoulStreamingStation/KLM5](https://huggingface.co/SeoulStreamingStation/KLM5) |
| **KLM KpopUniverse (I / II)** | `32 kHz`, `40 kHz`, `48 kHz` | Non specificato | Non specificato | [SeoulStreamingStation/KLM_KpopUniverse](https://huggingface.co/SeoulStreamingStation/KLM_KpopUniverse) |
| **Legacy Core V1.5** | `32 kHz` | `HiFi-GAN` | `contentvec` | [sxndypz/legacy-core-1.5](https://huggingface.co/sxndypz/legacy-core-1.5/tree/main) |
| **Legacy Core V1.5** | `40 kHz` | `HiFi-GAN` | `contentvec` | [sxndypz/legacy-core-1.5](https://huggingface.co/sxndypz/legacy-core-1.5/tree/main) |
| **Legacy Core V1.5v2** | `32 kHz` | `HiFi-GAN` | `contentvec` | [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) |
| **Legacy Core V1.6** | `32 kHz` | `HiFi-GAN` | `contentvec` | [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) |
| **Mandagues V2** | `40 kHz` | `HiFi-GAN` | `contentvec` | [juaow/mandaguesv2](https://huggingface.co/juaow/mandaguesv2) |
| **Nanashi Anime v1** | `32 kHz` | `HiFi-GAN` | `Japanese HuBERT` | [v1_anime](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1_anime) · [AI Hub](https://discord.com/channels/1159260121998827560/1235952130855010365) |
| **Nanashi v1** *(v1.7)* | `32 kHz` | `HiFi-GAN` | Non specificato | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nanashi v2 Beta** *(Base / Fine-tuned)* | `32 kHz` | `HiFi-GAN` | Non specificato | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nezox** | `32 kHz` | `HiFi-GAN` | Non specificato | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Ov2Super** | `32 kHz` | `HiFi-GAN` | `contentvec` | [poiqazwsx/Ov2Super32kfix](https://huggingface.co/poiqazwsx/Ov2Super32kfix) |
| **PaBP** | `32 kHz` | `HiFi-GAN` | Non specificato | [Razer112/pabp-v.5](https://huggingface.co/Razer112/pabp-v.5) |
| **RefGanVCTKV2** | `32 kHz`, `40 kHz` | `RefineGAN` | `contentvec` | [SimplCup/RefGanVCTKV2](https://huggingface.co/SimplCup/RefGanVCTKV2) |
| **RefineGAN Base Pretrains (Exp v3)** | `32 kHz` | `RefineGAN` | `contentvec` / `spin-v2` | [Aznamir/RefineGAN](https://huggingface.co/Aznamir/RefineGAN) |
| **RefineGanVCTKV1** | `44.1 kHz` | `RefineGAN` | `contentvec` | [SimplCup/RefineGanVCTKV1](https://huggingface.co/SimplCup/RefineGanVCTKV1) |
| **Rigel** *(Base / Fine-tuned)* | `32 kHz`, `40 kHz` | `HiFi-GAN` | Non specificato | [MUSTAR/Rigel-rvc-base-pretrained-model](https://huggingface.co/MUSTAR/Rigel-rvc-base-pretrained-model) · [Politrees](https://huggingface.co/Politrees/RVC_resources) |
| **RIN_E3** | `40 kHz` | `HiFi-GAN` | Non specificato | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **SingerPreTrain** *(Updated)* | `32 kHz` | `HiFi-GAN` | `contentvec` | [Sztef/SingerPreTrained](https://huggingface.co/Sztef/SingerPreTrained) |
| **Snowie** | `40 kHz` | `HiFi-GAN` | Non specificato | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie V2** | `40 kHz`, `48 kHz` | `HiFi-GAN` | Non specificato | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie V3.1** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | Non specificato | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie × RIN** | `40 kHz` | `HiFi-GAN` | Non specificato | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Titan** *(Medium)* | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | `contentvec` | [blaise-tk/TITAN](https://huggingface.co/blaise-tk/TITAN) |
| **UKA** | `32 kHz` | `HiFi-GAN` | Non specificato | [Plasmati/Pretrains](https://huggingface.co/Plasmati/Pretrains) |
| **UKR** | `32 kHz` | `HiFi-GAN` | Non specificato | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **VocalCore** e **VocalCore Try3b** | `48 kHz` | `HiFi-GAN` | Non specificato | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · RefineGAN supporta training e inferenza a 32, 40 e 44,1 kHz con RVC v2 e Pitch Guidance. L’app genera in automatico la traccia silenziosa a 44,1 kHz. Se i pesi preaddestrati usano un’architettura diversa, seleziona **None** per addestrare da zero. Tra le coppie provate ci sono KLM 5 (40 kHz) e VCTK (44,1 kHz).


!!!note
**Nota sui Legacy Core (`V1.5`, `V1.5v2` e `V1.6`):**
- **Legacy Core V1.5** (`32 kHz`, `40 kHz`): [sxndypz/legacy-core-1.5](https://huggingface.co/sxndypz/legacy-core-1.5/tree/main).
- **Legacy Core V1.5v2** e **Legacy Core V1.6** (`32 kHz`) sono nuovamente disponibili con il consenso dell'autore originale tramite [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) e sono stati ripristinati in Ilaria RVC `2.4.7`.
- **Ilaria RVC 2.4.8** aggiunge al downloader Legacy Core V1.5 a 32 e 40 kHz. Tutte e quattro le opzioni Legacy Core usano `HiFi-GAN` + `ContentVec`. [Note di rilascio](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.4.8)
!!!

## Altre coppie di pretrain

| Modello | Frequenze di campionamento | Vocoder | Embedder | Fonte |
| --- | --- | --- | --- | --- |
| **Stock RVC v1 · F0** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN NSF` | `HuBERT Base · 256` | [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main/pretrained) |
| **Stock RVC v1 · No F0** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | `HuBERT Base · 256` | [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main/pretrained) |
| **Stock RVC v2 · No F0** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | `HuBERT Base · 768` | [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main/pretrained_v2) |
| **Aurora v2** | `48 kHz` | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/48k/Aurora) |
| **Sench Pretrain** | `48 kHz` | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/Shashashasha/Sench_Pretrain_48k_RVC) |
| **RingFormer v1** | `40 kHz` | `RingFormer` | `SPIN v2` | [Hugging Face](https://huggingface.co/its5Q/rvc-ringformer-pretrain) |
| **Applio RefineGAN (DMS)** | `24 kHz`, `32 kHz` | `RefineGAN` | Non confermato | [Hugging Face](https://huggingface.co/DanielMarius/dms-applio-refinegan-pretrained) |
| **DMR v0.5 / v0.8 / v1** | `32 kHz` | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/DMR) |
| **Nanashi v1** | `32 kHz` | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1) |
| **Nanashi v1.5** | `32 kHz` | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1.5) |
| **Nanashi v1.5 Rigel** | `32 kHz` | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1.5_Rigel_Version) |
| **Nanashi Anime Normal** | `32 kHz` | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1_anime/normal) |
| **Nanashi Anime Resized** | `32 kHz` | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1_anime/resized) |
| **SingerPreTrain v1** | `32 kHz` | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/Singer) |
| **Snowie v3.1 · Japanese HuBERT** | Non confermato | Non confermato | `Japanese HuBERT` | [Hugging Face](https://huggingface.co/MUSTAR/Snowie_V3.1_pretrain_on_JPhubert) |
| **Snowie RuPretrain · No F0** | `40 kHz` | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/MUSTAR/Snowie_RuPretrain_noP_40k) |
| **Snowie v3 × RIN E3** | `40 kHz` | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/MUSTAR/SnowieV3-X-RINE3-40K) |
| **Ov2Super · F0** | `40 kHz` | `HiFi-GAN` | Non confermato | [Hugging Face](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/40k/Ov2) |

## Varianti KLM

| Modello | Frequenze di campionamento | Vocoder | Embedder | Fonte |
| --- | --- | --- | --- | --- |
| **KLM 4.0** | `32 kHz`, `40 kHz`, `48 kHz` | Non confermato | Non confermato | [32 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/KLM) · [40 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/40k/KLM) · [48 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/48k/KLM) |
| **KLM 4.1** | `32 kHz`, `48 kHz` | Non confermato | Non confermato | [32 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/KLM) · [48 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/48k/KLM) |
| **KLM 4.1 T2** | `32 kHz` | Non confermato | Non confermato | [32 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/KLM) |
| **KLM 4.2 T1** | `32 kHz`, `40 kHz` | Non confermato | Non confermato | [32 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/KLM) · [40 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/40k/KLM) |
| **KLM 4.2 T2 / T3 / T4** | `40 kHz` | Non confermato | Non confermato | [40 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/40k/KLM) |
| **KLM 4.2 X10** | `32 kHz` | Non confermato | Non confermato | [32 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/KLM) |
| **KLM 4.3 X1 / X2** | `32 kHz` | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM43) |
| **KLM 4.3 X3 / X4** | `32 kHz`, `40 kHz`, `48 kHz` | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM43) |
| **KLM 4.4 X1 / X2 / X2B** | `32 kHz` | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM4.4) |
| **KLM 4.4 X1 MRF / X2 MRF** | `40 kHz` | `MRF HiFi-GAN` | Non confermato | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM4.4) |
| **KLM 6 Experimental 1** | `32 kHz`, `48 kHz` | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM 6 Experimental 2** | `32 kHz`, `40 kHz` | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM 6 Experimental 3 L6** | `32 kHz` | `HiFi-GAN` | `SPIN (7–12)` | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM 6.1 Dev / Dev Ranger25** | `48 kHz` | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM-X1 / KLM-HF Mini T** | `32 kHz` | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM_RVC_KLM-HF_Trainer) |
| **KLM RVC PT / RVC OG** | `32 kHz`, `40 kHz`, `48 kHz` | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM_RVC_KLM-HF_Trainer) |
| **KLM 9 HFG** | `32 kHz` | `HiFi-GAN` | Non confermato | [Hugging Face](https://huggingface.co/SeoulStreamingStation/RVC_KLM9_HFG_PretrainModel) |
| **KLM X 10.0** | `32 kHz` | `HiFi-GAN` | Non confermato | [Hugging Face](https://huggingface.co/SeoulStreamingStation/RVC_KLM-X-10_Pretrained-Model) |

## Coppie di Convbased Studio

| Modello | Frequenze di campionamento | Vocoder | Embedder | Fonte |
| --- | --- | --- | --- | --- |
| **Convbased HiFi-GAN NSF · ContentVec** | `48 kHz` | `HiFi-GAN NSF` | `ContentVec` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/contentvec/HiFiGAN/476sid) |
| **Convbased SiFi-GAN · ContentVec** | `48 kHz` | `SiFi-GAN` | `ContentVec` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/contentvec/SiFiGAN) |
| **Convbased BigVGAN · ContentVec** | `40 kHz` | `BigVGAN` | `ContentVec` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/contentvec/BigVGAN) |
| **Convbased HiFi-GAN NSF · SPIN** | `48 kHz` | `HiFi-GAN NSF` | `SPIN` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/spin/HiFiGAN) |
| **Convbased SiFi-GAN · SPIN** | `48 kHz` | `SiFi-GAN` | `SPIN` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/spin/SiFiGAN) |
| **Convbased BigVGAN · SPIN v2** | `40 kHz` | `BigVGAN` | `SPIN v2` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/spin-v2/BigVGAN) |
| **Convbased HiFi-GAN NSF · Chinese HuBERT Base** | `48 kHz` | `HiFi-GAN NSF` | `Chinese HuBERT Base` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/chinese-hubert-base/HiFiGAN) |

## File sperimentali e di archivio

| Modello | Frequenze di campionamento | Vocoder | Embedder | Fonte |
| --- | --- | --- | --- | --- |
| **7subpretrain** | `40 kHz` | Non confermato | Non confermato | [ZIP](https://huggingface.co/makiligon/rvc-sub-pretrain-moment/blob/main/7subpretrain40k.zip) |
| **Genshin EN Pretrain** | `32 kHz` | Non confermato | Non confermato | [ZIP](https://huggingface.co/makiligon/rvc-sub-pretrain-moment/blob/main/GenshinENPretrain32K.zip) |
| **Genshin EN Pretrain** | `40 kHz` | Non confermato | Non confermato | [ZIP](https://huggingface.co/makiligon/rvc-sub-pretrain-moment/blob/main/GenshinENPretrain40K.zip) |
| **SingingPretrain** | Non confermato | Non confermato | Non confermato | [ZIP](https://huggingface.co/makiligon/rvc-sub-pretrain-moment/blob/main/SingingPretrain.zip) |
| **DeepFake Audio Rangers Pretrain** | Non confermato | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/DeepFake-Audio-Rangers/rvc_pretrain) |
| **RVC v2 Pretrain Voice** | Non confermato | Non confermato | Non confermato | [Hugging Face](https://huggingface.co/Coolwowsocoolwow/RVC_V2_Pretrain_Voice) |
| **RingFormer v2 · failed** | `40 kHz` | `RingFormer v2` | `SPIN v2` | [Hugging Face](https://huggingface.co/its5Q/rvc-ringformer-v2-pretrain/tree/main/failed) |

L’elenco dei file conferma la disponibilità. Usa architettura, modalità pitch ed embedder richiesti per ogni coppia. Per l’upload RefineGAN di DMS, provenienza e licenza restano da verificare. L’autore di KLM X 10.0 richiede KLM Trainer 0.5.0 e indica la licenza CC BY-NC 2.0. Contenuto degli ZIP e permessi dei dataset non sono stati verificati. RingFormer v2 è nella cartella dei checkpoint falliti dell’autore.
