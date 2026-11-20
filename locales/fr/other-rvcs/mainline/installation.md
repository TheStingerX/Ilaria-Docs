---
label: "Installez et ouvrez"
icon: ":toolbox:"
order: 40
permalink: /ilaria-rvc/mainline/installation/
description: "RVC WebUI (Mainline - Original RVC) est l'interface utilisateur Web de conversion vocale basée sur la récupération en amont. Utilisez son interface de..."
---

# Installer RVC WebUI (Mainline - Original RVC)

[GitHub](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI)

RVC WebUI (Mainline - Original RVC) est l'interface utilisateur Web de conversion vocale basée sur la récupération en amont. Utilisez son interface de navigateur pour la conversion de fichiers et la formation. Pour la conversion du microphone, utilisez l'interface de bureau distincte décrite dans le [guide en temps réel](realtime.md).

## Choisissez une voie d'installation

| Votre configuration | Quoi utiliser |
| --- | --- |
| Windows et un GPU pris en charge | Commencez avec une archive Windows prédéfinie correspondante. C'est le chemin le plus court. |
| Windows et un GPU NVIDIA RTX série 50 | Utilisez un package explicitement marqué pour la série 50 ou la configuration source avec la version CUDA 12.8 Torch. Les anciennes archives NVIDIA peuvent démarrer mais échouer lorsqu'elles tentent d'exécuter des opérations GPU. |
| Windows et un GPU AMD ou Intel | Choisissez l'archive AMD/Intel correspondante. La prise en charge de DirectML dépend de la version et du fonctionnement. Testez d’abord la conversion du fichier. |
| Ubuntu ou une configuration Windows personnalisée | Installez la branche source actuelle dans un environnement Python séparé. |

### Archive Windows

