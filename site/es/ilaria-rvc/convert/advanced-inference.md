# Procesamiento y exportación

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · RefineGAN admite entrenamiento e inferencia a 32, 40 y 44,1 kHz con RVC v2 y Pitch Guidance. La aplicación genera automáticamente el audio silencioso de 44,1 kHz. Selecciona **None** para entrenar desde cero si los pesos usan otra arquitectura, como en los pares probados KLM 5 (40 kHz) y VCTK (44,1 kHz).

[Descarga Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

> **Novedades de la 2.3.0** · [RMVPE High Register](#rmvpe-high-register)

## RMVPE High Register

En **Inference Settings**, selecciona `rmvpe`, abre **RMVPE High Register** y marca **Enable high register** si una nota aguda desaparece o baja una octava.

**Mode** usa `true_pitch` por defecto. `fold` mantiene la nota corregida una octava más baja. **Maximum F0** comienza en 1250 Hz. En **Advanced**, el umbral es 1040 Hz, la sensibilidad **Balanced** y la duración mínima 60 ms.

Pulsa **Preview original and corrected F0** para ver las curvas de los primeros 30 segundos. Convierte el mismo fragmento con y sin la opción y escucha la diferencia.

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

## Formant Shift

Los formantes son resonancias del tracto vocal que influyen en las vocales y el timbre. Formant Shifting modifica estas resonancias antes de la conversión y procura conservar la altura y la duración.

Prueba la misma frase con el mismo modelo y Pitch a cero. Usa 0.9, 1.0 y 1.1. El valor 1.0 es neutro. Los valores inferiores tienden a oscurecer las vocales y los superiores a darles brillo.

La sección de inferencia **Postproceso** aplica efectos al audio convertido. Los **Datos de proceso** de Training tienen su propio ajuste de nivel por segmento.

## Extracción de tono y contenido

RMVPE es el estimador del tono de referencia. FCPE, Swift, Beatrice y Parselmouth están disponibles cuando la operación seleccionada los admita. Compare los métodos de tono en una prueba A/B estrecha. El método de tono estima F0, mientras que [embedder](../train/embedders.md) extrae características que deben ajustarse al modelo.

## Exportar y comparar

Seleccione WAV o FLAC para editar y archivar copias. MP3, OGG y M4A son opciones de distribución más pequeñas. El reproductor de salida descarga el formato seleccionado. Batch también escribe archivos en el directorio de salida elegido. Verifique la primera salida y su nombre antes de procesar muchas entradas.

El reproductor de formas de onda admite la reproducción y la búsqueda, incluidos los saltos de las teclas de flecha cuando se enfoca. Las entradas muy largas, grandes o no compatibles pueden utilizar el reproductor estándar del navegador. Para realizar una comparación A/B útil, combine volúmenes y escuche marcas de tiempo idénticas.

> **2.2.1** · El reproductor con forma de onda incluye un control de volumen para entradas, resultados y vistas previas. Úsalo para escuchar más bajo o comparar fragmentos a niveles similares. Solo afecta a la reproducción. Para cambiar el nivel del archivo convertido, ajusta Gain en Post-Process y vuelve a convertir.
