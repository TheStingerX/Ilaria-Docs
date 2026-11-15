---
label: "🩺 Solución de problemas"
order: 95
permalink: /troubleshooting/
---
# Solución de problemas RVC

!!!tip
¿Es tu primera vez con RVC? **Empieza con un WAV de 10 segundos y un solo modelo.** Si la aplicación falla, busca el primer error en el registro. Si funciona pero suena mal, escucha el mismo fragmento y cambia un solo ajuste por prueba. Un checkpoint guarda el modelo o el estado del entrenamiento.
!!!

Un diagnóstico útil comienza en la primera etapa que falla. Conserve la versión de la aplicación, el primer error y una prueba reproducible. Realice un cambio a la vez y compárelo con el mismo archivo o frase hablada.

## Encuentre su síntoma

| Síntoma | Primera prueba |
| --- | --- |
| El iniciador se cierra o el navegador muestra un error de conexión | Mantenga la consola abierta y verifique la dirección local impresa por esa instancia. |
| Falta el modelo, se niega a cargar o informa que falta una clave | Confirme que el archivo es una exportación de inferencia y verifique su arquitectura e incrustación. |
| El convertidor no puede leer el archivo | Pruebe con un PCM WAV corto desde una ruta local simple. |
| La conversión funciona sin índice | Verifique que el índice pertenezca al modelo seleccionado y su representación de características. |
| La voz suena metálica, confusa o demasiado parecida a la entrada | Compara varios clips limpios y un punto de control en buen estado con los efectos y la recuperación desactivados. |
| El entrenamiento se detiene, se detiene o no produce una exportación utilizable | Identifique la etapa fallida e inspeccione el registro y los artefactos de ese experimento. |
| CUDA falla o la máquina se queda sin memoria | Distinga hardware o tiempo de ejecución no compatible, agotamiento de la memoria de la GPU y presión de la RAM del sistema. |
| El micrófono tiene retraso, espacios, silencio o eco | Pruebe la entrada física, el monitor convertido, el cable virtual y el destino por separado. |

## Establezca una línea de base

1. Grabe de 10 a 20 segundos de un hablante con vocales claras, un `s` o `f` y una pausa natural. Utiliza un WAV local, a nivel moderado, sin música ni efectos.
2. Seleccione un modelo de inferencia confiable y compatible con la aplicación. Registre su nombre, incrustador y ranura de altavoz. Comience en transposición cero con el extractor de tono predeterminado, procesamiento opcional desactivado y recuperación en cero.
3. Convierta y guarde en una carpeta local grabable. Reproduzca el archivo en un segundo reproductor si la vista previa del navegador está en silencio. Compara la misma frase con un volumen similar.
4. Repita con un modelo en buen estado utilizando su propio codificador compatible. Si ambos modelos fallan en la misma entrada, observe la decodificación, el tiempo de ejecución o la configuración compartidos. Si solo uno falla constantemente, inspeccione ese modelo, su configuración y los datos de entrenamiento, si están disponibles.
5. Vuelva a habilitar una opción por prueba. Guarde cada resultado con la configuración en su nombre de archivo o notas para que pueda volver a una combinación de trabajo conocida.

## La aplicación no se inicia

### La ventana se cierra o la configuración nunca se completa

- **Ilaria RVC:** Extraiga el paquete completo, abra su carpeta y ejecute `ILARIA_RVC_LOGS.bat`. Mire arriba del último mensaje de apagado para ver la primera excepción útil. Compruebe que Windows detecte la GPU NVIDIA compatible y que el entorno y los recursos incluidos todavía estén presentes.
- **Applio Desktop:** Abra Configuración e inspeccione el estado del motor. Repare la instalación a través de los controles de configuración del escritorio cuando falle el tiempo de ejecución o la verificación del paquete. Para Gradio, ejecute el iniciador desde la caja deseada y verifique qué intérprete está activo.
- **Línea principal:** Haga coincidir el iniciador y el tiempo de ejecución con el archivo específico o el pago de la fuente. Un archivo antiguo puede contener una compilación CUDA que no puede ejecutar kernels para una GPU más nueva. La instalación global de un paquete Python no relacionado no reparará un intérprete incluido.
- **Error de DLL de Windows:** Para `llvmlite.dll` o una dependencia de Visual C++ faltante, verifique que la arquitectura de tiempo de ejecución coincida con la aplicación e instale o repare el redistribuible oficial de Microsoft Visual C++ para esa arquitectura. Si no existe la DLL, restáurela mediante el paquete o instalador original.
- **Errores de recursos después de una actualización:** Compruebe que se pueda escribir en la instalación, que los archivos de activos necesarios estén presentes y que el acceso directo del escritorio apunte a la carpeta actualizada. Mantenga una copia de seguridad de sus modelos, conjuntos de datos y registros antes de reemplazar una instalación.

