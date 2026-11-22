---
label: "Instalar y abrir"
icon: ":toolbox:"
order: 40
permalink: /ilaria-rvc/mainline/installation/
description: "RVC WebUI (Mainline - Original RVC) es la interfaz de usuario web de conversión de voz basada en recuperación."
---

# Instalar RVC WebUI (Mainline - Original RVC)

[GitHub](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI)

RVC WebUI (Mainline - Original RVC) es la interfaz de usuario web de conversión de voz basada en recuperación. Utilice su interfaz de navegador para la conversión y capacitación de archivos. Para la conversión de micrófono, utilice la interfaz de escritorio separada que se describe en la [guía en tiempo real](realtime.md).

## Elija una ruta de instalación

| Su configuración | Qué usar |
| --- | --- |
| Windows y una GPU compatible | Comience con un archivo de Windows prediseñado correspondiente. Esta es la ruta más corta. |
| Windows y una GPU NVIDIA RTX serie 50 | Utilice un paquete marcado explícitamente para la serie 50 o la configuración de origen con la compilación CUDA 12.8 Torch. Los archivos NVIDIA más antiguos pueden iniciarse pero fallar cuando intentan ejecutar operaciones de GPU. |
| Windows y una GPU AMD o Intel | Elija el archivo AMD/Intel correspondiente. La compatibilidad con DirectML depende de la versión y el funcionamiento. Pruebe primero la conversión del archivo. |
| Ubuntu o una configuración personalizada de Windows | Instale la rama fuente actual en un entorno Python separado. |

### Archivo de Windows

1. Abra el [paquete principal de Windows y descargas de activos](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main) y elija el archivo que coincida con su GPU. Para la familia de paquetes actual, busque la variante `20260718` NVIDIA, NVIDIA serie 50 o AMD/Intel. Si ya tiene una versión anterior que funciona, déjela en su propio directorio.
2. Extraiga el archivo completo a una carpeta local grabable como `C:\RVC\Mainline`. Deje espacio tanto para la descarga como para los archivos extraídos. En el Explorador de archivos, abra la carpeta resultante y busque el iniciador, `assets`, y el tiempo de ejecución de Python. Si ve un directorio adjunto más, ábralo.
3. Ejecute `go-webui.bat` si está presente. Los archivos más antiguos pueden llamarlo `go-web.bat`. Mantenga abierta la ventana de comandos y espere la dirección local. Si el navegador no se inicia, abra la dirección que se muestra en el terminal. Un valor predeterminado común es `http://127.0.0.1:7865`.
4. Confirme que la página se abre y que el terminal sigue funcionando. Mantenga el archivo intacto hasta que la [primera conversión](inference.md) tenga éxito.

### Rama fuente actual

> **Recomendado en Windows:** descarga el [paquete de Windows listo para usar](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main) para tu GPU. Se desaconseja instalar desde el código fuente para la mayoría de usuarios porque requiere configurar Python y sus dependencias manualmente.

Descargue y extraiga el [ZIP fuente principal](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/archive/refs/heads/main.zip). Abra una terminal en el directorio que contiene `webui.py` y los archivos de requisitos. La configuración de origen siguiente se aplica a la rama Python 3.12. Ejecute cada fragmento de ese directorio utilizando un intérprete Python 3.12 de 64 bits.

**Windows PowerShell**

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip setuptools wheel
```

Si PowerShell bloquea el script de activación, abra el símbolo del sistema en el mismo directorio y ejecute `.venv\Scripts\activate.bat`. En Windows, coloque [ffmpeg.exe](https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/ffmpeg.exe?download=true) y [ffprobe.exe](https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/ffprobe.exe?download=true) junto a `webui.py`.

**Ubuntu 24.04**

```bash
sudo apt update
sudo apt install python3.12-venv python3.12-dev ffmpeg unzip libsndfile1 libportaudio2
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip setuptools wheel
```

Elija **un** conjunto de dependencias. Los nombres de archivo contienen `requirments` como se escribe en el repositorio. Ejecute el bloque correspondiente de arriba a abajo.

**CPU, AMD o Intel**

```text
python -m pip install -r requirments_cpu_py312.txt
```

**NVIDIA RTX 50 series**

```text
python -m pip install torch==2.7.1+cu128 torchaudio==2.7.1+cu128 --index-url https://download.pytorch.org/whl/cu128 --extra-index-url https://pypi.org/simple
python -m pip install -r requirments_cu128_py312.txt
```

**Tarjetas NVIDIA antiguas compatibles**

```text
python -m pip install torch==2.7.1+cu118 torchaudio==2.7.1+cu118 --index-url https://download.pytorch.org/whl/cu118 --extra-index-url https://pypi.org/simple
python -m pip install -r requirments_cu118_py312.txt
```

Compruebe qué intérprete y compilación de Torch está utilizando el terminal:

```text
python -c "import sys, torch; print(sys.executable); print(torch.__version__); print(torch.cuda.is_available())"
```

Espere que la ruta del intérprete contenga `.venv`. La disponibilidad de CUDA debe ser `True` para que funcione la inferencia de NVIDIA CUDA. Las instalaciones de CPU y DirectML pueden mostrar `False` en esta verificación CUDA.

Instale la característica compartida y los modelos de tono antes de su primera conversión:

```text
python -m pip install huggingface_hub
hf download lj1995/VoiceConversionWebUI --include "hubert_base/*" --local-dir assets
hf download lj1995/VoiceConversionWebUI rmvpe.pt --local-dir assets/rmvpe
```

> Los checkpoints HuBERT genéricos no se recomiendan como codificador predeterminado para conversión de voz. Se entrenan para representar el habla y pueden conservar el timbre de origen en el audio convertido. Usa el codificador previsto por el modelo RVC, como ContentVec si se entrenó con él.

Las configuraciones de Windows DirectML que usan el modelo de tono ONNX también necesitan `hf download lj1995/VoiceConversionWebUI rmvpe.onnx --local-dir assets/rmvpe`. La [guía de formación](training.md) enumera los recursos de formación adicionales.

Ejecute `python webui.py` desde el mismo directorio. El codificador de funciones debe ser una carpeta llamada `assets/hubert_base` que contenga la configuración, la configuración de preprocesamiento y el archivo de peso. Si instaló un archivo heredado, mantenga juntos los archivos incluidos y las convenciones de nomenclatura.

## Si la WebUI no se abre

| Lo que ve | Qué verificar primero |
| --- | --- |
| Sin pestaña del navegador | Lea las últimas líneas en la terminal y copie la URL local real. Si el puerto predeterminado está ocupado, una compilación puede elegir otro. |
| El lanzador se abre y se cierra inmediatamente | Ejecútelo desde un símbolo del sistema existente dentro de la carpeta extraída para que pueda leer el primer error. Verifique que la extracción haya finalizado antes de cambiar las dependencias. |
| `ModuleNotFoundError` en una instalación de origen | Confirme que inició desde el entorno virtual utilizado para la instalación. Complete la instalación de requisitos coincidentes. |
| CUDA no está disponible en una configuración de NVIDIA | Verifique el modelo de GPU, el controlador y la rueda de la antorcha juntos. Un sistema RTX serie 50 necesita la construcción correspondiente. |
| Faltan HuBERT, RMVPE o FFmpeg | Verifique las carpetas de activos y las rutas ejecutables anteriores. Vuelva a intentarlo con un WAV local simple después de corregir el archivo que falta. |

Cuando se abra la interfaz, continúe con [su primera conversión de archivo](inference.md).
