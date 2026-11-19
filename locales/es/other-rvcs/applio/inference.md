---
label: "Convertir una grabación"
icon: ":studio_microphone:"
order: 95
permalink: /ilaria-rvc/applio/inference/
---
# Convertir una grabación en Applio

Comience con una grabación corta que pueda reconocer al instante. El material de prueba oral podría ser "¿Podrías poner el libro azul junto a la ventana?" seguido de una pausa tranquila. Para una canción, utiliza unos segundos de una voz principal aislada. El motor recibe el sonido presente en ese archivo, incluido el ruido de la habitación, el acompañamiento u otros parlantes.

## Realizar una conversión de referencia

1. Abra **Convertir audio**. En versiones anteriores de Gradio, busque **Inferencia**. Seleccione el modo de archivo único.
2. Seleccione la voz de inferencia que [instaló](models.md) y confirme el incrustador y el ID del altavoz. Si la configuración se restableció cuando cambió las voces en Desktop, revísela antes de usar la nueva voz.
3. Añade tu grabación de audio. Utilice **Pitch** en 0 y desactive el procesamiento y los efectos adicionales. Comience con la influencia de recuperación en 0. Seleccione WAV o FLAC para poder comparar resultados sin pérdidas.
4. Inicie la conversión una vez. En Escritorio, observe el estado del trabajo si el resultado está en cola. En Gradio, deje abierta la consola de inicio para ver errores que no caben en el navegador.
5. Reproduce ambos archivos. Compruebe que las palabras lleguen a los mismos lugares y que el resultado contenga la voz de destino. Guarde el resultado en una carpeta que usted controle y registre la configuración que utilizó.

## Cambie un control a la vez

| Control | Un primer experimento útil |
| --- | --- |
| Cambio de tono | Pruebe con un pequeño cambio de semitono si la fuente se encuentra fuera del rango cómodo de la voz de destino. +12 duplica la frecuencia y −12 la reduce a la mitad. Reproduce una frase alta y baja antes de aplicar el cambio a una canción. |
| Extractor de tono | Compara los estimadores disponibles cuando una nota salta o una frase suave pierde voz. Mantenga fijo el modelo, la transposición y la entrada. |
| Proporción de funciones de búsqueda | Con el índice correcto cargado, aumente la influencia en pequeños pasos. Escuche si hay un carácter objetivo más fuerte, consonantes apagadas o filtraciones de fuentes no deseadas. |
| Envolvente de volumen | Un valor cercano a 0 sigue más de cerca la dinámica de la fuente. Un valor cercano a 1 retiene más dinámica generada. Compare sílabas bajas y fuertes a un volumen de reproducción coincidente. |
| Proteger consonantes sordas | En el motor guiado por tono actual, las configuraciones por debajo de 0,5 activan la protección. Los valores más bajos lo aumentan. Pruebe una frase con respiraciones y consonantes como S, F o T. |

**Split Audio** puede ayudar a procesar un archivo largo en partes. Escuche a través de las uniones. **Clean Audio** puede reducir el ruido no deseado, así que compárelo con una línea de base limpia para ver cambios en los detalles. **El tono propuesto** deriva un cambio dirigido al objetivo y puede interactuar con la transposición manual. Pruebe cada uno por sí solo. Los efectos activados mediante **Postproceso** se aplican al audio generado y pueden enmascarar un problema de conversión.

## Ejecute un lote pequeño

1. Coloque dos archivos de trabajo y un ejemplo más silencioso o más largo en una carpeta de entrada de prueba.
2. Elija el modo por lotes. Seleccione la entrada y utilice un destino diferente donde el motor pueda escribir. Para que Gradio se ejecute en otra máquina, deben existir rutas en esa máquina.
3. Copie el modelo probado, el incrustador, el índice y la configuración de paso. Inicie la prueba e inspeccione los resultados antes de procesar una colección completa.
4. Si una entrada falla, convierta ese archivo solo usando la misma configuración. Si falla solo en el lote, verifique la ruta y el nombre de la salida. Guarde los archivos que desee mantener fuera del almacenamiento de trabajo temporal.

## Diagnosticar el resultado

- **El trabajo no produjo audio.** Lea primero el error. Verifique que la entrada se reproduzca, el motor verifique y el modelo seleccionado sea una exportación de inferencia.
- **El tono suena nervioso o electrónico.** Pruebe el incrustador correcto, un estimador de tono y una entrada limpia sin efectos. Vuelva a reproducir el original para ver si el ruido o el salto ya estaban presentes.
- **El habla está presente pero la voz objetivo suena débil.** Verifique la identificación del hablante y luego compare la recuperación solo si tiene el índice correcto.
- **El archivo se recorta o pulsa.** Pruebe en un nivel de fuente más bajo y desactive el procesamiento que cambia la ganancia. Para cantar, compare la voz aislada antes de volver a mezclarla en la pista de acompañamiento.
