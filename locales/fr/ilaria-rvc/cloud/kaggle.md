---
label: "Kaggle"
icon: ":notebook:"
order: 98
permalink: /ilaria-rvc/kaggle/
description: "Cliquez sur Exécuter tout dans l'éditeur. Vous pouvez également exécuter les quatre cellules de code une par une, de haut en bas."
---
# Kaggle

[Ouvrez le notebook officiel de Kaggle](https://www.kaggle.com/code/ilarialopez/ilaria-rvc) · [Récupérez le fichier du notebook depuis GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Kaggle.ipynb)

> **2.4.0** · Le paquet Windows déplace l’application et le runtime dans app/. Les modèles restent à la racine dans models/. Ajout de Colab, Lightning AI Studio, des indications de téléchargement des embedders, et de Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). pip est réparé et pywin32 est inclus.

[Kaggle](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Kaggle.ipynb) · [Google Colab](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb) · [Lightning AI Studio](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-LightningAI.ipynb)

## 1. Préparez un court test

- Connectez-vous à Kaggle et gardez l'éditeur de bloc-notes ouvert pendant que vous travaillez.
- Pour la conversion, utilisez un modèle d’inférence compatible (`.pth`). Le fichier `.index` associé est facultatif. Préparez un WAV de 10 secondes avec une voix claire et sans musique.
- Pour la formation, conservez une copie locale de l'ensemble de données source. Préparez un ZIP des enregistrements utilisables que vous êtes autorisé à utiliser. Conservez un court clip séparé en dehors de l'ensemble de données d'entraînement afin de pouvoir tester votre modèle sur quelque chose qu'il n'a pas entendu.
- Commencez par un test de fichier avant de tenter un long entraînement. Kaggle contrôle la disponibilité et les limites du GPU, alors vérifiez l'heure et les ressources affichées dans votre propre session.

## 2. Faites une copie modifiable et allumez le GPU

