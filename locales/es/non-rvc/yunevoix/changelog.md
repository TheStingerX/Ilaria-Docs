---
label: "Changelog"
icon: ":memo:"
order: 95
permalink: /non-rvc/yunevoix/changelog/
---
# Historial de cambios de YuneVoix

## v0.7.1 (2026-11-20)

*Cambios desde la v0.7.0.*

### Correcciones

- **AMD**: corregido el cierre de YuneVoix al pulsar **START** en ordenadores cuyo procesador también incluye gráficos AMD integrados. El paquete AMD ahora usa **DirectML** en la tarjeta dedicada por defecto. **MIGraphX** sigue pudiendo elegirse en `Settings → General → "AMD graphics engine"` (experimental, tras reiniciar). Las licencias, voces y ajustes de la `v0.7.0` siguen funcionando.

### Novedades

- **AMD**: el motor de contenido **`WavLM+`** y el método de modelo **`FlowEdit 3+1`** ahora funcionan también en tarjetas AMD (**DirectML**) - en **LIVE**, **covers** y **karaoke**. Si está seleccionado **AMD MIGraphX**, no están disponibles.

---

## v0.7.0 (2026-11-19)

*Cambios desde la v0.6.0.*

### Novedades

- **Método de modelo** (`Settings → Voice & Timbre`, y por separado en `Settings → Song Cover` para covers y karaoke; se aplica en el siguiente **START**):
  - **Classic**: igual que antes (opciones de pasos, solver y guidance).
  - **Learned 4 steps**: ajustado para sonar como 10 pasos usando alrededor del **40%** del tiempo de GPU y menos VRAM - ideal para juegos y tarjetas más lentas.
  - **FlowEdit 3+1 (NVIDIA)**: parte de tu propia voz en lugar de ruido y cambia solo la identidad vocal, dejando pasar mucho mejor respiraciones, susurros, risas y articulación (alrededor del **60%** del tiempo de GPU del modelo). En **LIVE** usa la muestra de tu voz (`Voice & Timbre → "Sample of your voice…"`; si la configuraste en una versión anterior, vuelve a elegirla una vez); en covers y karaoke usa la propia pista vocal. Funciona tanto con **Whisper** como con **WavLM+**. Sin muestra de voz o en AMD, FlowEdit vuelve a **Learned 4 steps** (se muestra en la línea de estado LIVE).
- **Karaoke (PREMIUM)**: canta tú una canción con las letras en pantalla - YUNE convierte tu canto en la voz elegida y lo mezcla con la música. Las letras se sincronizan automáticamente (texto pegado o `.lrc`; japonés también en romaji).
  - Canta sobre la pista instrumental (separada con **PREPARE**) o sobre la canción original (arranca en segundos; se separa en el primer render).
  - Desplazamiento suave con la línea actual centrada; `Espacio` = pausa, `Esc` = detener (termina 5 s después), `F11` = pantalla completa y medidor de micrófono en la ventana de letras.
  - `Settings → Karaoke`: auriculares, micrófono, volumen de voz original y música, tamaño de letra, limpieza de grabación (`DF3`), motor de contenido, octava, ajuste a la melodía original, nivel vocal, reverberación, coros, seguir el nivel de la voz original, hacer espacio para la voz y suavizar vocal fry.
  - **Ajuste de tonalidad**: cantar unos semitonos por encima o por debajo del original ya no desafina el cover; **"Pull to the original melody"** corrige las notas.
  - **"Follow the original vocal's level"**: da a tu voz convertida una dinámica similar a la original y pasa los picos por un limitador en lugar de bajar todo el cover.
  - **"Make room for the vocal"** (activado por defecto): atenúa la música principalmente en las bandas de `1–4 kHz` mientras cantas, dejando intactas las partes instrumentales.
  - **Octava de Karaoke `Auto`**: sigue el registro del cantante original manteniéndose dentro del rango de la voz objetivo.
- **"Smooth out vocal fry"** (`Settings → Voice & Timbre` y `Settings → Karaoke`): hablar o cantar muy grave o con voz rasposa ya no vuelve áspera la voz objetivo, conservando la respiración.
- **Monitoreo en LIVE** (`Settings → General`): niveles de entrada y salida en dB con indicador de limitador, **"Listen to input"** (lo que oye el motor tras la limpieza) y **"Listen to output"** (la voz convertida) en un dispositivo de monitoreo independiente.

### Mejoras

