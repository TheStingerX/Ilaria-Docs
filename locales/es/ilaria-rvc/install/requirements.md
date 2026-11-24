---
label: "Requisitos del sistema"
icon: ":clipboard:"
order: 83
permalink: /ilaria-rvc/requirements/
description: "Ilaria RVC se ejecuta localmente en tu PC usando PyTorch 2.10.0 y NVIDIA CUDA."
---
# Requisitos del sistema para Ilaria RVC

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · El paquete completo de Windows es la versión 2.4.7. El ZIP de actualización 2.5.0 excluye el entorno de ejecución y los pesos. De la 2.4.2 a la 2.4.8, usa **Other → Update Ilaria RVC → Check for updates → Download and restart**.

[Descargar Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true) · [GPUs compatibles](gpu-compatibility.md) · [Opciones en la nube](../cloud/cloud.md)

Ilaria RVC se ejecuta localmente en tu PC usando **PyTorch 2.10.0** y **NVIDIA CUDA**. Como la conversión de voz (inferencia) y el entrenamiento de modelos tienen exigencias muy distintas, revisa ambas tablas antes de instalar.

> **¿No tienes una GPU NVIDIA compatible?** Puedes ejecutar Ilaria RVC de forma remota en GPUs gratuitas o en la nube con las guías de [Kaggle](../cloud/kaggle.md), [Google Colab](../cloud/colab.md) o [Lightning AI Studio](../cloud/lightning-ai.md).

## 1. Resumen rápido: Mínimos vs. Recomendados

| Componente | Mínimos (Inferencia / Uso básico) | Recomendados (Inferencia fluida y Entrenamiento) |
| --- | --- | --- |
| **Sistema operativo** | Windows 10 64 bits | Windows 10 o Windows 11 (64 bits, actualizado) |
| **GPU** | GPU **NVIDIA** dedicada con **4 GB VRAM** (Maxwell, Pascal, Volta, GTX 16 o RTX) | GPU **NVIDIA RTX** dedicada con **8–12 GB+ VRAM** (ej. RTX 3060 12 GB, RTX 4060 Ti / 4070 o superior) |
| **Runtime CUDA** | CUDA **12.8** (incluido) o CUDA **12.6** (descarga automática para Maxwell/Pascal/Volta) | CUDA **12.8** (incluido en el ZIP para GTX 16 / RTX 20–50) |
| **RAM del sistema** | **8 GB** | **16 GB** o **32 GB** (especialmente para entrenamiento e index) |
| **Almacenamiento** | **25 GB** libres (ZIP + app extraída + modelos) | **50 GB+ libres en SSD** (datasets, checkpoints, pretraineds) |
| **CPU** | Procesador x64 moderno de 4 núcleos | Procesador x64 de 6–8+ núcleos (acelera preprocesamiento y búsqueda de index) |
| **Navegador** | Cualquier navegador moderno (para `http://127.0.0.1:6969`) | Chrome, Edge o Firefox (actualizado) |

## 2. Requisitos detallados de GPU y VRAM

Ilaria RVC para Windows está diseñado para **GPUs NVIDIA**. Gráficos integrados Intel, Intel Arc y GPUs AMD no son compatibles con el paquete de Windows.

### Por generación de GPU (runtime CUDA)

- **GeForce GTX 16 y RTX 20, 30, 40, 50**: usa directamente el runtime **PyTorch 2.10.0 + CUDA 12.8** incluido tras extraer el ZIP. Mantén actualizado el driver NVIDIA (especialmente en serie RTX 50).
- **Maxwell, Pascal y Volta** (ej. series GTX 750/900/1000, TITAN X/V, Tesla P4/P40/P100/V100): en el primer inicio, `RUN_ILARIA_RVC.bat` descarga y verifica automáticamente **PyTorch 2.10.0 + CUDA 12.6** en `runtime-cu126` y lo reutiliza después.
- **Nota de validación**: el cómputo, la retropropagación y la carga de ContentVec se verificaron directamente en una **RTX 4070**. El resto de tarjetas de la [lista de GPUs compatibles](gpu-compatibility.md) se esperan compatibles según su arquitectura y soporte CUDA.

### Por capacidad de VRAM (qué puedes ejecutar)

| VRAM | Inferencia (Conversión de audio) | Entrenamiento (Crear modelos de voz) |
| --- | --- | --- |
| **4 GB** | Funciona en clips cortos; cierra apps que usen GPU (juegos, navegadores con aceleración por hardware). | Muy justo; solo batch sizes pequeños (`1–2`) con FP16/sample rate bajo, o puede quedarse sin memoria. |
| **6 GB** | Fluido para inferencia individual y por lotes. | Posible con batch size bajo (`2–4`) y precisión FP16. |
| **8 GB** | Sin esfuerzo para inferencia y conversión por lotes. | Bueno para entrenar a `32k` / `40k` / `48k` con batch sizes medios (`4–8`). |
| **12 GB+** | Fluido incluso junto con otras aplicaciones. | **Ideal**: batch sizes cómodos (`8–16+`), épocas más rápidas y entrenamiento a `48k` sin errores de memoria. |

## 3. Almacenamiento, RAM y Red

### Desglose de espacio en disco

- **Archivo de descarga**: ~**5.00 GB** (`ILARIA_RVC-2.4.7.zip`). Deja espacio tanto para el ZIP como para la carpeta extraída al instalar.
- **App extraída**: ~**10–15 GB** (incluye runtime PyTorch/CUDA, **ContentVec** y **RMVPE**).
- **Espacio extra si aplica**:
  - `runtime-cu126` (solo Maxwell/Pascal/Volta): varios GB adicionales descargados en el primer inicio.
  - Embedders opcionales (**Other → Download embedders**) y pares pretrained G/D.
  - **Checkpoints de entrenamiento** (`app/logs/`) y **datasets** (`app/datasets/`): cada entrenamiento puede ocupar **2–10+ GB** según la frecuencia de guardado.
- **SSD recomendado**: extraer, cargar modelos y leer datasets durante el entrenamiento es mucho más rápido en SSD NVMe/SATA que en HDD mecánico.

### RAM del sistema

- **8 GB de RAM** bastan para convertir clips cortos si cierras programas pesados en segundo plano.
- **16 GB+ de RAM** son muy recomendables para **entrenamiento**, **preprocesamiento de audio**, **creación de índices FAISS** y uso de **Audio Analyzer** con varios archivos.

### Conexión a internet

- **Necesaria** para: descargar el ZIP, descargar CUDA 12.6 en el primer inicio en Maxwell/Pascal/Volta, bajar embedders/pretraineds opcionales, importar modelos desde Hugging Face/Google Drive/MEGA o buscar actualizaciones (**2.4.0 → 2.4.1**).
- **No necesaria** para: ejecutar inferencia o entrenamiento una vez descargados los runtimes y modelos.

## 4. Analiza tu PC automáticamente

Ilaria RVC incluye un asistente en **Other → PC training advisor**:

1. Elige **Sample rate to plan for**, **Precision to evaluate** y **GPU to evaluate**.
2. Haz clic en **Scan PC and suggest settings**.
3. Revisa **PC Advisor Log** para ver ajustes iniciales recomendados (precisión, batch size) y comprueba el uso real de VRAM en una prueba corta.
