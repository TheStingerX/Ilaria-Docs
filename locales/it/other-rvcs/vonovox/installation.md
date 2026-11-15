---
label: "💿 Installa Vonovox"
order: 99
permalink: /ilaria-rvc/vonovox/installation/
---
# Installa Vonovox

Vonovox è un convertitore vocale live di Windows per le GPU NVIDIA supportate. Utilizza questa guida per effettuare un test pulito del microfono locale prima di aprire Discord, OBS o un gioco.

> **Ultima beta disponibile nel repository di download** · [Scarica Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

## 1. Raccogli i file e i dispositivi

- Apri Windows **Task Manager → Prestazioni** e identifica la scheda grafica per nome. Utilizza l'[elenco ufficiale dei pacchetti](https://huggingface.co/dr87/vonovox/tree/main) per risolvere una build o una patch specifica per l'hardware, se necessario. Conserva le build funzionanti precedenti nelle rispettive cartelle.
- Preparare un checkpoint RVC V2 pronto per l'inferenza e verificare quale incorporamento si aspetta il modello. Un checkpoint di allenamento come `G_*.pth` serve per riprendere l'allenamento. Per la prima esecuzione, scegli un modello con provenienza nota ed eseguilo senza indice se la build lo offre.
- Collega un microfono fisico e cuffie cablate. Chiudi altri programmi che potrebbero assumere il controllo esclusivo dei dispositivi audio e conferma che Windows può registrare il tuo microfono grezzo.

## 2. Avvia l'app

1. Scarica lo ZIP, quindi utilizza **Estrai tutto** e posiziona l'intero pacchetto in una cartella locale scrivibile come `C:\VoiceTools\Vonovox`. Esegui i launcher dalla cartella estratta, con i file di supporto accanto a loro.
2. Nella distribuzione documentata dallo sviluppatore, installa [Microsoft Visual C++ x64 runtime](https://aka.ms/vs/16/release/vc_redist.x64.exe), esegui `setup.bat`, quindi esegui `start.bat`. Utilizza il launcher fornito per l'esatto archivio che hai estratto. Il primo avvio può richiedere più tempo durante l'inizializzazione delle dipendenze.
3. Attendi l'interfaccia. Se la finestra si chiude immediatamente, esegui lo stesso programma di avvio da un prompt dei comandi aperto in modo che l'ultimo errore rimanga visibile. Verifica di aver estratto l'intero archivio e di aver selezionato una build GPU compatibile.
4. Seleziona il modello RVC V2 nell'area modello. Scegli l'incorporatore previsto quando l'interfaccia utente lo espone. Inizia con controlli di tonalità e formanti neutri, dimensioni predefinite dei blocchi ed effetti opzionali disattivati.

## 3. Controllare il primo segnale

Scegli il tuo microfono fisico come **Dispositivo di input** e un monitor per cuffie adatto o l'estremità di riproduzione del cavo virtuale come **Dispositivo di output**. Se l'interfaccia utente espone il backend audio, inizia con WASAPI e la modalità condivisa. Premi **Avvio**, attendi un momento e pronuncia una frase seguita da una pausa. Dovresti sentire la voce convertita, seguita dal silenzio. Premi **Stop** prima di cambiare dispositivo audio o iniziare il test successivo.

Se il modello non viene caricato, verificare RVC V2 e l'embedder prima di modificare le impostazioni audio. Se non si sente alcuna voce, verificare separatamente il microfono e i dispositivi di uscita. Continua con [indirizzamento e sintonizzazione del microfono](live-audio.md) una volta avviato il modello.
