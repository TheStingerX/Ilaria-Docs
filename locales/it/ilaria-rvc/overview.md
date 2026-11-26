---
label: "Panoramica di Ilaria RVC"
icon: ":sparkling_heart:"
order: 100
permalink: /ilaria-rvc/overview/
description: "Puoi usare Ilaria RVC anche su Kaggle con la GPU remota, anche se il tuo computer ha una GPU AMD, Intel, integrata o poco potente. Ilaria RVC on Kaggle"
---
# Panoramica di Ilaria RVC

> **[Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)** · Il pacchetto completo per Windows è la versione 2.4.7. Per aggiornare dalla 2.4.2–2.5.0, vai su **Altro → Aggiorna Ilaria RVC → Controlla aggiornamenti → Scarica e riavvia**. Lo ZIP di aggiornamento esclude il runtime e i pesi dei modelli. [ZIP di aggiornamento Windows](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.5.1/ILARIA_RVC-update-2.5.1.zip?download=true)

> [Ilaria RVC 2.5.1 AMD Preview](install/amd-preview.md) · AMD Preview è un pacchetto separato della 2.5.1 per le Radeon compatibili. Funziona su Windows 11 tramite WSL2 con Ubuntu 22.04 oppure su Ubuntu 22.04 nativo. Usa Python 3.10, PyTorch 2.6.0 e ROCm 6.4.2. Il pacchetto e il launcher sono stati controllati. Training completo, ripresa dai checkpoint e conversione vocale dall’inizio alla fine sono ancora da verificare su hardware Radeon.

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Puoi usare Ilaria RVC anche su Kaggle con la GPU remota, anche se il tuo computer ha una GPU AMD, Intel, integrata o poco potente. [Ilaria RVC on Kaggle](cloud/kaggle.md)

Ilaria RVC 2.4.2 è un'applicazione Windows basata su RVC WebUI (Mainline - Original RVC). La sua interfaccia si apre in un browser, mentre il motore in bundle funziona sul PC. L'attuale pacchetto Windows è destinato a NVIDIA. La versione include inferenza, TTS, addestramento del modello, una libreria di modelli e analisi audio.

 | Dove | Cosa puoi fare |
| --- | --- |
 | Formazione | Importa e controlla set di dati, preelabora, estrai funzionalità, esegui o accoda esperimenti, visualizza in anteprima checkpoint e crea indici di recupero. |
 | Inferenza | Converti una clip o una cartella, genera parlato, seleziona codificatori ed estrattori di tonalità e applica elaborazioni opzionali. |
 | Altro | Importa, scarica, ispeziona, unisci ed esporta modelli. Installa incorporatori e pre-training opzionali, analizza l'audio, scansiona l'hardware e aggiorna l'applicazione. |
 | Pannello di formazione | Segui le corse attive, ispeziona i log esistenti, apri TensorBoard e genera un report diagnostico. |
 | Glossario | Rivedi le impostazioni e i flussi di lavoro all'interno dell'app. |

Inizia con [installazione](install/installation.md), quindi segui [inferenza singola e batch](convert/inference.md), [un esperimento di formazione](train/training-workflow.md) o [gestione del modello](manage/model-library.md). Per la terminologia comune, apri il [glossario](../reference/glossary.md).

## Cosa funziona localmente

Per impostazione predefinita, il launcher avvia un servizio locale sulla porta 6969. La conversione e l'addestramento dei file utilizzano file di modello locali. Il download dei modelli, l'aggiornamento dell'app e l'utilizzo di Edge TTS richiedono la connettività. Per la generazione vocale offline, scegli una voce Windows installata. Anche il browser è legato al ciclo di vita del servizio in questa versione. Termina o salva in sicurezza il lavoro attivo prima di chiudere l'ultima scheda.

[Controlli di addestramento](train/training-buttons.md) · [Controlli di inferenza](convert/inference-buttons.md) · [Pannelli di Other](manage/other-buttons.md)
