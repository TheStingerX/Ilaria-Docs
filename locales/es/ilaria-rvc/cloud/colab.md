---
label: "Google Colab"
icon: ":tangerine:"
order: 97
permalink: /es/ilaria-rvc/colab/
description: "Ejecuta Ilaria RVC en un navegador con una GPU suministrada por la plataforma en la nube. Elige un notebook a continuación. Activa un acelerador NVIDIA antes de ejecutar la primera celda."
---
# Google Colab

[Abrir el notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb) · [Google Colab](https://colab.research.google.com/github/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb)

Ejecuta Ilaria RVC en un navegador con una GPU suministrada por la plataforma en la nube. Elige un notebook a continuación. Activa un acelerador NVIDIA antes de ejecutar la primera celda.

## Antes de empezar

Prepara un WAV corto y limpio y un modelo de inferencia compatible. Para entrenar, guarda el dataset original y algunos clips de prueba por separado en tu propio ordenador. El notebook se ejecuta en una máquina Linux remota.

### Límites, unidades de cómputo y políticas de Google Colab

Antes de iniciar una ejecución larga, comprende cómo gestiona los recursos [Google Colab](https://research.google.com/colaboratory/faq.html):

- **Plan gratuito vs. planes de pago (Compute Units):** El plan gratuito de Colab ofrece GPUs cuando están disponibles, pero la duración de ejecución, los tiempos de espera por inactividad y el tipo de GPU (como T4) son dinámicos y nunca están garantizados. Los planes de pago (**Colab Pro**, **Pro+** y **Pay As You Go**) utilizan **compute units** que se consumen dinámicamente según la GPU/TPU seleccionada; cuando se agota tu saldo de unidades, la cuenta vuelve a los límites del plan gratuito.
- **Actividades prohibidas y restricciones de WebUI:** La política de [Actividades prohibidas](https://research.google.com/colaboratory/faq.html#disallowed-activities) de Google prohíbe alojar archivos, servir aplicaciones web públicas ajenas al cálculo interactivo, ejecutar proxies remotos, eludir límites de seguridad/acceso, usar varias cuentas para evadir cuotas o crear deepfakes. Aunque los notebooks interactivos de Gradio no están prohibidos de forma general en todos los casos, mantener túneles WebUI públicos persistentes en el plan gratuito suele provocar desconexiones del entorno de ejecución o advertencias de política.
- **Desconexiones, guardado y privacidad:** Colab puede desconectar sesiones inactivas o prolongadas y borrar el almacenamiento local de la máquina virtual. Exporta tus resultados (`EXPORT = True`) o sincroniza los checkpoints importantes con Google Drive con regularidad, y nunca subas audio confidencial ni credenciales a notebooks públicos o compartidos.
- **Alternativas:** Si Colab se desconecta o no tiene GPUs disponibles, usa [Kaggle](kaggle.md) (cuota semanal gratuita de GPU tras verificación telefónica) o [Lightning AI Studio](lightning-ai.md).

## Ejecutar en Google Colab

1. Abre en Colab y selecciona un entorno de ejecución con GPU.
2. Ejecuta las celdas 1-4 en orden. Verifican la GPU, instalan dependencias, descargan los pesos base e inician la Web UI. Establece `TRAINING_SAMPLE_RATES` en `[]` solo para inferencia o selecciona las frecuencias de muestreo a las que planeas entrenar.
3. Abre la vista integrada generada por la celda de lanzamiento. Mantén el entorno conectado.

## Comprueba cada celda antes de continuar

La comprobación de GPU debe identificar un dispositivo NVIDIA. Si no lo hace, cambia primero el acelerador. Espera a que termine la instalación de dependencias antes de descargar los pesos. Establece `TRAINING_SAMPLE_RATES = []` solo para inferencia. Para entrenar, elige la frecuencia que coincida con tu modelo y par de preentrenados. Deja `DOWNLOAD_FCPE` activado si planeas usar FCPE.

{{ include "kaggle.md#cloud-inference-dataset" }}

{{ include "kaggle.md#cloud-training" }}

## Exportar y detener

Establece `EXPORT = True` y ejecuta la celda de exportación. Activa `INCLUDE_CHECKPOINTS` si necesitas reanudar el entrenamiento. Guarda el ZIP en local antes de detener la sesión y luego ejecuta la celda de parada con `STOP = True`.

## Si falla el arranque

Si la primera celda no detecta la GPU, revisa tu acelerador y vuélvela a ejecutar. Si la interfaz no se abre, lee la salida de la celda de lanzamiento, confirma que el servidor está listo y vuelve a abrir la vista.

### Revisa el ZIP de salida

Para inferencia, verifica tu WAV exportado y los archivos del modelo. Para entrenamiento, activa `INCLUDE_CHECKPOINTS` para incluir los registros del experimento y revisa el archivo antes de cerrar la sesión. Conserva el dataset original por separado.

## Recuperarse de problemas comunes

Si falla la instalación, lee el primer error y vuelve a ejecutar la celda fallida tras corregirlo. Si la aplicación se abre pero falta tu modelo, revisa el registro de importación y actualiza la lista. Para errores de memoria insuficiente (OOM), empieza con un clip más corto o reduce el tamaño de lote (batch size) de entrenamiento. Si la Web UI se cierra, vuelve a abrirla desde la misma celda de lanzamiento o puerto mientras la sesión siga activa.

[Ilaria RVC en la nube](cloud.md)
