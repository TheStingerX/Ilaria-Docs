---
label: "Voice Blender (Merge Models)"
icon: ":twisted_rightwards_arrows:"
order: 92
permalink: /ilaria-rvc/voice-blender/
description: "In Ilaria RVC, la funzione Voice Blender si trova nella scheda Other sotto Merge models. Permette di fondere i pesi di due modelli vocali .pth compatibili..."
---
# Voice Blender (Fusione Modelli)

[Scarica Ilaria RVC 2.4.0 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

In **Ilaria RVC**, la funzione Voice Blender si trova nella scheda **Other** sotto **Merge models**. Permette di fondere i pesi di due modelli vocali `.pth` compatibili per creare una nuova voce ibrida senza dover allenare un modello da zero.

## Prima di iniziare: regole di compatibilità

Il fatto che due voci suonino simili **non** garantisce che si possano fondere. Entrambi i modelli di partenza devono coincidere tecnicamente:

- **Solo file `.pth` da inferenza:** Usa modelli esportati pronti all'uso in `weights/`. Non usare mai checkpoint grezzi di training (`G_*.pth` / `D_*.pth`) né file `.onnx`.
- **Stessa versione RVC:** Entrambi devono avere la stessa architettura (`v1` 256-d oppure `v2` 768-d).
- **Stesso sample rate:** Entrambi devono essere stati allenati allo stesso sample rate (es. entrambi `40k` oppure entrambi `48k`).
- **Stesso embedder / dimensioni interne:** Entrambi devono usare dimensioni dei tensori compatibili.

!!!tip
Clicca sempre **Check model compatibility** in Ilaria RVC prima di fondere. Se il controllo fallisce, i due file `.pth` non possono essere combinati tra loro.
!!!

## Come fondere due voci in Ilaria RVC

1. Apri la scheda **Other** e scorri fino a **Merge models**.
2. Seleziona **Model A** e **Model B** dai rispettivi menu (clicca **Refresh** prima se hai appena aggiunto un `.pth`).
3. Clicca **Check model compatibility** e verifica nel log che i due modelli risultino compatibili.
4. Imposta **Model A contribution (%)**:
   - `50` crea una miscela alla pari **50% / 50%** tra Modello A e Modello B.
   - `70` dà **70% Modello A** e **30% Modello B**.
   - `100` produce solo Modello A; `0` produce solo Modello B.
5. Scegli **Sample rate** (`Auto` se disponibile, altrimenti quello esatto di entrambi i modelli).
6. Scegli **Output precision**:
   - `fp16` genera un file più leggero e veloce sulle GPU NVIDIA CUDA moderne.
   - `fp32` pesa di più ma funziona ovunque, incluse GPU datate, DirectML e CPU.
7. Inserisci un **Output model name** chiaro (esempio `Alice70_Bob30`) e note opzionali.
8. Clicca **Merge and save model** e controlla **Merge Log** per confermare il salvataggio del `.pth`.

## Test, regolazione e file `.index`

- **Non viene creato alcun `.index`:** La fusione unisce solo i pesi `.pth` e **non** genera un nuovo file `.index`.
- **Testa prima senza Index:** Vai su **Inference**, clicca **Refresh**, seleziona il nuovo `.pth` fuso e provalo su una clip `.wav` pulita da 10-20 secondi con **Index Rate = 0**.
- **Confronta fianco a fianco:** Ascolta la stessa clip attraverso Modello A, Modello B e il modello fuso allo stesso volume. Sposta **Model A contribution (%)** a piccoli passi (es. `40%`, `50%`, `60%`) finché non trovi l'equilibrio ideale.
- **Test opzionale con Index:** Quando la fusione `.pth` suona già bene, puoi provare ad abbinare l'`.index` del Modello A o del Modello B a un **Index Rate** basso (`0.2` - `0.4`) per vedere se migliora la chiarezza senza sbilanciare troppo la voce verso una sola sorgente.
- **Conserva gli originali:** Un `.pth` fuso serve solo per l'**inferenza** (convertire audio). Non contiene lo stato di training e non può essere usato per riprendere un addestramento.
