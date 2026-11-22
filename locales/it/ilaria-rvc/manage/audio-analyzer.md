---
label: "Analizzatore Audio"
icon: ":chart_with_upwards_trend:"
order: 85
permalink: /ilaria-rvc/audio-analyzer/
description: "Apri Other → Audio Analyzer in Ilaria RVC per confrontare fino a otto file audio usando forme d'onda, spettrogrammi, spettro medio, stima del pitch e tabelle dei livelli."
---
# Analizzatore Audio

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Apri **Other → Audio Analyzer**. Aggiungi fino a otto file audio da confrontare. Un set utile contiene l'ingresso originale, una conversione di base e una o due varianti create modificando una singola impostazione.

## Cosa misura ogni vista

| Vista | Cosa mostra direttamente | Domanda a cui rispondere |
| --- | --- | --- |
| **Waveform** | Ampiezza nel tempo | Dove sono i picchi forti, il clipping appiattito in cima, i passaggi silenziosi o le giunzioni brusche? |
| **Spectrogram** | Energia in frequenza nel tempo | Quali frequenze sono presenti nel momento esatto in cui inizia un fruscio, un ronzio o un artefatto? |
| **Average spectrum** | Bilanciamento complessivo delle frequenze | Una versione suona sensibilmente più brillante, più cupa o ha una risonanza persistente? |
| **Pitch estimation** | Andamento stimato della F0 sui segmenti sonori | Il pitch convertito segue la melodia/inflessione prevista senza salti d'ottava? |
| **Level & silence tables** | Livelli di volume/picco misurati e segmenti di silenzio | Stai confrontando i file a volumi simili e usando la stessa soglia di silenzio? |

> **Cosa misura Audio Analyzer vs. cosa suggerisce:** Audio Analyzer traccia e misura direttamente livelli del segnale, intervalli di silenzio, energia spettrale e contorni F0 stimati. **Non** diagnostica automaticamente un timbro vocale "buono" o "cattivo" da solo. **Ascolta sempre la regione selezionata** nel player integrato prima di trattare una differenza visiva come un problema.

## Esempi pratici: cosa cercare

- **Clipping:** Picchi appiattiti in cima che toccano l'ampiezza massima nella **Waveform** (spesso udibili come crepitii aspri). Abbassa il guadagno in ingresso o normalizza la sorgente prima del training o della conversione.
- **Rumore di fondo / fruscio:** Una banda orizzontale costante o un fondo luminoso sulle medie/alte frequenze nello **Spectrogram** durante le pause. Pulisci la sorgente con UVR5 o MVSep prima del training.
- **Silenzio eccessivo o vuoti morti:** Lunghi tratti piatti nella **Waveform** e percentuali alte di silenzio nelle **Level and silence tables**. Taglia le pause lunghe nei dataset così il training non spreca step sul silenzio.
- **Volume troppo basso / troppo alto:** Ampiezza della forma d'onda molto sottile (rischio di amplificazione rumorosa) o picchi vicini al massimo. Controlla le **Level and silence tables** così i confronti A/B sono giudicati a volume abbinato.
- **Distorsione e riverbero:** Code orizzontali sfocate che si estendono dopo la fine delle parole nello **Spectrogram** indicano riverbero ambientale; picchi verticali netti o armoniche sporche suggeriscono distorsione o elaborazione eccessiva.
- **Controllo qualità del dataset:** Ispeziona le clip sorgenti grezze *prima* del training, poi confronta la stessa frase tra più checkpoint. Quando la stima del pitch sembra irregolare durante respiri o consonanti sorde (`s`, `f`, `t`), ascolta prima: i suoni sordi non hanno per natura un pitch stabile.

## Consigli di confronto ed esportazioni

Scegli un intervallo temporale e una vista canali corrispondenti e mantieni la stessa **finestra FFT**, scala delle frequenze e soglia del silenzio tra i confronti. Una finestra FFT più ampia migliora il dettaglio in frequenza ma smussa gli eventi rapidi nel tempo. Esporta **CSV** o **JSON** per le misure numeriche, oppure uno **ZIP con grafici** per una revisione successiva.
