---
label: "Modelo, micrófono y cable"
icon: ":headphones:"
order: 90
permalink: /ilaria-rvc/tgr/live-audio/
description: "Utilice un punto de control de inferencia RVC compatible y un micrófono que funcione. Primero prueba que la señal convertida llega a tus auriculares."
---
# Configure audio en vivo en Okada TG Developed Fork

Utilice un punto de control de inferencia RVC compatible y un micrófono que funcione. Primero prueba que la señal convertida llega a tus auriculares. Luego envía esa señal a otra aplicación y haz una grabación desde el extremo receptor.

## Cargar una voz RVC

1. Detener la conversión si ya se está ejecutando. Abra **Editar** en el área de selección de modelo y elija una ranura vacía.
2. Elija **Cargar** y seleccione el archivo del modelo de inferencia RVC. Cuando el cuadro de diálogo muestre un campo separado para el índice, agregue el `.index` correspondiente, si se proporciona. Utilice únicamente archivos de inferencia compatibles. Un índice por sí solo no puede producir una voz.
3. Espere la carga y haga clic en el espacio recién cargado en la vista principal. Verifique el nombre del modelo antes de presionar Inicio.
4. Establezca el tono y la recuperación en cero. Asegúrese de que **Passthrough** esté desactivado. Su estado habilitado envía el micrófono seco, de modo que el micrófono pueda atender una llamada incluso si se omite la conversión.

## Pruebe el micrófono y el dispositivo informático

1. En **Audio**, elija el modo para los dispositivos que desea utilizar. En una prueba de navegador local, utilice **Cliente** y otorgue al sitio acceso a su micrófono. En **Servidor**, elija los dispositivos de entrada y salida visibles para el proceso que ejecuta TGR.
2. Nombra los puntos finales antes de comenzar. **Entrada** es el micrófono físico, **Salida** son los auriculares para la primera prueba y **Monitor** es opcional si tu construcción lo ofrece.
3. Elija la GPU o CPU que desee en el selector de dispositivos. Para obtener una línea base de DirectML, pruebe `rmvpe_onnx` si aparece en la lista. Los detectores de tono de DirectML compatibles documentados por el fork también incluyen `fcpe_onnx`, `crepe_tiny_onnx` y `crepe_full_onnx`. La compilación CUDA puede exponer una lista diferente.
4. Presione **Iniciar** en el tamaño de fragmento predeterminado. Dale tiempo al modelo para que se inicialice y luego di una frase en voz baja y otra más larga en voz alta. Pausa entre ambos. Comprueba que la salida cambia al seleccionar el modelo y que el audio se mantiene estable durante un minuto.
5. Si también escucha una copia seca, desactive el efecto local del hardware o retire el otro bucle de micrófono en el sistema operativo. Mantenga los niveles de los auriculares moderados durante las pruebas.

## Conectar un cable

> **Correct Audio Routing**
>
> **1. Dentro del Voice Changer**
> - **Input Device:** Tu micrófono físico.
> - **Output Device:** `Line 1` (VAC, recomendado) o `CABLE Input` (VB-CABLE).
>
> **2. Dentro de Discord, Juegos, OBS u otras aplicaciones**
> - **Input Device:** `Line 1` (VAC, recomendado) o `CABLE Output` (VB-CABLE).
> - **Output Device:** Tus auriculares o altavoces.
>
> ```text
> Your Microphone → Voice Changer → Line 1 (VAC) or CABLE Input/Output (VB-CABLE) → Discord / Game / OBS
> ```
>
> El audio que llega desde Discord, el juego u otras apps debe reproducirse directamente en tus **auriculares** (nunca de vuelta al cable virtual).
>
> - **VAC vs. VB-CABLE:** **VAC** (`Line 1`) es siempre la opción recomendada. Si también (o solo) usas **VB-CABLE**, recuerda que el voice changer envía a **`CABLE Input`** mientras que Discord / juegos escuchan **`CABLE Output`**.
> - **Monitoreo:** Escuchar tu propia voz convertida en los auriculares es una función opcional aparte que solo debe activarse cuando haga falta. Evita rutas de audio duplicadas, eco y loopback.

