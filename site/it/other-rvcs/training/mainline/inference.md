# Converti registrazioni in RVC WebUI (Mainline - Original RVC)

Inizia con una breve registrazione che puoi ascoltare chiaramente in un normale lettore multimediale, oltre a un modello RVC esportato che sei autorizzato a utilizzare. Il modello cambia la voce nella registrazione. La registrazione originale fornisce parole, ritmo e interpretazione. Per una canzone, utilizza una traccia vocale isolata o registrata separatamente per il primo passaggio.

## Metti ogni file al posto giusto

| Cosa hai ricevuto | Dove va |
| --- | --- |
| Uno ZIP o 7z con un modello all'interno | Estrai i file prima di aggiungerli a RVC WebUI (Mainline - Original RVC). |
| Un file `.pth` di inferenza | Copialo in `assets/weights/` all'interno della cartella RVC WebUI (Mainline - Original RVC). Se l'hai addestrato tu stesso, usa il modello compatto esportato. |
| Un `.index` popolato per quel modello esatto | Nelle build attuali, copialo in `assets/indices/`. Le versioni precedenti di solito cercano gli indici in `logs/`. Se il rilevamento automatico fallisce, selezionalo o inserisci manualmente il percorso completo. |
| Un checkpoint di addestramento `G_*.pth` o `D_*.pth` | Conservalo con l'esperimento in `logs/`. Utilizza la [guida all'addestramento](training.md) per identificare o esportare un modello per l'inferenza. |

Usa `added_*.index` quando l'addestramento ha prodotto sia file `trained_` che `added_`. Quest'ultimo contiene i vettori delle caratteristiche vocali usati dalla ricerca. Il tuo modello può funzionare senza indice. Imposta **Index Rate** su zero quando salti l'indice o non riesci a identificare il file corrispondente.

## Converti la tua prima clip

1. Apri la WebUI e trova la scheda **Model Inference**. Aggiorna gli elenchi di modelli e indici dopo aver copiato i file, quindi seleziona il modello di inferenza `.pth` nel menu a discesa della voce. Attendi che l'interfaccia carichi il modello.
2. Scegli un breve WAV con una voce che parla o canta da sola. Le build più recenti espongono un controllo di caricamento. Se la tua build mostra una casella di percorso, assegnagli un percorso completo come `C:\RVC\test\voice.wav`. Prova un percorso locale breve durante la diagnosi dell'accesso ai file in un pacchetto precedente.
3. Imposta il pitch shift su `0` per il primo passaggio. Imposta **Index Rate** o **Search feature ratio** su `0` e lascia le impostazioni extra così come sono. Seleziona `rmvpe` se è disponibile e hai installato i pesi. Per un modello con una sola voce, imposta **Speaker ID** su `0`.
4. Fai clic una volta su **Convert** e attendi il pannello di stato e di riproduzione. Riproduci il risultato dall'inizio. Se sembra utilizzabile, usa il menu del lettore audio per scaricarlo. Se la conversione fallisce, leggi lo stato o il terminale prima di modificare le impostazioni.
5. Ascolta prima la registrazione originale e poi il risultato. Controlla la prima parola, le note più alte e più basse e diverse pause. Cambia una sola impostazione e converti di nuovo lo stesso file per valutare l'effetto.

## Impostazioni da regolare durante la conversione

| Controllo | Come usarlo |
| --- | --- |
| Pitch Shift | Traspone la sorgente in semitoni. `+12` lo alza di un'ottava, `-12` lo abbassa di un'ottava. Fai prima piccoli movimenti quando le parole o le note sembrano forzate. |
| Pitch extraction | Stima il contorno dell'intonazione utilizzato nella conversione guidata dall'intonazione. Prova un altro metodo quando su alcune note compaiono interruzioni di voce. Confronta la stessa clip e mantieni tutto il resto costante. |
| Index Rate | Mescola le caratteristiche vicine della voce di destinazione quando esiste un indice corrispondente. Aumentalo gradualmente se il risultato mantiene troppo il timbro sorgente. Riducilo se la dizione diventa confusa. |
| Protect | Controlla quanto la conversione preserva i suoni non sonori, come i respiri e le consonanti. Valori più bassi rafforzano la protezione nel consueto controllo RVC WebUI (Mainline - Original RVC) `0–0.5`. Prova una piccola regolazione dopo aver verificato che l'indice funzioni. |
| Volume envelope | Modifica la precisione con cui il risultato segue i momenti forti e quelli silenziosi nell'input. I valori vicini a zero seguono più fedelmente il volume della registrazione originale. |
| Speaker ID | Seleziona una voce all'interno di un modello con più voci. Scegli un ID effettivamente presente in quel modello. |
| Resample output | Imposta la frequenza di campionamento audio esportata dove la build la espone. Lascialo al valore predefinito del modello durante il tuo primo test. |

### Prova comparativa delle impostazioni

Salva una sorgente di 10 secondi non elaborata come `test.wav`. Convertilo con zero pitch shift e nessun indice per ottenere `baseline.wav`. Carica l'indice corrispondente, aumenta **Index Rate** e salva il risultato come `retrieval.wav`. Confronta questi due file con un volume simile. Dopo aver scelto un'impostazione di recupero, prova una regolazione del tono e salva un terzo file. Mantieni l'impostazione che migliora il passaggio difficile senza peggiorare il resto.

## Converti una cartella

1. Completa con successo un test di file singolo utilizzando la stessa voce e le stesse impostazioni.
2. Crea cartelle `input` e `output` separate. Inserisci solo l'audio che desideri convertire in `input`.
3. In **Batch Inference**, scegli i tuoi file o inserisci il percorso completo della cartella di input. Imposta esplicitamente il percorso della cartella di output e scegli WAV se prevedi di modificare l'audio in un secondo momento.
4. Inizia con due file brevi. Conferma che ciascun risultato venga visualizzato nella cartella di output e venga riprodotto fino alla fine. Quindi esegui il set completo. Controlla lo stato dei singoli errori in modo da poter riprovare solo con i file interessati.

## Diagnostica errori comuni di conversione dei file

| Sintomo | Test successivo |
| --- | --- |
| L'elenco dei modelli è vuoto | Conferma che `.pth` sia estratto, sotto `assets/weights/` dell'installazione attiva e visibile dopo l'aggiornamento. |
| Il modello viene visualizzato ma non può essere caricato | Verifica che il file sia un'esportazione di inferenza compatibile. Un checkpoint di addestramento o un modello di un motore vocale diverso possono essere visualizzati nell'elenco senza essere utilizzabili. |
| L'indice fallisce o non viene prodotto alcun risultato udibile | Imposta il recupero su zero, esegui una conversione e conferma che il checkpoint funziona. Quindi seleziona l'indice popolato corrispondente e riprova. |
| L'output è granuloso o le sillabe traballano | Ascolta prima l'input. Riprova con una voce pulita con l'indice disattivato. Quindi confronta i metodi di intonazione e un modesto cambiamento nella trasposizione. |
| L'output manca in modalità batch | Verifica che i file di input si aprano, che la cartella di destinazione sia scrivibile e che il terminale riporti l'esito positivo per il nome file pertinente. |

Per approfondire, consulta [Modelli e file RVC](../../../start/models.md) e [Qualità audio](../../../conversion/audio-quality.md).
