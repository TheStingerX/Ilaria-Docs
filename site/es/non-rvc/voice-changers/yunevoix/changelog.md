# Registro de Cambios de YuneVoix

## v0.7.1 (2026-11-20)

*Cambios desde la v0.7.0.*

### Corregido

- **AMD**: corregido un problema por el que YuneVoix se cerraba al pulsar **START** en equipos cuyo procesador también tiene gráfica integrada AMD, y con la gráfica integrada desactivada se detenía con `ShapeInferenceNotRegistered`. El paquete AMD ahora usa **DirectML** en la tarjeta dedicada por defecto (sin descarga de Windows Update, sin compilación inicial de modelos). **MIGraphX** sigue pudiendo elegirse en `Settings → General → "AMD graphics engine"` (experimental, se aplica tras reiniciar). Las licencias, voces y ajustes de la `v0.7.0` siguen funcionando.

### Nuevo

- **AMD**: Windows 10 y las versiones de Windows 11 anteriores a la 24H2 vuelven a ser compatibles (`24H2` solo es necesario para el motor experimental **MIGraphX**).
- **AMD**: el motor de contenido **`WavLM+`** y el método de modelo **`FlowEdit 3+1`** ahora también funcionan en tarjetas AMD (**DirectML**) - en **LIVE**, **covers** y **karaoke**. Cuando está seleccionado **AMD MIGraphX**, no están disponibles (con MIGraphX todos los métodos del modelo se ejecutan como Classic, 10 × Euler).

---

## v0.7.0 (2026-11-19)

*Cambios desde la v0.6.0.*

### Nuevo

- **Model method** (`Settings → Voice & Timbre`, y por separado en `Settings → Song Cover` para covers y karaoke; se aplica al siguiente **START**):
  - **Classic**: igual que antes (opciones de pasos, solver y guidance).
  - **Learned 4 steps**: ajustado para sonar como 10 pasos usando alrededor del **40%** del tiempo de GPU y menos VRAM, ideal para jugar y tarjetas más lentas.
  - **FlowEdit 3+1 (NVIDIA)** *(AMD: desde v0.7.1)*: parte de tu propia voz en lugar de ruido y cambia solo la identidad vocal, de modo que respiraciones, susurros, risas y articulación se conservan mucho mejor (alrededor del **60%** del tiempo de GPU del modelo). En **LIVE**, usa tu muestra de voz (`Voice & Timbre → "Sample of your voice…"`; si la configuraste en una versión anterior, vuelve a seleccionarla una vez). En covers y karaoke, usa la propia voz de la canción. Funciona tanto con **Whisper** como con **WavLM+**. Sin una muestra de voz, FlowEdit vuelve a **Learned 4 steps** (se muestra en la línea de estado LIVE); en AMD MIGraphX todos los métodos del modelo se ejecutan como **Classic**.
- **Karaoke (PREMIUM)**: canta una canción tú mismo con letras en pantalla; YUNE convierte tu canto en la voz elegida y lo mezcla con la música. Las letras se sincronizan automáticamente (texto pegado o `.lrc`; japonés también en romaji).
  - Canta sobre la pista instrumental (separada en **PREPARE**) o sobre la canción original (empieza en segundos; se separa en el primer render).
  - Desplazamiento fluido con la línea actual centrada; `Space` = pausar, `Esc` = detener (termina 5 s después), `F11` = pantalla completa, además de un medidor de micrófono en la ventana de letras.
  - `Settings → Karaoke`: auriculares, micrófono, volumen de voz original y música, tamaño de letra, limpieza de grabación (`DF3`), motor de contenido, octava, acercar a la melodía original, nivel de voz, reverberación, coros, seguir el nivel de la voz original, hacer espacio para la voz y suavizar vocal fry.
  - **Coincidencia de tonalidad**: cantar unos semitonos más alto o bajo ya no desafina la cover; **"Pull to the original melody"** corrige las notas.
  - **"Follow the original vocal's level"**: sigue la dinámica de la voz original y envía los picos a través de un limitador en lugar de bajar toda la cover.
  - **"Make room for the vocal"** (activado por defecto): atenúa la música sobre todo en las bandas de `1-4 kHz` mientras cantas, dejando intactas las partes instrumentales.
  - **Karaoke octave `Auto`**: sigue el registro del cantante original manteniéndose dentro del rango de la voz de destino.
- **"Smooth out vocal fry"** (`Settings → Voice & Timbre`, y `Settings → Karaoke`): mantiene sonora la voz hablada o cantada muy grave o rasposa y suaviza los saltos de tono sin perder aire.
- **Monitorización en LIVE** (`Settings → General`): niveles de entrada y salida en dB con indicador de limitador, **"Listen to input"** (lo que oye el motor tras la limpieza) y **"Listen to output"** (voz convertida) en un dispositivo de monitorización separado.

