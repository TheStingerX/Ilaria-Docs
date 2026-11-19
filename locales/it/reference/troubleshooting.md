---
label: "🩺 Risoluzione dei problemi"
order: 95
permalink: /troubleshooting/
---
# Risoluzione dei problemi RVC

[Scarica Ilaria RVC 2.4.0 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

!!!tip
È la tua prima volta con RVC? **Parti da un WAV di 10 secondi e un solo modello.** Se l’app si blocca, apri il log e cerca il primo errore. Se funziona ma la voce suona male, riascolta la stessa clip e cambia una sola impostazione alla volta. Il log è il registro delle operazioni. Il checkpoint è un salvataggio del modello o dello stato dell’addestramento.
!!!

Una diagnosi utile inizia dalla prima fase che fallisce. Conserva la versione dell'app, il primo errore e un test riproducibile. Apporta una modifica alla volta e confrontala con lo stesso file o frase pronunciata.

## Parti dal sintomo

| Sintomo | Primo test |
| --- | --- |
| Il launcher si chiude o il browser mostra un errore di connessione | Mantieni la console aperta e verifica l'indirizzo locale stampato da quell'istanza. |
| Il modello manca, si rifiuta di caricarsi o segnala una chiave mancante | Conferma che il file è un'esportazione di inferenza e controlla la sua architettura e incorporamento. |
| Il convertitore non riesce a leggere il file | Prova un breve PCM WAV da un semplice percorso locale. |
| La conversione funziona senza indice | Verifica che l'indice appartenga al modello selezionato e alla sua rappresentazione delle caratteristiche. |
| La voce suona metallica, indistinta o troppo simile all'input | Confronta diverse clip pulite e un checkpoint noto con effetti e recupero disattivati. |
| L'addestramento si interrompe, si blocca o non produce esportazioni utilizzabili | Identificare la fase non riuscita e ispezionare il registro e gli artefatti per tale esperimento. |
| CUDA fallisce o la macchina esaurisce la memoria | Distinguere hardware o runtime non supportati, esaurimento della memoria della GPU e pressione della RAM di sistema. |
| Il microfono presenta ritardi, intervalli, silenzio o eco | Testare separatamente l'ingresso fisico, il monitor convertito, il cavo virtuale e la destinazione. |

## Prepara una prova di riferimento

1. Registra 10–20 secondi di un parlante con vocali chiare, un `s` o `f` e una pausa naturale. Utilizza un WAV locale, a livello moderato, senza musica o effetti.
2. Seleziona un modello di inferenza attendibile compatibile con l'app. Registrane il nome, l’embedder e lo slot dell'altoparlante. Inizia dalla trasposizione zero con l'estrattore di tonalità predefinito, l'elaborazione opzionale disattivata e il recupero a zero.
3. Converti e salva in una cartella locale scrivibile. Riproduci il file in un secondo lettore se l'anteprima del browser è silenziosa. Confronta la stessa frase con un volume simile.
4. Ripetere con un modello noto utilizzando il proprio codificatore compatibile. Se entrambi i modelli falliscono sullo stesso input, controlla la decodifica, il runtime o le impostazioni condivise. Se solo uno fallisce costantemente, ispeziona il modello, la sua configurazione e i dati di addestramento, se disponibili.
5. Riattiva un'opzione per test. Salva ciascun risultato con le impostazioni nel nome file o nelle note in modo da poter ripristinare una combinazione di lavoro nota.

## L'app non si avvia

### La finestra si chiude o il setup non si completa mai

- **Ilaria RVC:** Estrai il pacchetto completo, apri la sua cartella ed esegui `RUN_ILARIA_RVC_LOGS.bat`. Cerca sopra l'ultimo messaggio di arresto la prima eccezione utile. Verifica che Windows rilevi la GPU NVIDIA supportata e che l'ambiente e le risorse in bundle siano ancora presenti.
- **Applio Desktop:** apri Configurazione e controlla lo stato del motore. Riparare l'installazione tramite i controlli di installazione del desktop quando il controllo del runtime o del pacchetto non riesce. Per Gradio, esegui il programma di avvio dal checkout previsto e verifica quale interprete è attivo.
- **RVC WebUI (Mainline - Original RVC):** Abbina il launcher e il runtime all'archivio specifico o al checkout dell'origine. Un archivio precedente può contenere una build CUDA che non può eseguire i kernel per una GPU più recente. L'installazione di un pacchetto Python non correlato a livello globale non riparerà un interprete in bundle.
- **Errore DLL di Windows:** Per `llvmlite.dll` o una dipendenza Visual C++ mancante, controlla che l'architettura runtime corrisponda all'app e installa o ripara il ridistribuibile Microsoft Visual C++ ufficiale per quell'architettura. Se la DLL stessa è assente, ripristinala tramite il pacchetto originale o il programma di installazione.
- **Errori di risorse dopo un aggiornamento:** controlla che l'installazione sia scrivibile, che siano presenti i file delle risorse richiesti e che il collegamento sul desktop punti alla cartella aggiornata. Conserva il backup di modelli, set di dati e registri prima di sostituire un'installazione.

### La pagina locale è vuota, disconnessa o mostra un errore JSON

Mantieni il processo in esecuzione e apri l'esatto indirizzo di loopback stampato nella console. Ilaria RVC normalmente usa `127.0.0.1:6969`. Se la porta è già in uso, controlla se l'app è già in esecuzione e utilizza il suo indirizzo. Salva il lavoro attivo prima di arrestare un'istanza.

Un errore del browser come `Expecting value: line 1 column 1` può verificarsi quando una richiesta API riceve una risposta vuota o una pagina di errore HTML. Controlla la console del server con lo stesso timestamp. Se un proxy configurato intercetta il traffico locale, verifica il bypass del loopback o testa un profilo del browser senza l'estensione che interferisce. Mantieni il servizio locale durante la diagnosi.

Per l'utilizzo da riga di comando, inizia dal punto di ingresso e dall'argomento help per la tua versione esatta. Una breve esecuzione corretta dell'interfaccia utente Web fornisce le impostazioni corrispondenti e, nelle build che le registrano, i comandi di preelaborazione e training. Gli script più vecchi possono prevedere un ordine degli argomenti o un layout di directory diverso.

## File di input e output

### Errori FFmpeg, Unicode ed elenco file

1. Conferma che il file si apra in un lettore normale. Esporta un nuovo breve PCM WAV se il contenitore o il codec non sono sicuri.
2. Copialo in un percorso locale semplice come `C:\RVC\input\test.wav`. Ciò isola i problemi di quotazione, Unicode, sincronizzazione remota e autorizzazioni comuni nelle build precedenti. Conserva le registrazioni originali.
3. Verifica che l'app possa vedere il suo FFmpeg in bundle. Le installazioni di origine potrebbero richiedere un eseguibile separato disponibile per lo stesso processo che avvia l'app. Se il file WAV funzionante funziona, confronta il percorso e il codec originali prima di reinstallare l'ambiente.
4. Per l'allenamento, conferma che la cartella selezionata contiene l'audio effettivo. Se modifichi i percorsi dopo la preelaborazione, ricostruisci l'elenco dei file e le funzionalità dipendenti in un nuovo esperimento o tramite il flusso di lavoro di preparazione dell'app.

### Viene visualizzato un risultato ma non può essere riprodotto o salvato

Controlla la cartella di output e lo spazio libero su disco. Esporta WAV e controlla la durata e le dimensioni del file. Riproduci il risultato fuori dal browser per separare i problemi di riproduzione e conversione. In modalità batch, controlla il primo elemento con errori e il percorso di output, quindi esegui quell'elemento da solo. Conserva gli originali e i risultati generati in cartelle diverse.

## Modelli, checkpoint e indici

### Un modello non appare

Assicurati che ci sia un'effettiva inferenza `.pth` all'interno dell'archivio. Inseriscilo nella libreria utilizzata dall'app corrente oppure utilizza il controllo di importazione e attendi il completamento dell'installazione. Aggiorna l'elenco delle voci e controlla nuovamente la selezione. In Ilaria RVC, la libreria dei modelli è sotto `models/`. Gli archivi della linea principale e l'origine corrente possono utilizzare layout di directory diversi. Vedi [Modelli e file RVC](../start/models.md) per i ruoli dei file.

### Il caricamento fallisce con chiavi mancanti o dimensioni dei tensori incompatibili

Un `G_*.pth` o `D_*.pth` da un esperimento di solito serve per riassumere la formazione. Utilizza la funzione di esportazione o di estrazione del checkpoint dell'app per produrre un modello di inferenza. I metadati F0 o della frequenza di campionamento mancanti possono anche indicare un formato errato o un file incompleto. Controlla la versione RVC, il vocoder, la frequenza di campionamento, la guida dell'intonazione e l'embedder. Conserva gli originali ed esporta con un nome diverso. Un'estensione del nome file corrispondente da sola non può stabilire la compatibilità.

### L'indice manca o causa un errore

1. Converti con recupero a zero, selezionando nessun indice se l'app lo consente. Confermare che il modello possa produrre da solo un output intelligibile.
2. Seleziona l'indice dallo stesso esperimento e impostazione delle funzionalità del modello. Riprovare con un valore di recupero modesto e confrontare la stessa frase. Una dimensione incompatibile o un indice illeggibile è un motivo per ricontrollare la coppia prima dell'ottimizzazione.
3. Se la formazione è stata completata ma non è presente alcun indice, ispezionare separatamente la fase dell'indice. Conferma che l'estrazione della funzionalità è riuscita. Eseguire nuovamente la generazione dell'indice solo quando le funzionalità compatibili originali sono intatte. Un set di funzionalità molto ampio può consumare RAM di sistema durante l'assemblaggio dell'indice.
4. Conserva l'esportazione dell'inferenza anche se la costruzione dell'indice fallisce. Per la condivisione o il backup, mantieni insieme il checkpoint funzionante e il relativo indice di corrispondenza opzionale.

## Qualità del suono e limitazioni del modello

| Cosa senti | Test diagnostico e interpretazione |
| --- | --- |
| Respiri metallici o sibilanti distorte | Confronta alcune fonti pulite con effetti e recupero disattivati. Confronta la protezione separatamente. Se lo stesso modello distorce costantemente i suoni attraverso clip pulite, esamina gli esempi di addestramento per verificare il ritaglio, la riduzione del rumore o la scarsa copertura, correggi il set di dati e riqualifica. |
| La voce convertita mantiene il timbro sorgente | Verificare che il modello e l’embedder di formazione siano d'accordo. Le funzionalità generiche di HuBERT possono conservare i segnali dell'oratore. Confrontare senza recupero, quindi con l'indice corretto. Una limitazione persistente del modello addestrato può richiedere una riqualificazione. |
| Le parole si rompono solo in una lingua | Prova le frasi trattenute contenenti i suoni interessati con diverse registrazioni pulite. Le registrazioni multilingue da sole non possono garantire che ContentVec preservi le distinzioni. Registrare la limitazione linguistica osservata anziché promettere che un diverso contesto formativo la risolverà. |
| L'intonazione salta o cambia l'ottava | Ascolta la frase originale, prova la trasposizione zero e confronta separatamente gli estrattori F0 supportati. Per cantare, controlla le note alte e basse esposte. |
| Suoni metallici attorno alla musica o voci di sottofondo | Confronta una voce secca isolata. Ascolta gli artefatti di separazione prima di utilizzare uno stelo isolato come dati di training. |
| L'audio è piatto, troppo basso o presenta clip | Confronta sorgente e uscita a livelli di riproduzione simili. Disabilitare gli effetti di guadagno e limitatore per il test e verificare che l'esportazione sorgente e finale abbiano headroom. |

Utilizzare la [guida alla qualità audio](../conversion/audio-quality.md) per test di ascolto controllati e la [preparazione del set di dati](../model-training/dataset-preparation.md) quando il difetto segue il modello attraverso gli input.

## GPU e memoria di sistema

- **CUDA non disponibile o kernel non supportato:** Conferma la GPU, il driver e il runtime esatti selezionati dall'app. Le installazioni desktop, in bundle e di origine possono visualizzare diversi dispositivi. Verificare che il backend previsto supporti l'operazione, inclusa la formazione, se richiesta.
- **Cuda memoria esaurita durante l'inferenza:** inizia con un breve clip. Chiudi i lavori GPU concorrenti, scarica i modelli inutilizzati e disabilita l'elaborazione opzionale. Per input lunghi, prova il controllo di suddivisione audio dell'app o dividi l'audio in segmenti e successivamente controlla le unioni.
- **CUDA esaurita durante l'addestramento:** riduci le dimensioni del batch, disattiva la memorizzazione nella cache del set di dati nella VRAM e prova la precisione mista compatibile solo se supportata dalla tua build. Mantenere un checkpoint ripristinabile. Un batch più piccolo modifica il numero di aggiornamenti per epoca.
- **La RAM di sistema si esaurisce o i lavoratori della preelaborazione muoiono:** Utilizza meno lavoratori della CPU, controlla che il disco abbia spazio per i file intermedi e controlla le registrazioni insolitamente lunghe o interrotte. Dividi solo ai confini naturali e rigenera i dati preparati interessati. Durante la generazione dell'indice, controlla la RAM del sistema separatamente dalla VRAM.
- **GPU multiple:** conferma l'indice del dispositivo con l'elenco dei dispositivi dell'app. Un indice può fare riferimento a una GPU diversa quando cambia la visibilità del dispositivo. Verificare il dispositivo scelto nel registro prima di confrontare le prestazioni.

## Addestramento, ripresa ed esportazione

### Diagnostica la fase prima di rieseguirla

| Fase | Controlla prima di continuare |
| --- | --- |
| Importazione del set di dati | Conferma la cartella di destinazione e attendi l'estrazione. Controlla lo spazio libero e prova alcuni file importati. |
| Preelaborazione | Conferma clip utilizzabili, non vuote e una cartella dell'esperimento scrivibile. Un tensore di dimensione zero può avere origine in una fetta vuota, estremamente corta o fallita. Ascolta e sostituisci o elimina la fonte danneggiata, quindi rigenera i dati preparati. |
| Estrazione delle funzionalità | Conferma che l'audio prodotto dalla preelaborazione e che siano presenti le risorse di incorporamento e tonalità scelte. La modifica degli encoder richiede una configurazione compatibile e nuove funzionalità. |
| Formazione | Verifica la corrispondenza dei pretraining G/D e la concordanza tra frequenza di campionamento, guida dell'intonazione, vocoder, architettura e funzionalità memorizzate. Una mancata corrispondenza delle dimensioni del tensore dopo aver modificato le tariffe è un motivo per avviare un esperimento separato con impostazioni compatibili. |
| Esporta e indicizza | Esporta un checkpoint di inferenza, aggiorna l'elenco delle voci, esegui test senza recupero e crea l'indice dalle feature estratte per quell'esperimento. |

### Riprendi in sicurezza o continua con altre registrazioni

Attendi che l'app finisca di salvare prima di chiuderla. Conserva i checkpoint G e D, la configurazione dell'esperimento e il suo stato di addestramento. Per riprendere l'allenamento senza modifiche, seleziona lo stesso esperimento e verifica la fase o l'epoca ripristinata nel registro. Tratta un set di dati modificato come un esperimento separato: preelabora il set di dati combinato, rigenera le funzionalità e utilizza il metodo di continuazione supportato dalla tua app con pesi compatibili. Mantieni intatto l'esperimento originale per consentire un confronto o un rollback.

La durata del set di dati e il conteggio delle epoche dipendono dalla copertura e dalla pulizia della voce. Salva diversi checkpoint e ascolta le stesse clip trattenute. Una curva di perdita migliore non stabilisce una pronuncia migliore. Se un modello si degrada su esempi puliti e invisibili, confronta un'esportazione precedente prima di estendere la corsa.

## Microfono live, cavo virtuale e chiamate

1. Controlla il microfono fisico grezzo nel sistema operativo. Conferma l'autorizzazione e il livello di input. Scollegare le fonti microfoniche aggiuntive durante il test.
2. Testare il convertitore localmente tramite le cuffie. Mantieni il backend audio e il buffer predefiniti supportati dall'app. Se il convertitore dispone di un misuratore di ingresso ma non di uscita, controlla la voce caricata e lo stato della conversione prima di cambiare l'app di destinazione.
3. Instradare l'uscita del convertitore all'estremità di riproduzione del cavo virtuale. In Discord, OBS o nell'app di registrazione, scegli l'endpoint di registrazione corrispondente. Continua la riproduzione della chiamata sulle cuffie. Effettua una registrazione di prova privata per verificare che il segnale effettivo raggiunga gli altri.
4. Se sono presenti lacune, ripetere il test con una dimensione di blocco maggiore e con gli altri carichi di lavoro della GPU interrotti. Se compaiono degli spazi vuoti solo durante il gioco, ripetere il test con quel carico. Controlla se le impostazioni del formato audio sono in conflitto tra i dispositivi.
5. Se il parlato risulta tagliato all'inizio o alla fine, eseguire il test senza rilevamento automatico, soppressione del rumore o gate uno alla volta. Se senti un'eco, controlla la presenza di un monitoraggio duplicato o di un loop nel microfono fisico. Mantieni l'ultimo preset stabile prima di abbassare il ritardo.

Per i nomi dei dispositivi e i controlli specifici delle app, utilizza le [guide passo passo alle app](../other-rvcs/app-guides.md) e la [guida al routing in tempo reale](../conversion/real-time.md).

## Altri problemi che puoi risolvere

### Leggi il messaggio prima di modificare qualsiasi cosa

Cerca il primo errore nella console o nel registro dei lavori. L'ultimo messaggio può solo indicare che il lavoro è stato interrotto. Copia la riga che nomina un file, un dispositivo o un'impostazione. Esegui un breve test dopo la prima modifica. Se funziona, scrivi cosa hai cambiato.

| Messaggio o sintomo | Prima cosa da fare | Se il problema persiste |
| --- | --- | --- |
| Autorizzazione negata | Salva un breve test in una cartella di tua proprietà. | Controlla se il file selezionato è aperto altrove o la cartella di output è gestita da un'altra app. |
| File non trovato | Apri il percorso indicato nell'errore e conferma che il file esiste. | Riseleziona il file all'interno di RVC. Se hai spostato il set di dati, ricostruisci i file e le funzionalità preparati. |
| Disco pieno | Controlla l'unità utilizzata dall'app, inclusi i file temporanei. | Sposta i backup completati su un'altra unità e scegli una destinazione scrivibile con spazio per i file intermedi. |
| Modulo non trovato | Controlla quale launcher e ambiente hai aperto. | Ripara l'ambiente dell'app. Mantenere un ambiente separato per ogni installazione di origine. |
| Perdita NaN o uscite silenziose | Interrompe la corsa e mantiene l'ultimo checkpoint funzionante. | Verifica la presenza di audio corrotto, pesi incompatibili e problemi di precisione. Se supportato, confronta una breve esecuzione FP32 in un esperimento separato. |

### La voce suona male anche se il lavoro è riuscito

#### Solo un modello vocale si comporta male

Testa una voce sicuramente valida utilizzando il proprio codificatore e le impostazioni dell'indice corrispondenti. Quindi testare il modello fallito con il recupero e gli effetti disattivati. Se la prima voce funziona e l'altra ripete ripetutamente lo stesso errore, ispezionare il codificatore, lo slot dell'altoparlante e i dati di addestramento del modello difettoso. Conservare l'input pulito come prova per un confronto dopo la riqualificazione.

#### Manca parte di un file lungo

Riproduci l'input e l'output fianco a fianco vicino alla sezione mancante. Prova solo quella sezione. Se il breve clip riesce, controlla la pressione della memoria, la suddivisione del silenzio, i cancelli automatici e la cartella di output. Unisci i segmenti completati in un editor e ascolta oltre ciascun confine prima di esportarli.

#### Solo un file in un batch fallisce

Converti quel file da solo. Se non può essere aperto, crea un nuovo WAV dall'originale. Se converte, controlla se il batch è stato interrotto o due file condividono un nome di output. Esegui nuovamente i file non riusciti in una nuova cartella di destinazione per proteggere i risultati precedenti.

### L'allenamento sembra bloccato

1. Cerca l'ultimo timestamp e la fase attuale. La preparazione di un set di dati, l'estrazione di caratteristiche e la creazione di un indice possono avere velocità molto diverse.
2. Controlla se la CPU, la GPU o il disco sono ancora attivi e se i file vengono scritti. Aggiorna il registro o il dashboard se la visualizzazione dello stato di avanzamento è obsoleta.
3. Se l'attività si interrompe e il registro presenta un errore, diagnosticare l'errore. Se è necessario interrompere un processo di formazione in esecuzione, utilizzare il controllo di salvataggio e interruzione e attendere la conferma, ove disponibile.
4. Prima di riprovare, annota il nome dell'esperimento e l'ultima fase confermata. Riutilizza i file completati solo quando il set di dati e le impostazioni corrispondono ancora.

### L'audio dal vivo funziona sul monitor ma non funziona durante una chiamata

- **Le altre persone sentono la tua voce normale:** seleziona il lato di registrazione del cavo virtuale nell'app di chiamata e disattiva qualsiasi seconda sorgente microfono.
- **Senti la voce convertita due volte:** usa un unico monitor. Disattiva l'ascolto di Windows o il monitor dell'app durante il confronto.
- **La chiamata si interrompe solo quando parli a bassa voce:** confronta la sensibilità di ingresso dell'app e la soppressione del rumore una alla volta. Registra l'input della chiamata per sentire cosa effettivamente lo raggiunge.
- **Il dispositivo è scomparso dopo aver collegato le cuffie:** interrompi la conversione, seleziona nuovamente il microfono fisico e le cuffie, quindi riavvia il flusso audio.

Quando un passaggio risolve il problema, ripeti il ​​test originale una volta con le tue solite app aperte. Mantieni la configurazione funzionante come riferimento.

## Sintesi vocale e segnalazione di un problema

Anteprima del discorso generato prima di convertirlo. Se il TTS originale sembra sbagliato, verificane la lingua, la voce e la scrittura. Per Edge TTS, controlla se la voce online è raggiungibile. Con una voce Windows installata, verifica che venga visualizzata nell'elenco supportato dell'app. Se solo la versione convertita sembra sbagliata, utilizza la base di conversione del file sopra.

Quando chiedi aiuto, includi l'app e l'edizione, la versione, il sistema operativo, la GPU e il backend, l'azione esatta, il primo errore con le righe di registro vicine e la riproduzione sicura più breve. Per la formazione, includere la fase non riuscita, la frequenza di campionamento, l'architettura, l'incorporamento e se si trattava di una nuova esecuzione o di un curriculum. Per i problemi in tempo reale, elenca i dispositivi in ​​ordine di segnale. Rimuovi identificatori di account, percorsi privati ​​e registrazioni sensibili prima di condividere i registri. Utilizza la [pagina contatti](https://ilariarvc.shop/en/contact/) per assistenza Ilaria RVC.
