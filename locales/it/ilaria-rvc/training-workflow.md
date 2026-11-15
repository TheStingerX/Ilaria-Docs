---
label: "🧪 Addestramento e checkpoint"
order: 94
permalink: /ilaria-rvc/training-workflow/
---
# Addestramento e checkpoint

## Preparare un esperimento

Selezionare un set di dati e scegliere l'architettura RVC compatibile, la frequenza di campionamento, la guida dell'intonazione, l'incorporatore e i pretraining del generatore/discriminatore. Utilizza un nome esperimento univoco e una dimensione batch adatta alla VRAM. Esegui **Elaborazione dati**, quindi estrai le funzionalità della presentazione e dei contenuti prima dell'allenamento.

## Confronta anteprime ed esportazioni

Mostra una breve clip di prova prima dell'allenamento. Abilita le **Anteprime della formazione** se la tua versione lo offre e utilizza la stessa clip tra i checkpoint. Confronta dizione, tono e artefatti indesiderati. Utilizza la dashboard per i tempi e i conteggi e utilizza i test di ascolto per selezionare un'esportazione.

## Riprendi ed esporta

Utilizza **Interrompi e salva**, attendi la conferma, quindi conserva insieme la cartella dell'esperimento e i checkpoint G/D corrispondenti. Per deduzione, esporta il checkpoint vocale compatto e mantieni l'indice corrispondente. Vedi [Addestra un modello vocale RVC](../model-training/training.md) per la messa a punto e il recupero.
