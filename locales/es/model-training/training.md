---
label: "🛠️ Entrenar un modelo de voz"
order: 94
permalink: /training/
description: "El entrenamiento aprende una voz objetivo a partir de una colección de audio preparada."
---
# Entrenar un modelo de voz RVC

[Descarga Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

El entrenamiento aprende una voz objetivo a partir de una colección de audio preparada. Utilice esta guía cuando desee construir un modelo a partir de grabaciones propias o autorizadas. Si ya tiene un modelo de inferencia, consulte [modelos y archivos RVC](../start/models.md) para comenzar a usarlo.

## Planifica tu primera carrera

Prepara el audio con la [guía del conjunto de datos](dataset-preparation.md) y luego selecciónalo en **Entrenamiento**. Asigne un nombre único al experimento y elija una grabación corta fuera del conjunto de entrenamiento para las pruebas de escucha. Comience con una ejecución modesta que pueda completar todas las etapas y producir una exportación utilizable. Esto le brinda una línea de base para cambios en los datos o la configuración.

Registre la versión de la aplicación, la revisión del conjunto de datos, el formato del modelo y la frecuencia de muestreo, el incrustador, el método de paso, el par previamente entrenado, el tamaño del lote y el intervalo de guardado planificado. Agregue el nombre del clip de prueba retenido. Si una ejecución posterior suena diferente, estas notas le ayudarán a identificar qué cambió.

## Elija configuraciones compatibles

 | Configuración | Qué verificar |
| --- | --- |
 | Formato de modelo, vocoder y frecuencia de muestreo | Seleccione una combinación compatible con la aplicación y el cliente de reproducción deseado. Una arquitectura específica de fork puede limitar dónde se carga su modelo. |
 | Guía y extracción de tono | La guía de tono es útil para modelar material que depende del tono, especialmente el canto. Elija un extractor disponible para entrenar en su construcción. |
 | Incrustador | Esto define la representación extraída del audio. Registre la elección para poder utilizar la representación coincidente en clientes de inferencia admitidos. |
 | Generador y discriminador previamente entrenados | Utilice un par coincidente compatible con la arquitectura, la velocidad y la configuración de tono seleccionados. Los archivos generadores y discriminadores cumplen diferentes funciones en la formación. |
 | Tamaño del lote | Controla la cantidad de datos que se procesan por actualización. Comience con una configuración que su GPU pueda ajustar y bájela si el entrenamiento se queda sin memoria. |
 | Intervalo de objetivo y punto de control | Una época es aproximadamente una pasada por el conjunto de datos preparado. Los pasos son actualizaciones de entrenamiento individuales. Guarde periódicamente para que pueda comparar las exportaciones y recuperarse después de una interrupción. |

Utilice las opciones de preentrenamiento que se muestran como compatibles con su versión instalada. En Ilaria RVC 2.1.0, por ejemplo, el proyecto documenta el entrenamiento RefineGAN a 32 kHz con RVC V2 y guía de tono. El mismo comunicado también documenta un descargador para pares previamente entrenados compatibles.

### Consejos prácticos de entrenamiento

- **Épocas:** Pruebe una primera comparación con un objetivo de alrededor de 200 épocas y escuche varios guardados anteriores. Este es un punto de partida para la audición, ya que el punto de control más fuerte puede llegar antes o después. Una ejecución de 1000 épocas no ofrece garantía de calidad.
- **Lote y precisión:** Comience con un lote moderado, por ejemplo 8, y trate 16 como un punto de partida superior conservador. Reducirlo si se agota la memoria. La precisión mixta de FP16 puede reducir el uso de VRAM y acelerar el entrenamiento en hardware compatible. Compruebe si su compilación ya lo habilita y pruebe FP32 si la precisión mixta produce pérdidas no finitas.
- **TensorBoard:** Utilice métricas para realizar un seguimiento del progreso y detectar ejecuciones estancadas o inestables. Las curvas de pérdidas por sí solas no pueden decir qué punto de control suena mejor. Compare conversiones de los mismos clips retenidos.
- **Normalización:** En Applio compila con estos controles, Pre ajusta los niveles antes de cortar y Post los ajusta después de cortar. Utilice Ninguno si los niveles originales ya son adecuados. En Ilaria RVC, Process Data aplica el ajuste de nivel automáticamente a cada segmento. La implementación pública no tiene un conmutador de publicación independiente.
- **Filtrado de ruido:** Comience con la reducción de ruido opcional desactivada para obtener grabaciones limpias. Si la interfaz también expone un filtro de paso alto, utilícelo para obtener un ruido audible de baja frecuencia y compare el resultado de oído. El filtrado de paso alto y la reducción de ruido son operaciones independientes.
- **Caché del conjunto de datos de GPU:** Déjelo desactivado como referencia. Consume VRAM adicional. Mida el tiempo por época antes de habilitarlo para una ejecución más larga.
- **Pesos previamente entrenados:** Haga coincidir el par G/D con la arquitectura, el vocoder, la frecuencia de muestreo y la configuración de tono, y utilice el integrador especificado por el autor del entrenamiento previo. Para entrenamientos previos de RVC estándar creados con ContentVec, seleccione ContentVec para extracción e inferencia de características.

### Elija una tarifa utilizando el ancho de banda de origen

Verifique la frecuencia de muestreo en los metadatos del archivo e inspeccione varios clips representativos en un visor de espectrograma como [Spek](https://www.spek.cc/p/download). Busque detalles vocales útiles en lugar de ruido aislado o un corte brusco dejado por la compresión. La mitad de la frecuencia de muestreo de entrenamiento es la frecuencia más alta que esa frecuencia puede representar. Un modelo de 32 kHz puede representar frecuencias de hasta 16 kHz, un modelo de 40 kHz hasta 20 kHz y un modelo de 48 kHz hasta 24 kHz. Para obtener detalles utilizables por encima de 20 kHz, elija 48 kHz si la arquitectura y el entrenamiento previo lo admiten. Utilice la tarifa compatible más baja cuando ya cubra el ancho de banda de origen. El preprocesamiento puede volver a muestrear las grabaciones, pero no puede restaurar los detalles faltantes.

## Ejecute las etapas en orden

 | Etapa | Qué produce | Qué verificar |
| --- | --- | --- |
 | Preprocesamiento del conjunto de datos | Audio preparado para la configuración del modelo del experimento. | El registro nombra la carpeta deseada e informa el procesamiento exitoso de los archivos utilizables. Verifique los archivos omitidos antes de continuar. |
 | Extracción de funciones | Funciones de contenido, además de datos de tono cuando lo requiera la configuración elegida. | La extracción finaliza para el experimento actual utilizando el método de incrustación y tono seleccionado. |
 | Entrenamiento de modelos | Puntos de control y exportaciones de inferencias según las opciones de guardado configuradas. | Los pasos del entrenamiento avanzan y se guardan los archivos esperados. Lea el primer error si el progreso se detiene. |
 | Índice de recuperación | Una colección de funciones de conjunto de datos con capacidad de búsqueda para uso opcional durante la conversión. | El índice pertenece a este experimento y coincide con la voz exportada. Si lo omitiste, prueba el modelo de forma independiente. |

Utilice el flujo de trabajo automático cuando esté disponible, o finalice y verifique cada etapa antes de comenzar la siguiente. Un conjunto de datos o una frecuencia de muestreo modificados pueden invalidar el audio preparado y las funciones extraídas. Un incrustador modificado requiere la extracción de nuevas características. Cuando pruebe una configuración incompatible, inicie un experimento independiente para que las cachés y los puntos de control existentes sigan estando disponibles.

## Siga el progreso en Ilaria RVC

- Utilice el **Panel de entrenamiento** para verificar el recuento de pasos, el tiempo por época y las curvas de pérdida. Una curva puede ayudar a explicar una ejecución estancada, mientras que las pruebas de escucha le indican cómo suena la salida.
- Configure **vistas previas de capacitación** con un clip de prueba constante para que la aplicación pueda generar conversiones comparables a medida que se guardan los puntos de control.
- Si utiliza la **Cola de entrenamiento**, establezca un nombre de experimento y un conjunto de datos distintos para cada trabajo. Antes de continuar o volver a intentarlo, confirme qué etapas se completaron el trabajo y dónde se guardará el resultado.
- Cuando tu lanzamiento exponga **Detener y guardar**, úsalo cuando necesites interrumpir y continuar más tarde. Espere a que el punto de control termine de escribir antes de cerrar la aplicación.

Ilaria RVC 2.1.0 admite objetivos de época y de pasos totales, incluida la reanudación parcial de una época para objetivos de pasos. Otras interfaces pueden exponer diferentes controles y reanudar el comportamiento.

### Comparar presupuestos de formación en pasos

Una época es un paso por el conjunto de datos preparado. Un paso de capacitación es una actualización por lotes. Divida la cantidad de clips después del preprocesamiento por el tamaño de lote efectivo para estimar los pasos por época. Por ejemplo, 10.000 clips en un tamaño de lote de 8 dan 1.250 lotes por época en una ejecución de un solo trabajador. Los lotes parciales eliminados, varias GPU o la acumulación de gradientes pueden cambiar la forma en que el entrenador cuenta las actualizaciones. Utilice el recuento informado por su ejecución al comparar experimentos.

Elija un intervalo de guardado que le brinde varios puntos de control para audicionar. Guardar aproximadamente cada 40 épocas es un posible punto de partida para una ejecución medida en cientos de épocas. Utilice los mismos clips retenidos y configuraciones de inferencia para cada comparación. Escuche la inteligibilidad, el tono estable, las pausas naturales y las consonantes que permanezcan claras. Si las exportaciones posteriores suenan más duras o funcionan bien solo en unas pocas frases, compárelas con un punto de control anterior e inspeccione el conjunto de datos en busca de tomas repetidas o artefactos. Elija el punto de control que funcione mejor en todas las entradas previstas.

## Comparar exportaciones escuchando

Inferencia abierta con un `.pth` exportado. Utilice las mismas grabaciones breves y las mismas configuraciones de conversión para comparar modelos de diferentes puntos de control. Si realiza una comparación de índice, mantenga firme el punto de control y compare el mismo clip con la recuperación habilitada y deshabilitada.

Compare estas cuatro cualidades en las exportaciones.

1. **Timbre.** ¿La grabación convertida se parece al carácter vocal previsto en toda la frase?
2. **Inteligibilidad.** ¿Siguen siendo fáciles de entender las consonantes y las terminaciones de las palabras?
3. **Estabilidad del tono.** ¿Las notas o sílabas saltan, gorjean o pierden la inflexión prevista?
4. **Artefactos.** ¿La salida agrega zumbidos, ruido ambiental incrustado, colas ásperas o transiciones extrañas?

Mantenga la exportación con el mejor sonido y sus resultados de prueba. Puede valer la pena probar más épocas cuando los resultados mejoran en varios ejemplos. Si las exportaciones posteriores solo mejoran un clip o comienzan a reproducir fallas del conjunto de datos, regrese a la mejor línea de base y revise las grabaciones.

## Exportar, reanudar o compartir

- **Usar en inferencia.** Seleccione el modelo exportado `.pth`. Mantenga su `.index` correspondiente junto a él cuando desee recuperarlo. Registre cualquier información necesaria sobre el integrador, el cliente compatible y la frecuencia de muestreo.
- **Reanudar el entrenamiento.** Haga una copia de seguridad del experimento y conserve los puntos de control de entrenamiento del generador coincidente y del discriminador, comúnmente denominados `G_*.pth` y `D_*.pth`. Continúe con el mismo experimento y configuración compatible, luego inspeccione el registro para buscar el punto de control y el paso o época que esperaba. Una exportación de inferencia por sí sola carece del estado de entrenamiento completo.
- **Comparte un modelo.** Comparte solo archivos que tengas permiso para distribuir. Incluya ejemplos de escucha, notas de compatibilidad, el índice de coincidencias si es útil y cualquier término de uso que el destinatario necesite.

En Ilaria RVC, las versiones recientes utilizan la biblioteca de modelos para exportaciones de inferencias e índices asociados. Las rutas de exportación y los nombres pueden diferir entre las interfaces. Guarde los registros del experimento por separado si desea recrear el modelo más adelante.

## Diagnosticar una ejecución fallida

 | Síntoma | Verificar primero |
| --- | --- |
 | El preprocesamiento no encontró audio | Verifique la carpeta del conjunto de datos seleccionado y reproduzca un clip de entrada. Compruebe si su compilación lee carpetas anidadas. |
 | La extracción falla o informa que falta un modelo | Verifique los activos del modelo de incrustación y tono seleccionados y lea el primer mensaje en el registro de extracción. |
 | La memoria de la GPU se agota | Reduzca el tamaño del lote, detenga los trabajos de GPU competitivos y deshabilite el almacenamiento en caché del conjunto de datos de la GPU si su compilación ofrece ese control. Vuelva a intentar la etapa fallida. |
 | El entrenamiento se reinicia al principio | Verifique que el experimento apunte a puntos de control de entrenamiento compatibles y que cualquier opción de nuevo comienzo esté desactivada. |
 | A `.pth` no se cargará para la conversión | Compruebe si seleccionó un punto de control de entrenamiento en lugar de una exportación de inferencia y verifique la arquitectura y la compatibilidad del integrador con el cliente. |
 | Un modelo utilizable no tiene índice | Compruebe si la generación del índice se omitió o falló. Exporte y pruebe el punto de control de forma independiente, luego cree su índice a partir del experimento correspondiente, si es necesario. |

Conservar el primer mensaje fallido y la configuración asociada a la ejecución. Para obtener más comprobaciones, consulte [Solución de problemas](../reference/troubleshooting.md).
## Perfiles indicativos de entrenamiento (adaptar a datos y hardware)

- **Beginner Training:** RVC **v2** · **40 kHz** (32 kHz para RefineGAN) · mvpe · contentvec · **Batch Size 4–8** · **Epochs 200** (guardar cada 25–50) · **FP32** (o **BF16** en RTX 30/40/50) · GPU Caching **OFF** · Workers 2.
- **Intermediate Training:** RVC **v2** · **40/48 kHz** · mvpe · **Batch Size 8–12** · **Epochs 250–350** · **BF16** / **FP16** · Workers 4, Prefetch 4–8 · Índice **FAISS Auto**.
- **Advanced Training & Optimization:** Datasets curados, 12–24 GB+ VRAM · **Total Steps** · **Batch Size 12–16+** · **GPU Caching ON** (si cabe en VRAM) · **Fused AdamW ON** · **Training Queue** + **TensorBoard** + [Audio Analyzer](../ilaria-rvc/manage/audio-analyzer.md).

## Detectar Underfitting vs. Overfitting de oído

1. **Underfitting:** Aún suena demasiado a la voz original → continúa entrenando desde G_*.pth/D_*.pth.
2. **Overfitting:** Suena metálica en frases nuevas o copia ruido del dataset → vuelve 50–100 épocas atrás.
