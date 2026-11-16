---
label: "☁️ Esegui Ilaria RVC su Kaggle"
order: 97
permalink: /ilaria-rvc/kaggle/
---
# Esegui Ilaria RVC 2.1 su Kaggle

Kaggle esegue il notebook su una macchina Linux remota. Quando accendi l'acceleratore GPU NVIDIA, la GPU remota fa il lavoro. Il tuo computer necessita solo di un browser e di un accesso a Internet. Questa è un'alternativa per le persone con grafica AMD o Intel, grafica integrata o una GPU locale troppo lenta per il lavoro.

[Apri il notebook ufficiale di Kaggle](https://www.kaggle.com/code/ilarialopez/ilaria-rvc) · [Ottieni il file del notebook da GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/Ilaria-RVC-2.1-Kaggle.ipynb)

!!!warning Mantieni privato il collegamento dell'app
Il passaggio 4 crea un URL Gradio pubblico. Chiunque abbia quell'URL può utilizzare l'app mentre è in esecuzione. La visibilità del tuo taccuino Kaggle è separata dall'accesso a quell'URL. Utilizza una sessione senza materiale privato e mantieni l'URL fuori da screenshot, post pubblici e output condiviso.
!!!

## 1. Prepara un breve test

- Accedi a Kaggle e mantieni aperto l'editor del taccuino mentre lavori.
- Per la conversione, avere un file di inferenza `.pth` compatibile e, se disponibile, il suo corrispondente `.index`. Il primo test funziona senza indice. Salva un WAV di 10 secondi di una voce chiara senza musica.
- Per la addestramento, conservare una copia locale del set di dati di origine. Prepara un ZIP delle registrazioni utilizzabili che sei autorizzato a utilizzare. Mantieni una breve clip separata al di fuori del set di dati di addestramento in modo da poter testare il tuo modello su qualcosa che non ha sentito.
- Inizia con un test del file prima di tentare una lunga corsa di allenamento. Kaggle controlla la disponibilità e i limiti della GPU, quindi controlla il tempo e le risorse visualizzate nella tua sessione.

## 2. Crea una copia modificabile e accendi la GPU

1. Apri il [taccuino pubblicato](https://www.kaggle.com/code/ilarialopez/ilaria-rvc). Accedi se richiesto. Utilizza **Copia e modifica** o l'azione di copia equivalente per aprire la tua versione modificabile.
2. Se invece parti da GitHub, scarica il file raw `Ilaria-RVC-2.1-Kaggle.ipynb`, crea un notebook in Kaggle e importa il file tramite l'editor del notebook. Apri il notebook risultante su Kaggle anziché eseguirlo sul tuo computer.
3. Apri le impostazioni della sessione nell'editor. Per **Acceleratore**, seleziona un'opzione **GPU** disponibile. Se Kaggle chiede di riavviare la sessione dopo la modifica, accetta prima di aggiungere file o avviare una corsa.
4. Abilita **Internet** nelle stesse impostazioni della sessione. Il notebook necessita di connettività per scaricare il codice, le dipendenze e i pesi, quindi aprire il collegamento Gradio.
5. Se una delle due impostazioni non è disponibile, leggi la spiegazione mostrata da Kaggle. Controlla l'idoneità del tuo account e la disponibilità attuale dell'acceleratore. Riprova quando potrai abilitare entrambe le impostazioni.

## 3. Esegui le quattro sezioni principali

Fai clic su **Esegui tutto** nell'editor. Puoi anche eseguire le quattro celle di codice una alla volta, dall'alto verso il basso. Attendi il completamento di ogni cella prima di eseguire quella successiva. Le celle opzionali di esportazione e arresto non fanno nulla con le impostazioni predefinite.

| Sezione Notebook | Cosa fa un'esecuzione riuscita | Cosa controllare se si interrompe |
| --- | --- | --- |
| **1. Controlla GPU** | Mostra il nome della GPU, la memoria e il driver. Dai un'occhiata alla versione appuntata di Ilaria RVC sotto `/kaggle/working/ilaria-rvc`. | Se mancano gli strumenti NVIDIA, seleziona una GPU disponibile e riavvia la sessione prima di eseguirla nuovamente. Se Git non riesce a raggiungere il repository, verifica Internet. |
| **2. Installa dipendenze** | Prepara l'ambiente del notebook e verifica che PyTorch veda la GPU. Cerca `GPU ready:` seguito dal suo nome. | Leggi la prima dipendenza o errore del compilatore. Un dispositivo CUDA mancante significa che l'app non è ancora in grado di utilizzare la GPU. |
| **3. Scarica i pesi dei modelli** | Scarica e controlla le risorse richieste dal notebook. | Lascia che il tentativo integrato finisca. Se continua a non funzionare, controlla l'accesso alla rete e lo spazio libero. |
| **4. Apri Ilaria RVC** | Avvia l'interfaccia e stampa **Apri Ilaria RVC** nell'output della cella. | Se la scheda non si apre automaticamente, fare clic su quel pulsante. Se il notebook segnala che il collegamento Gradio non è disponibile, controllare Internet ed eseguire nuovamente il passaggio 4 dopo che i passaggi 1–3 hanno avuto esito positivo. |

Apri il collegamento corrente dal passaggio 4 in un'altra scheda. Lascia la sessione Kaggle in esecuzione. Dopo la reimpostazione della sessione o il riavvio dell'avvio, utilizzare il collegamento appena generato.

## 4. Converti una registrazione

1. Nella scheda del browser di Ilaria RVC, apri **Altro → Importa modelli locali**. Aggiungi il checkpoint di inferenza o un ZIP supportato e aggiungi l'indice abbinato, se disponibile. Attendi il completamento dell'importazione.
2. Apri **Inferenza**, aggiorna l'elenco delle voci se necessario, seleziona la voce desiderata e vai a **Inferenza singola**.
3. Carica il breve WAV. Inizia con **Intonazione 0** e **Rapporto indice 0**. Lasciare disattivati ​​gli effetti opzionali e utilizzare l’embedder previsto dal modello.
4. Fare clic una volta sul controllo di conversione e attendere l'output. Riproduci il risultato, quindi scaricalo dal lettore, se disponibile. Mantieni il WAV di input in modo da poter confrontare la stessa frase in seguito.
5. Se vuoi testare il recupero, seleziona l'indice corrispondente e prova un piccolo aumento da zero. Se l'output fallisce o la voce diventa più difficile da comprendere, tornare alla prova di riferimento e verificare l'abbinamento modello-indice.

Se la voce non appare mai, controlla prima il registro di importazione. Un checkpoint di addestramento salvato come file G o D appartiene a un esperimento e necessita di un'esportazione di inferenza prima di poter essere selezionato qui.

## Prepara il tuo set di dati e pianifica un allenamento

### Pulisci l'audio con MVSEP solo dove necessario

Conserva una copia intatta delle tue registrazioni. Se contengono già un'unica voce pulita e asciutta, salta la separazione. Utilizza il materiale che sei autorizzato a caricare su [MVSEP](https://mvsep.com/en/home) e su cui allenarti. Per le registrazioni riservate, puliscile localmente.

1. **Isola la voce.** Carica un breve esempio e scegli un'opzione di separazione vocale. Scarica la radice vocale in WAV quando disponibile. Riproducilo rispetto all'originale e ascolta tramite le cuffie musica, altre voci, sillabe spezzate e artefatti acquosi o metallici.
2. **Rimuovi le voci di accompagnamento solo se presenti.** Per i brani con armonie o un ritornello sotto la destinazione, utilizza un'opzione di separazione solista-accompagnamento sul gambo vocale. Mantieni l'output principale. Se i cantanti si sovrappongono ancora o la solista presenta dei buchi, usa una sezione pulita o una ripresa diversa.
3. **Riduci il riverbero solo dove udibile.** Se la voce ha un'ampia coda di riverbero stereo, prova prima un'opzione di de-reverbero stereo su una copia. Per le riflessioni rimanenti della stanza, confrontare un passaggio di de-reverbero della stanza. Puoi saltare entrambe le fasi. Ascolta le consonanti troncate e i respiri ad ogni passaggio.
4. **Rimuovi l'eco solo se ripete la voce.** Una ripetizione ritardata udibile richiede un breve test separato. Conserva l'originale o sostituiscilo se la rimozione rimuove le parole. Evitare di impilare i passaggi su audio altrimenti pulito.
5. **Prepara le clip finali.** Ritaglia il rumore inutilizzabile e le lunghe sezioni vuote in un editor come Audacity, mantenendo fiati utili e fraseggi naturali. Esporta WAV puliti. Metti insieme i file approvati in uno ZIP e conserva alcune clip pulite all'esterno per la valutazione.

Testare l'intera catena di pulizia per alcuni secondi prima di trattare l'intero set di dati. Un modello può apprendere gli artefatti rimasti nel suo audio di addestramento. Controlla diverse clip di sessioni diverse prima del caricamento.

### Pulisci un set di dati localmente con Ultimate Vocal Remover (UVR)

UVR separa un file audio in tracce chiamate stem. Usalo quando la voce di destinazione è mixata con musica, effetti sonori o altre voci. Se hai già una registrazione vocale pulita, conserva l'originale. UVR elabora l'audio sul tuo computer dopo aver scaricato i modelli richiesti. Kaggle esegue separatamente il successivo lavoro di addestramento RVC.

#### Installa UVR e prepara una clip di prova

1. Scarica il programma di installazione o il pacchetto per il tuo sistema operativo da [UVR release](https://github.com/Anjok07/ultimatevocalremovergui/releases). Avvia l'app desktop dopo averla installata.
2. Crea una copia di 15–30 secondi di un esempio che contenga una linea chiara e una sezione in cui la musica si sovrappone ad essa. Conserva l'originale al sicuro.
3. Fai clic su **Select Input** e scegli la clip di prova. Utilizza **Select Output** per scegliere una nuova cartella scrivibile, come `uvr-test`. Scegli **WAV** come formato di output.
4. Seleziona un **Process Method** e un modello che separa la **voce** dalla **strumentale**, ad esempio un modello vocale in **MDX-Net**. Se l'elenco è vuoto, apri le impostazioni **Centro download**, seleziona la famiglia di modelli corrispondente e scarica il modello adatto. Ritorna alla finestra principale e selezionala.
5. Abilita la **Conversione GPU** solo se la build installata riconosce un dispositivo supportato. Se questa opzione causa un errore, disattivala e prova sulla CPU. L'elaborazione della CPU può essere più lenta, quindi inizia con una breve clip.

#### Separa le voci e ascolta

Fai clic su **Start Processing**. Al termine, trova la radice della voce nella cartella di output. Alcuni modelli scrivono anche una radice strumentale. Riproduci l'originale e la voce a un volume simile. Controlla le consonanti, i respiri, le note trattenute e le sezioni in cui l'accompagnamento è forte. Se senti ancora gli strumenti o la voce sembra acquosa o metallica, confronta un altro modello sulla stessa clip di prova prima di elaborare il set di dati completo.

Se hai selezionato la radice sbagliata, controlla i nomi dei file o ascolta ogni uscita. Mantieni quello che contiene la voce principale di destinazione.

#### Pulisci i problemi rimanenti uno alla volta

| Cosa rimane | Cosa provare in UVR |
| --- | --- |
| Cori o armonie | Inserisci la radice vocale isolata in un modello destinato alla separazione solista e accompagnamento, se la tua installazione ne offre una. Conserva l'output principale e verifica che la voce di destinazione sia completa. |
| Code di riverbero tra le frasi | Prova un modello destinato al de-riverbero, se disponibile. Confronta prima e dopo sullo stesso brano. Mantieni la radice originale se il de-riverbero danneggia le consonanti o le note trattenute. |
| Ripetizioni ritardate udibili | Prova un modello di rimozione dell'eco, se disponibile. Se rimuove parole o distorce respiri, usa un'altra ripresa o escludi la sezione interessata. |
| Ronzii ambientali, picchi tagliati o altre voci | Controlla l'originale. Se il trattamento continua a danneggiare la voce, sostituire o escludere la clip. La separazione non può ricostruire i picchi persi a causa del ritaglio. |

Elaborare il set completo solo dopo che un breve confronto sembra corretto. Usa Audacity o un altro editor per tagliare il materiale inutilizzabile. Mantieni pause e respiri naturali, esporta le clip approvate come WAV e inserisci solo quelle clip nello ZIP del set di dati. Mantieni i gambi strumentali e rifiutati fuori dallo ZIP. Successivamente, caricalo in **Formazione** su Ilaria RVC e conferma che **Percorso del set di dati** punta alle registrazioni importate.

### Traduci il flusso di lavoro originale di Applio in Ilaria RVC

| Passa al flusso di lavoro originale | Cosa fare in questo taccuino di Ilaria RVC |
| --- | --- |
| Configura un account Kaggle e verificalo | Accedi e verifica di poter abilitare GPU e Internet. Verifica completa se Kaggle lo richiede. |
| Scegli una modalità tunnel o persistenza | Esegui il notebook ufficiale in ordine e apri l'URL Gradio dal passaggio 4. Gestisce il tunnel. Esegui il backup dell'esperimento al di fuori della sessione temporanea utilizzando la cella di esportazione. |
| Carica il set di dati e incolla il suo percorso | Utilizza il selettore di caricamento in Ilaria RVC, attendi che finisca e conferma che **Percorso del set di dati** punta ai file preparati. Abbina il nome del modello a quello che inserirai durante l'esportazione dei checkpoint. |
| Scegli un'affettatrice e post-normalizzazione | **Dati di processo** gestisce l'affettatura e regola automaticamente ciascuna fetta. Il flusso di lavoro di Ilaria RVC non ha un interruttore Applio Post separato. Abbina la frequenza di campionamento del training all'architettura e ai pretraining. Il ricampionamento non può ripristinare i dettagli mancanti. |
| Imposta i file di allenamento silenziosi su zero | Lascia i **File di allenamento silenziosi** sui valori predefiniti per la prima esecuzione. Se le tue clip hanno già pause naturali e non lunghe sezioni vuote, confronta una sequenza separata con zero. Controlla entrambe le uscite sulle stesse pause trattenute. |
| Scegli la dimensione del batch in base alla lunghezza del set di dati | Inizia da 2 o 4 se non sei sicuro e usa 8 solo se la GPU ha margine e la configurazione funziona. Controlla il registro e la VRAM. Ridurre il batch dopo un errore di memoria insufficiente. Kaggle non implica un moltiplicatore batch fisso e la lunghezza del set di dati da sola non determina la dimensione del batch. |
| Allenati finché il modello non suona bene | Salva ogni 5 o 10 epoche se il tempo disponibile e lo spazio su disco lo consentono. Confronta le esportazioni di inferenze salvate sulle stesse clip di prova. Non esiste un obiettivo epocale universale ed estendere un periodo fino a 500 epoche non può riparare un set di dati scadente. |

#### Ascolta prima di decidere quale punto di controllo mantenere

Utilizza una breve serie di clip tenute in mano. Includi una frase semplice, una con consonanti acute e una pausa. Per il canto, prova anche una nota tenuta e una transizione tra i registri. Inizia con l'intonazione a zero, il recupero disabilitato e gli effetti opzionali disattivati. Mantieni il modello i cui risultati sono più chiari nell'insieme. Se tutte le versioni hanno gli stessi soffi metallici o parole ovattate, rivisita il set di dati invece di estendere la corsa alla cieca.

Conserva l'esportazione dell'inferenza e il relativo indice corrispondente, se ne hai utilizzato uno. Per continuare un'esecuzione in un secondo momento, salva l'esperimento completo con la cella di esportazione del notebook e conserva il set di dati originale separatamente. Apri lo ZIP scaricato e controllane il contenuto prima di terminare la sessione di Kaggle.

## 5. Allena una voce e salva il tuo lavoro

1. In **Addestramento**, scegli un nuovo **Nome modello**. Importa il tuo audio o ZIP tramite i controlli di caricamento del set di dati. Attendi il completamento dell'importazione e conferma che **Il percorso del set di dati** punta alle registrazioni importate.
2. Esegui il **Dataset Checker** e ascolta eventuali registrazioni sospette. Verifica che l'architettura RVC V2, la frequenza di campionamento, l'embedder e le impostazioni del tono corrispondano ai pretraining G/D selezionati, se li utilizzi. Inizia con una dimensione batch adatta alla GPU allocata.
3. Esegui **Process Data**, quindi **Feature Extraction**. Leggere lo stato di ciascuno prima di continuare. Se modifichi il set di dati o il codificatore, prepara nuovi file per l'esperimento prima dell'addestramento.
4. Esegui **Train Pth** con un primo obiettivo modesto e salva i checkpoint periodici. Conserva una breve clip di prova dai dati di allenamento. Confronta i checkpoint esportati sulla stessa clip prima di iniziare una sequenza più lunga.
5. Crea l'indice delle caratteristiche se hai bisogno di recuperarlo, quindi prova prima l'esportazione dell'inferenza con **Rapporto indice 0**. Per una spiegazione dettagliata di ciascuna impostazione, vedere [Controlli e flusso di lavoro dell'allenamento](training-controls.md).
6. Se vuoi fermarti a metà corsa, usa **Stop and save** all'interno di Ilaria RVC e attendi finché il log non conferma il salvataggio. Scarica i risultati mentre la sessione Kaggle è ancora attiva.

## 6. Scarica un backup prima di uscire

La cella opzionale **Esporta risultati** del taccuino crea un archivio in `/kaggle/working/Ilaria-RVC-results.zip`. Una sessione dal vivo è temporanea. Verificare di avere il backup sul proprio computer prima di interrompere o reimpostare la sessione.

- **Solo per file di inferenza:** imposta `EXPORT = True` e lascia `TRAINING_MODEL = ""`. L'archivio include `.pth` e `.index` file in `models`, oltre ai file scritti in `InferOutput`. Utilizza il pulsante di download del lettore per qualsiasi conversione che non abbia scritto un file lì.
- **Per conservare un esperimento di addestramento ripristinabile:** attendi **Interrompi e salva** o che l'addestramento finisca di salvare. Imposta `EXPORT = True` e inserisci il nome esatto dell'esperimento in `TRAINING_MODEL`. Inserisci solo il nome, senza il percorso della cartella. L'esportazione include il suo albero `logs/<name>` accanto agli output regolari.
- Esegui quella cella di codice. Apri il collegamento visualizzato o scarica **Ilaria-RVC-results.zip** tramite Kaggle **Output**. Apri il ZIP localmente e conferma che contenga ciò che ti serve. Conserva il set di dati originale separatamente. La cella di esportazione non confeziona `datasets`.

Per arrestare solo l'app, imposta `STOP = True` in **Interrompi o riavvia** ed esegui la cella opzionale dopo aver salvato. Eseguire nuovamente il passaggio 4 per riaprirlo nella stessa sessione. Arrestare o ripristinare l'intera sessione di Kaggle è un'azione separata.

## Risoluzione dei problemi

| Cosa vedi | Cosa fare prima |
| --- | --- |
| Il passaggio 1 dice di abilitare una GPU | Seleziona una GPU in **Acceleratore**, riavvia se richiesto, quindi esegui nuovamente dal passaggio 1. |
| Il notebook segnala un checkout o un commit diverso | Avvia una sessione pulita con il notebook ufficiale. Eseguire il backup di tutti i risultati esistenti prima di modificare o reimpostare la sessione. |
| La scheda Gradio è vuota o scaduta | Conferma che la sessione è ancora in esecuzione. Utilizzare il collegamento più recente del passaggio 4. Se non è possibile creare il collegamento, verificare Internet e leggere l'output della cella. |
| La conversione o l'allenamento hanno esaurito la memoria | Chiudi i lavori concorrenti nella sessione e prova una breve clip. Per l'addestramento, riduci le dimensioni del batch e disattiva la memorizzazione nella cache dei set di dati GPU opzionale, se disponibile. Salva prima di interrompere una corsa. |
| L'esportazione dice che non ci sono risultati | Converti o esporta prima una voce. Controlla la directory di output e conferma che il nome dell'esperimento facoltativo dell'archivio corrisponde esattamente a **Nome modello**. |
| Alcuni file scompaiono dopo un ripristino | Avvia nuovamente la configurazione e reimporta i backup locali. La cartella di lavoro appartiene alla sessione attiva. |

Se un problema si ripete, annota la sezione con errori, il nome della GPU del passaggio 1 e il primo errore dall'output della cella. Il notebook scrive anche il registro di avvio dell'app sotto `/kaggle/working/.ilaria-notebook/startup.log`. Rimuovi l'URL di Gradio da qualsiasi registro che condividi. Vedere [Risoluzione dei problemi RVC](../reference/troubleshooting.md) per la diagnostica del modello e dell'audio.
