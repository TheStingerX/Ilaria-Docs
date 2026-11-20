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
| **Stock RVC v2 (Standard)** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN | `contentvec` | **Empfohlen (Stock RVC)** |
| **AnimePretrain** | `32 kHz` | HiFi-GAN | Nicht angegeben | `Politrees/RVC_resources` |
| **DMR v2** | `32 kHz` | HiFi-GAN | Nicht angegeben | `ourbz/DMR-V2-ReUpload` |
| **GuideVocalPretrain** | `48 kHz` | HiFi-GAN | Nicht angegeben | `Essid/GuideVocalPretrain` |
| **IMA** | `32 kHz` | HiFi-GAN | Nicht angegeben | `Loren85/IMA-TEST-V1` |
| **Itaila** | `32 kHz` | HiFi-GAN | `contentvec` | `TheStinger/itaila` |
| **KLM - BeatzForge V2** | `32 kHz` | HiFi-GAN | Nicht angegeben | `SeoulStreamingStation/KLM_BEATMASTER` |
| **KLM 4 HiFi-GAN** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN | Nicht angegeben | `SeoulStreamingStation/KLM49_HFG` |
| **KLM 4.4 (X1 / X2)** | `40 kHz` | MRF HiFi-GAN | Nicht angegeben | `SeoulStreamingStation/KLM4.4` *(in Ilaria RVC ungetestet)* |
| **KLM 5 RefineGAN** | `32 kHz`, `40 kHz` | RefineGAN | Nicht angegeben | `SeoulStreamingStation/KLM5` |
| **KLM 6.1 (Exp3 L6 / KLM 6.2)** | `32 kHz` | Nicht angegeben | Nicht angegeben | `SeoulStreamingStation/KLM6_Experimental` |
| **Legacy Core V1.5** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN / RefineGAN (`32k`) | `contentvec` / `spin-v2` (`32k`) | `lyery/mode4` |
| **Legacy Core V1.5v2** | `32 kHz` | HiFi-GAN | `contentvec` | `lyery/test` |
| **Mandagues V2** | `40 kHz` | HiFi-GAN | Nicht angegeben | `juaow/mandaguesv2` |
| **Nanashi Anime** *(Normal)* | `32 kHz` | HiFi-GAN | Nicht angegeben | `shiromiya/nanashi-pretrain` |
| **Nanashi v1** *(v1.7)* | `32 kHz` | HiFi-GAN | Nicht angegeben | `shiromiya/nanashi-pretrain` |
| **Nanashi v2 Beta** *(Base / Fine-tuned)* | `32 kHz` | HiFi-GAN | Nicht angegeben | `shiromiya/nanashi-pretrain` |
| **Nezox** | `32 kHz` | HiFi-GAN | Nicht angegeben | `Politrees/RVC_resources` |
| **Ov2Super** | `32 kHz` | Nicht angegeben | Nicht angegeben | `poiqazwsx/Ov2Super32kfix` |
| **PaBP** | `32 kHz` | HiFi-GAN | Nicht angegeben | `Razer112/pabp-v.5` |
| **RefGanVCTKV2** | `32 kHz`, `40 kHz` | RefineGAN | Nicht angegeben | `SimplCup/RefGanVCTKV2` |
| **RefineGAN Base Pretrains (Exp v3)** | `32 kHz` | RefineGAN | `contentvec` / `spin-v2` | `Aznamir/RefineGAN` |
| **RefineGanVCTKV1** | `44.1 kHz` | RefineGAN | Nicht angegeben | `SimplCup/RefineGanVCTKV1` |
| **Rigel** *(Base / Fine-tuned)* | `32 kHz` | Nicht angegeben | Nicht angegeben | `MUSTAR/Rigel-rvc-base-pretrained-model` |
| **RIN_E3** | `40 kHz` | HiFi-GAN | Nicht angegeben | `Politrees/RVC_resources` |
| **SingerPreTrain** *(Updated)* | `32 kHz` | HiFi-GAN | Nicht angegeben | `Sztef/SingerPreTrained` |
| **Snowie** | `40 kHz` | HiFi-GAN | Nicht angegeben | `Politrees/RVC_resources` |
| **Snowie V2** | `40 kHz`, `48 kHz` | HiFi-GAN | Nicht angegeben | `Politrees/RVC_resources` |
| **Snowie V3.1** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN | Nicht angegeben | `Politrees/RVC_resources` |
| **Snowie × RIN** | `40 kHz` | HiFi-GAN | Nicht angegeben | `Politrees/RVC_resources` |
| **Titan** *(Medium)* | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN | Nicht angegeben | `blaise-tk/TITAN` |
| **UKA** | `32 kHz` | HiFi-GAN | Nicht angegeben | `Plasmati/Pretrains` |
| **UKR** | `32 kHz` | HiFi-GAN | Nicht angegeben | `Politrees/RVC_resources` |
| **VocalCore** & **VocalCore Try3b** | `48 kHz` | HiFi-GAN | Nicht angegeben | `Politrees/RVC_resources` |

> **Kompatibilitätshinweis**: In Ilaria RVC wird RefineGAN-Training speziell bei `32 kHz` mit RVC v2 und Pitch-Guidance unterstützt. Ein `40 kHz`- oder `44.1 kHz`-RefineGAN-Pretrain bei auf `32 kHz` eingestelltem Training schlägt fehl oder liefert kaputte Ergebnisse.
