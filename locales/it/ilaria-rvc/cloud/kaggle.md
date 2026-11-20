---
label: "Kaggle"
icon: ":notebook:"
order: 98
permalink: /ilaria-rvc/kaggle/
description: "Fai clic su Esegui tutto nell'editor. Puoi anche eseguire le quattro celle di codice una alla volta, dall'alto verso il basso. Attendi il completamento di..."
---
# Kaggle

[Apri il notebook ufficiale di Kaggle](https://www.kaggle.com/code/ilarialopez/ilaria-rvc) · [Ottieni il file del notebook da GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Kaggle.ipynb)

> **2.4.0** · Il pacchetto Windows sposta l’app e il runtime in app/ e i modelli vocali nella cartella models/ alla radice. Arrivano i notebook Colab e Lightning AI Studio, le indicazioni per scaricare gli embedder opzionali nel training e la coppia Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). Il runtime include pywin32 e corregge pip.

[Kaggle](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Kaggle.ipynb) · [Google Colab](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb) · [Lightning AI Studio](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-LightningAI.ipynb)

## 1. Prepara un breve test

- Accedi a Kaggle e mantieni aperto l'editor del notebook mentre lavori.
- Per la conversione serve un modello di inferenza compatibile (`.pth`). Il file `.index` abbinato è facoltativo: puoi convertire l’audio anche senza. Prepara un WAV di 10 secondi con una voce chiara e senza musica.
- Per la addestramento, conservare una copia locale del set di dati di origine. Prepara un ZIP delle registrazioni utilizzabili che sei autorizzato a utilizzare. Mantieni una breve clip separata al di fuori del set di dati di addestramento in modo da poter testare il tuo modello su qualcosa che non ha sentito.
- Inizia con un test del file prima di tentare una lunga corsa di allenamento. Kaggle controlla la disponibilità e i limiti della GPU, quindi controlla il tempo e le risorse visualizzate nella tua sessione.

## 2. Crea una copia modificabile e accendi la GPU

