---
label: "📦 Installa TG Developed Fork"
order: 100
permalink: /ilaria-rvc/tgr/installation/
---
# Installare Okada TG Developed Fork

TG Developed Fork (TGR) proviene dal ramo Deiteris della famiglia w-okada. Il fork supporta la conversione RVC. Usa i pacchetti e il launcher di TGR. Tieni TGR in una cartella separata da VCClient e Deiteris per conservare le altre installazioni.

## Scarica la build adatta al tuo computer

Controlla **Gestione attività → Prestazioni** su Windows o **Informazioni su questo Mac** su macOS. Leggi il nome effettivo della GPU o del chip. Nel nome del file di rilascio, `amd64` si riferisce all'architettura del processore utilizzata dai PC Intel e AMD standard a 64 bit.

| Configurazione | File da cercare nelle [versioni TGR](https://github.com/tg-develop/voice-changer/releases) |
| --- | --- |
| Windows con NVIDIA CUDA supportato | Tutte le parti dell'archivio `voice-changer-windows-amd64-cuda.zip` della stessa release. |
| Windows con AMD, grafica Intel supportata o funzionamento solo con CPU | `voice-changer-windows-amd64-dml.zip`. Seleziona CPU nell'app durante il test senza una GPU utilizzabile. |
| Apple Silicon Mac | `voice-changer-macos-arm64-cpu.tar.gz` se incluso. Il supporto per macOS è sperimentale. |
| Intel Mac | `voice-changer-macos-amd64-cpu.tar.gz` se incluso. L'accelerazione dipende dalla grafica e dalla build installate. |
| Linux | Usa il pacchetto contrassegnato per Linux se disponibile, oppure installa dal codice sorgente del fork. |

## Windows passo dopo passo

1. Nella pagina delle versioni, apri **Assets** sotto la release che hai scelto. Scarica lo ZIP DirectML oppure tutte le parti dell'archivio CUDA, ad esempio `.001` e `.002`. Le parti devono rimanere una accanto all'altra con i nomi scaricati.
2. Per CUDA, usa un programma di decompressione che supporta gli archivi in più parti e avvia l'estrazione da `.001`. Legge le parti successive durante l'estrazione. Per DirectML, estrai il singolo ZIP. Scegli una cartella in cui puoi scrivere e mantieni intatte le cartelle estratte.
3. Apri il pacchetto estratto, quindi `MMVCServerSIO`, quindi avvia `MMVCServerSIO.exe`.
4. Lascia aperta la finestra di avvio durante il download dei pesi richiesti. Quando si apre il browser, mantieni la console disponibile per la diagnostica. Se la pagina non si apre automaticamente, usa l'indirizzo locale riportato nella console.
5. L'avvio della prima conversione CUDA potrebbe richiedere alcuni secondi. Attendi il completamento dell'inizializzazione prima di premere di nuovo **Start** o cambiare dispositivo.

## macOS o Linux

Su macOS, decomprimi l'archivio per il tuo tipo di processore e apri l'eseguibile `MMVCServerSIO` incluso. Se macOS blocca l'avvio, verifica la provenienza del file e leggi il messaggio prima di modificare le impostazioni di sistema. Concedi l'accesso al microfono al browser quando la cattura avviene nel browser o all'app locale quando apre direttamente il microfono.

Per installare dal codice sorgente su Linux, usa l'archivio sorgente del fork e l'ambiente Python 3.10 documentato. Apri un terminale nella cartella `server` del repository. Il programma di installazione è `vc_install.sh`; scegli il backend che corrisponde al tuo sistema quando richiesto. Utilizza lo script di avvio incluso in quella versione e apri l'indirizzo locale stampato sul terminale. I nomi degli script differiscono a seconda della versione. Per identificare i file di avvio inclusi, elenca i file nella cartella `server` prima di eseguirne uno. Se hai scaricato un pacchetto precompilato, decomprimi il pacchetto per la tua architettura e avvia l'eseguibile incluso. L'archivio Windows DirectML è un runtime separato.

## Isola gli errori di avvio

| Sintomo | Primo controllo |
| --- | --- |
| L'estrazione si interrompe su un file mancante | Verifica che siano presenti tutte le parti CUDA della stessa release. Ricomincia l'estrazione da `.001`. |
| Un peso non supera la verifica | Leggi il nome del file nel registro di avvio. Chiudi il processo, rinomina solo il file indicato per tenerne una copia, quindi riavvia per ritentare il download. Mantieni intatta la libreria dei modelli vocali e i file di indice. |
| Il browser mostra un errore di connessione | Controlla se la console del server mostra l'indirizzo locale e segnala che il server è pronto. Avvia un'istanza e mantienila aperta mentre utilizzi la pagina. |
| DirectML si avvia ma la GPU è lenta o mancante | Conferma il nome della GPU selezionata e testa la CPU o un altro dispositivo supportato con lo stesso modello. Il progetto riporta scarse prestazioni su alcune configurazioni Intel integrate. |
| L'apertura del microfono non riesce | Verifica le autorizzazioni di input nel sistema operativo e nel browser, quindi ripeti in un browser basato su Chromium se Firefox ESR non mostra l'elenco dei dispositivi. |

Quando la pagina viene caricata, vai a [Primo modello, microfono e cavo virtuale](live-audio.md).
