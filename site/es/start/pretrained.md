# Modelos Base Pretrained de RVC

Un **modelo base pretrained** (o **pretrain**) es un par de checkpoints iniciales: un **Generador (`G_*.pth`)** y un **Discriminador (`D_*.pth`)**, ya entrenados sobre cientos de horas de audio multihablante. Al entrenar una voz RVC nueva, el entrenamiento no empieza desde cero, sino que hace **fine-tuning** de este par sobre el dataset de tu voz objetivo.

## Qué hacen los pretrained y por qué existen

Partir de un pretrained permite que RVC aprenda una voz en minutos u horas en vez de semanas:

1. **El Generador (`G`)** ya sabe transformar características de contenido y tono en habla o canto natural.
2. **El Discriminador (`D`)** ya sabe distinguir el audio realista del artificial.
3. **Tu entrenamiento** adapta esos pesos existentes a tu voz objetivo.

Cada par pretrained está ligado a parámetros arquitectónicos exactos que **deben coincidir con tu entrenamiento**:
- **Sample rate** (`32 kHz`, `40 kHz`, `44.1 kHz` o `48 kHz`)
- **Arquitectura vocoder** (`HiFi-GAN`, `RefineGAN` o `MRF HiFi-GAN`)
- **Versión RVC y guía de tono** (casi todos los pretrains comunitarios son RVC v2 con F0)
- **Embedder esperado** (normalmente `contentvec`, aunque algunas variantes exigen `spin-v2`)

Si cualquiera de estos ajustes no coincide, el entrenamiento fallará al instante o generará audio gravemente distorsionado.

---

## Modelos pretrained RVC conocidos

> [!WARNING]
> **Solo con fines informativos - uso totalmente desaconsejado**
>
> Todo lo listado a continuación sobre modelos pretrained alternativos es **únicamente con fines informativos**. **Recomendamos encarecidamente NO usar pretrained alternativos**: la **configuración stock de RVC** (pretrained RVC v2 HiFi-GAN por defecto) es la mejor y más fiable. Los pretrained personalizados pueden provocar fácilmente artefactos metálicos, inestabilidad, overfitting o mala calidad de conversión offline y online (en vivo).

