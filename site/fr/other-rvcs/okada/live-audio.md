# Convertissez votre microphone dans w-okada VCClient

> Utilisez le micro physique en entrée du convertisseur, envoyez sa sortie vers le périphérique de lecture du câble et choisissez son entrée d’enregistrement dans Discord ou OBS. Pour Vonovox, commencez avec **VAC Lite** ou utilisez **VB-CABLE**. Lisez le guide complet avant un appel. [VAC Lite / VB-CABLE](../vonovox/live-audio.md)

Commencez avec des écouteurs et un seul chemin audio local. Lorsque vous entendez une voix claire et convertie dans le casque, connectez-le à un appel ou à un enregistreur. Cet ordre vous permet de localiser les problèmes avant d'ajouter le câble virtuel.

## Ajoutez un modèle et écoutez le premier résultat

1. Branchez votre microphone et vos écouteurs avant d'ouvrir VCClient. Dans le système d'exploitation, parlez dans le microphone et vérifiez que l'indicateur d'entrée bouge. Mettez Discord, OBS et autres applications de capture en pause pendant ce test.
2. Dans **Sélection de modèle**, choisissez un exemple de modèle compatible s'il en existe un. Pour votre propre modèle, utilisez **Modifier**, choisissez un emplacement libre et choisissez **Télécharger**. Sélectionnez **RVC** lorsque la boîte de dialogue demande un type de modèle. Fournissez le fichier d'inférence accepté par votre version et un index correspondant facultatif. Attendez le téléchargement, puis sélectionnez l'emplacement rempli dans la vue principale.
3. Dans les commandes audio, choisissez **Client** pour un premier test côté navigateur. Sélectionnez le nom exact du microphone physique et le nom exact du casque. Si le navigateur demande l'autorisation, autorisez l'accès au microphone pour la page locale.
4. Désactivez le passthrough, laissez le pitch et l'index à zéro et conservez l'estimateur de chunk, de contexte, de fondu enchaîné et de pitch par défaut. Si vous avez importé un index, vous pouvez l'évaluer après avoir entendu la ligne de base.
5. Appuyez sur **Démarrer**, attendez l'échauffement du modèle et parlez pendant au moins 30 secondes. Incluez une phrase calme, une phrase normale, une phrase plus forte et une brève pause. Avec la conversion activée, vous devriez entendre la voix sélectionnée. Appuyez sur **Stop** lorsque vous apportez des modifications nécessitant le redémarrage du flux.
6. Si vous entendez du silence, testez les mêmes appareils dans un simple enregistreur. Si vous entendez votre voix d'origine deux fois ou si vous l'entendez parallèlement à la conversion, désactivez la surveillance directe du microphone sur votre interface ou supprimez le chemin logiciel en double.

## Comprendre le mode des appareils client et serveur

**Client** utilise les appareils disponibles pour le client/navigateur. Les autorisations du microphone et la sélection de sortie du navigateur peuvent affecter la liste des appareils. **Serveur** ouvre les appareils sur l'ordinateur exécutant le moteur de conversion. Cela est important sur deux ordinateurs : un microphone USB branché sur le client n'apparaît pas automatiquement sur le serveur.

Sur un PC, testez d’abord le chemin client le plus simple. Basculez vers le serveur si votre build expose un moniteur distinct ou si le navigateur ne peut pas sélectionner le point de terminaison de sortie souhaité. En mode Serveur, choisissez l'API hôte et les noms d'appareil proposés par le serveur. Si plusieurs entrées partagent un nom, essayez d'utiliser la même API audio pour l'entrée et la sortie. Une fois le signal stable, vous pouvez tester des alternatives de latence.

## Envoyez la conversion vers Discord, OBS ou une autre application

