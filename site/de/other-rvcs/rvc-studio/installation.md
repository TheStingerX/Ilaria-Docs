# RVC Studio · Installation

[GitHub](https://github.com/xenophidiadae/RVCStudio) · [Geprüfte Version](https://github.com/xenophidiadae/RVCStudio/tree/6cccb75833ef7937bfb6da9ce8f21211f0ab526e)

## Windows

RVC Studio ist eine lokale Avalonia-Desktop-App für Echtzeit-RVC. Installiere .NET 10 SDK, Python 3.10–3.12 und Git. Prüfe Python und curl.exe in PowerShell. Die App verwendet PortAudio. Für NVIDIA-Beschleunigung brauchst du passende Treiber und CUDA/cuDNN. Starte Setup und Projekt im Repository-Stammordner.

~~~powershell
.\setup.ps1
dotnet run --project RVCStudio/RVCStudio.csproj
~~~

## Linux und gemeinsame Ressourcen

Installiere unter Linux .NET 10 SDK, Python mit venv, PortAudio, curl und sha256sum. Das Setup baut den plattformspezifischen Konverter, lädt rund 707 MiB ContentVec/RMVPE-Modelle und prüft deren Hashes. Nutze das Zielsystem und die Zielarchitektur. ONNX weicht auf CPU aus, wenn CUDA nicht startet.

~~~bash
chmod +x setup.sh
./setup.sh
dotnet run --project RVCStudio/RVCStudio.csproj
~~~

[Nutzung und Fehlerbehebung](usage.md)
