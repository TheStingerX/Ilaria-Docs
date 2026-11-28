# Instalación y modelos

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [V2](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v2) · [ZIP](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/archive/refs/tags/v2.zip)

## Configuración en Windows

**1.** Descarga el proyecto desde GitHub y extráelo en una carpeta local con permiso de escritura. Instala **Python 3.10 de 64 bits**. **2.** Ejecuta `Setup.cmd` y espera a que instale dependencias y FFmpeg, cree `Ilaria Audio Upscaler.exe` y abra la aplicación. **3.** Luego abre el EXE directamente y déjalo en la carpeta de la aplicación. El paquete fuente no incluye el ejecutable, el entorno Python ni los pesos.

## Dispositivo y pesos

El instalador prueba CUDA con una GPU NVIDIA compatible y puede recurrir a la CPU. Empieza con **Auto**. Elige **CPU** para aislar errores de CUDA o **CUDA** y la GPU si el entorno la admite. Usa **Download Sidon INT8** (unos 286 MiB) o **Download checkpoint** para el perfil AP-BWE seleccionado. Los pesos se guardan en `App/checkpoints`. La instalación y las descargas requieren Internet.

Selecciona **Apollo** y pulsa el botón de descarga del modelo. Los pesos ocupan unos **63,5 MiB** y se guardan en `App/checkpoints/Apollo`.

[Descripción general](overview.md) · [Restaurar voz con Sidon](sidon.md) · [Ampliar la banda de voz con AP-BWE](ap-bwe.md) · [Preescucha, exportación y resolución de problemas](export.md)

## Fuentes

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [V2](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v2) · [Python 3.10](https://www.python.org/downloads/release/python-31011/) · [Setup.cmd](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/Setup.cmd)
