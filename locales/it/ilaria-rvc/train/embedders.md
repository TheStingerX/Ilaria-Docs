---
label: "Embedder e pretraining"
icon: ":jigsaw:"
order: 88
permalink: /ilaria-rvc/embedders/
description: "Apri Impostazioni incorporamento sotto Elaborazione audio. Legge automaticamente i metadati del modello archiviati e utilizza ContentVec quando non viene..."
---
# Embedder e pretraining

[Scarica Ilaria RVC 2.4.0 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

> **Novità della 2.3.0** · Portuguese HuBERT Base è un embedder opzionale per l’inferenza. Nel training RVC v2 puoi caricare e salvare un HuBERT personalizzato. L’app lo seleziona e ne riporta la configurazione nel modello esportato.

> **2.4.0** · Il pacchetto Windows sposta l’app e il runtime in app/ e i modelli vocali nella cartella models/ alla radice. Arrivano i notebook Colab e Lightning AI Studio, le indicazioni per scaricare gli embedder opzionali nel training e la coppia Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). Il runtime include pywin32 e corregge pip.

## Incorporatori di inferenza

Apri **Impostazioni incorporamento** sotto **Elaborazione audio**. Legge automaticamente i metadati del modello archiviati e utilizza ContentVec quando non viene registrato alcun incorporamento. Se l'editore specifica un codificatore, utilizza quel codificatore. Un indice di recupero necessita di funzionalità compatibili dello stesso esperimento. Lasciare il recupero disabilitato quando l'accoppiamento è incerto.

I codificatori di inferenza disponibili includono ContentVec, Spin, Spin-v2 e HuBERT Base cinese, giapponese e coreana. Apri **Altro → Scarica incorporatori** per installare i modelli opzionali uno alla volta. Per le risorse HuBERT personalizzate, seleziona **personalizzato**, assegna un nome alla cartella, fornisci i pesi e i file di configurazione corrispondenti (.bin e .json) e installali insieme.

> I checkpoint HuBERT generici sono sconsigliati come encoder predefinito per la conversione vocale. Sono addestrati per rappresentare il parlato e possono conservare informazioni sul timbro di chi parla, che possono riaffiorare nell’audio convertito. In RVC usa l’encoder previsto dal modello, per esempio ContentVec se la voce è stata addestrata con quello.

## Compatibilità formativa

La formazione espone ContentVec e Spin-v2. La modifica del codificatore richiede nuove funzionalità e un nome dell'esperimento separato. Abbina la coppia generatore e discriminatore al vocoder, alla frequenza di campionamento dell'addestramento, alla generazione RVC e alla configurazione dell'intonazione e segui i requisiti del codificatore dell'editore della coppia. Ilaria RVC 2.1.0 supporta l'allenamento RefineGAN specificamente a 32 kHz con RVC V2 e guida del tono. Il downloader potrebbe elencare altre tariffe da utilizzare altrove.

## Scarica una coppia G/D

In **Altro → Scarica modelli preaddestrati**, utilizza un repository o un archivio preaddestrato oppure inserisci un collegamento al checkpoint G e al checkpoint D corrispondente se la scoperta ha bisogno di aiuto. Il selettore **Preaddestrati consigliati** mostra le varianti del catalogo disponibili e le relative frequenze di campionamento. Controlla la variante scelta prima di installare entrambi i file. Torna a Formazione, aggiorna l'elenco e seleziona la coppia installata. Se si utilizza intenzionalmente l'inizializzazione casuale, scegliere Nessuna. Mantieni separati i modelli di inferenza e i pre-training di addestramento.

Se l'addestramento termina immediatamente dopo aver selezionato una coppia, verificare entrambi i file e la configurazione dell'esperimento salvata prima di modificare la dimensione del batch o avviare una nuova esecuzione.
