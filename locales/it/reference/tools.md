---
permalink: /tools/
label: "🧰 Strumenti RVC"
order: 95
description: "Confronta app compatibili per la conversione vocale dal vivo, la conversione di file e la formazione."
---

# Scegli un'app RVC

Puoi usare Ilaria RVC anche su Kaggle con la GPU remota, anche se il tuo computer ha una GPU AMD, Intel, integrata o poco potente. [Ilaria RVC on Kaggle](../ilaria-rvc/kaggle.md)

Per le procedure complete di installazione, configurazione e risoluzione dei problemi, consulta le [guide passo passo per app](../other-rvcs/app-guides.md).

Inizia con quello che vuoi fare. Un **cambia voce dal vivo** elabora un flusso del microfono mentre parli. Un **convertitore di file** elabora una registrazione e salva l'output per la modifica o l'esportazione. Un **formatore** trasforma un set di dati delle registrazioni di un relatore in un modello. Alcune app offrono tutti e tre i flussi di lavoro. La build installata determina quale hardware grafico e formati di modello è possibile utilizzare.

 | App | Quando usarla | Hardware e note di build |
| --- | --- | --- |
 | Vonovox | Consigliato per RVC v2 live su Windows con NVIDIA | Solo NVIDIA CUDA. Abbina il pacchetto Hugging Face alla tua generazione di GPU. |
 | w-okada VCClient | Conversione live su diversi sistemi operativi | Windows CUDA e pacchetti standard, inclusi DirectML o CPU, ove supportati. Percorsi di installazione separati di Apple Silicon e Linux. |
 | Okada TG Developed Fork | RVC live con opzioni documentate per utenti AMD, Intel e CPU | Windows CUDA o DirectML. Le build Linux e macOS sperimentali hanno istruzioni separate. |
 | Ilaria RVC | Conversione file, TTS, formazione e analisi audio | L'attuale distribuzione Windows è solo NVIDIA. |
 | GUI RVC | Semplice conversione di file locali nell'interfaccia desktop legacy | Archiviato. Il progetto documenta Windows NVIDIA CUDA e una soluzione alternativa storica di Apple Silicon. |
 | Applio | Conversione di file, formazione e tempo reale in un'unica app | La documentazione del desktop elenca NVIDIA CUDA, configurazioni AMD supportate e Apple MPS. La disponibilità dipende dall'edizione e dal motore. |
 | RVC WebUI | Formazione e inferenza upstream, con un launcher in tempo reale separato | NVIDIA CUDA su Windows e Ubuntu. La configurazione della CPU upstream copre i sistemi AMD e Intel, con possibile utilizzo di DirectML su Windows. |
 | Redpanda-vc | Un fork di Applio per sperimentare più motori di conversione vocale | Il repository include un contenitore CUDA e documenta la selezione della GPU per i flussi WebUI. Controlla il motore selezionato e crea per altri backend. |

## Vonovox (consigliato per l'uso live con NVIDIA)

