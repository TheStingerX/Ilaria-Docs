---
label: "🎛️ Elaborazione ed esportazione"
order: 89
permalink: /ilaria-rvc/advanced-inference/
---
# Elaborazione ed esportazione

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

RMVPE è lo stimatore del tono di base. FCPE, Swift, Beatrice e Parselmouth sono disponibili laddove l'operazione selezionata li supporta. Confronta i metodi di presentazione su un test A/B ristretto. Il metodo pitch stima F0, mentre [embedder](embedders.md) estrae le caratteristiche che devono adattarsi al modello.

## Esporta e confronta

Seleziona WAV o FLAC per la modifica e l'archiviazione delle copie. MP3, OGG e M4A sono opzioni di distribuzione più piccole. Il lettore di output scarica il formato selezionato. Batch scrive anche i file nella directory di output scelta. Controlla il primo output e il suo nome prima di elaborare molti input.

Il lettore di forme d'onda supporta la riproduzione e la ricerca, inclusi i salti con i tasti freccia quando è attivo. Input molto lunghi, grandi o non supportati potrebbero utilizzare il player standard del browser. Per un utile confronto A/B, abbina i volumi e ascolta timestamp identici.
