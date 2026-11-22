---
label: "Entraîner des modèles RVC (EMA & Steps)"
icon: ":mortar_board:"
order: 97
permalink: /fr/ilaria-rvc/redpanda/training/
description: "Guide complet pour débutants, vérifié dans le code, sur l'entraînement de modèles RVC dans Redpanda-vc : Generator EMA, sauvegarde de checkpoints par pas, reprise, exportation et dépannage."
---
# Entraîner des Modèles RVC dans Redpanda-vc - EMA & Sauvegarde par Pas

[Redpanda-vc sur GitHub](https://github.com/redpanda343/Redpanda-vc) · [Configurer Redpanda-vc](first-run.md) · [Redpanda-vc vs autres versions RVC](differences.md) · [Guide Général d'Entraînement RVC](../../model-training/training.md)

Entraîner un modèle vocal apprend à un programme à reproduire une voix cible à partir d'une collection d'extraits audio propres. Si vous débutez en RVC, vous n'avez pas besoin de mémoriser du jargon technique avant de commencer. Voici les termes clés en langage clair :

- **Weights (Poids) :** Les nombres internes du modèle qui s'ajustent petit à petit à mesure qu'il apprend une voix.
- **Generator (`G`) :** La partie du modèle qui crée réellement l'audio de la voix convertie.
- **Discriminator (`D`) :** Un réseau auxiliaire utilisé uniquement pendant l'entraînement pour juger à quel point l'audio du générateur sonne réaliste par rapport aux vrais enregistrements.
- **Optimizer (Optimiseur) :** Le moteur mathématique qui met à jour les poids du modèle après chaque pas d'entraînement.
- **Step (Pas) :** Une seule mise à jour des poids après le traitement d'un petit groupe (**batch**) d'extraits audio.
- **Epoch (Époque) :** Un passage complet sur l'ensemble de votre dataset préparé.
- **Checkpoint (`G_*.pth` / `D_*.pth`) :** Une capture d'entraînement sauvegardée permettant de mettre en pause et de reprendre l'entraînement plus tard.
- **EMA (Exponential Moving Average) :** Une moyenne glissante lissée des poids du générateur maintenue pendant l'entraînement.

> EMA aide à lisser les variations des poids du générateur pendant l'entraînement. Au lieu d'exporter uniquement les tout derniers poids du générateur, Redpanda-vc peut en exporter une moyenne glissante.

L'entraînement ne produit pas une voix terminée instantanément, et la qualité finale dépend fortement de vos enregistrements source, de la préparation du dataset et des réglages d'entraînement. Avant de plonger, gardez à l'esprit ce que EMA **ne fait pas** :

- EMA n'est **pas** un filtre audio ni un débruiteur.
- EMA n'édite **pas** et ne nettoie **pas** vos fichiers de dataset.
- EMA ne répare **pas** les enregistrements saturés ou bruités.
- EMA ne garantit **pas** une meilleure qualité audio sur toutes les voix.
- EMA ne supprime **pas** tout l'aléa de l'entraînement.

---

## Qu'est-ce que l'EMA ?

Imaginez un élève s'entraînant à prononcer un mot difficile. Une tentative isolée peut sembler légèrement plus claire ou légèrement plus rugueuse que la précédente. Observer la tendance sur de nombreuses tentatives récentes donne une image plus régulière des progrès de l'élève que de juger uniquement sur la toute dernière tentative.

*(Gardez à l'esprit qu'il s'agit uniquement d'une analogie : EMA n'écoute pas l'audio, ne juge pas la prononciation et ne choisit pas de "meilleurs" enregistrements de lui-même.)*

### Comment Redpanda-vc exécute réellement l'EMA

Dans `rvc/train/train.py`, Redpanda-vc maintient l'EMA en mémoire pendant l'entraînement :

1. Le générateur s'entraîne normalement sur chaque batch.
2. L'optimiseur met à jour les poids en direct du générateur.
3. Immédiatement après chaque pas de l'optimiseur du générateur (sur le rang `0`), `GeneratorEMA.update()` met à jour une copie moyennée séparée des poids du générateur (en excluant `enc_q`, utilisé uniquement pendant l'entraînement).
4. Cette moyenne glissante reste en mémoire et est sauvegardée dans le checkpoint d'entraînement `G`.
5. Lorsque EMA est activé (`Generator EMA Decay > 0`), Redpanda-vc exporte les modèles `.pth` d'inférence depuis ces poids EMA plutôt que depuis les poids bruts en direct du générateur.

