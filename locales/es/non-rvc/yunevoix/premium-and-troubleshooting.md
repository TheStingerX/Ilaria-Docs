---
label: "Premium, Licencia y Ayuda"
icon: ":wrench:"
order: 94
permalink: /non-rvc/yunevoix/premium-and-troubleshooting/
description: "Licencia de YuneVoix PREMIUM (Song Cover y Karaoke), activación sin conexión, reglas de hardware, solución de problemas ampliada para NVIDIA y AMD y diagnósticos."
---
# Premium, Licencia y Solución de Problemas

## YuneVoix PREMIUM: Song Cover y Karaoke

Quienes apoyan el proyecto en [Ko-fi](https://ko-fi.com/yunevoix) obtienen acceso a **YuneVoix PREMIUM**, que desbloquea funciones musicales sin conexión además de todo lo incluido en BASIC:

- **Song Cover:** Elige cualquier canción y voz de destino. YuneVoix separa la voz de la instrumental, convierte la voz principal (y opcionalmente los coros) y lo mezcla todo de nuevo.
- **Karaoke:** Canta siguiendo las letras en pantalla; tu interpretación se convierte a la voz elegida y se mezcla con la música, ajustada al tono y nivel del original.

Para tutoriales completos paso a paso y cada ajuste de Song Cover / Karaoke, consulta **[Song Cover y Karaoke - Guía Completa para Principiantes](song-cover-karaoke.md)**.

---

## Licencia PREMIUM y Activación

1. Abre la pestaña **Song Cover** y haz clic en **"Copy request code"**.
2. Envía el código de solicitud junto con tu compra de Ko-fi.
3. Recibirás un archivo `license.yvl`. Haz clic en **"Load license…"** y selecciónalo (se copia junto a `YuneVoix.exe`).

### Cómo funciona la licencia

- **Nunca caduca** y funciona **100% sin conexión**.
- **Actualizaciones:** Copia `license.yvl` junto al nuevo `YuneVoix.exe` (o cárgalo de nuevo).
- **Un PC por licencia:** Una carpeta PREMIUM o licencia copiada no desbloqueará Song Cover en otro ordenador.
- **Cambios de hardware:** La licencia está vinculada a tu **placa base**, **disco del sistema** e **instalación de Windows**.
  - Cambiar **uno** de ellos no da problemas (y actualizar la GPU, RAM o monitor no cuenta en absoluto).
  - Cambiar **dos a la vez** (p. ej., un nuevo disco del sistema con una instalación nueva de Windows) requiere una nueva licencia: copia el nuevo código de solicitud y contacta con soporte indicando tu pedido.

---

## Solución de Problemas

| Síntoma | Qué probar primero |
| --- | --- |
| **Voz robótica, baja o "bajo el agua"** | Sube la ganancia del micro en Windows para que el habla fuerte alcance picos cerca de **−6 dBFS** (`Settings → General → Microphone level`) y mantén Input cleaning en **`DF3`**. |
| **El tecleo o los clics se convierten en tonos** | Pon Input cleaning (`Settings → General`) en **`DF3`**. |
| **Siseo o "grano" en agudos** | Mantén **Smooth top** en `100%` y **Brightness** en `0 dB` (`Settings → EQ & Filters`). |
| **Octava incorrecta / suena como ardilla** | En `Settings → Pitch & Autotune`, ajusta **Pitch shift** o prueba **Automatic pitch** (`Octave from the target voice` para cantar; `Match the target voice's pitch` para hablar). |
| **Se pierden risas, respiraciones o susurros** | Desactiva **Speech gate**, cambia Input cleaning a **`Gentle`** (en una sala silenciosa), prueba **WavLM+** (NVIDIA y AMD DirectML) o cambia **Model method** a **`FlowEdit 3+1`** (necesita una muestra de 5-20 s de tu propia voz). |
| **FlowEdit mantiene ruido de fondo o eco de sala** | Activa la limpieza de entrada **`DF3`**, graba en una sala más silenciosa o vuelve a poner **Model method** en **`Classic`**. |
| **Chasquidos o cortes breves** | Pon **Model method** en **`Learned 4 steps`**, acorta **Prompt length**, sube **Output buffer** (`Settings → General`) y cierra otras apps que usen mucha GPU. |
| **Tirones al jugar** | Limita los **FPS** del juego y baja los gráficos del juego, pon **Model method** en **`Learned 4 steps`**, acorta **Prompt length** y desactiva **Harmony**. |
| **LIVE detenido: "the audio device stopped working"** | Tu micro o salida se desconectó o cambió. Vuelve a conectarlo, haz clic en **Refresh devices** y pulsa **START**. |
| **AMD: se cierra al pulsar START / `ShapeInferenceNotRegistered`** | Actualiza a la **v0.7.1** (usa **DirectML** en la GPU dedicada por defecto, corrigiendo tanto los cierres cuando hay gráfica integrada AMD como `ShapeInferenceNotRegistered` cuando la gráfica integrada está desactivada). Revisa `check.txt` para ver la tarjeta/motor activo y mantén actualizados los controladores Adrenalin. |
| **AMD: FlowEdit vuelve al respaldo o WavLM+ no disponible** | Revisa `Settings → General → "AMD graphics engine"`. Si activaste el modo experimental **MIGraphX**, vuelve a **DirectML** y reinicia (bajo MIGraphX, `WavLM+`, `FlowEdit 3+1` y `Learned 4 steps` no están disponibles - todo se ejecuta como Classic, 10 × Euler). Asegúrate también de tener `Sample of your voice…` configurado para FlowEdit en LIVE. |
| **El Explorador de Windows dice que el ZIP no es válido** | Usa **7-Zip** o **WinRAR** (ZIP cifrado con AES-256) con la contraseña `yunevoix`. |

---

## Diagnósticos y Soporte

Si algo sigue sin funcionar:

1. Abre el Símbolo del sistema en la carpeta de YuneVoix (escribe `cmd` en la barra de direcciones del Explorador de Windows y pulsa Enter).
2. Ejecuta:
   ```bat
   YuneVoix.exe --check
   ```
3. **Archivos creados junto a `YuneVoix.exe`:**
   - **`check.txt`**: informe de hardware, edición, licencia y detección de GPU/motor.
   - **`live-diag.log`**: registro de diagnóstico de la sesión actual.
   - **`live-diag.prev.log`** y **`crash.log`**: registro anterior y detalles del fallo conservados tras un cierre inesperado.
4. Envía **`check.txt`** y **`live-diag.log`**; tras un fallo envía también **`live-diag.prev.log`** y **`crash.log`** (todos se guardan junto a `YuneVoix.exe`).
5. **Prueba de velocidad AMD (opcional):** Puedes ejecutar `YuneVoix.exe --bench` para generar `bench.txt`, `bench_ort.log` y `bench_output.wav` con la velocidad de diagnóstico en tu tarjeta AMD específica (los resultados varían según la tarjeta y el sistema).
6. *(Recordatorio de privacidad)* Antes de compartir registros o archivos WAV opcionales de **Save diagnostic recordings** en **`yune-support`**, por DM a **Kuroyuki** (`sxxyneko` en Discord) o en [ko-fi.com/yunevoix](https://ko-fi.com/yunevoix), revísalos por si contienen nombres de usuario personales, rutas de archivos o voz privada.
