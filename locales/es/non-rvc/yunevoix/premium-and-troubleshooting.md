---
label: "Premium, licencia y soporte"
icon: ":wrench:"
order: 96
permalink: /non-rvc/yunevoix/premium-and-troubleshooting/
description: "Quienes apoyan el proyecto en Ko-fi obtienen acceso a YuneVoix PREMIUM, que desbloquea funciones musicales sin conexión además de todo lo incluido en BASIC:"
---
# Premium, licencia y solución de problemas

## YuneVoix PREMIUM: Song Cover y Karaoke

Quienes apoyan el proyecto en [Ko-fi](https://ko-fi.com/yunevoix) obtienen acceso a **YuneVoix PREMIUM**, que desbloquea funciones musicales sin conexión además de todo lo incluido en BASIC:

- **Song Cover**: elige una canción y una voz objetivo. YuneVoix separa la voz del instrumental, convierte la voz principal (y opcionalmente los coros) y lo mezcla todo de nuevo.
  - **Formatos compatibles**: WAV, MP3, FLAC, M4A, AAC, OGG, WMA, AIFF (hasta **15 minutos**).
  - **Tiempo de procesamiento**: aproximadamente **1,3×** la duración de la canción (una canción de 5 minutos tarda unos 6–7 minutos).
  - **Formatos de salida**: **WAV 24-bit** o **MP3 320 kbps**.
- **Karaoke**: canta siguiendo las letras en pantalla; tu toma se convierte a la voz elegida y se mezcla con la música, ajustada a la tonalidad y nivel del original.

### Consejos para Song Cover

- **Tono incorrecto**: ajusta manualmente **Settings → Song Cover → Octave** en **`−12`**, **`0`** o **`+12`** en lugar de `Auto`.
- **Dúos y coros**: **"Lead vocal only"** da el resultado más limpio. Si hay dos cantantes principales, ambos reciben la voz elegida (no se puede aislar solo a uno).
- **Derechos de autor**: la canción sigue perteneciendo a sus autores - revisa las normas de la plataforma y el copyright antes de publicar covers.

## Licencia PREMIUM y activación

1. Abre la pestaña **Song Cover** y haz clic en **"Copy request code"**.
2. Envía el código junto con tu compra de Ko-fi.
3. Recibirás un archivo `license.yvl`. Haz clic en **"Load license…"** y selecciónalo.

### Cómo funciona la licencia

- **Nunca caduca** y funciona **100% sin conexión**.
- **Actualizaciones**: copia `license.yvl` junto al nuevo `YuneVoix.exe` (o vuelve a cargarlo).
- **Un PC por licencia**: copiar la carpeta PREMIUM o la licencia a otro equipo no desbloqueará Song Cover allí.
- **Cambios de hardware**: la licencia está vinculada a la **placa base**, el **disco del sistema** y la **instalación de Windows**.
  - Cambiar **uno** de ellos no da problemas (y cambiar GPU, RAM o monitor no cuenta en absoluto).
  - Cambiar **dos a la vez** (por ejemplo, un disco de sistema nuevo con Windows recién instalado) requiere una nueva licencia: copia el nuevo request code y contacta con soporte indicando tu pedido.

## Solución de problemas

| Síntoma | Qué comprobar primero |
| --- | --- |
| **Voz robótica, baja o "bajo el agua"** | Sube el volumen del micrófono en Windows hasta que los picos alcancen cerca de **−6 dBFS** (`Settings → General → Microphone level`) y deja Input cleaning en **`DF3`**. |
| **Octava incorrecta / suena a ardilla** | En `Settings → Pitch & Autotune`, ajusta **Pitch shift** (`+12` hombre→mujer, `0` mismo rango, `−12` mujer→hombre) o activa el tono automático. |
| **Se pierden risas, respiraciones o susurros** | Desactiva **Speech gate**, cambia Input cleaning a **`Gentle`** (en sala silenciosa) y prueba el motor de contenido **WavLM+** (compatible con NVIDIA y AMD DirectML). |
| **AMD: se cierra al pulsar START / WavLM+ o FlowEdit no disponibles** | Actualiza a la **v0.7.1** (corrige cierres en CPUs con gráficos AMD integrados usando DirectML en la GPU dedicada). Si activaste MIGraphX experimental en `Settings → General → "AMD graphics engine"`, vuelve a **DirectML** y reinicia para usar `WavLM+` y `FlowEdit 3+1`. |
| **Chasquidos o cortes breves** | Sube **Output buffer** (`Settings → General`), cierra otras apps que usen la GPU, reduce **Model steps** o la longitud del prompt y desactiva **Harmony**. |
| **Tirones mientras juegas** | Baja los gráficos o el límite de FPS del juego, o reduce **Model steps** y la longitud del prompt en `Settings → Voice & Timbre`. |
| **El Explorador de Windows dice que el ZIP no es válido** | Usa **7-Zip** o **WinRAR** (el archivo usa cifrado AES-256) con la contraseña `yunevoix`. |

## Diagnóstico y soporte

Si algo sigue sin funcionar:

1. Abre el Símbolo del sistema en la carpeta de YuneVoix (escribe `cmd` en la barra de direcciones del Explorador y pulsa Enter).
2. Ejecuta:
   ```bat
   YuneVoix.exe --check
   ```
3. Envía el archivo **`check.txt`** generado junto con **`live-diag.log`** al pedir ayuda en **`yune-support`**, por DM a **Kuroyuki** (`sxxyneko` en Discord), o en [ko-fi.com/yunevoix](https://ko-fi.com/yunevoix).
