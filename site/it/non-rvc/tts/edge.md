# Microsoft Edge TTS

## Ascolta una pagina nel browser

Apri la pagina in Microsoft Edge e scegli **Leggi ad alta voce** dal menu del browser, dove disponibile. Nelle opzioni della voce puoi scegliere lingua, voce e velocità. Nelle pagine compatibili, la modalità di lettura immersiva facilita sia la lettura sia l’ascolto.

## Salva l’audio di un tuo testo

`edge-tts` è uno strumento della community che usa il servizio vocale online di Microsoft Edge. Ha comandi propri, distinti da quelli del browser e da Azure Speech. Il testo viene inviato al servizio online, quindi usa materiale che puoi condividere.

Installa lo strumento da un ambiente Python, poi elenca le voci disponibili e prova una frase. Controlla che l’identificativo dell’esempio compaia nell’elenco.

~~~bash
python -m pip install edge-tts
edge-tts --list-voices
edge-tts --voice it-IT-ElsaNeural --text "Ciao, questa è una prova." --write-media prova.mp3
~~~

## Prepara una narrazione lunga

Salva il copione in UTF-8 e passa `--file script.txt` al posto di `--text`. Scegli una voce della stessa lingua del testo. Usa la punteggiatura per guidare le pause e scrivi per esteso le abbreviazioni che vengono lette male. Prova prima un paragrafo e, se è troppo veloce, aggiungi `--rate=-10%`. Per ottenere anche i sottotitoli, usa `--write-subtitles` con il nome del file.

## Risolvi i problemi

Se il terminale non trova `edge-tts`, verifica l’ambiente Python in cui lo hai installato. Se una voce manca, aggiorna l’elenco e copia il suo identificativo esatto. Se la richiesta fallisce, verifica la connessione e riprova con una frase breve. Per lavorare offline consulta [Kokoro TTS](kokoro.md).

[Documentazione Microsoft Edge](https://support.microsoft.com/en-us/topic/use-immersive-reader-in-microsoft-edge-78a7a17d-52e1-47ee-b0ac-eff8539015e1) · [Repository di edge-tts](https://github.com/rany2/edge-tts)
