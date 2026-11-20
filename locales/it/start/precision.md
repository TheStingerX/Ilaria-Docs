---
label: "⚡ Precisione"
order: 89
permalink: /precision/
description: "Guida semplice alle modalità di precisione in RVC (FP16, FP32 e BF16): cosa significano, compatibilità GPU, training vs inferenza e come evitare errori NaN o HalfTensor."
---
# Precisione in Training e Inferenza (`FP16`, `FP32`, `BF16`)

Quando alleni o converti una voce in RVC, vedrai spesso un'impostazione chiamata **Precision** (con opzioni come `FP32`, `FP16` e `BF16`).

Per chi è nuovo nel mondo dell'audio IA sembrano sigle complicate, ma il concetto è semplicissimo. Questa guida spiega cosa significa ogni modalità, quale si adatta alla tua scheda video e come evitare gli errori più comuni.

---

## 1. Cos'è la "Precisione" in parole semplici?

Un modello vocale IA è formato da milioni di numeri decimali (chiamati **pesi**). Ogni volta che RVC allena o converte la tua voce, la scheda video moltiplica milioni di questi numeri al secondo.

La **Precisione** decide semplicemente **quanto è dettagliato ogni numero** (quanti bit di memoria occupa):

- **`FP32` (Full Precision, 32-bit):** Mantiene il massimo dettaglio decimale e un intervallo di numeri enorme. È la modalità più sicura e compatibile, **ma** consuma più VRAM ed è più lenta.
- **`FP16` (Half Precision, 16-bit):** Consuma circa metà memoria rispetto a `FP32` ed è molto più veloce sulle GPU NVIDIA moderne. Avendo un intervallo numerico più piccolo, picchi molto forti durante il training possono talvolta mandarlo in overflow (`NaN loss`). Inoltre non funziona bene su schede vecchie (GTX 10), DirectML (AMD/Intel) o CPU.
- **`BF16` (Brain Float 16, 16-bit):** Consuma la **stessa poca memoria di `FP16`**, **ma** mantiene l'enorme intervallo sicuro di `FP32` (sacrificando solo qualche cifra decimale minuscola). In breve: `BF16` ti dà velocità e poca VRAM come `FP16` con quasi la stessa stabilità di `FP32`.

!!!tip
**Regola pratica semplice:**
Immagina **`FP32`** come un furgone robusto che non si ferma mai, **`FP16`** come un'auto sportiva veloce che vuole strade lisce (audio pulito), e **`BF16`** come un'auto sportiva moderna con sospensioni da fuoristrada (veloce, leggera sulla VRAM e difficilissima da mandare in crash).
!!!

---

## 2. Confronto `FP32` vs `FP16` vs `BF16`

| Caratteristica | `FP32` (Single / Full) | `FP16` (Half Precision) | `BF16` (Brain Float 16) |
| --- | --- | --- | --- |
| **Memoria per numero** | 32 bit (più grande) | 16 bit (metà) | 16 bit (metà) |
| **Velocità di training** | Più lenta | **Veloce** (su Tensor Core) | **Veloce** (su Tensor Core RTX 30+) |
| **Uso VRAM** | Più alto | **Basso (~40-50% in meno)** | **Basso (~40-50% in meno)** |
| **Rischio crash `NaN loss`** | Minimo (quasi zero) | Medio (se il dataset ha clipping/picchi) | **Molto basso** (stesso range sicuro di `FP32`) |
| **Supporto hardware** | **Tutto** (tutte le GPU, DirectML, CPU) | NVIDIA GTX 16 / RTX 20+ / T4 (male/rotto su GTX 10, DirectML, CPU) | **NVIDIA RTX 30 / 40 / 50**, A100, L4, H100 (non su RTX 20, GTX 16, T4, GTX 10) |
| **Qualità vocale finale** | Standard di riferimento | Praticamente identica | Praticamente identica |

---

## 3. Quale Precisione devi scegliere TU? (In base alla GPU)

La scelta dipende quasi totalmente da **quale scheda video hai nel PC**:

