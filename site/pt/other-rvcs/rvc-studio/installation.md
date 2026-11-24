# RVC Studio · Instalação

[GitHub](https://github.com/xenophidiadae/RVCStudio) · [Versão consultada](https://github.com/xenophidiadae/RVCStudio/tree/6cccb75833ef7937bfb6da9ce8f21211f0ab526e)

## Windows

O RVC Studio é uma aplicação local em Avalonia para RVC em tempo real. Instala .NET 10 SDK, Python 3.10–3.12 e Git. Confirma Python e curl.exe no PowerShell. A aplicação usa PortAudio. A aceleração NVIDIA exige controladores e bibliotecas CUDA/cuDNN compatíveis. Na raiz, executa a configuração e abre o projeto.

~~~powershell
.\setup.ps1
dotnet run --project RVCStudio/RVCStudio.csproj
~~~

## Linux e recursos partilhados

No Linux, instala .NET 10 SDK, Python com venv, PortAudio, curl e sha256sum. A configuração compila o conversor para a plataforma, descarrega cerca de 707 MiB de modelos ContentVec/RMVPE e verifica os hashes. Executa-a no sistema e arquitetura de destino. O ONNX recorre à CPU se o CUDA falhar.

~~~bash
chmod +x setup.sh
./setup.sh
dotnet run --project RVCStudio/RVCStudio.csproj
~~~

[Utilização e resolução de problemas](usage.md)
