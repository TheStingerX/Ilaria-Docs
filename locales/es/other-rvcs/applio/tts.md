---
label: "🗣️ Genera voz a partir de texto"
order: 92
permalink: /ilaria-rvc/applio/tts/
---
# Convierte un guión corto en voz convertida

Applio utiliza una voz Edge TTS en línea para leer tu texto y un modelo RVC para cambiar la voz generada. La voz de origen determina la pronunciación, el ritmo y el idioma que lee. Utilice texto que se sienta cómodo enviando al servicio de síntesis en línea.

1. Abra el espacio de trabajo de texto a voz después de que el motor esté listo y el [modelo de voz funcione](inference.md).
2. Ingrese una oración corta con puntuación. Elija una voz TTS de origen para el idioma de esa oración. Comience con su ritmo de conversación normal.
3. Seleccione su voz de inferencia RVC, el incrustador coincidente y su índice si usa uno. Comience con el cambio de tono en 0 y los efectos desactivados.
4. Genere voz y escuche el resultado. Si su interfaz hace que la fuente sintetizada esté disponible, reprodúzcala también. Si la fuente lee mal un acrónimo o hace una pausa extraña, cambie la puntuación, deletree el acrónimo o seleccione primero otra voz de fuente.
5. Cuando la frase suene bien, guarde el audio y escriba la voz de origen, la velocidad de conversación, el modelo RVC, el incrustador y el tono. Para guiones más largos, utilice secciones pequeñas con puntos de interrupción naturales y mantenga sus configuraciones consistentes.

Si el paso de generación de voz falla, pruebe una fuente de voz diferente y verifique la conexión del motor con el servicio de voz. Si la generación de voz tiene éxito y solo falla la conversión, ejecute un archivo grabado corto a través del mismo modelo RVC. Esa prueba expone problemas del modelo o del incrustador sin cambiar el script.
