# Inferenza singola e batch

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · RefineGAN supporta training e inferenza a 32, 40 e 44,1 kHz con RVC v2 e Pitch Guidance. L’app genera in automatico la traccia silenziosa a 44,1 kHz. Se i pesi preaddestrati usano un’architettura diversa, seleziona **None** per addestrare da zero. Tra le coppie provate ci sono KLM 5 (40 kHz) e VCTK (44,1 kHz).

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

[Controlli di inferenza](inference-buttons.md)

## Stabilisci un riferimento

Apri **Single Inference**, scegli una voce e carica una breve clip asciutta. Imposta **Intonazione** e **Rapporto indice** su zero. Utilizza l’embedder previsto dal modello, inizia con RMVPE e lascia disattivati ​​gli effetti opzionali. Salva un WAV e confrontalo con il tuo input al volume corrispondente.

## Ottimizza passaggi separati

Se è disponibile un indice corrispondente, aumenta il recupero in piccoli incrementi. Ascolta per un carattere della voce più chiaro e possibile smorzamento. Abbassa **Proteggi** per dare alle consonanti e ai sospiri maggiore protezione nella conversione guidata dall'intonazione. L'effetto dipende dal recupero, che contribuisce solo sopra lo zero. Confronta le impostazioni del tono separatamente.

## Elabora più file

In **Inferenza batch**, raggruppa le registrazioni per modello e impostazione del tono. Utilizzare una cartella di destinazione separata. Esegui prima una clip rappresentativa, quindi controlla il registro batch e ascolta un risultato da ciascun gruppo.
