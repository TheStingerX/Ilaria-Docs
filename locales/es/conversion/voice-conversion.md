---
label: "🎙️ Conversión de voz"
order: 95
permalink: /voice-conversion/
description: "La conversión de voz comienza con una actuación. La salida generalmente sigue las palabras fuente, el tiempo, la articulación y el contorno del tono..."
---
# Convierte una grabación con Ilaria RVC

[Descarga Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

La conversión de voz comienza con una actuación. La salida generalmente sigue las palabras fuente, el tiempo, la articulación y el contorno del tono mientras cambia el sonido de la voz. Las decisiones sobre la entrega aún comienzan con la grabación original. Para una versión cantada, planea convertir una voz principal aislada y luego mezclar la voz convertida con la instrumental.

## Realice una conversión de referencia

1. Abra Ilaria RVC e importe el modelo de inferencia que desea utilizar. Un índice opcional pertenece al punto de control para el que fue creado. Si no hay una voz importada en el selector, consulte [modelos y archivos RVC](../start/models.md).
2. Abra **Inferencia única**, elija la voz y arrastre una grabación corta que pueda reconocer de oído. Una frase con una pausa, varias consonantes y una vocal más larga constituye una referencia útil.
3. Establezca **Pitch** en cero y **Index Ratio** en cero. Haga coincidir el incrustador de contenido con el utilizado en la capacitación cuando el autor del modelo lo proporciona. Comience con el extractor de tono predeterminado de la aplicación y deje desactivado el procesamiento de audio opcional.
4. Convierta el archivo y verifique el resultado. Utilice el reproductor de formas de onda para volver a visitar la misma frase y luego guarde una copia WAV o FLAC como referencia.
5. Compare el clip original y convertido en niveles de reproducción similares. Note el primer problema audible y use [Tono y calidad de audio](audio-quality.md) para decidir qué cambiar.

Las versiones actuales de Ilaria RVC buscan automáticamente un índice coincidente cuando seleccionas una voz. Seleccionar un índice y darle influencia son acciones separadas. Un índice cargado contribuye solo cuando **Proporción de índice** es superior a cero. Las compilaciones más antiguas pueden mostrar un diseño diferente o solicitarle que seleccione el índice manualmente.

## Elija una fuente que se ajuste al trabajo

 | Flujo de trabajo | Prepare la fuente | Escuche |
| --- | --- | --- |
 | Diálogo o narración | Utilice un orador por pista de entrada y mantenga una breve pausa natural entre líneas. | Palabras claras, terminaciones de palabras intactas y tono consistente entre frases. |
 | Una voz principal sobre música | Aislar la voz principal. Deje las voces instrumentales, de acompañamiento y las armonías en sus propias pistas. | Notas sostenidas estables y consonantes que aún se alinean con el ritmo. |
 | Múltiples tomas | Etiquete cada toma por escena o sección y conserve los nombres de los archivos originales en sus notas. | Una voz consistente en las tomas grabadas en diferentes niveles o tonos. |
 | Texto hablado a través de TTS | Vista previa del discurso generado antes de aplicar el modelo. Primero ajuste la puntuación o la redacción del texto. | Pronunciación correcta y ritmo intencional antes de la etapa RVC. |

Si una voz separada todavía contiene platillos fuertes u otro cantante, compárala con una toma más limpia o una separación. Esos sonidos llegan al motor de conversión junto con la voz deseada. Mantenga las respiraciones y las terminaciones de palabras donde sean importantes para la interpretación.

## Convertir un lote

Abra **Inferencia por lotes** después de que un solo archivo produzca un resultado utilizable. Agrupe archivos que necesitan el mismo modelo, paso y perfil de procesamiento. Ejecute un archivo representativo de cada grupo y guárdelo en una ubicación de salida separada para que pueda comparar los resultados de forma segura.

Para una canción larga, escuche una sección con notas altas o bajas expuestas antes de convertir todo el archivo. **Split Audio** puede ayudar con grabaciones largas o limitaciones de memoria. Escuche las uniones y pausas de los segmentos después de la ejecución. Si una versión de la aplicación expone una consola o un registro de conversión, utilícelo para identificar cualquier elemento fallido y vuelva a intentar esos archivos por separado.

## Convertir voz generada

En una versión con el espacio de trabajo **TTS**, proporcione texto o un archivo de texto UTF-8. Las versiones actuales de Ilaria RVC ofrecen voces en línea de Microsoft Edge y voces de Windows instaladas para TTS sin conexión. Elija una voz de origen en el idioma del guión, escuche la pronunciación y las pausas y luego aplique el modelo RVC a esa grabación generada. Si la primera etapa lee un nombre incorrectamente, primero corrija el texto o cambie la voz TTS. RVC generalmente transmitirá esas opciones de pronunciación de la fuente.

Cuando la privacidad o una conexión poco confiable sean importantes, seleccione una voz de Windows instalada y verifique que funcione con su texto antes de comenzar un trabajo largo. La opción Edge requiere una conexión de red.

## Guarde la conversión y su configuración

- Conserve un master WAV o FLAC sin procesar antes de agregar compresión, reverberación o limitación.
- Para la música, alinee la voz convertida con la original, verifique su sincronización en las consonantes y escuche tanto en solitario como en la mezcla antes de exportar.
- Guarde su configuración junto con el resultado. Incluya el archivo fuente, las versiones del modelo y del índice, la identificación del altavoz, si corresponde, el incrustador, el extractor de tono, el cambio de tono, la relación de índice, el procesamiento y el formato de salida.
- Cuando falta un modelo o falla la inferencia antes de producir audio, comience con [Solución de problemas](../reference/troubleshooting.md). Para la conversión de micrófono, consulte [Conversión de voz en tiempo real](real-time.md).

## Convertir una grabación en RVC WebUI (Mainline - Original RVC) {#convert-a-recording-in-mainline-rvc}

### Configurar la WebUI

En Windows, utilice un paquete RVC WebUI (Mainline - Original RVC) compatible con su hardware. Extraiga el archivo completo a un directorio local antes de ejecutar su iniciador. Los paquetes de Windows que incluyen `go-web.bat` lo utilizan para iniciar la WebUI local. Deje la consola abierta mientras realiza la conversión. Si el navegador no se abre automáticamente, utilice la dirección local impresa en la consola.

### Cargue el modelo y convierta

Coloque el punto de control de inferencia en `assets/weights` y su índice de recuperación correspondiente, si se proporciona, en `logs`. Abra **Inferencia de modelo** y actualice las listas de voz e índice. Elija el punto de control y el índice coincidente. Establezca la tasa de recuperación en cero para los modelos sin índice.

Proporcione a la WebUI la ruta completa a un archivo WAV local corto. Si la ruta falla, copie el archivo de prueba en una ubicación simple como `C:\RVC\input\test.wav`. Mantenga la transposición en cero para la primera pasada y seleccione RMVPE si su compilación lo ofrece. Haga clic en **Convertir**, luego escuche en el reproductor de salida y guarde el resultado usando su control de descarga. Si la generación falla, lea el mensaje de la consola antes de cambiar la configuración. Por lo general, un modelo que no aparece en la lista debe moverse al directorio de pesos o redescubrirse mediante la actualización.

## Convertir una grabación en Applio

### Configurar una prueba de un solo archivo

En Desktop, espere hasta que el motor esté listo, agregue el modelo de inferencia a la biblioteca y abra **Convertir audio** en modo de archivo único. En Gradio, abra la interfaz del navegador y seleccione **Convertir audio** o **Inferencia**, según la versión. Actualice la lista de modelos después de agregar un punto de control si falta.

Seleccione la voz y su índice emparejado, luego confirme el incrustador de contenido esperado por ese modelo. Cargue una grabación corta y elija WAV o FLAC para la prueba. Verifique las configuraciones transferidas de una ejecución anterior, especialmente el tono, la recuperación y los efectos. Una línea de base útil comienza en cero semitonos con los efectos desactivados. Inicie el trabajo una vez, espere el resultado y compare la misma frase en ambas grabaciones.

### Ajuste la prueba antes de ejecutar un lote

 | Lo que escucha | Qué probar |
| --- | --- |
 | Las notas saltan o se tambalean | Compara extractores de tono usando la misma frase y luego prueba la transposición por separado. |
| La voz convertida conserva el timbre de origen | Los encoders HuBERT genéricos pueden conservar rasgos del hablante. Comprueba que el encoder coincida con el modelo y prueba varias grabaciones limpias sin recuperación. Si el encoder de entrenamiento conserva el timbre de origen, vuelve a entrenar con un encoder compatible como ContentVec y reconstruye el índice. |
| Sibilantes o respiraciones distorsionadas | Prueba por separado menos recuperación y más protección de sonidos sordos. Si el problema persiste con varias grabaciones limpias, corrige o añade ejemplos de sibilantes y respiraciones en el conjunto de entrenamiento y vuelve a entrenar. |
 | La voz tiene un nivel desigual | Ajuste la envolvente del volumen o nivele la pista terminada. Compruebe que la fuente en sí esté limpia. |

Cuando la línea base funcione, cambie a **Batch** y elija varios archivos o un directorio de entrada, según la edición. Mantenga la salida en una ubicación separada. Utilice una ejecución diferente para archivos que necesiten configuraciones de tono diferentes y escuche al menos un resultado de cada grupo antes de usar todo el lote.

Para problemas de importación de modelos y explicaciones detalladas de configuración, utilice [modelos y archivos RVC](../start/models.md), [Tono y calidad de audio](audio-quality.md) y [Solución de problemas](../reference/troubleshooting.md)].
