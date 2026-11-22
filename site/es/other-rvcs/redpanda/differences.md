# Redpanda-vc vs Otras Versiones RVC - Comparativa Completa de Funciones

[Configurar Redpanda-vc](first-run.md) · [Entrenar modelos RVC (EMA y Steps)](training.md) · [Probar audio en vivo](live-audio.md)

Esta guía compara **Redpanda-vc** directamente con **RVC Mainline**, **Applio** e **Ilaria RVC** a partir del código fuente de sus ramas `main`.

---

## ¿Qué hace diferente a Redpanda-vc?

Estos programas **no** son versiones sucesivas de la misma aplicación, sino proyectos relacionados con objetivos distintos:

- **RVC:** Familia de técnicas y modelos para conversión de voz (Retrieval-based Voice Conversion).
- **RVC Mainline:** La implementación de referencia original (`RVC-Project/Retrieval-based-Voice-Conversion-WebUI`).
- **Applio:** Aplicación que amplía la WebUI, vocoders y herramientas alrededor de RVC.
- **Redpanda-vc:** Un fork de **Applio** (`redpanda343/Redpanda-vc`) que añade Generator EMA, guardado de checkpoints por pasos en RVC, entrenamiento/inferencia **Rectified Flow**, **Beatrice 2** y **entrenamiento dedicado de vocoders**.
- **Ilaria RVC:** Implementación personalizada basada en RVC Mainline (`TheStingerX/Ilaria-RVC`) con su propio pipeline de inferencia, `Training Target: Steps`, soporte RefineGAN/MRF HiFi-GAN, Audio Analyzer, Voice Blender y TTS.

Un fork **no** es automáticamente mejor que el original en todo: cada proyecto equilibra simplicidad, estabilidad, compatibilidad y arquitecturas adicionales.

---

## Comparativa general de funciones

| Función | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **RVC V1** | **Yes** | **Different implementation** *(UI enfocada en `RVC (V2)` y `Applio`)* | **Yes** | **Yes** |
| **RVC V2** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Entrenamiento RVC** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Entrenamiento por épocas** | **Yes** | **Yes** | **Different implementation** *(objetivo por pasos)* | **Yes** |
| **Objetivo por pasos** | **No - verified** | **No - verified** | **Yes** (`Total Steps`) | **Yes** (`Training Target: Steps`) |
| **Checkpoints por épocas** | **Yes** | **Yes** (`save_every_epoch`) | **No - verified** *(usa intervalos de pasos)* | **Yes** (`save_every_epoch`) |
| **Checkpoints por pasos** | **No - verified** | **No - verified** | **Yes** (`Save Every X Steps`) | **No - verified** *(guarda por épocas; época parcial al parar/final)* |
| **Generator EMA** | **No - verified** | **No - verified** | **Yes** (`GeneratorEMA`) | **No - verified** |
| **Reanudar (`G`/`D`)** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Exportar `.pth` intermedios** | **Yes** | **Yes** (`save_every_weights`) | **Yes** (`Save Every Weights`) | **Yes** *(en épocas completas `save_every_epoch`)* |
| **Entrenamiento Rectified Flow** | **No - verified** | **No - verified** | **Yes** | **No - verified** |
| **Entrenamiento Beatrice 2** | **No - verified** | **No - verified** | **Yes** | **No - verified** *(Beatrice es solo extractor F0)* |
| **Entrenamiento de vocoder** | **No - verified** | **No - verified** | **Yes** (`tabs/train/nsf_hifigan.py`) | **No - verified** |
| **HiFi-GAN** | **Yes** | **Yes** | **Yes** | **Yes** |
| **RefineGAN** | **No - verified** | **Yes** | **Yes** | **Yes** *(32 kHz v2 f0)* |
| **MRF HiFi-GAN** | **No - verified** | **Yes** | **Yes** | **Yes** *(v2 f0)* |
| **Pretrained personalizados** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Warmup del learning rate** | **No - verified** | **No - verified** | **Yes** (`Warmup Steps`) | **No - verified** |
| **LR scheduling** | **Different implementation** *(exponencial por época)* | **Different implementation** *(exponencial por época)* | **Yes** (`Exponential` / `Cosine`) | **Different implementation** *(exponencial por época)* |
| **Control de batch** | **Yes** (`batch_size`) | **Yes** (`batch_size`) | **Yes** (`Batch Size` + `Max Audio per Batch`) | **Yes** (`batch_size`) |
| **Optimización de VRAM** | **Different implementation** *(FP16, caché GPU)* | **Yes** (`Checkpointing`, caché GPU) | **Yes** (`Checkpointing`, caché GPU) | **Different implementation** *(FP16/BF16, caché GPU)* |
| **Extracción de rasgos y F0** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Inferencia offline** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Conversión en tiempo real** | **Yes** | **Yes** | **Yes** | **No - verified** *(solo offline y lotes)* |
| **GUI desktop realtime** | **Yes** (`realtime_gui.py`) | **Different implementation** | **Yes** (`run-realtime-gui.bat`) | **No - verified** |
| **Realtime en navegador** | **No - verified** | **Yes** (`tabs/realtime`) | **Yes** (WebSocket + respaldo HTTP) | **No - verified** |
| **Entrenamiento multi-GPU** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Múltiples flujos realtime multi-GPU** | **No - verified** | **Not verified** | **Yes** *(1 GPU por flujo)* | **No - verified** |
| **Soporte multifamilia** | **No - verified** *(solo RVC)* | **Partial** *(RVC + Applio)* | **Yes** *(RVC + Rectified Flow + Beatrice)* | **No - verified** *(solo RVC)* |
| **Sistemas operativos** | Windows / Linux / macOS | Windows / Linux / macOS | Windows / Linux / macOS *(CUDA/MPS/CPU)* | Windows / Linux *(CUDA/DirectML/CPU)* |
| **Monitorización** | TensorBoard | TensorBoard + Overtraining Detector | TensorBoard | TensorBoard + Audio Analyzer + Training Previews |

