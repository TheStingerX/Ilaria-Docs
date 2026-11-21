---
label: "Audio Analyzer"
icon: ":chart_with_upwards_trend:"
order: 85
permalink: /ilaria-rvc/audio-analyzer/
description: "Abre Other → Audio Analyzer en Ilaria RVC para comparar hasta ocho audios con forma de onda, espectrograma, espectro medio, pitch y tablas de nivel."
---
# Audio Analyzer

[Descarga Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Abre **Other → Audio Analyzer**. Añade hasta ocho archivos de audio para comparar (original, conversión base y variantes con un solo ajuste cambiado).

## Qué mide cada vista

| Vista | Qué muestra directamente | Qué ayuda a responder |
| --- | --- | --- |
| **Waveform** | Amplitud en el tiempo | ¿Dónde hay picos, clipping plano, silencios o cortes bruscos? |
| **Spectrogram** | Energía frecuencial en el tiempo | ¿Qué frecuencias aparecen justo cuando empieza un artefacto? |
| **Average spectrum** | Balance frecuencial medio | ¿Una versión tiene más brillo o resonancias persistentes? |
| **Pitch estimation** | Contorno F0 estimado | ¿El tono sigue la melodía sin saltos de octava? |
| **Level & silence tables** | Niveles medidos y silencios | ¿Comparas con volumen similar y el mismo umbral de silencio? |

> **Qué mide vs. qué sugiere:** Audio Analyzer mide niveles, silencios, espectro y F0 estimado, pero **no** diagnostica por sí solo la calidad tímbrica. **Escucha siempre la región seleccionada** antes de asumir un fallo.

## Ejemplos prácticos

- **Clipping:** Picos planos en el límite de la **Waveform**; baja la ganancia antes de entrenar o convertir.
- **Ruido de fondo:** Banda horizontal constante en el **Spectrogram** durante las pausas; limpia con UVR5 o MVSep.
- **Silencios largos:** Recorta pausas largas en los datasets.
- **Distorsión y reverberación:** Colas difusas tras cada palabra en el **Spectrogram** indican eco de sala.
- **Consonantes sordas:** Si el F0 salta en respiraciones o `s`/`f`/`t`, escucha primero: esos sonidos no tienen tono estable.

Exporta **CSV**, **JSON** o un **ZIP con gráficos** usando siempre la misma **FFT window** y escala.
