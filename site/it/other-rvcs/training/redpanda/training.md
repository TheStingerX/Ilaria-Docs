# Addestrare Modelli RVC in Redpanda-vc - EMA e Salvataggio per Step

[Redpanda-vc su GitHub](https://github.com/redpanda343/Redpanda-vc) · [Configurare Redpanda-vc](first-run.md) · [Guida generale al training RVC](../../../model-training/training.md)

Addestrare un modello vocale significa insegnare a un programma a riprodurre una voce target partendo da una raccolta di clip audio pulite. Se ti avvicini per la prima volta a RVC, non devi conoscere termini tecnici prima di iniziare. Ecco i concetti chiave spiegati in parole semplici:

- **Weights (pesi):** I numeri interni del modello che cambiano poco per volta mentre impara una voce.
- **Generator (`G`):** La parte del modello che genera concretamente l'audio della voce convertita.
- **Discriminator (`D`):** Una rete di supporto usata solo durante il training per giudicare quanto l'audio del generatore assomigli alle registrazioni reali.
- **Optimizer:** Il motore matematico che aggiorna i pesi del modello dopo ogni passaggio di training.
- **Step:** Un singolo aggiornamento dei pesi dopo aver elaborato un piccolo gruppo (**batch**) di clip audio.
- **Epoch:** Un passaggio completo attraverso l'intero dataset preparato.
- **Checkpoint (`G_*.pth` / `D_*.pth`):** Un salvataggio completo dello stato di training usato per mettere in pausa e riprendere in seguito.
- **EMA (Exponential Moving Average):** Una media mobile smussata dei pesi del generatore mantenuta durante il training.

> EMA helps smooth out changes in the generator's weights during training. Instead of exporting only the latest generator weights, Redpanda-vc can export a running average of them.

Il training non produce immediatamente una voce finita e la qualità finale dipende molto dalle registrazioni sorgente, dalla preparazione del dataset e dalle impostazioni. Prima di iniziare, tieni presente ciò che EMA **non** fa:

- EMA **non** è un filtro audio né un denoiser.
- EMA **non** modifica né ripulisce i file del dataset.
- EMA **non** ripara registrazioni clippate o rumorose.
- EMA **non** garantisce una qualità audio superiore su ogni voce.
- EMA **non** elimina tutta la casualità del training.

---

## Cos'è EMA?

Immagina uno studente che si esercita a pronunciare una parola difficile. Un singolo tentativo può riuscire leggermente più chiaro o leggermente più incerto di quello precedente. Guardare l'andamento su più tentativi recenti offre un quadro più stabile rispetto al giudicare soltanto l'ultimo tentativo isolato.

*(Questa è solo un'analogia: EMA non ascolta l'audio, non valuta la pronuncia e non sceglie automaticamente le registrazioni migliori.)*

### Come funziona realmente in Redpanda-vc

In `rvc/train/train.py`, Redpanda-vc mantiene EMA in memoria mentre il training prosegue:

1. Il generatore si allena normalmente su ogni batch.
2. L'optimizer aggiorna i pesi correnti del generatore.
3. Subito dopo ogni aggiornamento del generatore (su rank `0`), `GeneratorEMA.update()` aggiorna una copia mediata separata dei pesi del generatore (escludendo `enc_q`, usato solo in training).
4. Questa media progressiva resta in memoria e viene salvata dentro il checkpoint `G`.
5. Quando EMA è attivo (`Generator EMA Decay > 0`), Redpanda-vc esporta i modelli `.pth` per inference usando questi pesi EMA invece dei pesi grezzi correnti.

**EMA si aggiorna a ogni step di training, non una volta per epoca.** Redpanda-vc **non** fa la media di più file `.pth` già salvati su disco: mantiene una media progressiva continua in memoria durante il training.

<details>
<summary>Dettagli matematici facoltativi: formula EMA standard vs. formula corretta di Redpanda-vc</summary>

La formula intuitiva standard di EMA è:

```text
EMA_new = decay * EMA_previous + (1 - decay) * current_weights
```

In `rvc/train/train.py` (`GeneratorEMA.update()`, righe 199-205), Redpanda-vc non usa un fattore costante fin dal primo aggiornamento, ma calcola un decadimento effettivo corretto in base al numero di aggiornamenti (`updates`):

```text
effective_decay = beta * (1 - beta ** (updates - 1)) / (1 - beta ** updates)
```

dove `beta` è l'impostazione `ema_decay`. Questa correzione riduce l'influenza dei pesi iniziali nei primi aggiornamenti e si avvicina poi a `beta` al crescere di `updates`. I parametri in virgola mobile vengono miscelati con `torch._foreach_lerp_`, mentre i buffer non float vengono copiati dal generatore corrente.

</details>

---

## Capire Generator EMA Decay

In **Training → Advanced Settings**, Redpanda-vc espone **Generator EMA Decay** (`tabs/train/rvc.py`, righe 809-819):

- **Minimo:** `0`
- **Massimo:** `0.9999`
- **Predefinito:** `0.999`
- **Incremento dello slider:** `0.0001`

### Significato dei valori

- **`Generator EMA Decay = 0`:** Disabilita completamente `GeneratorEMA`. I modelli `.pth` per inference vengono esportati direttamente dai pesi correnti del generatore.
- **`Generator EMA Decay = 0.999` (Predefinito):** Mantiene una media esponenziale progressiva che dà un peso significativo agli aggiornamenti recenti attenuando le oscillazioni tra uno step e l'altro.
- **`Generator EMA Decay = 0.9999`:** Fa cambiare la media più lentamente tenendo conto di una storia più lunga. Può aumentare la stabilità della media, ma rallenta anche la reazione ai miglioramenti più recenti del generatore.

Valori più bassi reagiscono più rapidamente ai pesi recenti, mentre valori più alti mediano su più step. `0.9999` **non** è automaticamente migliore di `0.999` e non esiste un valore ideale universale per parlato, canto, dataset piccoli o grandi. Per iniziare, lasciare il predefinito **`0.999`** e confrontare risultati audio reali prima di cambiare parametro è una scelta sensata.

---

## Perché Redpanda-vc usa EMA?

Nella letteratura di deep learning (come la documentazione PyTorch sul weight averaging e lo studio di Morales-Brotons, Vogels e Hendrikx, 2024), mediare i pesi lungo la traiettoria di training è studiato perché i singoli aggiornamenti SGD/Adam possono oscillare attorno alle soluzioni buone.

### Benefici potenziali (non garanzie)

- Riduzione delle oscillazioni tra step nei pesi esportati.
- Maggiore continuità tra esportazioni consecutive.
- Attenuazione di parte della variabilità degli aggiornamenti durante il training.
- Potenziale maggiore stabilità del modello esportato, fermo restando che l'effettivo miglioramento audio sul tuo dataset RVC va verificato con test d'ascolto.

### Limitazioni importanti

- EMA **non** sostituisce un dataset pulito e ben preparato.
- EMA **non** elimina l'overfitting.
- EMA **non** impedisce a un training instabile o errato di fallire.
- EMA **non** garantisce maggiore fedeltà vocale o pronuncia migliore.
- EMA **non** promette meno step o meno epoche.
- EMA **non** è un selettore automatico del "checkpoint migliore".
- EMA mantiene in memoria copie aggiuntive dei pesi del generatore e aggiunge un piccolo costo di calcolo per step.

---

## Pesi EMA vs. Checkpoint di Training

In Redpanda-vc coesistono quattro elementi distinti durante l'addestramento:

| File / Stato | Dove si trova | Cosa contiene | A cosa serve |
| --- | --- | --- | --- |
| **Checkpoint Generator (`G_*.pth`)** | `logs/<model_name>/` | Pesi correnti del generatore, stato optimizer, scaler, `iteration` (epoca), `step`, `epoch_step`, RNG e stato `ema` (se attivo) | Riprendere il training (ed export manuale) |
| **Checkpoint Discriminator (`D_*.pth`)** | `logs/<model_name>/` | Pesi del discriminatore, stato optimizer, scaler, `step` | Riprendere il training insieme a `G_*.pth` |
| **Pesi EMA** | In memoria durante il training e dentro `G_*.pth` (`checkpoint["ema"]["weights"]`) | Media progressiva dei pesi del generatore (escluso `enc_q`) | Esportare modelli `.pth` smussati per inference |
| **Modello inference (`<name>_<epoch>e_<step>s.pth`)** | `logs/<model_name>/` | Solo pesi compatti del generatore + metadati | Solo conversione vocale (**non** riprende il training) |

**Nota:** Nel codice verificato di Redpanda-vc (`train.py`), EMA viene applicato **solo al generatore (`net_g`)**, mai al discriminatore (`net_d`).

---

## Training Step vs. Epoch

- **Epoch:** Un passaggio completo sull'intero dataset preparato.
- **Batch:** Un piccolo gruppo di segmenti audio elaborati insieme in un singolo passaggio.
- **Step:** Un aggiornamento dell'optimizer dopo l'elaborazione di un batch. Uno step **non** equivale a un file audio e **non** equivale a un secondo di audio.

### Esempio ipotetico

Supponiamo che il tuo dataset preparato e il `Batch Size` producano **100 step per epoca**:

- `100` step ≈ `1` epoca
- `500` step ≈ `5` epoche
- `1.000` step ≈ `10` epoche

Il rapporto reale dipende da durata del dataset, suddivisione delle clip, `Batch Size` e `Max Audio per Batch (sec)`. Non dare mai per scontato che 100 step equivalgano a 1 epoca per ogni modello.

---

## Salvataggio dei Checkpoint Basato sugli Step

Anziché attendere la fine di un'intera epoca prima di salvare, Redpanda-vc pianifica i salvataggi per **numero di step** (`tabs/train/rvc.py`, righe 663-703; `rvc/train/train.py`, righe 917-921 e 1146-1195):

### Total Steps

- **Predefinito:** `10000` (intervallo slider `1` - `1000000`, passo `1`).
- Imposta l'**obiettivo complessivo di step** dell'esperimento, **non** "aggiungi altri 10.000 step". Se il modello ripreso è già allo step `10000`, devi alzare `Total Steps` (es. a `15000`) per continuare.

### Save Every X Steps

- **Predefinito:** `1000` (intervallo slider `1` - `100000`, passo `1`).
- Salva i checkpoint `G` e `D` ogni `X` step (`self.global_step % save_every_steps == 0`).
- **Esempio:** Con `Total Steps = 10000` e `Save Every X Steps = 1000`, Redpanda-vc salva agli step `1000`, `2000`, `3000`, ..., `10000`, anche se cadono a metà epoca.

### Salvataggio finale

Anche se `Total Steps` non è multiplo di `Save Every X Steps` (ad es. `Total Steps = 2500` e `Save Every X Steps = 1000`), Redpanda-vc salva **sempre** la coppia `G`/`D` e un modello `.pth` per inference allo step finale (`final = self.global_step >= self.args.total_steps`).

### `save_every_weights`

- **Predefinito:** **Abilitato** (`True`).
- Se **abilitato**, Redpanda-vc esporta un modello `.pth` per inference a ogni intervallo di salvataggio *e* allo step finale.
- Se **disabilitato**, i checkpoint `G`/`D` continuano a essere salvati ogni `Save Every X Steps`, ma l'esportazione automatica del `.pth` per inference avviene solo allo step finale.

### Save Only Latest

- **Predefinito:** **Abilitato** (`True`).
- Se **abilitato**, i checkpoint `G` e `D` sovrascrivono nomi fissi (`G_2333333.pth` e `D_2333333.pth`, dove `2333333` è `LATEST_CHECKPOINT_SUFFIX`) per risparmiare spazio su disco.
- Se **disabilitato**, i checkpoint includono il numero di step (`G_1000.pth`, `D_1000.pth`, `G_2000.pth`, `D_2000.pth`).
- **Importante:** `Save Only Latest` riguarda solo i checkpoint `G`/`D` di training, **non** i modelli `.pth` esportati per inference. Con `Save Only Latest` attivo, però, non puoi tornare a un checkpoint `G`/`D` intermedio precedente per riprendere il training da uno step passato.

---

## Addestrare una voce RVC nell’interfaccia attuale

Nella scheda **Training → RVC**, imposta **Model name**, **Dataset folder**, **Sample rate**, **Training steps** e **Save every (steps)**. Puoi riprendere un run preparato con lo stesso nome, **Dataset folder** vuoto e un obiettivo di step più alto. In **Advanced settings** trovi **Version**, **Vocoder**, **Precision**, **Embedder** e **Index algorithm**. La UI offre HiFi-GAN e RefineGAN. Usa pretrained adatti alla configurazione e una precisione supportata dalla GPU. **Reset optimizer on resume** azzera lo stato dell’ottimizzatore mantenendo i pesi del modello. Segui il run in **TensorBoard** e ascolta più esportazioni.

La UI desktop e browser esporta una voce per inferenza a ogni salvataggio. **Keep latest training checkpoint** controlla la conservazione della coppia G/D usata per riprendere il training. Avvia un nuovo flusso con **Run full workflow**. [Training jobs](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/shared/desktop/jobs.py)

[Training con Causal Voice Changer](causal-training.md)

## Riprendere un Training in Sicurezza

Quando riavvii il training su un esperimento esistente (`rvc/train/train.py`, righe 420-436, 528-538, 763-803, 844-853):

1. `latest_checkpoint_pair()` cerca in `logs/<model_name>/` il `G_*.pth` più recente per data di modifica e lo abbina al `D_*.pth` corrispondente. **Servono entrambi (`G` e `D`)** per riprendere.
2. `restore()` ricarica `epoch`, `start_batch` (`epoch_step`), `global_step` (`step`), `scaler` AMP, stato RNG ed entrambi gli optimizer.
3. `build_ema()` ripristina `GeneratorEMA` da `checkpoint["ema"]` se `ema_decay > 0`. Se lo stato `ema` manca o è incompatibile, Redpanda-vc stampa un avviso e inizializza EMA dai pesi del generatore ripreso.
4. Tutti gli step eseguiti *dopo* l'ultimo salvataggio su disco prima di un arresto o crash vanno persi e ripartono dall'ultimo step salvato.

### Controlli da non confondere

- **Reset Optimizer State:** Mantiene pesi, `global_step` e learning rate schedule, ma azzera i momenti interni dell'optimizer (`state={}`). Per una normale ripresa lascialo **OFF**.
- **Fresh Training (`--cleanup`):** **Elimina** tutti i checkpoint `G_*` e `D_*`, i file `spec.pt` e i log TensorBoard precedenti dell'esperimento. Lascialo **OFF** quando vuoi riprendere.
- **Save Every X Steps vs. Checkpointing:** **Save Every X Steps** controlla la frequenza dei salvataggi su disco. **Checkpointing** (in **Advanced Settings**) è invece l'**activation checkpointing**, che riduce l'uso di VRAM sacrificando un po' di velocità su GPU con poca memoria.

---

## Come Redpanda-vc Esporta i Modelli EMA

1. **Esportazione automatica durante il training (`train.py`, righe 1090-1091 e 1157-1163):** Quando `save()` esporta un `.pth` per inference (`save_every_weights` o step finale), `export_state_dict()` usa `self.ema.weights` se EMA è attivo (`ema_decay > 0`), oppure i pesi correnti di `net_g` se EMA è disabilitato (`ema_decay = 0`).
2. **Esportazione manuale (`Export Model` -> `rvc/train/process/checkpoint_exporter.py`, righe 44-117):** Permette di esportare qualsiasi `G_*.pth` in `fp16` o `fp32`. `export_generator_checkpoint()` controlla se esiste `checkpoint["ema"]["weights"]` e usa automaticamente quei pesi EMA se presenti.
3. Nella WebUI non esiste un selettore separato tra pesi Raw ed EMA; il `.pth` esportato serve solo per inference, mentre `G_*.pth` + `D_*.pth` restano necessari per riprendere il training.

---

## EMA Suona Davvero Meglio?

Non esiste una risposta valida in assoluto per ogni voce e dataset. Poiché l'attuale WebUI non esporta contemporaneamente versione Raw e versione EMA dallo stesso run, il confronto più rigoroso richiede due esperimenti controllati:

1. Usa lo stesso identico dataset preparato e le stesse feature estratte.
2. Mantieni identici `Batch Size`, `Total Steps`, schedule del learning rate e pretrained.
3. Esegui un run con `Generator EMA Decay = 0.999` e uno con `0`.
4. Confronta i `.pth` esportati allo **stesso numero di step** su clip di test esterne al dataset.
5. Ascolta fedeltà vocale, consonanti, stabilità dell'intonazione e artefatti, senza basarti solo sulle loss di TensorBoard.

---

## Troubleshooting per Principianti

| Problema | Possibile causa | Cosa controllare | Soluzione |
| --- | --- | --- | --- |
| **Il training non inizia** | Mancano preprocess/feature, percorso errato o blocco attivo (`training_state.json`) | Leggi il primo errore nel terminale | Completa prima **Preprocess Dataset** ed **Extract Features** e verifica che non ci sia già un training attivo |
| **GPU out of memory (OOM)** | `Batch Size` troppo alto o `Cache Dataset in GPU` attivo con poca VRAM | Controlla VRAM ed errore nel terminale | Abbassa **Batch Size**, disattiva **Cache Dataset in GPU** o attiva **Checkpointing** |
| **EMA non sembra cambiare il risultato** | Pochi step, decay vicino a `0` o confronto tra step diversi | Controlla `Generator EMA Decay` e il riepilogo iniziale | Verifica che all'avvio compaia `generator EMA <valore>` e confronta export allo stesso step su clip esterne |
| **EMA Decay impostato a `0`** | Slider su `0` | Controlla **Training → Advanced Settings → Generator EMA Decay** | Imposta `0.999` (predefinito) se vuoi abilitare EMA al prossimo run |
| **Solo gli ultimi checkpoint `G`/`D` presenti** | **Keep latest training checkpoint** attivo (predefinito) | Controlla `logs/<model_name>/` (`G_2333333.pth` / `D_2333333.pth`) | Disattiva **Keep latest training checkpoint** prima del training se vuoi conservare `G_<step>.pth` numerati |
| **Checkpoint `G` o `D` mancante** | Un file è stato eliminato o spostato | Verifica la coppia `G_*` e `D_*` in `logs/<model_name>/` | Servono entrambi `G` e `D` con lo stesso suffisso per riprendere (`latest_checkpoint_pair()`) |
| **Il training riparte da uno step precedente** | Arresto o crash prima del successivo `Save Every X Steps` | Confronta ultimo step nel terminale vs. step ripreso | Comportamento normale: gli step dopo l'ultimo salvataggio non vengono conservati |
| **Errore/avviso durante il ripristino EMA** | Ripresa da checkpoint senza EMA o config diversa | Leggi `"Could not restore the generator EMA..."` nel terminale | Redpanda-vc riparte automaticamente con EMA inizializzato dai pesi del generatore ripreso |
| **Fresh Training ha eliminato i checkpoint** | **Fresh Training** (`--cleanup`) era spuntato | Controlla `logs/<model_name>/` | Togli la spunta a **Fresh Training** quando riprendi; i file eliminati non sono recuperabili senza backup |
| **È stato raggiunto Total Steps** | `global_step >= Total Steps` | Leggi `"already reached step X. Raise the total steps..."` | Alza **Total Steps** oltre lo step attuale e clicca **Run full workflow** |
| **Un `.pth` esportato non riprende il training** | Selezionato un `.pth` da inference invece di `G_*.pth` + `D_*.pth` | Controlla il nome (`<nome>_Xe_Ys.pth` vs. `G_*.pth`) | I `.pth` per inference non contengono lo stato di training; riprendi da `logs/<model_name>/` con `G_*.pth` e `D_*.pth` |
| **Aumento anomalo di VRAM** | **Checkpointing** disattivato, **Batch Size** alto o **Cache Dataset in GPU** attivo | Controlla **Advanced Settings** | Attiva **Checkpointing** (activation checkpointing), disattiva **Cache Dataset in GPU** e riduci **Batch Size** |

---

## FAQ

**Cosa significa EMA?**
Exponential Moving Average: una media progressiva dei pesi del generatore mantenuta durante il training.

**EMA migliora la qualità della voce?**
Può attenuare le oscillazioni dei pesi, ma non è una garanzia. Il risultato reale dipende dal dataset e va verificato all'ascolto.

**I principianti dovrebbero lasciare EMA a `0.999`?**
Sì, `0.999` è il predefinito di Redpanda-vc ed è un buon punto di partenza prima di testare altri valori.

**Cosa succede se EMA Decay è `0`?**
EMA viene disabilitato e i modelli per inference vengono esportati dai pesi correnti del generatore.

**`0.9999` è meglio di `0.999`?**
Non automaticamente: `0.9999` media su una finestra più lunga e reagisce più lentamente agli aggiornamenti recenti.

**EMA rende il training più veloce?**
No. EMA mantiene una copia extra dei pesi ed esegue un aggiornamento dopo ogni step del generatore.

**EMA previene l'overfitting?**
No. L'overfitting dipende ancora da dimensione del dataset, varietà e durata del training.

**EMA viene applicato anche al discriminatore?**
No. In Redpanda-vc (`train.py`) EMA viene applicato solo al generatore (`net_g`).

**Che differenza c'è tra epoch e step?**
Un'epoca è un passaggio completo sul dataset; uno step è un singolo aggiornamento dei pesi dopo un batch.

**Redpanda-vc può salvare a metà di un'epoca?**
Sì. I salvataggi sono attivati da `Save Every X Steps`, indipendentemente dalla fine dell'epoca.

**Perdo i progressi se fermo il training?**
Mantieni i progressi fino all'ultimo checkpoint `G`/`D` salvato; gli step successivi vengono persi.

**Che differenza c'è tra Save Only Latest e Save Every Weights?**
`Save Only Latest` sovrascrive i checkpoint `G_2333333.pth` / `D_2333333.pth`; `save_every_weights` esporta un `.pth` per inference a ogni salvataggio invece che solo alla fine.

**Checkpointing è la stessa cosa che salvare i checkpoint?**
No. `Checkpointing` in Advanced Settings è activation checkpointing per ridurre la VRAM, mentre `Save Every X Steps` controlla i salvataggi su disco.

**Posso riprendere il training da un `.pth` per inference?**
No. Per riprendere serve la coppia `G_*.pth` e `D_*.pth` in `logs/<model_name>/`.

---

## Fonti ufficiali e approfondimenti

- **Repository Redpanda-vc:** [github.com/redpanda343/Redpanda-vc](https://github.com/redpanda343/Redpanda-vc)
- **Implementazione `GeneratorEMA`:** [`rvc/train/train.py` (righe 179-217)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py#L179-L217)
- **Salvataggio per step, ripresa ed export:** [`rvc/train/train.py` (righe 420-436, 526-579, 763-853, 902-921, 1044-1097, 1146-1195)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py#L1146-L1195)
- **Controlli WebUI del training:** [`tabs/train/rvc.py` (righe 663-880)](https://github.com/redpanda343/Redpanda-vc/blob/main/tabs/train/rvc.py#L663-L880)
- **Esportatore manuale checkpoint:** [`rvc/train/process/checkpoint_exporter.py` (righe 44-117)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/process/checkpoint_exporter.py#L44-L117)
- **I/O checkpoint e controllo processo:** [`rvc/train/utils.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/utils.py) · [`rvc/train/process/training_control.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/process/training_control.py)
- **Documentazione ufficiale PyTorch:** [Weight Averaging (SWA and EMA)](https://docs.pytorch.org/docs/stable/optim.html#weight-averaging-swa-and-ema) · [`torch.optim.swa_utils.AveragedModel`](https://docs.pytorch.org/docs/stable/generated/torch.optim.swa_utils.AveragedModel.html)
- **Studio scientifico:** Morales-Brotons, Vogels e Hendrikx, *Exponential Moving Average of Weights in Deep Learning: Dynamics and Benefits* ([OpenReview](https://openreview.net/forum?id=2M9CUnYnBA))
