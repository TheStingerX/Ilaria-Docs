---
label: "📈 Analizador de audio"
order: 85
permalink: /ilaria-rvc/audio-analyzer/
---
# Analizador de audio

Abra **Otro → Analizador de audio**. Agregue hasta ocho archivos de audio para comparar. Un conjunto útil contiene la entrada original, una conversión de referencia y una o dos variantes realizadas con una configuración modificada.

 | Ver | Pregunta a responder |
| --- | --- |
 | Forma de onda | ¿Dónde hay picos fuertes, pasajes silenciosos o uniones abruptas? |
 | Espectrograma | ¿Qué frecuencias están presentes en el momento en que comienza un artefacto? |
 | Espectro promedio | ¿Alguna versión tiene un desequilibrio de frecuencia persistente? |
 | Estimación del tono | ¿El F0 convertido sigue el contorno previsto en los pasajes sonoros? |
 | Tablas de nivel y silencio | ¿Estás comparando volúmenes similares y usando la misma definición de silencio? |

Elija un rango de tiempo y vista de canal. Utilice la misma ventana FFT, escala de frecuencia y umbral de silencio en las comparaciones. Una ventana FFT más grande mejora la resolución de frecuencia y suaviza los eventos rápidos en el tiempo. Escuche la región seleccionada en el reproductor antes de decidir si una diferencia visible es un problema.

Exporte CSV o JSON para mediciones, o un ZIP con gráficos para su posterior revisión. Si desea diagnosticar un clip de conjunto de datos ruidoso, verifique primero la fuente sin procesar y compare el mismo intervalo en la exportación. Cuando los resultados del tono parezcan extraños en respiraciones o consonantes sordas, escuche el audio antes de interpretar la estimación.
