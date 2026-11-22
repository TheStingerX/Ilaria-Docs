---
label: "Benchmarks y Comparación de Rendimiento"
icon: ":stopwatch:"
order: 90
permalink: /benchmarking/
description: "Cómo medir la velocidad de entrenamiento RVC, factor en tiempo real, GPU Delay, latencia de extremo a extremo, VRAM y throttling con pruebas A/B."
---
# Benchmarks y Comparación de Rendimiento

No confíes en suposiciones al ajustar entrenamiento o voz en directo. Mide tu propio hardware con **pruebas A/B repetibles** cambiando **una sola variable cada vez**.

## 1. Métricas a medir

### Métricas de entrenamiento

- **Pasos por segundo y duración por época:** Visibles en el registro de entrenamiento y TensorBoard.
- **Uso de VRAM:** Pico de memoria GPU (`nvidia-smi` o Administrador de tareas) según **Batch Size**, **Precisión** y **GPU Caching**.
- **Consumo y temperatura:** Vigila **thermal** o **power throttling** (`nvidia-smi -i 0 -q -d PERFORMANCE`).

### Métricas de inferencia y tiempo real

- **Tiempo de inferencia y Real-Time Factor (RTF):** Tiempo de conversión dividido por la duración del audio (`RTF < 1.0` = más rápido que el tiempo real).
- **GPU Delay vs. Latencia de extremo a extremo:** **GPU Delay** mide solo el cálculo GPU por bloque; la **latencia total** suma micrófono, **Block Size**, crossfade, cable virtual y búferes de Discord/OBS/juego.

## 2. Protocolo A/B repetible

1. **Línea base (Test A):** Restablece ajustes opcionales, usa un modelo fijo y el mismo audio o guion.
2. **Estabiliza y mide:** Ejecuta suficiente tiempo para alcanzar temperatura real (p. ej. **10–15 minutos** en directo o varias épocas completas).
3. **Cambia un solo ajuste (Test B):** Mantén todo lo demás (incluida carga GPU de fondo) idéntico.
4. **Compara objetivamente:**

| Métrica | Base (Test A) | Variante (Test B) |
| --- | --- | --- |
| Duración época / Pasos por seg. (Entrenamiento) | `____` | `____` |
| **GPU Delay** medio y pico máximo (Directo) | `____ ms / ____ ms` | `____ ms / ____ ms` |
| Cortes o chasquidos | `Sí / No (conteo)` | `Sí / No (conteo)` |
| Pico VRAM y temperatura GPU | `____ GB / ____ °C` | `____ GB / ____ °C` |
| Throttling observado | `Sí / No` | `Sí / No` |

5. **Conserva solo mejoras demostradas:** Si el Test B no mejora o empeora calor/estabilidad, vuelve al Test A.

[Estimador de VRAM y entrenamiento](vram-estimator.md)
