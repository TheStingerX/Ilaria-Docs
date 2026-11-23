---
label: "Conversión de voz en tiempo real"
icon: ":microphone:"
order: 97
permalink: /ilaria-rvc/redpanda/live-audio/
description: "Abre Realtime en la aplicación de escritorio o en la WebUI. Prueba una voz con auriculares antes de enviar el sonido a Discord, OBS, un juego u otra aplicación."
---

# Conversión de voz en tiempo real

[Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Abre Realtime en la aplicación de escritorio o en la WebUI. Prueba una voz con auriculares antes de enviar el sonido a Discord, OBS, un juego u otra aplicación.

## Configurar el enrutamiento de audio

Para la primera prueba, selecciona el micrófono físico en **Microphone** y los auriculares en **Output**. Para enviar la voz a otra aplicación, elige el extremo de reproducción del cable virtual como salida de Redpanda y el de grabación como micrófono de la aplicación de destino. Usa **Monitor** para los auriculares sin devolver la señal al micrófono.

## Voces RVC y CVC

RVC usa un `.pth` de inferencia y un `.index` opcional. CVC usa una voz `.cvc` y una ruta de audio de 48 kHz. Carga los ajustes de tono, ganancia, puerta e índice guardados con la voz. Los archivos antiguos `.causalvc.json` y `.nextvc.json` requieren sus pesos. RNNoise puede filtrar la entrada del micrófono. Si hay cortes, prueba un bloque más largo y desactiva los efectos de uno en uno.

[Instalar Redpanda VC](first-run.md) · [Inferencia con archivos](inference.md) · [Entrenamiento con Causal Voice Changer](causal-training.md) · [RVC Training](training.md) · [VAC Lite / VB-CABLE](../../conversion/real-time.md)

## Código fuente y versión

[Realtime UI](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/desktop/ui/index.html) · [Realtime engine](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/shared/desktop/realtime.py)
