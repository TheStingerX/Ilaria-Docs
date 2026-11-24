# Estendere la banda vocale con AP-BWE

## Scegli il profilo di banda

Scegli **AP-BWE** e abbina il primo numero del profilo alla banda effettiva del parlato. Un segnale campionato a 8 kHz può contenere frequenze fino a circa 4 kHz. Una telefonata salvata in un WAV a 48 kHz può avere ancora quella banda stretta. In caso di dubbio osserva lo spettrogramma o confronta due profili vicini sullo stesso estratto. L’app ricampiona alla frequenza di ingresso del profilo prima dell’inferenza: un profilo troppo basso può eliminare dettagli utili.

| Ingresso (kHz) | Uscita (kHz) |
| ---: | ---: |
| 2 | 16 |
| 4 | 16 |
| 8 | 16 |
| 8 | 48 |
| 12 | 48 |
| 16 | 48 |
| 24 | 48 |

## Confronta i risultati

Scarica il checkpoint del profilo scelto, aggiungi l’audio, imposta il formato e premi **Enhance audio**. AP-BWE predice in parallelo gli spettri di ampiezza e fase e ricostruisce la forma d’onda alla frequenza di uscita. L’app elabora ogni canale separatamente. Se aumenta il fruscio o la voce diventa metallica, prova un profilo più vicino alla banda della sorgente e confronta con l’originale.

[Panoramica](overview.md) · [Installazione e modelli](installation.md) · [Restaurare il parlato con Sidon](sidon.md) · [Anteprima, esportazione e risoluzione dei problemi](export.md)

## Fonti

[AP-BWE](https://github.com/yxlu-0102/AP-BWE) · [AP-BWE audio demos](https://yxlu-0102.github.io/AP-BWE/) · [studio_engine.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio_engine.py) · [AP-BWE weight license](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/LICENSE-AP-BWE-WEIGHTS.txt)
