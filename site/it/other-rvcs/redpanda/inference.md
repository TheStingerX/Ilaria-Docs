# Inferenza da file

[Release precompilata per Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) · [Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Usa Inference per convertire una registrazione o un’intera cartella. Una voce RVC usa un modello .pth per inferenza; una voce Casual Voice Changer usa .cvc.

## Convertire una registrazione

Apri **Inference**. In **Voice model**, scegli un `.pth` RVC per inferenza o una voce `.cvc`. Per RVC puoi aggiungere l’`.index` abbinato, se disponibile. Tieni **Index rate** a zero per la prima prova senza retrieval. I checkpoint `G_*.pth` e `D_*.pth` si usano in Training.

## Prova e conversione di una cartella

Parti da un WAV breve e pulito, con zero semitoni ed esportazione WAV. Usa **Save as** per scegliere un’uscita separata e ascolta il risultato prima di cambiare pitch o impostazioni del modello. Dopo la prova, attiva **Folder mode**, scegli una cartella piccola e una destinazione separata, poi verifica due o tre conversioni prima di elaborare tutto.

[Installare Redpanda VC](first-run.md) · [Conversione vocale in tempo reale](live-audio.md) · [Training con Casual Voice Changer](causal-training.md) · [RVC Training](training.md)

## Sorgente e release

[Inference UI](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/desktop/ui/index.html) · [Conversion](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/shared/desktop/convert.py)
