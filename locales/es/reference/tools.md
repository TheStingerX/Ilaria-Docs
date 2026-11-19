---
permalink: /tools/
label: "🧰 Herramientas RVC"
order: 95
description: "Compare aplicaciones compatibles para conversión de voz en vivo, conversión de archivos y capacitación."
---

# Elige una aplicación RVC

[Descarga Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

También puedes usar Ilaria RVC en Kaggle con su GPU remota, incluso si tu ordenador no tiene una GPU NVIDIA. [Ilaria RVC on Kaggle](../ilaria-rvc/cloud/kaggle.md)

Para ver los pasos de instalación, configuración y solución de problemas, consulta las [guías de cada aplicación](../other-rvcs/app-guides.md).

Comienza con lo que quieres hacer. Un **cambiador de voz en vivo** procesa la transmisión del micrófono mientras hablas. Un **convertidor de archivos** procesa una grabación y guarda el resultado para editarlo o exportarlo. Un **entrenador** convierte un conjunto de datos de las grabaciones de un orador en un modelo. Algunas aplicaciones ofrecen los tres flujos de trabajo. La compilación que instale determina qué hardware de gráficos y formatos de modelo puede utilizar.

///region app-comparison
| Aplicación | Training | Inferencia (archivos) | Realtime | Enlaces del proyecto |
| --- | --- | --- | --- | --- |
| [Ilaria RVC](../ilaria-rvc/install/installation.md) | Sí | Sí | Sí · Heredado de RVC WebUI (Mainline - Original RVC), sin futuras actualizaciones | [GitHub](https://github.com/TheStingerX/Ilaria-RVC) · [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC) |
| [RVC WebUI (Mainline - Original RVC)](../other-rvcs/mainline/installation.md) | Sí | Sí | Sí · Iniciador independiente | [GitHub](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI) |
| [Applio](../other-rvcs/applio/installation.md) | Sí | Sí | Sí | [GitHub](https://github.com/IAHispano/Applio) · [Hugging Face](https://huggingface.co/IAHispano/Applio) |
| [Redpanda-vc](../other-rvcs/redpanda/first-run.md) | Sí | Sí | Sí | [GitHub](https://github.com/redpanda343/Redpanda-vc) |
| [RVC GUI](../other-rvcs/rvc-gui/file-conversion.md) | No | Sí | No | [GitHub](https://github.com/Tiger14n/RVC-GUI) |
| [Vonovox](../other-rvcs/vonovox/installation.md) | No | No | Sí | [GitHub](https://github.com/dr87/Vonovox) · [Hugging Face](https://huggingface.co/dr87/vonovox) |
| [w-okada VCClient](../other-rvcs/okada/installation.md) | No | No | Sí | [GitHub](https://github.com/w-okada/voice-changer) · [Hugging Face](https://huggingface.co/wok000/vcclient000) |
| [Okada TG Developed Fork](../other-rvcs/tgr/installation.md) | No | No | Sí | [GitHub](https://github.com/tg-develop/voice-changer) |
| [RVC Blue](../other-rvcs/rvc-blue/installation.md) | No | Archivos en tiempo real | Sí | [GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI) |
| [Replay](../reference/tools.md#replay) | Sí | Sí · versión antigua | No | [Sitio oficial](https://www.weights.com/replay) · [Internet Archive](https://archive.org/details/replay-8.7.0-installers) |

 | Aplicación | Cuándo usarla | Hardware y notas de compilación |
| --- | --- | --- |
| [Ilaria RVC](../ilaria-rvc/install/installation.md) | Conversión de archivos, TTS, entrenamiento y análisis de audio | La distribución actual de Windows es solo NVIDIA. |
| [RVC WebUI (Mainline - Original RVC)](../other-rvcs/mainline/installation.md) | Entrenamiento e inferencia ascendentes, con un iniciador en tiempo real independiente | NVIDIA CUDA en Windows y Ubuntu. La configuración de CPU ascendente cubre sistemas AMD e Intel, con posible uso de DirectML en Windows. |
| [Applio](../other-rvcs/applio/installation.md) | Conversión de archivos, capacitación y tiempo real en una sola aplicación | La documentación de escritorio enumera NVIDIA CUDA, configuraciones AMD compatibles y Apple MPS. La disponibilidad depende de la edición y el motor. |
| [Redpanda-vc](../other-rvcs/redpanda/first-run.md) | Una fork de Applio para experimentar con múltiples motores de conversión de voz | El repositorio incluye un contenedor CUDA y documenta la selección de GPU para transmisiones WebUI. Verifique el motor seleccionado y constrúyalo para otros backends. |
| [RVC GUI](../other-rvcs/rvc-gui/file-conversion.md) | Conversión simple de archivos locales en la interfaz de escritorio heredada | Archivado. El proyecto documenta Windows NVIDIA CUDA y una solución histórica de Apple Silicon. |
| [Vonovox](../other-rvcs/vonovox/installation.md) | Recomendado para RVC v2 en vivo en Windows con NVIDIA | Solo NVIDIA CUDA. Haga coincidir el paquete Hugging Face con su generación de GPU. |
| [w-okada VCClient](../other-rvcs/okada/installation.md) | Conversión en vivo en varios sistemas operativos | Windows CUDA y paquetes estándar, incluidos DirectML o CPU, cuando sean compatibles. Separe las rutas de configuración de Apple Silicon y Linux. |
| [Okada TG Developed Fork](../other-rvcs/tgr/installation.md) | Live RVC con opciones documentadas para usuarios de AMD, Intel y CPU | Windows CUDA o DirectML. Las compilaciones de Linux y macOS experimentales tienen instrucciones separadas. |
| [RVC Blue](../other-rvcs/rvc-blue/installation.md) | Conversión de voz en tiempo real en Windows | NVIDIA CUDA 12.8 / 11.8 (Windows) |
| [Replay](../reference/tools.md#replay) | Entrenamiento de modelos y conversión de archivos · no recomendado | [Instaladores archivados](https://archive.org/details/replay-8.7.0-installers) |
///endregion

## Vonovox (recomendado para uso en vivo de NVIDIA)

> **Versión más reciente (beta)** · [Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

Vonovox es un cambiador de voz en tiempo real de Windows que carga modelos RVC v2 y utiliza NVIDIA CUDA. Elígelo si tu objetivo principal es la conversión de micrófono y tienes una tarjeta NVIDIA compatible. La lista de paquetes incluye compilaciones y parches para generaciones específicas de GPU, así que verifique los nombres de archivos y las instrucciones de lanzamiento antes de elegir un archivo. Utilice el repositorio Hugging Face del editor para realizar descargas. [Descargas oficiales de Vonovox](https://huggingface.co/dr87/vonovox/tree/main) · [Notas de configuración y hardware de Vonovox](https://github.com/dr87/Vonovox/blob/main/README.md)

Para una primera ejecución, cargue su voz RVC v2 y escuche una breve prueba de micrófono antes de enrutar el audio a otra aplicación. Luego reduzca el tamaño del bloque gradualmente mientras habla normalmente. Restaure la configuración anterior si escucha omisiones o sílabas cortadas. Pruebe nuevamente junto con el juego o la aplicación de transmisión que planea usar, porque ambos comparten la misma GPU. [Configuración de audio Vonovox](https://github.com/dr87/Vonovox/blob/main/README.md)

## w-okada VCClient

VCClient maneja la conversión de voz en vivo con un cliente y un servidor. Puede ejecutarlos juntos en una máquina o colocar el servidor en una segunda máquina para alejar la carga de trabajo de conversión de su computadora principal. Seleccione una versión que admita el modelo RVC que desea cargar. Las descargas mantenidas se encuentran en Hugging Face y el archivo README en inglés del proyecto explica las opciones del estándar de Windows, Windows CUDA, Apple Silicon y Linux. [VCClient English README](https://github.com/w-okada/voice-changer/blob/master/README_en.md) · [Descargas oficiales de VCClient](https://huggingface.co/wok000/vcclient000/tree/main)

Consulta el formato del modelo así como el acelerador. Por ejemplo, las instrucciones anteriores de Windows v1 del proyecto limitan la aceleración de GPU AMD e Intel a los modelos ONNX. Un archivo PyTorch `.pth` y un archivo `.onnx` exportado pueden tener diferentes rutas de hardware en la misma aplicación. El estándar de Windows v2 documenta las opciones de DirectML y CPU. [Notas sobre formato de modelo y compilación de VCCClient](https://github.com/w-okada/voice-changer/blob/master/README_en.md)

## Okada TG Developed Fork (TGR)

El proyecto `tg-develop/voice-changer` es un fork comunitaria de la familia w-okada a través de el fork deiteris. Se centra en RVC en vivo y documenta compilaciones separadas de Windows para NVIDIA CUDA y DirectML en hardware AMD o Intel compatible. Su documentación también cubre el uso de CPU, Linux y versiones experimentales de macOS para Apple Silicon e Intel. [Configuración de TGR y requisitos del sistema](https://github.com/tg-develop/voice-changer) · [Versiones de TGR](https://github.com/tg-develop/voice-changer/releases)

En Windows, utilice las instrucciones de la compilación que descargó. La compilación DirectML expone una lista diferente de extractores de tono de la compilación NVIDIA, por lo que es posible que sea necesario ajustar los ajustes preestablecidos de la edición CUDA. Compare la estabilidad del audio con sus aplicaciones habituales antes de confiar en la configuración para una grabación o transmisión.

## Ilaria RVC

El paquete actual de Windows es solo NVIDIA. Úselo cuando desee alternar entre convertir grabaciones, generar voz, entrenar, verificar los metadatos de un modelo e inspeccionar formas de onda o espectrogramas en el Analizador de audio. Las instalaciones existentes pueden buscar actualizaciones en **Otro → Actualizar Ilaria RVC**. [Descargas de Ilaria RVC](https://huggingface.co/TheStinger/Ilaria_RVC) · [LÉAME del proyecto y notas de la versión](https://github.com/TheStingerX/Ilaria-RVC)

## RVC GUI

La RVC GUI de Tiger14n es una interfaz de escritorio independiente para convertir archivos de audio. Puede importar un ZIP que contenga la inferencia `.pth` y su coincidencia `.index` cuando esté disponible. Su repositorio está archivado, así que utilice sus instrucciones para un flujo de trabajo que requiera específicamente esta aplicación. La **GUI en tiempo real** del proyecto RVC anterior, con un nombre similar, es un iniciador independiente. [Repositorio y configuración de RVC GUI](https://github.com/Tiger14n/RVC-GUI)

## Applio

Applio admite la gestión de modelos de voz RVC, la conversión de archivos, la capacitación y el tiempo real. Sus ediciones Desktop y Python/Gradio tienen diferentes flujos de configuración. Los documentos de escritorio identifican NVIDIA CUDA, las configuraciones AMD compatibles y Apple MPS y explican cómo verificar el estado del motor después de la instalación. Utilice los [pasos de conversión de Applio](../conversion/voice-conversion.md#convert-a-recording-in-applio) para su edición.

## Interfaz de usuario web RVC

WebUI de conversión de voz basada en recuperación es el proyecto RVC ascendente. Su WebUI maneja el entrenamiento y la inferencia de archivos. La GUI en tiempo real del proyecto tiene su propio lanzador. La rama principal documenta dependencias CUDA separadas para tarjetas NVIDIA más nuevas y antiguas, además de un conjunto de dependencias de CPU para sistemas AMD e Intel. En Windows, DirectML puede estar disponible para operaciones compatibles. Siga los [Pasos de conversión principales](../conversion/voice-conversion.md#convert-a-recording-in-mainline-rvc) para el paquete de Windows.

## Redpanda-vc

Redpanda-vc es un fork de Applio cuya interfaz en tiempo real admite RVC, Beatrice y Rectified Flow. Ofrece múltiples familias de modelos, así que seleccione el flujo de trabajo RVC para una voz RVC. En su modo de navegador en tiempo real, el proyecto documenta la asignación de transmisiones a GPU particulares y señala que Beatrice se ejecuta en la CPU. Esas opciones de recursos se aplican a Redpanda-vc y su motor seleccionado. [Repositorio Redpanda-vc y motores compatibles](https://github.com/redpanda343/Redpanda-vc)

## Compara aplicaciones con la misma voz

1. Elige el paquete para tu sistema operativo, GPU y formato de modelo. Compruebe si la aplicación es compatible con la generación RVC y el codificador de funciones de su modelo.
2. Comience con la misma grabación breve o repita las mismas frases en su micrófono. Cargue el mismo modelo de inferencia y su índice coincidente en ambas aplicaciones, si es compatible.
3. Utilice el mismo cambio de tono y desactive los efectos de voz opcionales para la primera comparación. Juzgue palabras claras, tono estable y pausas naturales antes de ajustar el sonido.
4. Para uso en vivo, ejecute la aplicación de juegos, llamadas o transmisión que usa normalmente y grabe la salida enrutada durante al menos un minuto. Escuche espacios, cortes bruscos y audio retrasado antes de reducir el búfer.

## Replay

[Sitio oficial](https://www.weights.com/replay) · [Internet Archive](https://archive.org/details/replay-8.7.0-installers)

Tras el cierre de Weights.gg, Replay dejó de recibir soporte y actualizaciones. La [página oficial de Replay](https://www.weights.com/replay) podría desaparecer en cualquier momento. Internet Archive conserva los instaladores de Replay 8.7.0. Se desaconseja usar Replay en instalaciones nuevas. Tras el cierre de Weights, es probable que el instalador archivado no pueda descargar los archivos necesarios y que la instalación quede incompleta.

[Instaladores archivados · Replay 8.7.0](https://archive.org/details/replay-8.7.0-installers)
