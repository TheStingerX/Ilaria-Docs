---
label: "Audio Analyzer"
icon: ":chart_with_upwards_trend:"
order: 85
permalink: /ilaria-rvc/audio-analyzer/
description: "Apri Altro → Audio Analyzer in Ilaria RVC per confrontare fino a otto file audio con forme d'onda, spettrogrammi, spettro medio, stima del pitch e tabelle dei livelli."
---
# Audio Analyzer

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Apri **Altro → Audio Analyzer**. Aggiungi fino a otto file audio da confrontare. Un set utile contiene l'originale, una conversione di riferimento e una o due varianti con una sola impostazione modificata.

## Cosa misura ciascuna vista

| Vista | Cosa mostra direttamente | Domanda a cui risponde |
| --- | --- | --- |
| **Waveform** | Ampiezza nel tempo | Dove sono picchi forti, clipping piatto, passaggi silenziosi o tagli bruschi? |
| **Spectrogram** | Energia in frequenza nel tempo | Quali frequenze sono presenti nel momento esatto in cui inizia un artefatto? |
| **Average spectrum** | Bilanciamento frequenze medio | Una versione suona più brillante, chiusa o con risonanze persistenti? |
| **Pitch estimation** | Andamento F0 stimato nelle parti vocali | Il pitch convertito segue la melodia prevista senza salti d'ottava? |
| **Level & silence tables** | Livelli misurati e segmenti di silenzio | Stai confrontando i file a volume simile e con la stessa soglia di silenzio? |

> **Cosa misura vs. cosa suggerisce:** Audio Analyzer misura livelli, silenzi, energia spettrale e contorni F0 stimati, ma **non** giudica automaticamente se un timbro suona "bene" o "male". **Ascolta sempre l'intervallo selezionato** nel player prima di considerare un dettaglio visivo come un errore.

## Esempi pratici: cosa cercare

- **Clipping:** Picchi tagliati piatti al massimo nella **Waveform** (udibili come gracchiamenti). Abbassa il gain prima di addestrare o convertire.
- **Rumore di fondo / fruscio:** Banda orizzontale costante nello **Spectrogram** durante le pause. Pulisci con UVR5 o MVSep prima del training.
- **Silenzi eccessivi:** Lunghi tratti piatti nella **Waveform** e alta percentuale di silenzio nelle tabelle. Taglia le pause lunghe nel dataset.
- **Volume troppo basso o troppo alto:** Ampiezza sottilissima o picchi al limite. Usa le **Level & silence tables** per confronti A/B a volume comparabile.
- **Distorsione e riverbero:** Code sfocate dopo la fine delle parole nello **Spectrogram** indicano riverbero ambientale; picchi verticali secchi indicano distorsione.
- **Qualità del dataset:** Controlla le clip originali *prima* del training. Se la stima F0 appare irregolare su respiri o consonanti sorde (`s`, `f`, `t`), ascolta prima: i suoni sordi non hanno un pitch stabile.

## Consigli ed esportazione

Usa lo stesso intervallo temporale, **FFT window**, scala frequenze e soglia di silenzio nei confronti. Esporta **CSV** o **JSON** per le misure numeriche, oppure uno **ZIP con grafici** per analisi successive.
