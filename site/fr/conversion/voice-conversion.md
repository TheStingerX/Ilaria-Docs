# Convertir un enregistrement avec Ilaria RVC

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

La conversion vocale commence par une performance. La sortie suit généralement les mots sources, le timing, l'articulation et le contour de la hauteur tout en modifiant le son de la voix. Les décisions concernant la livraison commencent toujours par l'enregistrement original. Pour une reprise chantée, prévoyez de convertir une voix principale isolée et de mélanger ensuite la voix convertie avec l'instrument.

## Effectuez une conversion de base

1. Ouvrez Ilaria RVC et importez le modèle d'inférence que vous souhaitez utiliser. Un index facultatif appartient au point de contrôle pour lequel il a été construit. Si une voix importée est absente du sélecteur, voir [Modèles et fichiers RVC](../start/models.md).
2. Ouvrez **Single Inference**, choisissez la voix et faites glisser un court enregistrement que vous pouvez reconnaître à l'oreille. Une phrase avec une pause, plusieurs consonnes et une voyelle plus longue constitue une référence utile.
3. Réglez **Pitch** sur zéro et **Index Ratio** sur zéro. Faites correspondre l'intégrateur de contenu à celui utilisé dans la formation lorsque l'auteur du modèle le fournit. Commencez avec l'extracteur de hauteur par défaut de l'application et désactivez le traitement audio facultatif.
4. Convertissez le fichier et vérifiez la sortie. Utilisez le lecteur de forme d'onde pour revisiter la même phrase, puis enregistrez une copie WAV ou FLAC comme référence.
5. Comparez le clip original et le clip converti à des niveaux de lecture similaires. Notez le premier problème audible et utilisez [Pitch and audio quality](audio-quality.md) pour décider quoi changer.

Les versions actuelles d'Ilaria RVC recherchent automatiquement un index correspondant lorsque vous sélectionnez une voix. Sélectionner un index et lui donner une influence sont des actions distinctes. Un index chargé contribue uniquement lorsque le **Ratio d'index** est supérieur à zéro. Les versions plus anciennes peuvent afficher une présentation différente ou vous demander de sélectionner l'index manuellement.

## Choisissez une source qui correspond au travail

 | Workflow | Préparez la source | Écoutez |
| --- | --- | --- |
 | Dialogue ou narration | Utilisez un haut-parleur par piste d'entrée et gardez une courte pause naturelle entre les lignes. | Mots clairs, terminaisons de mots intactes et ton cohérent entre les phrases. |
 | Une voix principale sur de la musique | Isoler le lead. Laissez les instruments, les voix d'accompagnement et les harmonies sur leurs propres pistes. | Notes soutenues et consonnes stables qui s'alignent toujours sur le rythme. |
 | Prises multiples | Étiquetez chaque prise par scène ou section et conservez les noms de fichiers originaux dans vos notes. | Une voix cohérente et cohérente enregistrée à différents niveaux ou hauteurs. |
 | Texte parlé via TTS | Prévisualisez le discours généré avant d'appliquer le modèle. Ajustez d'abord la ponctuation ou la formulation dans le texte. | Prononciation correcte et rythme intentionnel avant l'étape RVC. |

Si une voix séparée contient encore des cymbales fortes ou un autre chanteur, comparez-la avec une prise ou une séparation plus propre. Ces sons atteignent le moteur de conversion avec la voix souhaitée. Gardez les respirations et les fins de mots là où elles comptent pour la performance.

## Convertir un lot

Ouvrez **Batch Inference** après qu'un seul fichier ait produit un résultat utilisable. Regroupez les fichiers qui nécessitent le même modèle, le même pas et le même profil de traitement. Exécutez un fichier représentatif de chaque groupe et enregistrez-le dans un emplacement de sortie distinct afin de pouvoir comparer les résultats en toute sécurité.

Pour une longue chanson, écoutez une section avec des notes hautes ou basses exposées avant de convertir l'intégralité du fichier. **Split Audio** peut s'avérer utile en cas d'enregistrements longs ou de limitations de mémoire. Écoutez les jointures de segments et les pauses après l'exécution. Si une version de l'application expose une console ou un journal de conversion, utilisez-le pour identifier les éléments ayant échoué et réessayez ces fichiers séparément.

## Convertir la parole générée

Dans une version avec l'espace de travail **TTS**, fournissez du texte ou un fichier texte UTF-8. Les versions actuelles d'Ilaria RVC proposent des voix en ligne Microsoft Edge et des voix Windows installées pour la TTS hors ligne. Choisissez une voix source dans la langue du script, écoutez la prononciation et les pauses, puis appliquez le modèle RVC à cet enregistrement généré. Si la première étape lit un nom de manière incorrecte, corrigez le texte ou modifiez d'abord la voix TTS. RVC transmettra généralement ces choix de prononciation source.

Lorsque la confidentialité ou une connexion peu fiable sont importantes, sélectionnez une voix Windows installée et vérifiez qu'elle fonctionne avec votre texte avant de commencer un long travail. L'option Edge nécessite une connexion réseau.

