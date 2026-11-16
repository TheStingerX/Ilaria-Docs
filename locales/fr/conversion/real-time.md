---
label: "⚡ Conversion en temps réel"
order: 92
permalink: /real-time/
---
# Conversion vocale en temps réel

> Utilisez le micro physique en entrée du convertisseur, envoyez sa sortie vers le périphérique de lecture du câble et choisissez son entrée d’enregistrement dans Discord ou OBS. Pour Vonovox, commencez avec **VAC Lite** ou utilisez **VB-CABLE**. Lisez le guide complet avant un appel. [VAC Lite / VB-CABLE](../other-rvcs/vonovox/live-audio.md)

Pour un enregistrement ou une reprise, la conversion de fichiers permet de restituer et de comparer plusieurs prises. Dans une configuration en direct, le convertisseur doit terminer chaque bloc audio assez rapidement pour maintenir le flux du microphone en mouvement. Configurez d'abord un signal local fiable, puis connectez-le à une application d'appel, d'enregistrement ou de streaming.

## Choisissez un outil pour le travail

Consultez le [répertoire des outils RVC](../reference/tools.md) pour les téléchargements et les notes sur le matériel, y compris Vonovox pour les GPU NVIDIA.

 | Outil | Par où commencer |
| --- | --- |
 | Vonovox | Un convertisseur en temps réel pour les modèles RVC V2 sous Windows avec un GPU NVIDIA. Téléchargez une version pour votre GPU, chargez le modèle et testez votre microphone via des écouteurs avant d'acheminer le signal converti vers une autre application. [Téléchargements Vonovox](https://huggingface.co/dr87/vonovox/tree/main) · [Documentation du projet](https://github.com/dr87/Vonovox) |
 | Mainline RVC | Le projet en amont fournit une interface Web de formation et d'inférence ainsi qu'une interface graphique dédiée en temps réel. Reportez-vous à sa version et aux instructions de lancement pour la plate-forme que vous utilisez. |
 | Applio | Ses interfaces Desktop et Gradio ont leurs propres workflows en temps réel. Utilisez les instructions de configuration correspondant à l'interface et à la version que vous avez installées. |
 | w-okada VCClient | Un changeur de voix pour une utilisation en direct. La disponibilité de RVC dépend de l’édition et de la plate-forme. Vérifiez les modèles pris en charge avant d'installer une version. [w-okada VCClient](https://github.com/w-okada/voice-changer) |
 | Deiteris et Tg-Develop | Forks w-okada indépendants avec leurs propres versions et paramètres. Vérifiez les notes de version du fork avant d'appliquer les instructions pour une autre édition. [Dépôt Deiteris](https://github.com/deiteris/voice-changer) · [Dépôt Tg-Develop](https://github.com/tg-develop/voice-changer) |


## Écoutez d'abord un signal clair

1. Connectez un microphone et des écouteurs. Dans le convertisseur, sélectionnez votre microphone physique comme entrée et votre casque comme sortie.
2. Chargez un modèle d'inférence compatible connu et son index correspondant si vous utilisez la récupération. Une courte [conversion de fichier](../start/getting-started.md) réussie est une référence utile avant de tester le chemin en direct.
3. Démarrez le stream et parlez à un niveau normal. Vérifiez l’indicateur d’entrée ou effectuez un enregistrement sec. Réduisez le gain d’entrée si les pics sont écrêtés avant la conversion.
4. Vérifiez que le signal du casque change lorsque la conversion est basculée. Si vous entendez l'original en même temps, recherchez une surveillance matérielle directe ou un deuxième itinéraire via le système d'exploitation.
5. Testez plus d'un seul mot. Incluez un discours calme, une phrase forte et une courte pause. Écoutez les coupures, les dérives ou les problèmes sous la même charge de travail que celle que vous prévoyez d'utiliser en direct.

Évitez d'écouter via des haut-parleurs à proximité d'un microphone actif. Les écouteurs vous aident à identifier un problème de routage sans renvoyer la sortie vers l’entrée.

## Envoyer l'audio converti vers une autre application

Un périphérique audio virtuel fournit un point de terminaison de lecture pour le convertisseur et un point de terminaison d'enregistrement correspondant pour l'application de réception. Les noms des points de terminaison dépendent du pilote. Par exemple, un câble virtuel peut appeler son point final de lecture « Entrée » et son point final d'enregistrement « Sortie » car les instructions utilisent la perspective du câble.

