---
label: "Controles de entrenamiento explicados"
icon: ":level_slider:"
order: 82
permalink: /ilaria-rvc/training-buttons/
---

# Cada control de entrenamiento explicado

[Descarga Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

El entrenamiento crea un nuevo modelo de voz a partir de las grabaciones. Para un primer experimento, utilice un nombre único, un conjunto de datos pequeño y limpio y un par previamente entrenado compatible. Mantenga una grabación fuera del conjunto de datos para poder escuchar el modelo en un clip que nunca haya visto. Comience con el [flujo de trabajo de capacitación](training-workflow.md) si desea seguir los pasos en orden.

## Diseño de nombre, audio y modelo

| Control | Qué hace y cuándo usarlo |
| --- | --- |
| `Model Name` | Identifica su experimento y sus archivos guardados. Utilice un nuevo nombre para un nuevo conjunto de datos o una configuración incompatible. Para reanudar, utilice el nombre original con su configuración original. Un marcador de posición en el cuadro vacío es un ejemplo. |
| `Path to Dataset` | Carpeta que la aplicación lee para entrenar. Después de cargar, verifique la ruta actualizada antes de presionar Procesar datos. |
| `Drop dataset audio files or a ZIP` | Importa grabaciones a la biblioteca de conjuntos de datos de la aplicación. Espere a que finalice el registro de importación del conjunto de datos antes de procesar. |
| `Manage datasets` | Actualizar conjuntos de datos recarga la lista. El conjunto de datos a eliminar selecciona un elemento importado. Eliminar el conjunto de datos seleccionado elimina ese elemento importado. Primero verifique el nombre y guarde una copia separada de sus originales. El registro de eliminación del conjunto de datos informa lo sucedido. |
| `Sample Rate` | Elige la frecuencia de entrenamiento del modelo, 32, 40 o 48 kHz cuando sea compatible. Haga coincidir la arquitectura y el par G/D. Aumentar el precio no puede restaurar los detalles que faltan en sus grabaciones. |
| `Pitch Guidance` | Le da al generador una pista de tono estimada durante el entrenamiento. Utilice el valor predeterminado para un modelo típico y haga coincidir el par previamente entrenado. Desactivarlo cambia lo que espera el modelo. |
| `CPU Threads` | Controla cuánto paralelismo de CPU utiliza la etapa de preparación o extracción. Redúzcalo si el preprocesamiento agota la RAM del sistema o inutiliza la PC. |
| `Vocoder` | Selecciona el generador de forma de onda. Comience con HiFi-GAN a menos que tenga un motivo compatible para elegir RefineGAN. En esta compilación, el entrenamiento de RefineGAN necesita RVC V2 a 32 kHz con guía de tono. |
| `Embedder Model` | Elige las funciones de contenido utilizadas por el formador. La capacitación expone ContentVec y Spin-v2. Cambiarlo requiere características extraídas nuevas y un experimento compatible. Utilice el codificador coincidente en la inferencia. |
| `Silent training files` | Establece cuántos ejemplos silenciosos incluye el experimento. Compara las mismas pausas naturales si lo cambias. |
| `Index Algorithm` | Elige si conservar todos los vectores de características o agruparlos antes de crear el índice de recuperación. Consulte [Auto, Faiss y KMeans](training-controls.md). |
| `Speaker ID` | Elige el número de altavoz adjunto a los datos. Deje el valor predeterminado para un primer modelo de un solo altavoz. |
| `Pitch extraction algorithm` | Estima el tono de las partes sonoras. Comience con RMVPE. Compare alternativas en el mismo material cuando el seguimiento del tono sea el problema real. |

## Cuánto tiempo entrenar y qué guardar

| Control | Qué cambia |
| --- | --- |
| `Training Precision` | FP32 utiliza precisión total. FP16 puede guardar VRAM en hardware compatible. Mantenga la precisión original al comparar o reanudar una ejecución. |
| `GPU IDs` y `GPU Information` | Lea los dispositivos enumerados antes de ingresar las ID. Una lista como 0-2 significa GPU 0 y 2. Los controles de preparación separados pueden usar una lista de dispositivos diferente a la del entrenamiento. |
| `Batch Size` | Número de ejemplos agrupados para una actualización. Redúcelo si te quedas sin memoria de la GPU. Consulte el Registro de entrenamiento para conocer el lote efectivo, especialmente en [Kaggle](../cloud/kaggle.md). |
| `Training Target`, `Total Epochs`, `Total Steps` | El recuento de épocas pasa por el conjunto de datos preparado. Los pasos cuentan actualizaciones. El objetivo es el total que desea alcanzar, incluida cualquier parte ya completada. |
| `Save frequency` | Controla el intervalo entre guardados en épocas. Elija un intervalo que le permita comparar varias instantáneas sin llenar la unidad. |
| `Save last ckpt as final Model` | Selecciona el comportamiento de retención del último punto de control. Guarde las instantáneas anteriores si desea compararlas o volver a ellas y tiene espacio. |
| `Create model at save frequency` | Produce exportaciones de inferencias con la cadencia de guardado seleccionada para que pueda escuchar modelos intermedios. Mantenga el par G/D y el estado del experimento por separado si desea continuar. |
| `Cache data to GPU` | Almacena los datos preparados en VRAM. Déjelo desactivado para una primera prueba si la memoria es escasa y para una ejecución paso a paso cuando sea necesario. |
| `Pretrained model (G + D)` | Elige un par de generador y discriminador compatible. Actualice la lista previamente entrenada después de descargar un par. El registro previamente entrenado explica la selección. Al elegir Ninguno, se comienza sin pesas previamente entrenadas. |

## Los cuatro botones numerados

1. **Datos de proceso** leen el conjunto de datos, prepara cortes y vuelve a muestrear la configuración de entrenamiento seleccionada. Lea el registro previo al proceso antes de continuar.
2. **Extracción de funciones** extrae la representación y, cuando está habilitado, el tono. Verifique el registro de extracción de funciones para ver fallas y nombres de activos.
3. **Train Index** crea el índice de recuperación opcional a partir de funciones extraídas compatibles. El modelo se puede convertir sin él. Conserve el índice con su voz correspondiente.
4. **Train Pth** inicia el entrenamiento con pesas. Ver registro de entrenamiento. Para interrumpir de forma segura, haga clic en **Detener y guardar**, espere a que **Detener/Reanudar** confirme la escritura y luego descargue o haga una copia de seguridad del experimento.

## Dataset Checker, vistas previas, alertas y cola

- **Dataset Checker** lee las grabaciones seleccionadas. El umbral de silencio define lo que se considera silencio, Marcar silencia más de lo que establece la duración del informe y Advertencia de diferencia de volumen establece la diferencia de nivel a marcar. **Verificar conjunto de datos** ejecuta el análisis. Elija una grabación, establezca la hora de inicio o habilite Iniciar justo antes del silencio más largo, luego use **Cargar vista previa de 12 segundos** para escuchar el lugar afectado. Revise el registro, el estado y el audio antes de editar la fuente.
- **Las vistas previas del entrenamiento** son opcionales. Habilite **Generar vistas previas de entrenamiento**, elija una fuente de hasta 30 segundos, configure la Vista previa cada N épocas y use Vista previa de tono y Extracción de tono de vista previa para corregir la configuración de comparación. Seleccione una época de vista previa guardada y use **Actualizar vistas previas** para actualizar la lista. La vista previa del registro y el audio de vista previa del entrenamiento muestran el resultado.
- **Notificaciones de capacitación** le permite elegir alertas de escritorio y alertas sonoras de finalización o error. **Alertas de prueba** comprueba las opciones seleccionadas. Lea el registro de prueba de notificaciones si no aparece ni se reproduce nada.
- **Cola de entrenamiento** guarda la configuración actual como un trabajo. La preparación automática ejecuta datos de proceso, extracción de características y índice de entrenamiento para ese trabajo. Utilice **Iniciar cola** para comenzar y **Pausar después del modelo actual** para detener después del trabajo activo. **Actualizar cola** actualiza la pantalla. Elija un trabajo antes de **Reintentar seleccionado** o **Eliminar trabajo seleccionado**. Lea el Registro de acciones de la cola y el Registro de la cola antes de volver a intentarlo.
