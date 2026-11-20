---
label: "Acheminer et régler Vonovox"
icon: ":studio_microphone:"
order: 98
permalink: /ilaria-rvc/vonovox/live-audio/
description: "Utilisez trois points de terminaison : votre microphone physique pour l'entrée, un câble virtuel pour le signal converti et des écouteurs pour la surveillance."
---
# Acheminer et régler Vonovox

## Configurer l'itinéraire

Utilisez trois points de terminaison : votre microphone physique pour l'entrée, un câble virtuel pour le signal converti et des écouteurs pour la surveillance. Un câble virtuel a un côté lecture pour l'application qui envoie l'audio et un côté enregistrement pour l'application qui le reçoit. Certains pilotes affichent le même nom de ligne des deux côtés.

1. Dans Vonovox, définissez **Input Device** sur le micro physique. Définissez **Output Device** sur la ligne virtuelle répertoriée sous Périphériques de lecture Windows.
2. Dans l'application de réception, sélectionnez la ligne correspondante sous ses paramètres de microphone. Évitez de laisser l'application sur **Par défaut** si elle sélectionne le micro physique. Gardez la sortie haut-parleur de l'application de réception réglée sur vos écouteurs.
3. Pour écouter localement, ouvrez **Paramètres → Système → Son → Plus de paramètres sonores → Enregistrement**. Ouvrez les propriétés du point de terminaison d'enregistrement du câble, sélectionnez **Écouter cet appareil** et envoyez la lecture au casque. Désactivez l'écoute si vous surveillez déjà via une autre application.
4. Testez dans l'application réceptrice avec un enregistrement privé ou son test micro. Dites une phrase normale, attendez tranquillement, puis dites une phrase plus forte. Vérifiez que l'enregistrement contient la voix convertie, des pauses claires et aucune deuxième copie de votre micro brut.

Le développeur utilise une route audio de 48 kHz. Si votre micro et votre pilote virtuel exposent ce taux, définissez leurs formats de périphérique sur 48 kHz. Ce format d'appareil est distinct du taux d'entraînement du modèle.

## Réglez dans un ordre répétable

| Symptôme | Changez pour tester en premier |
| --- | --- |
| Grépitements ou syllabes manquantes | Augmentez la **taille du bloc** d'un cran et répétez la même phrase. |
| Audio propre avec trop de retard | Réduisez la **taille du bloc** d'une étape. Restaurez la dernière valeur propre si elle supprime l'audio. |
| Les chuchotements ou les chants disparaissent | Désactivez **RNNoise** et **VAD Noise Reduction** si activés et vérifiez les portes vocales en aval. |
| Le son local est clair mais l'audio envoyé est silencieux | Vérifiez que l'application réceptrice écoute le point de terminaison d'enregistrement du câble. |
| La voix se répète ou fait écho | Désactivez la surveillance en double et assurez-vous que la sortie de l'appel est acheminée directement vers les écouteurs. |
| L'audio s'interrompt uniquement pendant le jeu | Test sous la charge de jeu habituelle. Donnez de la marge au GPU du convertisseur ou augmentez la taille du bloc. |

Gardez une anticipation sur son préréglage pour le premier test. Modifiez-le seulement après avoir trouvé une taille de bloc stable. Ajustez la hauteur et les formants indépendamment, en faisant une pause entre les changements afin que les artefacts résultants soient plus faciles à isoler. Lorsque vous testez la lecture de fichiers en temps réel, vérifiez la source active dans l'interface utilisateur avant de reprendre l'utilisation du microphone. Un fichier en cours de lecture peut remplacer temporairement le micro physique.

## Guide des câbles virtuels Windows

### Choisissez VAC Lite ou VB-CABLE

**VAC Lite est le premier choix recommandé pour Vonovox.** C'est également la préférence dans la configuration Windows du projet Vonovox. Utilisez [VAC Lite](https://software.muzychenko.net/freeware/vac470lite.zip) si vous partez de zéro. [VB-CABLE](https://vb-audio.com/Cable/) est une alternative utilisable s'il est déjà installé ou s'il fonctionne mieux avec votre configuration audio particulière. Installez d'abord un pilote pour que la liste des périphériques soit facile à suivre.

