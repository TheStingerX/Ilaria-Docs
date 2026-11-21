# Spiegazione di tutti gli altri pannelli

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Usa **Altro** per gestire file, ispezionare o combinare modelli, rivedere l'audio e gestire l'app. Inizia decidendo se hai bisogno di un modello di inferenza, di un codificatore di contenuti o di una coppia di addestramento G/D. Appartengono a diverse parti di RVC.

## Ottieni modelli e risorse di addestramento

| Pannello e controlli | Cosa inserire e cosa aspettarsi |
| --- | --- |
| `Import local models` | Rilascia un .pth di inferenza, il suo .index corrispondente opzionale o un ZIP supportato. Alcune build espongono un pulsante Importa file di modello. Controlla il registro di importazione prima di passare a Inferenza e aggiornare l'elenco dei modelli. |
| `Download models from Hugging Face, Google Drive or MEGA` | Incolla un collegamento al modello pubblico, fai clic su Scarica e installa modello e attendi il registro download. È possibile importare modelli e collegamenti indice separati in operazioni separate. |
| `Download embedders` | Scegli l'encoder esatto richiesto da un modello, quindi fai clic su Scarica l'embedder selezionato. Leggi lo stato di download di Embedder prima di provare a selezionarlo in Inferenza. |
| `Download pretrained models` | Fornisci un repository, un ZIP compatibile o un collegamento al generatore. Immettere il collegamento del discriminatore corrispondente quando il rilevamento automatico non riesce a trovarlo. Fare clic su Scarica coppia preaddestrata ed esaminare il registro. |
| `Recommended pretraineds` | Scegli una variante denominata e una frequenza di campionamento, quindi fai clic su Scarica preaddestrato selezionato (G + D). Verifica i requisiti di architettura, vocoder, intonazione ed encoder prima di selezionarlo in Training. |

## Ispeziona, unisci e condividi le voci

**Informazioni sul modello** ti consente di selezionare una voce, **Aggiorna elenco modelli** e **Leggi informazioni sul modello**. Leggi il registro di ispezione per confermare quale file è stato ispezionato. Espandi **Metadati e architettura salvati** per le proprietà registrate e **Tensori archiviati** per i dettagli sul peso. I metadati mancanti devono essere trattati come sconosciuti.

**Unisci modelli** unisce pesi di inferenza compatibili. Scegli **Modello A** e **Modello B**, quindi fai clic su **Verifica compatibilità modello** prima di salvare. Il **Contributo del modello A (%)** controlla il bilanciamento del peso, quindi 70 dà ad A un contributo del 70% nella miscela, con il resto da B. La **frequenza di campionamento** dovrebbe corrispondere ai modelli; utilizzare Auto se disponibile. **Precisione di output** imposta la modalità di memorizzazione dei pesi generati. Inserisci un nuovo nome e note facoltative, fai clic su **Unisci e salva modello** e leggi il registro delle unioni. Prova la voce unita prima di decidere se mantenerla. Inizia con il recupero disabilitato.

**Modello di esportazione ZIP** racchiude la voce di inferenza scelta e un indice di corrispondenza opzionale. Utilizza **Aggiorna elenco modelli** se manca la voce, seleziona **Modello vocale** e facoltativamente **Indice**, quindi fai clic su **Crea modello ZIP**. Leggi il registro di esportazione e scarica il file mostrato da **Scarica modello ZIP**. Apri lo ZIP localmente e controlla entrambi i nomi di file. Conserva l'intero esperimento di addestramento separatamente se hai bisogno di checkpoint ripristinabili.

## Strumenti audio e hardware

- **Analizzatore audio** confronta le registrazioni utilizzando la visualizzazione di forma d'onda, spettrogramma, tono e livello. Seleziona la stessa regione in input e output e ascoltala. Abbina la finestra FFT, il canale e la soglia di silenzio nei confronti. Utilizza i controlli di esportazione disponibili per salvare dati di analisi o grafici. Vedi [Analizzatore audio](audio-analyzer.md).
- **Il consulente di addestramento per PC** utilizza **Frequenza di campionamento per pianificare**, **Precisione per valutare** e **GPU per valutare**. Fai clic su **Scansiona PC e suggerisci impostazioni** ed esamina il registro di PC Advisor. Considera i suggerimenti come punto di partenza e verifica l'utilizzo della memoria durante un breve periodo.

## Aggiornamenti e riavvio

In **Aggiorna Ilaria RVC**, confronta la **Versione installata** con la release mostrata dopo **Verifica aggiornamenti**. Leggi il **Registro delle modifiche alla versione** ed espandi **Tutte le modifiche finora** per le note più vecchie. Quando viene offerto **Scarica e riavvia**, termina o salva il lavoro attivo prima di utilizzarlo. Segui **Registro aggiornamenti** fino alla riapertura dell'app. **Riavvia Ilaria RVC** riavvia l'installazione corrente e **Reload status** segnala l'operazione. Su Kaggle, utilizza il flusso di lavoro [salva, interrompi e riavvia](../cloud/kaggle.md) del notebook.
