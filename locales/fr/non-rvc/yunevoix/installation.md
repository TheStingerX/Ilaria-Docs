---
label: "Installer et Mettre à Jour"
icon: ":cd:"
order: 98
permalink: /fr/non-rvc/yunevoix/installation/
description: "YuneVoix est une application Windows portable : rien n'est installé dans Windows, et tous les paramètres, voix, journaux et licences restent à côté de YuneVoix.exe."
---
# Installer et mettre à jour YuneVoix

[Télécharger sur Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Premium)](https://ko-fi.com/yunevoix)

YuneVoix est une application Windows portable : rien n'est installé dans Windows, et tous les paramètres, voix, journaux et licences restent à côté de `YuneVoix.exe`.

## 1. Identifier votre GPU et télécharger le bon pack (v0.7.1)

1. Vérifiez votre carte graphique dédiée dans le **Gestionnaire des tâches Windows → Performances → GPU** (NVIDIA GeForce RTX vs. AMD Radeon RX 7000+).
2. Téléchargez la version **v0.7.1** correspondante sur [Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) (pour **PREMIUM**, l'activation nécessite un fichier `license.yvl` obtenu en privé via [Ko-fi](https://ko-fi.com/yunevoix) ou message privé) :
   - **BASIC (Gratuit)** :
     - [Télécharger YuneVoix BASIC NVIDIA v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_BASIC_NVIDIA_v0.7.1.zip?download=true) - pour GPU NVIDIA (8 Go+ VRAM, 12 Go recommandés).
     - [Télécharger YuneVoix BASIC AMD v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_BASIC_AMD_v0.7.1.zip?download=true) - pour GPU AMD Radeon RX 7000+ (12 Go+ VRAM, 16 Go recommandés).
   - **PREMIUM** *(nécessite `license.yvl`)* :
     - [Télécharger YuneVoix PREMIUM NVIDIA v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_PREMIUM_NVIDIA_v0.7.1.zip?download=true) - pour GPU NVIDIA.
     - [Télécharger YuneVoix PREMIUM AMD v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_PREMIUM_AMD_v0.7.1.zip?download=true) - pour GPU AMD Radeon RX 7000+.
   > **Important :** Les packs NVIDIA et AMD sont distincts et ne sont pas interchangeables. Ne déplacez et ne supprimez **pas** les dossiers fournis à côté de `YuneVoix.exe` :
   > - **Pack NVIDIA :** gardez **`models`** et **`cuda`** à côté de `YuneVoix.exe`.
   > - **Pack AMD :** gardez **`models`** et **`cache`** à côté de `YuneVoix.exe`.
3. Notez le mot de passe de l'archive publié avec la sortie : **`yunevoix`** (conservé ici tel que documenté par le mainteneur du projet).

## 2. Extraire l'archive

L'archive ZIP est chiffrée en **AES-256**, ce que l'Explorateur Windows ne sait pas ouvrir (il affichera que le ZIP est invalide).

1. Installez ou ouvrez **7-Zip** (`7-zip.org`) ou **WinRAR**.
2. Extrayez toute l'archive avec le mot de passe `yunevoix` dans un dossier local accessible en écriture comme `D:\YuneVoix`.
   - **N'extravez pas** dans `Program Files` ni dans `OneDrive`.

## 3. Premier lancement, SmartScreen et vérification du moteur

1. Ouvrez le dossier extrait et lancez `YuneVoix.exe`.
2. Vérifiez que l'archive provient bien du [dépôt officiel Hugging Face de YUNE](https://huggingface.co/JohnBlvck/YUNE/tree/main). Comme l'exécutable n'est pas encore signé numériquement, Windows SmartScreen peut afficher *"Windows a protégé votre ordinateur"*. Cliquez sur **Informations complémentaires → Exécuter quand même** après avoir confirmé la source.
   - Si votre antivirus signale un fichier, vérifiez **Sécurité Windows → Historique de protection** et contrôlez l'origine du fichier avant de l'autoriser ; ne désactivez **pas** Windows Defender ni la protection antivirus globalement.
3. **Attendez la préparation initiale** :
   - Le tout premier lancement décompresse des bibliothèques une seule fois et prend plus de temps.
   - **AMD :** utilise **DirectML** sur le GPU dédié par défaut dans la v0.7.1 (sans téléchargement Windows Update ni compilation de modèles). Ce n'est que si vous passez `Settings → General → "AMD graphics engine"` sur le mode expérimental **MIGraphX** (après redémarrage) que la première compilation des modèles peut prendre **10-30 minutes**.
   - Vérifiez la ligne d'état LIVE ou exécutez `YuneVoix.exe --check` (`check.txt`) pour confirmer quel moteur graphique et quel GPU sont actifs.
4. Vous pouvez changer la langue de l'interface en haut de la fenêtre (**English, Deutsch, Italiano, Español, Polski, Português**).

## 4. Mettre à jour ou passer de BASIC à PREMIUM

Les licences, voix et paramètres de **v0.6.0 / v0.7.0** continuent de fonctionner dans la **v0.7.1**. Pour mettre à jour vers une nouvelle version ou passer de BASIC à PREMIUM sans perdre vos voix ni vos réglages :

1. Extrayez la nouvelle version dans un **nouveau** dossier (n'écrasez pas encore l'ancien).
2. Copiez ces fichiers et dossiers depuis l'ancien dossier YuneVoix vers le nouveau :
   - `models\yune\voices` (vos voix enregistrées)
   - `settings.json` et `yune.json` (votre configuration)
   - `my_voice.yvoice`, s'il existe (l'échantillon de votre propre voix utilisé par **FlowEdit 3+1** en LIVE)
   - `license.yvl` (pour PREMIUM)
3. Lancez le nouveau `YuneVoix.exe` et vérifiez que tout fonctionne avant de supprimer l'ancien dossier.

> **Mise à jour depuis v0.6.0 :** Si vous aviez défini un échantillon de votre propre voix avant la v0.7.0, resélectionnez-le une fois dans `Settings → Voice & Timbre → "Sample of your voice…"` ; sinon **FlowEdit 3+1** repasse sur **Learned 4 steps** en LIVE. Cela est nécessaire car la v0.7.0+ a besoin de cette resélection pour lier `my_voice.yvoice` à FlowEdit et à la force du timbre.

Pour désinstaller complètement YuneVoix, supprimez simplement son dossier.

Étape suivante : [Voice Bank et Utilisation en Direct](usage.md).