### La página local está en blanco, desconectada o muestra un error JSON

Mantenga el proceso en ejecución y abra la dirección de loopback exacta impresa en la consola. Ilaria RVC normally uses `127.0.0.1:6969`. Si el puerto ya está en uso, verifique si esa aplicación ya se está ejecutando y use su dirección. Save active work before stopping an instance.

Puede ocurrir un error del navegador como `Expecting value: line 1 column 1` cuando una solicitud de API recibe una respuesta vacía o una página de error HTML. Verifique la consola del servidor en la misma marca de tiempo. Si un proxy configurado intercepta el tráfico local, verifique la omisión del loopback o pruebe un perfil del navegador sin que la extensión interfiera. Mantenga el servicio local mientras realiza el diagnóstico.

Para uso en la línea de comandos, comience desde el punto de entrada y el argumento de ayuda para su versión exacta. Una ejecución breve y exitosa de WebUI le brinda configuraciones coincidentes y, en compilaciones que las registran, los comandos de preprocesamiento y entrenamiento. Los scripts más antiguos pueden esperar un orden de argumentos o un diseño de directorio diferente.

## Archivos de entrada y salida

### Errores de lista de archivos, Unicode y FFmpeg

1. Confirme que el archivo se abre en un reproductor normal. Exporte un WAV PCM corto y nuevo si el contenedor o el códec no están seguros.
2. Cópielo en una ruta local simple como `C:\RVC\input\test.wav`. Esto aísla los problemas de citas, Unicode, sincronización remota y permisos comunes en versiones anteriores. Conservar las grabaciones originales.
3. Verifique que la aplicación pueda ver su FFmpeg incluido. Las instalaciones de origen pueden requerir un ejecutable independiente disponible para el mismo proceso que inicia la aplicación. Si el WAV en buen estado funciona, compare la ruta y el códec originales antes de reinstalar el entorno.
4. Para capacitación, confirme que la carpeta seleccionada contenga audio real. Si cambia las rutas después del preprocesamiento, reconstruya la lista de archivos y las funciones dependientes en un nuevo experimento o mediante el flujo de trabajo de preparación de la aplicación.

### Aparece un resultado pero no se puede reproducir ni guardar

Verifique la carpeta de salida y libere espacio en el disco. Exporte WAV e inspeccione la duración y el tamaño del archivo. Reproduzca el resultado fuera del navegador para separar los problemas de reproducción y conversión. En modo por lotes, verifique el primer elemento defectuoso y la ruta de salida, luego ejecute ese elemento solo. Mantenga los originales y los resultados generados en diferentes carpetas.

## Modelos, puntos de control e índices

### No aparece un modelo

Asegúrese de que haya una inferencia real `.pth` dentro del archivo. Colóquelo en la biblioteca utilizada por la aplicación actual, o use su control de importación y espere a que finalice la instalación. Actualice la lista de voces y verifique la selección nuevamente. En Ilaria RVC, la biblioteca de modelos se encuentra en `models/`. Los archivos principales y la fuente actual pueden utilizar diferentes diseños de directorio. Consulte [modelos y archivos RVC](../start/models.md) para conocer las funciones de los archivos.

### La carga falla porque faltan claves o formas incompatibles

Un `G_*.pth` o `D_*.pth` de un experimento suele servir para currículum de entrenamiento. Utilice la función de exportación o extracción de puntos de control de la aplicación para producir un modelo de inferencia. La falta de metadatos F0 o de frecuencia de muestreo también puede indicar un formato incorrecto o un archivo incompleto. Verifique la versión de RVC, el vocoder, la frecuencia de muestreo, la guía de tono y el incrustador. Conserve los originales y exporte con un nombre diferente. Una extensión de nombre de archivo coincidente por sí sola no puede establecer la compatibilidad.

### Falta el índice o causa un error

1. Convertir con recuperación en cero, seleccionando ningún índice si la aplicación lo permite. Confirme que el modelo puede producir resultados inteligibles por sí solo.
2. Seleccione el índice del mismo experimento y configuración de funciones que el modelo. Vuelva a intentarlo con un valor de recuperación modesto y compare la misma frase. Una dimensión incompatible o un índice ilegible es un motivo para volver a comprobar el par antes de realizar el ajuste.
3. Si se completó el entrenamiento pero no hay índice, inspeccione la etapa de índice por separado. Confirme que la extracción de características se realizó correctamente. Vuelva a ejecutar la generación de índice sólo cuando las funciones compatibles originales estén intactas. Un conjunto de funciones muy grande puede consumir RAM del sistema durante el ensamblaje del índice.
4. Preservar la exportación de inferencia incluso si falla la construcción del índice. Para compartir o hacer una copia de seguridad, mantenga juntos el punto de control en funcionamiento y su índice coincidente opcional.

