# VoiceStudio · Installazione

[VoiceStudio v0.5.8](https://github.com/debpalash/VoiceStudio/releases/tag/v0.5.8) · [GitHub](https://github.com/debpalash/VoiceStudio)

## Scegli il pacchetto

Questa guida si riferisce a VoiceStudio 0.5.8. Apri la release e scegli un solo installer in base al sistema e all’architettura. Su Windows 10/11 x64 usa l’EXE x64. Windows ARM è sperimentale e il backend x64 può funzionare in emulazione su CPU. Su Mac Apple Silicon apri il DMG arm64 e trascina l’app in Applicazioni. Per Mac Intel considera il percorso con backend remoto. Su Linux x64 usa il DEB se la distribuzione lo supporta oppure AppImage.

## Primo avvio

1. Installa e apri il programma.
2. Lascia che completi la preparazione del backend.
3. Apri il gestore dei modelli e scarica soltanto l’engine necessario per la prima prova. Verifica spazio libero e connessione.
4. Genera una frase breve prima di scaricare altri modelli. Se l’interfaccia si apre ma non completa la sintesi, controlla anche lo stato del backend e del modello.

## Accelerazione e limiti

CPU è una base utile per verificare il funzionamento. CUDA riguarda NVIDIA. ROCm è un percorso AMD da verificare per la combinazione di scheda, sistema e motore. Alcuni engine GGUF offrono Vulkan e Apple Silicon ha percorsi Metal. Un acceleratore disponibile per la sintesi può essere diverso da quello disponibile per la trascrizione.

## Windows: installazione passo per passo

1. Apri **Impostazioni → Sistema → Informazioni** e leggi **Tipo sistema**. Un processore x64 e uno ARM64 richiedono pacchetti diversi.
2. Tra gli asset della release scegli l’installer Windows per l’architettura che hai letto. Scarica anche `SHA256SUMS.txt` se vuoi confrontare l’hash del file.
3. Esegui l’installer e completa la procedura. Se scegli un altro disco, controlla a parte dove il programma salva modelli e ambiente del motore. La cartella dell’app e la cache dei pesi possono essere distinte.
4. Apri VoiceStudio e aspetta che il backend risulti disponibile. Installa un solo modello per il primo test. Ripeti la prova dopo aver chiuso e riaperto l’app.

## macOS e Linux: verifica l'installazione

Su Mac controlla **Informazioni su questo Mac**. Con Apple Silicon scegli `arm64`, apri il DMG e sposta l’app in **Applicazioni** prima di lanciarla. Se macOS blocca l’avvio, verifica provenienza e firma della release prima di procedere. Su Linux scarica il DEB o l’AppImage per x64. Per il DEB, installa dalla cartella del file con `sudo apt install ./nome-del-pacchetto.deb`. Per AppImage, rendi eseguibile il file, poi avvialo. Sostituisci i nomi d’esempio con quelli scaricati.

## Se il primo avvio si ferma

Verifica nell’ordine che si apra la finestra, che il backend risponda e che il modello risulti scaricato. Sono tre verifiche diverse. Se manca il modello, controlla spazio libero e connessione prima di riprovare. Se il backend fallisce solo con un acceleratore, seleziona un motore CPU compatibile e prova una frase breve. Conserva il primo errore se anche questa prova fallisce.

[Prima sintesi](first-run.md) · [Modelli e accelerazione](engines.md)
