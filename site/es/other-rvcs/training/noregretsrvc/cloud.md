# NoRegretsRVC · Cloud

NoRegretsRVC Beta 0.1.0 prepara flujos de Applio desde una interfaz web y genera notebooks.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Beta 0.1.0](https://github.com/HunterThatsMe/NoRegretsRVC/releases/tag/v0.1.0) · [Kaggle notebook](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/NoRegretsRVC_Kaggle.ipynb)

## Kaggle

Exporta el `.ipynb` e impórtalo en un notebook privado de Kaggle. Revisa las celdas. Activa GPU e internet si hay descargas, ejecuta primero la instalación y confirma la ruta de los datos.

Protege las credenciales y el enlace del túnel. Descarga el modelo y cualquier checkpoint antes de detener la sesión.

[Kaggle](https://www.kaggle.com/code)

## Recursos y recuperación en Kaggle

La WebUI detecta datasets en `/kaggle/input`. Turbo es opcional. La comprobación previa busca WAV, `.npy` y `filelist.txt`. El tiempo estimado usa el reloj del navegador. Verifica el `.pth` recuperado y guarda los checkpoints de reanudación.

## Dual T4 y lote efectivo

La beta 0.1.0 elimina la paridad con Applio en una GPU. Con dos GPU, los lotes de 2 y 4 por GPU equivalen a 4 y 8 efectivos.

Si no se detecta un conjunto de datos, la ruta queda vacía. La ETA filtra calentamiento y guardado. El monitor corrige el total de épocas y las marcas duplicadas. Los archivos `.nr_*` salen de `logs/`.

[Instalación](installation.md) · [Uso](usage.md)
