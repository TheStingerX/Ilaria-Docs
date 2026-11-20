---
label: "Panoramica e requisiti"
icon: ":book:"
order: 99
permalink: /non-rvc/uvr5/overview/
---
# Ultimate Vocal Remover (UVR5)

[GitHub](https://github.com/Anjok07/ultimatevocalremovergui) · [Release ufficiali](https://github.com/Anjok07/ultimatevocalremovergui/releases) · [Patch Beta Roformer](https://github.com/TRvlvr/model_repo/releases/tag/uvr_update_patches)

**UVR5** (Ultimate Vocal Remover v5 GUI) è un'applicazione desktop gratuita e open-source per la **separazione audio con IA**. Gira localmente sul tuo PC e consente di separare brani o dialoghi in voce pulita, base strumentale, cori, singoli stem (batteria, basso, altro) e rimuovere riverbero, eco e rumore di fondo - risultando uno degli strumenti più usati per preparare dataset RVC e cover.

## Architetture IA supportate

- **VR Architecture** (`v4`, `v5`, `v5.1`): modelli veloci e affidabili per voce, karaoke (voce principale vs. cori), de-echo, de-reverb e denoise.
- **MDX-Net** (`v2`, `MDX23C`, più **BS-Roformer**, **Mel-Roformer**, **SCNet** e **Bandit** nelle patch beta Roformer): architetture allo stato dell'arte raccolte sotto il menu MDX-Net di UVR5.
- **Demucs** (`v1`–`v4`, come `htdemucs` e `htdemucs_ft`): modelli multi-stem di Meta (4 stem: voce, batteria, basso, altro; oppure 6 stem), ideali per isolare strumenti o creare ensemble.
- **Strumenti audio integrati**: **Manual Ensemble** (combina gli output di più modelli con Min/Max Spec o Average), **Ensemble Mode**, **Vocal Splitter**, **Demudder** (patch Windows #14+) e upscaler audio **Apollo**.

## Requisiti di sistema e supporto GPU

| Piattaforma | Requisiti e note sull'accelerazione |
| --- | --- |
| **Windows 10/11 (64-bit)** | **Va installato sul disco `C:\`** (l'installazione su dischi secondari può causare instabilità). CPU Intel Pentium e Celeron non sono garantite. |
| **GPU NVIDIA (CUDA)** | Maxwell (serie GTX 900, compute 5.0) o successive. GTX 600 / GT 700 e precedenti non sono supportate in CUDA. **6 GB+ VRAM** (es. RTX 3050 6–8 GB o superiore) consigliati per i Roformer; 2–4 GB funzionano riducendo `chunk_size` / `dim_t`. La serie **RTX 5000** richiede la patch dedicata CUDA 12.8. |
| **GPU AMD e Intel (DirectML)** | Usa **DirectML** (indicato come *OpenCL* nelle vecchie build v5.6.0). Testato su AMD RX 4 GB+ (consigliate RX 6600 XT / 7600+ per Roformer) e Intel Arc / iGPU Xe. **16 GB VRAM** consigliati per mantenere `chunk_size` predefinito sui Roformer (altrimenti va abbassato). *Nota: Apollo, Bandit e SCNet usano la CPU su DirectML.* |
| **macOS** | macOS Big Sur o successivo (Catalina o precedenti non garantiti). L'accelerazione Apple Silicon (**MPS**) funziona per Demucs, MDX-Net e Roformer. Posiziona UVR direttamente nella cartella principale `/Applications`. |
| **Linux** | Branch nativo `v5.6.0_roformer_add+directml`, oppure esecuzione dell'installer Windows tramite **Bottles** (profilo WINE Gaming dentro `drive_c`) per avere le patch Roformer recenti con accelerazione GPU. |