## Enregistrez la conversion et vos paramètres

- Conservez un master WAV ou FLAC non traité avant d'ajouter une compression, une réverbération ou une limitation.
- Pour la musique, alignez la voix convertie sur l'original, vérifiez son timing au niveau des consonnes et écoutez à la fois en solo et dans le mix avant d'exporter.
- Enregistrez vos paramètres à côté du résultat. Incluez le fichier source, les versions de modèle et d'index, l'ID du haut-parleur le cas échéant, l'intégration, l'extracteur de pitch, le pitch shift, le rapport d'index, le traitement et le format de sortie.
- Lorsqu'un modèle est manquant ou que l'inférence échoue avant de produire de l'audio, commencez par [Dépannage](../reference/troubleshooting.md). Pour la conversion du microphone, voir [Conversion vocale en temps réel](real-time.md).

## Convertir un enregistrement dans RVC WebUI (Mainline - Original RVC) {#convert-a-recording-in-mainline-rvc}

### Configurer la WebUI

Sous Windows, utilisez un package RVC WebUI (Mainline - Original RVC) compatible avec votre matériel. Extrayez l'intégralité de l'archive dans un répertoire local avant d'exécuter son lanceur. Les packages Windows qui incluent `go-web.bat` l'utilisent pour démarrer l'interface Web locale. Laissez la console ouverte pendant la conversion. Si le navigateur ne s'ouvre pas automatiquement, utilisez l'adresse locale imprimée dans la console.

### Chargez le modèle et convertissez

Placez le point de contrôle d'inférence dans `assets/weights` et son index de récupération correspondant, s'il est fourni, sous `logs`. Ouvrez **Model Inference** et actualisez les listes de voix et d'index. Choisissez le point de contrôle et l'index correspondant. Définissez le taux de récupération sur zéro pour les modèles sans index.

Donnez à l'interface Web le chemin complet d'un court fichier WAV local. Si le chemin échoue, copiez le fichier de test dans un emplacement simple tel que `C:\RVC\input\test.wav`. Gardez la transposition à zéro pour le premier passage et sélectionnez RMVPE si votre build le propose. Cliquez sur **Convertir**, puis écoutez dans le lecteur de sortie et enregistrez le résultat à l'aide de son contrôle de téléchargement. Si la génération échoue, lisez le message de la console avant de modifier les paramètres. Un modèle qui n'apparaît pas dans la liste doit généralement être déplacé vers le répertoire des poids ou redécouvert à l'aide de l'actualisation.

## Convertir un enregistrement dans Applio {#convert-a-recording-in-applio}

### Mettre en place un test mono-fichier

Dans Desktop, attendez que le moteur soit prêt, ajoutez le modèle d'inférence à la bibliothèque et ouvrez **Convert Audio** en mode fichier unique. Dans Gradio, ouvrez l'interface du navigateur et sélectionnez **Convertir l'audio** ou **Inférence**, selon la version. Actualisez la liste des modèles après avoir ajouté un point de contrôle s'il est manquant.

Sélectionnez la voix et son index apparié, puis confirmez l'intégration de contenu attendue par ce modèle. Chargez un court enregistrement et choisissez WAV ou FLAC pour le test. Vérifiez les paramètres reportés d'une exécution précédente, en particulier la hauteur, la récupération et les effets. Une ligne de base utile commence à zéro demi-ton avec les effets désactivés. Démarrez le travail une fois, attendez la sortie et comparez la même phrase dans les deux enregistrements.

### Ajustez le test avant d'exécuter un lot

 | Ce que vous entendez | Que essayer |
| --- | --- |
 | Les notes sautent ou vacillent | Comparez les extracteurs de hauteur utilisant la même phrase, puis testez la transposition séparément. |
| La voix convertie garde le timbre de départ | Les encodeurs HuBERT génériques peuvent conserver des traits du locuteur. Vérifiez la compatibilité de l’encodeur et essayez plusieurs extraits propres sans récupération. Si l’encodeur d’entraînement conserve le timbre source, réentraînez avec un encodeur compatible comme ContentVec et reconstruisez l’index. |
| Sibilantes ou respirations déformées | Testez séparément une récupération plus faible et une protection accrue des sons non voisés. Si le défaut persiste sur plusieurs extraits propres, corrigez ou ajoutez des exemples dans le jeu de données et réentraînez le modèle. |
 | La parole a un niveau inégal | Ajustez l'enveloppe de volume ou nivelez la piste terminée. Vérifiez que la source elle-même est propre. |

Lorsque la baseline fonctionne, passez en **Batch** et choisissez plusieurs fichiers ou un répertoire d'entrée, selon l'édition. Conservez la sortie dans un emplacement séparé. Utilisez une exécution différente pour les fichiers nécessitant des paramètres de hauteur différents et écoutez au moins un résultat de chaque groupe avant d'utiliser l'ensemble du lot.

Pour les problèmes d'importation de modèle et les explications détaillées des paramètres, utilisez [Modèles et fichiers RVC](../start/models.md), [Pitch et qualité audio](audio-quality.md) et [Dépannage](../reference/troubleshooting.md).
