---
label: "Configuration du microphone en temps réel"
icon: ":headphones:"
order: 10
permalink: /ilaria-rvc/mainline/realtime/
description: "Ce guide s'applique à l'interface graphique en temps réel distincte incluse dans les versions RVC WebUI (Mainline - Original RVC) prises en charge."
---

# Utilisez le changeur de voix en temps réel RVC WebUI (Mainline - Original RVC)

Ce guide s'applique à l'interface graphique en temps réel distincte incluse dans les versions RVC WebUI (Mainline - Original RVC) prises en charge. Il peut faire passer un microphone à travers un modèle en continu pendant que l'interface Web est utilisée pour les enregistrements et la formation. Commencez par écouter directement avec des écouteurs, puis envoyez l'audio traité à votre autre application.

## Ouvrez l'interface et sélectionnez vos fichiers

1. Terminez [installation](installation.md) et vérifiez le modèle avec une [conversion de fichier courte](inference.md). Cela vous donne un test indépendant si un problème de microphone survient.
2. Dans un package Windows avec `go-realtime_gui.bat`, lancez-le depuis le dossier du programme décompressé. Dans la branche source actuelle, activez l'environnement depuis la configuration et exécutez `python realtime_gui.py` depuis le répertoire du référentiel. Les noms des lanceurs de packages varient.
3. Dans la fenêtre temps réel, sélectionnez la petite inférence `.pth`. Si votre correspondant est renseigné `.index`, choisissez-le ici. Laissez **Index Rate** à `0` pour le premier test d'écoute. Si votre build nécessite un index dans son sélecteur de fichiers, fournissez celui du modèle sélectionné.
4. Choisissez une interface hôte sonore, puis sélectionnez votre microphone physique comme entrée et votre casque comme sortie. Choisissez les valeurs normales de hauteur et de fréquence d'échantillonnage proposées par votre build. Commencez avec les paramètres de performances par défaut.

## Vérifiez le microphone avant de connecter une application

1. Baissez le volume du casque avant de commencer. Si l'interface graphique propose un **Moniteur vocal d'entrée**, utilisez-le pour confirmer le microphone sélectionné. Dites une courte phrase et faites une pause. Vérifiez que vous entendez une voix directe et le silence pendant la pause.
2. Passez à **Sortie de la voix convertie** et lancez la conversion. Attendez l'initialisation. Répétez la même phrase à un niveau de parole ordinaire et écoutez les consonnes et les fins de mots. Vérifiez les commentaires avant d’augmenter le volume.
3. Si le flux démarre mais coupe des mots, vérifiez la sélection du périphérique et le niveau d'entrée. S'il y a des espaces répétés, revenez à la longueur du bloc de traitement par défaut. Une voix claire et légèrement retardée constitue une meilleure base de référence qu’un signal à faible latence qui ne cesse de se briser.
4. Arrêtez le flux avant de changer de périphérique audio ou de charger un autre point de contrôle. Redémarrez et répétez le même test d’écoute.

## Acheminez la ligne principale vers un appel ou un enregistreur

> **Correct Audio Routing**
>
> **1. Dans le Voice Changer**
> - **Input Device :** Votre microphone physique.
> - **Output Device :** `Line 1` (VAC, recommandé) ou `CABLE Input` (VB-CABLE).
>
> **2. Dans Discord, les jeux, OBS ou d'autres applications**
> - **Input Device :** `Line 1` (VAC, recommandé) ou `CABLE Output` (VB-CABLE).
> - **Output Device :** Votre casque (fortement recommandé plutôt que des haut-parleurs).
>
> ```text
> Your Microphone → Voice Changer → Line 1 (VAC) or CABLE Input/Output (VB-CABLE) → Discord / Game / OBS
> ```
>
> L'audio reçu depuis Discord, le jeu ou une autre app doit être envoyé directement vers votre **casque** (jamais renvoyé dans le câble virtuel).
>
> - **VAC vs. VB-CABLE :** **VAC** (`Line 1`) est toujours recommandé. Si vous avez aussi (ou uniquement) **VB-CABLE**, le voice changer envoie vers **`CABLE Input`** et Discord / les jeux écoutent **`CABLE Output`**.
> - **Haut-parleurs et fuite du casque :** Évitez les haut-parleurs : le son peut repasser dans votre micro et créer un son doublé, de l'écho ou convertir aussi la voix d'autres personnes. Cela peut également arriver avec un casque s'il est trop fort ou insuffisamment fermé et isolé.
> - **Monitoring :** Entendre votre propre voix convertie dans votre casque est une fonction optionnelle séparée à n'activer qu'en cas de besoin. Évitez les chemins audio dupliqués, l'écho et le loopback.

