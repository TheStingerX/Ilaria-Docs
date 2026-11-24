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
| **Stock RVC v2 (Por defecto)** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | `contentvec` | **Recomendado (Stock RVC)** |
| **AnimePretrain** | `32 kHz` | `HiFi-GAN` | No especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **BlackTone Standard** | `32 kHz` | No especificado | No especificado | [SeoulStreamingStation/BlackTone_RVC_Pretrained](https://huggingface.co/SeoulStreamingStation/BlackTone_RVC_Pretrained) |
| **BlackTone Large** | `32 kHz` | No especificado | `SPIN` | [SeoulStreamingStation/BlackTone_RVC_Pretrained](https://huggingface.co/SeoulStreamingStation/BlackTone_RVC_Pretrained) · [README](https://huggingface.co/SeoulStreamingStation/BlackTone_RVC_Pretrained/blob/main/ReadMe.md) |
| **DMR v2** | `32 kHz` | `HiFi-GAN` | No especificado | [ourbz/DMR-V2-ReUpload](https://huggingface.co/ourbz/DMR-V2-ReUpload) |
| **GuideVocalPretrain** | `48 kHz` | `HiFi-GAN` | No especificado | [Essid/GuideVocalPretrain](https://huggingface.co/Essid/GuideVocalPretrain) |
| **IMA** | `32 kHz` | `HiFi-GAN` | No especificado | [Loren85/IMA-TEST-V1](https://huggingface.co/Loren85/IMA-TEST-V1) |
| **Itaila** | `32 kHz` | `HiFi-GAN` | `contentvec` | [TheStinger/itaila](https://huggingface.co/TheStinger/itaila) |
| **KLM - BeatzForge V2** | `32 kHz` | No especificado | No especificado | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) · [AI Hub](https://discord.com/channels/1159260121998827560/1235952130855010365) |
| **KLM - BeatzForge V1** | `48 kHz` | `HiFi-GAN` | No especificado | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) |
| **KLM BeatMaster V1** | `48 kHz` | No especificado | No especificado | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) |
| **KLM 4 HiFi-GAN** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | No especificado | [SeoulStreamingStation/KLM49_HFG](https://huggingface.co/SeoulStreamingStation/KLM49_HFG) · [AI Hub](https://discord.com/channels/1159260121998827560/1235952130855010365) |
| **KLM 4 / 4.1 / 4.2 / 4.3** | `32 kHz`, `40 kHz`, `48 kHz` | No especificado | No especificado | [KLM4](https://huggingface.co/SeoulStreamingStation/KLM4), [KLM4.1](https://huggingface.co/SeoulStreamingStation/KLM4.1), [KLM4.2](https://huggingface.co/SeoulStreamingStation/KLM4.2), [KLM43](https://huggingface.co/SeoulStreamingStation/KLM43) |
| **KLM 4.4 (X1 / X2 / X2B)** | `32 kHz` | No especificado | No especificado | [SeoulStreamingStation/KLM4.4](https://huggingface.co/SeoulStreamingStation/KLM4.4) *(compatibilidad variable)* |
| **KLM 4.4 (X1 / X2)** | `40 kHz` | `MRF HiFi-GAN` | No especificado | [SeoulStreamingStation/KLM4.4](https://huggingface.co/SeoulStreamingStation/KLM4.4) *(compatibilidad variable)* |
| **KLM 5 RefineGAN** | `32 kHz`, `40 kHz` | `RefineGAN` | No especificado | [SeoulStreamingStation/KLM5](https://huggingface.co/SeoulStreamingStation/KLM5) |
| **KLM 6 Experimental V3 (Exp3 L6)** | `32 kHz` | `HiFi-GAN` | `SPIN (7–12)` | [SeoulStreamingStation/KLM6_Experimental](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) · [AI Hub](https://discord.com/channels/1159260121998827560/1235952130855010365) |
| **KLM 6 Experimental (6.1 / 6.2 / Exp / Dev)** | `32 kHz`, `40 kHz`, `48 kHz` | No especificado | No especificado | [SeoulStreamingStation/KLM6_Experimental](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM 9 HFG** | `32 kHz` | `HiFi-GAN` | No especificado | [SeoulStreamingStation/RVC_KLM9_HFG_PretrainModel](https://huggingface.co/SeoulStreamingStation/RVC_KLM9_HFG_PretrainModel) |
| **KLM-HF Trainer** | `32 kHz`, `40 kHz`, `48 kHz` | No especificado | No especificado | [SeoulStreamingStation/KLM_RVC_KLM-HF_Trainer](https://huggingface.co/SeoulStreamingStation/KLM_RVC_KLM-HF_Trainer) |
| **KLM-X** | `32 kHz` | `HiFi-GAN` | No especificado | [SeoulStreamingStation/RVC_KLM-X-10_Pretrained-Model](https://huggingface.co/SeoulStreamingStation/RVC_KLM-X-10_Pretrained-Model) |
| **KLM KpopUniverse (I / II)** | `32 kHz`, `40 kHz`, `48 kHz` | No especificado | No especificado | [SeoulStreamingStation/KLM_KpopUniverse](https://huggingface.co/SeoulStreamingStation/KLM_KpopUniverse) |
| **Legacy Core V1.5** | `32 kHz` | `HiFi-GAN` | `contentvec` | [sxndypz/legacy-core-1.5](https://huggingface.co/sxndypz/legacy-core-1.5/tree/main) |
| **Legacy Core V1.5** | `40 kHz` | `HiFi-GAN` | `contentvec` | [sxndypz/legacy-core-1.5](https://huggingface.co/sxndypz/legacy-core-1.5/tree/main) |
| **Legacy Core V1.5v2** | `32 kHz` | `HiFi-GAN` | `contentvec` | [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) |
| **Legacy Core V1.6** | `32 kHz` | `HiFi-GAN` | `contentvec` | [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) |
| **Mandagues V2** | `40 kHz` | `HiFi-GAN` | `contentvec` | [juaow/mandaguesv2](https://huggingface.co/juaow/mandaguesv2) |
| **Nanashi Anime v1** | `32 kHz` | `HiFi-GAN` | `Japanese HuBERT` | [v1_anime](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1_anime) · [AI Hub](https://discord.com/channels/1159260121998827560/1235952130855010365) |
| **Nanashi v1** *(v1.7)* | `32 kHz` | `HiFi-GAN` | No especificado | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nanashi v2 Beta** *(Base / Fine-tuned)* | `32 kHz` | `HiFi-GAN` | No especificado | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nezox** | `32 kHz` | `HiFi-GAN` | No especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Ov2Super** | `32 kHz` | `HiFi-GAN` | `contentvec` | [poiqazwsx/Ov2Super32kfix](https://huggingface.co/poiqazwsx/Ov2Super32kfix) |
| **PaBP** | `32 kHz` | `HiFi-GAN` | No especificado | [Razer112/pabp-v.5](https://huggingface.co/Razer112/pabp-v.5) |
| **RefGanVCTKV2** | `32 kHz`, `40 kHz` | `RefineGAN` | `contentvec` | [SimplCup/RefGanVCTKV2](https://huggingface.co/SimplCup/RefGanVCTKV2) |
| **RefineGAN Base Pretrains (Exp v3)** | `32 kHz` | `RefineGAN` | `contentvec` / `spin-v2` | [Aznamir/RefineGAN](https://huggingface.co/Aznamir/RefineGAN) |
| **RefineGanVCTKV1** | `44.1 kHz` | `RefineGAN` | `contentvec` | [SimplCup/RefineGanVCTKV1](https://huggingface.co/SimplCup/RefineGanVCTKV1) |
| **Rigel** *(Base / Fine-tuned)* | `32 kHz`, `40 kHz` | `HiFi-GAN` | No especificado | [MUSTAR/Rigel-rvc-base-pretrained-model](https://huggingface.co/MUSTAR/Rigel-rvc-base-pretrained-model) · [Politrees](https://huggingface.co/Politrees/RVC_resources) |
| **RIN_E3** | `40 kHz` | `HiFi-GAN` | No especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **SingerPreTrain** *(Updated)* | `32 kHz` | `HiFi-GAN` | `contentvec` | [Sztef/SingerPreTrained](https://huggingface.co/Sztef/SingerPreTrained) |
| **Snowie** | `40 kHz` | `HiFi-GAN` | No especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie V2** | `40 kHz`, `48 kHz` | `HiFi-GAN` | No especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie V3.1** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | No especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie × RIN** | `40 kHz` | `HiFi-GAN` | No especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Titan** *(Medium)* | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | `contentvec` | [blaise-tk/TITAN](https://huggingface.co/blaise-tk/TITAN) |
| **UKA** | `32 kHz` | `HiFi-GAN` | No especificado | [Plasmati/Pretrains](https://huggingface.co/Plasmati/Pretrains) |
| **UKR** | `32 kHz` | `HiFi-GAN` | No especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **VocalCore** y **VocalCore Try3b** | `48 kHz` | `HiFi-GAN` | No especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |

> **Nota de compatibilidad**: en Ilaria RVC el entrenamiento con RefineGAN solo está soportado específicamente a `32 kHz` con RVC v2 y guía de tono. Elegir un pretrain RefineGAN de `40 kHz` o `44.1 kHz` configurando el entrenamiento en `32 kHz` fallará o producirá un resultado roto.

!!!note
**Nota sobre Legacy Core (`V1.5`, `V1.5v2` y `V1.6`):**
- **Legacy Core V1.5** (`32 kHz`, `40 kHz`): [sxndypz/legacy-core-1.5](https://huggingface.co/sxndypz/legacy-core-1.5/tree/main). Disponible en la copia enlazada. La fuente original `lyery/mode4` se retiró del descargador de Ilaria RVC en la versión 2.4.4.
- **Legacy Core V1.5v2** y **Legacy Core V1.6** (`32 kHz`) vuelven a estar disponibles con el consentimiento del autor original en [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) y se restauraron en Ilaria RVC `2.4.7`.
- **Importante para Legacy Core V1.6**: en el repositorio de resubida los nombres **G** y **D** están **invertidos** (`D_LegacyCoreOld.pth` es **G** y `G_LegacyCoreOld.pth` es **D**). Asegúrate de cargar cada archivo en la ranura correcta.
!!!
