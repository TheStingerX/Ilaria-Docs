---
label: "Entrenar modelos RVC (EMA y Steps)"
icon: ":mortar_board:"
order: 97
permalink: /ilaria-rvc/redpanda/training/
description: "Guía completa y verificada en código para principiantes sobre cómo entrenar modelos RVC en Redpanda-vc: Generator EMA, guardado de checkpoints por pasos, reanudación, exportación y solución de problemas."
---
# Entrenar Modelos RVC en Redpanda-vc - EMA y Guardado por Pasos

[Redpanda-vc en GitHub](https://github.com/redpanda343/Redpanda-vc) · [Configurar Redpanda-vc](first-run.md) · [Redpanda-vc vs otras versiones de RVC](differences.md) · [Guía General de Entrenamiento RVC](../../model-training/training.md)

Entrenar un modelo de voz enseña a un programa a reproducir una voz objetivo a partir de una colección de clips de audio limpios. Si eres nuevo en RVC, no necesitas memorizar jerga técnica antes de empezar. Aquí tienes los términos clave en lenguaje sencillo:

- **Weights (Pesos):** Los números internos dentro del modelo que se ajustan poco a poco conforme aprende una voz.
- **Generator (`G`):** La parte del modelo que realmente crea el audio de la voz convertida.
- **Discriminator (`D`):** Una red auxiliar usada solo durante el entrenamiento para juzgar qué tan realista suena el audio del generador comparado con las grabaciones reales.
- **Optimizer (Optimizador):** El motor matemático que actualiza los pesos del modelo después de cada paso de entrenamiento.
- **Step (Paso):** Una sola actualización de pesos después de procesar un pequeño grupo (**batch**) de clips de audio.
- **Epoch (Época):** Una pasada completa por todo tu dataset preparado.
- **Checkpoint (`G_*.pth` / `D_*.pth`):** Una instantánea de entrenamiento guardada que se usa para pausar y reanudar el entrenamiento más tarde.
- **EMA (Exponential Moving Average):** Un promedio móvil suavizado de los pesos del generador mantenido durante el entrenamiento.

> EMA ayuda a suavizar los cambios en los pesos del generador durante el entrenamiento. En lugar de exportar únicamente los últimos pesos del generador, Redpanda-vc puede exportar un promedio móvil de ellos.

El entrenamiento no produce una voz terminada al instante, y la calidad final depende mucho de tus grabaciones de origen, la preparación del dataset y los ajustes de entrenamiento. Antes de empezar, ten en cuenta lo que EMA **no** hace:

- EMA **no** es un filtro de audio ni un reductor de ruido.
- EMA **no** edita ni limpia los archivos de tu dataset.
- EMA **no** repara grabaciones saturadas o con ruido.
- EMA **no** garantiza mejor calidad de audio en todas las voces.
- EMA **no** elimina toda la aleatoriedad del entrenamiento.

---

## ¿Qué es EMA?

Imagina a un estudiante practicando cómo pronunciar una palabra difícil. Un intento individual puede sonar ligeramente más claro o ligeramente más áspero que el inmediatamente anterior. Observar la tendencia a lo largo de muchos intentos recientes da una imagen más estable del progreso del estudiante que juzgar únicamente por el último intento.

*(Ten en cuenta que esto es solo una analogía: EMA no escucha audio, no juzga la pronunciación ni elige grabaciones "mejores" por sí solo.)*

### Cómo ejecuta realmente Redpanda-vc el EMA

En `rvc/train/train.py`, Redpanda-vc mantiene EMA en memoria mientras se ejecuta el entrenamiento:

1. El generador entrena normalmente en cada batch.
2. El optimizador actualiza los pesos en vivo del generador.
3. Inmediatamente después de cada paso del optimizador del generador (en rank `0`), `GeneratorEMA.update()` actualiza una copia promediada separada de los pesos del generador (excluyendo `enc_q`, que solo se usa durante el entrenamiento).
4. Ese promedio móvil permanece en memoria y se guarda dentro del checkpoint de entrenamiento `G`.
5. Cuando EMA está activado (`Generator EMA Decay > 0`), Redpanda-vc exporta los modelos `.pth` de inferencia a partir de esos pesos EMA en lugar de los pesos vivos sin suavizar del generador.

**EMA se actualiza en cada step de entrenamiento, no una vez por epoch.** Redpanda-vc **no** promedia múltiples archivos `.pth` ya guardados en disco; mantiene un único promedio móvil continuo en memoria durante el entrenamiento.

<details>
<summary>Detalles matemáticos opcionales: EMA estándar vs. fórmula con corrección de sesgo de Redpanda-vc</summary>

La actualización estándar intuitiva de EMA es:

```text
EMA_new = decay * EMA_previous + (1 - decay) * current_weights
```

En `rvc/train/train.py` (`GeneratorEMA.update()`, líneas 199-205), Redpanda-vc no aplica un decaimiento constante desde la primera actualización. En su lugar, calcula un decaimiento efectivo con corrección de sesgo basado en el número de actualizaciones (`updates`):

```text
effective_decay = beta * (1 - beta ** (updates - 1)) / (1 - beta ** updates)
```

donde `beta` es tu ajuste `ema_decay`. Esta corrección de calentamiento reduce la influencia de los pesos iniciales durante las primeras actualizaciones y luego se aproxima a `beta` a medida que crece `updates`. Los parámetros en punto flotante se mezclan mediante `torch._foreach_lerp_`, mientras que los buffers que no son de punto flotante se copian del generador en vivo.

</details>

---

## Entender Generator EMA Decay

En **Training → Advanced Settings**, Redpanda-vc expone **Generator EMA Decay** (`tabs/train/rvc.py`, líneas 809-819):

- **Mínimo:** `0`
- **Máximo:** `0.9999`
- **Predeterminado:** `0.999`
- **Paso del deslizador:** `0.0001`

### Qué significan los valores

- **`Generator EMA Decay = 0`:** Desactiva `GeneratorEMA` por completo. Los modelos `.pth` de inferencia se exportan directamente desde los pesos vivos del generador.
- **`Generator EMA Decay = 0.999` (Predeterminado):** Mantiene un promedio móvil exponencial que da un peso significativo a las actualizaciones recientes del generador mientras suaviza las fluctuaciones paso a paso.
- **`Generator EMA Decay = 0.9999`:** Cambia el promedio móvil más lentamente y promedia sobre una ventana más larga de actualizaciones. Esto puede aumentar la suavidad del promedio, pero también hace que los pesos EMA reaccionen más lento a las mejoras recientes en el generador en vivo.

Valores más bajos se adaptan más rápido a los pesos recientes, mientras que valores más altos promedian sobre más pasos. `0.9999` **no** es automáticamente mejor que `0.999`, y no existe un decay "mejor" universal para habla, canto, datasets pequeños o datasets grandes. Si eres principiante, empezar en el valor predeterminado **`0.999`** y comparar resultados de audio reales antes de ajustar es una base práctica.

---

## ¿Por qué usa EMA Redpanda-vc?

En la literatura de aprendizaje profundo (como la documentación de promediado de pesos de PyTorch y Morales-Brotons, Vogels y Hendrikx, 2024), se estudia el promediado de pesos a lo largo de una trayectoria de entrenamiento porque las actualizaciones individuales de SGD/Adam pueden oscilar alrededor de buenas soluciones.

### Posibles beneficios (no son garantías)

- Menor oscilación paso a paso en los pesos exportados.
- Mayor continuidad entre exportaciones consecutivas.
- Atenuación de parte de la variabilidad a nivel de actualización durante el entrenamiento.
- Comportamiento potencialmente más estable del modelo exportado, aunque la mejora real de audio en tu dataset RVC específico requiere pruebas de escucha.

### Limitaciones importantes

- EMA **no** sustituye a un dataset limpio y bien preparado.
- EMA **no** elimina el sobreajuste (overfitting).
- EMA **no** impide que falle un entrenamiento roto o inestable.
- EMA **no** garantiza mayor similitud vocal ni mejor pronunciación.
- EMA **no** promete menos pasos ni menos épocas de entrenamiento.
- EMA **no** es un selector automático del "mejor checkpoint".
- EMA mantiene una copia adicional de los pesos del generador en memoria y añade un pequeño coste de actualización por cada paso.

---

## Pesos EMA vs. Checkpoints de Entrenamiento

En Redpanda-vc coexisten cuatro cosas distintas durante una ejecución. No las confundas:

| Archivo / Estado | Dónde vive | Qué contiene | Para qué se usa |
| --- | --- | --- | --- |
| **Generator checkpoint (`G_*.pth`)** | `logs/<model_name>/` | Pesos vivos del generador, estado del optimizador, scaler, `iteration` (época), `step`, `epoch_step`, RNG y estado `ema` (si está activo) | Reanudar entrenamiento (y exportación manual) |
| **Discriminator checkpoint (`D_*.pth`)** | `logs/<model_name>/` | Pesos del discriminador, estado del optimizador, scaler, `step` | Reanudar entrenamiento junto con `G_*.pth` |
| **EMA weights** | En memoria durante el entrenamiento y dentro de `G_*.pth` (`checkpoint["ema"]["weights"]`) | Promedio móvil de los pesos del generador (sin `enc_q`) | Generar exportaciones `.pth` de inferencia suavizadas |
| **Modelo de inferencia (`<name>_<epoch>e_<step>s.pth`)** | `logs/<model_name>/` | Pesos compactos solo de inferencia del generador + metadatos | Solo conversión de voz (**no** puede reanudar entrenamiento) |

**Nota:** En el código verificado de Redpanda-vc (`train.py`), EMA se aplica **únicamente al generador (`net_g`)**, nunca al discriminador (`net_d`).

---

## Training Steps vs. Epochs

- **Epoch (Época):** Una pasada completa sobre el dataset de entrenamiento preparado.
- **Batch:** Un pequeño grupo de fragmentos de audio procesados juntos en una pasada hacia adelante/atrás.
- **Step (Paso):** Una actualización del optimizador después de procesar un batch. Un paso **no** es un archivo de audio ni un segundo de audio.

### Ejemplo hipotético

Supongamos que tu dataset preparado y `Batch Size` producen **100 pasos por época**:

- `100` pasos ≈ `1` época
- `500` pasos ≈ `5` épocas
- `1,000` pasos ≈ `10` épocas

La proporción real de pasos por época depende de la duración de tu dataset, el corte (slicing), `Batch Size` y `Max Audio per Batch (sec)`. Nunca des por sentado que 100 pasos equivalen a 1 época en todos los modelos.

---

## Guardado de Checkpoints por Pasos

En lugar de esperar a que termine una época completa para guardar, Redpanda-vc programa los guardados por **número de pasos** (`tabs/train/rvc.py`, líneas 663-703; `rvc/train/train.py`, líneas 917-921 y 1146-1195):

### Total Steps

- **Predeterminado:** `10000` (rango del deslizador `1` a `1000000`, paso `1`).
- Establece el **recuento total objetivo de pasos** para el experimento, **no** "sumar 10,000 pasos más". Si tu modelo reanudado ya está en el paso `10000`, debes subir `Total Steps` (por ejemplo a `15000`) para continuar entrenando.

### Save Every X Steps

- **Predeterminado:** `1000` (rango del deslizador `1` a `100000`, paso `1`).
- Guarda checkpoints `G` y `D` cada `X` pasos de entrenamiento (`self.global_step % save_every_steps == 0`).
- **Ejemplo:** Con `Total Steps = 10000` y `Save Every X Steps = 1000`, Redpanda-vc guarda en los pasos `1000`, `2000`, `3000`, ..., `10000`, sin importar si esos pasos caen a mitad de época.

### Final Save

Incluso si `Total Steps` no es múltiplo de `Save Every X Steps` (por ejemplo, `Total Steps = 2500` y `Save Every X Steps = 1000`), Redpanda-vc **siempre** guarda tanto los checkpoints `G`/`D` como un modelo `.pth` de inferencia al llegar al paso final (`final = self.global_step >= self.args.total_steps`).

### Save Every Weights

- **Predeterminado:** **Activado** (`True`).
- Cuando está **activado**, Redpanda-vc exporta un modelo `.pth` de inferencia en cada intervalo de guardado *y* en el paso final.
- Cuando está **desactivado**, los checkpoints `G`/`D` se siguen guardando cada `Save Every X Steps`, pero un `.pth` de inferencia automático se exporta solo en el paso final.

### Save Only Latest

- **Predeterminado:** **Activado** (`True`).
- Cuando está **activado**, los checkpoints `G` y `D` sobrescriben nombres fijos (`G_2333333.pth` y `D_2333333.pth`, donde `2333333` es `LATEST_CHECKPOINT_SUFFIX`) para ahorrar espacio en disco.
- Cuando está **desactivado**, los checkpoints incluyen el número de paso (`G_1000.pth`, `D_1000.pth`, `G_2000.pth`, `D_2000.pth`).
- **Importante:** `Save Only Latest` solo afecta a los checkpoints de entrenamiento `G`/`D`, **no** a los modelos `.pth` de inferencia exportados (salvo que desactives `Save Every Weights`). Ten en cuenta que con `Save Only Latest` activado no podrás retroceder el entrenamiento a un checkpoint `G`/`D` intermedio anterior si la ejecución se degrada después.

---

## Tu Primer Entrenamiento RVC en Redpanda-vc

### 1. Preparación

1. Instala e inicia Redpanda-vc (ver [Configurar Redpanda-vc](first-run.md)).
2. Abre la pestaña **Train** y selecciona **RVC** (si tu compilación muestra varias familias de modelos).
3. En **Model Settings**, introduce un **Model Name** único (el nombre de tu experimento).
4. Elige un **Sample Rate** compatible (`32k`, `40k` o `48k`), **Version** (`v1` o `v2`) y **Vocoder** (`HiFi-GAN`, `MRF HiFi-GAN` o `RefineGAN` según tus preentrenados y la app de inferencia de destino).
5. Prepara un dataset limpio y seco de **grabaciones autorizadas** en una carpeta dedicada.

### 2. Preprocess

1. Abre el acordeón **Preprocess**.
2. Introduce o selecciona la ruta de tu carpeta de dataset en **Dataset Path** (pulsa **Refresh** si hace falta).
3. Pulsa **Preprocess Dataset** y espera a que termine de cortar y normalizar el audio en `logs/<model_name>/`.

### 3. Extract

1. Abre el acordeón **Extract**.
2. Selecciona tu **Pitch extraction algorithm** (como `rmvpe`) y **Embedder Model** (normalmente `contentvec`).
3. Pulsa **Extract Features**. *(Esto prepara las características de tono y contenido para el entrenamiento; todavía **no** entrena los pesos `.pth`.)*

### 4. Training

1. Abre el acordeón **Training**.
2. Ajusta **Batch Size** a un valor que la VRAM de tu GPU soporte con holgura.
3. Para una primera prueba ilustrativa, puedes dejar los valores predeterminados actuales:
   - **Total Steps:** `10000`
   - **Save Every X Steps:** `1000`
4. Despliega **Advanced Settings** para verificar:
   - **Save Only Latest:** Activado (`True`)
   - **Save Every Weights:** Activado (`True`)
   - **Generator EMA Decay:** `0.999`
   *(Estos valores predeterminados son puntos de partida ilustrativos, no ajustes óptimos garantizados para cualquier dataset.)*
5. Pulsa **Start Training**.
6. Supervisa el progreso mediante el estado en terminal/UI, **Pause Training** / **Resume Training** / **Stop Training** y los registros de TensorBoard (`logs/<model_name>/eval/`).
7. Al terminar, pulsa **Generate Index** si quieres un archivo `.index` a juego.

### 5. Archivos de Salida

Dentro de `logs/<model_name>/`, encontrarás:

- **Checkpoints reanudables:** `G_2333333.pth` y `D_2333333.pth` (cuando **Save Only Latest** está activado) o `G_<step>.pth` / `D_<step>.pth` (cuando está desactivado).
- **Modelos de inferencia:** `<model_name>_<epoch>e_<step>s.pth` (por ejemplo, `MyVoice_45e_1000s.pth`). Estos son los archivos que cargas para conversión de voz.

---

## Reanudar el Entrenamiento de Forma Segura

Cuando reinicias el entrenamiento en un experimento existente (`rvc/train/train.py`, líneas 420-436, 528-538, 763-803, 844-853):

1. `latest_checkpoint_pair()` busca en `logs/<model_name>/` el archivo `G_*.pth` más reciente por fecha de modificación y lo empareja con el sufijo `D_*.pth` correspondiente. **Ambos archivos `G` y `D` deben existir** para reanudar.
2. `restore()` recarga `epoch`, `start_batch` (`epoch_step`), `global_step` (`step`), `scaler` AMP, estado RNG y ambos optimizadores.
3. `build_ema()` restaura `GeneratorEMA` desde `checkpoint["ema"]` cuando `ema_decay > 0`. Si falta el estado `ema` o es incompatible (por ejemplo, al reanudar desde un checkpoint sin EMA), Redpanda-vc registra un aviso e inicializa EMA desde los pesos reanudados del generador en lugar de fallar.
4. Cualquier paso completado *después* del último checkpoint guardado antes de un fallo o parada manual se pierde y se volverá a ejecutar desde ese paso guardado.

### Controles que no conviene confundir

- **Reset Optimizer State:** Conserva los pesos de tu modelo, `global_step` y programación de tasa de aprendizaje, pero borra los buffers de momento del optimizador (`state={}`). Úsalo solo cuando reinicies intencionadamente la dinámica del optimizador; una reanudación normal deja esto en **OFF**.
- **Fresh Training (`--cleanup`):** **Elimina** todos los checkpoints `G_*` y `D_*` generados anteriormente, los archivos `spec.pt` y los registros de TensorBoard de ese experimento. Déjalo en **OFF** siempre que reanudes.
- **Save Every X Steps vs. Checkpointing:** **Save Every X Steps** controla cada cuánto se escriben los checkpoints en disco. **Checkpointing** (en **Advanced Settings**) es **activation checkpointing**, que intercambia velocidad de entrenamiento más lenta por menor uso de VRAM en GPUs con memoria limitada (no controla el guardado en disco).

---

## Cómo Exporta Redpanda-vc Modelos EMA

1. **Exportaciones automáticas durante el entrenamiento (`train.py`, líneas 1090-1091 y 1157-1163):** Siempre que `save()` dispara una exportación de inferencia (`Save Every Weights` o el paso final), `export_state_dict()` devuelve `self.ema.weights` si EMA está activado (`ema_decay > 0`), o el `state_dict()` del generador en vivo si EMA está desactivado (`ema_decay = 0`).
2. **Exportaciones manuales (acordeón `Export Model` -> `rvc/train/process/checkpoint_exporter.py`, líneas 44-117):** Puedes exportar manualmente cualquier checkpoint reanudable `G_*.pth` en `fp16` o `fp32`. `export_generator_checkpoint()` comprueba si existe `checkpoint["ema"]["weights"]` y usa automáticamente esos pesos EMA cuando están presentes (mostrando `... and the generator EMA` en el mensaje de estado).
3. **No** hay un selector separado "Raw vs. EMA" en el exportador de la WebUI; el `.pth` exportado es solo para inferencia, mientras que `G_*.pth` + `D_*.pth` siguen siendo necesarios para reanudar el entrenamiento.

---

## ¿Suena Realmente Mejor con EMA?

No existe una respuesta universal de sí o no para todas las voces y datasets. Como la WebUI actual no exporta versiones Raw y EMA lado a lado en una misma ejecución, la forma más limpia de probar EMA es una comparación controlada:

1. Usa exactamente el mismo dataset preparado y la misma extracción de características.
2. Mantén idénticos `Batch Size`, `Total Steps`, programación de tasa de aprendizaje y pesos preentrenados.
3. Ejecuta un experimento con `Generator EMA Decay = 0.999` y otro con `0`.
4. Compara las exportaciones `.pth` de inferencia en el **mismo número de pasos** (p. ej., `5000s` vs. `5000s`) usando clips de prueba externos que no estén en el conjunto de entrenamiento.
5. Escucha similitud de voz, nitidez de consonantes, estabilidad de tono y artefactos en lugar de juzgar solo por las curvas de pérdida de TensorBoard.

---

## Solución de Problemas para Principiantes

| Problema | Causa posible | Qué comprobar | Solución |
| --- | --- | --- | --- |
| **El entrenamiento no arranca** | Faltan archivos preprocesados/extraídos, ruta incorrecta o bloqueo de ejecución activa (`training_state.json`) | Revisa la salida de terminal en busca del primer error | Completa primero **Preprocess Dataset** y **Extract Features**, y confirma que no haya ninguna ejecución activa |
| **GPU sin memoria (OOM)** | `Batch Size` demasiado alto o `Cache Dataset in GPU` activado con poca VRAM | Revisa uso de VRAM y error en terminal | Baja **Batch Size**, desactiva **Cache Dataset in GPU** o activa **Checkpointing** |
| **EMA no parece cambiar resultados** | Pocos pasos, decay cercano a `0` o comparación en pasos distintos | Revisa `Generator EMA Decay` y el resumen inicial en consola | Confirma que `generator EMA <value>` aparece al iniciar y compara exportaciones del mismo paso en clips externos |
| **EMA Decay en `0`** | El deslizador está en `0` | Revisa **Training → Advanced Settings → Generator EMA Decay** | Ponlo en `0.999` (predeterminado) si quieres EMA activo en la siguiente ejecución |
| **Sin modelos `.pth` intermedios de inferencia** | **Save Every Weights** está desactivado | Revisa **Training → Advanced Settings → Save Every Weights** | Activa **Save Every Weights** para exportar modelos de inferencia en cada `Save Every X Steps` |
| **Solo existen los últimos checkpoints `G`/`D`** | **Save Only Latest** está activado (predeterminado) | Revisa `G_2333333.pth` / `D_2333333.pth` en `logs/<model_name>/` | Desactiva **Save Only Latest** antes de entrenar si quieres historial numerado `G_<step>.pth` |
| **Falta el checkpoint `G` o `D`** | Se borró o movió un archivo manualmente | Busca la pareja coincidente `G_*` y `D_*` en `logs/<model_name>/` | Hacen falta tanto `G` como `D` con el mismo sufijo para reanudar (`latest_checkpoint_pair()`) |
| **El entrenamiento reinicia desde un paso anterior** | Se detuvo o falló antes del siguiente `Save Every X Steps` | Compara el último paso en consola con el paso reanudado | Comportamiento normal: el progreso posterior al último guardado en disco no se almacena hasta el siguiente intervalo |
| **Aviso/error al restaurar estado EMA** | Reanudación desde checkpoint sin EMA o configuración de modelo distinta | Lee `"Could not restore the generator EMA..."` en terminal | Redpanda-vc inicia automáticamente EMA desde los pesos reanudados del generador |
| **Fresh Training borró checkpoints previos** | **Fresh Training** (`--cleanup`) se quedó marcado | Revisa `logs/<model_name>/` | Desmarca **Fresh Training** al reanudar; los checkpoints borrados no se recuperan sin copia de seguridad |
| **Total Steps ya alcanzado** | `global_step >= Total Steps` | Lee `"already reached step X. Raise the total steps..."` en terminal | Sube **Total Steps** por encima del paso actual y pulsa **Start Training** |
| **El `.pth` exportado no puede reanudar** | Se cargó un `.pth` de inferencia en lugar de `G_*.pth` + `D_*.pth` | Revisa el nombre (`<name>_Xe_Ys.pth` vs. `G_*.pth`) | Los `.pth` de inferencia eliminan el estado de entrenamiento; reanuda desde `logs/<model_name>/` con `G_*.pth` y `D_*.pth` |
| **Uso de VRAM inesperadamente alto** | **Checkpointing** desactivado, **Batch Size** alto o **Cache Dataset in GPU** activado | Revisa **Advanced Settings** | Activa **Checkpointing** (activation checkpointing), desactiva **Cache Dataset in GPU** y reduce **Batch Size** |

---

## FAQ

**¿Qué significa EMA?**
Exponential Moving Average: un promedio móvil de los pesos del generador mantenido durante el entrenamiento.

**¿EMA mejora la calidad de voz?**
Puede suavizar oscilaciones de los pesos, pero no es una garantía. Que una voz concreta suene mejor depende de tu dataset y requiere pruebas de escucha.

**¿Los principiantes deberían dejar EMA en `0.999`?**
Sí, `0.999` es el valor predeterminado en Redpanda-vc y es un punto de partida razonable antes de experimentar con otros valores.

**¿Qué pasa si EMA Decay es `0`?**
EMA se desactiva (`self.ema` no se construye) y los modelos de inferencia se exportan desde los pesos vivos del generador.

**¿`0.9999` es mejor que `0.999`?**
No automáticamente. `0.9999` promedia sobre un historial más largo y reacciona más lento a las actualizaciones recientes.

**¿EMA hace que el entrenamiento sea más rápido?**
No. EMA mantiene una copia extra de los pesos y ejecuta un paso de actualización tras cada paso del generador.

**¿EMA evita el sobreajuste (overfitting)?**
No. El sobreajuste sigue dependiendo del tamaño del dataset, la variedad y los pasos totales de entrenamiento.

**¿Se aplica EMA al discriminador?**
No. En Redpanda-vc (`train.py`), EMA se aplica solo al generador (`net_g`).

**¿Cuál es la diferencia entre una época y un paso?**
Una época es una pasada completa por el dataset; un paso es una actualización de pesos tras procesar un batch.

**¿Puede Redpanda-vc guardar a mitad de una época?**
Sí. Los guardados se activan por `Save Every X Steps`, de forma independiente a los límites de época.

**¿Perderé progreso si detengo el entrenamiento?**
Conservas el progreso hasta el último checkpoint `G`/`D` guardado; los pasos ejecutados después de ese guardado se pierden.

**¿Cuál es la diferencia entre Save Only Latest y Save Every Weights?**
`Save Only Latest` sobrescribe los checkpoints de entrenamiento `G_2333333.pth` / `D_2333333.pth`; `Save Every Weights` exporta un modelo `.pth` de inferencia en cada intervalo de guardado en vez de solo en el paso final.

**¿Checkpointing es lo mismo que guardar checkpoints?**
No. `Checkpointing` en Advanced Settings es activation checkpointing para ahorrar VRAM, mientras que `Save Every X Steps` controla el guardado de checkpoints en disco.

**¿Puedo reanudar el entrenamiento desde un `.pth` de inferencia?**
No. Reanudar requiere un par coincidente de checkpoints `G_*.pth` y `D_*.pth` en `logs/<model_name>/`.

---

## Fuentes Oficiales y Lecturas Adicionales

- **Repositorio de Redpanda-vc:** [github.com/redpanda343/Redpanda-vc](https://github.com/redpanda343/Redpanda-vc)
- **Implementación de `GeneratorEMA`:** [`rvc/train/train.py` (líneas 179-217)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py#L179-L217)
- **Guardado por pasos, reanudación y estado de exportación:** [`rvc/train/train.py` (líneas 420-436, 526-579, 763-853, 902-921, 1044-1097, 1146-1195)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py#L1146-L1195)
- **Controles WebUI de entrenamiento:** [`tabs/train/rvc.py` (líneas 663-880)](https://github.com/redpanda343/Redpanda-vc/blob/main/tabs/train/rvc.py#L663-L880)
- **Exportador manual de checkpoints:** [`rvc/train/process/checkpoint_exporter.py` (líneas 44-117)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/process/checkpoint_exporter.py#L44-L117)
- **E/S de checkpoints y control de procesos:** [`rvc/train/utils.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/utils.py) · [`rvc/train/process/training_control.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/process/training_control.py)
- **Documentación oficial de PyTorch:** [Weight Averaging (SWA and EMA)](https://docs.pytorch.org/docs/stable/optim.html#weight-averaging-swa-and-ema) · [`torch.optim.swa_utils.AveragedModel`](https://docs.pytorch.org/docs/stable/generated/torch.optim.swa_utils.AveragedModel.html)
- **Artículo científico:** Morales-Brotons, Vogels y Hendrikx, *Exponential Moving Average of Weights in Deep Learning: Dynamics and Benefits* ([OpenReview](https://openreview.net/forum?id=2M9CUnYnBA))
