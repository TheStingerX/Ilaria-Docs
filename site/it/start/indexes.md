# File Index di RVC e Feature Retrieval (`.index`)

Quando scarichi o alleni un modello vocale RVC, trovi quasi sempre due file: un file `.pth` e un file `.index`. Mentre il `.pth` è obbligatorio, il file `.index` viene spesso frainteso.

Questa guida spiega a cosa serve davvero un `.index`, la differenza fondamentale tra `added_*.index` e `trained_*.index`, come regolare l'**Index Rate**, quando conviene abbassarlo o spegnerlo e cosa fare se manca.

---

## 1. Cos'è un file `.index` (Feature Retrieval)?

La conversione vocale RVC si basa su due componenti principali:
1. **Il file `.pth` (il Generatore):** La rete neurale che ha imparato a trasformare le caratteristiche del parlato nel timbro della voce obiettivo.
2. **Il file `.index` (il Database delle Feature):** Un **indice vettoriale FAISS** che contiene i veri vettori acustici estratti dall'[embedder](embedders.md) (come `contentvec`) da ogni singola clip del dataset di training.

Durante la conversione, il **Feature Retrieval** confronta ogni micro-frammento del tuo audio di ingresso con il database `.index`, cerca i frammenti più simili presi dalle registrazioni originali della voce e li mescola prima di passarli al generatore `.pth`.

**In parole semplici:**
- Il `.pth` è il **motore** (obbligatorio).
- Il `.index` è una **libreria di riferimento delle abitudini vocali reali** dello speaker (opzionale): respiri, sfumature delle vocali, leggera raucedine, timbro nasale e dettagli di pronuncia che il solo `.pth` tenderebbe ad appiattire.

!!!tip
**Compatibilità:**
Un modello `.pth` funziona benissimo anche **senza** file `.index` (`Index Rate = 0`). Se un modello scaricato non include un `.index`, puoi usarlo comunque senza problemi.
!!!

---

## 2. `added_*.index` vs `trained_*.index`

Quando RVC crea l'indice dentro `logs/<nome_esperimento>/`, genera di solito due file `.index`:

| Nome del file | Cosa contiene | Va usato? |
| --- | --- | --- |
| **`added_*.index`** | L'indice FAISS completo **con tutti i vettori del dataset inseriti dentro** (es. `added_IVF256_Flat_nprobe_1_MiaVoce_v2.index`). | **SÌ. Usa sempre questo** per l'inferenza e per condividere il modello. |
| **`trained_*.index`** | Solo la struttura intermedia dei cluster creata prima di aggiungere i vettori del dataset. | **NO.** Non selezionarlo e non distribuirlo: dà risultati scarsi o nulli. |

Quando condividi o esporti un modello (ad esempio con **Export model ZIP** in Ilaria RVC), abbina sempre al `.pth` il file **`added_*.index`**, mai `trained_*.index`.

---

## 3. Come regolare `Index Rate` (da `0` a `1.0`)

Lo slider **Index Rate** (a volte chiamato *Search Feature Ratio* o *Retrieval Ratio*) decide con quanta forza il database `.index` spinge la voce convertita verso i frammenti reali del dataset di training:

| Index Rate | Effetto sulla voce | Quando usarlo (punti di partenza) |
| --- | --- | --- |
| **`0.0` (Spento)** | Nessun recupero FAISS: mantiene il `100%` delle feature estratte dall'audio in ingresso, convertite solo dai pesi del `.pth` (`retrieved * 0 + original * 1`). | Baseline diagnostica utile senza retrieval FAISS, minor carico CPU e modelli fusi. |
| **`0.25 - 0.50`** | Miscela leggera verso l'indice (`25% - 50%` feature recuperate, `50% - 75%` originali) che mantiene intatti pronuncia e ritmo. | **Parlato**, **conversione tra lingue diverse** (es. parlato italiano su modello inglese/giapponese), o modelli allenati su dataset leggermente rumorosi. |
| **`0.60 - 0.75`** | Miscela più forte verso l'indice (`60% - 75%` feature recuperate) per maggiore somiglianza timbrica. | Punto di partenza tipico per canto pulito e doppiaggi nella stessa lingua. |
| **`0.85 - 1.00`** | Retrieval massimo (`85% - 100%` feature recuperate); forza le feature il più vicino possibile ai vettori del dataset. | Solo per dataset da studio pulitissimi nella stessa lingua. Rischio alto di parole mangiate o ritorno di artefatti del dataset. |

