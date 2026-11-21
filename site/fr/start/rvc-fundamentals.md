# Fondamentaux de RVC

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

La conversion vocale basée sur la récupération (RVC) prend un enregistrement vocal et synthétise une version avec le caractère d'une voix entraînée. L'enregistrement fournit la performance, y compris les paroles, le rythme et une grande partie du contour de la hauteur. Le modèle détermine la manière dont cette performance est rendue. Pour une ligne parlée, enregistrez la prononciation et la prestation que vous souhaitez entendre dans le résultat. Un ajustement de hauteur change le registre sans traduire ni réécrire la ligne.

## Suivre le signal

 | Scène | Ce qu'il fait | Que écouter |
| --- | --- | --- |
 | Décoder la source | Lit l'audio et le prépare pour l'analyse. | Les pics écrêtés, l'écho de la pièce et d'autres voix peuvent contaminer les étapes ultérieures. |
 | Extraire les fonctionnalités de contenu | Un embedder représente le son de chaque courte section de l’entrée. Les flux de travail RVC courants utilisent ContentVec ou un extracteur de fonctionnalités basé sur HuBERT. | Des mots peu clairs peuvent suivre l'entrée dans la sortie, même avec un bon modèle. |
 | Estimation de la hauteur | Un prédicteur de hauteur estime la fréquence fondamentale, ou F0, dans les sections voisées. Les modèles guidés par le pitch peuvent utiliser ce contour lors de la synthèse. | Des sauts de notes inattendus ou des notes soutenues instables peuvent indiquer un suivi de hauteur. |
 | Récupérer des fonctionnalités d'entraînement similaires | Lorsqu'un index compatible est disponible, le convertisseur peut mélanger les fonctionnalités proches des données d'entraînement du modèle avec les fonctionnalités source. | Comparez l'activation et la désactivation de la récupération si le résultat semble étouffé ou si le timbre source est trop proéminent. |
 | Synthétiser la sortie | Le modèle transforme les caractéristiques conditionnées en une forme d'onde à son taux de synthèse pris en charge. | Écoutez les textures métalliques, les consonnes manquantes et les changements de niveau. |

> Les checkpoints HuBERT génériques sont déconseillés comme encodeur par défaut pour la conversion vocale. Entraînés pour représenter la parole, ils peuvent conserver des informations sur le timbre de la voix source dans le résultat. Utilisez l’encodeur attendu par le modèle RVC, par exemple ContentVec si le modèle a été entraîné avec lui.

### Gardez les commandes séparées

- **Pitch Shift** décale le contour détecté par demi-tons. Commencez à zéro et modifiez-le si la performance est en dehors du registre confortable de la voix cible.
- **Prédicteur de pas** modifie la façon dont le contour est mesuré. Comparez les prédicteurs sur un passage qui contient le problème, comme une note soutenue ou la transition de la parole à la respiration.
- **Taux d'index** modifie l'équilibre entre les fonctionnalités source et récupérées. Zéro désactive la contribution à la récupération dans les flux de travail RVC standard. Un paramètre élevé peut mettre l'accent sur les caractéristiques des données d'entraînement, notamment les artefacts indésirables.
- **Taux d'échantillonnage** décrit le nombre d'échantillons audio représentant une seconde. Le débit du fichier source, le débit de synthèse du modèle et le débit du fichier exporté peuvent différer. Le rééchantillonnage d'un fichier modifie sa représentation sans rendre chargeable un point de contrôle incompatible.

Pour les contrôles de conversion spécifiques à l'application, voir [Conversion vocale](../conversion/voice-conversion.md).

## Vérifiez la compatibilité du modèle avant l'importation

1. **Confirmez la famille et l'architecture du modèle.** Utilisez un runtime qui prend explicitement en charge le modèle. Les RVC classiques v1 et v2 utilisent des dimensions de fonctionnalités différentes, généralement 256 et 768 respectivement dans RVC WebUI (Mainline - Original RVC). Certains forks prennent également en charge des architectures qui nécessitent leur propre runtime.
2. **Vérifiez l'intégration.** Le moteur d'exécution doit fournir la représentation des fonctionnalités à laquelle le modèle a été entraîné. Un modèle formé avec un intégrateur personnalisé peut avoir besoin de cet intégrateur au moment de l'inférence. Une extension de fichier similaire ou une fréquence d'échantillonnage correspondante fournissent à elles seules peu de preuves de support.
3. **Utilisez l'exportation d'inférence.** Un `.pth` prêt à l'emploi et un point de contrôle de formation peuvent avoir la même extension. Sélectionnez le fichier identifié par l'éditeur comme modèle d'inférence. Un ZIP est un conteneur pour les fichiers et n'est directement importable que lorsque l'application prend en charge l'importation ZIP.
4. **Associez les données de récupération à leur point de contrôle.** Un `.index` construit pour une autre voix ou un autre intégrateur peut échouer ou dégrader le résultat. Conservez le modèle et son index ensemble et vérifiez que l'application a sélectionné la paire attendue. Si vous disposez uniquement d'un modèle compatible, utilisez le workflow de non-récupération pris en charge par votre client.
5. **Testez un fichier court.** Essayez un clip propre avec les paramètres par défaut. Un modèle qui se charge peut toujours sonner de manière erronée si le runtime utilise le mauvais extracteur de fonctionnalités ou si l'entrée est bien en dehors de la plage de la voix.

!!!warning Fichiers de modèles de confiance
Obtenez les fichiers de modèle auprès de l'éditeur d'origine ou d'une autre source de confiance. Le chargement d'un point de contrôle PyTorch peut impliquer la désérialisation d'objets Python. Gardez les protections de votre chargeur activées et demandez une exportation prise en charge s'il refuse un fichier. [Référence de chargement de PyTorch](https://docs.pytorch.org/docs/stable/generated/torch.load.html)
!!!

## Jugez le résultat avec un test répétable

Conservez un clip de référence sec et utilisez ce même clip pour chaque comparaison. Incluez une phrase calme, une phrase avec des consonnes pointues et une voyelle soutenue. Gardez les niveaux de lecture similaires afin que le volume à lui seul ne fasse pas paraître une sortie meilleure.

1. Créez une ligne de base en utilisant les valeurs par défaut de l'application.
2. Vérifiez d'abord la clarté des mots. Si les clips secs et convertis sont difficiles à comprendre, réenregistrez la source.
3. Pour l'oscillation du pitch, comparez deux prédicteurs de pitch pris en charge avant de modifier la récupération.
4. Pour un problème de timbre ou de texture, comparez avec la récupération désactivée, puis ajustez le taux d'index si l'index correspondant vous aide.
5. Enregistrez les paramètres de travail avec le nom du modèle, la version et la saisie. Lorsqu'une mise à jour ultérieure modifie le son, ces notes vous donnent un point de départ.

[Démarrez avec Ilaria RVC](getting-started.md) · [Modèles et fichiers RVC](models.md) · [Conversion vocale en temps réel](../conversion/real-time.md)
