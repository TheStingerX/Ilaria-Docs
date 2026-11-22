# Addestra un modello vocale RVC

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

L'addestramento insegna una voce di destinazione a partire da una raccolta preparata di audio. Usa questa guida quando vuoi creare un modello dalle tue registrazioni o da registrazioni autorizzate. Se hai già un modello di inferenza, consulta [Modelli e file RVC](../start/models.md) per iniziare a usarlo.

## Pianifica il tuo primo addestramento

Prepara l'audio con la [guida al dataset](dataset-preparation.md), poi selezionalo in **Training**. Dai all'esperimento un nome univoco e scegli una breve registrazione esterna al set di addestramento per i test d'ascolto. Inizia con un'esecuzione modesta capace di completare tutte le fasi e produrre un'esportazione utilizzabile. Questo ti fornisce una base per valutare modifiche a dati o impostazioni.

Annota versione dell'applicazione, revisione del dataset, formato e sample rate del modello, embedder, metodo di pitch, coppia di pre-addestrati, batch size e intervallo di salvataggio previsto. Aggiungi il nome della clip di test esclusa. Se un'esecuzione successiva suona diversa, queste note ti aiutano a capire cosa è cambiato.

## Scegli impostazioni compatibili

| Impostazione | Cosa controllare |
| --- | --- |
| Formato modello, vocoder e sample rate | Seleziona una combinazione supportata dall'app e dal client di riproduzione previsto. Un'architettura specifica di un fork può limitare dove il modello può caricarsi. |
| Guida ed estrazione del pitch | La guida del pitch è utile per modellare materiale dipendente dall'intonazione, soprattutto il canto. Scegli un estrattore disponibile per il training nella tua build. |
| Embedder | Definisce la rappresentazione estratta dall'audio. Annota la scelta così da usare la rappresentazione corrispondente nei client di inferenza supportati. |
| Generatore e discriminatore pre-addestrati | Usa una coppia abbinata compatibile con architettura, sample rate e configurazione pitch selezionati. I file generator e discriminator svolgono ruoli diversi nel training. |
| Batch size | Controlla quanti dati vengono elaborati per aggiornamento. Inizia con un valore che la tua GPU può contenere e abbassalo se il training esaurisce la memoria. |
| Obiettivo e intervallo checkpoint | Un'epoca è circa un passaggio completo attraverso il dataset preparato. Gli step sono singoli aggiornamenti di training. Salva periodicamente per confrontare le esportazioni e riprendere dopo un'interruzione. |

Usa le scelte di pretraining indicate come compatibili dalla tua build installata. In Ilaria RVC 2.1.0, ad esempio, il progetto documenta l'addestramento RefineGAN a 32 kHz con RVC V2 e guida pitch. La stessa release documenta anche un downloader per coppie pre-addestrate compatibili.

### Consigli pratici per l'addestramento

- **Epoche:** Prova una prima esecuzione di confronto con obiettivo intorno a 200 epoche e ascolta diversi salvataggi precedenti. È un punto di partenza per i test d'ascolto, poiché il checkpoint migliore può arrivare prima o dopo. Un'esecuzione da 1.000 epoche non offre alcuna garanzia di qualità.
- **Batch e precisione:** Inizia con un batch moderato, ad esempio 8, e considera 16 un limite superiore prudente di partenza. Riducilo se la memoria si esaurisce. La precisione mista FP16 può ridurre l'uso di VRAM e velocizzare il training su hardware supportato. Controlla se la tua build la attiva già e prova FP32 se la precisione mista produce loss non finite.
- **TensorBoard:** Usa le metriche per seguire i progressi e individuare esecuzioni bloccate o instabili. Le sole curve di loss non possono dirti quale checkpoint suoni meglio. Confronta le conversioni delle stesse clip di test escluse.
- **Normalizzazione:** Nelle build Applio con questi controlli, Pre regola i livelli prima del taglio (slicing) e Post li regola dopo. Usa None se i livelli originali sono già adatti. In Ilaria RVC, Process Data applica automaticamente la regolazione di livello a ogni segmento. L'implementazione pubblica non ha un selettore Post separato.
- **Filtro rumore:** Inizia con la riduzione del rumore opzionale disattivata per registrazioni pulite. Se il frontend espone anche un filtro passa-alto (high-pass), usalo per ronzii udibili a bassa frequenza e confronta il risultato a orecchio. Filtro passa-alto e riduzione rumore sono operazioni separate.
- **Cache GPU del dataset:** Lasciala disattivata per una base di riferimento. Consuma VRAM extra. Misura il tempo per epoca prima di attivarla per un'esecuzione più lunga.
- **Pesi pre-addestrati:** Abbina la coppia G/D ad architettura, vocoder, sample rate e configurazione pitch, e usa l'embedder specificato dall'autore del pretraining. Per pretraining RVC standard costruiti con ContentVec, seleziona ContentVec per estrazione delle feature e inferenza.

