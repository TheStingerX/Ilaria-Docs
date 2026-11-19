---
label: "Installa e verifica una voce"
icon: ":package:"
order: 96
permalink: /ilaria-rvc/applio/models/
---
# Installa una voce in Applio

Salva i file del modello in una cartella facile da trovare ed estrai gli eventuali archivi ZIP. Conserva le note dell'autore del modello accanto ai file. Utilizza modelli provenienti da fonti di cui ti fidi.

| Hai | Cosa farne |
| --- | --- |
| Un modello vocale esportato come `ExampleVoice.pth` | Importala come modello di inferenza. |
| Un `.index` fornito per quella voce | Tienilo accanto al suo modello. Usalo per provare il recupero delle caratteristiche dall'indice. |
| File come `G_100.pth` e `D_100.pth` | Conservali per l'addestramento o per riprendere un esperimento. Richiedi il modello esportato per l'inferenza se desideri convertire solo l'audio. |
| Informazioni sull'embedder, sul vocoder o sull'ID dello speaker | Annotale. Potresti averne bisogno quando scegli i controlli di conversione. |

Un embedder descrive il contenuto audio per il modello vocale. Usa lo stesso embedder usato durante l'addestramento prima di modificare qualsiasi impostazione di intonazione o recupero. Se un'esportazione utilizza un embedder personalizzato, ottieni i file corrispondenti dall'autore del modello.

## Importazione in Desktop

1. Apri **Models → Download Models**. Per un collegamento pubblico supportato, inseriscilo in **Download from Link** e utilizza **Download**. Attendi che il download sia completato prima di aggiornare la libreria.
2. Per i file già estratti, scegli **Upload Model Files** nello stesso spazio di lavoro. Seleziona `.pth` e utilizza **Save File**. Ripeti per l'indice, se incluso con il modello.
3. Aggiorna **Model Library**. Utilizza **Inspect** per controllare metadati disponibili come frequenza di campionamento, embedder, vocoder e numero di voci supportate. Quindi scegli **Use** per portare il modello nell'area di lavoro di conversione.
4. Verifica che il modello selezionato sia la tua nuova voce prima di eseguire la conversione.

## Importazione Gradio

1. Apri **Models**, chiamato **Download** in alcune versioni. Inserisci il collegamento del modello nel pannello di download o carica la voce e l'indice estratti tramite **Drop Files**.
2. Dopo l'installazione, apri **Convert Audio** o **Inference** e aggiorna l'elenco dei modelli. Scegli la nuova voce per nome.
3. Se copi i file manualmente, cerca la directory logs/models attiva dell'installazione effettivamente avviata. Un'installazione di Gradio utilizza comunemente un layout come `logs/ExampleVoice/ExampleVoice.pth`, con l'indice corrispondente nella stessa directory. Il percorso mostrato da un'installazione desktop può differire.

## Conferma che il motore possa utilizzarlo

1. Utilizza un spezzone di discorso isolato della durata di circa dieci secondi. Inizia con il tono a 0, gli effetti disattivati e **Search Feature Ratio** a 0. Se il modello ha più voci, seleziona lo **Speaker ID** desiderato.
2. Scegli l'embedder indicato dall'autore ed esegui una singola conversione. Conferma che il risultato è riproducibile e che puoi riconoscere le parole che hai fornito.
3. Se disponi di un indice corrispondente, salva prima la conversione di riferimento. Seleziona l'indice, aumenta leggermente il valore di **Search Feature Ratio** ed esegui nuovamente la stessa clip. Mantieni il risultato che funziona meglio per quella voce.

Se un modello scompare dopo aver aggiornato l'elenco, verifica l'estensione del file e controlla dove l'installazione selezionata conserva i modelli. Se la voce è elencata ma produce un errore in fase di caricamento, leggi il primo errore di caricamento del modello. Verifica di aver fornito un'esportazione di inferenza e che la tua build supporti l'architettura. Se un file proviene da un download del browser, verifica che il browser abbia salvato il vero archivio del modello. Se ha scaricato una pagina di login in HTML, accedi al sito e riprova il download.
