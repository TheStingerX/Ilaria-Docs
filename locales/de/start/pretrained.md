---
label: "🧱 Pretrained-Modelle"
order: 90
permalink: /pretrained/
description: "Ein Pretrained-Basismodell (auch Pretrain genannt) ist ein Paar aus Start-Checkpoints: ein Generator (G_.pth) und ein Diskriminator (D_.pth), die bereits auf hunderten Stunden Multi-Speaker-Audio trainiert wurden."
---
# Pretrained-Basismodelle in RVC

Ein **Pretrained-Basismodell** (auch **Pretrain** genannt) ist ein Paar aus Start-Checkpoints: ein **Generator (`G_*.pth`)** und ein **Diskriminator (`D_*.pth`)**, die bereits auf hunderten Stunden Multi-Speaker-Audio trainiert wurden. Wenn du eine neue RVC-Stimme trainierst, beginnt das Training nicht bei null, sondern führt ein **Fine-Tuning** dieses Paares auf deinem Ziel-Dataset durch.

## Was Pretrained-Modelle tun und warum es sie gibt

Mit einem Pretrain lernt RVC eine neue Stimme in Minuten oder Stunden statt in Wochen:

1. **Der Generator (`G`)** weiß bereits, wie Inhaltsmerkmale und Pitch in natürliche Sprache oder Gesang umgewandelt werden.
2. **Der Diskriminator (`D`)** weiß bereits, wie man realistisches von künstlichem Audio unterscheidet.
3. **Dein Training** passt diese vorhandenen Gewichte an deine Zielstimme an.

Jedes Pretrain-Paar ist fest an bestimmte Architekturparameter gebunden, die **exakt zu deinem Training passen müssen**:
- **Sample-Rate** (`32 kHz`, `40 kHz`, `44.1 kHz` oder `48 kHz`)
- **Vocoder-Architektur** (`HiFi-GAN`, `RefineGAN` oder `MRF HiFi-GAN`)
- **RVC-Version & Pitch-Guidance** (fast alle Community-Pretrains sind RVC v2 mit F0)
- **Erwarteter Embedder** (meist `contentvec`, manche Varianten verlangen `spin-v2`)

Stimmt auch nur eine dieser Einstellungen nicht überein, bricht das Training sofort ab oder erzeugt stark verzerrtes Audio.

---

## Bekannte RVC-Pretrained-Modelle

> [!WARNING]
> **Nur zu Informationszwecken - Nutzung dringend abgeraten**
>
> Alle nachfolgenden Angaben zu alternativen oder Community-Pretrains dienen **ausschließlich zu Informationszwecken**. **Wir raten dringend davon ab, alternative Pretrained-Modelle zu verwenden**: die **Standard-RVC-Pretrain-Einstellungen** (Standard RVC v2 HiFi-GAN) sind die beste und zuverlässigste Wahl. Eigene Pretrains können leicht metallische Artefakte, Instabilität, Overfitting oder schlechte Offline- und Online-(Live-)Konvertierungen verursachen.