1. Ouvrez le [Package Windows principal et téléchargements d'actifs](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main) et choisissez l'archive correspondant à votre GPU. Pour la famille de packages actuelle, recherchez la variante `20260718` NVIDIA, NVIDIA série 50 ou AMD/Intel. Si vous disposez déjà d’une ancienne version qui fonctionne, laissez-la dans son propre répertoire.
2. Extrayez l'intégralité de l'archive dans un dossier local accessible en écriture tel que `C:\RVC\Mainline`. Prévoyez de l'espace pour le téléchargement et les fichiers extraits. Dans l'Explorateur de fichiers, ouvrez le dossier résultant et recherchez le lanceur, `assets`, et le runtime Python. Si vous voyez un autre répertoire englobant, ouvrez-le.
3. Exécutez `go-webui.bat` si présent. Les archives plus anciennes peuvent l'appeler `go-web.bat`. Gardez la fenêtre de commande ouverte et attendez l'adresse locale. Si le navigateur ne démarre pas, ouvrez l'adresse affichée dans le terminal. Une valeur par défaut courante est `http://127.0.0.1:7865`.
4. Confirmez que la page s'ouvre et que le terminal reste en cours d'exécution. Conservez l'archive intacte jusqu'à ce que la [première conversion](inference.md) réussisse.

### Branche source actuelle

> **Recommandé sous Windows :** téléchargez [l’archive Windows prête à l’emploi](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main) adaptée à votre GPU. L’installation à partir du code source est déconseillée à la plupart des utilisateurs, car elle exige de configurer Python et ses dépendances manuellement.

Téléchargez et extrayez le [ZIP source principal](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/archive/refs/heads/main.zip). Ouvrez un terminal dans le répertoire contenant `webui.py` et les fichiers d'exigences. La configuration source ci-dessous s'applique à la branche Python 3.12. Exécutez chaque extrait de ce répertoire à l'aide d'un interpréteur Python 3.12 64 bits.

**Windows PowerShell**

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip setuptools wheel
```

Si PowerShell bloque le script d'activation, ouvrez l'invite de commande dans le même répertoire et exécutez `.venv\Scripts\activate.bat`. Sous Windows, placez [ffmpeg.exe](https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/ffmpeg.exe?download=true) et [ffprobe.exe](https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/ffprobe.exe?download=true) à côté de `webui.py`.

**Ubuntu 24.04**

```bash
sudo apt update
sudo apt install python3.12-venv python3.12-dev ffmpeg unzip libsndfile1 libportaudio2
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip setuptools wheel
```

Choisissez **un** ensemble de dépendances. Les noms de fichiers contiennent `requirments` comme orthographié dans le référentiel. Exécutez le bloc correspondant de haut en bas.

**CPU, AMD ou Intel**

```text
python -m pip install -r requirments_cpu_py312.txt
```

**Série NVIDIA RTX 50**

```text
python -m pip install torch==2.7.1+cu128 torchaudio==2.7.1+cu128 --index-url https://download.pytorch.org/whl/cu128 --extra-index-url https://pypi.org/simple
python -m pip install -r requirments_cu128_py312.txt
```

**Anciennes cartes NVIDIA prises en charge**

```text
python -m pip install torch==2.7.1+cu118 torchaudio==2.7.1+cu118 --index-url https://download.pytorch.org/whl/cu118 --extra-index-url https://pypi.org/simple
python -m pip install -r requirments_cu118_py312.txt
```

Vérifiez quel interpréteur et quelle version Torch le terminal utilise :

```text
python -c "import sys, torch; print(sys.executable); print(torch.__version__); print(torch.cuda.is_available())"
```

Attendez-vous à ce que le chemin de l'interprète contienne `.venv`. La disponibilité de CUDA doit être de `True` pour que l'inférence NVIDIA CUDA fonctionne. Les installations CPU et DirectML peuvent afficher `False` dans cette vérification CUDA.

Installez la fonctionnalité partagée et les modèles de pitch avant votre première conversion :

```text
python -m pip install huggingface_hub
hf download lj1995/VoiceConversionWebUI --include "hubert_base/*" --local-dir assets
hf download lj1995/VoiceConversionWebUI rmvpe.pt --local-dir assets/rmvpe
```

> Les checkpoints HuBERT génériques sont déconseillés comme encodeur par défaut pour la conversion vocale. Entraînés pour représenter la parole, ils peuvent conserver des informations sur le timbre de la voix source dans le résultat. Utilisez l’encodeur attendu par le modèle RVC, par exemple ContentVec si le modèle a été entraîné avec lui.

Les configurations Windows DirectML qui utilisent le modèle de pitch ONNX ont également besoin de `hf download lj1995/VoiceConversionWebUI rmvpe.onnx --local-dir assets/rmvpe`. Le [guide de formation](training.md) répertorie les atouts complémentaires de la formation.

Exécutez `python webui.py` à partir du même répertoire. L'encodeur de fonctionnalités doit être un dossier nommé `assets/hubert_base` contenant la configuration, la configuration de prétraitement et le fichier de poids. Si vous avez installé une archive héritée, conservez ensemble ses fichiers regroupés et ses conventions de dénomination.

## Si le WebUI ne s'ouvre pas

| Ce que vous voyez | Que vérifier en premier |
| --- | --- |
| Aucun onglet de navigateur | Lisez les dernières lignes dans le terminal et copiez l'URL locale réelle. Si le port par défaut est occupé, une build peut en choisir un autre. |
| Le lanceur s'ouvre et se ferme immédiatement | Exécutez-le à partir d’une invite de commande existante dans le dossier extrait afin de pouvoir lire la première erreur. Vérifiez que l'extraction est terminée avant de modifier les dépendances. |
| `ModuleNotFoundError` sur une installation source | Confirmez que vous avez lancé depuis l'environnement virtuel utilisé pour l'installation. Terminez l’installation des exigences correspondantes. |
| CUDA n'est pas disponible sur une configuration NVIDIA | Vérifiez ensemble le modèle de GPU, le pilote et la molette Torch. Un système RTX série 50 a besoin de la version correspondante. |
| HuBERT, RMVPE ou FFmpeg manquants | Vérifiez les dossiers d'actifs et les chemins d'exécutables ci-dessus. Réessayez avec un simple WAV local après avoir corrigé le fichier manquant. |

Lorsque l'interface s'ouvre, continuez avec [votre première conversion de fichier](inference.md).
