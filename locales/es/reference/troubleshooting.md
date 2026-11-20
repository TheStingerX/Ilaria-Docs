---
label: "🩺 Solución de problemas"
order: 95
permalink: /troubleshooting/
---
# Solución de problemas de RVC

[Descargar Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

!!!tip
¿Nuevo en RVC? **Empieza siempre con un WAV de 10 segundos y un solo modelo.** Si la app falla, abre el registro y copia el **primer** error. Si funciona pero suena mal, vuelve a probar el mismo clip cambiando solo un ajuste cada vez.
!!!

Un buen diagnóstico empieza en la primera etapa que falla. Guarda la versión de la app, el primer error exacto y una prueba reproducible.

## Encuentra tu síntoma

| Síntoma | Primera comprobación |
| --- | --- |
| El lanzador se cierra o el navegador muestra error de conexión | Deja la consola abierta y comprueba la dirección local impresa. |
| Falta el modelo, no carga o faltan claves | Confirma que sea un archivo de inferencia exportado y revisa versión RVC y embedder. |
| El convertidor no lee el archivo | Prueba un WAV PCM corto en una ruta local simple. |
| La conversión funciona solo sin index | Comprueba que el index pertenezca exactamente a ese modelo y embedder. |
| Voz metálica, confusa o demasiado parecida a la tuya | Compara varios clips limpios y un modelo fiable con efectos y retrieval en 0. |
| El entrenamiento se detiene o no genera un export válido | Identifica la etapa fallida y revisa el registro y la carpeta del experimento. |
| Falla CUDA o se agota la memoria | Distingue entre GPU no compatible, VRAM llena y RAM / archivo de paginación agotados. |
| Micrófono con retardo, cortes, silencio o eco | Prueba por separado micrófono físico, monitoreo en auriculares, cable virtual y app final. |

## Establece una base de referencia

1. Graba 10-20 segundos de un solo hablante con vocales claras, consonantes como `s` o `f` y una pausa natural en un WAV local limpio.
2. Elige un modelo de inferencia fiable compatible con la app. Empieza con pitch en `0`, detector de tono por defecto, efectos desactivados y retrieval (`index`) en `0`.
3. Convierte y guarda en una carpeta local con permisos de escritura. Reproduce el archivo fuera del navegador.
4. Repite con un segundo modelo que sepas que funciona para distinguir entre fallo del entorno o del modelo.
5. Reactiva una opción cada vez y anota los ajustes usados.

---

## Errores conocidos y soluciones exactas

### 1. Errores de Windows, rutas, Python y lanzadores

| Error / Mensaje | Causa | Cómo solucionarlo |
| --- | --- | --- |
| `[WinError 3] The system cannot find the path specified` / `[WinError 206] The filename or extension is too long` | Límite de 260 caracteres en Windows, o espacios y símbolos especiales en carpetas o archivos. | Mueve la app y los datasets a una ruta corta en la raíz (ej. `C:\RVC` o `D:\IlariaRVC`). Quita espacios, `()`, `[]` y caracteres no ASCII/Unicode. |
| `[WinError 2] The system cannot find the file specified` (al cargar/exportar audio) | Falta `ffmpeg.exe` / `ffprobe.exe`, o FFmpeg no está en el `PATH`. | Comprueba que `ffmpeg` esté en la carpeta de la app. En instalaciones desde código fuente, instala FFmpeg, añádelo al `PATH` y reinicia la terminal. |
| `PermissionError: [Errno 13] Permission denied` / `[WinError 5]` | Escritura en `Program Files`, `OneDrive`, carpeta protegida o archivo bloqueado por otra app/antivirus. | Extrae la app en una carpeta propia con permisos de escritura (no `Program Files` ni `OneDrive`), cierra reproductores y añade exclusión en el antivirus. |
| `ModuleNotFoundError: No module named 'fairseq'` | `fairseq` falla al compilar en Python 3.11+ o sin herramientas C++. | Usa el paquete portátil incluido, o recrea el entorno con **Python 3.9 o 3.10** e instala **Microsoft Visual Studio Build Tools** (*Desarrollo para el escritorio con C++*). |
| `llvmlite.dll` / `OSError: [WinError 126]` / falta una DLL | Falta Microsoft Visual C++ Redistributable o la DLL está dañada. | Instala o repara **Microsoft Visual C++ 2015-2022 Redistributable (x64)**. Si falta la DLL, vuelve a extraer el paquete original. |
| `Expecting value: line 1 column 1` / página de Gradio en blanco | El servidor falló antes de responder, o un proxy/VPN intercepta `127.0.0.1`. | Deja la consola abierta y lee el primer traceback de Python. Revisa el puerto exacto (`127.0.0.1:6969` en Ilaria RVC, `7865` en Gradio/Deiteris) y excluye `localhost` / `127.0.0.1` del proxy. |
| `urllib.error` / `ConnectionResetError` / `SSLError` | Bloqueo de red, VPN o timeout desde Hugging Face/GitHub al bajar `hubert_base.pt` o `rmvpe.pt`. | Desactiva temporalmente VPN o cortafuegos estrictos, o descarga manualmente `hubert_base.pt` y `rmvpe.pt` en `assets/hubert/` y `assets/rmvpe/`. |

### 2. Errores de GPU, CUDA, DirectML y Memoria

| Error / Mensaje | Causa | Cómo solucionarlo |
| --- | --- | --- |
| **La VRAM se desborda a la RAM / entrenamiento lento / voz en vivo robótica (Windows 10/11)** | La **Programación de GPU acelerada por hardware (HAGS)** interfiere con la asignación de VRAM de PyTorch y quita recursos al cambiador de voz. | Ve a **Configuración de Windows → Sistema → Pantalla → Gráficos → Configuración avanzada de gráficos**, desactiva **Programación de GPU acelerada por hardware** y **reinicia el PC**. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (Inferencia) | Archivo de audio demasiado largo o apps competidoras (juegos, navegador con aceleración por hardware) usando VRAM. | Activa **Split Audio** para pistas largas, cierra juegos/navegadores pesados, descarga modelos no usados y desactiva el postprocesado opcional. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (Entrenamiento) | Batch size demasiado alto para tu VRAM o caché del dataset en VRAM activada. | Baja **Batch Size** (ej. de `8` a `4`, `2` o `1`), desactiva la caché del dataset en VRAM y cierra cualquier cambiador en vivo antes de entrenar. |
| `RuntimeError: CUDA error: an illegal memory access was encountered` | Incompatibilidad driver/PyTorch, overclock/undervolt inestable de GPU o memoria compartida agotada. | Actualiza los drivers de NVIDIA, quita el overclock/undervolt y verifica que la build CUDA de PyTorch coincida con tu driver. |
| `Torch not compiled with CUDA enabled` / `no kernel image is available for execution on the device` | Compilación incorrecta para tu generación de GPU (ej. CUDA antiguo en RTX 50, o PyTorch solo CPU). | Ajusta el runtime a tu GPU: Ilaria RVC incluye **CUDA 12.8** para GTX 16 / RTX 20-50 y descarga **CUDA 12.6** (`runtime-cu126`) para Maxwell/Pascal/Volta. AMD/Intel requieren DirectML/ROCm o GPU en la nube. |
| `RuntimeError: expected scalar type Half but found Float` (o error `HalfTensor`) | Precisión `FP16` forzada en una GPU o backend incompatible (serie GTX 10, DirectML, CPU). | Desactiva **FP16** en los ajustes y cambia a **FP32** (precisión completa). |
| `OSError: [WinError 1455] The paging file is too small for this operation to complete` | Memoria virtual de Windows (archivo de paginación) agotada al cargar modelos, crear el index o entrenar. | Abre **Propiedades del sistema → Opciones avanzadas → Rendimiento (Configuración) → Opciones avanzadas → Memoria virtual**, amplía el archivo de paginación (ej. `16384–32768 MB`) y reinicia. |

### 3. Carga de modelos, Checkpoints, Embedders e Index

| Error / Mensaje | Causa | Cómo solucionarlo |
| --- | --- | --- |
| `UnpicklingError` / `Weights only load failed` (`fairseq.data.dictionary.Dictionary`) | PyTorch 2.6+ usa `weights_only=True` por defecto en `torch.load`, bloqueando objetos fairseq antiguos. | Actualiza a la última versión de la app (ej. Ilaria RVC 2.4.0+ o último Applio), que gestiona `safe_globals` para `Dictionary`. |
| `EOFError` / `RuntimeError: invalid load key` / `File is not a zip archive` | Descarga del `.pth` interrumpida/corrupta, o el navegador guardó una página HTML en lugar del binario. | Revisa el tamaño del archivo (un `.pth` válido pesa 40-100+ MB, no unos pocos KB). Borra el archivo roto y vuelve a descargarlo. |
| `Missing key(s) in state_dict` / `RuntimeError: Sizes of tensors must match` | Cargaste un checkpoint de entrenamiento (`G_*.pth` o `D_*.pth` de `logs/`) en vez de un export de inferencia, o mezclaste `v1` (256-d) y `v2` (768-d). | Usa la función **Export** para crear un `.pth` de inferencia (no copies `G_*.pth` crudos a `models/`) y verifica versión RVC y sample rate. |
| Pronunciación dañada o tu voz original se filtra mucho | **Embedder distinto** entre entrenamiento e inferencia, o uso de un HuBERT genérico en lugar de `contentvec`. | Usa exactamente el mismo embedder del entrenamiento (casi siempre **`contentvec`**). Prueba primero con retrieval en `0`. |
| Error de index / dimensiones incompatibles / caída de RAM al crear index | Uso de `trained_*.index` en lugar de `added_*.index`, index de otro modelo/embedder, o demasiadas features para la RAM. | Elige siempre `added_*.index` (o pon retrieval en `0` para probar sin index). Nunca mezcles índices entre modelos distintos. |

### 4. Preprocesamiento, Extracción de features y Entrenamiento

| Error / Mensaje | Causa | Cómo solucionarlo |
| --- | --- | --- |
| `ValueError: zero-size array to reduction operation` / tensor de tamaño cero | Carpeta de dataset vacía, clip totalmente silencioso, clip menor de 1 segundo, o espacios/Unicode en la ruta. | Usa una ruta simple sin espacios, quita clips mudos o dañados, asegúrate de usar WAV válidos y repite el preprocesamiento en un nuevo experimento. |
| `BrokenProcessPool` / mueren los procesos de preprocesamiento | Demasiados hilos CPU en paralelo agotan la RAM del sistema. | Reduce el número de hilos/workers CPU en preprocesamiento y asegúrate de tener espacio libre en disco. |
| `NaN loss` o modelo exportado mudo | Audio corrupto o saturado (clipping) en el dataset, par pretrain `G`/`D` incompatible, o desbordamiento en `FP16`. | Revisa que los clips no estén saturados/mudos, verifica que el pretrain `G/D` coincida en sample rate y vocoder (o usa stock RVC) y prueba en `FP32`. |
| Reanudar entrenamiento falla o empieza desde la época 0 | `Fresh Training` activado por error, o `G_*.pth` / `D_*.pth` / `config.json` movidos o renombrados. | Conserva intacta la carpeta `logs/<experimento>/`, usa el mismo nombre, sample rate y embedder, fija un total de épocas mayor y deja `Fresh Training` **desactivado**. |

### 5. Cambiador de voz en vivo, PortAudio y Enrutamiento

| Error / Mensaje | Causa | Cómo solucionarlo |
| --- | --- | --- |
| `PortAudioError` / `Invalid sample rate` / dispositivo no disponible | Los dispositivos de audio de Windows tienen distintas frecuencias de muestreo o otra app usa modo exclusivo. | En el **Panel de sonido de Windows**, pon micrófono físico, auriculares y `VB-CABLE` en **48000 Hz**, desactiva el **modo exclusivo** y reinicia tras instalar cables virtuales. |
| Cortes robóticos, chasquidos o latencia alta | El tiempo de inferencia GPU supera la duración del Chunk, HAGS está activo, o juegos/apps pesadas saturan la GPU. | Aumenta **Chunk Size**, usa **RMVPE** o **FCPE** en lugar de Crepe pesado, desactiva **HAGS** en Windows y cierra apps GPU en segundo plano. |
| Eco o doble voz en auriculares | Altavoces encendidos en lugar de auriculares, o doble monitoreo ("Escuchar este dispositivo" en Windows + monitor de la app). | Usa siempre **auriculares** y activa el monitoreo en **un solo lugar**. |
| Respiraciones o finales suaves cortados en Discord | La **supresión de ruido (Krisp)** o la **sensibilidad automática** de Discord los filtran, o el umbral VAD/Noise Gate es muy alto. | Desactiva Krisp y sensibilidad automática en Discord para el micrófono virtual y baja los umbrales de VAD / Noise Gate en la app. |

---

## Comprobaciones por aplicación

- **Ilaria RVC:** Extrae el paquete completo, abre su carpeta y ejecuta `RUN_ILARIA_RVC_LOGS.bat`. Mira la primera excepción encima del último mensaje de cierre. Confirma que Windows detecta la GPU NVIDIA y que `127.0.0.1:6969` no esté bloqueada ni ocupada.
- **Applio Desktop:** Abre **Setup** y revisa el estado del motor; usa **Install / Repair** si falla una comprobación. En **Gradio**, mantén abierta la consola y entra a la dirección `localhost` exacta que imprime.
- **RVC WebUI (Mainline) / w-okada / Deiteris / TGR:** Elige la compilación CUDA o DirectML acorde a tu GPU. Para archivos divididos `.zip.001`, reúne todas las partes en la misma carpeta antes de extraer.

## Reportar un problema

Al pedir ayuda (por ejemplo en la [página de contacto](https://ilariarvc.shop/en/contact/) para Ilaria RVC), incluye:
1. Nombre de la app, edición y versión (ej. `Ilaria RVC 2.4.0`).
2. Sistema operativo, modelo exacto de GPU y backend (`CUDA` / `DirectML` / `CPU`).
3. La **primera línea de error** y las líneas cercanas del log (sin rutas privadas ni datos sensibles).
4. Para entrenamiento: etapa fallida, sample rate, vocoder, embedder y si era ejecución nueva o reanudación. Para en vivo: cadena completa de dispositivos (`Mic → App → Cable virtual → App destino`).
