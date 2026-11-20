# Configura Redpanda-vc

[GitHub](https://github.com/redpanda343/Redpanda-vc)

Redpanda-vc estende Applio e offre più famiglie di modelli vocali. In questa procedura dettagliata viene utilizzata la famiglia **RVC**. Scegli un'installazione e mantieni le sue dipendenze separate dagli altri programmi RVC.

## 1. Scegli un percorso di lancio

1. Scarica il sorgente o un pacchetto compatibile dal [progetto Redpanda-vc](https://github.com/redpanda343/Redpanda-vc). Per una configurazione di origine, estraila in una cartella scrivibile locale e controlla che siano presenti il ​​file delle dipendenze e il programma di avvio del progetto. Installa le dipendenze richieste dal tuo checkout in un ambiente Python dedicato. Le installazioni CUDA richiedono una build PyTorch che supporti la GPU NVIDIA e il driver in uso.
2. Su Windows, inizia con `run-install.bat` e lascia che finisca di preparare l'ambiente di progetto in bundle. Quindi utilizzare `run-applio.bat` per la WebUI del browser o `run-realtime-gui.bat` per la finestra in tempo reale autonoma. Entrambi i lanciatori si aspettano l'ambiente creato nella cartella del progetto. Apri un terminale nella cartella del progetto quando devi leggere i log di avvio. Mantenerlo in funzione durante l'uso.
3. Attendi l'interfaccia utente o apri l'indirizzo di loopback stampato dal processo. Se il programma di avvio termina senza aprire una pagina, controlla l'output del terminale per un errore di importazione, un errore di inizializzazione CUDA o un conflitto di porte. Riparare il problema indicato in questa installazione prima di riaprirla.
4. Confermare il dispositivo di esecuzione corretto. Testa un lavoro alla volta con l'interfaccia locale prima di aggiungere flussi del browser o altri lavori che richiedono un utilizzo intensivo della GPU.

## 2. Scegli il motore e il modello

Nella visualizzazione di conversione pertinente, seleziona il flusso di lavoro **RVC**, scegli un checkpoint di inferenza compatibile e abbinalo all'indice corrispondente solo quando lo hai. L'app espone anche Beatrice e Rectified Flow nelle viste supportate. Ciascuno utilizza il proprio formato modello. Un modello che appartiene ad un'altra famiglia necessita di un proprio motore.

Se la tua build prevede una conversione offline, inizia con un WAV secco, breve e senza trasposizione. Salva un nuovo output e controlla le stesse parole in entrambi i file. Se hai principalmente bisogno della conversione del microfono, passa direttamente al [test in tempo reale](live-audio.md) con un modello compatibile noto.

## 3. Diagnosticare l'avvio prima di modificare le impostazioni audio

- **Errore di importazione**: conferma che l'interprete che esegue il launcher è quello nell'ambiente del tuo progetto e ha le dipendenze della build.
- **Modello mancante**: ricontrolla la cartella prevista dalla tua build, dal motore corrente e se il file è un'esportazione di inferenza.
- **Errore CUDA**: conferma il dispositivo RVC scelto e prova con altri lavori GPU chiusi. Registra il primo errore invece di interpretare il messaggio di arresto finale.
- **Compatibilità non chiara**: prendi nota della versione del pacchetto o del checkout, della GPU e della famiglia di modelli prevista. Testa una prova di riferimento prima di provare vocoder o funzionalità personalizzate.
