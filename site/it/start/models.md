# Modelli e file RVC

Un modello RVC cambia il timbro di una voce già registrata o catturata dal microfono. Le parole, le pause e il ritmo partono dall’audio di ingresso. Per la prima prova scegli una voce isolata, così è più facile capire che cosa cambia dopo la conversione.

## A cosa servono i file

| File | Che cosa contiene | Come usarlo |
| --- | --- | --- |
| `.pth` di inferenza | I pesi del modello usati per la conversione. | Selezionalo come modello nell’app. |
| `.index` abbinato | Le caratteristiche vocali che l’app può recuperare durante la conversione. | Aggiungilo se disponibile. È opzionale. |
| `.zip` | Un archivio che può contenere modello, indice e istruzioni. | Importalo se l’app lo supporta oppure estrai i file e selezionali separatamente. |
| Checkpoint di training, per esempio `G_*.pth` e `D_*.pth` | File intermedi che possono servire per riprendere l’addestramento. | Per la conversione usa il modello esportato per l’inferenza. Due file con estensione `.pth` possono avere funzioni diverse. |

## Quale file indice usare?

Nel training in stile RVC WebUI (Mainline - Original RVC), `trained_*.index` è l’indice FAISS dopo che ha imparato come organizzare le caratteristiche vocali, prima che vi vengano inseriti i vettori. `added_*.index` è la versione che contiene i vettori consultabili. Se trovi entrambi, usa l’`added_*.index` abbinato al modello. Se hai solo `trained_*.index`, lascia il recupero disattivato oppure genera l’indice popolato dai dati dell’esperimento. Altre app possono usare nomi diversi.

Un `.index` distribuito insieme al modello esportato è molto probabilmente già popolato, anche se il nome non inizia con `added_`. Il nome da solo non basta per confermare che contenga i vettori.

## A cosa servono le cartelle del training?

Di solito queste cartelle si trovano in `logs/<esperimento>/`. Contengono file di lavoro per l’addestramento e la valutazione. Per usare la voce esportata bastano il `.pth` di inferenza e, facoltativamente, il suo indice popolato.

| Cartella | Che cosa contiene |
| --- | --- |
| `0_gt_wavs` | Clip vocali già elaborate alla frequenza di campionamento dell’esperimento. Sono l’audio di riferimento che il modello impara a ricostruire. |
| `1_16k_wavs` | Copie delle clip a 16 kHz usate per estrarre le caratteristiche vocali. |
| `2a_f0` | Tonalità fondamentale estratta dalle clip e salvata come valori discreti per i modelli con controllo dell’intonazione. |
| `2b-f0nsf` | Tonalità fondamentale degli stessi segmenti, salvata come frequenza continua in hertz. |
| `3_feature768` | Vettori delle caratteristiche di ogni clip, a 768 dimensioni nel formato RVC v2. Servono al training e possono essere inseriti nell’indice. |
| `eval` | Dati di valutazione. Può contenere eventi di TensorBoard se il programma li scrive lì. Il contenuto varia con il trainer. |

## Scegli un modello adatto all’uso

Ascolta demo simili a ciò che vuoi convertire. Per il parlato, fai attenzione a consonanti, parole pronunciate piano e pause. Per il canto, ascolta le note lunghe e gli estremi del registro che ti interessa. Per il tempo reale, prova anche a parlare liberamente e a cambiare volume. Controlla la versione del modello, il motore compatibile e le condizioni d’uso. Una voce che funziona bene in una lingua può rendere peggio in un’altra, anche se entrambe sono presenti nel dataset.

## Importa e organizza i modelli

1. Scarica da una fonte affidabile e leggi le note incluse. Alcuni programmi possono eseguire codice durante il caricamento di file di modello non sicuri.
2. Tieni ogni voce e versione in una cartella separata, con il `.pth` esportato, il suo eventuale `.index` e le note. Il nome del file da solo non basta per capire se l’indice è quello giusto.
3. In Ilaria RVC apri **Altro → Importa modelli locali**. Seleziona il `.pth` di inferenza o uno ZIP supportato e aggiungi il relativo `.index` se lo hai. In altre app potrebbe essere necessario aggiornare l’elenco dei modelli dopo l’importazione.

## Fai la prima conversione

1. Registra circa dieci secondi con una sola voce, senza musica, riverbero marcato o distorsione.
2. Seleziona il modello, disattiva il recupero dall’indice e lascia la trasposizione a zero. Salva il WAV convertito come riferimento.
3. Se il registro suona forzato, prova piccoli cambiamenti in semitoni e riascolta sempre la stessa clip. Valuta separatamente il registro e la somiglianza del timbro.
4. Quando il registro ti convince, prova ad aumentare di poco il recupero con l’indice abbinato. Ascolta se il timbro è più riconoscibile e se respiri e consonanti rimangono naturali. Puoi lasciare il recupero a zero se preferisci il risultato.

## Risolvi i problemi più comuni

| Sintomo | Che cosa controllare |
| --- | --- |
| L’app non carica il modello | Verifica motore, versione e tipo di file. Se lo ZIP viene rifiutato, estrailo e seleziona il `.pth` esportato per l’inferenza. |
| Si riconosce ancora troppo il timbro originale | Prova un modello già verificato sulla stessa clip. Se il timbro di partenza rimane evidente, la causa può essere il modello o l’embedder usato durante il training, come alcune varianti di HuBERT. Alzare il recupero può non risolvere il problema. |
| Respiri e consonanti suonano metallici | Confronta il risultato con l’indice disattivato. Se il difetto ricorre anche su registrazioni pulite e con impostazioni diverse, può dipendere dal modello e richiedere un nuovo addestramento. |
| Solo l’audio in tempo reale va a scatti | Prova lo stesso modello su un file. Se la conversione del file riesce, verifica microfono, instradamento audio e buffer nell’app per il tempo reale. |

## Conserva una configurazione funzionante

Annota la versione dell’app, quella del modello, la trasposizione e il valore di recupero. Salva anche una clip breve per confrontare i risultati quando aggiorni. Se addestri i tuoi modelli, conserva separatamente l’esportazione per l’inferenza e i file per riprendere il training.

## Continua con le guide

- [Guide per app](../other-rvcs/app-guides.md)
- [Libreria modelli di Ilaria RVC](../ilaria-rvc/manage/model-library.md)
- [Inferenza](../ilaria-rvc/convert/inference.md)
- [Preparazione del dataset](../model-training/dataset-preparation.md)
- [Risoluzione dei problemi](../reference/troubleshooting.md)

[Matrice interattiva di compatibilità RVC](../reference/compatibility-matrix.md)
