---
label: "Piper"
icon: ":speaker:"
order: 96
permalink: /non-rvc/tts/piper/
---

# Piper

Piper è un motore TTS neurale che gira in locale. L’installazione e il primo download della voce richiedono internet. Una volta scaricati entrambi i file della voce, puoi generare audio offline. Usa un ambiente Python separato.

## Installa e genera

Esegui i comandi in una cartella scrivibile. Il file `.onnx` contiene il modello vocale, mentre il `.onnx.json` contiene le impostazioni. Tienili insieme. L’esempio usa una voce inglese. Esegui il comando per elencare le voci senza indicarne una per scegliere un’altra lingua.

~~~bash
python -m pip install piper-tts
python -m piper.download_voices
python -m piper.download_voices en_US-lessac-medium
python -m piper -m en_US-lessac-medium -f test.wav -- "This is a test."
~~~

## Risoluzione dei problemi

Per una narrazione lunga, dividi il testo in sezioni e verifica la pronuncia prima di generarle tutte. Controlla con `python -m piper --help` le opzioni della tua versione per testo da file, velocità e scelta del parlante. Se il modello non viene trovato, verifica la cartella di lavoro. Prima di distribuire l’audio, controlla la licenza della voce nella sua MODEL_CARD.

[GitHub · Piper](https://github.com/OHF-Voice/piper1-gpl) · [Voice model cards](https://huggingface.co/rhasspy/piper-voices)
