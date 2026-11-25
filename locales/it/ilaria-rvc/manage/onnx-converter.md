---
label: "Convertitore ONNX ↔ PTH"
icon: ":repeat:"
order: 87
permalink: /ilaria-rvc/onnx-converter/
---

# Convertitore ONNX ↔ PTH

In **Altro → Converti i pesi dei modelli**, scegli un modello installato o indica un file. Puoi esportare un modello RVC HiFi-GAN con guida del pitch in ONNX per usarlo in un client esterno compatibile. Il ripristino esatto a `.pth` è disponibile per i file ONNX esportati da Ilaria RVC. Conserva il `.pth` originale se usi un altro programma per esportare. [Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)

## Esporta un modello in ONNX

Scegli un modello di inferenza installato oppure indica il file `.pth` esportato. Seleziona la conversione in ONNX e salva il risultato. Caricalo nel client esterno e provalo con una registrazione breve.

## Ripristina il PTH originale

Indica il file `.onnx` esportato da Ilaria RVC e seleziona la conversione in `.pth`. Salva il modello ripristinato e provalo in **Inferenza**.

[Safetensors ↔ PTH](safetensors-converter.md)
