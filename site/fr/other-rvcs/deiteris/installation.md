# Installer Deiteris w-okada Fork

[GitHub](https://github.com/Deiteris/voice-changer) · [Releases](https://github.com/Deiteris/voice-changer/releases)

**Deiteris w-okada Fork** est un fork communautaire reconnu de `w-okada/voice-changer` (VCClient) axé sur une latence réduite, un son plus propre, des correctifs de stabilité et des backends mis à jour pour NVIDIA (CUDA), AMD/Intel (DirectML) et Apple Silicon.

## 1. Télécharger la bonne version

Ouvrez la [page Releases de Deiteris](https://github.com/Deiteris/voice-changer/releases) et dépliez **Assets** :

| Matériel / OS | Paquet à télécharger | Notes |
| --- | --- | --- |
| **Windows + GPU NVIDIA** | Archive **CUDA** (souvent découpée en `.zip.001`, `.zip.002`, etc.) | Recommandé pour la latence la plus basse sur GeForce GTX/RTX. |
| **Windows + GPU AMD / Intel** | Archive **DML (DirectML)** | Utilise l'accélération DirectML (ou CPU sans GPU compatible). |
| **macOS (Apple Silicon / Intel)** | Build **macOS** (CoreML / CPU) | Consultez les notes de version pour Apple Silicon M1/M2/M3 vs Intel. |

## 2. Extraire et lancer (Windows)

1. Pour les archives CUDA découpées (`.zip.001`, `.zip.002`, ...), téléchargez **toutes les parties** dans le même dossier et extrayez à partir de **`.zip.001`** avec **7-Zip** ou **WinRAR**.
2. Extrayez dans un chemin simple et accessible en écriture sur votre disque principal (ex. `C:\VoiceTools\Deiteris-VC`). Évitez `Program Files`, `OneDrive` ou les caractères spéciaux.
3. Ouvrez le dossier extrait et lancez le script de démarrage (`start_http.bat` ou `MMVCServerSIO.exe`, selon la version).
4. **Attendez les poids initiaux** : laissez la console ouverte pendant le téléchargement des modèles de base au premier lancement.
5. Ouvrez l'adresse web locale affichée dans la console (généralement `http://localhost:7865` ou `http://127.0.0.1:18888`).

## 3. Prérequis : câble audio virtuel

Pour envoyer votre voix convertie vers **Discord, OBS, VRChat ou des jeux**, installez un câble audio virtuel (comme **VB-CABLE**) avant de configurer l'audio en direct :
1. Lancez l'installateur en Administrateur (`VBCABLE_Setup_x64.exe`).
2. **Redémarrez Windows** afin que les nouveaux périphériques virtuels soient reconnus.

Passez à [Router et régler Deiteris Fork](live-audio.md) pour configurer les périphériques, le chunk size et le pitch.
