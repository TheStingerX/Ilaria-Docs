---
label: "Instalar y usar RVC Blue"
icon: ":studio_microphone:"
order: 99
permalink: /ilaria-rvc/rvc-blue/installation/
description: "RVC Blue es un cambiador de voz de escritorio para Windows basado en la GUI en tiempo real de RVC WebUI (Mainline - Original RVC)."
---
# RVC Blue (RVC-Realtime-GUI)

[GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI)

**RVC Blue (RVC-Realtime-GUI)** es un cliente de escritorio para Windows enfocado en la conversión de voz RVC en tiempo real y baja latencia. Basado en la interfaz en directo de RVC WebUI, incorpora optimizaciones recientes de inferencia en tiempo real, **CUDA Graph warm-up** (para reducir la carga estable en GPU) y correcciones de reducción de ruido en entrada y salida.

- **Solo inferencia**: RVC Blue no entrena modelos. Entrena tu voz en **Ilaria RVC** (u otro entrenador) e importa aquí los archivos `.pth` e `.index` exportados para inferencia.
- **Tres fuentes de entrada**: **Micrófono** en directo, **Archivo de audio** (con FFmpeg incluido) y **Audio de una aplicación de Windows** (captura por proceso).
- **Voz incluida**: incluye **Sakura**, un modelo de voz natural de uso diario (uso comercial permitido) para probar de inmediato.

## 1. Elige una compilación e instala

Cada paquete de Hugging Face es autónomo e incluye su entorno Python, PyTorch/CUDA, FFmpeg, archivos HuBERT/RMVPE/FCPE y el conjunto base de modelos. No necesitas instalar Python, CUDA Toolkit ni FFmpeg por separado.

| Compilación | Lanzador | Hardware NVIDIA recomendado |
| --- | --- | --- |
| **CUDA 12.8** *(Estándar)* | `RVC-Realtime-GUI-CUDA128.bat` | GPUs NVIDIA actuales, incluida la serie RTX 50 (Blackwell) |
| **CUDA 11.8** *(Compatibilidad)* | Lanzador CUDA 11.8 incluido | GPUs NVIDIA antiguas o sistemas con entorno/driver CUDA 11.8 |

1. Comprueba el modelo de tu GPU NVIDIA en **Administrador de tareas → Rendimiento → GPU**.
2. Abre [RVC Blue en Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI) y descarga el paquete adecuado.
3. Extrae todo el archivo en una **carpeta local corta y con permisos de escritura**, como `C:\RVC-Realtime-GUI`. No lo ejecutes desde dentro del ZIP y evita `Archivos de programa` o carpetas sincronizadas con OneDrive.
4. Ejecuta `RVC-Realtime-GUI-CUDA128.bat` (o el lanzador de CUDA 11.8).
5. **Espera a que termine el primer inicio**: la primera apertura tarda más mientras se inicializan los recursos de inferencia, el runtime CUDA y el warm-up de CUDA Graph. Espera a que aparezca la ventana antes de pensar que se bloqueó.

## 2. Añade tus modelos de voz

Crea una subcarpeta por cada voz dentro de `models/` en la carpeta extraída:

```text
models/
  MyVoice/
    MyVoice.pth
    added_MyVoice.index
    preview.png
```

- **Nombre de la carpeta**: aparece como nombre del modelo en la galería.
- **Archivo requerido**: usa un **`.pth` de inferencia**, no un checkpoint de entrenamiento (`G_*.pth` / `D_*.pth`).
- **Índice y vista previa opcionales**: coloca el archivo `added_*.index` correspondiente y una imagen `.png`, `.jpg` o `.jpeg` en la misma carpeta para mostrar una miniatura automáticamente.
- **Recargar**: pulsa **Reload** en la aplicación (o reinicia RVC Blue) después de añadir o sustituir un modelo. Los ajustes generales por modelo se guardan automáticamente.

## 3. Configura el audio y haz una prueba local

RVC Blue permite elegir **Input** (entrada), **Output** (salida) y **Monitor** de forma independiente:

- **Input**: tu micrófono físico (o un archivo de audio / aplicación de Windows).
- **Output**: adónde se envía la voz convertida (tus auriculares para probar, o un cable virtual para llamadas y juegos).
- **Monitor**: segunda salida opcional para escucharte mientras **Output** va hacia Discord u OBS.

### WASAPI frente a ASIO

- **Sin interfaz ASIO**: empieza con **WASAPI**.
- **Con ASIO nativo**: RVC Blue inicia con el tamaño de búfer recomendado por el controlador. También puedes combinar entrada/monitor ASIO con salida WASAPI, o usar pares de canales distintos en el mismo controlador ASIO.

### Primera prueba local

1. Selecciona tu micrófono físico en **Input**.
2. Selecciona tus auriculares en **Output** (deja **Monitor** apagado por ahora para evitar voz doble).
3. Elige **Sakura** (o tu modelo) y mantén el búfer y el tono por defecto.
4. Pulsa **Start**, di una frase corta y haz una pausa para comprobar latencia, claridad y ruido.

