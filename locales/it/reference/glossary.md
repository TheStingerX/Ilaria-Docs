---
label: "📖 Glossario"
order: 94
permalink: /glossary/
description: "Vedi Fondamenti di RVC, Modelli e file e Formazione per questi termini nel contesto."
---
# Glossario

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

 | Termine | Significato |
| --- | --- |
 | Inferenza | Utilizzo di un modello addestrato per convertire una registrazione. |
 | Checkpoint | File contenente i pesi del modello appresi. I checkpoint di ripresa e le esportazioni di inferenze hanno ruoli diversi. |
 | Embedder | Componente che estrae una rappresentazione dell'audio sorgente per il motore di conversione. |
 | Indice | Raccolta opzionale di vettori di caratteristiche apprese utilizzate durante il recupero. |
 | Rapporto dell'indice | Con quale intensità un'implementazione utilizza le funzionalità recuperate durante la conversione. |
 | F0 | Frequenza fondamentale, utilizzata per rappresentare l'altezza nel tempo. |
 | Estrattore del tono | Algoritmo che stima F0 da una registrazione. |
 | Semitono | Un dodicesimo di ottava. Un cambiamento di 12 semitoni è un'ottava. |
 | Vocoder | La parte della pipeline che genera la forma d'onda dai suoi ingressi di condizionamento. |
 | Frequenza di campionamento | Il numero di campioni audio al secondo. È distinto dalla versione del modello e dalla trasposizione del tono. |
 | Preallenamento | Pesi iniziali utilizzati durante l'addestramento di un nuovo modello. |
 | Epoca | Un passaggio attraverso il set di dati di addestramento nella consueta configurazione di addestramento. |
 | Passo | Un aggiornamento formativo. Le dimensioni del batch e del set di dati influiscono sulla relazione tra passaggi ed epoche. |
 | Gambo | Una parte isolata di un mix, tipicamente vocale o strumentale. |
 | Latenza | Il tempo che intercorre tra un evento di input e il suo output udibile. |

Vedi [Fondamenti di RVC](../start/rvc-fundamentals.md), [Modelli e file](../start/models.md) e [Formazione](../model-training/training.md) per questi termini nel contesto.

## Controlli di Ilaria RVC

Queste voci sono adattate dal glossario integrato in Ilaria RVC. I controlli disponibili possono variare in base alla versione.

 | Controllo | Significato |
| --- | --- |
 | Modello vocale | Seleziona un checkpoint di inferenza e cerca il relativo indice corrispondente. |
 | Aggiorna | Effettua nuovamente la scansione della libreria del modello. Successivamente controlla nuovamente la selezione. |
 | Scarica voce da VRAM | Rilascia risorse di inferenza per liberare memoria GPU per altre attività. |
 | ID altoparlante | Seleziona uno slot vocale all'interno del modello caricato. Utilizzare 0 per un tipico modello a singolo altoparlante. |
 | RMVPE e FCPE | Estrattori di passo che stimano F0 nel tempo. |
 | ContentVec / HuBERT | ContentVec è un codificatore di contenuti in stile HuBERT utilizzato nei flussi di lavoro RVC standard. Abbina l'encoder utilizzato nell'addestramento. |
 | Mix inviluppo del volume | Imposta quanto da vicino le dinamiche di uscita seguono la sorgente. |
 | Proteggi | Riduce l'influenza del recupero sulle consonanti sorde e sui respiri. Un valore più basso fornisce una protezione più forte. Un valore di 0,5 lo disabilita. |
 | Ricampionamento | Regola la velocità di uscita. Un valore pari a 0 mantiene la velocità di output del modello. |
 | Elabora dati | Prepara, ricampiona e suddivide le registrazioni. Ilaria RVC regola il livello di ogni fetta durante questa fase. |
 | Estrazione delle caratteristiche | Calcola le caratteristiche del contenuto e le informazioni sull'intonazione per i modelli guidati dall'intonazione. |
 | Dataset Checker | Segnala possibili ritagli, lunghe pause, file illeggibili e differenze di livello senza modificare la fonte. |
 | Anteprime dell'allenamento | Converti la stessa breve registrazione di riferimento in diverse epoche per il confronto a orecchio. |
 | Generatore e discriminatore | Il generatore impara a sintetizzare l'audio e il discriminatore fornisce feedback. La loro coppia di checkpoint G/D viene utilizzata per riprendere l'addestramento. |
 | Interrompi e salva | Richiede un checkpoint ripristinabile. Attendere la conferma prima di chiudere. |
 | Epoche totali | Obiettivo dell'epoca finale, comprese le epoche completate prima della ripresa. |
 | Informazioni sul modello | Visualizza le proprietà del checkpoint memorizzate come velocità, guida del passo e precisione, ove disponibili. |
 | Unisci modelli | Unisce pesi di inferenza compatibili. Inizia a testare la voce unita con il recupero disabilitato. |
 | FP16 e FP32 | Formati di precisione numerica. La precisione del peso in un'esportazione descrive il file archiviato. |

> I checkpoint HuBERT generici sono sconsigliati come encoder predefinito per la conversione vocale. Sono addestrati per rappresentare il parlato e possono conservare informazioni sul timbro di chi parla, che possono riaffiorare nell’audio convertito. In RVC usa l’encoder previsto dal modello, per esempio ContentVec se la voce è stata addestrata con quello.

Vedi [Conversione vocale](../conversion/voice-conversion.md) e [Formazione](../model-training/training.md) per i flussi di lavoro che utilizzano questi controlli.
