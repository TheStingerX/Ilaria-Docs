---
label: "Pruebe el audio en vivo en Redpanda-vc"
icon: ":studio_microphone:"
order: 98
permalink: /ilaria-rvc/redpanda/live-audio/
description: "El iniciador en tiempo real del escritorio de Windows utiliza los dispositivos expuestos a ese proceso local."
---
# Pruebe el audio en vivo en Redpanda-vc

## Elija escritorio o navegador

El iniciador en tiempo real del escritorio de Windows utiliza los dispositivos expuestos a ese proceso local. La pestaña en tiempo real de WebUI captura la entrada del micrófono a través del navegador y pasa el audio al dispositivo de inferencia seleccionado. Utilice una ruta para su primera prueba y deje la otra cerrada para facilitar el diagnóstico de los comentarios y los trabajos competitivos.

1. Cargue un modelo RVC compatible, seleccione el incrustador esperado donde esté expuesto y comience en un paso neutro con el búfer predeterminado.
2. Selecciona el micrófono físico. En el modo de navegador, otorgue permiso al micrófono para la página local y verifique la fuente real en los permisos del navegador.
3. Conecte los auriculares y reproduzca el monitor. Diga una oración corta que contenga palabras en voz baja y en voz alta, seguida de una pausa. Verifique la identidad de la voz, el volumen y las interrupciones.
4. Detenga la transmisión antes de cambiar de motor o elegir un dispositivo de inferencia diferente. Ejecute otra prueba después de volver a conectarse.

## Seleccione el dispositivo informático

En las compilaciones de WebUI con **Dispositivo de inferencia**, **Automático** asigna una nueva secuencia a un dispositivo disponible. Elija una GPU específica al comparar resultados repetibles o dejar una GPU libre para otra carga de trabajo. Una transmisión permanece en su dispositivo asignado. Varias GPU pueden manejar transmisiones separadas; cambiar el selector no es una forma de combinar su capacidad en una sola secuencia. Beatrice utiliza una ruta de CPU separada en la implementación documentada.

## Enrutar la señal después de una prueba limpia

> **Correct Audio Routing**
>
> **1. Dentro del Voice Changer**
> - **Input Device:** Tu micrófono físico.
> - **Output Device:** `Line 1` (VAC, recomendado) o `CABLE Input` (VB-CABLE).
>
> **2. Dentro de Discord, Juegos, OBS u otras aplicaciones**
> - **Input Device:** `Line 1` (VAC, recomendado) o `CABLE Output` (VB-CABLE).
> - **Output Device:** Tus auriculares (muy recomendados frente a altavoces).
>
> ```text
> Your Microphone → Voice Changer → Line 1 (VAC) or CABLE Input/Output (VB-CABLE) → Discord / Game / OBS
> ```
>
> El audio que llega desde Discord, el juego u otras apps debe reproducirse directamente en tus **auriculares** (nunca de vuelta al cable virtual).
>
> - **VAC vs. VB-CABLE:** **VAC** (`Line 1`) es siempre la opción recomendada. Si también (o solo) usas **VB-CABLE**, recuerda que el voice changer envía a **`CABLE Input`** mientras que Discord / juegos escuchan **`CABLE Output`**.
> - **Altavoces y filtración de auriculares:** Evita usar altavoces; el sonido puede filtrarse en el micrófono y provocar doble audio, eco o que también se conviertan las voces de otras personas. También puede pasar con auriculares si el volumen está muy alto o no son lo bastante cerrados y aislados.
> - **Monitoreo:** Escuchar tu propia voz convertida en los auriculares es una función opcional aparte que solo debe activarse cuando haga falta. Evita rutas de audio duplicadas, eco y loopback.

Si su ruta de reproducción puede apuntar a un cable virtual, elija allí el punto final de reproducción del cable. En la aplicación de recepción, seleccione el punto final de grabación complementario como micrófono. Mantenga el micrófono físico como entrada y salida del convertidor de la llamada en los auriculares. En el modo de navegador, el destino de la reproducción puede depender de la configuración de salida del navegador y del sistema operativo. Verifique el receptor con una grabación local antes de juzgar la transmisión en vivo en una llamada.

| Lo que escuchas | Qué probar |
| --- | --- |
| El monitor funciona pero la llamada tiene audio sin procesar | Seleccione el punto final del cable en la llamada y desactive las fuentes de micrófono adicionales. |
| El retraso aumenta o el audio se entrecorta | Detenga otras transmisiones, use el búfer predeterminado y pruebe localmente con una pestaña. |
| El medidor del micrófono del navegador nunca se mueve | Confirme el permiso del sitio, el dispositivo físico seleccionado y si otra aplicación tiene acceso exclusivo. |
| Solo un juego causa audio roto | Pruebe mientras el juego se está ejecutando, déle margen de maniobra a la GPU de conversión o elija otra GPU disponible. |

La transmisión del navegador intenta el transporte WebSocket y puede recurrir a la transmisión HTTP cuando sea necesario. Establezca un resultado local limpio antes de investigar la calidad de la conexión remota.
