# Prepara un set di dati vocale

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Ogni clip insegna al modello qualcosa sulla sua voce di destinazione. Prima dell'addestramento, decidi quali parti di quella voce vuoi che il modello gestisca, quindi conserva le registrazioni che dimostrano chiaramente quelle parti. Inizia con il materiale che sei autorizzato a utilizzare per la formazione e conserva una copia separata dei file originali.

## Scegli le registrazioni per il tuo obiettivo

 | Obiettivo | Cosa raccogliere |
| --- | --- |
 | Discorso colloquiale | Domande, affermazioni, frasi più lunghe e risposte brevi con consonanti e vocali diverse. |
 | Discorso espressivo | Gli stili di esposizione previsti sia a livello calmo che enfatico. Registra le variazioni tra diverse frasi. |
 | Canto | Vocali sostenute, cambi di nota ed esempi vicino alle comode estremità alte e basse dell'estensione prevista. |
 | Più di una lingua | Chiari esempi di suoni e frasi che differiscono tra le lingue, registrati dallo stesso parlante. |

> ContentVec può essere un collo di bottiglia nei modelli multilingue. Anche con un dataset nella lingua desiderata, l’encoder può perdere alcune distinzioni fonetiche. Tieni da parte clip di prova per ogni lingua, includendo i contrasti più difficili, e confronta la pronuncia dopo un breve addestramento. Se gli stessi errori si ripetono su clip pulite, documenta il limite per quella lingua. Cambiare encoder o configurazione di addestramento non è una soluzione affidabile.

Un insieme di registrazioni pulito e vario è un punto di partenza migliore rispetto a una raccolta più ampia di frasi ripetute o audio danneggiato. Non esiste una durata che garantisca un buon risultato. Controlla cosa coprono le registrazioni prima di decidere se hai bisogno di più materiale.

## Pianifica una sessione di registrazione espressiva

Una registrazione può essere priva di rumore e coprire comunque una minima parte della voce. Costruisci la sessione attorno alla performance che prevedi di convertire. Per la narrazione, registra una lettura chiara con un fraseggio intenzionale. Per la conversazione, includi risposte spontanee e cambiamenti di ritmo. Per cantare, raccogli brani a cappella asciutti nel registro previsto, con vocali sostenute e transizioni tra le note. Le sole battute danno al modello poca esposizione a quei suoni cantati.

Registrati o concorda con l'esecutore il modello previsto e il suo utilizzo prima della registrazione. Per una conversazione remota, chiedi all'oratore di acquisire il proprio microfono localmente e di utilizzare solo quella traccia.

 | Blocco sessione | Esempio di allocazione | Cosa catturare |
| --- | --- | --- |
 | Narrazione espressiva | 10 minuti | Leggi un passaggio con cambiamenti di enfasi, emozione e ritmo. |
 | Conversazione | 10 minuti | Raccogli discorsi non scritti con domande, reazioni brevi e risposte più lunghe. |
 | Copertura fonetica | 10 minuti | Usa materiale come Harvard Sentences, Rainbow Passage o Comma Gets a Cure per esercitare vocali, dittonghi, occlusive come P/B/T/K e sibilanti come S/Z/SH. |
 | Intervallo di prestazione | 20 minuti | Registra la consegna di cui il modello ha bisogno, dal discorso sommesso alla proiezione. Prova ritmi, emozioni diversi e risatine o sospiri chiari, ove pertinente. Per un modello multilingue, includere una copertura intenzionale delle lingue di destinazione. |

Quel piano di 50 minuti è un esempio di discorso espressivo. Un set mirato di dieci minuti può essere più utile di un set più ampio di registrazioni ripetitive o danneggiate. Aggiungi materiale per colmare una lacuna udibile nella copertura. La durata del set di dati da sola non determina il sovradattamento.

### Imposta il microfono

Cattura un singolo microfono su una traccia mono. Utilizza un filtro anti-pop o un parabrezza, mantieni costante la distanza del microfono e imposta il guadagno mentre provi la linea pianificata più rumorosa. Una stanza tranquilla con arredi delicati riduce i riflessi alla fonte. Preferisci un originale asciutto a una registrazione molto pulita con riverbero udibile o artefatti di separazione. Se converti le registrazioni stereo esistenti in mono, ascolta entrambi i canali e il pieghevole. Utilizzare un canale pulito se il segnale combinato suona vuoto o perde dettaglio.

### Controlla l'audio preparato

- **Frequenza di campionamento:** Mantieni gli originali alla frequenza registrata. Scegli una frequenza di allenamento supportata dall'architettura e dai pesi preallenati. La fase di preelaborazione può ricampionare quando necessario. Il sovracampionamento non aggiunge alcun dettaglio alla registrazione originale.
- **Livelli:** Confronta i livelli delle sessioni e correggi le grandi differenze di guadagno causate dal posizionamento del microfono o dalle impostazioni di registrazione. Preservare le modifiche intenzionali nella consegna. Controlla ciò che il frontend di training già normalizza prima di applicare un passaggio di volume separato.
- **Respiri e reazioni:** Mantieni respiri naturali e segnali espressivi puliti laddove servono all'uso previsto. Elimina le risate taglienti, i sussulti aspri e gli scoppi esplosivi. Ascolta le modifiche incerte in cuffia.
- **Pause:** mantieni le pause naturali e rimuovi i lunghi intervalli vuoti. Se vuoi testare una clip di silenzio autonoma, esegui un confronto con le stesse impostazioni e ascolta le pause trattenute. Alcune pipeline di preelaborazione gestiscono già il silenzio.

