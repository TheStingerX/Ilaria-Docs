# GPT-SoVITS

## Elige un flujo

Empieza con síntesis zero-shot usando una grabación, su transcripción y una frase nueva. El ajuste fino requiere clips etiquetados y produce dos archivos de pesos, GPT y SoVITS. Usa voces autorizadas y selecciona pesos de la misma familia.

## Instala y abre la WebUI

En Windows, descarga el paquete integrado desde el repositorio oficial, extráelo completo y abre `go-webui.bat` si está incluido. Abre la dirección local de la consola y mantenla abierta. Para instalar desde el código, crea un entorno Conda con Python 3.10 y usa el instalador de tu versión. Windows ofrece CUDA o CPU; Linux también documenta ROCm y macOS dispone de opciones MPS y CPU. Conserva las subcarpetas de `GPT_SoVITS/pretrained_models` y comprueba FFmpeg cuando falte.

## Genera la primera frase

1. Abre **1C-inference**, actualiza la lista de modelos si hace falta y abre la interfaz TTS.
2. Selecciona pesos GPT y SoVITS compatibles. Usa una grabación breve de una sola persona, sin música. Las interfaces antiguas suelen pedir entre 3 y 10 segundos; aplica el intervalo que muestre tu versión.
3. Introduce la transcripción exacta y su idioma. Escribe el texto nuevo en el otro campo y elige su idioma por separado.
4. Genera una frase corta y escucha el principio, el final y las pausas. Divide textos largos por frases y cambia un ajuste cada vez.

## Prepara los datos

1. Guarda los originales y separa las grabaciones de prueba. Recorta una muestra con **Audio Slicer** y escucha los cortes antes de procesar todo el corpus.
2. En ASR, usa las grabaciones recortadas como entrada y selecciona un reconocedor adecuado. Abre el archivo `.list` generado y corrige los textos en el editor de etiquetas.
3. Comprueba que cada ruta existe y guarda las correcciones antes de formatear.

~~~text
audio/clip01.wav|speaker01|en|This is the first recording.
~~~

## Formatea y entrena

1. En **1A-Dataset formatting**, elige la familia, un nombre de experimento y el `.list` revisado. Confirma que el registro no muestra errores de archivos.
2. En **1B-Fine-tuned training**, usa el mismo experimento y entrena SoVITS y GPT por separado si solo tienes una GPU. Empieza con los valores predeterminados y deja DPO desactivado para la primera comparación.
3. Actualiza los modelos y escucha los checkpoints con frases reservadas. Guarda juntos el GPT `.ckpt`, el SoVITS `.pth`, la versión y las etiquetas.

## Solución de problemas

Si la página no abre, revisa la consola. Si faltan pesos, confirma la carpeta y la familia. Si el texto se repite, comprueba la transcripción y divide frases largas. Si se agota la VRAM, reduce el lote y ejecuta las etapas por separado.

[GitHub · RVC-Boss](https://github.com/RVC-Boss/GPT-SoVITS)
