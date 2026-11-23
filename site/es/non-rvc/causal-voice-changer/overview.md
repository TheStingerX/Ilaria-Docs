# Causal Voice Changer (CVC)

[GitHub](https://github.com/mojowozo/Causal-Voice-Changer) · [Releases](https://github.com/mojowozo/Causal-Voice-Changer/releases) · [Redpanda VC · Entrenamiento con Causal Voice Changer](../../other-rvcs/redpanda/causal-training.md)

**Causal Voice Changer (CVC)** es un cambiador de voz por IA en tiempo real a **48 kHz** creado para cerrar la brecha entre las opciones de latencia ultrabaja (como Beatrice) y las opciones de mayor fidelidad pero más lentas (como RVC). En lugar de sacrificar calidad por velocidad  - o velocidad por calidad -  CVC utiliza una versión destilada de **ContentVec** y **RMVPE** en una arquitectura causal para lograr audio limpio con bajo retardo.

## Diferencias frente a RVC (explicado de forma sencilla)

El **RVC** tradicional se diseñó originalmente para convertir archivos de audio completos, no transmisiones en directo:

1. RVC toma un bloque de tu voz, lo convierte y lo une al bloque anterior mediante un **crossfade**.
2. Al bajar el tamaño del bloque para reducir el retardo, RVC tiene menos contexto y pierde calidad y precisión tonal. Si mantienes una nota o alargas una palabra, suelen oírse las costuras entre bloques como temblores o cortes.

**Causal Voice Changer (CVC)** funciona de otra manera:

- Es **causal**: convierte el audio de forma continua conforme llega, mirando casi siempre hacia atrás con un búfer de lookahead de solo **50 ms** en la base 100 Hz v4 (`60 ms` en voces antiguas a 50 Hz).
- Al transmitir en flujo continuo en lugar de unir bloques independientes, **los sonidos sostenidos y las notas largas se mantienen suaves**, sin romperse ni vibrar.
- Conservas casi toda la calidad de RVC con una latencia mucho menor (por ejemplo, unos **130 ms totales de extremo a extremo** en Linux con audio JACK).

## Aviso importante de licencia y uso comercial

Aunque el código fuente de CVC tiene licencia **MIT**, el modelo base preentrenado incluido fue entrenado con **EARS (CC BY-NC)**, **VCTK** y **LibriTTS-R**.

> **Solo uso no comercial**: debido al conjunto de datos EARS, **no** puedes usar el modelo base preentrenado incluido  - ni **ninguna voz ajustada a partir de él** -  con fines comerciales.

## Plataformas y hardware compatibles

| Plataforma | Interfaz | Soporte GPU / Backend |
| --- | --- | --- |
| **Windows 10/11 (x64)** | WinUI 3 (acrylic) o respaldo Tk | **NVIDIA** (CUDA), **AMD Radeon RX 7000/9000 / PRO W7000 / Ryzen AI** (ROCm 7.2.1), **AMD RX 6000 / PRO W6000** (`rocm-rdna2` nightly); las Radeon antiguas funcionan en CPU (pon Chunk ≥ `60 ms`) |
| **Linux (x86_64)** | COSMIC (Rust) o respaldo Tk | glibc 2.35+ (Ubuntu 22.04, Debian 12 o superior); NVIDIA / AMD; **JACK / PipeWire** recomendado para la menor latencia |

## Qué puedes hacer con CVC

- **Entrenar tus propias voces** desde audio sin editar, sin cortar archivos ni eliminar silencios manualmente, a cualquier sample rate.
- **Compartir voces fácilmente** como archivos `.cvc` únicos (basta arrastrarlos a la ventana en vivo).
- **Convertir tu micrófono en directo** con interfaces nativas en Windows/Linux, reducción de ruido integrada (**Hushwire** o **RNNoise**), Pitch match, medidor LUFS y grabación.
- **Convertir archivos de audio completos** sin conexión mediante `causalvc.infer` o seleccionando un archivo como fuente en la app en vivo.
