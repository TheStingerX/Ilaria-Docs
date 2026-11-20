---
label: "Merge Models"
icon: ":twisted_rightwards_arrows:"
order: 92
permalink: /ilaria-rvc/voice-blender/
description: "En Ilaria RVC, la función Voice Blender se encuentra en la pestaña Other bajo Merge models."
---
# Voice Blender (Fusión de Modelos)

[Descargar Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

En **Ilaria RVC**, la función Voice Blender se encuentra en la pestaña **Other** bajo **Merge models**. Te permite combinar los pesos de dos modelos de voz `.pth` compatibles para crear una voz híbrida nueva sin entrenar desde cero.

## Antes de mezclar: reglas de compatibilidad

Que dos voces suenen parecidas **no** garantiza que puedan fusionarse. Ambos modelos deben coincidir técnicamente:

- **Solo archivos `.pth` de inferencia:** Usa modelos exportados de `weights/`. Nunca uses checkpoints crudos (`G_*.pth` / `D_*.pth`) ni archivos `.onnx`.
- **Misma versión de RVC:** Ambos deben compartir arquitectura (`v1` 256-d o `v2` 768-d).
- **Mismo sample rate:** Ambos deben haberse entrenado al mismo sample rate (ej. ambos `40k` o ambos `48k`).
- **Mismo embedder / dimensiones internas:** Ambos deben tener formas de tensores compatibles.

!!!tip
Pulsa siempre **Check model compatibility** en Ilaria RVC antes de fusionar. Si la comprobación falla, esos dos `.pth` no se pueden mezclar.
!!!

## Cómo mezclar dos voces en Ilaria RVC

1. Abre la pestaña **Other** y baja hasta **Merge models**.
2. Selecciona **Model A** y **Model B** en sus desplegables (pulsa **Refresh** antes si acabas de añadir un `.pth`).
3. Pulsa **Check model compatibility** y confirma en el registro que ambos modelos son compatibles.
4. Ajusta **Model A contribution (%)**:
   - `50` da una mezcla al **50% / 50%** entre el Modelo A y el Modelo B.
   - `70` da **70% Modelo A** y **30% Modelo B**.
   - `100` devuelve solo Modelo A; `0` devuelve solo Modelo B.
5. Elige **Sample rate** (`Auto` si está disponible, o el sample rate exacto de ambos modelos).
6. Elige **Output precision**:
   - `fp16` crea un archivo más ligero y rápido en GPUs NVIDIA CUDA modernas.
   - `fp32` ocupa más pero funciona en todo equipo, incluidas GPUs antiguas, DirectML y CPU.
7. Escribe un **Output model name** claro (ej. `Alice70_Bob30`) y notas opcionales.
8. Pulsa **Merge and save model** y revisa **Merge Log** para confirmar que el `.pth` se guardó.

## Pruebas, ajuste fino y archivos `.index`

- **No se crea ningún `.index`:** La fusión combina solo los pesos `.pth` y **no** genera un nuevo archivo `.index`.
- **Prueba primero sin Index:** Ve a **Inference**, pulsa **Refresh**, selecciona tu nuevo `.pth` fusionado y pruébalo en un clip `.wav` limpio de 10-20 segundos con **Index Rate = 0**.
- **Compara lado a lado:** Escucha el mismo clip con el Modelo A, el Modelo B y el modelo fusionado al mismo volumen. Ajusta **Model A contribution (%)** en pasos pequeños (`40%`, `50%`, `60%`) hasta hallar el punto ideal.
- **Prueba opcional con Index:** Cuando el `.pth` mezclado suene bien, puedes probar el `.index` del Modelo A o del Modelo B con un **Index Rate** bajo (`0.2` a `0.4`) para ver si aporta claridad sin tirar demasiado hacia una sola voz.
- **Conserva los originales:** Un `.pth` fusionado sirve solo para **inferencia** (convertir audio). No contiene estado de entrenamiento ni sirve para reanudar un entrenamiento.
