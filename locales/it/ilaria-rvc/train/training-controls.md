---
label: "Controlli e flusso di lavoro dell'addestramento"
icon: ":gear:"
order: 87
permalink: /ilaria-rvc/training-controls/
description: "Ilaria RVC 2.5.0. RefineGAN supporta training e inferenza a 32, 40 e 44,1 kHz con RVC v2 e Pitch Guidance."
---
# Controlli e flusso di lavoro dell'addestramento

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · RefineGAN supporta training e inferenza a 32, 40 e 44,1 kHz con RVC v2 e Pitch Guidance. L’app genera in automatico la traccia silenziosa a 44,1 kHz. Se i pesi preaddestrati usano un’architettura diversa, seleziona **None** per addestrare da zero. Tra le coppie provate ci sono KLM 5 (40 kHz) e VCTK (44,1 kHz).

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

[Controlli di addestramento](training-buttons.md)

> **Novità della 2.3.0** · MRF HiFi-GAN è disponibile per training e inferenza. Il catalogo aggiunge 15 coppie di generatore e discriminatore, tra cui KLM 4.4 X1 e X2 a 40 kHz. Scegli una coppia adatta al vocoder e alla frequenza di campionamento. Portuguese HuBERT Base è un embedder opzionale per l’inferenza. Nel training RVC v2 puoi caricare e salvare un HuBERT personalizzato. L’app lo seleziona e ne riporta la configurazione nel modello esportato.

> **2.4.0** · Il pacchetto Windows sposta l’app e il runtime in app/ e i modelli vocali nella cartella models/ alla radice. Arrivano i notebook Colab e Lightning AI Studio, le indicazioni per scaricare gli embedder opzionali nel training e la coppia Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). Il runtime include pywin32 e corregge pip.

> **2.4.3** · Aggiunge il training nativo in precisione mista **BF16**, selezionato automaticamente sulle GPU RTX serie 30, 40 e 50 quando supportato (su Kaggle T4 il default è FP16). Le scelte manuali FP16/FP32 vengono ricordate, i training esistenti mantengono la loro precisione salvata e Training Queue e PC training advisor usano le nuove opzioni. L'estrazione delle feature resta in FP32.

## Quattro fasi

 | Fase | Input | Controlla prima di continuare |
| --- | --- | --- |
 | Elabora dati | Percorso del set di dati, frequenza, nome dell'esperimento e thread della CPU | Importazione completata, audio utilizzabile letto e i registri appartengono all'esperimento previsto. |
 | Estrazione delle funzionalità | Audio preparato, guida dell'intonazione, estrattore e incorporamento della formazione | Fase completata utilizzando le impostazioni previste. |
 | Train Pth | Caratteristiche, coppia G/D, target, GPU, batch e precisione | Vengono scritti gli avanzamenti di avanzamento e i checkpoint periodici. |
 | Indice delle caratteristiche del treno | Caratteristiche estratte e algoritmo dell'indice | L'indice generato appartiene a questa esecuzione e può essere accoppiato con la sua esportazione di inferenza. |

## Architettura e prestazioni

Controllare la coppia compatibile prima della preelaborazione. La guida del passo controlla se le funzionalità F0 condizionano il modello. Configura i thread della CPU per la macchina e seleziona una GPU NVIDIA supportata per l'addestramento. FP32 è l'impostazione predefinita nell'interfaccia utente selezionata. FP16 può ridurre il carico di memoria sull'hardware supportato. La dimensione del batch controlla quanti campioni vengono elaborati insieme. Se la VRAM si esaurisce, ridurre il batch e disabilitare la memorizzazione nella cache opzionale.

**File di addestramento silenzioso** controlla il numero di esempi silenziosi inclusi nell'app. Confronta le stesse pause trattenute quando valuti un cambiamento.

## Come funziona l'algoritmo dell'indice

