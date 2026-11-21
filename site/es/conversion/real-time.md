# Conversión de voz en tiempo real

> Conecta el micrófono físico al conversor, envía la salida al extremo de reproducción del cable y selecciona el extremo de grabación en Discord u OBS. Para Vonovox recomendamos **VAC Lite**, con **VB-CABLE** como alternativa. Lee la guía completa antes de probar en una llamada. [VAC Lite / VB-CABLE](../other-rvcs/vonovox/live-audio.md)

Para una grabación o una portada, la conversión de archivos le permite renderizar y comparar varias tomas. En una configuración en vivo, el convertidor debe finalizar cada bloque de audio lo suficientemente rápido como para mantener la transmisión del micrófono en movimiento. Primero configure una señal local confiable y luego conéctela a una aplicación de llamadas, grabación o transmisión.

## Elija una herramienta para el trabajo

Consulte el [directorio de herramientas RVC](../reference/tools.md) para descargas y notas de hardware, incluido Vonovox para GPU NVIDIA.

 | Herramienta | Por dónde empezar |
| --- | --- |
 | Vonovox | Un conversor en tiempo real para modelos RVC V2 en Windows con una GPU NVIDIA. Descargue una compilación para su GPU, cargue el modelo y pruebe su micrófono a través de auriculares antes de enrutar la señal convertida a otra aplicación. [Descargas de Vonovox](https://huggingface.co/dr87/vonovox/tree/main) · [Documentación del proyecto](https://github.com/dr87/Vonovox) |
 | RVC WebUI (Mainline - Original RVC) | El proyecto inicial proporciona una WebUI de capacitación e inferencia junto con una GUI dedicada en tiempo real. Consulte las instrucciones de lanzamiento y de inicio para la plataforma que utiliza. |
 | Applio | Sus interfaces Desktop y Gradio tienen sus propios flujos de trabajo en tiempo real. Utilice las instrucciones de configuración para la interfaz y la versión que haya instalado. |
 | w-okada VCClient | Un cambiador de voz para uso en vivo. La disponibilidad de RVC depende de la edición de lanzamiento y la plataforma. Verifique los modelos compatibles antes de instalar una compilación. [w-okada VCClient](https://github.com/w-okada/voice-changer) |
 | Deiteris y Tg-Develop | Bifurcaciones w-okada independientes con sus propias compilaciones y configuraciones. Consulte las notas de la versión de el fork antes de aplicar las instrucciones para otra edición. [Repositorio Deiteris](https://github.com/deiteris/voice-changer) · [Repositorio Tg-Develop](https://github.com/tg-develop/voice-changer) |

## Escuche primero una señal limpia

1. Conecte un micrófono y unos auriculares. En el convertidor, seleccione su micrófono físico como entrada y sus auriculares como salida.
2. Cargue un modelo de inferencia compatible conocido y su índice coincidente si utiliza la recuperación. Una [conversión de archivo](../start/getting-started.md) corta exitosa es una referencia útil antes de probar la ruta en vivo.
3. Inicia la transmisión y habla a un nivel normal. Verifique el medidor de entrada o realice una grabación en seco. Reduzca la ganancia de entrada si los picos se recortan antes de la conversión.
4. Verifique que la señal de los auriculares cambie cuando se alterna la conversión. Si escucha el original al mismo tiempo, verifique si hay monitoreo directo del hardware o una segunda ruta a través del sistema operativo.
5. Pruebe por más de una palabra. Incluya un discurso tranquilo, una frase en voz alta y una breve pausa. Escuche cortes, desviaciones o fallas técnicas bajo la misma carga de trabajo que planea usar en vivo.

Evite escuchar a través de parlantes cerca de un micrófono activo. Los auriculares le ayudan a identificar un problema de enrutamiento sin devolver la salida a la entrada.

## Enviar audio convertido a otra aplicación

Un dispositivo de audio virtual proporciona un punto final de reproducción para el convertidor y un punto final de grabación correspondiente para la aplicación receptora. Los nombres de los puntos finales dependen del controlador. Por ejemplo, un cable virtual puede llamar a su punto final de reproducción "Entrada" y a su punto final de grabación "Salida" porque las instrucciones utilizan la perspectiva del cable.

```text
Physical microphone → RVC converter → virtual playback endpoint
                                           ↓
                              matching recording endpoint → call or stream
```

Seleccione el punto final de grabación correspondiente como micrófono en la aplicación receptora y realice una breve grabación de prueba allí. Si su monitor local suena correcto pero la grabación no, verifique la entrada de destino y elimine cualquier fuente de micrófono duplicada. Si monitorea el audio convertido, use una salida de auriculares separada. Evite enrutar toda la mezcla de su escritorio o el audio de la aplicación receptora nuevamente al convertidor.

## Ajuste la latencia sin perder estabilidad

El retraso de extremo a extremo incluye buffers de dispositivo, conversión, enrutamiento virtual y cualquier procesamiento en el destino. Una cifra de tiempo de procesamiento en el convertidor mide sólo una parte de ese camino. Capture una prueba local tanto del micrófono seco como de la ruta convertida si necesita medir el retraso entre ellos.

 | Control | Ajuste práctico |
| --- | --- |
 | Tamaño de bloque o tamaño de fragmento | Auméntelo si el habla se interrumpe bajo carga. Una vez estable, pruebe con una configuración más pequeña y manténgala sólo si el habla normal se mantiene limpia. Los bloques más pequeños dejan menos tiempo para terminar el procesamiento. |
 | Fundido cruzado | Aumente con precaución si escucha uniones irregulares entre bloques. Cambia la forma en que se superponen los bloques vecinos. |
 | Contexto adicional | Pruebe con menos contexto si el convertidor se queda atrás. Puede ayudar al modelo a seguir las transiciones, a costa de un mayor procesamiento. |
 | Predictor de tono | Si una configuración produce una sincronización inestable, compare los predictores disponibles usando las mismas frases. Seleccione el que maneje su rango de tono con suficiente margen de procesamiento. |
 | Detección de silencio o umbral de entrada | Baja un umbral que corta las sílabas suaves. Evalúe esto durante las pausas y el habla tranquila, no sólo durante una entrada fuerte y sostenida. |
 | Velocidad del dispositivo | Verifique las frecuencias de muestreo del dispositivo y del cable virtual si escucha una velocidad inusual o un crujido. Comience con configuraciones compatibles en toda la cadena. |

Comience con los valores predeterminados de la aplicación y cambie una configuración a la vez. Si un juego u otro programa con mucha GPU comparte la máquina, repita la prueba mientras se está ejecutando. Mantenga un ajuste preestablecido que funcione para poder restaurarlo antes de publicarlo. [GUI principal en tiempo real](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/main/realtime_gui.py)

## Solucionar problemas según donde aparece la falla

 | Síntoma | Verificar primero |
| --- | --- |
 | Ni el medidor del convertidor ni la grabación de micrófono seco responden | Verifique el dispositivo de entrada del sistema operativo y el permiso del micrófono. |
 | El micrófono seco funciona, pero la salida convertida está en silencio | Confirme que se inició la transmisión, que el modelo se cargó y que el convertidor seleccionó la salida correcta. Verifique el umbral de entrada. |
 | El monitor local funciona, pero la llamada recibe la voz original | Seleccione el punto final de grabación virtual como micrófono de llamada y desactive cualquier fuente de micrófono físico separada en esa aplicación. |
 | Escuchas dos versiones de la voz | Silencia las rutas de entrada duplicadas y verifica que el monitor de los auriculares esté separado de la ruta virtual. |
 | El audio crepita solo bajo carga | Vuelva al último tamaño de fragmento estable, reduzca las cargas de trabajo competitivas y vuelva a realizar la prueba. |
 | Un modelo funciona en la conversión de archivos pero falla en vivo | Verifique la edición, la arquitectura y el soporte de integración del cliente en vivo. Pruebe un modelo listado como compatible en ese cliente antes de cambiar los dispositivos de audio. |

[Fundamentos de RVC](../start/rvc-fundamentals.md) · [Solución de problemas](../reference/troubleshooting.md)

## RVC Blue

Conversión de voz en tiempo real en Windows. [Instalación y configuración](../other-rvcs/rvc-blue/installation.md).
## Roles de dispositivos y backends de audio

| Término | Qué es |
| --- | --- |
| **Input Device** | Tu micrófono físico (o interfaz) que entra al cambiador de voz. |
| **Output Device** | Destino de la voz convertida (punto de reproducción del cable virtual para Discord/OBS/juegos, o auriculares). |
| **Monitor Device** | Salida opcional para escucharte en auriculares mientras **Output Device** va al cable virtual. |
| **Virtual Cable Input** *(Reproducción)* | Aparece en Reproducción (Line 1 / CABLE Input). Ponlo como **Output Device**. |
| **Virtual Cable Output** *(Grabación)* | Aparece en Grabación (Line 1 / CABLE Output). Elígelo como **Micrófono** en Discord, OBS o juegos. |

- **Micrófonos USB / Interfaces XLR / WASAPI / ASIO:** Alinea todo a 48000 Hz; usa **WASAPI Shared** para compatibilidad, **WASAPI Exclusive** si es soportado o **ASIO** en interfaces dedicadas.
- **Discord, OBS y Juegos:** Desactiva Krisp y cancelación de eco en Discord si cortan palabras; en juegos limita los FPS para dejar margen GPU.
- **Latencia de proceso vs. latencia total:** **GPU Delay** mide solo el tiempo GPU por bloque; la **latencia de extremo a extremo** suma micrófono, **Block Size**, cable virtual y búferes de destino.
