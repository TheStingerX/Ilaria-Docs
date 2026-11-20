# Instalar Causal Voice Changer

Esta guía te explica paso a paso cómo instalar Causal Voice Changer en **Windows** o **Linux**, incluso si nunca has usado Python ni Git.

> **Regla clave en el primer uso**: ejecuta siempre **primero** el lanzador de entrenamiento (`run-training.bat` en Windows o `run-training.sh` en Linux), aunque solo quieras usar el cambiador de voz en vivo. Este lanzador instala Python, PyTorch para tu GPU y los ~900 MB de pesos preentrenados que necesitan ambas aplicaciones.

## 1. Descarga CVC

Elige una de las dos opciones:

### Opción A: Release precompilada (Recomendada para principiantes)

1. Ve a la [página de Releases de Causal Voice Changer](https://github.com/mojowozo/Causal-Voice-Changer/releases).
2. Descarga el archivo para tu sistema operativo:
   - **Windows**: `Causal-Voice-Changer-<version>-windows-x64.zip`
   - **Linux**: `Causal-Voice-Changer-<version>-linux-x86_64.tar.gz` *(requiere glibc 2.35+, como Ubuntu 22.04, Debian 12 o posterior)*
3. Extrae el archivo en una carpeta con permisos de escritura (por ejemplo `D:\CausalVC` en Windows).
   - *Nota*: la release ya incluye las ventanas compiladas, así que **no** necesitas instalar .NET SDK ni Rust manualmente.

### Opción B: Desde el código fuente (`git clone`)

Si clonas el repositorio con `git clone https://github.com/mojowozo/Causal-Voice-Changer.git`, las ventanas se compilan automáticamente al primer arranque (y se recompilan si cambian los archivos fuente):
- **Windows**: instala automáticamente **.NET 10 SDK** en `.dotnet` si falta, para compilar la app WinUI 3.
- **Linux**: compila la interfaz COSMIC en Rust usando `cargo`.
- Si no se puede compilar la interfaz nativa, se abre automáticamente una ventana **Tk** más sencilla con las funciones básicas.

## 2. Ejecuta la configuración inicial (`run-training`)

1. Abre la carpeta extraída de CVC.
2. Ejecuta:
   - **Windows**: haz doble clic en **`run-training.bat`**
     - Como la app no está firmada, Windows SmartScreen puede mostrar *"Windows protegió su PC"*. Haz clic en **Más información → Ejecutar de todas formas**.
   - **Linux**: abre una terminal en la carpeta y ejecuta **`./run-training.sh`**
3. **Espera al instalador automático**:
   - Crea un entorno Python local (`.venv-win` en Windows, `.venv` en Linux) usando **`uv`**.
   - Instala la versión de **PyTorch** adecuada para tu tarjeta gráfica.
   - Descarga el **modelo base y los pesos de RMVPE** (unos **900 MB**) en la carpeta `weights/`.
4. Al terminar se abrirá la **ventana de Entrenamiento**. ¡Ya puedes cerrarla o empezar a crear una voz!

## 3. Selección de GPU en Windows (si es necesario)

En Windows, `scripts/gpu-extra.ps1` detecta tu GPU automáticamente:
- **NVIDIA**: instala PyTorch **CUDA**.
- **AMD RX 7000 / 9000, PRO W7000, Ryzen AI**: instala PyTorch **ROCm** (`rocm`, requiere AMD Software `26.2.2` o posterior).
- **AMD RX 6000 / PRO W6000**: instala la compilación nightly de AMD (`rocm-rdna2`).
- **AMD Radeon antiguas**: funcionan en **CPU** (en tiempo real pon **Chunk** en `60 ms` o más).

Si la detección automática elige el backend incorrecto, define la variable de entorno `CAUSALVC_GPU` antes de abrir el lanzador:
- `CAUSALVC_GPU=cuda`
- `CAUSALVC_GPU=rocm`
- `CAUSALVC_GPU=rocm-rdna2`

*(Si ejecutas comandos `uv` manualmente en Windows, añade `--extra cuda`, `--extra rocm` o `--extra rocm-rdna2`.)*

## 4. Actualizar CVC

Desde la versión **v0.3.1**, CVC incluye un **actualizador integrado** directamente en la aplicación. La comprobación automática está activa por defecto y puede desactivarse en la página **About**. Las instalaciones existentes también actualizan `weights/causalvc-base/` automáticamente en el siguiente inicio o entrenamiento.

Al actualizar manualmente o desde código fuente:
- En Windows, si usas el código fuente y la interfaz cambió, ejecuta `run-realtime.bat` / `run-training.bat` con `CAUSALVC_REBUILD=1` para recompilar WinUI 3.
- En Linux, la interfaz Rust se recompila automáticamente en el siguiente arranque tras actualizar.
