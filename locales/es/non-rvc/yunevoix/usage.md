---
label: "Voice Bank y Uso en Directo"
icon: ":studio_microphone:"
order: 97
permalink: /es/non-rvc/yunevoix/usage/
description: "Tutorial completo para principiantes para crear perfiles .yvoice en Voice Bank, enrutar YuneVoix a Discord, OBS, juegos o VRChat, usar la monitorización integrada y elegir Classic, Learned 4 steps o FlowEdit 3+1."
---
# Voice Bank y Uso en Directo

Usa esta guía para crear voces en **Voice Bank**, enrutar YuneVoix hacia **Discord, OBS, juegos o VRChat**, utilizar los controles integrados de monitorización y elegir el **Model method** adecuado para la conversión LIVE. Para ver el desglose completo de cada control deslizante, consulta [Ajustes y Calidad de Audio](settings.md).

## 1. Crear y compartir voces (Voice Bank)

A diferencia del RVC tradicional, crear un perfil en **Voice Bank** en YuneVoix **no entrena una red neuronal desde cero**, sino que genera una referencia ligera `.yvoice` del hablante en segundos.

1. Abre la pestaña **Voice Bank**.
2. Proporciona **10-25 segundos** de grabaciones claras de la voz de destino:
   - **Qué usar:** Un solo hablante, habla o canto limpio y seco, sin música de fondo, reverberación intensa ni voces superpuestas.
   - **Variedad útil:** Incluir **risas naturales, respiraciones, "mmm" y canto** ayuda a YUNE a captar el tono expresivo.
   - **Qué evitar:** Clips de menos de 10 segundos, audio distorsionado o saturado, varias personas hablando a la vez o mucho eco de sala (que puede hacer que la voz convertida suene ruidosa o inestable).
3. Mantén la limpieza configurada en **"Separate voice + remove reverb (recommended)"** si el clip de origen tiene ruido de fondo o eco de habitación.
4. Guarda la voz: se almacena como un archivo `.yvoice` dentro de `models\yune\voices`.
5. Haz clic en **Play sample** en Voice Bank para previsualizarla (desde la v0.7.0, **Play sample** se reproduce por tu salida predeterminada de Windows / auriculares en lugar de por la salida LIVE).

Para compartir o respaldar una voz, usa **Voice Bank → Open folder** para encontrar el archivo `.yvoice`, o carga uno mediante **Import .yvoice…**.

> **Uso responsable:** Usa solo voces que tengas derecho a utilizar (la tuya propia o la de alguien que haya dado su consentimiento). Nunca uses YuneVoix para suplantar a personas reales, engañar, acosar o cometer fraude.

---

## 2. Configurar el enrutamiento de audio y la monitorización en directo

> **Usa siempre auriculares** en el uso en directo. Con altavoces (o auriculares abiertos con volumen alto y poco aislamiento), la voz convertida puede filtrarse de vuelta al micrófono y provocar audio doble, eco o bucles de retroalimentación.

### Enrutamiento a Discord, OBS, juegos o VRChat

Con un cable de audio virtual como **VB-CABLE** (o **VAC** `Line 1`), recuerda que el cable tiene dos extremos: **YuneVoix** envía audio *hacia* el cable, y **Discord / OBS / juegos** reciben audio *desde* el cable:

1. **Dentro de YuneVoix (pestaña LIVE):**
   - **Input (Microphone):** Tu micrófono físico.
   - **Output:** **`CABLE Input`** (VB-CABLE) o **`Line 1`** (VAC).
2. **Dentro de Discord, OBS, VRChat o tu juego:**
   - **Dispositivo de entrada (Micrófono):** **`CABLE Output`** (VB-CABLE) o **`Line 1`** (VAC).
   - **Dispositivo de salida (Altavoces/Auriculares):** Tus **auriculares** (nunca el cable virtual).
3. **En Discord:** Desactiva la **Supresión de ruido (Krisp)** y la **sensibilidad de entrada automática** para este micrófono virtual, ya que cortan respiraciones y palabras suaves, y YuneVoix ya se encarga de limpiar la entrada.

### Escucharte a ti mismo (Monitorización integrada)

**No** uses la opción de Windows *"Escuchar este dispositivo"* en el cable virtual. YuneVoix incluye controles integrados de monitorización:

