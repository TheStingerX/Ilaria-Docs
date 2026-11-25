# AICoverGen · Uso y resolución de problemas

[GitHub](https://github.com/SociallyIneptWeeb/AICoverGen)

!!!warning Software antiguo · No recomendado
**AICoverGen** es un flujo antiguo para covers con RVC v2 que ya no tiene mantenimiento activo y depende de paquetes de la época de Python 3.9+. Para una instalación nueva, elige una aplicación con mantenimiento activo. [Guías por aplicación](../../app-guides.md)
!!!

## Añadir modelos de voz RVC v2

AICoverGen solo carga modelos de inferencia **RVC v2** exportados (`rvc_models/`):

- **Download model:** pega una URL directa a un archivo comprimido con el `.pth` de la voz (y su `.index` opcional) para descargarlo y extraerlo automáticamente.
- **Upload model:** sube tus archivos `.pth` y `.index` opcional desde la WebUI, o coloca cada carpeta de voz dentro de `rvc_models/`.

## Generar covers en la WebUI

Abre la pestaña **Generate**, pega un enlace de YouTube o sube un archivo de audio local, elige el modelo vocal y ajusta los controles principales:

- **Pitch Change:** cambia el tono vocal para adaptarlo al rango de la voz objetivo (por ejemplo `+1` octava / `+12` semitonos de hombre a mujer, o `-1` / `-12` de mujer a hombre).
- **Extracción de pitch:** usa **`rmvpe`** como opción predeterminada recomendada para un seguimiento vocal más limpio, o **`mangio-crepe`** con hop length ajustable para transiciones más suaves.
- **Index Rate:** regula cuánto influye el archivo `.index` en el timbre y la pronunciación. Bájalo si aparecen grano o artefactos.
- **Mezcla y efectos de audio:** ajusta el volumen de **Main Vocals**, **Backup Vocals** e **Instrumentals**, los controles de **Reverb** (room size, wetness, dryness, damping) y el formato de salida (**`mp3`** o **`wav`**).

## Modo CLI (`src/main.py`)

Puedes ejecutar todo el proceso sin abrir la WebUI mediante `src/main.py`:

~~~bash
python src/main.py -i "https://www.youtube.com/watch?v=VIDEO_ID" -dir "VoiceFolderName" -p 0 -palgo rmvpe -ir 0.5 -mv 0 -bv 0 -iv 0 -rsize 0.15 -rwet 0.2 -rdry 0.8 -rdamp 0.7 -oformat mp3
~~~

Opciones principales:

- `-i`: ruta local o URL de YouTube de entrada
- `-dir`: nombre de la carpeta del modelo dentro de `rvc_models/`
- `-p`: cambio de tono (pitch)
- `-palgo`: algoritmo de extracción de pitch (`rmvpe` o `mangio-crepe`)
- `-ir`: index rate (`0`–`1`)
- `-mv` / `-bv` / `-iv`: volumen para voces principales, coros/secundarias e instrumental
- `-rsize` / `-rwet` / `-rdry` / `-rdamp`: tamaño de sala, wetness, dryness y damping de la reverberación
- `-oformat`: formato del archivo de salida (`mp3` o `wav`)

## Solución de problemas

- **Errores de audio o conversión al ejecutar:** comprueba que tanto `ffmpeg` como `sox` estén instalados y disponibles en tu `PATH` antes de iniciar `src/webui.py` o `src/main.py`.
- **Fallos al descargar desde YouTube:** los extractores antiguos de YouTube suelen dejar de funcionar con el tiempo. Descarga la pista aparte en WAV/MP3 y pasa la ruta local en lugar de una URL.
- **Error al cargar el modelo:** verifica que el archivo sea un `.pth` de inferencia RVC v2 exportado (no un modelo RVC v1 ni un checkpoint G/D de entrenamiento).

[Instalación](installation.md)
