# Causal Voice Changer Changelog

[GitHub Releases](https://github.com/mojowozo/Causal-Voice-Changer/releases)

## v0.3.2 (2026-11-20)

- Minor release improving overall sound quality in both training and real-time inference.

---

## v0.3.1 (2026-11-20)

### New
- Added a **built-in updater** directly in the app. Automatic update checks run by default and can be toggled off in the **About** page.

### Fixes & Improvements
- Fixed a Windows bug where GPUs could fail to be detected.
- Improved real-time handling for lower-pitched voices to improve output quality.

---

## v0.3.0 (2026-11-19)

Upgrades the default 100 Hz base model to **v4 (`causalvc-base-v4-100hz`)** while keeping the same 50 ms model latency and full CUDA Graph support.

- **Improved laughter, sighs & whispers:** Replaced binary voiced/unvoiced switching with continuous periodicity confidence (`0..1`), smoothly blending harmonic pulse and breath turbulence.
- **CUDA-Graph spectral tone conditioning & L2-SP anchoring:** Voices trained on calm speech datasets retain natural laughter and whisper behavior.
- **Wider pitch range (`32 Hz - 1400 Hz`):** Expanded pitch tracking and continuous log-F0 register conditioning from deep vocal fry up to soprano notes so large upward shifts lighten naturally.
- **Dead-air silence & click rejection:** Added a dedicated silence floor loss cutting unvoiced mic-click and snap bleed by ~33-40 dB even when *Ignore background sounds* is off.
- **Seamless compatibility:** Existing installs automatically upgrade `weights/causalvc-base/` on next launch/build, and earlier 50 Hz and 100 Hz `.cvc` voices continue to run unchanged.

---

## v0.2.0 (2026-11-19)

Switches the default base model and streaming front-end from **50 Hz (20 ms frames)** to **100 Hz (10 ms frames)**.

- **Lower latency (`50 ms`):** Built on `causalvc-base-v3-100hz`, reducing algorithmic model delay from `60 ms` to `50 ms` while doubling temporal resolution on fast consonants and breaths.
- **Eliminated harmonic aliasing & frame-rate buzz:** Smooth raised-cosine Nyquist roll-off (`exc="bandlimit"`) and continuous fractional pitch interpolation (`smooth_in="p"`) reduce aliasing spurs and smooth glissandos/vibrato.
- **High-note pitch tracking (`350-1000+ Hz`):** Re-distilled pitch tracker (`-3` to `+14` semitones) and extended encoder distillation (EARS + VCTK + LibriTTS-R) prevent dropouts and octave flips on high notes.
- **Training & `.cvc` fixes:** Fixed single-file `--perturb` + self-index bug, added automatic bandwidth detection (`detect_fmax`) for 16/24 kHz source datasets, added a **Random microphone colour** toggle, and auto-bundled custom encoders/pitch trackers in `.cvc` exports (~46 MB standard).
- **CUDA Graph streaming:** Full CUDA Graph support for 100 Hz streaming down to `10 ms` / `20 ms` blocks.

---

## v0.1.1 (2026-11-17)

- **Pre-built app windows in releases:** Windows (`.zip`) and Linux (`.tar.gz`) archives now include built app windows so `.NET 10 SDK` or `Rust` are no longer required on first launch.
- **AMD Radeon RX 6000 fix on Windows:** Fixed library load order before PyTorch so AMD ROCm builds start properly (eliminating `"The engine is not available"` / Windows error `1114`).
- **Launcher & environment fixes:** Ensures the voice changer uses the launcher-installed Python environment, prints Python/PyTorch details on startup errors, and honors `CAUSALVC_GPU`.

---

## v0.1.0 (2026-11-17)

Initial public release of **Causal Voice Changer**:
- 48 kHz streaming voice changer with 60 ms look-ahead (lower latency than chunk-stitching RVC).
- **Training app** (`run-training.bat` / `run-training.sh`) with `bfloat16` training, queued builds, and no manual slicing needed.
- **Realtime app** (`run-realtime.bat` / `run-realtime.sh` - WinUI 3 on Windows, COSMIC on Linux) with per-voice pitch/Index controls, Hushwire/RNNoise denoising, **Soften sudden treble**, CUDA Graphs, recording, file input, and ASIO on Windows.
- Single-file `.cvc` voice format and NVIDIA CUDA + AMD ROCm GPU support.
- **Licence note:** Base model trained on EARS, VCTK, and LibriTTS-R (non-commercial due to EARS).
