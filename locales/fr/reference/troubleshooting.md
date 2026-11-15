---
label: "🩺 Dépannage"
order: 95
permalink: /troubleshooting/
---
# Dépannage RVC

!!!tip
Vous débutez avec RVC ? **Commencez avec un WAV de 10 secondes et un seul modèle.** Si l’application échoue, cherchez la première erreur dans le journal. Si la voix sonne mal, réécoutez le même extrait et changez un réglage à la fois. Un checkpoint sauvegarde le modèle ou l’état de l’entraînement.
!!!

Un diagnostic utile commence dès la première étape qui échoue. Conservez la version de l'application, la première erreur et un test reproductible. Effectuez une modification à la fois et comparez-la avec le même fichier ou la même phrase prononcée.

## Trouvez votre symptôme

| Symptôme | Premier test |
| --- | --- |
| Le lanceur se ferme ou le navigateur affiche une erreur de connexion | Gardez la console ouverte et vérifiez l'adresse locale imprimée par cette instance. |
| Le modèle est manquant, refuse de se charger ou signale une clé manquante | Confirmez que le fichier est une exportation d'inférence et vérifiez son architecture et son intégration. |
| Le convertisseur ne peut pas lire le fichier | Essayez un court WAV PCM à partir d'un simple chemin local. |
| La conversion fonctionne sans index | Vérifiez que l'index appartient au modèle sélectionné et à sa représentation des fonctionnalités. |
| La voix semble métallique, indistincte ou ressemble trop à l'entrée | Comparez plusieurs clips clairs et un point de contrôle connu avec effets et récupération désactivés. |
| La formation s'arrête, se bloque ou ne produit aucune exportation utilisable | Identifiez l'étape défaillante et inspectez le journal et les artefacts de cette expérience. |
| CUDA échoue ou la machine manque de mémoire | Distinguez le matériel ou le runtime non pris en charge, l'épuisement de la mémoire GPU et la pression de la RAM système. |
| Le microphone présente un retard, des lacunes, un silence ou un écho | Testez l'entrée physique, le moniteur converti, le câble virtuel et la destination séparément. |

## Établissez une ligne de base

1. Enregistrez 10 à 20 secondes d'un locuteur avec des voyelles claires, un `s` ou un `f` et une pause naturelle. Utilisez un WAV local, à niveau modéré, sans musique ni effets.
2. Sélectionnez un modèle d'inférence fiable compatible avec l'application. Enregistrez son nom, son intégration et son emplacement de haut-parleur. Commencez à zéro transposition avec l'extracteur de hauteur par défaut, le traitement facultatif désactivé et la récupération à zéro.
3. Convertissez et enregistrez dans un dossier local accessible en écriture. Lisez le fichier sur un deuxième lecteur si l'aperçu du navigateur est silencieux. Comparez la même phrase avec un volume similaire.
4. Répétez avec un modèle en bon état utilisant son propre encodeur compatible. Si les deux modèles échouent sur la même entrée, examinez le décodage, l'exécution ou les paramètres partagés. Si un seul échoue systématiquement, inspectez ce modèle, sa configuration et les données de formation si disponibles.
5. Réactivez une option par test. Enregistrez chaque résultat avec les paramètres dans son nom de fichier ou ses notes afin de pouvoir revenir à une combinaison de travail connue.

## L'application ne démarre pas

### La fenêtre se ferme ou l'installation ne se termine jamais

