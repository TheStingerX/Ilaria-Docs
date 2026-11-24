# RVC Studio · Instalación

[GitHub](https://github.com/xenophidiadae/RVCStudio) · [Versión consultada](https://github.com/xenophidiadae/RVCStudio/tree/6cccb75833ef7937bfb6da9ce8f21211f0ab526e)

## Windows

RVC Studio es una aplicación de escritorio local con Avalonia para RVC en tiempo real. Instala .NET 10 SDK, Python 3.10–3.12 y Git. Comprueba Python y curl.exe en PowerShell. Usa PortAudio. Para GPU NVIDIA hacen falta controladores y bibliotecas CUDA/cuDNN compatibles. Ejecuta el instalador y el proyecto desde la raíz.

~~~powershell
.\setup.ps1
dotnet run --project RVCStudio/RVCStudio.csproj
~~~

## Linux y recursos compartidos

En Linux instala .NET 10 SDK, Python con venv, PortAudio, curl y sha256sum. El instalador crea el conversor de la plataforma, descarga unos 707 MiB de modelos ContentVec/RMVPE y comprueba sus hashes. Ejecuta el instalador en el sistema y arquitectura de destino. ONNX recurre a CPU si CUDA no se inicia.

~~~bash
chmod +x setup.sh
./setup.sh
dotnet run --project RVCStudio/RVCStudio.csproj
~~~

[Uso y resolución de problemas](usage.md)
