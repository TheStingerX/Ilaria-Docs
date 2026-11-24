---
label: "Uso y resolución de problemas"
icon: ":headphones:"
order: 98
permalink: /ilaria-rvc/rvc-studio/usage/
---

# RVC Studio · Uso y resolución de problemas

[GitHub](https://github.com/SayanoAI/RVC-Studio) · [Hugging Face](https://huggingface.co/datasets/SayanoAI/RVC-Studio/tree/main) · [`91c4011`](https://github.com/SayanoAI/RVC-Studio/tree/91c40119b9ff209eba23debdb0871931b9fd8127)

!!!warning Software antiguo · No recomendado
Estos proyectos están desactualizados y no muestran mantenimiento activo. rvc-cli está archivado y las ramas principales de RVC Studio y Mangio RVC Fork llevan años inactivas. Las guías se conservan para proyectos existentes. Para una instalación nueva, elige una aplicación con mantenimiento activo. [Guías por aplicación](../app-guides.md)
!!!

## Primera versión

Inicia el backend en **RVC Server**. En **Inference**, pulsa **Refresh Data** tras añadir los archivos. Elige un WAV, FLAC, OGG o MP3 corto en `songs/`. Guarda el checkpoint RVC v2 en `models/RVC/` y el índice, si existe, en `models/RVC/.index/`. Elige una voz y un modelo de extracción vocal. El preprocesado adicional es opcional. Pulsa **Save Options** y **1-Click VC**. Si la voz no aparece, revisa la carpeta y actualiza la lista.

## Entrenar una voz

En **Train**, elige una carpeta de datos y un nombre de experimento. Preprocesa, extrae las características y entrena. Comprueba la compatibilidad de los preentrenamientos del generador y discriminador. Genera el índice por separado si lo necesitas. Si un paso está desactivado, comprueba los archivos producidos por el anterior. Compara checkpoints con el mismo audio de prueba.

## TTS y conversión en directo

En **Text to Speech**, elige el motor y la voz RVC. Escucha una frase corta, pulsa **Convert Speech** y guarda el resultado. El código incluye **Realtime Conversion**. Elige la entrada y salida de audio del equipo que ejecuta la aplicación. Haz una prueba con auriculares antes de utilizarlo en directo.

[← Configuración](installation.md)