Configurez un câble virtuel ou une autre paire d'appareils de lecture et d'enregistrement connectés. La fin de la lecture reçoit le son de RVC WebUI (Mainline - Original RVC). L'extrémité d'enregistrement fournit le son à votre appel ou à votre enregistreur.

```text
Physical microphone → RVC WebUI (Mainline - Original RVC) GUI → Virtual cable playback input
                                           ↓
                       Call or recording app ← Virtual cable recording output
```

1. Arrêtez la conversion et réglez le périphérique de sortie RVC WebUI (Mainline - Original RVC) à l'extrémité de lecture du câble. Laissez le microphone physique sélectionné comme entrée de RVC WebUI (Mainline - Original RVC).
2. Dans l'application de destination, choisissez l'extrémité d'enregistrement du câble comme microphone. Sélectionnez vos écouteurs pour la lecture de cette application afin que le son de l'appel ne revienne pas via le câble.
3. Démarrez la conversion et effectuez un enregistrement privé ou utilisez le test du microphone de l'application. Confirmez qu'il capture la voix convertie une fois. Si vous avez également besoin d'une surveillance locale, utilisez la surveillance de l'application de destination lorsqu'elle est disponible et séparez-la de l'entrée du câble.
4. Si l'application de destination coupe les syllabes silencieuses, comparez un court échantillon avec le traitement automatique du bruit désactivé pour le diagnostic. Restaurez tout traitement qui améliore le résultat sans perdre de mots.

## Réduisez les délais sans créer d'abandons

Diminuez la **longueur de l'échantillon** ou le contrôle de bloc équivalent, un incrément à la fois. Un bloc plus court réduit l'attente mais donne au moteur moins de temps pour terminer. Répétez une phrase douce et une phrase plus forte après chaque changement. S'il y a des clics, des abandons ou des syllabes répétées, revenez à la dernière valeur stable. Une fois la taille du bloc stable, ajustez un autre paramètre à la fois si votre build l'expose :

- **La longueur du fondu** mélange les morceaux qui se chevauchent. Un changement peut aider avec les clics aux limites des morceaux.
- **Temps d'inférence supplémentaire** donne au modèle plus de contexte autour du bloc actuel. Réduisez-le prudemment et écoutez l'instabilité.
- **L'extraction du pitch** affecte à la fois la qualité du pitch et la charge de travail. Comparez une alternative prise en charge lorsque les notes difficiles vacillent ou que le traitement prend trop de temps.
- **Taux d'index** et réductions de bruit ajoutent du traitement. Essayez une base de référence stable avec les fonctionnalités facultatives désactivées avant de régler chacune d'entre elles.

Utilisez le même test avec votre charge de travail d’appel, de jeu ou d’enregistrement en cours d’exécution. Le délai aller-retour que vous entendez inclut également les pilotes, le câble virtuel et l'application de destination. Un chiffre de synchronisation affiché par le convertisseur ne représente qu'une partie de ce chemin.

| Symptôme | Vérifiez d'abord |
| --- | --- |
| L'appareil est manquant | Arrêtez le flux, rechargez la liste des appareils et essayez une autre interface hôte qui expose le microphone et la sortie. Vérifiez l'autorisation du microphone du système. |
| L'application en aval reçoit la voix brute | Réglez le microphone en aval à l'extrémité d'enregistrement du câble. Désactivez une deuxième source de capture si l'application mélange les deux. |
| Hurlement ou voix doublée | Utilisez des écouteurs, vérifiez qu'aucune entrée ne pointe vers le retour propre du câble et désactivez le monitoring en double. |
| Bon son du moniteur, destination silencieuse | Confirmez que vous avez choisi les deux extrémités du même câble. Testez les deux points de terminaison avec une application d'enregistrement locale. |
| Le modèle ne démarre pas | Testez la même exportation d’inférence dans WebUI et confirmez les actifs correspondants. Vérifiez la première erreur de l'interface graphique avant de modifier simultanément les paramètres de l'appareil et du modèle. |

Voir [bases de conversion en temps réel](../../../conversion/real-time.md) pour les autres applications prises en charge et la terminologie générale de routage.
