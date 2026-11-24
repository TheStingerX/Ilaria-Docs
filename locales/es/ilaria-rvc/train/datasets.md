---
label: "Datasets, Checker y Audio Analyzer"
icon: ":level_slider:"
order: 95
permalink: /ilaria-rvc/datasets/
description: "Tu dataset es el factor más importante para decidir qué tan natural, limpia y expresiva sonará tu voz RVC."
---
# Datasets, Dataset Checker y Audio Analyzer

[Descargar Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Tu dataset es el factor más importante para decidir qué tan natural, limpia y expresiva sonará tu voz RVC. Ni siquiera los mejores ajustes de entrenamiento pueden arreglar grabaciones ruidosas, con eco o distorsionadas.

!!!tip
**Regla de oro: la calidad siempre supera a la cantidad.**
10 minutos de audio seco, limpio y variado de una sola voz entrenarán un modelo mucho mejor que 60 minutos de clips con eco, ruido o repeticiones.
!!!

## 1. Qué hace un gran dataset de RVC

### Duración y variedad vocal
- **Duración mínima útil:** Alrededor de **5 a 10 minutos** de voz hablada o cantada pura (sin contar silencios) ya pueden generar una voz funcional si el audio es muy limpio.
- **Objetivo recomendado:** **15 a 30+ minutos** de audio limpio y variado dan al modelo suficiente cobertura fonética para manejar palabras, tonos y emociones distintas con naturalidad.
- **La variedad importa:** Incluye habla tranquila, habla enérgica, distintos tonos, pasajes suaves y fuertes, y consonantes claras (`s`, `f`, `t`, `k`). Si solo entrenas con voz monótona, el modelo fallará al cantar o hablar con expresividad.

### Limpieza y formato del audio
- **Un solo hablante:** Nunca dejes voces superpuestas, ruido de público ni coros de fondo en el dataset.
- **Sala seca (mínimo reverb):** RVC aprende el eco de la habitación como parte del timbre vocal. Lo ideal son grabaciones de estudio con micrófono cercano.
- **Formato sin pérdida:** Prefiere **`.wav` PCM** (o `.flac`) frente a `.mp3` muy comprimidos para no introducir artefactos de compresión en el modelo.
- **Sin música ni efectos de sonido:** Elimina toda la música de fondo, audio de juegos y SFX antes del preprocesamiento.

## 2. Preparar y limpiar tu audio

1. **Separa la voz de música/SFX:** Si tu fuente proviene de canciones, vídeos o juegos, extrae primero la voz limpia con [UVR5](../../non-rvc/audio-separation-tools/uvr5/overview.md) o [MVSep](../../non-rvc/audio-separation-tools/mvsep/overview.md).
2. **Cuidado con la reducción agresiva de ruido o reverb:** Aplica denoise o dereverb solo cuando sea realmente necesario. Los filtros fuertes pueden borrar frecuencias altas y generar artefactos metálicos o acuosos. Compara siempre el clip original y el procesado.
3. **Recorta silencios largos y ruidos molestos:** Corta pausas vacías largas, golpes al micrófono, toses, clics y clipping extremo. Conserva pausas cortas naturales entre palabras.
4. **Mantén longitudes razonables:** Divide grabaciones muy largas en segmentos limpios (aprox. **3 a 15 segundos** cada uno), o deja que el divisor automático de Ilaria RVC los segmente durante el preprocesamiento.
5. **Usa rutas simples:** Guarda el dataset en una carpeta corta sin espacios, tildes ni símbolos especiales (por ejemplo `C:\RVC\datasets\mi_voz\`).

## 3. Usar el Dataset Checker de Ilaria RVC

Antes de gastar tiempo de GPU entrenando, ejecuta el **Dataset Checker** integrado en Ilaria RVC para detectar problemas ocultos:

- **Detección de clipping:** Encuentra segmentos donde los picos llegan a `0 dBFS` y se aplanan, lo que provoca distorsión o errores `NaN loss` al entrenar.
- **Silencios largos:** Marca clips que son casi todo aire vacío para poder recortarlos o quitarlos.
- **Archivos ilegibles o dañados:** Detecta cabeceras corruptas, archivos de 0 bytes o clips menores de 1 segundo que harían fallar el preprocesamiento (`zero-size array`).
- **Niveles inconsistentes:** Resalta clips mucho más bajos o más altos que el resto del dataset.

**Flujo recomendado:**
1. Indica la carpeta del dataset en el **Dataset Checker** y ejecuta el análisis.
2. Escucha cada archivo marcado antes de borrarlo o editarlo.
3. Conserva las partes suaves y pausas intencionales cuando pertenezcan a la voz real, y elimina o limpia solo los clips rotos, saturados o ruidosos.

## 4. Usar el Audio Analyzer de Ilaria RVC

Usa el **Audio Analyzer** para descubrir *por qué* una grabación o conversión suena mal:

- **Picos de forma de onda:** Ondas recortadas planas arriba indican clipping digital. Baja la ganancia o sustituye la toma saturada.
- **Espectrograma:** Observa los huecos de silencio entre palabras. Una línea horizontal constante en 50/60 Hz indica zumbido eléctrico; manchas difusas en frecuencias indican restos de música o reverb.
- **Pitch y niveles activos:** Comprueba si el tono salta de forma antinatural o si el nivel cae demasiado.
- **Comparación Antes vs Después:** Carga exactamente la misma zona del audio original y del convertido para saber si un fallo viene del dataset, de la separación o de la inferencia.

## 5. Errores comunes en datasets que debes evitar

| Error | Qué le ocurre al modelo entrenado | Cómo solucionarlo |
| --- | --- | --- |
| **Dejar reverb/eco en el dataset** | La voz siempre suena como dentro de un baño o cueva. | Usa grabaciones más secas o limpia con cuidado usando UVR5/MVSep DeReverb. |
| **Restos de música de fondo** | Gorjeos musicales aleatorios o artefactos metálicos al convertir. | Vuelve a separar la voz con `BS-Roformer` / `BS Polarformer` y borra clips sucios. |
| **Varias voces en un dataset** | El timbre cambia de golpe a mitad de frase. | Mantén estrictamente un solo hablante por carpeta de dataset. |
| **Dataset diminuto y repetitivo (< 2 min)** | El modelo memoriza ruido ("overfitting") y falla con palabras nuevas. | Añade frases variadas y detén el entrenamiento antes (menos épocas). |
| **Grabaciones saturadas / con clipping** | Chasquidos duros, voz robótica o error `NaN loss`. | Elimina las tomas saturadas y normaliza el audio limpio por debajo de `0 dBFS`. |

Lee también [Preparar un dataset de voz](../../model-training/dataset-preparation.md) para ver más pautas generales de grabación y evaluación.