| Pretrained | Sample-Rate(s) | Vocoder | Embedder | Repository / Quelle |
| --- | --- | --- | --- | --- |
| **Stock RVC v2 (Standard)** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | `contentvec` | **Empfohlen (Stock RVC)** |
| **AnimePretrain** | `32 kHz` | `HiFi-GAN` | Nicht angegeben | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **BlackTone Standard** | `32 kHz` | Nicht angegeben | Nicht angegeben | [SeoulStreamingStation/BlackTone_RVC_Pretrained](https://huggingface.co/SeoulStreamingStation/BlackTone_RVC_Pretrained) |
| **BlackTone Large** | `32 kHz` | Nicht angegeben | `SPIN` | [SeoulStreamingStation/BlackTone_RVC_Pretrained](https://huggingface.co/SeoulStreamingStation/BlackTone_RVC_Pretrained) · [README](https://huggingface.co/SeoulStreamingStation/BlackTone_RVC_Pretrained/blob/main/ReadMe.md) |
| **DMR v2** | `32 kHz` | `HiFi-GAN` | Nicht angegeben | [ourbz/DMR-V2-ReUpload](https://huggingface.co/ourbz/DMR-V2-ReUpload) |
| **GuideVocalPretrain** | `48 kHz` | `HiFi-GAN` | Nicht angegeben | [Essid/GuideVocalPretrain](https://huggingface.co/Essid/GuideVocalPretrain) |
| **IMA** | `32 kHz` | `HiFi-GAN` | Nicht angegeben | [Loren85/IMA-TEST-V1](https://huggingface.co/Loren85/IMA-TEST-V1) |
| **Itaila** | `32 kHz` | `HiFi-GAN` | `contentvec` | [TheStinger/itaila](https://huggingface.co/TheStinger/itaila) |
| **Legacy Core V1.5** | `32 kHz` | `HiFi-GAN` | `contentvec` | [sxndypz/legacy-core-1.5](https://huggingface.co/sxndypz/legacy-core-1.5/tree/main) |
| **Legacy Core V1.5** | `40 kHz` | `HiFi-GAN` | `contentvec` | [sxndypz/legacy-core-1.5](https://huggingface.co/sxndypz/legacy-core-1.5/tree/main) |
| **Legacy Core V1.5v2** | `32 kHz` | `HiFi-GAN` | `contentvec` | [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) |
| **Legacy Core V1.6** | `32 kHz` | `HiFi-GAN` | `contentvec` | [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) |
| **Mandagues V2** | `40 kHz` | `HiFi-GAN` | `contentvec` | [juaow/mandaguesv2](https://huggingface.co/juaow/mandaguesv2) |
| **Nanashi Anime v1** | `32 kHz` | `HiFi-GAN` | `Japanese HuBERT` | [v1_anime](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1_anime) · [AI Hub](https://discord.com/channels/1159260121998827560/1235952130855010365) |
| **Nanashi v1** *(v1.7)* | `32 kHz` | `HiFi-GAN` | Nicht angegeben | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nanashi v2 Beta** *(Base / Fine-tuned)* | `32 kHz` | `HiFi-GAN` | Nicht angegeben | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nezox** | `32 kHz` | `HiFi-GAN` | Nicht angegeben | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Ov2Super** | `32 kHz` | `HiFi-GAN` | `contentvec` | [poiqazwsx/Ov2Super32kfix](https://huggingface.co/poiqazwsx/Ov2Super32kfix) |
| **PaBP** | `32 kHz` | `HiFi-GAN` | Nicht angegeben | [Razer112/pabp-v.5](https://huggingface.co/Razer112/pabp-v.5) |
| **RefGanVCTKV2** | `32 kHz`, `40 kHz` | `RefineGAN` | `contentvec` | [SimplCup/RefGanVCTKV2](https://huggingface.co/SimplCup/RefGanVCTKV2) |
| **RefineGAN Base Pretrains (Exp v3)** | `32 kHz` | `RefineGAN` | `contentvec` / `spin-v2` | [Aznamir/RefineGAN](https://huggingface.co/Aznamir/RefineGAN) |
| **RefineGanVCTKV1** | `44.1 kHz` | `RefineGAN` | `contentvec` | [SimplCup/RefineGanVCTKV1](https://huggingface.co/SimplCup/RefineGanVCTKV1) |
| **Rigel** *(Base / Fine-tuned)* | `32 kHz`, `40 kHz` | `HiFi-GAN` | Nicht angegeben | [MUSTAR/Rigel-rvc-base-pretrained-model](https://huggingface.co/MUSTAR/Rigel-rvc-base-pretrained-model) · [Politrees](https://huggingface.co/Politrees/RVC_resources) |
| **RIN_E3** | `40 kHz` | `HiFi-GAN` | Nicht angegeben | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **SingerPreTrain** *(Updated)* | `32 kHz` | `HiFi-GAN` | `contentvec` | [Sztef/SingerPreTrained](https://huggingface.co/Sztef/SingerPreTrained) |
| **Snowie** | `40 kHz` | `HiFi-GAN` | Nicht angegeben | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie V2** | `40 kHz`, `48 kHz` | `HiFi-GAN` | Nicht angegeben | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie V3.1** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | Nicht angegeben | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie × RIN** | `40 kHz` | `HiFi-GAN` | Nicht angegeben | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Titan** *(Medium)* | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | `contentvec` | [blaise-tk/TITAN](https://huggingface.co/blaise-tk/TITAN) |
| **UKA** | `32 kHz` | `HiFi-GAN` | Nicht angegeben | [Plasmati/Pretrains](https://huggingface.co/Plasmati/Pretrains) |
| **UKR** | `32 kHz` | `HiFi-GAN` | Nicht angegeben | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **VocalCore** & **VocalCore Try3b** | `48 kHz` | `HiFi-GAN` | Nicht angegeben | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |

!!!note
**Hinweis zu Legacy Core (`V1.5`, `V1.5v2` und `V1.6`):**
- **Legacy Core V1.5** (`32 kHz`, `40 kHz`): [sxndypz/legacy-core-1.5](https://huggingface.co/sxndypz/legacy-core-1.5/tree/main).
- **Legacy Core V1.5v2** und **Legacy Core V1.6** (`32 kHz`) sind mit Zustimmung des Originalautors wieder über [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) verfügbar und wurden in Ilaria RVC `2.4.7` wiederhergestellt.
- **Ilaria RVC 2.4.8** ergänzt Legacy Core V1.5 mit 32 und 40 kHz im Downloader. Alle vier Legacy-Core-Optionen verwenden `HiFi-GAN` + `ContentVec`. [Versionshinweise](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.4.8)
!!!

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · RefineGAN unterstützt Training und Inferenz mit 32, 40 und 44,1 kHz in RVC v2 mit Pitch Guidance. Die App erzeugt die stille Audiodatei für 44,1 kHz automatisch. Wähle **None** für Training von Grund auf, falls die vortrainierten Gewichte eine andere Architektur nutzen. Getestete Beispiele sind KLM 5 (40 kHz) und VCTK (44,1 kHz).

## Weitere vortrainierte Paare

| Modell | Abtastraten | Vocoder | Embedder | Quelle |
| --- | --- | --- | --- | --- |
| **Stock RVC v1 · F0** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN NSF` | `HuBERT Base · 256` | [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main/pretrained) |
| **Stock RVC v1 · No F0** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | `HuBERT Base · 256` | [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main/pretrained) |
| **Stock RVC v2 · No F0** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | `HuBERT Base · 768` | [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main/pretrained_v2) |
| **Aurora v2** | `48 kHz` | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/48k/Aurora) |
| **Sench Pretrain** | `48 kHz` | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/Shashashasha/Sench_Pretrain_48k_RVC) |
| **RingFormer v1** | `40 kHz` | `RingFormer` | `SPIN v2` | [Hugging Face](https://huggingface.co/its5Q/rvc-ringformer-pretrain) |
| **Applio RefineGAN (DMS)** | `24 kHz`, `32 kHz` | `RefineGAN` | Nicht bestätigt | [Hugging Face](https://huggingface.co/DanielMarius/dms-applio-refinegan-pretrained) |
| **DMR v0.5 / v0.8 / v1** | `32 kHz` | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/DMR) |
| **Nanashi v1** | `32 kHz` | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1) |
| **Nanashi v1.5** | `32 kHz` | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1.5) |
| **Nanashi v1.5 Rigel** | `32 kHz` | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1.5_Rigel_Version) |
| **Nanashi Anime Normal** | `32 kHz` | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1_anime/normal) |
| **Nanashi Anime Resized** | `32 kHz` | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1_anime/resized) |
| **SingerPreTrain v1** | `32 kHz` | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/Singer) |
| **Snowie v3.1 · Japanese HuBERT** | Nicht bestätigt | Nicht bestätigt | `Japanese HuBERT` | [Hugging Face](https://huggingface.co/MUSTAR/Snowie_V3.1_pretrain_on_JPhubert) |
| **Snowie RuPretrain · No F0** | `40 kHz` | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/MUSTAR/Snowie_RuPretrain_noP_40k) |
| **Snowie v3 × RIN E3** | `40 kHz` | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/MUSTAR/SnowieV3-X-RINE3-40K) |
| **Ov2Super · F0** | `40 kHz` | `HiFi-GAN` | Nicht bestätigt | [Hugging Face](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/40k/Ov2) |

## KLM-Varianten

| Modell | Abtastraten | Vocoder | Embedder | Quelle |
| --- | --- | --- | --- | --- |
| **KLM 4.0** | `32 kHz`, `40 kHz`, `48 kHz` | Nicht bestätigt | Nicht bestätigt | [32 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/KLM) · [40 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/40k/KLM) · [48 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/48k/KLM) |
| **KLM 4.1** | `32 kHz`, `48 kHz` | Nicht bestätigt | Nicht bestätigt | [32 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/KLM) · [48 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/48k/KLM) |
| **KLM 4.1 T2** | `32 kHz` | Nicht bestätigt | Nicht bestätigt | [32 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/KLM) |
| **KLM 4.2 T1** | `32 kHz`, `40 kHz` | Nicht bestätigt | Nicht bestätigt | [32 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/KLM) · [40 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/40k/KLM) |
| **KLM 4.2 T2 / T3 / T4** | `40 kHz` | Nicht bestätigt | Nicht bestätigt | [40 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/40k/KLM) |
| **KLM 4.2 X10** | `32 kHz` | Nicht bestätigt | Nicht bestätigt | [32 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/KLM) |
| **KLM 4.3 X1 / X2** | `32 kHz` | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM43) |
| **KLM 4.3 X3 / X4** | `32 kHz`, `40 kHz`, `48 kHz` | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM43) |
| **KLM 4.4 X1 / X2 / X2B** | `32 kHz` | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM4.4) |
| **KLM 4.4 X1 MRF / X2 MRF** | `40 kHz` | `MRF HiFi-GAN` | Nicht bestätigt | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM4.4) |
| **KLM 6 Experimental 1** | `32 kHz`, `48 kHz` | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM 6 Experimental 2** | `32 kHz`, `40 kHz` | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM 6 Experimental 3 L6** | `32 kHz` | `HiFi-GAN` | `SPIN (7–12)` | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM 6.1 Dev / Dev Ranger25** | `48 kHz` | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM-X1 / KLM-HF Mini T** | `32 kHz` | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM_RVC_KLM-HF_Trainer) |
| **KLM RVC PT / RVC OG** | `32 kHz`, `40 kHz`, `48 kHz` | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM_RVC_KLM-HF_Trainer) |
| **KLM 9 HFG** | `32 kHz` | `HiFi-GAN` | Nicht bestätigt | [Hugging Face](https://huggingface.co/SeoulStreamingStation/RVC_KLM9_HFG_PretrainModel) |
| **KLM X 10.0** | `32 kHz` | `HiFi-GAN` | Nicht bestätigt | [Hugging Face](https://huggingface.co/SeoulStreamingStation/RVC_KLM-X-10_Pretrained-Model) |
| **KLM - BeatzForge V2** | `32 kHz` | Nicht angegeben | Nicht angegeben | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) · [AI Hub](https://discord.com/channels/1159260121998827560/1235952130855010365) |
| **KLM - BeatzForge V1** | `48 kHz` | `HiFi-GAN` | Nicht angegeben | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) |
| **KLM BeatMaster V1** | `48 kHz` | Nicht angegeben | Nicht angegeben | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) |
| **KLM 4 HiFi-GAN** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | Nicht angegeben | [SeoulStreamingStation/KLM49_HFG](https://huggingface.co/SeoulStreamingStation/KLM49_HFG) · [AI Hub](https://discord.com/channels/1159260121998827560/1235952130855010365) |
| **KLM 5 RefineGAN** | `32 kHz`, `40 kHz` | `RefineGAN` | Nicht angegeben | [SeoulStreamingStation/KLM5](https://huggingface.co/SeoulStreamingStation/KLM5) |
| **KLM KpopUniverse (I / II)** | `32 kHz`, `40 kHz`, `48 kHz` | Nicht angegeben | Nicht angegeben | [SeoulStreamingStation/KLM_KpopUniverse](https://huggingface.co/SeoulStreamingStation/KLM_KpopUniverse) |

## Paare aus Convbased Studio

| Modell | Abtastraten | Vocoder | Embedder | Quelle |
| --- | --- | --- | --- | --- |
| **Convbased HiFi-GAN NSF · ContentVec** | `48 kHz` | `HiFi-GAN NSF` | `ContentVec` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/contentvec/HiFiGAN/476sid) |
| **Convbased SiFi-GAN · ContentVec** | `48 kHz` | `SiFi-GAN` | `ContentVec` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/contentvec/SiFiGAN) |
| **Convbased BigVGAN · ContentVec** | `40 kHz` | `BigVGAN` | `ContentVec` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/contentvec/BigVGAN) |
| **Convbased HiFi-GAN NSF · SPIN** | `48 kHz` | `HiFi-GAN NSF` | `SPIN` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/spin/HiFiGAN) |
| **Convbased SiFi-GAN · SPIN** | `48 kHz` | `SiFi-GAN` | `SPIN` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/spin/SiFiGAN) |
| **Convbased BigVGAN · SPIN v2** | `40 kHz` | `BigVGAN` | `SPIN v2` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/spin-v2/BigVGAN) |
| **Convbased HiFi-GAN NSF · Chinese HuBERT Base** | `48 kHz` | `HiFi-GAN NSF` | `Chinese HuBERT Base` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/chinese-hubert-base/HiFiGAN) |

## Experimentelle Dateien und Archive

| Modell | Abtastraten | Vocoder | Embedder | Quelle |
| --- | --- | --- | --- | --- |
| **7subpretrain** | `40 kHz` | Nicht bestätigt | Nicht bestätigt | [ZIP](https://huggingface.co/makiligon/rvc-sub-pretrain-moment/blob/main/7subpretrain40k.zip) |
| **Genshin EN Pretrain** | `32 kHz` | Nicht bestätigt | Nicht bestätigt | [ZIP](https://huggingface.co/makiligon/rvc-sub-pretrain-moment/blob/main/GenshinENPretrain32K.zip) |
| **Genshin EN Pretrain** | `40 kHz` | Nicht bestätigt | Nicht bestätigt | [ZIP](https://huggingface.co/makiligon/rvc-sub-pretrain-moment/blob/main/GenshinENPretrain40K.zip) |
| **SingingPretrain** | Nicht bestätigt | Nicht bestätigt | Nicht bestätigt | [ZIP](https://huggingface.co/makiligon/rvc-sub-pretrain-moment/blob/main/SingingPretrain.zip) |
| **DeepFake Audio Rangers Pretrain** | Nicht bestätigt | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/DeepFake-Audio-Rangers/rvc_pretrain) |
| **RVC v2 Pretrain Voice** | Nicht bestätigt | Nicht bestätigt | Nicht bestätigt | [Hugging Face](https://huggingface.co/Coolwowsocoolwow/RVC_V2_Pretrain_Voice) |
| **RingFormer v2 · failed** | `40 kHz` | `RingFormer v2` | `SPIN v2` | [Hugging Face](https://huggingface.co/its5Q/rvc-ringformer-v2-pretrain/tree/main/failed) |

Die Dateiliste bestätigt die Verfügbarkeit. Beachte Architektur, Pitch-Modus und Encoder des jeweiligen Paars. Herkunft und Lizenz des DMS-RefineGAN sind ungeklärt. KLM X 10.0 benötigt KLM Trainer 0.5.0 und nennt CC BY-NC 2.0. ZIP-Inhalte und Datensatzrechte sind ungeprüft. RingFormer v2 stammt aus dem Ordner für fehlgeschlagene Checkpoints.
