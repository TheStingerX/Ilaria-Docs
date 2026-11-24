---
label: "Addestramento e checkpoint"
icon: ":test_tube:"
order: 94
permalink: /ilaria-rvc/training-workflow/
description: "Selezionare un set di dati e scegliere l'architettura RVC compatibile, la frequenza di campionamento, la guida dell'intonazione, l’embedder e i pretraining del generatore/discriminatore."
---
# Addestramento e checkpoint

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · RefineGAN supporta training e inferenza a 32, 40 e 44,1 kHz con RVC v2 e Pitch Guidance. L’app genera in automatico la traccia silenziosa a 44,1 kHz. Se i pesi preaddestrati usano un’architettura diversa, seleziona **None** per addestrare da zero. Tra le coppie provate ci sono KLM 5 (40 kHz) e VCTK (44,1 kHz).

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

## Preparare un esperimento

Selezionare un set di dati e scegliere l'architettura RVC compatibile, la frequenza di campionamento, la guida dell'intonazione, l’embedder e i pretraining del generatore/discriminatore. Utilizza un nome esperimento univoco e una dimensione batch adatta alla VRAM. Esegui **Elaborazione dati**, quindi estrai le funzionalità della presentazione e dei contenuti prima dell'allenamento.

## Confronta anteprime ed esportazioni

Mostra una breve clip di prova prima dell'allenamento. Abilita le **Anteprime della formazione** se la tua versione lo offre e utilizza la stessa clip tra i checkpoint. Confronta dizione, tono e artefatti indesiderati. Utilizza la dashboard per i tempi e i conteggi e utilizza i test di ascolto per selezionare un'esportazione.

## Riprendi ed esporta

Utilizza **Interrompi e salva**, attendi la conferma, quindi conserva insieme la cartella dell'esperimento e i checkpoint G/D corrispondenti. Per deduzione, esporta il checkpoint vocale compatto e mantieni l'indice corrispondente. Vedi [Addestra un modello vocale RVC](../../model-training/training.md) per la messa a punto e il recupero.