1. Installez un câble virtuel pour votre système d'exploitation et rouvrez les deux applications pour que leurs listes d'appareils soient actualisées. Il doit exposer un point final de lecture et un point final d’enregistrement correspondant.
2. Réglez l'entrée VCClient sur le microphone physique. Définissez la sortie du convertisseur sur le point final de **lecture** du câble. Avec VB-CABLE, il s'agit généralement de **CABLE Input**.
3. Si l'application expose un appareil **Monitor** distinct, configurez-le sur les écouteurs. Laissez les haut-parleurs de l'application cible sur le casque.
4. Sélectionnez le point de terminaison **d'enregistrement** du câble comme microphone cible. Avec VB-CABLE, il s'agit généralement de **Sortie CABLE**. Dans OBS, sélectionnez cet appareil pour la capture d’entrée audio et coupez toute seconde capture du micro physique.
5. Utilisez un appel test ou effectuez un court enregistrement local dans l'application cible. Testez une parole calme et forte. Confirmez que l'arrêt de VCClient ou la mise en sourdine de la source convertie entraîne l'arrêt de son compteur. Si cela continue, la cible a une autre entrée active ou reçoit un itinéraire involontaire.
6. Comparez l'activation et la désactivation de la suppression du bruit de destination ou du gain automatique uniquement si le convertisseur sonne bien localement et que la cible coupe les syllabes ou modifie le niveau. Conservez les options qui conviennent à votre pièce et à votre microphone.

```text
Physical microphone → VCClient → cable playback → cable recording → call or recorder
                           └── optional monitor → headphones
```

## Réglez une configuration qui fonctionne déjà

Commencez par le bloc par défaut et testez sous votre charge de travail réelle. Lorsque l'interface utilisateur affiche la durée du bloc et le temps de conversion, comparez-les dans les unités correspondantes. Chaque bloc a besoin de suffisamment de temps pour se terminer. Laissez une marge pour les pics lors de l'exécution d'un jeu ou d'un streaming. Réduisez le morceau une étape à la fois et écoutez les abandons avant de conserver la modification. Si des mots sont coupés, augmentez-le à nouveau ou réduisez le contexte supplémentaire. Le fondu enchaîné permet d'atténuer les limites mais consomme également une partie du budget de traitement disponible.

Choisissez un estimateur de hauteur qui gère votre plage de parole normale. Comparez la même phrase à chaque paramètre. Le pitch modifie le registre, tandis que la fusion d'index modifie la mesure dans laquelle l'inférence utilise les fonctionnalités extraites de l'index d'entraînement correspondant. Augmentez l'un ou l'autre progressivement et enregistrez le résultat. Maintenez le modèle et le gain du microphone stables pendant la comparaison.

| Symptôme | Test spécifique |
| --- | --- |
| La voix originale atteint l'appel | Désactivez le relais et choisissez le câble comme seul microphone dans l'application de réception. |
| La distorsion est déjà présente dans l'enregistrement du micro simple. | Réduisez le gain d'entrée physique avant de régler le modèle. |
| La première syllabe disparaît après une pause | Comparez le seuil d'entrée et l'activation vocale de destination. Essayez un enregistrement avec l'activation vocale désactivée pour isoler la scène. |
| Le moniteur local fonctionne bien, mais le son du câble crépite | Faites correspondre les fréquences d'échantillonnage prises en charge dans le panneau audio du système d'exploitation et rouvrez les deux flux. Recherchez une deuxième application détenant le point de terminaison en mode exclusif. |
| La conversion du GPU échoue et le CPU fonctionne | Vérifiez séparément le package sélectionné, le format du modèle et le fournisseur de calcul. Testez avec le même modèle fonctionnel connu sur chaque appareil. |
| La conversion prend du retard à l'ouverture d'un jeu | Augmentez la taille des morceaux ou réduisez la charge de travail GPU concurrente. Répétez un enregistrement plus long avant de passer en direct. |

Conservez le nom du package de travail, le modèle, le mode audio, les noms de périphériques, la méthode de pitch et les commandes de tampon dans une note. Cela vous donne une base de référence fiable après une mise à jour d’un appareil ou d’un logiciel.
