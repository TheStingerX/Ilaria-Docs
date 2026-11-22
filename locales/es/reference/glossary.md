---
label: "Glosario"
icon: ":book:"
order: 94
permalink: /glossary/
description: "Consulte Fundamentos de RVC, Modelos y archivos y Capacitación] para conocer estos términos en contexto."
---
# Glosario

[Descarga Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

 | Término | Significado |
| --- | --- |
 | Inferencia | Uso de un modelo entrenado para convertir una grabación. |
 | Punto de control | Archivo que contiene los pesos del modelo aprendido. Los puntos de control de reanudación y las exportaciones de inferencias tienen diferentes funciones. |
 | Embedder | Componente que extrae una representación del audio fuente para el motor de conversión. |
 | Índice | Colección opcional de vectores de características aprendidas utilizados durante la recuperación. |
 | Relación de índice | Con qué intensidad una implementación utiliza las funciones recuperadas durante la conversión. |
 | F0 | Frecuencia fundamental, utilizada para representar el tono a lo largo del tiempo. |
 | Extractor de tono | Algoritmo que estima F0 a partir de una grabación. |
 | Semitono | Un duodécimo de octava. Un cambio de 12 semitonos es una octava. |
 | Vocoder | La parte de la tubería que genera la forma de onda a partir de sus entradas condicionantes. |
 | Frecuencia de muestreo | El número de muestras de audio por segundo. Es distinto de la versión del modelo y la transposición de tono. |
 | Preentrenamiento | Pesos iniciales utilizados al entrenar un nuevo modelo. |
 | Época | Una pasada por el conjunto de datos de entrenamiento en la configuración de entrenamiento habitual. |
 | Paso | Una actualización del entrenamiento. El tamaño del lote y el tamaño del conjunto de datos afectan la relación entre pasos y épocas. |
 | Tema | Una parte aislada de una mezcla, típicamente vocal o instrumental. |
 | Latencia | El tiempo entre un evento de entrada y su salida audible. |

Consulte [Fundamentos de RVC](../start/rvc-fundamentals.md), [Modelos y archivos](../start/models.md) y [Capacitación](../model-training/training.md)] para conocer estos términos en contexto.

## Controles de Ilaria RVC

Estas entradas están adaptadas del glosario integrado en Ilaria RVC. Los controles disponibles pueden variar según la versión.

 | Control | Significado |
| --- | --- |
 | Modelo de voz | Selecciona un punto de control de inferencia y busca su índice coincidente. |
 | Actualizar | Vuelve a escanear la biblioteca de modelos. Verifique su selección nuevamente después. |
 | Descargar voz de VRAM | Libera recursos de inferencia para liberar memoria de GPU para otras tareas. |
 | ID de altavoz | Selecciona una ranura de voz dentro del modelo cargado. Utilice 0 para un modelo típico de un solo altavoz. |
 | RMVPE y FCPE | Extractores de tono que estiman F0 en el tiempo. |
 | ContentVec / HuBERT | ContentVec es un codificador de contenido estilo HuBERT que se utiliza en flujos de trabajo RVC estándar. Haga coincidir el codificador utilizado en el entrenamiento. |
 | Mezcla de envolvente de volumen | Establece qué tan cerca la dinámica de salida sigue a la fuente. |
 | Proteger | Reduce la influencia de la recuperación en las consonantes y respiraciones sordas. Un valor más bajo proporciona una protección más fuerte. Un valor de 0,5 lo desactiva. |
 | Remuestreo | Ajusta la tasa de salida. Un valor de 0 mantiene la tasa de producción del modelo. |
 | Procesar datos | Prepara, vuelve a muestrear y corta grabaciones. Ilaria RVC ajusta el nivel de cada corte durante esta etapa. |
 | Extracción de características | Calcula las características del contenido y la información de tono para modelos guiados por tono. |
 | Comprobador de conjunto de datos | Señala posibles recortes, pausas largas, archivos ilegibles y diferencias de nivel sin editar la fuente. |
 | Vistas previas de entrenamiento | Convierta la misma grabación de referencia breve en varias épocas para compararla de oído. |
 | Generador y discriminador | El generador aprende a sintetizar audio y el discriminador proporciona retroalimentación. Su par de puntos de control G/D se utiliza para reanudar el entrenamiento. |
 | Detener y guardar | Solicita un punto de control reanudable. Espere la confirmación antes de cerrar. |
 | Épocas totales | Objetivo de época final, incluidas las épocas completadas antes de reanudarse. |
 | Información del modelo | Muestra las propiedades de los puntos de control almacenados, como velocidad, guía de paso y precisión, cuando estén disponibles. |
 | Fusionar modelos | Combina pesos de inferencia compatibles. Comience a probar la voz fusionada con la recuperación deshabilitada. |
 | FP16 y FP32 | Formatos de precisión numérica. La precisión del peso en una exportación describe el archivo almacenado. |

> Los checkpoints HuBERT genéricos no se recomiendan como codificador predeterminado para conversión de voz. Se entrenan para representar el habla y pueden conservar el timbre de origen en el audio convertido. Usa el codificador previsto por el modelo RVC, como ContentVec si se entrenó con él.

Consulte [Conversión de voz](../conversion/voice-conversion.md) y [Capacitación](../model-training/training.md)] para conocer los flujos de trabajo que utilizan estos controles.
