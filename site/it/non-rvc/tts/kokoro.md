# Kokoro TTS

## Installa lo strumento da terminale

Questa guida usa il programma autonomo di nazdridoy. Genera parlato da testo con voci preimpostate. Installalo in un ambiente Python separato oppure usa `uv tool install kokoro-tts`.

~~~bash
python -m pip install kokoro-tts
kokoro-tts --help
~~~

Scarica [kokoro-v1.0.onnx](https://github.com/nazdridoy/kokoro-tts/releases/download/v1.0.0/kokoro-v1.0.onnx) e [voices-v1.0.bin](https://github.com/nazdridoy/kokoro-tts/releases/download/v1.0.0/voices-v1.0.bin). Mettili nella stessa cartella di lavoro con un file `input.txt` in UTF-8 e apri lì il terminale. Una volta completata la configurazione, la sintesi avviene in locale. Se il programma non trova i file del modello, controlla per prima cosa la cartella da cui lanci il comando e i nomi dei due file.

## Genera il primo WAV

~~~bash
kokoro-tts --help-languages
kokoro-tts --help-voices
kokoro-tts input.txt output.wav --lang en-us --voice af_sarah --speed 1.0
~~~

L’esempio è per un testo in inglese. Per l’italiano, scegli lingua e voce dagli elenchi della tua versione. Ascolta nomi, numeri e abbreviazioni. Se la lettura è strana, correggi prima il testo o la lingua e solo dopo regola la velocità.

## Libri, documenti lunghi e combinazioni di voci

Per un audiolibro, inizia da un capitolo breve. Il programma legge anche EPUB e PDF, ma un PDF a colonne può avere un ordine di lettura sbagliato e una scansione può essere priva di testo estraibile. Controlla il contenuto o preparalo come TXT. Con `--split-output ./chunks/` puoi salvare l’audio in più file. Un esempio di combinazione è `--voice "af_sarah:60,am_adam:40"`. Usa la stessa frase per confrontare il risultato con le due voci singole.

## Se qualcosa non funziona

Se manca il comando, controlla l’ambiente in cui hai installato il pacchetto. Se mancano le voci o il modello, controlla cartella e nomi dei file. Se la pronuncia è sbagliata, verifica lingua e punteggiatura. Se non senti nulla, esporta un WAV e aprilo con un lettore per capire se il problema riguarda la sintesi o il dispositivo audio.

[Repository del programma](https://github.com/nazdridoy/kokoro-tts)
