---
label: "Testez l'audio en direct dans Redpanda-vc"
icon: ":studio_microphone:"
order: 98
permalink: /ilaria-rvc/redpanda/live-audio/
description: "Le lanceur en temps réel du bureau Windows utilise les appareils exposés à ce processus local."
---
# Testez l'audio en direct dans Redpanda-vc

## Choisissez le bureau ou le navigateur

Le lanceur en temps réel du bureau Windows utilise les appareils exposés à ce processus local. L'onglet en temps réel de WebUI capture l'entrée du microphone via le navigateur et transmet l'audio au périphérique d'inférence sélectionné. Utilisez un chemin pour votre premier test et laissez l’autre fermé pour faciliter le diagnostic des commentaires et des tâches concurrentes.

1. Chargez un modèle RVC compatible, sélectionnez l'intégrateur attendu là où il est exposé et démarrez au pas neutre avec le tampon par défaut.
2. Sélectionnez le microphone physique. En mode navigateur, accordez l'autorisation du micro à la page locale et vérifiez la source réelle dans les autorisations du navigateur.
3. Connectez des écouteurs et écoutez le moniteur. Dites une courte phrase contenant à la fois des mots faibles et forts, suivie d'une pause. Vérifiez l'identité vocale, le volume et les décrochages.
4. Arrêtez le flux avant de changer de moteur ou de choisir un autre périphérique d'inférence. Exécutez un autre test après vous être reconnecté.

## Sélectionnez le périphérique de calcul

Dans les versions WebUI avec **Inference Device**, **Automatic** attribue un nouveau flux à un périphérique disponible. Choisissez un GPU spécifique lorsque vous comparez des résultats reproductibles ou laissez un GPU libre pour une autre charge de travail. Un flux reste sur l'appareil qui lui est attribué. Plusieurs GPU peuvent gérer des flux distincts ; changer le sélecteur n'est pas un moyen de combiner leur capacité en un seul flux. Beatrice utilise un chemin CPU distinct dans l'implémentation documentée.

## Acheminer le signal après un test propre

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

Si votre chemin de lecture peut cibler un câble virtuel, choisissez-y le point de terminaison de lecture du câble. Dans l'application de réception, sélectionnez le point de terminaison d'enregistrement compagnon comme microphone. Conservez le micro physique comme entrée et sortie du convertisseur de l'appel sur le casque. En mode navigateur, la destination de lecture peut dépendre des paramètres de sortie du navigateur et du système d'exploitation. Vérifiez le récepteur avec un enregistrement local avant de juger le flux en direct lors d'un appel.

| Ce que vous entendez | Que tester |
| --- | --- |
| Le moniteur fonctionne mais l'appel a un son brut | Sélectionnez le point de terminaison du câble dans l'appel et désactivez les sources de micro supplémentaires. |
| Le délai augmente ou l'audio bégaie | Arrêtez les autres flux, utilisez le tampon par défaut et testez localement avec un seul onglet. |
| Le micro du navigateur ne bouge jamais | Confirmez l'autorisation du site, l'appareil physique sélectionné et si une autre application a un accès exclusif. |
| Seul un jeu provoque un son cassé | Testez pendant que le jeu est en cours d'exécution, donnez une certaine marge au GPU de conversion ou choisissez un autre GPU disponible. |

Le flux du navigateur tente le transport WebSocket et peut revenir au streaming HTTP si nécessaire. Établissez un résultat local propre avant d’examiner la qualité de la connexion à distance.
