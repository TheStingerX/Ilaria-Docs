---
label: "⚡ Precisión (FP16 / FP32 / BF16)"
order: 89
permalink: /precision/
description: "Guía sencilla de modos de precisión en RVC (FP16, FP32 y BF16): qué significan, compatibilidad GPU, entrenamiento vs inferencia y cómo evitar errores NaN o HalfTensor."
---
# Precisión en Entrenamiento e Inferencia (`FP16`, `FP32`, `BF16`)

Al entrenar o convertir voces en RVC, verás a menudo un ajuste llamado **Precision** (con opciones como `FP32`, `FP16` y `BF16`).

Para quien empieza en el audio con IA suenan técnicos, pero la idea es muy sencilla. Esta guía explica qué significa cada modo, cuál va con tu tarjeta gráfica y cómo evitar los errores más comunes.

---

## 1. ¿Qué es la "Precisión" en palabras simples?

Un modelo de voz IA está hecho de millones de números decimales (llamados **pesos**). Cada vez que RVC entrena o convierte tu voz, la GPU multiplica millones de esos números por segundo.

La **Precisión** simplemente controla **cuánto detalle tiene cada número** (cuántos bits de memoria ocupa):

- **`FP32` (Precisión completa, 32 bits):** Mantiene todo el detalle decimal y un rango enorme de números. Es el modo más seguro y compatible, **pero** usa más VRAM y es más lento.
- **`FP16` (Media precisión, 16 bits):** Usa la mitad de memoria que `FP32` y va mucho más rápido en GPUs NVIDIA modernas. Al tener un rango más pequeño, los picos fuertes al entrenar pueden desbordarse (`NaN loss`). Tampoco funciona bien en tarjetas antiguas (GTX 10), DirectML (AMD/Intel) ni CPU.
- **`BF16` (Brain Float 16, 16 bits):** Usa la **misma poca memoria que `FP16`**, **pero** conserva el enorme rango seguro de `FP32` (sacrificando solo unos decimales diminutos). En resumen: `BF16` te da la velocidad y poca VRAM de `FP16` con casi la estabilidad de `FP32`.

!!!tip
**Regla práctica sencilla:**
Piensa en **`FP32`** como un camión resistente que nunca se atasca, **`FP16`** como un deportivo rápido que necesita carretera lisa (audio limpio) y **`BF16`** como un deportivo moderno con suspensión todoterreno (rápido, ligero en VRAM y muy difícil de fallar).
!!!

---

## 2. Comparativa `FP32` vs `FP16` vs `BF16`

| Característica | `FP32` (Single / Full) | `FP16` (Half Precision) | `BF16` (Brain Float 16) |
| --- | --- | --- | --- |
| **Memoria por número** | 32 bits (mayor) | 16 bits (mitad) | 16 bits (mitad) |
| **Velocidad de entrenamiento** | Más lenta | **Rápida** (en Tensor Cores) | **Rápida** (en Tensor Cores RTX 30+) |
| **Uso de VRAM** | Más alto | **Bajo (~40-50% menos)** | **Bajo (~40-50% menos)** |
| **Riesgo de fallo `NaN loss`** | Mínimo (casi cero) | Moderado (si el dataset satura) | **Muy bajo** (mismo rango seguro que `FP32`) |
| **Soporte hardware** | **Todo** (todas las GPUs, DirectML, CPU) | NVIDIA GTX 16 / RTX 20+ / T4 (malo/falla en GTX 10, DirectML, CPU) | **NVIDIA RTX 30 / 40 / 50**, A100, L4, H100 (no en RTX 20, GTX 16, T4, GTX 10) |
| **Calidad final de voz** | Estándar de referencia | Prácticamente idéntica | Prácticamente idéntica |

---

## 3. ¿Qué Precisión debes elegir TÚ? (Según tu GPU)

Elegir la precisión correcta depende casi por completo de **qué tarjeta gráfica tienes**:

