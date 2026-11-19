---
label: "Pruebe el audio en vivo en Redpanda-vc"
icon: ":studio_microphone:"
order: 98
permalink: /ilaria-rvc/redpanda/live-audio/
---
# Pruebe el audio en vivo en Redpanda-vc

> Conecta el micrófono físico al conversor, envía la salida al extremo de reproducción del cable y selecciona el extremo de grabación en Discord u OBS. Para Vonovox recomendamos **VAC Lite**, con **VB-CABLE** como alternativa. Lee la guía completa antes de probar en una llamada. [VAC Lite / VB-CABLE](../vonovox/live-audio.md)

## Elija escritorio o navegador

El iniciador en tiempo real del escritorio de Windows utiliza los dispositivos expuestos a ese proceso local. La pestaña en tiempo real de WebUI captura la entrada del micrófono a través del navegador y pasa el audio al dispositivo de inferencia seleccionado. Utilice una ruta para su primera prueba y deje la otra cerrada para facilitar el diagnóstico de los comentarios y los trabajos competitivos.

1. Cargue un modelo RVC compatible, seleccione el incrustador esperado donde esté expuesto y comience en un paso neutro con el búfer predeterminado.
2. Selecciona el micrófono físico. En el modo de navegador, otorgue permiso al micrófono para la página local y verifique la fuente real en los permisos del navegador.
3. Conecte los auriculares y reproduzca el monitor. Diga una oración corta que contenga palabras en voz baja y en voz alta, seguida de una pausa. Verifique la identidad de la voz, el volumen y las interrupciones.
4. Detenga la transmisión antes de cambiar de motor o elegir un dispositivo de inferencia diferente. Ejecute otra prueba después de volver a conectarse.

## Seleccione el dispositivo informático

En las compilaciones de WebUI con **Dispositivo de inferencia**, **Automático** asigna una nueva secuencia a un dispositivo disponible. Elija una GPU específica al comparar resultados repetibles o dejar una GPU libre para otra carga de trabajo. Una transmisión permanece en su dispositivo asignado. Varias GPU pueden manejar transmisiones separadas; cambiar el selector no es una forma de combinar su capacidad en una sola secuencia. Beatrice utiliza una ruta de CPU separada en la implementación documentada.

## Enrutar la señal después de una prueba limpia

Si su ruta de reproducción puede apuntar a un cable virtual, elija allí el punto final de reproducción del cable. En la aplicación de recepción, seleccione el punto final de grabación complementario como micrófono. Mantenga el micrófono físico como entrada y salida del convertidor de la llamada en los auriculares. En el modo de navegador, el destino de la reproducción puede depender de la configuración de salida del navegador y del sistema operativo. Verifique el receptor con una grabación local antes de juzgar la transmisión en vivo en una llamada.

| Lo que escuchas | Qué probar |
| --- | --- |
| El monitor funciona pero la llamada tiene audio sin procesar | Seleccione el punto final del cable en la llamada y desactive las fuentes de micrófono adicionales. |
| El retraso aumenta o el audio se entrecorta | Detenga otras transmisiones, use el búfer predeterminado y pruebe localmente con una pestaña. |
| El medidor del micrófono del navegador nunca se mueve | Confirme el permiso del sitio, el dispositivo físico seleccionado y si otra aplicación tiene acceso exclusivo. |
| Solo un juego causa audio roto | Pruebe mientras el juego se está ejecutando, déle margen de maniobra a la GPU de conversión o elija otra GPU disponible. |

La transmisión del navegador intenta el transporte WebSocket y puede recurrir a la transmisión HTTP cuando sea necesario. Establezca un resultado local limpio antes de investigar la calidad de la conexión remota.
