# File PTH di RVC (`.pth`)

Quando scarichi, alleni o condividi una voce RVC, il **file `.pth`** è il file più importante in assoluto. Mentre il [file `.index`](indexes.md) è opzionale, il `.pth` è **obbligatorio**: senza di esso, RVC non può convertire nessuna voce.

Questa guida spiega cosa c'è dentro un `.pth`, la differenza fondamentale tra un modello esportato e i checkpoint grezzi di training (`G_*.pth` / `D_*.pth`), perché cambiano le dimensioni e come risolvere gli errori più comuni.

---

## 1. Cos'è un file `.pth`?

Un **file `.pth`** è un **checkpoint PyTorch** che contiene la rete neurale allenata (il **Generatore**) capace di ricreare il timbro della voce obiettivo.

Dentro un `.pth` RVC esportato correttamente vengono salvate due cose:
1. **Pesi del modello (`weight`):** Milioni di numeri appresi in training che definiscono timbro, risonanza e carattere della voce.
2. **Configurazione vocale (`config` e metadati):** Impostazioni registrate all'export, tra cui:
   - **Sample rate:** `32 kHz`, `40 kHz` o `48 kHz` (`44.1 kHz` su alcune varianti RefineGAN).
   - **Architettura RVC:** `v1` (256-d) oppure `v2` (768-d).
   - **Pitch guidance (`f0`):** Attivo (`1`) o disattivo (`0`).
   - **Vocoder:** `HiFi-GAN`, `MRF HiFi-GAN` o `RefineGAN`.
   - **Embedder:** Ad esempio `contentvec`, `spin-v2` o `klm-vocal-contentvec`.

---

## 2. `.pth` esportato vs Checkpoint grezzi (`G_*.pth` / `D_*.pth`)

Uno degli errori più frequenti per chi inizia è prendere il `.pth` sbagliato da `logs/`:

| Tipo di file | Posizione tipica | Peso tipico | A cosa serve |
| --- | --- | --- | --- |
| **`.pth` vocale esportato** (es. `MiaVoce.pth`) | `models/` (Ilaria RVC 2.4.0+) o `weights/` | **45 - 110 MB** (`fp16` vs `fp32`) | **Inferenza e condivisione.** Contiene solo i pesi leggeri del Generatore + config vocale. |
| **Generatore (`G_*.pth`) e Discriminatore (`D_*.pth`) grezzi** | `logs/<nome_esperimento>/` | **200+ MB ciascuno** | **Solo ripresa training e pretrain.** Contengono lo stato completo dell'ottimizzatore. **Mai** copiarli in `models/` per l'inferenza! |

Se copi un `G_*.pth` grezzo dentro `models/` e provi a convertire, RVC darà errore `Missing key(s) in state_dict` oppure segnalerà l'assenza della configurazione vocale. Usa sempre lo strumento **Export** dell'app (oppure i checkpoint esportati direttamente in `models/`/`weights/`).

---

## 3. Peso del file (`FP16` vs `FP32`) e formati (`.pth` vs `.safetensors` / `.onnx`)

- **Perché un `.pth` pesa ~50 MB e un altro ~105 MB?**
  La differenza dipende di solito dalla precisione di esportazione del modello (vedi [Precisione](precision.md)). `FP16` salva i pesi a 16 bit invece di 32, riducendo il peso del file di circa il 50% rispetto a `FP32` a parità di architettura. Entrambi offrono in genere una qualità audio praticamente identica e, sulle GPU NVIDIA supportate, l'inferenza `FP16` può anche migliorare le prestazioni. Aspetto importante: la precisione di export è indipendente dalla precisione di inferenza. Quasi tutte le app RVC possono caricare un modello `FP16` e convertire automaticamente i suoi pesi in `FP32` quando girano su GPU NVIDIA datate, DirectML o CPU, quindi non serve un modello esportato in `FP32` per avere compatibilità su questi dispositivi (purché l'app supporti la conversione automatica).
- **`.pth` vs `.safetensors`:**
  `.pth` usa il formato Python `pickle` (motivo per cui PyTorch `2.6+` impone controlli `weights_only=True`), mentre `.safetensors` salva i pesi senza codice eseguibile. In **Ilaria RVC 2.4.5+** puoi convertire liberamente tra `.pth` e `.safetensors` nel [Convertitore Safetensors ↔ PTH](../ilaria-rvc/manage/safetensors-converter.md).
- **`.pth` vs `.onnx`:**
  Training e inferenza RVC standard usano `.pth`. Alcuni voice changer live (come w-okada o Deiteris DirectML) usano anche export `.onnx` per GPU AMD/Intel.

---

## 4. Regole di compatibilità (perché un `.pth` può dare errore o suonare male)

1. **Embedder corrispondente:** Se un `.pth` è stato allenato con `contentvec` (il default standard), converti con `contentvec` (o lascia Embedder su `Auto`). Mescolare embedder diversi distorce la pronuncia o lascia filtrare la tua voce originale.
2. **Vocoder supportato:** Assicurati che la tua app supporti il vocoder del `.pth`. I modelli con `MRF HiFi-GAN` o `RefineGAN` richiedono un'app aggiornata (come **Ilaria RVC 2.3.0+** o **Applio**).
3. **`UnpicklingError` su PyTorch 2.6+:** File `.pth` o build vecchie possono dare `Weights only load failed` (`fairseq.data.dictionary.Dictionary`). Aggiornando a **Ilaria RVC 2.4.0+** o all'ultimo **Applio** il problema è risolto.

---

## 5. Dove mettere i file `.pth` e come ispezionarli

- **Dove metterli:** In **Ilaria RVC 2.4.0+**, estrai prima eventuale `.zip` e metti il `.pth` (con il suo `added_*.index`) nella cartella **`models/`** alla radice (altre app usano `assets/weights/` o `weights/`). Poi clicca **Refresh** in **Inferenza**.
- **Ispezionare `.pth` sconosciuti:** In Ilaria RVC apri **Altro → Model information**, seleziona il `.pth` e clicca **Read model information** per vedere sample rate, versione RVC, vocoder, embedder e precisione salvati nel file.
- **Condividere una voce in modo pulito:** Usa **Altro → Export model ZIP** per impacchettare `.pth` e `added_*.index` senza log di training né registrazioni private.

---

## 6. Errori comuni con i `.pth` e soluzioni rapide

| Errore o Sintomo | Cosa è successo | Come risolvere |
| --- | --- | --- |
| **Il modello non appare nel menu** | Hai dimenticato **Refresh**, hai lasciato il `.pth` nello `.zip` o l'hai messo nella cartella sbagliata. | Estrai lo `.zip`, metti il `.pth` direttamente in `models/` (o `weights/`) e clicca **Refresh**. |
| `EOFError` / `invalid load key` / `File is not a zip archive` | Il download si è interrotto o ha salvato una pagina HTML invece del modello. | Controlla il peso: un vero `.pth` pesa **40 - 110+ MB**, non pochi KB. Elimina e riscarica. |
| `Missing key(s) in state_dict` / `Sizes of tensors must match` | Hai caricato un checkpoint grezzo `G_*.pth` invece di un `.pth` esportato. | Esporta correttamente il modello finale invece di copiare `G_*.pth` da `logs/`. |
| `UnpicklingError` / `Weights only load failed` | PyTorch 2.6+ ha bloccato vecchi oggetti pickle su un'app RVC datata. | Aggiorna a **Ilaria RVC 2.4.0+** o all'ultimo **Applio**. |
