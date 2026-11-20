---
label: "Installa Vonovox"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/vonovox/installation/
description: "Vonovox è un convertitore vocale live di Windows per le GPU NVIDIA supportate. Utilizza questa guida per effettuare un test pulito del microfono locale..."
---
# Installa Vonovox

[GitHub](https://github.com/dr87/Vonovox) · [Hugging Face](https://huggingface.co/dr87/vonovox)

Vonovox è un convertitore vocale live di Windows per le GPU NVIDIA supportate. Utilizza questa guida per effettuare un test pulito del microfono locale prima di aprire Discord, OBS o un gioco.

> **Ultima beta disponibile nel repository di download** · [Scarica Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

## 1. Raccogli i file e i dispositivi

- Apri Windows **Task Manager → Prestazioni** e identifica la scheda grafica per nome. Utilizza l'[elenco ufficiale dei pacchetti](https://huggingface.co/dr87/vonovox/tree/main) per risolvere una build o una patch specifica per l'hardware, se necessario. Conserva le build funzionanti precedenti nelle rispettive cartelle.
- Preparare un checkpoint RVC V2 pronto per l'inferenza e verificare quale incorporamento si aspetta il modello. Un checkpoint di allenamento come `G_*.pth` serve per riprendere l'allenamento. Per la prima esecuzione, scegli un modello con provenienza nota ed eseguilo senza indice se la build lo offre.
- Collega un microfono fisico e cuffie cablate. Chiudi altri programmi che potrebbero assumere il controllo esclusivo dei dispositivi audio e conferma che Windows può registrare il tuo microfono grezzo.

## 2. Avvia l'app

1. Scarica lo ZIP, quindi utilizza **Estrai tutto** e posiziona l'intero pacchetto in una cartella locale scrivibile come `C:\VoiceTools\Vonovox`. Esegui i launcher dalla cartella estratta, con i file di supporto accanto a loro.
2. Il pacchetto è già precompilato. Apri la cartella estratta ed esegui `start.bat`. Puoi saltare `setup.bat`.
3. Attendi l'interfaccia. Se la finestra si chiude immediatamente, esegui lo stesso programma di avvio da un prompt dei comandi aperto in modo che l'ultimo errore rimanga visibile. Verifica di aver estratto l'intero archivio e di aver selezionato una build GPU compatibile.
4. Seleziona il modello RVC V2 nell'area modello. Scegli l’embedder previsto quando l'interfaccia utente lo espone. Inizia con controlli di tonalità e formanti neutri, dimensioni predefinite dei blocchi ed effetti opzionali disattivati.

## 3. Controllare il primo segnale

Scegli il tuo microfono fisico come **Dispositivo di input** e un monitor per cuffie adatto o l'estremità di riproduzione del cavo virtuale come **Dispositivo di output**. Se l'interfaccia utente espone il backend audio, inizia con WASAPI e la modalità condivisa. Premi **Avvio**, attendi un momento e pronuncia una frase seguita da una pausa. Dovresti sentire la voce convertita, seguita dal silenzio. Premi **Stop** prima di cambiare dispositivo audio o iniziare il test successivo.

Se il modello non viene caricato, verificare RVC V2 e l'embedder prima di modificare le impostazioni audio. Se non si sente alcuna voce, verificare separatamente il microfono e i dispositivi di uscita. Continua con [indirizzamento e sintonizzazione del microfono](live-audio.md) una volta avviato il modello.

## Lista di controllo per la prima esecuzione

### Controlla la GPU prima del download

1. In Windows, premi **Ctrl + Maiusc + Esc** e apri **Prestazioni**. Seleziona ciascuna voce GPU e leggi il suo nome. Su un laptop, potresti vedere sia la grafica integrata che una GPU NVIDIA dedicata.
2. Abbina la GPU dedicata al pacchetto disponibile presso lo sviluppatore. Utilizza il collegamento Beta 3 qui sopra per quella versione. Se l'elenco dei pacchetti include una build o una patch specifica per l'hardware, verifica che si applichi al tuo archivio prima di installarlo.
3. Mantieni spazio sia per lo ZIP che per la cartella estratta. Utilizza una cartella locale in cui puoi scrivere. Evita di avviare direttamente dallo ZIP o di copiare un launcher dalla sua cartella.
4. Collega il microfono e le cuffie. Apri **Impostazioni → Sistema → Suono → Ingresso** e parla. Se Windows non rileva alcun segnale qui, correggi l'ingresso o l'autorizzazione del microfono prima di aprire Vonovox.

### Controlla che il setup sia effettivamente terminato

1. Il pacchetto è già precompilato. Apri la cartella estratta ed esegui `start.bat`. Puoi saltare `setup.bat`.
2. Se la finestra si chiude subito, apri il Prompt dei comandi nella cartella, esegui `start.bat` e leggi il primo errore.
3. Se il programma di installazione segnala un runtime Microsoft mancante, installare o riparare il runtime Visual C++ collegato e riprovare. Se segnala che CUDA non può essere inizializzato, verifica il driver NVIDIA e crea la compatibilità. Conservare insieme il pacchetto completo.
4. Se stai aggiornando un'installazione funzionante, estrai in una nuova cartella e mantieni disponibile la versione precedente. Testare la nuova versione prima di sostituire una configurazione funzionante nota.

### Carica una voce e controllala prima di aprire una chiamata

1. Decomprimere l'archivio vocale, se necessario. Trova l'inferenza `.pth`. I file denominati come `G_*.pth` o `D_*.pth` sono in genere checkpoint di addestramento.
2. Scegli la voce RVC V2 e utilizza l’embedder specificato dal suo editore. Mantieni l'intonazione neutra, gli effetti disattivati ​​e il buffer impostato di default per il primo test.
3. Seleziona il microfono fisico. Invia l'output alle cuffie per un test diretto, se supportato, oppure utilizza il cavo virtuale e il monitoraggio di Windows descritti in [Instrada e sintonizza Vonovox](live-audio.md).
4. Avvia il convertitore e pronuncia una breve frase, quindi fai una pausa. L'output dovrebbe avere i tuoi tempi e le tue parole con il timbro della voce selezionata. Se senti il ​​tuo microfono normale o il silenzio, segui i controlli di instradamento prima di modificare l'intonazione o gli effetti.

| Sintomo | Controlla prima |
| --- | --- |
| Nessun errore GPU o CUDA | Controlla che il pacchetto supporti la tua GPU NVIDIA dedicata e che Windows lo veda. |
| Impossibile caricare una voce | Controllare la versione RVC e l'encoder. Testare un'esportazione di inferenza compatibile prima di modificare le impostazioni audio. |
| Nessun segnale dal microfono | Prova il microfono fisico in Windows, quindi seleziona nuovamente lo stesso dispositivo in Vonovox. |
| Buon suono locale ma silenzio durante una chiamata | Gestisci i terminali del cavo e la selezione del microfono di destinazione nella guida di instradamento. |
| L'audio si interrompe solo durante una partita | Prova con il gioco aperto e aumenta la **Block Size** di un livello se necessario. |
