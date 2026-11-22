---
label: "Ajustes y Calidad de Audio"
icon: ":gear:"
order: 96
permalink: /non-rvc/yunevoix/settings/
description: "Guía completa para principiantes de cada ajuste de YuneVoix v0.7.1 en General, Voice & Timbre, Pitch & Autotune, EQ & Filters y Effects."
---
# Ajustes de YuneVoix Explicados - Guía Completa de Calidad de Audio

[Resumen y Requisitos](overview.md) · [Voice Bank y Uso en Directo](usage.md) · [Song Cover y Karaoke](song-cover-karaoke.md)

Esta referencia explica cada ajuste documentado en YuneVoix **v0.7.1** (NVIDIA y AMD). En la documentación del desarrollador:
- **"Works live"** significa que el cambio tiene efecto de inmediato mientras LIVE está en marcha.
- **"At the next START"** significa que debes detener LIVE y pulsar **START** de nuevo para que el cambio surta efecto.

---

## Settings → General

Estos controles gestionan la limpieza de entrada, la monitorización, el nivel de salida, el búfer y la selección del backend gráfico de AMD (se aplica a **LIVE**, mientras que `Models folder` y `AMD graphics engine` afectan a toda la app):

| Control | Predeterminado | Se aplica | Qué es y qué hace | Cuándo usarlo y qué puede fallar |
| --- | --- | --- | --- | --- |
| **Input cleaning** (`DF3`, `Gentle`, `Sidon`, `Off`) | `DF3` | Al siguiente START | Limpia el audio del micrófono antes de convertir. `DF3` elimina tecleo, clics y siseo mientras refuerza micrófonos bajos (`+30 ms`). `Gentle` elimina ruido constante/clics conservando risas y respiraciones. `Sidon` reconstruye el habla en GPU (`+~200 ms`). `Off` desactiva la limpieza. | Usa `DF3` en salas normales/ruidosas, `Gentle` en salas silenciosas, `Off` solo con micrófono de estudio limpio. **No uses `Sidon` para cantar** (documentado como no apto para canto). |
| **Speech gate** | `Off` | En directo | Silencia la salida entre palabras. | Actívalo solo en salas ruidosas al hablar normalmente; **corta risas y suspiros**, así que déjalo apagado si ríes a menudo. |
| **Microphone level** | Medidor (objetivo `−6 dBFS`) | Solo medidor | Muestra el nivel de tu micrófono en dB. | Sube la ganancia del micro en Windows hasta que el habla fuerte alcance picos cerca de **`−6 dBFS`**. Una entrada baja provoca sonido robótico o "bajo el agua". |
| **Monitor device** | Salida predeterminada de Windows | Monitorización LIVE | Elige dónde suenan **"Listen to input"** / **"Listen to output"**. | Pon tus **auriculares**, nunca el cable virtual usado como salida LIVE (evita bucles de acople). |
| **Monitor volume** | `−6 dB` | Monitorización LIVE | Ajusta el volumen de la salida de monitorización integrada. | Bájalo si la monitorización suena fuerte; no afecta a lo que reciben Discord/OBS. |
| **Output volume** | `−6 dB` | En directo | Controla el nivel de salida convertido enviado a tu dispositivo de salida LIVE. | YUNE suena más alto que la mayoría de grabaciones; mantenlo sobre `−6 dB` salvo que tu app receptora necesite ajuste. |
| **Peak limiter (`−1 dBFS`)** | `On` | En directo | Limita los picos de salida a `−1 dBFS` para evitar saturación digital. | Déjalo en **On** salvo que estés probando dinámica sin procesar. |
| **Output buffer** | `200 ms` | Al siguiente START | Tamaño del búfer de audio antes de la reproducción. | Valores mayores reducen cortes/chasquidos a costa de mayor retardo; bajarlo demasiado provoca cortes de audio. |
| **Models folder** | Vacío (`models` junto al `.exe`) | Global | Apunta a una carpeta personalizada para modelos y voces. | Déjalo vacío salvo que guardes `models` en otra ruta. |
| **Save diagnostic recordings** | `Off` | Diagnóstico | Guarda archivos WAV de lo que oyó y generó el motor (se detiene solo tras 10 min; vuelve a Off al reiniciar). | Actívalo **solo** al reportar un error; revisa las grabaciones por si contienen voz privada antes de compartirlas. |
| **Restore default settings** | Botón de acción | Global | Restablece todos los ajustes a sus valores predeterminados. | Tus voces guardadas y dispositivos de audio seleccionados se conservan. |
| **AMD graphics engine** *(solo compilación AMD)* | `DirectML` | Tras reiniciar | Cambia entre **DirectML** (predeterminado, GPU dedicada) y el experimental **MIGraphX**. | Déjalo en **DirectML** para usar `WavLM+` y `FlowEdit 3+1`. **MIGraphX** requiere Windows 11 24H2+, Adrenalin 25.10.13.09+, compilación inicial de 10-30 min y deshabilita `WavLM+`, `FlowEdit 3+1`, `Learned 4 steps` y las opciones exclusivas de Classic (todo se ejecuta como Classic, 10 × Euler). |

