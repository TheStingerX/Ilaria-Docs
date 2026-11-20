---
label: "🩺 Dépannage"
order: 95
permalink: /troubleshooting/
---
# Dépannage RVC

[Télécharger Ilaria RVC 2.4.0 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

!!!tip
Nouveau sur RVC ? **Commencez toujours par un WAV de 10 secondes et un seul modèle.** Si l'app plante, ouvrez le journal et copiez la **première** erreur. Si elle tourne mais sonne mal, rejouez le même extrait en ne changeant qu'un réglage à la fois.
!!!

Un bon diagnostic commence à la première étape qui échoue. Notez la version de l'app, la première erreur exacte et un test reproductible.

## Identifier votre symptôme

| Symptôme | Premier test |
| --- | --- |
| Le lanceur se ferme ou le navigateur affiche une erreur de connexion | Gardez la console ouverte et vérifiez l'adresse locale affichée. |
| Modèle absent, refus de chargement ou clés manquantes | Vérifiez qu'il s'agit d'un export d'inférence et contrôlez version RVC et embedder. |
| Le convertisseur ne peut pas lire le fichier | Testez un court WAV PCM dans un chemin local simple. |
| La conversion ne marche que sans index | Vérifiez que l'index correspond exactement à ce modèle et cet embedder. |
| Voix métallique, floue ou trop proche de la vôtre | Comparez plusieurs extraits propres avec effets et retrieval à 0. |
| L'entraînement s'arrête ou ne donne pas d'export | Identifiez l'étape en échec et inspectez le journal et le dossier d'expérience. |
| Erreur CUDA ou mémoire saturée | Distinguez GPU non pris en charge, VRAM pleine et RAM / fichier d'échange saturés. |
| Micro avec latence, coupures, silence ou écho | Testez séparément micro physique, retour casque, câble virtuel et application cible. |

## Établir une base de référence

1. Enregistrez 10-20 secondes d'une seule voix avec des voyelles nettes, des consonnes comme `s` ou `f` et une pause naturelle en WAV local propre.
2. Choisissez un modèle d'inférence fiable compatible avec l'app. Laissez la hauteur à `0`, le détecteur par défaut, les effets coupés et le retrieval (`index`) à `0`.
3. Convertissez dans un dossier local accessible en écriture. Écoutez le fichier hors du navigateur.
4. Répétez avec un second modèle connu pour fonctionner afin d'isoler l'environnement du modèle.
5. Réactivez une option à la fois en notant les paramètres.

---

## Erreurs connues et solutions exactes

### 1. Erreurs Windows, chemins, Python et lanceurs

| Erreur / Message | Cause | Solution |
| --- | --- | --- |
| `[WinError 3] The system cannot find the path specified` / `[WinError 206] The filename or extension is too long` | Limite Windows de 260 caractères, ou espaces et symboles spéciaux dans les chemins. | Déplacez l'app et les datasets vers un chemin court à la racine (ex. `C:\RVC` ou `D:\IlariaRVC`). Supprimez espaces, `()`, `[]` et caractères non-ASCII/Unicode. |
| `[WinError 2] The system cannot find the file specified` (lecture/export audio) | `ffmpeg.exe` / `ffprobe.exe` manquant ou absent du `PATH`. | Vérifiez la présence de `ffmpeg` dans le dossier de l'app. Depuis les sources, installez FFmpeg, ajoutez-le au `PATH` et redémarrez le terminal. |
| `PermissionError: [Errno 13] Permission denied` / `[WinError 5]` | Écriture dans `Program Files`, `OneDrive`, dossier protégé ou fichier ouvert ailleurs / bloqué par l'antivirus. | Extrayez dans un dossier qui vous appartient (hors `Program Files` et `OneDrive`), fermez les lecteurs audio et ajoutez une exclusion antivirus. |
| `ModuleNotFoundError: No module named 'fairseq'` | `fairseq` échoue à compiler sous Python 3.11+ ou sans outils de build C++. | Utilisez le paquet portable fourni, ou recréez l'environnement avec **Python 3.9 ou 3.10** et **Microsoft Visual Studio Build Tools** (*Développement Desktop en C++*). |
| `llvmlite.dll` / `OSError: [WinError 126]` / DLL manquante | Microsoft Visual C++ Redistributable manquant ou DLL corrompue. | Installez ou réparez **Microsoft Visual C++ 2015-2022 Redistributable (x64)**. Si la DLL manque, ré-extrayez l'archive d'origine. |
| `Expecting value: line 1 column 1` / page Gradio blanche | Le serveur a planté avant de répondre, ou un proxy/VPN intercepte `127.0.0.1`. | Gardez la console ouverte et lisez le premier traceback Python. Vérifiez le port exact (`127.0.0.1:6969` pour Ilaria RVC, `7865` pour Gradio/Deiteris) et contournez le proxy pour `localhost` / `127.0.0.1`. |
| `urllib.error` / `ConnectionResetError` / `SSLError` | Blocage réseau, VPN ou timeout Hugging Face/GitHub lors du téléchargement de `hubert_base.pt` ou `rmvpe.pt`. | Désactivez temporairement VPN/pare-feu strict, ou téléchargez manuellement `hubert_base.pt` et `rmvpe.pt` dans `assets/hubert/` et `assets/rmvpe/`. |

### 2. Erreurs GPU, CUDA, DirectML et Mémoire

| Erreur / Message | Cause | Solution |
| --- | --- | --- |
| **Débordement VRAM en RAM / entraînement lent / voix live robotique (Windows 10/11)** | La **Planification GPU à accélération matérielle (HAGS)** perturbe l'allocation VRAM de PyTorch et affame les changeurs de voix. | Allez dans **Paramètres Windows → Système → Affichage → Graphiques → Paramètres graphiques avancés**, désactivez **Planification GPU à accélération matérielle** et **redémarrez le PC**. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (Inférence) | Fichier trop long ou applications concurrentes (jeux, navigateur avec accélération matérielle) consommant la VRAM. | Activez **Split Audio** pour les longs fichiers, fermez jeux/navigateurs lourds, déchargez les modèles inutilisés et coupez le post-traitement. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (Entraînement) | Batch size trop élevé pour votre VRAM ou mise en cache du dataset en VRAM activée. | Baissez **Batch Size** (ex. de `8` à `4`, `2` ou `1`), désactivez le cache dataset en VRAM et fermez tout changeur de voix en direct. |
| `RuntimeError: CUDA error: an illegal memory access was encountered` | Incompatibilité pilote/PyTorch, overclock/undervolt instable ou mémoire partagée saturée. | Mettez à jour vos pilotes NVIDIA, retirez tout overclock/undervolt et vérifiez la correspondance CUDA de PyTorch. |
| `Torch not compiled with CUDA enabled` / `no kernel image is available for execution on the device` | Mauvais paquet pour votre génération de GPU (ex. ancien CUDA sur RTX 50, ou PyTorch CPU). | Adaptez le runtime : Ilaria RVC intègre **CUDA 12.8** (GTX 16 / RTX 20-50) et télécharge **CUDA 12.6** (`runtime-cu126`) pour Maxwell/Pascal/Volta. AMD/Intel nécessitent DirectML/ROCm ou le cloud. |
| `RuntimeError: expected scalar type Half but found Float` (ou erreur `HalfTensor`) | Précision `FP16` forcée sur un GPU/backend non compatible (GTX série 10, DirectML, CPU). | Désactivez **FP16** dans les réglages et passez en **FP32** (pleine précision). |
| `OSError: [WinError 1455] The paging file is too small for this operation to complete` | Mémoire virtuelle Windows (fichier d'échange) saturée lors du chargement, de l'indexation ou de l'entraînement. | Ouvrez **Propriétés système → Paramètres système avancés → Performances → Avancé → Mémoire virtuelle**, augmentez la taille (ex. `16384–32768 Mo`) et redémarrez. |

### 3. Chargement de modèles, Checkpoints, Embedders et Index

| Erreur / Message | Cause | Solution |
| --- | --- | --- |
| `UnpicklingError` / `Weights only load failed` (`fairseq.data.dictionary.Dictionary`) | PyTorch 2.6+ utilise `weights_only=True` par défaut dans `torch.load`, bloquant d'anciens objets fairseq. | Mettez à jour vers la dernière version de l'app (ex. Ilaria RVC 2.4.0+ ou dernier Applio), qui gère automatiquement `safe_globals` pour `Dictionary`. |
| `EOFError` / `RuntimeError: invalid load key` / `File is not a zip archive` | Téléchargement du `.pth` interrompu/corrompu, ou page HTML enregistrée par le navigateur au lieu du binaire. | Vérifiez la taille du fichier (un `.pth` valide pèse 40-100+ Mo, pas quelques Ko). Supprimez et retéléchargez proprement. |
| `Missing key(s) in state_dict` / `RuntimeError: Sizes of tensors must match` | Chargement d'un checkpoint d'entraînement (`G_*.pth` ou `D_*.pth` dans `logs/`) au lieu d'un export d'inférence, ou mélange `v1` (256-d) / `v2` (768-d). | Utilisez l'outil **Export** pour créer un `.pth` d'inférence (ne copiez pas les `G_*.pth` bruts dans `models/`) et vérifiez version RVC et sample rate. |
| Prononciation déformée ou voix source très audible | **Discordance d'embedder** entre entraînement et inférence, ou HuBERT générique au lieu de `contentvec`. | Utilisez exactement le même embedder qu'à l'entraînement (presque toujours **`contentvec`**). Testez d'abord sans retrieval (`0`). |
| Erreur d'index / dimensions incompatibles / plantage RAM à la création | Utilisation de `trained_*.index` au lieu de `added_*.index`, index d'un autre modèle, ou trop de vecteurs pour la RAM. | Choisissez toujours `added_*.index` (ou mettez retrieval à `0` pour tester sans index). Ne mélangez jamais les index entre modèles. |

### 4. Prétraitement, Extraction de features et Entraînement

| Erreur / Message | Cause | Solution |
| --- | --- | --- |
| `ValueError: zero-size array to reduction operation` / tenseur de taille nulle | Dossier vide, extrait totalement silencieux, extrait < 1 seconde, ou espaces/Unicode dans le chemin. | Utilisez un chemin simple sans espaces, retirez les clips muets/corrompus, vérifiez le format WAV et relancez dans une nouvelle expérience. |
| `BrokenProcessPool` / arrêt des workers de prétraitement | Trop de processus CPU parallèles saturent la RAM système. | Réduisez le nombre de threads/workers CPU dans les réglages et libérez de l'espace disque. |
| `NaN loss` ou modèle exporté muet | Audio corrompu ou saturé dans le dataset, paire `G`/`D` incompatible, ou débordement `FP16`. | Vérifiez l'absence de saturation/silence, assurez-vous que le pretrain `G/D` correspond au sample rate et au vocodeur (ou utilisez le stock RVC) et testez en `FP32`. |
| La reprise échoue ou repart à l'époque 0 | `Fresh Training` resté coché, ou `G_*.pth` / `D_*.pth` / `config.json` déplacés ou renommés. | Gardez tout le dossier `logs/<expérience>/` intact, gardez les mêmes nom, sample rate et embedder, fixez un total d'époques supérieur et laissez `Fresh Training` **décoché**. |

### 5. Changeur de voix en direct, PortAudio et Routage

| Erreur / Message | Cause | Solution |
| --- | --- | --- |
| `PortAudioError` / `Invalid sample rate` / périphérique indisponible | Fréquences d'échantillonnage différentes sous Windows, ou une autre app bloque le périphérique en mode exclusif. | Dans le **Panneau Son Windows**, réglez micro, casque et `VB-CABLE` sur **48000 Hz**, décochez le **mode exclusif** et redémarrez après l'installation d'un câble virtuel. |
| Saccades robotiques, craquements ou forte latence | Le temps d'inférence GPU dépasse le Chunk, HAGS est actif, ou un jeu sature le GPU. | Augmentez **Chunk Size**, choisissez **RMVPE** ou **FCPE**, désactivez **HAGS** dans Windows et fermez les tâches GPU concurrentes. |
| Écho ou double voix dans le casque | Haut-parleurs actifs au lieu d'un casque, ou double écoute (« Écouter ce périphérique » Windows + moniteur de l'app). | Portez toujours un **casque** et n'activez le monitoring qu'à **un seul endroit**. |
| Souffles ou fins de mots coupés sur Discord | **Suppression du bruit (Krisp)** ou **sensibilité automatique** de Discord activée, ou seuil VAD/Noise Gate trop haut. | Désactivez Krisp et la sensibilité automatique dans Discord pour le micro virtuel, et baissez les seuils VAD / Noise Gate dans l'app. |

---

## Vérifications par application

- **Ilaria RVC :** Extrayez l'archive complète et lancez `RUN_ILARIA_RVC_LOGS.bat`. Lisez la première exception avant l'arrêt. Vérifiez que Windows détecte le GPU NVIDIA et que `127.0.0.1:6969` est libre.
- **Applio Desktop :** Ouvrez **Setup** pour vérifier l'état du moteur et lancez **Install / Repair** si besoin. Pour **Gradio**, gardez la console ouverte et ouvrez l'adresse `localhost` affichée.
- **RVC WebUI (Mainline) / w-okada / Deiteris / TGR :** Utilisez la build CUDA ou DirectML correspondant à votre GPU. Pour les archives `.zip.001`, réunissez toutes les parties dans le même dossier avant d'extraire.

## Signaler un problème

Pour demander de l'aide (par ex. via la [page contact](https://ilariarvc.shop/en/contact/) pour Ilaria RVC), fournissez :
1. Nom de l'app, édition et version (ex. `Ilaria RVC 2.4.0`).
2. Système d'exploitation, modèle exact de GPU et backend (`CUDA` / `DirectML` / `CPU`).
3. La **première ligne d'erreur** avec le contexte du journal (sans chemins privés ni données sensibles).
4. Pour l'entraînement : étape en échec, sample rate, vocodeur, embedder, nouveau run ou reprise. Pour le direct : chaîne complète des périphériques (`Micro → App → Câble virtuel → App cible`).
