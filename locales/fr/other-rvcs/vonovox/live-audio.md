---
label: "🎙️ Acheminer et régler Vonovox"
order: 98
permalink: /ilaria-rvc/vonovox/live-audio/
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
