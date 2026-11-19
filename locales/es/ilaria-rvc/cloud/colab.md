---
label: "Google Colab"
icon: ":tangerine:"
order: 97
permalink: /ilaria-rvc/colab/
---
# Google Colab

[Notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb) · [Google Colab](https://colab.research.google.com/github/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb)

## Antes de empezar

Prepara un WAV corto y limpio, un modelo compatible y una copia del conjunto de datos si vas a entrenar.

1. Abre el cuaderno en Colab con un entorno GPU.
2. Ejecuta las celdas 1 a 4 en orden para comprobar la GPU, instalar dependencias, descargar pesos e iniciar la interfaz.
3. Abre la vista integrada y mantén la sesión conectada.

## Comprueba cada celda

Comprueba que la primera celda detecte una GPU NVIDIA. Espera a que se instalen las dependencias. Para inferencia, puedes usar `TRAINING_SAMPLE_RATES = []`. Mantén `DOWNLOAD_FCPE` si vas a usar FCPE.

{{ include "kaggle.md#cloud-inference-dataset" }}

{{ include "kaggle.md#cloud-training" }}

## Exportar y detener

Activa `EXPORT = True` y, para reanudar el entrenamiento, `INCLUDE_CHECKPOINTS`. Descarga el ZIP antes de ejecutar `STOP = True`.

### Comprueba el ZIP

Revisa el WAV y el modelo exportados. Marca `INCLUDE_CHECKPOINTS` si quieres reanudar el entrenamiento y guarda los datos originales por separado.

## Resuelve los problemas

Lee el primer error y repite la celda tras corregirlo. Si no aparece el modelo, revisa el registro de importación. Si falta memoria de GPU, reduce el lote.

[Ilaria RVC en la nube](cloud.md)
