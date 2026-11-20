---
label: "Archivos, configuración y mantenimiento del código fuente"
icon: ":card_file_box:"
order: 84
permalink: /ilaria-rvc/source-layout/
description: "Se puede utilizar una exportación de inferencia para la conversión."
---
# Archivos, configuración y mantenimiento del código fuente

[Descarga Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

> **2.4.0** · Windows mueve la aplicación y el entorno a app/, y los modelos a models/ en la raíz. Añade Colab, Lightning AI Studio, ayuda para descargar embedders y Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). Se repara pip y se incluye pywin32.

## Saber qué respaldar

 | Ubicación | Rol |
| --- | --- |
 | Modelos/ | Voces listas para inferencias y sus índices coincidentes, comúnmente agrupados en carpetas por voz. |
 | conjuntos de datos/ | Grabaciones de entrenamiento importadas. Guarde una copia separada de sus originales. |
 | registros/ | Configuración del experimento, audio preparado, funciones, índices, puntos de control reanudables y vistas previas. Haga una copia de seguridad de todo el experimento para reanudarlo más tarde. |
 | tiempo de ejecución/ | Entorno Windows Python incluido. |
 | activos/ | Codificador central y pesos de paso, codificadores opcionales, preentrenamientos de entrenamiento, ilustraciones y otros activos de la aplicación. |

Se puede utilizar una exportación de inferencia para la conversión. Para un experimento reanudable, mantenga el par G/D guardado y el optimizador y el estado de entrenamiento junto con la configuración, la lista de archivos y las funciones extraídas.

## Trabajar desde el código fuente en Windows

Comience desde una instalación limpia y coincidente. Copie el tiempo de ejecución incluido, ffmpeg y ffprobe en la caja fuente con el mismo diseño. Traiga los pesos ContentVec y RMVPE instalados y los activos FCPE si es necesario. Para entrenar con los preentrenamientos V2 predeterminados, copie los activos pretrained_v2 instalados. Copie .env.example a .env y use el iniciador de registros. Al diagnosticar el inicio, verifique las rutas incluidas antes de cambiar las dependencias de Python globalmente.

El proyecto mantiene como referencia los puntos de entrada aguas arriba. Su aplicación principal es app/ILARIA_RVC.py, con módulos de características específicas en app/ilaria/ y el código de inferencia y entrenamiento ascendente en app/infer/. Ilaria RVC se basa en RVC WebUI (Mainline - Original RVC), incluye trabajo adaptado de Applio y Redpanda-vc, utiliza TorchFCPE para FCPE y amplía Ilaria Audio Analyzer. Consulte la licencia y los avisos del repositorio al redistribuir fuentes o activos.

## Actualice sin perder trabajo

Termine los trabajos, copie los datos esenciales y use el panel de actualización para consultar las notas de la versión. El actualizador verifica las descargas y admite copias de seguridad y recuperación. Si la misma instalación ya tiene un proceso en ejecución, use la dirección o los registros de su navegador y espere a que finalice el trabajo activo. Utilice **Reiniciar Ilaria RVC** para reiniciar la interfaz de usuario normal.