- **Ilaria RVC :** Extrayez le package complet, ouvrez son dossier et exécutez `ILARIA_RVC_LOGS.bat`. Recherchez au-dessus du dernier message d'arrêt la première exception utile. Vérifiez que Windows détecte le GPU NVIDIA pris en charge et que l'environnement et les ressources groupés sont toujours présents.
- **Applio Desktop :** Ouvrez la configuration et inspectez l'état du moteur. Réparez l'installation via les contrôles de configuration du bureau lorsqu'une vérification d'exécution ou de package échoue. Pour Gradio, exécutez le lanceur à partir de la caisse prévue et vérifiez quel interpréteur est actif.
- **Mainline :** Faites correspondre le lanceur et le runtime à l'archive ou à l'extraction de source spécifique. Une archive plus ancienne peut contenir une version CUDA qui ne peut pas exécuter les noyaux d'un GPU plus récent. L'installation globale d'un package Python sans rapport ne réparera pas un interpréteur fourni.
- **Erreur DLL Windows :** Pour `llvmlite.dll` ou une dépendance Visual C++ manquante, vérifiez que l'architecture d'exécution correspond à l'application et installez ou réparez le redistribuable Microsoft Visual C++ officiel pour cette architecture. Si la DLL elle-même est absente, restaurez-la via le package ou le programme d'installation d'origine.
- **Erreurs de ressources après une mise à jour :** Vérifiez que l'installation est accessible en écriture, que les fichiers d'actifs requis sont présents et que le raccourci sur le bureau pointe vers le dossier mis à jour. Sauvegardez vos modèles, ensembles de données et journaux avant de remplacer une installation.

### La page locale est vide, déconnectée ou affiche une erreur JSON

Maintenez le processus en cours d'exécution et ouvrez l'adresse de bouclage exacte imprimée dans la console. Ilaria RVC utilise normalement `127.0.0.1:6969`. Si le port est déjà utilisé, vérifiez si cette application est déjà en cours d'exécution et utilisez son adresse. Enregistrez le travail actif avant d'arrêter une instance.

Une erreur de navigateur telle que `Expecting value: line 1 column 1` peut se produire lorsqu'une requête API reçoit une réponse vide ou une page d'erreur HTML. Vérifiez la console du serveur au même horodatage. Si un proxy configuré intercepte le trafic local, vérifiez le contournement du bouclage ou testez un profil de navigateur sans l'extension interférente. Gardez le service local pendant le diagnostic.

Pour une utilisation en ligne de commande, commencez par le point d'entrée et l'aide sur les arguments de votre version exacte. Une courte exécution réussie de WebUI vous donne les paramètres correspondants et, dans les versions qui les enregistrent, les commandes de prétraitement et de formation. Les scripts plus anciens peuvent s'attendre à un ordre d'arguments ou à une disposition de répertoire différent.

## Fichiers d'entrée et de sortie

### Erreurs FFmpeg, Unicode et liste de fichiers

1. Confirmez que le fichier s'ouvre dans un lecteur normal. Exportez un nouveau court PCM WAV si le conteneur ou le codec est incertain.
2. Copiez-le dans un chemin local simple tel que `C:\RVC\input\test.wav`. Cela isole les problèmes de citation, Unicode, de synchronisation à distance et d'autorisations courants dans les anciennes versions. Conservez les enregistrements originaux.
3. Vérifiez que l'application peut voir son FFmpeg fourni. Les installations sources peuvent nécessiter un exécutable distinct disponible pour le même processus qui lance l'application. Si le WAV en bon état fonctionne, comparez le chemin d'accès et le codec d'origine avant de réinstaller l'environnement.
4. Pour la formation, confirmez que le dossier sélectionné contient de l'audio réel. Si vous modifiez les chemins après le prétraitement, reconstruisez la liste des fichiers et les fonctionnalités dépendantes dans une nouvelle expérience ou via le flux de travail de préparation de l'application.

### Un résultat apparaît mais ne peut être joué ou sauvegardé

Vérifiez le dossier de sortie et l'espace disque libre. Exportez WAV et inspectez la durée et la taille du fichier. Lisez le résultat en dehors du navigateur pour séparer les problèmes de lecture et de conversion. En mode batch, vérifiez le premier élément défaillant et le chemin de sortie, puis exécutez cet élément seul. Conservez les originaux et les résultats générés dans différents dossiers.

## Modèles, points de contrôle et index

### Un modèle n'apparaît pas