## Calidad de sonido y limitaciones del modelo

| Lo que escuchas | Prueba de diagnóstico e interpretación |
| --- | --- |
| Respiraciones metálicas o sibilantes distorsionados | Compara algunas fuentes limpias con efectos y recuperación desactivados. Compare la protección por separado. Si el mismo modelo distorsiona constantemente esos sonidos en clips limpios, inspeccione los ejemplos de entrenamiento para detectar recortes, reducción de ruido o cobertura deficiente, corrija el conjunto de datos y vuelva a entrenar. |
| La voz convertida mantiene el timbre de origen | Verifique que el modelo y el integrador de entrenamiento coincidan. Las funciones genéricas de HuBERT pueden retener las señales del hablante. Compare sin recuperación y luego con el índice correcto. Una limitación persistente del modelo entrenado puede requerir un reentrenamiento. |
| Las palabras se rompen solo en un idioma | Pruebe frases retenidas que contengan los sonidos afectados con varias grabaciones limpias. Las grabaciones multilingües por sí solas no pueden garantizar que ContentVec conserve las distinciones. Registre la limitación del idioma observada en lugar de prometer que una configuración de capacitación diferente la solucionará. |
| Saltos de tono o cambios de octava | Escuche la frase original, pruebe la transposición cero y compare los extractores F0 compatibles por separado. Para cantar, compruebe las notas altas y bajas expuestas. |
| Sonidos metálicos alrededor de música o voces de fondo | Compara una voz seca aislada. Escuche los artefactos de separación antes de utilizar un tallo aislado como datos de entrenamiento. |
| El audio es plano, demasiado bajo o se corta | Compare la fuente y la salida en niveles de reproducción similares. Deshabilite los efectos de ganancia y limitador para la prueba y verifique que la fuente y la exportación final tengan margen. |

Utilice la [guía de calidad de audio](../conversion/audio-quality.md) para pruebas de escucha controladas y la [preparación del conjunto de datos](../model-training/dataset-preparation.md) cuando el defecto sigue el modelo en todas las entradas.

## GPU y memoria del sistema

- **CUDA no disponible o kernel no compatible:** Confirme la GPU, el controlador y el tiempo de ejecución exactos que seleccionó la aplicación. Las instalaciones de escritorio, empaquetadas y de origen pueden ver diferentes dispositivos. Verifique que el backend previsto admita la operación, incluida la capacitación si es necesario.
- **CUDA sin memoria durante la inferencia:** Comience con un clip corto. Cierre los trabajos de GPU de la competencia, descargue los modelos no utilizados y desactive el procesamiento opcional. Para entradas largas, pruebe el control de división de audio de la aplicación o divida el audio en segmentos y verifique las uniones luego.
- **CUDA sin memoria durante el entrenamiento:** Reduzca el tamaño del lote, desactive el almacenamiento en caché del conjunto de datos en VRAM y pruebe la precisión mixta compatible solo si su compilación lo admite. Mantenga un punto de control reanudable. Un lote más pequeño cambia la cantidad de actualizaciones por época.
- **La RAM del sistema se agota o los trabajadores de preprocesamiento mueren:** Utilice menos trabajadores de CPU, verifique que el disco tenga espacio para archivos intermedios e inspeccione grabaciones inusualmente largas o rotas. Divida solo en los límites naturales y regenere los datos preparados afectados. Durante la generación del índice, observe la RAM del sistema independientemente de la VRAM.
- **Múltiples GPU:** Confirme el índice del dispositivo con la lista de dispositivos de la aplicación. Un índice puede hacer referencia a una GPU diferente cuando cambia la visibilidad del dispositivo. Verifique el dispositivo elegido en el registro antes de comparar el rendimiento.

## Capacitación, reanudación y exportaciones

### Diagnosticar la etapa antes de volver a ejecutarla