1. Apri il [notebook pubblicato](https://www.kaggle.com/code/ilarialopez/ilaria-rvc). Accedi se richiesto. Utilizza **Copia e modifica** o l'azione di copia equivalente per aprire la tua versione modificabile.
2. Se invece parti da GitHub, scarica il file raw `Ilaria-RVC-2.1-Kaggle.ipynb`, crea un notebook in Kaggle e importa il file tramite l'editor del notebook. Apri il notebook risultante su Kaggle anziché eseguirlo sul tuo computer.
3. Apri le impostazioni della sessione nell'editor. Per **Acceleratore**, seleziona un'opzione **GPU** disponibile. Se Kaggle chiede di riavviare la sessione dopo la modifica, accetta prima di aggiungere file o avviare una corsa.
4. Abilita **Internet** nelle stesse impostazioni della sessione. Il notebook necessita di connettività per scaricare il codice, le dipendenze e i pesi, quindi aprire il collegamento Gradio.
5. Se una delle due impostazioni non è disponibile, leggi la spiegazione mostrata da Kaggle. Controlla l'idoneità del tuo account e la disponibilità attuale dell'acceleratore. Riprova quando potrai abilitare entrambe le impostazioni.

## 3. Esegui le quattro sezioni principali

Fai clic su **Esegui tutto** nell'editor. Puoi anche eseguire le quattro celle di codice una alla volta, dall'alto verso il basso. Attendi il completamento di ogni cella prima di eseguire quella successiva. Le celle opzionali di esportazione e arresto non fanno nulla con le impostazioni predefinite.

| Sezione Notebook | Cosa fa un'esecuzione riuscita | Cosa controllare se si interrompe |
| --- | --- | --- |
| **1. Controlla GPU** | Mostra i dati della GPU e scarica il codice aggiornato da `main` → `/kaggle/working/ilaria-rvc`. | Se mancano gli strumenti NVIDIA, seleziona una GPU disponibile e riavvia la sessione prima di eseguirla nuovamente. Se Git non riesce a raggiungere il repository, verifica Internet. |
| **2. Installa dipendenze** | Prepara l'ambiente del notebook e verifica che PyTorch veda la GPU. Cerca `GPU ready:` seguito dal suo nome. | Leggi la prima dipendenza o errore del compilatore. Un dispositivo CUDA mancante significa che l'app non è ancora in grado di utilizzare la GPU. |
| **3. Scarica i pesi dei modelli** | Scarica e controlla le risorse richieste dal notebook. | Lascia che il tentativo integrato finisca. Se continua a non funzionare, controlla l'accesso alla rete e lo spazio libero. |
| **4. Apri Ilaria RVC** | Avvia l'interfaccia e stampa **Open Ilaria RVC** nell'output della cella. | Se la scheda non si apre automaticamente, fare clic su quel pulsante. Se il notebook segnala che il collegamento Gradio non è disponibile, controllare Internet ed eseguire nuovamente il passaggio 4 dopo che i passaggi 1–3 hanno avuto esito positivo. |

Apri il collegamento corrente dal passaggio 4 in un'altra scheda. Lascia la sessione Kaggle in esecuzione. Dopo la reimpostazione della sessione o il riavvio dell'avvio, utilizzare il collegamento appena generato.

> Per aggiornare una sessione aperta, salva il lavoro, esegui la cella di arresto con `STOP = True` e ripeti i passaggi da 1 a 4. La prima cella mostra la versione caricata.

## Inizia qui con il notebook aggiornato

### Prima di eseguire qualsiasi cosa

1. Apri la tua copia modificabile su Kaggle e mantienila **privata**. La cella di lancio stampa le password. Mantieni il suo output lontano da screenshot, log condivisi e versioni pubblicate.
2. Apri **Impostazioni**. Il notebook richiede **GPU T4 x2** e **Internet**. Se Kaggle non li ha applicati durante l'importazione, selezionali tu stesso. Se T4 x2 non è disponibile, controlla la GPU offerta al tuo account e leggi l'elenco delle GPU stampato dopo l'avvio.
3. Fai clic su **Esegui tutto** o esegui le quattro sezioni numerate in ordine. Le sezioni 1–3 preparano l'app. La sezione 4 lo apre. Le celle di esportazione e di arresto sono facoltative e per impostazione predefinita sono disattivate.
4. Nell'output della sezione 1, controlla i nomi delle GPU e la versione di **Ilaria RVC**. La sezione 2 verifica che PyTorch veda le GPU disponibili. La sezione 3 controlla i pesi scaricati. Continuare dopo che ogni operazione è stata completata correttamente.

### Apri l'app e il file manager

La sezione **Avvio → Accedi a Configurazione** ha due opzioni. Lascia selezionato **Gradio + Cloudflare** per un primo test. Gradio apre Ilaria RVC e Cloudflare apre FileBrowser. Se scegli **Horizon**, inserisci l'ID Horizon dalla dashboard di Horizon e approva la richiesta del token CLI quando richiesto. Horizon produce collegamenti separati per gli stessi due servizi.

1. Attendi **Open Ilaria RVC** nell'output e cliccalo se la nuova scheda non si apre automaticamente.
2. Accedi con il nome utente `ilaria` e il valore accanto a **WebUI password** nell'output di avvio corrente.
3. Per i file esportati, fare clic su **Open FileBrowser**. Utilizza il **nome utente FileBrowser** e la **password FileBrowser** mostrati nello stesso output. Queste credenziali sono separate dall'accesso WebUI. FileBrowser mostra solo la cartella di esportazione dedicata.
4. Mantieni Kaggle in esecuzione mentre usi una delle schede. Dopo aver riavviato l'app, utilizza i collegamenti e le credenziali del nuovo output. Se una pagina rifiuta la password, controlla di aver utilizzato la coppia di credenziali corretta per quella pagina.

### Seleziona solo i pesi che ti servono

La sezione 3 è impostata su `TRAINING_SAMPLE_RATES = ["32k"]` per impostazione predefinita. Lasciarlo invariato per un primo test di allenamento a 32 kHz. Se l'esperimento pianificato richiede pre-training in bundle a un'altra velocità supportata, includi `"40k"` o `"48k"` nell'elenco prima di eseguire la cella. Utilizzare un elenco vuoto solo per deduzione. Questo elenco controlla i download di pre-addestramento. La frequenza di campionamento dell'esperimento deve comunque corrispondere all'architettura e ai pesi selezionati nell'interfaccia utente Web.

La stessa cella ha `DOWNLOAD_FCPE`. Lascia le impostazioni predefinite se non sei sicuro. Se FCPE non è disponibile, il notebook lo segnala ed è possibile selezionare RMVPE.

### Ottimizzare l'allenamento solo dopo un breve test

| Impostazione | Cosa fare per la prima esecuzione |
| --- | --- |
| Precisione di allenamento | Il notebook si avvia con FP16 quando tutte le GPU visibili sono T4. Prova FP32 per un confronto, se necessario. Alla ripresa, abbina la configurazione del checkpoint esistente. |
| Dimensioni batch | Il valore dell'interfaccia utente è per GPU per una nuova esecuzione con questo notebook. Un T4 al batch 8 e due T4 al batch 4 danno entrambi un batch globale di 8 quando questi sono i dispositivi utilizzati dalla corsa. Controlla i valori effettivi nel **Registro di allenamento**. Inizia in piccolo se la memoria è scarsa. |
| Worker e prefetch | Lasciali a 2 ciascuno per la prima esecuzione. Il notebook suggerisce 4 worker e prefetch 8 rispetto alla configurazione del caricatore precedente. Cambia un fattore alla volta e confronta i tempi in `train.log`. |
| Fused AdamW | All'inizio lascia perdere. Provalo in una nuova sessione se vuoi confrontare le prestazioni. Conserva la configurazione batch originale alla ripresa. |

Due GPU non raggruppano la loro VRAM in un unico dispositivo più grande. Se una corsa esaurisce la memoria, ridurre il batch per GPU e verificare le impostazioni effettive nel registro prima di riprovare.

### Esporta, scarica e ferma

Dopo la conversione o dopo che **Stop and save** conferma il checkpoint, imposta `EXPORT = True` ed esegui **Export results**. Lascia vuoto `TRAINING_MODEL` per il modello normale e le esportazioni audio oppure inserisci il nome esatto del modello per includere i file dell'esperimento ripristinabili. Apri **FileBrowser** o utilizza il collegamento visualizzato nella cella di esportazione e scarica **Ilaria-RVC-results.zip**. L'archivio è scritto in `/kaggle/working/ilaria-shared`. Conferma di poterlo aprire localmente prima di chiudere la sessione.

Al termine, imposta `STOP = True` ed esegui **Stop o riavvia**. Ciò spegne WebUI, FileBrowser e i relativi tunnel. Per riaprirli nella stessa sessione, eseguire nuovamente la sezione 4. Per aggiornare il codice dell'app, salvare il lavoro, interrompere i servizi ed eseguire nuovamente i passaggi 1–4.

///region cloud-inference-dataset
## 4. Converti una registrazione

1. Nella scheda del browser di Ilaria RVC, apri **Altro → Importa modelli locali**. Carica il file del modello di inferenza (`.pth`) e, se lo hai, l’indice abbinato (`.index`), che è facoltativo. Puoi anche caricare uno ZIP compatibile che contiene questi file. Attendi il completamento dell'importazione. In alternativa, apri **Altro → Download models from Hugging Face, Google Drive or MEGA**, incolla un link scaricabile pubblicamente a uno ZIP supportato, un `.pth` o un `.index` e premi **Download and install model**. Se il modello e l’indice facoltativo hanno link separati, scaricali uno alla volta dallo stesso pannello.
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

UVR separa un file audio in tracce chiamate stem. Usalo quando la voce di destinazione è mixata con musica, effetti sonori o altre voci. Se hai già una registrazione vocale pulita, conserva l'originale. UVR elabora l'audio sul tuo computer dopo aver scaricato i modelli richiesti. Cloud esegue separatamente il successivo lavoro di addestramento RVC.

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
///endregion

### Traduci il flusso di lavoro originale di Applio in Ilaria RVC

| Passa al flusso di lavoro originale | Cosa fare in questo notebook di Ilaria RVC |
| --- | --- |
| Configura un account Kaggle e verificalo | Accedi e verifica di poter abilitare GPU e Internet. Verifica completa se Kaggle lo richiede. |
| Scegli una modalità tunnel o persistenza | Esegui il notebook ufficiale in ordine e apri l'URL Gradio dal passaggio 4. Gestisce il tunnel. Esegui il backup dell'esperimento al di fuori della sessione temporanea utilizzando la cella di esportazione. |
| Carica il set di dati e incolla il suo percorso | Utilizza il selettore di caricamento in Ilaria RVC, attendi che finisca e conferma che **Percorso del set di dati** punta ai file preparati. Abbina il nome del modello a quello che inserirai durante l'esportazione dei checkpoint. |
| Scegli un'affettatrice e post-normalizzazione | **Dati di processo** gestisce l'affettatura e regola automaticamente ciascuna fetta. Il flusso di lavoro di Ilaria RVC non ha un interruttore Applio Post separato. Abbina la frequenza di campionamento del training all'architettura e ai pretraining. Il ricampionamento non può ripristinare i dettagli mancanti. |
| Imposta i file di allenamento silenziosi su zero | Lascia i **File di allenamento silenziosi** sui valori predefiniti per la prima esecuzione. Se le tue clip hanno già pause naturali e non lunghe sezioni vuote, confronta una sequenza separata con zero. Controlla entrambe le uscite sulle stesse pause trattenute. |
| Scegli la dimensione del batch in base alla lunghezza del set di dati | Inizia da 2 o 4 se non sei sicuro e usa 8 solo se la GPU ha margine e la configurazione funziona. Controlla il registro e la VRAM. Ridurre il batch dopo un errore di memoria insufficiente. Kaggle non implica un moltiplicatore batch fisso e la lunghezza del set di dati da sola non determina la dimensione del batch. |
| Allenati finché il modello non suona bene | Salva ogni 5 o 10 epoche se il tempo disponibile e lo spazio su disco lo consentono. Confronta le esportazioni di inferenze salvate sulle stesse clip di prova. Non esiste un obiettivo epocale universale ed estendere un periodo fino a 500 epoche non può riparare un set di dati scadente. |

#### Ascolta prima di decidere quale checkpoint mantenere

Utilizza una breve serie di clip tenute in mano. Includi una frase semplice, una con consonanti acute e una pausa. Per il canto, prova anche una nota tenuta e una transizione tra i registri. Inizia con l'intonazione a zero, il recupero disabilitato e gli effetti opzionali disattivati. Mantieni il modello i cui risultati sono più chiari nell'insieme. Se tutte le versioni hanno gli stessi soffi metallici o parole ovattate, rivisita il set di dati invece di estendere la corsa alla cieca.

Conserva l'esportazione dell'inferenza e il relativo indice corrispondente, se ne hai utilizzato uno. Per continuare un'esecuzione in un secondo momento, salva l'esperimento completo con la cella di esportazione del notebook e conserva il set di dati originale separatamente. Apri lo ZIP scaricato e controllane il contenuto prima di terminare la sessione di Kaggle.

///region cloud-training
## 5. Allena una voce e salva il tuo lavoro

1. In **Addestramento**, scegli un nuovo **Nome modello**. Importa il tuo audio o ZIP tramite i controlli di caricamento del set di dati. Attendi il completamento dell'importazione e conferma che **Il percorso del set di dati** punta alle registrazioni importate.
2. Esegui il **Dataset Checker** e ascolta eventuali registrazioni sospette. Verifica che l'architettura RVC V2, la frequenza di campionamento, l'embedder e le impostazioni del tono corrispondano ai pretraining G/D selezionati, se li utilizzi. Inizia con una dimensione batch adatta alla GPU allocata.
3. Esegui **Process Data**, quindi **Feature Extraction**. Leggere lo stato di ciascuno prima di continuare. Se modifichi il set di dati o il codificatore, prepara nuovi file per l'esperimento prima dell'addestramento.
4. Esegui **Train Pth** con un primo obiettivo modesto e salva i checkpoint periodici. Conserva una breve clip di prova dai dati di allenamento. Confronta i checkpoint esportati sulla stessa clip prima di iniziare una sequenza più lunga.
5. Crea l'indice delle caratteristiche se hai bisogno di recuperarlo, quindi prova prima l'esportazione dell'inferenza con **Rapporto indice 0**. Per una spiegazione dettagliata di ciascuna impostazione, vedere [Controlli e flusso di lavoro dell'allenamento](../train/training-controls.md).
6. Se vuoi fermarti a metà corsa, usa **Stop and save** all'interno di Ilaria RVC e attendi finché il log non conferma il salvataggio. Scarica i risultati mentre la sessione Cloud è ancora attiva.
///endregion

