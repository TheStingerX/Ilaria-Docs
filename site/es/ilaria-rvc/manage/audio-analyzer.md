# Analizador de Audio

[Descargar Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Abre **Other → Audio Analyzer**. Añade hasta ocho archivos de audio para comparar. Un conjunto útil incluye la entrada original, una conversión base y una o dos variantes hechas cambiando un solo ajuste.

## Qué mide cada vista

| Vista | Qué muestra directamente | Pregunta a responder |
| --- | --- | --- |
| **Waveform** | Amplitud en el tiempo | ¿Dónde hay picos altos, recorte (clipping) plano arriba, pasajes silenciosos o uniones bruscas? |
| **Spectrogram** | Energía frecuencial en el tiempo | ¿Qué frecuencias están presentes en el instante exacto en que empieza un siseo, zumbido o artefacto? |
| **Average spectrum** | Balance global de frecuencias | ¿Suena una versión notablemente más brillante, más opaca o tiene una resonancia persistente? |
| **Pitch estimation** | Contorno F0 estimado sobre segmentos sonoros | ¿Sigue el tono convertido la melodía/inflexión prevista sin saltos de octava? |
| **Level & silence tables** | Niveles medidos de sonoridad/pico y segmentos de silencio | ¿Estás comparando archivos a volúmenes similares y usando el mismo umbral de silencio? |

> **Qué mide Audio Analyzer vs. qué sugiere:** Audio Analyzer grafica y mide directamente niveles de señal, intervalos de silencio, energía espectral y contornos F0 estimados. **No** diagnostica automáticamente un timbre de voz "bueno" o "malo" por sí solo. **Escucha siempre la región seleccionada** en el reproductor integrado antes de tratar una diferencia visual como un problema.

## Ejemplos prácticos: qué buscar

- **Clipping:** Picos planos arriba que golpean la amplitud máxima en **Waveform** (a menudo se oye como chasquido áspero). Baja la ganancia de entrada o normaliza el origen antes de entrenar o convertir.
- **Ruido de fondo / siseo:** Una banda horizontal constante o un suelo brillante en frecuencias medias/altas en el **Spectrogram** durante las pausas. Limpia el origen con UVR5 o MVSep antes de entrenar.
- **Silencio excesivo o huecos muertos:** Secciones largas y planas en **Waveform** y porcentajes altos de silencio en **Level and silence tables**. Recorta las pausas largas en los datasets para que el entrenamiento no desperdicie pasos en silencio.
- **Volumen demasiado bajo / demasiado alto:** Amplitud de forma de onda muy delgada (riesgo de amplificación ruidosa) o picos cerca del máximo. Revisa **Level and silence tables** para juzgar las comparaciones A/B a un volumen equiparado.
- **Distorsión y reverberación:** Colas horizontales borrosas que se extienden tras terminar las palabras en el **Spectrogram** indican reverberación de sala; picos verticales bruscos o armónicos emborronados sugieren distorsión o sobreprocesado.
- **Control de calidad del dataset:** Inspecciona los clips de origen sin procesar *antes* de entrenar, y luego compara la misma frase entre checkpoints. Cuando la estimación de tono parezca errática en respiraciones o consonantes sordas (`s`, `f`, `t`), escucha primero: los sonidos sordos no tienen de por sí un tono estable.

## Consejos de comparación y exportaciones

Elige un rango de tiempo y vista de canales coincidentes, y mantén la misma **ventana FFT**, escala de frecuencias y umbral de silencio en todas las comparaciones. Una ventana FFT mayor mejora el detalle en frecuencia mientras suaviza eventos rápidos en el tiempo. Exporta **CSV** o **JSON** para mediciones numéricas, o un **ZIP con gráficos** para revisarlo después.
