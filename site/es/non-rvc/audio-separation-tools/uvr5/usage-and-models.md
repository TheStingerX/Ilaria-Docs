# Guía de UVR5 y modelos recomendados

Usa esta guía para configurar UVR5 correctamente y elegir los mejores modelos para aislar voces, eliminar coros/armonías, quitar reverberación/eco y limpiar ruido (incluidos los modelos de las configuraciones recomendadas).

## 1. Ventana principal y ajustes clave

- **Select Input / Output**: elige tus archivos de audio y carpeta de salida. Usa **`WAV`** al preparar datasets para RVC (`Additional Settings` también permite salida de 64-bit float).
- **GPU Conversion**: déjalo **marcado** si tienes una GPU NVIDIA, AMD, Intel o Apple Silicon compatible.
  - *Nota*: si una GPU GTX 10XX genera salida en silencio, deja desactivado **Inference Mode** en `Settings → Advanced MDX-Net Options → Multi-Network`. En RTX / GTX 16 puedes activarlo para ganar velocidad.
- **Vocals Only / Instrumental Only**: marca uno si solo necesitas esa pista (por ejemplo, **Instrumental Only** si solo quieres el instrumental o la pista procesada según el modelo).
- **Segment Size** (pestaña `MDX-Net`, ej. **`256`**): controla la memoria por bloque para modelos MDX-Net estándar.
  - *Nota para Roformers*: si **Segment Default** está activado en Advanced MDX-Net Options, UVR5 lee `chunk_size` directamente del `.yaml` del modelo en lugar del desplegable Segment Size.
- **Overlap** (para Roformers): **`4`** ofrece el mejor equilibrio entre velocidad y calidad SDR; **`8`** aporta algo más de consistencia, mientras que `16–32` es mucho más lento con mejora mínima. El valor de la interfaz sustituye al del `.yaml`.
- **Ajustes de VR Architecture**:
  - **Window Size**: `512` (más preciso) o `320` (más rápido / habitual en metal y ensembles).
  - **Aggression Setting**: normalmente `5`–`10` para voces/karaoke; **`3.0–5.0`** para `UVR-DeEcho-DeReverb`; y valores negativos (**`-10` a `-25`**) para `UVR-DeNoise` en voces para no adelgazarlas.
  - **TTA** *(Test-Time Augmentation)*: mejora la calidad duplicando aproximadamente el tiempo de proceso.

## 2. Modelos recomendados por tarea

### Modelos MDX-Net y BS-Roformer

| Modelo | Función | Notas |
| --- | --- | --- |
| **`BS-Roformer-Viperx-1297`** | **Separación principal Voz / Instrumental** | Clásico modelo BS-Roformer de primer nivel. Excelente para extraer instrumentales y voces limpias, y base habitual en ensembles (`1296 + 1297 + MDX23C HQ`). |
| **`UVR-MDX-NET Inst HQ 4`** | **Separación limpia Instrumental / Voz** | Modelo MDX-Net v2 muy rápido y limpio. Suele combinarse en ensembles con `1_HP-UVR` o modelos BS-Roformer. |
| **`dereverb_bs_roformer_anvuew_sdr_22.5050.ckpt`** | **De-Reverb (Roformer)** | Moderno modelo BS-Roformer de anvuew (entrenado con VST y presets Waves IR1). Suena más limpio y efectivo en reverberación vocal que los modelos mono antiguos. |

### Modelos VR Architecture

| Modelo | Función | Notas |
| --- | --- | --- |
| **`1_HP-UVR`** | **Separación Voz / Instrumental** | Clásico modelo VR high-pass. Útil solo o en ensembles (especialmente en mezclas densas/rock/metal) junto a modelos MDX-Net. |
| **`5_HP-Karaoke-UVR`** | **Voz principal vs. Coros** | Separa la voz principal de coros/armonías. Funciona mejor sobre **voces ya aisladas** (o mediante *Settings → Vocal Splitter Options*). |
| **`UVR-De-Echo-Normal`** | **De-Echo suave** | Elimina delay y eco ligero preservando mejor el timbre vocal; puede usarse tras o junto a DeReverb. |
| **`UVR-DeEcho-DeReverb`** | **De-Echo + De-Reverb fuerte** | Elimina eco y reverberación mono/estéreo cuando otros modelos fallan. Mantén **Aggression** en **`3.0–5.0`** (techo en frecuencia ~17.5 kHz). |
| **`UVR-DeNoise`** | **De-Noise intenso** | Eliminador de ruido de FoxJoy para siseo, ruido blanco y artefactos. En voces aisladas prueba **agresividad negativa (`-10` a `-25`)** para no dañar la voz. |
| **`UVR-DeNoise-Lite`** | **De-Noise ligero** | Menos agresivo que `UVR-DeNoise` (corte en `20 kHz`) y más seguro para instrumentos y armónicos; agresividad recomendada cerca de `4`. |

### Modelos Demucs

| Modelo | Función | Notas |
| --- | --- | --- |
| **`v4 \| htdemucs`** *(y `htdemucs_ft`)* | **Separación en 4 stems** | Divide pistas en **Vocals, Drums, Bass y Other**. Ideal para extraer batería/bajo o limpiar filtraciones en ensembles multi-stem. |

## 3. Flujo recomendado para limpiar datasets RVC

1. **Paso 1 - Separar voces**: procesa la pista con **`BS-Roformer-Viperx-1297`** (pestaña MDX-Net, GPU Conversion activado).
2. **Paso 2 - Quitar armonías / coros** *(si los hay)*: pasa la voz aislada por **`5_HP-Karaoke-UVR`** (pestaña VR Architecture).
3. **Paso 3 - Quitar reverberación y eco**: aplica **`dereverb_bs_roformer_anvuew_sdr_22.5050.ckpt`** (o **`UVR-DeEcho-DeReverb`** en Aggression `3–5` / **`UVR-De-Echo-Normal`**).
4. **Paso 4 - De-Noise final** *(solo si queda siseo o artefactos)*: usa **`UVR-DeNoise`** (con agresividad baja o negativa en voces) o **`UVR-DeNoise-Lite`**. Escucha siempre en auriculares comparando con el paso previo para no dañar consonantes.

## 4. Solución de problemas comunes

- **Error de memoria (`RuntimeError`) o atascado al 5% en DirectML (AMD/Intel)**:
  - Abre **Choose MDX-Net Model → Edit Model Config** (o edita su `.yaml` en `models\MDX_Net_Models\model_data\mdx_c_configs\`) y baja `chunk_size` (asegúrate de tener **Segment Default** marcado en opciones avanzadas MDX):
    - `352800` (8s) - valor por defecto en la mayoría de modelos; máximo para GPUs AMD/Intel de 8 GB.
    - `220500` (5s) o `200655` (4.5s) - seguro para tarjetas de 4–6 GB VRAM.
    - `112455` (2.55s) - mínimo seguro si persisten los cierres.
  - En NVIDIA de 2–4 GB VRAM, pon **CUDA Sysmem Fallback Policy** en **Prefer Sysmem Fallback** en el Panel de Control de NVIDIA.
- **Un Roformer no aparece en Ensemble / Vocal Splitter**: abre su `.yaml` y renombra las pistas de `other` / `vocals` / `Karaoke` a **`Instrumental`** y **`Vocals`** (respetando mayúsculas).
- **El PC se congela durante la separación**: cambia la prioridad de UVR a **Baja (Idle)** en el Administrador de tareas de Windows.
