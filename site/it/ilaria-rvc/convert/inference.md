# Inferenza singola e batch

[Scarica Ilaria RVC 2.4.0 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

[Controlli di inferenza](inference-buttons.md)

## Stabilisci un riferimento

Apri **Single Inference**, scegli una voce e carica una breve clip asciutta. Imposta **Intonazione** e **Rapporto indice** su zero. Utilizza l’embedder previsto dal modello, inizia con RMVPE e lascia disattivati ​​gli effetti opzionali. Salva un WAV e confrontalo con il tuo input al volume corrispondente.

## Ottimizza passaggi separati

Se è disponibile un indice corrispondente, aumenta il recupero in piccoli incrementi. Ascolta per un carattere della voce più chiaro e possibile smorzamento. Abbassa **Proteggi** per dare alle consonanti e ai sospiri maggiore protezione nella conversione guidata dall'intonazione. L'effetto dipende dal recupero, che contribuisce solo sopra lo zero. Confronta le impostazioni del tono separatamente.

## Elabora più file

In **Inferenza batch**, raggruppa le registrazioni per modello e impostazione del tono. Utilizzare una cartella di destinazione separata. Esegui prima una clip rappresentativa, quindi controlla il registro batch e ascolta un risultato da ciascun gruppo.
