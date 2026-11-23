---
label: "Inferencia con archivos"
icon: ":headphones:"
order: 98
permalink: /ilaria-rvc/redpanda/inference/
description: "Usa Inference para convertir una grabación o una carpeta entera. Una voz RVC utiliza un modelo .pth de inferencia; una voz Casual Voice Changer utiliza .cvc."
---

# Inferencia con archivos

[Versión precompilada para Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) · [Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Usa Inference para convertir una grabación o una carpeta entera. Una voz RVC utiliza un modelo .pth de inferencia; una voz Casual Voice Changer utiliza .cvc.

## Convertir una grabación

Abre **Inference**. En **Voice model**, elige un `.pth` RVC de inferencia o una voz `.cvc`. Para RVC, añade el `.index` correspondiente si lo tienes. Deja **Index rate** en cero para la primera prueba sin recuperación. Los checkpoints `G_*.pth` y `D_*.pth` se usan en Training.

## Probar y convertir una carpeta

Empieza con un WAV corto y limpio, cero semitonos y exportación WAV. Usa **Save as** para elegir una salida separada y escucha el resultado antes de cambiar el tono o el modelo. Activa **Folder mode** después, elige una carpeta pequeña y un destino separado, y comprueba dos o tres conversiones antes de procesar todo.

[Instalar Redpanda VC](first-run.md) · [Conversión de voz en tiempo real](live-audio.md) · [Entrenamiento con Casual Voice Changer](causal-training.md) · [RVC Training](training.md)

## Código fuente y versión

[Inference UI](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/desktop/ui/index.html) · [Conversion](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/shared/desktop/convert.py)
