# RVC Pretrained Base Models

A **pretrained base model** (also called a **pretrain**) is a pair of starting checkpoint files: a **Generator (`G_*.pth`)** and a **Discriminator (`D_*.pth`)**, already trained on hundreds of hours of multi-speaker audio. When you train a new RVC voice, training does not start from scratch; instead, it **fine-tunes** this pretrained pair on your target speaker's dataset.

## What pretrained models do and why they exist

Starting from a pretrained pair allows RVC to learn a new voice in minutes or hours instead of weeks:

1. **The Generator (`G`)** already knows how to turn content features and pitch into natural speech or singing.
2. **The Discriminator (`D`)** already knows how to judge whether generated audio sounds realistic or artificial.
3. **Your training run** adapts those existing weights to your target voice.

Every pretrained pair is locked to specific architectural parameters that **must match your training setup exactly**:
- **Sample rate** (`32 kHz`, `40 kHz`, `44.1 kHz`, or `48 kHz`)
- **Vocoder architecture** (`HiFi-GAN`, `RefineGAN`, or `MRF HiFi-GAN`)
- **RVC version & pitch guidance** (almost all community pretrains are RVC v2 with F0 pitch guidance)
- **Expected embedder** (usually `contentvec`, though some variants require `spin-v2`)

If any of these settings do not match the pretrained pair, training will either crash immediately or produce heavily distorted audio.

---

## Known RVC pretrained models

> [!WARNING]
> **Informational purpose only - strongly discouraged for normal use**
>
> Everything listed below regarding custom or community pretrained models is provided **for informational purposes only**. **We strongly recommend NOT using alternative pretrained models**: the **stock RVC pretrained settings** (default RVC v2 HiFi-GAN) are the best and most reliable choice. Custom pretrains can easily introduce metallic artifacts, instability, overfitting, or poor offline and online (live) conversion quality.

