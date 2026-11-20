---
label: "Unisci modelli RVC"
icon: ":jigsaw:"
order: 99
permalink: /ilaria-rvc/rvc-model-merger/
description: "Come installare e usare RVC Model Merger di Ardha27 per fondere due modelli vocali RVC v2 compatibili regolando le proporzioni."
---
# RVC Model Merger

[GitHub](https://github.com/mojowozo/RVC-model-merger)

> **Note importanti prima di iniziare**
> - **Questo programma è solo un model merger**: non converte audio, non fa conversione live dal microfono e non addestra nuovi modelli. Serve esclusivamente a unire due o più file `.pth` RVC esistenti in un nuovo `.pth`.
> - **Il merge tra sample rate diversi è supportato**: contrariamente a quanto scritto nel README della repository, i modelli **possono** essere uniti anche con **sample rate differenti** (es. `32k`, `40k`, `48k`) usando l'opzione **Encoder-only**, purché abbiano la **stessa versione RVC** (`v1` o `v2`) e la **stessa architettura vocoder** (`HiFi-GAN` o `RefineGAN`).

## Regole di compatibilità

| Requisito | Merge standard | Merge Encoder-only |
| --- | --- | --- |
| **Versione RVC** (`v1` vs `v2`) | Deve coincidere | Deve coincidere |
| **Architettura vocoder** (`HiFi-GAN` vs `RefineGAN`) | Deve coincidere | Deve coincidere |
| **Sample rate** (`32k`, `40k`, `48k`) | Deve coincidere | **Può essere diverso** (il decoder viene preso da un solo modello base) |

## Installazione

### Versione compilata (Windows)

1. Scarica l'archivio della release da [GitHub](https://github.com/mojowozo/RVC-model-merger).
2. Estrailo in una cartella scrivibile ed esegui il file `.exe`.

### Da sorgente (Python)

1. Clona o scarica la repository da [GitHub](https://github.com/mojowozo/RVC-model-merger).
2. Installa le dipendenze:
   ```bat
   pip install -r requirements.txt
   ```
   *(Usa `torch==2.10.0` e `numpy==1.26.4`; `tkinterdnd2==0.6.2` è opzionale per il drag-and-drop.)*
3. Avvia il programma con `run.bat` oppure:
   ```bat
   python main.py
   ```

## Come unire i modelli

1. **Carica i modelli**: usa **Browse** (o trascina i file `.pth` negli slot). Clicca **+ Add Slot** per unire più di due modelli. Ogni slot rileva automaticamente vocoder (`HiFi-GAN` / `RefineGAN`), sample rate, versione RVC e `f0`.
2. **Imposta i pesi**: regola lo slider/valore **Strength** (`0–100`) per decidere quanto pesa ciascun modello nel risultato finale. Gli slot a `0` vengono ignorati.
3. **Scegli la modalità di merge**:
   - Lascia **Encoder-only** disattivato per un merge completo quando tutti i modelli hanno lo stesso sample rate.
   - Attiva **Encoder-only** per unire modelli con **sample rate diversi** (o quando vuoi fondere solo l'encoder mantenendo il decoder di un unico modello).
4. **Nome e preset (opzionale)**: mantieni il nome automatico (**Auto**) o scrivine uno personalizzato. Puoi anche salvare/ricaricare configurazioni tramite **Preset → Save / Delete**.
5. **Avvia il merge**: clicca **Merge Models**. Il nuovo file `.pth` verrà salvato nella cartella `merges/` (puoi aprirla subito con **Open Folder** o **Open merges folder**).
