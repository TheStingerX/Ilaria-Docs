# Convertitore ONNX ↔ PTH

In **Altro → Converti i pesi dei modelli**, scegli un modello installato o indica un file. Puoi esportare un modello RVC HiFi-GAN con guida del pitch in ONNX per usarlo in un client esterno compatibile. Il ripristino esatto a `.pth` è disponibile per i file ONNX esportati da Ilaria RVC. Conserva il `.pth` originale se usi un altro programma per esportare. [Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)

[ZIP di aggiornamento Windows](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.5.1/ILARIA_RVC-update-2.5.1.zip?download=true)

## Cosa contiene ogni file

Il `.pth` è il checkpoint di inferenza che usi in Ilaria RVC. L’`.onnx` contiene un grafo e i pesi per un client ONNX compatibile. La conversione cambia il formato. Il client deve comunque gestire gli ingressi, la versione RVC e l’embedder del modello. Conserva l’eventuale `.index` a parte e usalo solo se il client supporta il recupero delle feature.

## Prima di esportare

Usa **Ilaria RVC 2.5.1 o successivo** e **PyTorch 2.6 o successivo**. Per esportare, scegli un modello **HiFi-GAN** pronto per l’inferenza, con **guida del pitch** attiva e un `.pth` di massimo **512 MiB**. Se hai solo checkpoint di training, esporta prima la voce dall’esperimento. L’esportazione usa la CPU. Il dispositivo che esegue il modello ONNX dipende dal client che lo carica.

## Esporta un modello in ONNX

Scegli un modello di inferenza installato oppure indica il file `.pth` esportato. Seleziona la conversione in ONNX e salva il risultato. Caricalo nel client esterno e provalo con una registrazione breve.

Imposta esplicitamente **ONNX** come formato di uscita. Con un file `.pth`, **Auto** seleziona Safetensors. Avvia la conversione dei pesi, attendi che il log segnali il completamento e scarica il risultato. Conserva il checkpoint originale e dai un nome distinto al file ONNX.

## Come funziona il ripristino esatto

Ilaria RVC incorpora nell’ONNX i byte del `.pth` originale. Quando ripristini il modello, il convertitore estrae quei byte e verifica la presenza della configurazione RVC e dei pesi. Ottimizzare o riesportare l’ONNX con un altro programma può rimuovere il checkpoint incorporato. Tieni una copia dell’esportazione originale se vuoi ripristinarla in futuro.

## Ripristina il PTH originale

Indica il file `.onnx` esportato da Ilaria RVC e seleziona la conversione in `.pth`. Salva il modello ripristinato e provalo in **Inferenza**.

Con un file ONNX puoi usare **Auto** oppure scegliere esplicitamente **PTH**. Avvia la conversione, scarica il risultato e importalo come voce di inferenza. Se hai ancora l’originale, confronta gli hash SHA-256 dei due file. Se coincidono, i file sono identici byte per byte.

## Come verificare il risultato

Per l’ONNX, carica il modello nel client di destinazione e converti un breve audio pulito. Per il PTH ripristinato, usa lo stesso audio in Ilaria RVC con le impostazioni originali di pitch ed embedder. Se usi un indice, provalo a parte. Impostazioni e pre-elaborazione del client possono cambiare il suono della conversione ONNX.

## Risoluzione dei problemi

Se l’esportazione fallisce, controlla vocoder, guida del pitch, dimensione del file e versione di PyTorch. Se il log dice che nell’ONNX manca il checkpoint originale, riprova con una copia intatta esportata da questo convertitore oppure recupera il PTH dal backup. Se l’esportazione riesce ma il client rifiuta il file, controlla quali formati ONNX per RVC accetta.

[Safetensors ↔ PTH](safetensors-converter.md)
