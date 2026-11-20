---
label: "Rendimiento, limpieza y herramientas"
icon: ":wrench:"
order: 95
permalink: /non-rvc/causal-voice-changer/performance-and-tools/
---
# Rendimiento, limpieza de sonido y herramientas extra

## 1. Rendimiento y latencia (página `Performance`)

### Búfer (Buffering)

- **Chunk** (en pasos de `20 ms`): cuánto audio se convierte cada vez. El retardo total es el lookahead fijo de **60 ms** de CVC + **1 chunk** + los búferes de la tarjeta de sonido/cable virtual.
  - Chunks menores = menor latencia, pero exigen una GPU más rápida.
  - Si hay chasquidos o cortes (o si usas CPU en una AMD antigua), sube **Chunk** a `40 ms` o `60 ms+`.
- **Extra inference buffer**: cuánto habla reciente mira hacia atrás el modelo para cada bloque. Más contexto da tono y afinación más estables con un pequeño coste de GPU, **sin añadir retardo**.

### Inferencia y GPU

- **Pitch detector**:
  - **RMVPE (recomendado)**: el más preciso.
  - **FCPE**: más ligero para la GPU.
  - **PM (fastest)**: el más rápido, pero más tosco.
- **Pitch smoothing** *(solo RMVPE)*: sigue el tono como una línea continua para que las notas largas no tiemblen ni salten de octava (sin retardo extra).
- **Volume envelope**: `0` sigue exactamente el volumen de tu micro instante a instante; `1` mantiene el volumen propio del modelo.
- **Fast GPU replay** *(activado por defecto)*: graba el trabajo de la GPU una vez y lo reproduce en cada bloque - aprox. **2× más rápido** y mucho más estable (ej. una RTX 5050 convierte un chunk de `20 ms` en `4.4 ms` en vez de `9.7 ms`). Desactívalo solo si tu GPU falla o convierte mal con él.
- **Ayudas de costura y calidad**:
  - **Soften sudden treble**: suaviza clics breves en agudos a mitad de palabra (añade `5 ms` de retardo).
  - **Match level across seams**: mantiene estable el nivel de agudos entre bloques (sin retardo extra).
  - **Hold context during silence**: recuerda tus últimas palabras en las pausas para que la primera palabra tras el silencio no salga borrosa.
  - **Silence detection**: **Loudness** (`-50 dBFS`) va mejor en salas silenciosas; **Voice detection (experimental)** usa RNNoise para que ventiladores y zumbidos no cuenten como voz.

## 2. Limpieza de sonido (`Noise Reduction`)

- **Input noise reduction**: elimina teclado, ventiladores o ruido ambiental antes de convertir:
  - **Hushwire (Amazon Voice Focus)** *(por defecto)*: limpieza más potente y voz más natural; añade unos **55 ms** de retardo. Su modelo se descarga una vez desde los servidores de Amazon solo tras aceptar el aviso.
  - **RNNoise**: limpieza más ligera con menor retardo (**20 ms**).
- **Output noise reduction**: limpia siseos de la voz convertida con puerta espectral. Déjalo **desactivado** salvo que oigas siseo, ya que puede apagar ligeramente la voz.

## 3. Grabación (página `Recording`)

Puedes grabar sesiones directamente en CausalVC Realtime (inicia primero la conversión):
- **Separate files**: guarda la entrada cruda y la salida convertida en dos archivos distintos.
- **Mix**: guarda entrada + salida mezcladas.
- **Split L/R**: entrada cruda en el canal izquierdo, salida convertida en el derecho.

## 4. Biblioteca, conversión offline de archivos y Logs

- **Página Library**: busca y ordena voces, usa **Rename**, **Move to Trash**, **Open folder**, **Add/Replace `.index`**, o **Export** para exportar una voz como `.cvc` con sus ajustes.
- **Conversión de archivos completos sin conexión**: para convertir archivos de audio enteros desde la terminal sin abrir la ventana en vivo, usa el módulo `causalvc.infer`:
  ```bash
  uv run python -m causalvc.infer --help
  ```
- **Página Log**: si algo falla, abre la página **Log** y haz clic en **Save log** para exportar los registros de diagnóstico.
