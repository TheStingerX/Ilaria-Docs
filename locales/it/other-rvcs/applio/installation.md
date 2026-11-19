---
label: "Installa Applio"
icon: ":cd:"
order: 97
permalink: /ilaria-rvc/applio/installation/
---
# Installa Applio e controlla il motore

[GitHub](https://github.com/IAHispano/Applio) · [Hugging Face](https://huggingface.co/IAHispano/Applio)

Applio ha due interfacce. **Desktop** apre una finestra dell'applicazione installata e gestisce un ambiente del motore al primo avvio. **Gradio** apre una pagina Web locale e necessita del processo di avvio per rimanere in esecuzione. Questi passaggi riguardano Desktop e il pacchetto Windows Gradio compilato. Scegli l'interfaccia mostrata nelle istruzioni che desideri seguire.

## Desktop

1. Apri i [download ufficiali del desktop](https://github.com/IAHispano/Applio-App/releases/latest). Trova **Assets** ed espandi l'elenco se il programma di installazione che ti serve è nascosto. Scegli il file per il tuo sistema operativo. Gli archivi del codice sorgente sono per gli sviluppatori.
2. Su Windows, esegui il file eseguibile di installazione e scegli una cartella in cui il tuo account può scrivere. L'app in pacchetto utilizza una directory `data` accanto al suo eseguibile. Su macOS, utilizza l'immagine disco per il tuo processore, ARM64 per Apple Silicon o x64 per Intel. Su Linux, installa il pacchetto Debian disponibile o rendi eseguibile AppImage e aprilo.
3. Avvia l'app e rivedi i termini di prima esecuzione. Mantieni l'app aperta mentre configura Python, installa i requisiti del motore, recupera le risorse e verifica l'installazione. Utilizza **Install / Repair** se la tua build lo offre quando un controllo fallisce.
4. Al termine della verifica, controlla il dispositivo di elaborazione rilevato nella configurazione. Registra il backend e l'hardware riportati dall'app. Una macchina con più di una GPU può segnalare un dispositivo diverso da quello previsto.
5. Apri **Models**. Se si apre e il motore è pronto, passa all'[installazione di un modello vocale](models.md). Esegui la [breve conversione](inference.md) prima di provare la modalità live o l'addestramento.

Puoi installare un pacchetto Desktop ufficiale senza Node.js o pnpm. Questi strumenti servono per creare l'app dal sorgente.

## Gradio su Windows

1. Scarica un pacchetto Windows da [download di Gradio per Windows](https://huggingface.co/IAHispano/Applio/tree/main/Compiled/Windows).
2. Estrai lo ZIP completo in un percorso semplice in cui puoi scrivere, ad esempio `C:\Applio-Gradio`. Apri quella cartella in Esplora file. Se vedi una seconda cartella contenente il launcher, aprila.
3. Esegui `run-applio.bat` dalla cartella estratta. Se si apre una console, lasciala in esecuzione. Attendi che compaia l'indirizzo locale nella console. Apri quell'indirizzo nel browser.
4. Trova **Models** o **Download**, a seconda della versione. Quindi apri **Convert Audio** o **Inference**. Se il browser perde la connessione, controlla se il launcher è ancora in esecuzione prima di riaprire la pagina.

## Se l'installazione si interrompe

| Cosa vedi | Prima cosa da controllare |
| --- | --- |
| Non si apre nulla dallo ZIP | Estrai tutti i file prima di eseguire il launcher. |
| Il passaggio di download o verifica non riesce | Leggi il primo errore nel registro di installazione. Controlla la connettività, lo spazio su disco disponibile e l'accesso in scrittura prima di riprovare il passaggio non riuscito. |
| Gradio si ferma prima di visualizzare un indirizzo | Cerca il primo errore utile nelle righe precedenti della console. Il browser non può connettersi finché non viene avviato il servizio. |
| I file audio non si aprono o esportano | Controlla la verifica del motore e lo stato di FFmpeg. Prova con un WAV locale che puoi riprodurre in un'altra applicazione. |
| La conversione del file si avvia ma la memoria è esaurita | Chiudi le altre attività che usano la GPU e prova alcuni secondi di audio con gli effetti disattivati. Prova un dispositivo supportato dalla tua build. |

Prima di installare una nuova versione o spostare cartelle, salva l'audio di lavoro ed esegui il backup di modelli personalizzati, indici, set di dati ed esperimenti di addestramento completi. Dopo l'aggiornamento, utilizza la stessa breve registrazione e voce per confermare che il nuovo motore produce un risultato utilizzabile.