| Etapa | Verificar antes de continuar |
| --- | --- |
| Importar conjunto de datos | Confirmar la carpeta de destino y esperar la extracción. Verifique el espacio libre y pruebe algunos archivos importados. |
| Preprocesamiento | Confirme clips utilizables, no vacíos y una carpeta de experimentos grabable. Un tensor de tamaño cero puede originarse en un segmento vacío, extremadamente corto o fallido. Escuche y reemplace o recorte la fuente defectuosa, luego regenere los datos preparados. |
| Extracción de funciones | Confirme que el audio producido por el preprocesamiento y que los recursos de incrustación y tono elegidos estén presentes. Cambiar codificadores requiere una configuración compatible y funciones nuevas. |
| Capacitación | Verifique los preentrenamientos G/D coincidentes y la concordancia entre la frecuencia de muestreo, la guía de tono, el vocoder, la arquitectura y las funciones almacenadas. Una discrepancia en el tamaño del tensor después de cambiar las tasas es una razón para iniciar un experimento por separado con configuraciones compatibles. |
| Exportar e indexar | Exportar un punto de control de inferencia, actualizar la lista de voces, realizar pruebas sin recuperación y crear el índice a partir de las características de ese experimento. |

### Reanudar de forma segura o continuar con más grabaciones

Espere a que la aplicación termine de guardarse antes de cerrarla. Conserve los puntos de control G y D, la configuración del experimento y su estado de entrenamiento. Para reanudar el entrenamiento sin cambios, seleccione el mismo experimento y verifique el paso o la época restaurada en el registro. Trate un conjunto de datos modificado como un experimento separado: preprocese el conjunto de datos combinado, regenere funciones y use el método de continuación admitido de su aplicación con pesos compatibles. Mantenga el experimento original intacto para permitir una comparación o una reversión.

La duración del conjunto de datos y el recuento de épocas dependen de la cobertura y la limpieza de la voz. Guarde varios puntos de control y escuche los mismos clips retenidos. Una mejor curva de pérdida no establece una mejor pronunciación. Si un modelo se degrada en ejemplos limpios e invisibles, compare una exportación anterior antes de ampliar la ejecución.

## Micrófono en vivo, cable virtual y llamadas

1. Verifique el micrófono físico sin formato en el sistema operativo. Confirme el permiso y el nivel de entrada. Desconecte las fuentes de micrófono adicionales durante la prueba.
2. Pruebe el convertidor localmente a través de auriculares. Mantenga el backend y el búfer de audio predeterminados compatibles con la aplicación. Si el convertidor tiene un medidor de entrada pero no salida, verifique la voz cargada y el estado de conversión antes de cambiar la aplicación de destino.
3. Dirija la salida del convertidor al extremo de reproducción del cable virtual. En Discord, OBS o la aplicación de grabación, elija el punto final de grabación correspondiente. Mantenga la reproducción de llamadas en los auriculares. Realice una grabación de prueba privada para verificar la señal real que llega a otros.
4. Si hay lagunas, vuelva a realizar la prueba con un tamaño de bloque mayor y con otras cargas de trabajo de GPU detenidas. Si aparecen huecos sólo durante un juego, repita la prueba bajo esa carga. Compruebe si la configuración del formato de audio entra en conflicto entre dispositivos.
5. Si la voz se recorta al principio o al final, realice la prueba sin detección automática, supresión de ruido ni puertas de una en una. Si escucha un eco, verifique si hay monitoreo duplicado o un bucle en el micrófono físico. Mantenga el último preajuste estable antes de reducir el retardo.

Para nombres de dispositivos y controles específicos de aplicaciones, utilice las [guías de aplicaciones paso a paso](../other-rvcs/app-guides.md) y la [guía de enrutamiento en vivo](../conversion/real-time.md).

## Más problemas que puedes resolver

### Lee el mensaje antes de cambiar algo

Busca el primer error en la consola o en el registro de trabajos. Es posible que el último mensaje solo diga que el trabajo se detuvo. Copie la línea que nombra un archivo, dispositivo o configuración. Ejecute una breve prueba después de su primer cambio. Si funciona, anota lo que cambiaste.

| Mensaje o síntoma | Lo primero que debe hacer | Si aún falla |
| --- | --- | --- |
| Permiso denegado | Guarde una breve prueba en una carpeta de su propiedad. | Compruebe si el archivo seleccionado está abierto en otro lugar o si la carpeta de salida está administrada por otra aplicación. |
| Archivo no encontrado | Abra la ruta que se muestra en el error y confirme que el archivo existe. | Vuelva a seleccionar el archivo dentro de RVC. Si movió el conjunto de datos, reconstruya sus archivos y funciones preparados. |
| Disco lleno | Verifique la unidad utilizada por la aplicación, incluidos los archivos temporales. | Mueva las copias de seguridad completadas a otra unidad y elija un destino grabable con espacio para archivos intermedios. |
| Módulo no encontrado | Verifique qué iniciador y entorno abrió. | Reparar el entorno de esa aplicación. Mantenga un entorno separado para cada instalación de origen. |
| La pérdida de NaN o las salidas son silenciosas | Detenga la ejecución y mantenga el último punto de control en funcionamiento. | Compruebe si hay audio corrupto, pesos incompatibles y problemas de precisión. Si es compatible, compare una ejecución corta de FP32 en un experimento separado. |

