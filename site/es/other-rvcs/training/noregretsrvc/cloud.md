# NoRegretsRVC · Cloud

NoRegretsRVC Beta 0.0 prepara flujos de Applio desde una interfaz web y genera notebooks.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Kaggle notebook](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/NoRegretsRVC_Kaggle.ipynb)

## Kaggle

Exporta el `.ipynb` e impórtalo en un notebook privado de Kaggle. Revisa las celdas. Activa GPU e internet si hay descargas, ejecuta primero la instalación y confirma la ruta de los datos.

Protege las credenciales y el enlace del túnel. Descarga el modelo y cualquier checkpoint antes de detener la sesión.

[Kaggle](https://www.kaggle.com/code)

## Recursos y recuperación en Kaggle

La WebUI detecta datasets en `/kaggle/input`. La paridad Dual T4 intenta conservar los pasos de Applio con lotes de al menos 4 y menos de 300 épocas. Turbo es opcional. La comprobación previa busca WAV, `.npy` y `filelist.txt`. El tiempo estimado usa el reloj del navegador. Verifica el `.pth` recuperado y guarda los checkpoints de reanudación.

[Instalación](installation.md) · [Uso](usage.md)
