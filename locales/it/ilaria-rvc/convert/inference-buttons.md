---
label: "Spiegazione dei controlli di inferenza"
icon: ":control_knobs:"
order: 81
permalink: /ilaria-rvc/inference-buttons/
description: "L'inferenza utilizza una voce addestrata per convertire una registrazione."
---

# Spiegazione di ogni controllo di inferenza

[Scarica Ilaria RVC 2.4.0 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

L'inferenza utilizza una voce addestrata per convertire una registrazione. Per un primo test, carica un breve WAV pulito, seleziona una voce, lascia il tono a zero e mantieni disattivate le funzionalità opzionali. Confrontare l'input e l'output prima di modificare un valore.

> **Novità della 2.3.0** · [RMVPE High Register](advanced-inference.md#rmvpe-high-register)

## Voce, audio e output

| Controllo | Cosa fa |
| --- | --- |
| `Voice Model` | Carica l'esportazione dell'inferenza selezionata. Scegli la voce desiderata dopo l'importazione. Un checkpoint di addestramento G o D serve per la addestramento continua. |
| `Refresh` | Scansiona nuovamente la libreria dei modelli. Successivamente controlla la voce selezionata. |
| `Unload Voice from VRAM` | Rilascia la voce caricata dalla memoria della GPU. Usalo per liberare memoria per un'altra attività. |
| `Audio to convert` | Sceglie la registrazione sorgente. Usa una voce secca piuttosto che un mix con strumenti per un test pulito. |
| `Pitch` | Cambia l'altezza in semitoni, da −24 a +24. Zero preserva il registro sorgente. Dodici semitoni sono un'ottava. |
| `Convert` | Avvia il lavoro. Leggi il registro di output e ascolta l'audio di output. Salva l'output dal lettore quando disponibile. |
| `Audio folder` e `Output` in Batch Inference | Scegli la cartella di input e la destinazione per più file. Testare prima un file rappresentativo e utilizzare una cartella di output separata. |

## Impostazioni Inferenza

| Controllo | Cosa fa e come testarlo |
| --- | --- |
| `Speaker ID` | Sceglie uno slot vocale supportato dal modello. Utilizza l'impostazione predefinita per un normale modello a voce singola. |
| `Pitch Extraction` | Stima l'altezza della sorgente. Inizia con RMVPE e confronta un altro metodo disponibile solo se le note saltano o il contorno sembra instabile. |
| `Path of index` e `Auto-detect index path` | Seleziona un indice opzionale corrispondente per percorso o dall'elenco rilevato. Verificare che appartenga a questo modello e codificatore. |
| `Index Ratio` | Combina le funzionalità recuperate nella conversione. Zero disattiva il recupero. Aumenta gradualmente con un indice corrispondente e confronta la stessa frase. |
| `Resampling, 0=none` | Modifica la velocità dell'audio in uscita. Zero mantiene la velocità di output del modello. Il ricampionamento non può ripristinare i dettagli mancanti. |
| `Input source volume / Normalized Output` | Unisce gli inviluppi di sonorità sorgente e convertiti. Vicino allo zero segue più da vicino la dinamica della sorgente. Un'impostazione pari a uno lascia la busta convertita al suo posto. |
| `Protect clear consonants and breathing sounds` | Riduce l'impatto del recupero sui suoni senza voce nella conversione guidata dall'intonazione. Valori più bassi rafforzano la protezione; 0,5 lo spegne. Il suo effetto può essere limitato con il recupero disabilitato. |
| `Median filter` | Uniforma la stima del passo di raccolta quando la soglia visualizzata è abilitata. Inizia con l'impostazione predefinita e testala solo durante la risoluzione dei problemi di Harvest. |
| `Export Format` | WAV e FLAC sono senza perdite. MP3, OGG e M4A possono risparmiare spazio per la consegna. Usa WAV per il tuo primo confronto. |
| `F0 curve file` | Input avanzato per una curva del passo personalizzata nelle build che la espongono. Lascia vuoto per la conversione quotidiana. |

## Impostazioni di elaborazione e incorporamento audio

- **Dividi audio** elabora sezioni separate da passaggi silenziosi. Provalo per input lunghi e ascolta attraverso i join.
- **Autotune** sposta le note sonore verso le note cromatiche vicine. **Intensità della sintonizzazione automatica** controlla la forza con cui lo fa. Inizia con esso spento.
- **Intonazione proposta** utilizza l'intonazione mediana e l'**Intonazione target (Hz)** per stimare uno spostamento. Provalo su un breve clip rappresentativo.
- **Clean Audio** applica la riduzione del rumore dopo la conversione. **Clean Strength** ne controlla l'intensità. Confrontare con l'output non elaborato per respiri o sibilanti danneggiati.
- **Formant Shifting** modifica la risonanza prima della conversione. Un **rapporto formante** pari a 1 mantiene la prova di riferimento. Ascolta le stesse vocali durante il test.
- **Post-Processo** esegue gli **Effetti** selezionati sull'audio convertito. **Post Pitch Shift** regola il tono di uscita, **Gain** cambia il livello e **Limiter Threshold** controlla il punto in cui inizia ad agire il limitatore. Usa un effetto alla volta quando diagnostichi un problema.
- **Modello Embedder** seleziona il codificatore del contenuto. Auto utilizza le informazioni sul modello ove disponibili. **Embedder personalizzato** accetta i pesi .bin corrispondenti e la configurazione .json. Assegna un nome alla cartella, fai clic su **Installa embedder personalizzato**, controlla lo stato di importazione dell'embedder e utilizza **Aggiorna embedder** se necessario. Seleziona l'encoder con cui è stata addestrata la voce prima di testarne l'indice.

Se la tua versione espone **TTS**, prova prima con una breve frase. Scegli Edge per una voce online o una voce Windows disponibile per la sintesi offline, seleziona la lingua e la voce e visualizza l'anteprima del risultato. Regola la velocità, il volume o il tono della sorgente solo dove supportato. Se la pronuncia è sbagliata prima della conversione, correggi prima il discorso di origine. Vedi [Sintesi vocale](speech.md).


> **2.2.1** · Il player con forma d’onda ora ha un cursore del volume per gli audio in ingresso, i risultati e le anteprime. Usalo per ascoltare a volume più basso o confrontare clip a livelli simili. Il cursore regola solo l’ascolto. Per cambiare il livello del file convertito, regola Gain in Post-Process e ripeti la conversione.