Assurez-vous qu'il y a une réelle inférence `.pth` à l'intérieur de l'archive. Placez-le dans la bibliothèque utilisée par l'application actuelle ou utilisez son contrôle d'importation et attendez la fin de l'installation. Actualisez la liste des voix et vérifiez à nouveau la sélection. Dans Ilaria RVC, la bibliothèque de modèles se trouve sous `models/`. Les archives principales et la source actuelle peuvent utiliser différentes présentations de répertoires. Voir [Modèles et fichiers RVC](../start/models.md) pour les rôles des fichiers.

### Le chargement échoue avec des clés manquantes ou des formes incompatibles

Un `G_*.pth` ou `D_*.pth` d'une expérience sert généralement de CV de formation. Utilisez la fonction d'exportation ou d'extraction de points de contrôle de l'application pour produire un modèle d'inférence. Des métadonnées F0 ou de fréquence d'échantillonnage manquantes peuvent également indiquer un format incorrect ou un fichier incomplet. Vérifiez la version RVC, le vocodeur, la fréquence d'échantillonnage, le guidage de hauteur et l'intégration. Conservez les originaux et exportez-les sous un nom différent. Une extension de nom de fichier correspondante ne peut à elle seule établir la compatibilité.

### L'index est manquant ou provoque une erreur

1. Convertir avec récupération à zéro, en ne sélectionnant aucun index si l'application le permet. Confirmez que le modèle peut produire à lui seul un résultat intelligible.
2. Sélectionnez l'index de la même expérience et configuration de fonctionnalités que le modèle. Réessayez avec une valeur de récupération modeste et comparez la même phrase. Une dimension incompatible ou un index illisible est une raison pour revérifier la paire avant le réglage.
3. Si la formation est terminée mais qu'il n'y a pas d'index, inspectez l'étape d'index séparément. Confirmez que l’extraction des fonctionnalités a réussi. Réexécutez la génération d’index uniquement lorsque les fonctionnalités compatibles d’origine sont intactes. Un très grand ensemble de fonctionnalités peut consommer de la RAM système lors de l’assemblage de l’index.
4. Préservez l'exportation d'inférence même si la construction de l'index échoue. Pour le partage ou la sauvegarde, conservez ensemble le point de contrôle fonctionnel et son index correspondant facultatif.

## Qualité sonore et limitations du modèle

| Ce que vous entendez | Test de diagnostic et interprétation |
| --- | --- |
| Souffles métalliques ou sifflantes déformées | Comparez quelques sources propres avec effets et récupération désactivés. Comparez la protection séparément. Si le même modèle déforme systématiquement ces sons dans des clips clairs, inspectez les exemples d'entraînement pour détecter l'écrêtage, la réduction du bruit ou une mauvaise couverture, corrigez l'ensemble de données et effectuez un nouvel entraînement. |
| La voix convertie conserve le timbre source | Vérifiez que le modèle et l'intégrateur de formation sont d'accord. Les fonctionnalités génériques de HuBERT peuvent conserver les signaux du locuteur. Comparez sans récupération, puis avec le bon index. Une limitation persistante du modèle formé peut nécessiter un recyclage. |
| Les mots ne se cassent que dans une seule langue | Testez les phrases retenues contenant les sons affectés avec plusieurs enregistrements clairs. Les enregistrements multilingues ne peuvent à eux seuls garantir que ContentVec préserve les distinctions. Enregistrez la limitation linguistique observée plutôt que de promettre qu'un cadre de formation différent la corrigera. |
| Sauts de hauteur ou changements d'octave | Écoutez la phrase originale, testez la transposition nulle et comparez séparément les extracteurs F0 pris en charge. Pour chanter, vérifiez les notes hautes et basses exposées. |
| Des sons métalliques autour d'une musique ou de voix de fond | Comparez une voix sèche isolée. Écoutez les artefacts de séparation avant d’utiliser une tige isolée comme données d’entraînement. |
| Le son est plat, trop faible ou présente des clips | Comparez la source et la sortie à des niveaux de lecture similaires. Désactivez les effets de gain et de limiteur pour le test et vérifiez que la source et l'exportation finale disposent d'une marge. |

