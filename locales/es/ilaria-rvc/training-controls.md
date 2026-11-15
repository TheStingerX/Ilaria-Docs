---
label: "⚙️ Controles de entrenamiento y flujo de trabajo"
order: 87
permalink: /ilaria-rvc/training-controls/
---
# Controles de entrenamiento y flujo de trabajo

## Cuatro etapas

 | Etapa | Entradas | Verificar antes de continuar |
| --- | --- | --- |
 | Datos de proceso | Ruta del conjunto de datos, velocidad, nombre del experimento y subprocesos de CPU | Importación completada, se leyó audio utilizable y los registros pertenecen al experimento previsto. |
 | Extracción de funciones | Audio preparado, guía de tono, extractor e incrustador de entrenamiento | La etapa se completó con la configuración esperada. |
 | Train Pth | Funciones, par G/D, objetivo, GPU, lote y precisión | Se escriben los avances del progreso y los puntos de control periódicos. |
 | Entrenar índice de características | Características extraídas y algoritmo de índice | El índice generado pertenece a esta ejecución y se puede combinar con su exportación de inferencia. |

## Arquitectura y performance

La versión 2.1.0 ofrece configuraciones de 32, 40 y 48 kHz con combinaciones disponibles determinadas por el vocoder. HiFi-GAN y RefineGAN tienen restricciones diferentes. Verifique el par compatible antes del preprocesamiento. La guía de tono controla si las características F0 condicionan el modelo. Configure subprocesos de CPU para la máquina y seleccione una GPU NVIDIA compatible para el entrenamiento. FP32 es el valor predeterminado en la interfaz de usuario marcada. FP16 puede reducir la presión de la memoria en el hardware compatible. El tamaño del lote controla cuántas muestras se procesan juntas. Si se agota la VRAM, reduzca el lote y desactive el almacenamiento en caché opcional.

**Archivos de entrenamiento silenciosos** controla cuántos ejemplos silenciosos incluye la aplicación. Compare las mismas pausas prolongadas al evaluar un cambio. **Algoritmo de índice** ofrece Auto, Faiss y KMeans. Conserve el índice generado con su modelo coincidente y mantenga desactivada la recuperación cuando evalúe el punto de control solo.

## Objetivos de época y paso

Una época cubre una iteración sobre el conjunto de datos preparado. El modo por pasos apunta a un recuento total de actualizaciones por lotes y admite la reanudación dentro de una época. El almacenamiento en caché del conjunto de datos de GPU debe estar desactivado en el modo por pasos en esta versión. La frecuencia de guardado se mide en épocas incluso cuando se utiliza un objetivo de paso. Utilice un objetivo por encima del progreso ya completado al extender una carrera. Vale la pena probar más pasos cuando mejora el audio retenido comparable.

## Mantener un registro reproducible

Registre la revisión del conjunto de datos, la frecuencia de muestreo, el codificador, el extractor, el vocoder, los preentrenamientos, la precisión, el tamaño del lote y guarde la cadencia. Si reutiliza el mismo nombre con una tarifa incompatible, la interfaz de usuario puede informar la discrepancia. Inicie un experimento independiente para una nueva configuración y mantenga el experimento anterior disponible para comparar.