- **Juegos y LIVE**: mientras LIVE está activo, YuneVoix eleva su prioridad (proceso, GPU, hilos de audio) y desactiva la limitación en segundo plano de Windows (también en Windows 10) para que los juegos en pantalla completa afecten menos a la voz.
- **Retardo de entrada menor y más estable**: el micrófono se lee en cuanto Windows recibe audio nuevo (aprox. cada **10 ms** en lugar de 50 ms).
- **Tomas de Karaoke**: compensa la deriva de reloj entre micrófono y auriculares, guarda la toma en segundo plano y avisa si no se grabó voz o si el micrófono distorsionó.
- Los archivos de letras con codificaciones antiguas (como **Shift-JIS** japonés) se abren correctamente.
- La sincronización de letras se ejecuta en CPU en tarjetas no NVIDIA (paquete AMD).
- Empezar a cantar en Karaoke libera el motor LIVE de la GPU.
- **"Play sample"** en Voice Bank ahora suena por la salida predeterminada de Windows (tus auriculares), no por la salida LIVE.
- **Microphone level** en `Settings → General` se muestra en dB.
- Nuevos consejos integrados (*"Playing games with YUNE"*, *"Monitoring and audio devices"*, *"Karaoke"*, más consejos sobre método de modelo y vocal fry) y `FAQ.txt` ampliado en el paquete.

### Correcciones

- Desconectar o cambiar un dispositivo de audio durante LIVE o Karaoke ahora se detiene limpiamente explicando el motivo en lugar de quedar "en ejecución" sin sonido.
- Un dispositivo desconectado al iniciar ya no es reemplazado automáticamente por otro en tus ajustes.
- Mensajes claros para errores de audio comunes (modo exclusivo, bloqueo de privacidad de micrófono en Windows, formato no compatible, dispositivo desconectado, servicio de audio de Windows detenido).
- Lectura correcta de micrófonos con audio de 24 bits empaquetado en LIVE.
- Guardado seguro de ajustes (evita reinicios ante fallos o cortes de energía) con copia de seguridad.
- Solo puede ejecutarse una ventana de YuneVoix a la vez.
- Se conservan el registro anterior (`live-diag.prev.log`) y `crash.log` tras un fallo para soporte.
- Las grabaciones de diagnóstico se detienen automáticamente a los 10 minutos y están desactivadas en cada inicio.
- **Cancel** ahora detiene tareas que dejaron de responder.
- Mensaje claro si el paquete NVIDIA se abre sin GPU NVIDIA; el paquete AMD también funciona en otras tarjetas compatibles con DirectML.

### Compatibilidad

- Las licencias **PREMIUM** de la `v0.6.0` siguen funcionando: copia `license.yvl` junto al nuevo `YuneVoix.exe`, además de `models\yune\voices`, `yune.json` y `settings.json`. Las nuevas opciones empiezan con sus valores predeterminados (`Model method: Classic`).

---

## v0.6.0 (2026-11-05)

*Cambios desde la v0.4.0 (`v0.5.0` fue una compilación interna que nunca se publicó).*

### Novedades

- **Dos ediciones**: **BASIC** (conversión de voz en vivo, Voice Bank, todos los efectos) y **PREMIUM** (todo lo de BASIC + Song Cover).
- **Licencia PREMIUM por PC**: `Song Cover → "Copy request code"` → `"Load license…"` (sin caducidad, sin conexión, válida si cambia 1 pieza entre placa base, disco del sistema o instalación de Windows).
- **Motor de contenido `WavLM+`** (`Settings → Voice & Timbre → Content engine`; `Settings → Song Cover` para covers - **solo NVIDIA**): habla en vivo más clara, conserva risas, susurros y respiraciones propios y reduce el zumbido en risas y suspiros. `Whisper` sigue siendo el predeterminado para un timbre más exacto.
- **Interruptor "Silence stays silent"** (`Settings → EQ & Filters → YUNE output` y `Settings → Song Cover`; activado por defecto).
- **Enlace a Ko-fi** (`ko-fi.com/yunevoix`) e indicador de edición debajo del número de versión.

### Cambios y eliminaciones

- Descripciones y consejos más breves y precisos en los seis idiomas, coincidiendo con los nombres de los botones.
- `YuneVoix.exe --check` también informa la edición, el estado de la licencia PREMIUM y los archivos del modelo `WavLM+`.
- **Eliminado** el vocoder `BigVGAN` - **PC-NSF** es ahora el único vocoder (antes predeterminado, mejor para canto y respiración).
- Eliminadas las referencias obsoletas al filtro de artefactos de fotograma (eliminado en `v0.4.0`).
