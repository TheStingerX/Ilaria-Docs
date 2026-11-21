---
label: "🎚️ Pitch e qualità audio"
order: 94
permalink: /audio-quality/
description: "Guida verificata sul codice per migliorare la qualità audio dell'inferenza RVC in Ilaria RVC: baseline diagnostica, pitch, metodi F0, Index Ratio, Protect, Formant Shifting, Volume Envelope e Post-Process."
---
# Migliorare la Qualità Audio dell'Inferenza RVC

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Nella conversione vocale RVC, la **qualità audio** dipende da due metà che lavorano insieme: la **registrazione sorgente** in ingresso e il **modello + impostazioni di inferenza** applicati. Nei modelli RVC con guida F0, la conversione sintetizza il timbro della voce target utilizzando il contorno F0 estratto dalla registrazione sorgente; la voce target non impone automaticamente il proprio registro di pitch (il risultato dipende comunque dal dataset e dai limiti del modello). RVC **non può** riparare clipping, musica di sottofondo pesante, eco della stanza o dizione impastata già presenti nel file di ingresso.

## Parti da una baseline diagnostica concreta

Prima di modificare gli slider avanzati, esegui un passaggio pulito in **Ilaria RVC** per capire come si comporta il generatore `.pth` da solo sul tuo audio sorgente:

