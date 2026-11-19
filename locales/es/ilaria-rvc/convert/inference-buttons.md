---
label: "Explicación de los controles de inferencia"
icon: ":control_knobs:"
order: 81
permalink: /ilaria-rvc/inference-buttons/
---

# Explicación de cada control de inferencia

[Descarga Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

La inferencia utiliza una voz entrenada para convertir una grabación. Para una primera prueba, cargue un WAV breve y limpio, seleccione una voz, deje el tono en cero y mantenga desactivadas las funciones opcionales. Compare la entrada y la salida antes de cambiar un valor.

> **Novedades de la 2.3.0** · [RMVPE High Register](advanced-inference.md#rmvpe-high-register)

## Voz, audio y salida

| Control | Qué hace |
| --- | --- |
| `Voice Model` | Carga la exportación de inferencia seleccionada. Elija la voz deseada después de la importación. Un punto de control de formación G o D es para formación continua. |
| `Refresh` | Escanea la biblioteca de modelos nuevamente. Verifique la voz seleccionada después. |
| `Unload Voice from VRAM` | Libera la voz cargada de la memoria de la GPU. Úselo para liberar memoria para otra tarea. |
| `Audio to convert` | Elige la fuente de grabación. Utilice una voz seca en lugar de una mezcla con instrumentos para una prueba limpia. |
| `Pitch` | Cambia el tono en semitonos, de −24 a +24. Zero conserva el registro fuente. Doce semitonos es una octava. |
| `Convert` | Inicia el trabajo. Lea el registro de salida y escuche el audio de salida. Guarde la salida del reproductor cuando esté disponible. |
| `Audio folder` y `Output` en inferencia por lotes | Elija la carpeta de entrada y el destino para varios archivos. Pruebe primero un archivo representativo y utilice una carpeta de salida independiente. |

## Configuración de inferencia

| Control | Qué hace y cómo probarlo |
| --- | --- |
| `Speaker ID` | Elige una ranura de voz compatible con el modelo. Utilice el valor predeterminado para un modelo normal de una sola voz. |
| `Pitch Extraction` | Estima el tono de origen. Comience con RMVPE y compare otro método disponible sólo si las notas saltan o el contorno suena inestable. |
| `Path of index` y `Auto-detect index path` | Seleccione un índice opcional coincidente por ruta o de la lista detectada. Comprueba que pertenece a este modelo y codificador. |
| `Index Ratio` | Combina funciones recuperadas en conversión. Zero desactiva la recuperación. Aumente gradualmente con un índice coincidente y compare la misma frase. |
| `Resampling, 0=none` | Cambia la velocidad del audio de salida. Cero mantiene la tasa de producción del modelo. El remuestreo no puede restaurar los detalles faltantes. |
| `Input source volume / Normalized Output` | Combina las envolventes de sonoridad fuente y convertida. Cerca de cero sigue más de cerca la dinámica de la fuente. Un ajuste de uno deja el sobre convertido en su lugar. |
| `Protect clear consonants and breathing sounds` | Reduce el impacto de la recuperación de sonidos sordos en la conversión guiada por tono. Los valores más bajos fortalecen la protección; 0,5 lo apaga. Su efecto puede limitarse con la recuperación desactivada. |
| `Median filter` | Suaviza la estimación del tono de cosecha cuando el umbral mostrado está habilitado. Comience con el valor predeterminado y pruébelo solo cuando solucione problemas de Harvest. |
| `Export Format` | WAV y FLAC no tienen pérdidas. MP3, OGG y M4A pueden ahorrar espacio para la entrega. Utilice WAV para su primera comparación. |
| `F0 curve file` | Entrada avanzada para una curva de tono personalizada en compilaciones que la exponen. Déjelo vacío para la conversión diaria. |

## Configuración de incrustación y procesamiento de audio

- **Audio dividido** procesa secciones separadas por pasajes silenciosos. Pruébelo para entradas largas y escuche las uniones.
- **Autotune** mueve notas sonoras hacia notas cromáticas cercanas. **Autotune Strength** controla la fuerza con la que lo hace. Empiece con ello apagado.
- **Tono propuesto** utiliza el tono sonoro medio y el **Tono objetivo (Hz)** para estimar un cambio. Pruébelo en un clip corto representativo.
- **Clean Audio** aplica reducción de ruido después de la conversión. **Clean Strength** controla su intensidad. Compárese con la salida sin procesar para respiraciones dañadas o sibilantes.
- **El cambio de formantes** cambia la resonancia antes de la conversión. Una **Proporción de formantes** de 1 mantiene la línea de base. Escuche las mismas vocales mientras prueba.
- **Postproceso** ejecuta los **Efectos** seleccionados en el audio convertido. **Post Pitch Shift** ajusta el tono de salida, **Gain** cambia el nivel y **Limiter Threshold** controla dónde comienza a actuar el limitador. Utilice un efecto a la vez al diagnosticar un problema.
- **Modelo de incrustación** selecciona el codificador de contenido. Auto utiliza la información del modelo cuando esté disponible. **Custom Embedder** acepta los pesos .bin correspondientes y la configuración .json. Asígnele un nombre de carpeta, haga clic en **Instalar incrustador personalizado**, verifique el estado de importación del incrustador y use **Actualizar incrustadores** si es necesario. Seleccione el codificador con el que se entrenó la voz antes de probar su índice.

Si su comunicado expone **TTS**, pruebe primero con una frase corta. Elija Edge para una voz en línea o una voz de Windows disponible para una síntesis sin conexión, seleccione el idioma y la voz y obtenga una vista previa del resultado. Ajuste la velocidad, el volumen o el tono de la fuente solo cuando sea compatible. Si la pronunciación es incorrecta antes de la conversión, corrija primero el discurso original. Consulte [Texto a voz](speech.md).


> **2.2.1** · El reproductor con forma de onda incluye un control de volumen para entradas, resultados y vistas previas. Úsalo para escuchar más bajo o comparar fragmentos a niveles similares. Solo afecta a la reproducción. Para cambiar el nivel del archivo convertido, ajusta Gain en Post-Process y vuelve a convertir.