---

## Generator EMA, Pasos, Rectified Flow, Beatrice y Vocoder

- **Generator EMA (`rvc/train/train.py`):** Mantiene un promedio exponencial móvil de los pesos del generador (actualizado tras cada paso del optimizador, distinto de los momentos internos de Adam). `Generator EMA Decay` (`0`–`0.9999`, defecto `0.999`) suaviza oscilaciones al exportar, sin garantizar mejor calidad ni evitar overfitting. Ver [Entrenar modelos RVC en Redpanda-vc](training.md).
- **Entrenamiento y guardado por pasos:** Redpanda-vc guarda `G`/`D` y `.pth` cada `Save Every X Steps` (`1000` por defecto) hasta `Total Steps` (`10000`), incluso a mitad de época. Applio y RVC Mainline guardan por épocas. **Ilaria RVC** soporta `Training Target: Steps` para detenerse en un paso exacto, pero su frecuencia de guardado y exportación intermedia `.pth` sigue contando épocas completas (`save_every_epoch`).
- **Rectified Flow (`rectified_flow/`):** Arquitectura acústica inspirada en DiffSinger que usa rasgos **ContentVec** en lugar de fonemas (con presets `standard`, `meanflow`, `smaller`) y un vocoder aparte. **No** es RVC V2 aunque use extensión `.pth`.
- **Beatrice 2 (`beatrice/`):** Arquitectura independiente optimizada para CPU (entrenamiento y tiempo real en carpeta propia), distinta de usar Beatrice solo como extractor F0.
- **Entrenamiento dedicado de vocoder (`tabs/train/nsf_hifigan.py`):** Entrena o ajusta `PC-NSF-HiFiGAN`, `NSF-HiFiGAN` y `Vocos` (24 kHz) desde cero o pretrained para emparejarlos con salidas mel de Rectified Flow (no aplicable arbitrariamente a cualquier RVC estándar).

---

## Tiempo Real, Controles Avanzados y Compatibilidad

- **Tiempo real:** Redpanda-vc ofrece `run-realtime-gui.bat` (RVC + Beatrice + Rectified Flow) y pestaña WebUI con WebSocket binario y respaldo HTTP. Con varias GPU, cada flujo permanece en una GPU para aumentar capacidad concurrente (no acelera un solo flujo).
- **Controles avanzados de entrenamiento:** `Learning Rate Schedule` (`Exponential` / `Cosine`), `Warmup Steps`, `Learning Rate Decay Every X Steps`, `Final Learning Rate`, `Max Audio per Batch (sec)`, `Checkpointing` (VRAM) y `Reset Optimizer State`.

