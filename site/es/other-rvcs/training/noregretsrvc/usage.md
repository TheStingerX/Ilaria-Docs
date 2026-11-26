# NoRegretsRVC · Uso

NoRegretsRVC Beta 0.0 prepara flujos de Applio desde una interfaz web y genera notebooks.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Kaggle notebook](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/NoRegretsRVC_Kaggle.ipynb)

## Uso

Crea un proyecto y configura frecuencia, vocoder, extractor de tono, encoder, lote y épocas. Comprueba que coincidan con los pesos base. La estimación VRAM es orientativa.

Usa el estudio para preparar ajustes. Ejecuta el entrenamiento o la conversión en un entorno compatible con Applio.

## Flujo de entrenamiento y herramientas

Training organiza cuatro pasos: configuración, preparación de datos, extracción de características y entrenamiento. Kaggle añade la exportación de `.pth` e `.index`. Samples admite colas y ajustes por clip, transposición, limpieza en el navegador y seis ejemplos de 32 kHz. Models gestiona pretrains, Voice Blender fusiona voces y TTS convierte resultados de Edge. Diagnostics muestra métricas y sugerencias de checkpoints que conviene comprobar escuchando.

[Instalación](installation.md) · [Cloud](cloud.md)