**EMA se met à jour à chaque step d'entraînement, pas une fois par epoch.** Redpanda-vc **ne** moyenne **pas** plusieurs fichiers `.pth` déjà enregistrés sur disque ; il maintient une unique moyenne glissante continue en mémoire pendant l'entraînement.

<details>
<summary>Détails mathématiques optionnels : EMA standard vs. formule corrigée du biais de Redpanda-vc</summary>

La mise à jour EMA standard intuitive est :

```text
EMA_new = decay * EMA_previous + (1 - decay) * current_weights
```

Dans `rvc/train/train.py` (`GeneratorEMA.update()`, lignes 199-205), Redpanda-vc n'applique pas une décroissance constante dès la toute première mise à jour. À la place, il calcule une décroissance effective corrigée du biais selon le nombre de mises à jour (`updates`) :

```text
effective_decay = beta * (1 - beta ** (updates - 1)) / (1 - beta ** updates)
```

où `beta` est votre réglage `ema_decay`. Cette correction de démarrage réduit l'influence des poids initiaux lors des toutes premières mises à jour, puis se rapproche de `beta` à mesure que `updates` augmente. Les paramètres en virgule flottante sont mélangés via `torch._foreach_lerp_`, tandis que les buffers non flottants sont copiés depuis le générateur en direct.

</details>

---

## Comprendre Generator EMA Decay

Dans **Training → Advanced Settings**, Redpanda-vc expose **Generator EMA Decay** (`tabs/train/rvc.py`, lignes 809-819) :

- **Minimum :** `0`
- **Maximum :** `0.9999`
- **Défaut :** `0.999`
- **Pas du curseur :** `0.0001`

### Signification des valeurs

- **`Generator EMA Decay = 0` :** Désactive complètement `GeneratorEMA`. Les modèles `.pth` d'inférence sont exportés directement depuis les poids en direct du générateur.
- **`Generator EMA Decay = 0.999` (Défaut) :** Maintient une moyenne glissante exponentielle qui accorde un poids significatif aux mises à jour récentes du générateur tout en lissant les fluctuations pas à pas.
- **`Generator EMA Decay = 0.9999` :** Fait évoluer la moyenne glissante plus lentement et moyenne sur une fenêtre de mises à jour plus longue. Cela peut accroître la régularité de la moyenne, mais rend aussi les poids EMA plus lents à réagir aux améliorations récentes du générateur en direct.

Des valeurs plus basses s'adaptent plus vite aux poids récents, tandis que des valeurs plus élevées moyennent sur plus de pas. `0.9999` n'est **pas** automatiquement meilleur que `0.999`, et il n'existe aucun decay "meilleur" universel pour la parole, le chant, les petits datasets ou les grands datasets. Si vous débutez, partir du réglage par défaut **`0.999`** et comparer des rendus audio réels avant d'ajuster constitue une base pratique.

---

## Pourquoi Redpanda-vc utilise-t-il l'EMA ?

Dans la littérature sur l'apprentissage profond (comme la documentation de moyennage de poids de PyTorch et Morales-Brotons, Vogels et Hendrikx, 2024), le moyennage des poids le long d'une trajectoire d'entraînement est étudié parce que les mises à jour individuelles SGD/Adam peuvent osciller autour de bonnes solutions.

### Bénéfices potentiels (sans garantie)

- Réduction des oscillations pas à pas dans les poids exportés.
- Meilleure continuité entre des exportations consécutives.
- Atténuation d'une partie de la variabilité d'une mise à jour à l'autre pendant l'entraînement.
- Comportement potentiellement plus stable du modèle exporté, bien qu'une réelle amélioration audio sur votre dataset RVC spécifique exige des tests d'écoute.

### Limitations importantes

- EMA ne remplace **pas** un dataset propre et bien préparé.
- EMA n'élimine **pas** le surapprentissage (overfitting).
- EMA n'empêche **pas** un entraînement défaillant ou instable d'échouer.
- EMA ne garantit **pas** une meilleure ressemblance vocale ni une meilleure prononciation.
- EMA ne promet **pas** moins de pas ou d'époques d'entraînement.
- EMA n'est **pas** un sélecteur automatique du "meilleur checkpoint".
- EMA conserve une copie supplémentaire des poids du générateur en mémoire et ajoute un léger coût de mise à jour par pas.