| Tipo de modelo | Redpanda-vc | RVC Mainline | Applio | Ilaria RVC | Otros clientes (Okada / Vonovox) |
| --- | --- | --- | --- | --- | --- |
| **RVC V1 (`.pth` inferencia)** | **Yes** | **Yes** | **Different implementation** | **Yes** | **Yes** |
| **RVC V2 HiFi-GAN (`.pth`)** | **Yes** | **Yes** | **Yes** | **Yes** | **Yes** |
| **RVC V2 RefineGAN / MRF (`.pth`)** | **Yes** | **No - verified** | **Yes** | **Yes** *(RefineGAN 32 kHz)* | **No - verified** |
| **Rectified Flow (`.pth`)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **No - verified** |
| **Beatrice 2 (carpeta)** | **Yes** | **No - verified** | **No - verified** | **No - verified** | **Version-dependent** *(clientes/VST Beatrice)* |
| **Vocoder (`nsf_hifigan`)** | **Yes** *(Rectified Flow)* | **No - verified** | **No - verified** | **No - verified** | **No - verified** |
| **Checkpoints (`G_*`/`D_*`) & `.index`** | **Yes** *(RVC)* | **Yes** *(RVC)* | **Yes** *(RVC)* | **Yes** *(RVC)* | **`.index` sí / `G_*` no** |

---

## ¿Qué versión elegir? y FAQ

- **RVC Mainline:** Flujo de referencia original y `realtime_gui.py`.
- **Applio:** Entorno completo por épocas con TTS y Overtraining Detector.
- **Redpanda-vc:** Para **Generator EMA**, **guardado por pasos**, **Rectified Flow**, **Beatrice 2**, **entrenamiento de vocoders** o **realtime WebSocket / multi-GPU**.
- **Ilaria RVC:** Estudio RVC offline con `Training Target: Steps`, `Audio Analyzer`, `Voice Blender`, `RMVPE High Register` y `Proposed Pitch`.

**FAQ:** Un fork parte de otro proyecto para añadir funciones; Redpanda-vc deriva de Applio pero añade EMA, pasos, Rectified Flow, Beatrice 2 y vocoders; no garantiza mejor voz por sí solo; los `.pth` de RVC V1/V2 HiFi-GAN son compatibles con clientes estándar, pero Rectified Flow y Beatrice son arquitecturas distintas; multi-GPU en realtime permite varios flujos paralelos sin acelerar uno solo.

---

## Fuentes y referencias técnicas

Verificado en ramas `main` el **2026-11-22**:

- **Redpanda-vc** (`55a3a80`, 2026-10-31): [Repositorio](https://github.com/redpanda343/Redpanda-vc) · [`tabs/train/train.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/tabs/train/train.py) · [`tabs/train/rvc.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/tabs/train/rvc.py) · [`rvc/train/train.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py) · [`rectified_flow/`](https://github.com/redpanda343/Redpanda-vc/tree/main/rectified_flow) · [`beatrice/`](https://github.com/redpanda343/Redpanda-vc/tree/main/beatrice) · [`nsf_hifigan/`](https://github.com/redpanda343/Redpanda-vc/tree/main/nsf_hifigan)
- **Applio** (`445b0f6`, 2026-11-19): [Repositorio](https://github.com/IAHispano/Applio) · [`tabs/train/train.py`](https://github.com/IAHispano/Applio/blob/main/tabs/train/train.py) · [`rvc/train/train.py`](https://github.com/IAHispano/Applio/blob/main/rvc/train/train.py)
- **RVC Mainline** (`81eed5e`, 2026-08-04): [Repositorio](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [`train/train.py`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/main/train/train.py)
- **Ilaria RVC** (`a887ba5`, 2026-11-21): [Repositorio](https://github.com/TheStingerX/Ilaria-RVC) · [`app/ILARIA_RVC.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/main/app/ILARIA_RVC.py) · [`app/infer/modules/train/train.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/main/app/infer/modules/train/train.py)
