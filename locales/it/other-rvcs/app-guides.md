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

[Installa Vonovox](vonovox/installation.md) · [Configura l’audio di Vonovox](vonovox/live-audio.md) · [Installa Okada TG Developed Fork](tgr/installation.md) · [Configura l’audio di TGR](tgr/live-audio.md)

## Usare Applio o Redpanda-vc per gli altri casi

Scegli Applio per la sintesi vocale e la gestione dei modelli. Redpanda VC offre training, inferenza da file e conversione in tempo reale per RVC e Casual Voice Changer, nell’app desktop e nella WebUI. Usa `.pth` con RVC e `.cvc` con CVC.

[Installa Applio](applio/installation.md) · [Sintesi vocale in Applio](applio/tts.md) · [Libreria modelli di Applio](applio/models.md) · [Configura Redpanda-vc](redpanda/first-run.md) · [Modalità live di Redpanda-vc](redpanda/live-audio.md)

## Fai una prova di riferimento e risolvi un problema alla volta

Per i file, confronta lo stesso campione allo stesso volume. Per il tempo reale, registra una breve prova nell’app che riceve l’audio e controlla se senti la voce doppia, interruzioni o ritardo. Se la voce suona male in entrambe le prove, verifica modello, motore e intonazione. Se il problema compare solo nell’app di destinazione, controlla prima cavo virtuale, microfono selezionato e ascolto in cuffia.

## Altre app e compatibilità

{{ include "../reference/tools.md#app-comparison" }}

- [RVC WebUI (Mainline - Original RVC)](mainline/installation.md) · [w-okada VCClient](okada/installation.md) · [RVC GUI](rvc-gui/file-conversion.md) · [RVC Blue](rvc-blue/installation.md)
- [Confronta tutte le app](../reference/tools.md)
