---
label: "Redpanda-vc vs altre versioni RVC"
icon: ":scales:"
order: 96
permalink: /ilaria-rvc/redpanda/comparison/
description: "Confronto verificato sul codice tra Redpanda-vc, RVC Mainline, Applio e Ilaria RVC: Generator EMA, checkpoint per step, Rectified Flow, Beatrice 2, training vocoder, TTS, realtime e compatibilità."
---
# Redpanda-vc vs Altre Versioni RVC - Confronto Completo delle Funzionalità

[Configurare Redpanda-vc](first-run.md) · [Addestrare modelli RVC (EMA e Step)](training.md) · [Testare l'audio dal vivo](live-audio.md)

Questa guida confronta **Redpanda-vc** direttamente con **RVC Mainline**, **Applio** e **Ilaria RVC** mediante analisi statica del codice sorgente sui rispettivi branch `main` (senza eseguire benchmark audio dal vivo o test hardware multi-OS).

---

## Cosa rende diverso Redpanda-vc?

Se ti avvicini per la prima volta alla conversione vocale AI, è utile sapere che questi programmi **non** sono versioni successive della stessa applicazione, ma progetti correlati con obiettivi diversi:

- **RVC:** Una famiglia di architetture e modelli per la conversione vocale (Retrieval-based Voice Conversion).
- **RVC Mainline:** L'implementazione originale di riferimento (`RVC-Project/Retrieval-based-Voice-Conversion-WebUI`).
- **Applio:** Un'applicazione RVC molto diffusa che amplia la WebUI, i vocoder, il TTS e gli strumenti attorno a RVC.
- **Redpanda-vc:** Un fork di **Applio** (`redpanda343/Redpanda-vc`) che aggiunge Generator EMA, salvataggio dei checkpoint RVC basato sugli step, training/inference **Rectified Flow**, training/realtime **Beatrice 2** e **training dedicato dei vocoder**.
- **Ilaria RVC:** Un'implementazione personalizzata basata su RVC Mainline (`TheStingerX/Ilaria-RVC`) con propria pipeline di inferenza, `Training Target: Steps`, supporto RefineGAN/MRF HiFi-GAN nella UI, Audio Analyzer, Voice Blender e strumenti TTS.

Un fork **non** è automaticamente migliore dell'originale sotto ogni aspetto: ciascun progetto bilancia diversamente semplicità, stabilità, compatibilità dei modelli e architetture extra.

*(Termini rapidi per principianti: **Inference** significa convertire audio usando un modello già addestrato; **CLI** significa eseguire comandi da terminale anziché cliccare pulsanti nella **WebUI**; un **vocoder** trasforma le feature acustiche in forma d'onda udibile; un **decoder** è la parte di un programma che sa leggere una specifica architettura di modello.)*

---

## Panoramica delle differenze principali

Le etichette di stato qui sotto riflettono l'ispezione statica del codice sorgente sul branch `main` di ciascun repository (commit elencati in [Fonti e riferimenti tecnici](#fonti-e-riferimenti-tecnici)):

| Funzionalità | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **RVC V1** | **Sì** | **Inferenza V1 supportata; la UI di training attuale è focalizzata su V2** | **Sì** | **Sì** |
| **RVC V2** | **Sì** | **Sì** | **Sì** | **Sì** |
| **Training RVC** | **Sì** | **Sì** | **Sì** | **Sì** |
| **Training basato su epoche** | **Sì** | **Sì** | **Implementazione differente** *(con obiettivo in step)* | **Sì** |
| **Training con obiettivo in step** | **No - verificato** | **No - verificato** | **Sì** (`Total Steps`) | **Sì** (`Training Target: Steps`) |
| **Checkpoint a intervalli di epoche** | **Sì** | **Sì** (`save_every_epoch`) | **No - verificato** *(usa intervalli di step)* | **Sì** (`save_every_epoch`) |
| **Checkpoint a intervalli di step** | **No - verificato** | **No - verificato** | **Sì** (`Save Every X Steps`) | **No - verificato** *(salva per epoche; epoca parziale su stop/step finale)* |
| **EMA del generatore** | **No - verificato** | **No - verificato** | **Sì** (`GeneratorEMA`) | **No - verificato** |
| **Ripresa del training (`G`/`D`)** | **Sì** | **Sì** | **Sì** | **Sì** |
| **Esportazione `.pth` intermedi** | **Sì** | **Sì** (`save_every_weights`) | **Sì** (`Save Every Weights`) | **Sì** *(ai confini completi di `save_every_epoch`)* |
| **Training Rectified Flow** | **No - verificato** | **No - verificato** | **Sì** | **No - verificato** |
| **Training Beatrice 2** | **No - verificato** | **No - verificato** | **Sì** | **No - verificato** *(Beatrice è solo estrattore F0)* |
| **Training dedicato dei vocoder** | **No - verificato** | **No - verificato** | **Sì** (`tabs/train/nsf_hifigan.py`) | **No - verificato** |
| **HiFi-GAN** | **Sì** | **Sì** | **Sì** | **Sì** |
| **RefineGAN** | **No - verificato** | **Sì** | **Sì** | **Sì** *(32 kHz v2 f0)* |
| **MRF HiFi-GAN** | **No - verificato** | **Supportato nel codice / CLI; non selezionabile nella WebUI di training standard** | **Supportato nel codice / CLI; non selezionabile nella WebUI di training standard** | **Sì** *(selezionabile nella WebUI di training, v2 f0)* |
| **Pretrained personalizzati** | **Sì** | **Sì** | **Sì** | **Sì** |
| **Warmup del learning rate** | **No - verificato** | **No - verificato** *(schedule fisso)* | **Sì** (`Warmup Steps`) | **No - verificato** |
| **Learning rate scheduling** | **Implementazione differente** *(esponenziale per epoca)* | **Implementazione differente** *(esponenziale per epoca)* | **Sì** (`Exponential` / `Cosine`) | **Implementazione differente** *(esponenziale per epoca)* |
| **Controllo del batch** | **Sì** (`batch_size`) | **Sì** (`batch_size`) | **Sì** (`Batch Size` + `Max Audio per Batch`) | **Sì** (`batch_size`) |
| **Ottimizzazione della VRAM** | **Implementazione differente** *(FP16, cache GPU)* | **Sì** (`Checkpointing`, cache GPU) | **Sì** (`Checkpointing`, cache GPU) | **Implementazione differente** *(FP16/BF16, cache GPU)* |
| **Feature & Pitch extraction** | **Sì** | **Sì** | **Sì** | **Sì** |
| **Inferenza vocale (offline)** | **Sì** | **Sì** | **Sì** | **Sì** |
| **Text-to-Speech (TTS)** | **No - verificato** *(richiede TTS esterno + RVC)* | **Sì** *(`tabs/tts/` integrato + CLI `rvc/lib/tools/tts.py`)* | **No - verificato** *(scheda `tts` di Applio rimossa da `tabs/`)* | **Sì** *(Kokoro, ElevenLabs, Windows TTS integrati + RVC)* |
| **Conversione real-time** | **Sì** | **Sì** | **Sì** | **No - verificato** *(solo offline e batch)* |
| **GUI desktop realtime** | **Sì** (`realtime_gui.py`) | **Realtime nella WebUI; GUI desktop standalone separata non verificata** | **Sì** (`run-realtime-gui.bat`, launcher Windows) | **No - verificato** |
| **Realtime nel browser** | **No - verificato** | **Sì** (`tabs/realtime`) | **Sì** (WebSocket + fallback HTTP) | **No - verificato** |
| **Multi-GPU training** | **Sì** | **Sì** | **Sì** | **Sì** |
| **Flussi realtime multi-GPU concorrenti** | **No - verificato** | **Non verificato** | **Sì** *(1 GPU per flusso)* | **No - verificato** |
| **Supporto multi-famiglia** | **No - verificato** *(solo RVC)* | **Famiglia RVC con opzioni vocoder aggiuntive** *(selettore `Architecture` nascosto; non famiglie separate come RF/Beatrice)* | **Sì** *(RVC + Rectified Flow + Beatrice)* | **No - verificato** *(solo RVC)* |
| **Strumenti di monitoraggio** | TensorBoard | TensorBoard | TensorBoard | TensorBoard + Audio Analyzer + Training Previews |

### Supporto Piattaforme e Backend

La presenza di uno script `.sh` **non** dimostra che tutte le funzionalità siano testate su Linux o macOS, quindi la tabella seguente distingue i launcher dal codice dei backend:

| Piattaforma / Backend | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **Launcher Windows** | `go-webui.bat`, `go-realtime_gui.bat` | `run-install.bat`, `run-applio.bat`, `run-tensorboard.bat`, `run-updater.bat` | `run-install.bat`, `run-applio.bat`, `run-tensorboard.bat`, `run-realtime-gui.bat` | `RUN_ILARIA_RVC.bat`, `RUN_ILARIA_RVC_LOGS.bat` |
| **Launcher Linux / macOS** | Avvio manuale Python | `run-install.sh`, `run-applio.sh`, `run-tensorboard.sh` | `run-install.sh`, `run-applio.sh` *(nessun `.sh` per `realtime_gui.py`)* | Avvio manuale Python *(launcher `.bat` orientati a Windows)* |
| **Backend di calcolo nel codice** | **CUDA / DirectML / CPU** *(DirectML per inferenza via `--dml` / fallback; training usa CUDA o CPU)* | CUDA / MPS / CPU | CUDA / MPS / CPU *(Beatrice realtime su CPU)* | CUDA / DirectML (AMD e Intel) / CPU |
| **Stato test runtime multi-OS** | Non testato in questo audit | Non testato in questo audit | Non testato in questo audit | Non testato in questo audit |

---

## Generator EMA: Pesi Esportati Più Uniformi

Dentro una rete neurale, i **weights (pesi)** sono i numeri interni che si aggiornano dopo ogni batch di training. Poiché ogni batch rappresenta solo una piccola parte del dataset, i pesi correnti del generatore possono oscillare leggermente da uno step all'altro.

**EMA (Exponential Moving Average)** mantiene in memoria una media mobile separata dei pesi del generatore (distinta dai momenti interni di optimizer come Adam). In `rvc/train/train.py`, Redpanda-vc implementa `GeneratorEMA`:

- Dopo ogni step dell'optimizer del generatore (su rank `0`), `GeneratorEMA.update()` miscela i pesi correnti del generatore nella media progressiva (escludendo `enc_q`, usato solo durante il training).
- **Generator EMA Decay** (`0`–`0.9999`, default `0.999`, step `0.0001`) controlla quanto lentamente si aggiorna la media. Impostare **`0`** disabilita EMA ed esporta i pesi correnti grezzi del generatore.
- Né **RVC Mainline**, né **Applio**, né **Ilaria RVC** includono `GeneratorEMA` nei rispettivi script di training verificati.

EMA può attenuare le oscillazioni dei pesi tra uno step e l'altro, ma **non** garantisce una qualità audio migliore, **non** elimina l'overfitting né la casualità del training e **non** rende il training più veloce. Per spiegazioni complete per principianti e dettagli matematici, vedi [Addestrare modelli RVC in Redpanda-vc - EMA e Salvataggio per Step](training.md).

---

## Training Basato sugli Step e Salvataggi

Nel training RVC, un'**epoch (epoca)** è un passaggio completo attraverso il dataset preparato, mentre uno **step** è un singolo aggiornamento dei pesi dopo l'elaborazione di un batch. *(Esempio ipotetico: se un dataset produce 100 step per epoca, 1.000 step corrispondono a circa 10 epoche, ma il rapporto esatto dipende da durata del dataset e batch size.)*

I quattro programmi gestiscono diversamente gli obiettivi in step e il salvataggio dei checkpoint:

- **Redpanda-vc:** Usa **Total Steps** (default `10000`) e **Save Every X Steps** (default `1000`). Salva checkpoint `G`/`D` resumable (e un `.pth` di inferenza quando **Save Every Weights** è attivo) a intervalli esatti di step, anche a metà epoca, più un **Final Save** obbligatorio a `Total Steps`. **Save Only Latest** sovrascrive `G_2333333.pth` / `D_2333333.pth` per risparmiare spazio su disco.
- **Applio e RVC Mainline:** Entrambi addestrano per **epoche totali** e salvano i checkpoint a intervalli di **epoche** (`save_every_epoch`).
- **Ilaria RVC:** Include **Training Target: Steps** (`ILARIA_RVC.py`, `train.py`) e quindi **può** fermarsi anch'esso a un numero preciso di step. Tuttavia, la frequenza di salvataggio di Ilaria RVC conta comunque le **epoche** (`save_every_epoch`), e le esportazioni intermedie `.pth` avvengono solo ai confini completati `epoch % save_every_epoch == 0` (non su una `partial_epoch` a metà epoca), mentre lo stato resumable si salva a `save_every_epoch`, stop o `final_epoch`.

---

## Rectified Flow: Una Diversa Architettura di Conversione Vocale

Una delle aggiunte principali di Redpanda-vc è **Rectified Flow** (`tabs/train/rectified_flow.py`, `rectified_flow/`). **Non** è una variante di RVC V2:

- **Modello acustico:** Usa un'architettura ispirata al modello acustico di **DiffSinger**, utilizzando feature vocali **ContentVec** al posto dei fonemi (`README.md`).
- **Output e vocoder:** Il modello flow predice rappresentazioni mel-spectrogram, che un **vocoder** separato (come `PC-NSF-HiFiGAN`, `NSF-HiFiGAN` o `Vocos`) converte in forma d'onda audio.
- **Preset di training:** Include i preset `standard`, `meanflow` (ispirato a MeanVC2) e `smaller` in `rectified_flow/presets/`.
- **Supporto realtime:** Supportato nella GUI realtime e nella scheda realtime della WebUI di Redpanda-vc.
- **Avviso di compatibilità:** Anche se il file esportato usa estensione `.pth`, un modello Rectified Flow **non è un modello RVC V2** e non si carica nei normali loader RVC a meno che un client non implementi esplicitamente quel decoder Rectified Flow.

*(Nel repository non esistono benchmark verificati tra architetture che dimostrino che Rectified Flow sia universalmente più veloce, naturale o qualitativamente superiore a RVC.)*

---

## Supporto Beatrice 2

**Beatrice** è un'architettura separata e leggera su CPU per la conversione vocale (integrata da `beatrice-trainer` in `tabs/train/beatrice.py`, `beatrice/`, `beatrice/realtime.py`):

- **Separata da RVC:** Beatrice usa un proprio formato modello (esportato come cartella modello, non come `.pth` RVC) ed esegue l'inferenza realtime su **CPU** (`README.md`).
- **Non confonderla con l'estrazione F0:** Alcune app (come Ilaria RVC) includono `beatrice` come opzione di **pitch extractor F0** durante l'inferenza RVC. Redpanda-vc va oltre supportando **training completo e conversione vocale Beatrice 2** sia nella WebUI che in `run-realtime-gui.bat`.
- I modelli addestrati nella scheda Beatrice di Redpanda-vc funzionano con loader compatibili con Beatrice (come Beatrice VST / client Beatrice), non come file `.pth` RVC V2.

---

## Training Dedicato dei Vocoder

Redpanda-vc include una scheda dedicata al training dei **Vocoder** (`tabs/train/nsf_hifigan.py`, `nsf_hifigan/`):

- **Vocoder supportati:** `PC-NSF-HiFiGAN`, `NSF-HiFiGAN` e `Vocos` (24 kHz).
- **Modalità:** Training da zero o fine-tuning da un checkpoint pretrained supportato (es. `PC-NSF-HiFiGAN 2025.02` o `Vocos 24 kHz`).
- **Modello acustico vs. vocoder:** Un modello acustico (come Rectified Flow) predice feature spettrali (mel-spectrogram); un vocoder trasforma tali feature in onde sonore udibili.
- **Limitazione importante:** Questa scheda è strettamente abbinata alle configurazioni mel di **Rectified Flow** (`check_registry_vocoder` / `mel_mismatch` in `tabs/train/rectified_flow.py`). Selezionare `HiFi-GAN` o `RefineGAN` nella WebUI di training **RVC** usa invece l'architettura integrata generatore/vocoder di RVC; **non** puoi collegare arbitrariamente un vocoder addestrato qui a qualsiasi modello RVC standard.

---

## Differenze nella Conversione in Tempo Reale

| Funzionalità Real-Time | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **GUI Desktop Realtime** | **Sì** (`realtime_gui.py`) | **Realtime nella WebUI; GUI desktop standalone separata non verificata** | **Sì** (`run-realtime-gui.bat`, RVC + Beatrice + RF) | **No - verificato** |
| **Realtime nella WebUI browser** | **No - verificato** | **Sì** (`tabs/realtime`) | **Sì** (WebSocket binario + fallback HTTP streaming) | **No - verificato** |
| **Assegnazione flussi Multi-GPU** | **No - verificato** | **Non verificato** | **Sì** (`Inference Device: Automatic` o GPU specifica) | **No - verificato** |

Nella scheda realtime della WebUI di Redpanda-vc (`README.md`, `tabs/inference/realtime.py`):
- **Concorrenza multi-GPU:** Due GPU possono gestire **due flussi simultanei separati** (un flusso per GPU per preservare lo stato audio). GPU aggiuntive **non** si sommano per velocizzare un singolo flusso.
- **Trasporto:** Usa audio WebSocket binario (anche tramite `--share`), con code limitate e fallback automatico su HTTP streaming se i WebSocket sono bloccati.

---

## Controlli Avanzati di Training

Oltre a **Generator EMA Decay** e **Total Steps**, Redpanda-vc espone diversi controlli extra in **Training** (`tabs/train/rvc.py`):

- **Dinamica del training:** `Learning Rate Schedule` (`Exponential` o `Cosine`), `Warmup Steps`, `Learning Rate Decay Every X Steps`, `Final Learning Rate`, `Reset Optimizer State` e `Max Audio per Batch (sec)`.
- **Ottimizzazione memoria:** `Checkpointing` (activation checkpointing, ereditato da Applio, scambia velocità per minore uso di VRAM) e `Cache Dataset in GPU` (ereditato).
- **Salvataggi ed esportazioni:** `Save Every X Steps`, `Save Only Latest`, `Save Every Weights` e `Generator EMA Decay`.

I principianti **non** hanno bisogno di modificare schedule coseno, warmup step o decay personalizzati sul primo modello RVC.

---

## Compatibilità dei Modelli: Cosa Funziona Dove?

Avere l'estensione `.pth` **non** rende due modelli intercambiabili. La compatibilità dipende da architettura, formato checkpoint, embedder atteso, decoder vocoder e indice FAISS corrispondente:

| Tipo di modello | Redpanda-vc | RVC Mainline | Applio | Ilaria RVC | Altri Client Compatibili |
| --- | --- | --- | --- | --- | --- |
| **RVC V1 (`.pth` inference)** | **Sì** | **Sì** | **Inferenza supportata; UI di training focalizzata su V2** | **Sì** | **Supportato dai client che implementano questa architettura** |
| **RVC V2 HiFi-GAN (`.pth`)** | **Sì** | **Sì** | **Sì** | **Sì** | **Supportato dai client che implementano questa architettura** |
| **RVC V2 RefineGAN (`.pth`)** | **Sì** | **No - verificato** | **Sì** | **Sì** *(32 kHz)* | **Richiede decoder compatibile** (**Dipende dalla versione**) |
| **RVC V2 MRF HiFi-GAN (`.pth`)** | **Sì** *(inferenza + CLI)* | **No - verificato** | **Sì** *(inferenza + CLI)* | **Sì** *(UI + inferenza)* | **Richiede decoder compatibile** (**Dipende dalla versione**) |
| **Rectified Flow (`.pth`)** | **Sì** | **No - verificato** | **No - verificato** | **No - verificato** | **Richiede decoder compatibile** *(non è RVC V2 standard)* |
| **Beatrice 2 (cartella modello)** | **Sì** | **No - verificato** | **No - verificato** | **No - verificato** | **Dipende dalla versione** *(solo loader/VST Beatrice)* |
| **Vocoder custom (`nsf_hifigan`)** | **Sì** *(per Rectified Flow)* | **No - verificato** | **No - verificato** | **No - verificato** | **Richiede decoder compatibile** |
| **Checkpoint training (`G_*`/`D_*`)** | **Sì** *(RVC)* | **Sì** *(RVC)* | **Sì** *(RVC)* | **Sì** *(RVC)* | **No - verificato** *(solo ripresa training)* |
| **File FAISS `.index`** | **Sì** *(embedder e dim. compatibili)* | **Sì** *(embedder e dim. compatibili)* | **Sì** *(embedder e dim. compatibili)* | **Sì** *(embedder e dim. compatibili)* | **Supportato dai client RVC con retrieval** *(embedder e dim. compatibili)* |

---

## Quale Versione RVC Scegliere?

- **Scegli RVC Mainline** se vuoi la codebase di riferimento originale e il workflow classico con `realtime_gui.py`.
- **Scegli Applio** se cerchi un ambiente RVC completo con training per epoche e **TTS** integrato.
- **Scegli Redpanda-vc** se desideri specificamente **Generator EMA**, **salvataggio dei checkpoint per step**, **Rectified Flow**, **training/realtime Beatrice 2**, **training dedicato dei vocoder** o **realtime WebSocket / multi-stream** (nota: la scheda `tts` di Applio non è presente in Redpanda-vc).
- **Scegli Ilaria RVC** se cerchi uno studio RVC orientato all'offline con `Training Target: Steps`, `MRF HiFi-GAN` / `RefineGAN` selezionabili in WebUI, **TTS** integrato (Kokoro, ElevenLabs, Windows), `Audio Analyzer`, `Voice Blender`, `RMVPE High Register` e `Proposed Pitch`.

---

## FAQ per Principianti

**Cos'è un fork di RVC?**
Un progetto separato che copia una codebase RVC esistente e vi aggiunge o modifica funzionalità.

**Redpanda-vc è uguale ad Applio?**
No. Redpanda-vc è un fork di Applio, quindi ne condivide la UI di base, ma aggiunge Generator EMA, salvataggio per step, Rectified Flow, Beatrice 2 e training vocoder, omettendo la scheda `tts` di Applio.

**Redpanda-vc produce modelli RVC migliori?**
Non automaticamente. La qualità vocale dipende soprattutto da dataset, preprocessing e impostazioni; EMA e schedule extra sono strumenti da testare, non garanzie.

**Cos'è EMA?**
Exponential Moving Average: una media progressiva dei pesi del generatore mantenuta durante il training e usata nell'esportazione dei modelli per inference.

**Perché Redpanda-vc salva per step?**
Perché il salvataggio per step consente di salvare a intervalli esatti di aggiornamento (es. ogni `1000` step) indipendentemente da quanto sia piccolo o grande il dataset.

**Anche Ilaria RVC supporta il training per step?**
Sì, tramite `Training Target: Steps`, anche se la sua `Save frequency` conta comunque le epoche anziché intervalli arbitrari di step.

**Cos'è Rectified Flow?**
Un'architettura acustica diffusion/flow-matching ispirata a DiffSinger che usa feature ContentVec e un vocoder separato.

**Rectified Flow è uguale a RVC V2?**
No. Sono architetture completamente diverse e non sono compatibili tra loro.

**Cos'è Beatrice?**
Un'architettura di conversione vocale separata e ottimizzata per CPU (da `beatrice-trainer`), distinta da RVC e distinta dall'uso di Beatrice solo come estrattore F0.

**Cosa fa un vocoder?**
Converte feature acustiche (come i mel-spectrogram) in una forma d'onda audio udibile.

**Posso usare un modello Redpanda-vc in un altro programma RVC?**
I modelli standard **RVC V1 / V2 HiFi-GAN** esportati da Redpanda-vc funzionano nei client che implementano quei decoder; **Rectified Flow**, **Beatrice**, **RefineGAN** e **MRF HiFi-GAN** richiedono client che supportino esplicitamente tali decoder.

**Redpanda-vc può addestrare modelli RVC normali?**
Sì, nella scheda **Train → RVC** (`HiFi-GAN` e `RefineGAN` nella WebUI; `MRF HiFi-GAN` in codice/CLI).

**Redpanda-vc supporta la conversione in tempo reale?**
Sì, sia tramite la scheda **Realtime** nella WebUI sia tramite `run-realtime-gui.bat`.

**Il realtime multi-GPU velocizza una singola conversione vocale?**
No. Ogni flusso resta su una singola GPU; GPU extra permettono più flussi simultanei.

**I principianti dovrebbero scegliere RVC, Rectified Flow o Beatrice?**
Inizia con **RVC** se vuoi la massima compatibilità tra modelli e client; esplora **Rectified Flow** o **Beatrice** solo se cerchi espressamente i rispettivi flussi.

**Quali funzioni sono davvero esclusive di Redpanda-vc tra questi quattro?**
La combinazione di **Generator EMA**, **salvataggio RVC a intervalli di step (`Save Every X Steps`)**, **Rectified Flow**, **training/realtime Beatrice 2** e **training dedicato vocoder `nsf_hifigan`** in un unico fork basato su Applio.

---

## Fonti e riferimenti tecnici

Confronto statico del codice sorgente verificato sui branch `main` il **2026-11-22**:

- **Redpanda-vc** (commit [`55a3a80`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80), 2026-10-31): [Repository](https://github.com/redpanda343/Redpanda-vc) · [`tabs/train/train.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/tabs/train/train.py) · [`tabs/train/rvc.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/tabs/train/rvc.py) · [`rvc/train/train.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/rvc/train/train.py) · [`rectified_flow/`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80/rectified_flow) · [`beatrice/`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80/beatrice) · [`nsf_hifigan/`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80/nsf_hifigan) · [`tabs/inference/realtime.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/tabs/inference/realtime.py) · [`realtime_gui.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/realtime_gui.py)
- **Applio** (commit [`445b0f6`](https://github.com/IAHispano/Applio/tree/445b0f6), 2026-11-19): [Repository](https://github.com/IAHispano/Applio) · [`tabs/train/train.py`](https://github.com/IAHispano/Applio/blob/445b0f6/tabs/train/train.py) · [`rvc/infer/infer.py`](https://github.com/IAHispano/Applio/blob/445b0f6/rvc/infer/infer.py) · [`core.py`](https://github.com/IAHispano/Applio/blob/445b0f6/core.py) · [`rvc/train/train.py`](https://github.com/IAHispano/Applio/blob/445b0f6/rvc/train/train.py) · [`tabs/tts/`](https://github.com/IAHispano/Applio/tree/445b0f6/tabs/tts) · [`tabs/realtime/`](https://github.com/IAHispano/Applio/tree/445b0f6/tabs/realtime) · [`rvc/realtime/`](https://github.com/IAHispano/Applio/tree/445b0f6/rvc/realtime)
- **RVC Mainline** (commit [`81eed5e`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/tree/81eed5e), 2026-08-04): [Repository](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [`configs/config.py`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/81eed5e/configs/config.py) · [`train/train.py`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/81eed5e/train/train.py) · [`realtime_gui.py`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/81eed5e/realtime_gui.py)
- **Ilaria RVC** (commit [`a887ba5`](https://github.com/TheStingerX/Ilaria-RVC/tree/a887ba5), 2026-11-21): [Repository](https://github.com/TheStingerX/Ilaria-RVC) · [`app/ILARIA_RVC.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/a887ba5/app/ILARIA_RVC.py) · [`app/infer/modules/train/train.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/a887ba5/app/infer/modules/train/train.py) · [`app/ilaria/ilaria_tts.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/a887ba5/app/ilaria/ilaria_tts.py)
