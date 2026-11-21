# Addestra un modello vocale RVC

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

L'addestramento apprende una voce di destinazione da una raccolta audio preparata. Utilizza questa guida quando desideri creare un modello da registrazioni tue o autorizzate. Se disponi già di un modello di inferenza, consulta [Modelli e file RVC](../start/models.md) per iniziare a utilizzarlo.

## Pianifica la tua prima corsa

Prepara l'audio con la [guida al dataset](dataset-preparation.md), quindi selezionala in **Allenamento**. Dai all'esperimento un nome univoco e scegli una breve registrazione al di fuori del set di formazione per i test di ascolto. Inizia con una tiratura modesta in grado di completare tutte le fasi e produrre un'esportazione utilizzabile. Questo fornisce una base di riferimento per le modifiche ai dati o alle impostazioni.

Registra la versione dell'applicazione, la revisione del set di dati, il formato del modello e la frequenza di campionamento, l’embedder, il metodo di presentazione, la coppia preaddestrata, la dimensione del batch e l'intervallo di salvataggio pianificato. Aggiungi il nome della clip di prova trattenuta. Se un'esecuzione successiva sembra diversa, queste note ti aiutano a identificare cosa è cambiato.

## Scegli impostazioni compatibili

 | Impostazioni | Cosa controllare |
| --- | --- |
 | Formato del modello, vocoder e frequenza di campionamento | Seleziona una combinazione supportata dall'app e dal client di riproduzione previsto. Un'architettura specifica del fork può limitare il punto in cui viene caricato il modello. |
 | Guida ed estrazione dell'intonazione | La guida dell'intonazione è utile per modellare materiale dipendente dall'intonazione, in particolare il canto. Scegli un estrattore disponibile per l'addestramento nella tua build. |
 | Incorpora | Questo definisce la rappresentazione estratta dall'audio. Registra la scelta in modo da poter utilizzare la rappresentazione corrispondente nei client di inferenza supportati. |
 | Generatore e discriminatore pre-addestrati | Utilizza una coppia abbinata compatibile con l'architettura, la velocità e la configurazione del tono selezionate. I file generatore e discriminatore svolgono ruoli diversi nella formazione. |
 | Dimensione batch | Controlla la quantità di dati elaborati per aggiornamento. Inizia con un'impostazione adatta alla tua GPU e abbassala se l'addestramento esaurisce la memoria. |
 | Intervallo target e punto di controllo | Un'epoca corrisponde a circa un passaggio attraverso il set di dati preparato. I passaggi sono aggiornamenti formativi individuali. Salva periodicamente in modo da poter confrontare le esportazioni e ripristinare dopo un'interruzione. |

Utilizza le scelte di pre-addestramento indicate come compatibili con la build installata. In Ilaria RVC 2.1.0, ad esempio, il progetto documenta l'allenamento RefineGAN a 32 kHz con RVC V2 e guida del tono. La stessa versione documenta anche un downloader per coppie preaddestrate compatibili.

### Consigli pratici per l'allenamento

