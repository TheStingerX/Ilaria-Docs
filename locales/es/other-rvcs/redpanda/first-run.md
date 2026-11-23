---
label: "Instalar Redpanda VC"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/redpanda/first-run/
description: "Empieza con la versión precompilada para Windows x64. La aplicación de escritorio usa Tauri y ejecuta los motores de voz en Python de forma local. El código fuente también incluye una WebUI con la misma interfaz."
---

# Instalar Redpanda VC

[Versión precompilada para Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) · [Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Empieza con la versión precompilada para Windows x64. La aplicación de escritorio usa Tauri y ejecuta los motores de voz en Python de forma local. El código fuente también incluye una WebUI con la misma interfaz.

## Windows x64

1. Descarga el ZIP para Windows x64, extrae todos los archivos en una carpeta local con permisos de escritura y abre `Redpanda.exe` desde allí.
2. Espera a que termine la configuración. Si no puede reutilizar el entorno, la aplicación prepara Python 3.12 y PyTorch con `uv` y detecta NVIDIA CUDA o CPU. Mantén juntas las carpetas `runtime/`, `assets/`, `datasets/`, `models/` y `logs/`.
3. Abre **Inference**, elige una voz compatible y prueba un WAV corto. Si falla el arranque, revisa el primer error, los permisos, la conexión para las descargas y el controlador NVIDIA si usas CUDA.

## WebUI y compilación desde el código

Desde el código fuente, ejecuta `run-install.bat` en Windows o `run-install.sh` en Linux/macOS. Abre la WebUI con `run-web.bat`, `run-web.sh` o `python core.py web --host 127.0.0.1 --port 7860` en el entorno Python preparado. Compilar la aplicación requiere Rust y las herramientas WebView de la plataforma. Las mejoras del entorno portátil y el tema Dark Frutiger Aero son posteriores a la etiqueta de la versión.

[Inferencia con archivos](inference.md) · [Conversión de voz en tiempo real](live-audio.md) · [Entrenamiento con Casual Voice Changer](causal-training.md) · [RVC Training](training.md)

## Código fuente y versión

[README](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/README.md) · [Runtime](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/desktop/src/runtime.rs)
