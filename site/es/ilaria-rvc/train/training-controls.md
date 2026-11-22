# Controles de entrenamiento y flujo de trabajo

[Descarga Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

[Controles de entrenamiento](training-buttons.md)

> **Novedades de la 2.3.0** · MRF HiFi-GAN admite entrenamiento e inferencia. El catálogo añade 15 pares de generador y discriminador, incluidos KLM 4.4 X1 y X2 a 40 kHz. Portuguese HuBERT Base es opcional en inferencia. En el entrenamiento RVC v2 puedes cargar y guardar un HuBERT personalizado. Su configuración se conserva en el modelo exportado.

> **2.4.0** · Windows mueve la aplicación y el entorno a app/, y los modelos a models/ en la raíz. Añade Colab, Lightning AI Studio, ayuda para descargar embedders y Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). Se repara pip y se incluye pywin32.

> **2.4.3** · Añade entrenamiento nativo en precisión mixta **BF16**, seleccionado automáticamente en GPUs RTX series 30, 40 y 50 compatibles (Kaggle T4 usa FP16 por defecto). Recuerda selecciones manuales FP16/FP32, los entrenamientos existentes conservan su precisión y Training Queue y PC training advisor usan las nuevas opciones. La extracción de rasgos sigue en FP32.

## Cuatro etapas

 | Etapa | Entradas | Verificar antes de continuar |
| --- | --- | --- |
 | Datos de proceso | Ruta del conjunto de datos, velocidad, nombre del experimento y subprocesos de CPU | Importación completada, se leyó audio utilizable y los registros pertenecen al experimento previsto. |
 | Extracción de funciones | Audio preparado, guía de tono, extractor e incrustador de entrenamiento | La etapa se completó con la configuración esperada. |
 | Train Pth | Funciones, par G/D, objetivo, GPU, lote y precisión | Se escriben los avances del progreso y los puntos de control periódicos. |
 | Entrenar índice de características | Características extraídas y algoritmo de índice | El índice generado pertenece a esta ejecución y se puede combinar con su exportación de inferencia. |

## Arquitectura y performance

La versión 2.4.7 ofrece configuraciones de 32, 40 y 48 kHz con combinaciones disponibles determinadas por el vocoder. HiFi-GAN y RefineGAN tienen restricciones diferentes. Verifique el par compatible antes del preprocesamiento. La guía de tono controla si las características F0 condicionan el modelo. Configure subprocesos de CPU para la máquina y seleccione una GPU NVIDIA compatible para el entrenamiento. FP32 es el valor predeterminado en la interfaz de usuario marcada. FP16 puede reducir la presión de la memoria en el hardware compatible. El tamaño del lote controla cuántas muestras se procesan juntas. Si se agota la VRAM, reduzca el lote y desactive el almacenamiento en caché opcional.

**Archivos de entrenamiento silenciosos** controla cuántos ejemplos silenciosos incluye la aplicación. Compare las mismas pausas prolongadas al evaluar un cambio.

## Cómo funciona el algoritmo de índice

Cada opción produce un **índice de recuperación FAISS**. El selector cambia qué vectores de características extraídos van al índice, independientemente del entrenamiento del modelo de voz. Un vector de características representa un cuadro de audio corto. Los umbrales siguientes cuentan vectores, no clips, épocas o minutos.

| Opción | Qué hace Ilaria RVC | Cuándo probarlo |
| --- | --- | --- |
| **Auto** | Mantiene todos los vectores hasta **200,000**. Por encima de eso, intenta reducirlos a **10.000** centros de conglomerados. Si la agrupación falla, conserva los vectores originales. | Comience aquí para obtener un primer índice. Consulte el registro del índice de trenes para ver qué camino tomó Auto. |
| **Faiss** | Mantiene todos los vectores extraídos y construye el índice FAISS sin una pasada de reducción de KMeans. | Pruébelo cuando desee conservar ejemplos que un índice más pequeño podría promediar y tener suficiente RAM y espacio en disco. |
| **KMsignifica** | Utiliza MiniBatchKMeans para representar vectores similares con centros compartidos. Normalmente mantiene aproximadamente un centro por cada diez vectores, dentro de un rango de **39 a 10 000** centros y siempre menos que el recuento de entrada. Mantiene todos los vectores para entradas de **39 o menos** e informa un error de agrupación en lugar de retroceder silenciosamente. | Compáralo cuando quieras un índice más pequeño. La pasada de agrupación requiere trabajo adicional y el índice reducido puede perder detalles finos. |

Un índice más pequeño suele ser más ligero de almacenar. No garantiza una compilación más rápida o una mejor conversión. La agrupación en clústeres aún requiere cargar las funciones extraídas. Si Auto recurre a un conjunto de datos grande, la compilación a partir de todos los vectores aún puede quedarse sin memoria.

### Compara resultados antes de elegir

1. Finalice **Extracción de funciones** y luego ejecute **Train Index**. Consulte el registro para conocer el recuento de vectores o centros. Haga una copia del índice resultante antes de generar un segundo con otra configuración.
2. Utilice la misma inferencia `.pth` y una grabación limpia y reservada. Establezca **Relación de índice** en cero primero para escuchar solo el punto de control. El índice es opcional para la conversión.
3. Compare los dos índices coincidentes con la misma **Proporción de índice** distinta de cero, con el tono y los efectos mantenidos constantes. Escuche consonantes claras, vocales sostenidas, sonidos inusuales y cuánto carácter de voz objetivo se conserva. Mantenga el que suene mejor en varios clips.
4. Mantenga el índice elegido con el modelo y la configuración de funciones que lo produjo. Si cambia el algoritmo, reconstruya el índice a partir de las funciones compatibles existentes. Si cambia el integrador de entrenamiento, extraiga las características coincidentes para ese experimento en lugar de reutilizar el índice anterior.

## Objetivos de época y paso

Una época cubre una iteración sobre el conjunto de datos preparado. El modo por pasos apunta a un recuento total de actualizaciones por lotes y admite la reanudación dentro de una época. El almacenamiento en caché del conjunto de datos de GPU debe estar desactivado en el modo por pasos en esta versión. La frecuencia de guardado se mide en épocas incluso cuando se utiliza un objetivo de paso. Utilice un objetivo por encima del progreso ya completado al extender una carrera. Vale la pena probar más pasos cuando mejora el audio retenido comparable.

## Mantener un registro reproducible

Registre la revisión del conjunto de datos, la frecuencia de muestreo, el codificador, el extractor, el vocoder, los preentrenamientos, la precisión, el tamaño del lote y guarde la cadencia. Si reutiliza el mismo nombre con una tarifa incompatible, la interfaz de usuario puede informar la discrepancia. Inicie un experimento independiente para una nueva configuración y mantenga el experimento anterior disponible para comparar.

[Estimador de VRAM y entrenamiento](../../reference/vram-estimator.md)
