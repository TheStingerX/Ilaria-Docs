# RVC Studio · Installation

[GitHub](https://github.com/xenophidiadae/RVCStudio) · [Version consultée](https://github.com/xenophidiadae/RVCStudio/tree/6cccb75833ef7937bfb6da9ce8f21211f0ab526e)

## Windows

RVC Studio est une application locale Avalonia pour RVC en temps réel. Installez le SDK .NET 10, Python 3.10–3.12 et Git. Vérifiez Python et curl.exe dans PowerShell. L’application utilise PortAudio. L’accélération NVIDIA exige des pilotes et bibliothèques CUDA/cuDNN compatibles. Depuis la racine, exécutez le script puis lancez le projet.

~~~powershell
.\setup.ps1
dotnet run --project RVCStudio/RVCStudio.csproj
~~~

## Linux et ressources communes

Sous Linux, installez le SDK .NET 10, Python avec venv, PortAudio, curl et sha256sum. Le script compile le convertisseur pour la plateforme, télécharge environ 707 Mio de modèles ContentVec/RMVPE et vérifie leurs empreintes. Exécutez-le sur le système et l’architecture cibles. ONNX revient au CPU si CUDA échoue.

~~~bash
chmod +x setup.sh
./setup.sh
dotnet run --project RVCStudio/RVCStudio.csproj
~~~

[Utilisation et dépannage](usage.md)