## 6. Scarica un backup prima di uscire

La cella opzionale **Export results** del notebook crea un archivio in `/kaggle/working/ilaria-shared/Ilaria-RVC-results.zip`. Una sessione Kaggle è temporanea. Verificare di avere il backup sul proprio computer prima di interrompere o reimpostare la sessione.

- **Solo per file di inferenza:** imposta `EXPORT = True` e lascia `TRAINING_MODEL = ""`. L'archivio include `.pth` e `.index` file in `models`, oltre ai file scritti in `InferOutput`. Utilizza il pulsante di download del lettore per qualsiasi conversione che non abbia scritto un file lì.
- **Per conservare un esperimento di addestramento ripristinabile:** attendi **Stop and save** o che l'addestramento finisca di salvare. Imposta `EXPORT = True` e inserisci il nome esatto dell'esperimento in `TRAINING_MODEL`. Inserisci solo il nome, senza il percorso della cartella. L'esportazione include il suo albero `logs/<name>` accanto agli output regolari.
- Esegui quella cella di codice. Apri il collegamento visualizzato o scarica **Ilaria-RVC-results.zip** tramite Kaggle **Output**. Apri il ZIP localmente e conferma che contenga ciò che ti serve. Conserva il set di dati originale separatamente. La cella di esportazione non confeziona `datasets`.