> **Ultima versione (beta)** · [Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

Vonovox è un cambia voce in tempo reale di Windows che carica i modelli RVC v2 e utilizza NVIDIA CUDA. Sceglilo se il tuo obiettivo principale è la conversione del microfono e hai una scheda NVIDIA supportata. L'elenco dei pacchetti include build e patch per generazioni di GPU specifiche, quindi controlla i nomi dei file e le istruzioni di rilascio prima di scegliere un archivio. Utilizza il repository Hugging Face dell'editore per i download. [Download ufficiali di Vonovox](https://huggingface.co/dr87/vonovox/tree/main) · [Note sull'hardware e sulla configurazione di Vonovox](https://github.com/dr87/Vonovox/blob/main/README.md)

Per una prima esecuzione, carica la tua voce RVC v2 e ascolta un breve test del microfono prima di indirizzare l'audio a un'altra app. Quindi ridurre gradualmente la dimensione del blocco mentre si parla normalmente. Ripristina l'impostazione precedente se senti interruzioni o sillabe spezzate. Esegui nuovamente il test insieme al gioco o all'app di streaming che prevedi di utilizzare, perché entrambi condividono la stessa GPU. [Configurazione audio Vonovox](https://github.com/dr87/Vonovox/blob/main/README.md)

## w-okada VCClient

VCClient gestisce la conversione vocale dal vivo con un client e un server. Puoi eseguirli insieme su un computer o posizionare il server su un secondo computer per spostare il carico di lavoro di conversione lontano dal computer principale. Seleziona una versione che supporti il ​​modello RVC che desideri caricare. I download gestiti si trovano su Hugging Face e il README inglese del progetto spiega le opzioni standard di Windows, Windows CUDA, Apple Silicon e Linux. [LEGGIMI inglese di VCClient](https://github.com/w-okada/voice-changer/blob/master/README_en.md) · [Download ufficiali di VCClient](https://huggingface.co/wok000/vcclient000/tree/main)

Controlla il formato del modello e l'acceleratore. Ad esempio, le vecchie istruzioni Windows v1 del progetto limitano l'accelerazione GPU AMD e Intel ai modelli ONNX. Un file PyTorch `.pth` e un file esportato `.onnx` possono avere percorsi hardware diversi nella stessa app. Lo standard di Windows v2 documenta le opzioni DirectML e CPU. [Note sulla build di VCClient e sul formato del modello](https://github.com/w-okada/voice-changer/blob/master/README_en.md)

## Okada TG Developed Fork (TGR)

Il progetto `tg-develop/voice-changer` è un fork della comunità nella famiglia w-okada tramite il fork deiteris. Si concentra su RVC live e documenta build Windows separate per NVIDIA CUDA e DirectML su hardware AMD o Intel compatibile. La sua documentazione copre anche l'uso della CPU, Linux e le build sperimentali di macOS per Apple Silicon e Intel. [Configurazione TGR e requisiti di sistema](https://github.com/tg-develop/voice-changer) · [Versioni TGR](https://github.com/tg-develop/voice-changer/releases)

Su Windows, utilizza le istruzioni per la build scaricata. La build DirectML espone un elenco diverso di estrattori di tonalità rispetto alla build NVIDIA, quindi le preimpostazioni dell'edizione CUDA potrebbero richiedere modifiche. Confronta la stabilità audio con le tue solite app in esecuzione prima di affidarti alla configurazione per una registrazione o uno streaming.

## Ilaria RVC

Il pacchetto Windows attuale è solo NVIDIA. Usalo quando desideri passare dalla conversione delle registrazioni, alla generazione del parlato, all'addestramento, al controllo dei metadati di un modello e all'ispezione di forme d'onda o spettrogrammi nell'Analizzatore audio. Le installazioni esistenti possono verificare la presenza di aggiornamenti in **Altro → Aggiorna Ilaria RVC**. [Download di Ilaria RVC](https://huggingface.co/TheStinger/Ilaria_RVC) · [README del progetto e note di rilascio](https://github.com/TheStingerX/Ilaria-RVC)

## GUI RVC

La GUI RVC di Tiger14n è un'interfaccia desktop autonoma per la conversione di file audio. Può importare un ZIP contenente l'inferenza `.pth` e la sua corrispondenza `.index` quando disponibile. Il suo repository è archiviato, quindi utilizza le sue istruzioni per un flusso di lavoro che richiede specificamente questa app. La **Real-time GUI** del progetto RVC upstream dal nome simile è un launcher separato. [Repository e configurazione della GUI RVC](https://github.com/Tiger14n/RVC-GUI)

## Applio

Applio supporta la gestione del modello vocale RVC, la conversione dei file, la formazione e il tempo reale. Le sue edizioni Desktop e Python/Gradio hanno flussi di configurazione diversi. La documentazione desktop identifica NVIDIA CUDA, le configurazioni AMD supportate e Apple MPS e spiega come controllare lo stato del motore dopo l'installazione. Utilizza i [passaggi di conversione di Applio](../conversion/voice-conversion.md#convert-a-recording-in-applio) per la tua edizione.

## RVC WebUI

WebUI basato sul recupero della conversione vocale è il progetto RVC upstream. La sua WebUI gestisce l'addestramento e l'inferenza dei file. La GUI in tempo reale del progetto ha il proprio launcher. Il ramo principale documenta le dipendenze CUDA separate per le schede NVIDIA più recenti e quelle meno recenti, oltre a un set di dipendenze CPU per i sistemi AMD e Intel. Su Windows, DirectML potrebbe essere disponibile per le operazioni supportate. Seguire i [Passaggi di conversione della linea principale](../conversion/voice-conversion.md#convert-a-recording-in-mainline-rvc) per il pacchetto Windows.

## Redpanda-vc

Redpanda-vc è un fork di Applio la cui interfaccia in tempo reale supporta RVC, Beatrice e Rectified Flow. Offre più famiglie di modelli, quindi seleziona il flusso di lavoro RVC per una voce RVC. Nella modalità in tempo reale del browser, il progetto documenta l'assegnazione dei flussi a particolari GPU e nota che Beatrice viene eseguita sulla CPU. Queste scelte di risorse si applicano a Redpanda-vc e al suo motore selezionato. [Repository Redpanda-vc e motori supportati](https://github.com/redpanda343/Redpanda-vc)

## Confronta le app con la stessa voce

1. Scegli il pacchetto per il tuo sistema operativo, GPU e formato del modello. Controlla se l'app supporta la generazione RVC e il codificatore di funzionalità del tuo modello.
2. Inizia con la stessa breve registrazione o ripeti le stesse poche frasi nel microfono. Carica lo stesso modello di inferenza e il relativo indice corrispondente in entrambe le app, se supportato.
3. Usa lo stesso pitch shift e disattiva gli effetti vocali opzionali per il primo confronto. Giudica le parole chiare, l'intonazione stabile e le pause naturali prima di regolare il suono.
4. Per l'utilizzo dal vivo, esegui il gioco, la chiamata o l'app di streaming che usi normalmente e registra l'output instradato per almeno un minuto. Ascolta eventuali lacune, tagli netti e audio ritardato prima di ridurre il buffer.
