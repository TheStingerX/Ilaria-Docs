---
label: "Voice Bank y uso en vivo"
icon: ":studio_microphone:"
order: 97
permalink: /non-rvc/yunevoix/usage/
---
# Voice Bank y uso en vivo

Usa esta guía para crear voces en el **Voice Bank**, conectar YuneVoix con **Discord, OBS, juegos o VRChat** y ajustar el audio para una conversión en directo limpia.

## 1. Crear y compartir voces (Voice Bank)

YuneVoix no requiere **ningún entrenamiento**.

1. Abre la pestaña **Voice Bank**.
2. Selecciona **10–25 segundos** de grabaciones claras de la voz objetivo:
   - Mejor resultado: una sola persona, audio limpio sin música ni efectos.
   - Incluir **risas, respiraciones, "mmm" y canto** ayuda al motor a capturar la expresividad vocal.
3. Mantén activada la limpieza **"Separate voice + remove reverb"** si la muestra tiene ruido de fondo o reverberación.
4. La voz estará lista en segundos y se guardará como un archivo `.yvoice`.

Para compartir o respaldar una voz, usa **Voice Bank → Open folder** para encontrar el archivo `.yvoice`, o cárgala con **Import .yvoice…**.

> **Uso responsable**: usa solo voces que tengas derecho a utilizar (la tuya o la de alguien que haya dado su consentimiento). No uses YuneVoix para suplantar personas reales, engañar, acosar o cometer fraude.

## 2. Configurar el enrutamiento de audio en vivo

> **Usa siempre auriculares** en modo en vivo. Con altavoces, la voz convertida vuelve al micrófono y provoca eco, zumbidos y acoples.

### Enrutamiento hacia Discord, OBS, juegos o VRChat

1. Instala un cable de audio virtual (por ejemplo, el gratuito **VB-CABLE**).
2. En **YuneVoix**, elige tu micrófono físico como entrada y **`CABLE Input`** como dispositivo de salida.
3. En **Discord, OBS, VRChat o tu juego**, selecciona **`CABLE Output`** como micrófono.
4. *(Opcional)* Para escucharte: abre **Configuración de sonido de Windows → Grabar → CABLE Output → Propiedades → Escuchar**, activa **"Escuchar este dispositivo"** y elige tus auriculares.
5. **En Discord**, desactiva la **Supresión de ruido (Krisp)** y la **sensibilidad de entrada automática** para este micrófono - cortan respiraciones y palabras suaves, y YuneVoix ya limpia la entrada.

### Latencia esperada

Con la configuración predeterminada, el retardo total es de unos **0,7 segundos**. Es ideal para streaming, chat de voz y grabaciones, pero demasiado alto para cantar exactamente a tiempo sobre una pista. Reducir **Output buffer** baja algo la latencia pero puede causar cortes.

## 3. Ajustes recomendados

### Nivel de micrófono y limpieza de entrada

- Ve a **Settings → General** y observa **Microphone level**. Sube la ganancia del micrófono en Windows hasta que el habla fuerte alcance picos cercanos a **−6 dBFS**. Un micrófono muy bajo es la causa más común de voz robótica o "bajo el agua".
- Mantén **Input cleaning** en **`DF3`** en entornos ruidosos. En una habitación silenciosa, si se cortan risas, respiraciones o susurros, desactiva **Speech gate** y prueba **`Gentle`**.

### Tono y Autotune

Ve a **Settings → Pitch & Autotune**:
- **Pitch shift**:
  - **`+12`** para voz masculina → objetivo femenino
  - **`0`** para una voz en tu mismo rango
  - **`−12`** para voz femenina → objetivo masculino
  - O activa el **tono automático**.
- Para cantar puedes activar **autotune** (con detección de tonalidad), **pitch stabilizer**, **vibrato depth** y **armonía en vivo** (terceras, quintas, octavas).

### Carácter vocal, efectos y carga de GPU

- **Voice character**: ajusta intensidad del timbre, formante, calidez y presencia, o parte de un preset.
- **Vocal effects**: de-esser, compresor, reverberación y limitador de picos.
- **Motores de contenido y FlowEdit 3+1** (**Settings → Voice & Timbre**):
  - Prueba **WavLM+** (compatible con NVIDIA y AMD DirectML; no disponible si está seleccionado AMD MIGraphX) para conservar risas, susurros y respiraciones de tu propia voz.
  - El modo **FlowEdit 3+1** (compatible con NVIDIA y AMD DirectML) conserva mejor tu respiración y articulación naturales (requiere una muestra de tu voz en LIVE).
  - En AMD se usa **DirectML** en la GPU dedicada por defecto; opcionalmente puedes probar **MIGraphX** (experimental, tras reiniciar) en `Settings → General → "AMD graphics engine"`, aunque `WavLM+` y `FlowEdit 3+1` requieren DirectML.
  - Si estás **jugando al mismo tiempo** y notas tirones, baja los gráficos/FPS del juego, reduce **Model steps**, usa un prompt más corto o desactiva **Harmony**.
