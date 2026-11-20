---
label: "🎵 Pitch extractors"
order: 92
permalink: /pitch-extractors/
description: "Un pitch extractor (o método de extracción F0) es el algoritmo o red neuronal que sigue la frecuencia fundamental (tono, melodía y entonación) de la voz de entrada a lo largo del tiempo."
---
# Pitch Extractors de RVC (Métodos F0)

Un **pitch extractor** (o **método de extracción F0**) es el algoritmo o red neuronal que sigue la frecuencia fundamental (tono, melodía y entonación) de la voz de entrada a lo largo del tiempo.

Mientras el [embedder](embedders.md) lee *qué palabras y fonemas* se dicen o cantan, el **pitch extractor** mide *qué tan grave o aguda* es la voz en cada milisegundo.

!!!tip
**Compatibilidad:**
A diferencia de los embedders, **los pitch extractors no te atan a una sola opción**. Aunque un modelo se haya entrenado usando `rmvpe` en el preprocesamiento, puedes cambiar libremente entre `rmvpe`, `rmvpe_gpu`, `fcpe` o `crepe` durante la inferencia y el cambiador de voz en vivo sin perder compatibilidad.
!!!

## Recomendación rápida

- **Mejor opción general (Entrenamiento y Conversión):** `rmvpe` o `rmvpe_gpu` (si tienes GPU NVIDIA).
- **Mejor para Voice Changer en vivo / Tiempo real:** `fcpe` (menor latencia) o `rmvpe` (máxima calidad si tu GPU aguanta).
- **Evitar en uso normal:** `pm`, `dio` y `harvest` son métodos antiguos en CPU que suenan bastante peor o son mucho más lentos que `rmvpe` y `fcpe`.

---

## Comparativa de todos los Pitch Extractors conocidos

| Pitch Extractor | Tipo | Velocidad | Calidad y mejor uso | Notas |
| --- | --- | --- | --- | --- |
| **`rmvpe`** | Red neuronal | Rápido | **Mejor estándar general** para habla, canto y extracción F0 del dataset. | Maneja consonantes, aire y ligero eco mucho mejor que los métodos antiguos. |
| **`rmvpe_gpu`** | Red neuronal (GPU CUDA) | **Muy rápido** | La misma alta precisión que `rmvpe`, ejecutada directamente en tu GPU NVIDIA en lugar de la CPU. | Ideal en Ilaria RVC / RVC WebUI para pistas largas, lotes y preprocesamiento rápido. Requiere VRAM libre suficiente. |
| **`fcpe`** | Red neuronal | **Ultra rápido** | **El mejor para tiempo real / en vivo** e inferencia de baja latencia. | Algo más ligero que `rmvpe`; ideal si `rmvpe` produce cortes en vivo. |
| **`crepe` / `crepe-full`** | Red neuronal | Lento | Muy preciso en canto solista limpio y vibrato. | Mucho más pesado en GPU/CPU que `rmvpe`. Suele ser demasiado lento para uso en vivo. |
| **`crepe-tiny`** | Red neuronal (pequeña) | Rápido | Versión ligera de `crepe` para equipos antiguos. | Menos preciso que `rmvpe` y `fcpe`; superado por `fcpe`. |
| **`harvest`** | DSP clásico (WORLD) | Muy lento (CPU) | Método antiguo para habla limpia. | Propenso a saltos de octava y sonido metálico en canto o audio ruidoso. Suele requerir `filter_radius`. |
| **Parselmouth (`pm`)** | DSP clásico | Ultra rápido (CPU) | Pruebas rápidas en PCs muy débiles sin GPU. | Pierde fácilmente el tono en canto, susurros o voces sucias. |
| **`dio`** | DSP clásico (WORLD) | Muy rápido (CPU) | Opción antigua rápida en CPU. | Menos preciso que `rmvpe` y `fcpe`; no recomendado para resultados finales. |
| **`hybrid[...]`** | Métodos combinados | Lento | Mezcla dos extractores (ej. `hybrid[rmvpe+fcpe]` o `hybrid[crepe+rmvpe]`). | Disponible en Applio y algunos forks para suavizar saltos de octava en canto difícil, pero consume más tiempo. |
| **Variantes `swift` / `onnx`** | Ligero / ONNX | Muy rápido | Extractores optimizados en forks recientes (como Applio o Deiteris). | Útiles en CPU o DirectML donde los extractores PyTorch estándar son más lentos. |

## `rmvpe` vs `rmvpe_gpu`: ¿cuál es la diferencia?

En apps como **Ilaria RVC** y **RVC Mainline** verás a menudo `rmvpe` y `rmvpe_gpu`:
- **`rmvpe`** puede ejecutarse en CPU o según la gestión por defecto de la app, usando menos VRAM pero siendo más lento con archivos largos o datasets grandes.
- **`rmvpe_gpu`** fuerza el modelo RMVPE en tu **GPU CUDA**, ofreciendo exactamente la misma calidad de tono pero mucho más rápido al extraer F0 y convertir offline.
- Si `rmvpe_gpu` da error `CUDA out of memory` en una gráfica con poca VRAM (4 GB o menos), vuelve a `rmvpe` o `fcpe`.

## Cuál elegir según tu tarea

1. **Preparar / Entrenar un modelo nuevo:** Usa **`rmvpe_gpu`** (si tienes GPU NVIDIA con 6+ GB de VRAM) o **`rmvpe`**. Un buen seguimiento F0 evita fallos de afinación en el modelo final.
2. **Convertir canciones o locuciones offline:** Empieza con **`rmvpe`** o **`rmvpe_gpu`**. Prueba `crepe-full` o `hybrid` solo si una nota alta puntual hace un salto de octava.
3. **Micrófono en vivo / Discord:** Empieza con **`fcpe`** para mínima latencia, o **`rmvpe`** si tu GPU mueve el chunk size sin chasquidos.
