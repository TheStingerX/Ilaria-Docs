# Mangio RVC Fork · Uso y resolución de problemas

[GitHub](https://github.com/Mangio621/Mangio-RVC-Fork) · [Versión consultada](https://github.com/Mangio621/Mangio-RVC-Fork/tree/v23.7.0)

!!!warning Software antiguo · No recomendado
La rama principal de **Mangio RVC Fork** lleva años inactiva. La aplicación está desactualizada y se desaconseja para nuevas instalaciones. [Guías por aplicación](../app-guides.md)
!!!

## Primera conversión

Coloca el checkpoint de inferencia en `weights` y actualiza la lista. Selecciónalo en Model Inference e indica la ruta de una grabación corta de voz sola. Empieza con transposición 0. Si tienes el índice correspondiente, compara una tasa de recuperación baja con una prueba a 0. Conserva el mismo audio y checkpoint.

## Extracción de tono y modo híbrido

Empieza con RMVPE cuando esté disponible. Compara `mangio-crepe` y `mangio-crepe-tiny` con el mismo audio. El salto se aplica a estas variantes en inferencia. Un salto menor aumenta la frecuencia de análisis y puede alargar el procesamiento. La CLI de la etiqueta usa el signo más, como `hybrid[pm+crepe]`, y combina las estimaciones con una mediana. Compáralo con un extractor individual. La documentación marca el uso de CREPE o híbrido en entrenamiento como experimental.

[Instalación](installation.md)
