---
label: "Texto a voz"
icon: ":speech_balloon:"
order: 96
permalink: /ilaria-rvc/tts/
description: "Utilice Inferencia → TTS para convertir el texto escrito en una grabación. Puedes escuchar el discurso generado directamente o convertirlo con un modelo RVC."
---
# Texto a voz

[Descarga Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Utilice **Inferencia → TTS** para convertir el texto escrito en una grabación. Puedes escuchar el discurso generado directamente o convertirlo con un modelo RVC. Las dos etapas realizan trabajos diferentes: el motor de voz decide cómo se pronuncia y el ritmo del guión, mientras que RVC cambia el carácter de la voz de la grabación. Si un nombre se pronuncia mal en el primer resultado, corrija el guión o la voz de origen antes de ajustar RVC.

> **Novedades de la 2.3.0** · ElevenLabs se incorpora a TTS. Introduce tu clave API de ElevenLabs, elige una voz y prueba una frase breve.

> **Novedades de la 2.4.1** · Kokoro v1.0. En **Inference → TTS → Kokoro (local)** instala Kokoro por separado. Ocupa unos 528 MB tras la instalación. Elige una voz y prueba una frase corta. Edge necesita Internet, Windows usa las voces instaladas y ElevenLabs necesita una clave API.

## Elija una voz de origen

| Motor | Cuándo elegirlo | Qué verificar |
| --- | --- | --- |
| Microsoft Edge | Quiere buscar voces en línea por idioma. | El servicio necesita una conexión a Internet y envía el texto a Microsoft para su síntesis. Elija una voz que hable el idioma del guión. |
| Windows | Desea realizar una síntesis sin conexión en la instalación local de Windows. | La lista depende de las voces de escritorio compatibles instaladas en esa PC. Si falta la voz, verifique la configuración de voz de Windows y actualice la lista. |
| ElevenLabs | Quieres usar una voz de tu cuenta de ElevenLabs. | Necesitas Internet y una clave API de ElevenLabs. El texto se envía a ElevenLabs para la síntesis. |
| Kokoro (local) | Quieres generar voz en local con Kokoro v1.0. | Instala Kokoro desde la pestaña TTS. Ocupa unos 528 MB una vez instalado e incluye 54 voces, entre ellas Sara y Nicola en italiano. |

La voz fuente pronuncia las palabras. **Modelo de voz** es el modelo RVC que cambia el timbre posteriormente. Por ejemplo, comience con una voz de origen italiana para una escritura italiana y luego seleccione el modelo RVC de destino por separado. Un modelo de voz fuerte no añade distinciones fonéticas que faltan en la fuente.

## Realizar una primera grabación

1. Abrir **Inferencia → TTS**. Escriba una oración corta o importe un archivo UTF-8 `.txt`. El campo de texto admite hasta **10.000 caracteres**. Comience con un párrafo antes de importar un guión largo.
2. Elija el motor de voz. Filtra la lista por idioma, elige una voz de origen y usa **Actualizar voces** si la lista está obsoleta.
3. Deje la tasa y el volumen cerca de sus valores predeterminados y deje la conversión RVC desactivada para la primera prueba. Genera el discurso y escucha el resultado original.
4. Consulta nombres, puntuación y pausas. Si una línea suena apresurada, divida la oración o ajuste el ritmo. Si una abreviatura se lee incorrectamente, intente escribirla. Genere nuevamente el mismo extracto breve y compárelo.
5. Mantenga esta primera versión buena como referencia antes de cambiar los controles RVC.

## Convertir el discurso generado

1. Elija el destino **Modelo de voz** encima del panel TTS. Utilice una inferencia `.pth` compatible con su aplicación. Su combinación `.index` es opcional.
2. Habilite la **conversión RVC**. Comience con el tono de conversión en **0 semitonos**, el extractor de tono predeterminado, **Index Ratio 0** y los efectos opcionales desactivados. Utilice el codificador de contenido esperado por el modelo de destino.
3. Ejecute la conversión y luego escuche los reproductores original y convertido por separado. Compare la misma frase en un nivel de reproducción similar. Utilice el control de descarga del reproductor convertido para guardar el WAV.
4. Si tiene el índice coincidente, pruebe con un pequeño aumento en **Proporción de índice** y compare nuevamente. Manténgalo en cero si no utiliza un índice. Cambiar la recuperación no puede corregir una palabra que el motor TTS leyó incorrectamente.

## Qué cambia cada configuración

| Control | Qué cambia | Primer ajuste para probar |
| --- | --- | --- |
| Velocidad de voz | La velocidad de la voz de origen antes de la conversión. | Disminuya un poco la velocidad si las sílabas se juntan. Verifique el tiempo antes de afinar el tono. |
| Volumen de origen | El nivel del habla generada antes de la conversión. | Mantener la fuente limpia y a un nivel útil. Compare archivos con un volumen similar. |
| Tono de origen en Hz | Cambia el tono durante la síntesis de Edge cuando sea compatible. | Primero déjelo en su estado predeterminado. Cámbielo por separado del tono RVC. |
| Tono RVC en semitonos | Transpone la voz generada durante la conversión. | Comience desde cero y pruebe pequeños cambios. Marque las palabras más bajas y más altas de la muestra. |
| Extracción de tono | Estima el contorno del tono a partir del audio generado. | Compare los extractores sólo si el tono convertido salta o se tambalea. |
| Relación de índice | Controla con qué intensidad la conversión utiliza el índice seleccionado. | Empezar desde cero. Utilice un valor modesto sólo con el índice coincidente exacto. |
| Volumen del reproductor | Controla el volumen de escucha. | Úselo para comparar niveles de reproducción. Utilice la configuración de conversión o exportación si necesita cambiar el archivo resultante. |

## Prepare un guión más largo

Divida un guión largo en los límites del párrafo o de la escena. Mantenga la misma voz de origen, tarifa, modelo de destino y configuración de conversión en todas las secciones. Guarde las salidas con nombres ordenados como `01-intro.wav` y `02-main.wav`. Únase a ellos en un editor de audio y escuche más allá de cada límite. Haga coincidir pausas y volumen antes de exportar el archivo final.

Para scripts con más de un idioma, pruebe una frase corta en cada idioma antes de renderizar. Utilice voces o secciones de origen independientes si es necesario. Algunos contrastes fonéticos pueden seguir siendo difíciles después de la conversión debido al modelo de destino o su codificador de contenido.

## Solución de problemas

| Lo que escuchas o ves | Qué verificar |
| --- | --- |
| Edge no produce voz | Verifica el acceso a Internet, actualiza la lista de voces y prueba una oración corta de texto sin formato con otra voz compatible. |
| La lista de Windows está vacía | Compruebe qué voces de voz del escritorio están instaladas y disponibles para la aplicación. La síntesis sin conexión depende del entorno local de Windows. |
| Los clips fuente y convertidos pronuncian mal la misma palabra | Cambie la voz fuente o reescriba la palabra en el guión, luego regenere la fuente. |
| El original es claro pero la conversión distorsiona las consonantes o salta el tono | Pruebe la misma fuente con la recuperación y los efectos desactivados. Verifique el codificador y la extracción de tono. Si el mismo modelo distorsiona varias entradas limpias, inspeccione los datos de entrenamiento y considere volver a entrenar. |
| La voz convertida todavía suena como la fuente | Verifique el modelo y el codificador seleccionados. Compare otro clip limpio antes de aumentar la recuperación. |
| No aparece ningún resultado convertido | Compruebe que la **conversión RVC** esté habilitada y que la voz seleccionada sea un modelo de inferencia. Lea el primer error en el registro. |

Para otras configuraciones de conversión, consulte [Controles de inferencia](inference-buttons.md). Para obtener diagnósticos, consulte [Solución de problemas](../../reference/troubleshooting.md).
