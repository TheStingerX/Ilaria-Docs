---
label: "Historial de versiones y diferencias de versiones"
icon: ":clock3:"
order: 81
permalink: /ilaria-rvc/version-history/
description: "La última versión para Windows es la 2.4.6. Verifica tu versión instalada en Otro → Actualizar Ilaria RVC y consulta las notas de cada lanzamiento."
---
# Historial de versiones y diferencias de versiones

[Descarga Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

## ¿Qué versión describe esta documentación?

La última versión para Windows es la **2.4.6**. Verifique su versión instalada en **Otro → Actualizar Ilaria RVC**. Utilice **Todos los cambios hasta ahora** allí para explorar las notas de cada versión, incluso sin conexión.

## Todas las versiones

 | Versión | Aspectos destacados |
| --- | --- |
| 2.4.6 | Añade **KLM Vocal ContentVec** (`klm-vocal-contentvec`) como descarga opcional para Inferencia y Entrenamiento RVC v2, y añade **43 pares G/D KLM verificados** en **Recommended pretrained models** con sus sample rates (la compatibilidad de entrenamiento varía por par). Desde **2.4.5**, abre **Other → Update Ilaria RVC → Check for updates** y elige **Download and restart**. |
| 2.4.5 | Añade la conversión de modelos `.pth` ↔ `.safetensors` en **Other → Convert model weights**, conservando los metadatos RVC e incluyendo el botón **Move .pth to models**. Mejora el mensaje en Inferencia para archivos sin configuración de voz e instala `safetensors` automáticamente en el primer uso. Desde **2.4.4**, abre **Other → Update Ilaria RVC → Check for updates** y elige **Download and restart**. |
| 2.4.4 | Elimina las seis opciones de descarga pretrained Legacy Core de Lyery tras la retirada de los archivos originales (los pesos ya descargados siguen disponibles para entrenar). Requiere **2.4.2** o posterior. |
| 2.4.3 | Añade entrenamiento nativo con precisión mixta **BF16**, seleccionado automáticamente en GPUs NVIDIA RTX series 30, 40 y 50 cuando todas las GPUs elegidas lo soportan (Kaggle T4 usa FP16 por defecto). Recuerda selecciones manuales de `FP16` y `FP32`, conserva la precisión de entrenamientos existentes salvo cambio explícito, actualiza Training Queue y PC training advisor y mantiene la extracción de rasgos en `FP32` y el formato estándar de exportación RVC. Requiere **2.4.2** primero desde **Other → Update Ilaria RVC**. |
| 2.4.2 | Añade **RMVPE cuDNN recovery** para recuperarse limpiamente de errores cuDNN de extracción de pitch en inferencia y preprocesamiento. Actualiza desde **2.4.1** mediante **Other → Update Ilaria RVC**. |
| 2.4.1 | Añade la síntesis local opcional Kokoro v1.0 con 54 voces, incluidas Sara y Nicola en italiano. Aclara los requisitos de los motores TTS, corrige la ruta de los pesos RMVPE y oculta mensajes INFO detallados de HuBERT sin ocultar avisos ni errores. Instala e inicia primero la 2.4.0. Abre **Other → Update Ilaria RVC** e instala la **2.4.1** cuando aparezca. |
| 2.4.0 | Windows mueve la aplicación y el entorno a app/, y los modelos a models/ en la raíz. Añade Colab, Lightning AI Studio, ayuda para descargar embedders y Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). Se repara pip y se incluye pywin32. |
| 2.3.0 | RMVPE High Register añade modos, límites de detección y un gráfico comparativo de F0 para notas agudas. ElevenLabs se incorpora a TTS. Introduce tu clave API de ElevenLabs, elige una voz y prueba una frase breve. MRF HiFi-GAN admite entrenamiento e inferencia. El catálogo añade 15 pares de generador y discriminador, incluidos KLM 4.4 X1 y X2 a 40 kHz. Portuguese HuBERT Base es opcional en inferencia. En el entrenamiento RVC v2 puedes cargar y guardar un HuBERT personalizado. Su configuración se conserva en el modelo exportado. |
| 2.2.2.1 | Actualización intermedia que prepara la compilación actualizada de la 2.2.2 para la 2.3.0. |
| 2.2.2 | Activa la carga restringida de PyTorch para modelos de voz, herramientas de modelos, exportación ONNX y pesos de entrenamiento. El ZIP de Windows incluye Python 3.10 y PyTorch 2.10.0 con CUDA 12.8. Las GPU NVIDIA antiguas usan el entorno descargable CUDA 12.6. Se corrigen la decodificación con PyAV y la exportación WAV y se muestra el progreso al escribir segmentos. El cuaderno Kaggle 2.2.2 instala PyTorch y TorchAudio 2.10.0 con CUDA 12.8. |
| 2.2.1 | El reproductor con forma de onda incluye un control de volumen para entradas, resultados y vistas previas. Úsalo para escuchar más bajo o comparar fragmentos a niveles similares. Solo afecta a la reproducción. Para cambiar el nivel del archivo convertido, ajusta Gain en Post-Process y vuelve a convertir. |
| 2.2.0 | Añade inferencia y entrenamiento en Windows para NVIDIA GeForce RTX serie 50 (Blackwell), con PyTorch 2.7.1 y CUDA 12.8. El iniciador prepara el entorno en el primer arranque y verifica las operaciones CUDA; requiere Internet y espacio libre. Las demás GPU conservan su entorno. También se actualizan ContentVec, la reanudación y STFT. |
| 2.1.2 | Se unificaron las etiquetas de la cabecera: **Ilaria’s Ko-Fi Shop**, **Ilaria’s RVC Website** e **Ilaria’s Docs**. |
| 2.1.1 | Se añadió un botón con un corazón para Ilaria Docs junto al enlace al sitio web. |
| 2.1.0 | Se agregó el botón del sitio web, métricas del panel en vivo para la ejecución activa y un mejor comportamiento de inicio y actualización en TensorBoard integrado. |
 | 2.0.0 | Se presentó el Panel de capacitación, TensorBoard integrado, informes de diagnóstico y vistas previas de 12 segundos del Comprobador de conjuntos de datos. Los integradores opcionales se convirtieron en descargas individuales. |
 | 1.9.3 | Se introdujo el procesamiento de audio avanzado, cinco formatos de exportación de inferencias, integradores configurables e instalación personalizada de HuBERT. |
 | 1.9.2 | Se agregaron enlaces públicos de Google Drive y MEGA al descargador de modelos de voz. |
 | 1.9.1 | Se agregaron comprobaciones de frecuencia de muestreo al reutilizar el nombre de un experimento, evitando una falla del entrenamiento en configuraciones incompatibles. |
 | 1.9.0 | Se agregó FCPE, importaciones de modelos transmitidas con cancelación, una pestaña Otros reorganizada y notas de la versión sin conexión ampliables. |
 | 1.8.1 | Sonidos de prueba y finalización actualizados conservando el sonido de error de Windows. |
 | 1.8.0 | Se introdujo el iniciador de consola oculta, el control de reinicio de la interfaz de usuario, el analizador de audio y un diseño de carpeta compartida para modelos y sus índices. |
 | 1.7.2 | Se corrigió la conversión sin índice y archivos de salida con nombre único y por lotes después de la voz seleccionada. |
 | 1.7.1 | Se suprimió un rastreo específico de cierre de conexión de Windows y al mismo tiempo se conservaron otros mensajes de error. |
 | 1.7.0 | Se agregó Edge y Windows TTS fuera de línea, reproductores de formas de onda y preparación en segundo plano para la extracción de tono y modelos predeterminados compatibles. |
 | 1.6.0 | Se agregó la cola de entrenamiento persistente, objetivos de pasos exactos, opciones RefineGAN y Spin-v2, descargas emparejadas previamente entrenadas, más extractores de tono y exportación ZIP. |
 | 1.5.2 | Se mejoraron los diagnósticos de lanzamiento duplicado y se verificó la disponibilidad del conjunto de datos antes de cada etapa de entrenamiento. |
 | 1.5.1 | Preprocesamiento bloqueado mientras una importación de conjunto de datos estaba activa o la ruta del conjunto de datos no se podía utilizar. Se agregó el panel del historial de cambios sin conexión. |
 | 1.5.0 | Se introdujo la importación y administración de conjuntos de datos mediante arrastrar y soltar, el asesor de capacitación para PC y alertas opcionales de finalización y error. |
 | 1.4.0 | Se agregaron vistas previas de entrenamiento, detener y guardar reanudables y el Comprobador de conjuntos de datos. |
 | 1.3.0 | Validé la ruta de actualización desde 1.2, mostré la versión instalada en la consola y preparé un paquete de Windows más pequeño. |
 | 1.2.0 | Se agregó el actualizador integrado con verificación y recuperación, selección de entrenamiento FP32/FP16 e información del modelo. |
 | 1.1 Beta | Se presentó la interfaz temática, el flujo de trabajo de capacitación numerado, la conversión de arrastrar y soltar, la coincidencia automática de índices, la importación y fusión de modelos y el glosario de aplicaciones. |


Si un botón o un backend difieren en su compilación, compare sus notas de la versión antes de asumir una instalación fallida.
