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
| **Stock RVC v2 (Predefinito)** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN | `contentvec` | **Consigliato (Stock RVC)** |
| **AnimePretrain** | `32 kHz` | HiFi-GAN | Non specificato | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **DMR v2** | `32 kHz` | HiFi-GAN | Non specificato | [ourbz/DMR-V2-ReUpload](https://huggingface.co/ourbz/DMR-V2-ReUpload) |
| **GuideVocalPretrain** | `48 kHz` | HiFi-GAN | Non specificato | [Essid/GuideVocalPretrain](https://huggingface.co/Essid/GuideVocalPretrain) |
| **IMA** | `32 kHz` | HiFi-GAN | Non specificato | [Loren85/IMA-TEST-V1](https://huggingface.co/Loren85/IMA-TEST-V1) |
| **Itaila** | `32 kHz` | HiFi-GAN | `contentvec` | [TheStinger/itaila](https://huggingface.co/TheStinger/itaila) |
| **KLM - BeatzForge V2 / BeatMaster** | `32 kHz`, `48 kHz` | HiFi-GAN / Non specificato | Non specificato | [SeoulStreamingStation/KLM_BEATMASTER](https://huggingface.co/SeoulStreamingStation/KLM_BEATMASTER) |
| **KLM 4 / 4.1 / 4.2 / 4.3** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN / Non specificato | Non specificato | [SeoulStreamingStation/KLM49_HFG](https://huggingface.co/SeoulStreamingStation/KLM49_HFG), [KLM4](https://huggingface.co/SeoulStreamingStation/KLM4), [KLM4.1](https://huggingface.co/SeoulStreamingStation/KLM4.1), [KLM4.2](https://huggingface.co/SeoulStreamingStation/KLM4.2), [KLM43](https://huggingface.co/SeoulStreamingStation/KLM43) |
| **KLM 4.4 (X1 / X2 / X2B)** | `32 kHz`, `40 kHz` | MRF HiFi-GAN / Non specificato | Non specificato | [SeoulStreamingStation/KLM4.4](https://huggingface.co/SeoulStreamingStation/KLM4.4) *(compatibilità variabile)* |
| **KLM 5 RefineGAN** | `32 kHz`, `40 kHz` | RefineGAN | Non specificato | [SeoulStreamingStation/KLM5](https://huggingface.co/SeoulStreamingStation/KLM5) |
| **KLM 6 Experimental (6.1 / 6.2 / Exp / Dev)** | `32 kHz`, `40 kHz`, `48 kHz` | Non specificato | Non specificato | [SeoulStreamingStation/KLM6_Experimental](https://huggingface.co/SeoulStreamingStation/KLM6_Experimental) |
| **KLM 9 HFG / KLM-X / KLM-HF Trainer / RVC OG** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN / Non specificato | Non specificato | [SeoulStreamingStation/RVC_KLM9_HFG_PretrainModel](https://huggingface.co/SeoulStreamingStation/RVC_KLM9_HFG_PretrainModel), [RVC_KLM-X-10_Pretrained-Model](https://huggingface.co/SeoulStreamingStation/RVC_KLM-X-10_Pretrained-Model), [KLM_RVC_KLM-HF_Trainer](https://huggingface.co/SeoulStreamingStation/KLM_RVC_KLM-HF_Trainer) |
| **KLM KpopUniverse (I / II) & BlackTone** | `32 kHz`, `40 kHz`, `48 kHz` | Non specificato | Non specificato | [SeoulStreamingStation/KLM_KpopUniverse](https://huggingface.co/SeoulStreamingStation/KLM_KpopUniverse), [BlackTone_RVC_Pretrained](https://huggingface.co/SeoulStreamingStation/BlackTone_RVC_Pretrained) |
| **Legacy Core V1.5** *(rimosso in 2.4.4)* | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN / RefineGAN 32k | `contentvec` / `spin-v2` 32k | `lyery/mode4` *(rimosso dall'autore)* |
| **Legacy Core V1.5v2** *(rimosso in 2.4.4)* | `32 kHz` | HiFi-GAN | `contentvec` | `lyery/test` *(rimosso dall'autore)* |
| **Legacy Core V1.6** *(rimosso)* | `32 kHz` | HiFi-GAN | `contentvec` | `lyery` *(rimosso dall'autore)* |
| **Mandagues V2** | `40 kHz` | HiFi-GAN | Non specificato | [juaow/mandaguesv2](https://huggingface.co/juaow/mandaguesv2) |
| **Nanashi Anime** *(Normal)* | `32 kHz` | HiFi-GAN | Non specificato | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nanashi v1** *(v1.7)* | `32 kHz` | HiFi-GAN | Non specificato | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nanashi v2 Beta** *(Base / Fine-tuned)* | `32 kHz` | HiFi-GAN | Non specificato | [shiromiya/nanashi-pretrain](https://huggingface.co/shiromiya/nanashi-pretrain) |
| **Nezox** | `32 kHz` | HiFi-GAN | Non specificato | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Ov2Super** | `32 kHz` | Non specificato | Non specificato | [poiqazwsx/Ov2Super32kfix](https://huggingface.co/poiqazwsx/Ov2Super32kfix) |
| **PaBP** | `32 kHz` | HiFi-GAN | Non specificato | [Razer112/pabp-v.5](https://huggingface.co/Razer112/pabp-v.5) |
| **RefGanVCTKV2** | `32 kHz`, `40 kHz` | RefineGAN | Non specificato | [SimplCup/RefGanVCTKV2](https://huggingface.co/SimplCup/RefGanVCTKV2) |
| **RefineGAN Base Pretrains (Exp v3)** | `32 kHz` | RefineGAN | `contentvec` / `spin-v2` | [Aznamir/RefineGAN](https://huggingface.co/Aznamir/RefineGAN) |
| **RefineGanVCTKV1** | `44.1 kHz` | RefineGAN | Non specificato | [SimplCup/RefineGanVCTKV1](https://huggingface.co/SimplCup/RefineGanVCTKV1) |
| **Rigel** *(Base / Fine-tuned)* | `32 kHz` | Non specificato | Non specificato | [MUSTAR/Rigel-rvc-base-pretrained-model](https://huggingface.co/MUSTAR/Rigel-rvc-base-pretrained-model) |
| **RIN_E3** | `40 kHz` | HiFi-GAN | Non specificato | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **SingerPreTrain** *(Updated)* | `32 kHz` | HiFi-GAN | Non specificato | [Sztef/SingerPreTrained](https://huggingface.co/Sztef/SingerPreTrained) |
| **Snowie** | `40 kHz` | HiFi-GAN | Non specificato | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie V2** | `40 kHz`, `48 kHz` | HiFi-GAN | Non specificato | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie V3.1** | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN | Non specificato | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Snowie × RIN** | `40 kHz` | HiFi-GAN | Non specificato | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **Titan** *(Medium)* | `32 kHz`, `40 kHz`, `48 kHz` | HiFi-GAN | Non specificato | [blaise-tk/TITAN](https://huggingface.co/blaise-tk/TITAN) |
| **UKA** | `32 kHz` | HiFi-GAN | Non specificato | [Plasmati/Pretrains](https://huggingface.co/Plasmati/Pretrains) |
| **UKR** | `32 kHz` | HiFi-GAN | Non specificato | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |
| **VocalCore** e **VocalCore Try3b** | `48 kHz` | HiFi-GAN | Non specificato | [Politrees/RVC_resources](https://huggingface.co/Politrees/RVC_resources) |

> **Nota di compatibilità**: in Ilaria RVC il training con RefineGAN è supportato specificamente a `32 kHz` con RVC v2 e pitch guidance. Scegliere un pretrain RefineGAN a `40 kHz` o `44.1 kHz` impostando il training a `32 kHz` causerà errori o un risultato inutilizzabile.

!!!note
**Nota sui Legacy Core (`V1.5`, `V1.5v2` e `V1.6`):**
I modelli pretrained **Legacy Core** (`lyery/mode4` e `lyery/test`) sono stati **rimossi dall'autore** e non sono più scaricabili (rimossi anche dal downloader di Ilaria RVC nella `2.4.4`). Le voci in tabella restano **a solo scopo informativo**; solo eventuali pesi già scaricati in precedenza possono essere usati per il training.
!!!
