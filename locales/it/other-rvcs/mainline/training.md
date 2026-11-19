---
label: "Addestra ed esporta un modello"
icon: ":test_tube:"
order: 20
permalink: /ilaria-rvc/mainline/training/
---

# Addestra ed esporta un modello RVC WebUI (Mainline - Original RVC)

Inizia con una sola voce e un nuovo nome per l'esperimento. L'addestramento produce un modello che puoi testare su nuove registrazioni nell'[interfaccia di inferenza](inference.md). Conserva l'audio non elaborato e il registro dell'esperimento in modo da poter riprodurre il risultato.

## Prepara i file

1. Metti le registrazioni vocali pulite in una cartella locale come `C:\RVC\datasets\voice_a`. Conserva i backup altrove. Usa solo registrazioni per cui hai il permesso di addestrare un modello. Verifica che sia possibile riprodurre più file e che contengano la voce desiderata senza sottofondo musicale o altre voci.
2. Conserva una o due brevi registrazioni di frasi diverse fuori dal dataset. Usale come input di test per ogni checkpoint. Per un dataset destinato al canto, assicurati di disporre di materiale con la gamma vocale pertinente ed esegui il test con una voce isolata.
3. Se hai installato RVC WebUI (Mainline - Original RVC) da sorgente, riapri l'ambiente Python usato per la WebUI e scarica i pesi preaddestrati e i file di silenzio. Le versioni in pacchetto potrebbero già contenerli.

```text
hf download lj1995/VoiceConversionWebUI --include "pretrained/*" "pretrained_v2/*" --local-dir assets
hf download lj1995/VoiceConversionWebUI mute.zip --local-dir .model-downloads
python -m zipfile -e .model-downloads/mute.zip logs
```

Vedi [preparazione del dataset](../../model-training/dataset-preparation.md) per i dettagli di registrazione e pulizia.

## Configura l'esperimento ed elabora l'audio

1. Apri **Train**. Utilizza un nuovo nome come `voice_a_v2_40k` in modo che RVC WebUI (Mainline - Original RVC) crei una cartella separata sotto `logs/`.
2. Scegli una frequenza di campionamento target e una versione dell'architettura supportata dalla tua versione. V2 è un punto di partenza ragionevole quando si prevede di utilizzare un client di inferenza V2 compatibile. Frequenza di campionamento, architettura e modalità di guida con il pitch devono essere compatibili con i pesi preaddestrati del generatore e del discriminatore. Attiva **Pitch guidance** per un normale modello che segue l'intonazione della voce sorgente.
3. Seleziona un dataset a voce singola, in cui la build offre una scelta. Utilizza **Speaker ID** `0` per la prima esecuzione. Incolla il percorso completo della cartella del dataset, quindi fai clic su **Process Data** o sul pulsante di preprocessing equivalente.
4. Attendi il completamento della preprocessing. Esamina gli avvisi nell'output e verifica che l'esperimento abbia prodotto audio elaborato. Se l'esecuzione non produce nulla, verifica il percorso e verifica se i file audio inclusi vengono decodificati. Risolvilo prima di iniziare l'estrazione.

Per un esperimento con più voci su una build con **Multi-speaker Dataset Helper**, mantieni separati i file di ciascuna voce e assegna ID delle voci stabili. Controlla il manifest generato e utilizza gli stessi ID in un secondo momento durante la conversione. Completa prima una prova con una sola voce in modo da verificare che la configurazione funzioni.

## Estrai il pitch e le caratteristiche vocali

1. Scegli l'indice GPU mostrato dall'interfaccia. Per una GPU l'ID è comunemente `0`. I campi del dispositivo per operazioni diverse possono essere separati. Copia gli ID disponibili invece di assumere uno slot specifico.
2. Seleziona un metodo di estrazione del pitch che la build può eseguire. Se un'opzione GPU RMVPE è disponibile e funziona sul tuo sistema, inizia da lì. Un'opzione CPU può aiutare a isolare un problema di backend. L'estrazione delle caratteristiche richiede anche le risorse HuBERT condivise installate durante la [configurazione](installation.md).
3. Esegui **Feature extraction** e attendi che terminino sia l'estrazione del pitch, se richiesta, sia quella delle caratteristiche del contenuto. Se una fase non registra file utilizzabili, interrompi e correggi la causa. La modifica del dataset, della versione del modello o della frequenza target modifica l'esperimento. Utilizza un nuovo nome per l'esperimento quando confronti impostazioni incompatibili.