| Pretrained | Sample rate(s) | Vocoder | Embedder | Repositorio / Fuente |
| --- | --- | --- | --- | --- |
| **Stock RVC v2 (Por defecto)** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN | `contentvec` | **Recomendado (Stock RVC)** |
| **AnimePretrain** | `32 kHz` | HiFi-GAN | No especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **DMR v2** | `32 kHz` | HiFi-GAN | No especificado | [ourbz/DMR-V2-ReUpload](https://huggingface.co/ourbz/DMR-V2-ReUpload) |
| **GuideVocalPretrain** | `48 kHz` | HiFi-GAN | No especificado | [Essid/GuideVocalPretrain](https://huggingface.co/Essid/GuideVocalPretrain) |
| **IMA** | `32 kHz` | HiFi-GAN | No especificado | [Loren85/IMA-TEST-V1](https://huggingface.co/Loren85/IMA-TEST-V1) |
| **Itaila** | `32 kHz` | HiFi-GAN | `contentvec` | [TheStinger/itaila](https://huggingface.co/TheStinger/itaila) |
| **KLM - BeatzForge V2 / BeatMaster** | `32 kHz`, `48 kHz` | HiFi-GAN / No especificado | No especificado | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) |
| **KLM 4 / 4.1 / 4.2 / 4.3** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN / No especificado | No especificado | [SeoulStreamingStation/KLM49_HFG](https://huggingface.co/SeoulStreamingStation/KLM49_HFG), [KLM4](https://huggingface.co/SeoulStreamingStation/KLM4), [KLM4.1](https://huggingface.co/SeoulStreamingStation/KLM4.1), [KLM4.2](https://huggingface.co/SeoulStreamingStation/KLM4.2), [KLM43](https://huggingface.co/SeoulStreamingStation/KLM43) |
| **KLM 4.4 (X1 / X2 / X2B)** | `32 kHz`, `40 kHz` | MRF HiFi-GAN / No especificado | No especificado | [SeoulStreamingStation/KLM4.4](https://huggingface.co/SeoulStreamingStation/KLM4.4) *(compatibilidad variable)* |
| **KLM 5 RefineGAN** | `32 kHz`, `40 kHz` | RefineGAN | No especificado | [SeoulStreamingStation/KLM5](https://huggingface.co/SeoulStreamingStation/KLM5) |
| **KLM 6 Experimental (6.1 / 6.2 / Exp / Dev)** | `32 kHz`, `40 kHz`, `48 kHz` | No especificado | No especificado | [SeoulStreamingStation/KLM6_Experimental](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM 9 HFG / KLM-X / KLM-HF Trainer / RVC OG** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN / No especificado | No especificado | [SeoulStreamingStation/RVC_KLM9_HFG_PretrainModel](https://huggingface.co/SeoulStreamingStation/RVC_KLM9_HFG_PretrainModel), [RVC_KLM-X-10_Pretrained-Model](https://huggingface.co/SeoulStreamingStation/RVC_KLM-X-10_Pretrained-Model), [KLM_RVC_KLM-HF_Trainer](https://huggingface.co/SeoulStreamingStation/KLM_RVC_KLM-HF_Trainer) |
| **KLM KpopUniverse (I / II) & BlackTone** | `32 kHz`, `40 kHz`, `48 kHz` | No especificado | No especificado | [SeoulStreamingStation/KLM_KpopUniverse](https://huggingface.co/SeoulStreamingStation/KLM_KpopUniverse), [BlackTone_RVC_Pretrained](https://huggingface.co/SeoulStreamingStation/BlackTone_RVC_Pretrained) |
| **Legacy Core V1.5** *(retirado en 2.4.4)* | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN / RefineGAN 32k | `contentvec` / `spin-v2` 32k | `lyery/mode4` *(retirado por el autor)* |
| **Legacy Core V1.5v2** *(retirado en 2.4.4)* | `32 kHz` | HiFi-GAN | `contentvec` | `lyery/test` *(retirado por el autor)* |
| **Legacy Core V1.6** *(retirado)* | `32 kHz` | HiFi-GAN | `contentvec` | `lyery` *(retirado por el autor)* |
| **Mandagues V2** | `40 kHz` | HiFi-GAN | No especificado | [juaow/mandaguesv2](https://huggingface.co/juaow/mandaguesv2) |
| **Nanashi Anime** *(Normal)* | `32 kHz` | HiFi-GAN | No especificado | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nanashi v1** *(v1.7)* | `32 kHz` | HiFi-GAN | No especificado | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nanashi v2 Beta** *(Base / Fine-tuned)* | `32 kHz` | HiFi-GAN | No especificado | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nezox** | `32 kHz` | HiFi-GAN | No especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Ov2Super** | `32 kHz` | No especificado | No especificado | [poiqazwsx/Ov2Super32kfix](https://huggingface.co/poiqazwsx/Ov2Super32kfix) |
| **PaBP** | `32 kHz` | HiFi-GAN | No especificado | [Razer112/pabp-v.5](https://huggingface.co/Razer112/pabp-v.5) |
| **RefGanVCTKV2** | `32 kHz`, `40 kHz` | RefineGAN | No especificado | [SimplCup/RefGanVCTKV2](https://huggingface.co/SimplCup/RefGanVCTKV2) |
| **RefineGAN Base Pretrains (Exp v3)** | `32 kHz` | RefineGAN | `contentvec` / `spin-v2` | [Aznamir/RefineGAN](https://huggingface.co/Aznamir/RefineGAN) |
| **RefineGanVCTKV1** | `44.1 kHz` | RefineGAN | No especificado | [SimplCup/RefineGanVCTKV1](https://huggingface.co/SimplCup/RefineGanVCTKV1) |
| **Rigel** *(Base / Fine-tuned)* | `32 kHz` | No especificado | No especificado | [MUSTAR/Rigel-rvc-base-pretrained-model](https://huggingface.co/MUSTAR/Rigel-rvc-base-pretrained-model) |
| **RIN_E3** | `40 kHz` | HiFi-GAN | No especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **SingerPreTrain** *(Updated)* | `32 kHz` | HiFi-GAN | No especificado | [Sztef/SingerPreTrained](https://huggingface.co/Sztef/SingerPreTrained) |
| **Snowie** | `40 kHz` | HiFi-GAN | No especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie V2** | `40 kHz`, `48 kHz` | HiFi-GAN | No especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie V3.1** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN | No especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie × RIN** | `40 kHz` | HiFi-GAN | No especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Titan** *(Medium)* | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN | No especificado | [blaise-tk/TITAN](https://huggingface.co/blaise-tk/TITAN) |
| **UKA** | `32 kHz` | HiFi-GAN | No especificado | [Plasmati/Pretrains](https://huggingface.co/Plasmati/Pretrains) |
| **UKR** | `32 kHz` | HiFi-GAN | No especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **VocalCore** y **VocalCore Try3b** | `48 kHz` | HiFi-GAN | No especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |

> **Nota de compatibilidad**: en Ilaria RVC el entrenamiento con RefineGAN solo está soportado específicamente a `32 kHz` con RVC v2 y guía de tono. Elegir un pretrain RefineGAN de `40 kHz` o `44.1 kHz` configurando el entrenamiento en `32 kHz` fallará o producirá un resultado roto.

!!!note
**Nota sobre Legacy Core (`V1.5`, `V1.5v2` y `V1.6`):**
Los modelos pretrained **Legacy Core** (`lyery/mode4` y `lyery/test`) fueron **retirados por su autor** y ya no están disponibles para descargar (también fueron retirados del descargador de Ilaria RVC en `2.4.4`). Sus filas en la tabla se mantienen **solo con fines informativos**; únicamente podrás usar para entrenar pesos descargados previamente.
!!!