Per arrestare solo l'app, imposta `STOP = True` in **Interrompi o riavvia** ed esegui la cella opzionale dopo aver salvato. Eseguire nuovamente il passaggio 4 per riaprirlo nella stessa sessione. Arrestare o ripristinare l'intera sessione di Kaggle è un'azione separata.

## Risoluzione dei problemi

| Cosa vedi | Cosa fare prima |
| --- | --- |
| Il passaggio 1 dice di abilitare una GPU | Seleziona una GPU in **Acceleratore**, riavvia se richiesto, quindi esegui nuovamente dal passaggio 1. |
| La scheda Gradio è vuota o scaduta | Conferma che la sessione è ancora in esecuzione. Utilizzare il collegamento più recente del passaggio 4. Se non è possibile creare il collegamento, verificare Internet e leggere l'output della cella. |
| La conversione o l'allenamento hanno esaurito la memoria | Chiudi i lavori concorrenti nella sessione e prova una breve clip. Per l'addestramento, riduci le dimensioni del batch e disattiva la memorizzazione nella cache dei set di dati GPU opzionale, se disponibile. Salva prima di interrompere una corsa. |
| L'esportazione dice che non ci sono risultati | Converti o esporta prima una voce. Controlla la directory di output e conferma che il nome dell'esperimento facoltativo dell'archivio corrisponde esattamente a **Nome modello**. |
| Alcuni file scompaiono dopo un ripristino | Avvia nuovamente la configurazione e reimporta i backup locali. La cartella di lavoro appartiene alla sessione attiva. |

Se un problema si ripete, annota la sezione con errori, il nome della GPU del passaggio 1 e il primo errore dall'output della cella. Il notebook scrive anche il registro di avvio dell'app sotto `/kaggle/working/.ilaria-notebook/startup.log`. Rimuovi l'URL di Gradio da qualsiasi registro che condividi. Vedere [Risoluzione dei problemi RVC](../../reference/troubleshooting.md) per la diagnostica del modello e dell'audio.
