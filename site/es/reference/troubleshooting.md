# Solución de problemas de RVC

[Descargar Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

!!!tip
**¿Eres nuevo en RVC? Sigue estas 4 reglas antes que nada:**
1. **Usa una carpeta corta y sencilla** como `C:\RVC` o `D:\IlariaRVC`. Nunca pongas la aplicación dentro de `OneDrive`, `Program Files` ni carpetas con espacios, tildes o emojis.
2. **Extrae siempre el ZIP completo** antes de abrir nada. Nunca ejecutes archivos `.bat` desde dentro de WinRAR, 7-Zip o la vista previa ZIP de Windows.
3. **Nunca cierres la ventana negra de la consola.** Esa ventana ejecuta la aplicación e imprime el error real si algo falla.
4. **Haz primero una prueba con un archivo `.wav` limpio de 10 segundos.** Si la app se cierra, copia el **primer** error de la consola. Si funciona pero suena mal, cambia **un ajuste cada vez** sobre el mismo audio de prueba.
!!!

## Encuentra tu problema rápidamente

| ¿Qué está pasando? | Causa más probable | Dónde mirar |
| --- | --- | --- |
| La ventana negra se abre y se cierra en 1 segundo | Ejecutado dentro del ZIP, bloqueado por el antivirus o falta un runtime | [1. Inicio, Windows, Antivirus y Descargas](#1-inicio-windows-antivirus-y-descargas) |
| El navegador dice "No se puede acceder" o página en blanco | La app falló al iniciar, puerto incorrecto o VPN/proxy en `127.0.0.1` | [1. Inicio, Windows, Antivirus y Descargas](#1-inicio-windows-antivirus-y-descargas) |
| La app va muy lenta o dice `CUDA out of memory` | Usa CPU en lugar de GPU, HAGS de Windows activado o batch/audio muy grande | [2. GPU, CUDA, AMD/Intel y Memoria](#2-gpu-cuda-amdintel-y-memoria) |
| El modelo no aparece o falla al cargar (`.pth` / `.index`) | Faltó pulsar Refresh, ZIP sin extraer, descarga rota o archivo incorrecto | [3. Modelos, Checkpoints e Índices](#3-modelos-checkpoints-e-índices) |
| La voz suena como ardilla, monstruo, robot o tu voz original | Pitch (Transpose) incorrecto, audio sucio o Pitch Extractor inadecuado | [4. Calidad de voz, Pitch y Archivos de audio](#4-calidad-de-voz-pitch-y-archivos-de-audio) |
| El entrenamiento se detiene, falla o exporta una voz muda | Clip vacío o silencioso en el dataset, demasiados workers CPU o `Fresh Training` activado | [5. Preprocesamiento de Dataset y Entrenamiento](#5-preprocesamiento-de-dataset-y-entrenamiento) |
| El micrófono tiene retraso, cortes, eco o Discord no te oye | Frecuencias distintas (`44100` vs `48000 Hz`), cable virtual incorrecto o Krisp | [6. Cambiador de voz en vivo, Micrófono y Discord](#6-cambiador-de-voz-en-vivo-micrófono-y-discord) |
| Google Colab o Kaggle falla o se desconecta | Acelerador GPU apagado, cuota agotada o sesión expirada | [7. Notebooks en la nube (Colab y Kaggle)](#7-notebooks-en-la-nube-colab-y-kaggle) |

## Prueba base sencilla en 5 pasos

Si todo suena mal o no sabes qué ajuste estropeó el audio, vuelve a una prueba limpia:

1. **Prepara un clip limpio:** Graba de 10 a 20 segundos de una sola voz hablando claro en una habitación silenciosa (sin música ni eco). Guárdalo como `.wav` estándar en una carpeta simple como `C:\RVC\test.wav`.
2. **Elige un modelo fiable:** Selecciona un modelo `.pth` que sepas que funciona. Deja el archivo `.index` apagado (`Index Rate = 0`) en la primera prueba.
3. **Usa ajustes seguros:**
   - **Pitch / Transpose:** `0` (mismo género), `+12` (hombre a mujer), `-12` (mujer a hombre).
   - **Pitch Extractor:** `rmvpe` (mejor equilibrio entre velocidad y calidad).
   - **Efectos / limpieza opcional:** Todos **DESACTIVADOS**.
4. **Convierte y escucha:** Guarda el resultado en una carpeta local normal (no `OneDrive`). Si el reproductor del navegador queda en silencio, descarga el archivo y ábrelo en VLC o Reproductor de Windows.
5. **Cambia una cosa cada vez:** Cuando la prueba limpia funcione, activa el archivo `.index` (empieza en `0.5` - `0.75`) o ajusta el Pitch en `1` o `2` semitonos.

---

## Errores conocidos y soluciones paso a paso

### 1. Inicio, Windows, Antivirus y Descargas

| Problema o Error | Qué significa (en palabras simples) | Cómo solucionarlo |
| --- | --- | --- |
| **La ventana negra se abre y se cierra al instante** | Ejecutaste el lanzador dentro de una vista previa ZIP o Python falló nada más empezar. | 1. Haz clic derecho en el `.zip` y extrae toda la carpeta primero.<br>2. En Ilaria RVC, ejecuta `RUN_ILARIA_RVC_LOGS.bat` en lugar del lanzador normal para que la ventana quede abierta y muestre el error. |
| **Antivirus / Windows Defender borra archivos `.bat`, `.exe` o `.dll`** | El antivirus marca por error los scripts portátiles de IA como sospechosos. | Abre **Seguridad de Windows → Protección contra virus y amenazas → Historial de protección**, restaura el archivo bloqueado y añade tu carpeta RVC (ej. `C:\RVC`) a **Exclusiones**. |
| `WinError 10048` / `Address already in use` / puerto ocupado | Otra copia de RVC u otra aplicación ya está usando ese puerto (`6969` o `7865`). | Cierra todas las ventanas negras abiertas (o finaliza `python.exe` en el **Administrador de tareas**) y abre la app una sola vez. |
| `[WinError 3]` / `[WinError 206]` (ruta o nombre demasiado largo) | Windows falla si la ruta supera 260 caracteres o contiene espacios, tildes o símbolos (`()`, `[]`). | Mueve la app y los audios a una ruta corta como `C:\RVC\`. Renombra carpetas y archivos `.wav` usando solo letras, números y `_`. |
| `[WinError 2]` (al cargar o exportar audio) | Falta `ffmpeg.exe` o `ffprobe.exe` (la herramienta que lee archivos de audio). | Verifica que `ffmpeg.exe` esté dentro de la carpeta de la app (si Defender lo borró, reextrae el ZIP). En instalaciones manuales, instala FFmpeg, añádelo al `PATH` de Windows y reinicia la terminal. |
| `PermissionError: [Errno 13]` / `[WinError 5] Acceso denegado` | Windows bloquea la escritura en `Program Files`, `OneDrive` o en un archivo abierto en otro programa. | Saca la app de `Program Files` y `OneDrive` hacia `C:\RVC\`. Cierra cualquier reproductor o editor que tenga abierto el archivo de audio. |
| `Expecting value: line 1 column 1` o página en blanco | La app falló antes de cargar, abriste otro puerto o una VPN/proxy bloquea las conexiones locales. | Lee el **primer** error en la ventana negra. Comprueba la dirección exacta impresa allí (`127.0.0.1:6969` en Ilaria RVC, `127.0.0.1:7865` en Gradio/Deiteris). Desactiva la VPN/proxy para `localhost` y `127.0.0.1`. |
| Falla al extraer archivo dividido (`.zip.001`, `.zip.002`) | El extractor de Windows no abre archivos multiparte o falta una parte. | Pon todas las partes (`.001`, `.002`, etc.) en la misma carpeta, instala **7-Zip**, haz clic derecho **solo** en `.001` y elige **7-Zip → Extraer aquí**. |
| `ModuleNotFoundError: No module named 'fairseq'` | Instalaste manualmente en Python 3.11+ o sin herramientas de compilación C++. | Los principiantes deben usar el paquete ZIP portátil. Para instalación manual, usa **Python 3.9 o 3.10** e instala **Microsoft Visual Studio Build Tools** (*Desarrollo de escritorio con C++*). |
| `llvmlite.dll` / `OSError: [WinError 126]` / falta `.dll` | A Windows le faltan las librerías Visual C++ que necesitan los paquetes de IA en Python. | Descarga e instala **Microsoft Visual C++ 2015-2022 Redistributable (x64)** desde Microsoft y reinicia el PC. |
| `urllib.error` / `ConnectionResetError` / `SSLError` | Tu red, firewall o VPN bloqueó la descarga automática de `hubert_base.pt` o `rmvpe.pt`. | Desactiva temporalmente la VPN o reglas estrictas del firewall, o descarga manualmente `hubert_base.pt` y `rmvpe.pt` y colócalos en `assets/hubert/` y `assets/rmvpe/`. |

### 2. GPU, CUDA, AMD/Intel y Memoria

| Problema o Error | Qué significa (en palabras simples) | Cómo solucionarlo |
| --- | --- | --- |
| **Todo va lentísimo (usa CPU en lugar de GPU)** | La app no detecta tu tarjeta gráfica o bajaste una versión solo NVIDIA para una GPU AMD/Intel. | 1. Usuarios NVIDIA: comprueba que los drivers estén instalados y no estés forzando gráficos integrados.<br>2. Usuarios AMD/Intel: las versiones CUDA no usan tu GPU. Usa una versión **DirectML** (como YuneVoix, Deiteris DirectML o Mainline DirectML) o un notebook en la nube. |
| **El PC va a tirones, la VRAM se desborda a la RAM o la voz en vivo suena robótica** | Un ajuste de Windows llamado **HAGS** (Programación de GPU acelerada por hardware) quita estabilidad de VRAM a las apps de IA. | Abre **Configuración de Windows → Sistema → Pantalla → Gráficos → Configuración avanzada de gráficos**, pon **Programación de GPU acelerada por hardware** en **DESACTIVADO** y **reinicia el PC**. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (al convertir) | La tarjeta gráfica se quedó sin memoria de vídeo por un audio muy largo o por un juego/navegador abierto. | Activa **Split Audio** para pistas largas, cierra juegos y pestañas pesadas (o desactiva la aceleración por hardware del navegador) y apaga efectos extra. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (al entrenar) | El **Batch Size** es demasiado grande para la memoria de tu GPU. | Baja el **Batch Size** poco a poco (de `8` a `4`, `2` o `1`). Desactiva "Cache dataset in GPU/VRAM" y cierra cualquier cambiador de voz en vivo antes de entrenar. |
| `Torch not compiled with CUDA enabled` / `no kernel image is available` | La versión de CUDA de la app no coincide con la generación de tu tarjeta NVIDIA (ej. RTX 50 nueva vs GTX 10 antigua). | Usa la versión adecuada: **Ilaria RVC** incluye **CUDA 12.8** para GTX 16 / RTX 20-50 y descarga automáticamente **CUDA 12.6** (`runtime-cu126`) para Maxwell/Pascal/Volta. |
| `CUDA driver version is insufficient for CUDA runtime version` | Tu driver NVIDIA es demasiado antiguo para el motor de IA. | Actualiza el driver gráfico desde **NVIDIA App / GeForce Experience** o la web oficial de NVIDIA y reinicia. |
| `RuntimeError: CUDA error: an illegal memory access was encountered` | La GPU falló por overclock/undervolt inestable, temperatura o desajuste de drivers. | Quita cualquier overclock o undervolt en MSI Afterburner, actualiza el driver NVIDIA y vuelve a intentarlo. |
| `RuntimeError: expected scalar type Half but found Float` / `HalfTensor` | El modo rápido `FP16` está activado, pero tu GPU (serie GTX 10, DirectML o CPU) no lo soporta. | Ve a Ajustes y desactiva **FP16** (cambia a **FP32**). |
| `OSError: [WinError 1455]` (archivo de paginación demasiado pequeño) | Windows se quedó sin Memoria Virtual en el disco al cargar modelos o crear el índice. | Busca **Ver configuración avanzada del sistema → Configuración de rendimiento → Opciones avanzadas → Memoria virtual → Cambiar**, desmarca la gestión automática, pon un tamaño personalizado (ej. Inicial `16384` MB, Máximo `32768` MB), pulsa **Establecer** y **reinicia el PC**. |

### 3. Modelos, Checkpoints e Índices

| Problema o Error | Qué significa (en palabras simples) | Cómo solucionarlo |
| --- | --- | --- |
| **Puse el modelo en la carpeta, ¿por qué no aparece?** | Faltó pulsar Refresh, lo dejaste dentro de un `.zip` o lo pusiste en otra carpeta. | 1. Extrae el `.zip` hasta ver directamente `.pth` y `.index`.<br>2. Pon `.pth` en `assets/weights/` (o `weights/`) y `.index` en `logs/`.<br>3. Pulsa el botón **Refresh** junto al selector de modelos. |
| `UnpicklingError` / `Weights only load failed` (`fairseq.data.dictionary.Dictionary`) | PyTorch 2.6+ bloquea por seguridad formatos antiguos de modelos RVC. | Actualiza a la última versión de tu app (por ejemplo **Ilaria RVC 2.4.0+** o el último **Applio**), que ya incluye el cargador seguro. |
| `EOFError` / `RuntimeError: invalid load key` / `File is not a zip archive` | La descarga del modelo se cortó, está corrupta o guardó una página web en vez del archivo. | Mira el tamaño del archivo: un `.pth` real pesa entre **40 y 100+ MB**. Si pesa pocos KB o 0 KB, bórralo y descárgalo de nuevo. |
| `Missing key(s) in state_dict` / `Sizes of tensors must match` | Cargaste un checkpoint crudo (`G_*.pth` o `D_*.pth`) en vez del modelo final exportado, o mezclaste `v1` y `v2`. | Nunca copies archivos `G_*.pth` desde `logs/` a `weights/`. Usa el botón **Export** de la app para crear el `.pth` final y verifica que coincidan `v1` / `v2` y el sample rate. |
| **Error de índice / dimensiones / caída de RAM al crear índice** | Elegiste `trained_*.index` en lugar de `added_*.index`, usaste un índice de otra voz o el dataset es enorme. | Elige siempre **`added_*.index`** (nunca `trained_*.index`). Si sigue fallando, pon **Index Rate** en `0` para probar sin índice. No mezcles archivos `.index` entre modelos distintos. |

### 4. Calidad de voz, Pitch y Archivos de audio

| Problema o Error | Qué significa (en palabras simples) | Cómo solucionarlo |
| --- | --- | --- |
| **La voz suena como una ardilla o un monstruo grave** | El ajuste **Pitch (Transpose)** no corresponde a la diferencia entre tu voz y la voz objetivo. | Usa `0` para el mismo género, `+12` de voz masculina a femenina y `-12` de femenina a masculina. Ajusta luego de `1` en `1`. |
| **La voz suena metálica, acuosa, robótica o distorsionada** | El audio de entrada tiene música o eco, el Pitch Extractor no es el adecuado o el Embedder no coincide. | 1. Limpia primero el audio con **UVR5** o **MVSep** para quitar música y reverberación.<br>2. Usa **`rmvpe`** como Pitch Extractor.<br>3. Usa el mismo Embedder del entrenamiento (casi siempre **`contentvec`**).<br>4. Baja **Index Rate** de `1.0` a `0.5` o `0.3`. |
| **El resultado se parece demasiado a mi propia voz** | El **Index Rate** es muy bajo o el **Pitch** sigue en tu rango natural en lugar del rango del modelo. | Acerca el Pitch al de la voz objetivo (`+12` / `-12`), sube un poco **Index Rate** (`0.6` - `0.75`) o prueba un modelo más limpio. |
| **El conversor no abre mi archivo de audio** | El formato no es compatible (`.m4a`, `.opus`, `.mp3` dañado) o tiene caracteres especiales en el nombre. | Convierte el archivo a **`.wav` PCM estándar** (44100 Hz o 48000 Hz) y renómbralo de forma simple como `input.wav`. |

### 5. Preprocesamiento de Dataset y Entrenamiento

| Problema o Error | Qué significa (incluido zero-size / NaN) | Cómo solucionarlo |
| --- | --- | --- |
| `ValueError: zero-size array` / tensor vacío | La carpeta del dataset está vacía, tiene clips en silencio total, menores de 1 segundo o rutas con espacios/tildes. | Asegúrate de tener archivos `.wav` no vacíos (de 2 a 10 segundos cada uno), borra clips mudos o dañados, usa una ruta simple sin espacios y crea un experimento nuevo. |
| `BrokenProcessPool` / el PC se congela en Preprocesamiento | Demasiados hilos de CPU procesando a la vez agotan la memoria RAM. | Reduce los **hilos / workers de CPU** en Preprocesamiento (ej. de `8` a `2` o `4`) y verifica que haya espacio libre en el disco. |
| `NaN loss` o el modelo exportado sale en silencio total | Un clip dañado o saturado en el dataset rompió el cálculo, `FP16` desbordó o el pretrain `G/D` no coincide. | Revisa que los clips no tengan distorsión extrema ni silencio total. Usa el **pretrain estándar de RVC** para tu sample rate, apaga `FP16` (usa `FP32`) y empieza un entrenamiento nuevo. |
| **El entrenamiento no reanuda / empieza desde Epoch 0** | Dejaste activado `Fresh Training` o renombraste/moviste archivos dentro de `logs/`. | Mantén intacta toda la carpeta `logs/<experimento>/`, escribe exactamente el mismo **Nombre de Experimento**, **Sample Rate** y **Embedder**, sube el total de épocas y desactiva `Fresh Training`. |
| **La voz suena apagada, con ruido o con "overfitting"** | Entrenó demasiadas épocas con un dataset pequeño o sucio y memorizó estática en vez del timbre. | Detente antes (prueba checkpoints cada 50-100 épocas, ej. 200-400 épocas en datasets pequeños) y limpia los audios del dataset con **UVR5** o **MVSep** antes de entrenar. |

### 6. Cambiador de voz en vivo, Micrófono y Discord

| Problema o Error | Qué significa (en palabras simples) | Cómo solucionarlo |
| --- | --- | --- |
| **En Discord o en el juego nadie oye mi voz cambiada** | La app destino sigue usando tu micrófono real en vez del cable virtual, o el cambiador de voz no está encendido. | 1. Instala **VB-CABLE** y reinicia el PC.<br>2. En el cambiador de voz, pon **Input** = tu micrófono físico y **Output** = `CABLE Input (VB-Audio Virtual Cable)`.<br>3. En **Discord / Juego**, pon **Dispositivo de entrada** = `CABLE Output (VB-Audio Virtual Cable)`. |
| `PortAudioError` / `Invalid sample rate` / fallo de audio | Micrófono, auriculares y VB-CABLE están en frecuencias distintas (`44100 Hz` vs `48000 Hz`) o en Modo Exclusivo. | Abre el **Panel de sonido de Windows (`mmsys.cpl`)**, entra en **Propiedades → Opciones avanzadas** de tu Micrófono, Auriculares, `CABLE Input` y `CABLE Output`, pon **todos en 48000 Hz**, desmarca **Permitir que las aplicaciones tomen el control exclusivo** y reinicia la app. |
| **Cortes, chasquidos o mucho retraso en la voz** | Tu GPU tarda más en procesar un fragmento que la duración del propio fragmento. | 1. Sube un poco el **Chunk Size**.<br>2. Usa **RMVPE** o **FCPE** para pitch.<br>3. Desactiva **HAGS** en Windows.<br>4. Limita los FPS de los juegos o cierra programas que usen GPU. |
| **Eco o te escuchas doble** | Estás usando altavoces (el micro los capta) o dos programas reproducen tu micro a la vez. | Usa siempre **auriculares**. Desactiva **"Escuchar este dispositivo"** en Grabación de Windows y activa el Monitor solo en el cambiador de voz si necesitas oírte. |
| **Discord corta las respiraciones o el final de las palabras** | El filtro de ruido de Discord confunde los finales de la voz convertida con ruido de fondo. | En **Voz y vídeo** de Discord, desactiva **Supresión de ruido Krisp**, **Cancelación de eco** y **Determinar sensibilidad de entrada automáticamente** (ajusta la barra a mano). Baja también el umbral VAD / Noise Gate en el cambiador de voz. |

### 7. Notebooks en la nube (Colab y Kaggle)

| Problema o Error | Qué significa (en palabras simples) | Cómo solucionarlo |
| --- | --- | --- |
| `CUDA not available` / `No GPU found` en Colab o Kaggle | Olvidaste activar la GPU en los ajustes del notebook o agotaste tu cuota semanal gratuita. | **Colab:** ve a **Entorno de ejecución → Cambiar tipo de entorno → GPU T4**.<br>**Kaggle:** abre la barra derecha **Settings → Accelerator → GPU T4 x2** (requiere verificación telefónica). |
| **Falla la descarga en el notebook (`403` / cuota de Drive o Mega)** | Un enlace público alcanzó su límite diario o pasó a ser privado. | Sube primero tu dataset o modelo a **Hugging Face** o a tu propio Google Drive y descárgalo desde ahí dentro del notebook. |
| **El notebook se desconecta en mitad del entrenamiento** | Los notebooks gratuitos se apagan tras inactividad o sesiones largas y borran el almacenamiento temporal. | Guarda o sincroniza siempre `logs/` y `weights/` en **Google Drive** (o Kaggle Output) y reanuda desde el último `G_*.pth` / `D_*.pth` guardado en lugar de empezar de cero. |

---

## Comprobaciones rápidas por aplicación

- **Ilaria RVC:** Extrae todo el ZIP en una ruta corta como `C:\IlariaRVC`. Usa `RUN_ILARIA_RVC_LOGS.bat` si se cierra al abrir, comprueba que `127.0.0.1:6969` esté libre y mira el **primer** error encima del cierre.
- **Applio Desktop:** Abre la pestaña **Setup** y revisa el estado del motor. Pulsa **Install / Repair** si alguna comprobación sale en rojo. En **Gradio**, mantén la consola abierta y copia la dirección `localhost` exacta que imprime.
- **RVC Mainline / w-okada / Deiteris / TGR:** Elige **CUDA** (NVIDIA) o **DirectML** (AMD/Intel) según tu GPU antes de descargar. Extrae los archivos divididos `.zip.001` con 7-Zip solo cuando todas las partes estén en la misma carpeta.

## Cómo pedir ayuda

Al pedir soporte (por ejemplo en la [página de contacto de Ilaria RVC](https://ilariarvc.shop/en/contact/)), incluye estos 4 datos para poder resolverlo en la primera respuesta:
1. **Nombre y versión de la app** (ej. `Ilaria RVC 2.4.0`, `Applio Desktop`, `Deiteris`).
2. **Especificaciones del PC:** versión de Windows, modelo exacto de GPU (ej. `RTX 3060` o `RX 6700 XT`) y backend (`CUDA` / `DirectML` / `CPU`).
3. **La PRIMERA línea de error** del registro de la consola (oculta tu nombre de usuario de Windows si lo prefieres).
4. **Qué estabas haciendo:** Entrenamiento (sample rate, vocoder, embedder y nuevo vs reanudar) o Cambiador de voz en vivo (cadena exacta: `Mic -> App -> VB-CABLE -> Discord`).
