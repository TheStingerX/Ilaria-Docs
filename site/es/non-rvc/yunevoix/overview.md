# YuneVoix (YUNE)

[Hugging Face (Descarga)](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Soporte y Premium)](https://ko-fi.com/yunevoix)

YuneVoix es una aplicación de conversión de voz por IA en tiempo real para Windows, impulsada por el motor **YUNE**. Al igual que RVC, transforma tu voz en la de otra persona - tanto al hablar como al cantar, en directo o sin conexión - pero **sin entrenar un modelo de voz individual**. Todo se ejecuta localmente en tu propia tarjeta gráfica: sin nube, sin cuenta, y tu audio nunca sale de tu PC.

> **Mapa de la guía:** [1. Resumen y Requisitos](overview.md) · [2. Instalar y Actualizar](installation.md) · [3. Voice Bank y Uso en Directo](usage.md) · [4. Ajustes y Calidad de Audio](settings.md) · [5. Song Cover y Karaoke](song-cover-karaoke.md) · [6. Premium, Licencia y Ayuda](premium-and-troubleshooting.md) · [7. Registro de Cambios](changelog.md)

## Cómo funciona

En lugar de pasar horas entrenando un modelo con un conjunto de datos, YUNE crea un perfil **Voice Bank** a partir de una breve grabación de referencia de la voz de destino (**10-25 segundos**). *(Aparte de eso, el método LIVE **FlowEdit 3+1** también usa una muestra de **5-20 segundos** de tu propia voz normal como punto de partida - por ejemplo, 15 segundos de la voz de destino en Voice Bank frente a 10 segundos de tu propia voz natural en `Settings → Voice & Timbre → Sample of your voice…`.)*

Según la documentación del desarrollador, el pipeline de YUNE divide tu voz en *lo que dices* y *cómo lo dices*:

1. **Voice Bank e identidad del hablante:** Guarda un perfil vocal (`.yvoice`) a partir de una grabación de destino de 10-25 segundos sin entrenar una red neuronal separada desde cero.
2. **Motor de contenido (`Whisper` o `WavLM+`):** Captura tus palabras, ritmo y articulación.
3. **Seguimiento de tono (pitch):** Sigue tu melodía y entonación.
4. **Conversión basada en difusión:** Reconstruye el audio con el timbre del hablante de destino usando la referencia de Voice Bank.
5. **Vocoder neuronal (`PC-NSF`):** Emite audio de banda completa a **44.1 kHz**.
6. **Procesamiento de audio:** Aplica limpieza de entrada, herramientas de tono/autotune, EQ/filtros y efectos.

En modo **LIVE**, el audio se procesa en pequeños bloques de unos **160 ms**, con un retardo total de extremo a extremo de aproximadamente **0.7 segundos** con la configuración predeterminada (según informa el desarrollador).

## BASIC vs. PREMIUM

| Función | BASIC (Gratis) | PREMIUM |
| --- | --- | --- |
| **Cambiador de voz LIVE** (habla y canto) | Incluido | Incluido |
| **Voice Bank** (crear y compartir voces `.yvoice`) | Incluido | Incluido |
| **Herramientas de tono** (cambio, autotune, estabilizador, armonía) | Incluido | Incluido |
| **Carácter de voz y efectos vocales** | Incluido | Incluido |
| **Limpieza de entrada** (eliminación de ruido/clics, speech gate) | Incluido | Incluido |
| **Song Cover** (separar voces, convertir, remezclar) | - | Incluido |
| **Karaoke** (cantar con letras en pantalla) | - | Incluido |
| **Licencia sin conexión** | No requerida | `license.yvl` por PC |

> **YuneVoix PREMIUM** está disponible para quienes apoyan el proyecto en [Ko-fi](https://ko-fi.com/yunevoix). El acceso se gestiona de forma privada por Ko-fi o mensajes directos, y la licencia funciona completamente sin conexión. Consulta [Song Cover y Karaoke](song-cover-karaoke.md) y [Premium, Licencia y Ayuda](premium-and-troubleshooting.md) para más detalles.

## Funciones principales

- **Cambiador de voz LIVE**: micrófono de entrada, voz convertida hacia cualquier dispositivo de audio (Discord, OBS, juegos, VRChat). Funciona para hablar y cantar.
- **Voice Bank**: crea un nuevo perfil `.yvoice` a partir de **10-25 segundos** de grabaciones limpias. YuneVoix puede separar automáticamente la voz de la música/ruido y eliminar la reverberación.
- **Tres métodos de modelo** (según la documentación del desarrollador):
  - **Classic:** Comportamiento de versiones anteriores con controles configurables de `Model steps`, `Solver` y guidance.
  - **Learned 4 steps:** Diseñado para lograr resultados similares a Classic de 10 pasos usando alrededor del **40%** del tiempo de GPU del modelo y menos memoria de GPU.
  - **FlowEdit 3+1:** Parte de tu propia voz de origen (muestra de 5-20 segundos de tu voz en LIVE; la voz de la canción en Song Cover) en lugar de ruido y busca conservar mejor respiraciones, susurros, risas y articulación (alrededor del **60%** del tiempo de GPU del modelo según se informa).
- **Motores de contenido**: **Whisper** (predeterminado) y **WavLM+** (en NVIDIA y AMD DirectML, orientado a una voz en directo más clara y a conservar risas, susurros y respiraciones).
- **Herramientas de tono**: cambio de tono manual o automático, autotune con detección de tonalidad, estabilizador de tono suave, profundidad de vibrato y armonía en directo (terceras, quintas).
- **Carácter de voz, EQ y efectos**: fuerza de timbre, formantes, calidez, suavidad, presencia, de-esser, EQ dinámico, compresor, saturación, bitcrush, reverberación y limitador de picos. Consulta [Ajustes y Calidad de Audio](settings.md).
- **Song Cover y Karaoke (PREMIUM)**: vuelve a cantar canciones completas con separación automática de voz o canta siguiendo letras en pantalla.
- **Selector de idioma de la interfaz**: inglés, alemán, italiano, español, polaco y portugués.

## Requisitos del sistema

YuneVoix requiere una **GPU dedicada** y no puede ejecutarse solo en CPU. Las gráficas integradas/Arc de Intel, macOS y Linux no son compatibles.

| Componente | NVIDIA (Recomendado) | AMD |
| --- | --- | --- |
| **SO** | Windows 10 / 11 64-bit | Windows 10 / 11 64-bit |
| **GPU** | 8 GB+ VRAM (**12 GB recomendados**), se recomienda GeForce RTX | Radeon **serie RX 7000** o más reciente, 12 GB+ VRAM (**16 GB recomendados**) |
| **Controlador** | Controlador NVIDIA actual | Controlador AMD Software: Adrenalin Edition actual |
| **Audio** | Micrófono + **auriculares** (obligatorio para uso en directo) | Micrófono + **auriculares** (obligatorio para uso en directo) |

> **Nota al pie (AMD):** Windows 11 24H2+ y Adrenalin 25.10.13.09+ solo son necesarios para el motor experimental **MIGraphX**, disponible en `Settings → General → "AMD graphics engine"`.

### AMD DirectML vs. AMD MIGraphX

- **AMD DirectML (Predeterminado en v0.7.1):** Integrado y utilizado por defecto en la GPU AMD dedicada. Funciona de inmediato sin descarga de Windows Update ni compilación inicial de modelos, y es compatible tanto con **`WavLM+`** como con **`FlowEdit 3+1`** según la documentación del desarrollador.
- **AMD MIGraphX (Experimental):** Debe activarse explícitamente en `Settings → General → "AMD graphics engine"` y requiere reiniciar. Windows Update puede descargar componentes de MIGraphX, la preparación inicial de modelos puede tardar **10-30 minutos**, y **`WavLM+`**, **`FlowEdit 3+1`** y **`Learned 4 steps`** **no** están disponibles bajo MIGraphX (el modelo siempre se ejecuta como Classic, 10 × Euler).

Siguiente paso: [Instalar y actualizar YuneVoix](installation.md).