> **Limpieza vs. Volumen vs. Limitador vs. Búfer:** *Input cleaning* quita el ruido de fondo antes de que la IA te oiga; *Output volume* cambia el volumen; *Peak limiter* evita distorsiones repentinas; *Output buffer* intercambia latencia por estabilidad frente a chasquidos.

---

## Settings → Voice & Timbre (LIVE)

Controla cuánto se acerca la salida a la voz del Voice Bank frente a la tuya propia, y qué arquitectura o método de modelo se ejecuta:

- **Timbre strength** (`100%` por defecto): Por debajo de `100%` mezcla tu propio timbre vocal usando **`Sample of your voice…`** (5-20 s de habla normal, guardado como `my_voice.yvoice`). Funciona en LIVE.
- **Timbre change when you raise or lower your voice** (`50%` por defecto): `100%` deja que el color vocal cambie de forma natural con el tono; `0%` mantiene el mismo color en todo tu rango.
- **Prompt length** (`20 s` por defecto, recomendado): Duración del prompt de referencia usado por el modelo de difusión. `20 s` ofrece el timbre más estable; valores menores ahorran memoria de GPU (**Al siguiente START**).
- **Model method** (`Classic` por defecto, **Al siguiente START**):
  - **`Classic`:** Comportamiento de versiones anteriores; habilita los cuatro controles exclusivos de Classic de abajo.
  - **`Learned 4 steps`:** Ajustado para sonar como 10 pasos mientras el modelo necesita alrededor del **40%** de su tiempo de GPU y menos memoria de GPU (según las notas del desarrollador).
  - **`FlowEdit 3+1`:** Parte de tu propia voz (`Sample of your voice…`, 5-20 s) en lugar de ruido y cambia solo la identidad vocal, conservando mejor respiraciones, susurros, risas y articulación (alrededor del **60%** del tiempo de GPU del modelo). Vuelve a `Learned 4 steps` si no hay muestra (se muestra en la línea de estado LIVE). En **AMD MIGraphX** todos los métodos del modelo se ejecutan como `Classic` (10 × Euler).
- **Controles exclusivos de Classic** *(activos solo cuando `Model method = Classic`)*:
  - **Model steps** (`10` por defecto): `8`, `6` (`≈ −0.75 GB` VRAM) o `4` (`≈ −1.1 GB` VRAM) van más rápido con menos VRAM.
  - **Solver** (`Euler` por defecto): Cambia a `DPM++ 2M` al usar `4-6` pasos.
  - **Guidance (CFG) only in the first half of the steps** (`Off` por defecto): Ahorra memoria de GPU, útil sobre todo con `4-6` pasos.
  - **Timbre guidance** (`0 = off` por defecto): `0.5-1` refuerza el aire en grabaciones de destino con voz aireada; consume más tiempo de GPU.