## 4. Envía el audio a Discord, OBS o un juego

> **Correct Audio Routing**
>
> **1. Dentro del Voice Changer**
> - **Input Device:** Tu micrófono físico.
> - **Output Device:** `Line 1` (VAC, recomendado) o `CABLE Input` (VB-CABLE).
>
> **2. Dentro de Discord, Juegos, OBS u otras aplicaciones**
> - **Input Device:** `Line 1` (VAC, recomendado) o `CABLE Output` (VB-CABLE).
> - **Output Device:** Tus auriculares (muy recomendados frente a altavoces).
>
> ```text
> Your Microphone → Voice Changer → Line 1 (VAC) or CABLE Input/Output (VB-CABLE) → Discord / Game / OBS
> ```
>
> El audio que llega desde Discord, el juego u otras apps debe reproducirse directamente en tus **auriculares** (nunca de vuelta al cable virtual).
>
> - **VAC vs. VB-CABLE:** **VAC** (`Line 1`) es siempre la opción recomendada. Si también (o solo) usas **VB-CABLE**, recuerda que el voice changer envía a **`CABLE Input`** mientras que Discord / juegos escuchan **`CABLE Output`**.
> - **Altavoces y filtración de auriculares:** Evita usar altavoces; el sonido puede filtrarse en el micrófono y provocar doble audio, eco o que también se conviertan las voces de otras personas. También puede pasar con auriculares si el volumen está muy alto o no son lo bastante cerrados y aislados.
> - **Monitoreo:** Escuchar tu propia voz convertida en los auriculares es una función opcional aparte que solo debe activarse cuando haga falta. Evita rutas de audio duplicadas, eco y loopback.

Para usar la voz convertida en otra aplicación, conéctala mediante un cable de audio virtual (**VAC Lite** o **VB-CABLE**):

1. Configura **Output** en RVC Blue hacia el punto de reproducción del cable virtual (por ejemplo `CABLE Input` o `Line 1`).
2. Si quieres escucharte, configura **Monitor** hacia tus auriculares.
3. En Discord, OBS o tu juego, elige el punto de grabación del cable virtual (por ejemplo `CABLE Output` o `Line 1`) como **Micrófono**.
4. Mantén el audio del juego o la llamada en tus auriculares.
5. Graba una prueba breve en la aplicación de destino antes de entrar a una llamada.

Para instalar el cable virtual y revisar nombres de dispositivos, consulta la [guía del cable virtual](../vonovox/live-audio.md).

## 5. Entrada por archivo, captura de aplicaciones y grabación WAV

- **Entrada de archivo de audio**: cambia la fuente a **File**, elige un clip WAV o de audio corto (decodificado con el FFmpeg incluido) y comprueba **Output** y **Monitor** antes de pulsar **Start**. La configuración de salida y monitor se conserva entre pruebas.
- **Captura de aplicaciones Windows**: cambia la fuente a **Application**, pulsa **Refresh** y elige una aplicación en ejecución. Usa la captura por proceso de Windows. Las aplicaciones detectadas se recuerdan y se reconectan al reiniciarse. El audio enviado directamente por ASIO fuera de la ruta normal de Windows puede no capturarse, y el audio original de la aplicación **no se silencia automáticamente** (bájalo o siléncialo aparte si es necesario).
- **Grabación WAV**: los controles integrados permiten guardar archivos WAV con **entrada/salida por separado**, **mezclados** o en **canales L/R separados**.

## 6. Solución de problemas frecuentes

| Síntoma | Qué revisar |
| --- | --- |
| La app parece congelada en el primer inicio | Espera 1-2 minutos a que termine la carga inicial de CUDA y CUDA Graph warm-up. |
| El programa se cierra al instante al abrirlo | Ejecuta el `.bat` desde la carpeta extraída (p. ej. `C:\RVC-Realtime-GUI`) y lee el error en consola. Comprueba que tu controlador NVIDIA sea compatible con CUDA 12.8 o 11.8. |
| Una voz nueva no aparece | Verifica que esté dentro de `models/<NombreVoz>/` y que sea un `.pth` de inferencia (no un checkpoint de entrenamiento), luego pulsa **Reload**. |
| En auriculares suena, pero Discord o el juego no reciben nada | Comprueba que **Output** en RVC Blue sea el dispositivo de reproducción del cable virtual y que Discord/juego use su dispositivo de grabación como micrófono. |
| Se escuchan dos voces | Desactiva **Monitor** si **Output** ya apunta a los auriculares, o silencia la aplicación origen al usar captura de aplicaciones. |
| El audio se entrecorta bajo carga | Restaura el búfer por defecto o auméntalo ligeramente y vuelve a probar con el juego o la llamada abiertos. |

[Código fuente y notas de lanzamiento](https://github.com/niel-blue/RVC-Realtime-GUI/tree/main)
