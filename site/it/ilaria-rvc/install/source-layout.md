# File, configurazione e manutenzione della sorgente

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

> **2.4.0** · Il pacchetto Windows sposta l’app e il runtime in app/ e i modelli vocali nella cartella models/ alla radice. Arrivano i notebook Colab e Lightning AI Studio, le indicazioni per scaricare gli embedder opzionali nel training e la coppia Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). Il runtime include pywin32 e corregge pip.

## Sapere di cosa eseguire il backup

 | Posizione | Ruolo |
| --- | --- |
 | Modelli/ | Voci pronte per l'inferenza e relativi indici corrispondenti, comunemente raggruppati in cartelle per voce. |
 | set di dati/ | Registrazioni di allenamento importate. Conserva una copia separata degli originali. |
 | log/ | Configurazione dell'esperimento, audio preparato, funzionalità, indici, checkpoint ripristinabili e anteprime. Eseguire il backup dell'intero esperimento per riprenderlo più tardi. |
 | app/runtime/ | Ambiente Windows Python in bundle. |
 | risorse/ | Codificatore principale e pesi del tono, codificatori opzionali, pre-training della formazione, grafica e altre risorse dell'app. |

Per la conversione è possibile utilizzare un'esportazione di inferenza. Per un esperimento ripristinabile, mantieni la coppia G/D salvata, l'ottimizzatore e lo stato di addestramento insieme alla configurazione, all'elenco dei file e alle funzionalità estratte.

## Lavora dal codice sorgente su Windows

Inizia da un'installazione pulita e corrispondente. Copia il runtime in bundle, ffmpeg e ffprobe nel checkout del sorgente nello stesso layout. Trasferisci i pesi ContentVec e RMVPE installati e le risorse FCPE, se necessario. Per l'addestramento con i pretraining V2 predefiniti, copia le risorse pretrained_v2 installate. Copia .env.example in .env e utilizza il launcher dei log. Durante la diagnosi dell'avvio, controlla i percorsi raggruppati prima di modificare le dipendenze Python a livello globale.

Il progetto mantiene come riferimento i punti di ingresso a monte. La sua app principale è app/ILARIA_RVC.py, con moduli specifici per funzionalità in app/ilaria/ e l'inferenza upstream e il codice di training in app/infer/. Ilaria RVC si basa su RVC WebUI (Mainline - Original RVC), include lavoro adattato da Applio e Redpanda-vc, utilizza TorchFCPE per FCPE ed estende Ilaria Audio Analyser. Consultare la licenza e gli avvisi del repository durante la ridistribuzione della fonte o delle risorse.

## Aggiorna senza perdere il lavoro

Completa i lavori, copia i dati essenziali e utilizza il pannello di aggiornamento per controllare le note di rilascio. Il programma di aggiornamento verifica i download e supporta il backup e il ripristino. Se nella stessa installazione è già in esecuzione un processo, utilizzare l'indirizzo del browser o i registri e attendere il completamento del lavoro attivo. Utilizza **Riavvia Ilaria RVC** per un normale riavvio dell'interfaccia utente.
