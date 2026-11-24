# Enrutar y ajustar Deiteris w-okada Fork

Usa siempre **auriculares** durante la conversión en vivo. Con altavoces, la voz convertida vuelve al micrófono y provoca eco y acoples.

## 1. Configura los dispositivos de audio

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

1. Pon **Audio Input** en tu micrófono físico.
2. Pon **Audio Output** en tus auriculares para una primera prueba local, o en **`CABLE Input`** (el punto de reproducción del cable virtual) al enrutar hacia otras aplicaciones.
3. En **Discord, OBS, VRChat o tu juego**, selecciona **`CABLE Output`** como micrófono.
   - En Discord desactiva la **Supresión de ruido (Krisp)** y la **sensibilidad de entrada automática** para no cortar respiraciones ni finales suaves.

## 2. Carga un modelo y ajusta parámetros

1. Sube o selecciona un modelo **RVC `.pth`** de inferencia y su archivo **`.index`** opcional.
2. **Chunk / Block size**: empieza alrededor de `0.3s` - `0.5s` (o `192` / `256`+ muestras/frames según el deslizador) para equilibrar retardo y fluidez. Bajar demasiado el Chunk provoca cortes o voz robótica.
3. **Extra Data / Context**: mantenlo moderado (`0.5s` - `1.0s`) para un tono estable sin saturar la GPU.
4. **Detector F0 / Pitch**: usa **RMVPE** (más preciso) o **FCPE** (más ligero/rápido en vivo); evita Crepe Full en tiempo real si la inferencia supera la duración del chunk.
5. **Tune (Pitch)**: `+12` para hombre -> mujer, `-12` para mujer -> hombre, `0` para el mismo rango.
6. **Index ratio**: empieza en `0.0` para probar la conversión limpia y sube poco a poco (`0.3` - `0.6`) si hace falta.

## 3. Soluciones frecuentes

- **Latencia alta o cortes robóticos**: cierra juegos o pestañas pesadas en GPU, sube Chunk un paso y, si persiste, prueba desactivar **Hardware-accelerated GPU Scheduling (HAGS)** (reinicia, compara antes/después y reactívalo si no mejora).
- **Error de PortAudio / dispositivo**: iguala todos los dispositivos de audio al mismo sample rate (`48000 Hz`) en Sonido de Windows y cierra apps que usen modo exclusivo.
