---
label: "⚡ Conversión en tiempo real"
order: 92
permalink: /real-time/
description: "Para una grabación o una versión, la conversión de archivos permite renderizar y comparar varias tomas."
---
# Conversión de voz en tiempo real

Para una grabación o una versión, la conversión de archivos te permite renderizar y comparar varias tomas. En una configuración en directo, el conversor debe terminar cada bloque de audio con la rapidez suficiente para mantener fluido el flujo del micrófono. Configura primero una señal local fiable y después conéctala a una aplicación de llamadas, grabación o streaming.

## Elija una herramienta para el trabajo

Consulta el [directorio de herramientas RVC](../reference/tools.md) para descargas y notas de hardware, incluido Vonovox para GPUs NVIDIA.

| Herramienta | Por dónde empezar |
| --- | --- |
| Vonovox | Un conversor en tiempo real para modelos RVC V2 en Windows con una GPU NVIDIA. Descarga una compilación para tu GPU, carga el modelo y prueba el micrófono con auriculares antes de enrutar la señal convertida a otra aplicación. [Descargas de Vonovox](https://huggingface.co/dr87/vonovox/tree/main) · [Documentación del proyecto](https://github.com/dr87/Vonovox) |
| RVC WebUI (Mainline - Original RVC) | El proyecto original ofrece una WebUI de entrenamiento e inferencia junto con una GUI dedicada para tiempo real. Consulta sus instrucciones de lanzamiento y ejecución para la plataforma que uses. |
| Applio | Sus interfaces Desktop y Gradio tienen sus propios flujos en tiempo real. Sigue las instrucciones de configuración de la interfaz y versión que tengas instalada. |
| w-okada VCClient | Un cambiador de voz para uso en vivo. La disponibilidad de RVC depende de la edición del lanzamiento y la plataforma. Comprueba los modelos compatibles antes de instalar una compilación. [w-okada VCClient](https://github.com/w-okada/voice-changer) |
| Deiteris y Tg-Develop | Forks independientes de w-okada con sus propias compilaciones y ajustes. Revisa las notas de lanzamiento del fork antes de aplicar instrucciones de otra edición. [Repositorio Deiteris](https://github.com/deiteris/voice-changer) · [Repositorio Tg-Develop](https://github.com/tg-develop/voice-changer) |

## Escuche primero una señal limpia

1. Conecta un micrófono y auriculares. En el conversor, selecciona tu micrófono físico como entrada y tus auriculares como salida.
2. Carga un modelo de inferencia compatible conocido y su índice correspondiente si usas recuperación. Una breve [conversión de archivo](../start/getting-started.md) exitosa es una referencia útil antes de probar la ruta en vivo.
3. Inicia el flujo y habla a un volumen normal. Revisa el medidor de entrada o haz una grabación en seco. Reduce la ganancia de entrada si los picos saturan antes de convertir.
4. Verifica que la señal en los auriculares cambie al activar/desactivar la conversión. Si oyes la voz original al mismo tiempo, comprueba si hay monitorización directa por hardware o una segunda ruta en el sistema operativo.
5. Haz una prueba más larga que una sola palabra. Incluye habla suave, una frase fuerte y una breve pausa. Escucha si hay cortes, desfase o fallos bajo la misma carga de trabajo que usarás en directo.

Evita escuchar por altavoces cerca de un micrófono activo. Los auriculares te ayudan a detectar problemas de enrutamiento sin devolver la salida a la entrada.

## Roles de dispositivos y backends de audio

> **Enrutamiento de Audio Correcto (Correct Audio Routing)**
>
> **1. Dentro del Voice Changer**
> - **Dispositivo de Entrada:** Tu micrófono físico.
> - **Dispositivo de Salida:** `Line 1` (VAC, recomendado) o `CABLE Input` (VB-CABLE).
>
> **2. Dentro de Discord, Juegos, OBS u Otras Aplicaciones**
> - **Dispositivo de Entrada:** `Line 1` (VAC, recomendado) o `CABLE Output` (VB-CABLE).
> - **Dispositivo de Salida:** Tus auriculares (muy recomendados frente a altavoces).
>
> ```text
> Tu Micrófono → Voice Changer → Line 1 (VAC) o CABLE Input/Output (VB-CABLE) → Discord / Juego / OBS
> ```
>
> El audio procedente de Discord, tu juego u otras apps debe reproducirse directamente en tus **auriculares** (nunca de vuelta al cable virtual).
>
> - **VAC vs. VB-CABLE:** **VAC** (`Line 1`) siempre es recomendado. Si también (o solo) tienes instalado **VB-CABLE**, recuerda que el voice changer envía a **`CABLE Input`** mientras Discord / los juegos escuchan en **`CABLE Output`**.
> - **Altavoces y fuga de auriculares:** Evita usar altavoces; el sonido de los altavoces puede filtrarse en el micrófono y provocar audio doble, eco o que también se convierta la voz de otra persona. También puede ocurrir con auriculares si el volumen es demasiado alto o las copas no son lo bastante cerradas y aisladas.
> - **Monitorización:** Escuchar tu propia voz convertida en los auriculares es una función opcional aparte que solo debes activar cuando haga falta. Evita rutas de audio duplicadas, eco y bucle (loopback).

Antes de conectar ninguna aplicación, conoce qué hace cada extremo:

| Término | Qué es |
| --- | --- |
| **Input Device** | Tu micrófono físico (o canal de interfaz de audio) que envía la voz sin procesar al cambiador de voz. |
| **Output Device** | Adónde va la voz convertida (tu **extremo de reproducción del cable virtual** para Discord/OBS/juegos, o auriculares para una prueba local). |
| **Monitor Device** | Segunda salida opcional para escuchar tu propia voz convertida en auriculares mientras **Output Device** alimenta un cable virtual. |
| **Virtual Cable Input** *(lado Reproducción)* | Aparece en Reproducción de Windows (p. ej., `Line 1` en VAC Lite o `CABLE Input` en VB-CABLE). Ponlo como **Output Device** del voice changer. |
| **Virtual Cable Output** *(lado Grabación)* | Aparece en Grabación de Windows (p. ej., `Line 1` en VAC Lite o `CABLE Output` en VB-CABLE). Selecciónalo como **Micrófono** en Discord, OBS o juegos. |

### Micrófonos USB, interfaces de audio y backends

- **Micrófonos USB:** Conéctalos directamente a un puerto USB trasero de la placa base (evita hubs sin alimentación), configura el formato de Windows en **48000 Hz** y desactiva la suspensión selectiva USB si el micrófono se desconecta.
- **Interfaces de audio (XLR):** Usa **ASIO** cuando sea compatible con tu cambiador de voz (como RVC Blue o w-okada) para menor latencia de búfer de controlador, o **WASAPI** al enrutar hacia cables virtuales estándar de Windows.
- **WASAPI Shared vs. WASAPI Exclusive:** **WASAPI Shared** es el punto de partida más seguro porque Windows y los cables virtuales pueden compartir flujos a `48000 Hz` sin problemas. **WASAPI Exclusive** omite el mezclador de Windows para reducir la latencia del controlador cuando es compatible, pero bloquea el dispositivo para que otras apps no puedan compartirlo.

## Configuración específica por app (Discord, OBS, juegos, llamadas, grabación)

- **Discord / apps de llamadas:** Configura **Input Device** en el extremo de grabación de tu cable virtual (`Line 1` / `CABLE Output`), configura **Output Device** en tus auriculares y desactiva (**OFF**) Krisp, cancelación de eco y sensibilidad automática de entrada si Discord corta respiraciones o finales de palabra.
- **OBS Studio y grabación local:** Añade una fuente **Captura de entrada de audio** apuntando al extremo de grabación del cable virtual, silencia cualquier fuente separada del micrófono sin procesar y graba un breve clip de prueba para comprobar sincronía y niveles.
- **Juegos:** Selecciona el extremo de grabación del cable virtual como micrófono dentro del juego (o fíjalo como dispositivo predeterminado de comunicación en Windows). Limita siempre los FPS del juego o deja margen de GPU para que el juego no ahogue al cambiador de voz.

## Enviar audio convertido a otra aplicación

Un dispositivo de audio virtual ofrece un extremo de reproducción para el conversor y un extremo de grabación correspondiente para la aplicación receptora. Los nombres de los extremos dependen del controlador. Por ejemplo, un cable virtual puede llamar "Input" a su extremo de reproducción y "Output" a su extremo de grabación porque las instrucciones usan la perspectiva del cable.

```text
Micrófono físico → Conversor RVC → extremo de reproducción virtual
                                               ↓
                                extremo de grabación correspondiente → llamada o stream
```

Selecciona el extremo de grabación correspondiente como micrófono en la aplicación receptora y haz una breve grabación de prueba allí. Si tu monitor local suena bien pero la grabación no, verifica la entrada de destino y elimina cualquier fuente de micrófono duplicada. Si monitorizas el audio convertido, usa una salida de auriculares separada. Evita enrutar toda la mezcla del escritorio o el audio de la app receptora de vuelta al conversor.

## Ajuste la latencia sin perder estabilidad

**Latencia de procesamiento vs. latencia total de extremo a extremo:** El **GPU Delay** / tiempo de inferencia mostrado dentro de tu voice changer es **solo** lo que tarda la GPU en convertir un bloque. La **latencia total de extremo a extremo** suma búfer de entrada del micro, **Block Size / Chunk Size**, sobrecarga de crossfade/contexto, búfer del cable virtual y búferes de audio de Discord/OBS/juego. No confundas un GPU Delay bajo (p. ej. `15 ms`) con la latencia total de ida y vuelta.

| Control | Ajuste práctico |
| --- | --- |
| Tamaño de bloque o chunk | Auméntalo si la voz se entrecorta bajo carga. Cuando sea estable, prueba un valor menor y quédatelo solo si el habla normal sigue limpia. Bloques más pequeños dejan menos tiempo para procesar. |
| Crossfade | Auméntalo con cuidado si oyes uniones ásperas entre bloques. Cambia cómo se solapan bloques vecinos. |
| Contexto extra | Prueba menos contexto si el conversor se retrasa. Puede ayudar al modelo a seguir transiciones, a costa de más procesamiento. |
| Predictor de tono | Si un ajuste produce tiempos inestables, compara los predictores disponibles con las mismas frases. Elige el que maneje tu rango de tono con margen suficiente. |
| Detección de silencio o umbral de entrada | Baja un umbral que corte sílabas suaves. Evalúalo en pausas y habla baja, no solo con entrada fuerte sostenida. |
| Frecuencia del dispositivo | Comprueba las frecuencias de muestreo del dispositivo y del cable virtual si oyes velocidad extraña o chasquidos. Empieza con ajustes compatibles en toda la cadena. |

Empieza con los valores predeterminados de la app y cambia un ajuste cada vez. Si un juego u otro programa pesado en GPU comparte la máquina, repite la prueba mientras está abierto. Guarda un preajuste funcional para poder restaurarlo antes de emitir en directo. [GUI en tiempo real RVC WebUI (Mainline - Original RVC)](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/main/realtime_gui.py)

## Solucionar problemas según dónde aparece la falla

| Síntoma | Qué comprobar primero |
| --- | --- |
| Ni el medidor del conversor ni una grabación seca del micrófono responden | Comprueba permisos de micrófono en Windows, interruptor físico de silencio y selección de Input Device. |
| El micrófono seco funciona, pero la salida convertida está muda | Confirma que el flujo arrancó, el modelo cargó y Output Device está bien elegido. Baja el umbral VAD/silencio. |
| El monitor local funciona, pero la llamada recibe la voz original | Selecciona el extremo de grabación virtual (`CABLE Output` / `Line 1`) como micrófono de la llamada y desactiva cualquier fuente de micro crudo aparte. |
| Doble monitorización / eco / bucle de retroalimentación | No uses nunca altavoces cerca de un micrófono activo. Desactiva **"Escuchar este dispositivo"** en Windows si la app ya monitoriza, y nunca enrutes audio del escritorio/llamada al cable virtual. |
| Chasquidos, tirones o desbordamiento de búfer | Alinea **todos** los extremos (Mic, Auriculares, Cable Input/Output) a **48000 Hz** (`mmsys.cpl`), sube **Block/Chunk Size** un paso y comprueba sobrecarga de CPU. |
| Voz robótica o sílabas cortadas | El extractor de tono es demasiado pesado (`crepe` full) -> cambia a **RMVPE** o **FCPE**, o baja **Index Ratio**. |
| **GPU Delay** alto o chasquidos solo al jugar | **Saturación de GPU**: limita FPS en el juego, baja ajustes pesados de GPU o sube **Block Size**. |
| Un modelo funciona en archivos pero falla en vivo | Comprueba la edición del cliente en vivo, arquitectura y soporte de embedder. Prueba un modelo listado como compatible en ese cliente antes de cambiar dispositivos de audio. |

[Fundamentos de RVC](../start/rvc-fundamentals.md) · [Solución de problemas](../reference/troubleshooting.md)

## RVC Blue

Conversión de voz de escritorio en Windows. [Instalación y configuración](../other-rvcs/voice-changers/rvc-blue/installation.md).
