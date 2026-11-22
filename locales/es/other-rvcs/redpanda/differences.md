---
label: "Redpanda-vc vs otras versiones RVC"
icon: ":scales:"
order: 96
permalink: /ilaria-rvc/redpanda/comparison/
description: "Comparativa verificada en código entre Redpanda-vc, RVC Mainline, Applio e Ilaria RVC: Generator EMA, guardado por pasos, Rectified Flow, Beatrice 2, entrenamiento de vocoder, TTS, tiempo real y compatibilidad."
---
# Redpanda-vc vs Otras Versiones RVC - Comparativa Completa de Funciones

[Configurar Redpanda-vc](first-run.md) · [Entrenar modelos RVC (EMA y Steps)](training.md) · [Probar audio en vivo](live-audio.md)

Esta guía compara **Redpanda-vc** directamente con **RVC Mainline**, **Applio** e **Ilaria RVC** mediante inspección estática del código fuente en las ramas `main` de cada proyecto (sin ejecutar benchmarks de audio en vivo ni pruebas de hardware entre sistemas).

---

## ¿Qué hace diferente a Redpanda-vc?

Si eres nuevo en la conversión de voz por IA, conviene saber que estos programas **no** son versiones sucesivas de una misma aplicación, sino proyectos relacionados con objetivos distintos:

- **RVC:** Familia de arquitecturas y modelos para conversión de voz (Retrieval-based Voice Conversion).
- **RVC Mainline:** La implementación de referencia original (`RVC-Project/Retrieval-based-Voice-Conversion-WebUI`).
- **Applio:** Aplicación RVC muy extendida que amplía la WebUI, los vocoders, el TTS y las herramientas en torno a RVC.
- **Redpanda-vc:** Fork de **Applio** (`redpanda343/Redpanda-vc`) que añade Generator EMA, guardado de checkpoints RVC por pasos, entrenamiento/inferencia **Rectified Flow**, entrenamiento/tiempo real **Beatrice 2** y **entrenamiento dedicado de vocoders**.
- **Ilaria RVC:** Implementación personalizada basada en RVC Mainline (`TheStingerX/Ilaria-RVC`) con su propio pipeline de inferencia, `Training Target: Steps`, soporte RefineGAN/MRF HiFi-GAN en la interfaz, Audio Analyzer, Voice Blender y herramientas TTS.

Un fork **no** es automáticamente mejor que el original en todos los aspectos: cada proyecto equilibra de forma distinta la simplicidad, la estabilidad, la compatibilidad de modelos y las arquitecturas adicionales.

*(Términos rápidos para principiantes: **Inference** significa convertir audio usando un modelo ya entrenado; **CLI** significa ejecutar comandos en terminal en lugar de pulsar botones en la **WebUI**; un **vocoder** transforma rasgos acústicos en una onda de audio audible; un **decoder** es la parte de un programa que sabe leer una arquitectura de modelo concreta.)*

---

## Comparativa general de funciones