> I checkpoint HuBERT generici sono sconsigliati come encoder predefinito per la conversione vocale. Sono addestrati per rappresentare il parlato e possono conservare informazioni sul timbro di chi parla, che possono riaffiorare nell’audio convertito. In RVC usa l’encoder previsto dal modello, per esempio ContentVec se la voce è stata addestrata con quello.

## Addestra e salva i checkpoint

1. Controlla i campi generatore e discriminatore nel scheda **Train**. Dovrebbero fare riferimento a una coppia corrispondente per la versione, la frequenza di campionamento e la modalità di intonazione selezionata. Se un registro indica che i file sono stati saltati, verifica di addestrare il modello con la configurazione prevista prima di continuare.
2. Inizia con un batch adatto alla memoria e lascia disattivata la memorizzazione nella cache del dataset per il primo test. Se la GPU esaurisce la memoria, interrompi il lavoro non riuscito e riduci la dimensione del batch. Evita di eseguire una conversione in tempo reale durante il primo addestramento.
3. Imposta un obiettivo di prova finito e un intervallo che salva più checkpoint che puoi confrontare in seguito. Se desideri modelli intermedi pronti per l'inferenza, abilita l'esportazione del modello compatto a ogni salvataggio, se l'opzione è disponibile. Mantenere solo i checkpoint di addestramento più recenti consente di risparmiare spazio ma limita la ripresa dalle versioni precedenti.
4. Fai clic su **Train model**. Guarda lo stato dell'esperimento e conferma l'avanzamento del registro di addestramento attraverso le epoche. Utilizza il controllo di arresto dell'applicazione quando disponibile e attendi che finisca di scrivere i file prima di chiudere il processo.

Le curve di addestramento aiutano a capire se il lavoro procede o se si verificano errori. Scegli il modello finale convertendo le stesse registrazioni di test con diverse modelli di inferenza salvati. Confronta parole, consonanti, pause e note difficili a volume simile. Più epoche possono aiutare, stabilizzare o peggiorare i risultati a seconda del dataset.

## Crea, testa ed esegui il backup

1. Fai clic su **Train feature index** dopo l'estrazione riuscita se desideri un indice di recupero. Cerca lo `added_*.index` popolato nell'output dell'esperimento, con una copia o un collegamento rilevabile se fornito dalla tua build. Salta il recupero se desideri valutare solo il checkpoint stesso.
2. Cerca il modello compatto esportato in `assets/weights/`. Se disponi solo di un checkpoint del generatore, utilizza **ckpt Processing** e lo strumento di estrazione del modello compatto, indicando frequenza di campionamento, modalità pitch e versione corrispondenti. Aggiorna l'elenco dei modelli nell'inferenza e seleziona il modello appena esportato.
3. Converti una clip tenuta fuori dall'addestramento con **Index Rate** a zero. Una volta che funziona, prova l'indice popolato corrispondente. Salva entrambi gli output per il confronto.
4. Fai un backup del modello di inferenza compatto e del relativo indice da utilizzare o condividere. Conserva la cartella dell'esperimento, compresi i checkpoint `G_*.pth` e `D_*.pth` abbinati, la configurazione e i log, se prevedi di riprendere l'addestramento.

| Sintomo | Dove cercare |
| --- | --- |
| La preprocessing termina senza audio | Controlla il percorso del dataset, le autorizzazioni, i formati supportati e se i file WAV si aprono all'esterno di RVC. |
| L'estrazione delle caratteristiche si interrompe | Identifica se l'estrazione delle caratteristiche del contenuto o del pitch non è riuscita. Controlla gli asset del modello e prova un backend supportato. |
| L'addestramento inizia e poi la VRAM si esaurisce | Riduci le dimensioni del batch, disattiva la memorizzazione nella cache e libera la VRAM prima di riprovare. |
| L'inferenza fallisce con un checkpoint | Conferma di aver selezionato un modello di inferenza esportato. Prova un modello che sai funzionare con lo stesso input e nessun indice. |
| La generazione dell'indice non trova caratteristiche vocali | Controlla che l'estrazione delle caratteristiche sia riuscita per lo stesso esperimento. Controlla la versione e i nomi delle cartelle prima di provare a riutilizzare i file. |