### Scegli una frequenza in base alla banda della sorgente

Controlla il sample rate nei metadati del file e ispeziona diverse clip rappresentative in uno spettrogramma come [Spek](https://www.spek.cc/p/download). Cerca dettaglio vocale utile anziché rumore isolato o un taglio netto lasciato dalla compressione. La metà del sample rate di addestramento è la frequenza più alta rappresentabile da quella frequenza. Un modello a 32 kHz può rappresentare frequenze fino a 16 kHz, un modello a 40 kHz fino a 20 kHz e un modello a 48 kHz fino a 24 kHz. Per dettaglio utile sopra i 20 kHz, scegli 48 kHz se architettura e pretraining lo supportano. Usa la frequenza compatibile più bassa quando copre già la banda della sorgente. Il preprocessing può ricampionare le registrazioni, ma non può ripristinare dettagli mancanti.

## Esegui le fasi in ordine

| Fase | Cosa produce | Cosa controllare |
| --- | --- | --- |
| Pre-elaborazione dataset | Audio preparato per la configurazione del modello dell'esperimento. | Il log nomina la cartella prevista e segnala l'elaborazione riuscita per i file utilizzabili. Controlla i file saltati prima di continuare. |
| Estrazione delle feature | Feature di contenuto, più i dati di pitch quando richiesti dalla configurazione scelta. | L'estrazione termina per l'esperimento corrente usando embedder e metodo pitch selezionati. |
| Addestramento modello | Checkpoint ed esportazioni di inferenza secondo le opzioni di salvataggio configurate. | Gli step di training avanzano e i file attesi vengono salvati. Leggi il primo errore se l'avanzamento si ferma. |
| Indice di retrieval | Raccolta ricercabile delle feature del dataset per uso opzionale in conversione. | L'indice appartiene a questo esperimento e corrisponde alla voce esportata. Se lo hai saltato, testa il modello indipendentemente. |

Usa il flusso automatico dove disponibile, oppure completa e verifica ciascuna fase prima di avviare la successiva. Un dataset o un sample rate modificati possono invalidare l'audio preparato e le feature estratte. Un embedder modificato richiede una nuova estrazione delle feature. Quando provi una configurazione incompatibile, avvia un esperimento separato così che cache e checkpoint esistenti restino disponibili.

## Segui i progressi in Ilaria RVC

- Usa **Training Dashboard** per controllare conteggio step, tempo per epoca e curve di loss. Una curva aiuta a spiegare un'esecuzione bloccata, mentre i test d'ascolto ti dicono come suona il risultato.
- Configura le **anteprime di training** con una clip di test costante così che l'app possa generare conversioni confrontabili al salvataggio dei checkpoint.
- Se usi la **Training Queue**, imposta nome esperimento e dataset distinti per ogni lavoro. Prima di riprendere o riprovare, conferma quali fasi il lavoro ha completato e dove salverà l'output.
- Quando la tua release espone **Stop and save**, usalo quando devi interrompere e continuare più tardi. Attendi il completamento della scrittura del checkpoint prima di chiudere l'app.

Ilaria RVC 2.1.0 supporta obiettivi per epoche e per step totali, inclusa la ripresa a metà epoca per obiettivi a step. Altri frontend possono esporre controlli e comportamenti di ripresa diversi.

### Confronta i budget di addestramento in step

Un'epoca è un passaggio attraverso il dataset preparato. Uno step di training è un aggiornamento di batch. Dividi il numero di clip dopo il preprocessing per il batch size effettivo per stimare gli step per epoca. Ad esempio, 10.000 clip con batch size 8 danno 1.250 batch per epoca in un'esecuzione a singolo worker. Batch parziali scartati, più GPU o gradient accumulation possono cambiare il modo in cui il trainer conta gli aggiornamenti. Usa il conteggio riportato dalla tua esecuzione quando confronti esperimenti.

Scegli un intervallo di salvataggio che ti offra diversi checkpoint da ascoltare. Salvare circa ogni 40 epoche è un possibile punto di partenza per un'esecuzione misurata in centinaia di epoche. Usa le stesse clip di test escluse e le stesse impostazioni di inferenza per ogni confronto. Ascolta intelligibilità, stabilità del pitch, pause naturali e consonanti che restino chiare. Se le esportazioni successive suonano più aspre o funzionano bene solo su poche frasi, confronta con un checkpoint precedente e ispeziona il dataset per riprese ripetute o artefatti. Scegli il checkpoint che funziona meglio sugli ingressi previsti.

## Confronta le esportazioni all'ascolto

Apri l'inferenza con un `.pth` esportato. Usa le stesse brevi registrazioni di test escluse e le stesse impostazioni di conversione per confrontare modelli di checkpoint diversi. Se fai un confronto con l'indice, mantieni fisso il checkpoint e confronta la stessa clip con retrieval disattivato e attivato.

Confronta queste quattro qualità tra le esportazioni.

1. **Timbro.** La registrazione convertita ricorda il carattere vocale previsto lungo l'intera frase?
2. **Intelligibilità.** Consonanti e finali di parola restano facili da capire?
3. **Stabilità del pitch.** Note o sillabe saltano, tremano o perdono l'inflessione prevista?
4. **Artefatti.** L'uscita aggiunge ronzio, rumore ambientale incorporato, code aspre o transizioni strane?

Conserva l'esportazione dal suono migliore e i relativi output di test. Può valere la pena provare più epoche quando i risultati migliorano su più esempi. Se esportazioni successive migliorano una sola clip o iniziano a riprodurre difetti del dataset, torna alla migliore base di partenza e rivedi le registrazioni.

## Esporta, riprendi o condividi

- **Usa in inferenza.** Seleziona il modello `.pth` esportato. Tieni il corrispondente `.index` accanto ad esso quando vuoi usare il retrieval. Annota eventuali informazioni su embedder richiesto, client supportato e sample rate.
- **Riprendi il training.** Fai un backup dell'esperimento e conserva i checkpoint di training di generatore e discriminatore corrispondenti, chiamati comunemente `G_*.pth` e `D_*.pth`. Riprendi con lo stesso esperimento e una configurazione compatibile, poi controlla il log per verificare checkpoint e step o epoca attesi. Una sola esportazione di inferenza non contiene l'intero stato di training.
- **Condividi un modello.** Condividi solo file che hai il permesso di distribuire. Includi esempi d'ascolto, note di compatibilità, l'indice corrispondente se utile e i termini d'uso necessari al destinatario.

In Ilaria RVC, le release recenti usano la libreria modelli per esportazioni di inferenza e relativi indici. Percorsi di esportazione e nomi possono variare tra frontend. Salva separatamente i log dell'esperimento se vuoi ricreare il modello in seguito.

## Diagnostica un'esecuzione fallita

| Sintomo | Cosa controllare per primo |
| --- | --- |
| Il preprocessing non ha trovato audio | Verifica la cartella dataset selezionata e riproduci una clip di ingresso. Controlla se la tua build legge sottocartelle nidificate. |
| L'estrazione fallisce o segnala un modello mancante | Controlla gli asset selezionati di embedder e modello pitch e leggi il primo messaggio nel log di estrazione. |
| La memoria GPU si esaurisce | Riduci il batch size, ferma altri lavori GPU concorrenti e disattiva il caching del dataset su GPU se la tua build offre quel controllo. Riprova la fase fallita. |
| Il training riparte dall'inizio | Controlla che l'esperimento punti a checkpoint di training compatibili e che ogni opzione di avvio pulito sia disattivata. |
| Un `.pth` non si carica per la conversione | Controlla se hai selezionato un checkpoint di training invece di un'esportazione di inferenza, e verifica compatibilità di architettura ed embedder con il client. |
| Un modello utilizzabile non ha indice | Controlla se la generazione dell'indice è stata saltata o è fallita. Esporta e testa il checkpoint indipendentemente, poi costruisci il suo indice dall'esperimento corrispondente se necessario. |

Conserva il primo messaggio di errore e la configurazione associata all'esecuzione. Per altri controlli, vedi [Risoluzione dei problemi](../reference/troubleshooting.md).

## Profili indicativi di training (da adattare a dati e hardware)

Questi tre preset sono **punti di partenza indicativi**, non regole universali. Regola sempre il **Batch Size** in base alla tua VRAM e giudica i checkpoint ascoltando le stesse clip di test escluse.

### Training Principianti (Base Sicura)

- **Ideale per:** Primo modello vocale, 5-15 minuti di audio pulito a singolo parlante, GPU con 6-8 GB VRAM.
- **Impostazioni:** RVC **v2** · **40 kHz** (oppure `32 kHz` per RefineGAN) · Pitch Guidance **ON** (`rmvpe`) · Embedder `contentvec` · Pretrain HiFi-GAN standard/verificato · **Batch Size `4-8`** · **Epochs `200`** (salva ogni `25-50` epoche) · Precisione **FP32** (oppure **BF16** su RTX 30/40/50) · GPU Caching **OFF** · Workers `2` · Fused AdamW **OFF**.
- **Perché:** Privilegia la stabilità ed evita errori di memoria esaurita o overfitting precoce producendo più checkpoint da confrontare.

### Training Intermedio (Equilibrio Qualità e Velocità)

- **Ideale per:** 15-30 minuti di parlato/canto pulito, GPU con 8-12 GB VRAM.
- **Impostazioni:** RVC **v2** · **40 kHz** o **48 kHz** (se la banda sorgente supera 20 kHz) · `rmvpe` · `contentvec` oppure `klm-vocal-contentvec` / `spin-v2` (abbinato al pretrain) · **Batch Size `8-12`** · **Epochs `250-350`** (o **Total Steps** equivalenti) · Salva ogni `25-50` epoche · Precisione **BF16** (RTX 30/40/50) o **FP16** (T4/RTX 20) · Workers `4`, Prefetch `4-8` · Crea **indice FAISS `Auto`** dopo aver scelto il checkpoint migliore.
- **Perché:** Usa precisione mista più veloce e batch più ampi mantenendo checkpoint regolari e anteprime d'ascolto su clip escluse.

### Training Avanzato e Ottimizzazione

- **Ideale per:** Dataset grandi o curati multi-emozione/canto, 12-24 GB+ VRAM, pretrain personalizzati.
- **Impostazioni:** RVC **v2** · Sample rate abbinato (`32/40/48 kHz`) e vocoder (`HiFi-GAN`, `MRF HiFi-GAN` oppure `RefineGAN` a `32 kHz` in Ilaria RVC) · Pretrain G/D ed embedder personalizzati/abbinati · **Batch Size `12-16+`** · Obiettivo **Total Steps** (per aggiornamenti di gradiente coerenti indipendentemente dalla dimensione del dataset) · **GPU Caching ON** (solo se la VRAM contiene comodamente il dataset; misura prima il tempo per epoca) · **Fused AdamW ON** (testa in un'esecuzione pulita) · **Training Queue** per esecuzioni A/B notturne · Monitoraggio **TensorBoard** + confronto con **Audio Analyzer**.
- **Learning rate:** La maggior parte delle WebUI RVC (inclusa Ilaria RVC) usa lo schedule standard dell'ottimizzatore RVC v2 (`1e-4` base); modifica il learning rate nei frontend che lo espongono solo se comprendi come scala con il batch size.

## Riconoscere Underfitting vs. Overfitting all'ascolto

1. **Underfitting (troppo presto):** L'uscita suona ancora per lo più come chi parla in ingresso, manca il timbro target sulle vocali tenute o perde carattere sulle note alte/basse. *Soluzione:* Continua il training dall'ultimo checkpoint `G_*.pth`/`D_*.pth`.
2. **Overfitting (troppo tardi):** La voce suona robotica/metallica su parole non familiari, riproduce rumore ambientale o artefatti di respiro del dataset, oppure suona bene *solo* su frasi simili al set di training. *Soluzione:* Torna a un checkpoint precedente (`50-100` epoche prima) e ispeziona il dataset in [Audio Analyzer](../ilaria-rvc/manage/audio-analyzer.md).

> Se stai addestrando con **Redpanda-vc** (che aggiunge Generator EMA e salvataggio checkpoint basato sugli step), consulta [Addestrare modelli RVC in Redpanda-vc](../other-rvcs/redpanda/training.md).
