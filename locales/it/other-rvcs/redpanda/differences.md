---
label: "Redpanda-vc vs altre versioni RVC"
icon: ":scales:"
order: 96
permalink: /ilaria-rvc/redpanda/comparison/
description: "Confronto verificato sul codice tra Redpanda-vc, RVC Mainline, Applio e Ilaria RVC: Generator EMA, checkpoint per step, Rectified Flow, Beatrice 2, training vocoder, realtime e compatibilità."
---
# Redpanda-vc vs Altre Versioni RVC - Confronto Completo delle Funzionalità

[Configurare Redpanda-vc](first-run.md) · [Addestrare modelli RVC (EMA e Step)](training.md) · [Testare l'audio dal vivo](live-audio.md)

Questa guida confronta **Redpanda-vc** direttamente con **RVC Mainline**, **Applio** e **Ilaria RVC** analizzando il codice sorgente sui rispettivi branch `main`.

---

## Cosa rende diverso Redpanda-vc?

Per chi si avvicina per la prima volta alla conversione vocale AI, questi programmi **non** sono versioni successive dello stesso software, ma progetti correlati con obiettivi diversi:

- **RVC:** Una famiglia di tecniche e modelli per la conversione vocale (Retrieval-based Voice Conversion).
- **RVC Mainline:** L'implementazione originale di riferimento (`RVC-Project/Retrieval-based-Voice-Conversion-WebUI`).
- **Applio:** Un'applicazione molto diffusa che amplia interfaccia WebUI, vocoder e strumenti attorno a RVC.
- **Redpanda-vc:** Un fork di **Applio** (`redpanda343/Redpanda-vc`) che aggiunge Generator EMA, salvataggio dei checkpoint per step in RVC, training/inference **Rectified Flow**, training/realtime **Beatrice 2** e **training dedicato dei vocoder**.
- **Ilaria RVC:** Un'implementazione personalizzata basata su RVC Mainline (`TheStingerX/Ilaria-RVC`) con propria pipeline di inferenza, `Training Target: Steps`, supporto RefineGAN/MRF HiFi-GAN, Audio Analyzer, Voice Blender e strumenti TTS.

Un fork **non** è automaticamente migliore dell'originale sotto ogni aspetto: ciascun progetto bilancia diversamente semplicità, stabilità, compatibilità dei modelli e architetture extra.

---

## Panoramica delle differenze principali

Le etichette nella tabella riflettono l'analisi diretta dei branch `main` (commit indicati in [Fonti e riferimenti tecnici](#fonti-e-riferimenti-tecnici)):

| Funzionalità | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **RVC V1** | **Yes** | **Different implementation** *(UI orientata a `RVC (V2)` e `Applio`)* | **Yes** | **Yes** |
| **RVC V2** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Training RVC** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Training basato su epoche** | **Yes** | **Yes** | **Different implementation** *(obiettivo in step)* | **Yes** |
| **Training con obiettivo in step** | **No - verified** | **No - verified** | **Yes** (`Total Steps`) | **Yes** (`Training Target: Steps`) |
| **Checkpoint a intervalli di epoche** | **Yes** | **Yes** (`save_every_epoch`) | **No - verified** *(usa intervalli di step)* | **Yes** (`save_every_epoch`) |
| **Checkpoint a intervalli di step** | **No - verified** | **No - verified** | **Yes** (`Save Every X Steps`) | **No - verified** *(salva a epoche; epoca parziale su stop/step finale)* |
| **EMA del generatore** | **No - verified** | **No - verified** | **Yes** (`GeneratorEMA`) | **No - verified** |
| **Ripresa del training (`G`/`D`)** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Esportazione `.pth` intermedi** | **Yes** | **Yes** (`save_every_weights`) | **Yes** (`Save Every Weights`) | **Yes** *(a epoche intere `save_every_epoch`)* |
| **Training Rectified Flow** | **No - verified** | **No - verified** | **Yes** | **No - verified** |
| **Training Beatrice 2** | **No - verified** | **No - verified** | **Yes** | **No - verified** *(Beatrice è solo pitch extractor F0)* |
| **Training dedicato dei vocoder** | **No - verified** | **No - verified** | **Yes** (`tabs/train/nsf_hifigan.py`) | **No - verified** |
| **HiFi-GAN** | **Yes** | **Yes** | **Yes** | **Yes** |
| **RefineGAN** | **No - verified** | **Yes** | **Yes** | **Yes** *(32 kHz v2 f0)* |
| **MRF HiFi-GAN** | **No - verified** | **Yes** | **Yes** | **Yes** *(v2 f0)* |
| **Pretrained personalizzati** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Warmup del learning rate** | **No - verified** | **No - verified** *(schedule fisso)* | **Yes** (`Warmup Steps`) | **No - verified** |
| **Learning rate scheduling** | **Different implementation** *(esponenziale per epoca)* | **Different implementation** *(esponenziale per epoca)* | **Yes** (`Exponential` / `Cosine`) | **Different implementation** *(esponenziale per epoca)* |
| **Controllo del batch** | **Yes** (`batch_size`) | **Yes** (`batch_size`) | **Yes** (`Batch Size` + `Max Audio per Batch`) | **Yes** (`batch_size`) |
| **Ottimizzazione VRAM** | **Different implementation** *(FP16, GPU cache)* | **Yes** (`Checkpointing`, GPU cache) | **Yes** (`Checkpointing`, GPU cache) | **Different implementation** *(FP16/BF16, GPU cache)* |
| **Feature extraction** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Pitch extraction (F0)** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Inferenza vocale (offline)** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Conversione real-time** | **Yes** | **Yes** | **Yes** | **No - verified** *(solo offline & batch)* |
| **GUI desktop realtime** | **Yes** (`realtime_gui.py`) | **Different implementation** *(Desktop / WebUI)* | **Yes** (`run-realtime-gui.bat`) | **No - verified** |
| **Realtime nel browser** | **No - verified** | **Yes** (`tabs/realtime`) | **Yes** (WebSocket + fallback HTTP) | **No - verified** |
| **Multi-GPU training** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Flussi realtime multi-GPU** | **No - verified** | **Not verified** | **Yes** *(1 GPU per flusso)* | **No - verified** |
| **Supporto multi-famiglia** | **No - verified** *(solo RVC)* | **Partial** *(RVC + Applio)* | **Yes** *(RVC + Rectified Flow + Beatrice)* | **No - verified** *(solo RVC)* |
| **Sistemi operativi** | Windows / Linux / macOS | Windows / Linux / macOS | Windows / Linux / macOS *(CUDA/MPS/CPU)* | Windows / Linux *(CUDA/DirectML/CPU)* |
| **Monitoraggio** | TensorBoard | TensorBoard + Overtraining Detector | TensorBoard | TensorBoard + Audio Analyzer + Training Previews |

---

## Generator EMA: Pesi Esportati Più Uniformi

I **weights (pesi)** sono i numeri interni del modello che cambiano dopo ogni batch di training. Poiché ogni batch contiene solo pochi esempi, i pesi correnti possono oscillare da uno step all'altro.

**EMA (Exponential Moving Average)** mantiene in memoria una media mobile separata dei pesi del generatore (distinta dai momenti interni di Adam). In `rvc/train/train.py`, Redpanda-vc implementa `GeneratorEMA`:

- Dopo ogni step dell'optimizer del generatore (su rank `0`), `GeneratorEMA.update()` aggiorna la media progressiva (escluso `enc_q`).
- **Generator EMA Decay** (`0`–`0.9999`, default `0.999`, step `0.0001`) regola la velocità della media; `0` disabilita EMA ed esporta i pesi correnti.
- Né **RVC Mainline**, né **Applio**, né **Ilaria RVC** includono `GeneratorEMA` nei rispettivi script di training verificati.

EMA può attenuare alcune oscillazioni nei pesi esportati, ma **non** garantisce qualità audio migliore, **non** elimina overfitting o casualità e **non** velocizza il training. Per la guida completa vedi [Addestrare modelli RVC in Redpanda-vc - EMA e Salvataggio per Step](training.md).

---

## Training Basato sugli Step e Salvataggi

Un'**epoca (epoch)** è un passaggio completo sul dataset preparato; uno **step** è un singolo aggiornamento dopo un batch. *(Esempio ipotetico: se un dataset produce 100 step per epoca, 1.000 step equivalgono a circa 10 epoche, ma il rapporto reale dipende da dataset e batch.)*

- **Redpanda-vc:** Usa **Total Steps** (default `10000`) e **Save Every X Steps** (default `1000`), salvando checkpoint `G`/`D` (ed export `.pth` con **Save Every Weights**) a intervalli esatti di step anche a metà epoca, più un **Final Save** obbligatorio allo step finale.
- **Applio e RVC Mainline:** Allenano a epoche e salvano a intervalli di **epoche** (`save_every_epoch`).
- **Ilaria RVC:** Dispone di **Training Target: Steps** (`ILARIA_RVC.py`, `train.py`) per fermarsi a un numero esatto di step, ma la frequenza di salvataggio conta comunque le **epoche** (`save_every_epoch`) e gli export intermedi `.pth` avvengono solo a epoche intere `epoch % save_every_epoch == 0` (non su `partial_epoch` a metà epoca), mentre lo stato resumable si salva a `save_every_epoch`, stop o `final_epoch`.

---

## Rectified Flow: Una Diversa Architettura di Conversione Vocale

**Rectified Flow** (`tabs/train/rectified_flow.py`, `rectified_flow/`) **non** è una variante di RVC V2:

- **Modello acustico:** Ispirato a **DiffSinger**, usa feature **ContentVec** al posto dei fonemi (`README.md`) per predire rappresentazioni mel-spectrogram.
- **Vocoder:** Un vocoder separato (`PC-NSF-HiFiGAN`, `NSF-HiFiGAN` o `Vocos`) converte il mel in audio.
- **Preset:** `standard`, `meanflow` (ispirato a MeanVC2) e `smaller`.
- **Compatibilità:** Anche se usa estensione `.pth`, un modello Rectified Flow **non** è un modello RVC V2 e non si carica in RVC Mainline, Applio, Ilaria RVC, Okada o Vonovox.

---

## Supporto Beatrice 2

**Beatrice** (`tabs/train/beatrice.py`, `beatrice/`, `beatrice/realtime.py`, basato su `beatrice-trainer`) è un'architettura separata ottimizzata per **CPU**:

- Esporta una cartella modello propria (non un `.pth` RVC) ed è supportata sia in training che in realtime (`run-realtime-gui.bat` e WebUI).
- **Non confonderlo con il pitch extractor:** Programmi come Ilaria RVC offrono `beatrice` solo come algoritmo F0 di estrazione del pitch, non come motore di training/conversione completo.

---

## Training Dedicato dei Vocoder

La scheda **Vocoder** (`tabs/train/nsf_hifigan.py`, `nsf_hifigan/`) permette di addestrare da zero o fare fine-tuning di **PC-NSF-HiFiGAN**, **NSF-HiFiGAN** e **Vocos** (24 kHz).

- Un modello acustico (es. Rectified Flow) predice i mel-spectrogram; il vocoder li trasforma in forma d'onda audio.
- Questa scheda è strettamente legata alle configurazioni mel di **Rectified Flow** (`check_registry_vocoder` / `mel_mismatch`): un vocoder addestrato qui non è automaticamente utilizzabile con qualsiasi modello RVC standard.

---

## Differenze nella Conversione in Tempo Reale

| Funzionalità Real-Time | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **GUI Desktop Realtime** | **Yes** (`realtime_gui.py`) | **Different implementation** | **Yes** (`run-realtime-gui.bat`, RVC + Beatrice + RF) | **No - verified** |
| **Realtime via Browser** | **No - verified** | **Yes** (`tabs/realtime`) | **Yes** (WebSocket binario + fallback HTTP) | **No - verified** |
| **Assegnazione Multi-GPU** | **No - verified** | **Not verified** | **Yes** (`Inference Device: Automatic` o GPU specifica) | **No - verified** |

In Redpanda-vc, due GPU possono gestire **due flussi realtime separati in parallelo** (un flusso per GPU per mantenere lo stato audio), ma non vengono unite per accelerare un singolo flusso. Il trasporto browser usa WebSocket binario (anche con `--share`) con code limitate e fallback automatico su HTTP streaming.

---

## Controlli Avanzati di Training

- **Dinamica di training:** `Learning Rate Schedule` (`Exponential` / `Cosine`), `Warmup Steps`, `Learning Rate Decay Every X Steps`, `Final Learning Rate`, `Reset Optimizer State`, `Max Audio per Batch (sec)`.
- **Memoria:** `Checkpointing` (activation checkpointing, ereditato da Applio) e `Cache Dataset in GPU`.
- **Salvataggi ed export:** `Save Every X Steps`, `Save Only Latest`, `Save Every Weights`, `Generator EMA Decay`.

I principianti non hanno bisogno di modificare schedule coseno o warmup al primo modello RVC.

---

## Compatibilità dei Modelli: Cosa Funziona Dove?

Condividere l'estensione `.pth` **non** rende due modelli compatibili tra architetture diverse:

| Tipo di modello | Redpanda-vc | RVC Mainline | Applio | Ilaria RVC | Altri client (Okada / Vonovox) |
| --- | --- | --- | --- | --- | --- |
| **RVC V1 (`.pth` inference)** | **Yes** | **Yes** | **Different implementation** | **Yes** | **Yes** *(client V1 standard)* |
| **RVC V2 HiFi-GAN (`.pth`)** | **Yes** | **Yes** | **Yes** | **Yes** | **Yes** |
| **RVC V2 RefineGAN (`.pth`)** | **Yes** | **No - verified** | **Yes** | **Yes** *(32 kHz)* | **No - verified** |
| **RVC V2 MRF HiFi-GAN (`.pth`)** | **Yes** | **No - verified** | **Yes** | **Yes** | **No - verified** |
| **Rectified Flow (`.pth`)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **No - verified** |
| **Beatrice 2 (cartella modello)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **Version-dependent** *(solo client/VST Beatrice)* |
| **Vocoder custom (`nsf_hifigan`)** | **Yes** *(per Rectified Flow)* | **No - verified** | **No - verified** | **No - verified** | **No - verified** |
| **Checkpoint training (`G_*`/`D_*`)** | **Yes** *(RVC)* | **Yes** *(RVC)* | **Yes** *(RVC)* | **Yes** *(RVC)* | **No - verified** |
| **File FAISS `.index`** | **Yes** *(stesso embedder/dim)* | **Yes** | **Yes** | **Yes** | **Yes** *(client RVC)* |

---

## Quale Versione RVC Scegliere?

- **RVC Mainline:** Per il workflow di riferimento originale e `realtime_gui.py` classico.
- **Applio:** Per un ambiente RVC completo con salvataggi per epoche, TTS e Overtraining Detector.
- **Redpanda-vc:** Per provare **Generator EMA**, **salvataggio per step**, **Rectified Flow**, **Beatrice 2**, **training dei vocoder** o **realtime WebSocket / multi-stream**.
- **Ilaria RVC:** Per uno studio RVC offline con `Training Target: Steps`, `Audio Analyzer`, `Voice Blender`, `RMVPE High Register` e `Proposed Pitch`.

---

## FAQ per Principianti

**Cos'è un fork di RVC?** Un progetto separato che parte da un codice RVC esistente aggiungendo o modificando funzionalità.
**Redpanda-vc è uguale ad Applio?** No, deriva da Applio ma aggiunge EMA, salvataggio per step, Rectified Flow, Beatrice 2 e training vocoder.
**Redpanda-vc produce modelli migliori?** Non automaticamente: conta soprattutto la qualità del dataset.
**Cos'è EMA?** Exponential Moving Average: media mobile dei pesi del generatore mantenuta durante il training.
**Perché salva per step?** Per salvare a intervalli fissi di aggiornamenti (es. ogni `1000` step) indipendentemente dalla lunghezza dell'epoca.
**Anche Ilaria RVC supporta il training per step?** Sì (`Training Target: Steps`), ma i salvataggi periodici contano comunque le epoche.
**Cos'è Rectified Flow?** Un'architettura acustica ispirata a DiffSinger basata su feature ContentVec e vocoder separato.
**Rectified Flow è uguale a RVC V2?** No, sono architetture incompatibili.
**Cos'è Beatrice?** Un motore di conversione vocale separato ottimizzato per CPU, diverso dall'uso del solo pitch extractor Beatrice.
**Cosa fa un vocoder?** Trasforma le feature acustiche (mel-spectrogram) in forma d'onda audio.
**Posso usare un modello Redpanda-vc in altri programmi?** I modelli **RVC V1/V2 HiFi-GAN** sì; **Rectified Flow**, **Beatrice**, **RefineGAN** e **MRF HiFi-GAN** richiedono client compatibili.
**Redpanda-vc allena modelli RVC normali?** Sì, nella scheda **Train → RVC**.
**Supporta il realtime?** Sì, sia da browser che con `run-realtime-gui.bat`.
**Il multi-GPU realtime accelera una singola voce?** No, permette più flussi simultanei su GPU separate.
**Cosa scegliere per iniziare?** **RVC** per la massima compatibilità; **Rectified Flow** o **Beatrice** solo se cerchi quei flussi specifici.
**Quali funzioni distinguono davvero Redpanda-vc tra questi quattro?** La combinazione di **Generator EMA**, **Save Every X Steps**, **Rectified Flow**, **Beatrice 2** e **training vocoder `nsf_hifigan`**.

---

## Fonti e riferimenti tecnici

Confronto verificato sui branch `main` il **2026-11-22**:

- **Redpanda-vc** (`55a3a80`, 2026-10-31): [Repository](https://github.com/redpanda343/Redpanda-vc) · [`tabs/train/train.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/tabs/train/train.py) · [`tabs/train/rvc.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/tabs/train/rvc.py) · [`rvc/train/train.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py) · [`rectified_flow/`](https://github.com/redpanda343/Redpanda-vc/tree/main/rectified_flow) · [`beatrice/`](https://github.com/redpanda343/Redpanda-vc/tree/main/beatrice) · [`nsf_hifigan/`](https://github.com/redpanda343/Redpanda-vc/tree/main/nsf_hifigan) · [`tabs/inference/realtime.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/tabs/inference/realtime.py) · [`realtime_gui.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/realtime_gui.py)
- **Applio** (`445b0f6`, 2026-11-19): [Repository](https://github.com/IAHispano/Applio) · [`tabs/train/train.py`](https://github.com/IAHispano/Applio/blob/main/tabs/train/train.py) · [`rvc/train/train.py`](https://github.com/IAHispano/Applio/blob/main/rvc/train/train.py) · [`tabs/realtime/`](https://github.com/IAHispano/Applio/tree/main/tabs/realtime)
- **RVC Mainline** (`81eed5e`, 2026-08-04): [Repository](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [`train/train.py`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/main/train/train.py) · [`realtime_gui.py`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/main/realtime_gui.py)
- **Ilaria RVC** (`a887ba5`, 2026-11-21): [Repository](https://github.com/TheStingerX/Ilaria-RVC) · [`app/ILARIA_RVC.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/main/app/ILARIA_RVC.py) · [`app/infer/modules/train/train.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/main/app/infer/modules/train/train.py)
