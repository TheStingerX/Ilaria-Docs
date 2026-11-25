# GPT-SoVITS

## Scegli il flusso di lavoro

GPT-SoVITS genera parlato a partire da un testo e usa una registrazione come riferimento vocale. La sintesi **zero-shot** usa il riferimento con un modello esistente. Il **fine-tuning** adatta il modello con una raccolta di clip e trascrizioni. Usa una voce che hai il permesso di riprodurre.

## Installa e apri la WebUI

1. Dal repository ufficiale scegli la release o il pacchetto Windows integrato indicato dal progetto. Estrai tutto in una cartella scrivibile e avvia `go-webui.bat`.
2. Per il sorgente, usa un ambiente separato e il programma di installazione indicato per il tuo sistema. Il sorgente Windows prevede opzioni CUDA o CPU. Su Linux è documentato anche ROCm. macOS ha istruzioni proprie. Controlla sempre che dipendenze e pesi corrispondano alla versione scelta.
3. Apri l’indirizzo locale mostrato nel terminale e lascia aperto il processo. Se non compare, il primo errore del terminale può indicare un runtime mancante, un problema con FFmpeg o l’assenza dei modelli di base.

## Genera la prima frase con una voce di riferimento

1. Scegli pochi secondi di parlato pulito, con un’unica voce e senza musica. La durata accettata dipende dalla versione del modello.
2. Apri l’inferenza e seleziona una coppia di pesi GPT e SoVITS compatibile. Inserisci la registrazione di riferimento, la sua trascrizione esatta e la lingua.
3. Scrivi una sola frase e imposta la lingua del testo da leggere. Controlla le lingue disponibili nella versione selezionata. Il progetto documenta, tra le altre, cinese, cantonese, inglese, giapponese e coreano.
4. Genera e ascolta. Controlla che tutte le parole siano presenti e che le pause suonino naturali. Prova prima a cambiare punteggiatura o segmentazione, tenendo fissi riferimento e pesi.

## Fai il fine-tuning con un dataset

Prepara clip pulite con trascrizioni accurate e indica la lingua di ciascun esempio. Il formato documentato è `vocal_path|speaker_name|language|text`. Rivedi le trascrizioni automatiche prima di avviare l’addestramento. Nell’interfaccia, prepara il dataset, addestra i componenti SoVITS e GPT con la versione selezionata e carica la coppia ottenuta nell’inferenza. Confrontala con il modello di base usando frasi che non erano nel dataset. Conserva insieme i pesi corrispondenti e annota versione e impostazioni.

## Risolvi gli errori più comuni

Se la voce è instabile, prova un riferimento più pulito e verifica trascrizione e lingua. Se un checkpoint non si apre, controlla che i pesi GPT e SoVITS siano compatibili tra loro e con la release. Se mancano parole nei testi lunghi, prova frasi più brevi e modifica la segmentazione. Se finisce la memoria GPU durante il training, prova un batch più piccolo con i controlli della tua versione.

[Repository e installazione ufficiali](https://github.com/RVC-Boss/GPT-SoVITS)
