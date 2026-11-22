# Biblioteca de modelos y fusión

[Descarga Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

[Otros paneles](other-buttons.md)

## Matriz de compatibilidad de formatos

| Archivo / Recurso | Uso | Operaciones compatibles en Ilaria RVC | Guía |
| --- | --- | --- | --- |
| **`.pth` de inferencia** | Conversión de voz | Inferencia individual/lotes, Voice Blender, Safetensors | [Archivos `.pth`](../../start/pth-files.md) |
| **Checkpoints (`G_*.pth` / `D_*.pth`)** | Reanudar entrenamiento | Solo reanudar RVC v2 (no válidos en Inferencia) | [Proceso de entrenamiento](../train/training-workflow.md) |
| **Índice (`added_*.index`)** | Recuperación opcional | Inferencia (junto a su `.pth`) | [Archivos Index](../../start/indexes.md) |
| **Modelos `.onnx`** | Motores ONNX en directo | Para clientes externos DirectML (AMD/Intel) | [Archivos `.onnx`](../../start/onnx-files.md) |
| **`.safetensors`** | Almacenamiento seguro | Convierte con **Safetensors Converter** antes de inferir | [Conversor Safetensors](safetensors-converter.md) |
| **Embedders** | Extracción de rasgos | Inferencia y Entrenamiento | [Embedders](../../start/embedders.md) |
| **Preentrenados G/D** | Pesos base | Solo Entrenamiento RVC | [Modelos preentrenados](../../start/pretrained.md) |
| **Voice Blender** | Mezcla de voces | Combina dos `.pth` de inferencia compatibles | [Voice Blender](voice-blender.md) |

> **Por qué un checkpoint de entrenamiento NO sirve para inferencia:** `G_*.pth` y `D_*.pth` en `app/logs/` guardan el estado del optimizador; usa siempre el `.pth` exportado para inferencia (~40–110 MB) en `models/`.

## Importar, inspeccionar y seguridad

1. Abre **Other → Import local models** (o descarga por URL).
2. Mantén juntos el `.pth` y su `added_*.index`, actualiza la lista y revisa **Model information**.
3. **Seguridad:** Los `.pth` usan `pickle`; descarga solo de fuentes de confianza o usa `.safetensors`.

## Mezclar voces compatibles

Elige dos `.pth` de **inferencia** compatibles en [Voice Blender](voice-blender.md), comprueba compatibilidad y prueba con `Index Ratio = 0`.
