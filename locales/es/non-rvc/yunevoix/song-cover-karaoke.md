---
label: "Song Cover y Karaoke"
icon: ":musical_note:"
order: 95
permalink: /non-rvc/yunevoix/song-cover-karaoke/
description: "Tutorial completo para principiantes de las funciones sin conexión Song Cover y Karaoke de YuneVoix PREMIUM, incluidas las diferencias de FlowEdit, controles, atajos de teclado y solución de problemas."
---
# YuneVoix Song Cover y Karaoke - Guía Completa para Principiantes

[Resumen y Requisitos](overview.md) · [Ajustes y Calidad de Audio](settings.md) · [Premium, Licencia y Ayuda](premium-and-troubleshooting.md)

**Song Cover** y **Karaoke** son funciones musicales sin conexión desbloqueadas en **YuneVoix PREMIUM** (`license.yvl`). A diferencia del modo **LIVE**, Song Cover y Karaoke tienen sus propias pestañas de ajustes dedicadas para que los cambios en LIVE no alteren accidentalmente tus renders de cover.

---

## 1. Song Cover (Paso a Paso)

Song Cover separa una canción en voz e instrumental, convierte la voz a tu voz elegida del Voice Bank y mezcla la pista terminada (tardando aproximadamente **1.3×** la duración de la canción en GPU; por ejemplo, una canción de 5 minutos tarda unos 6-7 minutos según las notas del desarrollador).

1. Abre la pestaña **Song Cover** (requiere una `license.yvl` activa).
2. **Elige tu canción:** Carga un archivo de audio (WAV, MP3, FLAC, M4A, AAC, OGG, WMA o AIFF, de hasta **15 minutos**).
3. **Selecciona la voz de destino:** Elige una voz `.yvoice` de tu Voice Bank.
4. **Configura la separación vocal:**
   - **Vocal separator:** **`YUNE`** (predeterminado, recomendado, ~2× más rápido).
   - **Vocals to convert:** **`Lead vocal only`** (predeterminado, resultado más limpio).
5. **Abre `Settings → Song Cover`** *(o haz clic en **Copy settings from LIVE** dos veces para copiar modelo, timbre, filtros y efectos desde LIVE)*.
6. **Ajusta Octave:** Déjalo en **`Auto`** (predeterminado); si la salida suena demasiado aguda o grave, pon `−12`, `0` o `+12`.
7. **Elige Content engine:** **`Whisper`** (predeterminado, timbre más cercano) o **`WavLM+`** (menos zumbido en notas aireadas, palabras ligeramente menos exactas; compatible en NVIDIA y AMD DirectML).
8. **Elige Model y Model method:**
   - **Model:** **`base`** (predeterminado, recomendado) o **`fine-tuned`**.
   - **Model method:** **`Classic`** (`10 × Euler` recomendado para covers), **`Learned 4 steps`** o **`FlowEdit 3+1`**.
   - **Prompt length** (`20 s`), **Timbre change** (`50%`), **Roughness** (`off`), **CFG** (`0.7`) y **Fix pitch detector errors** (`on`) coinciden con sus equivalentes de LIVE.
9. **Configura nivel, reverberación y formato de exportación:**
   - **Vocal level:** `+2 dB` (predeterminado).
   - **Vocal reverb:** nivel propio `−17 dB` (predeterminado), igual al original o ninguno.
   - **Keep the separated tracks:** `Off` (predeterminado); actívalo en **On** para omitir la separación si vuelves a renderizar la misma canción.
   - **File format:** **`WAV 24-bit`** (predeterminado) o **`MP3 320 kbps`** (requiere el codificador MP3 de Windows).
10. **Genera y exporta** la cover.

### FlowEdit 3+1 en Song Cover

A diferencia del modo LIVE, **FlowEdit 3+1 en Song Cover utiliza la propia voz original separada de la canción como origen**, no tu muestra `my_voice.yvoice`. Esto significa que FlowEdit en Song Cover busca conservar las respiraciones y la articulación del cantante original sin necesitar una grabación de tu propia voz.

---

## 2. Karaoke (Paso a Paso: PREPARE → SING → RENDER COVER)

Karaoke te permite cantar una canción tú mismo con letras sincronizadas en pantalla, y luego convierte tu voz grabada en la voz de destino y la mezcla en la pista.

### Paso 1: PREPARE

1. Abre la pestaña **Karaoke** y carga tu **canción** y **letra** (texto sin formato pegado o archivo `.lrc`; el japonés también funciona en romaji y se admiten codificaciones heredadas como Shift-JIS).
2. En **`Settings → Karaoke`**, elige **Sing along to**:
   - **`Backing track`** (predeterminado): separa la canción durante **PREPARE** (2-3 minutos la primera vez) y ofrece la alineación de letra más precisa.
   - **`Original song`**: empieza en segundos y ejecuta la separación en el primer render.
