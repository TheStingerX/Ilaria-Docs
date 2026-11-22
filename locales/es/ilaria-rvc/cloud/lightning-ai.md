---
label: "Lightning AI Studio"
icon: ":zap:"
order: 96
permalink: /es/ilaria-rvc/lightning-ai/
description: "Ejecuta Ilaria RVC en un navegador con una GPU suministrada por la plataforma en la nube. Elige un notebook a continuación. Activa un acelerador NVIDIA antes de ejecutar la primera celda."
---
# Lightning AI Studio

[Abrir el notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-LightningAI.ipynb) · [Lightning AI Studio](https://lightning.ai/)

Ejecuta Ilaria RVC en un navegador con una GPU suministrada por la plataforma en la nube. Elige un notebook a continuación. Activa un acelerador NVIDIA antes de ejecutar la primera celda.

## Antes de empezar

Prepara un WAV corto y limpio y un modelo de inferencia compatible. Para entrenar, guarda el dataset original y algunos clips de prueba por separado en tu propio ordenador. El notebook se ejecuta en una máquina Linux remota.

### Créditos, plan gratuito y disponibilidad de GPU

Lightning AI utiliza un **modelo de facturación basado en créditos** (`1 crédito = $1 USD`, facturado por segundo de cómputo GPU; ver [Precios de Lightning AI](https://lightning.ai/pricing)):

- **Plan gratuito:** Incluye **un Studio gratuito de 4 CPU** (hasta 4 horas continuas antes de reiniciar) y **10 GB de almacenamiento gratuito** (el almacenamiento por encima de 10 GB se factura mensualmente).
- **Créditos iniciales vs. planes de pago:** Las cuentas nuevas suelen recibir créditos iniciales tras registrarse/verificarse (no son horas de GPU gratuitas renovables cada mes). Las suscripciones **Pro** de pago ofrecen una asignación mensual de créditos.
- **Revisa tu saldo y GPUs:** Abre el panel de Studio / facturación para comprobar tu saldo restante antes de iniciar una instancia GPU, y recuerda que los tipos de GPU concretos (como T4, L4 o L40) están sujetos a disponibilidad regional y de cuenta. Haz primero la instalación de dependencias en el Studio CPU gratuito y cambia a GPU solo cuando estés listo para ejecutar inferencia o entrenamiento.

## Ejecutar en Lightning AI Studio

1. Crea un GPU Studio, sube el notebook y ábrelo en JupyterLab.
2. Ejecuta las celdas 1-4 en orden. Verifican la GPU, instalan dependencias, descargan los pesos base e inician la Web UI. Establece `TRAINING_SAMPLE_RATES` en `[]` solo para inferencia o selecciona las frecuencias de muestreo a las que planeas entrenar.
3. Abre **Port viewer** en tu Studio y selecciona el puerto impreso por la celda de lanzamiento (`7865` por defecto). Mantén el puerto privado.

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