Utilisez le [guide de qualité audio](../conversion/audio-quality.md) pour les tests d'écoute contrôlés et la [préparation de l'ensemble de données](../model-training/dataset-preparation.md) lorsque le défaut suit le modèle à travers les entrées.

## GPU et mémoire système

- **CUDA indisponible ou noyau non pris en charge :** Confirmez le GPU, le pilote et le runtime exacts sélectionnés par l'application. Les installations de bureau, groupées et sources peuvent voir différents appareils. Vérifiez que le backend prévu prend en charge l’opération, y compris la formation si nécessaire.
- **CUDA manque de mémoire pendant l'inférence :** Commencez par un court clip. Fermez les tâches GPU concurrentes, déchargez les modèles inutilisés et désactivez le traitement facultatif. Pour les entrées longues, essayez le contrôle de division audio de l'application ou divisez l'audio en segments et vérifiez ensuite les jointures.
- **CUDA manque de mémoire pendant l'entraînement :** Réduisez la taille du lot, désactivez la mise en cache des ensembles de données dans la VRAM et essayez une précision mixte compatible uniquement si elle est prise en charge par votre build. Gardez un point de contrôle pouvant être repris. Un lot plus petit modifie le nombre de mises à jour par époque.
- **La RAM système s'épuise ou les processeurs de prétraitement meurent :** Utilisez moins de processeurs, vérifiez que le disque dispose d'espace pour les fichiers intermédiaires et inspectez les enregistrements inhabituellement longs ou interrompus. Divisez uniquement aux limites naturelles et régénérez les données préparées affectées. Pendant la génération d’index, surveillez la RAM du système indépendamment de la VRAM.
- **Plusieurs GPU :** Confirmez l'index des appareils avec la liste des appareils de l'application. Un index peut faire référence à un GPU différent lorsque la visibilité de l'appareil change. Vérifiez le périphérique choisi dans le journal avant de comparer les performances.

## Formation, reprise et exports

### Diagnostiquer l'étape avant de la réexécuter

| Étape | Vérifier avant de continuer |
| --- | --- |
| Import du jeu de données | Confirmer le dossier de destination et attendre l'extraction. Vérifiez l'espace libre et échantillonnez quelques fichiers importés. |
| Prétraitement | Confirmez les clips utilisables et non vides et un dossier d'expérience inscriptible. Un tenseur de taille nulle peut provenir d'une tranche vide, extrêmement courte ou défaillante. Écoutez et remplacez ou coupez la mauvaise source, puis régénérez les données préparées. |
| Extraction des fonctionnalités | Confirmez que le prétraitement audio produit et que l'intégration et les ressources de pitch choisies sont présentes. Le changement d'encodeurs nécessite une configuration compatible et de nouvelles fonctionnalités. |
| Entraînement | Vérifiez les pré-entraînements G/D correspondants et l'accord entre la fréquence d'échantillonnage, le guidage de hauteur, le vocodeur, l'architecture et les fonctionnalités stockées. Une inadéquation de taille de tenseur après un changement de taux est une raison pour lancer une expérience distincte avec des paramètres compatibles. |
| Exporter et indexer | Exportez un point de contrôle d'inférence, actualisez la liste vocale, testez sans récupération et créez l'index à partir des fonctionnalités de cette expérience. |

### Reprenez en toute sécurité ou continuez avec plus d'enregistrements

Attendez que l'application ait fini de sauvegarder avant de la fermer. Préservez les points de contrôle G et D, la configuration de l’expérience et son état d’entraînement. Pour reprendre l'entraînement inchangé, sélectionnez la même expérience et vérifiez l'étape ou l'époque restaurée dans le journal. Traitez un ensemble de données modifié comme une expérience distincte : prétraitez l'ensemble de données combiné, régénérez les fonctionnalités et utilisez la méthode de continuation prise en charge par votre application avec des pondérations compatibles. Conservez le test d'origine intact pour permettre une comparaison ou une restauration.

