---
label: "🩺 Dépannage"
order: 95
permalink: /troubleshooting/
description: "Dépannage RVC étape par étape pour débutants et experts : erreurs Windows/lancement, GPU/CUDA/DirectML, modèles, entraînement, micro en direct et Colab/Kaggle."
---
# Dépannage RVC

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

!!!tip
**Nouveau sur RVC ? Suivez ces 4 règles avant toute chose :**
1. **Utilisez un dossier court et simple** comme `C:\RVC` ou `D:\IlariaRVC`. Ne mettez jamais l'application dans `OneDrive`, `Program Files` ou un dossier avec des espaces, accents ou emojis.
2. **Extrayez toujours tout le ZIP** avant d'ouvrir quoi que ce soit. Ne lancez jamais un `.bat` depuis l'aperçu ZIP de WinRAR, 7-Zip ou Windows.
3. **Ne fermez jamais la fenêtre noire du terminal.** C'est elle qui fait tourner l'application et affiche la vraie erreur en cas de panne.
4. **Testez d'abord avec un clip `.wav` propre de 10 secondes.** Si l'app plante, copiez la **première** erreur de la console. Si elle tourne mais sonne mal, ne changez **qu'un réglage à la fois** sur ce même clip.
!!!

## Trouver votre problème rapidement

