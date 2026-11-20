# YuneVoix (YUNE)

[Hugging Face (Descarga)](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Soporte y Premium)](https://ko-fi.com/yunevoix)

YuneVoix es una aplicación de conversión de voz por IA en tiempo real para Windows, impulsada por el motor **YUNE**. Al igual que RVC, transforma tu voz en la de otra persona - tanto para hablar como para cantar, en directo o sin conexión - pero **sin necesidad de entrenar un modelo de voz**. Todo se ejecuta localmente en tu tarjeta gráfica: sin nube, sin cuenta y tu audio nunca sale de tu PC.

## Cómo funciona

En lugar de pasar horas entrenando un modelo con un dataset, YUNE solo necesita una breve muestra de audio de referencia de la voz objetivo (unos **5–20 segundos**). Divide tu voz en *qué dices* y *cómo lo dices*:

1. **Speech encoder**: captura tus palabras, articulación y ritmo.
2. **Pitch tracker**: sigue tu melodía y entonación.
3. **Modelo diffusion-transformer**: reconstruye el audio con el timbre de la voz objetivo usando la breve grabación de referencia.
4. **Vocoder neuronal**: genera audio de banda completa a **44.1 kHz**.

En modo **LIVE**, el audio se procesa en pequeños bloques de unos **160 ms**, con un retardo total aproximado de **0,7 segundos** con la configuración predeterminada.

## BASIC vs. PREMIUM

| Función | BASIC (Gratis) | PREMIUM |
| --- | --- | --- |
| **Cambiador de voz LIVE** (habla y canto) | Incluido | Incluido |
| **Voice Bank** (crear y compartir voces `.yvoice`) | Incluido | Incluido |
| **Herramientas de tono** (shift, autotune, estabilizador, armonía) | Incluido | Incluido |
| **Carácter vocal y efectos** | Incluido | Incluido |
| **Limpieza de entrada** (eliminación de ruido/clics, speech gate) | Incluido | Incluido |
| **Song Cover** (separar voces, convertir y mezclar) | - | Incluido |
| **Karaoke** (cantar con letras en pantalla) | - | Incluido |
| **Licencia sin conexión** | No requerida | `license.yvl` por equipo |

> **YuneVoix PREMIUM** está disponible para quienes apoyan el proyecto en [Ko-fi](https://ko-fi.com/yunevoix). El acceso se gestiona de forma privada por Ko-fi o DM, y la licencia funciona completamente sin conexión.

## Funciones principales

- **Cambiador de voz LIVE**: micrófono de entrada, voz convertida hacia cualquier dispositivo de audio (Discord, OBS, juegos, VRChat). Funciona para hablar y cantar, conservando respiraciones, susurros y risas.
- **Voice Bank**: crea una nueva voz a partir de 10–25 segundos de grabaciones claras. YuneVoix puede separar automáticamente la voz de la música/ruido de fondo y eliminar la reverberación.
- **Herramientas de tono**: cambio de octava manual o automático, autotune con detección de tonalidad, estabilizador suave de tono, profundidad de vibrato y armonías en vivo (terceras, quintas, octavas).
- **Carácter vocal**: controles de intensidad del timbre, formante, calidez y presencia con ajustes preestablecidos.
- **Limpieza de entrada**: eliminación de ruido y clics (`DF3` / `Gentle`), speech gate y monitoreo de entrada/salida.
- **Efectos vocales**: de-esser, compresor, reverberación y limitador de picos.
- **Opciones de calidad vs. velocidad**: dos motores de contenido (incluido **WavLM+** en NVIDIA y AMD DirectML para conservar tus risas, susurros y respiraciones) y varios métodos de modelo. Los modos rápidos usan alrededor del 40% del tiempo de GPU, y el modo **FlowEdit 3+1** conserva mejor tu respiración y articulación naturales.
- **Song Cover y Karaoke (PREMIUM)**: re-canta canciones completas con separación vocal automática o canta siguiendo las letras en pantalla.
- **Interfaz en 6 idiomas**: Inglés, Alemán, Italiano, Español, Polaco y Portugués.

## Requisitos del sistema

YuneVoix requiere una **GPU dedicada** y no funciona solo con CPU. No es compatible con gráficos Intel, macOS ni Linux.

| Componente | NVIDIA (Recomendada) | AMD (DirectML) |
| --- | --- | --- |
| **SO** | Windows 10 / 11 64 bits | Windows 11 **24H2** o superior (64 bits) |
| **GPU** | 8 GB+ VRAM (**12 GB recomendados**), GeForce RTX recomendada | Radeon **serie RX 7000** o superior, 12 GB+ VRAM (**16 GB recomendados**) |
| **Controlador** | Driver NVIDIA actual | AMD Adrenalin **25.10.13.09** o superior |
| **Audio** | Micrófono + **auriculares** (obligatorios en vivo) | Micrófono + **auriculares** (obligatorios en vivo) |

> **Nota NVIDIA vs. AMD**: desde la **v0.7.1**, el paquete AMD usa **DirectML** en la tarjeta dedicada por defecto, y tanto **`WavLM+`** como **`FlowEdit 3+1`** funcionan también en AMD DirectML (en LIVE, covers y karaoke). Opcionalmente puedes cambiar `Settings → General → "AMD graphics engine"` al motor experimental **MIGraphX** (tras reiniciar; con MIGraphX `WavLM+` y `FlowEdit 3+1` no están disponibles y Windows puede descargar MIGraphX mediante Windows Update).
