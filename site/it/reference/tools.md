# Scegli un'app RVC

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Puoi usare Ilaria RVC anche su Kaggle con la GPU remota, anche se il tuo computer ha una GPU AMD, Intel, integrata o poco potente. [Ilaria RVC on Kaggle](../ilaria-rvc/cloud/kaggle.md)

Per le procedure complete di installazione, configurazione e risoluzione dei problemi, consulta le [guide passo passo per app](../other-rvcs/app-guides.md).

Inizia con quello che vuoi fare. Un **cambia voce dal vivo** elabora un flusso del microfono mentre parli. Un **convertitore di file** elabora una registrazione e salva l'output per la modifica o l'esportazione. Un **formatore** trasforma un set di dati delle registrazioni di un relatore in un modello. Alcune app offrono tutti e tre i flussi di lavoro. La build installata determina quale hardware grafico e formati di modello è possibile utilizzare.

///region app-comparison
| App | Training | Inference (file) | Realtime | Link del progetto |
| --- | --- | --- | --- | --- |
| [Ilaria RVC](../ilaria-rvc/install/installation.md) | Sì | Sì | No | [GitHub](https://github.com/TheStingerX/Ilaria-RVC) · [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC) |
| [RVC WebUI (Mainline - Original RVC)](../other-rvcs/mainline/installation.md) | Sì | Sì | Sì · Launcher separato | [GitHub](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI) |
| [Applio](../other-rvcs/applio/installation.md) | Sì | Sì | Sì | [GitHub](https://github.com/IAHispano/Applio) · [Hugging Face](https://huggingface.co/IAHispano/Applio) |
| [Redpanda-vc](../other-rvcs/redpanda/first-run.md) | Sì | Sì | Sì | [GitHub](https://github.com/redpanda343/Redpanda-vc) · [Release precompilata per Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) |
| [RVC GUI](../other-rvcs/rvc-gui/file-conversion.md) | No | Sì | No | [GitHub](https://github.com/Tiger14n/RVC-GUI) |
| [Vonovox](../other-rvcs/vonovox/installation.md) | No | No | Sì | [GitHub](https://github.com/dr87/Vonovox) · [Hugging Face](https://huggingface.co/dr87/vonovox) |
| [w-okada VCClient](../other-rvcs/okada/installation.md) | No | No | Sì | [GitHub](https://github.com/w-okada/voice-changer) · [Hugging Face](https://huggingface.co/wok000/vcclient000) |
| [Okada TG Developed Fork](../other-rvcs/tgr/installation.md) | No | No | Sì | [GitHub](https://github.com/tg-develop/voice-changer) |
| [RVC Blue](../other-rvcs/rvc-blue/installation.md) | No | File in tempo reale | Sì | [GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI) |
| [Replay](../reference/tools.md#replay) | Sì | Sì · versione storica | No | [Sito ufficiale](https://www.weights.com/replay) · [Internet Archive](https://archive.org/details/replay-8.7.0-installers) |

 | App | Quando usarla | Hardware e note di build |
| --- | --- | --- |
| [Ilaria RVC](../ilaria-rvc/install/installation.md) | Conversione file, TTS, formazione e analisi audio | L'attuale distribuzione Windows è solo NVIDIA. |
| [RVC WebUI (Mainline - Original RVC)](../other-rvcs/mainline/installation.md) | Formazione e inferenza upstream, con un launcher in tempo reale separato | NVIDIA CUDA su Windows e Ubuntu. La configurazione della CPU upstream copre i sistemi AMD e Intel, con possibile utilizzo di DirectML su Windows. |
| [Applio](../other-rvcs/applio/installation.md) | Conversione di file, formazione e tempo reale in un'unica app | La documentazione del desktop elenca NVIDIA CUDA, configurazioni AMD supportate e Apple MPS. La disponibilità dipende dall'edizione e dal motore. |
| [Redpanda-vc](../other-rvcs/redpanda/first-run.md) | RVC + Casual Voice Changer · Tauri / WebUI | NVIDIA CUDA / CPU · [Release precompilata per Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) |
| [RVC GUI](../other-rvcs/rvc-gui/file-conversion.md) | Semplice conversione di file locali nell'interfaccia desktop legacy | Archiviato. Il progetto documenta Windows NVIDIA CUDA e una soluzione alternativa storica di Apple Silicon. |
| [Vonovox](../other-rvcs/vonovox/installation.md) | Consigliato per RVC v2 live su Windows con NVIDIA | Solo NVIDIA CUDA. Abbina il pacchetto Hugging Face alla tua generazione di GPU. |
| [w-okada VCClient](../other-rvcs/okada/installation.md) | Conversione live su diversi sistemi operativi | Windows CUDA e pacchetti standard, inclusi DirectML o CPU, ove supportati. Percorsi di installazione separati di Apple Silicon e Linux. |
| [Okada TG Developed Fork](../other-rvcs/tgr/installation.md) | RVC live con opzioni documentate per utenti AMD, Intel e CPU | Windows CUDA o DirectML. Le build Linux e macOS sperimentali hanno istruzioni separate. |
| [RVC Blue](../other-rvcs/rvc-blue/installation.md) | Conversione vocale in tempo reale su Windows | NVIDIA CUDA 12.8 / 11.8 (Windows) |
| [Replay](../reference/tools.md#replay) | Addestramento di modelli e conversione di file · sconsigliato | [Installer archiviati](https://archive.org/details/replay-8.7.0-installers) |
///endregion

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

## RVC WebUI (Mainline - Original RVC)

WebUI basato sul recupero della conversione vocale è il progetto RVC upstream. La sua WebUI gestisce l'addestramento e l'inferenza dei file. La GUI in tempo reale del progetto ha il proprio launcher. Il ramo principale documenta le dipendenze CUDA separate per le schede NVIDIA più recenti e quelle meno recenti, oltre a un set di dipendenze CPU per i sistemi AMD e Intel. Su Windows, DirectML potrebbe essere disponibile per le operazioni supportate. Seguire i [Passaggi di conversione della linea principale](../conversion/voice-conversion.md#convert-a-recording-in-mainline-rvc) per il pacchetto Windows.

## Redpanda-vc

Redpanda VC offre training, inferenza da file e conversione in tempo reale per RVC e Casual Voice Changer, nell’app desktop e nella WebUI. Usa `.pth` con RVC e `.cvc` con CVC. [Release precompilata per Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release)

## Confronta le app con la stessa voce

1. Scegli il pacchetto per il tuo sistema operativo, GPU e formato del modello. Controlla se l'app supporta la generazione RVC e il codificatore di funzionalità del tuo modello.
2. Inizia con la stessa breve registrazione o ripeti le stesse poche frasi nel microfono. Carica lo stesso modello di inferenza e il relativo indice corrispondente in entrambe le app, se supportato.
3. Usa lo stesso pitch shift e disattiva gli effetti vocali opzionali per il primo confronto. Giudica le parole chiare, l'intonazione stabile e le pause naturali prima di regolare il suono.
4. Per l'utilizzo dal vivo, esegui il gioco, la chiamata o l'app di streaming che usi normalmente e registra l'output instradato per almeno un minuto. Ascolta eventuali lacune, tagli netti e audio ritardato prima di ridurre il buffer.

## Replay

[Sito ufficiale](https://www.weights.com/replay) · [Internet Archive](https://archive.org/details/replay-8.7.0-installers)

Dopo la chiusura di Weights.gg, Replay non riceve più supporto né aggiornamenti. La [pagina ufficiale di Replay](https://www.weights.com/replay) potrebbe essere rimossa in qualsiasi momento. Internet Archive conserva gli installer storici di Replay 8.7.0. L’uso di Replay è sconsigliato per nuove installazioni. Con la chiusura di Weights, è probabile che l'installer archiviato non riesca a scaricare i file necessari e che l'installazione non vada a buon fine.

[Installer archiviati · Replay 8.7.0](https://archive.org/details/replay-8.7.0-installers)
## Matrice estesa: Piattaforme, Formati, Licenze e Stato

> **Dichiarato vs. Testato:** Solo **Ilaria RVC** (verificata su RTX 4070) ha note di verifica diretta; le capacità delle altre app riflettono la documentazione ufficiale dei rispettivi progetti a novembre 2026.

| App | OS | GPU / CPU | Formati | TTS | Stato e Licenza | Facilità |
| --- | --- | --- | --- | --- | --- | --- |
| **Ilaria RVC** | Windows (locale), Linux (Cloud) | NVIDIA CUDA (`12.8` / `12.6` legacy) | `.pth`, `.index`, `.safetensors` (converter) | Sì (Kokoro / Edge) | **Attivo** (MIT / basato su RVC) | Facile (ZIP portatile) |
| **Vonovox** | Windows | NVIDIA CUDA | RVC v2 `.pth`, `.index` | No | **Beta** (`2.0.0 Beta 3`) | Facile (ZIP per GPU) |
| **Applio** | Windows, Linux, macOS (MPS) | NVIDIA, AMD (doc.), Apple MPS, CPU | `.pth`, `.index`, `.onnx` (export) | Sì | **Attivo** (MIT) | Facile-Media (Installer / Python) |
| **w-okada VCClient** | Windows, macOS, Linux | NVIDIA, DirectML (AMD/Intel), MPS, CPU | `.pth`, `.onnx` | No | **Attivo / Mantenuto** (MIT) | Media (dipende dall'edizione) |
| **Okada TG Developed Fork** | Windows, Linux, macOS (sper.) | NVIDIA CUDA, DirectML (AMD/Intel), CPU | `.pth`, `.onnx` | No | **Fork attivo** | Media (ZIP / Build) |
| **Deiteris w-okada Fork** | Windows, Linux, macOS | NVIDIA CUDA, DirectML (AMD/Intel), CPU | `.pth`, `.onnx` | No | **Fork attivo** | Media (ZIP / Build) |
| **RVC WebUI (Mainline)** | Windows, Linux | NVIDIA CUDA, CPU / DirectML | `.pth`, `.index` | No | **Upstream / Lento** (MIT) | Media (ZIP / Git) |
| **RVC Blue** | Windows | NVIDIA CUDA (`12.8` / `11.8`) | `.pth`, `.index` | No | **Attivo** | Facile (ZIP portatile) |
| **Redpanda-vc** | Windows x64 · Linux (source) | NVIDIA CUDA / CPU | RVC, Casual Voice Changer | No | **Fork attivo** | Media |
| **RVC GUI** | Windows | NVIDIA CUDA (legacy) | `.pth`, `.index` | No | **Archiviato** | Facile (ZIP legacy) |
| **Replay** | Windows, macOS | NVIDIA / MPS / CPU (legacy) | `.pth` / Weights | No | **Dismesso** (Weights.gg chiuso) | Non funzionante / Solo legacy |
