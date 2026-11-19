---
label: "Installa e converti con la GUI RVC"
icon: ":control_knobs:"
order: 99
permalink: /ilaria-rvc/rvc-gui/file-conversion/
---
# Installa e converti con la GUI RVC

[GitHub](https://github.com/Tiger14n/RVC-GUI)

Questa guida copre l'app desktop archiviata di Tiger14n per la conversione di file audio. Prepara un checkpoint vocale e una breve registrazione WAV prima di iniziare.

## 1. Apri l'app Windows

1. Apri il [pacchetto Windows](https://github.com/Tiger14n/RVC-GUI/releases/tag/Windows-pkg). Scarica la risorsa compressa dalla versione ed estrai il contenuto in una cartella scrivibile. Mantieni il runtime e le risorse del modello nel layout estratto.
2. Apri il launcher incluso. È possibile avviare il checkout del codice sorgente con `RVC-GUI.bat` su Windows o `python rvcgui.py` una volta impostato il runtime. Il sorgente archiviato prevede un ambiente Python e PyTorch compatibile più `hubert_base.pt` nella radice del progetto. Utilizza un ambiente separato se stai testando il sorgente in modo che altre installazioni RVC mantengano le loro dipendenze.
3. Se l'app in pacchetto si chiude immediatamente, esegui il programma di avvio da un terminale aperto e leggi il primo errore. Un archivio che contiene solo file di origine non avrà il runtime in pacchetto. Se l'errore nomina HuBERT in un'installazione di origine, posiziona il [HuBERTweights](https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/hubert_base.pt) del progetto nella radice del progetto.

> I checkpoint HuBERT generici sono sconsigliati come encoder predefinito per la conversione vocale. Sono addestrati per rappresentare il parlato e possono conservare informazioni sul timbro di chi parla, che possono riaffiorare nell’audio convertito. In RVC usa l’encoder previsto dal modello, per esempio ContentVec se la voce è stata addestrata con quello.

## 2. Aggiungi una voce

Fare clic su **Importa modello da .zip** e selezionare uno ZIP contenente un'inferenza `.pth` e la sua corrispondenza `.index` se fornita. Per il posizionamento manuale, inserisci i file in una sottocartella per voce nella directory `models` dell'app. Ad esempio:

```text
models/
  MyVoice/
    MyVoice.pth
    MyVoice.index
```

Seleziona la voce importata nella GUI. Se è assente, riaprire l'elenco dei modelli o riavviare l'app dopo aver controllato la cartella. Utilizzare un modello di inferenza compatibile con la build archiviata. Un modello creato con un codificatore o un'architettura che la build non può caricare deve essere testato in un'app compatibile.

## 3. Converti una clip di base

1. In **Input audio file**, fai clic su **Sfoglia** e seleziona una registrazione vocale breve e asciutta con una vocale chiaramente espressa e una consonante. Utilizza un file WAV completo come base di riferimento; separare prima una radice vocale se la fonte è una canzone completa.
2. Seleziona la voce dai controlli del modello. Se il tuo modello dispone di diversi slot voce supportati, scegli lo slot documentato; altrimenti usa il valore predefinito.
3. Lascia **Pitch** su zero e imposta **Feature retrieval rate** su zero per la prova di riferimento. Lascia il **F0 method** come predefinito per questo test.
4. Fai clic una volta su **Converti** e attendi che **Percorso di output** mostri il file generato. Fai clic su **Apri** per riprodurlo e confrontarlo con l'originale a un volume simile. Copia il file generato con un nome distinto se desideri conservarlo per il confronto. Confronta la stessa frase prima di apportare un'altra modifica.
5. Se desideri un timbro più vicino alla voce del modello e hai l'indice corrispondente, prova una piccola intensità del recupero delle caratteristiche. Se le parole diventano meno chiare, ritorna alla prova di riferimento.

## Problemi comuni

| Cosa succede | Cosa controllare |
| --- | --- |
| Importa report pesi mancanti | Apri l'archivio e conferma che contiene un'inferenza `.pth` anziché solo audio, documentazione o un checkpoint di formazione. |
| Non appare alcun modello | Controlla il layout della cartella estratta e assicurati di aver aperto l'app dalla stessa installazione. |
| Voce errata o uscita metallica | Controllare il checkpoint selezionato, l'encoder compatibile, l'indice opzionale e la registrazione della sorgente. Utilizza una clip non elaborata con il recupero disattivato. |
| La conversione del file sembra interrompersi | Prova un breve WAV locale e controlla la console. Controlla il primo errore prima di riprovare un rendering lungo. |
| Le prestazioni sono scarse | Controlla quale dispositivo utilizza la build PyTorch installata. Per le piattaforme più vecchie o le funzionalità dei modelli più recenti, vedere il [Confronto degli strumenti RVC](../../reference/tools.md). |
