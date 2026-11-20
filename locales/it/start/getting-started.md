---
label: "🚀 Iniziare"
order: 95
permalink: /getting-started/
description: "Puoi usare Ilaria RVC anche su Kaggle con la GPU remota, anche se il tuo computer ha una GPU AMD, Intel, integrata o poco potente. Ilaria RVC on Kaggle"
---
# Iniziare

[Scarica Ilaria RVC 2.4.0 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Puoi usare Ilaria RVC anche su Kaggle con la GPU remota, anche se il tuo computer ha una GPU AMD, Intel, integrata o poco potente. [Ilaria RVC on Kaggle](../ilaria-rvc/cloud/kaggle.md)

Per le procedure complete di installazione, configurazione e risoluzione dei problemi, consulta le [guide passo passo per app](../other-rvcs/app-guides.md).

## Ilaria RVC

1. Ottieni il pacchetto Windows dal [repository Ilaria's Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC). Controlla le istruzioni per la tua versione prima di aggiornare il tuo driver NVIDIA o modificare le dipendenze.
2. Estrai il pacchetto completo in una cartella scrivibile. Esegui il programma di avvio da quella cartella, in modo che possa trovare il runtime in bundle e gli strumenti audio.
3. Apri `RUN_ILARIA_RVC.bat`. Se l'avvio fallisce, chiudi il tentativo e usa `RUN_ILARIA_RVC_LOGS.bat` per vedere la console.
4. Se l'interfaccia non si apre automaticamente, utilizzare [http://127.0.0.1:6969](http://127.0.0.1:6969) sullo stesso PC. Mantieni il launcher in esecuzione mentre lavori.

### Converti un primo clip

1. Importa un modello compatibile da **Altro**. Mantieni il suo indice di corrispondenza opzionale con il checkpoint.
2. Apri **Single Inference**, seleziona il tuo modello e aggiungi una registrazione vocale breve e asciutta.
3. Inizia con l'estrattore di tonalità predefinito. Imposta lo spostamento del tono e il **Rapporto indice** su zero per una prova di riferimento.
4. Converti la clip e ascolta l'inizio, la frase più forte e le eventuali consonanti che suonano più deboli rispetto all'originale.
5. Esporta un riferimento WAV. Segui [Conversione vocale](../conversion/voice-conversion.md) per confrontare impostazioni alternative sulla stessa sorgente.

### Aggiorna e fai il backup

Per un'installazione esistente, usa **Altro → Aggiorna Ilaria RVC** e leggi le note di rilascio prima di applicare l'aggiornamento. Salva una copia dei tuoi set di dati, modelli esportati, checkpoint di formazione e audio convertito prima di cambiare versione. Mantieni i checkpoint di formazione separati dai modelli di inferenza che utilizzi o condividi.

Utilizza le registrazioni e i modelli vocali per i quali sei autorizzato a utilizzare. Per demo e disponibilità dei modelli, consultare il [catalogo](https://ilariarvc.shop/en/demos/).

[Fonte di Ilaria RVC e note di installazione](https://github.com/TheStingerX/Ilaria-RVC) · [Note di rilascio](https://github.com/TheStingerX/Ilaria-RVC/blob/main/docs/CHANGELOG.md)


## Vonovox

> **Ultima versione (beta)** · [Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

1. Su Windows con NVIDIA, scarica l'archivio per la generazione della tua GPU da [Vonovox on Hugging Face](https://huggingface.co/dr87/vonovox/tree/main). Estrai il pacchetto completo e avvia l'app inclusa.
2. Carica un modello RVC V2 e seleziona il microfono e le cuffie nelle impostazioni del dispositivo audio.
3. Avvia la conversione con il buffer predefinito e pronuncia una breve frase. Verificare che il monitor suoni bene prima di [indirizzarlo a un'altra app](../conversion/real-time.md).

## w-okada VCClient

1. Ottieni un pacchetto per la tua piattaforma e il tuo backend da [VCClient su Hugging Face](https://huggingface.co/wok000/vcclient000/tree/main). Verifica che supporti RVC e il formato del tuo modello. L'hardware supportato può differire tra i modelli PyTorch e ONNX.
2. Estrai la versione e avvia il server o il launcher in bundle. Apri il client dall'indirizzo locale mostrato all'avvio se non si apre automaticamente.
3. Importa la voce in uno slot del modello, seleziona quello slot e imposta i dispositivi di input e monitoraggio. Avvia la conversione e ascolta in cuffia prima di collegare l'uscita a una chiamata.

## Forcella sviluppata da Okada TG

1. Scegli un pacchetto da [TGR release](https://github.com/tg-develop/voice-changer/releases). Su Windows, utilizza CUDA per una scheda NVIDIA supportata o la build DirectML per una GPU AMD o Intel supportata.
2. Avvia la build estratta, seleziona il dispositivo di elaborazione corrispondente e importa la voce in uno slot RVC.
3. Imposta il microfono e il monitor delle cuffie, quindi esegui il test sul buffer predefinito. Scegli un estrattore di tono disponibile nella tua build quando ricrei un preset da un altro backend.

## RVC GUI

1. Scarica il pacchetto desktop da [RVC GUI release](https://github.com/Tiger14n/RVC-GUI/releases). Questa app archiviata è destinata a configurazioni legacy compatibili.
2. Estrai e avvia l'app. Importare un ZIP contenente il checkpoint di inferenza e il relativo indice corrispondente, se fornito, quindi selezionare la voce importata.
3. Scegli una breve registrazione vocale, inizia da zero semitoni e converti. Ascolta il risultato e salva una copia di riferimento.

## Applio

1. Scarica il programma di installazione o il pacchetto per la tua piattaforma da [Applio downloads](https://applio.org/). In Desktop, completa la configurazione del motore e conferma il dispositivo di elaborazione. Per una build Gradio in pacchetto, estrai l'archivio completo, avvia il programma di avvio e apri il suo indirizzo locale.
2. Aggiungi una voce alla libreria dei modelli e apri **Converti audio**. Nelle versioni precedenti di Gradio la scheda potrebbe essere chiamata **Inferenza**.
3. Seleziona il modello, l'embedder corrispondente e l'indice opzionale, quindi converti un WAV breve e pulito con intonazione a zero. Continuare con il [flusso di lavoro di conversione di Applio](../conversion/voice-conversion.md#convert-a-recording-in-applio) per esempi di batch e impostazioni.

## RVC WebUI (Mainline - Original RVC)

1. Scegli un pacchetto compatibile dalle [versioni RVC WebUI (Mainline - Original RVC)](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/releases). Per un pacchetto Windows che lo include, estrai l'archivio ed esegui `go-web.bat`. Mantieni la console aperta durante l'utilizzo della WebUI.
2. Inserisci il checkpoint di inferenza in `assets/weights` e il suo indice di recupero corrispondente in `logs`. Aggiorna gli elenchi e seleziona la tua voce.
3. Inserisci il percorso completo di un breve file audio, mantieni il tono a zero e fai clic su **Converti**. Utilizza il controllo di download del lettore di output per salvarlo. Consulta il [Flusso di lavoro di conversione principale](../conversion/voice-conversion.md#convert-a-recording-in-mainline-rvc) per ulteriori controlli.

## Redpanda-vc

1. Scarica [Redpanda-vc](https://github.com/redpanda343/Redpanda-vc) e avvia la WebUI con una build adatta al tuo sistema. Il progetto fornisce un'opzione contenitore CUDA per NVIDIA.
2. Seleziona il motore RVC e carica una voce RVC compatibile con il suo indice opzionale. Redpanda-vc offre anche altre famiglie di modelli, ciascuna con il proprio formato di modello.
3. Per un test del microfono del browser, consenti l'accesso al microfono, scegli la GPU desiderata se le impostazioni dello streaming espongono la selezione del dispositivo e avvia lo streaming. Verificare il monitor delle cuffie sul buffer predefinito prima di ridurre la latenza.

Per un confronto affiancato, vedere [Strumenti RVC](../reference/tools.md). Per routing, latenza e interruzioni del microfono, vedere [Conversione vocale in tempo reale](../conversion/real-time.md).

## RVC Blue

Conversione vocale in tempo reale su Windows. [Installazione e configurazione](../other-rvcs/rvc-blue/installation.md).
