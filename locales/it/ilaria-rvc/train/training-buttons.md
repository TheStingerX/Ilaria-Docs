---
label: "Spiegazione dei controlli di allenamento"
icon: ":level_slider:"
order: 82
permalink: /ilaria-rvc/training-buttons/
---

# Spiegazione di tutti i controlli di allenamento

[Scarica Ilaria RVC 2.4.0 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

L'allenamento crea un nuovo modello vocale dalle registrazioni. Per un primo esperimento, utilizza un nome univoco, un piccolo set di dati pulito e una coppia preaddestrata compatibile. Conserva una registrazione fuori dal set di dati in modo da poter ascoltare il modello in una clip che non ha mai visto. Inizia con il [flusso di lavoro della addestramento](training-workflow.md) se desideri che i passaggi siano in ordine.

## Nome, audio e design del modello

| Controllo | Cosa fa e quando usarlo |
| --- | --- |
| `Model Name` | Identifica il tuo esperimento e i suoi file salvati. Utilizza un nuovo nome per un nuovo set di dati o una configurazione incompatibile. Per riprendere, utilizzare il nome originale con le relative impostazioni originali. Un segnaposto nella casella vuota ne è un esempio. |
| `Path to Dataset` | Cartella letta dall'app per l'allenamento. Dopo il caricamento, controlla il percorso aggiornato prima di premere Elabora dati. |
| `Drop dataset audio files or a ZIP` | Importa le registrazioni nella libreria di set di dati dell'app. Attendere il completamento del registro di importazione del set di dati prima dell'elaborazione. |
| `Manage datasets` | Aggiorna set di dati ricarica l'elenco. Il set di dati da rimuovere seleziona un elemento importato. Elimina il set di dati selezionato rimuove l'elemento importato. Controlla prima il nome e conserva una copia separata degli originali. Il registro di rimozione del set di dati riporta cosa è successo. |
| `Sample Rate` | Sceglie la frequenza di allenamento del modello, 32, 40 o 48 kHz dove compatibile. Abbina l'architettura e la coppia G/D. Aumentando la velocità non è possibile ripristinare i dettagli assenti dalle registrazioni. |
| `Pitch Guidance` | Fornisce al generatore una stima del percorso del passo durante l'allenamento. Utilizzare l'impostazione predefinita per un modello tipico e abbinare la coppia preaddestrata. Disattivandolo si modifica ciò che il modello si aspetta. |
| `CPU Threads` | Controlla la quantità di parallelismo della CPU utilizzata dalla fase di preparazione o estrazione. Ridurlo se la preelaborazione esaurisce la RAM di sistema o rende il PC inutilizzabile. |
| `Vocoder` | Seleziona il generatore di forme d'onda. Inizia con HiFi-GAN a meno che tu non abbia un motivo compatibile per scegliere RefineGAN. In questa build l'allenamento RefineGAN necessita di RVC V2 a 32 kHz con guida del tono. |
| `Embedder Model` | Sceglie le funzionalità dei contenuti utilizzate dal formatore. La addestramento espone ContentVec e Spin-v2. La modifica richiede nuove funzionalità estratte e un esperimento compatibile. Utilizzare il codificatore corrispondente durante l'inferenza. |
| `Silent training files` | Imposta il numero di esempi silenziosi inclusi nell'esperimento. Confronta le stesse pause naturali se lo cambi. |
| `Index Algorithm` | Scegli se mantenere tutti i vettori delle caratteristiche o raggrupparli prima di costruire l'indice di recupero. Vedi [Auto, Faiss e KMeans](training-controls.md). |
| `Speaker ID` | Sceglie il numero dell'altoparlante allegato ai dati. Lasciare l'impostazione predefinita per un primo modello con altoparlante singolo. |
| `Pitch extraction algorithm` | Stima l'altezza delle parti sonore. Inizia con RMVPE. Confronta le alternative sullo stesso materiale quando il problema reale è il tracciamento del tono. |

## Quanto tempo allenarsi e cosa salvare

| Controllo | Cosa cambia |
| --- | --- |
| `Training Precision` | FP32 utilizza la massima precisione. FP16 può risparmiare VRAM su hardware compatibile. Mantieni la precisione originale quando confronti o riprendi una corsa. |
| `GPU IDs` e `GPU Information` | Leggere i dispositivi elencati prima di inserire gli ID. Un elenco come 0-2 indica GPU 0 e 2. Controlli di preparazione separati possono utilizzare un elenco di dispositivi diverso dall'addestramento. |
| `Batch Size` | Numero di esempi raggruppati per un aggiornamento. Riducilo se esaurisci la memoria della GPU. Controlla il registro di allenamento per il batch effettivo, in particolare su [Kaggle](../cloud/kaggle.md). |
| `Training Target`, `Total Epochs`, `Total Steps` | Il conteggio delle epoche passa attraverso il set di dati preparato. I passaggi contano gli aggiornamenti. L'obiettivo è il totale che vuoi raggiungere, inclusa l'eventuale parte già completata. |
| `Save frequency` | Controlla l'intervallo tra i salvataggi in epoche. Scegli un intervallo che ti consenta di confrontare diverse istantanee senza riempire l'unità. |
| `Save last ckpt as final Model` | Seleziona il comportamento di conservazione del checkpoint più recente. Conserva le istantanee precedenti se desideri confrontarle o recuperarle e avere spazio. |
| `Create model at save frequency` | Produce esportazioni di inferenze alla cadenza di salvataggio selezionata in modo da poter ascoltare modelli intermedi. Se desideri riprendere, mantieni la coppia G/D e lo stato dell'esperimento separatamente. |
| `Cache data to GPU` | Memorizza i dati preparati nella VRAM. Lasciarlo spento per un primo test se la memoria è scarsa e per una corsa a passi dove richiesto. |
| `Pretrained model (G + D)` | Sceglie una coppia di generatore e discriminatore compatibile. Aggiorna l'elenco preaddestrato dopo aver scaricato una coppia. Il registro preaddestrato spiega la selezione. La scelta di Nessuno inizia senza pesi preallenati. |

## I quattro pulsanti numerati

1. **Process Data** legge il set di dati, prepara le sezioni e ricampiona nella configurazione di training selezionata. Leggere il registro pre-processo prima di continuare.
2. **Feature Extraction** estrae la rappresentazione e, se abilitata, l'altezza. Controllare il registro di estrazione delle funzionalità per errori e nomi di risorse.
3. **Train Index** crea l'indice di recupero opzionale da funzionalità estratte compatibili. Il modello può essere convertito senza di esso. Conserva l'indice con la voce corrispondente.
4. **Train Pth** inizia l'allenamento con i pesi. Guarda il registro degli allenamenti. Per interrompere in sicurezza, fai clic su **Interrompi e salva**, attendi **Interrompi/Riprendi** per confermare la scrittura, quindi scarica o esegui il backup dell'esperimento.

## Dataset Checker, anteprime, avvisi e coda

- **Dataset Checker** legge le registrazioni selezionate. La soglia del silenzio definisce ciò che conta come silenzioso, Contrassegna silenzi più lunghi di imposta la durata da segnalare e Avviso differenza di volume imposta la differenza di livello da contrassegnare. **Controlla set di dati** esegue la scansione. Scegli una registrazione, imposta l'ora di inizio o attiva Inizia subito prima del silenzio più lungo, quindi utilizza **Carica anteprima di 12 secondi** per ascoltare il punto interessato. Controlla il registro, lo stato e l'audio prima di modificare la sorgente.
- **Le anteprime della addestramento** sono facoltative. Abilita **Genera anteprime dell'allenamento**, scegli una sorgente della durata massima di 30 secondi, imposta l'anteprima ogni N epoche e utilizza Anteprima tono e Anteprima estrazione tono per correggere le impostazioni di confronto. Seleziona un'epoca di anteprima salvata e utilizza **Aggiorna anteprime** per aggiornare l'elenco. Il registro di anteprima e l'audio di anteprima della addestramento mostrano il risultato.
- **Notifiche addestramento** ti consente di scegliere avvisi sul desktop e avvisi sonori in caso di completamento o errore. **Avvisi di prova** controlla le opzioni selezionate. Leggi il registro dei test delle notifiche se non viene visualizzato o riprodotto nulla.
- **Coda di addestramento** salva le impostazioni correnti come lavoro. La preparazione automatica esegue Process Data, Feature Extraction e Train Index per quel lavoro. Utilizza **Avvia coda** per iniziare e **Pausa dopo il modello corrente** per interrompere dopo il lavoro attivo. **Aggiorna coda** aggiorna la visualizzazione. Scegli un lavoro prima di **Riprova selezionato** o **Rimuovi lavoro selezionato**. Leggere il registro delle azioni della coda e il registro della coda prima di riprovare.
