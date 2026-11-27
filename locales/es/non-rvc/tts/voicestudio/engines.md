---
label: "Modelos y aceleración"
icon: ":package:"
order: 97
permalink: /non-rvc/tts/voicestudio/engines/
---

# VoiceStudio · Modelos y aceleración

[VoiceStudio v0.5.8 · Modelos y aceleración](https://github.com/debpalash/VoiceStudio/blob/v0.5.8/docs/engines/README.md)

## Preparación

Cada tarea usa su propio motor y pesos. Antes de descargar, comprueba idioma, tamaño, licencia y dispositivo compatible. Empieza con el motor que realmente necesitas.

## Primera prueba

CPU sirve como referencia. CUDA es para NVIDIA. ROCm depende de la tarjeta AMD y del motor. Algunos motores GGUF admiten Vulkan y Apple Silicon dispone de Metal. Compara la misma frase al cambiar de dispositivo.

## Comprobación paso a paso

1. Identifica si necesitas TTS o ASR.
2. Comprueba idioma y dispositivo del motor antes de instalar.
3. Compara CPU y GPU con el mismo texto, después de una prueba de calentamiento.

[Primera síntesis](first-run.md) · [Solución de problemas](troubleshooting.md)
