# Entrenar Modelos RVC en Redpanda-vc - EMA y Guardado por Pasos

[Redpanda-vc en GitHub](https://github.com/redpanda343/Redpanda-vc) · [Configurar Redpanda-vc](first-run.md) · [Guía general de entrenamiento RVC](../../model-training/training.md)

Entrenar un modelo de voz consiste en enseñar a un programa a reproducir una voz objetivo a partir de clips de audio limpios. Si eres nuevo en RVC, aquí tienes los términos clave en lenguaje sencillo:

- **Weights (pesos):** Los números internos del modelo que cambian poco a poco mientras aprende una voz.
- **Generator (`G`):** La parte del modelo que genera el audio de la voz convertida.
- **Discriminator (`D`):** Una red auxiliar usada solo durante el entrenamiento para juzgar qué tan real suena el audio del generador frente a las grabaciones reales.
- **Optimizer:** El motor matemático que actualiza los pesos del modelo tras cada paso de entrenamiento.
- **Step (paso):** Una actualización individual de los pesos tras procesar un pequeño grupo (**batch**) de clips de audio.
- **Epoch (época):** Una pasada completa por todo el dataset preparado.
- **Checkpoint (`G_*.pth` / `D_*.pth`):** Una instantánea de entrenamiento guardada para pausar y reanudar más tarde.
- **EMA (Exponential Moving Average):** Una media móvil suavizada de los pesos del generador mantenida durante el entrenamiento.

> EMA helps smooth out changes in the generator's weights during training. Instead of exporting only the latest generator weights, Redpanda-vc can export a running average of them.

El entrenamiento no produce una voz perfecta al instante y la calidad final depende mucho de tus grabaciones fuente, la preparación del dataset y los ajustes. Ten en cuenta lo que EMA **no** hace:

- EMA **no** es un filtro de audio ni reductor de ruido.
- EMA **no** edita ni limpia los archivos del dataset.
- EMA **no** repara grabaciones con clipping o ruido.
- EMA **no** garantiza mayor calidad de audio en todas las voces.
- EMA **no** elimina toda la aleatoriedad del entrenamiento.

---

## ¿Qué es EMA?

Imagina a un estudiante practicando la pronunciación de una palabra difícil. Un intento aislado puede salir algo más claro o más torpe que el anterior. Observar la tendencia de muchos intentos recientes da una imagen más estable que fijarse solo en el último.

*(Es solo una analogía: EMA no escucha audio, no evalúa la pronunciación ni elige grabaciones por sí mismo.)*

### Cómo funciona realmente en Redpanda-vc

En `rvc/train/train.py`, Redpanda-vc mantiene EMA en memoria mientras avanza el entrenamiento:

1. El generador entrena normalmente en cada batch.
2. El optimizador actualiza los pesos actuales del generador.
3. Justo después de cada paso del generador (en rank `0`), `GeneratorEMA.update()` actualiza una copia promediada aparte de sus pesos (excluyendo `enc_q`, usado solo en entrenamiento).
4. Ese promedio continuo permanece en memoria y se guarda dentro del checkpoint `G`.
5. Cuando EMA está activado (`Generator EMA Decay > 0`), Redpanda-vc exporta los modelos `.pth` de inferencia desde esos pesos EMA en lugar de los pesos vivos sin promediar.

**EMA se actualiza en cada paso de entrenamiento, no una vez por época.** Redpanda-vc **no** promedia varios `.pth` ya guardados en disco; mantiene un único promedio continuo en memoria.

<details>
<summary>Detalles matemáticos opcionales: fórmula EMA estándar vs. fórmula corregida de Redpanda-vc</summary>

La fórmula intuitiva estándar de EMA es:

```text
EMA_new = decay * EMA_previous + (1 - decay) * current_weights
```

En `rvc/train/train.py` (`GeneratorEMA.update()`, líneas 199-205), Redpanda-vc no usa un factor constante desde la primera actualización, sino un decaimiento efectivo corregido según el número de actualizaciones (`updates`):

```text
effective_decay = beta * (1 - beta ** (updates - 1)) / (1 - beta ** updates)
```

donde `beta` es `ema_decay`. Esta corrección reduce el peso de la inicialización en los primeros pasos y se acerca a `beta` conforme crece `updates`. Los parámetros flotantes se mezclan con `torch._foreach_lerp_`.

</details>

---

## Entender Generator EMA Decay

En **Training → Advanced Settings**, Redpanda-vc incluye **Generator EMA Decay** (`tabs/train/rvc.py`, líneas 809-819):

- **Mínimo:** `0`
- **Máximo:** `0.9999`
- **Por defecto:** `0.999`
- **Incremento del control:** `0.0001`

### Qué significa cada valor

- **`Generator EMA Decay = 0`:** Desactiva `GeneratorEMA`. Los modelos `.pth` de inferencia se exportan desde los pesos vivos del generador.
- **`Generator EMA Decay = 0.999` (Por defecto):** Mantiene un promedio exponencial continuo que da peso significativo a las actualizaciones recientes suavizando oscilaciones entre pasos.
- **`Generator EMA Decay = 0.9999`:** Cambia más despacio y promedia sobre una ventana más larga. Puede dar un promedio más estable, pero reacciona más lento a mejoras recientes del generador.

Valores más bajos reaccionan más rápido; valores altos promedian sobre más pasos. `0.9999` **no** es automáticamente mejor que `0.999` ni existe un valor universal ideal. Para empezar, dejar **`0.999`** y comparar resultados reales es un buen punto de partida.

---

## ¿Por qué Redpanda-vc usa EMA?

En la literatura de aprendizaje profundo (como la documentación de PyTorch y Morales-Brotons, Vogels y Hendrikx, 2024), promediar pesos se estudia porque las actualizaciones individuales de SGD/Adam oscilan alrededor de buenas soluciones.

### Beneficios potenciales (no garantías)

- Menor oscilación paso a paso en los pesos exportados.
- Mayor continuidad entre exportaciones consecutivas.
- Atenuación de parte de la variabilidad del entrenamiento.
- Posible mayor estabilidad del modelo exportado (requiere pruebas de escucha reales para confirmarse en RVC).

### Limitaciones importantes

- EMA **no** sustituye un dataset limpio.
- EMA **no** elimina el overfitting.
- EMA **no** impide que un entrenamiento mal configurado falle.
- EMA **no** garantiza mayor parecido vocal.
- EMA **no** promete menos pasos ni épocas.
- EMA **no** selecciona automáticamente el mejor checkpoint.
- EMA mantiene copias extra de los pesos en memoria y añade un pequeño costo por paso.

---

## Pesos EMA vs. Checkpoints de Entrenamiento

| Archivo / Estado | Dónde está | Qué contiene | Para qué sirve |
| --- | --- | --- | --- |
| **Checkpoint Generator (`G_*.pth`)** | `logs/<model_name>/` | Pesos vivos del generador, optimizador, scaler, `iteration` (época), `step`, `epoch_step`, RNG y estado `ema` | Reanudar entrenamiento (y exportación manual) |
| **Checkpoint Discriminator (`D_*.pth`)** | `logs/<model_name>/` | Pesos del discriminador, optimizador, scaler, `step` | Reanudar entrenamiento junto a `G_*.pth` |
| **Pesos EMA** | En memoria y dentro de `G_*.pth` (`checkpoint["ema"]["weights"]`) | Promedio continuo de los pesos del generador (sin `enc_q`) | Exportar modelos `.pth` suavizados para inferencia |
| **Modelo de inferencia (`<name>_<epoch>e_<step>s.pth`)** | `logs/<model_name>/` | Solo pesos compactos de inferencia + metadatos | Solo conversión de voz (**no** reanuda entrenamiento) |

**Nota:** En `train.py`, EMA se aplica **solo al generador (`net_g`)**, nunca al discriminador (`net_d`).

---

## Steps vs. Epochs

- **Epoch:** Una pasada completa por el dataset preparado.
- **Batch:** Un grupo pequeño de fragmentos procesados juntos.
- **Step:** Una actualización del optimizador tras un batch (no equivale a un archivo ni a un segundo de audio).

### Ejemplo hipotético

Si tu dataset y `Batch Size` producen **100 steps por época**:

- `100` steps ≈ `1` época
- `500` steps ≈ `5` épocas
- `1.000` steps ≈ `10` épocas

La proporción real depende de tu dataset, `Batch Size` y `Max Audio per Batch (sec)`.

---

## Guardado de Checkpoints por Pasos

Redpanda-vc programa los guardados por **número de pasos** (`tabs/train/rvc.py`, líneas 663-703; `rvc/train/train.py`, líneas 917-921 y 1146-1195):

### Total Steps

- **Por defecto:** `10000` (rango `1` a `1000000`, paso `1`).
- Define el **objetivo total de pasos**, no "sumar 10.000 pasos más". Si ya alcanzaste `10000`, debes subir `Total Steps` para continuar.

### Save Every X Steps

- **Por defecto:** `1000` (rango `1` a `100000`, paso `1`).
- Guarda `G` y `D` cada `X` pasos, incluso a mitad de una época.

### Guardado final

Incluso si `Total Steps` no es múltiplo de `Save Every X Steps`, Redpanda-vc **siempre** guarda `G`/`D` y un modelo `.pth` de inferencia al llegar al paso final.

### Save Every Weights

- **Por defecto:** **Activado** (`True`).
- Si está activado, exporta un `.pth` de inferencia en cada guardado intermedio y al final; si está desactivado, solo al final.

### Save Only Latest

- **Por defecto:** **Activado** (`True`).
- Sobrescribe `G_2333333.pth` y `D_2333333.pth` (`LATEST_CHECKPOINT_SUFFIX`) para ahorrar disco. Si está activado, no podrás volver a un checkpoint `G`/`D` anterior para reanudar desde un paso previo. No afecta a los `.pth` de inferencia exportados.

---

## Tu Primer Entrenamiento RVC en Redpanda-vc

1. **Preparación:** Instala/abre Redpanda-vc ([Configurar Redpanda-vc](first-run.md)), ve a **Train → RVC**, define **Model Name**, **Sample Rate**, **Version** y **Vocoder**, y prepara un dataset limpio y autorizado.
2. **Preprocess:** En **Preprocess**, indica **Dataset Path** y pulsa **Preprocess Dataset**.
3. **Extract:** En **Extract**, elige extractor F0 (`rmvpe`) y **Embedder Model** (`contentvec`), y pulsa **Extract Features** (no entrena los pesos `.pth` aún).
4. **Training:** En **Training**, ajusta **Batch Size**, deja como ejemplo inicial **Total Steps** (`10000`) y **Save Every X Steps** (`1000`), y en **Advanced Settings** verifica **Save Only Latest** (`True`), **Save Every Weights** (`True`) y **Generator EMA Decay** (`0.999`). Pulsa **Start Training** y supervisa con **Pause Training** / **Resume Training** / **Stop Training**. Al terminar, usa **Generate Index** si lo necesitas.
5. **Salida (`logs/<model_name>/`):** Checkpoints `G_2333333.pth` / `D_2333333.pth` (o `G_<step>.pth` / `D_<step>.pth`) y modelos de inferencia `<model_name>_<epoch>e_<step>s.pth`.

---

## Reanudar el Entrenamiento con Seguridad

`latest_checkpoint_pair()` busca el `G_*.pth` más reciente y su `D_*.pth` correspondiente (ambos son obligatorios). `restore()` recupera época, `epoch_step`, `global_step`, scaler, RNG y optimizadores. `build_ema()` restaura `checkpoint["ema"]` si existe, o inicia EMA desde los pesos reanudados si falta. Los pasos hechos tras el último guardado antes de un corte se pierden.

- **Reset Optimizer State:** Reinicia los momentos del optimizador manteniendo pesos, `global_step` y learning rate schedule. Déjalo **OFF** al reanudar normalmente.
- **Fresh Training (`--cleanup`):** **Borra** checkpoints `G_*`/`D_*`, `spec.pt` y logs previos. Déjalo **OFF** al reanudar.
- **Save Every X Steps vs. Checkpointing:** **Save Every X Steps** guarda en disco; **Checkpointing** es *activation checkpointing* para ahorrar VRAM a costa de velocidad.

---

## Cómo Exporta Redpanda-vc Modelos EMA

En exportaciones automáticas (`export_state_dict()`) y manuales (`Export Model` -> `checkpoint_exporter.py`), Redpanda-vc usa `ema["weights"]` automáticamente cuando existe estado EMA válido, o los pesos vivos si EMA está en `0`. No hay selector manual entre Raw y EMA en la WebUI.

---

## ¿EMA Suena Realmente Mejor?

Compara dos experimentos con el mismo dataset, mismos ajustes y mismo número de pasos (`Generator EMA Decay = 0.999` vs `0`) usando clips externos al dataset, sin guiarte solo por las pérdidas de TensorBoard.

---

## Solución de Problemas para Principiantes

| Problema | Causa posible | Qué revisar | Solución |
| --- | --- | --- | --- |
| **El entrenamiento no inicia** | Falta preprocess/extract o bloqueo en `training_state.json` | Primer error en consola | Completa **Preprocess Dataset** y **Extract Features** |
| **GPU out of memory** | `Batch Size` alto o `Cache Dataset in GPU` activo | Uso de VRAM y consola | Baja **Batch Size**, desactiva **Cache Dataset in GPU** o activa **Checkpointing** |
| **EMA no parece cambiar nada** | Pocos pasos o `0` configurado | `Generator EMA Decay` y consola | Verifica `generator EMA` al inicio y compara al mismo paso |
| **EMA Decay en `0`** | Control en `0` | **Advanced Settings → Generator EMA Decay** | Pon `0.999` para el próximo entrenamiento |
| **Sin modelos de inferencia intermedios** | **Save Every Weights** desactivado | **Advanced Settings → Save Every Weights** | Activa **Save Every Weights** |
| **Solo existen los últimos `G`/`D`** | **Save Only Latest** activado | `logs/<model_name>/` | Desactiva **Save Only Latest** antes de entrenar si quieres historial |
| **Falta checkpoint `G` o `D`** | Archivo borrado o movido | Pareja `G_*` / `D_*` en `logs/<model_name>/` | Ambos archivos son obligatorios para reanudar |
| **Reanuda desde un paso anterior** | Corte antes del siguiente `Save Every X Steps` | Consola | Normal: el progreso tras el último guardado se pierde |
| **Error al restaurar estado EMA** | Checkpoint previo sin EMA o incompatible | Aviso en consola | Redpanda-vc inicia EMA desde los pesos reanudados |
| **Fresh Training borró checkpoints** | **Fresh Training** marcado | `logs/<model_name>/` | Desmarca **Fresh Training** al reanudar |
| **Se alcanzó Total Steps** | `global_step >= Total Steps` | Mensaje en consola | Sube **Total Steps** y pulsa **Start Training** |
| **Un `.pth` exportado no reanuda** | Archivo de inferencia en lugar de `G_*.pth` + `D_*.pth` | Nombre del archivo | Reanuda desde `logs/<model_name>/` con `G_*.pth` y `D_*.pth` |
| **Uso anómalo de VRAM** | **Checkpointing** apagado o **Cache Dataset in GPU** activo | **Advanced Settings** | Activa **Checkpointing**, apaga **Cache Dataset in GPU** y baja **Batch Size** |

---

## FAQ

**¿Qué significa EMA?** Exponential Moving Average: promedio continuo de los pesos del generador durante el entrenamiento.
**¿EMA mejora la calidad de voz?** Puede suavizar oscilaciones, pero no es garantía; requiere pruebas de escucha.
**¿Debo dejar EMA en `0.999`?** Sí, es el valor por defecto y un buen punto de partida.
**¿Qué pasa si EMA Decay es `0`?** Se desactiva EMA y se exportan los pesos vivos del generador.
**¿Es `0.9999` mejor que `0.999`?** No automáticamente; reacciona más lento a cambios recientes.
**¿EMA acelera el entrenamiento?** No, añade una copia de pesos y una actualización por paso.
**¿EMA evita el overfitting?** No.
**¿Se aplica EMA al discriminador?** No, solo al generador (`net_g`).
**¿Diferencia entre epoch y step?** Epoch es una pasada completa por el dataset; step es una actualización tras un batch.
**¿Puede guardar a mitad de una época?** Sí, gracias a `Save Every X Steps`.
**¿Pierdo progreso si detengo el entrenamiento?** Solo los pasos posteriores al último checkpoint guardado.
**¿Diferencia entre Save Only Latest y Save Every Weights?** `Save Only Latest` sobrescribe `G_2333333.pth` / `D_2333333.pth`; `Save Every Weights` exporta `.pth` de inferencia en cada guardado.
**¿Checkpointing es lo mismo que guardar checkpoints?** No; `Checkpointing` es *activation checkpointing* para ahorrar VRAM.
**¿Puedo reanudar desde un `.pth` de inferencia?** No; hacen falta `G_*.pth` y `D_*.pth`.

---

## Fuentes oficiales y lecturas recomendadas

- **Repositorio Redpanda-vc:** [github.com/redpanda343/Redpanda-vc](https://github.com/redpanda343/Redpanda-vc)
- **Implementación `GeneratorEMA`:** [`rvc/train/train.py` (líneas 179-217)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py#L179-L217)
- **Guardado por pasos, reanudación y exportación:** [`rvc/train/train.py` (líneas 1146-1195)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py#L1146-L1195)
- **Controles WebUI:** [`tabs/train/rvc.py` (líneas 663-880)](https://github.com/redpanda343/Redpanda-vc/blob/main/tabs/train/rvc.py#L663-L880)
- **Exportador manual:** [`rvc/train/process/checkpoint_exporter.py` (líneas 44-117)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/process/checkpoint_exporter.py#L44-L117)
- **Utilidades y control:** [`rvc/train/utils.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/utils.py) · [`rvc/train/process/training_control.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/process/training_control.py)
- **PyTorch:** [Weight Averaging (SWA and EMA)](https://docs.pytorch.org/docs/stable/optim.html#weight-averaging-swa-and-ema) · [`torch.optim.swa_utils.AveragedModel`](https://docs.pytorch.org/docs/stable/generated/torch.optim.swa_utils.AveragedModel.html)
- **Artículo científico:** Morales-Brotons, Vogels y Hendrikx, *Exponential Moving Average of Weights in Deep Learning: Dynamics and Benefits* ([OpenReview](https://openreview.net/forum?id=2M9CUnYnBA))
