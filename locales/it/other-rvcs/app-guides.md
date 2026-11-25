---
label: "Guide per app"
icon: ":books:"
order: 80
permalink: /ilaria-rvc/app-guides/
description: "Usa Ilaria RVC per addestrare un modello o convertire una registrazione."
---
# Guide passo passo per app

<div role="group" aria-label="Che cosa vuoi fare?" style="margin:1.4rem 0 2rem;padding:1rem;border:1px solid #db78a888;border-radius:1rem;background:#db78a810">
  <p style="margin:0 0 .85rem;text-align:center;font-weight:700">Che cosa vuoi fare?</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,13rem),1fr));gap:.65rem">
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Training o conversione di file</strong><br><span aria-hidden="true">↓</span> <a href="../installation/">Ilaria RVC</a></div>
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Microfono in tempo reale</strong><br>NVIDIA <span aria-hidden="true">→</span> <a href="../vonovox/installation/">Vonovox</a><br>AMD / Intel <span aria-hidden="true">→</span> <a href="../tgr/installation/">Okada TG Developed Fork</a></div>
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Altri flussi di lavoro</strong><br><span aria-hidden="true">↓</span> <a href="../applio/installation/">Applio</a> · <a href="../redpanda/first-run/">Redpanda-vc</a></div>
  </div>
</div>

## Scegli in base all’obiettivo e alla scheda video

Usa **Ilaria RVC** per addestrare un modello o convertire una registrazione. Per il microfono in tempo reale su Windows, scegli **Vonovox** con una GPU NVIDIA compatibile, oppure **Okada TG Developed Fork** con una GPU AMD o Intel compatibile. Per gli altri flussi di lavoro, parti da **Applio** o **Redpanda-vc**.

[Installa Ilaria RVC](../ilaria-rvc/install/installation.md) · [GPU compatibili](../ilaria-rvc/install/gpu-compatibility.md) · [Usa Kaggle](../ilaria-rvc/cloud/kaggle.md)

## Addestrare un modello con Ilaria RVC

Prepara un dataset di registrazioni pulite di una sola persona. Parti dalla guida al dataset e segui, nell’ordine, la preparazione dei file, l’estrazione delle caratteristiche e l’addestramento. Salva più checkpoint durante il training e confrontali con gli stessi brevi campioni. Tieni quello che suona meglio anche su materiale mai usato per addestrarlo. Se generi un indice, conservalo insieme al modello corrispondente.

[Prepara il dataset](../ilaria-rvc/train/datasets.md) · [Procedura di addestramento](../ilaria-rvc/train/training-workflow.md) · [Controlli di training](../ilaria-rvc/train/training-controls.md)

## Convertire registrazioni con Ilaria RVC

Importa un file di inferenza `.pth` compatibile e aggiungi il relativo `.index` se lo hai. Converti prima un breve WAV senza effetti. Salva il risultato come riferimento, quindi modifica intonazione e recupero dall’indice una regolazione alla volta. Passa alla conversione in serie quando le impostazioni funzionano su più clip rappresentative. Se il tuo computer non ha una GPU adatta, segui la guida a Kaggle per addestrare o convertire file.

[Inferenza singola e in serie](../ilaria-rvc/convert/inference.md) · [Controlli di inferenza](../ilaria-rvc/convert/inference-buttons.md)

## Convertire il microfono in tempo reale

Su Windows con NVIDIA, installa Vonovox e scegli il pacchetto adatto alla GPU. Con AMD o Intel, parti dalla build DirectML di Okada TG Developed Fork se la scheda la supporta. Ascolta prima in cuffia per verificare che il programma riceva e converta il microfono. Invia poi l’audio convertito all’ingresso di riproduzione del cavo virtuale e seleziona l’uscita di registrazione come microfono in Discord, OBS, un gioco o un’altra app. Se l’audio salta, aumenta il buffer e riprova con l’app di destinazione aperta.

[Installa Vonovox](voice-changers/vonovox/installation.md) · [Configura l’audio di Vonovox](voice-changers/vonovox/live-audio.md) · [Installa Okada TG Developed Fork](voice-changers/tgr/installation.md) · [Configura l’audio di TGR](voice-changers/tgr/live-audio.md)

## Usare Applio o Redpanda-vc per gli altri casi

Scegli Applio per la sintesi vocale e la gestione dei modelli. Redpanda VC offre training, inferenza da file e conversione in tempo reale per RVC e Causal Voice Changer, nell’app desktop e nella WebUI. Usa `.pth` con RVC e `.cvc` con CVC.

[Installa Applio](training/applio/installation.md) · [Sintesi vocale in Applio](training/applio/tts.md) · [Libreria modelli di Applio](training/applio/models.md) · [Configura Redpanda-vc](training/redpanda/first-run.md) · [Modalità live di Redpanda-vc](training/redpanda/live-audio.md)

## Fai una prova di riferimento e risolvi un problema alla volta

Per i file, confronta lo stesso campione allo stesso volume. Per il tempo reale, registra una breve prova nell’app che riceve l’audio e controlla se senti la voce doppia, interruzioni o ritardo. Se la voce suona male in entrambe le prove, verifica modello, motore e intonazione. Se il problema compare solo nell’app di destinazione, controlla prima cavo virtuale, microfono selezionato e ascolto in cuffia.

## Training e inferenza

