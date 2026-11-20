---
label: "🧠 Fondamenti di RVC"
order: 94
permalink: /rvc-fundamentals/
description: "La conversione vocale basata sul recupero (RVC) prende una registrazione vocale e sintetizza una versione con il carattere di una voce addestrata. La..."
---
# Fondamenti di RVC

[Scarica Ilaria RVC 2.4.0 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

La conversione vocale basata sul recupero (RVC) prende una registrazione vocale e sintetizza una versione con il carattere di una voce addestrata. La registrazione fornisce l'esecuzione, comprese le parole, il ritmo e gran parte del contorno dell'intonazione. Il modello determina il modo in cui viene resa la prestazione. Per una frase parlata, registra la pronuncia e la pronuncia che desideri ascoltare nel risultato. Una regolazione del tono cambia il registro senza tradurre o riscrivere la linea.

## Segui il segnale

 | Palcoscenico | Cosa fa | Cosa ascoltare |
| --- | --- | --- |
 | Decodifica la sorgente | Legge l'audio e lo prepara per l'analisi. | Picchi tagliati, eco della stanza e altre voci possono contaminare le fasi successive. |
 | Estrai le funzionalità del contenuto | Un embedder rappresenta il suono di ogni breve sezione dell'input. I flussi di lavoro RVC comuni utilizzano ContentVec o un estrattore di funzionalità basato su HuBERT. | Parole poco chiare possono seguire l'input nell'output, anche con un buon modello. |
 | Stima dell'altezza | Un predittore dell'altezza stima la frequenza fondamentale, o F0, nelle sezioni sonore. I modelli guidati dall'intonazione possono utilizzare questo contorno durante la sintesi. | Salti di nota inaspettati o note sostenute instabili possono indicare il tracciamento dell'intonazione. |
 | Recupera caratteristiche di addestramento simili | Quando è disponibile un indice compatibile, il convertitore può unire le caratteristiche vicine dai dati di addestramento del modello con le caratteristiche di origine. | Confronta il recupero attivato e disattivato se il risultato sembra ovattato o il timbro sorgente è troppo prominente. |
 | Sintetizza l'output | Il modello trasforma le caratteristiche condizionate in una forma d'onda alla velocità di sintesi supportata. | Ascolta le texture metalliche, le consonanti mancanti e i cambiamenti di livello. |

> I checkpoint HuBERT generici sono sconsigliati come encoder predefinito per la conversione vocale. Sono addestrati per rappresentare il parlato e possono conservare informazioni sul timbro di chi parla, che possono riaffiorare nell’audio convertito. In RVC usa l’encoder previsto dal modello, per esempio ContentVec se la voce è stata addestrata con quello.

### Mantieni i controlli separati

- **Pitch Shift** sposta il contorno rilevato di semitoni. Inizia da zero e cambialo se la performance è al di fuori del registro confortevole della voce di destinazione.
- **Predittore del passo** cambia il modo in cui viene misurato il contorno. Confronta i predittori su un passaggio che contiene il problema, come una nota sostenuta o la transizione dalla conversazione al respiro.
- **Tasso di indice** modifica l'equilibrio tra le funzionalità di origine e quelle recuperate. Zero disabilita il contributo di recupero nei flussi di lavoro RVC standard. Un'impostazione elevata può enfatizzare le caratteristiche dei dati di training, inclusi gli artefatti indesiderati.
- La **Frequenza di campionamento** descrive quanti campioni audio rappresentano un secondo. La velocità del file di origine, la velocità di sintesi del modello e la velocità del file esportato possono differire. Il ricampionamento di un file ne modifica la rappresentazione senza rendere caricabile un checkpoint incompatibile.

Per i controlli di conversione specifici dell'app, vedere [Conversione vocale](../conversion/voice-conversion.md).

## Verifica la compatibilità del modello prima dell'importazione

1. **Conferma la famiglia e l'architettura del modello.** Utilizza un runtime che supporti esplicitamente il modello. Classic RVC v1 e v2 utilizzano dimensioni di funzionalità diverse, comunemente 256 e 768 rispettivamente in RVC WebUI (Mainline - Original RVC). Alcuni fork supportano anche architetture che richiedono il proprio runtime.
2. **Controlla l’embedder.** Il runtime dovrebbe fornire la rappresentazione della funzionalità che il modello è stato addestrato ad aspettarsi. Un modello addestrato con un embedder personalizzato può aver bisogno di tale embedder al momento dell'inferenza. Un'estensione di file simile o una frequenza di campionamento corrispondente da sola forniscono poche prove di supporto.
3. **Utilizzare l'esportazione dell'inferenza.** Un `.pth` pronto all'uso e un checkpoint di training possono avere la stessa estensione. Seleziona il file identificato dall'editore come modello di inferenza. Un ZIP è un contenitore per i file ed è direttamente importabile solo se l'app supporta l'importazione ZIP.
4. **Associa i dati di recupero al relativo checkpoint.** Un `.index` creato per un'altra voce o incorporamento può fallire o peggiorare il risultato. Mantieni insieme il modello e il suo indice e verifica che l'app abbia selezionato la coppia prevista. Se disponi solo di un modello compatibile, utilizza il flusso di lavoro senza recupero supportato dal tuo cliente.
5. **Prova un file breve.** Prova una clip pulita con le impostazioni predefinite. Un modello caricato può comunque suonare in modo errato se il runtime utilizza l'estrattore di funzionalità sbagliato o se l'input è molto al di fuori della portata della voce.


!!!warning File di modello attendibili
Ottieni i file del modello dall'editore originale o da un'altra fonte di cui ti fidi. Il caricamento di un checkpoint PyTorch può comportare la deserializzazione di oggetti Python. Mantieni abilitate le protezioni nel tuo caricatore e richiedi un'esportazione supportata se rifiuta un file. [Riferimento caricamento PyTorch](https://docs.pytorch.org/docs/stable/generated/torch.load.html)
!!!

## Giudica il risultato con un test ripetibile

Conserva una clip di riferimento asciutta e usa quella stessa clip per ogni confronto. Includi una frase tranquilla, una frase con consonanti acute e una vocale sostenuta. Mantieni i livelli di riproduzione simili in modo che il volume da solo non faccia sembrare migliore un'uscita.

1. Visualizza una prova di riferimento utilizzando le impostazioni predefinite dell'app.
2. Controlla prima la chiarezza delle parole. Se sia la clip originale che quella convertita sono difficili da comprendere, registra nuovamente la sorgente.
3. Per l'oscillazione del tono, confrontare due predittori del tono supportati prima di modificare il recupero.
4. Per un problema di timbro o struttura, confrontare con recupero disabilitato, quindi regolare il tasso di indice se l'indice corrispondente aiuta.
5. Salva le impostazioni di lavoro con il nome del modello, la versione e l'input. Quando un aggiornamento successivo modifica il suono, quelle note ti danno un punto di partenza.

[Inizia con Ilaria RVC](getting-started.md) · [Modelli e file RVC](models.md) · [Conversione vocale in tempo reale](../conversion/real-time.md)
