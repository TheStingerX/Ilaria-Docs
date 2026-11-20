---
label: "Configuración del micrófono en tiempo real"
icon: ":headphones:"
order: 10
permalink: /ilaria-rvc/mainline/realtime/
description: "Esta guía se aplica a la GUI en tiempo real separada incluida en las compilaciones de RVC WebUI (Mainline - Original RVC) compatibles."
---

# Utilice el cambiador de voz en tiempo real de RVC WebUI (Mainline - Original RVC)

> Conecta el micrófono físico al conversor, envía la salida al extremo de reproducción del cable y selecciona el extremo de grabación en Discord u OBS. Para Vonovox recomendamos **VAC Lite**, con **VB-CABLE** como alternativa. Lee la guía completa antes de probar en una llamada. [VAC Lite / VB-CABLE](../vonovox/live-audio.md)

Esta guía se aplica a la GUI en tiempo real separada incluida en las compilaciones de RVC WebUI (Mainline - Original RVC) compatibles. Puede pasar un micrófono a través de un modelo continuamente mientras la WebUI se usa para grabaciones y capacitación. Comience escuchando directamente a través de auriculares y luego envíe el audio procesado a su otra aplicación.

## Abra la interfaz y seleccione sus archivos

1. Finalice la [instalación](installation.md) y verifique el modelo con una [conversión de archivo corta](inference.md). Esto le brinda una prueba independiente si surge un problema con el micrófono.
2. En un paquete de Windows con `go-realtime_gui.bat`, ejecútelo desde la carpeta del programa descomprimido. En la rama fuente actual, active el entorno desde la configuración y ejecute `python realtime_gui.py` desde el directorio del repositorio. Los nombres de los lanzadores de paquetes varían.
3. En la ventana en tiempo real, seleccione la pequeña inferencia `.pth`. Si tiene su coincidencia completa `.index`, selecciónela aquí. Deje **Índice** en `0` para la primera prueba de escucha. Si su compilación requiere un índice en su selector de archivos, proporcione el del modelo seleccionado.
4. Elija una interfaz de host de sonido, luego seleccione su micrófono físico como entrada y sus auriculares como salida. Elija los valores normales de tono y frecuencia de muestreo que ofrece su compilación. Comience con la configuración de rendimiento predeterminada.

## Verifique el micrófono antes de conectar una aplicación

1. Baje el volumen de los auriculares antes de comenzar. Si la GUI ofrece **Monitor de voz de entrada**, úselo para confirmar el micrófono seleccionado. Di una frase corta y haz una pausa. Comprueba que escuchas una voz directa y silencio durante la pausa.
2. Cambie a **Salida de voz convertida** e inicie la conversión. Espere la inicialización. Repita la misma oración en un nivel de habla normal y escuche las consonantes y las terminaciones de las palabras. Compruebe si hay comentarios antes de subir el volumen.
3. Si la transmisión comienza pero recorta palabras, verifique la selección del dispositivo y el nivel de entrada. Si hay espacios repetidos, regrese a la longitud del bloque de procesamiento predeterminado. Una voz limpia y ligeramente retrasada es una mejor base que una señal de baja latencia que se interrumpe constantemente.
4. Detén la transmisión antes de cambiar de dispositivo de audio o cargar un punto de control diferente. Reinicie y repita la misma prueba de escucha.

## Enrute RVC WebUI (Mainline - Original RVC) a una llamada o grabadora

Configure un cable virtual u otro par de dispositivos de reproducción y grabación conectados. El final de la reproducción recibe sonido de RVC WebUI (Mainline - Original RVC). El extremo de grabación proporciona ese sonido a su llamada o grabadora.

```text
Physical microphone → RVC WebUI (Mainline - Original RVC) GUI → Virtual cable playback input
                                           ↓
                       Call or recording app ← Virtual cable recording output
```

1. Detenga la conversión y configure el dispositivo de salida de la línea principal en el extremo de reproducción del cable. Deje el micrófono físico seleccionado como entrada de RVC WebUI (Mainline - Original RVC).
2. En la aplicación de destino, elija el extremo de grabación del cable como micrófono. Seleccione sus auriculares para la reproducción de esa aplicación, de modo que el sonido de la llamada no regrese a través del cable.
3. Inicie la conversión y realice una grabación privada o utilice la prueba de micrófono de la aplicación. Confirme que captura la voz convertida una vez. Si también necesita monitoreo local, use el monitoreo de la aplicación de destino cuando esté disponible y manténgala separada de la entrada del cable.
4. Si la aplicación de destino corta sílabas silenciosas, compare una muestra breve con el procesamiento automático de ruido desactivado para realizar un diagnóstico. Restaura cualquier procesamiento que mejore el resultado sin perder palabras.

## Reducir el retraso sin crear abandonos

Disminuya la **Longitud de la muestra** o el control de bloque equivalente un incremento a la vez. Un bloque más corto reduce la espera pero le da al motor menos tiempo para terminar. Repita una frase tranquila y una frase más alta después de cada cambio. Si hay clics, abandonos o sílabas repetidas, vuelva al último valor estable. Una vez que el tamaño del bloque sea estable, ajuste otra configuración a la vez si su compilación lo expone:

- **Duración del desvanecimiento** combina fragmentos superpuestos. Un cambio puede ayudar con los clics en los límites de los fragmentos.
- **Tiempo de inferencia adicional** le da al modelo más contexto en torno al bloque actual. Redúzcalo con cautela y escuche si hay inestabilidad.
- **La extracción de tono** afecta tanto la calidad del tono como la carga de trabajo. Compare una alternativa compatible cuando las notas difíciles se tambalean o el procesamiento lleva demasiado tiempo.
- La **tasa de índice** y las reducciones de ruido añaden procesamiento. Pruebe una línea de base estable con las funciones opcionales desactivadas antes de ajustar cada una.

Utilice la misma prueba con su carga de trabajo de llamadas, juegos o grabaciones en ejecución. El retraso de ida y vuelta que escuchas también incluye a los conductores, el cable virtual y la aplicación de destino. Una cifra de tiempo mostrada por el convertidor representa sólo una parte de ese camino.

| Síntoma | Verifique primero |
| --- | --- |
| Falta el dispositivo | Detenga la transmisión, vuelva a cargar la lista de dispositivos y pruebe con otra interfaz de host que exponga el micrófono y la salida. Verifique el permiso del micrófono del sistema. |
| La aplicación descendente recibe la voz sin procesar | Configure el micrófono descendente en el extremo de grabación del cable. Deshabilite una segunda fuente de captura si la aplicación combina ambas. |
| Aullido o voz duplicada | Utilice auriculares, compruebe que ninguna entrada apunte al retorno del propio cable y desactive la monitorización duplicada. |
| Buen sonido del monitor, destino silencioso | Confirma que elegiste los dos extremos del mismo cable. Pruebe ambos puntos finales con una aplicación de grabación local. |
| El modelo no se inicia | Pruebe la misma exportación de inferencia en la WebUI y confirme los activos coincidentes. Verifique el primer error de la GUI antes de cambiar la configuración del dispositivo y del modelo juntos. |

Consulte [conceptos básicos de conversión en tiempo real](../../conversion/real-time.md) para conocer otras aplicaciones compatibles y terminología general de enrutamiento.
