# Pitch Extractor di RVC (Metodi F0)

Un **pitch extractor** (chiamato anche **metodo di estrazione F0**) è l'algoritmo o la rete neurale che legge la frequenza fondamentale (intonazione, melodia e altezza della voce) nel tempo dall'audio di ingresso.

Mentre l'[embedder](embedders.md) capisce *quali parole e fonemi* vengono detti o cantati, il **pitch extractor** misura *quanto è alta o bassa* la voce in ogni millisecondo.

!!!tip
**Buona notizia sulla compatibilità:**
A differenza degli embedder, **i pitch extractor non ti vincolano a una scelta fissa**. Anche se un modello è stato allenato usando `rmvpe` durante il preprocessing del dataset, in inferenza e nel voice changer live puoi cambiare liberamente tra `rmvpe`, `rmvpe_gpu`, `fcpe` o `crepe` senza rompere nulla.
!!!

## Consiglio rapido

- **Scelta migliore in assoluto (Training e Conversione):** `rmvpe` oppure `rmvpe_gpu` (se hai una GPU NVIDIA).
- **Scelta migliore per Voice Changer Live / Tempo reale:** `fcpe` (latenza più bassa) oppure `rmvpe` (qualità massima se la tua GPU regge).
- **Da evitare nell'uso normale:** `pm`, `dio` e `harvest` sono metodi CPU vecchi che suonano molto peggio o sono molto più lenti di `rmvpe` e `fcpe`.

---

## Confronto tra tutti i Pitch Extractor conosciuti

| Pitch Extractor | Tipo | Velocità | Qualità e uso migliore | Note |
| --- | --- | --- | --- | --- |
| **`rmvpe`** | Rete neurale | Veloce | **Miglior standard generale** per parlato, canto ed estrazione F0 del dataset. | Gestisce consonanti, respiri e leggero riverbero molto meglio dei metodi vecchi. |
| **`rmvpe_gpu`** | Rete neurale (GPU CUDA) | **Molto veloce** | Stessa altissima precisione di `rmvpe`, eseguito forzatamente sulla GPU NVIDIA invece che sulla CPU. | Ideale in Ilaria RVC / RVC WebUI per brani lunghi, batch e preprocessing rapido. Richiede abbastanza VRAM libera. |
| **`fcpe`** | Rete neurale | **Ultra veloce** | **Migliore per voice changer live / tempo reale** e inferenza a bassa latenza. | Leggermente più leggero di `rmvpe`; ottimo se `rmvpe` causa scatti audio dal vivo. |
| **`crepe` / `crepe-full`** | Rete neurale | Lento | Ottima precisione sul canto solista pulito e sul vibrato. | Molto più pesante su GPU/CPU rispetto a `rmvpe`. Troppo lento per il live su GPU medie. |
| **`crepe-tiny`** | Rete neurale (piccola) | Veloce | Versione leggera di `crepe` per PC datati. | Meno preciso di `rmvpe` e `fcpe`; ormai superato da `fcpe`. |
| **`harvest`** | DSP classico (WORLD) | Molto lento (CPU) | Vecchio metodo per parlato pulito. | Tende a fare salti di ottava e artefatti metallici sul canto o audio rumoroso. Spesso richiede `filter_radius`. |
| **`pm`** | DSP classico (Parselmouth) | Ultra veloce (CPU) | Anteprime rapide su PC molto deboli senza GPU. | Perde facilmente l'intonazione su canto, sussurri o voci sporche. |
| **`dio`** | DSP classico (WORLD) | Molto veloce (CPU) | Vecchio ripiego veloce su CPU. | Meno preciso di `rmvpe` e `fcpe`; sconsigliato per export finali. |
| **`hybrid[...]`** | Metodi combinati | Lento | Mescola due estrattori (es. `hybrid[rmvpe+fcpe]` o `hybrid[crepe+rmvpe]`). | Presente in Applio e alcuni fork per attenuare salti di ottava su parti cantate difficili, ma raddoppia il carico. |
| **Varianti `swift` / `onnx`** | Leggero / ONNX | Molto veloce | Estrattori ottimizzati presenti in fork recenti (come Applio o Deiteris). | Utili su CPU o su build DirectML dove i metodi PyTorch classici sono più lenti. |

## `rmvpe` vs `rmvpe_gpu`: qual è la differenza?

In app come **Ilaria RVC** e **RVC Mainline** trovi spesso sia `rmvpe` che `rmvpe_gpu`:
- **`rmvpe`** può girare su CPU o seguire la gestione predefinita dell'app, consumando meno VRAM ma risultando più lento su file lunghi o dataset grandi.
- **`rmvpe_gpu`** forza l'esecuzione di RMVPE direttamente sulla tua **GPU CUDA**, dando la stessa identica qualità di pitch ma molto più velocemente in estrazione F0 e conversione offline.
- Se `rmvpe_gpu` dà errore `CUDA out of memory` su una scheda con poca VRAM (4 GB o meno), torna a `rmvpe` o `fcpe`.

## Quale scegliere in base a cosa devi fare

1. **Preparazione / Training di un nuovo modello:** Usa **`rmvpe_gpu`** (se hai una GPU NVIDIA con 6+ GB di VRAM) oppure **`rmvpe`**. Un tracciamento F0 pulito evita difetti di intonazione nel modello finale.
2. **Conversione offline di canzoni o doppiaggi:** Parti con **`rmvpe`** o **`rmvpe_gpu`**. Prova `crepe-full` o `hybrid` solo se una nota alta specifica fa un salto di ottava.
3. **Microfono live / Discord:** Parti con **`fcpe`** per avere meno ritardo possibile, oppure **`rmvpe`** se la tua GPU regge il chunk size senza crepitii.
