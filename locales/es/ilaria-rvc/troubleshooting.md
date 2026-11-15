---
label: "🛠️ Registros y recuperación"
order: 92
permalink: /ilaria-rvc/troubleshooting/
---
# Registros y recuperación

## Encuentre la primera etapa fallida

Para problemas de inicio, use `ILARIA_RVC_LOGS.bat` y anote el primer error. En caso de error de inferencia, pruebe un WAV local corto con la recuperación desactivada y confirme el modelo y el incrustador. En el caso de errores de entrenamiento, identifique si el preprocesamiento, la extracción de características o la etapa de entrenamiento fallaron antes de volver a intentarlo.

## Manejar la presión de la memoria

Cierre las tareas de GPU competidoras, descargue la voz de inferencia y vuelva a intentarlo con un lote de entrenamiento más pequeño o el almacenamiento en caché del conjunto de datos desactivado, si corresponde. Guardar antes de reiniciar. Registre la versión de la aplicación, la GPU, la acción fallida exacta y el primer error antes de solicitar ayuda.
