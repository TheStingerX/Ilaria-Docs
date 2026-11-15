---
label: "☁️ Exécutez Ilaria RVC sur Kaggle"
order: 97
permalink: /ilaria-rvc/kaggle/
---
# Exécutez Ilaria RVC 2.1 sur Kaggle

Kaggle exécute le notebook sur une machine Linux distante. Lorsque vous activez son accélérateur GPU NVIDIA, le GPU distant fait le travail. Votre propre ordinateur n'a besoin que d'un navigateur et d'un accès Internet. Il s'agit d'une alternative pour les personnes disposant de graphiques AMD ou Intel, de graphiques intégrés ou d'un GPU local trop lent pour le travail.

[Ouvrez le notebook officiel de Kaggle](https://www.kaggle.com/code/ilarialopez/ilaria-rvc) · [Récupérez le fichier du notebook depuis GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/Ilaria-RVC-2.1-Kaggle.ipynb)

!!!warning Gardez le lien de l'application privé
L'étape 4 crée une URL Gradio publique. Toute personne disposant de cette URL peut utiliser l’application pendant son exécution. La visibilité de votre bloc-notes Kaggle est distincte de l'accès à cette URL. Utilisez une session sans matériel privé et conservez l'URL hors des captures d'écran, des publications publiques et des sorties partagées.
!!!

## 1. Préparez un court test

- Connectez-vous à Kaggle et gardez l'éditeur de bloc-notes ouvert pendant que vous travaillez.
- Pour la conversion, disposez d'un fichier d'inférence compatible `.pth` et, si disponible, de son fichier correspondant `.index`. Le premier test fonctionne sans index. Enregistrez un WAV de 10 secondes d'une voix claire sans musique.
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
| **1. Vérifier le GPU** | Affiche le nom du GPU, la mémoire et le pilote. Consultez la version épinglée d’Ilaria RVC sous `/kaggle/working/ilaria-rvc`. | Si les outils NVIDIA sont manquants, sélectionnez un GPU disponible et redémarrez la session avant de l'exécuter à nouveau. Si Git ne peut pas accéder au dépôt, vérifiez Internet. |
| **2. Installer les dépendances** | Prépare l'environnement du notebook et vérifie que PyTorch voit le GPU. Recherchez `GPU ready:` suivi de son nom. | Lisez la première dépendance ou erreur du compilateur. Un périphérique CUDA manquant signifie que l'application ne peut toujours pas utiliser le GPU. |
| **3. Télécharger les poids des modèles** | Télécharge et vérifie les actifs requis par le bloc-notes. | Laissez la nouvelle tentative intégrée se terminer. S'il continue d'échouer, vérifiez l'accès au réseau et l'espace libre. |
| **4. Open Ilaria RVC** | Démarre l'interface et imprime **Open Ilaria RVC** dans la sortie de la cellule. | Si l'onglet ne s'est pas ouvert automatiquement, cliquez sur ce bouton. Si le portable signale que le lien Gradio n'est pas disponible, vérifiez Internet et réexécutez l'étape 4 une fois les étapes 1 à 3 réussies. |

Ouvrez le lien actuel de l'étape 4 dans un autre onglet. Laissez la session Kaggle en cours d'exécution. Après une réinitialisation de session ou un redémarrage de lancement, utilisez le lien nouvellement généré.

## 4. Convertir un enregistrement

1. Dans l'onglet du navigateur Ilaria RVC, ouvrez **Autre → Importer des modèles locaux**. Ajoutez le point de contrôle d'inférence ou un ZIP pris en charge, et ajoutez l'index apparié si vous l'avez. Attendez la fin de l'importation.
2. Ouvrez **Inférence**, actualisez la liste des voix si nécessaire, sélectionnez la voix souhaitée et accédez à **Single Inference**.
3. Téléchargez le court WAV. Commencez par **Pitch 0** et **Index Ratio 0**. Laissez les effets facultatifs désactivés et utilisez l'intégration attendue par le modèle.
4. Cliquez une fois sur le contrôle de conversion et attendez la sortie. Jouez le résultat, puis téléchargez-le depuis le lecteur s'il est disponible. Conservez votre WAV d'entrée afin de pouvoir comparer la même phrase plus tard.
5. Si vous souhaitez tester la récupération, sélectionnez l'index correspondant et essayez une petite augmentation à partir de zéro. Si la sortie échoue ou si la voix devient plus difficile à comprendre, revenez à la ligne de base et vérifiez l'appariement modèle-index.

Si la voix n'apparaît jamais, vérifiez d'abord le journal d'importation. Un point de contrôle d'entraînement enregistré sous forme de fichier G ou D appartient à une expérience et nécessite une exportation d'inférence avant de pouvoir être sélectionné ici.

## 5. Entraînez une voix et sauvegardez votre travail

1. Dans **Formation**, choisissez un nouveau **Nom de modèle**. Importez votre audio ou votre ZIP via les contrôles de téléchargement de l'ensemble de données. Attendez la fin de l'importation et confirmez que **Chemin vers l'ensemble de données** pointe vers les enregistrements importés.
2. Exécutez le **Dataset Checker** et écoutez tous les enregistrements suspects. Confirmez que vos paramètres d'architecture RVC V2, de fréquence d'échantillonnage, d'intégration et de pitch correspondent à vos pré-entraînements G/D sélectionnés si vous les utilisez. Commencez avec une taille de lot adaptée au GPU alloué.
3. Exécutez **Process Data**, puis **Feature Extraction**. Lisez l’état de chacun avant de continuer. Si vous modifiez l'ensemble de données ou l'encodeur, préparez de nouveaux fichiers pour cette expérience avant la formation.
4. Exécutez **Train Pth** avec une première cible modeste et enregistrez les points de contrôle périodiques. Conservez un court clip de test en dehors des données d’entraînement. Comparez les points de contrôle exportés sur ce même clip avant de démarrer une exécution plus longue.
5. Créez l'index des fonctionnalités si vous avez besoin d'une récupération, puis essayez d'abord l'exportation d'inférence à **Rapport d'index 0**. Pour une explication détaillée de chaque paramètre, voir [Contrôles de formation et flux de travail](training-controls.md).
6. Si vous souhaitez vous arrêter en cours d'exécution, utilisez **Stop and save** dans Ilaria RVC et attendez que le journal confirme la sauvegarde. Téléchargez les résultats pendant que la session Kaggle est toujours active.

## 6. Téléchargez une sauvegarde avant de quitter

La cellule facultative **Exporter les résultats** du notebook crée une archive en `/kaggle/working/Ilaria-RVC-results.zip`. Une session en direct est temporaire. Vérifiez que vous disposez de la sauvegarde sur votre propre ordinateur avant d'arrêter ou de réinitialiser la session.

- **Pour les fichiers d'inférence uniquement :** définissez `EXPORT = True` et laissez `TRAINING_MODEL = ""`. L'archive comprend les fichiers `.pth` et `.index` dans `models`, ainsi que les fichiers écrits dans `InferOutput`. Utilisez le bouton de téléchargement du lecteur pour toute conversion qui n'y a pas écrit de fichier.
- **Pour conserver une expérience d'entraînement pouvant être reprise :** attendez **Arrêter et enregistrer** ou que l'entraînement termine l'enregistrement. Définissez `EXPORT = True` et entrez le nom exact de l'expérience dans `TRAINING_MODEL`. Entrez uniquement le nom, sans chemin de dossier. L'exportation inclut son arbre `logs/<name>` aux côtés des sorties régulières.
- Exécutez cette cellule de code. Ouvrez le lien affiché ou téléchargez **Ilaria-RVC-results.zip** via Kaggle **Output**. Ouvrez le ZIP localement et confirmez qu'il contient ce dont vous avez besoin. Conservez votre ensemble de données d'origine séparément. La cellule d'exportation ne regroupe pas `datasets`.

Pour arrêter uniquement l'application, définissez `STOP = True` dans **Arrêter ou redémarrer** et exécutez cette cellule facultative après l'enregistrement. Exécutez à nouveau l'étape 4 pour la rouvrir dans la même session. Arrêter ou réinitialiser toute la session Kaggle est une action distincte.

## Dépannage

| Ce que vous voyez | Que faire en premier |
| --- | --- |
| L'étape 1 indique d'activer un GPU | Sélectionnez un GPU sous **Accélérateur**, redémarrez si vous y êtes invité, puis réexécutez à partir de l'étape 1. |
| Le notebook signale une extraction ou un commit différent | Démarrez une session propre avec le notebook officiel. Sauvegardez tous les résultats existants avant de modifier ou de réinitialiser la session. |
| L'onglet Gradio est vide ou a expiré | Confirmez que la session est toujours en cours. Utilisez le dernier lien de l'étape 4. Si le lien ne peut pas être créé, vérifiez Internet et lisez la sortie de la cellule. |
| La conversion ou l'entraînement manque de mémoire | Fermez les tâches concurrentes dans la session et essayez un court clip. Pour la formation, réduisez la taille du lot et désactivez la mise en cache facultative des jeux de données GPU si disponible. Enregistrez avant d’interrompre une exécution. |
| Exporter indique qu'il n'y a aucun résultat | Convertissez ou exportez d'abord une voix. Vérifiez le répertoire de sortie et confirmez que le nom de l'expérience facultatif de l'archive correspond exactement au **Nom du modèle**. |
| Certains fichiers disparaissent après une réinitialisation | Redémarrez l'installation et réimportez vos sauvegardes locales. Le dossier de travail appartient à la session active. |

Si un problème se répète, notez la section défaillante, le nom du GPU de l'étape 1 et la première erreur de la sortie de la cellule. Le bloc-notes écrit également le journal de démarrage de l'application sous `/kaggle/working/.ilaria-notebook/startup.log`. Supprimez l'URL Gradio de tout journal que vous partagez. Voir [Dépannage RVC](../reference/troubleshooting.md) pour les diagnostics du modèle et de l'audio.
