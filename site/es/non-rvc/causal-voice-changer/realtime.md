# Usar CausalVC Realtime

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

Cuando hayas ejecutado `run-training` al menos una vez y tengas una voz `.cvc` lista, inicia el cambiador de voz en vivo con:
- **Windows**: `run-realtime.bat`
- **Linux**: `run-realtime.sh` *(también puedes añadirlo al lanzador de apps con `realtime/scripts/install-desktop-entry.sh`)*

> **Usa siempre auriculares** al usar un cambiador de voz en vivo. Con altavoces, la voz convertida vuelve al micrófono y provoca eco y acoples.

## 1. Configura el audio (página `Audio`)

1. **Input → Source**:
   - Elige **Microphone / audio device** para hablar en directo.
   - *(O elige **Audio file** para probar una voz reproduciendo un archivo grabado a través del modelo.)*
2. **Input device**: selecciona tu micrófono físico.
3. **Output device**: selecciona adónde va la voz convertida.
   - Para usar CVC en **Discord, OBS, VRChat o juegos**, instala un cable de audio virtual (como **VB-CABLE** en Windows), elige **`CABLE Input`** aquí y selecciona **`CABLE Output`** como micrófono en Discord/OBS.
4. **Monitor device** *(opcional)*: selecciona tus **auriculares** si quieres oír tu propia voz convertida. Déjalo en **Disabled** si no quieres escucharte.
5. *(Consejo Linux)*: los dispositivos `[JACK]` ofrecen la latencia más baja. Puedes ajustar el periodo de PipeWire con `PIPEWIRE_QUANTUM`, ej. `128/48000`.

## 2. Elige y ajusta tu voz (página `Model`)

1. Elige **Model** (y **Checkpoint** si la voz tiene varios pasos guardados).
2. **Pitch (semitones)**: sube o baja tu tono para encajar con la voz objetivo (`+12` = una octava arriba, `-12` = una octava abajo).
   - **Pitch match**: ¡no adivines! Suelta clips de la voz del modelo en Pitch match para medir sus Hz medianos, luego habla mientras conviertes para que CVC mida tu voz y sugiera el ajuste exacto (**Apply**).
3. **Advanced pitch** *(contraído por defecto - la mayoría de voces no lo necesitan)*:
   - **Pitch offset (Hz)**: suma un desplazamiento fijo en Hz tras el cambio en semitonos. Valores positivos suben más las notas graves que las agudas (estrechan el rango); los negativos lo amplían.
   - **Pitch ceiling (Hz)** y **Above the ceiling (%)**: frena los picos agudos por encima del techo manteniendo afinadas las notas por debajo (ideal para cantar; `0%` se detiene en el techo).
4. **Formant**: cambia la resonancia vocal (qué tan "grande" o "pequeño" suena el hablante) sin cambiar el tono (`0` = formante natural del modelo).
5. **Index (%)** *(desactivado por defecto)*: mezcla cada 20 ms de habla hacia los momentos más parecidos del audio de entrenamiento. Más alto suena más parecido, pero demasiado alto emborrona palabras.
   - **Consonant protection** *(solo actúa con Index > 0)*: mantiene respiraciones y consonantes (`s`, `t`, `k`) más cercanas a las tuyas para que no se pierda claridad.

## 3. Ajusta niveles y volumen (`Levels`)

- **Input gain**: sube o baja tu micrófono antes de la conversión.
- **Output gain**: controla el volumen enviado a Discord/OBS/juegos.
- **Monitor gain**: controla solo lo que oyes en tus auriculares.
- **Noise gate**: silencia el micrófono cuando estás por debajo del umbral (`-60 dB` = desactivado).
- **Output level (LUFS)**: habla mientras conviertes para ver tu sonoridad y pulsa **Apply** para ajustar Output gain hacia **Voice chat (`-21 LUFS`)** o **Streaming (`-16 LUFS`)**.

## 4. Inicia la conversión (barra inferior)

- Haz clic en **Start** para empezar a convertir en directo, o en **Passthrough** para pasar tu micro sin procesar y comprobar niveles.
- Vigila los medidores **In / Out / Mon** y los dos tiempos:
  - **Latency**: retardo total del micro a la salida.
  - **Inference**: tiempo que tarda tu GPU en convertir un bloque. **Inference debe quedar muy por debajo del tamaño de Chunk** (ej. `< 10 ms` para un chunk de `20 ms`), o el audio se entrecortará.
