---
label: "Changelog"
icon: ":memo:"
order: 94
permalink: /non-rvc/causal-voice-changer/changelog/
description: "Cronologia completa delle versioni e changelog di Causal Voice Changer (CVC) dalla v0.1.0 alla v0.3.2, con base 100 Hz v4, updater integrato e fix GPU."
---
# Changelog di Causal Voice Changer

[Release su GitHub](https://github.com/mojowozo/Causal-Voice-Changer/releases)

## v0.3.2 (20/11/2026)

- Rilascio minore che migliora la qualità audio complessiva sia in training che nell'inferenza in tempo reale.

---

## v0.3.1 (20/11/2026)

### Novità
- Aggiunto un **updater integrato** direttamente nell'app. Il controllo automatico degli aggiornamenti è attivo di default e può essere disattivato dalla pagina **About**.

### Correzioni e miglioramenti
- Risolto un bug su Windows che poteva impedire il rilevamento delle GPU.
- Migliorata la gestione in tempo reale delle voci più gravi per aumentare la qualità in uscita.

---

## v0.3.0 (19/11/2026)

Aggiorna il modello base predefinito a 100 Hz alla **v4 (`causalvc-base-v4-100hz`)** mantenendo la stessa latenza di 50 ms e il supporto completo ai CUDA Graph.

- **Risate, sospiri e sussurri migliorati:** Sostituita la commutazione binaria voiced/unvoiced con una confidenza continua di periodicità (`0..1`), sfumando in modo fluido armoniche e respiro.
- **Condizionamento spettrale CUDA-Graph e ancoraggio L2-SP:** Le voci allenate su parlato calmo mantengono comunque risate e sussurri naturali.
- **Estensione pitch più ampia (`32 Hz - 1400 Hz`):** Tracciamento ed elaborazione dal vocal fry più profondo fino alle note di soprano, alleggerendo in modo naturale gli spostamenti verso l'alto.
- **Soppressione silenzi e click del microfono:** Aggiunta una loss dedicata al pavimento di silenzio che riduce click e scatti di circa 33-40 dB anche con *Ignore background sounds* disattivato.
- **Compatibilità trasparente:** Le installazioni esistenti aggiornano automaticamente `weights/causalvc-base/` al prossimo avvio, e tutte le voci `.cvc` precedenti (50 Hz e 100 Hz) continuano a funzionare senza modifiche.

---

## v0.2.0 (19/11/2026)

Passa il modello base predefinito e il front-end streaming da **50 Hz (frame da 20 ms)** a **100 Hz (frame da 10 ms)**.

- **Latenza ridotta (`50 ms`):** Basato su `causalvc-base-v3-100hz`, riduce il ritardo algoritmico da `60 ms` a `50 ms` raddoppiando la risoluzione temporale su consonanti rapide e respiri.
- **Eliminazione aliasing armonico e ronzii:** Roll-off Nyquist morbido (`exc="bandlimit"`) e interpolazione frazionaria continua del pitch (`smooth_in="p"`) per glissati e vibrati fluidi.
- **Tracciamento note alte (`350-1000+ Hz`):** Pitch tracker ri-distillato (`-3` a `+14` semitoni) ed encoder esteso (EARS + VCTK + LibriTTS-R) per evitare buchi o salti di ottava sugli acuti.
- **Fix training e `.cvc`:** Risolto bug su dataset a file singolo con `--perturb`, rilevamento automatico banda (`detect_fmax`) per dataset a 16/24 kHz, opzione **Random microphone colour** e inclusione automatica di encoder/pitch tracker personalizzati nei `.cvc` (~46 MB standard).
- **Streaming CUDA Graph:** Supporto completo CUDA Graph a 100 Hz fino a blocchi da `10 ms` / `20 ms`.

---

## v0.1.1 (17/11/2026)

- **Finestre app già compilate nelle release:** I pacchetti Windows (`.zip`) e Linux (`.tar.gz`) includono già le finestre compilate, evitando di dover installare `.NET 10 SDK` o `Rust` al primo avvio.
- **Fix AMD Radeon RX 6000 su Windows:** Corretto l'ordine di caricamento librerie prima di PyTorch per permettere l'avvio di ROCm (risolvendo `"The engine is not available"` / errore Windows `1114`).
- **Fix launcher e ambiente:** Usa sempre l'ambiente Python installato dai launcher, mostra dettagli Python/PyTorch in caso di errore e rispetta `CAUSALVC_GPU`.

---

## v0.1.0 (17/11/2026)

Prima release pubblica di **Causal Voice Changer**:
- Voice changer streaming a 48 kHz con look-ahead da 60 ms.
- **App di training** (`run-training.bat` / `run-training.sh`) in `bfloat16`, con coda di allenamento e senza dover tagliare manualmente i silenzi.
- **App Realtime** (`run-realtime.bat` / `run-realtime.sh` - WinUI 3 su Windows, COSMIC su Linux) con pitch/Index per voce, riduzione rumore Hushwire/RNNoise, **Soften sudden treble**, CUDA Graphs, registrazione, file input e ASIO su Windows.
- Formato singolo `.cvc` e supporto GPU NVIDIA CUDA e AMD ROCm.
- **Nota licenza:** Modello base allenato su EARS, VCTK e LibriTTS-R (solo uso non commerciale a causa di EARS).