### NVIDIA RTX serie 30 / 40 / 50 (e A100 / L4 / H100)
- **Scelta migliore:** **`BF16`** (se la tua app RVC la supporta, come **Ilaria RVC** o **Applio**). Ottieni training veloce, poca VRAM usata e molti meno crash `NaN` rispetto a `FP16`.
- **Alternativa:** **`FP16`** funziona comunque benissimo se l'app non mostra `BF16`.

### NVIDIA RTX serie 20, GTX serie 16 o T4 Cloud (Colab / Kaggle)
- **Scelta migliore:** **`FP16`**. Queste schede non hanno il supporto hardware per `BF16`, quindi `FP16` ti dà il massimo vantaggio in velocità e VRAM.
- **Quando cambiare:** Se durante il training esce `NaN loss`, controlla che non ci siano audio in clipping nel dataset oppure passa a **`FP32`**.

### NVIDIA GTX serie 10 (1060, 1070, 1080 Ti) o più vecchie
- **Scelta migliore:** **Solo `FP32`**. Le GTX serie 10 (Pascal) non hanno i Tensor Core per `FP16` veloce, e forzare `FP16` provoca spesso errori `HalfTensor` o le rende perfino *più lente* di `FP32`.

### GPU AMD / Intel (DirectML) o solo CPU
- **Scelta migliore:** **Solo `FP32`**. DirectML e CPU di solito vanno in crash con `FP16` o `BF16` dando `expected scalar type Half but found Float`.

---

## 4. Precisione in Training vs Export / Inferenza

Chi inizia confonde spesso la **precisione di training** con la **precisione di salvataggio/inferenza**:

### Durante il Training (Mixed Precision / AMP)
- I trainer RVC moderni usano l'**Automatic Mixed Precision (AMP)** quando scegli `FP16` o `BF16`: eseguono i calcoli pesanti sulla GPU a 16-bit per andare veloci, tenendo al sicuro i valori principali a 32-bit.
- Usare `BF16` o `FP16` in training **non** peggiora la qualità della voce finale: un modello allenato bene in `BF16`, `FP16` o `FP32` suona praticamente uguale.

### Durante Inferenza, Export e Voice Blender
- **Inferenza / salvataggio `.pth` in `FP16`:** Dimezza circa il peso del file `.pth` (45-55 MB invece di 95-110 MB) e gira più veloce sulle GPU NVIDIA CUDA senza perdita udibile di qualità.
- **Inferenza / salvataggio `.pth` in `FP32`:** Crea un file `.pth` più grande, **ma** è compatibile con qualsiasi sistema (incluse GTX 10, DirectML e CPU).
- Puoi tranquillamente usare un `.pth` esportato in `FP16` su un'app impostata su `FP32` (l'app lo converte in automatico al caricamento), oppure cambiare tra `FP16` e `FP32` nel [Voice Blender](../ilaria-rvc/manage/voice-blender.md).

---

## 5. Errori di Precisione comuni e come risolverli

| Errore o Sintomo | Perché succede | Come risolvere |
| --- | --- | --- |
| `RuntimeError: expected scalar type Half but found Float` / `HalfTensor` | `FP16` è attivo su una GPU o backend che non lo supporta (GTX 10, DirectML o CPU). | Disattiva **`FP16`** nelle impostazioni e passa a **`FP32`**. |
| `BF16 is not supported on this device` | Hai scelto `BF16` su una scheda più vecchia (RTX 20, GTX 16, T4, GTX 10) o CPU. | Passa a **`FP16`** (su RTX 20 / GTX 16 / T4) oppure a **`FP32`** (su GTX 10 / DirectML / CPU). |
| `NaN loss` o modello esportato muto durante training `FP16` | Audio in clipping/distorto o gradienti troppo alti hanno mandato in overflow i numeri `FP16`. | Controlla il dataset con il [Dataset Checker](../ilaria-rvc/train/datasets.md), poi passa a **`BF16`** (su RTX 30+) o **`FP32`** in un nuovo training. |
| `CUDA out of memory` mentre alleni in `FP32` | `FP32` occupa circa il doppio di VRAM per ogni batch rispetto alle modalità a 16-bit. | Abbassa il **Batch Size** (es. `4` -> `2` -> `1`), oppure passa a **`BF16`** / **`FP16`** se la tua GPU li supporta. |
