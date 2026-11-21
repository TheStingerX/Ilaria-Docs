---
label: "⚙️ Archivos ONNX (.onnx)"
order: 86
permalink: /onnx/
description: "Guía de archivos .onnx en RVC: por qué se usan habitualmente para cambio de voz en tiempo real en tarjetas AMD e Intel mediante DirectML y diferencias frente a .pth."
---
# Archivos ONNX de RVC (`.onnx`)

Junto a los archivos [`.pth`](pth-files.md) y [`.index`](indexes.md), a veces verás **archivos `.onnx`** al usar cambiadores de voz RVC.

En el ecosistema RVC, **los modelos `.onnx` se usan habitualmente para tiempo real (realtime) en tarjetas gráficas AMD e Intel** (mediante **DirectML** / ONNX Runtime en Windows), así como en ciertos clientes en vivo multiplataforma.

---

## 1. ¿Qué es un archivo `.onnx`?

**ONNX** (*Open Neural Network Exchange*) es un formato abierto e independiente para ejecutar redes neuronales ya entrenadas. En lugar de depender de PyTorch y NVIDIA CUDA, un `.onnx` funciona sobre **ONNX Runtime**, compatible con distintas GPUs y sistemas.

Esto es especialmente útil en **cambiadores de voz en tiempo real** (como **Deiteris w-okada Fork**, **w-okada VCClient** o **RVC Mainline DirectML**):
- Las GPUs **AMD Radeon** e **Intel Arc / integradas** no pueden usar NVIDIA CUDA.
- Ejecutar un modelo `.onnx` con **ONNX Runtime + DirectML** permite a las tarjetas AMD e Intel acelerar la conversión de voz en vivo en Windows de forma fluida.

---

## 2. `.onnx` vs `.pth`: diferencias clave

| Característica | `.pth` (PyTorch) | `.onnx` (ONNX Runtime) |
| --- | --- | --- |
| **Uso principal** | Entrenamiento estándar, conversión offline y en vivo en NVIDIA CUDA | **Cambio de voz en tiempo real**, sobre todo en **GPUs AMD e Intel (DirectML)** |
| **Entrenamiento / Reanudación** | Los checkpoints crudos `G`/`D` permiten reanudar | **Solo inferencia** (no se puede entrenar ni reanudar) |
| **Merge Models / Voice Blender** | Compatible (con `.pth` compatibles) | **No compatible** (no se pueden fusionar `.onnx`) |
| **Conversión Safetensors** | Compatible en Ilaria RVC 2.4.5+ | **No compatible** |
| **Metadatos RVC internos** | Configuración vocal completa (`sr`, `f0`, `v1`/`v2`, vocoder, embedder) | Grafo mínimo de tensores; el cliente debe coincidir en sample rate y versión |

---

## 3. Cómo obtener un `.onnx` desde un `.pth`

Casi todas las voces RVC se publican como `.pth`, no como `.onnx`. Si necesitas uno en `.onnx`:

1. **Conversión automática en clientes en vivo:** Algunas apps realtime (como **w-okada** y **Deiteris**) aceptan `.pth` directamente o lo convierten a `.onnx` para DirectML.
2. **Exportación manual a ONNX:** Aplicaciones como **Ilaria RVC**, **Applio** y **RVC Mainline** incluyen una opción **Export ONNX** para convertir un `.pth` de inferencia en `.onnx`.
3. **Conserva siempre tu `.pth` original:** Nunca borres el `.pth` ni el `added_*.index` original tras exportar a `.onnx`, ya que `.onnx` no puede fusionarse, convertirse a `.safetensors` ni usarse en herramientas PyTorch estándar.

---

## 4. Consejos para usar `.onnx` en tiempo real

- **Usa `FP32` en DirectML si hay fallos:** DirectML en GPUs AMD/Intel suele fallar o distorsionar en `FP16`; cambia a `FP32` si el audio se corta.
- **Desactiva HAGS en Windows:** Apaga la *Programación de GPU acelerada por hardware* en Windows y reinicia el PC para evitar tirones robóticos en vivo.
- **Usa `48000 Hz` en todo:** Configura micrófono, auriculares y `VB-CABLE` a `48000 Hz` en el Panel de sonido (`mmsys.cpl`) para evitar `PortAudioError`.
