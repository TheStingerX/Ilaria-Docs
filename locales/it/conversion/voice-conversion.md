---
label: "🎙️ Conversione vocale"
order: 95
permalink: /voice-conversion/
description: "La conversione vocale inizia con una performance. L'output solitamente segue le parole sorgente, il tempo, l'articolazione e il contorno dell'intonazione..."
---
# Converti una registrazione con Ilaria RVC

[Scarica Ilaria RVC 2.4.0 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

La conversione vocale inizia con una performance. L'output solitamente segue le parole sorgente, il tempo, l'articolazione e il contorno dell'intonazione mentre cambia il suono della voce. Le decisioni sulla consegna iniziano comunque con la registrazione originale. Per una cover cantata, pianifica di convertire una voce solista isolata e successivamente mixare la voce convertita con quella strumentale.

## Effettua una conversione di base

1. Apri Ilaria RVC e importa il modello di inferenza che desideri utilizzare. Un indice facoltativo appartiene al checkpoint per cui è stato creato. Se una voce importata è assente dal selettore, vedere [Modelli e file RVC](../start/models.md).
2. Apri **Single Inference**, scegli la voce e trascina una breve registrazione che puoi riconoscere a orecchio. Una frase con una pausa, diverse consonanti e una vocale più lunga costituisce un utile riferimento.
3. Imposta **Pitch** su zero e **Index Ratio** su zero. Abbina l’embedder di contenuti a quello utilizzato nell'addestramento quando l'autore del modello lo fornisce. Inizia con l'estrattore di tonalità predefinito dell'app e lascia disattivata l'elaborazione audio opzionale.
4. Converti il ​​file e controlla l'output. Utilizza il lettore di forme d'onda per rivisitare la stessa frase, quindi salva una copia WAV o FLAC come prova di riferimento.
5. Confronta la clip originale e quella convertita a livelli di riproduzione simili. Nota il primo problema udibile e usa [Intonazione e qualità audio](audio-quality.md) per decidere cosa cambiare.

Le attuali versioni di Ilaria RVC cercano automaticamente un indice corrispondente quando selezioni una voce. Selezionare un indice e conferirgli influenza sono azioni separate. Un indice caricato contribuisce solo quando il **Rapporto indice** è superiore a zero. Le build precedenti potrebbero mostrare un layout diverso o chiederti di selezionare manualmente l'indice.

## Scegli una fonte adatta al lavoro

 | Flusso di lavoro | Prepara la fonte | Ascolta |
| --- | --- | --- |
 | Dialogo o narrazione | Usa un altoparlante per traccia di input e mantieni una breve pausa naturale tra le righe. | Parole chiare, desinenze intatte e tono coerente tra le frasi. |
 | Una voce solista sulla musica | Isolare la voce solista. Lascia le parti strumentali, le voci di accompagnamento e le armonie sulle rispettive tracce. | Note sostenute stabili e consonanti ancora in linea con il ritmo. |
 | Riprese multiple | Etichetta ciascuna ripresa per scena o sezione e mantieni i nomi dei file originali nelle tue note. | Una voce coerente nelle riprese registrate a diversi livelli o altezze. |
 | Testo parlato tramite TTS | Visualizza in anteprima il parlato generato prima di applicare il modello. Regola prima la punteggiatura o la frase nel testo. | Pronuncia corretta e stimolazione intenzionale prima della fase RVC. |

Se una voce separata contiene ancora piatti forti o un altro cantante, confrontala con una ripresa o separazione più pulita. Questi suoni raggiungono il motore di conversione insieme alla voce prevista. Mantieni i respiri e le terminazioni delle parole dove sono importanti per la performance.

## Converti un batch

Apri **Inferenza batch** dopo che un singolo file ha prodotto un risultato utilizzabile. Raggruppare file che richiedono lo stesso modello, passo e profilo di elaborazione. Esegui un file rappresentativo da ciascun gruppo e salvalo in una posizione di output separata in modo da poter confrontare i risultati in modo sicuro.

Per una canzone lunga, ascolta una sezione con note alte o basse esposte prima di convertire l'intero file. **Audio diviso** può aiutare con registrazioni lunghe o limitazioni di memoria. Ascolta i collegamenti e le pause dei segmenti dopo la corsa. Se una versione dell'app espone una console o un log di conversione, utilizzalo per identificare eventuali elementi non riusciti e riprovare a utilizzare tali file separatamente.

## Converti il ​​parlato generato

In una versione con l'area di lavoro **TTS**, fornire testo o un file di testo UTF-8. Le versioni attuali di Ilaria RVC offrono voci online di Microsoft Edge e voci Windows installate per TTS offline. Scegli una voce sorgente nella lingua della sceneggiatura, ascolta la pronuncia e le pause, quindi applica il modello RVC alla registrazione generata. Se nella prima fase si legge un nome in modo errato, correggere prima il testo o modificare la voce TTS. RVC generalmente porterà avanti quelle scelte di pronuncia della fonte.

Quando la privacy o una connessione inaffidabile sono importanti, seleziona una voce di Windows installata e verifica che funzioni con il tuo testo prima di iniziare un lungo lavoro. L'opzione Edge richiede una connessione di rete.

## Salva la conversione e le tue impostazioni

- Conserva un master WAV o FLAC non elaborato prima di aggiungere compressione, riverbero o limitazione.
- Per la musica, allinea la voce convertita con l'originale, controlla i tempi sulle consonanti e ascolta sia l'assolo che nel mix prima di esportare.
- Salva le tue impostazioni insieme al risultato. Includere il file sorgente, le versioni del modello e dell'indice, l'ID dell'altoparlante se applicabile, l'incorporamento, l'estrattore del tono, lo spostamento del tono, il rapporto dell'indice, l'elaborazione e il formato di output.
- Quando manca un modello o l'inferenza fallisce prima di produrre l'audio, inizia con [Risoluzione dei problemi](../reference/troubleshooting.md). Per la conversione del microfono, vedere [Conversione vocale in tempo reale](real-time.md).

## Converti una registrazione in RVC WebUI (Mainline - Original RVC) {#convert-a-recording-in-mainline-rvc}

### Configura la WebUI

Su Windows, utilizza un pacchetto RVC WebUI (Mainline - Original RVC) compatibile con il tuo hardware. Estrai l'intero archivio in una directory locale prima di eseguire il suo programma di avvio. I pacchetti Windows che includono `go-web.bat` lo utilizzano per avviare la WebUI locale. Lascia la console aperta durante la conversione. Se il browser non si apre automaticamente, utilizzare l'indirizzo locale stampato nella console.

### Carica il modello e converti

Posiziona il checkpoint di inferenza in `assets/weights` e il suo indice di recupero corrispondente, se fornito, in `logs`. Apri **Model Inference** e aggiorna gli elenchi di voci e indici. Scegli il checkpoint e l'indice corrispondente. Imposta il rapporto di recupero su zero per i modelli senza indice.

Fornisci alla WebUI il percorso completo di un breve file WAV locale. Se il percorso fallisce, copia il file di test in una posizione semplice come `C:\RVC\input\test.wav`. Mantieni la trasposizione a zero per il primo passaggio e seleziona RMVPE se la tua build lo offre. Fai clic su **Converti**, quindi ascolta nel lettore di output e salva il risultato utilizzando il controllo di download. Se la generazione fallisce, leggere il messaggio della console prima di modificare le impostazioni. Un modello che non appare nell'elenco solitamente deve essere spostato nella directory dei pesi o riscoperto utilizzando l'aggiornamento.

## Converti una registrazione in Applio

### Imposta un test su file singolo

In Desktop, attendi che il motore sia pronto, aggiungi il modello di inferenza alla libreria e apri **Converti audio** in modalità file singolo. In Gradio, apri l'interfaccia del browser e seleziona **Converti audio** o **Inferenza**, a seconda della versione. Aggiorna l'elenco dei modelli dopo aver aggiunto un checkpoint se manca.

Seleziona la voce e il suo indice accoppiato, quindi conferma l'incorporamento del contenuto previsto da quel modello. Carica una breve registrazione e scegli WAV o FLAC per il test. Controlla le impostazioni riportate da una esecuzione precedente, in particolare intonazione, recupero ed effetti. Una prova di riferimento utile inizia da zero semitoni con gli effetti disattivati. Avvia il lavoro una volta, attendi l'output e confronta la stessa frase in entrambe le registrazioni.

### Ottimizza il test prima di eseguire un batch

 | Cosa senti | Cosa provare |
| --- | --- |
 | Le note saltano o oscillano | Confronta gli estrattori di tono usando la stessa frase, quindi prova la trasposizione separatamente. |
| La voce convertita conserva il timbro di partenza | Gli embedder HuBERT generici possono conservare informazioni sul timbro di chi parla. Verifica che l’encoder corrisponda al modello e prova più clip pulite con il recupero disattivato. Se l’encoder usato nel training lascia passare il timbro di partenza, riaddestra con un encoder compatibile, come ContentVec, e ricrea l’indice. |
| Sibilanti o respiri distorti | Prova separatamente a ridurre il recupero e a rafforzare la protezione dei suoni non sonori. Se il difetto persiste su più registrazioni pulite, correggi o integra gli esempi di sibilanti e respiri nel dataset e riaddestra il modello. |
 | Il parlato ha un livello non uniforme | Regolare l'inviluppo del volume o livellare la traccia finita. Controlla che la fonte stessa sia pulita. |

Quando la prova di riferimento funziona, passa a **Batch** e scegli più file o una directory di input, a seconda dell'edizione. Conservare l'output in una posizione separata. Utilizza un'esecuzione diversa per i file che necessitano di impostazioni di intonazione diverse e ascolta almeno un risultato da ciascun gruppo prima di utilizzare l'intero batch.

Per problemi di importazione dei modelli e spiegazioni dettagliate sulle impostazioni, utilizzare [Modelli e file RVC](../start/models.md), [Intonazione e qualità audio](audio-quality.md) e [Risoluzione dei problemi](../reference/troubleshooting.md).
