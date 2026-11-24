# Elaborazione ed esportazione

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · RefineGAN supporta training e inferenza a 32, 40 e 44,1 kHz con RVC v2 e Pitch Guidance. L’app genera in automatico la traccia silenziosa a 44,1 kHz. Se i pesi preaddestrati usano un’architettura diversa, seleziona **None** per addestrare da zero. Tra le coppie provate ci sono KLM 5 (40 kHz) e VCTK (44,1 kHz).

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

> **Novità della 2.3.0** · [RMVPE High Register](#rmvpe-high-register)

## RMVPE High Register

Apri **Inference Settings**, seleziona `rmvpe`, espandi **RMVPE High Register** e attiva **Enable high register**. Provalo se una nota molto acuta viene rilevata un’ottava sotto o scompare dalla curva.

**Mode** parte da `true_pitch`, che usa l’intonazione corretta. `fold` mantiene le note corrette un’ottava più in basso. **Maximum F0** (1250 Hz) imposta il limite massimo. In **Advanced**, **Activation threshold** (1040 Hz) indica da dove può iniziare la correzione, **Sensitivity** parte da **Balanced** e **Minimum note duration** (60 ms) richiede che la nota duri abbastanza.

Carica una clip breve con il problema e premi **Preview original and corrected F0**. Il grafico confronta l’intonazione nei primi 30 secondi. Poi converti la stessa clip con l’opzione spenta e accesa, lasciando uguali tutte le altre impostazioni, e riascolta la nota.

## Stabilisci una preimpostazione

Apri **Impostazioni inferenza** per Singolo o Batch. Scegli il modello e seleziona **ID altoparlante** per un checkpoint con più altoparlanti. Zero è lo slot abituale per una singola voce. Lasciare l'intonazione a zero, il recupero a zero e l'elaborazione per un primo riferimento. Un indice caricato non ha alcun effetto di recupero a zero. Attiva un'opzione alla volta e riproduci la stessa frase sorgente.

 | Controllo | Dove agisce | Cosa ascoltare |
| --- | --- | --- |
 | Dividi audio | Trova luoghi tranquilli per dividere una registrazione preservando il tempo. | Controlla le giunzioni, le desinenze delle parole, i respiri e gli spazi vuoti. |
 | Autotune | Sposta il Fa0 sonoro verso le note cromatiche vicine. Utilizza la guida del tono. | Confronta note esposte e vibrato. |
 | Presentazione proposta | Utilizza una frequenza target e l'altezza mediana della voce sorgente per stimare uno spostamento limitato. | Testa i limiti alti e bassi della prestazione prima di una corsa completa. |
 | Formant Shifting | Cambia la risonanza vocale prima della conversione. Un rapporto pari a 1 mantiene la prova di riferimento. | Confronta le vocali alla stessa altezza e livello di ascolto. |
 | Audio pulito | Applica la riduzione del rumore dopo la conversione. | Ascolta le code acquose o le consonanti perse. |
 | Post-elaborazione | Applica gli effetti selezionati all'output convertito. Guadagno, Pitch Shift e Limiter espongono i controlli. | Confronta il livello abbinato con gli effetti disattivati. Conserva un'esportazione asciutta per modifiche successive. |

La sezione di inferenza **Post-processo** applica effetti all'audio convertito. I **Dati di processo** della formazione hanno la propria regolazione del livello per sezione.

## Estrazione del tono e dei contenuti

RMVPE è lo stimatore del tono di base. FCPE, Swift, Beatrice e Parselmouth sono disponibili laddove l'operazione selezionata li supporta. Confronta i metodi di presentazione su un test A/B ristretto. Il metodo pitch stima F0, mentre [embedder](../train/embedders.md) estrae le caratteristiche che devono adattarsi al modello.

## Esporta e confronta

Seleziona WAV o FLAC per la modifica e l'archiviazione delle copie. MP3, OGG e M4A sono opzioni di distribuzione più piccole. Il lettore di output scarica il formato selezionato. Batch scrive anche i file nella directory di output scelta. Controlla il primo output e il suo nome prima di elaborare molti input.

Il lettore di forme d'onda supporta la riproduzione e la ricerca, inclusi i salti con i tasti freccia quando è attivo. Input molto lunghi, grandi o non supportati potrebbero utilizzare il player standard del browser. Per un utile confronto A/B, abbina i volumi e ascolta timestamp identici.

> **2.2.1** · Il player con forma d’onda ora ha un cursore del volume per gli audio in ingresso, i risultati e le anteprime. Usalo per ascoltare a volume più basso o confrontare clip a livelli simili. Il cursore regola solo l’ascolto. Per cambiare il livello del file convertito, regola Gain in Post-Process e ripeti la conversione.
