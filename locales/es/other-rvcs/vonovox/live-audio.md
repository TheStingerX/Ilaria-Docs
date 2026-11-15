---
label: "🎙️ Enruta y sintoniza Vonovox"
order: 98
permalink: /ilaria-rvc/vonovox/live-audio/
---
# Enruta y sintoniza Vonovox

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