1. Ouvrez le [carnet publié](https://www.kaggle.com/code/ilarialopez/ilaria-rvc). Connectez-vous si vous y êtes invité. Utilisez **Copier et modifier** ou l'action de copie équivalente pour ouvrir votre propre version modifiable.
2. Si vous démarrez plutôt depuis GitHub, téléchargez le fichier brut `Ilaria-RVC-2.1-Kaggle.ipynb`, créez un notebook dans Kaggle et importez le fichier via l'éditeur de notebook. Ouvrez le notebook obtenu sur Kaggle plutôt que de l'exécuter sur votre propre machine.
3. Ouvrez les paramètres de session dans l'éditeur. Pour **Accélérateur**, sélectionnez une option **GPU** disponible. Si Kaggle demande de redémarrer la session après le changement, acceptez avant d'ajouter des fichiers ou de démarrer une exécution.
4. Activez **Internet** dans les mêmes paramètres de session. Le notebook a besoin d'une connectivité pour télécharger le code, les dépendances et les poids, puis ouvrir son lien Gradio.
5. Si l'un des paramètres n'est pas disponible, lisez l'explication affichée par Kaggle. Vérifiez l’éligibilité de votre compte et la disponibilité actuelle de l’accélérateur. Réessayez lorsque vous pourrez activer les deux paramètres.

## 3. Exécutez les quatre sections principales

Cliquez sur **Exécuter tout** dans l'éditeur. Vous pouvez également exécuter les quatre cellules de code une par une, de haut en bas. Attendez que chaque cellule soit terminée avant d'exécuter la suivante. Les cellules facultatives d'exportation et d'arrêt ne font rien avec leurs paramètres par défaut.

| Section Carnet | À quoi sert une exécution réussie | Que vérifier si elle s'arrête |
| --- | --- | --- |
| **1. Vérifier le GPU** | Affiche les informations du GPU et récupère le code à jour depuis `main` → `/kaggle/working/ilaria-rvc`. | Si les outils NVIDIA sont manquants, sélectionnez un GPU disponible et redémarrez la session avant de l'exécuter à nouveau. Si Git ne peut pas accéder au dépôt, vérifiez Internet. |
| **2. Installer les dépendances** | Prépare l'environnement du notebook et vérifie que PyTorch voit le GPU. Recherchez `GPU ready:` suivi de son nom. | Lisez la première dépendance ou erreur du compilateur. Un périphérique CUDA manquant signifie que l'application ne peut toujours pas utiliser le GPU. |
| **3. Télécharger les poids des modèles** | Télécharge et vérifie les actifs requis par le bloc-notes. | Laissez la nouvelle tentative intégrée se terminer. S'il continue d'échouer, vérifiez l'accès au réseau et l'espace libre. |
| **4. Open Ilaria RVC** | Démarre l'interface et imprime **Open Ilaria RVC** dans la sortie de la cellule. | Si l'onglet ne s'est pas ouvert automatiquement, cliquez sur ce bouton. Si le portable signale que le lien Gradio n'est pas disponible, vérifiez Internet et réexécutez l'étape 4 une fois les étapes 1 à 3 réussies. |

Ouvrez le lien actuel de l'étape 4 dans un autre onglet. Laissez la session Kaggle en cours d'exécution. Après une réinitialisation de session ou un redémarrage de lancement, utilisez le lien nouvellement généré.

> Pour mettre à jour une session ouverte, sauvegardez votre travail, exécutez la cellule d’arrêt avec `STOP = True`, puis relancez les étapes 1 à 4. La première cellule affiche la version chargée.

## Commencez ici avec le notebook mis à jour

### Avant d'exécuter quoi que ce soit

1. Ouvrez votre copie modifiable sur Kaggle et gardez-la **privée**. La cellule de lancement imprime les mots de passe. Conservez sa sortie à l’écart des captures d’écran, des journaux partagés et des versions publiées.
2. Ouvrez **Paramètres**. L'ordinateur portable demande **GPU T4 x2** et **Internet**. Si Kaggle ne les a pas appliqués lors de l'importation, sélectionnez-les vous-même. Si T4 x2 n'est pas disponible, vérifiez le GPU proposé à votre compte et lisez la liste des GPU imprimées après le démarrage.
3. Cliquez sur **Exécuter tout** ou exécutez les quatre sections numérotées dans l'ordre. Les sections 1 à 3 préparent l'application. La section 4 l'ouvre. Les cellules d'exportation et d'arrêt sont facultatives et désactivées par défaut.
4. Dans le résultat de la section 1, vérifiez les noms des GPU et la version **Ilaria RVC**. La section 2 vérifie que PyTorch voit les GPU disponibles. La section 3 vérifie les poids téléchargés. Continuez une fois que chaque opération est terminée avec succès.

### Ouvrez l'application et le gestionnaire de fichiers

La section **Démarrer → Accéder à la configuration** propose deux options. Laissez **Gradio + Cloudflare** sélectionnés pour un premier test. Gradio ouvre Ilaria RVC et Cloudflare ouvre FileBrowser. Si vous choisissez **Horizon**, saisissez l'ID Horizon dans votre tableau de bord Horizon et approuvez la demande de jeton CLI lorsque vous y êtes invité. Horizon produit des liens distincts pour les deux mêmes services.

1. Attendez **Open Ilaria RVC** dans la sortie et cliquez dessus si le nouvel onglet ne s'est pas ouvert automatiquement.
2. Connectez-vous avec le nom d'utilisateur `ilaria` et la valeur à côté de **Mot de passe WebUI** dans la sortie de lancement actuelle.
3. Pour les fichiers exportés, cliquez sur **Ouvrir FileBrowser**. Utilisez le **nom d'utilisateur FileBrowser** et le **mot de passe FileBrowser** affichés dans le même résultat. Ces informations d'identification sont distinctes de la connexion WebUI. FileBrowser affiche uniquement le dossier d'exportation dédié.
4. Gardez Kaggle en cours d'exécution pendant que vous utilisez l'un ou l'autre des onglets. Après avoir redémarré l'application, utilisez les liens et les informations d'identification de la nouvelle sortie. Si une page rejette le mot de passe, vérifiez que vous avez utilisé la bonne paire d'informations d'identification pour cette page.

### Sélectionnez uniquement les poids dont vous avez besoin

La section 3 est par défaut `TRAINING_SAMPLE_RATES = ["32k"]`. Laissez-le inchangé pour un premier test d'entraînement à 32 kHz. Si votre expérience prévue nécessite les pré-entraînements groupés à un autre rythme pris en charge, incluez `"40k"` ou `"48k"` dans cette liste avant d'exécuter la cellule. Utilisez une liste vide à des fins d'inférence uniquement. Cette liste contrôle les téléchargements de pré-entraînement. La fréquence d'échantillonnage de votre expérience doit toujours correspondre à l'architecture et aux pondérations sélectionnées dans l'interface Web.

La même cellule a `DOWNLOAD_FCPE`. Laissez les valeurs par défaut si vous n'êtes pas sûr. Si FCPE n'est pas disponible, le notebook le signale et vous pouvez sélectionner RMVPE.

### Réglage de l'entraînement uniquement après un court test

| Réglage | Que faire pour la première exécution |
| --- | --- |
| Training Precision | Le notebook démarre avec FP16 lorsque tous les GPU visibles sont T4. Essayez FP32 pour une comparaison si nécessaire. Lors de la reprise, faites correspondre la configuration du point de contrôle existant. |
| Taille du lot | La valeur de l'interface utilisateur est par GPU pour une nouvelle exécution avec ce portable. Un T4 au lot 8 et deux T4 au lot 4 donnent tous deux un lot global de 8 lorsque ce sont les appareils utilisés par l'exécution. Vérifiez les valeurs effectives dans **Training Log**. Commencez plus petit si la mémoire est limitée. |
| Travailleurs et prélecture | Laissez-les à 2 chacun pour la première manche. Le bloc-notes suggère 4 travailleurs et en pré-extrait 8 par rapport à l'ancienne configuration du chargeur. Modifiez un facteur à la fois et comparez le timing en `train.log`. |
| Fused AdamW | Laissez-le désactivé au début. Testez-le lors d'une nouvelle exécution si vous souhaitez comparer les performances. Conservez la configuration de lot d'origine lors de la reprise. |

Deux GPU ne regroupent pas leur VRAM dans un seul appareil plus grand. Si une exécution manque de mémoire, réduisez le lot par GPU et vérifiez les paramètres effectifs dans le journal avant de réessayer.

### Exportez, téléchargez et arrêtez

Après la conversion ou après que **Arrêter et enregistrer** confirme le point de contrôle, définissez `EXPORT = True` et exécutez **Exporter les résultats**. Laissez `TRAINING_MODEL` vide pour les exportations régulières de modèles et d'audio, ou entrez le nom exact du modèle pour inclure ses fichiers d'expérience pouvant être repris. Ouvrez **FileBrowser** ou utilisez le lien affiché par la cellule d'exportation et téléchargez **Ilaria-RVC-results.zip**. L'archive est écrite en `/kaggle/working/ilaria-shared`. Confirmez que vous pouvez l'ouvrir localement avant de fermer la session.

Une fois terminé, définissez `STOP = True` et exécutez **Arrêter ou redémarrer**. Cela ferme WebUI, FileBrowser et leurs tunnels. Pour les rouvrir dans la même session, réexécutez la section 4. Pour actualiser le code de l'application, enregistrez votre travail, arrêtez les services et réexécutez les étapes 1 à 4.

///region cloud-inference-dataset
## 4. Convertir un enregistrement

1. Dans l'onglet du navigateur Ilaria RVC, ouvrez **Autre → Importer des modèles locaux**. Importez le fichier du modèle d’inférence (`.pth`) et, si vous l’avez, son index facultatif (`.index`). Vous pouvez aussi importer un ZIP compatible contenant ces fichiers. Attendez la fin de l'importation. Vous pouvez aussi ouvrir **Other → Download models from Hugging Face, Google Drive or MEGA**, coller un lien public vers un ZIP compatible, un `.pth` ou un `.index`, puis cliquer sur **Download and install model**. Si le modèle et l’index facultatif ont des liens séparés, téléchargez-les un par un.
2. Ouvrez **Inférence**, actualisez la liste des voix si nécessaire, sélectionnez la voix souhaitée et accédez à **Single Inference**.
3. Téléchargez le court WAV. Commencez par **Pitch 0** et **Index Ratio 0**. Laissez les effets facultatifs désactivés et utilisez l'intégration attendue par le modèle.
4. Cliquez une fois sur le contrôle de conversion et attendez la sortie. Jouez le résultat, puis téléchargez-le depuis le lecteur s'il est disponible. Conservez votre WAV d'entrée afin de pouvoir comparer la même phrase plus tard.
5. Si vous souhaitez tester la récupération, sélectionnez l'index correspondant et essayez une petite augmentation à partir de zéro. Si la sortie échoue ou si la voix devient plus difficile à comprendre, revenez à la ligne de base et vérifiez l'appariement modèle-index.

Si la voix n'apparaît jamais, vérifiez d'abord le journal d'importation. Un point de contrôle d'entraînement enregistré sous forme de fichier G ou D appartient à une expérience et nécessite une exportation d'inférence avant de pouvoir être sélectionné ici.

## Préparez votre ensemble de données et planifiez une séance d'entraînement

### Nettoyez l'audio avec MVSEP uniquement là où cela est nécessaire

Conservez une copie intacte de vos enregistrements. S’ils contiennent déjà une seule voix claire et sèche, sautez la séparation. Utilisez le matériel que vous êtes autorisé à télécharger sur [MVSEP](https://mvsep.com/en/home) et sur lequel vous pouvez vous entraîner. Pour les enregistrements confidentiels, nettoyez-les localement.

1. **Isolez la voix.** Téléchargez un court exemple et choisissez une option de séparation vocale. Téléchargez la racine vocale au format WAV lorsqu'elle est disponible. Rejouez-le par rapport à l'original et écoutez avec des écouteurs de la musique, d'autres voix, des syllabes coupées et des artefacts aqueux ou métalliques.
2. **Supprimez les chœurs uniquement s'ils sont présents.** Pour les chansons avec des harmonies ou un refrain sous la cible, utilisez une option de séparation lead/backing sur la tige vocale. Gardez la sortie de plomb. Si les chanteurs se chevauchent encore ou si le lead présente des trous, utilisez une section propre ou une prise différente.
3. **Réduisez la réverbération uniquement là où elle est audible.** Si la voix a une large queue de réverbération stéréo, testez d'abord une option de dé-réverbération stéréo sur une copie. Pour les réflexions restantes de la pièce, comparez une passe de dé-réverbération de la pièce. Vous pouvez sauter l’une ou l’autre étape. Écoutez les consonnes tronquées et les respirations à chaque passage.
4. **Supprimez l'écho uniquement s'il répète la voix.** Une répétition audible retardée nécessite un court test séparé. Conservez l'original ou remplacez-le si la suppression supprime des mots. Évitez d’empiler les passes sur un son autrement propre.
5. **Préparez les clips finaux.** Coupez les bruits inutilisables et les longues sections vides dans un éditeur tel qu'Audacity, tout en gardant des souffles utiles et un phrasé naturel. Exportez des WAV propres. Rassemblez les fichiers approuvés dans un ZIP et conservez quelques clips propres à l'extérieur pour évaluation.

Testez la chaîne de nettoyage complète sur quelques secondes avant de traiter l'intégralité de l'ensemble de données. Un modèle peut apprendre les artefacts laissés dans son audio d'entraînement. Vérifiez plusieurs clips de différentes sessions avant de les télécharger.

### Nettoyez un ensemble de données localement avec Ultimate Vocal Remover (UVR)

UVR sépare un fichier audio en pistes appelées stems. Utilisez-le lorsque la voix cible est mélangée à de la musique, des effets sonores ou d'autres voix. Si vous disposez déjà d’un enregistrement vocal clair, conservez l’original. UVR traite l'audio sur votre ordinateur une fois les modèles requis téléchargés. Cloud exécute la dernière tâche de formation RVC séparément.

#### Installez UVR et préparez un clip de test

1. Téléchargez le programme d'installation ou le package pour votre système d'exploitation à partir de [versions UVR](https://github.com/Anjok07/ultimatevocalremovergui/releases). Lancez l'application de bureau après l'avoir installée.
2. Faites une copie de 15 à 30 secondes d'un exemple contenant une ligne claire et une section où la musique la chevauche. Gardez l'original en sécurité.
3. Cliquez sur **Sélectionner l'entrée** et choisissez ce clip de test. Utilisez **Sélectionner la sortie** pour choisir un nouveau dossier accessible en écriture, tel que `uvr-test`. Choisissez **WAV** pour le format de sortie.
4. Sélectionnez une **Méthode de processus** et un modèle qui sépare les **voix** de l'**instrumental**, par exemple un modèle de voix sous **MDX-Net**. Si la liste est vide, ouvrez les paramètres **Centre de téléchargement**, sélectionnez la famille de modèles correspondante et téléchargez un modèle approprié. Revenez à la fenêtre principale et sélectionnez-la.
5. Activez la **Conversion GPU** uniquement si votre version installée reconnaît un périphérique pris en charge. Si cette option provoque une erreur, désactivez-la et testez sur le processeur. Le traitement du processeur peut être plus lent, alors commencez par un court clip.

#### Séparez les voix et écoutez

Cliquez sur ** Démarrer le traitement **. Une fois terminé, recherchez la tige de voix dans le dossier de sortie. Certains modèles écrivent également une tige instrumentale. Jouez l'original et les voix à un volume similaire. Vérifiez les consonnes, les respirations, les notes tenues et les sections où l'accompagnement est fort. Si vous entendez toujours des instruments ou si la voix semble aqueuse ou métallique, comparez un autre modèle sur le même clip de test avant de traiter l'ensemble des données complet.

Si vous avez sélectionné le mauvais stem, vérifiez les noms de fichiers ou écoutez chaque sortie. Gardez celui qui contient votre voix principale cible.

#### Nettoyer les problèmes restants un à la fois

| Ce qui reste | Que tenter en UVR |
| --- | --- |
| Choeurs ou harmonies | Insérez la tige vocale isolée dans un modèle destiné à la séparation lead et backing, si votre installation en propose un. Conservez la sortie principale et vérifiez que la voix cible est complète. |
| Queues de réverbération entre les phrases | Essayez un modèle destiné à la dé-réverbération si disponible. Comparez avant et après sur un même passage. Conservez la tige d'origine si la dé-réverbération endommage les consonnes ou les notes tenues. |
| Répétitions différées audibles | Testez un modèle de suppression d'écho si disponible. Si cela supprime des mots ou déforme les respirations, utilisez une autre prise ou excluez la section concernée. |
| Bourdonnement de la pièce, pics écrêtés ou autres voix | Vérifiez l'original. Si le traitement continue d’endommager la voix, remplacez ou excluez le clip. La séparation ne peut pas reconstruire les pics perdus à cause de l'écrêtage. |

Traitez l’ensemble complet seulement après qu’une courte comparaison semble correcte. Utilisez Audacity ou un autre éditeur pour couper le matériel inutilisable. Conservez les pauses et les respirations naturelles, exportez les clips approuvés au format WAV et regroupez uniquement ces clips dans l'ensemble de données ZIP. Gardez les tiges instrumentales et rejetées hors du ZIP. Ensuite, téléchargez-le dans **Training** sur Ilaria RVC et confirmez que **Path to Dataset** pointe vers les enregistrements importés.
///endregion

### Traduisez le flux de travail Applio d'origine vers Ilaria RVC

| Étape dans le flux de travail d'origine | Que faire dans ce bloc-notes Ilaria RVC |
| --- | --- |
| Créez un compte Kaggle et vérifiez-le | Connectez-vous et vérifiez que vous pouvez activer le GPU et Internet. Complétez la vérification si Kaggle le demande. |
| Choisissez un tunnel ou un mode de persistance | Exécutez le notebook officiel dans l'ordre et ouvrez l'URL Gradio de l'étape 4. Il gère le tunnel. Sauvegardez l’expérience en dehors de la session temporaire à l’aide de la cellule d’exportation. |
| Téléchargez l'ensemble de données et collez son chemin | Utilisez le sélecteur de téléchargement dans Ilaria RVC, attendez qu'il se termine et confirmez que **Chemin vers l'ensemble de données** pointe vers vos fichiers préparés. Faites correspondre le nom du modèle avec ce que vous saisirez lors de l'exportation des points de contrôle. |
| Choisissez un slicer et post-normalisation | **Process Data** gère le découpage et ajuste automatiquement chaque tranche. Le flux de travail Ilaria RVC n'a pas de bascule Applio Post distincte. Faites correspondre la fréquence d'échantillonnage de la formation à l'architecture et aux pré-entraînements. Le rééchantillonnage ne peut pas restaurer les détails manquants. |
| Définissez les fichiers d'entraînement silencieux sur zéro | Laissez **Fichiers d'entraînement silencieux** à leur valeur par défaut pour votre première exécution. Si vos clips comportent déjà des pauses naturelles et pas de longues sections vides, comparez une exécution distincte avec zéro. Vérifiez les deux sorties sur les mêmes pauses maintenues. |
| Choisissez la taille du lot en fonction de la longueur de l'ensemble de données | Commencez à 2 ou 4 si vous n'êtes pas sûr, et utilisez 8 uniquement si le GPU a de la marge et que la configuration fonctionne. Vérifiez le journal et la VRAM. Réduisez le lot après une erreur de mémoire insuffisante. Kaggle n'implique pas de multiplicateur de lot fixe, et la longueur de l'ensemble de données à elle seule ne détermine pas la taille du lot. |
| Entraînez-vous jusqu'à ce que le modèle sonne bien | Enregistrez toutes les 5 ou 10 époques si votre temps disponible et votre espace disque le permettent. Comparez les exportations d'inférence enregistrées sur les mêmes clips de test. Il n’existe pas d’objectif d’époque universel, et étendre une analyse à 500 époques ne peut pas réparer un ensemble de données médiocre. |

#### Écoutez avant de décider quel point de contrôle conserver.

Utilisez une courte série de clips retenus. Incluez une phrase simple, une avec des consonnes pointues et une pause. Pour le chant, testez également une note tenue et une transition entre registres. Commencez avec le pitch à zéro, la récupération désactivée et les effets facultatifs désactivés. Conservez le modèle dont les résultats sont les plus clairs dans l’ensemble. Si toutes les versions ont les mêmes souffles métalliques ou les mêmes mots étouffés, revisitez l'ensemble de données au lieu de prolonger aveuglément l'analyse.

Conservez l’exportation d’inférence et son index correspondant si vous en avez utilisé un. Pour poursuivre une exécution plus tard, enregistrez l'expérience complète avec la cellule d'exportation du bloc-notes et conservez votre ensemble de données d'origine séparément. Ouvrez le ZIP téléchargé et vérifiez son contenu avant de terminer la session Kaggle.

///region cloud-training
## 5. Entraînez une voix et sauvegardez votre travail

1. Dans **Formation**, choisissez un nouveau **Nom de modèle**. Importez votre audio ou votre ZIP via les contrôles de téléchargement de l'ensemble de données. Attendez la fin de l'importation et confirmez que **Chemin vers l'ensemble de données** pointe vers les enregistrements importés.
2. Exécutez le **Dataset Checker** et écoutez tous les enregistrements suspects. Confirmez que vos paramètres d'architecture RVC V2, de fréquence d'échantillonnage, d'intégration et de pitch correspondent à vos pré-entraînements G/D sélectionnés si vous les utilisez. Commencez avec une taille de lot adaptée au GPU alloué.
3. Exécutez **Process Data**, puis **Feature Extraction**. Lisez l’état de chacun avant de continuer. Si vous modifiez l'ensemble de données ou l'encodeur, préparez de nouveaux fichiers pour cette expérience avant la formation.
4. Exécutez **Train Pth** avec une première cible modeste et enregistrez les points de contrôle périodiques. Conservez un court clip de test en dehors des données d’entraînement. Comparez les points de contrôle exportés sur ce même clip avant de démarrer une exécution plus longue.
5. Créez l'index des fonctionnalités si vous avez besoin d'une récupération, puis essayez d'abord l'exportation d'inférence à **Rapport d'index 0**. Pour une explication détaillée de chaque paramètre, voir [Contrôles de formation et flux de travail](../train/training-controls.md).
6. Si vous souhaitez vous arrêter en cours d'exécution, utilisez **Stop and save** dans Ilaria RVC et attendez que le journal confirme la sauvegarde. Téléchargez les résultats pendant que la session Cloud est toujours active.
///endregion

## 6. Téléchargez une sauvegarde avant de quitter

La cellule facultative **Exporter les résultats** du notebook crée une archive en `/kaggle/working/ilaria-shared/Ilaria-RVC-results.zip`. Une session en direct est temporaire. Vérifiez que vous disposez de la sauvegarde sur votre propre ordinateur avant d'arrêter ou de réinitialiser la session.

- **Pour les fichiers d'inférence uniquement :** définissez `EXPORT = True` et laissez `TRAINING_MODEL = ""`. L'archive comprend les fichiers `.pth` et `.index` dans `models`, ainsi que les fichiers écrits dans `InferOutput`. Utilisez le bouton de téléchargement du lecteur pour toute conversion qui n'y a pas écrit de fichier.
- **Pour conserver une expérience d'entraînement pouvant être reprise :** attendez **Arrêter et enregistrer** ou que l'entraînement termine l'enregistrement. Définissez `EXPORT = True` et entrez le nom exact de l'expérience dans `TRAINING_MODEL`. Entrez uniquement le nom, sans chemin de dossier. L'exportation inclut son arbre `logs/<name>` aux côtés des sorties régulières.
- Exécutez cette cellule de code. Ouvrez le lien affiché ou téléchargez **Ilaria-RVC-results.zip** via Kaggle **Output**. Ouvrez le ZIP localement et confirmez qu'il contient ce dont vous avez besoin. Conservez votre ensemble de données d'origine séparément. La cellule d'exportation ne regroupe pas `datasets`.

Pour arrêter uniquement l'application, définissez `STOP = True` dans **Arrêter ou redémarrer** et exécutez cette cellule facultative après l'enregistrement. Exécutez à nouveau l'étape 4 pour la rouvrir dans la même session. Arrêter ou réinitialiser toute la session Kaggle est une action distincte.

## Dépannage

| Ce que vous voyez | Que faire en premier |
| --- | --- |
| L'étape 1 indique d'activer un GPU | Sélectionnez un GPU sous **Accélérateur**, redémarrez si vous y êtes invité, puis réexécutez à partir de l'étape 1. |
| L'onglet Gradio est vide ou a expiré | Confirmez que la session est toujours en cours. Utilisez le dernier lien de l'étape 4. Si le lien ne peut pas être créé, vérifiez Internet et lisez la sortie de la cellule. |
| La conversion ou l'entraînement manque de mémoire | Fermez les tâches concurrentes dans la session et essayez un court clip. Pour la formation, réduisez la taille du lot et désactivez la mise en cache facultative des jeux de données GPU si disponible. Enregistrez avant d’interrompre une exécution. |
| Exporter indique qu'il n'y a aucun résultat | Convertissez ou exportez d'abord une voix. Vérifiez le répertoire de sortie et confirmez que le nom de l'expérience facultatif de l'archive correspond exactement au **Nom du modèle**. |
| Certains fichiers disparaissent après une réinitialisation | Redémarrez l'installation et réimportez vos sauvegardes locales. Le dossier de travail appartient à la session active. |

Si un problème se répète, notez la section défaillante, le nom du GPU de l'étape 1 et la première erreur de la sortie de la cellule. Le bloc-notes écrit également le journal de démarrage de l'application sous `/kaggle/working/.ilaria-notebook/startup.log`. Supprimez l'URL Gradio de tout journal que vous partagez. Voir [Dépannage RVC](../../reference/troubleshooting.md) pour les diagnostics du modèle et de l'audio.
