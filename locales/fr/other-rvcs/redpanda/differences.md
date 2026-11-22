---
label: "Redpanda-vc vs autres versions RVC"
icon: ":scales:"
order: 96
permalink: /ilaria-rvc/redpanda/comparison/
description: "Comparatif vérifié dans le code entre Redpanda-vc, RVC Mainline, Applio et Ilaria RVC : Generator EMA, sauvegarde par étapes, Rectified Flow, Beatrice 2, entraînement vocoder, TTS, temps réel et compatibilité."
---
# Redpanda-vc vs Autres Versions RVC - Comparatif Complet des Fonctionnalités

[Configurer Redpanda-vc](first-run.md) · [Entraîner des modèles RVC (EMA & Steps)](training.md) · [Tester l'audio en direct](live-audio.md)

Ce guide compare **Redpanda-vc** directement à **RVC Mainline**, **Applio** et **Ilaria RVC** d'après l'inspection statique du code source de la branche `main` de chaque projet (sans exécuter de benchmarks audio en direct ni de tests matériels multi-OS).

---

## Qu'est-ce qui distingue Redpanda-vc ?

Si vous débutez dans la conversion vocale par IA, sachez que ces programmes ne sont **pas** des versions successives d'une même application, mais des projets apparentés aux objectifs distincts :

- **RVC :** Une famille d'architectures et de modèles de conversion vocale (Retrieval-based Voice Conversion).
- **RVC Mainline :** L'implémentation de référence d'origine (`RVC-Project/Retrieval-based-Voice-Conversion-WebUI`).
- **Applio :** Une application RVC très répandue qui enrichit la WebUI, les vocoders, le TTS et les outils autour de RVC.
- **Redpanda-vc :** Un fork d'**Applio** (`redpanda343/Redpanda-vc`) qui ajoute Generator EMA, la sauvegarde des checkpoints RVC par étapes, l'entraînement/inférence **Rectified Flow**, l'entraînement/temps réel **Beatrice 2** et l'**entraînement dédié de vocoders**.
- **Ilaria RVC :** Une implémentation personnalisée basée sur RVC Mainline (`TheStingerX/Ilaria-RVC`) avec son propre pipeline d'inférence, `Training Target: Steps`, la prise en charge RefineGAN/MRF HiFi-GAN dans l'interface, Audio Analyzer, Voice Blender et des outils TTS.

Un fork n'est **pas** automatiquement meilleur que l'original sur tous les plans : chaque projet arbitre différemment entre simplicité, stabilité, compatibilité des modèles et architectures supplémentaires.

*(Notions rapides pour débutants : **Inference** signifie convertir de l'audio avec un modèle déjà entraîné ; **CLI** signifie lancer des commandes dans un terminal plutôt que de cliquer dans la **WebUI** ; un **vocoder** transforme des caractéristiques acoustiques en forme d'onde audible ; un **decoder** est la partie d'un logiciel qui sait lire une architecture de modèle précise.)*

---

## Tableau comparatif général

Les libellés ci-dessous reflètent l'inspection statique du code source sur la branche `main` de chaque dépôt (commits indiqués dans [Sources et références techniques](#sources-et-références-techniques)) :

| Fonctionnalité | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **RVC V1** | **Oui** | **Inférence V1 prise en charge ; l'UI d'entraînement actuelle cible V2** | **Oui** | **Oui** |
| **RVC V2** | **Oui** | **Oui** | **Oui** | **Oui** |
| **Entraînement RVC** | **Oui** | **Oui** | **Oui** | **Oui** |
| **Entraînement par époques** | **Oui** | **Oui** | **Implémentation différente** *(ciblé en steps)* | **Oui** |
| **Entraînement ciblé en steps** | **Non - vérifié** | **Non - vérifié** | **Oui** (`Total Steps`) | **Oui** (`Training Target: Steps`) |
| **Checkpoints par intervalles d'époques** | **Oui** | **Oui** (`save_every_epoch`) | **Non - vérifié** *(intervalles en steps)* | **Oui** (`save_every_epoch`) |
| **Checkpoints par intervalles de steps** | **Non - vérifié** | **Non - vérifié** | **Oui** (`Save Every X Steps`) | **Non - vérifié** *(sauvegardes par époques ; partiel à l'arrêt/fin)* |
| **Generator EMA** | **Non - vérifié** | **Non - vérifié** | **Oui** (`GeneratorEMA`) | **Non - vérifié** |
| **Reprise d'entraînement (`G`/`D`)** | **Oui** | **Oui** | **Oui** | **Oui** |
| **Export `.pth` intermédiaire** | **Oui** | **Oui** (`save_every_weights`) | **Oui** (`Save Every Weights`) | **Oui** *(aux bornes complètes `save_every_epoch`)* |
| **Entraînement Rectified Flow** | **Non - vérifié** | **Non - vérifié** | **Oui** | **Non - vérifié** |
| **Entraînement Beatrice 2** | **Non - vérifié** | **Non - vérifié** | **Oui** | **Non - vérifié** *(Beatrice = extracteur F0 uniquement)* |
| **Entraînement dédié de vocoders** | **Non - vérifié** | **Non - vérifié** | **Oui** (`tabs/train/nsf_hifigan.py`) | **Non - vérifié** |
| **HiFi-GAN** | **Oui** | **Oui** | **Oui** | **Oui** |
| **RefineGAN** | **Non - vérifié** | **Oui** | **Oui** | **Oui** *(32 kHz v2 f0)* |
| **MRF HiFi-GAN** | **Non - vérifié** | **Pris en charge dans le code / CLI ; non sélectionnable dans la WebUI d'entraînement standard** | **Pris en charge dans le code / CLI ; non sélectionnable dans la WebUI d'entraînement standard** | **Oui** *(sélectionnable en WebUI d'entraînement, v2 f0)* |
| **Pretrained personnalisés** | **Oui** | **Oui** | **Oui** | **Oui** |
| **Warmup du learning rate** | **Non - vérifié** | **Non - vérifié** *(planning fixe)* | **Oui** (`Warmup Steps`) | **Non - vérifié** |
| **Planification du LR** | **Implémentation différente** *(exponentielle par époque)* | **Implémentation différente** *(exponentielle par époque)* | **Oui** (`Exponential` / `Cosine`) | **Implémentation différente** *(exponentielle par époque)* |
| **Contrôle du batch** | **Oui** (`batch_size`) | **Oui** (`batch_size`) | **Oui** (`Batch Size` + `Max Audio per Batch`) | **Oui** (`batch_size`) |
| **Optimisation VRAM** | **Implémentation différente** *(FP16, cache GPU)* | **Oui** (`Checkpointing`, cache GPU) | **Oui** (`Checkpointing`, cache GPU) | **Implémentation différente** *(FP16/BF16, cache GPU)* |
| **Extraction de traits & F0** | **Oui** | **Oui** | **Oui** | **Oui** |
| **Inférence vocale (hors ligne)** | **Oui** | **Oui** | **Oui** | **Oui** |
| **Text-to-Speech (TTS)** | **Non - vérifié** *(nécessite TTS externe + RVC)* | **Oui** *(`tabs/tts/` intégré + CLI `rvc/lib/tools/tts.py`)* | **Non - vérifié** *(onglet `tts` d'Applio retiré de `tabs/`)* | **Oui** *(Kokoro, ElevenLabs, Windows TTS intégrés + RVC)* |
| **Conversion en temps réel** | **Oui** | **Oui** | **Oui** | **Non - vérifié** *(hors ligne et par lots uniquement)* |
| **GUI desktop temps réel** | **Oui** (`realtime_gui.py`) | **Temps réel WebUI ; GUI desktop autonome séparée non vérifiée** | **Oui** (`run-realtime-gui.bat`, lanceur Windows) | **Non - vérifié** |
| **Temps réel navigateur** | **Non - vérifié** | **Oui** (`tabs/realtime`) | **Oui** (WebSocket + repli HTTP) | **Non - vérifié** |
| **Entraînement multi-GPU** | **Oui** | **Oui** | **Oui** | **Oui** |
| **Flux temps réel multi-GPU simultanés** | **Non - vérifié** | **Non vérifié** | **Oui** *(1 GPU par flux)* | **Non - vérifié** |
| **Support multi-famille** | **Non - vérifié** *(RVC uniquement)* | **Famille RVC avec options de vocoder supplémentaires** *(sélecteur `Architecture` masqué ; pas de familles distinctes comme RF/Beatrice)* | **Oui** *(RVC + Rectified Flow + Beatrice)* | **Non - vérifié** *(RVC uniquement)* |
| **Outils de suivi** | TensorBoard | TensorBoard | TensorBoard | TensorBoard + Audio Analyzer + Training Previews |

### Plateformes et Backends

La présence d'un script `.sh` ne prouve **pas** que chaque fonction soit testée sous Linux ou macOS ; le tableau suivant sépare les lanceurs du code backend :

| Plateforme / Backend | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **Lanceurs Windows** | `go-webui.bat`, `go-realtime_gui.bat` | `run-install.bat`, `run-applio.bat`, `run-tensorboard.bat`, `run-updater.bat` | `run-install.bat`, `run-applio.bat`, `run-tensorboard.bat`, `run-realtime-gui.bat` | `RUN_ILARIA_RVC.bat`, `RUN_ILARIA_RVC_LOGS.bat` |
| **Lanceurs Linux / macOS** | Lancement manuel Python | `run-install.sh`, `run-applio.sh`, `run-tensorboard.sh` | `run-install.sh`, `run-applio.sh` *(aucun `.sh` pour `realtime_gui.py`)* | Lancement manuel Python *(lanceurs `.bat` orientés Windows)* |
| **Backends de calcul dans le code** | **CUDA / DirectML / CPU** *(DirectML pour inférence via `--dml` / repli ; entraînement sur CUDA ou CPU)* | CUDA / MPS / CPU | CUDA / MPS / CPU *(Beatrice temps réel sur CPU)* | CUDA / DirectML (AMD & Intel) / CPU |
| **Statut des tests multi-OS** | Non testé dans cet audit | Non testé dans cet audit | Non testé dans cet audit | Non testé dans cet audit |

---

## Generator EMA : Des Poids Exportés Plus Lissés

Dans un réseau neuronal, les **weights (poids)** sont les nombres internes ajustés après chaque batch d'entraînement. Comme chaque batch ne représente qu'une petite fraction du dataset, les poids courants du générateur peuvent légèrement osciller d'un step à l'autre.

L'**EMA (Exponential Moving Average)** maintient en mémoire une moyenne glissante séparée des poids du générateur (distincte des moments internes d'optimiseurs comme Adam). Dans `rvc/train/train.py`, Redpanda-vc implémente `GeneratorEMA` :

- Après chaque mise à jour de l'optimiseur du générateur (sur rank `0`), `GeneratorEMA.update()` mélange les poids courants du générateur dans la moyenne glissante (hors `enc_q`, utilisé uniquement à l'entraînement).
- **Generator EMA Decay** (`0` à `0.9999`, défaut `0.999`, pas `0.0001`) règle la lenteur de mise à jour de la moyenne. Régler **`0`** désactive l'EMA et exporte les poids bruts courants.
- Ni **RVC Mainline**, ni **Applio**, ni **Ilaria RVC** n'incluent `GeneratorEMA` dans leurs scripts d'entraînement vérifiés.

L'EMA peut lisser les fluctuations de poids entre steps, mais il ne garantit **pas** une meilleure qualité audio, n'élimine **pas** l'overfitting ni le hasard de l'entraînement, et n'accélère **pas** l'entraînement. Pour les explications complètes et les détails mathématiques, voir [Entraîner des modèles RVC dans Redpanda-vc - EMA et Sauvegarde par Steps](training.md).

---

## Entraînement et Sauvegarde par Steps

Dans l'entraînement RVC, une **epoch (époque)** est un passage complet sur le dataset préparé, tandis qu'un **step** est une mise à jour des poids après un seul batch. *(Exemple hypothétique : si un dataset produit 100 steps par époque, 1 000 steps équivalent à environ 10 époques, mais le ratio exact dépend de la durée du dataset et de la taille du batch.)*

Les quatre logiciels gèrent différemment les objectifs en steps et les sauvegardes :

- **Redpanda-vc :** Utilise **Total Steps** (défaut `10000`) et **Save Every X Steps** (défaut `1000`). Il sauvegarde les checkpoints `G`/`D` reprenables (et un `.pth` d'inférence si **Save Every Weights** est actif) à intervalles exacts de steps, même en milieu d'époque, plus un **Final Save** obligatoire à `Total Steps`. **Save Only Latest** écrase `G_2333333.pth` / `D_2333333.pth` pour économiser l'espace disque.
- **Applio & RVC Mainline :** Tous deux entraînent par **époques totales** et sauvegardent les checkpoints à intervalles d'**époques** (`save_every_epoch`).
- **Ilaria RVC :** Propose **Training Target: Steps** (`ILARIA_RVC.py`, `train.py`) et peut donc aussi s'arrêter à un nombre précis de steps. Toutefois, sa fréquence de sauvegarde compte toujours en **époques** (`save_every_epoch`), et les exports intermédiaires `.pth` n'ont lieu qu'aux bornes complètes `epoch % save_every_epoch == 0` (pas sur une `partial_epoch` en milieu d'époque), tandis que l'état de reprise est sauvegardé à `save_every_epoch`, à l'arrêt ou à `final_epoch`.

---

## Rectified Flow : Une Autre Architecture de Conversion Vocale

L'un des ajouts majeurs de Redpanda-vc est **Rectified Flow** (`tabs/train/rectified_flow.py`, `rectified_flow/`). Ce n'est **pas** une variante de RVC V2 :

- **Modèle acoustique :** Repose sur une architecture inspirée du modèle acoustique de **DiffSinger**, en utilisant des traits vocaux **ContentVec** à la place des phonèmes (`README.md`).
- **Sortie et vocoder :** Le modèle de flux prédit des spectrogrammes mel, qu'un **vocoder** séparé (`PC-NSF-HiFiGAN`, `NSF-HiFiGAN` ou `Vocos`) convertit en forme d'onde audio.
- **Presets d'entraînement :** Inclut `standard`, `meanflow` (inspiré de MeanVC2) et `smaller` dans `rectified_flow/presets/`.
- **Support temps réel :** Pris en charge dans la GUI temps réel et l'onglet realtime de la WebUI de Redpanda-vc.
- **Avertissement de compatibilité :** Même si le fichier exporté porte l'extension `.pth`, un modèle Rectified Flow **n'est pas un modèle RVC V2** et ne se chargera pas dans les chargeurs RVC standards à moins qu'un client n'implémente explicitement ce décodeur Rectified Flow.

*(Aucun benchmark vérifié entre architectures dans le dépôt ne prouve que Rectified Flow soit universellement plus rapide, naturel ou qualitatif que RVC.)*

---

## Support de Beatrice 2

**Beatrice** est une architecture de conversion vocale distincte et légère sur CPU (intégrée depuis `beatrice-trainer` dans `tabs/train/beatrice.py`, `beatrice/`, `beatrice/realtime.py`) :

- **Séparée de RVC :** Beatrice utilise son propre format de modèle (exporté sous forme de dossier modèle, pas de `.pth` RVC) et exécute son inférence temps réel sur **CPU** (`README.md`).
- **Ne pas confondre avec l'extraction F0 :** Certaines applications (comme Ilaria RVC) proposent `beatrice` uniquement comme **extracteur de hauteur F0** pendant l'inférence RVC. Redpanda-vc va plus loin en prenant en charge **l'entraînement complet et la conversion Beatrice 2** dans sa WebUI et `run-realtime-gui.bat`.
- Les modèles entraînés dans l'onglet Beatrice de Redpanda-vc fonctionnent avec les chargeurs compatibles Beatrice (comme Beatrice VST / clients Beatrice), et non comme des `.pth` RVC V2.

---

## Entraînement Dédié de Vocoders

Redpanda-vc inclut un onglet dédié à l'entraînement de **Vocoder** (`tabs/train/nsf_hifigan.py`, `nsf_hifigan/`) :

- **Vocoders pris en charge :** `PC-NSF-HiFiGAN`, `NSF-HiFiGAN` et `Vocos` (24 kHz).
- **Modes :** Entraînement à partir de zéro ou fine-tuning depuis un checkpoint préentraîné compatible (par exemple `PC-NSF-HiFiGAN 2025.02` ou `Vocos 24 kHz`).
- **Modèle acoustique vs. vocoder :** Un modèle acoustique (comme Rectified Flow) prédit des caractéristiques spectrales (spectrogrammes mel) ; un vocoder transforme ces caractéristiques en ondes sonores audibles.
- **Limite importante :** Cet onglet est étroitement lié aux configurations mel de **Rectified Flow** (`check_registry_vocoder` / `mel_mismatch` dans `tabs/train/rectified_flow.py`). Choisir `HiFi-GAN` ou `RefineGAN` dans la WebUI d'entraînement **RVC** utilise l'architecture générateur/vocoder intégrée de RVC ; vous ne pouvez **pas** brancher arbitrairement un vocoder entraîné ici sur n'importe quel modèle RVC standard.

---

## Différences en Conversion Temps Réel

| Capacité Temps Réel | RVC Mainline | Applio | Redpanda-vc | Ilaria RVC |
| --- | --- | --- | --- | --- |
| **GUI Desktop Temps Réel** | **Oui** (`realtime_gui.py`) | **Temps réel WebUI ; GUI desktop autonome séparée non vérifiée** | **Oui** (`run-realtime-gui.bat`, RVC + Beatrice + RF) | **Non - vérifié** |
| **Temps réel navigateur WebUI** | **Non - vérifié** | **Oui** (`tabs/realtime`) | **Oui** (WebSocket binaire + repli HTTP streaming) | **Non - vérifié** |
| **Attribution Multi-GPU des flux** | **Non - vérifié** | **Non vérifié** | **Oui** (`Inference Device: Automatic` ou GPU spécifique) | **Non - vérifié** |

Dans l'onglet temps réel de la WebUI de Redpanda-vc (`README.md`, `tabs/inference/realtime.py`) :
- **Concurrence multi-GPU :** Deux GPU peuvent exécuter **deux flux simultanés distincts** (un flux par GPU pour préserver l'état audio). Des GPU supplémentaires ne se fusionnent **pas** pour accélérer un seul flux.
- **Transport :** Utilise un flux audio WebSocket binaire (y compris avec `--share`), avec files bornées et repli automatique vers le streaming HTTP si WebSocket est bloqué.

---

## Contrôles Avancés d'Entraînement

Au-delà de **Generator EMA Decay** et **Total Steps**, Redpanda-vc expose plusieurs réglages avancés dans **Training** (`tabs/train/rvc.py`) :

- **Dynamique d'entraînement :** `Learning Rate Schedule` (`Exponential` ou `Cosine`), `Warmup Steps`, `Learning Rate Decay Every X Steps`, `Final Learning Rate`, `Reset Optimizer State` et `Max Audio per Batch (sec)`.
- **Optimisation mémoire :** `Checkpointing` (activation checkpointing, hérité d'Applio, échange de la vitesse contre moins de VRAM) et `Cache Dataset in GPU` (hérité).
- **Sauvegardes & exports :** `Save Every X Steps`, `Save Only Latest`, `Save Every Weights` et `Generator EMA Decay`.

Les débutants n'ont **pas** besoin d'ajuster de planning cosinus, de warmup ou de décroissance personnalisée pour leur premier modèle RVC.

---

## Compatibilité des Modèles : Qu'est-ce qui Fonctionne Où ?

Porter l'extension `.pth` ne rend **pas** deux modèles interchangeables. La compatibilité dépend de l'architecture, du format de checkpoint, de l'embedder attendu, du décodeur vocoder et de l'index FAISS correspondant :

| Type de modèle | Redpanda-vc | RVC Mainline | Applio | Ilaria RVC | Autres Clients Compatibles |
| --- | --- | --- | --- | --- | --- |
| **RVC V1 (`.pth` inférence)** | **Oui** | **Oui** | **Inférence prise en charge ; UI d'entraînement axée sur V2** | **Oui** | **Pris en charge par les clients implémentant cette architecture** |
| **RVC V2 HiFi-GAN (`.pth`)** | **Oui** | **Oui** | **Oui** | **Oui** | **Pris en charge par les clients implémentant cette architecture** |
| **RVC V2 RefineGAN (`.pth`)** | **Oui** | **Non - vérifié** | **Oui** | **Oui** *(32 kHz)* | **Nécessite un décodeur compatible** (**Dépend de la version**) |
| **RVC V2 MRF HiFi-GAN (`.pth`)** | **Oui** *(inférence + CLI)* | **Non - vérifié** | **Oui** *(inférence + CLI)* | **Oui** *(UI + inférence)* | **Nécessite un décodeur compatible** (**Dépend de la version**) |
| **Rectified Flow (`.pth`)** | **Oui** | **Non - vérifié** | **Non - vérifié** | **Non - vérifié** | **Nécessite un décodeur compatible** *(pas du RVC V2 standard)* |
| **Beatrice 2 (dossier modèle)** | **Oui** | **Non - vérifié** | **Non - vérifié** | **Non - vérifié** | **Dépend de la version** *(chargeurs/VST Beatrice uniquement)* |
| **Vocoder personnalisé (`nsf_hifigan`)** | **Oui** *(pour Rectified Flow)* | **Non - vérifié** | **Non - vérifié** | **Non - vérifié** | **Nécessite un décodeur compatible** |
| **Checkpoints d'entraînement (`G_*`/`D_*`)** | **Oui** *(RVC)* | **Oui** *(RVC)* | **Oui** *(RVC)* | **Oui** *(RVC)* | **Non - vérifié** *(reprise d'entraînement uniquement)* |
| **Fichiers FAISS `.index`** | **Oui** *(embedder et dim. compatibles)* | **Oui** *(embedder et dim. compatibles)* | **Oui** *(embedder et dim. compatibles)* | **Oui** *(embedder et dim. compatibles)* | **Pris en charge par les clients RVC avec retrieval** *(embedder et dim. compatibles)* |

---

## Quelle Version RVC Choisir ?

- **Choisissez RVC Mainline** si vous souhaitez la base de code de référence d'origine et le flux classique `realtime_gui.py`.
- **Choisissez Applio** si vous voulez un espace RVC complet avec entraînement par époques et **TTS** intégré.
- **Choisissez Redpanda-vc** si vous recherchez spécifiquement **Generator EMA**, **sauvegarde par steps**, **Rectified Flow**, **entraînement/temps réel Beatrice 2**, **entraînement dédié de vocoders** ou **temps réel WebSocket / multi-flux** (notez que l'onglet `tts` d'Applio est absent de Redpanda-vc).
- **Choisissez Ilaria RVC** si vous préférez un studio RVC orienté hors ligne avec `Training Target: Steps`, `MRF HiFi-GAN` / `RefineGAN` sélectionnables en WebUI, **TTS** intégré (Kokoro, ElevenLabs, Windows), `Audio Analyzer`, `Voice Blender`, `RMVPE High Register` et `Proposed Pitch`.

---

## FAQ pour Débutants

**Qu'est-ce qu'un fork de RVC ?**
Un projet distinct qui copie une base de code RVC existante et y ajoute ou modifie des fonctionnalités.

**Redpanda-vc est-il identique à Applio ?**
Non. Redpanda-vc est un fork d'Applio ; il en partage l'interface de base mais ajoute Generator EMA, la sauvegarde par steps, Rectified Flow, Beatrice 2 et l'entraînement de vocoders, tout en omettant l'onglet `tts` d'Applio.

**Redpanda-vc produit-il de meilleurs modèles RVC ?**
Pas automatiquement. La qualité vocale dépend avant tout du dataset, du prétraitement et des réglages ; l'EMA et les plannings supplémentaires sont des outils à tester, pas des garanties.

**Qu'est-ce que l'EMA ?**
Exponential Moving Average : une moyenne glissante des poids du générateur maintenue pendant l'entraînement et utilisée lors de l'export des modèles d'inférence.

**Pourquoi Redpanda-vc sauvegarde-t-il par steps ?**
Parce que la sauvegarde par steps permet d'enregistrer à intervalles exacts de mises à jour (par ex. tous les `1000` steps), quelle que soit la taille du dataset.

**Ilaria RVC gère-t-il aussi l'entraînement par steps ?**
Oui, via `Training Target: Steps`, bien que sa `Save frequency` compte toujours en époques plutôt qu'en intervalles arbitraires de steps.

**Qu'est-ce que Rectified Flow ?**
Une architecture acoustique de diffusion/flow-matching inspirée de DiffSinger qui utilise des traits ContentVec et un vocoder séparé.

**Rectified Flow est-il identique à RVC V2 ?**
Non. Ce sont deux architectures totalement différentes et incompatibles entre elles.

**Qu'est-ce que Beatrice ?**
Une architecture de conversion vocale distincte et adaptée au CPU (issue de `beatrice-trainer`), différente de RVC et différente de l'usage de Beatrice uniquement comme extracteur F0.

**À quoi sert un vocoder ?**
Il convertit des caractéristiques acoustiques (telles que des spectrogrammes mel) en une onde audio audible.

**Puis-je utiliser un modèle Redpanda-vc dans un autre logiciel RVC ?**
Les modèles standards **RVC V1 / V2 HiFi-GAN** exportés depuis Redpanda-vc fonctionnent dans les clients implémentant ces décodeurs ; **Rectified Flow**, **Beatrice**, **RefineGAN** et **MRF HiFi-GAN** exigent des clients prenant explicitement en charge ces décodeurs.

**Redpanda-vc peut-il entraîner des modèles RVC normaux ?**
Oui, dans l'onglet **Train → RVC** (`HiFi-GAN` et `RefineGAN` dans la WebUI ; `MRF HiFi-GAN` dans le code/CLI).

**Redpanda-vc prend-il en charge le temps réel ?**
Oui, via l'onglet **Realtime** de la WebUI et via `run-realtime-gui.bat`.

**Le temps réel multi-GPU accélère-t-il une seule conversion vocale ?**
Non. Chaque flux reste sur un seul GPU ; des GPU supplémentaires permettent plusieurs flux simultanés.

**Les débutants doivent-ils choisir RVC, Rectified Flow ou Beatrice ?**
Commencez par **RVC** si vous voulez la plus large compatibilité de modèles et de clients ; explorez **Rectified Flow** ou **Beatrice** uniquement si vous visez leurs flux spécifiques.

**Quelles fonctions sont réellement propres à Redpanda-vc parmi ces quatre projets ?**
La combinaison de **Generator EMA**, de la **sauvegarde RVC par steps (`Save Every X Steps`)**, de **Rectified Flow**, de l'**entraînement/temps réel Beatrice 2** et de l'**entraînement dédié de vocoder `nsf_hifigan`** dans un même fork basé sur Applio.

---

## Sources et références techniques

Comparaison statique du code vérifiée sur les branches `main` le **2026-11-22** :

- **Redpanda-vc** (commit [`55a3a80`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80), 2026-10-31) : [Dépôt](https://github.com/redpanda343/Redpanda-vc) · [`tabs/train/train.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/tabs/train/train.py) · [`tabs/train/rvc.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/tabs/train/rvc.py) · [`rvc/train/train.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/rvc/train/train.py) · [`rectified_flow/`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80/rectified_flow) · [`beatrice/`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80/beatrice) · [`nsf_hifigan/`](https://github.com/redpanda343/Redpanda-vc/tree/55a3a80/nsf_hifigan) · [`tabs/inference/realtime.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/tabs/inference/realtime.py) · [`realtime_gui.py`](https://github.com/redpanda343/Redpanda-vc/blob/55a3a80/realtime_gui.py)
- **Applio** (commit [`445b0f6`](https://github.com/IAHispano/Applio/tree/445b0f6), 2026-11-19) : [Dépôt](https://github.com/IAHispano/Applio) · [`tabs/train/train.py`](https://github.com/IAHispano/Applio/blob/445b0f6/tabs/train/train.py) · [`rvc/infer/infer.py`](https://github.com/IAHispano/Applio/blob/445b0f6/rvc/infer/infer.py) · [`core.py`](https://github.com/IAHispano/Applio/blob/445b0f6/core.py) · [`rvc/train/train.py`](https://github.com/IAHispano/Applio/blob/445b0f6/rvc/train/train.py) · [`tabs/tts/`](https://github.com/IAHispano/Applio/tree/445b0f6/tabs/tts) · [`tabs/realtime/`](https://github.com/IAHispano/Applio/tree/445b0f6/tabs/realtime) · [`rvc/realtime/`](https://github.com/IAHispano/Applio/tree/445b0f6/rvc/realtime)
- **RVC Mainline** (commit [`81eed5e`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/tree/81eed5e), 2026-08-04) : [Dépôt](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [`configs/config.py`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/81eed5e/configs/config.py) · [`train/train.py`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/81eed5e/train/train.py) · [`realtime_gui.py`](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/81eed5e/realtime_gui.py)
- **Ilaria RVC** (commit [`a887ba5`](https://github.com/TheStingerX/Ilaria-RVC/tree/a887ba5), 2026-11-21) : [Dépôt](https://github.com/TheStingerX/Ilaria-RVC) · [`app/ILARIA_RVC.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/a887ba5/app/ILARIA_RVC.py) · [`app/infer/modules/train/train.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/a887ba5/app/infer/modules/train/train.py) · [`app/ilaria/ilaria_tts.py`](https://github.com/TheStingerX/Ilaria-RVC/blob/a887ba5/app/ilaria/ilaria_tts.py)