3. Haz clic en **PREPARE**. Si la letra se desfasa ligeramente, tu corrección de sincronización se recuerda.

### Paso 2: SING

1. Comprueba **Headphones** (salida predeterminada de Windows) y **Microphone** (igual que LIVE) en `Settings → Karaoke`.
2. Haz clic en **SING** para abrir la ventana de letras (iniciar Karaoke libera el motor LIVE de la GPU).
3. **Controles de la ventana de letras:**
   - **`Space`:** Pausar / reanudar.
   - **`Esc`:** Dejar de cantar (la cover termina 5 segundos después de detener).
   - **`F11`:** Alternar pantalla completa.
4. Vigila el medidor de micrófono integrado y canta toda la canción (YuneVoix compensa la deriva de reloj y avisa si no se grabó voz o si el micrófono saturó).

### Paso 3: RENDER COVER

1. Ajusta las opciones de mezcla en **`Settings → Karaoke`** si hace falta.
2. Haz clic en **RENDER COVER**. Modelo, método de modelo, timbre, filtros, efectos y formato de exportación vienen de **`Settings → Song Cover`**.

### Ajustes de Karaoke: Monitorización vs. Render Final

| Ajuste (`Settings → Karaoke`) | Predeterminado | Afecta a lo que oyes al cantar | Afecta a la cover renderizada final |
| --- | --- | --- | --- |
| **Original vocal in headphones** | `20%` | Sí | No |
| **Backing vocals** | `On` | Sí | No (la cover mantiene las segundas voces como en Song Cover) |
| **Music volume** | `0 dB` | Sí | No |
| **Lyrics size** | `Normal` | Sí (visualización) | No |
| **Clean the recording** (`Off` / `DF3`) | `Off` | No | Sí |
| **Content engine** (`Whisper` / `WavLM+`) | `Whisper` | No | Sí |
| **Octave** | `Auto` (registro del cantante dentro del rango destino) | No | Sí |
| **Pull to the original melody** | `Off` (`50-70%` natural) | No | Sí |
| **Follow the original vocal's level** | `70%` (dinámica + limitador) | No | Sí |
| **Make room for the vocal** | `Up to 60%` (atenúa `1-4 kHz` al cantar) | No | Sí |
| **Smooth out vocal fry** | `Off` | No | Sí |

---

## 3. Solución de Problemas de Song Cover y Karaoke

| Síntoma | Qué comprobar y probar |
| --- | --- |
| **Letra desincronizada** | Usa **`Sing along to → Backing track`** en **PREPARE**, carga un archivo `.lrc` sincronizado si está disponible, o aplica una corrección de sincronización en Karaoke (se guarda por canción). |
| **Micrófono no detectado / no se graba nada** | Verifica **Microphone** en `Settings → Karaoke`, los permisos de privacidad del micrófono en Windows y observa el medidor en la ventana de letras. |
| **Voz grabada demasiado baja** | Sube la ganancia del micrófono en Windows hacia `−6 dBFS`, activa **Follow the original vocal's level** (`70%` por defecto) y mantén activo **Make room for the vocal**. |
| **Tono incorrecto / desafinado** | Revisa **Octave** (`Auto`, `−12`, `0` o `+12`) y prueba **Pull to the original melody** (`50-70%`) en `Settings → Karaoke`. |
| **Tirones durante el Karaoke** | Cierra otras apps que usen mucha GPU, usa **`Backing track`** (ya separada en PREPARE) o revisa los ajustes del búfer de audio. |
| **Música muy alta / voz tapada** | Sube **Vocal level** (`+2 dB` por defecto; `Settings → Song Cover` para covers, `Settings → Karaoke` para karaoke), mantén activo **Make room for the vocal** o baja **Music volume** mientras cantas. |
| **Respiraciones o susurros perdidos en la cover** | Compara **`WavLM+`** frente a **`Whisper`**, o cambia **Model method** a **`FlowEdit 3+1`** en `Settings → Song Cover`. |
| **Demasiada reverberación en la voz de la cover** | Baja **Reverb on the vocal** (`−17 dB` por defecto) o ponlo en ninguno - en `Settings → Song Cover` para covers, en `Settings → Karaoke` para karaoke. |
| **Artefactos de separación vocal / duetos** | Mantén **Vocal separator** en **`YUNE`** y **Vocals to convert** en **`Lead vocal only`** (los duetos con dos cantantes principales no pueden aislar automáticamente a un solo cantante). |

Siguiente paso: [Premium, Licencia y Ayuda](premium-and-troubleshooting.md).
