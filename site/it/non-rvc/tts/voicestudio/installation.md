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

[Prima sintesi](first-run.md) · [Modelli e accelerazione](engines.md)
