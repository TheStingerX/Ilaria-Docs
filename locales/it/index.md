---
label: "🏠 Home"
order: 100
---
# Documentazione di Ilaria RVC

<div class="docs-welcome" data-author-note="ilaria">

**Una nota da Ilaria, prima di iniziare**

Ciao, sono Ilaria. Ho scritto queste guide per condividere quello che ho imparato su RVC sviluppando Ilaria RVC, addestrando modelli vocali e provando altri programmi. Le spiegazioni e i consigli partono dalla mia esperienza e da quello che so al momento della scrittura. Posso interpretare male un’impostazione, trascurare un caso particolare o descrivere un passaggio che cambia in una versione successiva. Se trovi qualcosa di impreciso, può dipendere sia da un mio errore sia da un aggiornamento che ha reso la guida meno attuale.

Anche seguendo gli stessi passaggi, potresti ottenere un risultato diverso sul tuo computer. Per esempio, un aggiornamento può spostare un pulsante, una funzione può dipendere dalla scheda video o dai driver e un’impostazione che funziona bene con una voce può peggiorarne un’altra. Considera i valori che suggerisco come punti di partenza. Provali su una clip breve, cambia un’impostazione alla volta e confronta il risultato prima di applicarli a tutto il progetto. Se devi sostituire dei file o aggiornare un’installazione che funziona, tieni una copia da cui ripartire.

Se un passaggio non corrisponde a quello che vedi, controlla prima il nome del programma, la versione e l’eventuale messaggio di errore. Poi confronta le note di rilascio o le istruzioni per quella versione. Se vuoi segnalarmi un errore, indicami la pagina, il passaggio, la versione dell’app e cosa è successo. Con questi dettagli posso ripetere la prova e correggere la guida.

<div style="border-left:4px solid #FFC0CB;padding:.75rem 1rem;margin:1rem 0;background:#ffc0cb12;border-radius:.3rem">

Per problemi, suggerimenti o aggiornamenti, scrivimi su Discord.

