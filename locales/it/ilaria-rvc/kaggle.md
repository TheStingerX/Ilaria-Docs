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
3. Carica il breve WAV. Inizia con **Intonazione 0** e **Rapporto indice 0**. Lasciare disattivati ​​gli effetti opzionali e utilizzare l'incorporatore previsto dal modello.
4. Fare clic una volta sul controllo di conversione e attendere l'output. Riproduci il risultato, quindi scaricalo dal lettore, se disponibile. Mantieni il WAV di input in modo da poter confrontare la stessa frase in seguito.
5. Se vuoi testare il recupero, seleziona l'indice corrispondente e prova un piccolo aumento da zero. Se l'output fallisce o la voce diventa più difficile da comprendere, tornare alla prova di riferimento e verificare l'abbinamento modello-indice.

Se la voce non appare mai, controlla prima il registro di importazione. Un checkpoint di addestramento salvato come file G o D appartiene a un esperimento e necessita di un'esportazione di inferenza prima di poter essere selezionato qui.

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
