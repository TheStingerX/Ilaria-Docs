# Configurer l'audio en direct dans Okada TG Developed Fork

> Utilisez le micro physique en entrée du convertisseur, envoyez sa sortie vers le périphérique de lecture du câble et choisissez son entrée d’enregistrement dans Discord ou OBS. Pour Vonovox, commencez avec **VAC Lite** ou utilisez **VB-CABLE**. Lisez le guide complet avant un appel. [VAC Lite / VB-CABLE](../vonovox/live-audio.md)

Utilisez un point de contrôle d'inférence RVC compatible et un microphone fonctionnel. Prouvez d’abord que le signal converti atteint vos écouteurs. Envoyez ensuite ce signal à une autre application et effectuez un enregistrement depuis le récepteur.

## Charger une voix RVC

1. Arrêter la conversion si elle est déjà en cours. Ouvrez **Modifier** dans la zone de sélection du modèle et choisissez un emplacement vide.
2. Choisissez **Télécharger** et sélectionnez le fichier de modèle d'inférence RVC. Lorsque la boîte de dialogue expose un champ distinct pour l'index, ajoutez le `.index` correspondant s'il est fourni. Utilisez uniquement des fichiers d'inférence compatibles. Un index à lui seul ne peut pas produire une voix.
3. Attendez le téléchargement et cliquez sur l'emplacement nouvellement chargé dans la vue principale. Vérifiez le nom du modèle avant d’appuyer sur Démarrer.
4. Réglez le pitch et la récupération à zéro. Assurez-vous que **Passthrough** est désactivé. Son état activé envoie le microphone sec, afin que le microphone puisse atteindre un appel même si la conversion est contournée.

## Testez le microphone et le périphérique de calcul

1. Dans **Audio**, choisissez le mode pour les appareils que vous comptez utiliser. Dans un test de navigateur local, utilisez **Client** et accordez au site l'accès à votre microphone. Dans **Serveur**, choisissez les périphériques d'entrée et de sortie visibles par le processus qui exécute TGR.
2. Nommez les points de terminaison avant de commencer. **Input** est le microphone physique, **Output** est le casque pour le premier test et **Monitor** est facultatif si votre version le propose.
3. Choisissez votre GPU ou CPU prévu dans le sélecteur de périphérique. Pour une référence DirectML, essayez `rmvpe_onnx` si cela est répertorié. Les détecteurs de pitch DirectML pris en charge documentés par le fork incluent également `fcpe_onnx`, `crepe_tiny_onnx` et `crepe_full_onnx`. La build CUDA peut exposer une liste différente.
4. Appuyez sur **Démarrer** à la taille de morceau par défaut. Donnez au modèle le temps de s'initialiser, puis prononcez une phrase calme et une phrase plus longue et plus forte. Faites une pause entre les deux. Vérifiez que la sortie change lors de la sélection du modèle et que l'audio reste stable pendant une minute.
5. Si vous entendez également une copie sèche, désactivez l'effet local matériel ou supprimez l'autre boucle micro du système d'exploitation. Gardez les niveaux des écouteurs modérés pendant les tests.

## Connecter un câble

L'éditeur de TGR utilise Virtual Audio Cable de Muzychenko pour ses exemples de dépannage Windows. Cela expose généralement les points de terminaison de lecture et d'enregistrement correspondants nommés **Ligne 1**. D'autres pilotes de câble utilisent des étiquettes différentes. Le signal doit entrer dans le point final de lecture et sortir par le point final d’enregistrement correspondant.

| Réglage | Premier test routé |
| --- | --- |
| Entrée TGR | Votre microphone physique, le même qui a fonctionné lors du test du casque. |
| Sortie TGR | Point final de lecture du câble. |
| Moniteur TGR | Casque, s'il est affiché comme une sortie séparée. |
| Entrée Discord ou OBS | Le point final d'enregistrement du câble. |
| Sortie Discord ou lecture du système d'exploitation | Casque. |

1. Installez le câble et redémarrez les applications pour actualiser les appareils audio.
2. Réglez les appareils comme indiqué, puis vérifiez les formats par défaut du micro et du câble dans les paramètres audio du système d'exploitation. Choisissez une fréquence d’échantillonnage commune prise en charge. En mode serveur, recherchez les noms de périphériques en double répertoriés sous différentes API hôtes et utilisez une paire compatible.
3. Démarrez la conversion, puis démarrez le test du micro de l'application réceptrice. Enregistrez une courte phrase. Écoutez ce que le destinataire reçoit, pas seulement le moniteur dans TGR.
4. Dans OBS, désactivez le microphone physique séparé s'il duplique la source du câble. Lors d'un appel, vérifiez que l'entrée sélectionnée est explicite plutôt que de changer automatiquement lorsque vous branchez un nouveau casque.
5. Arrêtez le convertisseur. Si le compteur de réception continue de répondre, vérifiez le point de terminaison d'enregistrement sélectionné et tout audio de bureau acheminé vers le câble.

## Ajustez DirectML et CUDA sans perdre votre base de référence

**Chunk** contrôle le bloc de l'audio entrant. **Extra** fournit le contexte autour du bloc actuel. Les commandes **Crossfade** se chevauchent là où les blocs se rejoignent. Modifiez une commande à la fois et effectuez un enregistrement test. Si le temps de traitement se rapproche de la durée du fragment, commencez par augmenter le fragment ou réduire le contexte supplémentaire. Si un morceau modifié se comporte bizarrement, arrêtez et redémarrez la conversion.

Sur la version DirectML documentée, les modifications apportées à Chunk, Extra et Crossfade peuvent nécessiter la sélection du CPU, puis la resélection du GPU prévu. Faites-le après l'arrêt, redémarrez le flux et répétez le même test avant d'évaluer la latence. Sur CUDA, autorisez l'échauffement au premier démarrage avant de mesurer. Certaines combinaisons audio et protocole du serveur affichent **perf** sans autres timings. Jugez le cheminement complet de l'appel avec un enregistrement dans l'application de réception.

| Défaut | Action suivante |
| --- | --- |
| Le micro passe inchangé | Désactivez **Passthrough**, vérifiez l'emplacement sélectionné et sélectionnez le câble comme seul microphone de l'application de réception. |
| Une syllabe douce disparaît | Testez séparément le seuil d'entrée et la détection vocale de l'application de destination. Vérifiez un enregistrement simple pour le silence réel. |
| Les clics démarrent une fois le câble connecté | Comparez les fréquences d'échantillonnage du micro et du câble et les sélections de l'API hôte. Retestez sans le câble pour confirmer quelle étape introduit le clic. |
| Les mots bégaient lorsqu'un jeu s'ouvre | Restaurez le dernier morceau stable, réduisez le contexte ou la charge concurrente et retestez. Gardez le paramètre qui fonctionne avec les deux applications ouvert. |
| Une seule méthode de pitch plante ou se bloque | Revenez à une méthode répertoriée par votre backend. Sur DirectML, comparez les options de pitch ONNX avec la même phrase courte. |
| Une deuxième application dispose d'un compteur mais enregistre le bruit de la pièce | Arrêtez TGR et vérifiez à nouveau le compteur. Un compteur qui suit toujours votre micro indique un itinéraire supplémentaire ou un mauvais point final d'enregistrement. |

Si vous avez besoin d'aide pour un diagnostic plus approfondi, conservez l'identifiant de la version, le backend, les noms des périphériques de microphone et de câble, le détecteur choisi et la première erreur de console. Confirmez si le problème se produit également lors d'un test de casque local.
