# Log e ripristino

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

> **RMVPE · 2.4.2** · Corregge l’inferenza RMVPE quando cuDNN rifiuta un’operazione GRU su CUDA. RMVPE usa un input contiguo e riprova quella GRU sulla CPU se cuDNN restituisce `CUDNN_STATUS_NOT_SUPPORTED`. Richiede la 2.4.0 o successiva. Apri **Altro → Aggiorna Ilaria RVC** per installare la 2.4.2.

## L'app si chiude o il browser rimane vuoto

1. Esegui `RUN_ILARIA_RVC_LOGS.bat` dalla cartella completamente estratta. Lascia la console aperta e leggi il primo errore, incluso il file o il dispositivo a cui fa riferimento.
2. Se la console mostra che il server locale è in esecuzione, aprire l'indirizzo stampato lì. Il valore predefinito è `http://127.0.0.1:6969`. Se la porta è occupata, controlla la presenza di un'istanza esistente prima di avviarne una seconda. Salva qualsiasi lavoro attivo prima di chiuderlo.
3. Controlla il modello esatto della GPU in **Task Manager → Prestazioni** e confrontalo con [GPU compatibili](gpu-compatibility.md). Il pacchetto Windows include CUDA 12.8. Su un PC dotato solo di GPU NVIDIA Maxwell, Pascal o Volta, controlla `cu126-runtime-install.log` per verificare l'avanzamento mentre il programma di avvio prepara il runtime CUDA 12.6. Un download non riuscito richiede la verifica dell'accesso a Internet e dello spazio libero su disco.
4. Se dopo l'estrazione manca un file, controlla che sia stato estratto l'intero archivio e che il collegamento punti a quell'installazione. Esegui il backup dei modelli, dei set di dati e delle cartelle degli esperimenti prima di sostituire i file di installazione.

## Manca il modello o l'audio suona in modo errato

| Sintomo | Primo controllo |
| --- | --- |
| Manca una voce nel **Modello vocale** | Controlla il registro di importazione, quindi fai clic su **Aggiorna**. Seleziona un'esportazione di inferenza `.pth`. All'esperimento appartiene un checkpoint di addestramento G o D. |
| Un file non viene decodificato | Riproducilo fuori dall'app. Esporta un breve PCM WAV in una cartella locale scrivibile e testa la copia. |
| La conversione fallisce solo con l'indice | Imposta **Rapporto indice** su zero e prova senza indice. Se funziona, controlla che l'opzionale `.index` corrisponda al modello e al suo incorporato. |
| La voce suona ancora come la fonte | Conferma il modello selezionato e il suo incorporatore previsto. Gli encoder HuBERT generici possono mantenere il timbro sorgente. Prova la stessa frase con il recupero disattivato prima di confrontare le impostazioni. |
| I soffi o le consonanti sono metallici | Prova diverse clip pulite con gli effetti disattivati. Se lo stesso modello continua a distorcere quei suoni, controlla gli esempi di respiro e consonanti nei dati di allenamento, correggili e riqualificali. |
| Un file lungo fallisce ma uno corto funziona | Controlla la VRAM e prova **Dividi audio** o segmenti più brevi. Ascolta ogni join prima dell'esportazione. |

Inizia con **Pitch 0**, un WAV breve e asciutto e un modello notoriamente valido. Modificare un'impostazione per test. Vedi [Controlli di inferenza](../convert/inference-buttons.md) per gli effetti e le opzioni di esportazione.

## L'allenamento si interrompe o non può riprendere

1. Controlla quale fase ha fallito. In **Dati di elaborazione**, verificare che il percorso del set di dati punti a registrazioni leggibili e che l'unità di output disponga di spazio. In **Feature Extraction**, controlla che la preelaborazione sia stata completata e che le risorse di pitch e embedder scelte siano disponibili.
2. Se **Train Pth** esaurisce la VRAM, scarica il modello di inferenza, chiudi i processi GPU concorrenti, riduci **Dimensione batch** e disabilita la memorizzazione nella cache del set di dati GPU se abilitata. Controlla il **Registro allenamento** per le impostazioni effettive prima di riprovare.
3. Se **Train Index** fallisce, controlla che le feature estratte appartengano all'esperimento selezionato. Un indice è facoltativo per la conversione. È possibile testare un'esportazione di inferenza funzionante con **Rapporto indice 0** durante la diagnosi dell'indice.
4. Per interrompere l'allenamento, fai clic su **Interrompi e salva** e attendi la conferma. Per riprendere, utilizza lo stesso nome dell'esperimento e le stesse impostazioni compatibili. Mantieni insieme i checkpoint G/D e lo stato dell'esperimento. Un'esportazione di inferenza da sola non può riprendere l'addestramento.
5. Se hai modificato la frequenza di campionamento, il vocoder o l'embedder, crea un esperimento separato e prepara le funzionalità per quella configurazione. Mantenere la corsa originale disponibile per il confronto.

## Recupera una sessione di Kaggle

Se il collegamento del browser smette di funzionare, controlla se la sessione di Kaggle è ancora in esecuzione. Dopo aver riaperto i servizi, utilizza i nuovi collegamenti e le attuali credenziali mostrate per ciascun servizio. WebUI e FileBrowser hanno accessi separati. Esporta e scarica i risultati prima di reimpostare la sessione. Segui la [guida Kaggle](../cloud/kaggle.md) per i passaggi di backup.

## Raccogli i dettagli per un report

Copia la versione dell'app, la GPU esatta e il primo errore. Includere il pulsante premuto e una breve sequenza che riproduca il problema. Per l'addestramento, includere la fase non riuscita, la frequenza di campionamento, l'incorporatore e se è stata ripresa una corsa. Per la conversione, indicare se la stessa clip ha funzionato con un altro modello o con il recupero disattivato. Se disponibile, utilizza **Dashboard addestramento → Rapporto diagnostico**. Esamina il rapporto prima di condividere e rimuovi percorsi privati, password e collegamenti di sessione.
