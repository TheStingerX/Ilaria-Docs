# GPT-SoVITS

## 1. Scegli da dove partire

GPT-SoVITS legge un testo usando una registrazione come riferimento vocale. Inizia dalla **sintesi zero-shot**. Ti bastano un breve audio di riferimento, la sua trascrizione e il testo che vuoi far leggere. Quando questa prova funziona, passa al **fine-tuning** se ti serve una voce più coerente fra testi diversi. Il fine-tuning parte da una raccolta di clip trascritte e produce due serie di pesi, GPT e SoVITS. Usa registrazioni e voci per cui hai il permesso.

Il componente GPT predice una rappresentazione del parlato a partire dal testo. SoVITS la usa per produrre l’audio. Entrambi devono essere compatibili con la famiglia selezionata. A seconda della release, la WebUI può offrire v2, v3, v4, v2Pro o versioni più recenti. Usa i file di base richiesti dalla famiglia che scegli.

## 2. Installa e avvia la WebUI

### Windows con il pacchetto integrato

1. Apri il [repository ufficiale](https://github.com/bilibili/GPT-SoVITS) e cerca il pacchetto Windows integrato nella sezione **Installation**. Controlla che sia adatto al tuo sistema e alla versione del modello che vuoi usare.
2. Estrai l’intero archivio in una cartella scrivibile, ad esempio `C:\AI\GPT-SoVITS`. Apri la cartella estratta e lascia insieme il runtime e le cartelle dei modelli.
3. Avvia `go-webui.bat` se è presente. Alcune release hanno launcher diversi per ciascuna versione. Usa quello indicato per il tuo pacchetto.
4. Aspetta che il terminale stampi l’indirizzo locale e aprilo nel browser. Lascia aperto il terminale. Se la pagina non si apre, verifica che il processo sia ancora in esecuzione e che la porta coincida con quella mostrata dall’avvio corrente.

### Installazione dal sorgente

Usa un ambiente separato. Le istruzioni ufficiali partono da Conda con Python 3.10. Il programma di installazione PowerShell per Windows prevede scelte CUDA o CPU. Quello per Linux documenta anche ROCm. Per macOS ci sono percorsi MPS e CPU separati. Scegli in base al sistema operativo, al driver e alla release. Se usi la CPU, prova una frase breve prima di avviare un lavoro lungo.

Dopo aver installato dipendenze e asset, dalla cartella principale del sorgente avvia `python webui.py`. Segui le indicazioni della release per FFmpeg e per i modelli di base. Nell’installazione manuale i pesi vanno in `GPT_SoVITS/pretrained_models`, mantenendo le sottocartelle della famiglia. Aggiungi i modelli di trascrizione, separazione o trattamento del testo cinese secondo le necessità della tua versione.

#### Esempio dal sorgente su Linux con CUDA 12.8

Esegui i comandi nella cartella del sorgente della release scelta. L’esempio presuppone un driver NVIDIA compatibile e un installer che prevede `CU128`. Per AMD o CPU, usa il backend previsto dalla tua versione.

~~~bash
conda create -n GPTSoVits python=3.10
conda activate GPTSoVits
bash install.sh --device CU128 --source HF
python webui.py
~~~

## 3. Genera la prima frase

1. Nella WebUI principale apri **1C-inference** e avvia l’interfaccia TTS. Se hai già addestrato modelli, aggiorna l’elenco dei pesi prima di aprire l’inferenza.
2. Per cominciare, scegli i pesi GPT e SoVITS di base della stessa famiglia. Cambiare un peso con quello di un’altra release o voce rende più difficile capire perché una prova fallisce.
3. Scegli una registrazione con una sola persona, una frase completa e senza musica. La vecchia interfaccia descritta da AI Hub richiede **3–10 secondi**. Se la tua versione indica un intervallo diverso, segui quello mostrato sullo schermo.
4. Nel campo del testo di riferimento, scrivi esattamente quello che viene detto nella registrazione e selezionane la lingua. Il testo di riferimento e quello da generare si inseriscono in due campi distinti.
5. Scrivi una frase breve nel campo di inferenza e seleziona la lingua del testo da leggere. Mantieni le altre impostazioni predefinite. Controlla che il modello supporti la lingua. Il README ufficiale cita cinese, cantonese, inglese, giapponese e coreano nella panoramica generale.
6. Avvia l’inferenza, ascolta il risultato e salvalo. Verifica prima e ultima parola, pause e pronuncia. Se la frase suona male, ricontrolla trascrizione e lingue prima di regolare i controlli avanzati.

### Evita parole saltate o ripetute nei testi lunghi

Dividi il testo in corrispondenza di frasi o paragrafi. Prova un solo paragrafo prima di generare tutto. Mantieni gli stessi pesi, riferimento e impostazioni fra i segmenti. Se il tono è piatto o troppo veloce, prova un riferimento con l’intonazione che cerchi e confronta la stessa frase. Se la tua versione offre velocità o controlli di campionamento, modifica un parametro per volta.

## 4. Prepara il dataset per il fine-tuning

### Seleziona e taglia le registrazioni

1. Parti da parlato pulito di una sola persona. Elimina musica, voci sovrapposte, distorsione, silenzi lunghi e registrazioni inutilizzabili. Metti da parte alcune frasi per il test finale.
2. Crea cartelle separate per gli originali, le clip tagliate e le trascrizioni. Conserva gli originali per ripetere il lavoro se serve.
3. Apri **Audio Slicer**, indica il percorso sorgente e scegli una cartella di destinazione diversa. Fai prima una prova su pochi file. Controlla che inizio e fine delle parole siano intatti prima di tagliare l’intero dataset.
4. Tieni le frasi che puoi trascrivere con precisione. Un set più piccolo e uniforme è un punto di partenza migliore di un archivio pieno di rumore o cambi di voce.

### Trascrivi e correggi le clip

1. Apri la trascrizione in batch (**ASR**) e inserisci la cartella delle clip tagliate. Seleziona un riconoscitore per la lingua del parlato. Il progetto documenta Faster-Whisper per inglese e giapponese e un percorso ASR separato per il cinese.
2. Avvia la trascrizione e cerca il file `.list` nella cartella di output impostata. Controlla che ogni riga punti a una clip accessibile.
3. Carica il `.list` nella WebUI di annotazione. Ascolta le clip e correggi parole, lingua e punteggiatura. Salva le modifiche e riapri qualche riga per verificare che siano rimaste.
4. Se prepari il file a mano, scrivi una riga per clip con quattro campi separati da `|`. Usa percorsi esistenti sul computer che esegue GPT-SoVITS.

~~~text
audio/clip01.wav|speaker01|en|This is the first recording.
~~~

## 5. Formatta il dataset e addestra i modelli

### Formatta il dataset

In **1A-Dataset formatting**, assegna all’esperimento un nome univoco e inserisci il percorso del `.list` corretto. Se la WebUI la richiede, indica anche la cartella delle clip tagliate. Scegli la famiglia prima di formattare. Avvia i passaggi uno alla volta o usa il comando di formattazione in un clic, se disponibile. Leggi il log per individuare eventuali clip saltate e controlla che nell’esperimento siano stati creati i file di output.

### Addestra SoVITS e poi GPT

1. In **1B-Fine-tuned training**, verifica nome dell’esperimento, famiglia e pesi iniziali. Per la prima prova, avvia SoVITS con i valori predefiniti della tua versione.
2. Se hai una sola GPU, esegui i due addestramenti in sequenza. Controlla che SoVITS abbia salvato un checkpoint, poi avvia GPT sullo stesso esperimento formattato.
3. Salva anche checkpoint intermedi se l’interfaccia lo consente. Il **batch** indica quanti esempi vengono elaborati insieme e influisce sulla memoria. Le **epoche** indicano quanti passaggi vengono effettuati sul dataset. Se la GPU esaurisce la memoria, prova un batch più piccolo prima di cambiare gli altri parametri.
4. Lascia disattivato il DPO nella prima prova. Confronta i checkpoint con frasi tenute fuori dal dataset, usando sempre lo stesso audio di riferimento. Ascolta parole mancanti, ripetizioni, coerenza del timbro e pause. Scegli la coppia che funziona meglio su quelle prove.

### Carica e conserva la voce ottenuta

Aggiorna l’elenco dei modelli in inferenza e seleziona il checkpoint GPT, di solito `.ckpt`, e i pesi SoVITS corrispondenti, di solito `.pth`. Conserva entrambi insieme alla versione del programma, alle impostazioni, al `.list` corretto e a un riferimento breve da riutilizzare. Se sposti l’esperimento su un altro computer, aggiorna i percorsi delle clip nel `.list` prima di formattare di nuovo.

## 6. Risolvi gli errori più comuni

| Sintomo | Cosa controllare | Come procedere |
| --- | --- | --- |
| Il browser non si collega | Processo e indirizzo in console | Riavvia il launcher e apri l’indirizzo mostrato dall’avvio corrente. |
| Mancano FFmpeg o i modelli di base | Primo errore e famiglia selezionata | Installa la dipendenza prevista dalla release e mantieni la struttura delle cartelle. |
| La trascrizione è vuota | Cartella delle clip e lingua ASR | Prova un file riproducibile, poi verifica che l’input punti alle clip tagliate. |
| La formattazione salta dei file | Percorsi e quattro campi del `.list` | Correggi le righe o i percorsi non validi e ripeti la formattazione. |
| I checkpoint non compaiono | Salvataggio e menu dei modelli | Controlla che esistano entrambi i file e aggiorna l’elenco in inferenza. |
| La voce ripete o salta parole | Trascrizione del riferimento e segmentazione | Prova una frase breve, controlla le due lingue e dividi il testo lungo. |
| La GPU esaurisce la memoria | Fase in errore e dimensione del batch | Chiudi altri carichi GPU, riduci il batch ed esegui le fasi in sequenza. |

[Repository e release di GPT-SoVITS](https://github.com/bilibili/GPT-SoVITS)
