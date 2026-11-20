# Ultimate Vocal Remover (UVR5)

[GitHub](https://github.com/Anjok07/ultimatevocalremovergui) · [Releases oficiales](https://github.com/Anjok07/ultimatevocalremovergui/releases) · [Parches Beta Roformer](https://github.com/TRvlvr/model_repo/releases/tag/uvr_update_patches)

**UVR5** (Ultimate Vocal Remover v5 GUI) es una aplicación de escritorio gratuita y de código abierto para la **separación de fuentes de audio con IA**. Se ejecuta localmente en tu PC y permite separar canciones o diálogos en voz limpia, instrumental, coros, stems individuales (batería, bajo, otros) y eliminar reverberación, eco y ruido de fondo - siendo una de las herramientas más utilizadas para preparar datasets de RVC y covers.

## Arquitecturas de IA compatibles

- **VR Architecture** (`v4`, `v5`, `v5.1`): modelos rápidos y fiables ideales para voces, karaoke (voz principal vs. coros), de-echo, de-reverb y reducción de ruido.
- **MDX-Net** (`v2`, `MDX23C`, además de **BS-Roformer**, **Mel-Roformer**, **SCNet** y **Bandit** en los parches beta de Roformer): arquitecturas de última generación agrupadas bajo el menú MDX-Net en UVR5.
- **Demucs** (`v1`–`v4`, como `htdemucs` y `htdemucs_ft`): modelos multi-stem de Meta (4 stems: voz, batería, bajo, otros; o 6 stems), ideales para aislar instrumentos o crear ensembles.
- **Herramientas de audio integradas**: **Manual Ensemble** (combina salidas de varios modelos con Min/Max Spec o Average), **Ensemble Mode**, **Vocal Splitter**, **Demudder** (parche Windows #14+) y reescalador de audio **Apollo**.

## Requisitos del sistema y soporte de GPU

| Plataforma | Requisitos y notas de aceleración |
| --- | --- |
| **Windows 10/11 (64 bits)** | **Debe instalarse en la unidad `C:\`** (instalar en otro disco puede causar inestabilidad). No se garantiza en CPUs Intel Pentium o Celeron. |
| **GPUs NVIDIA (CUDA)** | Maxwell (serie GTX 900, compute 5.0) o posterior. GTX 600 / GT 700 y anteriores no son compatibles con CUDA. Se recomiendan **6 GB+ VRAM** (ej. RTX 3050 6–8 GB o superior) para Roformers; 2–4 GB funcionan bajando `chunk_size` / `dim_t`. La serie **RTX 5000** requiere el parche dedicado CUDA 12.8. |
| **GPUs AMD e Intel (DirectML)** | Usa **DirectML** (etiquetado como *OpenCL* en compilaciones v5.6.0 antiguas). Probado en AMD RX 4 GB+ (se recomienda RX 6600 XT / 7600+ para Roformers) e Intel Arc / Xe. Se recomiendan **16 GB VRAM** para mantener el `chunk_size` por defecto en Roformers (de lo contrario bájalo). *Nota: Apollo, Bandit y SCNet pasan a CPU en DirectML.* |
| **macOS** | macOS Big Sur o posterior (Catalina o inferior no garantizado). La aceleración Apple Silicon (**MPS**) funciona con Demucs, MDX-Net y Roformers. Coloca UVR directamente en `/Applications`. |
| **Linux** | Rama nativa `v5.6.0_roformer_add+directml`, o ejecuta el instalador de Windows con **Bottles** (perfil WINE Gaming dentro de `drive_c`) para usar parches recientes con GPU. |