---

## Poids EMA vs. Checkpoints d'Entraînement

Dans Redpanda-vc, quatre éléments distincts existent pendant une session. Ne les confondez pas :

| Fichier / État | Emplacement | Contenu | Usage |
| --- | --- | --- | --- |
| **Generator checkpoint (`G_*.pth`)** | `logs/<model_name>/` | Poids en direct du générateur, état optimiseur, scaler, `iteration` (époque), `step`, `epoch_step`, RNG et état `ema` (si activé) | Reprendre l'entraînement (et export manuel) |
| **Discriminator checkpoint (`D_*.pth`)** | `logs/<model_name>/` | Poids du discriminateur, état optimiseur, scaler, `step` | Reprendre l'entraînement avec `G_*.pth` |
| **EMA weights** | En mémoire pendant l'entraînement et dans `G_*.pth` (`checkpoint["ema"]["weights"]`) | Moyenne glissante des poids du générateur (hors `enc_q`) | Générer des exports `.pth` d'inférence lissés |
| **Modèle d'inférence (`<name>_<epoch>e_<step>s.pth`)** | `logs/<model_name>/` | Poids compacts d'inférence seule du générateur + métadonnées | Conversion vocale uniquement (**impossible** de reprendre l'entraînement) |

**Note :** Dans le code vérifié de Redpanda-vc (`train.py`), l'EMA est appliquée **uniquement au générateur (`net_g`)**, jamais au discriminateur (`net_d`).

---

## Training Steps vs. Epochs

- **Epoch (Époque) :** Un passage complet sur le dataset d'entraînement préparé.
- **Batch :** Un petit groupe de tranches audio traitées ensemble en une passe avant/arrière.
- **Step (Pas) :** Une mise à jour de l'optimiseur après traitement d'un batch. Un pas n'est **ni** un fichier audio **ni** une seconde d'audio.

### Exemple hypothétique

Supposons que votre dataset préparé et votre `Batch Size` produisent **100 pas par époque** :

- `100` pas ≈ `1` époque
- `500` pas ≈ `5` époques
- `1,000` pas ≈ `10` époques

Le ratio réel de pas par époque dépend de la durée de votre dataset, du découpage, de `Batch Size` et de `Max Audio per Batch (sec)`. Ne supposez jamais que 100 pas égalent 1 époque pour tous les modèles.

---

## Sauvegarde de Checkpoints par Pas

Au lieu d'attendre la fin d'une époque complète avant de sauvegarder, Redpanda-vc planifie les sauvegardes selon le **nombre de pas** (`tabs/train/rvc.py`, lignes 663-703 ; `rvc/train/train.py`, lignes 917-921 et 1146-1195) :

### Total Steps

- **Défaut :** `10000` (plage du curseur `1` à `1000000`, pas `1`).
- Définit le **nombre total de pas cible** pour l'expérience, et **non** "ajouter 10,000 pas de plus". Si votre modèle repris est déjà au pas `10000`, vous devez augmenter `Total Steps` (par exemple à `15000`) pour continuer l'entraînement.

### Save Every X Steps

- **Défaut :** `1000` (plage du curseur `1` à `100000`, pas `1`).
- Sauvegarde les checkpoints `G` et `D` tous les `X` pas d'entraînement (`self.global_step % save_every_steps == 0`).
- **Exemple :** Avec `Total Steps = 10000` et `Save Every X Steps = 1000`, Redpanda-vc sauvegarde aux pas `1000`, `2000`, `3000`, ..., `10000`, que ces pas tombent en milieu d'époque ou non.

### Final Save

Même si `Total Steps` n'est pas un multiple de `Save Every X Steps` (par exemple, `Total Steps = 2500` et `Save Every X Steps = 1000`), Redpanda-vc sauvegarde **toujours** à la fois les checkpoints `G`/`D` et un modèle `.pth` d'inférence en atteignant le pas final (`final = self.global_step >= self.args.total_steps`).

### Save Every Weights

- **Défaut :** **Activé** (`True`).
- Lorsqu'il est **activé**, Redpanda-vc exporte un modèle `.pth` d'inférence à chaque intervalle de sauvegarde *et* au pas final.
- Lorsqu'il est **désactivé**, les checkpoints `G`/`D` continuent d'être sauvegardés tous les `Save Every X Steps`, mais un `.pth` d'inférence automatique n'est exporté qu'au pas final.

### Save Only Latest

- **Défaut :** **Activé** (`True`).
- Lorsqu'il est **activé**, les checkpoints `G` et `D` écrasent des noms fixes (`G_2333333.pth` et `D_2333333.pth`, où `2333333` est `LATEST_CHECKPOINT_SUFFIX`) pour économiser de l'espace disque.
- Lorsqu'il est **désactivé**, les checkpoints incluent le numéro de pas (`G_1000.pth`, `D_1000.pth`, `G_2000.pth`, `D_2000.pth`).
- **Important :** `Save Only Latest` n'affecte que les checkpoints d'entraînement `G`/`D`, **pas** les modèles `.pth` d'inférence exportés (sauf si vous désactivez `Save Every Weights`). Gardez à l'esprit qu'avec `Save Only Latest` activé, vous ne pouvez pas revenir à un checkpoint `G`/`D` intermédiaire plus ancien si l'entraînement se dégrade plus tard.

---

## Votre Premier Entraînement RVC dans Redpanda-vc

### 1. Préparation

1. Installez et lancez Redpanda-vc (voir [Configurer Redpanda-vc](first-run.md)).
2. Ouvrez l'onglet **Train** et sélectionnez **RVC** (si votre build affiche plusieurs familles de modèles).
3. Sous **Model Settings**, saisissez un **Model Name** unique (le nom de votre expérience).
4. Choisissez un **Sample Rate** compatible (`32k`, `40k` ou `48k`), une **Version** (`v1` ou `v2`) et un **Vocoder** (`HiFi-GAN`, `MRF HiFi-GAN` ou `RefineGAN` selon vos pré-entraînés et votre application d'inférence cible).
5. Préparez un dataset propre et sec d'**enregistrements autorisés** dans un dossier dédié.

### 2. Preprocess

1. Ouvrez l'accordéon **Preprocess**.
2. Saisissez ou sélectionnez le chemin de votre dossier dataset dans **Dataset Path** (cliquez sur **Refresh** si besoin).
3. Cliquez sur **Preprocess Dataset** et attendez la fin du découpage et de la normalisation audio dans `logs/<model_name>/`.

### 3. Extract

1. Ouvrez l'accordéon **Extract**.
2. Sélectionnez votre **Pitch extraction algorithm** (tel que `rmvpe`) et **Embedder Model** (généralement `contentvec`).
3. Cliquez sur **Extract Features**. *(Cela prépare les caractéristiques de hauteur et de contenu pour l'entraînement ; cela **n'entraîne pas** encore les poids `.pth`.)*

### 4. Training

1. Ouvrez l'accordéon **Training**.
2. Réglez **Batch Size** sur une valeur que la VRAM de votre GPU peut supporter confortablement.
3. Pour un premier test illustratif, vous pouvez laisser les valeurs par défaut actuelles :
   - **Total Steps :** `10000`
   - **Save Every X Steps :** `1000`
4. Dépliez **Advanced Settings** pour vérifier :
   - **Save Only Latest :** Activé (`True`)
   - **Save Every Weights :** Activé (`True`)
   - **Generator EMA Decay :** `0.999`
   *(Ces réglages par défaut sont des valeurs de départ illustratives, pas des réglages optimaux garantis pour chaque dataset.)*
5. Cliquez sur **Start Training**.
6. Suivez l'avancement via le statut terminal/UI, **Pause Training** / **Resume Training** / **Stop Training**, et les journaux TensorBoard (`logs/<model_name>/eval/`).
7. Une fois terminé, cliquez sur **Generate Index** si vous souhaitez un fichier `.index` associé.

### 5. Fichiers de Sortie

Dans `logs/<model_name>/`, vous trouverez :

- **Checkpoints reprenables :** `G_2333333.pth` et `D_2333333.pth` (quand **Save Only Latest** est activé) ou `G_<step>.pth` / `D_<step>.pth` (quand il est désactivé).
- **Modèles d'inférence :** `<model_name>_<epoch>e_<step>s.pth` (par exemple, `MyVoice_45e_1000s.pth`). Ce sont les fichiers que vous chargez pour la conversion vocale.

---

## Reprendre l'Entraînement en Toute Sécurité

Lorsque vous relancez l'entraînement sur une expérience existante (`rvc/train/train.py`, lignes 420-436, 528-538, 763-803, 844-853) :

1. `latest_checkpoint_pair()` recherche dans `logs/<model_name>/` le fichier `G_*.pth` le plus récent par date de modification et l'associe au suffixe `D_*.pth` correspondant. **Les deux fichiers `G` et `D` doivent exister** pour reprendre.
2. `restore()` recharge `epoch`, `start_batch` (`epoch_step`), `global_step` (`step`), le `scaler` AMP, l'état RNG et les deux optimiseurs.
3. `build_ema()` restaure `GeneratorEMA` depuis `checkpoint["ema"]` lorsque `ema_decay > 0`. Si l'état `ema` est absent ou incompatible (par exemple lors d'une reprise depuis un checkpoint sans EMA), Redpanda-vc journalise un avis et initialise l'EMA depuis les poids repris du générateur au lieu de planter.
4. Tous les pas terminés *après* le dernier checkpoint sauvegardé avant un plantage ou un arrêt manuel sont perdus et seront ré-exécutés depuis ce pas sauvegardé.

### Contrôles à ne pas confondre

- **Reset Optimizer State :** Conserve les poids du modèle, `global_step` et le calendrier de taux d'apprentissage, mais efface les buffers de momentum/moments de l'optimiseur (`state={}`). Utilisez-le uniquement pour réinitialiser volontairement la dynamique de l'optimiseur ; une reprise normale laisse ceci sur **OFF**.
- **Fresh Training (`--cleanup`) :** **Supprime** tous les checkpoints `G_*` et `D_*` générés précédemment, les fichiers `spec.pt` et les journaux TensorBoard pour cette expérience. Laissez ceci sur **OFF** lors de toute reprise.
- **Save Every X Steps vs. Checkpointing :** **Save Every X Steps** contrôle la fréquence d'écriture des checkpoints sur disque. **Checkpointing** (dans **Advanced Settings**) est l'**activation checkpointing**, qui échange une vitesse d'entraînement plus lente contre moins de VRAM sur les GPU à mémoire limitée (cela ne contrôle pas la sauvegarde sur disque).

---

## Comment Redpanda-vc Exporte les Modèles EMA

1. **Exports automatiques pendant l'entraînement (`train.py`, lignes 1090-1091 & 1157-1163) :** Chaque fois que `save()` déclenche un export d'inférence (`Save Every Weights` ou le pas final), `export_state_dict()` renvoie `self.ema.weights` si EMA est activé (`ema_decay > 0`), ou le `state_dict()` du générateur en direct si EMA est désactivé (`ema_decay = 0`).
2. **Exports manuels (accordéon `Export Model` -> `rvc/train/process/checkpoint_exporter.py`, lignes 44-117) :** Vous pouvez exporter manuellement n'importe quel checkpoint reprenable `G_*.pth` en `fp16` ou `fp32`. `export_generator_checkpoint()` vérifie si `checkpoint["ema"]["weights"]` existe et utilise automatiquement ces poids EMA lorsqu'ils sont présents (en affichant `... and the generator EMA` dans le message d'état).
3. Il n'y a **pas** d'option séparée "Raw vs. EMA" dans l'exportateur WebUI ; le `.pth` exporté sert uniquement à l'inférence, tandis que `G_*.pth` + `D_*.pth` restent nécessaires pour reprendre l'entraînement.

---

## L'EMA Sonne-t-il Vraiment Mieux ?

Il n'existe pas de réponse universelle oui ou non pour toutes les voix et tous les datasets. Comme la WebUI actuelle n'exporte pas les versions Raw et EMA côte à côte sur une seule exécution, la méthode la plus propre pour tester l'EMA est une comparaison contrôlée :

1. Utilisez exactement le même dataset préparé et la même extraction de caractéristiques.
2. Gardez `Batch Size`, `Total Steps`, le calendrier de taux d'apprentissage et les poids pré-entraînés identiques.
3. Lancez une expérience avec `Generator EMA Decay = 0.999` et une autre avec `0`.
4. Comparez les exports `.pth` d'inférence au **même nombre de pas** (par ex. `5000s` vs. `5000s`) sur des extraits de test externes absents du jeu d'entraînement.
5. Écoutez la ressemblance vocale, la netteté des consonnes, la stabilité de hauteur et les artefacts plutôt que de juger uniquement sur les courbes de perte TensorBoard.

---

## Dépannage pour Débutants

| Problème | Cause possible | Quoi vérifier | Solution |
| --- | --- | --- | --- |
| **L'entraînement ne démarre pas** | Fichiers prétraités/extraits manquants, mauvais chemin ou verrou d'exécution actif (`training_state.json`) | Vérifiez la sortie terminal pour la première erreur | Terminez d'abord **Preprocess Dataset** et **Extract Features**, et confirmez qu'aucune exécution n'est active |
| **Mémoire GPU saturée (OOM)** | `Batch Size` trop élevé ou `Cache Dataset in GPU` activé sur VRAM limitée | Vérifiez l'usage VRAM et l'erreur terminal | Baissez **Batch Size**, désactivez **Cache Dataset in GPU** ou activez **Checkpointing** |
| **EMA ne semble pas changer les résultats** | Peu de pas, decay proche de `0` ou comparaison à des pas différents | Vérifiez `Generator EMA Decay` et le résumé console au démarrage | Confirmez que `generator EMA <value>` apparaît au démarrage et comparez des exports au même pas sur des clips externes |
| **EMA Decay réglé sur `0`** | Curseur réglé sur `0` | Vérifiez **Training → Advanced Settings → Generator EMA Decay** | Réglez sur `0.999` (défaut) si vous voulez EMA activé à la prochaine exécution |
| **Aucun modèle `.pth` d'inférence intermédiaire** | **Save Every Weights** est désactivé | Vérifiez **Training → Advanced Settings → Save Every Weights** | Activez **Save Every Weights** pour exporter des modèles d'inférence à chaque `Save Every X Steps` |
| **Seuls les derniers checkpoints `G`/`D` existent** | **Save Only Latest** est activé (défaut) | Vérifiez `G_2333333.pth` / `D_2333333.pth` dans `logs/<model_name>/` | Désactivez **Save Only Latest** avant l'entraînement pour garder un historique numéroté `G_<step>.pth` |
| **Checkpoint `G` ou `D` manquant** | Un fichier a été supprimé ou déplacé manuellement | Cherchez la paire `G_*` et `D_*` correspondante dans `logs/<model_name>/` | Les deux fichiers `G` et `D` avec le même suffixe sont requis pour reprendre (`latest_checkpoint_pair()`) |
| **L'entraînement repart d'un pas antérieur** | Arrêt ou plantage avant le prochain `Save Every X Steps` | Comparez le dernier pas console vs. le pas repris | Comportement normal : la progression après la dernière sauvegarde disque n'est stockée qu'au prochain intervalle |
| **Avis/erreur lors de la restauration EMA** | Reprise depuis un checkpoint sans EMA ou configuration modèle différente | Lisez `"Could not restore the generator EMA..."` dans le terminal | Redpanda-vc bascule automatiquement sur une initialisation EMA depuis les poids repris du générateur |
| **Fresh Training a supprimé les anciens checkpoints** | **Fresh Training** (`--cleanup`) est resté coché | Vérifiez `logs/<model_name>/` | Décochez **Fresh Training** lors d'une reprise ; les checkpoints supprimés ne sont pas récupérables sans sauvegarde |
| **Total Steps déjà atteint** | `global_step >= Total Steps` | Lisez `"already reached step X. Raise the total steps..."` dans le terminal | Augmentez **Total Steps** au-dessus du pas actuel et cliquez sur **Start Training** |
| **Le `.pth` exporté ne peut pas reprendre l'entraînement** | Un `.pth` d'inférence a été chargé au lieu de `G_*.pth` + `D_*.pth` | Vérifiez le nom (`<name>_Xe_Ys.pth` vs. `G_*.pth`) | Les `.pth` d'inférence retirent l'état d'entraînement ; reprenez depuis `logs/<model_name>/` avec `G_*.pth` et `D_*.pth` |
| **Consommation VRAM anormalement élevée** | **Checkpointing** désactivé, **Batch Size** élevé ou **Cache Dataset in GPU** activé | Vérifiez **Advanced Settings** | Activez **Checkpointing** (activation checkpointing), désactivez **Cache Dataset in GPU** et réduisez **Batch Size** |

---

## FAQ

**Que signifie EMA ?**
Exponential Moving Average : une moyenne glissante des poids du générateur maintenue pendant l'entraînement.

**L'EMA améliore-t-il la qualité vocale ?**
Il peut lisser les oscillations de poids, mais ce n'est pas garanti. Qu'une voix donnée sonne mieux dépend de votre dataset et nécessite des tests d'écoute.

**Les débutants doivent-ils laisser EMA sur `0.999` ?**
Oui, `0.999` est la valeur par défaut dans Redpanda-vc et constitue un point de départ raisonnable avant d'essayer d'autres valeurs.

**Que se passe-t-il si EMA Decay est à `0` ?**
L'EMA est désactivé (`self.ema` n'est pas construit) et les modèles d'inférence sont exportés depuis les poids en direct du générateur.

**`0.9999` est-il meilleur que `0.999` ?**
Pas automatiquement. `0.9999` moyenne sur un historique plus long et réagit plus lentement aux mises à jour récentes.

**L'EMA accélère-t-il l'entraînement ?**
Non. L'EMA maintient une copie supplémentaire des poids et effectue une étape de mise à jour après chaque pas du générateur.

**L'EMA empêche-t-il le surapprentissage (overfitting) ?**
Non. Le surapprentissage dépend toujours de la taille du dataset, de sa variété et du nombre total de pas d'entraînement.

**L'EMA est-il appliqué au discriminateur ?**
Non. Dans Redpanda-vc (`train.py`), l'EMA est appliqué uniquement au générateur (`net_g`).

**Quelle est la différence entre une époque et un pas ?**
Une époque est un passage complet sur le dataset ; un pas est une mise à jour des poids après le traitement d'un batch.

**Redpanda-vc peut-il sauvegarder au milieu d'une époque ?**
Oui. Les sauvegardes sont déclenchées par `Save Every X Steps`, indépendamment des limites d'époque.

**Vais-je perdre ma progression si j'arrête l'entraînement ?**
Vous conservez la progression jusqu'au dernier checkpoint `G`/`D` sauvegardé ; les pas exécutés après cette sauvegarde sont perdus.

**Quelle est la différence entre Save Only Latest et Save Every Weights ?**
`Save Only Latest` écrase les checkpoints d'entraînement `G_2333333.pth` / `D_2333333.pth` ; `Save Every Weights` exporte un modèle `.pth` d'inférence à chaque intervalle de sauvegarde plutôt qu'uniquement au pas final.

**Checkpointing est-il la même chose que sauvegarder des checkpoints ?**
Non. `Checkpointing` dans Advanced Settings est l'activation checkpointing pour économiser la VRAM, tandis que `Save Every X Steps` contrôle l'enregistrement des checkpoints sur disque.

**Puis-je reprendre l'entraînement depuis un `.pth` d'inférence ?**
Non. La reprise nécessite une paire correspondante de checkpoints `G_*.pth` et `D_*.pth` dans `logs/<model_name>/`.

---

## Sources Officielles et Lectures Complémentaires

- **Dépôt Redpanda-vc :** [github.com/redpanda343/Redpanda-vc](https://github.com/redpanda343/Redpanda-vc)
- **Implémentation de `GeneratorEMA` :** [`rvc/train/train.py` (lignes 179-217)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py#L179-L217)
- **Sauvegarde par pas, reprise et état d'export :** [`rvc/train/train.py` (lignes 420-436, 526-579, 763-853, 902-921, 1044-1097, 1146-1195)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py#L1146-L1195)
- **Contrôles WebUI d'entraînement :** [`tabs/train/rvc.py` (lignes 663-880)](https://github.com/redpanda343/Redpanda-vc/blob/main/tabs/train/rvc.py#L663-L880)
- **Exportateur manuel de checkpoints :** [`rvc/train/process/checkpoint_exporter.py` (lignes 44-117)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/process/checkpoint_exporter.py#L44-L117)
- **E/S des checkpoints et contrôle des processus :** [`rvc/train/utils.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/utils.py) · [`rvc/train/process/training_control.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/process/training_control.py)
- **Documentation officielle PyTorch :** [Weight Averaging (SWA and EMA)](https://docs.pytorch.org/docs/stable/optim.html#weight-averaging-swa-and-ema) · [`torch.optim.swa_utils.AveragedModel`](https://docs.pytorch.org/docs/stable/generated/torch.optim.swa_utils.AveragedModel.html)
- **Article scientifique :** Morales-Brotons, Vogels et Hendrikx, *Exponential Moving Average of Weights in Deep Learning: Dynamics and Benefits* ([OpenReview](https://openreview.net/forum?id=2M9CUnYnBA))