Nota: in Ilaria RVC la formula effettiva nell'inferenza è `features = retrieved_features * index_rate + original_features * (1 - index_rate)`. I pesi `.pth` vengono sempre usati per generare l'audio; `Index Rate = 0` disattiva soltanto la ricerca nell'indice FAISS.

---

## 4. Quando conviene abbassare o spegnere `Index Rate`

Alzare **Index Rate** verso `1.0` **non** migliora automaticamente la voce. Abbassalo a `0.2 - 0.4` (oppure `0`) ogni volta che noti:

1. **Fruscio di fondo, crepitii o eco della stanza:** Un file `.index` contiene **vettori di feature estratti**, non registrazioni audio grezze. Tuttavia, se il dataset conteneva rumore di fondo o riverbero, i vettori vicini estratti dall'indice possono trasportare quelle caratteristiche nella conversione.
2. **Parole storpiate o accento strano:** Se parli in una lingua diversa da quella del dataset, un Index Rate alto cerca di forzare le vocali e consonanti dell'altra lingua sulle tue parole.
3. **Voci fuse con Voice Blender:** Fondere due `.pth` nel [Voice Blender](../ilaria-rvc/manage/voice-blender.md) **non** crea un nuovo `.index`. Testa sempre i modelli fusi a `Index Rate = 0` per primi.
4. **Scatti nel Voice Changer Live:** Cercare dentro un grande indice FAISS a ogni chunk aggiunge lavoro alla CPU. Abbassare o azzerare `Index Rate` riduce latenza e micro-scatti.

---

## 5. Regole di compatibilità (perché non si possono mescolare gli `.index`)

Un file `.index` è legato strettamente al **modello esatto** e all'**embedder** con cui è stato costruito:

- **Stesse dimensioni / versione RVC:** Un modello `v1` usa feature a **256 dimensioni** (`3_feature256`), mentre un `v2` usa **768 dimensioni** (`3_feature768`). Mescolare `v1` e `v2` causa errori di dimensione.
- **Stesso embedder:** Un index creato con `contentvec` non combacia con un modello che si aspetta un encoder diverso.
- **Stesso speaker:** Mettere l'`.index` della Voce A sul `.pth` della Voce B **non** fonde bene le due voci; invia le feature sbagliate al decoder e produce un suono ovattato o rovinato.

---

## 6. Come rigenerare un file `.index` mancante

### Caso A: Hai solo un file `.pth` scaricato
**Non** puoi ricreare un vero `.index` partendo dal solo `.pth`. L'`.index` viene costruito dai vettori estratti (`.npy`) dell'audio originale del dataset, che non sono contenuti nel `.pth` esportato. Imposta semplicemente **Index Rate = 0** e usa il `.pth` da solo.

### Caso B: Hai allenato tu il modello e hai ancora `logs/<nome_esperimento>/`
Se la cartella dell'esperimento contiene ancora la cartella delle feature estratte (`3_feature256` o `3_feature768`), puoi rigenerare l'indice in pochi secondi senza riallenare:
1. Apri la scheda **Train** in Ilaria RVC (o Applio / RVC Mainline).
2. Inserisci **esattamente lo stesso Nome Esperimento**, **Versione RVC (`v1`/`v2`)**, **Sample Rate** ed **Embedder** usati in training.
3. Clicca solo **Train Feature Index** (senza ripetere il preprocessing né l'addestramento del modello).
4. Al termine, troverai il nuovo file **`added_*.index`** dentro `logs/<nome_esperimento>/`.

### Caso C: La creazione dell'index va in crash per RAM / Pagefile
Dataset molto grandi (migliaia di clip) richiedono molta RAM di sistema durante il clustering FAISS. Se la creazione va in crash con `WinError 1455` o blocca Windows, chiudi altre app, aumenta la **Memoria Virtuale (Pagefile)** di Windows (vedi [Risoluzione dei problemi](../reference/troubleshooting.md)) oppure riduci le clip ripetitive del dataset.