### NVIDIA RTX serie 30 / 40 / 50 (y A100 / L4 / H100)
- **Mejor opción:** **`BF16`** (si tu app RVC la incluye, como **Ilaria RVC** o **Applio**). Tendrás entrenamiento rápido, poca VRAM y muchos menos fallos `NaN` que con `FP16`.
- **Alternativa:** **`FP16`** también funciona muy bien si tu app no ofrece `BF16`.

### NVIDIA RTX serie 20, GTX serie 16 o T4 en la nube (Colab / Kaggle)
- **Mejor opción:** **`FP16`**. Estas tarjetas no soportan `BF16` por hardware, así que `FP16` te da la mayor ganancia en velocidad y VRAM.
- **Cuándo cambiar:** Si ves `NaN loss` al entrenar, revisa que no haya clips saturados en tu dataset o cambia a **`FP32`**.

### NVIDIA GTX serie 10 (1060, 1070, 1080 Ti) o anteriores
- **Mejor opción:** **Solo `FP32`**. Las GTX serie 10 (Pascal) no tienen Tensor Cores para `FP16` rápido, y forzar `FP16` suele dar errores `HalfTensor` o ir incluso *más lento* que `FP32`.

### GPUs AMD / Intel (DirectML) o solo CPU
- **Mejor opción:** **Solo `FP32`**. DirectML y CPU suelen fallar con `FP16` o `BF16` mostrando `expected scalar type Half but found Float`.

---

## 4. Precisión de Entrenamiento vs Exportación / Inferencia

Es común confundir la **precisión de entrenamiento** con la **precisión al guardar/convertir**:

### Durante el Entrenamiento (Mixed Precision / AMP)
- Los entrenadores RVC modernos usan **Automatic Mixed Precision (AMP)** al elegir `FP16` o `BF16`: hacen las cuentas pesadas en 16 bits para ir rápido y protegen los valores clave en 32 bits.
- Entrenar en `BF16` o `FP16` **no** empeora la calidad de la voz final: un modelo bien entrenado en `BF16`, `FP16` o `FP32` suena prácticamente igual.

### Durante Inferencia, Exportación y Voice Blender
- **Inferencia / guardado `.pth` en `FP16`:** Reduce a la mitad el tamaño del `.pth` (unos 45-55 MB en vez de 95-110 MB) y corre más rápido en GPUs NVIDIA CUDA sin pérdida audible.
- **Inferencia / guardado `.pth` en `FP32`:** Crea un `.pth` más grande, **pero** funciona en cualquier equipo (incluidas GTX 10, DirectML y CPU).
- Puedes usar sin problema un `.pth` exportado en `FP16` dentro de una app en `FP32` (la app lo adapta al cargarlo), o cambiar entre `FP16` y `FP32` en [Voice Blender](../ilaria-rvc/manage/voice-blender.md).

---

## 5. Errores comunes de Precisión y cómo arreglarlos

| Error o Síntoma | Por qué ocurrió | Cómo solucionarlo |
| --- | --- | --- |
| `RuntimeError: expected scalar type Half but found Float` / `HalfTensor` | `FP16` estaba activado en una GPU o backend incompatible (GTX 10, DirectML o CPU). | Desactiva **`FP16`** en ajustes y cambia a **`FP32`**. |
| `BF16 is not supported on this device` | Elegiste `BF16` en una GPU anterior (RTX 20, GTX 16, T4, GTX 10) o CPU. | Cambia a **`FP16`** (en RTX 20 / GTX 16 / T4) o a **`FP32`** (en GTX 10 / DirectML / CPU). |
| `NaN loss` o modelo exportado mudo entrenando en `FP16` | Audio saturado o gradientes extremos desbordaron el rango de `FP16`. | Revisa tu dataset con [Dataset Checker](../ilaria-rvc/train/datasets.md) y cambia a **`BF16`** (RTX 30+) o **`FP32`** en un entrenamiento nuevo. |
| `CUDA out of memory` entrenando en `FP32` | `FP32` usa casi el doble de VRAM por lote que los modos de 16 bits. | Baja **Batch Size** (ej. `4` -> `2` -> `1`) o cambia a **`BF16`** / **`FP16`** si tu GPU los soporta. |
