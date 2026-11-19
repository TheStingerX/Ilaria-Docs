---
label: "🎚️ Intonazione e qualità audio"
order: 94
permalink: /audio-quality/
---
# Ottimizza l'intonazione e la qualità audio

[Scarica Ilaria RVC 2.4.0 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Scegli un breve brano che contenga il problema. Effettua una conversione di riferimento e confrontala con un'impostazione modificata alla volta. Ascolta a livelli simili, quindi un risultato più forte non vince il confronto solo in base al volume. Per la musica, confronta prima la voce convertita da sola e poi nel mix.

## Intonazione, estensione e risonanza

L'altezza misura quanto è alto o basso un suono espresso. **F0**, o frequenza fondamentale, è la parte periodica del segnale da cui un estrattore di tono stima il contorno. Un modello guidato dall'intonazione utilizza quel contorno quando sintetizza l'output.

**Intonazione** sposta il contorno di semitoni. I valori positivi lo aumentano e i valori negativi lo abbassano. Ogni ottava ha 12 semitoni. Ad esempio, applicando `+12` a una nota sonora a 220 Hz si ottengono 440 Hz. Un'impostazione pari a zero mantiene il riferimento dell'intonazione dalla registrazione.

Per il parlato, inizia da zero. Se la clip si trova molto al di fuori dell'intervallo confortevole del modello target o sembra tesa, confrontala con un piccolo spostamento verso l'alto o verso il basso. Per cantare su uno strumento esistente, confronta prima lo zero. Uno spostamento che cambia la tonalità della voce può scontrarsi con la base musicale. Gli spostamenti di ottava mantengono i nomi delle note, sebbene il modello debba comunque gestire l'intervallo risultante. Confronta le note esposte più basse e più alte prima di impegnarti in un'intera canzone.

Le **formanti** descrivono risonanze che aiutano a distinguere le vocali e il carattere della voce. Utilizzare l'elaborazione della formante solo dopo che il contorno dell'altezza funziona. Intonazione e risonanza possono richiedere regolazioni diverse. Nelle build sia con l'inferenza del tono che con l'effetto pitch-shift, il primo modifica il tono estratto prima della sintesi e il secondo agisce sull'audio risultante.

## Confronta gli estrattori di tono

Inizia con **RMVPE**, il valore predefinito per l'attuale inferenza di Ilaria RVC. Se il passo è instabile, prova un altro estrattore disponibile nella tua build, come **FCPE** o **Swift**. Mantieni lo stesso input, pitch shift, rapporto di indice e formato di output per ogni esecuzione.

- Per una nota tenuta, ascolta l'improvviso raddoppio o dimezzamento dell'altezza. Se più estrattori falliscono contemporaneamente, controlla la presenza di un altro cantante, di uno strumento nella radice vocale o di un grave ritaglio.
- Per un parlato tranquillo, assicurati che l'input contenga una vocale chiara. Aumentando il livello di una clip che contiene principalmente rumore può renderne più difficile la diagnosi.
- Per un batch di grandi dimensioni, confrontare prima un estratto dalle voci di origine più basse e quelle più alte. Confronta il tempo di elaborazione con lo stesso file e le stesse impostazioni sulla macchina prevista.

L'estrazione della presentazione e l'estrazione del contenuto sono fasi separate. La modifica dell'estrattore F0 stima un profilo di intonazione diverso dallo stesso audio. L'embedder di contenuto deve ancora corrispondere al modello.

## Apporta modifiche mirate

 | Se senti | Prova prima | Cosa ascoltare |
| --- | --- | --- |
 | Una nota salta, trilla o scompare | Confronta un secondo estrattore F0 supportato sullo stesso brano. | Note sostenute che seguono la sorgente senza improvvisi salti di ottava. |
 | Il timbro target è debole | Verificare il modello, l'embedder e l'indice corrispondente. Confronta l'indice disabilitato con un piccolo aumento del **Rapporto indice**. | Un tono più riconoscibile con parole ancora comprensibili. |
 | Le parole diventano sfocate dopo aver aumentato il recupero | Abbassa il **Rapporto indice** e riproduci le stesse consonanti. | Le sillabe diventano più chiare senza perdere il carattere che desideri. |
| Respiri o consonanti dal suono metallico | Prova lo stesso modello con più registrazioni pulite. Se il difetto persiste, controlla il dataset per clipping, denoising eccessivo o pochi esempi puliti di respiri e consonanti. Correggi il dataset e riaddestra il modello. Pulire l’audio in ingresso durante l’inferenza non elimina gli artefatti appresi dal modello. | Respiri e consonanti come `s` e `f` chiari, senza ronzii metallici. |
 | Il volume diminuisce all'interno di una frase | Confronta una diversa impostazione di **Inviluppo volume**. Controlla la sorgente per un gate, quindi prova **Dividi audio** se il problema si verifica solo su clip lunghi. | Terminazioni di parole coerenti senza dover deglutire pause naturali. |
 | Una voce elaborata suona fragile | Disattiva la pulizia, la correzione automatica dell'intonazione e gli effetti di output. Aggiungili nuovamente individualmente dopo una conversione pulita. | Meno artefatti sulle sibilanti e sulle vocali sostenute. |
 | I picchi di uscita sono distorti | Controlla eventuali ritagli sulla forma d'onda originale o convertita. Ridurre il guadagno non necessario e confrontare prima di limitare. | Picchi puliti e nessun crepitio sulle sillabe forti. |

Evitare di cambiare l’embedder per inseguire un suono. Deve corrispondere alla rappresentazione della feature su cui è stato addestrato il modello. **Rapporto indice** unisce le funzionalità recuperate da un indice di addestramento corrispondente nella conversione. Non fornisce un aumento di qualità generico. Una fusione elevata può rendere la pronuncia meno distinta, soprattutto su una fonte sconosciuta.

Nel motore di file di Applio, un'impostazione **Inviluppo volume** più vicina allo zero segue più da vicino la dinamica della sorgente. Per **Proteggi consonanti senza voce**, i valori inferiori a 0,5 rafforzano la protezione e 0,5 la disabilita in quel motore. Controlla il tooltip e le note di rilascio della tua app prima di trasferire quei numeri a un altro fork.

## Diagnosi a orecchio e con l'analizzatore

1. Segna il timestamp del problema. Controlla se appare nella sorgente, nella voce separata o solo nel risultato convertito.
2. Se è nel sorgente, correggi prima l'input. Confronta una ripresa alternativa prima di utilizzare un denoising pesante. Abbassando il volume di una registrazione interrotta non è possibile ripristinare i picchi mancanti.
3. Se appare nella conversione, confronta gli effetti disattivati, l'indice disattivato e un estrattore di tono compatibile in passaggi separati. Verificare l'embedder e il pacchetto del modello prima di presumere che il checkpoint sia scadente.
4. Utilizza l'**Audio Analyser** di Ilaria RVC, ove disponibile, per confrontare forme d'onda, stime dell'intonazione, spettri e livelli. Una trama del tono può indicarti un salto sospetto e l'audio sorgente ti dice se faceva parte della performance.
5. Confermare il miglioramento su un secondo estratto. Mantieni l'impostazione solo se funziona con il materiale che intendi esportare.

Per cantare, prova respiri, consonanti, vibrato e note trattenute. Per quanto riguarda il parlato, prova le frasi a voce bassa e alta e almeno una frase con consonanti acute. Se l'output continua a fallire, invia un breve esempio consentito e le tue impostazioni con un [rapporto di risoluzione dei problemi](../reference/troubleshooting.md).
