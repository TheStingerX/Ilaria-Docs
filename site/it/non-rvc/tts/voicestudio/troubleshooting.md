# VoiceStudio · Risoluzione dei problemi

[VoiceStudio v0.5.8 · Risoluzione dei problemi](https://github.com/debpalash/VoiceStudio/blob/v0.5.8/docs/install/troubleshooting.md)

## Isola la fase in errore

Se l’app non parte, verifica pacchetto, architettura e primo messaggio del backend. Se manca un modello, verifica nome, spazio libero, rete e stato del download. Se il file non entra, prova un WAV breve già riproducibile. Se fallisce solo con un acceleratore, ripeti su CPU e annota motore e backend selezionati.

## Prepara una segnalazione

Annota versione, sistema, GPU, modello e primo errore. Riproduci con una frase o una clip breve. Descrivi il passaggio esatto e cosa ti aspettavi. Rimuovi token, percorsi personali e registrazioni private dai log che condividi. Salva i progetti prima di reinstallare o cambiare versione.

## Controlla in ordine

1. **La finestra non si apre.** Controlla architettura e pacchetto della release. Prova a riaprire l’app e annota il primo errore.
2. **La finestra si apre, il backend no.** Verifica lo stato del backend e ripeti con il percorso CPU supportato.
3. **Il modello non è pronto.** Verifica spazio, rete e presenza dei pesi nella schermata dei modelli.
4. **La generazione parte ma fallisce.** Usa una frase semplice o un WAV breve con un motore e una lingua compatibili.
5. **Il file esportato non va.** Aprilo con un altro lettore. Controlla che non sia vuoto e riprova con un singolo segmento.

## Raccogli le informazioni utili

Salva la versione precisa e il nome del pacchetto, poi scrivi i passaggi per riprodurre l’errore. Indica se la prova è riuscita su CPU, se il problema compare con un solo modello e se una clip più breve cambia il risultato. Usa testo o registrazioni di prova che puoi condividere.

[Installazione](installation.md) · [Modelli e accelerazione](engines.md)