- **Epoche:** Prova un primo confronto con un obiettivo di circa 200 epoche e ascolta diversi salvataggi precedenti. Questo è un punto di partenza per l'audizione, poiché il punto di controllo più forte può arrivare prima o dopo. Una tiratura di 1.000 epoche non offre alcuna garanzia di qualità.
- **Lotto e precisione:** inizia con un lotto moderato, ad esempio 8, e considera 16 come punto di partenza superiore conservativo. Ridurlo se la memoria si esaurisce. La precisione mista FP16 può ridurre l'utilizzo della VRAM e accelerare la formazione sull'hardware supportato. Controlla se la tua build lo abilita già e prova FP32 se la precisione mista produce perdite non finite.
- **TensorBoard:** utilizza le metriche per tenere traccia dei progressi e individuare esecuzioni bloccate o instabili. Le curve di perdita da sole non possono dire quale punto di controllo suona meglio. Confronta le conversioni delle stesse clip trattenute.
- **Normalizzazione:** In Applio si costruisce con questi controlli, Pre regola i livelli prima dell'affettamento e Post li regola dopo l'affettamento. Utilizzare Nessuno se i livelli originali sono già adatti. In Ilaria RVC, Process Data applica automaticamente la regolazione del livello a ciascuna fetta. L'implementazione pubblica non ha un interruttore Post separato.
- **Filtro rumore:** Inizia con la riduzione opzionale del rumore disattivata per registrazioni pulite. Se il frontend espone anche un filtro passa-alto, usatelo per un rimbombo udibile a bassa frequenza e confrontate il risultato a orecchio. Il filtraggio passa-alto e la riduzione del rumore sono operazioni separate.
- **Cache del set di dati GPU:** lascialo disattivato per una base di riferimento. Consuma VRAM extra. Misura il tempo per epoca prima di abilitarlo per un periodo più lungo.
- **Pesi preaddestrati:** abbina la coppia G/D all'architettura, al vocoder, alla frequenza di campionamento e alla configurazione dell'intonazione e utilizza l’embedder specificato dall'autore del preaddestramento. Per i pretraining RVC standard creati con ContentVec, selezionare ContentVec per l'estrazione e l'inferenza delle funzionalità.

### Scegli una tariffa utilizzando la larghezza di banda sorgente