### La voz suena mal a pesar de que el trabajo se realizó correctamente

#### Solo un modelo de voz se comporta mal

Pruebe una voz que se sabe que funciona correctamente utilizando su propio codificador y configuración de índice coincidentes. Luego pruebe el modelo defectuoso con la recuperación y los efectos desactivados. Si la primera voz funciona y la otra comete repetidamente el mismo error, inspeccione el codificador, la ranura del altavoz y los datos de entrenamiento del modelo defectuoso. Mantenga la entrada limpia como evidencia para una comparación después del reentrenamiento.

#### Falta parte de un archivo largo

Reproduzca la entrada y la salida una al lado de la otra cerca de la sección que falta. Pruebe esa sección solo. Si el clip corto tiene éxito, verifique la presión de la memoria, la división del silencio, las puertas automáticas y la carpeta de salida. Únase a segmentos completos en un editor y escuche a través de cada límite antes de exportarlos.

#### Solo falla un archivo en un lote

Convierta ese archivo por sí solo. Si no se puede abrir, cree un WAV nuevo a partir del original. Si se convierte, verifique si el lote se interrumpió o si dos archivos comparten un nombre de salida. Vuelva a ejecutar los archivos fallidos en una carpeta de destino nueva para proteger los resultados anteriores.

### El entrenamiento parece estancado

1. Busque la última marca de tiempo y la etapa actual. La preparación de un conjunto de datos, la extracción de características y la creación de un índice pueden tener velocidades muy diferentes.
2. Compruebe si la CPU, la GPU o el disco todavía están activos y si se están escribiendo archivos. Actualice el registro o el panel si la visualización del progreso está obsoleta.
3. Si la actividad se detiene y el registro tiene un error, diagnostique ese error. Si necesita detener un trabajo de entrenamiento en ejecución, use su control de guardar y detener y espere la confirmación cuando esté disponible.
4. Antes de volver a intentarlo, escriba el nombre del experimento y la última etapa confirmada. Reutilice los archivos completados solo cuando el conjunto de datos y la configuración aún coincidan.

### El audio en vivo funciona en el monitor pero falla en una llamada

- **Otras personas escuchan tu voz normal:** selecciona el lado de grabación del cable virtual en la aplicación de llamadas y apaga cualquier segunda fuente de micrófono.
- **Escuchas la voz convertida dos veces:** usa un solo monitor. Desactive la escucha de Windows o el monitor de la aplicación mientras compara.
- **La llamada se corta solo cuando hablas en voz baja:** compara la sensibilidad de entrada y la supresión de ruido de la aplicación, una a la vez. Grabe la entrada de la llamada para escuchar lo que realmente le llega.
- **El dispositivo desapareció después de conectar los auriculares:** detenga la conversión, vuelva a seleccionar el micrófono físico y los auriculares y luego reinicie la transmisión de audio.

Cuando un paso solucione el problema, repita la prueba original una vez con sus aplicaciones habituales abiertas. Mantenga esa configuración funcional como referencia.

## Texto a voz e informe de un problema

Vista previa del discurso generado antes de convertirlo. Si el TTS original suena mal, verifique su idioma, voz y escritura. Para Edge TTS, verifique si se puede acceder a esa voz en línea. Con una voz de Windows instalada, verifique que aparezca en la lista de aplicaciones compatibles. Si solo la versión convertida suena mal, utilice la línea base de conversión de archivos anterior.

Cuando solicite ayuda, incluya la aplicación y la edición, la versión, el sistema operativo, la GPU y el backend, la acción exacta, el primer error con líneas de registro cercanas y la reproducción segura más corta. Para la capacitación, incluya la etapa fallida, la frecuencia de muestreo, la arquitectura, el integrador y si se trató de una ejecución nueva o de un currículum. Para problemas en vivo, enumere los dispositivos en orden de señal. Elimine identificadores de cuentas, rutas privadas y grabaciones confidenciales antes de compartir registros. Utilice la [página de contacto](https://ilariarvc.shop/en/contact/) para obtener ayuda con Ilaria RVC.
