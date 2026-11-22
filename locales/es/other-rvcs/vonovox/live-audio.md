---
label: "Enruta y sintoniza Vonovox"
icon: ":studio_microphone:"
order: 98
permalink: /ilaria-rvc/vonovox/live-audio/
description: "Utilice tres puntos finales: su micrófono físico como entrada, un cable virtual para la señal convertida y auriculares para monitoreo."
---
# Enruta y sintoniza Vonovox

> **Correct Audio Routing**
>
> **1. Dentro del Voice Changer**
> - **Input Device:** Tu micrófono físico.
> - **Output Device:** `Line 1` (Virtual Audio Cable / VAC).
>
> **2. Dentro de Discord, Juegos, OBS u otras aplicaciones**
> - **Input Device:** `Line 1` (Virtual Audio Cable / VAC).
> - **Output Device:** Tus auriculares o altavoces.
>
> ```text
> Your Microphone → Voice Changer → Virtual Audio Cable (Line 1) → Discord / Game / OBS
> ```
>
> El audio que llega desde Discord, el juego u otras apps debe reproducirse directamente en tus **auriculares** (nunca de vuelta al cable virtual).
>
> - **VAC vs. VB-CABLE:** `Line 1` es el nombre usado por **VAC (Virtual Audio Cable)**, no un nombre universal para todos los cables virtuales. Con **VB-CABLE**, configura la salida del Voice Changer en **`CABLE Input`** y la entrada de Discord / juego en **`CABLE Output`**.
> - **Monitoreo:** Escuchar tu propia voz convertida en los auriculares es una función opcional aparte que solo debe activarse cuando haga falta. Evita rutas de audio duplicadas, eco y loopback.

## Configura la ruta

Utilice tres puntos finales: su micrófono físico como entrada, un cable virtual para la señal convertida y auriculares para monitoreo. Un cable virtual tiene un lado de reproducción para la aplicación que envía audio y un lado de grabación para la aplicación que lo recibe. Algunos controladores muestran el mismo nombre de línea en ambos lados.

1. En Vonovox, configure **Dispositivo de entrada** en el micrófono físico. Configure **Dispositivo de salida** en la línea virtual que aparece en Dispositivos de reproducción de Windows.
2. En la aplicación receptora, seleccione la línea correspondiente en la configuración del micrófono. Evite dejar la aplicación en **Predeterminado** si selecciona el micrófono físico. Mantenga la salida del altavoz de la aplicación receptora configurada en sus auriculares.
3. Para escuchar localmente, abra **Configuración → Sistema → Sonido → Más configuraciones de sonido → Grabación**. Abra las propiedades del punto final de grabación del cable, seleccione **Escuchar este dispositivo** y envíe la reproducción a los auriculares. Desactive la escucha si ya realiza el seguimiento a través de otra aplicación.
4. Prueba en la aplicación receptora con una grabación privada o su prueba de micrófono. Diga una oración normal, espere en silencio y luego diga una oración más alta. Verifique que la grabación tenga la voz convertida, pausas limpias y que no haya una segunda copia de su micrófono sin formato.

El desarrollador utiliza una ruta de audio de 48 kHz. Si su micrófono y controlador virtual exponen esa velocidad, configure los formatos de sus dispositivos en 48 kHz. Este formato de dispositivo es independiente de la tasa de entrenamiento del modelo.

## Sintonice un orden repetible

| Síntoma | Cambie para probar primero |
| --- | --- |
| Crujidos o sílabas faltantes | Aumente el **Tamaño del bloque** un paso y repita la misma oración. |
| Audio limpio con demasiado retraso | Reduzca el **Tamaño del bloque** en un paso. Restaure el último valor limpio si pierde audio. |
| Los susurros o el canto desaparecen | Deshabilite **RNNoise** y **VAD Noise Reduction** si están habilitados y verifique las puertas de voz descendentes. |
| El sonido local es claro pero el audio enviado es silencioso | Verifique que la aplicación receptora esté escuchando el punto final de grabación del cable. |
| La voz se repite o hace eco | Desactive el monitoreo duplicado y asegúrese de que la salida de la llamada se enrute directamente a los auriculares. |
| El audio se interrumpe solo mientras se juega | Pruebe con la carga de juego habitual. Dé margen de maniobra a la GPU del convertidor o aumente el tamaño del bloque. |

Esté atento a su valor preestablecido para la primera prueba. Cámbielo solo después de encontrar un tamaño de bloque estable. Afine el tono y el formante de forma independiente, haciendo pausas entre cambios para que los artefactos resultantes sean más fáciles de aislar. Al probar la reproducción de archivos en tiempo real, verifique la fuente activa en la interfaz de usuario antes de reanudar el uso del micrófono. Un archivo en reproducción puede reemplazar temporalmente el micrófono físico.

