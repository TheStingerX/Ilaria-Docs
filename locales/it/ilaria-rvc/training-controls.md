---
label: "⚙️ Controlli e flusso di lavoro dell'addestramento"
order: 87
permalink: /ilaria-rvc/training-controls/
---
# Controlli e flusso di lavoro dell'addestramento

## Quattro fasi

 | Fase | Input | Controlla prima di continuare |
| --- | --- | --- |
 | Elabora dati | Percorso del set di dati, frequenza, nome dell'esperimento e thread della CPU | Importazione completata, audio utilizzabile letto e i registri appartengono all'esperimento previsto. |
 | Estrazione delle funzionalità | Audio preparato, guida dell'intonazione, estrattore e incorporamento della formazione | Fase completata utilizzando le impostazioni previste. |
 | Train Pth | Caratteristiche, coppia G/D, target, GPU, batch e precisione | Vengono scritti gli avanzamenti di avanzamento e i checkpoint periodici. |
 | Indice delle caratteristiche del treno | Caratteristiche estratte e algoritmo dell'indice | L'indice generato appartiene a questa esecuzione e può essere accoppiato con la sua esportazione di inferenza. |

## Architettura e prestazioni

La versione 2.1.0 offre impostazioni a 32, 40 e 48 kHz con combinazioni disponibili determinate dal vocoder. HiFi-GAN e RefineGAN hanno vincoli diversi. Controllare la coppia compatibile prima della preelaborazione. La guida del passo controlla se le funzionalità F0 condizionano il modello. Configura i thread della CPU per la macchina e seleziona una GPU NVIDIA supportata per l'addestramento. FP32 è l'impostazione predefinita nell'interfaccia utente selezionata. FP16 può ridurre il carico di memoria sull'hardware supportato. La dimensione del batch controlla quanti campioni vengono elaborati insieme. Se la VRAM si esaurisce, ridurre il batch e disabilitare la memorizzazione nella cache opzionale.

**File di addestramento silenzioso** controlla il numero di esempi silenziosi inclusi nell'app. Confronta le stesse pause trattenute quando valuti un cambiamento. **Algoritmo dell'indice** offre Auto, Faiss e KMeans. Conserva l'indice generato con il relativo modello di corrispondenza e mantieni disattivato il recupero durante la valutazione del solo checkpoint.

## Obiettivi di epoca e passi

Un'epoca copre un'iterazione sul set di dati preparato. La modalità passo mira a un conteggio totale di aggiornamenti batch e supporta la ripresa all'interno di un'epoca. La memorizzazione nella cache del set di dati GPU deve essere disattivata in modalità passo in questa versione. La frequenza di salvataggio viene misurata in epoche anche quando si utilizza un target di passi. Utilizza un target sopra l'avanzamento già completato quando estendi una corsa. Vale la pena testare ulteriori passaggi quando l'audio trattenuto comparabile migliorerà.

## Conservare un registro riproducibile

Registra la revisione del set di dati, la frequenza di campionamento, il codificatore, l'estrattore, il vocoder, i pretraining, la precisione, la dimensione del batch e salva la cadenza. Se riutilizzi lo stesso nome con una tariffa incompatibile, l'interfaccia utente può segnalare la mancata corrispondenza. Avvia un esperimento separato per una nuova configurazione e mantieni il vecchio esperimento disponibile per il confronto.
