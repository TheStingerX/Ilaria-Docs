# Synthèse vocale

[Télécharger Ilaria RVC 2.4.0 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Utilisez **Inférence → TTS** pour transformer un texte écrit en enregistrement. Vous pouvez écouter directement la parole générée ou la convertir avec un modèle RVC. Les deux étapes effectuent des tâches différentes : le moteur vocal décide de la manière dont le script est prononcé et rythmé, tandis que RVC modifie le caractère vocal de l'enregistrement. Si un nom est mal prononcé dans le premier résultat, corrigez le script ou la voix source avant de régler RVC.

> **Nouveautés de la 2.3.0** · ElevenLabs rejoint les moteurs TTS. Saisissez votre clé API ElevenLabs, choisissez une voix et testez une phrase courte.

> **Nouveautés de la 2.4.1** · Kokoro v1.0. Dans **Inference → TTS → Kokoro (local)**, installez le moteur séparément. Il occupe environ 528 Mo après installation. Choisissez une voix et testez une phrase courte. Edge utilise Internet, Windows utilise les voix installées et ElevenLabs requiert une clé API.

## Choisissez une voix source

| Moteur | Quand la choisir | Que vérifier |
| --- | --- | --- |
| Microsoft Edge | Vous souhaitez parcourir les voix en ligne par langue. | Le service a besoin d'une connexion Internet et envoie le texte à Microsoft pour synthèse. Choisissez une voix qui parle la langue du script. |
| Windows | Vous souhaitez une synthèse hors ligne sur l'installation locale de Windows. | La liste dépend des voix de bureau prises en charge installées sur ce PC. Si la voix est manquante, vérifiez les paramètres vocaux de Windows et actualisez la liste. |
| ElevenLabs | Vous souhaitez utiliser une voix de votre compte ElevenLabs. | Une connexion Internet et une clé API ElevenLabs sont nécessaires. Le texte est envoyé à ElevenLabs pour la synthèse. |
| Kokoro (local) | Vous souhaitez utiliser Kokoro v1.0 en local. | Installez Kokoro dans l’onglet TTS. Il occupe environ 528 Mo et propose 54 voix, dont Sara et Nicola en italien. |

La voix source prononce les mots. **Voice Model** est le modèle RVC qui modifie le timbre ultérieurement. Par exemple, commencez par une voix source italienne pour une écriture italienne, puis sélectionnez le modèle RVC cible séparément. Un modèle vocal fort n’ajoute pas les distinctions phonétiques manquantes à la source.

## Réalisez un premier enregistrement

1. Ouvrez **Inférence → TTS**. Tapez une phrase courte ou importez un fichier UTF-8 `.txt`. Le champ de texte prend en charge jusqu'à **10 000 caractères**. Commencez par un paragraphe avant d’importer un long script.
2. Choisissez le moteur vocal. Filtrez la liste par langue, choisissez une voix source et utilisez **Actualiser les voix** si la liste est obsolète.
3. Laissez le débit et le volume proches de leurs valeurs par défaut et laissez la conversion RVC désactivée pour le premier test. Générez le discours et écoutez le résultat original.
4. Vérifiez les noms, la ponctuation et les pauses. Si une ligne semble précipitée, divisez la phrase ou ajustez le débit. Si une abréviation est mal lue, essayez de l’écrire. Générez à nouveau le même court extrait et comparez.
5. Conservez cette première bonne version comme référence avant de modifier les commandes RVC.

## Convertissez la parole générée

1. Choisissez le **Modèle vocal** cible au-dessus du panneau TTS. Utilisez une inférence `.pth` compatible avec votre application. Sa correspondance `.index` est facultative.
2. Activez la **conversion RVC**. Commencez avec une hauteur de conversion à **0 demi-ton**, l'extracteur de hauteur par défaut, **Index Ratio 0** et les effets facultatifs désactivés. Utilisez l'encodeur de contenu attendu par le modèle cible.
3. Exécutez la conversion, puis écoutez séparément les lecteurs originaux et convertis. Comparez la même phrase à un niveau de lecture similaire. Utilisez le contrôle de téléchargement du lecteur converti pour enregistrer le WAV.
4. Si vous disposez de l'indice correspondant, essayez d'augmenter légèrement le **rapport d'indice** et comparez à nouveau. Gardez-le à zéro si vous n'utilisez pas d'index. La récupération modifiée ne peut pas corriger un mot lu incorrectement par le moteur TTS.

## Ce que chaque paramètre change

| Contrôle | Ce que cela change | Premier réglage à essayer |
| --- | --- | --- |
| Débit de parole | La vitesse de la voix source avant la conversion. | Ralentissez un peu si les syllabes se rejoignent. Vérifiez le timing avant de régler la hauteur. |
| Volume source | Le niveau de la parole générée avant conversion. | Gardez la source propre et à un niveau utile. Comparez des fichiers avec un volume sonore similaire. |
| Hauteur de la source en Hz | Change la hauteur pendant la synthèse Edge lorsque cela est pris en charge. | Laissez-le d'abord par défaut. Modifiez-le séparément du pas RVC. |
| pitch RVC en demi-tons | Transpose la voix générée lors de la conversion. | Repartir à zéro et tester des petits décalages. Vérifiez les mots les plus bas et les plus hauts de l’échantillon. |
| Extraction du pitch | Estimation du contour de hauteur à partir de l'audio généré. | Comparez les extracteurs uniquement si le pitch converti saute ou vacille. |
| Taux d'index | Contrôle dans quelle mesure la conversion utilise l'index sélectionné. | Recommencez à zéro. Utilisez une valeur modeste uniquement avec l’index correspondant exactement. |
| Volume du lecteur | Contrôle le volume d'écoute. | Utilisez-le pour comparer les niveaux de lecture. Utilisez les paramètres de conversion ou d'exportation si vous devez modifier le fichier résultant. |

## Préparez un script plus long

Divisez un long script aux limites des paragraphes ou des scènes. Conservez les mêmes paramètres de voix source, de tarif, de modèle cible et de conversion dans toutes les sections. Enregistrez les sorties avec des noms ordonnés tels que `01-intro.wav` et `02-main.wav`. Rejoignez-les dans un éditeur audio et écoutez au-delà de chaque frontière. Faites correspondre les pauses et le volume avant d'exporter le fichier final.

Pour les scripts comportant plusieurs langues, testez une courte phrase dans chaque langue avant le rendu. Utilisez des voix ou des sections sources distinctes si nécessaire. Certains contrastes phonétiques peuvent rester difficiles après conversion à cause du modèle cible ou de son encodeur de contenu.

## Dépannage

| Ce que vous entendez ou voyez | Que vérifier |
| --- | --- |
| Edge ne produit aucune parole | Vérifiez l'accès à Internet, actualisez la liste vocale et essayez une courte phrase en texte brut avec une autre voix compatible. |
| La liste Windows est vide | Vérifiez quelles voix vocales de bureau sont installées et disponibles pour l'application. La synthèse hors ligne dépend de l'environnement Windows local. |
| Les clips source et convertis prononcent mal le même mot | Changez la voix source ou réécrivez le mot dans le script, puis régénérez la source. |
| L'original est clair mais la conversion déforme les consonnes ou saute la hauteur | Testez la même source avec la récupération et les effets désactivés. Vérifiez l'encodeur et l'extraction du pitch. Si le même modèle déforme plusieurs entrées propres, inspectez les données d'entraînement et envisagez un recyclage. |
| La voix convertie sonne toujours comme la source | Vérifiez le modèle et l'encodeur sélectionnés. Comparez un autre clip propre avant d’augmenter la récupération. |
| Aucun résultat converti n'apparaît | Vérifiez que la **conversion RVC** est activée et que la voix sélectionnée est un modèle d'inférence. Lisez la première erreur dans le journal. |

Pour d'autres paramètres de conversion, voir [Contrôles d'inférence](inference-buttons.md). Pour les diagnostics, voir [Dépannage](../../reference/troubleshooting.md).
