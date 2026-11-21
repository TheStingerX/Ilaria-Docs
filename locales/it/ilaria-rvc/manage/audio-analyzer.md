---
label: "Analizzatore audio"
icon: ":chart_with_upwards_trend:"
order: 85
permalink: /ilaria-rvc/audio-analyzer/
description: "Apri Altro → Analizzatore audio. Aggiungi fino a otto file audio da confrontare."
---
# Analizzatore audio

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Apri **Altro → Analizzatore audio**. Aggiungi fino a otto file audio da confrontare. Un set utile contiene l'input originale, una conversione di base e una o due varianti realizzate con un'impostazione modificata.

 | Visualizza | Domanda a cui rispondere |
| --- | --- |
 | Forma d'onda | Dove sono i picchi forti, i passaggi silenziosi o le giunzioni brusche? |
 | Spettrogramma | Quali frequenze sono presenti nel momento in cui inizia un artefatto? |
 | Spettro medio | Una versione presenta uno squilibrio di frequenza persistente? |
 | Stima dell'altezza | Il F0 convertito segue il contorno previsto nei passaggi sonori? |
 | Tabelle di livello e silenzio | Stai confrontando volumi simili e utilizzando la stessa definizione di silenzio? |

Scegli un intervallo di tempo e una visualizzazione del canale. Utilizzare la stessa finestra FFT, scala di frequenza e soglia di silenzio nei confronti. Una finestra FFT più ampia migliora la risoluzione della frequenza e uniforma gli eventi veloci nel tempo. Ascolta la regione selezionata nel lettore prima di decidere se una differenza visibile è un problema.

Esporta CSV o JSON per le misurazioni o uno ZIP con grafici per una revisione successiva. Se desideri diagnosticare una clip del set di dati rumorosa, controlla prima la sorgente non elaborata e confronta lo stesso intervallo nell'esportazione. Quando i risultati dell'altezza sembrano strani nei respiri o nelle consonanti sorde, ascolta l'audio prima di interpretare la stima.
