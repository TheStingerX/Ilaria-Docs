---
label: "Uso y resolución de problemas"
icon: ":headphones:"
order: 98
permalink: /ilaria-rvc/rvc-studio/usage/
---

# RVC Studio · Uso y resolución de problemas

[GitHub](https://github.com/xenophidiadae/RVCStudio) · [Versión consultada](https://github.com/xenophidiadae/RVCStudio/tree/6cccb75833ef7937bfb6da9ce8f21211f0ab526e)

## Importar la voz

Importa un ZIP con un generador RVC ONNX compatible o un `.pth` de inferencia, y el `.index` FAISS correspondiente si existe. Si hay ambos formatos, se prefiere ONNX. El conversor exporta `.pth` a ONNX y prepara las características del índice cuando está presente. Se guarda en `Models/<voice>/model.onnx` y el `features.rvci` opcional. Un ONNX genérico o un checkpoint de entrenamiento no sirve como generador.

## Micrófono y latencia

Selecciona voz, micrófono físico y auriculares y pulsa **Start voice conversion**. Empieza con tono cero y prueba el índice por separado. PortAudio usa un flujo dúplex mono a 48 kHz. ContentVec recibe audio a 16 kHz y RMVPE aporta F0 cuando hace falta. La salida vuelve a 48 kHz. Si hay cortes, revisa niveles, tiempo de inferencia e interrupciones de búfer. Comprueba CUDA antes de evaluar GPU. Prueba auriculares antes del cable virtual.

[Instalación](installation.md)
