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

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · RefineGAN admite entrenamiento e inferencia a 32, 40 y 44,1 kHz con RVC v2 y Pitch Guidance. La aplicación genera automáticamente el audio silencioso de 44,1 kHz. Selecciona **None** para entrenar desde cero si los pesos usan otra arquitectura, como en los pares probados KLM 5 (40 kHz) y VCTK (44,1 kHz).

!!!note
**Nota sobre Legacy Core (`V1.5`, `V1.5v2` y `V1.6`):**
- **Legacy Core V1.5** (`32 kHz`, `40 kHz`): [sxndypz/legacy-core-1.5](https://huggingface.co/sxndypz/legacy-core-1.5/tree/main).
- **Legacy Core V1.5v2** y **Legacy Core V1.6** (`32 kHz`) vuelven a estar disponibles con el consentimiento del autor original en [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) y se restauraron en Ilaria RVC `2.4.7`.
- **Ilaria RVC 2.4.8** añade Legacy Core V1.5 a 32 y 40 kHz al gestor de descargas. Las cuatro opciones Legacy Core usan `HiFi-GAN` + `ContentVec`. [Notas de la versión](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.4.8)
!!!

## Pares adicionales

| Modelo | Frecuencias de muestreo | Vocoder | Embedder | Fuente |
| --- | --- | --- | --- | --- |
| **Stock RVC v1 · F0** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN NSF` | `HuBERT Base · 256` | [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main/pretrained) |
| **Stock RVC v1 · No F0** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | `HuBERT Base · 256` | [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main/pretrained) |
| **Stock RVC v2 · No F0** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | `HuBERT Base · 768` | [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main/pretrained_v2) |
| **Aurora v2** | `48 kHz` | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/48k/Aurora) |
| **Sench Pretrain** | `48 kHz` | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/Shashashasha/Sench_Pretrain_48k_RVC) |
| **RingFormer v1** | `40 kHz` | `RingFormer` | `SPIN v2` | [Hugging Face](https://huggingface.co/its5Q/rvc-ringformer-pretrain) |
| **Applio RefineGAN (DMS)** | `24 kHz`, `32 kHz` | `RefineGAN` | Sin confirmar | [Hugging Face](https://huggingface.co/DanielMarius/dms-applio-refinegan-pretrained) |
| **DMR v0.5 / v0.8 / v1** | `32 kHz` | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/DMR) |
| **Nanashi v1** | `32 kHz` | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1) |
| **Nanashi v1.5** | `32 kHz` | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1.5) |
| **Nanashi v1.5 Rigel** | `32 kHz` | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1.5_Rigel_Version) |
| **Nanashi Anime Normal** | `32 kHz` | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1_anime/normal) |
| **Nanashi Anime Resized** | `32 kHz` | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/shiromiya/nanashi-pretrain/tree/main/v1_anime/resized) |
| **SingerPreTrain v1** | `32 kHz` | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/Singer) |
| **Snowie v3.1 · Japanese HuBERT** | Sin confirmar | Sin confirmar | `Japanese HuBERT` | [Hugging Face](https://huggingface.co/MUSTAR/Snowie_V3.1_pretrain_on_JPhubert) |
| **Snowie RuPretrain · No F0** | `40 kHz` | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/MUSTAR/Snowie_RuPretrain_noP_40k) |
| **Snowie v3 × RIN E3** | `40 kHz` | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/MUSTAR/SnowieV3-X-RINE3-40K) |
| **Ov2Super · F0** | `40 kHz` | `HiFi-GAN` | Sin confirmar | [Hugging Face](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/40k/Ov2) |

## Variantes KLM

| Modelo | Frecuencias de muestreo | Vocoder | Embedder | Fuente |
| --- | --- | --- | --- | --- |
| **KLM 4.0** | `32 kHz`, `40 kHz`, `48 kHz` | Sin confirmar | Sin confirmar | [32 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/KLM) · [40 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/40k/KLM) · [48 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/48k/KLM) |
| **KLM 4.1** | `32 kHz`, `48 kHz` | Sin confirmar | Sin confirmar | [32 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/KLM) · [48 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/48k/KLM) |
| **KLM 4.1 T2** | `32 kHz` | Sin confirmar | Sin confirmar | [32 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/KLM) |
| **KLM 4.2 T1** | `32 kHz`, `40 kHz` | Sin confirmar | Sin confirmar | [32 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/KLM) · [40 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/40k/KLM) |
| **KLM 4.2 T2 / T3 / T4** | `40 kHz` | Sin confirmar | Sin confirmar | [40 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/40k/KLM) |
| **KLM 4.2 X10** | `32 kHz` | Sin confirmar | Sin confirmar | [32 kHz](https://huggingface.co/Politrees/RVC_resources/tree/main/pretrained/v2/32k/KLM) |
| **KLM 4.3 X1 / X2** | `32 kHz` | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM43) |
| **KLM 4.3 X3 / X4** | `32 kHz`, `40 kHz`, `48 kHz` | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM43) |
| **KLM 4.4 X1 / X2 / X2B** | `32 kHz` | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM4.4) |
| **KLM 4.4 X1 MRF / X2 MRF** | `40 kHz` | `MRF HiFi-GAN` | Sin confirmar | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM4.4) |
| **KLM 6 Experimental 1** | `32 kHz`, `48 kHz` | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM 6 Experimental 2** | `32 kHz`, `40 kHz` | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM 6 Experimental 3 L6** | `32 kHz` | `HiFi-GAN` | `SPIN (7–12)` | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM 6.1 Dev / Dev Ranger25** | `48 kHz` | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM-X1 / KLM-HF Mini T** | `32 kHz` | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM_RVC_KLM-HF_Trainer) |
| **KLM RVC PT / RVC OG** | `32 kHz`, `40 kHz`, `48 kHz` | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/SeoulStreamingStation/KLM_RVC_KLM-HF_Trainer) |
| **KLM 9 HFG** | `32 kHz` | `HiFi-GAN` | Sin confirmar | [Hugging Face](https://huggingface.co/SeoulStreamingStation/RVC_KLM9_HFG_PretrainModel) |
| **KLM X 10.0** | `32 kHz` | `HiFi-GAN` | Sin confirmar | [Hugging Face](https://huggingface.co/SeoulStreamingStation/RVC_KLM-X-10_Pretrained-Model) |
| **KLM - BeatzForge V2** | `32 kHz` | No especificado | No especificado | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) · [AI Hub](https://discord.com/channels/1159260121998827560/1235952130855010365) |
| **KLM - BeatzForge V1** | `48 kHz` | `HiFi-GAN` | No especificado | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) |
| **KLM BeatMaster V1** | `48 kHz` | No especificado | No especificado | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) |
| **KLM 4 HiFi-GAN** | `32 kHz`, `40 kHz`, `48 kHz` | `HiFi-GAN` | No especificado | [SeoulStreamingStation/KLM49_HFG](https://huggingface.co/SeoulStreamingStation/KLM49_HFG) · [AI Hub](https://discord.com/channels/1159260121998827560/1235952130855010365) |
| **KLM 5 RefineGAN** | `32 kHz`, `40 kHz` | `RefineGAN` | No especificado | [SeoulStreamingStation/KLM5](https://huggingface.co/SeoulStreamingStation/KLM5) |
| **KLM KpopUniverse (I / II)** | `32 kHz`, `40 kHz`, `48 kHz` | No especificado | No especificado | [SeoulStreamingStation/KLM_KpopUniverse](https://huggingface.co/SeoulStreamingStation/KLM_KpopUniverse) |

## Pares de Convbased Studio

| Modelo | Frecuencias de muestreo | Vocoder | Embedder | Fuente |
| --- | --- | --- | --- | --- |
| **Convbased HiFi-GAN NSF · ContentVec** | `48 kHz` | `HiFi-GAN NSF` | `ContentVec` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/contentvec/HiFiGAN/476sid) |
| **Convbased SiFi-GAN · ContentVec** | `48 kHz` | `SiFi-GAN` | `ContentVec` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/contentvec/SiFiGAN) |
| **Convbased BigVGAN · ContentVec** | `40 kHz` | `BigVGAN` | `ContentVec` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/contentvec/BigVGAN) |
| **Convbased HiFi-GAN NSF · SPIN** | `48 kHz` | `HiFi-GAN NSF` | `SPIN` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/spin/HiFiGAN) |
| **Convbased SiFi-GAN · SPIN** | `48 kHz` | `SiFi-GAN` | `SPIN` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/spin/SiFiGAN) |
| **Convbased BigVGAN · SPIN v2** | `40 kHz` | `BigVGAN` | `SPIN v2` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/spin-v2/BigVGAN) |
| **Convbased HiFi-GAN NSF · Chinese HuBERT Base** | `48 kHz` | `HiFi-GAN NSF` | `Chinese HuBERT Base` | [Hugging Face](https://huggingface.co/PluginsKers/Convbased-Studio/tree/main/chinese-hubert-base/HiFiGAN) |

## Archivos experimentales e históricos

| Modelo | Frecuencias de muestreo | Vocoder | Embedder | Fuente |
| --- | --- | --- | --- | --- |
| **7subpretrain** | `40 kHz` | Sin confirmar | Sin confirmar | [Hugging Face · ZIP](https://huggingface.co/makiligon/rvc-sub-pretrain-moment/blob/main/7subpretrain40k.zip) |
| **Genshin EN Pretrain** | `32 kHz`, `40 kHz` | Sin confirmar | Sin confirmar | [Hugging Face · 32 kHz ZIP](https://huggingface.co/makiligon/rvc-sub-pretrain-moment/blob/main/GenshinENPretrain32K.zip) · [Hugging Face · 40 kHz ZIP](https://huggingface.co/makiligon/rvc-sub-pretrain-moment/blob/main/GenshinENPretrain40K.zip) |
| **SingingPretrain** | Sin confirmar | Sin confirmar | Sin confirmar | [Hugging Face · ZIP](https://huggingface.co/makiligon/rvc-sub-pretrain-moment/blob/main/SingingPretrain.zip) |
| **DeepFake Audio Rangers Pretrain** | Sin confirmar | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/DeepFake-Audio-Rangers/rvc_pretrain) |
| **RVC v2 Pretrain Voice** | Sin confirmar | Sin confirmar | Sin confirmar | [Hugging Face](https://huggingface.co/Coolwowsocoolwow/RVC_V2_Pretrain_Voice) |
| **RingFormer v2 · failed** | `40 kHz` | `RingFormer v2` | `SPIN v2` | [Hugging Face](https://huggingface.co/its5Q/rvc-ringformer-v2-pretrain/tree/main/failed) |

El listado confirma la disponibilidad. Respeta la arquitectura, el modo de tono y el encoder de cada par. La procedencia y la licencia del RefineGAN de DMS siguen sin verificar. KLM X 10.0 requiere KLM Trainer 0.5.0 y declara CC BY-NC 2.0. El contenido de los ZIP y los permisos de los datos siguen sin verificar. RingFormer v2 figura en la carpeta de checkpoints fallidos.
