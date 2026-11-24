---
label: "🧱 Modelos pretrained"
order: 90
permalink: /pretrained/
description: "Um modelo base pretrained (ou pretrain) é um par de checkpoints iniciais: um Gerador (G_.pth) e um Discriminador (D_.pth), já treinados em centenas de horas de áudio multi-locutor."
---
# Modelos Base Pretrained do RVC

Um **modelo base pretrained** (ou **pretrain**) é um par de checkpoints iniciais: um **Gerador (`G_*.pth`)** e um **Discriminador (`D_*.pth`)**, já treinados em centenas de horas de áudio multi-locutor. Quando treinas uma nova voz RVC, o treino não começa do zero; em vez disso, faz **fine-tuning** deste par no dataset da tua voz alvo.

## O que fazem os pretrained e porque existem

Partir de um pretrain permite que o RVC aprenda uma nova voz em minutos ou horas em vez de semanas:

1. **O Gerador (`G`)** já sabe transformar características de conteúdo e pitch em fala ou canto natural.
2. **O Discriminador (`D`)** já sabe distinguir áudio realista de áudio artificial.
3. **O teu treino** adapta esses pesos existentes à tua voz alvo.

Cada par pretrained está preso a parâmetros arquiteturais específicos que **têm de coincidir exatamente com o teu treino**:
- **Sample rate** (`32 kHz`, `40 kHz`, `44.1 kHz` ou `48 kHz`)
- **Arquitetura vocoder** (`HiFi-GAN`, `RefineGAN` ou `MRF HiFi-GAN`)
- **Versão RVC e guia de pitch** (quase todos os pretrains da comunidade são RVC v2 com F0)
- **Embedder esperado** (normalmente `contentvec`, embora algumas variantes exijam `spin-v2`)

Se qualquer uma destas definições não coincidir, o treino falha imediatamente ou produz áudio fortemente distorcido.

---

## Modelos pretrained RVC conhecidos

> [!WARNING]
> **Apenas para fins informativos - utilização fortemente desaconselhada**
>
> Tudo o que está listado abaixo sobre modelos pretrained alternativos é **apenas para fins informativos**. **Recomendamos fortemente NÃO utilizar modelos pretrained alternativos**: as **definições stock do RVC** (pretrained RVC v2 HiFi-GAN predefinido) são a melhor e mais fiável escolha. Pretrains personalizados podem facilmente introduzir artefactos metálicos, instabilidade, overfitting ou má qualidade de conversão offline e online (ao vivo).

