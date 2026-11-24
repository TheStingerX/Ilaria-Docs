# Converti una registrazione in Applio

Inizia con una breve registrazione che puoi riconoscere immediatamente. Una frase di prova potrebbe essere "Potresti mettere il libro blu vicino alla finestra?" seguito da una breve pausa. Per una canzone, usa alcuni secondi di una voce solista isolata. Il motore riceve il suono presente in quel file, incluso il rumore della stanza, l'accompagnamento o altre persone che parlano.

## Effettua una conversione di riferimento

1. Apri **Convert Audio**. Nelle versioni precedenti di Gradio, cerca **Inference**. Seleziona la modalità a file singolo.
2. Seleziona il [modello vocale](models.md) e verifica l'embedder e lo **Speaker ID**. Se le impostazioni sono state ripristinate quando hai cambiato modello in Desktop, controllale prima di utilizzare la nuova voce.
3. Aggiungi la tua registrazione audio. Imposta **Pitch** a 0 e disabilita l'elaborazione e gli effetti aggiuntivi. Imposta **Search Feature Ratio** a 0 per disattivare il recupero delle caratteristiche dall'indice. Seleziona WAV o FLAC in modo da poter confrontare risultati senza perdite.
4. Avvia la conversione una volta. In Desktop, controlla lo stato dell'elaborazione se è in coda. In Gradio, lascia aperta la console di avvio per visualizzare gli errori che non compaiono nel browser.
5. Riproduci entrambi i file. Controlla che le parole mantengano il ritmo originale e che il risultato abbia il timbro del modello. Salva l'output in una cartella a tua scelta e annota le impostazioni che hai utilizzato.

## Cambia un controllo alla volta

| Controllo | Un primo esperimento utile |
| --- | --- |
| Pitch | Prova uno spostamento di pochi semitoni se la registrazione è fuori dall'estensione naturale della voce di destinazione. +12 raddoppia la frequenza e −12 la dimezza. Ascolta una frase nel registro acuto e una nel registro grave prima di applicare la modifica a un brano. |
| Estrazione del pitch | Confronta gli stimatori disponibili quando una nota salta o la voce diventa intermittente nei passaggi più deboli. Mantieni fissi il modello, la trasposizione e l'input. |
| Search Feature Ratio | Con l'indice corretto caricato, aumenta il valore a piccoli passi. Valuta quanto emerge il timbro desiderato e ascolta se le consonanti si ovattano o se si riconosce ancora troppo la voce originale. |
| Volume Envelope | Un valore vicino a 0 segue più da vicino la dinamica della sorgente. Un valore vicino a 1 conserva una parte maggiore della dinamica generata. Confronta sillabe deboli e forti allo stesso volume di ascolto. |
| Protect Voiceless Consonants | Con la conversione guidata dal pitch, le impostazioni inferiori a 0,5 attivano la protezione. I valori più bassi aumentano la protezione. Prova una frase con soffi e consonanti come S, F o T. |

**Split Audio** può aiutare a elaborare un file lungo in più parti. Ascolta i punti di giunzione. **Clean Audio** può ridurre il rumore indesiderato, quindi confronta il risultato con la conversione di riferimento per capire se perdi dettagli. **Proposed Pitch** calcola una trasposizione verso l'intonazione impostata e può interagire con la trasposizione manuale. Prova ciascuno di essi da solo. Gli effetti attivati tramite **Post-Process** si applicano all'audio generato e possono mascherare un problema di conversione.

## Esegui un piccolo batch

1. Metti due file di lavoro e un esempio più silenzioso o più lungo in una cartella di input di prova.
2. Scegli la modalità batch. Seleziona l'input e utilizza una destinazione diversa in cui il motore può scrivere. Per Gradio in esecuzione su un'altra macchina, i percorsi devono esistere su quella macchina.
3. Copia le impostazioni del modello testato, dell'embedder, dell'indice e del pitch. Avvia il test e controlla i risultati prima di elaborare un'intera collezione.
4. Se un input fallisce, converti solo quel file utilizzando le stesse impostazioni. Se fallisce solo nel batch, controlla il percorso e la denominazione dell'output. Archivia i file che desideri conservare al di fuori della memoria di lavoro temporanea.

## Diagnostica il risultato

- **La conversione non ha prodotto audio.** Leggi prima l'errore. Verifica che la registrazione si riproduca, che il motore sia pronto e che il modello selezionato sia un export per l'inferenza.
- **L'intonazione suona instabile o elettronica.** Prova l'embedder corretto, uno stimatore dell'intonazione e un input pulito senza effetti. Riproduci l'originale per vedere se il rumore o il salto erano già presenti.
- **Il parlato è presente ma la voce di destinazione sembra debole.** Controlla lo **Speaker ID**, quindi confronta il recupero solo se hai l'indice corretto.
- **L'audio distorce o il volume oscilla.** Effettua il test a un livello di sorgente inferiore e disattiva l'elaborazione che modifica il guadagno. Per un brano, confronta la voce isolata prima di mixarla nuovamente nella traccia di accompagnamento.
