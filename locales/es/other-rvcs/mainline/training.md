---
label: "Entrene y exporte un modelo"
icon: ":test_tube:"
order: 20
permalink: /ilaria-rvc/mainline/training/
description: "Comience con un solo altavoz y un nuevo nombre de experimento. La capacitación produce un modelo que puede probar en nuevas actuaciones en la interfaz de inferencia."
---

# Entrene y exporte un modelo RVC de línea principal

Comience con un solo altavoz y un nuevo nombre de experimento. La capacitación produce un modelo que puede probar en nuevas actuaciones en la [interfaz de inferencia](inference.md). Mantenga el audio sin procesar y el registro del experimento para que pueda reproducir el resultado.

## Prepare los archivos

1. Coloque las grabaciones de voz limpias en una carpeta local como `C:\RVC\datasets\voice_a`. Mantenga copias de seguridad en otro lugar. Utilice grabaciones con las que tenga permiso para entrenar. Comprueba que puedes reproducir varios archivos y que contienen la voz deseada sin música de fondo ni altavoces no relacionados.
2. Mantenga una o dos grabaciones breves de diferentes frases fuera del conjunto de datos. Utilícelos como entradas de prueba para cada punto de control. Para un conjunto de datos destinado a cantar, asegúrese de tener material con el rango vocal relevante y pruebe con una voz aislada.
3. Si instaló desde el código fuente, abra el mismo entorno utilizado para ejecutar WebUI y obtenga los pesos previamente entrenados y los recursos de silencio correspondientes. Es posible que las versiones empaquetadas ya los contengan.

```text
hf download lj1995/VoiceConversionWebUI --include "pretrained/*" "pretrained_v2/*" --local-dir assets
hf download lj1995/VoiceConversionWebUI mute.zip --local-dir .model-downloads
python -m zipfile -e .model-downloads/mute.zip logs
```

Consulte [preparación del conjunto de datos](../../model-training/dataset-preparation.md) para obtener detalles sobre el registro y la limpieza.

## Configure el experimento y procese el audio

1. Abra **Train**. Utilice un nombre nuevo como `voice_a_v2_40k` para que RVC WebUI (Mainline - Original RVC) cree una carpeta separada en `logs/`.
2. Elija una frecuencia de muestreo objetivo y una versión de arquitectura compatible con su versión. V2 es un punto de partida razonable cuando planea utilizar un cliente de inferencia V2 compatible. La guía de velocidad, arquitectura y tono debe coincidir con los preentrenamientos del generador y del discriminador. Utilice la guía de tono para un modelo de voz normal guiado por tono.
3. Seleccione un conjunto de datos de un solo hablante, donde la compilación ofrezca una opción. Utilice el ID de altavoz `0` para la primera ejecución. Pegue la ruta completa de la carpeta del conjunto de datos y luego haga clic en **Procesar datos** o el botón de preprocesamiento equivalente.
4. Espere a que finalice el preprocesamiento. Revise las advertencias en el resultado y verifique que el experimento haya producido audio procesado. Si la ejecución no produce nada, verifique la ruta y pruebe si los archivos de audio incluidos se decodifican. Solucione esto antes de comenzar la extracción.

Para un experimento con varios altavoces en una compilación con **Ayudante de conjunto de datos para varios altavoces**, mantenga los archivos de cada altavoz separados y asigne ID de altavoz estables. Verifique el manifiesto generado y use esos mismos ID más adelante durante la conversión. Primero complete un pase de un solo orador para tener una base de trabajo.

## Extraer tono y características

1. Elija el índice de GPU que se muestra en la interfaz. Para una GPU, el ID suele ser `0`. Los campos del dispositivo para diferentes operaciones pueden estar separados. Copie las identificaciones disponibles en lugar de asumir una ranura específica.
2. Seleccione un extractor de tono que la compilación pueda ejecutar. Si hay una opción GPU RMVPE disponible y funciona en su sistema, comience allí. Una opción de CPU puede ayudar a aislar un problema de backend. La extracción de funciones también requiere los activos compartidos de HuBERT instalados en [setup](installation.md).
3. Ejecute **Extracción de características** y espere a que finalicen las etapas de presentación requerida y de características de contenido. Si una etapa no registra archivos utilizables, deténgala y corrija la causa. Cambiar el conjunto de datos, la versión del modelo o la tasa objetivo cambia el experimento. Utilice un nuevo nombre de experimento al comparar configuraciones incompatibles.