### Mejorado

- **Juegos y LIVE**: mientras se ejecuta LIVE, YuneVoix eleva su propia prioridad (proceso, GPU, hilos de audio) y desactiva la reducción de rendimiento en segundo plano de Windows (también en Windows 10) para que los juegos a pantalla completa interfieran menos con la voz.
- **Retardo de entrada más bajo y estable**: el micrófono se lee en cuanto Windows tiene nuevo audio (aproximadamente cada **10 ms** en lugar de 50 ms).
- **Tomas de Karaoke**: compensa la deriva de reloj entre micrófono y auriculares, guarda tomas en segundo plano y avisa si no se grabó voz o si el micrófono distorsionó.
- Los archivos de letras con codificaciones heredadas (como **Shift-JIS** japonés) se abren correctamente.
- La sincronización de letras se ejecuta en CPU en tarjetas no NVIDIA (paquete AMD).
- Empezar a cantar en Karaoke libera el motor LIVE de la GPU.
- **"Play sample"** en Voice Bank ahora reproduce por la salida predeterminada de Windows (tus auriculares), no por la salida LIVE.
- **Microphone level** en `Settings → General` se muestra en dB.
- Nuevos consejos integrados (*"Playing games with YUNE"*, *"Monitoring and audio devices"*, *"Karaoke"*, además de consejos sobre método de modelo y vocal fry) y un `FAQ.txt` ampliado incluido en el paquete.

### Corregido

- Desconectar o cambiar un dispositivo de audio durante LIVE o Karaoke ahora se detiene limpiamente y explica el motivo en lugar de quedarse silenciosamente "ejecutándose".
- Un dispositivo desconectado al inicio ya no se sustituye silenciosamente por otro en tus ajustes.
- Mensajes claros y legibles para errores de audio comunes (modo exclusivo, bloqueo de privacidad del micrófono de Windows, formato no compatible, dispositivo desconectado, servicio de Audio de Windows detenido).
- Los micrófonos de 24 bits empaquetados se leen correctamente en LIVE.
- Guardado seguro de ajustes (evita reinicios ante fallos o cortes de luz) con copia de respaldo.
- Control de instancia única (solo una ventana de YuneVoix a la vez).
- Conserva el registro anterior (`live-diag.prev.log`) y `crash.log` tras un fallo para soporte.
- Las grabaciones de diagnóstico se detienen automáticamente tras 10 minutos y vuelven a desactivarse en cada inicio.
- **Cancel** ahora finaliza trabajos que no responden.
- Mensaje de error claro si se inicia el paquete NVIDIA sin una GPU NVIDIA; el paquete AMD también funciona en otras tarjetas compatibles con DirectML.

### Compatibilidad

- Las licencias **PREMIUM** de la `v0.6.0` siguen funcionando: copia `license.yvl` junto al nuevo `YuneVoix.exe`, junto con `models\yune\voices`, `yune.json` y `settings.json`. Las nuevas opciones comienzan en sus valores predeterminados (`Model method: Classic`).

---

## v0.6.0 (2026-11-05)

*Cambios desde la v0.4.0 (`v0.5.0` fue una compilación interna que nunca se publicó).*

### Nuevo

- **Dos ediciones**: **BASIC** (conversión de voz en directo, Voice Bank, todos los efectos) y **PREMIUM** (todo lo de BASIC + Song Cover).
- **Licencia PREMIUM por PC**: `Song Cover → "Copy request code"` → `"Load license…"` (sin caducidad, sin conexión, válida si cambia 1 entre placa base / disco del sistema / instalación de Windows).
- **Motor de contenido `WavLM+`** (`Settings → Voice & Timbre → Content engine`; `Settings → Song Cover` para covers - **solo NVIDIA**; *AMD: desde v0.7.1*): habla en directo más clara, conserva tus propias risas, susurros y respiraciones y reduce el zumbido en risas/suspiros. `Whisper` sigue siendo el predeterminado para mayor fidelidad tímbrica.
- **Opción "Silence stays silent"** (`Settings → EQ & Filters → YUNE output` y `Settings → Song Cover`; activada por defecto).
- **Enlace de Ko-fi** (`ko-fi.com/yunevoix`) e insignia de edición mostrados bajo el número de versión.

### Cambiado y Eliminado

- Descripciones y consejos más breves y precisos en los seis idiomas, coincidiendo con los nombres de los botones.
- `YuneVoix.exe --check` también informa sobre la edición, el estado de la licencia PREMIUM y los archivos del modelo `WavLM+`.
- **Eliminado** el vocoder `BigVGAN`: **PC-NSF** es ahora el único vocoder (antes predeterminado, mejor para canto y respiración).
- Eliminadas las referencias obsoletas al filtro de artefactos de fotograma (eliminado en la `v0.4.0`).