- **(Opcional) Para escucharte:** Usa **"Listen to input"** (lo que oye el motor tras limpiar la entrada) o **"Listen to output"** (la voz convertida) en la pestaña **LIVE**.
- Elige tu **Monitor device** (tus auriculares, nunca el cable virtual de salida LIVE) y **Monitor volume** (por defecto `-6 dB`) en **`Settings → General`**.
- **Nota sobre monitorización directa:** La *monitorización directa* por hardware de tus auriculares o interfaz de audio no tiene retardo alguno, pero reproduce tu **voz original sin procesar**, no la voz convertida.

### Expectativas de latencia

Con la configuración predeterminada (`Output buffer` `200 ms`), el retardo total de extremo a extremo es de unos **0.7 segundos** (según informa el desarrollador). Esto funciona bien para chat de voz, streaming y grabaciones, aunque es demasiado alto para cantar exactamente a ritmo con una pista en directo (para cantar sobre música, consulta [Song Cover y Karaoke](song-cover-karaoke.md)).

---

## 3. Model Method: Classic vs. Learned 4 Steps vs. FlowEdit 3+1

Puedes elegir **Model method** en **`Settings → Voice & Timbre`** (y por separado en **`Settings → Song Cover`** para covers y karaoke). Los cambios se aplican **al siguiente START**.

### Classic (Predeterminado)

- Funciona como en versiones anteriores.
- **Model steps** (`10` por defecto, u `8` / `6` / `4`), **Solver** (`Euler` / `DPM++ 2M`), **Guidance (CFG) only in the first half of the steps** y **Timbre guidance** se aplican **solo** en el modo Classic.

### Learned 4 steps

- Ajustado para sonar como Classic de 10 pasos mientras el modelo necesita alrededor del **40%** de su tiempo de GPU y menos memoria de GPU (según las notas del desarrollador).
- La mejor opción para probar cuando juegas al mismo tiempo o usas tarjetas gráficas más lentas.

### FlowEdit 3+1

- Parte de **tu propia voz** en lugar de ruido y cambia solo la identidad vocal, buscando conservar mejor **respiraciones, susurros, risas y articulación** (alrededor del **60%** del tiempo de GPU del modelo según se informa).
- **Requisito en LIVE:** Necesita una muestra de **5-20 segundos** de tu propia voz normal seleccionada en **`Settings → Voice & Timbre → "Sample of your voice…"`** (guardada como `my_voice.yvoice`).
- **Respaldo automático:** Sin esa muestra, o al usar **AMD MIGraphX**, FlowEdit 3+1 vuelve automáticamente a **Learned 4 steps** y la línea de estado LIVE te lo indica.
- **Consejo de sala y micro:** Como FlowEdit conserva más de tu propio timbre y del ambiente de la sala, una habitación silenciosa o la limpieza de entrada **`DF3`** ayudan a mantener limpia la salida.

---

## 4. Ajuste recomendado y Vocal Fry

- **Microphone level (`Settings → General`):** Observa el medidor y sube la ganancia del micrófono en Windows para que el habla fuerte alcance picos cercanos a **`−6 dBFS`**. Un micrófono bajo es la causa más común de una salida robótica o "bajo el agua".
- **Input cleaning (`Settings → General`):** Mantén **`DF3`** activado en salas ruidosas (elimina teclado, clics y siseo; `+30 ms`). En salas silenciosas, si se cortan risas o respiraciones, mantén **Speech gate** desactivado y prueba **`Gentle`**.
- **Smooth out vocal fry (`Settings → Voice & Timbre`, y `Settings → Karaoke`):** Si hablas o cantas muy grave o con voz rasposa y la voz destino suena áspera, activa **Smooth out vocal fry** (funciona en directo; conserva el aire/respiración).
- **Tono y motor de contenido:** Ajusta **Pitch shift** (`Settings → Pitch & Autotune`) o un modo **Automatic pitch**, y compara de oído **Whisper** (predeterminado) frente a **WavLM+** (`Settings → Voice & Timbre`, compatible en NVIDIA y AMD DirectML).

### Jugar mientras usas LIVE

Si notas tirones mientras juegas:
1. Limita los **FPS** del juego.
2. Cambia **Model method** a **`Learned 4 steps`**.
3. Acorta **Prompt length** (p. ej., por debajo de `20 s`).
4. Desactiva **Harmony** si no la necesitas.
5. Comprueba la carga general de la GPU (reducir **Model steps** solo se aplica al modo **Classic**).

Siguiente paso: [Ajustes y Calidad de Audio](settings.md).