> Los checkpoints HuBERT genéricos no se recomiendan como codificador predeterminado para conversión de voz. Se entrenan para representar el habla y pueden conservar el timbre de origen en el audio convertido. Usa el codificador previsto por el modelo RVC, como ContentVec si se entrenó con él.

## Entrena y guarda puntos de control

1. Consulta los campos generador y discriminador en el panel de formación. Deben hacer referencia a un par coincidente para la versión, frecuencia de muestreo y modo de tono que seleccionó. Si un registro dice que se omitieron los archivos, asegúrese de estar entrenando con la configuración prevista antes de continuar.
2. Comience con un lote que se ajuste a la memoria y deje desactivado el almacenamiento en caché del conjunto de datos para la primera prueba. Si la GPU se queda sin memoria, detenga el trabajo fallido y reduzca el tamaño del lote. Evite ejecutar una conversión en vivo junto con la primera ejecución de entrenamiento.
3. Establezca un objetivo de prueba finito y un intervalo que guarde múltiples puntos de control que pueda comparar más adelante. Si desea que los modelos intermedios estén listos para la inferencia, habilite las exportaciones de modelos pequeños en el momento de guardar, cuando esté disponible. Mantener solo los puntos de control de capacitación más recientes ahorra espacio, pero limita la reanudación desde versiones anteriores.
4. Haga clic en **Modelo de tren**. Observe el estado del experimento y confirme los avances del registro de entrenamiento a lo largo de las épocas. Utilice el control de detención de la aplicación cuando esté disponible y espere a que termine de escribir archivos antes de cerrar el proceso.

Las curvas de entrenamiento revelan si el trabajo se está ejecutando o genera errores. Elija el modelo final convirtiendo las mismas grabaciones de prueba con varias exportaciones de inferencia guardadas. Compara palabras, consonantes, pausas y notas difíciles en un volumen similar. Más épocas pueden ayudar, estabilizar o empeorar los resultados según el conjunto de datos.

## Compilación, prueba y copia de seguridad

1. Haga clic en **Entrenar índice de características** después de una extracción exitosa si desea un índice de recuperación. Busque el `added_*.index` completo en el resultado del experimento, con una copia visible o un enlace si lo proporciona su compilación. Omita la recuperación si solo desea evaluar el punto de control en sí.
2. Busque el pequeño modelo exportado en `assets/weights/`. Si solo tiene un punto de control del generador, use **ckpt Processing** y la herramienta de extracción de modelo pequeño, proporcionando la tasa coincidente, el indicador de tono y la versión. Actualice la lista de modelos en inferencia y seleccione la exportación pequeña.
3. Convierta un clip retenido con una tasa de índice cero. Una vez que eso funcione, pruebe el índice poblado correspondiente. Guarde ambas salidas para compararlas.
4. Haga una copia de seguridad del modelo de inferencia pequeña y su índice coincidente para usarlo o compartirlo. Conserve la carpeta del experimento, incluidas las coincidencias `G_*.pth` y `D_*.pth`, la configuración y los registros, si planea reanudar el entrenamiento.

| Síntoma | Dónde buscar |
| --- | --- |
| El preprocesamiento finaliza sin audio | Verifique la ruta del conjunto de datos, los permisos, los formatos admitidos y si los archivos WAV se abren fuera de RVC. |
| Se detiene la extracción de funciones | Identifique si falló la extracción de contenido o tono. Verifique los recursos del modelo y pruebe un backend compatible. |
| El entrenamiento comienza y luego se queda sin VRAM | Reduzca el tamaño del lote, desactive el almacenamiento en caché y libere VRAM antes de volver a intentarlo. |
| La inferencia falla con un punto de control | Confirme que seleccionó un modelo de inferencia exportado. Pruebe un punto de control que funcione conocido con la misma entrada y sin índice. |
| La generación de índice no encuentra características | Revise la extracción de características exitosa para el mismo experimento. Verifique la versión y los nombres de las carpetas antes de intentar reutilizar archivos. |
