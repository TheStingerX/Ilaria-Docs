# Google Colab

[Apri il notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb) · [Google Colab](https://colab.research.google.com/github/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb)

Esegui Ilaria RVC nel browser con una GPU fornita dalla piattaforma cloud. Scegli un notebook qui sotto. Attiva un acceleratore NVIDIA prima di eseguire la prima cella.

## Prima di iniziare

Prepara un breve WAV pulito e un modello di inferenza compatibile. Per l'addestramento, conserva il dataset originale e alcune clip di prova separate sul tuo computer. Il notebook viene eseguito su una macchina Linux remota.

### Limiti, unità di calcolo e policy di Google Colab

Prima di avviare una sessione lunga, comprendi come [Google Colab](https://research.google.com/colaboratory/faq.html) gestisce le risorse:

- **Piano gratuito vs. piani a pagamento (Compute Units):** Il piano gratuito di Colab offre GPU quando disponibili, ma durata della sessione, timeout di inattività e tipo di GPU (come T4) sono dinamici e mai garantiti. I piani a pagamento (**Colab Pro**, **Pro+** e **Pay As You Go**) utilizzano **compute units** consumate dinamicamente in base alla GPU/TPU scelta; quando il saldo si esaurisce, l'account torna ai limiti del piano gratuito.
- **Attività non consentite e restrizioni WebUI:** La policy [Disallowed Activities](https://research.google.com/colaboratory/faq.html#disallowed-activities) di Google vieta di ospitare file, servire applicazioni web pubbliche non legate al calcolo interattivo, eseguire proxy remoti, aggirare limiti di sicurezza/accesso, usare più account per eludere le quote o creare deepfake. Sebbene i notebook Gradio interattivi non siano vietati in ogni scenario, eseguire tunnel WebUI pubblici persistenti sul piano gratuito provoca spesso disconnessioni del runtime o avvisi di policy.
- **Disconnessioni, salvataggio e privacy:** Colab può disconnettere sessioni inattive o lunghe e cancellare lo spazio locale della VM. Esporta regolarmente i risultati (`EXPORT = True`) o sincronizza i checkpoint importanti su Google Drive, e non caricare mai audio riservati o credenziali in notebook pubblici o condivisi.
- **Alternative:** Se Colab si disconnette o non ha GPU disponibili, usa [Kaggle](kaggle.md) (quota GPU settimanale gratuita dopo verifica telefonica) o [Lightning AI Studio](lightning-ai.md).

## Esecuzione su Google Colab

1. Apri su Colab e seleziona un runtime GPU.
2. Esegui le celle 1-4 in ordine. Verificano la GPU, installano le dipendenze, scaricano i pesi base e avviano la Web UI. Imposta `TRAINING_SAMPLE_RATES` su `[]` per sola inferenza oppure seleziona i sample rate con cui vuoi addestrare.
3. Apri la vista incorporata generata dalla cella di avvio. Mantieni il runtime connesso.

## Controlla ogni cella prima di proseguire

Il controllo GPU deve identificare un dispositivo NVIDIA. In caso contrario, cambia prima l'acceleratore. Attendi il completamento dell'installazione delle dipendenze prima di scaricare i pesi. Imposta `TRAINING_SAMPLE_RATES = []` per sola inferenza. Per il training, scegli il sample rate corrispondente al tuo modello e alla coppia di pre-addestrati. Lascia `DOWNLOAD_FCPE` attivo se prevedi di usare FCPE.

## 4. Converti una registrazione

1. Nella scheda del browser di Ilaria RVC, apri **Altro → Importa modelli locali**. Carica il file del modello di inferenza (`.pth`) e, se lo hai, l’indice abbinato (`.index`), che è facoltativo. Puoi anche caricare uno ZIP compatibile che contiene questi file. Attendi il completamento dell'importazione. In alternativa, apri **Altro → Download models from Hugging Face, Google Drive or MEGA**, incolla un link scaricabile pubblicamente a uno ZIP supportato, un `.pth` o un `.index` e premi **Download and install model**. Se il modello e l’indice facoltativo hanno link separati, scaricali uno alla volta dallo stesso pannello.
2. Apri **Inferenza**, aggiorna l'elenco delle voci se necessario, seleziona la voce desiderata e vai a **Inferenza singola**.
3. Carica il breve WAV. Inizia con **Intonazione 0** e **Rapporto indice 0**. Lasciare disattivati ​​gli effetti opzionali e utilizzare l’embedder previsto dal modello.
4. Fare clic una volta sul controllo di conversione e attendere l'output. Riproduci il risultato, quindi scaricalo dal lettore, se disponibile. Mantieni il WAV di input in modo da poter confrontare la stessa frase in seguito.
5. Se vuoi testare il recupero, seleziona l'indice corrispondente e prova un piccolo aumento da zero. Se l'output fallisce o la voce diventa più difficile da comprendere, tornare alla prova di riferimento e verificare l'abbinamento modello-indice.

Se la voce non appare mai, controlla prima il registro di importazione. Un checkpoint di addestramento salvato come file G o D appartiene a un esperimento e necessita di un'esportazione di inferenza prima di poter essere selezionato qui.

## Prepara il tuo set di dati e pianifica un allenamento

### Pulisci l'audio con MVSEP solo dove necessario

Conserva una copia intatta delle tue registrazioni. Se contengono già un'unica voce pulita e asciutta, salta la separazione. Utilizza il materiale che sei autorizzato a caricare su [MVSEP](https://mvsep.com/en/home) e su cui allenarti. Per le registrazioni riservate, puliscile localmente.

1. **Isola la voce.** Carica un breve esempio e scegli un'opzione di separazione vocale. Scarica la radice vocale in WAV quando disponibile. Riproducilo rispetto all'originale e ascolta tramite le cuffie musica, altre voci, sillabe spezzate e artefatti acquosi o metallici.
2. **Rimuovi le voci di accompagnamento solo se presenti.** Per i brani con armonie o un ritornello sotto la destinazione, utilizza un'opzione di separazione solista-accompagnamento sul gambo vocale. Mantieni l'output principale. Se i cantanti si sovrappongono ancora o la solista presenta dei buchi, usa una sezione pulita o una ripresa diversa.
3. **Riduci il riverbero solo dove udibile.** Se la voce ha un'ampia coda di riverbero stereo, prova prima un'opzione di de-reverbero stereo su una copia. Per le riflessioni rimanenti della stanza, confrontare un passaggio di de-reverbero della stanza. Puoi saltare entrambe le fasi. Ascolta le consonanti troncate e i respiri ad ogni passaggio.
4. **Rimuovi l'eco solo se ripete la voce.** Una ripetizione ritardata udibile richiede un breve test separato. Conserva l'originale o sostituiscilo se la rimozione rimuove le parole. Evitare di impilare i passaggi su audio altrimenti pulito.
5. **Prepara le clip finali.** Ritaglia il rumore inutilizzabile e le lunghe sezioni vuote in un editor come Audacity, mantenendo fiati utili e fraseggi naturali. Esporta WAV puliti. Metti insieme i file approvati in uno ZIP e conserva alcune clip pulite all'esterno per la valutazione.

Testare l'intera catena di pulizia per alcuni secondi prima di trattare l'intero set di dati. Un modello può apprendere gli artefatti rimasti nel suo audio di addestramento. Controlla diverse clip di sessioni diverse prima del caricamento.

### Pulisci un set di dati localmente con Ultimate Vocal Remover (UVR)

UVR separa un file audio in tracce chiamate stem. Usalo quando la voce di destinazione è mixata con musica, effetti sonori o altre voci. Se hai già una registrazione vocale pulita, conserva l'originale. UVR elabora l'audio sul tuo computer dopo aver scaricato i modelli richiesti. Cloud esegue separatamente il successivo lavoro di addestramento RVC.

#### Installa UVR e prepara una clip di prova

1. Scarica il programma di installazione o il pacchetto per il tuo sistema operativo da [UVR release](https://github.com/Anjok07/ultimatevocalremovergui/releases). Avvia l'app desktop dopo averla installata.
2. Crea una copia di 15–30 secondi di un esempio che contenga una linea chiara e una sezione in cui la musica si sovrappone ad essa. Conserva l'originale al sicuro.
3. Fai clic su **Select Input** e scegli la clip di prova. Utilizza **Select Output** per scegliere una nuova cartella scrivibile, come `uvr-test`. Scegli **WAV** come formato di output.
4. Seleziona un **Process Method** e un modello che separa la **voce** dalla **strumentale**, ad esempio un modello vocale in **MDX-Net**. Se l'elenco è vuoto, apri le impostazioni **Centro download**, seleziona la famiglia di modelli corrispondente e scarica il modello adatto. Ritorna alla finestra principale e selezionala.
5. Abilita la **Conversione GPU** solo se la build installata riconosce un dispositivo supportato. Se questa opzione causa un errore, disattivala e prova sulla CPU. L'elaborazione della CPU può essere più lenta, quindi inizia con una breve clip.

#### Separa le voci e ascolta

Fai clic su **Start Processing**. Al termine, trova la radice della voce nella cartella di output. Alcuni modelli scrivono anche una radice strumentale. Riproduci l'originale e la voce a un volume simile. Controlla le consonanti, i respiri, le note trattenute e le sezioni in cui l'accompagnamento è forte. Se senti ancora gli strumenti o la voce sembra acquosa o metallica, confronta un altro modello sulla stessa clip di prova prima di elaborare il set di dati completo.

Se hai selezionato la radice sbagliata, controlla i nomi dei file o ascolta ogni uscita. Mantieni quello che contiene la voce principale di destinazione.

#### Pulisci i problemi rimanenti uno alla volta

| Cosa rimane | Cosa provare in UVR |
| --- | --- |
| Cori o armonie | Inserisci la radice vocale isolata in un modello destinato alla separazione solista e accompagnamento, se la tua installazione ne offre una. Conserva l'output principale e verifica che la voce di destinazione sia completa. |
| Code di riverbero tra le frasi | Prova un modello destinato al de-riverbero, se disponibile. Confronta prima e dopo sullo stesso brano. Mantieni la radice originale se il de-riverbero danneggia le consonanti o le note trattenute. |
| Ripetizioni ritardate udibili | Prova un modello di rimozione dell'eco, se disponibile. Se rimuove parole o distorce respiri, usa un'altra ripresa o escludi la sezione interessata. |
| Ronzii ambientali, picchi tagliati o altre voci | Controlla l'originale. Se il trattamento continua a danneggiare la voce, sostituire o escludere la clip. La separazione non può ricostruire i picchi persi a causa del ritaglio. |

Elaborare il set completo solo dopo che un breve confronto sembra corretto. Usa Audacity o un altro editor per tagliare il materiale inutilizzabile. Mantieni pause e respiri naturali, esporta le clip approvate come WAV e inserisci solo quelle clip nello ZIP del set di dati. Mantieni i gambi strumentali e rifiutati fuori dallo ZIP. Successivamente, caricalo in **Formazione** su Ilaria RVC e conferma che **Percorso del set di dati** punta alle registrazioni importate.

## 5. Allena una voce e salva il tuo lavoro

1. In **Addestramento**, scegli un nuovo **Nome modello**. Importa il tuo audio o ZIP tramite i controlli di caricamento del set di dati. Attendi il completamento dell'importazione e conferma che **Il percorso del set di dati** punta alle registrazioni importate.
2. Esegui il **Dataset Checker** e ascolta eventuali registrazioni sospette. Verifica che l'architettura RVC V2, la frequenza di campionamento, l'embedder e le impostazioni del tono corrispondano ai pretraining G/D selezionati, se li utilizzi. Inizia con una dimensione batch adatta alla GPU allocata.
3. Esegui **Process Data**, quindi **Feature Extraction**. Leggere lo stato di ciascuno prima di continuare. Se modifichi il set di dati o il codificatore, prepara nuovi file per l'esperimento prima dell'addestramento.
4. Esegui **Train Pth** con un primo obiettivo modesto e salva i checkpoint periodici. Conserva una breve clip di prova dai dati di allenamento. Confronta i checkpoint esportati sulla stessa clip prima di iniziare una sequenza più lunga.
5. Crea l'indice delle caratteristiche se hai bisogno di recuperarlo, quindi prova prima l'esportazione dell'inferenza con **Rapporto indice 0**. Per una spiegazione dettagliata di ciascuna impostazione, vedere [Controlli e flusso di lavoro dell'allenamento](../train/training-controls.md).
6. Se vuoi fermarti a metà corsa, usa **Stop and save** all'interno di Ilaria RVC e attendi finché il log non conferma il salvataggio. Scarica i risultati mentre la sessione Cloud è ancora attiva.

## Esporta e arresta

Imposta `EXPORT = True` ed esegui la cella di esportazione. Attiva `INCLUDE_CHECKPOINTS` se devi riprendere il training in seguito. Salva lo ZIP in locale prima di chiudere la sessione, poi esegui la cella di arresto con `STOP = True`.

## Se l'avvio fallisce

Se la prima cella non rileva la GPU, controlla l'acceleratore e rieseguila. Se l'interfaccia non si apre, leggi l'output della cella di avvio, conferma che il server sia pronto e riapri la vista.

### Controlla lo ZIP di output

Per l'inferenza, verifica il WAV esportato e i file del modello. Per il training, attiva `INCLUDE_CHECKPOINTS` per includere i log dell'esperimento, poi controlla l'archivio prima di chiudere la sessione. Conserva il dataset originale separatamente.

## Risoluzione dei problemi comuni

Se l'installazione fallisce, leggi il primo errore e riesegui la cella fallita dopo averla corretta. Se l'app si apre ma manca il modello, controlla il log di importazione e aggiorna l'elenco. Per errori di memoria esaurita (OOM), inizia con una clip più corta o riduci il batch size di training. Se la Web UI si chiude, riaprila dalla stessa cella di avvio o porta finché la sessione è attiva.

[Ilaria RVC nel cloud](cloud.md)