| Que se passe-t-il ? | Cause la plus probable | Où regarder |
| --- | --- | --- |
| La fenêtre noire s'ouvre et se ferme en 1 seconde | Lancé depuis le ZIP, bloqué par l'antivirus ou runtime manquant | [1. Lancement, Windows, Antivirus et Téléchargements](#1-lancement-windows-antivirus-et-téléchargements) |
| Le navigateur affiche une erreur de connexion ou une page blanche | L'app a planté au démarrage, mauvais port ou VPN/proxy sur `127.0.0.1` | [1. Lancement, Windows, Antivirus et Téléchargements](#1-lancement-windows-antivirus-et-téléchargements) |
| L'app est très lente ou affiche `CUDA out of memory` | CPU utilisé à la place du GPU, HAGS Windows activé ou batch/audio trop grand | [2. GPU, CUDA, AMD/Intel et Mémoire](#2-gpu-cuda-amdintel-et-mémoire) |
| Le modèle n'apparaît pas ou refuse de charger (`.pth` / `.index`) | Oubli de cliquer sur Refresh, ZIP non extrait, fichier corrompu ou mauvais fichier | [3. Modèles, Checkpoints et Index](#3-modèles-checkpoints-et-index) |
| La voix sonne comme un écureuil, un monstre, un robot ou votre propre voix | Mauvais Pitch (Transpose), audio bruité ou mauvais Pitch Extractor | [4. Qualité vocale, Pitch et Fichiers audio](#4-qualité-vocale-pitch-et-fichiers-audio) |
| L'entraînement s'arrête, plante ou exporte une voix muette | Clip vide ou silencieux dans le dataset, trop de workers CPU ou `Fresh Training` activé | [5. Prétraitement du Dataset et Entraînement](#5-prétraitement-du-dataset-et-entraînement) |
| Le micro a du retard, des coupures, de l'écho ou Discord ne vous entend pas | Fréquences différentes (`44100` vs `48000 Hz`), mauvais câble virtuel ou Krisp | [6. Voice Changer en direct, Micro et Discord](#6-voice-changer-en-direct-micro-et-discord) |
| Google Colab ou Kaggle échoue ou se déconnecte | Accélérateur GPU désactivé, quota atteint ou session expirée | [7. Notebooks Cloud (Colab et Kaggle)](#7-notebooks-cloud-colab-et-kaggle) |

## Test de base simple en 5 étapes

Si tout sonne faux ou si vous ne savez pas quel réglage a cassé l'audio, repartez sur un test propre :

1. **Préparez un clip propre :** Enregistrez 10 à 20 secondes d'une seule voix parlant clairement dans une pièce calme (sans musique ni écho). Enregistrez-le en `.wav` standard dans un dossier simple comme `C:\RVC\test.wav`.
2. **Choisissez un modèle fiable :** Sélectionnez un modèle `.pth` qui fonctionne à coup sûr. Laissez le fichier `.index` désactivé (`Index Rate = 0`) pour le premier test.
3. **Utilisez des réglages sûrs :**
   - **Pitch / Transpose :** `0` (même genre), `+12` (homme vers femme), `-12` (femme vers homme).
   - **Pitch Extractor :** `rmvpe` (meilleur équilibre vitesse/qualité).
   - **Effets / nettoyage optionnels :** Tous **DÉSACTIVÉS**.
4. **Convertissez et écoutez :** Enregistrez dans un dossier local normal (pas `OneDrive`). Si le lecteur du navigateur reste muet, téléchargez le fichier et ouvrez-le avec VLC ou Lecteur Windows Media.
5. **Changez une option à la fois :** Une fois le test propre réussi, activez le fichier `.index` (commencez vers `0.5` - `0.75`) ou ajustez le Pitch de `1` ou `2` demi-tons.

---

## Erreurs connues et solutions étape par étape

### 1. Lancement, Windows, Antivirus et Téléchargements

| Problème ou Erreur | Ce que cela signifie (en mots simples) | Comment le corriger |
| --- | --- | --- |
| **La fenêtre noire s'ouvre et se ferme aussitôt** | Vous avez lancé le script depuis l'aperçu ZIP, ou Python a planté dès le départ. | 1. Faites clic droit sur le `.zip` et extrayez tout le dossier d'abord.<br>2. Dans Ilaria RVC, lancez `RUN_ILARIA_RVC_LOGS.bat` pour garder la fenêtre ouverte et voir l'erreur. |
| **Antivirus / Windows Defender signale des fichiers `.bat`, `.exe` ou `.dll`** | Les paquets IA portables contiennent des lanceurs non signés ou binaires Python/PyTorch pouvant déclencher des faux positifs. | 1. **Ne désactivez jamais l'antivirus globalement** et n'excluez pas des dossiers entiers.<br>2. Vérifiez la source officielle (GitHub Releases / Hugging Face) et le hash SHA-256 ou signature.<br>3. Ouvrez **Sécurité Windows → Protection contre les virus et menaces → Historique de protection** (conservé 14 jours).<br>4. Préférez re-télécharger depuis la source officielle ou **arrêtez immédiatement** en cas de fichier suspect. |
| `WinError 10048` / `Address already in use` / port occupé | Une autre copie de RVC ou une autre application utilise déjà ce port (`6969` ou `7865`). | Fermez toutes les fenêtres noires ouvertes (ou terminez `python.exe` dans le **Gestionnaire des tâches**), puis relancez l'app une seule fois. |
| `[WinError 3]` / `[WinError 206]` (chemin introuvable / trop long) | Windows bloque si le chemin dépasse 260 caractères ou contient espaces, accents ou symboles (`()`, `[]`). | Déplacez l'app et les fichiers audio dans un chemin court comme `C:\RVC\`. Renommez dossiers et `.wav` avec uniquement lettres, chiffres et `_`. |
| `[WinError 2]` (au chargement/export audio) | `ffmpeg.exe` ou `ffprobe.exe` (l'outil qui lit l'audio) est manquant. | Vérifiez que `ffmpeg.exe` est dans le dossier de l'app (réextrayez le ZIP si Defender l'a supprimé). En installation manuelle, installez FFmpeg, ajoutez-le au `PATH` Windows et redémarrez le terminal. |
| `PermissionError: [Errno 13]` / `[WinError 5] Accès refusé` | Windows bloque l'écriture dans `Program Files`, `OneDrive` ou sur un fichier ouvert ailleurs. | Sortez l'app de `Program Files` et `OneDrive` vers `C:\RVC\`. Fermez tout lecteur ou éditeur utilisant déjà le fichier audio. |
| `Expecting value: line 1 column 1` ou page blanche | L'app a planté avant de répondre, mauvais port ou VPN/proxy bloquant les connexions locales. | Lisez la **première** erreur dans la fenêtre noire. Vérifiez l'adresse exacte affichée (`127.0.0.1:6969` pour Ilaria RVC, `127.0.0.1:7865` pour Gradio/Deiteris). Désactivez VPN/proxy pour `localhost` et `127.0.0.1`. |
| L'archive découpée échoue (`.zip.001`, `.zip.002`) | L'extracteur Windows ne gère pas les archives multi-parties ou une partie manque. | Mettez toutes les parties (`.001`, `.002`, etc.) dans le même dossier, installez **7-Zip**, faites clic droit **uniquement** sur `.001` et choisissez **7-Zip → Extraire ici**. |
| `ModuleNotFoundError: No module named 'fairseq'` | Installation manuelle sur Python 3.11+ ou sans outils de compilation C++. | Les débutants doivent utiliser le ZIP portable prêt à l'emploi. En installation manuelle, utilisez **Python 3.9 ou 3.10** et installez **Microsoft Visual Studio Build Tools** (*Développement Desktop en C++*). |
| `llvmlite.dll` / `OSError: [WinError 126]` / `.dll` manquante | Il manque les bibliothèques Visual C++ requises par les paquets IA Python. | Téléchargez et installez **Microsoft Visual C++ 2015-2022 Redistributable (x64)** depuis Microsoft, puis redémarrez votre PC. |
| `urllib.error` / `ConnectionResetError` / `SSLError` | Réseau, pare-feu ou VPN bloque le téléchargement automatique de `hubert_base.pt` ou `rmvpe.pt`. | Désactivez temporairement VPN ou pare-feu strict, ou téléchargez `hubert_base.pt` et `rmvpe.pt` manuellement dans `assets/hubert/` et `assets/rmvpe/`. |

### 2. GPU, CUDA, AMD/Intel et Mémoire

| Problème ou Erreur | Ce que cela signifie (en mots simples) | Comment le corriger |
| --- | --- | --- |
| **Tout est très lent (utilise le CPU au lieu du GPU)** | L'app ne voit pas votre carte graphique ou vous avez une version NVIDIA sur un GPU AMD/Intel. | 1. Utilisateurs NVIDIA : vérifiez les pilotes et que vous n'utilisez pas le GPU intégré.<br>2. Utilisateurs AMD/Intel : les builds CUDA n'utilisent pas votre GPU. Utilisez une version **DirectML** (YuneVoix, Deiteris DirectML, Mainline DirectML) ou un notebook cloud. |
| **PC lent, VRAM saturée ou voix saccadée (Windows 10/11)** | **HAGS** (Hardware-Accelerated GPU Scheduling) gère la file mémoire GPU : utile en général, il peut parfois créer une contention en IA + jeu. | HAGS n'est **pas** nocif et n'a pas à être désactivé partout. En cas de saccades inexpliquées, testez sa désactivation dans **Paramètres Windows → Système → Écran → Graphiques**, redémarrez et comparez avant/après ; réactivez-le si inchangé. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (conversion) | La mémoire vidéo est pleine à cause d'un fichier trop long ou d'un jeu/navigateur ouvert. | Activez **Split Audio** pour les longues pistes, fermez jeux et onglets lourds (ou désactivez l'accélération matérielle du navigateur) et coupez les effets superflus. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (entraînement) | Le **Batch Size** est trop grand pour la mémoire de votre GPU. | Baissez **Batch Size** (de `8` à `4`, `2` ou `1`). Désactivez "Cache dataset in GPU/VRAM" et fermez tout voice changer en direct avant d'entraîner. |
| `Torch not compiled with CUDA enabled` / `no kernel image is available` | La version CUDA de l'app ne correspond pas à votre génération de carte NVIDIA (ex. RTX 50 vs GTX 10). | Utilisez la bonne build : **Ilaria RVC** inclut **CUDA 12.8** pour GTX 16 / RTX 20-50 et télécharge automatiquement **CUDA 12.6** (`runtime-cu126`) pour Maxwell/Pascal/Volta. |
| `CUDA driver version is insufficient for CUDA runtime version` | Votre pilote NVIDIA est trop ancien pour le moteur IA. | Mettez à jour votre pilote NVIDIA via **NVIDIA App / GeForce Experience** ou le site NVIDIA, puis redémarrez. |
| `RuntimeError: CUDA error: an illegal memory access was encountered` | Le GPU a planté suite à un overclock/undervolt instable, surchauffe ou pilote incompatible. | Remettez tout overclock/undervolt à zéro dans MSI Afterburner, mettez à jour le pilote NVIDIA et réessayez. |
| `RuntimeError: expected scalar type Half but found Float` / `HalfTensor` | Le mode rapide `FP16` est activé mais votre GPU (série GTX 10, DirectML ou CPU) ne le supporte pas. | Allez dans les paramètres et désactivez **FP16** (passez en **FP32**). |
| `OSError: [WinError 1455]` (fichier d'échange trop petit) | Windows manque de Mémoire Virtuelle sur le disque lors du chargement de modèles ou de la création d'index. | Recherchez **Afficher les paramètres système avancés → Paramètres de performances → Avancé → Mémoire virtuelle → Modifier**, décochez la gestion automatique, définissez une taille personnalisée (ex. Initiale `16384` Mo, Maximale `32768` Mo), cliquez sur **Définir** et **redémarrez**. |

### 3. Modèles, Checkpoints et Index

| Problème ou Erreur | Ce que cela signifie (en mots simples) | Comment le corriger |
| --- | --- | --- |
| **J'ai mis le modèle dans le dossier, pourquoi n'apparaît-il pas ?** | Vous n'avez pas cliqué sur Refresh, laissé dans un `.zip` ou mis dans le mauvais dossier. | 1. Extrayez le `.zip` pour voir `.pth` et `.index` directement.<br>2. Mettez `.pth` dans `assets/weights/` (ou `weights/`) et `.index` dans `logs/`.<br>3. Cliquez sur **Refresh** à côté du menu des modèles. |
| `UnpicklingError` / `Weights only load failed` (`fairseq.data.dictionary.Dictionary`) | PyTorch 2.6+ bloque par défaut les anciens formats RVC par sécurité. | Mettez à jour votre application (ex. **Ilaria RVC 2.4.0+** ou dernier **Applio**), qui gère déjà le chargement sécurisé. |
| `EOFError` / `RuntimeError: invalid load key` / `File is not a zip archive` | Le téléchargement a été interrompu, corrompu ou a enregistré une page web. | Vérifiez la taille : un vrai `.pth` pèse **40 à 100+ Mo**. S'il ne pèse que quelques Ko ou 0 Ko, supprimez-le et retéléchargez-le. |
| `Missing key(s) in state_dict` / `Sizes of tensors must match` | Vous avez chargé un checkpoint brut (`G_*.pth` ou `D_*.pth`) au lieu du modèle exporté, ou mélangé `v1` et `v2`. | Ne copiez jamais les fichiers bruts `G_*.pth` de `logs/` vers `weights/`. Utilisez le bouton **Export** de l'app et vérifiez que `v1` / `v2` et le sample rate correspondent. |
| **Erreur d'index / dimensions / crash RAM lors de la création d'index** | Vous avez pris `trained_*.index` au lieu de `added_*.index`, un index d'une autre voix ou un dataset énorme. | Choisissez toujours **`added_*.index`** (jamais `trained_*.index`). En cas d'erreur, mettez **Index Rate** à `0` pour tester sans index. Ne mélangez jamais les `.index` entre modèles. |

### 4. Qualité vocale, Pitch et Fichiers audio

| Problème ou Erreur | Ce que cela signifie (en mots simples) | Comment le corriger |
| --- | --- | --- |
| **La voix ressemble à un écureuil ou un monstre grave** | Le réglage **Pitch (Transpose)** ne correspond pas à l'écart entre la voix d'origine et la voix cible. | Utilisez `0` pour le même genre, `+12` d'homme vers femme et `-12` de femme vers homme. Affinez ensuite par paliers de `1`. |
| **La voix est métallique, liquide, robotique ou brouillée** | L'audio source contient musique/réverbération, mauvais Pitch Extractor ou mauvais Embedder. | 1. Nettoyez d'abord l'audio avec **UVR5** ou **MVSep** (zéro musique ni écho).<br>2. Réglez le Pitch Extractor sur **`rmvpe`**.<br>3. Utilisez le même Embedder que l'entraînement (presque toujours **`contentvec`**).<br>4. Baissez **Index Rate** de `1.0` à `0.5` ou `0.3`. |
| **Le résultat ressemble encore trop à ma propre voix** | **Index Rate** trop bas, ou **Pitch** resté dans votre tessiture naturelle au lieu de celle du modèle. | Rapprochez le Pitch de la voix cible (`+12` / `-12`), montez légèrement **Index Rate** (`0.6` - `0.75`) ou testez un modèle plus propre. |
| **Le convertisseur refuse d'ouvrir mon fichier audio** | Format non supporté (`.m4a`, `.opus`, `.mp3` corrompu) ou caractères spéciaux dans le nom. | Convertissez en **`.wav` PCM standard** (44100 Hz ou 48000 Hz) et renommez simplement en `input.wav`. |

### 5. Prétraitement du Dataset et Entraînement

| Problème ou Erreur | Ce que cela signifie (en mots simples) | Comment le corriger |
| --- | --- | --- |
| `ValueError: zero-size array` / tenseur vide | Dossier dataset vide, clips totalement muets, clips de moins d'1 seconde ou espaces/accents dans le chemin. | Vérifiez que le dossier contient des `.wav` non vides (2 à 10 secondes chacun), retirez les clips muets ou corrompus, utilisez un chemin simple sans espaces et lancez une nouvelle expérience. |
| `BrokenProcessPool` / le PC fige au Prétraitement | Trop de threads CPU travaillent en parallèle et saturent la RAM. | Réduisez le nombre de **threads / workers CPU** (ex. de `8` à `2` ou `4`) et vérifiez l'espace disque disponible. |
| `NaN loss` ou modèle exporté totalement muet | Clip saturé/corrompu dans le dataset, débordement `FP16` ou pretrain `G/D` incompatible. | Vérifiez l'absence de saturation ou de silence total dans vos clips. Utilisez le **pretrain RVC standard** pour votre sample rate, coupez `FP16` (passez en `FP32`) et relancez un entraînement neuf. |
| **L'entraînement ne reprend pas / repart à l'Epoch 0** | `Fresh Training` est resté coché ou vous avez déplacé/renommé des fichiers dans `logs/`. | Laissez tout le dossier `logs/<expérience>/` intact, saisissez exactement le même **Nom d'expérience**, **Sample Rate** et **Embedder**, augmentez le nombre total d'époques et décochez `Fresh Training`. |
| **Le modèle sonne étouffé, bruité ou en "overfitting"** | Trop d'époques sur un dataset petit ou bruité : le modèle a mémorisé le souffle. | Arrêtez plus tôt (testez les checkpoints toutes les 50-100 époques, ex. 200-400 époques pour un petit dataset) et nettoyez toujours vos audios avec **UVR5** ou **MVSep**. |

### 6. Voice Changer en direct, Micro et Discord

| Problème ou Erreur | Ce que cela signifie (en mots simples) | Comment le corriger |
| --- | --- | --- |
| **Personne ne m'entend sur Discord ou en jeu** | L'application cible écoute encore votre vrai micro au lieu du câble virtuel, ou le voice changer n'est pas démarré. | 1. Installez **VB-CABLE** et redémarrez le PC.<br>2. Dans le voice changer : **Input** = votre micro physique, **Output** = `CABLE Input (VB-Audio Virtual Cable)`.<br>3. Dans **Discord / Jeu** : **Périphérique d'entrée** = `CABLE Output (VB-Audio Virtual Cable)`. |
| `PortAudioError` / `Invalid sample rate` / échec audio | Micro, casque et VB-CABLE ont des fréquences différentes (`44100 Hz` vs `48000 Hz`) ou sont en Mode Exclusif. | Ouvrez le **Panneau Son Windows (`mmsys.cpl`)**, ouvrez **Propriétés → Statistiques avancées** pour Micro, Casque, `CABLE Input` et `CABLE Output`, mettez **tous sur 48000 Hz**, décochez **Autoriser les applications à prendre le contrôle exclusif** et redémarrez l'app. |
| **Coupures, craquements ou fort délai vocal** | Le GPU met plus de temps à traiter un bloc que sa durée. | 1. Montez légèrement **Chunk Size**.<br>2. Utilisez **RMVPE** ou **FCPE** (jamais `crepe` full en direct).<br>3. Plafonnez les FPS en jeu.<br>4. Testez éventuellement la désactivation de **HAGS** (comparaison avant/après). |
| **Écho ou vous vous entendez en double** | Vous utilisez des haut-parleurs ou deux programmes diffusent votre micro en même temps. | Portez toujours un **casque**. Désactivez **"Écouter ce périphérique"** dans Windows Enregistrement et n'activez le Monitor dans le voice changer que si nécessaire. |
| **Discord coupe les respirations ou les fins de mots** | Le filtre anti-bruit de Discord prend les fins de voix convertie pour du bruit ambiant. | Dans **Voix et vidéo** sur Discord, désactivez **Suppression du bruit Krisp**, **Suppression d'écho** et **Déterminer automatiquement la sensibilité d'entrée** (réglez le curseur à la main). Baissez aussi le seuil VAD / Noise Gate dans le voice changer. |

### 7. Notebooks Cloud (Colab et Kaggle)

| Problème ou Erreur | Ce que cela signifie (en mots simples) | Comment le corriger |
| --- | --- | --- |
| `CUDA not available` / `No GPU found` sur Colab ou Kaggle | Vous avez oublié d'activer le GPU dans les réglages ou atteint votre quota gratuit. | **Colab :** **Exécution → Modifier le type d'exécution → GPU T4**.<br>**Kaggle :** barre de droite **Settings → Accelerator → GPU T4 x2** (vérification par téléphone requise). |
| **Échec du téléchargement dans le notebook (`403` / quota Drive ou Mega)** | Un lien public a atteint sa limite quotidienne ou est devenu privé. | Hébergez d'abord votre dataset ou modèle sur **Hugging Face** ou votre propre Google Drive, puis téléchargez-le depuis là. |
| **Le notebook se déconnecte en plein entraînement** | Les notebooks cloud s'arrêtent après inactivité ou longue session et effacent le disque temporaire. | Sauvegardez/synchronisez toujours `logs/` et `weights/` sur **Google Drive** (ou Kaggle Output) et reprenez depuis le dernier `G_*.pth` / `D_*.pth` enregistré. |

---

## Vérifications rapides par application

- **Ilaria RVC :** Extrayez tout le ZIP dans un chemin court comme `C:\IlariaRVC`. Utilisez `RUN_ILARIA_RVC_LOGS.bat` s'il se ferme au démarrage, vérifiez que `127.0.0.1:6969` est libre et lisez la **première** erreur avant la fermeture.
- **Applio Desktop :** Ouvrez l'onglet **Setup** et vérifiez l'état du moteur. Cliquez sur **Install / Repair** si un voyant est rouge. Pour **Gradio**, gardez la console ouverte et copiez l'URL `localhost` exacte affichée.
- **RVC Mainline / w-okada / Deiteris / TGR :** Choisissez le bon paquet entre **CUDA** (NVIDIA) et **DirectML** (AMD/Intel). Extrayez les archives `.zip.001` avec 7-Zip uniquement quand toutes les parties sont réunies.

## Comment demander de l'aide

Pour demander de l'aide (par exemple sur la [page de contact Ilaria RVC](https://ilariarvc.shop/en/contact/)), donnez ces 4 informations :
1. **Nom et version de l'app** (ex. `Ilaria RVC 2.4.0`, `Applio Desktop`, `Deiteris`).
2. **Configuration du PC :** version de Windows, modèle exact du GPU (ex. `RTX 3060` ou `RX 6700 XT`) et backend (`CUDA` / `DirectML` / `CPU`).
3. **La PREMIÈRE ligne d'erreur** de la console (masquez votre nom d'utilisateur Windows si besoin).
4. **Ce que vous faisiez :** Entraînement (sample rate, vocoder, embedder, nouveau ou reprise) ou Voice Changer en direct (chaîne exacte : `Mic -> App -> VB-CABLE -> Discord`).
