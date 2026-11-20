# Texto a voz y RVC

[Descarga Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Texto a voz (TTS) genera una grabación fuente a partir de las palabras que usted escribe. Luego, RVC aplica un modelo de voz independiente a esa grabación. La voz TTS proporciona pronunciación, acento, sincronización y la mayor parte de la expresión. El modelo objetivo cambia cómo suena esa actuación.

## Realiza una breve prueba

1. Abre el espacio de trabajo TTS. Escriba algunas oraciones o proporcione un archivo de texto UTF-8.
2. Elige un idioma y la voz de origen. Ilaria RVC ofrece voces de Microsoft Edge en línea y voces de Windows instaladas para uso sin conexión. Cada motor de voz puede exponer un conjunto diferente de controles de velocidad, volumen y tono de fuente.
3. Genera y escucha la fuente antes de convertirla. Si un nombre o acrónimo se pronuncia mal, ajuste la redacción o seleccione una voz fuente más adecuada.
4. Seleccione un modelo y conviértalo. Comience con una transposición neutral y juzgue las grabaciones originales y convertidas una al lado de la otra.
5. Genera guiones largos en párrafos cuando sea práctico. Mantenga las ediciones y exportaciones con nombres consistentes para que se pueda regenerar una sola oración más adelante.

## Diagnostique la etapa correcta

 | Lo que escucha | Qué probar |
| --- | --- |
 | La fuente enfatiza la palabra incorrecta | Agregue puntuación, reescriba la oración o pruebe con una voz TTS diferente. |
 | La fuente suena apresurada | Ralentiza la fuente o divide el texto en oraciones más cortas. |
 | El habla es clara antes de la conversión y apagada después | Pruebe con un extractor de tono diferente o con menos influencia de recuperación. |
 | La lista de voces en línea no está disponible | Verifique la conectividad o elija una voz de Windows instalada. |
 | La voz cambia de tono entre párrafos. | Utilice la misma voz de origen, configuración y modelo de destino para cada párrafo. |

La conversión de voz conserva gran parte de la entrega de origen. Elija la fuente según el rendimiento que desee conservar. Para obtener más comparaciones, utilice la [guía de calidad de audio](audio-quality.md).

[Proyecto Ilaria RVC y motores TTS compatibles](https://github.com/TheStingerX/Ilaria-RVC)
