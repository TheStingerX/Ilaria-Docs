---
label: "🧪 Addestra e testa un modello"
order: 94
permalink: /ilaria-rvc/applio/training/
---
# Addestra, valuta ed esporta una voce in Applio

Una prima esecuzione dimostra che le registrazioni, la configurazione e l'hardware possono produrre un modello utilizzabile per la conversione. Lavora su copie di registrazioni che hai il permesso di usare. Mantieni due o tre frasi fuori dalla cartella di addestramento in modo da poter controllare il comportamento sulle registrazioni che il modello non ha mai visto.

## Prepara gli input

1. Crea un nome esperimento breve e riconoscibile come `speaking_trial_01`. Dai un nome distinto a ogni prova, così da ritrovare i checkpoint in seguito.
2. Controlla le registrazioni a orecchio all'inizio, al centro e alla fine. Rimuovi clip con altre voci, musica, clipping o lunghe sezioni silenziose. Se Desktop dispone di strumenti di revisione dei set di dati, ispeziona le clip contrassegnate e prepara lì una copia per l'addestramento. La rimozione del silenzio e la regolazione del livello non possono riparare la distorsione udibile.
3. Seleziona il set di dati copiato in **Training**. Se Gradio richiede un percorso per la cartella, utilizzane uno sulla macchina su cui è in esecuzione il motore. Per un addestramento multivoce supportato dalla versione, conserva cartelle numeriche come `0` e `1` e registra quale persona rappresenta ciascun ID.
4. Scegli un vocoder e una frequenza di campionamento supportati insieme. Se usi pesi preaddestrati, scegli una coppia generatore/discriminatore compatibile. Controlla la frequenza di campionamento, la guida tramite pitch, l'architettura e i requisiti dell'autore per l'embedder. Registra l'embedder esatto e tutti i file personalizzati per un'inferenza successiva.
5. Scegli una dimensione batch adatta alla memoria della GPU e salva alcune esportazioni intermedie. Scegli un numero iniziale di epoche per provare la procedura. Aumentalo solo se migliori i risultati sulle registrazioni tenute da parte.

## Esegui le fasi

In Desktop, puoi scegliere **Automatic Training** dopo aver esaminato il set di dati, la configurazione del modello, le epoche e le impostazioni di salvataggio. Avvia l'operazione una volta e controlla il registro. Per il controllo separato di ciascuna fase, utilizzare **Manual Training Setup**. Gradio espone i passaggi corrispondenti nel suo area **Training**.

| Fase | Cosa succede | Cosa confermare prima di continuare |
| --- | --- | --- |
| Preprocess | Applio legge il set di dati, prepara clip e ricampiona alla frequenza scelta. | Il registro mostra l'audio utilizzabile dalla cartella prevista. Se la tua build offre la normalizzazione **Post**, regola i livelli di ogni segmento dopo che il programma ha diviso l'audio. Usalo solo quando vuoi quel trattamento. |
| Extract | Applio crea le caratteristiche del contenuto audio e tutte le informazioni sull'intonazione necessarie alla configurazione. | Verifica che sia stato caricato l'embedder scelto e che l'estrazione sia terminata. Se cambi embedder, ripeti l'estrazione. |
| Train | L'esperimento apprende le caratteristiche della voce da tali caratteristiche. | Vengono visualizzati l'avanzamento delle epoche e il checkpoint configurato o i file di esportazione. In caso di errori di memoria insufficiente, ferma le altre attività che usano la GPU, riduci le dimensioni del batch e valuta la possibilità di disabilitare la memorizzazione nella cache del set di dati. |
| Generate Index | Applio crea dati di recupero opzionali dall'esperimento. | Conserva l'indice generato con l'esportazione corrispondente. Se hai scelto di saltare questa fase, lascia disattivato il recupero tramite indice durante il test. |

Quando una fase fallisce, copia il suo primo errore e conferma i suoi input prima di eseguirla nuovamente. Se le registrazioni, la frequenza di campionamento o l'architettura cambiano sostanzialmente, un nuovo esperimento aiuta a tenere separati i file incompatibili. Ferma **Realtime** prima di avviare l'addestramento su GPU in Desktop.

## Confronta i checkpoint sull'audio di prova

Apri **Models → Export** nel Desktop o trova il pulsante di esportazione nell'area di addestramento in Gradio. Salva un modello `.pth` per l'inferenza da un checkpoint intermedio e uno successivo, più l'indice se generato. Per ogni esportazione, converti le stesse frasi tenute da parte, usando sempre lo stesso Speaker ID, embedder, pitch e volume. Ascolta l'intelligibilità, la coerenza della voce sulle sillabe deboli e forti e gli artefatti sui respiri. Le metriche di addestramento aiutano a individuare problemi come un avanzamento bloccato. Ascoltare aiuta a decidere quale esportazione mantenere.

## Riprendi senza ricostruire l'esperimento

Conserva la directory dell'esperimento insieme ai file di preelaborazione, alle feature estratte e ai checkpoint di addestramento `G_*.pth` e `D_*.pth`. Quando riprendi, mantieni lo stesso nome, la stessa architettura, la frequenza di campionamento e l'embedder. Scegli un numero **totale** di epoche superiore a quello già completato. In Desktop, lascia disattivato **Fresh Training**. Controlla le prime righe del registro per vedere quale checkpoint è stato caricato e fermati se l'addestramento riparte da zero. Usa il modello per l'inferenza nel convertitore. Per riprendere l'addestramento serve lo stato salvato dell'esperimento.