- **Content engine** (`Whisper` por defecto, **Al siguiente START**):
  - **`Whisper`:** Mayor fidelidad al timbre de destino.
  - **`WavLM+`** *(solo NVIDIA y AMD DirectML; no disponible en AMD MIGraphX)*: Habla en directo más clara, conserva tus risas, susurros y respiraciones con mucho menos zumbido, aunque el timbre puede ser algo menos exacto. Como `WavLM+` usa su propio modelo, **`Fine-tuned model`** y **`Breathiness`** quedan desactivados cuando `WavLM+` está activo.
- **Fine-tuned model** (`Off` por defecto, **Al siguiente START**, solo Whisper): Sigue más de cerca tu respiración y aspereza, con un timbre de destino algo menos exacto.
- **Breathiness** *(solo Fine-tuned model)*: Por defecto `as you sing`; `×1` / `×2` añade aire extra.
- **Roughness from your voice** (`Off` por defecto): Recupera el rasgado vocal donde tu propia voz es áspera.
- **Smooth out vocal fry** (`Off` por defecto, **Funciona en directo**): Evita que el habla o canto muy grave o crepitante suene áspero, manteniendo el aire.
- **Guidance (CFG)** (`0.7` por defecto, recomendado tal como fue entrenado): Controla la adherencia al prompt del timbre de destino.

---

## Settings → Pitch & Autotune (LIVE)

- **Pitch shift** (`+12 st` por defecto en la documentación del desarrollador como ejemplo de voz masculina → destino femenino; `0` para mismo rango; `−12` para femenina → masculina): Desplaza el tono en semitonos. No existe un único ajuste "correcto" para todas las voces; elige el desplazamiento que encaje con tu voz y el personaje de destino.
- **Automatic pitch** (`Off` por defecto): `Off` usa el deslizador Pitch shift. **`Octave from the target voice`** mantiene el canto afinado; **`Match the target voice's pitch`** ajusta el tono al hablar hacia el de destino.
- **Melody mode** (`Follow my pitch` por defecto):
  - **`Follow my pitch`:** Seguimiento natural del tono.
  - **`Autotune`:** Ajusta las notas a la tonalidad/escala (`Retune speed` `40 ms` por defecto: `25-60 ms` natural, `0-10 ms` robótico; `Stability` `50%`; `Pull to the nearest note` `50%`; `Note change threshold` `20 cents`).
  - **`Stabilize`:** Estabiliza notas sostenidas manteniendo el vibrato.
- **I sing without a backing track** (`On` por defecto): Ponlo en **Off** cuando cantes sobre una canción.
- **Key / Scale** (`Auto` por defecto): Detecta o bloquea automáticamente la escala musical para Autotune/Harmony.
- **Vibrato** (`100%` por defecto): Conserva tu vibrato natural al `100%`.
- **Fix pitch detector errors** (`On` por defecto, recomendado): Suaviza saltos bruscos del detector de tono.
- **Harmony** (`Off` por defecto): Añade terceras/quintas en directo siguiendo la tonalidad (`Harmony volume` `−6 dB`); consume tiempo extra de GPU.

---

## Settings → EQ & Filters (LIVE)

Todos estos controles moldean el tono y suavizan asperezas en **LIVE** (y se copian a las covers si haces clic en **Copy settings from LIVE**):

- **Voice character** (`Off (as before)` por defecto): Preajustes integrados (**Soft**, **Warm**, **Bright**, **Calm**, **Expressive**) o deslizadores manuales para **Formants**, **Intonation range**, **Pitch smoothing**, **Warmth** (`≈250 Hz`), **Softness** (`0.5-3 kHz`) y **Presence** (`≈3.5 kHz`).
- **Breath smoothing** (`100%` por defecto): Elimina leves chasquidos en las respiraciones.
- **Silence stays silent** (`On` por defecto): Fuerza silencio real en las pausas; con `WavLM+` puedes compararlo en **Off**.
- **Smooth top** (`100%` por defecto) y **Brightness** (`0 dB` por defecto): **Smooth top** suaviza la aspereza o grano en altas frecuencias. Sube **Brightness** solo si la salida suena apagada (y pon **Smooth top** a `0` si subes Brightness).
- **Filters, De-esser, Dynamic EQ** (`Off` por defecto): Elige primero un preajuste y luego afina si las sibilantes (`s`/`sh`) o frecuencias concretas suenan estridentes.