La durée de l'ensemble de données et le nombre d'époques dépendent de la couverture vocale et de la propreté. Enregistrez plusieurs points de contrôle et écoutez les mêmes clips retenus. Une meilleure courbe de perte n’établit pas une meilleure prononciation. Si un modèle se dégrade sur des exemples propres et inédits, comparez une exportation antérieure avant de prolonger l'exécution.

## Microphone en direct, câble virtuel et appels

1. Vérifiez le microphone physique brut dans le système d'exploitation. Confirmez l'autorisation et le niveau de saisie. Débranchez les sources de micro supplémentaires pendant le test.
2. Testez le convertisseur localement via des écouteurs. Conservez le backend audio et le tampon par défaut pris en charge par l'application. Si le convertisseur dispose d'un compteur d'entrée mais pas de sortie, vérifiez la voix chargée et l'état de conversion avant de changer l'application de destination.
3. Acheminez la sortie du convertisseur vers l'extrémité de lecture du câble virtuel. Dans Discord, OBS ou l'application d'enregistrement, choisissez le point de terminaison d'enregistrement correspondant. Continuez la lecture des appels sur des écouteurs. Effectuez un enregistrement de test privé pour vérifier que le signal atteint réellement les autres.
4. S'il y a des lacunes, retestez avec une taille de bloc plus grande et avec les autres charges de travail GPU arrêtées. Si des écarts apparaissent uniquement pendant un jeu, répétez le test sous cette charge. Vérifiez si les paramètres de format audio sont en conflit entre les appareils.
5. Si la parole est coupée au début ou à la fin, testez sans détection automatique, suppression du bruit ou portes une à la fois. Si vous entendez un écho, recherchez une surveillance en double ou une boucle dans le micro physique. Conservez le dernier préréglage stable avant de réduire le délai.

