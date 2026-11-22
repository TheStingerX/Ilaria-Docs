# Entraîner des Modèles RVC dans Redpanda-vc - EMA et Sauvegarde par Steps

[Redpanda-vc sur GitHub](https://github.com/redpanda343/Redpanda-vc) · [Configurer Redpanda-vc](first-run.md) · [Guide général d'entraînement RVC](../../model-training/training.md)

Entraîner un modèle vocal consiste à apprendre à un programme à reproduire une voix cible à partir d'extraits audio propres. Voici les termes essentiels en langage simple :

- **Weights (poids) :** Les nombres internes du modèle qui s'ajustent peu à peu pendant l'apprentissage.
- **Generator (`G`) :** La partie du modèle qui génère l'audio de la voix convertie.
- **Discriminator (`D`) :** Un réseau auxiliaire utilisé uniquement pendant l'entraînement pour juger le réalisme du générateur face aux vrais enregistrements.
- **Optimizer :** Le moteur mathématique qui met à jour les poids après chaque étape d'entraînement.
- **Step :** Une mise à jour des poids après le traitement d'un petit groupe (**batch**) d'extraits audio.
- **Epoch :** Un passage complet sur l'ensemble du dataset préparé.
- **Checkpoint (`G_*.pth` / `D_*.pth`) :** Une sauvegarde de l'état d'entraînement permettant de mettre en pause et de reprendre plus tard.
- **EMA (Exponential Moving Average) :** Une moyenne glissante lissée des poids du générateur maintenue durant l'entraînement.

> EMA helps smooth out changes in the generator's weights during training. Instead of exporting only the latest generator weights, Redpanda-vc can export a running average of them.

L'entraînement ne donne pas instantanément une voix parfaite et dépend fortement du dataset et des réglages. Ce que l'EMA **ne fait pas** :

- EMA n'est **pas** un filtre audio ni un débruiteur.
- EMA ne modifie **pas** les fichiers du dataset.
- EMA ne répare **pas** les enregistrements écrêtés ou bruités.
- EMA ne garantit **pas** une meilleure qualité audio dans tous les cas.
- EMA ne supprime **pas** toute la variabilité de l'entraînement.

---

## Qu'est-ce que l'EMA ?

Imaginez un élève qui s'entraîne à prononcer un mot difficile. Un essai isolé peut être légèrement meilleur ou moins bon que le précédent. Observer la tendance sur plusieurs essais récents donne une image plus stable que de juger uniquement sur le dernier essai.

*(Ce n'est qu'une analogie : l'EMA n'écoute pas l'audio et ne choisit pas les meilleurs extraits.)*

### Comment Redpanda-vc exécute réellement l'EMA

Dans `rvc/train/train.py` :

1. Le générateur s'entraîne normalement sur chaque batch.
2. L'optimiseur met à jour les poids courants du générateur.
3. Juste après chaque mise à jour du générateur (sur rank `0`), `GeneratorEMA.update()` met à jour une copie moyennée séparée des poids (hors `enc_q`, utilisé uniquement en entraînement).
4. Cette moyenne glissante reste en mémoire et est enregistrée dans le checkpoint `G`.
5. Lorsque `Generator EMA Decay > 0`, Redpanda-vc exporte les modèles `.pth` d'inférence à partir de ces poids EMA plutôt que des poids bruts courants.

**L'EMA est mis à jour à chaque step, pas une fois par époque.** Redpanda-vc ne fait **pas** la moyenne de plusieurs `.pth` déjà sauvegardés sur disque.

<details>
<summary>Détails mathématiques optionnels : formule standard vs. formule corrigée de Redpanda-vc</summary>

Formule standard intuitive :

```text
EMA_new = decay * EMA_previous + (1 - decay) * current_weights
```

Dans `rvc/train/train.py` (`GeneratorEMA.update()`, lignes 199-205), Redpanda-vc calcule un facteur corrigé selon le nombre de mises à jour (`updates`) :

```text
effective_decay = beta * (1 - beta ** (updates - 1)) / (1 - beta ** updates)
```

où `beta` correspond à `ema_decay`. Cela réduit l'influence de l'initialisation au début avant de tendre vers `beta`.

</details>

---

## Comprendre Generator EMA Decay

Dans **Training → Advanced Settings**, **Generator EMA Decay** (`tabs/train/rvc.py`, lignes 809-819) va de `0` à `0.9999` (défaut **`0.999`**, pas `0.0001`) :

- **`0` :** Désactive `GeneratorEMA` et exporte les poids courants du générateur.
- **`0.999` (Défaut) :** Maintient une moyenne glissante exponentielle qui lisse les oscillations entre steps tout en restant réactive aux mises à jour récentes.
- **`0.9999` :** Moyenne sur une fenêtre plus longue et réagit plus lentement aux changements récents. `0.9999` n'est **pas** automatiquement meilleur que `0.999`, et il n'existe aucune valeur idéale universelle. Les débutants peuvent partir de **`0.999`** et comparer à l'oreille.

---

## Pourquoi Redpanda-vc utilise l'EMA ?

Dans la littérature (documentation PyTorch et Morales-Brotons, Vogels et Hendrikx, 2024), la moyenne des poids est étudiée pour atténuer les oscillations d'optimisation.

- **Bénéfices potentiels (non garantis) :** Moins d'oscillations entre exports, plus de continuité entre sauvegardes, atténuation d'une partie de la variabilité des mises à jour.
- **Limites :** Ne remplace pas un bon dataset, n'empêche pas le surapprentissage (overfitting) ni les échecs, ne réduit pas le nombre d'étapes nécessaires, ne sélectionne pas le meilleur checkpoint automatiquement et consomme un peu plus de mémoire et de calcul.

---

## Poids EMA vs. Checkpoints d'entraînement

| Fichier / État | Emplacement | Contenu | Usage |
| --- | --- | --- | --- |
| **Checkpoint Generator (`G_*.pth`)** | `logs/<model_name>/` | Poids courants, optimiseur, scaler, `iteration`, `step`, `epoch_step`, RNG, état `ema` | Reprendre l'entraînement (et export manuel) |
| **Checkpoint Discriminator (`D_*.pth`)** | `logs/<model_name>/` | Poids du discriminateur, optimiseur, scaler, `step` | Reprendre l'entraînement avec `G_*.pth` |
| **Poids EMA** | En mémoire et dans `G_*.pth` (`checkpoint["ema"]["weights"]`) | Moyenne glissante du générateur (hors `enc_q`) | Produire les `.pth` d'inférence lissés |
| **Modèle d'inférence (`<name>_<epoch>e_<step>s.pth`)** | `logs/<model_name>/` | Poids d'inférence compacts + métadonnées | Conversion vocale uniquement (**ne reprend pas** l'entraînement) |

L'EMA s'applique **uniquement au générateur (`net_g`)**, jamais au discriminateur (`net_d`).

---

## Steps vs. Epochs

- **Epoch :** Un passage complet sur le dataset préparé.
- **Batch :** Un petit groupe d'extraits traités ensemble.
- **Step :** Une mise à jour après un batch (ni 1 fichier audio, ni 1 seconde).

**Exemple hypothétique :** Si votre dataset et votre `Batch Size` produisent 100 steps par époque, alors `100` steps ≈ `1` époque, `500` steps ≈ `5` époques, `1 000` steps ≈ `10` époques. Ce ratio varie selon chaque dataset et configuration.

---

## Sauvegarde par Steps dans Redpanda-vc

- **Total Steps (défaut `10000`) :** Objectif global de steps (pas un ajout automatique). Si vous reprenez un modèle déjà à `10000`, augmentez `Total Steps`.
- **Save Every X Steps (défaut `1000`) :** Sauvegarde `G` et `D` tous les `X` steps, même en milieu d'époque.
- **Sauvegarde finale :** Redpanda-vc sauvegarde toujours `G`/`D` et un `.pth` d'inférence au step final, même s'il n'est pas multiple de `Save Every X Steps`.
- **Save Every Weights (défaut `True`) :** Exporte un `.pth` d'inférence à chaque sauvegarde intermédiaire et à la fin (sinon uniquement à la fin).
- **Save Only Latest (défaut `True`) :** Écrase `G_2333333.pth` et `D_2333333.pth` (`LATEST_CHECKPOINT_SUFFIX`) pour économiser l'espace disque (empêche de revenir à un checkpoint `G`/`D` intermédiaire antérieur, sans affecter les `.pth` d'inférence exportés).

---

## Votre premier entraînement RVC dans Redpanda-vc

1. **Préparation :** Installez/lancez Redpanda-vc ([Configurer Redpanda-vc](first-run.md)), ouvrez **Train → RVC**, renseignez **Model Name**, **Sample Rate**, **Version**, **Vocoder** et préparez des enregistrements autorisés propres.
2. **Preprocess :** Indiquez **Dataset Path** puis cliquez **Preprocess Dataset**.
3. **Extract :** Choisissez l'extracteur F0 (`rmvpe`) et **Embedder Model** (`contentvec`), puis cliquez **Extract Features** (n'entraîne pas encore les poids `.pth`).
4. **Training :** Réglez **Batch Size**, gardez par exemple les valeurs par défaut illustratives (**Total Steps** `10000`, **Save Every X Steps** `1000`, et sous **Advanced Settings** : **Save Only Latest** activé, **Save Every Weights** activé, **Generator EMA Decay** `0.999`). Cliquez **Start Training**, suivez avec **Pause Training** / **Resume Training** / **Stop Training**, puis **Generate Index** à la fin.
5. **Sortie (`logs/<model_name>/`) :** `G_2333333.pth` / `D_2333333.pth` (ou `G_<step>.pth` / `D_<step>.pth`) pour reprendre, et `<model_name>_<epoch>e_<step>s.pth` pour l'inférence.

---

## Reprendre un entraînement en toute sécurité

`latest_checkpoint_pair()` associe le `G_*.pth` et le `D_*.pth` les plus récents (les deux sont requis). `restore()` restaure époque, `epoch_step`, `global_step`, scaler, RNG et optimiseurs. `build_ema()` recharge `checkpoint["ema"]` ou réinitialise l'EMA depuis les poids repris en cas d'absence/incompatibilité. Les steps effectués après la dernière sauvegarde avant un arrêt sont perdus.

- **Reset Optimizer State :** Réinitialise les moments de l'optimiseur en conservant poids, `global_step` et learning rate schedule (laissez **OFF** en reprise normale).
- **Fresh Training (`--cleanup`) :** **Supprime** les checkpoints `G_*`/`D_*`, `spec.pt` et logs précédents (laissez **OFF** pour reprendre).
- **Save Every X Steps vs. Checkpointing :** **Save Every X Steps** gère les sauvegardes disque ; **Checkpointing** est l'*activation checkpointing* pour réduire la VRAM.

---

## Exportation et comparaison des résultats

Lors des exports automatiques (`export_state_dict()`) ou manuels (`Export Model` -> `checkpoint_exporter.py`), Redpanda-vc utilise automatiquement `ema["weights"]` s'il est présent dans le checkpoint, sans bouton séparé Raw/EMA dans la WebUI. Pour vérifier si l'EMA améliore votre voix, comparez deux expériences contrôlées (`0.999` vs `0`) au **même nombre de steps** sur des extraits hors dataset, sans vous fier uniquement aux pertes TensorBoard.

---

## Dépannage pour débutants

| Problème | Cause possible | Quoi vérifier | Solution |
| --- | --- | --- | --- |
| **L'entraînement ne démarre pas** | Preprocess/extract manquant ou verrou `training_state.json` | Premier message du terminal | Terminez **Preprocess Dataset** et **Extract Features** |
| **GPU out of memory** | `Batch Size` trop élevé ou `Cache Dataset in GPU` actif | VRAM et terminal | Baissez **Batch Size**, coupez **Cache Dataset in GPU** ou activez **Checkpointing** |
| **L'EMA ne semble rien changer** | Peu de steps ou decay à `0` | `Generator EMA Decay` et résumé | Vérifiez `generator EMA` au démarrage et comparez au même step |
| **EMA Decay à `0`** | Curseur sur `0` | **Advanced Settings → Generator EMA Decay** | Remettez `0.999` pour la prochaine session |
| **Aucun `.pth` intermédiaire** | **Save Every Weights** désactivé | **Advanced Settings → Save Every Weights** | Activez **Save Every Weights** |
| **Seulement les derniers `G`/`D`** | **Save Only Latest** activé | `logs/<model_name>/` | Désactivez **Save Only Latest** avant de lancer pour garder l'historique |
| **Checkpoint `G` ou `D` manquant** | Fichier supprimé ou déplacé | Paire `G_*` / `D_*` | Les deux fichiers de même suffixe sont requis pour reprendre |
| **Reprise à un step antérieur** | Arrêt avant le prochain `Save Every X Steps` | Console | Normal : les steps après la dernière sauvegarde sont perdus |
| **Erreur de reprise EMA** | Checkpoint sans EMA ou incompatible | Message console | Redpanda-vc relance l'EMA depuis les poids repris |
| **Fresh Training a tout effacé** | **Fresh Training** coché | `logs/<model_name>/` | Décochez **Fresh Training** lors d'une reprise |
| **Total Steps déjà atteint** | `global_step >= Total Steps` | Console | Augmentez **Total Steps** et cliquez **Start Training** |
| **Un `.pth` exporté ne reprend pas** | Fichier d'inférence au lieu de `G_*.pth` + `D_*.pth` | Nom du fichier | Reprenez depuis `logs/<model_name>/` avec `G_*.pth` et `D_*.pth` |
| **Hausse anormale de VRAM** | **Checkpointing** off ou **Cache Dataset in GPU** on | **Advanced Settings** | Activez **Checkpointing**, coupez **Cache Dataset in GPU**, baissez **Batch Size** |

---

## FAQ

**Que signifie EMA ?** Exponential Moving Average : moyenne glissante des poids du générateur maintenue durant l'entraînement.
**L'EMA améliore-t-il la qualité ?** Il peut lisser les oscillations, sans garantie ; testez à l'oreille.
**Faut-il laisser EMA à `0.999` ?** Oui, c'est le réglage par défaut pour débuter.
**Que se passe-t-il si EMA Decay vaut `0` ?** L'EMA est désactivé et les poids courants du générateur sont exportés.
**`0.9999` est-il meilleur que `0.999` ?** Pas automatiquement ; il réagit plus lentement aux mises à jour récentes.
**L'EMA accélère-t-il l'entraînement ?** Non, il ajoute une copie de poids et une mise à jour par step.
**L'EMA empêche-t-il l'overfitting ?** Non.
**L'EMA s'applique-t-il au discriminateur ?** Non, uniquement au générateur (`net_g`).
**Différence entre epoch et step ?** Une époque parcourt tout le dataset ; un step est une mise à jour après un batch.
**Peut-on sauvegarder en milieu d'époque ?** Oui, via `Save Every X Steps`.
**Perd-on du progrès en arrêtant ?** Oui, les steps effectués après le dernier checkpoint sauvegardé.
**Différence entre Save Only Latest et Save Every Weights ?** `Save Only Latest` écrase `G_2333333.pth` / `D_2333333.pth` ; `Save Every Weights` exporte un `.pth` d'inférence à chaque sauvegarde.
**Checkpointing est-il identique aux sauvegardes ?** Non, c'est l'*activation checkpointing* pour réduire la VRAM.
**Peut-on reprendre depuis un `.pth` d'inférence ?** Non, il faut `G_*.pth` et `D_*.pth`.

---

## Sources officielles et lectures complémentaires

- **Dépôt Redpanda-vc :** [github.com/redpanda343/Redpanda-vc](https://github.com/redpanda343/Redpanda-vc)
- **Implémentation `GeneratorEMA` :** [`rvc/train/train.py` (lignes 179-217)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py#L179-L217)
- **Sauvegarde par steps, reprise et export :** [`rvc/train/train.py` (lignes 1146-1195)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py#L1146-L1195)
- **Interface d'entraînement :** [`tabs/train/rvc.py` (lignes 663-880)](https://github.com/redpanda343/Redpanda-vc/blob/main/tabs/train/rvc.py#L663-L880)
- **Exportateur manuel :** [`rvc/train/process/checkpoint_exporter.py` (lignes 44-117)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/process/checkpoint_exporter.py#L44-L117)
- **Utilitaires et contrôle :** [`rvc/train/utils.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/utils.py) · [`rvc/train/process/training_control.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/process/training_control.py)
- **PyTorch :** [Weight Averaging (SWA and EMA)](https://docs.pytorch.org/docs/stable/optim.html#weight-averaging-swa-and-ema) · [`torch.optim.swa_utils.AveragedModel`](https://docs.pytorch.org/docs/stable/generated/torch.optim.swa_utils.AveragedModel.html)
- **Article scientifique :** Morales-Brotons, Vogels et Hendrikx, *Exponential Moving Average of Weights in Deep Learning: Dynamics and Benefits* ([OpenReview](https://openreview.net/forum?id=2M9CUnYnBA))