| Pretrained | Sample rate(s) | Vocoder | Embedder | Repositório / Fonte |
| --- | --- | --- | --- | --- |
| **Stock RVC v2 (Predefinido)** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN | `contentvec` | **Recomendado (Stock RVC)** |
| **AnimePretrain** | `32 kHz` | HiFi-GAN | Não especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **BlackTone** *(Standard / Large)* | `32 kHz` | Não especificado | Não especificado | [SeoulStreamingStation/BlackTone_RVC_Pretrained](https://huggingface.co/SeoulStreamingStation/BlackTone_RVC_Pretrained) |
| **DMR v2** | `32 kHz` | HiFi-GAN | Não especificado | [ourbz/DMR-V2-ReUpload](https://huggingface.co/ourbz/DMR-V2-ReUpload) |
| **GuideVocalPretrain** | `48 kHz` | HiFi-GAN | Não especificado | [Essid/GuideVocalPretrain](https://huggingface.co/Essid/GuideVocalPretrain) |
| **IMA** | `32 kHz` | HiFi-GAN | Não especificado | [Loren85/IMA-TEST-V1](https://huggingface.co/Loren85/IMA-TEST-V1) |
| **Itaila** | `32 kHz` | HiFi-GAN | `contentvec` | [TheStinger/itaila](https://huggingface.co/TheStinger/itaila) |
| **KLM - BeatzForge** *(V1 / V2)* | `32 kHz`, `48 kHz` | HiFi-GAN / Não especificado | Não especificado | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) |
| **KLM BeatMaster V1** | `48 kHz` | Não especificado | Não especificado | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) |
| **KLM 4 / 4.1 / 4.2 / 4.3** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN / Não especificado | Não especificado | [SeoulStreamingStation/KLM49_HFG](https://huggingface.co/SeoulStreamingStation/KLM49_HFG), [KLM4](https://huggingface.co/SeoulStreamingStation/KLM4), [KLM4.1](https://huggingface.co/SeoulStreamingStation/KLM4.1), [KLM4.2](https://huggingface.co/SeoulStreamingStation/KLM4.2), [KLM43](https://huggingface.co/SeoulStreamingStation/KLM43) |
| **KLM 4.4 (X1 / X2 / X2B)** | `32 kHz`, `40 kHz` | MRF HiFi-GAN / Não especificado | Não especificado | [SeoulStreamingStation/KLM4.4](https://huggingface.co/SeoulStreamingStation/KLM4.4) *(compatibilidade varia)* |
| **KLM 5 RefineGAN** | `32 kHz`, `40 kHz` | RefineGAN | Não especificado | [SeoulStreamingStation/KLM5](https://huggingface.co/SeoulStreamingStation/KLM5) |
| **KLM 6 Experimental (6.1 / 6.2 / Exp / Dev)** | `32 kHz`, `40 kHz`, `48 kHz` | Não especificado | Não especificado | [SeoulStreamingStation/KLM6_Experimental](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM 9 HFG** | `32 kHz` | HiFi-GAN | Não especificado | [SeoulStreamingStation/RVC_KLM9_HFG_PretrainModel](https://huggingface.co/SeoulStreamingStation/RVC_KLM9_HFG_PretrainModel) |
| **KLM-HF Trainer** | `32 kHz`, `40 kHz`, `48 kHz` | Não especificado | Não especificado | [SeoulStreamingStation/KLM_RVC_KLM-HF_Trainer](https://huggingface.co/SeoulStreamingStation/KLM_RVC_KLM-HF_Trainer) |
| **KLM-X** | `32 kHz` | HiFi-GAN | Não especificado | [SeoulStreamingStation/RVC_KLM-X-10_Pretrained-Model](https://huggingface.co/SeoulStreamingStation/RVC_KLM-X-10_Pretrained-Model) |
| **KLM KpopUniverse (I / II)** | `32 kHz`, `40 kHz`, `48 kHz` | Não especificado | Não especificado | [SeoulStreamingStation/KLM_KpopUniverse](https://huggingface.co/SeoulStreamingStation/KLM_KpopUniverse) |
| **Legacy Core V1.5** | `32 kHz` | HiFi-GAN | `contentvec` | [sxndypz/legacy-core-1.5](https://huggingface.co/sxndypz/legacy-core-1.5/tree/main) |
| **Legacy Core V1.5** | `40 kHz` | HiFi-GAN | `contentvec` | [sxndypz/legacy-core-1.5](https://huggingface.co/sxndypz/legacy-core-1.5/tree/main) |
| **Legacy Core V1.5v2** | `32 kHz` | HiFi-GAN | `contentvec` | [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) |
| **Legacy Core V1.6** | `32 kHz` | HiFi-GAN | `contentvec` | [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) |
| **Mandagues V2** | `40 kHz` | HiFi-GAN | `contentvec` | [juaow/mandaguesv2](https://huggingface.co/juaow/mandaguesv2) |
| **Nanashi Anime** *(Normal)* | `32 kHz` | HiFi-GAN | Não especificado | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nanashi v1** *(v1.7)* | `32 kHz` | HiFi-GAN | Não especificado | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nanashi v2 Beta** *(Base / Fine-tuned)* | `32 kHz` | HiFi-GAN | Não especificado | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nezox** | `32 kHz` | HiFi-GAN | Não especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Ov2Super** | `32 kHz` | HiFi-GAN | `contentvec` | [poiqazwsx/Ov2Super32kfix](https://huggingface.co/poiqazwsx/Ov2Super32kfix) |
| **PaBP** | `32 kHz` | HiFi-GAN | Não especificado | [Razer112/pabp-v.5](https://huggingface.co/Razer112/pabp-v.5) |
| **RefGanVCTKV2** | `32 kHz`, `40 kHz` | RefineGAN | `contentvec` | [SimplCup/RefGanVCTKV2](https://huggingface.co/SimplCup/RefGanVCTKV2) |
| **RefineGAN Base Pretrains (Exp v3)** | `32 kHz` | RefineGAN | `contentvec` / `spin-v2` | [Aznamir/RefineGAN](https://huggingface.co/Aznamir/RefineGAN) |
| **RefineGanVCTKV1** | `44.1 kHz` | RefineGAN | `contentvec` | [SimplCup/RefineGanVCTKV1](https://huggingface.co/SimplCup/RefineGanVCTKV1) |
| **Rigel** *(Base / Fine-tuned)* | `32 kHz` | Não especificado | Não especificado | [MUSTAR/Rigel-rvc-base-pretrained-model](https://huggingface.co/MUSTAR/Rigel-rvc-base-pretrained-model) |
| **RIN_E3** | `40 kHz` | HiFi-GAN | Não especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **SingerPreTrain** *(Updated)* | `32 kHz` | HiFi-GAN | `contentvec` | [Sztef/SingerPreTrained](https://huggingface.co/Sztef/SingerPreTrained) |
| **Snowie** | `40 kHz` | HiFi-GAN | Não especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie V2** | `40 kHz`, `48 kHz` | HiFi-GAN | Não especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie V3.1** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN | Não especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie × RIN** | `40 kHz` | HiFi-GAN | Não especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Titan** *(Medium)* | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN | `contentvec` | [blaise-tk/TITAN](https://huggingface.co/blaise-tk/TITAN) |
| **UKA** | `32 kHz` | HiFi-GAN | Não especificado | [Plasmati/Pretrains](https://huggingface.co/Plasmati/Pretrains) |
| **UKR** | `32 kHz` | HiFi-GAN | Não especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **VocalCore** e **VocalCore Try3b** | `48 kHz` | HiFi-GAN | Não especificado | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |

> **Nota de compatibilidade**: no Ilaria RVC o treino com RefineGAN é suportado especificamente a `32 kHz` com RVC v2 e guia de pitch. Escolher um pretrain RefineGAN de `40 kHz` ou `44.1 kHz` mantendo o treino em `32 kHz` irá falhar ou produzir resultados corrompidos.


!!!note
**Nota sobre os Legacy Core (`V1.5`, `V1.5v2` e `V1.6`):**
- **Legacy Core V1.5** (`32 kHz`, `40 kHz`): [sxndypz/legacy-core-1.5](https://huggingface.co/sxndypz/legacy-core-1.5/tree/main). Disponível através da cópia indicada. A fonte original `lyery/mode4` foi removida do descarregador do Ilaria RVC na versão 2.4.4.
- **Legacy Core V1.5v2** e **Legacy Core V1.6** (`32 kHz`) voltaram a estar disponíveis com o consentimento do autor original em [notiscBalbalEko/PretrainReupload](https://huggingface.co/notiscBalbalEko/PretrainReupload) e foram restaurados no Ilaria RVC `2.4.7`.
- **Importante para o Legacy Core V1.6**: no repositório de reupload, os nomes **G** e **D** estão **trocados** (`D_LegacyCoreOld.pth` é **G** e `G_LegacyCoreOld.pth` é **D**). Certifica-te de carregar cada ficheiro no campo certo.
!!!