---

## Settings → Effects (LIVE)

- **Compressor, Saturation, Bitcrush, Reverb** (`Off` por defecto): Cada efecto incluye preajustes y **funciona en directo** (cambia con suavidad incluso mientras cantas). Úsalos con moderación para no tapar el timbre de destino ni añadir distorsión o eco indeseados.

---

## Tablas de Referencia Rápida

### Punto de Partida Recomendado (de la Documentación del Desarrollador)

| Área | Valor Inicial | Notas |
| --- | --- | --- |
| **Input cleaning** | `DF3` (`Gentle` en salas silenciosas) | `Speech gate` `Off` |
| **Microphone level** | Picos cerca de `−6 dBFS` | Ajustar en sonido de Windows |
| **Output / Monitor volume** | `−6 dB` / `−6 dB` | `Peak limiter (−1 dBFS)` `On` |
| **Output buffer** | `200 ms` | Subir si el audio chasquea |
| **Prompt length / CFG** | `20 s` / `0.7` | `Timbre strength` `100%` |
| **Model method / Content engine** | `Classic` (o `Learned 4 steps` para juegos) / `Whisper` | Probar `WavLM+` / `FlowEdit 3+1` para respiraciones y risas |
| **EQ & Effects** | `Smooth top` `100%`, `Brightness` `0 dB`, `Breath smoothing` `100%` | `Effects` `Off` |

### Cuándo se Aplican los Cambios (`Works live` vs. `At the next START`)

| Se Aplica al Instante (`Works live`) | Requiere Stop → `START` (`At the next START`) |
| --- | --- |
| `Speech gate`, `Output volume`, `Peak limiter` | `Input cleaning`, `Output buffer` |
| `Smooth out vocal fry`, `Timbre strength`, `Guidance (CFG)` | `Prompt length`, `Model method` (`Classic` / `Learned 4 steps` / `FlowEdit 3+1`) |
| Controles `Pitch & Autotune`, `EQ & Filters`, `Effects` | `Content engine` (`Whisper` / `WavLM+`), `Fine-tuned model` |

### Controles Exclusivos de Classic vs. Compatibilidad de Backends AMD

| Función | ¿Solo Classic? | NVIDIA | AMD DirectML | AMD MIGraphX (Experimental) |
| --- | --- | --- | --- | --- |
| `Model steps`, `Solver`, `1st-half CFG`, `Timbre guidance` | **Sí** | Sí | Sí | **No** *(fijo 10 × Euler)* |
| `Learned 4 steps` | No | Sí | Sí | **No** *(vuelve a Classic)* |
| `WavLM+` | No | Sí | Sí | **No** *(no disponible)* |
| `FlowEdit 3+1` | No | Sí | Sí | **No** *(vuelve a Classic)* |

> En AMD MIGraphX, YUNE siempre ejecuta el método Classic con 10 pasos Euler; `Learned 4 steps`, `FlowEdit 3+1` y las opciones exclusivas de Classic no están disponibles allí.

### Diferencias Iniciales entre Hablar y Cantar

| Ajuste | Hablar (Discord / Streaming) | Cantar |
| --- | --- | --- |
| **Input cleaning** | `DF3` (o `Gentle` en sala silenciosa) | `DF3` o `Gentle` (**nunca `Sidon`**) |
| **Automatic pitch** | `Match the target voice's pitch` (u `Off` + deslizador) | `Octave from the target voice` (u `Off` + `0`/`±12`) |
| **I sing without a backing track** | `On` | `Off` al cantar sobre música |
| **Melody mode** | `Follow my pitch` | `Follow my pitch`, `Stabilize` o `Autotune` |

Siguiente paso: [Song Cover y Karaoke - Guía Completa para Principiantes](song-cover-karaoke.md).
