---
label: "🎧 Prepare un conjunto de datos"
order: 95
permalink: /dataset-preparation/
description: "Cada clip le enseña al modelo algo sobre su voz objetivo."
---
# Prepare un conjunto de datos de voz

[Descarga Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Cada clip le enseña al modelo algo sobre su voz objetivo. Antes del entrenamiento, decida qué partes de esa voz desea que maneje el modelo y luego mantenga grabaciones que demuestren esas partes claramente. Comience con material para el que tenga permiso para usar en capacitación y conserve una copia separada de los archivos originales.

## Elija grabaciones para su objetivo

 | Objetivo | Qué recopilar |
| --- | --- |
 | Discurso conversacional | Preguntas, declaraciones, oraciones más largas y respuestas cortas con consonantes y vocales variadas. |
 | Discurso expresivo | Los estilos de expresión previstos tanto en niveles tranquilos como enfáticos. Registre variaciones en varias frases. |
 | Cantar | Vocales sostenidas, cambios de notas y ejemplos cerca de los cómodos extremos altos y bajos del rango deseado. |
 | Más de un idioma | Ejemplos claros de sonidos y frases que difieren entre idiomas, grabados por el mismo hablante. |

> ContentVec puede limitar los modelos multilingües. Aunque los datos incluyan la lengua objetivo, el codificador puede perder distinciones fonéticas. Reserva grabaciones de prueba de cada lengua y compara su pronunciación después de un entrenamiento breve. Si los mismos errores se repiten en grabaciones limpias, documenta la limitación para esa lengua. Cambiar el codificador o la configuración de entrenamiento no es una solución fiable.

Un conjunto de grabaciones limpio y variado es un mejor punto de partida que una colección más grande de frases repetidas o audio dañado. No existe una duración que garantice un buen resultado. Audite lo que cubren las grabaciones antes de decidir si necesita más material.

## Planifica una sesión de grabación expresiva

Una grabación puede estar libre de ruido y aun así cubrir muy poca voz. Construya la sesión en torno al rendimiento que espera convertir. Para la narración, registre una lectura clara con frases intencionales. Para la conversación, incluya respuestas espontáneas y cambios de ritmo. Para cantar, recopile tomas secas a capella en todo el registro previsto, con vocales sostenidas y transiciones entre notas. Las líneas habladas por sí solas le dan al modelo poca exposición a esos sonidos cantados.

Grábate o acuerda el modelo previsto y su uso con el intérprete antes de grabar. Para una conversación remota, haga que el hablante capture su propio micrófono localmente y use solo esa pista.

 | Bloque de sesión | Ejemplo de asignación | Qué capturar |
| --- | --- | --- |
 | Narración expresiva | 10 minutos | Lea un pasaje con cambios de énfasis, emoción y ritmo. |
 | Conversación | 10 minutos | Recopile discursos espontáneos con preguntas, reacciones breves y respuestas más largas. |
 | Cobertura fonética | 10 minutos | Utilice material como Harvard Sentences, Rainbow Passage o Comma Gets a Cure para ejercitar vocales, diptongos, oclusivas como P/B/T/K y sibilantes como S/Z/SH. |
 | Rango de rendimiento | 20 minutos | Registre la entrega que necesita el modelo, desde el habla suave hasta la proyección. Pruebe ritmos variados, emociones y risas o suspiros claros cuando sea relevante. Para un modelo multilingüe, incluya una cobertura intencional de los idiomas de destino. |

Ese plan de 50 minutos es un ejemplo de discurso expresivo. Un conjunto enfocado de diez minutos puede ser más útil que un conjunto más grande de grabaciones repetitivas o dañadas. Agregue material para llenar un espacio audible en la cobertura. La duración del conjunto de datos por sí sola no determina el sobreajuste.

### Configura el micrófono

Captura un solo micrófono en una pista mono. Utilice un filtro pop o un parabrisas, mantenga constante la distancia del micrófono y establezca la ganancia mientras prueba la línea planificada más alta. Una habitación tranquila con muebles suaves reduce los reflejos en su origen. Prefiera un original seco a una grabación muy limpia con reverberación audible o artefactos de separación. Si convierte grabaciones estéreo existentes a mono, escuche ambos canales y el menú desplegable. Utilice un canal limpio si la señal combinada suena hueca o pierde detalles.

### Revisa el audio preparado

- **Frecuencia de muestreo:** Mantén los originales a su velocidad de grabación. Elija una tasa de entrenamiento respaldada por la arquitectura y los pesos previamente entrenados. La etapa de preprocesamiento puede volver a muestrear cuando sea necesario. El muestreo superior no agrega ningún detalle a la grabación original.
- **Niveles:** Compare los niveles de la sesión y corrija grandes diferencias de ganancia causadas por la ubicación del micrófono o la configuración de grabación. Preservar cambios intencionales en la entrega. Verifique lo que la interfaz de entrenamiento ya normaliza antes de aplicar un pase de sonoridad por separado.
- **Respiraciones y reacciones:** Mantenga respiraciones naturales y señales expresivas limpias donde sirvan para el uso previsto. Recorta las risas entrecortadas, los jadeos ásperos y los estallidos explosivos. Escuche ediciones inciertas con auriculares.
- **Pausas:** Mantenga pausas naturales y elimine intervalos largos y vacíos. Si desea probar un clip de silencio independiente, realice una comparación con la misma configuración y escuche las pausas prolongadas. Algunas canalizaciones de preprocesamiento ya manejan el silencio.

## Grabar o seleccionar material limpio

- Utilizar un altavoz para un primer modelo. Excluya voces superpuestas, respuestas de la multitud y diálogos en los que el hablante cambia a mitad del clip.
- Escuche el ruido del ventilador, los ecos, la música y la distorsión digital. Un clip que suena aceptable en una mezcla alta aún puede contener problemas que son obvios cuando la voz está aislada.
- Si está grabando una nueva sesión, utilice una posición de micrófono constante y deje el máximo espacio libre. Pruebe la frase más fuerte antes de grabar la sesión completa.
- Al combinar sesiones, escúchalas una al lado de la otra. Mantenga variaciones útiles en la voz y descarte las diferencias abruptas causadas por efectos pesados, sonido ambiental o un micrófono poco confiable.
- Elimina tomas duplicadas si añaden poca variedad. Deje a un lado diferentes sesiones o pasajes para su evaluación antes de editar cortes adyacentes en la carpeta de capacitación.

## Limpiar una copia de trabajo

1. **Aislar la voz de destino.** Si la fuente incluye un acompañamiento, intente separar y escuchar la raíz vocal resultante. Rechace secciones con sangrado de instrumentos, coros o artefactos de separación obvios.
2. **Haga cortes en los límites naturales.** Recorte el aire muerto prolongado y elimine las secciones inutilizables. Escuche cada corte en busca de consonantes perdidas, cambios abruptos o la entrada de un segundo hablante.
3. **Aplica solo la limpieza que necesita la grabación.** Compara cualquier pasada de eliminación de ruido con el original. Si la versión limpia traga consonantes, difumina las sílabas o introduce un sonido pulsante, reduzca el procesamiento o reemplace la toma.
4. **Compruebe los niveles en todos los archivos.** Mantenga suficiente margen para pasajes ruidosos y equilibre las diferencias importantes en los niveles de grabación. Bajar el volumen de un archivo ya recortado deja los picos dañados en la grabación.
5. **Exporta en un formato sin pérdidas que tu compilación pueda leer.** WAV es un formato de trabajo práctico. Volver a codificar un archivo comprimido como WAV conserva el resultado de esa decodificación y no puede restaurar los detalles perdidos.

El motor de entrenamiento puede dividir archivos en sus propios segmentos y volver a muestrearlos según la configuración del modelo seleccionado. Mantenga intactas las palabras y frases utilizables durante la edición manual y deje que la etapa de preprocesamiento de capacitación se encargue de su propia segmentación.

## Organice el conjunto de datos y las pruebas de escucha.

Mantenga las entradas de comparación, las grabaciones descartadas y las salidas convertidas fuera de la carpeta de capacitación. Este ejemplo utiliza carpetas separadas para originales, capacitación y evaluación.

```text
my-voice-project/
  originals/
  training-audio/
    session-a-01.wav
    session-a-02.wav
    session-b-01.wav
  evaluation/
    speech-test.wav
    expressive-test.wav
  notes.md
```

Punto de preprocesamiento en `training-audio/`. Mantenga `evaluation/` separado. Un conjunto de comparación útil podría incluir una frase hablada desconocida con consonantes agudas, un pasaje tranquilo y una frase expresiva corta. Para un modelo de canto, incluya una nota sostenida y una frase que cruce registros. Retenga pasajes o sesiones completos cuando pueda, para que el audio de la prueba no duplique clips de entrenamiento cercanos.

Si entrenas con una interfaz que admite más de un orador, sigue sus reglas de identificación y carpeta de orador. Una carpeta de un solo altavoz con archivos de audio directamente dentro es más fácil de auditar para una primera ejecución.

## Revisar el conjunto de datos en Ilaria RVC

Las compilaciones recientes de Ilaria RVC le permiten arrastrar audio o un conjunto de datos ZIP a la interfaz de capacitación y administrar conjuntos de datos importados allí. Seleccione el conjunto de datos deseado y ejecute el **Comprobador de conjuntos de datos**. Utilice sus vistas previas breves para inspeccionar archivos marcados por silencio, recorte, niveles inconsistentes o problemas de decodificación. El **Analizador de audio** puede ayudar a comparar archivos sospechosos mediante medidas de formas de onda, tono y nivel. Confirme el diagnóstico escuchando antes de retirar material que de otro modo sería útil. Las etiquetas de disponibilidad y control siguen a la versión instalada.

 | Lo que notas | Qué hacer antes del entrenamiento |
| --- | --- |
 | El archivo no se decodifica | Verifica que se reproduzca en un editor. Vuelva a exportar desde el original si es posible y verifique que se abra la copia. |
 | Secciones de casi silencio | Audite el rango marcado y recorte los tramos vacíos. Mantenga pausas naturales que ayuden a preservar los límites de las frases. |
 | Picos distorsionados o aplanados | Comparar con la grabación original. Reemplace una toma audiblemente cortada cuando tenga una alternativa limpia. |
 | Los sonidos de fondo siguen la voz | Escuche la raíz aislada en los auriculares y excluya las partes afectadas cuando la separación suene inestable. |
 | Una sesión es mucho más tranquila | Compruebe si la actuación del orador es intencionalmente silenciosa. Ajuste las diferencias de ganancia de grabación mientras conserva la dinámica natural útil. |

Antes de continuar, reproduzca algunos clips de cada sesión, confirme que seleccionó la carpeta preparada y registre la versión de la carpeta en sus notas. Luego [ejecute un experimento de entrenamiento](training.md).

[Estimador de VRAM y entrenamiento](../reference/vram-estimator.md)