Ogni opzione produce un **indice di recupero FAISS**. Il selettore cambia quali vettori di caratteristiche estratti vanno inseriti nell'indice, indipendentemente dall'addestramento del modello vocale. Un vettore di caratteristiche rappresenta un breve fotogramma audio. Le soglie riportate di seguito contano i vettori, non i clip, le epoche o i minuti.

| Opzione | Cosa fa Ilaria RVC | Quando provarlo |
| --- | --- | --- |
| **Auto** | Mantiene tutti i vettori fino a **200.000**. Oltre a ciò tenta di ridurli a **10.000** centri di cluster. Se il clustering fallisce, mantiene i vettori originali. | Iniziamo da qui per un primo indice. Controlla il registro dell'indice dei treni per vedere quale percorso ha preso Auto. |
| **Faiss** | Mantiene tutti i vettori estratti e costruisce l'indice FAIISS senza passaggio di riduzione KMeans. | Provalo quando vuoi preservare esempi che un indice più piccolo potrebbe mediare e avere abbastanza RAM e spazio su disco. |
| **KMean** | Utilizza MiniBatchKMeans per rappresentare vettori simili con centri condivisi. Normalmente mantiene circa un centro ogni dieci vettori, in un intervallo compreso tra **39 e 10.000** centri e sempre inferiore al conteggio degli input. Mantiene tutti i vettori per gli input di **39 o meno** e segnala un errore di clustering anziché eseguire il fallback silenzioso. | Confrontalo quando vuoi un indice più piccolo. Il passaggio di clustering richiede lavoro aggiuntivo e l'indice ridotto può perdere dettagli fini. |

Un indice più piccolo è solitamente più leggero da memorizzare. Non garantisce una compilazione più rapida o una conversione migliore. Il clustering richiede ancora il caricamento delle funzionalità estratte. Se Auto ricorre a un set di dati di grandi dimensioni, la creazione da tutti i vettori può comunque esaurire la memoria.

### Confronta i risultati prima di scegliere

1. Completa **Feature Extraction**, quindi esegui **Train Index**. Controllare il registro per il conteggio del vettore o del centro. Crea una copia dell'indice risultante prima di generarne un secondo con un'altra impostazione.
2. Usa la stessa deduzione `.pth` e una registrazione pulita. Imposta prima il **Rapporto indice** su zero per ascoltare solo il checkpoint. L'indice è facoltativo per la conversione.
3. Confronta i due indici corrispondenti con lo stesso **rapporto indice** diverso da zero, con tono ed effetti mantenuti costanti. Ascolta le consonanti chiare, le vocali sostenute, i suoni insoliti e quanto viene mantenuto il carattere della voce target. Mantieni quello che suona meglio su più clip.
4. Mantieni l'indice scelto con il modello e la configurazione delle funzionalità che lo hanno prodotto. Se modifichi l'algoritmo, ricostruisci l'indice dalle funzionalità compatibili esistenti. Se modifichi l'incorporamento di addestramento, estrai le funzionalità corrispondenti per quell'esperimento invece di riutilizzare il vecchio indice.

## Obiettivi di epoca e passi

Un'epoca copre un'iterazione sul set di dati preparato. La modalità passo mira a un conteggio totale di aggiornamenti batch e supporta la ripresa all'interno di un'epoca. La memorizzazione nella cache del set di dati GPU deve essere disattivata in modalità passo in questa versione. La frequenza di salvataggio viene misurata in epoche anche quando si utilizza un target di passi. Utilizza un target sopra l'avanzamento già completato quando estendi una corsa. Vale la pena testare ulteriori passaggi quando l'audio trattenuto comparabile migliorerà.

## Conservare un registro riproducibile

Registra la revisione del set di dati, la frequenza di campionamento, il codificatore, l'estrattore, il vocoder, i pretraining, la precisione, la dimensione del batch e salva la cadenza. Se riutilizzi lo stesso nome con una tariffa incompatibile, l'interfaccia utente può segnalare la mancata corrispondenza. Avvia un esperimento separato per una nuova configurazione e mantieni il vecchio esperimento disponibile per il confronto.
