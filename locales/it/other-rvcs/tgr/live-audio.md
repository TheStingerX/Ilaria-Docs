---
label: "🎧 Modello, microfono e cavo"
order: 90
permalink: /ilaria-rvc/tgr/live-audio/
---
# Configurare l'audio live in Okada TG Developed Fork

Utilizza un checkpoint di inferenza RVC compatibile e un microfono funzionante. Per prima cosa verifica che il segnale convertito raggiunga le tue cuffie. Quindi invia quel segnale a un'altra applicazione e registra ciò che riceve l'altra app.

## Carica una voce RVC

1. Interrompi la conversione se è già in esecuzione. Apri **Edit** nell'area di selezione del modello e scegli uno slot vuoto.
2. Scegli **Upload** e seleziona il file del modello di inferenza RVC. Se la finestra mostra un campo separato per l'indice, aggiungi il corrispondente `.index` se fornito. Usa solo file di inferenza compatibili. Un indice da solo non può produrre una voce.
3. Attendi il caricamento e clicca sullo slot appena caricato nella vista principale. Controlla il nome del modello prima di premere **Start**.
4. Imposta **Pitch** e **Index** su zero. Assicurati che **Passthrough** sia disattivato. Quando è attivo, inoltra la voce originale del microfono senza convertire il segnale.

## Testa il microfono e il dispositivo di elaborazione

1. In **Audio**, scegli la modalità per i dispositivi che intendi utilizzare. In un test del browser locale, utilizza **Client** e concedi al sito l'accesso al tuo microfono. In **Server**, scegli i dispositivi di input e output visibili al processo che esegue TGR.
2. Per il primo test, scegli il microfono fisico in **Input** e le cuffie in **Output**. Se la versione offre **Monitor**, puoi configurarlo dopo aver verificato questo collegamento.
3. Scegli la GPU o la CPU desiderata nel selettore del dispositivo. Per la prima prova con DirectML, prova `rmvpe_onnx` se elencato. I rilevatori di F0 indicati dal progetto per DirectML includono anche `fcpe_onnx`, `crepe_tiny_onnx` e `crepe_full_onnx`. La build CUDA può esporre un elenco diverso.
4. Premi **Start** con il valore predefinito di **Chunk**. Dai al modello il tempo di inizializzarsi, poi pronuncia una frase a voce bassa e una più lunga a voce più alta. Fai una pausa tra le due frasi. Verifica che l'uscita cambi quando si seleziona il modello e che l'audio rimanga stabile per un minuto.
5. Se senti anche la voce originale, disattiva l'ascolto diretto del microfono sul dispositivo o rimuovi l'altro collegamento del microfono nel sistema operativo. Tieni moderato il volume delle cuffie durante i test.

## Collega un cavo virtuale

Il progetto TGR usa Virtual Audio Cable di Muzychenko per i suoi esempi di risoluzione dei problemi di Windows. Questo in genere espone endpoint di riproduzione e registrazione corrispondenti denominati **Line 1**. Altri driver dei cavi utilizzano etichette diverse. Il segnale deve entrare nell'endpoint di riproduzione ed uscire attraverso l'endpoint di registrazione corrispondente.

| Impostazione | Prima prova con il cavo |
| --- | --- |
| TGR **Input** | Il tuo microfono fisico, lo stesso che ha funzionato nel test delle cuffie. |
| TGR **Output** | Terminale di riproduzione via cavo. |
| TGR **Monitor** | Cuffie, se mostrate come uscita separata. |
| Ingresso Discord o OBS | Dispositivo di registrazione del cavo. |
| Uscita Discord o riproduzione del sistema operativo | Cuffie. |

1. Installa il cavo e riavvia le applicazioni per aggiornare i dispositivi audio.
2. Imposta i dispositivi come mostrato, quindi controlla i formati predefiniti del microfono e del cavo nelle impostazioni audio del sistema operativo. Scegli una frequenza di campionamento supportata comune. In modalità Server, verifica la presenza di nomi di dispositivi duplicati elencati in API host diverse e utilizza una coppia compatibile.
3. Avvia la conversione, quindi avvia il test del microfono dell'applicazione ricevente. Registra una breve frase. Ascolta quello che riceve il destinatario, non solo il monitor in TGR.
4. In OBS, disabilita il microfono fisico separato se duplica la sorgente via cavo. Durante una chiamata, verifica che l'ingresso selezionato sia esplicito anziché commutato automaticamente quando si collega un nuovo auricolare.
5. Ferma il convertitore. Se l'indicatore di livello nell'app ricevente continua a rispondere, controlla l'endpoint di registrazione selezionato e l'eventuale audio del desktop instradato nel cavo.

## Ottimizza DirectML e CUDA partendo da una configurazione stabile

**Chunk** controlla il blocco dell'audio in entrata. **Extra** fornisce il contesto attorno al blocco corrente. **Crossfade** regola la sovrapposizione nei punti di giunzione tra i blocchi. Cambia un controllo alla volta ed effettua una registrazione di prova. Se il tempo di elaborazione si avvicina alla durata del blocco, inizia aumentando **Chunk** o riducendo **Extra**. Se un nuovo valore di **Chunk** causa problemi, interrompi e riavvia la conversione.

Nella build DirectML documentata, le modifiche a Chunk, Extra e Crossfade possono richiedere la selezione della CPU e quindi la riselezione della GPU desiderata. Fallo dopo l'interruzione, riavvia lo streaming e ripeti lo stesso test prima di valutare la latenza. Su CUDA, attendi che finisca l'inizializzazione prima di misurare. Alcune combinazioni di protocollo e audio del server mostrano **perf** senza altri tempi. Giudica il percorso completo della chiamata con una registrazione nell'app ricevente.

| Guasto | Azione successiva |
| --- | --- |
| Si sente la voce originale | Disattiva **Passthrough**, controlla lo slot selezionato e seleziona il cavo come unico microfono dell'app ricevente. |
| Una sillaba a volume basso scompare | Testa separatamente la soglia di ingresso e il rilevamento vocale dell'app di destinazione. Controlla una registrazione del microfono fisico per verificare se la sillaba è stata catturata. |
| L'audio scoppietta dopo aver collegato il cavo | Confronta le frequenze di campionamento del microfono e del cavo e le selezioni dell'API host. Ripeti la prova senza cavo per capire dove nasce il disturbo. |
| L'audio va a scatti all'apertura di un gioco | Ripristina l'ultimo blocco stabile, riduci il contesto o il carico concorrente e riprova. Conserva l'impostazione con cui entrambe le app funzionano insieme. |
| Un solo rilevatore di F0 causa un blocco | Ritorna a un metodo elencato dal tuo backend. Su DirectML, confronta i rilevatori di F0 in formato ONNX con la stessa frase breve. |
| Una seconda app ha un misuratore ma registra il rumore della stanza | Ferma TGR e ricontrolla l'indicatore del volume. Se continua a reagire al microfono, verifica se c'è un collegamento parallelo o se hai scelto il dispositivo di registrazione sbagliato. |

Se hai bisogno di aiuto per una diagnosi ulteriore, conserva la versione di TGR, il backend, i nomi dei dispositivi del microfono e del cavo, il rilevatore scelto e il primo errore della console. Indica se il problema si verifica anche eseguendo un test locale delle cuffie.