[**Discord · thestingerx**](https://discord.com/users/740255187234717838)

</div>

&#45; Ilaria

</div>

<div class="docs-welcome">

**Ilaria RVC** è un'applicazione Windows per la conversione di registrazioni e l'addestramento di modelli vocali. La sua interfaccia si apre in un browser e il motore di conversione viene eseguito sul tuo computer. Il pacchetto Windows è creato per le GPU NVIDIA.

Se il tuo computer non ha una GPU NVIDIA adatta, puoi usare Ilaria RVC su Kaggle. Nelle impostazioni del notebook, attiva l’accesso a Internet e seleziona un acceleratore GPU. Scegli GPU T4 ×2 se disponibile. La GPU NVIDIA di Kaggle si occupa della conversione vocale e dell’addestramento dei modelli. Segui la [guida a Ilaria RVC su Kaggle](ilaria-rvc/cloud/kaggle.md) per configurare il notebook e salvare i risultati prima che la sessione termini.

> **Versione attuale** · **[Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)** · Il pacchetto completo per Windows è la versione 2.4.7. Per aggiornare dalla 2.4.2–2.5.0, vai su **Altro → Aggiorna Ilaria RVC → Controlla aggiornamenti → Scarica e riavvia**. Lo ZIP di aggiornamento esclude il runtime e i pesi dei modelli. [ZIP di aggiornamento Windows](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.5.1/ILARIA_RVC-update-2.5.1.zip?download=true)

> [Ilaria RVC 2.5.1 AMD Preview](ilaria-rvc/install/amd-preview.md) · AMD Preview è un pacchetto separato della 2.5.1 per le Radeon compatibili. Funziona su Windows 11 tramite WSL2 con Ubuntu 22.04 oppure su Ubuntu 22.04 nativo. Usa Python 3.10, PyTorch 2.6.0 e ROCm 6.4.2. Il pacchetto e il launcher sono stati controllati. Training completo, ripresa dai checkpoint e conversione vocale dall’inizio alla fine sono ancora da verificare su hardware Radeon.

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true) · [Sfoglia demo vocali](https://ilariarvc.shop/en/demos/) · [Leggi il changelog](ilaria-rvc/install/version-history.md)

</div>

## Inizia con la configurazione

### Windows con una GPU NVIDIA

Controlla il tuo modello esatto in [Compatibilità GPU](ilaria-rvc/install/gpu-compatibility.md), quindi segui [Installazione e aggiornamenti](ilaria-rvc/install/installation.md). Quando l'app si apre, utilizza un WAV breve e pulito e un modello di inferenza in [Single Inference](ilaria-rvc/convert/inference.md). L'indice corrispondente è facoltativo. Salva il primo output in modo da avere un riferimento prima di modificare gli effetti o l'intonazione.

### Un computer senza una GPU adatta

Usa la [procedura dettagliata di Kaggle](ilaria-rvc/cloud/kaggle.md) per eseguire Ilaria RVC su una GPU remota. Riguarda l'avvio del notebook, l'accesso all'interfaccia, l'esecuzione di un test e il download dei risultati prima del termine della sessione.

## Scegli il flusso di lavoro giusto

- **Ho una registrazione e voglio una voce diversa.** Usa [Controlli di inferenza](ilaria-rvc/convert/inference-buttons.md) per scegliere un modello, convertire il file e trovare l'audio esportato.
- **Ho del testo e desidero l'audio parlato.** Inizia con [Sintesi vocale](ilaria-rvc/convert/speech.md). Ascolta la voce di partenza prima di applicare un modello RVC in modo da poter correggere la pronuncia in anticipo.
- **Voglio creare il mio modello vocale.** Prepara le registrazioni che sei autorizzato a utilizzare, tieni da parte una breve clip per testarla, quindi segui [Addestramento passo dopo passo](ilaria-rvc/train/training-workflow.md). Utilizza il [Riferimento controlli allenamento](ilaria-rvc/train/training-buttons.md) quando hai bisogno di comprendere un'impostazione.
- **Voglio utilizzare un microfono convertito in una chiamata o in un gioco.** Scegli un'app in [Altri RVC](other-rvcs/app-guides.md), quindi segui [routing audio live](conversion/real-time.md) per testare il microfono, il convertitore e la destinazione in quest'ordine.

## Quando qualcosa va storto

Se l'app non si avvia, mantieni il log aperto e cerca il primo errore. Se l'app si avvia ma l'audio non sembra corretto, confronta lo stesso breve clip con l'elaborazione opzionale disattivata. La [guida alla risoluzione dei problemi](reference/troubleshooting.md) raggruppa le correzioni in base al sintomo. Il [glossario](reference/glossary.md) spiega termini come checkpoint, embedder e indice e [Altri controlli](ilaria-rvc/manage/other-buttons.md) mostra come ispezionare, importare ed esportare modelli.

 | Voglio… | Inizia da qui |
| --- | --- |
 | Esplora l'app Ilaria RVC nel dettaglio | [Panoramica app](ilaria-rvc/overview.md), [installazione](ilaria-rvc/install/installation.md), [inferenza](ilaria-rvc/convert/inference.md) e [procedura di addestramento](ilaria-rvc/train/training-workflow.md) |
 | Installa l'app e converti la mia prima clip | [Iniziare](start/getting-started.md) |
 | Comprendere come funziona RVC | [Fondamenti di RVC](start/rvc-fundamentals.md) e [modelli e file](start/models.md) |
 | Converti audio, confronta impostazioni o elabora una cartella | [Conversione vocale](conversion/voice-conversion.md) e [qualità audio](conversion/audio-quality.md) |
 | Genera una fonte parlata dal testo | [Sintesi vocale](conversion/text-to-speech.md) |
 | Converti un segnale microfonico dal vivo | [Conversione vocale in tempo reale](conversion/real-time.md) |
 | Registra un set di dati e addestra il mio modello | [Preparazione del set di dati](model-training/dataset-preparation.md) e [formazione](model-training/training.md) |
 | Separa una voce o completa un progetto musicale | [Tracce separate e mixaggio](conversion/stems-and-mixing.md) |
 | Confronta Ilaria RVC, Vonovox, Applio e altri | [Strumenti RVC](reference/tools.md) |
 | Correggi un errore o ripristina un'installazione | [Risoluzione dei problemi](reference/troubleshooting.md) |

Utilizzare la navigazione per trovare guide di configurazione, conversione, formazione e risoluzione dei problemi per Ilaria RVC e altre applicazioni RVC.


---

## La documentazione in numeri

- **Pagine totali:** **142** pagine (`141` guide + Home)
- **Totale pagine in tutte e 6 le lingue (`en`, `it`, `es`, `fr`, `de`, `pt`):** **836** pagine (`en: 142`, `it: 142`, `es: 138`, `fr: 138`, `de: 138`, `pt: 138`)

## Qualche curiosità sul sito e su Ilaria

- **Nato dall'esperienza diretta:** Ilaria (`TheStingerX` / `thestingerx` su Discord) ha scritto e ampliato queste guide direttamente mentre sviluppava **Ilaria RVC**, allenava modelli vocali (come *Itaila*) e testava configurazioni reali su Windows, Kaggle, Google Colab e Lightning AI.
- **Dalla `1.1 Beta` alla `2.5.1`:** Ilaria RVC è partita come interfaccia Windows personalizzata ed è arrivata a supportare **NVIDIA RTX serie 50 (Blackwell)** con CUDA 12.8, **training nativo in BF16**, **Kokoro v1.0 TTS**, conversione **Safetensors ↔ PTH**, **ONNX ↔ PTH** e cataloghi integrati di modelli e pretrain.
- **Più di un’app:** Ilaria Docs copre **16 app e fork RVC**, tra cui AICoverMaker, AICoverGen e Replay, oltre a RVC Model Merger e a strumenti non RVC come So-VITS-SVC, GPT-SoVITS, UVR5 e MVSEP.
- **Disponibile in 6 lingue:** Inglese e italiano hanno il catalogo completo. La maggior parte delle guide è disponibile anche in spagnolo, francese, tedesco e portoghese. Il selettore mostra le lingue disponibili per la pagina che stai leggendo.