```text
Physical microphone → RVC converter → virtual playback endpoint
                                           ↓
                              matching recording endpoint → call or stream
```

Sélectionnez le point final d'enregistrement correspondant comme microphone dans l'application de réception et effectuez-y un court enregistrement test. Si votre moniteur local sonne correctement mais que l'enregistrement ne fonctionne pas, vérifiez l'entrée de destination et supprimez toute source de microphone en double. Si vous surveillez l'audio converti, utilisez une sortie casque séparée. Évitez de renvoyer l'intégralité de votre mixage de bureau ou l'audio de l'application de réception vers le convertisseur.

## Ajustez la latence sans perdre la stabilité

Le délai de bout en bout inclut les tampons de périphérique, la conversion, le routage virtuel et tout traitement dans la destination. Un chiffre de temps de traitement dans le convertisseur ne mesure qu'une partie de ce chemin. Capturez un test local du micro sec et de l'itinéraire converti si vous devez mesurer le délai entre eux.

 | Contrôle | Réglage pratique |
| --- | --- |
 | Taille du bloc ou taille du fragment | Augmentez-la si la parole est interrompue sous la charge. Une fois stable, essayez un paramètre plus petit et conservez-le uniquement si la parole normale reste claire. Des blocs plus petits laissent moins de temps pour terminer le traitement. |
 | Fondu enchaîné | Augmentez prudemment si vous entendez des jointures grossières entre les blocs. Cela change la façon dont les blocs voisins se chevauchent. |
 | Contexte supplémentaire | Essayez moins de contexte si le convertisseur prend du retard. Cela peut aider le modèle à suivre les transitions, au prix de davantage de traitements. |
 | Prédicteur de hauteur | Si un paramètre produit un timing instable, comparez les prédicteurs disponibles en utilisant les mêmes phrases. Sélectionnez celui qui gère votre plage de hauteur avec une marge de traitement suffisante. |
 | Détection de silence ou seuil d'entrée | Abaissez un seuil qui coupe les syllabes douces. Évaluez cela pendant les pauses et les discours calmes, et pas seulement pendant une entrée forte et soutenue. |
 | Fréquence de l'appareil | Vérifiez les fréquences d'échantillonnage de l'appareil et du câble virtuel si vous entendez une vitesse inhabituelle ou un crépitement. Commencez avec des paramètres compatibles tout au long de la chaîne. |

Commencez par les paramètres par défaut de l'application et modifiez un paramètre à la fois. Si un jeu ou un autre programme gourmand en GPU partage la machine, répétez le test pendant son exécution. Conservez un préréglage fonctionnel afin de pouvoir le restaurer avant de le mettre en ligne. [Interface graphique principale en temps réel](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/main/realtime_gui.py)

## Dépannage selon l'endroit où le défaut apparaît

 | Symptôme | Vérifiez d'abord |
| --- | --- |
 | Ni le compteur du convertisseur ni un enregistrement de micro sec ne répondent | Vérifiez le périphérique d’entrée du système d’exploitation et l’autorisation du microphone. |
 | Le micro sec fonctionne, mais la sortie convertie est silencieuse | Confirmez le flux démarré, le modèle chargé et le convertisseur a sélectionné la bonne sortie. Vérifiez le seuil d'entrée. |
 | Le moniteur local fonctionne, mais l'appel reçoit la voix d'origine | Sélectionnez le point final d'enregistrement virtuel comme microphone d'appel et désactivez toute source de micro physique distincte dans cette application. |
 | Vous entendez deux versions de la voix | Coupez le son des routes d'entrée en double et vérifiez que le moniteur du casque est séparé de la route virtuelle. |
 | L'audio crépite uniquement sous charge | Revenez à la dernière taille de morceau stable, réduisez les charges de travail concurrentes et retestez. |
 | Un modèle fonctionne en conversion de fichiers mais échoue en direct | Vérifiez l'édition, l'architecture et la prise en charge de l'intégration du client en direct. Testez un modèle répertorié comme compatible dans ce client avant de changer de périphérique audio. |

[Fondamentaux du RVC](../start/rvc-fundamentals.md) · [Dépannage](../reference/troubleshooting.md)