## Guía de cable virtual de Windows

### Elija VAC Lite o VB-CABLE

**VAC Lite es la primera opción recomendada para Vonovox.** Esta también es la preferencia en la configuración de Windows del proyecto Vonovox. Utilice [VAC Lite](https://software.muzychenko.net/freeware/vac470lite.zip) si está empezando desde cero. [VB-CABLE](https://vb-audio.com/Cable/) es una alternativa utilizable si ya está instalado o funciona mejor con su configuración de audio particular. Primero instale un controlador para que la lista de dispositivos sea fácil de seguir.

Después de instalar el controlador, vuelva a abrir el convertidor y la aplicación de llamada o grabación para que puedan ver los nuevos puntos finales de audio. Reinicie Windows si el instalador lo solicita. Los nombres de ejemplo siguientes pueden incluir el nombre del conductor o un sufijo de numeración.

| Controlador | Salida del convertidor (punto final de reproducción) | Discord, OBS, juegos u otras aplicaciones (dispositivo de grabación) |
| --- | --- | --- |
| VAC Lite | **Línea 1** en Reproducción | **Línea 1** en Grabación |
| VB-CABLE | **CABLE Input** | **CABLE Output** |

### Conecte los cuatro dispositivos correctamente

1. En el cambiador de voz, configure **entrada** a su micrófono físico. Hable para confirmar que el medidor de entrada se mueve.
2. En el cambiador de voz, configure **salida** en el punto final de reproducción del cable elegido. Mantenga el convertidor en funcionamiento.
3. En Discord, seleccione el punto final de grabación coincidente en **Voz y vídeo → Dispositivo de entrada**. En OBS, agregue una fuente de **Captura de entrada de audio** para ese punto final de grabación. Silencia cualquier fuente de micrófono duplicada durante la prueba.
4. Configure la reproducción de Discord o Windows en sus auriculares. Mantenga los sonidos del sistema y la voz de la otra persona fuera del cable. Grabe o utilice la prueba del micrófono de la aplicación de destino para confirmar lo que realmente le llega.

### Monitoree brevemente y verifique el formato de audio

Abra **Configuración → Sistema → Sonido → Más configuraciones de sonido → Grabación**. Elija el punto final de grabación del cable, abra **Propiedades → Escuchar**, habilite **Escuchar este dispositivo** y seleccione auriculares para su reproducción. Pruebe a bajo volumen. Si el convertidor u OBS ya proporciona monitoreo, use un monitor a la vez para evitar un eco. Puede desactivar la escucha de Windows después de la prueba y seguir enviando el cable al destino.

Para Vonovox, comience con el modo compartido WASAPI cuando esté disponible. Utilice 48 kHz en los extremos del micrófono y del cable si lo admiten. El formato del dispositivo Windows es independiente de la tasa de entrenamiento del modelo. Si el dispositivo solo puede usar un formato compatible diferente, pruebe la ruta real antes de cambiar otras configuraciones.

### Encuentre qué eslabón de la cadena falló

| Qué sucede | Primera verificación |
| --- | --- |
| Nada se mueve en Vonovox | Verifique el permiso del micrófono de Windows y la entrada física del micrófono. |
| Vonovox recibe su micrófono pero el cable no tiene señal | Verifique que la conversión se esté ejecutando y que la salida del convertidor sea el punto final de reproducción del cable. |
| El cable tiene señal pero Discord envía el micrófono sin formato | Seleccione el punto final de grabación del cable explícitamente en la aplicación de llamada. |
| Escuchas tu voz dos veces | Desactiva el monitoreo duplicado y verifica que el micrófono físico no se capture por separado. |
| Las voces de otras personas regresan como un eco | Dirija la salida de llamadas a los auriculares y elimine el audio del escritorio o de las llamadas del cable. |
| El audio suena bien hasta que la PC esté cargada | Restaure el búfer predeterminado o auméntelo y pruebe con el juego o la aplicación de transmisión en ejecución. |
| Las sílabas desaparecen cuando susurras o cantas | Prueba con la detección de actividad de voz y la supresión de ruido desactivadas una a la vez. |

Ajuste el **Tamaño del bloque** después de que funcione la ruta completa. Bájalo un paso y repite la misma frase. Si recibe clics o faltan palabras, restaure el último valor limpio. Deje los efectos de anticipación y otros efectos en sus valores predeterminados hasta que tenga una línea de base estable.

> **Opcional:** ¿Notas picos de GPU Delay en una tarjeta NVIDIA compatible? Consulta [Optimización avanzada de rendimiento: NVIDIA GPU Clock Locking](advanced-performance-optimization.md).