## Registra o seleziona materiale pulito

- Utilizza un altoparlante per il primo modello. Escludi voci sovrapposte, risposte del pubblico e dialoghi in cui l'oratore cambia a metà clip.
- Ascolta il rumore della ventola, gli echi, la musica e la distorsione digitale. Una clip che suona accettabile in un mix ad alto volume può comunque contenere problemi evidenti quando la voce è isolata.
- Se stai registrando una nuova sessione, usa una posizione coerente del microfono e lascia un margine di picco. Prova la frase più forte prima di registrare l'intera sessione.
- Quando combini le sessioni, ascoltale fianco a fianco. Mantieni le variazioni utili nella voce ed elimina le differenze brusche causate da effetti pesanti, suoni della stanza o un microfono inaffidabile.
- Rimuovi le riprese duplicate se aggiungono poca varietà. Metti da parte diverse sessioni o passaggi per la valutazione prima di modificare i tagli adiacenti nella cartella di formazione.

## Pulisci una copia di lavoro

1. **Isola la voce di destinazione.** Se la fonte include un accompagnamento, prova a separare e ad ascoltare la radice vocale risultante. Rifiuta le sezioni con sanguinamento dello strumento, cori o evidenti artefatti di separazione.
2. **Esegui tagli lungo i confini naturali.** Taglia l'aria morta da tempo e rimuovi le sezioni inutilizzabili. Ascolta attraverso ogni taglio le consonanti perdute, i cambiamenti improvvisi o l'ingresso di un secondo oratore.
3. **Applica solo la pulizia necessaria alla registrazione.** Confronta qualsiasi passaggio di denoising con l'originale. Se la versione ripulita inghiotte consonanti, confonde le sillabe o introduce un suono pulsante, riduci l'elaborazione o sostituisci la versione.
4. **Controlla i livelli tra i file.** Mantieni spazio sufficiente per i passaggi ad alto volume e bilancia le principali differenze di livello di registrazione. L'abbassamento del volume di un file già tagliato lascia i picchi danneggiati nella registrazione.
5. **Esporta in un formato senza perdita di dati leggibile dalla tua build.** WAV è un formato di lavoro pratico. La ricodifica di un file compresso come WAV preserva il risultato di tale decodifica e non può ripristinare i dettagli persi.

Il motore di training può dividere i file nei propri segmenti e ricampionarli nella configurazione del modello selezionato. Mantieni intatte le parole e le frasi utilizzabili durante la modifica manuale e lascia che sia la fase di preelaborazione dell'addestramento a gestire la propria segmentazione.

## Organizzare il set di dati e le prove di ascolto

Conservare gli input di confronto, le registrazioni scartate e l'output convertito fuori dalla cartella di formazione. In questo esempio vengono utilizzate cartelle separate per gli originali, la formazione e la valutazione.

```text
my-voice-project/
  originals/
  training-audio/
    session-a-01.wav
    session-a-02.wav
    session-b-01.wav
  evaluation/
    speech-test.wav
    expressive-test.wav
  notes.md
```

Preelaborazione del punto a `training-audio/`. Tieni `evaluation/` separato. Un utile set di confronto potrebbe includere una frase parlata non familiare con consonanti acute, un passaggio tranquillo e una breve frase espressiva. Per un modello di canto, includere una nota tenuta e una frase che incrocia i registri. Trattenete interi passaggi o sessioni quando potete, in modo che l'audio di prova non duplichi le clip di allenamento vicine.

Se ti alleni con un'interfaccia che supporta più di un relatore, segui le regole relative alla cartella del relatore e all'ID. Una cartella con un solo altoparlante con file audio direttamente al suo interno è più semplice da controllare per la prima volta.

## Rivedi il dataset in Ilaria RVC

Le recenti build di Ilaria RVC ti consentono di trascinare l'audio o uno ZIP del set di dati nell'interfaccia di formazione e gestire lì i set di dati importati. Seleziona il set di dati desiderato ed esegui il **Dataset Checker**. Utilizza le sue brevi anteprime per esaminare i file contrassegnati per silenzio, ritaglio, livelli incoerenti o problemi di decodifica. L'**Analizzatore audio** può aiutare a confrontare i file sospetti utilizzando forme d'onda, intonazione e misurazioni di livello. Conferma la diagnosi ascoltando prima di rimuovere materiale altrimenti utile. Le etichette di disponibilità e controllo seguono la versione installata.

 | Cosa noti | Cosa fare prima dell'allenamento |
| --- | --- |
 | Il file non verrà decodificato | Controlla che venga riprodotto in un editor. Riesportare dall'originale, se possibile, e verificare che la copia si apra. |
 | Sezioni di quasi-silenzio | Ascolta l'intervallo contrassegnato e ritaglia gli intervalli vuoti. Mantieni pause naturali che aiutano a preservare i confini della frase. |
 | Picchi distorti o appiattiti | Confrontare con la registrazione originale. Sostituisci una ripresa udibilmente tagliata quando hai un'alternativa pulita. |
 | I suoni di sottofondo seguono la voce | Ascoltare in cuffia il gambo isolato ed escludere le parti interessate quando la separazione risulta instabile. |
 | Una sessione è molto più silenziosa | Controlla se la performance dell'oratore è intenzionalmente silenziosa. Regola le differenze di guadagno della registrazione mantenendo la dinamica naturale utile. |

Prima di continuare, riproduci alcuni clip di ogni sessione, conferma di aver selezionato la cartella preparata e registra la versione della cartella nelle tue note. Quindi [esegui un esperimento di formazione](training.md).
