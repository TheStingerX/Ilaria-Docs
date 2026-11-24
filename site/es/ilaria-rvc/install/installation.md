# Instalación y actualizaciones

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · El paquete completo de Windows es la versión 2.4.7. El ZIP de actualización 2.5.0 excluye el entorno de ejecución y los pesos. De la 2.4.2 a la 2.4.8, usa **Other → Update Ilaria RVC → Check for updates → Download and restart**.

[GitHub](https://github.com/TheStingerX/Ilaria-RVC) · [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC)

[Descarga Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

## Instalar el paquete de Windows

Descargue la compilación de NVIDIA compatible desde [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC). Extraiga todo el archivo en una carpeta local grabable y ejecute `RUN_ILARIA_RVC.bat` allí. El iniciador y el tiempo de ejecución incluido deben permanecer juntos. Si no se abre ninguna pestaña del navegador, intente con `http://127.0.0.1:6969` en la misma PC.

## Antes del primer lanzamiento

El ZIP completo de Windows pesa aproximadamente 5,00 GB. Deje espacio tanto para el archivo como para los archivos extraídos. Extráigalo a una nueva carpeta local donde pueda escribir archivos. Mantenga juntos el iniciador, el tiempo de ejecución y los activos. Se incluyen ContentVec y RMVPE. Los codificadores opcionales están disponibles en **Otros → Descargar integradores**.

## ¿Qué tiempo de ejecución CUDA utilizará Ilaria RVC?

Abra **Administrador de tareas → Rendimiento → GPU** y lea el nombre exacto del modelo. Compárelo con la [tabla de compatibilidad de GPU](gpu-compatibility.md). La siguiente versión de CUDA se refiere al entorno PyTorch que utiliza la aplicación. El controlador NVIDIA es un componente independiente del sistema y debe ser compatible con ese entorno.

| GPU presentes en la PC | Tiempo de ejecución | Qué esperar |
| --- | --- | --- |
| GeForce GTX 16 o RTX 20, 30, 40 o 50 | PyTorch 2.10.0 con CUDA 12.8 | El ZIP completo incluye este tiempo de ejecución. Extráelo y ejecuta el lanzador. En RTX 50, PyTorch ya está incluido y listo para usar con un controlador NVIDIA compatible. |
| Solo NVIDIA Maxwell, Pascal o Volta | PyTorch 2.10.0 con CUDA 12.6 | En el primer lanzamiento, el iniciador descarga y verifica el tiempo de ejecución anterior. Lo mantiene en `runtime-cu126` y lo reutiliza en lanzamientos posteriores. Deje el iniciador abierto y permita el acceso a Internet y espacio en disco. |
| No hay una GPU NVIDIA local adecuada | GPU NVIDIA remota | [Ilaria RVC en la nube](../cloud/cloud.md) · [Kaggle](../cloud/kaggle.md) · [Google Colab](../cloud/colab.md) · [Lightning AI Studio](../cloud/lightning-ai.md) |

Si tiene más de una GPU, lea el registro del iniciador para ver qué tiempo de ejecución se inició realmente. La ruta CUDA 12.6 descrita anteriormente se aplica cuando todas las GPU NVIDIA en la PC son de familias más antiguas.

### Por qué no debes actualizar PyTorch manualmente

Ilaria RVC incluye una combinación probada de **PyTorch (2.10.0)**, **CUDA (12.8 o 12.6)**, `torchaudio`, `torchvision`, `faiss` y dependencias de audio. **No** ejecutes `pip install --upgrade torch` manualmente:

- Actualizar PyTorch por tu cuenta puede romper `torchaudio`, `fairseq`, `onnxruntime` o extensiones compiladas.
- Versiones más nuevas pueden eliminar soporte para GPUs antiguas (Maxwell, Pascal, Volta) o causar UnpicklingError.
- Espera siempre una actualización oficial de Ilaria RVC en lugar de modificar el runtime portátil.

## Comprueba que la aplicación se inició correctamente

1. Ejecute `RUN_ILARIA_RVC.bat` desde la carpeta extraída. Espere a que se abra la interfaz. Si se está descargando el tiempo de ejecución heredado, marque `cu126-runtime-install.log` para ver el progreso.
2. Si la ventana se cierra o la interfaz nunca se abre, ejecute `RUN_ILARIA_RVC_LOGS.bat` e inspeccione el primer error. Compruebe si menciona la GPU, el controlador, el acceso a la descarga o el espacio libre en disco. Una página del navegador en blanco puede deberse a un fallo del iniciador.
3. Una vez que se abra la interfaz, convierta un WAV corto y limpio con un modelo de inferencia compatible conocido. Verifique el resultado antes de ejecutar un lote grande o comenzar a entrenar. Consulte [Inferencia única y por lotes](../convert/inference.md).

Las pruebas de cómputo y retropropagación y la carga de ContentVec se verificaron en un RTX 4070. Se espera compatibilidad con otras tarjetas a partir de su arquitectura y selección de tiempo de ejecución, y no se ha garantizado modelo por modelo.

## Actualiza a la 2.4.7

Descarga el ZIP completo (`ILARIA_RVC-2.4.7.zip`), extráelo en una carpeta nueva y ejecuta `RUN_ILARIA_RVC.bat`.

Conserva la instalación anterior como copia de seguridad. Copia modelos a models/, datos a app/datasets/ y experimentos completos a app/logs/. El actualizador de la 2.3.0 usa la estructura anterior.

[GPU compatibles](gpu-compatibility.md)

### Actualizar desde 2.4.2 - 2.4.8

Si ya usas una versión entre **2.4.2** y **2.4.8**, abre **Other → Update Ilaria RVC → Check for updates** y elige **Download and restart**. Desde **2.4.0** o **2.4.1**, actualiza primero a **2.4.2** o extrae el ZIP completo de **2.4.7**.
