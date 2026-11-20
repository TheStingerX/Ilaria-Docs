---
label: "Instale y use RVC Blue"
icon: ":studio_microphone:"
order: 99
permalink: /ilaria-rvc/rvc-blue/installation/
description: "RVC Blue es un cambiador de voz de escritorio de Windows basado en la GUI en tiempo real de RVC WebUI (Mainline - Original RVC). Convierte micrófonos..."
---
# RVC Blue (RVC-Realtime-GUI)

[GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI)

RVC Blue es un cambiador de voz de escritorio de Windows basado en la GUI en tiempo real de RVC WebUI (Mainline - Original RVC). Convierte micrófonos, archivos de audio y audio de aplicaciones de Windows compatibles en tiempo real. Los modelos se entrenan en una aplicación separada. La entrada de archivos pasa por el motor en vivo y se puede grabar en WAV.

## Instale el paquete de Windows

1. Verifique el modelo de su GPU NVIDIA en **Administrador de tareas → Rendimiento**. Abra [Descargas de RVC Blue](https://huggingface.co/niel-blue/RVC-Realtime-GUI) y elija el paquete para su hardware. El proyecto proporciona un paquete estándar **CUDA 12.8**, que incluye soporte para Blackwell, y un paquete de compatibilidad **CUDA 11.8**. Utilice un controlador compatible con la compilación seleccionada.
2. Extraiga todo el archivo en una carpeta local grabable. Python, PyTorch, FFmpeg y los recursos de inferencia necesarios vienen con el paquete.
3. Para CUDA 12.8, ejecute `RVC-Realtime-GUI-CUDA128.bat` desde esa carpeta. Para CUDA 11.8, utilice su iniciador incluido. Espere a que el primer inicio termine de cargar el tiempo de ejecución de la GPU.
4. Comience con la voz incluida o coloque su propia inferencia `.pth` y su índice correspondiente en una carpeta por modelo en `models/`. Por ejemplo, coloque `MyVoice.pth` y `added_MyVoice.index` dentro de `models/MyVoice/`. El nombre de la carpeta aparece en la lista de modelos. Actualice o vuelva a abrir la aplicación después de agregar un modelo.

## Pruebe la voz localmente

Elija su micrófono físico como entrada. Seleccione auriculares para monitorear, elija una voz y haga clic en **Iniciar**. Di una frase corta y haz una pausa. Mantenga la configuración predeterminada de búfer y tono para la primera prueba. La aplicación permite dispositivos independientes de entrada, salida y monitoreo. Comience con WASAPI si no utiliza hardware ASIO. Si utiliza ASIO nativo, comience con el búfer recomendado por el controlador.

## Enrutar audio a un juego o llamada

Elija el punto final de reproducción del cable virtual como salida del convertidor. En la aplicación de destino, seleccione el punto final de grabación como su micrófono. Mantenga la reproducción de juegos o llamadas en sus auriculares. **VAC Lite** y **VB-CABLE** son opciones. Verifique los nombres de los dispositivos en el [tutorial del cable virtual](../vonovox/live-audio.md). Realice una breve grabación local en el destino antes de unirse a una llamada.

## Utilice un archivo u otra aplicación como entrada

Para un archivo de audio, seleccione el modo de entrada de archivo y pruebe un WAV corto. Elija un dispositivo de salida y monitorización antes de comenzar. Utilice los controles de grabación para guardar la salida WAV. La aplicación también presenta opciones para registrar la entrada y la salida de forma independiente o en un diseño combinado.

En compilaciones que incluyen captura de aplicaciones, cambie la fuente de entrada a una aplicación, actualice la lista y seleccione la aplicación que está reproduciendo audio. Esto utiliza la captura de audio por proceso de Windows. La salida ASIO directa puede omitir la ruta de captura. El audio original de la aplicación permanece audible a menos que ajuste su reproducción por separado.

## Solucionar problemas de la primera prueba

| Síntoma | Qué verificar |
| --- | --- |
| El programa se cierra durante el inicio | Ejecute el iniciador incluido desde su carpeta extraída y lea el primer error. Verifique la compilación CUDA seleccionada y el controlador NVIDIA. |
| No aparece una nueva voz | Verifique la carpeta por modelo y actualice la lista de modelos. Utilice una exportación de inferencia en lugar de un punto de control de entrenamiento. |
| Los auriculares funcionan pero Discord o el juego están en silencio | Seleccione el punto final de grabación del cable virtual en el destino. Verifique la salida del convertidor por separado. |
| Escuchas dos voces | Compruebe si la aplicación original sigue siendo audible o si hay dos rutas de seguimiento activas. |
| El audio se corta bajo carga | Restaura el búfer predeterminado o auméntalo ligeramente. Repita la prueba mientras se ejecuta la otra aplicación. |

[Fuente del proyecto y notas de la versión](https://github.com/niel-blue/RVC-Realtime-GUI/tree/main)
