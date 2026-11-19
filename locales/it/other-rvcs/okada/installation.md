---
label: "Installa VCClient"
icon: ":package:"
order: 100
permalink: /ilaria-rvc/okada/installation/
---
# Installare w-okada VCClient

[GitHub](https://github.com/w-okada/voice-changer) · [Hugging Face](https://huggingface.co/wok000/vcclient000)

VCClient converte l'audio del microfono in tempo reale. L'interfaccia è il **client** e il processo di conversione è il **server**. Per la prima prova, eseguili entrambi sullo stesso computer. La versione client (v1 o v2) e la versione del modello (RVC V1 o V2) sono due numerazioni distinte. Controlla quali modelli supporta il pacchetto prima di scegliere un file.

## Prima del download

1. Controlla il tuo sistema operativo e l'architettura del processore. Su Windows, apri **Gestione attività → Prestazioni** e leggi il modello della GPU. Su Mac, apri **Informazioni su questo Mac** e cerca un chip Apple o un processore Intel.
2. Collega il microfono e le cuffie. Fai una breve registrazione con il registratore del sistema per controllare il microfono indipendentemente da VCClient.
3. Tieni a portata di mano un modello RVC di inferenza già verificato. Un `.pth` è un modello PyTorch, mentre un `.onnx` utilizza un runtime ONNX. Utilizza il file `.index` opzionale solo con il modello a cui appartiene. Vedi [Modelli e file](../../start/models.md) se hai ricevuto un ZIP o una serie di checkpoint di addestramento.

## Scegli un pacchetto

Apri [i download di VCClient su Hugging Face](https://huggingface.co/wok000/vcclient000/tree/main). Scegli il pacchetto di w-okada adatto al tuo computer seguendo la tabella. Il numero di versione sostituisce la parte variabile del nome del file.

| Il tuo computer | Pacchetto da cercare | Cosa verificare |
| --- | --- | --- |
| Windows con GPU NVIDIA supportata | Windows CUDA v2, `vcclient_win_cuda_….zip` | Seleziona la GPU NVIDIA installata nell'app. Passa alla CPU o alla build standard se il runtime installato non può utilizzare la tua GPU. |
| Windows con AMD o configurazione solo CPU | v2 Windows standard, `vcclient_win_std_….zip` | Prova il dispositivo DirectML se supportato. La conversione su CPU è un'opzione, con velocità determinata dal modello e dal processore. Verifica i backend disponibili prima di importare un modello. |
| Windows con grafica Intel | Una versione standard o legacy compatibile | Nella configurazione documentata di Windows v1, l'accelerazione sulle GPU AMD e Intel è disponibile solo per i modelli ONNX. Seleziona CPU se il tuo pacchetto standard non rileva un provider GPU utilizzabile per il tuo modello. |
| Mac con Apple Silicon | v2 Mac, `vcclient_mac_….zip` | Verifica che il pacchetto sia per Apple Silicon. Fai una prova con il backend e i formati del modello RVC elencati da quella versione. |
| Linux | Distribuzione del codice sorgente e runtime supportato | La configurazione del codice sorgente o del contenitore dedicata è separata dai binari Windows e Mac. Abbina CUDA, runtime AMD supportato o CPU al tuo hardware. |

Per Windows v2, il progetto elenca sia il supporto Torch che ONNX. Un determinato file può comunque utilizzare un provider diverso da un altro file nella stessa build. Conserva il modello originale quando provi un formato diverso. Rinominare l'estensione del nome file non lo converte.

## Avvia su Windows

1. Estrai l'intero ZIP in una normale cartella scrivibile. Utilizza una cartella separata per ogni build che provi. L'esecuzione di un launcher dall'interno dell'archivio può impedirgli di trovare il suo runtime.
2. Apri la cartella estratta ed esegui `start_http.bat` per una configurazione sullo stesso computer. Mantieni la console aperta. Se il pacchetto offre più launcher, scegli quello per il runtime scaricato e la connessione locale.
3. Attendi l'avvio e gli eventuali download degli asset di prima esecuzione. Apri l'indirizzo locale mostrato nella console se l'interfaccia non si apre da sola.
4. Controlla di vedere gli slot del modello e i controlli per avviare la conversione. Lascia la pagina web e la console aperte per il [primo test del microfono](live-audio.md).

## Avvia su Mac

1. Estrai l'archivio per Apple Silicon e lascia intatti i file nella cartella estratta.
2. Apri il launcher locale del bundle (`startHttp.command` dove fornito). Lascia che l'installazione finisca e, se necessario, apri l'indirizzo segnalato dalla console.
3. Quando il sistema chiede se il browser o l'app possono utilizzare il microfono, concedi l'accesso per il test. Se l'autorizzazione è stata negata in precedenza, modificala in **Impostazioni di sistema → Privacy e sicurezza → Microfono** e riapri l'app.
4. Verifica che il server sia in esecuzione prima di aprire una seconda copia. La chiusura del server interrompe la conversione anche quando il browser è ancora aperto.

## Se l'app non si apre

| Cosa vedi | Cosa controllare |
| --- | --- |
| Il launcher si chiude immediatamente | Eseguilo dalla cartella completamente estratta e leggi il primo errore della console. Ricontrolla l'architettura e la compatibilità del runtime. |
| Il download al primo avvio rimane incompleto | Mantieni il processo aperto e controllane l'avanzamento e gli errori di rete. Riprova con lo stesso pacchetto ufficiale una volta ripristinata la connettività. |
| La pagina locale dà un errore di connessione | Controlla che il server sia ancora in esecuzione e usa l'indirizzo che ha stampato. La pagina del browser non può avviare un server locale arrestato. |
| L'hardware NVIDIA è installato, ma la CPU è attiva | Controlla il nome file del backend, il driver installato e la GPU selezionata in VCClient. Prova a parte la conversione su CPU per distinguere un problema del modello da un problema della GPU. |
| Si apre il pannello del modello ma l'elenco dei microfoni è vuoto | Controlla il indicatore del livello in ingresso del sistema operativo e l'autorizzazione del sito del browser. In modalità Client, ricarica dopo aver concesso l'autorizzazione. In modalità Server, aggiorna l'elenco dei dispositivi del server. |

Continua con [Audio live, routing e risoluzione dei problemi](live-audio.md).