| Pretrained | Sample rate(s) | Vocoder | Embedder | Repository / Source |
| --- | --- | --- | --- | --- |
| **Stock RVC v2 (Default)** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN | `contentvec` | **Recommended stock RVC** |
| **AnimePretrain** | `32 kHz` | HiFi-GAN | Not specified | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **BlackTone** *(Standard / Large)* | `32 kHz` | Not specified | Not specified | [SeoulStreamingStation/BlackTone_RVC_Pretrained](https://huggingface.co/SeoulStreamingStation/BlackTone_RVC_Pretrained) |
| **DMR v2** | `32 kHz` | HiFi-GAN | Not specified | [ourbz/DMR-V2-ReUpload](https://huggingface.co/ourbz/DMR-V2-ReUpload) |
| **GuideVocalPretrain** | `48 kHz` | HiFi-GAN | Not specified | [Essid/GuideVocalPretrain](https://huggingface.co/Essid/GuideVocalPretrain) |
| **IMA** | `32 kHz` | HiFi-GAN | Not specified | [Loren85/IMA-TEST-V1](https://huggingface.co/Loren85/IMA-TEST-V1) |
| **Itaila** | `32 kHz` | HiFi-GAN | `contentvec` | [TheStinger/itaila](https://huggingface.co/TheStinger/itaila) |
| **KLM - BeatzForge** *(V1 / V2)* | `32 kHz`, `48 kHz` | HiFi-GAN / Not specified | Not specified | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) |
| **KLM BeatMaster V1** | `48 kHz` | Not specified | Not specified | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) |
| **KLM 4 / 4.1 / 4.2 / 4.3** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN / Not specified | Not specified | [SeoulStreamingStation/KLM49_HFG](https://huggingface.co/SeoulStreamingStation/KLM49_HFG), [KLM4](https://huggingface.co/SeoulStreamingStation/KLM4), [KLM4.1](https://huggingface.co/SeoulStreamingStation/KLM4.1), [KLM4.2](https://huggingface.co/SeoulStreamingStation/KLM4.2), [KLM43](https://huggingface.co/SeoulStreamingStation/KLM43) |
| **KLM 4.4 (X1 / X2 / X2B)** | `32 kHz`, `40 kHz` | MRF HiFi-GAN / Not specified | Not specified | [SeoulStreamingStation/KLM4.4](https://huggingface.co/SeoulStreamingStation/KLM4.4) *(compatibility varies by pair)* |
| **KLM 5 RefineGAN** | `32 kHz`, `40 kHz` | RefineGAN | Not specified | [SeoulStreamingStation/KLM5](https://huggingface.co/SeoulStreamingStation/KLM5) |
| **KLM 6 Experimental (6.1 / 6.2 / Exp / Dev)** | `32 kHz`, `40 kHz`, `48 kHz` | Not specified | Not specified | [SeoulStreamingStation/KLM6_Experimental](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM 9 HFG** | `32 kHz` | HiFi-GAN | Not specified | [SeoulStreamingStation/RVC_KLM9_HFG_PretrainModel](https://huggingface.co/SeoulStreamingStation/RVC_KLM9_HFG_PretrainModel) |
| **KLM-HF Trainer** | `32 kHz`, `40 kHz`, `48 kHz` | Not specified | Not specified | [SeoulStreamingStation/KLM_RVC_KLM-HF_Trainer](https://huggingface.co/SeoulStreamingStation/KLM_RVC_KLM-HF_Trainer) |
| **KLM-X** | `32 kHz` | HiFi-GAN | Not specified | [SeoulStreamingStation/RVC_KLM-X-10_Pretrained-Model](https://huggingface.co/SeoulStreamingStation/RVC_KLM-X-10_Pretrained-Model) |
| **KLM KpopUniverse (I / II)** | `32 kHz`, `40 kHz`, `48 kHz` | Not specified | Not specified | [SeoulStreamingStation/KLM_KpopUniverse](https://huggingface.co/SeoulStreamingStation/KLM_KpopUniverse) |
| **Legacy Core V1.5** *(removed in 2.4.4)* | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN / RefineGAN 32k | `contentvec` / `spin-v2` 32k | `lyery/mode4` *(removed by author)* |
| **Legacy Core V1.5v2** | `32 kHz` | HiFi-GAN | `contentvec` | [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) ([G](https://huggingface.co/notiscBalbalEko/PretrainReupload/resolve/main/G_LegacyCore1.5v2.pth?download=true), [D](https://huggingface.co/notiscBalbalEko/PretrainReupload/resolve/main/D_LegacyCore1.5v2.pth?download=true)) |
| **Legacy Core V1.6** | `32 kHz` | HiFi-GAN | `contentvec` | [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) ([G](https://huggingface.co/notiscBalbalEko/PretrainReupload/resolve/main/D_LegacyCoreOld.pth?download=true), [D](https://huggingface.co/notiscBalbalEko/PretrainReupload/resolve/main/G_LegacyCoreOld.pth?download=true) *(G/D filenames swapped)*) |
| **Mandagues V2** | `40 kHz` | HiFi-GAN | `contentvec` | [juaow/mandaguesv2](https://huggingface.co/juaow/mandaguesv2) |
| **Nanashi Anime** *(Normal)* | `32 kHz` | HiFi-GAN | Not specified | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nanashi v1** *(v1.7)* | `32 kHz` | HiFi-GAN | Not specified | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nanashi v2 Beta** *(Base / Fine-tuned)* | `32 kHz` | HiFi-GAN | Not specified | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nezox** | `32 kHz` | HiFi-GAN | Not specified | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Ov2Super** | `32 kHz` | HiFi-GAN | `contentvec` | [poiqazwsx/Ov2Super32kfix](https://huggingface.co/poiqazwsx/Ov2Super32kfix) |
| **PaBP** | `32 kHz` | HiFi-GAN | Not specified | [Razer112/pabp-v.5](https://huggingface.co/Razer112/pabp-v.5) |
| **RefGanVCTKV2** | `32 kHz`, `40 kHz` | RefineGAN | `contentvec` | [SimplCup/RefGanVCTKV2](https://huggingface.co/SimplCup/RefGanVCTKV2) |
| **RefineGAN Base Pretrains (Exp v3)** | `32 kHz` | RefineGAN | `contentvec` / `spin-v2` | [Aznamir/RefineGAN](https://huggingface.co/Aznamir/RefineGAN) |
| **RefineGanVCTKV1** | `44.1 kHz` | RefineGAN | `contentvec` | [SimplCup/RefineGanVCTKV1](https://huggingface.co/SimplCup/RefineGanVCTKV1) |
| **Rigel** *(Base / Fine-tuned)* | `32 kHz` | Not specified | Not specified | [MUSTAR/Rigel-rvc-base-pretrained-model](https://huggingface.co/MUSTAR/Rigel-rvc-base-pretrained-model) |
| **RIN_E3** | `40 kHz` | HiFi-GAN | Not specified | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **SingerPreTrain** *(Updated)* | `32 kHz` | HiFi-GAN | `contentvec` | [Sztef/SingerPreTrained](https://huggingface.co/Sztef/SingerPreTrained) |
| **Snowie** | `40 kHz` | HiFi-GAN | Not specified | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie V2** | `40 kHz`, `48 kHz` | HiFi-GAN | Not specified | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie V3.1** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN | Not specified | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie × RIN** | `40 kHz` | HiFi-GAN | Not specified | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Titan** *(Medium)* | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN | `contentvec` | [blaise-tk/TITAN](https://huggingface.co/blaise-tk/TITAN) |
| **UKA** | `32 kHz` | HiFi-GAN | Not specified | [Plasmati/Pretrains](https://huggingface.co/Plasmati/Pretrains) |
| **UKR** | `32 kHz` | HiFi-GAN | Not specified | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **VocalCore** & **VocalCore Try3b** | `48 kHz` | HiFi-GAN | Not specified | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |

!!!note
**Note on Legacy Core (`V1.5`, `V1.5v2`, and `V1.6`):**
- **Legacy Core V1.5** (`lyery/mode4`) remains **removed by its author** (removed from Ilaria RVC's downloader in `2.4.4`); only previously downloaded weights can still be used.
- **Legacy Core V1.5v2** and **Legacy Core V1.6** (`32 kHz`) are available again with the original author's consent via [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) and were restored in Ilaria RVC `2.4.7`.
- **Important for Legacy Core V1.6**: in the reupload repository, the **G** and **D** filenames are **swapped** (`D_LegacyCoreOld.pth` is **G**, and `G_LegacyCoreOld.pth` is **D**). Make sure you load each file in the right slot.
!!!

> **Compatibility note**: In Ilaria RVC, RefineGAN training is supported specifically at `32 kHz` with RVC v2 and pitch guidance. Choosing a `40 kHz` or `44.1 kHz` RefineGAN pretrain while setting training to `32 kHz` will fail or produce broken output.

[Interactive RVC Compatibility Matrix](../reference/compatibility-matrix.md)
