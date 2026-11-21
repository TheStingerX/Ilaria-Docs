# Google Colab

[Notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb) · [Google Colab](https://colab.research.google.com/github/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb)

## Avant de commencer

Préparez un WAV court et propre, un modèle d’inférence compatible et, pour l’entraînement, un jeu de données sauvegardé séparément.

1. Ouvrez le notebook dans Colab avec un environnement GPU.
2. Exécutez les cellules 1 à 4 dans l’ordre pour vérifier le GPU, installer les dépendances, télécharger les poids et lancer l’interface.
### Limites, compute units et règles de Google Colab

Avant une longue session, vérifiez comment [Google Colab](https://research.google.com/colaboratory/faq.html) gère les ressources :

- **Offre gratuite vs offres payantes (Compute Units) :** L'offre gratuite fournit un GPU selon disponibilité, sans garantie de durée ou de modèle. Les offres **Pro / Pro+ / Pay As You Go** consomment des **compute units** selon le GPU choisi.
- **Activités interdites et WebUI :** La [politique Colab](https://research.google.com/colaboratory/faq.html#disallowed-activities) interdit l'hébergement web public, les proxies distants, le contournement des limites et les deepfakes. Gradio interactif n'est pas interdit en bloc, mais les tunnels WebUI persistants en offre gratuite déclenchent souvent des coupures.
- **Coupures, sauvegarde et confidentialité :** Exportez (EXPORT = True) ou sauvegardez sur Google Drive et gardez vos notebooks privés.
- **Alternatives :** [Kaggle](kaggle.md) ou [Lightning AI Studio](lightning-ai.md).

3. Ouvrez la vue intégrée et gardez la session connectée.

## Vérifier les cellules

Vérifiez que la première cellule détecte une GPU NVIDIA. Attendez la fin de l’installation avant de télécharger les poids. Pour l’inférence seule, utilisez `TRAINING_SAMPLE_RATES = []`. Gardez `DOWNLOAD_FCPE` si vous utilisez FCPE.

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

## 5. Entraînez une voix et sauvegardez votre travail

1. Dans **Formation**, choisissez un nouveau **Nom de modèle**. Importez votre audio ou votre ZIP via les contrôles de téléchargement de l'ensemble de données. Attendez la fin de l'importation et confirmez que **Chemin vers l'ensemble de données** pointe vers les enregistrements importés.
2. Exécutez le **Dataset Checker** et écoutez tous les enregistrements suspects. Confirmez que vos paramètres d'architecture RVC V2, de fréquence d'échantillonnage, d'intégration et de pitch correspondent à vos pré-entraînements G/D sélectionnés si vous les utilisez. Commencez avec une taille de lot adaptée au GPU alloué.
3. Exécutez **Process Data**, puis **Feature Extraction**. Lisez l’état de chacun avant de continuer. Si vous modifiez l'ensemble de données ou l'encodeur, préparez de nouveaux fichiers pour cette expérience avant la formation.
4. Exécutez **Train Pth** avec une première cible modeste et enregistrez les points de contrôle périodiques. Conservez un court clip de test en dehors des données d’entraînement. Comparez les points de contrôle exportés sur ce même clip avant de démarrer une exécution plus longue.
5. Créez l'index des fonctionnalités si vous avez besoin d'une récupération, puis essayez d'abord l'exportation d'inférence à **Rapport d'index 0**. Pour une explication détaillée de chaque paramètre, voir [Contrôles de formation et flux de travail](../train/training-controls.md).
6. Si vous souhaitez vous arrêter en cours d'exécution, utilisez **Stop and save** dans Ilaria RVC et attendez que le journal confirme la sauvegarde. Téléchargez les résultats pendant que la session Cloud est toujours active.

## Exporter et arrêter

Activez `EXPORT = True` et, pour reprendre l’entraînement, `INCLUDE_CHECKPOINTS`. Téléchargez le ZIP avant d’exécuter `STOP = True`.

### Vérifier le ZIP

Vérifiez le WAV et le modèle exportés. Activez `INCLUDE_CHECKPOINTS` pour reprendre un entraînement et conservez le jeu de données séparément.

## Résoudre les problèmes

Lisez la première erreur, corrigez-la et relancez la cellule. Si le modèle est absent, vérifiez le journal d’importation. Si la mémoire GPU est saturée, réduisez la taille du lot.

[Ilaria RVC dans le cloud](cloud.md)
