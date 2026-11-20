---
label: "Générer une parole à partir d'un texte"
icon: ":speech_balloon:"
order: 92
permalink: /ilaria-rvc/applio/tts/
description: "Applio utilise une voix Edge TTS en ligne pour lire votre texte et un modèle RVC pour modifier la voix générée. La voix source détermine la prononciation..."
---
# Transformez un court script en parole convertie

Applio utilise une voix Edge TTS en ligne pour lire votre texte et un modèle RVC pour modifier la voix générée. La voix source détermine la prononciation, le rythme et la langue qu'elle lit. Utilisez un texte que vous êtes à l’aise d’envoyer au service de synthèse en ligne.

1. Ouvrez l'espace de travail de synthèse vocale une fois que le moteur est prêt et que le [modèle vocal fonctionne](inference.md).
2. Saisissez une phrase courte avec ponctuation. Choisissez une voix TTS source pour la langue de cette phrase. Commencez par son débit de parole ordinaire.
3. Sélectionnez votre voix d'inférence RVC, l'intégrateur correspondant et son index si vous en utilisez un. Commencez avec le pitch shift à 0 et les effets désactivés.
4. Générez de la parole et écoutez le résultat. Si votre interface met à disposition la source synthétisée, jouez-la également. Si la source lit mal un acronyme ou fait une pause bizarre, changez la ponctuation, épelez l'acronyme ou sélectionnez d'abord une autre voix source.
5. Lorsque la phrase sonne bien, enregistrez l'audio et notez la voix source, le débit de parole, le modèle RVC, l'intégration et la hauteur. Pour les scripts plus longs, utilisez de petites sections avec des points d'arrêt naturels et gardez leurs paramètres cohérents.

Si l'étape de génération vocale échoue, testez une voix source différente et vérifiez la connexion du moteur au service vocal. Si la génération vocale réussit et que seule la conversion échoue, exécutez un court fichier enregistré via le même modèle RVC. Ce test expose les problèmes de modèle ou d'intégration sans modifier le script.
