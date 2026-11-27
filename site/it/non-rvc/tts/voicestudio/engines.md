# VoiceStudio · Modelli e accelerazione

[VoiceStudio v0.5.8 · Modelli e accelerazione](https://github.com/debpalash/VoiceStudio/blob/v0.5.8/docs/engines/README.md)

## Capisci cosa scaricare

Un motore esegue un compito: sintesi, trascrizione o un’altra fase del flusso. I pesi sono i file che gli servono. Scarica il motore richiesto dal tuo obiettivo e verifica lingue, spazio, backend e licenza nella relativa scheda prima di scaricare altri pacchetti.

## Verifica il dispositivo

1. Parti dall’impostazione compatibile proposta dall’app.
2. Genera una frase di riferimento e annota il motore.
3. Se provi CUDA, ROCm, Metal o Vulkan, controlla che sia il motore selezionato a supportarlo.
4. Ripeti la stessa frase. Se l’accelerazione fallisce, torna al backend precedente e consulta il primo errore.

[Prima sintesi](first-run.md) · [Risoluzione dei problemi](troubleshooting.md)