El editor de TGR utiliza Virtual Audio Cable de Muzychenko para sus ejemplos de solución de problemas de Windows. Por lo general, esto expone puntos finales de reproducción y grabación coincidentes denominados **Línea 1**. Otros conductores de cable utilizan etiquetas diferentes. La señal debe ingresar al punto final de reproducción y salir por el punto final de grabación correspondiente.

| Configuración | Primera prueba enrutada |
| --- | --- |
| Entrada TGR | Tu micrófono físico, el mismo que funcionó en la prueba de auriculares. |
| Salida TGR | Punto final de reproducción por cable. |
| Monitor TGR | Auriculares, si se muestran como una salida separada. |
| Entrada de Discord u OBS | El punto final de grabación del cable. |
| Salida de Discord o reproducción de SO | Auriculares. |

1. Instale el cable y reinicie las aplicaciones para actualizar los dispositivos de audio.
2. Configure los dispositivos como se muestra, luego verifique los formatos predeterminados del micrófono y el cable en la configuración de sonido del sistema operativo. Elija una frecuencia de muestreo compatible común. En el modo Servidor, verifique si hay nombres de dispositivos duplicados enumerados en diferentes API de host y use un par compatible.
3. Inicie la conversión, luego inicie la prueba de micrófono de la aplicación receptora. Graba una frase corta. Escuche lo que recibe el destinatario, no sólo el monitor en TGR.
4. En OBS, deshabilite el micrófono físico separado si duplica la fuente del cable. En una llamada, verifique que la entrada seleccionada sea explícita en lugar de cambiar automáticamente cuando conecte un auricular nuevo.
5. Detener el convertidor. Si el medidor receptor continúa respondiendo, verifique el punto final de grabación seleccionado y cualquier audio de escritorio enrutado al cable.

## Ajuste DirectML y CUDA sin perder su línea base

**Chunk** controla el bloqueo del audio entrante. **Extra** proporciona contexto alrededor del bloque actual. Los controles de **Fundido cruzado** se superponen donde se unen los bloques. Cambie un control a la vez y realice una grabación de prueba. Si el tiempo de procesamiento se acerca a la duración del fragmento, comience aumentando el fragmento o reduciendo el contexto adicional. Si un fragmento modificado se comporta de manera extraña, detenga e inicie la conversión nuevamente.

En la compilación de DirectML documentada, los cambios en Chunk, Extra y Crossfade pueden requerir seleccionar la CPU y luego volver a seleccionar la GPU deseada. Hágalo después de detenerlo, reinicie la transmisión y repita la misma prueba antes de evaluar la latencia. En CUDA, permita el primer calentamiento antes de medir. Algunas combinaciones de protocolo y audio del servidor muestran **perf** sin otros tiempos. Juzgue la ruta completa de la llamada con una grabación en la aplicación receptora.

| Fallo | Siguiente acción |
| --- | --- |
| El micrófono pasa sin cambios | Desactive **Passthrough**, verifique la ranura seleccionada y seleccione el cable como único micrófono de la aplicación receptora. |
| Desaparece una sílaba silenciosa | Pruebe el umbral de entrada y la detección de voz de la aplicación de destino por separado. Verifique una grabación simple para ver si hay silencio real. |
| Los clics comienzan después de conectar el cable | Compare las frecuencias de muestreo del micrófono y el cable y las selecciones de API del host. Vuelva a realizar la prueba sin el cable para confirmar en qué etapa se introduce el clic. |
| Las palabras tartamudean cuando se abre un juego | Restaura la última parte estable, reduce el contexto o la carga competitiva y vuelve a probar. Mantenga abierta la configuración que funciona con ambas aplicaciones. |
| Solo un método de lanzamiento falla o se detiene | Regrese a un método enumerado por su backend. En DirectML, compare las opciones de tono de ONNX con la misma frase corta. |
| Una segunda aplicación tiene un medidor pero registra el ruido ambiental | Detenga la TGR y revise nuevamente el medidor. Un medidor que aún sigue a su micrófono apunta a una ruta adicional o al punto final de grabación incorrecto. |

Si necesita ayuda para realizar más diagnósticos, conserve el identificador de versión, los nombres de los dispositivos de backend, micrófono y cable, el detector elegido y el primer error de la consola. Confirme si el problema también ocurre en una prueba de auriculares local.
