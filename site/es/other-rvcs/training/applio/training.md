# Entrene, evalúe y exporte una voz en Applio

Una primera ejecución demuestra que sus grabaciones, configuración y hardware pueden producir una exportación con la que puede convertir. Trabaje en grabaciones copiadas para las que tenga permiso. Mantenga dos o tres frases fuera de la carpeta de entrenamiento para que pueda verificar el comportamiento en grabaciones que el modelo nunca haya visto.

## Prepare las entradas

1. Cree un nombre de experimento breve y reconocible, como `speaking_trial_01`. Mantenga las pruebas preliminares con sus propios nombres para que pueda encontrar puntos de control posteriores.
2. Consulta de oído las grabaciones al principio, a la mitad y al final. Elimina clips con otro altavoz, música, recortes o secciones largas y silenciosas. Si Desktop tiene herramientas de revisión de conjuntos de datos, inspeccione los clips marcados y prepare una copia de capacitación allí. Recortar el silencio y ajustar el nivel no puede reparar la distorsión audible.
3. Seleccione el conjunto de datos copiado en **Entrenamiento**. Si Gradio solicita una ruta de carpeta, use una en la máquina que ejecuta el motor. Para un flujo de trabajo de varios altavoces compatible, conserve carpetas numéricas como `0` y `1` y registre a qué persona representa cada ID.
4. Elija un codificador de voz y una frecuencia de muestreo compatibles juntos. Seleccione un par de generador/discriminador compatible si utiliza el entrenamiento previo. Tasa de coincidencia, orientación de tono, arquitectura y requisitos de inserción del editor. Registre el incrustador exacto y cualquier archivo personalizado para realizar inferencias más adelante.
5. Elija un tamaño de lote que se ajuste a la memoria de la GPU y guarde algunas exportaciones intermedias. Elija un objetivo de época inicial para una prueba de canalización. Ampliarlo más tarde si las pruebas pendientes mejoran.

## Ejecutar las etapas

En Escritorio, puede elegir **Entrenamiento automático** después de revisar el conjunto de datos, la configuración del modelo, las épocas y la configuración de guardado. Inicie el trabajo una vez y siga su consola. Para controlar por separado cada etapa, utilice **Configuración de entrenamiento manual**. Gradio expone los pasos correspondientes en su espacio de trabajo **Capacitación**.

| Etapa | Qué sucede | Qué confirmar antes de continuar |
| --- | --- | --- |
| Preproceso | Applio lee el conjunto de datos, prepara clips y vuelve a muestrear para la velocidad elegida. | El registro muestra audio utilizable de la carpeta deseada. Si su compilación ofrece normalización **Post**, ajusta cada segmento después de dividirlo. Úsalo sólo cuando quieras ese tratamiento. |
| Extraer | Applio crea las características de contenido del modelo y cualquier información de paso que necesite la configuración. | Se cargó el incrustador previsto y se finalizó la extracción. Si cambia los codificadores, ejecute la extracción nuevamente para esa opción. |
| Tren | El experimento aprende características de la voz a partir de esas características. | Aparece el progreso de las épocas y el punto de control configurado o los archivos de exportación. En caso de errores de falta de memoria, detenga el trabajo de otras GPU, reduzca el tamaño del lote y considere deshabilitar el almacenamiento en caché del conjunto de datos. |
| Generar índice | Applio genera datos de recuperación opcionales del experimento. | Mantenga el índice generado con la exportación correspondiente. Si elige omitir esta etapa, deje la recuperación desactivada durante la prueba. |

Cuando una etapa falla, copie su primer error y confirme sus entradas antes de volver a ejecutarla. Si las grabaciones, la velocidad o la arquitectura cambian sustancialmente, un nuevo experimento ayuda a mantener separados los archivos incompatibles. Deténgase en tiempo real antes de iniciar el entrenamiento de la GPU de escritorio.

## Compare los puntos de control antes de elegir un ganador

Abra **Modelos → Exportar** en Escritorio, o busque el control de exportación de entrenamiento en Gradio. Guarde una inferencia `.pth` de un punto de control intermedio y uno posterior, más el índice si se genera. Para cada exportación, convierta las mismas frases retenidas con el mismo ID de altavoz, incrustación, configuración de tono y volumen. Escuche la inteligibilidad, la coherencia de la voz en sílabas suaves y fuertes y los artefactos en las respiraciones. Las métricas de entrenamiento pueden revelar un progreso fallido. Escuchar ayuda a decidir qué exportación conservar.

## Reanudar sin reconstruir el experimento

Mantenga el directorio del experimento junto con sus archivos de preprocesamiento, funciones y puntos de control de entrenamiento `G_*.pth` y `D_*.pth`. Mantenga el mismo nombre, arquitectura, tarifa e incrustador en la continuación. Elija un nuevo objetivo de época **total** superior al recuento de época completado. En Escritorio, deje desactivado **Capacitación reciente**. Verifique las primeras líneas de registro para ver qué punto de control se cargó y deténgase si la ejecución comienza de nuevo inesperadamente. La pequeña exportación de inferencia es el archivo que utiliza en el convertidor. El entrenamiento continuo requiere el estado de entrenamiento del experimento.
