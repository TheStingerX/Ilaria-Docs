---
label: "🎚️ Tono y calidad de audio"
order: 94
permalink: /audio-quality/
---
# Sintonice el tono y la calidad de audio

Elija un breve extracto que contenga el problema. Realice una conversión de referencia y compárela con una configuración modificada a la vez. Escuche a niveles similares para que un resultado más alto no gane la comparación solo por volumen. Para la música, compare primero la voz convertida sola y luego en la mezcla.

## Tono, rango y resonancia

El tono mide qué tan alto o bajo es un sonido sonoro. **F0**, o frecuencia fundamental, es la parte periódica de la señal a partir de la cual un extractor de tono estima el contorno. Un modelo guiado por tono utiliza ese contorno cuando sintetiza la salida.

**El tono** cambia el contorno en semitonos. Los valores positivos lo aumentan y los negativos lo reducen. Cada octava tiene 12 semitonos. Por ejemplo, aplicar `+12` a una nota sonora a 220 Hz da 440 Hz. Un ajuste de cero mantiene la referencia de tono de la grabación.

Para el habla, comience desde cero. Si el clip se encuentra muy fuera del rango cómodo del modelo objetivo o suena forzado, compárelo con un pequeño desplazamiento hacia arriba o hacia abajo. Para cantar sobre un instrumento existente, compare cero primero. Un cambio que cambia el tono de la voz puede chocar con la pista de acompañamiento. Los cambios de octava mantienen los nombres de las notas, aunque el modelo aún necesita manejar el rango resultante. Compara las notas expuestas más bajas y más altas antes de comprometerte con una canción completa.

**Los formantes** describen resonancias que ayudan a distinguir las vocales y el carácter de la voz. Utilice el procesamiento de formantes sólo después de que el contorno de tono esté funcionando. El tono y la resonancia pueden necesitar diferentes ajustes. En compilaciones con tono de inferencia y efecto de cambio de tono, el primero cambia el tono extraído antes de la síntesis y el segundo actúa sobre el audio resultante.

## Comparar extractores de tono

Comience con **RMVPE**, el valor predeterminado para la inferencia actual de Ilaria RVC. Si el tono es inestable, pruebe otro extractor disponible en su compilación, como **FCPE** o **Swift**. Mantenga la misma entrada, cambio de tono, relación de índice y formato de salida para cada ejecución.

- Para una nota sostenida, escuche si el tono se duplica o reduce a la mitad de manera repentina. Si varios extractores fallan al mismo tiempo, busque otro cantante, un instrumento en la raíz vocal o un recorte severo.
- Para hablar en voz baja, asegúrese de que la entrada contenga una vocal con voz clara. Aumentar el nivel de un clip que contiene principalmente ruido puede dificultar el diagnóstico.
- Para un lote grande, compare primero un extracto de las voces fuente más baja y más alta. Compara el tiempo de procesamiento con el mismo archivo y configuración en la máquina deseada.

La extracción de tono y la extracción de contenido son etapas separadas. Cambiar el extractor F0 estima un contorno de tono diferente a partir del mismo audio. El integrador de contenido aún debe coincidir con el modelo.

## Realice ajustes específicos

 | Si escucha | Pruebe primero | Qué escuchar |
| --- | --- | --- |
 | Una nota salta, gorjea o desaparece | Compare un segundo extractor F0 compatible en el mismo extracto. | Notas sostenidas que siguen la fuente sin saltos repentinos de octava. |
 | El timbre objetivo es débil | Verifique el modelo, el incrustador y el índice coincidente. Compare el índice deshabilitado con un pequeño aumento de **Proporción de índice**. | Un tono más reconocible con palabras aún inteligibles. |
 | Las palabras se vuelven borrosas después de aumentar la recuperación | Baje la **Proporción de índice** y reproduzca las mismas consonantes. | Las sílabas se vuelven más claras sin perder el carácter que deseas. |
| Respiraciones o consonantes metálicas | Prueba el mismo modelo con varias grabaciones limpias. Si el defecto persiste, revisa el conjunto de entrenamiento por recortes, reducción excesiva de ruido o escasez de respiraciones y consonantes limpias. Corrige los datos y vuelve a entrenar el modelo. Limpiar el audio de inferencia no elimina los artefactos aprendidos. | Respiraciones y consonantes como `s` y `f` claras, sin zumbidos. |
 | El volumen baja dentro de una frase | Compare una configuración de **Sobre de volumen** diferente. Verifique la fuente en busca de una puerta, luego pruebe **Split Audio** si el problema aparece solo en clips largos. | Terminaciones de palabras consistentes sin tragar pausas naturales. |
 | Una voz procesada suena frágil | Desactive la limpieza, la corrección automática de tono y los efectos de salida. Vuelva a agregarlos individualmente después de una conversión limpia. | Menos artefactos en sibilantes y vocales sostenidas. |
 | Los picos de salida distorsionan | Compruebe si hay recortes en la forma de onda original o convertida. Reduzca las ganancias innecesarias y compare antes de limitar. | Picos limpios y sin crujidos en sílabas fuertes. |

Evite cambiar el incrustador para perseguir un sonido. Debe coincidir con la representación de características en la que se entrenó el modelo. **Relación de índice** combina características recuperadas de un índice de entrenamiento coincidente en la conversión. No proporciona un impulso de calidad genérico. Una combinación alta puede hacer que la pronunciación sea menos clara, especialmente en una fuente desconocida.

En el motor de archivos de Applio, una configuración de **Envolvente de volumen** más cercana a cero sigue más de cerca la dinámica de la fuente. Para **Proteger consonantes sordas**, los valores inferiores a 0,5 refuerzan la protección y 0,5 la desactiva en ese motor. Consulte la información sobre herramientas y las notas de la versión de su aplicación antes de llevar esos números a otra bifurcación.

## Diagnosticar de oído y con el analizador

1. Marque la marca de tiempo del problema. Comprueba si aparece en la fuente, en la voz separada o solo en el resultado convertido.
2. Si está en la fuente, corrija la entrada primero. Compare una toma alternativa antes de utilizar una gran eliminación de ruido. Bajar el volumen de una grabación recortada no puede restaurar los picos que faltan.
3. Si aparece en la conversión, compare los efectos desactivados, el índice desactivado y un extractor de tono compatible en pasadas separadas. Verifique el paquete del incrustador y del modelo antes de asumir que el punto de control es deficiente.
4. Utilice el **Analizador de audio** de Ilaria RVC, cuando esté disponible, para comparar formas de onda, estimaciones de tono, espectros y niveles. Un diagrama de tono puede indicarle un salto sospechoso y el audio fuente le indica si fue parte de la actuación.
5. Confirme la mejora en un segundo extracto. Mantenga la configuración solo si funciona en el material que planea exportar.

Para cantar, probar respiraciones, consonantes, vibrato y notas sostenidas. Para el habla, pruebe con frases tranquilas y fuertes y al menos una oración con consonantes agudas. Si la salida aún falla, envíe una breve muestra permitida y su configuración con un [informe de solución de problemas](../reference/troubleshooting.md).
