# Rendimiento GPU y Solución de Problemas

La conversión de voz y el entrenamiento RVC dependen del cómputo GPU, el ancho de banda de memoria y una programación estable.

## 1. Métricas de GPU que importan

- **Uso de GPU:** En **entrenamiento**, un uso alto (80–99%) es normal. En **tiempo real**, la carga llega en ráfagas cortas por bloque; si un juego usa el 95–100% de la GPU, el audio espera y se entrecorta.
- **VRAM:** **Batch Size**, frecuencia de muestreo y **caché GPU del dataset** determinan la VRAM usada. Si se llena, aparece `CUDA out of memory`.
- **Temperatura y Thermal Throttling:** Al superar su límite térmico, la GPU baja los relojes automáticamente, causando caídas de velocidad o picos de **GPU Delay**.
- **Límites de energía y portátiles:** En batería se limitan vatios y frecuencias; conecta siempre el cargador.

## 2. Ajustes con mayor impacto

| Ajuste | Impacto en entrenamiento | Impacto en tiempo real |
| --- | --- | --- |
| **Batch Size** | Lotes mayores usan más VRAM y aceleran épocas; reduce si hay OOM | No se usa en directo |
| **Block / Chunk Size** | No se usa en entrenamiento | Bloques mayores dan más margen (menos cortes, más retardo) |
| **Precisión (`FP32` / `FP16` / `BF16`)** | `BF16` (RTX 30/40/50) y `FP16` reducen VRAM y tiempo; `FP32` es la base segura | `FP16` es más rápido en NVIDIA compatibles; DirectML suele requerir `FP32` |
| **Extractor de tono (`rmvpe` / `fcpe`)** | `rmvpe` es el estándar de precisión F0 | `fcpe` o `rmvpe` son rápidos; evita `crepe` full en directo |

## 3. Resolver cuellos de botella comunes

1. **Juego + Voice Changer en directo:** Limita los FPS del juego o sube un paso **Block Size**.
2. **Windows HAGS:** No es dañino por defecto; si notas contención de VRAM o cortes inexplicables, prueba desactivarlo, reinicia y compara antes/después.
3. **Cuellos de botella de CPU:** Mantén todo alineado a `48000 Hz` en Windows y ajusta **Workers**.
4. **Controladores y refrigeración:** Usa drivers NVIDIA Studio/Game Ready limpios y mantén limpia la ventilación.

## 4. Optimización avanzada opcional (NVIDIA)

En GPUs NVIDIA compatibles, fijar relojes gráficos con `nvidia-smi` es una prueba **opcional** para reducir picos de latencia; consulta [Optimización avanzada de rendimiento Vonovox](../other-rvcs/voice-changers/vonovox/advanced-performance-optimization.md).
