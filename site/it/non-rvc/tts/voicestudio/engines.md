# VoiceStudio · Modelli e accelerazione

[VoiceStudio v0.5.8 · Modelli e accelerazione](https://github.com/debpalash/VoiceStudio/blob/v0.5.8/docs/engines/README.md)

## Capisci cosa scaricare

Un motore esegue un compito: sintesi, trascrizione o un’altra fase del flusso. I pesi sono i file che gli servono. Scarica il motore richiesto dal tuo obiettivo e verifica lingue, spazio, backend e licenza nella relativa scheda prima di scaricare altri pacchetti.

## Verifica il dispositivo

1. Parti dall’impostazione compatibile proposta dall’app.
2. Genera una frase di riferimento e annota il motore.
3. Se provi CUDA, ROCm, Metal o Vulkan, controlla che sia il motore selezionato a supportarlo.
4. Ripeti la stessa frase. Se l’accelerazione fallisce, torna al backend precedente e consulta il primo errore.

## Scegli dal risultato che vuoi

1. Per leggere un testo ti serve un motore TTS. Per ricavare testo da un audio ti serve invece un motore ASR.
2. Se vuoi usare una registrazione come riferimento o progettare una voce, verifica che il motore abbia quella modalità.
3. Prima del download controlla le lingue della modalità scelta. Una lingua disponibile per la trascrizione può mancare nella sintesi.
4. Leggi requisiti, spazio e licenza nella scheda del modello. Scarica il pacchetto e attendi che risulti pronto.

## Confronto CPU e GPU

Genera la stessa frase con motore, voce e impostazioni uguali. Cambia solo il backend, se disponibile. Esegui una prova di riscaldamento prima di confrontare i tempi. Se il backend GPU fallisce, controlla prima che funzioni su CPU. Verifica compatibilità del motore e del driver anziché scaricare tutti i pacchetti disponibili.

[Prima sintesi](first-run.md) · [Risoluzione dei problemi](troubleshooting.md)