Pour les noms d'appareils et les commandes spécifiques à l'application, utilisez les [guides d'application étape par étape](../other-rvcs/app-guides.md) et le [guide de routage en direct](../conversion/real-time.md).

## Plus de problèmes que vous pouvez résoudre

### Lisez le message avant de modifier quoi que ce soit

Recherchez la première erreur dans la console ou dans le journal des tâches. Le dernier message peut uniquement indiquer que le travail s'est arrêté. Copiez la ligne qui nomme un fichier, un périphérique ou un paramètre. Exécutez un court test après votre première modification. Si cela fonctionne, notez ce que vous avez modifié.

| Message ou symptôme | Première chose à faire | Si l'échec persiste |
| --- | --- | --- |
| Autorisation refusée | Enregistrez un court test dans un dossier que vous possédez. | Vérifiez si le fichier sélectionné est ouvert ailleurs ou si le dossier de sortie est géré par une autre application. |
| Fichier introuvable | Ouvrez le chemin indiqué dans l'erreur et confirmez que le fichier existe. | Resélectionnez le fichier dans RVC. Si vous avez déplacé l'ensemble de données, reconstruisez ses fichiers et fonctionnalités préparés. |
| Disque plein | Vérifiez le lecteur utilisé par l'application, y compris les fichiers temporaires. | Déplacez les sauvegardes terminées vers un autre lecteur et choisissez une destination inscriptible avec de la place pour les fichiers intermédiaires. |
| Module introuvable | Vérifiez quel lanceur et quel environnement vous avez ouvert. | Réparez l'environnement de cette application. Conservez un environnement distinct pour chaque installation source. |
| La perte de NaN ou les sorties sont silencieuses | Arrêtez l'exécution et conservez le dernier point de contrôle fonctionnel. | Vérifiez l'audio corrompu, les poids incompatibles et les problèmes de précision. Si pris en charge, comparez une courte exécution du FP32 dans une expérience distincte. |

### La voix sonne mal même si le travail a réussi

#### Un seul modèle de voix se comporte mal

Testez une voix connue en utilisant ses propres paramètres d'encodeur et d'index correspondants. Testez ensuite le modèle défaillant avec la récupération et les effets désactivés. Si la première voix fonctionne et que l'autre fait la même erreur à plusieurs reprises, inspectez l'encodeur, l'emplacement du haut-parleur et les données d'entraînement du modèle défaillant. Conservez les entrées propres comme preuve pour une comparaison après le recyclage.

#### Une partie d'un long fichier est manquante

Jouez l’entrée et la sortie côte à côte près de la section manquante. Testez cette section seule. Si le court clip réussit, vérifiez la pression de la mémoire, la division du silence, les portes automatiques et le dossier de sortie. Rejoignez les segments terminés dans un éditeur et écoutez au-delà de chaque limite avant de les exporter.

#### Un seul fichier dans un lot échoue.

Convertissez ce fichier par lui-même. S'il ne peut pas être ouvert, créez un nouveau WAV à partir de l'original. S'il est converti, vérifiez si le lot a été interrompu ou si deux fichiers partagent un nom de sortie. Réexécutez les fichiers ayant échoué dans un nouveau dossier de destination pour protéger les résultats antérieurs.

### La formation semble bloquée

1. Recherchez le dernier horodatage et l'étape en cours. La préparation d'un ensemble de données, l'extraction d'entités et la création d'un index peuvent avoir des vitesses très différentes.
2. Vérifiez si le CPU, le GPU ou le disque est toujours actif et si des fichiers sont en cours d'écriture. Actualisez le journal ou le tableau de bord si son affichage de progression est obsolète.
3. Si l'activité s'arrête et que le journal contient une erreur, diagnostiquez cette erreur. Si vous devez arrêter une tâche d'entraînement en cours, utilisez son contrôle de sauvegarde et d'arrêt et attendez la confirmation si disponible.
4. Avant de réessayer, notez le nom de l'expérience et la dernière étape confirmée. Réutilisez les fichiers terminés uniquement lorsque l'ensemble de données et les paramètres correspondent toujours.

### L'audio en direct fonctionne sur le moniteur mais échoue lors d'un appel

- **D'autres personnes entendent votre voix normale :** sélectionnez le côté enregistrement du câble virtuel dans l'application d'appel et désactivez toute deuxième source de microphone.
- **Vous entendez la voix convertie deux fois :** utilisez un seul moniteur. Désactivez l'écoute de Windows ou le moniteur de l'application pendant que vous comparez.
- **L'appel n'est coupé que lorsque vous parlez doucement :** comparez la sensibilité d'entrée et la suppression du bruit de l'application une à la fois. Enregistrez l'entrée de l'appel pour entendre ce qui lui parvient réellement.
- **L'appareil a disparu après avoir branché un casque :** arrêtez la conversion, resélectionnez le micro physique et le casque, puis redémarrez le flux audio.

Lorsqu'une étape résout le problème, répétez une fois le test d'origine avec vos applications habituelles ouvertes. Conservez cette configuration de travail comme référence.

## Synthèse vocale et signalement d'un problème

Prévisualisez la parole générée avant de la convertir. Si le TTS d'origine sonne mal, vérifiez sa langue, sa voix et son script. Pour Edge TTS, vérifiez si cette voix en ligne est accessible. Avec une voix Windows installée, vérifiez qu'elle apparaît dans la liste prise en charge de l'application. Si seule la version convertie semble fausse, utilisez la référence de conversion de fichier ci-dessus.

Lorsque vous demandez de l'aide, indiquez l'application et l'édition, la version, le système d'exploitation, le GPU et le backend, l'action exacte, la première erreur avec les lignes de journal à proximité et la reproduction sûre la plus courte. Pour la formation, indiquez l'étape ayant échoué, la fréquence d'échantillonnage, l'architecture, l'intégration et s'il s'agissait d'une nouvelle exécution ou d'un CV. Pour les problèmes en direct, répertoriez les appareils par ordre de signal. Supprimez les identifiants de compte, les chemins privés et les enregistrements sensibles avant de partager les journaux. Utilisez la [page de contact](https://ilariarvc.shop/en/contact/) pour l'assistance d'Ilaria RVC.