1. Apri la scheda **Inference**.
2. Seleziona la voce target in **Voice Model** (clicca **Refresh** se l'hai appena aggiunta).
3. Resta nella sottoscheda **Single Inference**.
4. Carica la registrazione in **Audio to convert**. *(Un estratto breve aiuta a isolare più rapidamente un punto preciso, ma le clip brevi non sono mai obbligatorie.)*
5. Imposta **Pitch** su `0`.
6. Sotto **Inference Settings**, seleziona **RMVPE** in **Pitch Extraction**.
7. Imposta **Index Ratio** su `0` (disattiva il retrieval delle feature FAISS così ascolti il generatore `.pth` senza miscelazione con l'indice).
8. Lascia disattivate (**OFF**) tutte le caselle opzionali di **Audio Processing** (**Split Audio**, **Autotune**, **Proposed Pitch**, **Clean Audio**, **Formant Shifting**, **Post-Process**) e **RMVPE High Register**.
9. Clicca **Convert**.
10. Ascolta **Output Audio** e leggi **Output Log** per stato della conversione, tempi di esecuzione e dettagli disponibili su indice o embedder. Questi messaggi non confermano necessariamente che il retrieval FAISS sia riuscito (un indice può essere selezionato e segnalato come abilitato nelle impostazioni anche se il caricamento FAISS fallisce o viene saltato, e `Embedder` può non essere stampato esplicitamente quando è selezionato `Auto (model default)`). Controlla la diagnostica in console se il caricamento dell'indice fallisce o il risultato è inatteso.

> **Solo baseline diagnostica:** Questa configurazione iniziale serve a isolare ciò che fa il generatore `.pth` senza retrieval FAISS o post-processing; non è una garanzia di qualità finale ottimale. Modifica un solo controllo alla volta partendo da questa baseline e confronta a volume d'ascolto equivalente.

---

## A. Ottenere una conversione pulita

- **Audio sorgente e voci isolate:** RVC richiede una singola voce asciutta e pulita. Strumenti come [UVR5](../non-rvc/uvr5/overview.md) o [MVSep](../non-rvc/mvsep/overview.md) possono aiutare a separare la voce dalla base musicale, e modelli dedicati affrontano compiti specifici come denoising, dereverberation, de-essing o audio restoration in base al modello usato (nessuno strumento elimina qualsiasi tipo di rumore o riverbero).
- **Parlato vs. canto:** Il parlato tollera spesso piccoli aggiustamenti di **Pitch**, mentre il canto su una base strumentale mantiene di norma **Pitch** su `0` per restare nella tonalità della base (una trasposizione diversa dall'ottava può essere appropriata se viene cambiata anche la tonalità dell'accompagnamento).
- **Compatibilità modello ed embedder:** Lascia **Embedder Model** su `Auto (model default)` a meno che tu non abbia addestrato o scaricato un modello che richiede un encoder specifico (`contentvec`, `spin-v2`, `klm-vocal-contentvec`, ecc.). Usare un embedder incompatibile può generare un errore o degradare la conversione e compromettere la corrispondenza con l'indice.
- **Modelli non guidati dal pitch (`if_f0 == 0`) vs. modelli guidati dal pitch (`if_f0 == 1`):**
  - **Modelli non guidati dal pitch (`if_f0 == 0`):** Saltano l'estrazione F0 (`pitch` e `pitchf` non vengono passati al generatore `.pth`). Senza condizionamento F0, **Pitch**, **Pitch Extraction**, **RMVPE High Register**, **Autotune**, **Proposed Pitch** e **Protect** (nascosto nell'interfaccia quando `if_f0 == 0`) non si applicano. **Embedder**, **Index Ratio**, **Formant Shifting**, **Volume Envelope**, **Clean Audio** e **Post-Process** (incluso **Post-Process → Pitch Shift**) funzionano invece normalmente.
  - **Modelli guidati dal pitch (`if_f0 == 1`):** Estraggono un contorno F0 dall'ingresso a `16 kHz` e lo passano al generatore `.pth` insieme alle feature di contenuto. **Pitch Extraction**, **Pitch**, **RMVPE High Register**, **Autotune**, **Proposed Pitch** e **Protect** (quando `Index Ratio > 0` e `protect < 0.5`) sono tutti attivi, rendendo questi modelli adatti al canto e al parlato con controllo dell'intonazione.
- **Indice opzionale ed esportazione lossless:** Mantieni **Index Ratio** su `0` per la baseline, poi prova l'`added_*.index` corrispondente se desiderato. Usa `wav` o `flac` per esportazioni lossless; `flac` riduce la dimensione del file senza compressione audio con perdita. `mp3`, `ogg` e `m4a` usano codifica lossy nell'attuale esportatore di Ilaria RVC, e il formato di esportazione non aggiunge dettagli che il modello non ha prodotto.

---

## B. Risolvere problemi di pitch e canto

- **Pitch (Semitoni):** Pitch modifica il contorno F0 estratto in semitoni (`-24` a `+24`; `12` semitoni = 1 ottava). A `0`, la conversione guidata dal pitch segue l'intonazione sorgente senza trasposizioni aggiuntive. Scegli un valore diverso solo quando serve per la resa target o l'arrangiamento musicale (nel canto, una trasposizione diversa dall'ottava può essere appropriata se viene cambiata anche la tonalità dell'accompagnamento). Non esiste uno spostamento di pitch universale per convertire tra tipi di voce diversi. Richiede un modello guidato dal pitch (`if_f0 == 1`).
- **Pitch Extraction (F0) in Ilaria RVC:** Stima la frequenza fondamentale (F0) dall'ingresso a `16 kHz` prima della sintesi (operazione distinta dal Pitch Shifting).
  - **Inferenza Singola e Batch (CUDA):** `rmvpe` (predefinito), `swift`, `beatrice`, `fcpe`, `parselmouth`, `harvest`, `crepe`. *(Su build DirectML: `pm`, `harvest`, `rmvpe`, `fcpe`.)*
  - **Solo estrazione feature in Training:** Include `rmvpe_gpu` (e `dio`); `rmvpe_gpu` **non** è un pulsante separato in Inferenza.
  - *Nota:* Se `rmvpe` produce un salto d'ottava su una nota precisa, prova `fcpe`, `swift`, `beatrice` o `crepe` sullo stesso passaggio anziché dare per scontato che un metodo sia universalmente "migliore" o più rapido per ogni voce.
- **RMVPE High Register** *(visibile solo quando è selezionato `rmvpe`)*:
  - **Enable high register:** Abilita la correzione secondaria degli errori d'ottava per note cantate molto acute. **Non** lasciarlo attivo di default per parlato normale o canto nel registro medio.
  - **Mode (`true_pitch` / `fold`):** `true_pitch` mantiene la F0 corretta fino a **Maximum F0 (Hz)** (`1000–2000`, default `1250`); `fold` mantiene le note corrette un'ottava sotto.
  - **Advanced (`Activation threshold` `800–1500` Hz default `1040`, `Sensitivity`, `Minimum note duration` `0–300` ms default `60`):** Regola quando interviene la correzione del registro acuto.
  - **Preview original and corrected F0:** Traccia i primi 30 secondi di F0 stimata vs. corretta senza eseguire la conversione vocale completa. Un grafico più pulito aiuta a diagnosticare salti d'ottava, ma non garantisce automaticamente un audio migliore all'ascolto.
- **Autotune e Autotune Strength (`0–1`, default `1.0`):** Aggancia i frame F0 sonori alla nota cromatica temperata più vicina (`G1`–`C6`), scalato da **Autotune Strength**. Poiché attira verso *ogni* semitono cromatico (non c'è **alcun** selettore di tonalità o scala in Ilaria RVC), una forza elevata può appiattire vibrato naturale e glissati espressivi.
- **Proposed Pitch e Target Pitch (Hz) (`50–1200`, default `155`):** Calcola la mediana dei frame F0 sonori interpolati sull'audio sorgente e aggiunge un offset automatico in semitoni (`-12` a `+12`) verso **Target Pitch (Hz)** sommato allo slider **Pitch**. Utile come test rapido di trasposizione, anche se il pitch matematicamente centrato non è sempre la scelta musicale o vocale migliore. Sia **Autotune** che **Proposed Pitch** richiedono un modello guidato dal pitch (`if_f0 == 1`).

---

## C. Risolvere identità vocale e timbro

- **Content Embedder vs. Voice Generator (`.pth`):** Il generatore `.pth` addestrato produce la voce target, mentre il content embedder (predefinito `Auto (model default)`, tipicamente `contentvec`) estrae le feature del parlato dalla registrazione sorgente. L'embedder è progettato per ridurre le informazioni sull'identità del parlante sorgente, pur non essendo necessariamente del tutto indipendente dal parlante, e non definisce l'identità della voce target. Usa l'embedder atteso dal modello per preservare la compatibilità ed evitare artefatti di conversione. Gli embedder HuBERT Base cinese, giapponese, coreano e portoghese richiedono un modello **RVC v2**.
- **Come funziona davvero `Index Ratio` (`0–1`, default `0`):** Un generatore `.pth` viene **sempre** usato indipendentemente da Index Ratio. Quando un database FAISS `added_*.index` è caricato e `Index Ratio > 0`, RVC cerca gli 8 vettori di feature più vicini nell'indice e li miscela con le feature estratte dal tuo ingresso *prima* del generatore `.pth`:
  `features = retrieved_features * index_rate + original_features * (1 - index_rate)`
  - **`Index Ratio = 0`** disabilita il retrieval FAISS (`original_features` soltanto) mentre il generatore `.pth` resta attivo, fornendo una baseline diagnostica utile senza retrieval di feature FAISS.
  - **Indice selezionato vs. Retrieval applicato:** Selezionare un file `.index` e impostare `Index Ratio > 0` fa riportare `Voice index setting: enabled` in **Output Log**, ma se il file manca o `faiss.read_index()` fallisce, il backend prosegue senza retrieval.
  - **Alzare Index Ratio** avvicina le feature ai vettori memorizzati nell'indice. Un indice corretto può migliorare alcune conversioni, ma può anche peggiorarle (ad esempio dizione ovattata o artefatti del dataset) in base all'audio e al modello. Nessun valore singolo garantisce una pronuncia migliore.
- **Formant Shifting (`apply_formant_shift`, `0.7–1.4`, default `1.0`):** Usa Praat/Parselmouth (`Change gender`) **prima** della sintesi RVC sull'ingresso a `16 kHz` per spostare le risonanze del tratto vocale. `1.0` è neutro; valori sotto `1.0` mirano a scurire/approfondire la risonanza vocalica, mentre valori sopra `1.0` mirano a schiarirla. L'algoritmo mira a preservare pitch e durata, ma possono comunque comparire artefatti, specie con valori estremi. **Formant Shifting** non equivale a cambiare **Pitch** né a **Post-Process → Pitch Shift** (che sposta il pitch in uscita dopo RVC).

---

## D. Risolvere consonanti e respiri

- **Come funziona `Protect clear consonants and breathing sounds` (`0–0.5`, default `0.33`):**
  - Nella pipeline di inferenza (`vc()`), quando `protect < 0.5` **e** il modello usa la guida F0 (`if_f0 == 1`), RVC salva una copia delle feature originali non miscelate (`feats0`) *prima* del retrieval FAISS.
  - Dopo il retrieval, i frame non sonori / a F0 bassa (`pitchf < 1`) vengono miscelati indietro verso `feats0`: valori più bassi avvicinano i frame non sonori a `feats0`, mentre **`0.5` disattiva la protezione**.
  - **Limitazione critica:** Poiché `Protect` miscela verso `feats0` (le feature pre-retrieval), **quando `Index Ratio = 0`, `feats` e `feats0` sono identici**, quindi cambiare `Protect` produce poca o nessuna differenza. Inoltre `Protect` non è un denoiser né un filtro di restauro audio e non può riparare consonanti già clippate o distorte nella sorgente o nel modello.

---

## E. Risolvere volume, rumore e distorsione

- **Volume Envelope (`0=Input source volume, 1=Normalized Output`, default `0.25`):** Usa `change_rms()` per miscelare l'inviluppo di ampiezza RMS dell'audio in ingresso (`1 - rate`) con l'inviluppo RMS dell'uscita RVC (`rate`).
  - `0` fa seguire all'audio convertito l'**inviluppo RMS dell'audio sorgente**.
  - `1` mantiene l'**inviluppo RMS proprio del generatore RVC**.
  - Nota: Nonostante l'etichetta dell'interfaccia, `1` **non** normalizza a un target LUFS fisso e **non** è un compressore o un limiter. Regolare `Volume Envelope` modifica l'adattamento dinamico del livello, utile quando pause silenziose o sbalzi di livello causano effetti di pumping.
- **Clean Audio e Clean Strength (`0–1`, default `0.5`):** Esegue `noisereduce` **dopo** la conversione RVC sull'audio convertito, con **Clean Strength** a controllare l'intensità della riduzione. In base alla registrazione e al rumore presente, una riduzione troppo aggressiva può alterare consonanti, respiri e dettagli vocali; non esiste una soglia universalmente corretta. `Clean Audio` è una riduzione del rumore post-processing, non un restauro audio: non può riparare il clipping né correggere un modello addestrato male.
- **Post-Process Effects** *(applicati dopo la conversione tramite FFmpeg/librosa; lasciali OFF per i test di baseline)*:
  - `Pitch Shift (-12..+12)`: Shift del pitch post-RVC tramite librosa (altera l'audio già sintetizzato anziché il contorno F0 di RVC).
  - `Limiter (-24..0 dBFS, default -6)` e `Gain (-24..+24 dB)`: Nell'attuale catena di filtri FFmpeg (`ilaria_inference_effects.py`), **Limiter** viene inserito **prima** di **Gain** quando entrambi sono attivi. Poiché `Gain` viene applicato dopo `Limiter`, un `Gain` positivo può riportare i picchi in clipping; `Limiter` non garantisce un'uscita finale priva di clipping se seguito da `Gain` positivo.
  - Effetti creativi/di utilità: `Reverb`, `Distortion`, `Chorus`, `Bitcrush`, `Clipping`, `Compressor`, `Delay`.
- **Resampling (`0–48000`, `0=none`) e Export Format:** Lascia `0` per mantenere la frequenza di campionamento nativa del modello (`32k`/`40k`/`48k`). Imposta `44100` o `48000` solo se la tua DAW o il progetto richiedono una frequenza specifica (il resampling cambia la frequenza di campionamento, non la qualità intrinseca della sintesi). Usa `wav` o `flac` per esportazioni lossless durante i controlli qualità.

---

## F. Registrazioni lunghe e Batch Inference

- **Split Audio:** Richiama `silence_split_points()` per inserire punti di taglio allineati ai frame nelle pause silenziose mantenendo i normali tagli RVC per file lunghi (`opt_ts`). Questo modifica la dimensione dei segmenti passati alla sintesi e può alterare il comportamento nei punti di giunzione. **Non** evita necessariamente il caricamento completo dell'audio in memoria, **non** elimina tutte le cause di uso eccessivo della memoria e **non** è una soluzione per volume, distorsione o qualità vocale.
- **Single vs. Batch Inference:** Entrambe le schede espongono gli stessi controlli principali (`Pitch`, `Pitch Extraction`, `Index Ratio`, `Resampling`, `Volume Envelope`, `Protect`, `Export Format`, `Audio Processing`, `Embedder Settings` e `RMVPE High Register`). Usa **Single Inference** per calibrare le impostazioni su un singolo file con ascolto immediato; usa **Batch Inference** (`InferOutput/` o cartella scelta) una volta verificate le impostazioni per convertire più file in un solo passaggio.

---

## Matrice Diagnostica di Risoluzione Problemi

| Sintomo | Possibili cause | Controlla prima | Regolazione da provare | Risultato atteso | Se non funziona |
| --- | --- | --- | --- | --- | --- |
| **Voce troppo acuta / troppo brillante** | **Pitch** alzato troppo, offset **Proposed Pitch**, **Formant Ratio** alto o modello allenato su registro più acuto | Controlla **Pitch**, **Proposed Pitch** e **Formant Shifting** | Imposta **Pitch** su `0` (o abbassa se serve) e disattiva **Proposed Pitch** e **Formant Shifting** | F0 segue la sorgente senza spinte verso l'alto | Distingui altezza F0 da risonanza: prova una piccola riduzione di **Formant Ratio** sotto `1.0` (esempio facoltativo: `0.9`) o verifica i limiti del modello |
| **Voce troppo profonda / ovattata** | **Pitch** abbassato troppo, **Formant Ratio < 1.0** o incompatibilità modello/indice | Controlla **Pitch**, **Formant Shifting** e **Index Ratio** | Imposta **Pitch** su `0` (o alza se serve) e disattiva **Formant Shifting** | Presenza medio-alta più chiara senza spostamenti verso il basso | Prova **Index Ratio = 0** per isolare la chiarezza del `.pth`, o un piccolo aumento di **Formant Ratio** sopra `1.0` (esempio facoltativo: `1.1`) |
| **Timbro metallico / fragile** | **Index Ratio** eccessivo o incompatibile, **Clean Audio** o **Autotune** | Controlla **Audio Processing** attivi e **Output Log** | Imposta **Index Ratio = 0**, disattiva **Clean Audio** e **Autotune** | Isola il timbro base del `.pth` | Prova un altro estrattore F0 (`fcpe`, `swift`, `beatrice` o `crepe`) |
| **Identità vocale target debole** | Modello `.pth` errato, incompatibilità embedder, indice mancante/incompatibile, limiti sorgente o training | Verifica **Voice Model**, **Embedder Model**, qualità sorgente e stato indice in console/log | Conferma il `.pth` corretto e il relativo `added_*.index` (prova `Index Ratio > 0` se compatibile) | Timbro target più definito se modello e indice combaciano | Controlla `Model information` per compatibilità embedder e prova su una registrazione asciutta più pulita |
| **Troppo simile al parlante sorgente** | Incompatibilità modello/embedder, leakage del parlante o ampio divario di estensione vocale | Confronta registrazione sorgente con embedder atteso ed estensione del modello | Imposta **Embedder Model** su `Auto (model default)` e prova un `added_*.index` compatibile se disponibile | Maggiore separazione dal parlante sorgente | Regola **Pitch** solo se necessario per l'esecuzione target o prova un altro modello |
| **Consonanti impastate / rovinate** | **Index Ratio** eccessivo o incompatibile, **Protect** disattivato (`0.5`) o dizione sorgente poco chiara | Controlla **Index Ratio** e **Protect** (`0.5` = off; default `0.33`) | Abbassa **Index Ratio** (o prova `0`) e imposta **Protect** sotto `0.5` quando usi un indice su modello F0 | Preserva meglio le feature non sonore sorgente (`feats0`) durante il blending | Verifica la dizione dell'audio sorgente asciutto; `Protect` non ripara consonanti già impastate o clippate |
| **Sibilanti aspre (`s`/`sc`)** | Microfono sorgente brillante, **Formant Ratio** alto o distorsione **Post-Process** | Ascolta l'audio sorgente asciutto in Audio Analyzer | Disattiva **Formant Shifting** e **Post-Process**; prova **Index Ratio = 0** | Transienti `s`/`sc` più morbidi | Applica de-essing alla registrazione sorgente asciutta prima di RVC |
| **Respiri distorti o assenti** | Gate/rumore nella sorgente, limiti del modello, **Volume Envelope** o **Clean Audio** post-conversione | Confronta i respiri sorgente con l'audio convertito | Disattiva **Clean Audio** e prova **Volume Envelope** (es. `0` vs `0.25` default) | I respiri seguono più fedelmente la dinamica sorgente | Abbassa **Index Ratio** (o imposta `0`) se il retrieval preleva frame rumorosi |
| **Salti d'ottava sulle note tenute** | Tracker F0 ingannato da armoniche o note molto acute | Controlla forma d'onda/pitch in **Audio Analyzer** | Alterna **RMVPE** / **FCPE** / **Swift** / **CREPE**, o prova **RMVPE High Register** | Tracciamento F0 più stabile sulle note tenute | Controlla lo stem sorgente per residui strumentali o armonie |
| **Vibrato innaturale / glissati piatti** | **Autotune** attivo su canto espressivo | Controlla **Audio Processing → Autotune** | Disattiva **Autotune** o riduci **Autotune Strength** (esempio facoltativo: `0.3`) | Ritornano vibrato naturale e glissati | Confronta la fluidità F0 di **RMVPE** vs **CREPE** |
| **Pitch instabile / oscillante** | Sorgente rumorosa/riverberante o tracciamento `parselmouth`/`harvest` | Ascolta lo stem sorgente isolato | Applica separazione/denoising/dereverberation prima di RVC e usa **RMVPE** | Contorno F0 più stabile | Aumenta `filter_radius` (`>= 3`) se usi specificamente `harvest` |
| **Voce robotica / da vocoder** | **Embedder** errato, mismatch `v1`/`v2` (che può anche bloccare la conversione con errore) o gravi errori F0 | Controlla **Output Log** e console per avvisi embedder/F0 | Imposta **Embedder Model** su `Auto (model default)` e verifica **RMVPE** | Sintesi vocale naturale | Prova su una registrazione sorgente asciutta e più pulita |
| **Fruscio di fondo / artefatti di denoising** | **Clean Audio** troppo intenso o registrazione sorgente rumorosa | Confronta con **Clean Audio** OFF | Disattiva **Clean Audio** o riduci **Clean Strength** | Meno artefatti acquosi di denoising | Applica denoising/dereverberation dedicato *prima* di RVC |
| **Clipping / distorsione aspra** | Clipping già nell'audio sorgente, in inferenza, **Gain** positivo (anche dopo **Limiter**), FX **Distortion/Clipping** o in export | Verifica dove compare la distorsione (sorgente vs. output in **Audio Analyzer**) | Disattiva **Post-Process** (specie **Gain** positivo dopo **Limiter**) | Elimina il clipping post-RVC | Abbassare il volume su un file già clippato **non** ricostruisce i campioni mancanti; registra di nuovo o usa una sorgente pulita |
| **Volume irregolare / effetto pumping** | **Volume Envelope** non adatto alla dinamica sorgente | Confronta **Volume Envelope** `0` vs `0.25` (default) vs `1.0` | Sposta **Volume Envelope** verso `0` (RMS sorgente) o `1.0` (RMS modello) | Livello delle frasi più uniforme | Applica **Compressor** / **Limiter** leggeri (senza **Gain** positivo dopo) solo se necessario |
| **Errori di resampling / export / batch** | Frequenza `Resampling` non valida, FFmpeg mancante (per `mp3`/`ogg`/`m4a`) o percorso cartella errato | Leggi il messaggio esatto in **Output Log** e console | Imposta `Resampling = 0`, esporta `wav` o `flac`, usa percorsi ASCII semplici | Esportazione lossless pulita | Avvia `RUN_ILARIA_RVC_LOGS.bat` per ispezionare il traceback completo |

## Guide correlate

- [Inferenza singola e batch](../ilaria-rvc/convert/inference.md) · [Controlli di inferenza](../ilaria-rvc/convert/inference-buttons.md) · [Inferenza avanzata](../ilaria-rvc/convert/advanced-inference.md)
- [File index (.index)](../start/indexes.md) · [Pitch extractor](../start/pitch-extractors.md) · [Embedder](../start/embedders.md) · [Audio Analyzer](../ilaria-rvc/manage/audio-analyzer.md)
