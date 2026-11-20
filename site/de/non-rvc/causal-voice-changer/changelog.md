# Causal Voice Changer Changelog

[GitHub-Releases](https://github.com/mojowozo/Causal-Voice-Changer/releases)

## v0.3.2 (20.11.2026)

- Kleines Update zur Verbesserung der allgemeinen Klangqualität bei Training und Echtzeit-Inferenz.

---

## v0.3.1 (20.11.2026)

### Neu
- **Integrierter Updater** direkt in der App hinzugefügt. Automatische Update-Prüfungen laufen standardmäßig und lassen sich auf der **About**-Seite abschalten.

### Fehlerbehebungen & Verbesserungen
- Windows-Bug behoben, durch den GPUs teilweise nicht erkannt wurden.
- Verbesserte Echtzeit-Verarbeitung für tiefere Stimmen zur Steigerung der Ausgabequalität.

---

## v0.3.0 (19.11.2026)

Aktualisiert das standardmäßige 100-Hz-Basismodell auf **v4 (`causalvc-base-v4-100hz`)** bei gleicher 50-ms-Modelllatenz und voller CUDA-Graph-Unterstützung.

- **Besseres Lachen, Seufzen & Flüstern:** Binäre Voiced/Unvoiced-Umschaltung durch kontinuierliche Periodizitäts-Konfidenz (`0..1`) ersetzt.
- **CUDA-Graph-fähige Spektralkonditionierung & L2-SP-Anker:** Auf ruhiger Sprache trainierte Stimmen behalten natürliches Lachen und Flüstern.
- **Erweiterter Tonhöhenbereich (`32 Hz - 1400 Hz`):** Pitch-Tracking vom tiefen Vocal Fry bis zu Sopran-Tönen mit natürlicher Registeranpassung nach oben.
- **Stille- & Klick-Unterdrückung:** Dedizierter Silence-Floor-Loss senkt ungewollte Mikrofon-Klicks um ~33-40 dB, selbst wenn *Ignore background sounds* aus ist.
- **Nahtlose Kompatibilität:** Bestehende Installationen aktualisieren `weights/causalvc-base/` automatisch und frühere 50-Hz-/100-Hz-`.cvc`-Stimmen laufen unverändert weiter.

---

## v0.2.0 (19.11.2026)

Wechselt das Standard-Basismodell und Streaming-Frontend von **50 Hz (20-ms-Frames)** auf **100 Hz (10-ms-Frames)**.

- **Geringere Latenz (`50 ms`):** Basiert auf `causalvc-base-v3-100hz`, senkt die Modellverzögerung von `60 ms` auf `50 ms` bei doppelter Zeitauflösung für schnelle Konsonanten und Atemgeräusche.
- **Kein harmonisches Aliasing mehr:** Sanfter Nyquist-Roll-off (`exc="bandlimit"`) und kontinuierliche fraktionale Pitch-Interpolation (`smooth_in="p"`).
- **Hohe Töne (`350-1000+ Hz`):** Neu destillierter Pitch-Tracker (`-3` bis `+14` Halbtöne) und erweiterter Encoder (EARS + VCTK + LibriTTS-R) gegen Aussetzer und Oktavsprünge.
- **Trainings- & `.cvc`-Fixes:** Single-File-`--perturb`-Bug behoben, automatische Bandbreitenerkennung (`detect_fmax`) für 16/24-kHz-Daten, **Random microphone colour**-Schalter und automatisches Bündeln eigener Encoder (~46 MB).
- **CUDA-Graph-Streaming:** Voller CUDA-Graph-Support für 100 Hz bis hinunter zu `10 ms` / `20 ms`-Blöcken.

---

## v0.1.1 (17.11.2026)

- **Vorkompilierte App-Fenster in Releases:** Windows- (`.zip`) und Linux-Pakete (`.tar.gz`) enthalten fertige Fenster ohne Bedarf an `.NET 10 SDK` oder `Rust`.
- **AMD Radeon RX 6000 Fix unter Windows:** Ladereihenfolge vor PyTorch korrigiert, damit AMD ROCm startet (behebt `"The engine is not available"` / Windows-Fehler `1114`).
- **Launcher-Fixes:** Nutzt stets die vom Launcher installierte Python-Umgebung, nennt Python/PyTorch-Details bei Startfehlern und beachtet `CAUSALVC_GPU`.

---

## v0.1.0 (17.11.2026)

Erste öffentliche Version von **Causal Voice Changer**:
- 48-kHz-Streaming-Voice-Changer mit 60 ms Look-Ahead.
- **Trainings-App** (`run-training.bat` / `run-training.sh`) mit `bfloat16`, Warteschlange und ohne manuelles Schneiden.
- **Echtzeit-App** (`run-realtime.bat` / `run-realtime.sh` - WinUI 3 unter Windows, COSMIC unter Linux) mit Pitch/Index pro Stimme, Hushwire/RNNoise, **Soften sudden treble**, CUDA Graphs, Aufnahme, Dateieingang und ASIO unter Windows.
- Einzeldatei-Format `.cvc` sowie NVIDIA-CUDA- und AMD-ROCm-Support.
- **Lizenzhinweis:** Basismodell auf EARS, VCTK und LibriTTS-R trainiert (wegen EARS nicht kommerziell nutzbar).
