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

## Recomendación rápida (Específico para Ilaria RVC)

- **Inferencia Individual y por Lotes (CUDA):** Ilaria RVC ofrece `rmvpe`, `swift`, `beatrice`, `fcpe`, `parselmouth`, `harvest` y `crepe`. **`rmvpe`** es el punto de partida predeterminado en la interfaz.
- **Inferencia DirectML (AMD / Intel):** Solo están disponibles `pm`, `harvest`, `rmvpe` y `fcpe`.
- **Extracción de rasgos en Entrenamiento:** `rmvpe_gpu` (junto con `dio`) aparece en la pestaña **Training** para preprocesar el dataset, no en los menús de Inferencia.
- **Voice Changer en vivo / Tiempo real:** `fcpe` o `swift` ofrecen un seguimiento más ligero para reducir chasquidos en sistemas de baja latencia; ninguna opción única es universalmente mejor para todas las voces o grabaciones.

---

## Comparativa de todos los Pitch Extractors conocidos

| Pitch Extractor | Tipo | Velocidad | Calidad y mejor uso | Notas |
| --- | --- | --- | --- | --- |
| **`rmvpe`** | Red neuronal | Rápido | **Predeterminado en Ilaria RVC** para habla, canto y extracción F0. | Maneja consonantes, aire y ligero eco mucho mejor que los métodos clásicos. |
| **`rmvpe_gpu`** | Red neuronal (GPU CUDA) | **Muy rápido** | Misma arquitectura RMVPE ejecutada explícitamente en GPU NVIDIA durante el preprocesamiento de **Training**. | Requiere VRAM libre suficiente; no aparece en el selector de Inferencia Individual/Lotes en Ilaria RVC. |
| **`fcpe`** | Red neuronal | **Ultra rápido** | **Opción rápida para tiempo real** e inferencia de baja latencia. | Algo más ligero que `rmvpe`; útil si `rmvpe` produce cortes en vivo. |
| **`crepe` / `crepe-full`** | Red neuronal | Lento | Muy preciso en canto solista limpio y vibrato. | Mucho más pesado en GPU/CPU que `rmvpe`. Suele ser demasiado lento para uso en vivo. |
| **`crepe-tiny`** | Red neuronal (pequeña) | Rápido | Versión ligera de `crepe` para equipos antiguos. | Menos preciso que `rmvpe` y `fcpe`. |
| **`harvest`** | DSP clásico (WORLD) | Muy lento (CPU) | Método antiguo para habla limpia. | Propenso a saltos de octava y sonido metálico en canto o audio ruidoso. Suele requerir `filter_radius`. |
| **Parselmouth (`pm`)** | DSP clásico | Ultra rápido (CPU) | Pruebas rápidas en PCs muy débiles sin GPU. | Pierde fácilmente el tono en canto, susurros o voces sucias. |
| **`dio`** | DSP clásico (WORLD) | Muy rápido (CPU) | Opción antigua rápida en CPU (usada principalmente en extracción de entrenamiento). | Menos preciso que `rmvpe` y `fcpe`; no recomendado para resultados finales. |
| **`hybrid[...]`** | Métodos combinados | Lento | Mezcla dos extractores (ej. `hybrid[rmvpe+fcpe]` o `hybrid[crepe+rmvpe]`). | Disponible en Applio y algunos forks para suavizar saltos de octava en canto difícil, pero consume más tiempo. |
| **`swift` / `beatrice` / ONNX** | Ligero / ONNX | Muy rápido | Extractores optimizados disponibles en Ilaria RVC (CUDA) y forks recientes. | Útiles como alternativa ligera a `rmvpe` cuando buscas menor carga o distinto seguimiento en habla/canto. |

## `rmvpe` vs `rmvpe_gpu` en Ilaria RVC

En **Ilaria RVC**, ambos nombres pertenecen a etapas distintas:
- **`rmvpe`** es la opción disponible en **Single Inference**, **Batch Inference** y **Training**.
- **`rmvpe_gpu`** es una opción de la pestaña **Training** que acelera la extracción F0 del dataset en GPU CUDA.
- Si `rmvpe_gpu` durante el entrenamiento da error `CUDA out of memory` en una gráfica con poca VRAM (4 GB o menos), cambia a `rmvpe` o `dio`.

## Cuál elegir según tu tarea

1. **Preparar / Entrenar un modelo nuevo:** Usa **`rmvpe_gpu`** (si tienes GPU NVIDIA con 6+ GB de VRAM) o **`rmvpe`**. Un buen seguimiento F0 evita fallos de afinación en el modelo final.
2. **Convertir canciones o locuciones offline:** Empieza con **`rmvpe`** (el predeterminado de Ilaria RVC). Prueba `fcpe`, `swift`, `beatrice` o `crepe` si notas saltos de octava o inestabilidad de tono en alguna nota.
3. **Micrófono en vivo / Discord:** Empieza con **`fcpe`** o **`rmvpe`** según lo que soporte tu GPU con el chunk size configurado sin chasquidos.
