---
label: "🎧 Configure un micrófono en vivo"
order: 93
permalink: /ilaria-rvc/applio/realtime/
---
# Use Applio con un micrófono

> Conecta el micrófono físico al conversor, envía la salida al extremo de reproducción del cable y selecciona el extremo de grabación en Discord u OBS. Para Vonovox recomendamos **VAC Lite**, con **VB-CABLE** como alternativa. Lee la guía completa antes de probar en una llamada. [VAC Lite / VB-CABLE](../vonovox/live-audio.md)

Demuestre que su modelo funciona con [un clip grabado](inference.md) antes de configurar el audio en vivo. Utilice auriculares para monitorear para que el micrófono no pueda volver a capturar a los parlantes. Detenga los trabajos de entrenamiento o conversión de archivos que utilizan la misma GPU.

## Escuche la voz convertida localmente

1. Abra **Tiempo real**. En Escritorio, otorgue permiso al micrófono cuando se le solicite, luego seleccione **Dispositivo de entrada** y **Dispositivo de salida**. Actualice la lista si conectó un dispositivo después de abrir Applio.
2. Utiliza tu micrófono físico como entrada y tus auriculares como salida o monitor para esta primera prueba. En Gradio, elija los dispositivos en **Dispositivos de audio**. Los nombres de los dispositivos PortAudio pueden diferir de los nombres de Windows o de las etiquetas que se muestran en el Escritorio.
3. Seleccione el modelo probado, su incrustador coincidente y el índice opcional si lo usa. Inicie la transmisión y espere el estado listo. En Escritorio, habilite **Escucharme** para monitorear y establecer un volumen cómodo.
4. Diga “uno, dos, tres”, haga una pausa y luego repita a su nivel normal de habla. Escuche la voz convertida, las sílabas que faltan o los clics. Si escucha su voz sin cambios, marque **Passthrough** y verifique si el micrófono está monitoreado en otro lugar.

## Dirígelo a tu aplicación de chat o transmisión

Una vez que la prueba de auriculares funcione, detén la transmisión y elige un cable de audio virtual instalado o un dispositivo con sistema operativo equivalente. El cable virtual tiene un punto final que recibe la reproducción y otro que expone esa señal como entrada de grabación.

```text
Physical microphone
  → Applio Realtime input
  → virtual cable playback endpoint
  → virtual cable recording endpoint
  → Discord, OBS or your recording application
```

1. Mantenga la entrada de Applio en el micrófono físico y seleccione el punto final de reproducción del cable como salida.
2. En la aplicación de recepción, seleccione el punto final de grabación del cable como micrófono. Si necesita monitoreo, use auriculares. Deshabilite las rutas de monitoreo que devuelven el cable a sí mismo.
3. Inicie Applio, luego use la prueba de micrófono de la aplicación receptora o realice una grabación de prueba privada. Compruebe que escuche la señal convertida. Desactive las entradas de micrófono físico duplicadas si escucha dos voces.
4. Si los auriculares suenan correctamente pero la aplicación receptora está en silencio, solucione los problemas de los nombres de los dispositivos, el nivel de destino y la selección de entrada antes de cambiar la voz o el índice.

## Retraso del equilibrio y estabilidad del audio

Utilice primero el tamaño de fragmentos automático cuando esté disponible. Si el audio se interrumpe, aumente el **Tamaño del fragmento** y luego repita exactamente la misma frase. Los trozos más pequeños pueden reducir el retraso y dejar al motor menos tiempo para terminar cada bloque. **Superposición de fundido cruzado** suaviza las uniones y **Tamaño de conversión adicional** brinda más contexto a un costo de cómputo. Cambie un control por prueba. Mantenga una configuración estable a la que pueda regresar.

Si los comienzos silenciosos o las terminaciones de palabras desaparecen, marque **VAD** o **Umbral de silencio**. Si las vocales fuertes crujen, revise el micrófono sin procesar y reduzca su ganancia de entrada. Si la transmisión solo falla con un juego en particular o un trabajo de GPU en ejecución, vuelva a intentarlo con ese trabajo cerrado. Detenga el modo en vivo antes de regresar al entrenamiento o al trabajo de GPU en cola.
