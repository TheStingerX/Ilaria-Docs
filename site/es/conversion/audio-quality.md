# Mejorar la Calidad de Audio en Inferencia RVC

[Descargar Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

En la conversión de voz RVC, la **calidad de audio** depende de dos mitades trabajando juntas: la **grabación fuente** que introduces y el **modelo + ajustes de inferencia** que aplicas. En modelos RVC guiados por F0, la conversión sintetiza el timbre de la voz objetivo usando el contorno F0 extraído de tu grabación fuente; la voz objetivo no impone automáticamente su propio rango tonal (los resultados dependen también de los datos de entrenamiento y límites del modelo). RVC **no puede** reparar clipping, música de fondo fuerte, eco de sala ni dicción poco clara ya presentes en el archivo de entrada.

## Empieza con una línea base diagnóstica concreta

Antes de tocar controles avanzados, ejecuta una pasada limpia en **Ilaria RVC** para saber qué hace el generador `.pth` por sí solo sobre tu audio fuente:

1. Abre la pestaña **Inference**.
2. Selecciona la voz objetivo en **Voice Model** (pulsa **Refresh** si acabas de añadirla).
3. Quédate en la subpestaña **Single Inference**.
4. Carga tu grabación en **Audio to convert**. *(Un fragmento corto ayuda a aislar un instante concreto más rápido, pero los clips cortos nunca son obligatorios.)*
5. Pon **Pitch** en `0`.
6. En **Inference Settings**, elige **RMVPE** en **Pitch Extraction**.
7. Pon **Index Ratio** en `0` (desactiva la recuperación de rasgos FAISS para escuchar el generador `.pth` sin mezcla de índice).
8. Deja desactivadas (**OFF**) todas las casillas opcionales de **Audio Processing** (**Split Audio**, **Autotune**, **Proposed Pitch**, **Clean Audio**, **Formant Shifting**, **Post-Process**) y **RMVPE High Register**.
9. Pulsa **Convert**.
10. Escucha **Output Audio** y lee **Output Log** para ver el estado de la conversión, tiempos y detalles disponibles de índice o embedder. Estos mensajes no confirman necesariamente que la recuperación FAISS se completara con éxito (un índice puede estar seleccionado y figurar como habilitado en ajustes aunque falle o se omita su carga FAISS, y `Embedder` puede no imprimirse explícitamente cuando se usa `Auto (model default)`). Revisa el diagnóstico de consola si falla la carga del índice o el resultado es inesperado.

> **Solo línea base diagnóstica:** Esta configuración inicial sirve para aislar lo que hace el generador `.pth` sin recuperación FAISS ni post-procesado; no garantiza una calidad final óptima. Cambia un control a la vez desde esta base y compara al mismo volumen de escucha.

---

## A. Conseguir una conversión limpia

- **Audio fuente y voces aisladas:** RVC espera una sola voz seca y limpia. Herramientas como [UVR5](../non-rvc/audio-separation-tools/uvr5/overview.md) o [MVSep](../non-rvc/audio-separation-tools/mvsep/overview.md) ayudan a separar voces de bases musicales, y modelos especializados cubren denoising, dereverberation, de-essing o restauración según el modelo utilizado (ninguna herramienta elimina todo tipo de ruido o reverberación).
- **Habla vs. canto:** El habla suele tolerar pequeños ajustes de **Pitch**, mientras que cantar sobre una pista instrumental normalmente mantiene **Pitch** en `0` para seguir en tonalidad con el acompañamiento (una transposición distinta de la octava puede ser adecuada si también cambia la tonalidad del acompañamiento).
- **Compatibilidad de modelo y embedder:** Deja **Embedder Model** en `Auto (model default)` salvo que hayas entrenado o descargado un modelo que requiera un codificador concreto (`contentvec`, `spin-v2`, `klm-vocal-contentvec`, etc.). Usar un embedder incompatible puede provocar un error o degradar la conversión y romper la coincidencia del índice.
- **Modelos sin guía de tono (`if_f0 == 0`) vs. modelos guiados por tono (`if_f0 == 1`):**
  - **Modelos sin guía de tono (`if_f0 == 0`):** Omiten la extracción F0 (`pitch` y `pitchf` no se pasan al generador `.pth`). Sin condicionamiento F0, no se aplican **Pitch**, **Pitch Extraction**, **RMVPE High Register**, **Autotune**, **Proposed Pitch** ni **Protect** (oculto en la interfaz cuando `if_f0 == 0`). **Embedder**, **Index Ratio**, **Formant Shifting**, **Volume Envelope**, **Clean Audio** y **Post-Process** (incluido **Post-Process → Pitch Shift**) siguen funcionando con normalidad.
  - **Modelos guiados por tono (`if_f0 == 1`):** Extraen un contorno F0 de la entrada a `16 kHz` y lo pasan al generador `.pth` junto con los rasgos de contenido. **Pitch Extraction**, **Pitch**, **RMVPE High Register**, **Autotune**, **Proposed Pitch** y **Protect** (cuando `Index Ratio > 0` y `protect < 0.5`) están activos, lo que los hace adecuados para canto y habla con control tonal.
- **Índice opcional y exportación sin pérdida:** Mantén **Index Ratio** en `0` para tu línea base y luego prueba tu `added_*.index` correspondiente si lo deseas. Usa `wav` o `flac` para exportaciones sin pérdida; `flac` reduce el tamaño del archivo sin compresión con pérdida. `mp3`, `ogg` y `m4a` usan codificación con pérdida en el exportador actual de Ilaria RVC, y el formato de exportación nunca añade detalle que el modelo no haya producido.

---

## B. Corregir problemas de tono y canto

- **Pitch (Semitonos):** Pitch cambia el contorno F0 extraído en semitonos (`-24` a `+24`; `12` semitonos = 1 octava). En `0`, la conversión guiada por tono sigue el tono fuente sin transposición adicional. Elige un valor distinto solo cuando sea necesario para la interpretación objetivo o el arreglo musical (en canto, una transposición distinta de la octava puede ser apropiada si también cambia la tonalidad del acompañamiento). No existe un cambio de tono universal para convertir entre distintos tipos de voz. Requiere un modelo guiado por tono (`if_f0 == 1`).
- **Pitch Extraction (F0) en Ilaria RVC:** Estima la frecuencia fundamental (F0) de la entrada a `16 kHz` antes de la síntesis (distinto del cambio de tono).
  - **Inferencia Individual y por Lotes (CUDA):** `rmvpe` (predeterminado), `swift`, `beatrice`, `fcpe`, `parselmouth`, `harvest`, `crepe`. *(En compilaciones DirectML: `pm`, `harvest`, `rmvpe`, `fcpe`.)*
  - **Solo extracción de rasgos en Entrenamiento:** Incluye `rmvpe_gpu` (y `dio`); `rmvpe_gpu` **no** es un botón separado en Inferencia.
  - *Nota:* Si `rmvpe` produce un salto de octava en una nota concreta, prueba `fcpe`, `swift`, `beatrice` o `crepe` en ese mismo pasaje en lugar de asumir que un método es universalmente "mejor" o más rápido para todas las voces.
- **RMVPE High Register** *(visible solo cuando `rmvpe` está seleccionado)*:
  - **Enable high register:** Activa la corrección secundaria de errores de octava para notas cantadas muy agudas. **No** lo dejes activado por defecto para habla normal o canto en registro medio.
  - **Mode (`true_pitch` / `fold`):** `true_pitch` mantiene la F0 corregida hasta **Maximum F0 (Hz)** (`1000–2000`, defecto `1250`); `fold` mantiene las notas corregidas una octava abajo.
  - **Advanced (`Activation threshold` `800–1500` Hz defecto `1040`, `Sensitivity`, `Minimum note duration` `0–300` ms defecto `60`):** Ajusta cuándo se dispara la corrección de registro agudo.
  - **Preview original and corrected F0:** Dibuja los primeros 30 segundos de F0 estimada vs. corregida sin ejecutar la conversión completa. Una gráfica más limpia ayuda a diagnosticar saltos de octava, pero no garantiza automáticamente un mejor sonido.
- **Autotune y Autotune Strength (`0–1`, defecto `1.0`):** Ajusta los fotogramas F0 sonoros a la nota cromática temperada más cercana (`G1`–`C6`), escalado por **Autotune Strength**. Como atrae hacia *cada* semitono cromático (no existe selector de tonalidad o escala en Ilaria RVC), una fuerza alta puede aplanar el vibrato natural o los giros expresivos.
- **Proposed Pitch y Target Pitch (Hz) (`50–1200`, defecto `155`):** Calcula la mediana de los fotogramas F0 sonoros interpolados en todo el audio fuente y suma un desplazamiento automático en semitonos (`-12` a `+12`) hacia **Target Pitch (Hz)** sobre tu control **Pitch**. Útil como prueba rápida de transposición, aunque el tono matemáticamente centrado no siempre es el mejor ajuste musical o vocal. Tanto **Autotune** como **Proposed Pitch** requieren un modelo guiado por tono (`if_f0 == 1`).

---

## C. Corregir identidad vocal y timbre

- **Content Embedder vs. Voice Generator (`.pth`):** El generador `.pth` entrenado produce la voz objetivo, mientras que el content embedder (por defecto `Auto (model default)`, normalmente `contentvec`) extrae rasgos del habla desde la grabación fuente. El embedder está pensado para reducir la información de identidad del hablante fuente, aunque no es necesariamente por completo independiente del hablante, y no define la identidad de la voz objetivo. Usa el embedder esperado por el modelo para preservar compatibilidad y evitar artefactos de conversión. Los embedders HuBERT Base en chino, japonés, coreano y portugués requieren un modelo **RVC v2**.
- **Cómo funciona realmente `Index Ratio` (`0–1`, defecto `0`):** El generador `.pth` se usa **siempre** sin importar el Index Ratio. Cuando hay una base FAISS `added_*.index` cargada y `Index Ratio > 0`, RVC busca los 8 vectores de rasgos más cercanos en el índice y los mezcla con los rasgos extraídos de tu entrada *antes* del generador `.pth`:
  `features = retrieved_features * index_rate + original_features * (1 - index_rate)`
  - **`Index Ratio = 0`** desactiva la recuperación FAISS (`original_features` únicamente) mientras el generador `.pth` sigue activo, ofreciendo una línea base diagnóstica útil sin recuperación de rasgos FAISS.
  - **Índice seleccionado vs. Recuperación aplicada:** Seleccionar un archivo `.index` y poner `Index Ratio > 0` hace que **Output Log** muestre `Voice index setting: enabled`, pero si falta el archivo o falla `faiss.read_index()`, el backend continúa sin recuperación.
  - **Subir Index Ratio** acerca los rasgos a los vectores almacenados en el índice. Un índice compatible puede mejorar algunas conversiones, pero también puede empeorar resultados (por ejemplo dicción apagada o artefactos del dataset) según el audio y el modelo. Ningún valor garantiza mejor pronunciación.
- **Formant Shifting (`apply_formant_shift`, `0.7–1.4`, defecto `1.0`):** Usa Praat/Parselmouth (`Change gender`) **antes** de la síntesis RVC sobre la entrada a `16 kHz` para desplazar las resonancias del tracto vocal. `1.0` es neutro; valores por debajo de `1.0` buscan oscurecer/profundizar la resonancia vocálica y valores por encima de `1.0` buscan aclararla. El algoritmo busca preservar tono y duración, aunque pueden aparecer artefactos, sobre todo en valores extremos. **Formant Shifting** no equivale a cambiar **Pitch** ni a **Post-Process → Pitch Shift** (que cambia el tono de salida tras RVC).

---

## D. Corregir consonantes y respiraciones

- **Cómo funciona `Protect clear consonants and breathing sounds` (`0–0.5`, defecto `0.33`):**
  - En el pipeline de inferencia (`vc()`), cuando `protect < 0.5` **y** el modelo usa guía de tono (`if_f0 == 1`), RVC guarda una copia de los rasgos originales sin mezclar (`feats0`) *antes* de la recuperación FAISS.
  - Tras la recuperación, los fotogramas sordos / de F0 baja (`pitchf < 1`) se mezclan de vuelta hacia `feats0`: valores menores acercan esos fotogramas a `feats0`, mientras **`0.5` desactiva la protección**.
  - **Limitación crítica:** Como `Protect` mezcla hacia `feats0` (los rasgos previos a la recuperación), **cuando `Index Ratio = 0`, `feats` y `feats0` son idénticos**, así que cambiar `Protect` apenas produce diferencia. Además, `Protect` no es un reductor de ruido ni un filtro de restauración y no puede reparar consonantes ya clipeadas o distorsionadas en la fuente o el modelo.

---

## E. Corregir volumen, ruido y distorsión

- **Volume Envelope (`0=Input source volume, 1=Normalized Output`, defecto `0.25`):** Usa `change_rms()` para mezclar la envolvente de amplitud RMS del audio fuente (`1 - rate`) con la envolvente RMS de la salida RVC (`rate`).
  - `0` hace que el audio convertido siga de cerca la **envolvente RMS del audio fuente**.
  - `1` conserva la **envolvente RMS propia del generador RVC**.
  - Nota: Pese a la etiqueta de la interfaz, `1` **no** normaliza a un objetivo fijo de LUFS y **no** es un compresor ni limitador. Ajustar `Volume Envelope` cambia la adaptación dinámica de nivel, útil cuando pausas o saltos provocan bombeo.
- **Clean Audio y Clean Strength (`0–1`, defecto `0.5`):** Ejecuta `noisereduce` **después** de la conversión RVC sobre el audio convertido, con **Clean Strength** controlando la intensidad. Según la grabación y el ruido presente, una reducción demasiado agresiva puede alterar consonantes, respiraciones y detalles vocales; no existe un umbral universalmente correcto. `Clean Audio` es reducción de ruido post-proceso, no restauración de audio: no puede reparar clipping ni arreglar un modelo mal entrenado.
- **Post-Process Effects** *(aplicados tras la conversión mediante FFmpeg/librosa; déjalos OFF en pruebas base)*:
  - `Pitch Shift (-12..+12)`: Cambio de tono post-RVC con librosa (altera el audio ya generado en lugar del contorno F0 de RVC).
  - `Limiter (-24..0 dBFS, defecto -6)` y `Gain (-24..+24 dB)`: En la cadena actual de filtros FFmpeg (`ilaria_inference_effects.py`), **Limiter** se inserta **antes** de **Gain** cuando ambos están activos. Como `Gain` se aplica después de `Limiter`, un `Gain` positivo puede devolver los picos al clipping; `Limiter` no garantiza una salida final libre de clipping si le sigue un `Gain` positivo.
  - Efectos creativos/utilidad: `Reverb`, `Distortion`, `Chorus`, `Bitcrush`, `Clipping`, `Compressor`, `Delay`.
- **Resampling (`0–48000`, `0=none`) y Export Format:** Déjalo en `0` para mantener la frecuencia de muestreo nativa del modelo (`32k`/`40k`/`48k`). Pon `44100` o `48000` solo si tu DAW/proyecto exige esa frecuencia (el resampling cambia la tasa de muestreo, no la calidad intrínseca de síntesis). Usa `wav` o `flac` para exportaciones sin pérdida durante las pruebas.

---

## F. Grabaciones largas e Inferencia por lotes

- **Split Audio:** Llama a `silence_split_points()` para insertar cortes alineados a fotogramas en pausas silenciosas conservando los cortes normales de audio largo (`opt_ts`). Esto modifica el tamaño de los segmentos pasados a síntesis y puede cambiar el comportamiento en las uniones. **No** evita necesariamente cargar el audio completo en memoria, **no** elimina todas las causas de uso excesivo de memoria y **no** soluciona volumen, distorsión ni calidad vocal.
- **Single vs. Batch Inference:** Ambas pestañas exponen los mismos controles principales (`Pitch`, `Pitch Extraction`, `Index Ratio`, `Resampling`, `Volume Envelope`, `Protect`, `Export Format`, `Audio Processing`, `Embedder Settings` y `RMVPE High Register`). Usa **Single Inference** para afinar ajustes en un archivo con escucha inmediata; usa **Batch Inference** (`InferOutput/` o carpeta elegida) una vez verificados los ajustes para convertir varios archivos de una vez.

---

## Matriz Diagnóstica de Resolución de Problemas

| Síntoma | Causas posibles | Revisar primero | Ajuste a probar | Resultado esperado | Si no funciona |
| --- | --- | --- | --- | --- | --- |
| **Voz demasiado aguda / brillante** | **Pitch** demasiado alto, offset de **Proposed Pitch**, **Formant Ratio** alto o modelo entrenado en registro más agudo | Revisa **Pitch**, **Proposed Pitch** y **Formant Shifting** | Pon **Pitch** en `0` (o baja si hace falta) y apaga **Proposed Pitch** y **Formant Shifting** | F0 sigue a la fuente sin subida extra | Distingue altura F0 de resonancia: prueba un pequeño ajuste de **Formant Ratio** bajo `1.0` (ejemplo opcional: `0.9`) o revisa límites del modelo |
| **Voz demasiado grave / apagada** | **Pitch** demasiado bajo, **Formant Ratio < 1.0** o desajuste de modelo/índice | Revisa **Pitch**, **Formant Shifting** e **Index Ratio** | Pon **Pitch** en `0` (o sube si hace falta) y apaga **Formant Shifting** | Presencia media/alta más clara sin bajada | Prueba **Index Ratio = 0** para aislar la claridad del `.pth`, o un pequeño ajuste de **Formant Ratio** sobre `1.0` (ejemplo opcional: `1.1`) |
| **Timbre metálico / quebradizo** | **Index Ratio** excesivo o incompatible, **Clean Audio** o **Autotune** | Revisa **Audio Processing** activos y **Output Log** | Pon **Index Ratio = 0**, desactiva **Clean Audio** y **Autotune** | Aísla el timbre base del `.pth` | Prueba otro extractor F0 (`fcpe`, `swift`, `beatrice` o `crepe`) |
| **Identidad de voz objetivo débil** | Modelo `.pth` incorrecto, incompatibilidad de embedder, índice ausente/incompatible, límites de fuente o entrenamiento | Verifica **Voice Model**, **Embedder Model**, calidad fuente y estado de índice en consola/log | Confirma el `.pth` correcto y su `added_*.index` (prueba `Index Ratio > 0` si es compatible) | Timbre objetivo más definido si modelo e índice coinciden | Revisa `Model information` para compatibilidad de embedder y prueba con una toma seca más limpia |
| **Demasiado parecida al hablante fuente** | Incompatibilidad modelo/embedder, fuga de identidad en fuente/embedder o gran brecha de rango tonal | Compara la grabación fuente con el embedder esperado y rango del modelo | Pon **Embedder Model** en `Auto (model default)` y prueba un `added_*.index` compatible si existe | Mayor separación respecto al hablante fuente | Ajusta **Pitch** solo si hace falta para la interpretación objetivo o prueba otro modelo |
| **Consonantes trabadas / arruinadas** | **Index Ratio** excesivo o incompatible, **Protect** apagado (`0.5`) o dicción fuente poco clara | Revisa **Index Ratio** y **Protect** (`0.5` = apagado; defecto `0.33`) | Baja **Index Ratio** (o prueba `0`) y pon **Protect** por debajo de `0.5` al usar índice en modelo con F0 | Conserva mejor los rasgos sordos fuente (`feats0`) al mezclar con índice | Revisa la dicción del audio fuente seco; `Protect` no repara consonantes ya trabadas o clipeadas |
| **Sibilantes ásperas (`s`/`ch`)** | Micrófono fuente brillante, **Formant Ratio** alto o distorsión en **Post-Process** | Escucha el audio fuente seco en Audio Analyzer | Apaga **Formant Shifting** y **Post-Process**; prueba **Index Ratio = 0** | Transientes `s`/`ch` más suaves | Aplica de-essing a la grabación fuente seca antes de RVC |
| **Respiraciones distorsionadas o ausentes** | Puerta/ruido en la fuente, límites del modelo, **Volume Envelope** o **Clean Audio** tras conversión | Compara las respiraciones fuente con el audio convertido | Apaga **Clean Audio** y prueba **Volume Envelope** (ej. `0` vs `0.25` defecto) | Las respiraciones siguen mejor la dinámica fuente | Baja **Index Ratio** (o pon `0`) si la recuperación arrastra fotogramas ruidosos |
| **Saltos de octava en notas sostenidas** | El detector F0 confunde armónicos o notas muy agudas | Revisa forma de onda/tono en **Audio Analyzer** | Alterna **RMVPE** / **FCPE** / **Swift** / **CREPE**, o prueba **RMVPE High Register** | Seguimiento F0 más estable en notas largas | Revisa la pista fuente por filtraciones de instrumentos o armonías |
| **Vibrato antinatural / giros planos** | **Autotune** activo en canto expresivo | Revisa **Audio Processing → Autotune** | Apaga **Autotune** o baja **Autotune Strength** (ejemplo opcional: `0.3`) | Vuelven el vibrato natural y los giros | Compara la suavidad F0 de **RMVPE** vs **CREPE** |
| **Tono inestable / tembloroso** | Fuente con ruido/eco o seguimiento con `parselmouth`/`harvest` | Escucha la pista vocal fuente aislada | Separa/reduce ruido y eco antes de RVC y usa **RMVPE** | Contorno F0 más estable | Sube `filter_radius` (`>= 3`) si usas específicamente `harvest` |
| **Voz robótica / tipo vocoder** | **Embedder** incorrecto, desajuste `v1`/`v2` (que también puede provocar error y detener la conversión) o fallos graves de F0 | Revisa **Output Log** y consola por avisos de embedder/F0 | Pon **Embedder Model** en `Auto (model default)` y verifica **RMVPE** | Síntesis vocal natural | Prueba con una grabación fuente seca más limpia |
| **Siseo de fondo / artefactos de denoising** | **Clean Audio** demasiado fuerte o grabación fuente ruidosa | Compara con **Clean Audio** OFF | Apaga **Clean Audio** o reduce **Clean Strength** | Menos artefactos acuosos | Aplica denoising/dereverberation dedicado *antes* de RVC |
| **Clipping / distorsión áspera** | Clipping ya en el audio fuente, en inferencia, **Gain** positivo (incluso tras **Limiter**), FX **Distortion/Clipping** o en exportación | Comprueba dónde aparece primero la distorsión (fuente vs. salida en **Audio Analyzer**) | Apaga **Post-Process** (especialmente **Gain** positivo tras **Limiter**) | Detiene el clipping post-RVC | Bajar el volumen de un audio ya clipeado **no** reconstruye muestras perdidas; regraba o usa una fuente sin clipping |
| **Volumen irregular / bombeo** | **Volume Envelope** desajustado respecto a la dinámica fuente | Compara **Volume Envelope** `0` vs `0.25` (defecto) vs `1.0` | Ajusta **Volume Envelope** hacia `0` (RMS fuente) o `1.0` (RMS modelo) | Nivel más estable entre frases | Aplica **Compressor** / **Limiter** suaves (sin **Gain** positivo después) solo si hace falta |
| **Errores de resampling / exportación / lotes** | Tasa `Resampling` inválida, falta FFmpeg (para `mp3`/`ogg`/`m4a`) o ruta inválida | Lee el mensaje exacto en **Output Log** y consola | Pon `Resampling = 0`, exporta `wav` o `flac`, usa rutas ASCII simples | Exportación lossless limpia | Ejecuta `RUN_ILARIA_RVC_LOGS.bat` para ver el traceback completo |

## Guías relacionadas

- [Inferencia individual y por lotes](../ilaria-rvc/convert/inference.md) · [Controles de inferencia](../ilaria-rvc/convert/inference-buttons.md) · [Inferencia avanzada](../ilaria-rvc/convert/advanced-inference.md)
- [Archivos index (.index)](../start/indexes.md) · [Pitch extractors](../start/pitch-extractors.md) · [Embedders](../start/embedders.md) · [Audio Analyzer](../ilaria-rvc/manage/audio-analyzer.md)