Controlla la frequenza di campionamento nei metadati del file e ispeziona diverse clip rappresentative in un visualizzatore di spettrogrammi come [Spek](https://www.spek.cc/p/download). Cerca dettagli vocali utili piuttosto che rumore isolato o un taglio netto lasciato dalla compressione. La metà della frequenza di campionamento dell'addestramento è la frequenza più alta che la frequenza può rappresentare. Un modello da 32 kHz può rappresentare frequenze fino a 16 kHz, un modello da 40 kHz fino a 20 kHz e un modello da 48 kHz fino a 24 kHz. Per dettagli utilizzabili superiori a 20 kHz, scegli 48 kHz se l'architettura e il pre-addestramento lo supportano. Utilizza la tariffa compatibile più bassa quando copre già la larghezza di banda di origine. La preelaborazione può ricampionare le registrazioni, ma non può ripristinare i dettagli mancanti.

## Esegui le fasi in ordine

 | Fase | Cosa produce | Cosa controllare |
| --- | --- | --- |
 | Preelaborazione del set di dati | Audio preparato per la configurazione del modello dell'esperimento. | Il registro nomina la cartella desiderata e segnala l'elaborazione riuscita dei file utilizzabili. Controlla i file saltati prima di continuare. |
 | Estrazione delle funzionalità | Funzionalità dei contenuti, più dati del pitch quando richiesto dalla configurazione scelta. | L'estrazione termina per l'esperimento corrente utilizzando il metodo di incorporamento e passo selezionato. |
 | Addestramento del modello | Checkpoint ed esportazioni di inferenze in base alle opzioni di salvataggio configurate. | Le fasi dell'allenamento avanzano e i file attesi vengono salvati. Leggi il primo errore se il progresso si interrompe. |
 | Indice di recupero | Una raccolta ricercabile di funzionalità di set di dati per uso facoltativo durante la conversione. | L'indice appartiene a questo esperimento e corrisponde alla voce esportata. Se lo hai saltato, prova il modello in modo indipendente. |

Utilizza il flusso di lavoro automatico, ove disponibile, oppure completa e verifica ogni fase prima di iniziare quella successiva. Un set di dati o una frequenza di campionamento modificati possono invalidare l'audio preparato e le funzionalità estratte. Un incorporamento modificato richiede l'estrazione di nuove funzionalità. Quando testi una configurazione incompatibile, avvia un esperimento separato in modo che le cache e i checkpoint esistenti rimangano disponibili.

## Segui i progressi in Ilaria RVC

- Utilizza la **Dashboard di allenamento** per controllare il conteggio dei passi, il tempo per epoca e le curve di perdita. Una curva può aiutare a spiegare una corsa in stallo, mentre i test di ascolto ti dicono come suona l'uscita.
- Configura le **anteprime della formazione** con una clip di prova costante in modo che l'app possa generare conversioni comparabili man mano che i punti di controllo vengono salvati.
- Se utilizzi la **Coda di addestramento**, imposta un nome esperimento e un set di dati distinti per ciascun processo. Prima di riprendere o riprovare, verificare in quali fasi il lavoro è stato completato e dove verrà salvato l'output.
- Quando la tua versione espone **Interrompi e salva**, usala quando devi interrompere e continuare in seguito. Attendi che il checkpoint finisca di scrivere prima di chiudere l'app.

Ilaria RVC 2.1.0 supporta obiettivi di epoca e passi totali, inclusa la ripresa parziale di un'epoca per obiettivi di passi. Altri frontend possono esporre controlli diversi e riprendere il comportamento.

### Confronta i budget per la formazione in passaggi

Un'epoca è un passaggio attraverso il set di dati preparato. Una fase di training è un aggiornamento batch. Dividere il numero di clip dopo la preelaborazione per la dimensione effettiva del batch per stimare i passaggi per epoca. Ad esempio, 10.000 clip con una dimensione batch pari a 8 generano 1.250 batch per epoca in un'esecuzione con singolo lavoratore. Batch parziali eliminati, GPU multiple o accumulo di gradienti possono modificare il modo in cui il trainer conta gli aggiornamenti. Utilizza il conteggio riportato dalla tua corsa quando confronti gli esperimenti.

Scegli un intervallo di salvataggio che ti offra diversi checkpoint per l'audizione. Il salvataggio di circa ogni 40 epoche è un possibile punto di partenza per una corsa misurata in centinaia di epoche. Utilizza le stesse clip trattenute e le stesse impostazioni di inferenza per ciascun confronto. Ascolta l'intelligibilità, l'intonazione stabile, le pause naturali e le consonanti che rimangono chiare. Se le esportazioni successive sembrano più dure o funzionano bene solo su poche frasi, confrontale con un punto di controllo precedente e controlla il set di dati per rilevare riprese o artefatti ripetuti. Scegli il checkpoint che funziona meglio con gli input previsti.

## Confronta le esportazioni ascoltando

Inferenza aperta con un `.pth` esportato. Utilizza le stesse brevi registrazioni e le stesse impostazioni di conversione per confrontare modelli di diversi checkpoint. Se esegui un confronto degli indici, mantieni fermo il punto di controllo e confronta la stessa clip con il recupero disabilitato e abilitato.

Confronta queste quattro qualità nelle esportazioni.

1. **Timbro.** La registrazione convertita assomiglia al carattere vocale previsto nell'intera frase?
2. **Intelligibilità.** Le consonanti e le desinenze delle parole sono ancora facili da capire?
3. **Stabilità dell'intonazione.** Le note o le sillabe saltano, trillano o perdono l'inflessione prevista?
4. **Artefatti.** L'output aggiunge ronzii, rumore ambientale incorporato, code dure o transizioni strane?

Conserva l'esportazione dal suono migliore e i relativi risultati di test. Può valere la pena provare più epoche quando i risultati migliorano in diversi esempi. Se le esportazioni successive migliorano solo una clip o iniziano a riprodurre i difetti del set di dati, torna alla prova di riferimento migliore e rivedi le registrazioni.

## Esporta, riprendi o condividi

- **Utilizza nell'inferenza.** Seleziona il modello esportato `.pth`. Tieni accanto il corrispondente `.index` quando desideri recuperarlo. Registrare eventuali informazioni sull'embedder, sul client supportato e sulla frequenza di campionamento richieste.
- **Riprendi l'addestramento.** Esegui il backup dell'esperimento e mantieni i checkpoint di addestramento del generatore e del discriminatore corrispondenti, comunemente denominati `G_*.pth` e `D_*.pth`. Riprendi con lo stesso esperimento e la configurazione compatibile, quindi controlla il registro per il checkpoint e il passaggio o l'epoca previsti. Solo un'esportazione di inferenza non dispone dello stato di addestramento completo.
- **Condividi un modello.** Condividi solo i file che sei autorizzato a distribuire. Includi esempi di ascolto, note di compatibilità, l'indice corrispondente se utile e tutti i termini di utilizzo necessari al destinatario.

In Ilaria RVC, le versioni recenti utilizzano la libreria dei modelli per le esportazioni di inferenze e gli indici associati. I percorsi di esportazione e la denominazione possono differire tra i frontend. Salva i log dell'esperimento separatamente se desideri ricreare il modello in un secondo momento.

## Diagnostica un'esecuzione non riuscita

 | Sintomo | Controlla prima |
| --- | --- |
 | La preelaborazione non ha trovato audio | Verificare la cartella del set di dati selezionata e riprodurre una clip di input. Controlla se la tua build legge le cartelle nidificate. |
 | L'estrazione fallisce o segnala un modello mancante | Controlla le risorse di incorporamento e modello di passo selezionate e leggi il primo messaggio nel registro di estrazione. |
 | La memoria della GPU si esaurisce | Riduci le dimensioni del batch, interrompi i lavori GPU concorrenti e disabilita la memorizzazione nella cache del set di dati della GPU se la tua build offre questo controllo. Riprovare la fase non riuscita. |
 | L'allenamento ricomincia dall'inizio | Controlla che l'esperimento punti a checkpoint di allenamento compatibili e che qualsiasi opzione di riavvio sia disattivata. |
 | A `.pth` non verrà caricato per la conversione | Controlla se hai selezionato un checkpoint di training invece di un'esportazione di inferenza e verifica la compatibilità dell'architettura e dell'embedder con il client. |
 | Un modello utilizzabile non ha indice | Controlla se la generazione dell'indice è stata saltata o fallita. Esporta e testa il checkpoint in modo indipendente, quindi crea il relativo indice dall'esperimento corrispondente, se necessario. |

Conserva il primo messaggio di errore e la configurazione associata alla corsa. Per ulteriori controlli, vedere [Risoluzione dei problemi](../reference/troubleshooting.md).
## Profili indicativi di training (da adattare a dati e hardware)

Questi tre profili sono **punti di partenza indicativi**, non regole fisse. Adatta sempre **Batch Size** alla VRAM e scegli il checkpoint migliore all'ascolto.

- **Beginner Training:** RVC **v2** · **40 kHz** (32 kHz per RefineGAN) · mvpe · contentvec · pretrain HiFi-GAN standard · **Batch Size 4–8** · **Epochs 200** (salvataggio ogni 25–50) · **FP32** (o **BF16** su RTX 30/40/50) · GPU Caching **OFF** · Workers 2 · Fused AdamW **OFF**.
- **Intermediate Training:** RVC **v2** · **40/48 kHz** · mvpe · contentvec / klm-vocal-contentvec / spin-v2 (abbinato al pretrain) · **Batch Size 8–12** · **Epochs 250–350** · **BF16** (RTX 30/40/50) o **FP16** (T4/RTX 20) · Workers 4, Prefetch 4–8 · Indice **FAISS Auto**.
- **Advanced Training & Optimization:** Dataset curati, 12–24 GB+ VRAM · **Total Steps** · MRF HiFi-GAN / RefineGAN (32 kHz) · **Batch Size 12–16+** · **GPU Caching ON** (solo se entra in VRAM) · **Fused AdamW ON** · **Training Queue** + **TensorBoard** + [Audio Analyzer](../ilaria-rvc/manage/audio-analyzer.md). Il learning rate (1e-4 base) di norma non va modificato.

## Riconoscere Underfitting vs. Overfitting all'ascolto

1. **Underfitting (troppo presto):** La voce somiglia ancora troppo all'originale o perde carattere su note alte/basse → continua da G_*.pth/D_*.pth.
2. **Overfitting (troppo tardi):** Suona robotica su frasi nuove o riproduce fruscio del dataset → torna a un checkpoint precedente (50–100 epoche prima).