Après avoir installé le pilote, rouvrez le convertisseur et appelez ou enregistrez l'application afin qu'ils puissent voir les nouveaux points de terminaison audio. Redémarrez Windows si le programme d'installation vous le demande. Les exemples de noms ci-dessous peuvent inclure un nom de pilote ou un suffixe de numérotation.

| Pilote | Sortie du convertisseur (point final de lecture) | Discord, OBS, jeux ou autres applications (périphérique d’enregistrement) |
| --- | --- | --- |
| VAC Lite | **Ligne 1** sous Lecture | **Ligne 1** sous Enregistrement |
| VB-CABLE | **CABLE Input** | **CABLE Output** |

### Câblez correctement les quatre appareils

1. Dans le changeur de voix, réglez **input** sur votre microphone physique. Parlez pour confirmer que le compteur d’entrée bouge.
2. Dans le changeur de voix, définissez **output** sur le point final de lecture du câble choisi. Gardez le convertisseur en marche.
3. Dans Discord, sélectionnez le point de terminaison d'enregistrement correspondant dans **Voix et vidéo → Périphérique d'entrée**. Dans OBS, ajoutez une source **Audio Input Capture** pour ce point de terminaison d'enregistrement. Coupez toute source micro en double pendant le test.
4. Réglez la lecture Discord ou Windows sur vos écouteurs. Gardez les sons du système et la voix de l'autre personne hors du câble. Enregistrez ou utilisez le test du microphone de l'application de destination pour confirmer ce qui lui parvient réellement.

### Surveillez brièvement et vérifiez le format audio

Ouvrez **Paramètres → Système → Son → Plus de paramètres sonores → Enregistrement**. Choisissez le point de terminaison d'enregistrement du câble, ouvrez **Propriétés → Écouter**, activez **Écouter cet appareil** et sélectionnez un casque pour sa lecture. Testez à faible volume. Si le convertisseur ou l'OBS assure déjà la surveillance, utilisez un moniteur à la fois pour éviter un écho. Vous pouvez désactiver l'écoute de Windows après le test et continuer à envoyer le câble vers la destination.

Pour Vonovox, commencez par le mode partagé WASAPI lorsqu'il est disponible. Utilisez 48 kHz sur les extrémités du microphone et du câble s’ils le prennent en charge. Le format de l'appareil Windows est distinct du taux de formation du modèle. Si l'appareil ne peut utiliser qu'un autre format pris en charge, testez l'itinéraire réel avant de modifier d'autres paramètres.

### Trouvez quel maillon de la chaîne a échoué

| Que se passe-t-il | Première vérification |
| --- | --- |
| Rien ne bouge dans Vonovox | Vérifiez l'autorisation du micro Windows et l'entrée physique du micro. |
| Vonovox reçoit votre micro mais le câble n'a aucun signal | Vérifiez que la conversion est en cours et que la sortie du convertisseur est le point final de lecture du câble. |
| Le câble a un signal mais Discord envoie le micro brut | Sélectionnez explicitement le point de terminaison d'enregistrement du câble dans l'application d'appel. |
| Vous entendez votre voix deux fois | Désactivez le monitoring en double et vérifiez que le micro physique n'est pas capturé séparément. |
| Les voix des autres reviennent sous forme d'écho | Acheminez la sortie d'appel vers un casque et retirez l'audio du bureau ou de l'appel du câble. |
| L'audio sonne bien jusqu'à ce que le PC soit sous charge | Restaurez le tampon par défaut ou augmentez-le, et testez avec le jeu ou l'application de streaming en cours d'exécution. |
| Les syllabes disparaissent lorsque vous chuchotez ou chantez | Testez avec la détection d'activité vocale et la suppression du bruit désactivées une à la fois. |

Ajustez la **Taille du bloc** une fois l'itinéraire complet terminé. Abaissez-le d'un cran et répétez la même phrase. Si vous obtenez des clics ou des mots manquants, restaurez la dernière valeur propre. Laissez l’anticipation et les autres effets à leurs valeurs par défaut jusqu’à ce que vous disposiez d’une ligne de base stable.
