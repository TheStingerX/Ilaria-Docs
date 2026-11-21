---
label: "🎵 Pitch extractors"
order: 92
permalink: /pitch-extractors/
description: "Un pitch extractor (chiamato anche metodo di estrazione F0) è l'algoritmo o la rete neurale che legge la frequenza fondamentale (intonazione, melodia e altezza della voce) nel tempo dall'audio di ingresso."
---
# Pitch Extractor di RVC (Metodi F0)

Un **pitch extractor** (chiamato anche **metodo di estrazione F0**) è l'algoritmo o la rete neurale che legge la frequenza fondamentale (intonazione, melodia e altezza della voce) nel tempo dall'audio di ingresso.

Mentre l'[embedder](embedders.md) capisce *quali parole e fonemi* vengono detti o cantati, il **pitch extractor** misura *quanto è alta o bassa* la voce in ogni millisecondo.

!!!tip
**Compatibilità:**
A differenza degli embedder, **i pitch extractor non ti vincolano a una scelta fissa**. Anche se un modello è stato allenato usando `rmvpe` durante il preprocessing del dataset, in inferenza e nel voice changer live puoi cambiare liberamente tra `rmvpe`, `rmvpe_gpu`, `fcpe` o `crepe` senza rompere nulla.
!!!

## Consiglio rapido (Specifico per Ilaria RVC)

- **Inferenza Singola e Batch (CUDA):** Ilaria RVC espone `rmvpe`, `swift`, `beatrice`, `fcpe`, `parselmouth`, `harvest` e `crepe`. **`rmvpe`** è il punto di partenza predefinito nell'interfaccia.
- **Inferenza DirectML (AMD / Intel):** Sono esposti solo `pm`, `harvest`, `rmvpe` e `fcpe`.
- **Estrazione feature in Training:** `rmvpe_gpu` (insieme a `dio`) appare nella scheda di **Training** per il preprocessing del dataset, non nei menu a tendina dell'Inferenza.
- **Voice Changer Live / Tempo reale:** `fcpe` o `swift` offrono un tracciamento più leggero per ridurre i crepitii su sistemi a bassa latenza; nessuna singola opzione è universalmente la migliore per ogni voce o registrazione.

---

## Confronto tra tutti i Pitch Extractor conosciuti

| Pitch Extractor | Tipo | Velocità | Qualità e uso migliore | Note |
| --- | --- | --- | --- | --- |
| **`rmvpe`** | Rete neurale | Veloce | **Predefinito in Ilaria RVC** per parlato, canto ed estrazione F0. | Gestisce consonanti, respiri e leggero riverbero molto meglio dei metodi classici. |
| **`rmvpe_gpu`** | Rete neurale (GPU CUDA) | **Molto veloce** | Stessa architettura RMVPE eseguita esplicitamente sulla GPU NVIDIA durante il preprocessing del **Training**. | Richiede abbastanza VRAM libera; non è presente nel selettore di Inferenza Singola/Batch in Ilaria RVC. |
| **`fcpe`** | Rete neurale | **Ultra veloce** | **Opzione veloce per tempo reale** e inferenza a bassa latenza. | Leggermente più leggero di `rmvpe`; utile se `rmvpe` causa scatti dal vivo. |
| **`crepe` / `crepe-full`** | Rete neurale | Lento | Alta precisione sul canto solista pulito e sul vibrato. | Molto più pesante su GPU/CPU rispetto a `rmvpe`. Troppo lento per il live su GPU medie. |
| **`crepe-tiny`** | Rete neurale (piccola) | Veloce | Versione leggera di `crepe` per PC datati. | Meno preciso di `rmvpe` e `fcpe`. |
| **`harvest`** | DSP classico (WORLD) | Molto lento (CPU) | Vecchio metodo per parlato pulito. | Tende a fare salti di ottava e artefatti metallici sul canto o audio rumoroso. Spesso richiede `filter_radius`. |
| **Parselmouth (`pm`)** | DSP classico | Ultra veloce (CPU) | Anteprime rapide su PC molto deboli senza GPU. | Perde facilmente l'intonazione su canto, sussurri o voci sporche. |
| **`dio`** | DSP classico (WORLD) | Molto veloce (CPU) | Vecchio ripiego veloce su CPU (usato principalmente nell'estrazione training). | Meno preciso di `rmvpe` e `fcpe`; sconsigliato per export finali. |
| **`hybrid[...]`** | Metodi combinati | Lento | Mescola due estrattori (es. `hybrid[rmvpe+fcpe]` o `hybrid[crepe+rmvpe]`). | Presente in Applio e alcuni fork per attenuare salti di ottava su parti cantate difficili, ma raddoppia il carico. |
| **`swift` / `beatrice` / ONNX** | Leggero / ONNX | Molto veloce | Estrattori ottimizzati disponibili in Ilaria RVC (CUDA) e fork recenti. | Utili come alternativa leggera a `rmvpe` quando si cerca minor carico o tracciamento diverso sul parlato/canto. |

## `rmvpe` vs `rmvpe_gpu` in Ilaria RVC

In **Ilaria RVC**, i due nomi appartengono a fasi diverse:
- **`rmvpe`** è l'opzione disponibile in **Single Inference**, **Batch Inference** e **Training**.
- **`rmvpe_gpu`** è un'opzione della scheda **Training** che accelera l'estrazione F0 del dataset su GPU CUDA.
- Se `rmvpe_gpu` durante il training dà errore `CUDA out of memory` su una scheda con poca VRAM (4 GB o meno), passa a `rmvpe` o `dio`.

## Quale scegliere in base a cosa devi fare

1. **Preparazione / Training di un nuovo modello:** Usa **`rmvpe_gpu`** (se hai una GPU NVIDIA con 6+ GB di VRAM) oppure **`rmvpe`**. Un tracciamento F0 pulito evita difetti di intonazione nel modello finale.
2. **Conversione offline di canzoni o doppiaggi:** Parti con **`rmvpe`** (il predefinito di Ilaria RVC). Prova `fcpe`, `swift`, `beatrice` o `crepe` se senti salti di ottava o instabilità di pitch su una nota specifica.
3. **Microfono live / Discord:** Parti con **`fcpe`** o **`rmvpe`** in base a quanto regge la tua GPU con il chunk size impostato senza crepitii.
