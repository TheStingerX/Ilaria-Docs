# RVC Studio · Installazione

[GitHub](https://github.com/xenophidiadae/RVCStudio) · [Versione consultata](https://github.com/xenophidiadae/RVCStudio/tree/6cccb75833ef7937bfb6da9ce8f21211f0ab526e)

## Windows

RVC Studio è un’app desktop locale in Avalonia per RVC in tempo reale. Installa .NET 10 SDK, Python 3.10–3.12 e Git. Verifica che Python e curl.exe siano disponibili in PowerShell. L’app usa PortAudio. L’accelerazione NVIDIA richiede driver e librerie CUDA/cuDNN compatibili. Dalla radice del progetto esegui il setup e avvia l’app.

~~~powershell
.\setup.ps1
dotnet run --project RVCStudio/RVCStudio.csproj
~~~

## Linux e risorse condivise

Su Linux installa .NET 10 SDK, Python con venv, PortAudio, curl e sha256sum. Il setup compila il convertitore per la piattaforma, scarica circa 707 MiB di modelli condivisi ContentVec/RMVPE e ne verifica gli hash. Esegui il setup sul sistema e sull’architettura di destinazione. Il backend ONNX passa alla CPU se CUDA non si inizializza.

~~~bash
chmod +x setup.sh
./setup.sh
dotnet run --project RVCStudio/RVCStudio.csproj
~~~

[Uso e risoluzione dei problemi](usage.md)
