# RVC Blue (RVC-Realtime-GUI)

[GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI)

**RVC Blue (RVC-Realtime-GUI)** est un client de bureau Windows dédié à la conversion vocale RVC en temps réel à faible latence. Basé sur l'interface temps réel de RVC WebUI, il intègre les optimisations récentes d'inférence en direct, le **CUDA Graph warm-up** (pour réduire la charge GPU en continu) et les correctifs de réduction de bruit en entrée et sortie.

- **Inférence uniquement** : RVC Blue n'entraîne pas de modèles. Entraînez votre voix dans **Ilaria RVC** (ou un autre outil) puis importez ici les fichiers `.pth` et `.index` exportés pour l'inférence.
- **Trois sources d'entrée** : **Microphone** en direct, **Fichier audio** (via FFmpeg intégré) et **Audio d'une application Windows** (capture par processus).
- **Voix incluse** : livré avec **Sakura**, un modèle de voix naturelle du quotidien (usage commercial autorisé) pour tester immédiatement.

## 1. Choisir une version et installer

Chaque archive Hugging Face est autonome et inclut l'environnement Python, PyTorch/CUDA, FFmpeg, les fichiers HuBERT/RMVPE/FCPE et le jeu de modèles de base. Vous n'avez pas besoin d'installer Python, CUDA Toolkit ou FFmpeg séparément.

| Version | Lanceur | Matériel NVIDIA visé |
| --- | --- | --- |
| **CUDA 12.8** *(Standard)* | `RVC-Realtime-GUI-CUDA128.bat` | GPU NVIDIA récents, y compris la série RTX 50 (Blackwell) |
| **CUDA 11.8** *(Compatibilité)* | Lanceur CUDA 11.8 inclus | GPU NVIDIA plus anciens ou systèmes sous pilote/environnement CUDA 11.8 |

1. Vérifiez le modèle de votre GPU NVIDIA dans **Gestionnaire des tâches → Performances → GPU**.
2. Ouvrez [RVC Blue sur Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI) et téléchargez le paquet adapté.
3. Extrayez toute l'archive dans un **dossier local court et accessible en écriture**, comme `C:\RVC-Realtime-GUI`. Ne le lancez pas depuis l'intérieur du ZIP et évitez `Program Files` ou les dossiers synchronisés OneDrive.
4. Lancez `RVC-Realtime-GUI-CUDA128.bat` (ou le lanceur CUDA 11.8).
5. **Attendez la fin du premier démarrage** : le premier lancement est plus long le temps d'initialiser les ressources d'inférence, le runtime CUDA et le CUDA Graph warm-up. Attendez l'ouverture de la fenêtre avant de croire à un blocage.

## 2. Ajouter vos modèles vocaux

Créez un sous-dossier par voix dans `models/` à l'intérieur du dossier extrait :

```text
models/
  MyVoice/
    MyVoice.pth
    added_MyVoice.index
    preview.png
```

- **Nom du dossier** : affiché comme nom du modèle dans la galerie.
- **Fichier modèle requis** : utilisez un **`.pth` d'inférence**, pas un point de sauvegarde d'entraînement (`G_*.pth` / `D_*.pth`).
- **Index et aperçu facultatifs** : placez le fichier `added_*.index` correspondant et une image `.png`, `.jpg` ou `.jpeg` dans le même dossier pour afficher automatiquement une miniature.
- **Recharger** : cliquez sur **Reload** dans l'application (ou redémarrez RVC Blue) après avoir ajouté ou remplacé un modèle. Les réglages généraux par modèle sont enregistrés automatiquement.

## 3. Configurer l'audio et faire un test local

RVC Blue permet de choisir **Input** (entrée), **Output** (sortie) et **Monitor** (retour casque) séparément :

- **Input** : votre microphone physique (ou un fichier audio / une application Windows).
- **Output** : destination de la voix convertie (votre casque pour tester, ou un câble virtuel pour les appels et jeux).
- **Monitor** : seconde sortie facultative pour vous entendre pendant que **Output** envoie le son vers Discord ou OBS.

### WASAPI vs ASIO

- **Sans interface ASIO** : commencez avec **WASAPI**.
- **Avec ASIO natif** : RVC Blue démarre avec la taille de tampon recommandée par le pilote. Vous pouvez aussi combiner entrée/retour ASIO avec une sortie WASAPI, ou utiliser des paires de canaux distinctes sur le même pilote ASIO.

### Premier test local

1. Sélectionnez votre microphone physique dans **Input**.
2. Sélectionnez votre casque dans **Output** (laissez **Monitor** désactivé pour l'instant afin d'éviter une double voix).
3. Choisissez **Sakura** (ou votre modèle) et gardez le tampon et la hauteur par défaut.
4. Cliquez sur **Start**, prononcez une courte phrase et faites une pause pour vérifier la latence, la clarté et le bruit.