| App | Funzionalità | Hardware / note | Guide |
| --- | --- | --- | --- |
| **Ilaria RVC** | Training, inferenza singola e in serie, sintesi vocale, analizzatore audio | NVIDIA CUDA (Windows) / Kaggle | [Installazione](../ilaria-rvc/install/installation.md) · [Inferenza](../ilaria-rvc/convert/inference.md) · [Training](../ilaria-rvc/train/training-workflow.md) |
| **Applio** | Training, inferenza da file, sintesi vocale, libreria modelli, tempo reale | NVIDIA CUDA, AMD ROCm, Apple MPS | [Installazione](training/applio/installation.md) · [Inferenza](training/applio/inference.md) · [Training](training/applio/training.md) |
| **RVC WebUI (Mainline - Original RVC)** | Training e inferenza da file originali (+ launcher live separato) | NVIDIA CUDA, CPU / DirectML | [Installazione](training/mainline/installation.md) · [Inferenza](training/mainline/inference.md) · [Training](training/mainline/training.md) |
| **Redpanda-vc** | Training, inferenza da file e tempo reale per RVC + Causal Voice Changer | NVIDIA CUDA / CPU (Desktop e WebUI) | [Primo avvio](training/redpanda/first-run.md) · [Inferenza](training/redpanda/inference.md) · [Training](training/redpanda/training.md) |
| **RVC Model Merger** | Utilità di unione per modelli RVC `.pth` | Utilità offline | [Uso](rvc-model-merger/usage.md) |

### Legacy / Sconsigliate

!!!warning Software datato · Sconsigliato
Questi progetti sono datati, archiviati o non più mantenuti attivamente. Le guide restano disponibili per progetti esistenti. Per una nuova installazione, scegli un’app mantenuta qui sopra.
!!!

| App | Funzionalità | Stato / note | Guide |
| --- | --- | --- | --- |
| **rvc-cli** | Inferenza da file/lotti e training (CLI) | Archiviato | [Installazione](training/rvc-cli/installation.md) · [Uso](training/rvc-cli/usage.md) |
| **RVC Studio** | Training e inferenza da file (WebUI) | Inattivo | [Installazione](training/rvc-studio/installation.md) · [Uso](training/rvc-studio/usage.md) |
| **Mangio RVC Fork** | Training e inferenza da file | Inattivo | [Installazione](training/mangio/installation.md) · [Uso](training/mangio/usage.md) |
| **Replay** | Training e conversione file | Dismesso (Weights.gg chiuso) | [Installazione](training/replay/installation.md) · [Uso](training/replay/usage.md) |
| **AICoverMaker** | Fork di Applio per cover RVC, separazione e conversione vocale | — | [Installazione](training/aicovermaker/installation.md) · [Prima cover](training/aicovermaker/usage.md) |
| **AICoverGen** | Pipeline RVC v2 per cover musicali (solo inferenza, WebUI / CLI / Colab) | Non mantenuto | [Installazione](training/aicovergen/installation.md) · [Uso](training/aicovergen/usage.md) |
| **RVC GUI** | Solo conversione file desktop | Archiviato | [Conversione file](voice-changers/rvc-gui/file-conversion.md) |

## Cambia voce (tempo reale)

| App | Motore / ambito | Hardware / note | Guide |
| --- | --- | --- | --- |
| **Vonovox** | RVC v2 in tempo reale (consigliato su Windows NVIDIA) | NVIDIA CUDA | [Installazione](voice-changers/vonovox/installation.md) · [Audio live](voice-changers/vonovox/live-audio.md) · [Prestazioni](voice-changers/vonovox/advanced-performance-optimization.md) |
| **w-okada VCClient** | RVC in tempo reale multipiattaforma (client/server) | NVIDIA CUDA, DirectML, Apple MPS, CPU | [Installazione](voice-changers/okada/installation.md) · [Audio live](voice-changers/okada/live-audio.md) |
| **Okada TG Developed Fork (TGR)** | Fork attivo della community per RVC in tempo reale | NVIDIA CUDA, DirectML (AMD/Intel), CPU, Linux, macOS sperim. | [Installazione](voice-changers/tgr/installation.md) · [Audio live](voice-changers/tgr/live-audio.md) · [Cloud](voice-changers/tgr/cloud.md) |
| **Deiteris w-okada Fork** | Fork w-okada in tempo reale | NVIDIA CUDA, DirectML, Apple MPS, CPU | [Installazione](voice-changers/deiteris/installation.md) · [Audio live](voice-changers/deiteris/live-audio.md) · [Cloud](voice-changers/deiteris/cloud.md) |
| **RVC Blue** | App desktop Windows in tempo reale e file input realtime | NVIDIA CUDA 12.8 / 11.8 | [Installazione](voice-changers/rvc-blue/installation.md) |

App RVC multimodali con modalità live integrate: **Applio** ([Tempo reale](training/applio/realtime.md)), **Redpanda-vc** ([Modalità live](training/redpanda/live-audio.md)) e **RVC WebUI (Mainline)** ([Tempo reale](training/mainline/realtime.md)).

### Cambia voce Non-RVC in tempo reale

| App | Funzionalità | Guide |
| --- | --- | --- |
| **Causal Voice Changer** | Cambia voce Non-RVC a bassa latenza in tempo reale (modelli `.cvc`) | [Panoramica](../non-rvc/voice-changers/causal-voice-changer/overview.md) · [Installazione](../non-rvc/voice-changers/causal-voice-changer/installation.md) · [Tempo reale](../non-rvc/voice-changers/causal-voice-changer/realtime.md) |
| **YuneVoix** | Cambia voce Non-RVC in tempo reale, song cover e karaoke | [Panoramica](../non-rvc/voice-changers/yunevoix/overview.md) · [Installazione](../non-rvc/voice-changers/yunevoix/installation.md) · [Uso](../non-rvc/voice-changers/yunevoix/usage.md) |

[Confronta tutte le app](../reference/tools.md)
