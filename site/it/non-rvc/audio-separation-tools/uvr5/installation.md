# Scaricare e installare UVR5

I pacchetti ufficiali per Windows e macOS includono già un ambiente isolato Python e PyTorch, quindi **non** serve installare Python separatamente.

## 1. Scarica la versione giusta

1. **Release standard (v5.6.0)**: scarica l'installer da [GitHub Releases](https://github.com/Anjok07/ultimatevocalremovergui/releases).
2. **Patch Beta Roformer (Consigliato)**: per usare **BS-Roformer**, **Mel-Roformer**, **SCNet**, **Bandit** e **Demudder**, scarica una build standalone o patch da [uvr_update_patches](https://github.com/TRvlvr/model_repo/releases/tag/uvr_update_patches):
   - **La maggior parte delle GPU moderne (NVIDIA / DirectML / macOS)**: usa la beta standalone **Patch #13** (`UVR_Patch_1_15_25_22_30_BETA`) e applica opzionalmente sopra la **Patch #14** (`UVR_Patch_1_21_25_2_28_BETA`) per avere il **Demudder**.
   - **Serie NVIDIA RTX 5000**: usa la build standalone dedicata **CUDA 12.8** (`UVR_Patch_4_24_25_20_11_BETA_full_cuda_12.8`), che include già Demudder. *(Non compatibile con AMD/Intel o GPU NVIDIA precedenti.)*
   - *Consiglio*: se il download da GitHub è lento, usa un download manager multi-connessione come Free Download Manager.

## 2. Installazione su Windows

1. Avvia l'installer e installa UVR5 sul **disco `C:\`** (evita altri dischi).
2. Se hai scaricato una patch piccola (es. Patch #14), installala nella cartella della tua installazione Roformer beta esistente.
3. Avvia UVR5 e spunta **GPU Conversion** nella finestra principale.

> **Consiglio per Linux (Bottles)**: il branch nativo Linux (`v5.6.0_roformer_add+directml`) è più vecchio e privo delle ultime patch. Molti utenti Linux usano l'`.exe` di Windows dentro **Bottles** con profilo **Gaming** (copiando l'installer dentro `drive_c`) per sfruttare la GPU.

## 3. Scaricare i modelli

### Download Center integrato

1. Clicca l'icona **Settings** (chiave inglese) in basso a sinistra → **Download Center** (oppure scegli **Download More Models** in fondo al menu a tendina dei modelli).
2. Seleziona la categoria (**VR Arch**, **MDX-Net**, **Demucs**, **BS/Mel-Roformer**, ecc.) e clicca l'icona di download accanto a ogni modello.

### Installare modelli Roformer / esterni personalizzati (`.ckpt` + `.yaml`)

Alcuni modelli della community (come `dereverb_bs_roformer_anvuew_sdr_22.5050.ckpt`) non compaiono nel Download Center e richiedono sia il file `.ckpt` che il file di configurazione `.yaml`:

- **Metodo A - Opzione Install Model (Patch #10+)**:
  1. Fai tasto destro dentro l'elenco **Choose MDX-Net Model** e clicca **Install Model**.
  2. Seleziona il file `.ckpt` e il relativo `.yaml` quando richiesto.
- **Metodo B - Installazione manuale**:
  1. Copia il file `.ckpt` (o `.onnx`) in `Ultimate Vocal Remover\models\MDX_Net_Models\`.
  2. Copia il file `.yaml` in `Ultimate Vocal Remover\models\MDX_Net_Models\model_data\mdx_c_configs\`.
  3. Seleziona il modello in UVR5, premi **Yes** per riconoscerlo, scegli **Roformer** (quasi sempre **non-v2**; `BS` o `Mel` in base al nome del modello) e indica il file `.yaml`.

> **Attenzione ai file `.yaml`**:
> - Quando scarichi un `.yaml` dal browser o da Hugging Face, assicurati che venga salvato con estensione **`.yaml`** e non **`.yaml.txt`** (usa **Raw** → Salva con nome → Tutti i file).
> - Sulla patch **RTX 5000 CUDA 12.8**, se un modello recente genera l'errore `torch._dynamo.polyfills.fx`, apri il suo `.yaml` e cambia `use_torch_checkpoint: True` in `False` (oppure rimuovi quella riga).
