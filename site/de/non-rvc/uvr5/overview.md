# Ultimate Vocal Remover (UVR5)

[GitHub](https://github.com/Anjok07/ultimatevocalremovergui) · [Offizielle Releases](https://github.com/Anjok07/ultimatevocalremovergui/releases) · [Beta Roformer-Patches](https://github.com/TRvlvr/model_repo/releases/tag/uvr_update_patches)

!!!warning
**Bevorstehendes Release: UVR6 kommt bald!**

**Ultimate Vocal Remover 6 (UVR6)** erscheint am **11. Dezember 2026 für Windows**, **Mac** folgt kurz darauf und danach **Linux**. Da **UVR5** bald von dieser neuen Hauptversion abgelöst wird, behalte rund um den Release-Termin die offizielle Release-Seite im Blick, falls du umsteigen möchtest.
!!!

**UVR5** (Ultimate Vocal Remover v5 GUI) ist eine kostenlose Open-Source-Desktop-App zur **KI-gestützten Audiotrennung**. Sie läuft lokal auf deinem PC und trennt Songs oder Dialoge in saubere Vocals, Instrumentals, Backing Vocals, einzelne Stems (Drums, Bass, Other) und entfernt Hall, Echo sowie Hintergrundrauschen - eines der beliebtesten Tools zur Vorbereitung von RVC-Datasets und Covern.

## Unterstützte KI-Architekturen

- **VR Architecture** (`v4`, `v5`, `v5.1`): schnelle, zuverlässige Modelle für Vocals, Karaoke (Lead vs. Backing), De-Echo, De-Reverb und Denoising.
- **MDX-Net** (`v2`, `MDX23C` sowie **BS-Roformer**, **Mel-Roformer**, **SCNet** und **Bandit** in Beta-Roformer-Patches): modernste Architekturen im MDX-Net-Menü von UVR5.
- **Demucs** (`v1`–`v4`, wie `htdemucs` und `htdemucs_ft`): Metas Multi-Stem-Modelle (4 Stems: Vocals, Drums, Bass, Other; oder 6 Stems), ideal für einzelne Instrumente oder Ensembles.
- **Integrierte Audio-Tools**: **Manual Ensemble** (kombiniert Modellausgaben per Min/Max Spec oder Average), **Ensemble Mode**, **Vocal Splitter**, **Demudder** (Windows-Patch #14+) und **Apollo** Audio-Upscaler.

## Systemanforderungen & GPU-Support

| Plattform | Anforderungen & Beschleunigungs-Hinweise |
| --- | --- |
| **Windows 10/11 (64-Bit)** | **Muss auf Laufwerk `C:\` installiert werden** (andere Laufwerke können Instabilität verursachen). Intel Pentium- und Celeron-CPUs werden nicht garantiert. |
| **NVIDIA-GPUs (CUDA)** | Maxwell (GTX 900-Serie, Compute 5.0) oder neuer. GTX 600 / GT 700 und älter werden für CUDA nicht unterstützt. **6 GB+ VRAM** (z. B. RTX 3050 6–8 GB oder besser) für Roformer empfohlen; 2–4 GB laufen mit kleinerem `chunk_size` / `dim_t`. **RTX 5000-Serie** benötigt den speziellen CUDA-12.8-Patch. |
| **AMD- & Intel-GPUs (DirectML)** | Nutzt **DirectML** (in älteren v5.6.0-Builds als *OpenCL* bezeichnet). Getestet auf AMD RX 4 GB+ (RX 6600 XT / 7600+ für Roformer empfohlen) und Intel Arc / Xe-iGPUs. **16 GB VRAM** empfohlen, um Standard-`chunk_size` zu nutzen (sonst reduzieren). *Hinweis: Apollo, Bandit und SCNet fallen bei DirectML auf CPU zurück.* |
| **macOS** | macOS Big Sur oder neuer (Catalina oder älter nicht garantiert). Apple Silicon (**MPS**) funktioniert für Demucs, MDX-Net und Roformer. UVR direkt in `/Applications` ablegen. |
| **Linux** | Nativer Branch `v5.6.0_roformer_add+directml`, oder Windows-Installer via **Bottles** (WINE-Gaming-Profil in `drive_c`) für neuere Roformer-Patches mit GPU-Beschleunigung. |
