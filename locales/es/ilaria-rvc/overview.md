---
label: "Descripción general de Ilaria RVC"
icon: ":sparkling_heart:"
order: 100
permalink: /ilaria-rvc/overview/
description: "También puedes usar Ilaria RVC en Kaggle con su GPU remota, incluso si tu ordenador no tiene una GPU NVIDIA. Ilaria RVC on Kaggle"
---
# Descripción general de Ilaria RVC

> **[Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)** · El paquete completo para Windows es la versión 2.4.7. Para actualizar desde 2.4.2–2.5.0, usa **Other → Update Ilaria RVC → Check for updates → Download and restart**. El ZIP de actualización excluye el entorno de ejecución y los pesos. [ZIP de actualización para Windows](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.5.1/ILARIA_RVC-update-2.5.1.zip?download=true)

[Descarga Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

También puedes usar Ilaria RVC en Kaggle con su GPU remota, incluso si tu ordenador no tiene una GPU NVIDIA. [Ilaria RVC on Kaggle](cloud/kaggle.md)

Ilaria RVC 2.4.2 es una aplicación de Windows basada en RVC WebUI (Mainline - Original RVC). Su interfaz se abre en un navegador, mientras que el motor incluido se ejecuta en la PC. El paquete actual de Windows apunta a NVIDIA. El lanzamiento incluye inferencia, TTS, entrenamiento de modelos, una biblioteca de modelos y análisis de audio.

 | Dónde | Qué puede hacer |
| --- | --- |
 | Capacitación | Importar y verificar conjuntos de datos, preprocesar, extraer características, ejecutar o poner en cola experimentos, obtener una vista previa de los puntos de control y crear índices de recuperación. |
 | Inferencia | Convierta un clip o una carpeta, genere voz, seleccione codificadores y extractores de tono y aplique procesamiento opcional. |
 | Otro | Importar, descargar, inspeccionar, fusionar y exportar modelos. Instale integradores y preentrenamientos opcionales, analice audio, escanee hardware y actualice la aplicación. |
 | Panel de capacitación | Siga las ejecuciones activas, inspeccione los registros existentes, abra TensorBoard y genere un informe de diagnóstico. |
 | Glosario | Revisar la configuración y los flujos de trabajo dentro de la aplicación. |

Comience con [instalación](install/installation.md), luego siga [inferencia única y por lotes](convert/inference.md), [un experimento de entrenamiento](train/training-workflow.md) o [gestión de modelos](manage/model-library.md). Para ver terminología común, abra el [glosario](../reference/glossary.md).

## Qué se ejecuta localmente

El iniciador inicia un servicio local en el puerto 6969 de forma predeterminada. La conversión y el entrenamiento de archivos utilizan archivos de modelo locales. La descarga de modelos, la actualización de la aplicación y el uso de Edge TTS requieren conectividad. Para generar voz sin conexión, elija una voz de Windows instalada. En esta versión, el navegador también está vinculado al ciclo de vida del servicio. Termine o guarde de forma segura el trabajo activo antes de cerrar la última pestaña.

[Controles de entrenamiento](train/training-buttons.md) · [Controles de inferencia](convert/inference-buttons.md) · [Paneles de Other](manage/other-buttons.md)
