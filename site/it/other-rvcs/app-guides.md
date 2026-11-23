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

[Installa Vonovox](vonovox/installation.md) · [Configura l’audio di Vonovox](vonovox/live-audio.md) · [Installa Okada TG Developed Fork](tgr/installation.md) · [Configura l’audio di TGR](tgr/live-audio.md)

## Usare Applio o Redpanda-vc per gli altri casi

Scegli Applio per la sintesi vocale e la gestione dei modelli. Redpanda VC offre training, inferenza da file e conversione in tempo reale per RVC e Casual Voice Changer, nell’app desktop e nella WebUI. Usa `.pth` con RVC e `.cvc` con CVC.

[Installa Applio](applio/installation.md) · [Sintesi vocale in Applio](applio/tts.md) · [Libreria modelli di Applio](applio/models.md) · [Configura Redpanda-vc](redpanda/first-run.md) · [Modalità live di Redpanda-vc](redpanda/live-audio.md)

## Fai una prova di riferimento e risolvi un problema alla volta

Per i file, confronta lo stesso campione allo stesso volume. Per il tempo reale, registra una breve prova nell’app che riceve l’audio e controlla se senti la voce doppia, interruzioni o ritardo. Se la voce suona male in entrambe le prove, verifica modello, motore e intonazione. Se il problema compare solo nell’app di destinazione, controlla prima cavo virtuale, microfono selezionato e ascolto in cuffia.

## Altre app e compatibilità

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

- [RVC WebUI (Mainline - Original RVC)](mainline/installation.md) · [w-okada VCClient](okada/installation.md) · [RVC GUI](rvc-gui/file-conversion.md) · [RVC Blue](rvc-blue/installation.md)
- [Confronta tutte le app](../reference/tools.md)