## 4. Envoyer l'audio vers Discord, OBS ou un jeu

> **Correct Audio Routing**
>
> **1. Dans le Voice Changer**
> - **Input Device :** Votre microphone physique.
> - **Output Device :** `Line 1` (Virtual Audio Cable / VAC).
>
> **2. Dans Discord, les jeux, OBS ou d'autres applications**
> - **Input Device :** `Line 1` (Virtual Audio Cable / VAC).
> - **Output Device :** Vos écouteurs ou haut-parleurs.
>
> ```text
> Your Microphone → Voice Changer → Virtual Audio Cable (Line 1) → Discord / Game / OBS
> ```
>
> L'audio reçu depuis Discord, le jeu ou une autre app doit être envoyé directement vers votre **casque** (jamais renvoyé dans le câble virtuel).
>
> - **VAC vs. VB-CABLE :** `Line 1` est le nom utilisé par **VAC (Virtual Audio Cable)**, pas un nom universel pour tous les câbles virtuels. Avec **VB-CABLE**, réglez la sortie du Voice Changer sur **`CABLE Input`** et l'entrée de Discord / jeu sur **`CABLE Output`**.
> - **Monitoring :** Entendre votre propre voix convertie dans votre casque est une fonction optionnelle séparée à n'activer qu'en cas de besoin. Évitez les chemins audio dupliqués, l'écho et le loopback.

Pour utiliser votre voix convertie dans une autre application, passez par un câble audio virtuel (**VAC Lite** ou **VB-CABLE**) :

1. Réglez **Output** dans RVC Blue sur le périphérique de lecture du câble virtuel (par exemple `CABLE Input` ou `Line 1`).
2. Réglez éventuellement **Monitor** sur votre casque si vous souhaitez vous entendre.
3. Dans Discord, OBS ou votre jeu, sélectionnez le périphérique d'enregistrement du câble virtuel (par exemple `CABLE Output` ou `Line 1`) comme **Microphone**.
4. Gardez le son du jeu ou de l'appel sur votre casque.
5. Enregistrez un court essai dans l'application cible avant de rejoindre un appel.

Pour installer le câble virtuel et identifier les noms de périphériques, consultez le [guide du câble virtuel](../vonovox/live-audio.md).

## 5. Entrée fichier, capture d'application et enregistrement WAV

- **Entrée par fichier audio** : passez la source sur **File**, choisissez un court extrait WAV ou audio (décodé via FFmpeg intégré) et vérifiez **Output** et **Monitor** avant de cliquer sur **Start**. Le routage sortie/retour est conservé entre les essais.
- **Capture d'application Windows** : passez la source sur **Application**, cliquez sur **Refresh** et sélectionnez une application en cours d'exécution. La capture utilise l'audio par processus de Windows. Les applications déjà détectées sont mémorisées et se reconnectent au redémarrage. L'audio passant directement par ASIO hors du circuit Windows standard peut ne pas être capturé, et le son d'origine de l'application **n'est pas coupé automatiquement** (coupez ou baissez son volume séparément si besoin).
- **Enregistrement WAV** : les contrôles intégrés permettent d'enregistrer en WAV **l'entrée/sortie séparées**, **le mix** ou **les canaux G/D séparés**.

## 6. Dépannage rapide

| Symptôme | Quoi vérifier |
| --- | --- |
| L'app semble figée au premier lancement | Attendez 1 à 2 minutes pour l'initialisation CUDA et le CUDA Graph warm-up. |
| Le programme se ferme immédiatement au démarrage | Lancez le `.bat` depuis le dossier extrait (ex. `C:\RVC-Realtime-GUI`) et lisez l'erreur console. Vérifiez que votre pilote NVIDIA correspond à CUDA 12.8 ou 11.8. |
| Une nouvelle voix n'apparaît pas | Vérifiez que le modèle est dans `models/<NomVoix>/` et qu'il s'agit d'un `.pth` d'inférence (pas un checkpoint d'entraînement), puis cliquez sur **Reload**. |
| Le casque fonctionne mais Discord ou le jeu reste muet | Vérifiez que **Output** pointe vers la lecture du câble virtuel et que Discord/le jeu utilise son périphérique d'enregistrement comme micro. |
| Vous entendez deux voix | Désactivez **Monitor** si **Output** est déjà sur votre casque, ou coupez le son de l'application source lors d'une capture d'application. |
| Le son craque ou coupe sous charge | Remettez le tampon par défaut ou augmentez-le légèrement, puis retestez avec le jeu ou l'appel ouvert. |

[Code source et notes de version](https://github.com/niel-blue/RVC-Realtime-GUI/tree/main)
