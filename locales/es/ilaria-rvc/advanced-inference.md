---
label: "🎛️ Procesamiento y exportación"
order: 89
permalink: /ilaria-rvc/advanced-inference/
---
# Procesamiento y exportación

## Establecer un valor preestablecido

Abra **Configuración de inferencia** para individual o por lotes. Elija el modelo y marque **Speaker ID** para un punto de control de varios altavoces. Zero es el espacio habitual para una sola voz. Deje el tono en cero, la recuperación en cero y el procesamiento para una primera referencia. Un índice cargado no tiene efecto de recuperación en cero. Active una opción a la vez y reproduzca la misma frase fuente.

 | Control | Dónde actúa | Qué escuchar |
| --- | --- | --- |
 | Audio dividido | Encuentra lugares tranquilos para dividir una grabación preservando el tiempo. | Verifique uniones, terminaciones de palabras, respiraciones y espacios en blanco. |
 | Autotune | Mueve F0 sonoro hacia notas cromáticas cercanas. Utiliza guía de tono. | Compara notas expuestas y vibrato. |
 | Lanzamiento propuesto | Utiliza una frecuencia objetivo y el tono sonoro medio de la fuente para estimar un cambio limitado. | Pruebe los extremos alto y bajo del rendimiento antes de una ejecución completa. |
 | Cambio de formantes | Cambia la resonancia vocal antes de la conversión. Una proporción de 1 mantiene la línea de base. | Comparar vocales en el mismo tono y nivel de escucha. |
 | Audio limpio | Aplica reducción de ruido después de la conversión. | Escuche colas acuosas o consonantes perdidas. |
 | Postproceso | Aplica los efectos seleccionados a la salida convertida. Los controles de ganancia, cambio de tono y limitador exponen. | Comparar niveles coincidentes con efectos desactivados. Mantenga una exportación seca para editarla más adelante. |

La sección de inferencia **Postproceso** aplica efectos al audio convertido. Los **Datos de proceso** de Training tienen su propio ajuste de nivel por segmento.

## Extracción de tono y contenido

RMVPE es el estimador del tono de referencia. FCPE, Swift, Beatrice y Parselmouth están disponibles cuando la operación seleccionada los admita. Compare los métodos de tono en una prueba A/B estrecha. El método de tono estima F0, mientras que [embedder](embedders.md) extrae características que deben ajustarse al modelo.

## Exportar y comparar

Seleccione WAV o FLAC para editar y archivar copias. MP3, OGG y M4A son opciones de distribución más pequeñas. El reproductor de salida descarga el formato seleccionado. Batch también escribe archivos en el directorio de salida elegido. Verifique la primera salida y su nombre antes de procesar muchas entradas.

El reproductor de formas de onda admite la reproducción y la búsqueda, incluidos los saltos de las teclas de flecha cuando se enfoca. Las entradas muy largas, grandes o no compatibles pueden utilizar el reproductor estándar del navegador. Para realizar una comparación A/B útil, combine volúmenes y escuche marcas de tiempo idénticas.