Las etiquetas de estado reflejan la inspección estática de la rama `main` de cada repositorio (commits listados en [Fuentes y referencias técnicas](#fuentes-y-referencias-técnicas)):

| Función | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **RVC V1** | **Sí** | **Inferencia V1 compatible; la UI actual de entrenamiento se centra en V2** | **Sí** | **Sí** |
| **RVC V2** | **Sí** | **Sí** | **Sí** | **Sí** |
| **Entrenamiento RVC** | **Sí** | **Sí** | **Sí** | **Sí** |
| **Entrenamiento por épocas** | **Sí** | **Sí** | **Implementación diferente** *(objetivo por pasos)* | **Sí** |
| **Objetivo por pasos** | **No - verificado** | **No - verificado** | **Sí** (`Total Steps`) | **Sí** (`Training Target: Steps`) |
| **Checkpoints por intervalos de épocas** | **Sí** | **Sí** (`save_every_epoch`) | **No - verificado** *(usa intervalos de pasos)* | **Sí** (`save_every_epoch`) |
| **Checkpoints por intervalos de pasos** | **No - verificado** | **No - verificado** | **Sí** (`Save Every X Steps`) | **No - verificado** *(guarda por épocas; época parcial al parar/paso final)* |
| **Generator EMA** | **No - verificado** | **No - verificado** | **Sí** (`GeneratorEMA`) | **No - verificado** |
| **Reanudar entrenamiento (`G`/`D`)** | **Sí** | **Sí** | **Sí** | **Sí** |
| **Exportación `.pth` intermedia** | **Sí** | **Sí** (`save_every_weights`) | **Sí** (`Save Every Weights`) | **Sí** *(en límites completos de `save_every_epoch`)* |
| **Entrenamiento Rectified Flow** | **No - verificado** | **No - verificado** | **Sí** | **No - verificado** |
| **Entrenamiento Beatrice 2** | **No - verificado** | **No - verificado** | **Sí** | **No - verificado** *(Beatrice es solo extractor F0)* |
| **Entrenamiento dedicado de vocoders** | **No - verificado** | **No - verificado** | **Sí** (`tabs/train/nsf_hifigan.py`) | **No - verificado** |
| **HiFi-GAN** | **Sí** | **Sí** | **Sí** | **Sí** |
| **RefineGAN** | **No - verificado** | **Sí** | **Sí** | **Sí** *(32 kHz v2 f0)* |
| **MRF HiFi-GAN** | **No - verificado** | **Compatible en código / CLI; no seleccionable en la WebUI estándar de entrenamiento** | **Compatible en código / CLI; no seleccionable en la WebUI estándar de entrenamiento** | **Sí** *(seleccionable en WebUI de entrenamiento, v2 f0)* |
| **Pretrained personalizados** | **Sí** | **Sí** | **Sí** | **Sí** |
| **Warmup del learning rate** | **No - verificado** | **No - verificado** *(programación fija)* | **Sí** (`Warmup Steps`) | **No - verificado** |
| **Programación de LR** | **Implementación diferente** *(exponencial por época)* | **Implementación diferente** *(exponencial por época)* | **Sí** (`Exponential` / `Cosine`) | **Implementación diferente** *(exponencial por época)* |
| **Control de batch** | **Sí** (`batch_size`) | **Sí** (`batch_size`) | **Sí** (`Batch Size` + `Max Audio per Batch`) | **Sí** (`batch_size`) |
| **Optimización de VRAM** | **Implementación diferente** *(FP16, caché GPU)* | **Sí** (`Checkpointing`, caché GPU) | **Sí** (`Checkpointing`, caché GPU) | **Implementación diferente** *(FP16/BF16, caché GPU)* |
| **Extracción de rasgos y F0** | **Sí** | **Sí** | **Sí** | **Sí** |
| **Inferencia vocal (offline)** | **Sí** | **Sí** | **Sí** | **Sí** |
| **Text-to-Speech (TTS)** | **No - verificado** *(requiere TTS externo + RVC)* | **Sí** *(`tabs/tts/` integrado + CLI `rvc/lib/tools/tts.py`)* | **No - verificado** *(pestaña `tts` de Applio eliminada de `tabs/`)* | **Sí** *(Kokoro, ElevenLabs, Windows TTS integrados + RVC)* |
| **Conversión en tiempo real** | **Sí** | **Sí** | **Sí** | **No - verificado** *(solo offline y lotes)* |
| **GUI desktop realtime** | **Sí** (`realtime_gui.py`) | **Realtime en WebUI; GUI desktop independiente separada no verificada** | **Sí** (`run-realtime-gui.bat`, lanzador Windows) | **No - verificado** |
| **Realtime en navegador** | **No - verificado** | **Sí** (`tabs/realtime`) | **Sí** (WebSocket + respaldo HTTP) | **No - verificado** |
| **Entrenamiento multi-GPU** | **Sí** | **Sí** | **Sí** | **Sí** |
| **Flujos realtime multi-GPU simultáneos** | **No - verificado** | **No verificado** | **Sí** *(1 GPU por flujo)* | **No - verificado** |
| **Soporte multifamilia** | **No - verificado** *(solo RVC)* | **Familia RVC con opciones de vocoder adicionales** *(selector `Architecture` oculto; no familias separadas como RF/Beatrice)* | **Sí** *(RVC + Rectified Flow + Beatrice)* | **No - verificado** *(solo RVC)* |
| **Herramientas de monitorización** | TensorBoard | TensorBoard | TensorBoard | TensorBoard + Audio Analyzer + Training Previews |

### Soporte de Plataformas y Backends

Tener un script `.sh` **no** demuestra que todas las funciones estén probadas en Linux o macOS, por lo que la siguiente tabla separa los lanzadores del código de backend:

| Plataforma / Backend | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **Lanzadores Windows** | `go-webui.bat`, `go-realtime_gui.bat` | `run-install.bat`, `run-applio.bat`, `run-tensorboard.bat`, `run-updater.bat` | `run-install.bat`, `run-applio.bat`, `run-tensorboard.bat`, `run-realtime-gui.bat` | `RUN_ILARIA_RVC.bat`, `RUN_ILARIA_RVC_LOGS.bat` |
| **Lanzadores Linux / macOS** | Inicio manual con Python | `run-install.sh`, `run-applio.sh`, `run-tensorboard.sh` | `run-install.sh`, `run-applio.sh` *(sin `.sh` para `realtime_gui.py`)* | Inicio manual con Python *(lanzadores `.bat` para Windows)* |
| **Backends de cómputo en código** | **CUDA / DirectML / CPU** *(DirectML para inferencia con `--dml` / respaldo; entrenamiento usa CUDA o CPU)* | CUDA / MPS / CPU | CUDA / MPS / CPU *(Beatrice realtime en CPU)* | CUDA / DirectML (AMD e Intel) / CPU |
| **Estado de pruebas multi-OS** | No probado en esta auditoría | No probado en esta auditoría | No probado en esta auditoría | No probado en esta auditoría |

---

## Generator EMA: Pesos Exportados Más Suaves

Dentro de una red neuronal, los **weights (pesos)** son los números internos que se ajustan tras cada batch de entrenamiento. Como cada batch es solo un pequeño fragmento de tu dataset, los pesos vivos del generador pueden oscilar ligeramente de un paso a otro.

**EMA (Exponential Moving Average)** mantiene en memoria un promedio continuo separado de los pesos del generador (distinto de los momentos internos del optimizador Adam). En `rvc/train/train.py`, Redpanda-vc implementa `GeneratorEMA`:

- Tras cada paso del optimizador del generador (en rank `0`), `GeneratorEMA.update()` mezcla los pesos vivos del generador en el promedio continuo (excluyendo `enc_q`, usado solo en entrenamiento).
- **Generator EMA Decay** (`0` a `0.9999`, defecto `0.999`, incremento `0.0001`) controla cuán lento se actualiza el promedio. Poner **`0`** desactiva EMA y exporta los pesos vivos sin promediar.
- Ni **RVC Mainline**, ni **Applio**, ni **Ilaria RVC** incluyen `GeneratorEMA` en sus scripts de entrenamiento verificados.

EMA puede suavizar las fluctuaciones de pesos entre pasos, pero **no** garantiza mejor calidad de audio, **no** elimina el overfitting ni la aleatoriedad del entrenamiento y **no** acelera el entrenamiento. Para explicaciones completas y detalles matemáticos, consulta [Entrenar modelos RVC en Redpanda-vc - EMA y Guardado por Pasos](training.md).

---

## Entrenamiento y Guardado por Pasos

En el entrenamiento RVC, una **epoch (época)** es una pasada completa por el dataset preparado, mientras que un **step (paso)** es una actualización de pesos tras procesar un solo batch. *(Ejemplo hipotético: si un dataset produce 100 pasos por época, 1.000 pasos equivalen a unas 10 épocas, aunque la proporción exacta depende de la duración del dataset y del tamaño del batch.)*

Los cuatro programas gestionan los objetivos por pasos y los guardados de forma distinta:

- **Redpanda-vc:** Usa **Total Steps** (defecto `10000`) y **Save Every X Steps** (defecto `1000`). Guarda checkpoints reanudables `G`/`D` (y un `.pth` de inferencia si **Save Every Weights** está activo) en intervalos exactos de pasos, incluso a mitad de época, además de un **Final Save** obligatorio en `Total Steps`. **Save Only Latest** sobrescribe `G_2333333.pth` / `D_2333333.pth` para ahorrar espacio.
- **Applio y RVC Mainline:** Ambos entrenan por **épocas totales** y guardan checkpoints en intervalos de **épocas** (`save_every_epoch`).
- **Ilaria RVC:** Incluye **Training Target: Steps** (`ILARIA_RVC.py`, `train.py`), por lo que también **puede** detenerse en un número exacto de pasos. Sin embargo, su frecuencia de guardado sigue contando **épocas** (`save_every_epoch`) y las exportaciones intermedias `.pth` solo ocurren en límites completos `epoch % save_every_epoch == 0` (no en una `partial_epoch` a mitad de época), mientras que el estado reanudable se guarda en `save_every_epoch`, parada o `final_epoch`.

---

## Rectified Flow: Otra Arquitectura de Conversión de Voz

Una de las mayores novedades de Redpanda-vc es **Rectified Flow** (`tabs/train/rectified_flow.py`, `rectified_flow/`). **No** es una variante de RVC V2:

- **Modelo acústico:** Usa una arquitectura inspirada en el modelo acústico de **DiffSinger**, tomando rasgos del habla **ContentVec** en lugar de fonemas (`README.md`).
- **Salida y vocoder:** El modelo de flujo predice representaciones mel-spectrogram, que un **vocoder** separado (`PC-NSF-HiFiGAN`, `NSF-HiFiGAN` o `Vocos`) convierte en onda de audio.
- **Presets de entrenamiento:** Incluye los presets `standard`, `meanflow` (inspirado en MeanVC2) y `smaller` en `rectified_flow/presets/`.
- **Soporte en tiempo real:** Compatible con la GUI en tiempo real y la pestaña realtime de la WebUI de Redpanda-vc.
- **Aviso de compatibilidad:** Aunque un archivo exportado use extensión `.pth`, un modelo Rectified Flow **no es un modelo RVC V2** y no cargará en cargadores RVC estándar salvo que un cliente implemente explícitamente ese decoder Rectified Flow.

*(No existen benchmarks verificados entre arquitecturas en el repositorio que prueben que Rectified Flow sea universalmente más rápido, natural o superior en calidad a RVC.)*

---

## Soporte de Beatrice 2

**Beatrice** es una arquitectura independiente de conversión de voz optimizada para CPU (integrada desde `beatrice-trainer` en `tabs/train/beatrice.py`, `beatrice/`, `beatrice/realtime.py`):

- **Separada de RVC:** Beatrice utiliza su propio formato de modelo (exportado como carpeta de modelo, no como `.pth` RVC) y ejecuta su inferencia en tiempo real en **CPU** (`README.md`).
- **No confundir con extracción de tono F0:** Algunas aplicaciones (como Ilaria RVC) incluyen `beatrice` como opción de **extractor F0** durante la inferencia RVC. Redpanda-vc va más allá permitiendo **entrenar y convertir con Beatrice 2** tanto en su WebUI como en `run-realtime-gui.bat`.
- Los modelos entrenados en la pestaña Beatrice de Redpanda-vc funcionan con cargadores compatibles con Beatrice (como Beatrice VST / clientes Beatrice), no como archivos `.pth` RVC V2.

---

## Entrenamiento Dedicado de Vocoders

Redpanda-vc incluye una pestaña dedicada al entrenamiento de **Vocoder** (`tabs/train/nsf_hifigan.py`, `nsf_hifigan/`):

- **Vocoders compatibles:** `PC-NSF-HiFiGAN`, `NSF-HiFiGAN` y `Vocos` (24 kHz).
- **Modos:** Entrenar desde cero o ajustar (fine-tuning) desde un checkpoint pretrained compatible (por ejemplo, `PC-NSF-HiFiGAN 2025.02` o `Vocos 24 kHz`).
- **Modelo acústico vs. vocoder:** Un modelo acústico (como Rectified Flow) predice rasgos espectrales (mel-spectrograms); un vocoder transforma esos rasgos en sonido audible.
- **Limitación importante:** Esta pestaña está estrechamente ligada a las configuraciones mel de **Rectified Flow** (`check_registry_vocoder` / `mel_mismatch` en `tabs/train/rectified_flow.py`). Elegir `HiFi-GAN` o `RefineGAN` en la WebUI de entrenamiento **RVC** usa la arquitectura integrada generador/vocoder de RVC; **no** puedes acoplar arbitrariamente un vocoder entrenado aquí a cualquier modelo RVC estándar.

---

## Diferencias en la Conversión en Tiempo Reale

| Capacidad en Tiempo Real | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **GUI Desktop Realtime** | **Sí** (`realtime_gui.py`) | **Realtime en WebUI; GUI desktop independiente separada no verificada** | **Sí** (`run-realtime-gui.bat`, RVC + Beatrice + RF) | **No - verificado** |
| **Realtime en Navegador WebUI** | **No - verificado** | **Sí** (`tabs/realtime`) | **Sí** (WebSocket binario + respaldo HTTP streaming) | **No - verificado** |
| **Asignación Multi-GPU por flujo** | **No - verificado** | **No verificado** | **Sí** (`Inference Device: Automatic` o GPU concreta) | **No - verificado** |

En la pestaña realtime de la WebUI de Redpanda-vc (`README.md`, `tabs/inference/realtime.py`):
- **Concurrencia multi-GPU:** Dos GPU pueden ejecutar **dos flujos simultáneos independientes** (un flujo por GPU para preservar el estado de audio). Añadir más GPU **no** se combina para acelerar un único flujo.
- **Transporte:** Usa audio WebSocket binario (incluso con `--share`), con colas acotadas y respaldo automático a HTTP streaming si WebSocket está bloqueado.

---

## Controles Avanzados de Entrenamiento

Más allá de **Generator EMA Decay** y **Total Steps**, Redpanda-vc expone varios controles extra en **Training** (`tabs/train/rvc.py`):

- **Dinámica de entrenamiento:** `Learning Rate Schedule` (`Exponential` o `Cosine`), `Warmup Steps`, `Learning Rate Decay Every X Steps`, `Final Learning Rate`, `Reset Optimizer State` y `Max Audio per Batch (sec)`.
- **Optimización de memoria:** `Checkpointing` (activation checkpointing, heredado de Applio, intercambia velocidad por menor uso de VRAM) y `Cache Dataset in GPU` (heredado).
- **Guardados y exportaciones:** `Save Every X Steps`, `Save Only Latest`, `Save Every Weights` y `Generator EMA Decay`.

Los principiantes **no** necesitan ajustar programaciones coseno, pasos de warmup ni decaimiento personalizado en su primer modelo RVC.

---

## Compatibilidad de Modelos: ¿Qué Funciona Dónde?

Tener extensión `.pth` **no** significa que dos modelos sean intercambiables. La compatibilidad depende de la arquitectura, el formato del checkpoint, el embedder esperado, el decoder del vocoder y el índice FAISS correspondiente:

| Tipo de modelo | Redpanda-vc | RVC Mainline | Applio | Ilaria RVC | Otros Clientes Compatibles |
| --- | --- | --- | --- | --- | --- |
| **RVC V1 (`.pth` inferencia)** | **Sí** | **Sí** | **Inferencia compatible; UI de entrenamiento enfocada en V2** | **Sí** | **Compatible en clientes que implementan esta arquitectura** |
| **RVC V2 HiFi-GAN (`.pth`)** | **Sí** | **Sí** | **Sí** | **Sí** | **Compatible en clientes que implementan esta arquitectura** |
| **RVC V2 RefineGAN (`.pth`)** | **Sí** | **No - verificado** | **Sí** | **Sí** *(32 kHz)* | **Requiere decoder compatible** (**Depende de la versión**) |
| **RVC V2 MRF HiFi-GAN (`.pth`)** | **Sí** *(inferencia + CLI)* | **No - verificado** | **Sí** *(inferencia + CLI)* | **Sí** *(UI + inferencia)* | **Requiere decoder compatible** (**Depende de la versión**) |
| **Rectified Flow (`.pth`)** | **Sí** | **No - verificado** | **No - verificado** | **No - verificado** | **Requiere decoder compatible** *(no es RVC V2 estándar)* |
| **Beatrice 2 (carpeta de modelo)** | **Sí** | **No - verificado** | **No - verificado** | **No - verificado** | **Depende de la versión** *(solo cargadores/VST Beatrice)* |
| **Vocoder personalizado (`nsf_hifigan`)** | **Sí** *(para Rectified Flow)* | **No - verificado** | **No - verificado** | **No - verificado** | **Requiere decoder compatible** |
| **Checkpoints de entrenamiento (`G_*`/`D_*`)** | **Sí** *(RVC)* | **Sí** *(RVC)* | **Sí** *(RVC)* | **Sí** *(RVC)* | **No - verificado** *(solo reanudación)* |
| **Archivos FAISS `.index`** | **Sí** *(embedder y dim. compatibles)* | **Sí** *(embedder y dim. compatibles)* | **Sí** *(embedder y dim. compatibles)* | **Sí** *(embedder y dim. compatibles)* | **Compatible en clientes RVC con retrieval** *(embedder y dim. compatibles)* |

---

## ¿Qué Versión RVC Deberías Elegir?

- **Elige RVC Mainline** si quieres la base de código de referencia original y el flujo clásico de `realtime_gui.py`.
- **Elige Applio** si buscas un espacio de trabajo RVC completo con entrenamiento por épocas y **TTS** integrado.
- **Elige Redpanda-vc** si buscas específicamente **Generator EMA**, **guardado de checkpoints por pasos**, **Rectified Flow**, **entrenamiento/tiempo real Beatrice 2**, **entrenamiento dedicado de vocoders** o **tiempo real WebSocket / multiflujo** (ten en cuenta que la pestaña `tts` de Applio no está en Redpanda-vc).
- **Elige Ilaria RVC** si prefieres un estudio RVC orientado a offline con `Training Target: Steps`, `MRF HiFi-GAN` / `RefineGAN` seleccionables en WebUI, **TTS** integrado (Kokoro, ElevenLabs, Windows), `Audio Analyzer`, `Voice Blender`, `RMVPE High Register` y `Proposed Pitch`.

---

## FAQ para Principiantes

**¿Qué es un fork de RVC?**
Un proyecto separado que copia un código base de RVC existente y modifica o añade funciones sobre él.

**¿Es Redpanda-vc lo mismo que Applio?**
No. Redpanda-vc parte de Applio y comparte su interfaz base, pero añade Generator EMA, guardado por pasos, Rectified Flow, Beatrice 2 y entrenamiento de vocoders, omitiendo la pestaña `tts` de Applio.

**¿Produce Redpanda-vc mejores modelos RVC?**
No automáticamente. La calidad vocal depende ante todo del dataset, el preprocesado y los ajustes; EMA y las programaciones extra son herramientas para probar, no garantías.

**¿Qué es EMA?**
Exponential Moving Average: un promedio continuo de los pesos del generador mantenido durante el entrenamiento y usado al exportar modelos para inferencia.

**¿Por qué Redpanda-vc guarda por pasos?**
Porque el guardado por pasos permite guardar en intervalos exactos de actualización (ej. cada `1000` pasos) sin importar lo pequeño o grande que sea el dataset.

**¿Ilaria RVC también soporta entrenamiento por pasos?**
Sí, mediante `Training Target: Steps`, aunque su `Save frequency` sigue contando épocas en lugar de intervalos arbitrarios de pasos.

**¿Qué es Rectified Flow?**
Una arquitectura acústica de difusión/flow-matching inspirada en DiffSinger que usa rasgos ContentVec y un vocoder separado.

**¿Es Rectified Flow lo mismo que RVC V2?**
No. Son arquitecturas completamente distintas y no son compatibles entre sí.

**¿Qué es Beatrice?**
Una arquitectura de conversión de voz independiente y ligera en CPU (de `beatrice-trainer`), distinta de RVC y distinta de usar Beatrice solo como extractor de tono F0.

**¿Qué hace un vocoder?**
Convierte rasgos acústicos (como mel-spectrograms) en una onda de audio audible.

**¿Puedo usar un modelo de Redpanda-vc en otro programa RVC?**
Los modelos estándar **RVC V1 / V2 HiFi-GAN** exportados desde Redpanda-vc funcionan en clientes que implementen esos decoders; **Rectified Flow**, **Beatrice**, **RefineGAN** y **MRF HiFi-GAN** requieren clientes compatibles con esos decoders.

**¿Puede Redpanda-vc entrenar modelos RVC normales?**
Sí, en la pestaña **Train → RVC** (`HiFi-GAN` y `RefineGAN` en WebUI; `MRF HiFi-GAN` en código/CLI).

**¿Soporta Redpanda-vc conversión en tiempo real?**
Sí, tanto en la pestaña **Realtime** de la WebUI como en `run-realtime-gui.bat`.

**¿El tiempo real multi-GPU hace más rápida una sola conversión?**
No. Cada flujo permanece en una GPU; las GPU adicionales permiten múltiples flujos simultáneos.

**¿Deberían los principiantes elegir RVC, Rectified Flow o Beatrice?**
Empieza con **RVC** si buscas la mayor compatibilidad de modelos y clientes; explora **Rectified Flow** o **Beatrice** solo si quieres específicamente sus flujos de trabajo.

**¿Qué funciones son realmente exclusivas de Redpanda-vc entre estos cuatro?**
Combinar **Generator EMA**, **guardado RVC por pasos (`Save Every X Steps`)**, **Rectified Flow**, **entrenamiento/tiempo real Beatrice 2** y **entrenamiento dedicado de vocoder `nsf_hifigan`** en un mismo fork basado en Applio.

---

## Fuentes y referencias técnicas

Comparación estática de código verificada en ramas `main` el **2026-11-22**:

- **Redpanda-vc** (commit [`55a3a80`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80), 2026-10-31): [Repositorio](https://github.com/redpanda343/Redpanda-vc) · [`tabs/train/train.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/tabs/train/train.py) · [`tabs/train/rvc.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/tabs/train/rvc.py) · [`rvc/train/train.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/rvc/train/train.py) · [`rectified_flow/`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80/rectified_flow) · [`beatrice/`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80/beatrice) · [`nsf_hifigan/`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80/nsf_hifigan) · [`tabs/inference/realtime.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/tabs/inference/realtime.py) · [`realtime_gui.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/realtime_gui.py)
- **Applio** (commit [`445b0f6`](https://github.com/IAHispano/Applio/tree/445b0f6), 2026-11-19): [Repositorio](https://github.com/IAHispano/Applio) · [`tabs/train/train.py`](https://github.com/IAHispano/Applio/blob/445b0f6/tabs/train/train.py) · [`rvc/infer/infer.py`](https://github.com/IAHispano/Applio/blob/445b0f6/rvc/infer/infer.py) · [`core.py`](https://github.com/IAHispano/Applio/blob/445b0f6/core.py) · [`rvc/train/train.py`](https://github.com/IAHispano/Applio/blob/445b0f6/rvc/train/train.py) · [`tabs/tts/`](https://github.com/IAHispano/Applio/tree/445b0f6/tabs/tts) · [`tabs/realtime/`](https://github.com/IAHispano/Applio/tree/445b0f6/tabs/realtime) · [`rvc/realtime/`](https://github.com/IAHispano/Applio/tree/445b0f6/rvc/realtime)
- **RVC Mainline** (commit [`81eed5e`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/tree/81eed5e), 2026-08-04): [Repositorio](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [`configs/config.py`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/81eed5e/configs/config.py) · [`train/train.py`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/81eed5e/train/train.py) · [`realtime_gui.py`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/81eed5e/realtime_gui.py)
- **Ilaria RVC** (commit [`a887ba5`](https://github.com/TheStingerX/Ilaria-RVC/tree/a887ba5), 2026-11-21): [Repository](https://github.com/TheStingerX/Ilaria-RVC) · [`app/ILARIA_RVC.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/a887ba5/app/ILARIA_RVC.py) · [`app/infer/modules/train/train.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/a887ba5/app/infer/modules/train/train.py) · [`app/ilaria/ilaria_tts.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/a887ba5/app/ilaria/ilaria_tts.py)
