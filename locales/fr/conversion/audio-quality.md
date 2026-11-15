---
label: "🎚️ Hauteur et qualité audio"
order: 94
permalink: /audio-quality/
---
# Ajustez la hauteur et la qualité audio

Choisissez un court extrait qui contient le problème. Effectuez une conversion de référence et comparez-la avec un paramètre modifié à la fois. Écoutez à des niveaux similaires afin qu'un résultat plus fort ne remporte pas la comparaison uniquement en termes de volume. Pour la musique, comparez d'abord la voix convertie seule, puis dans le mix.

## Hauteur, plage et résonance

La hauteur mesure la hauteur ou la profondeur d'un son exprimé. **F0**, ou fréquence fondamentale, est la partie périodique du signal à partir de laquelle un extracteur de pitch estime le contour. Un modèle guidé par la hauteur utilise ce contour lorsqu'il synthétise la sortie.

**Pitch** décale ce contour de demi-tons. Les valeurs positives l’augmentent et les valeurs négatives le diminuent. Chaque octave comporte 12 demi-tons. Par exemple, appliquer `+12` à une note voisée à 220 Hz donne 440 Hz. Un réglage sur zéro conserve la référence de hauteur de l'enregistrement.

Pour la parole, commencez à zéro. Si le clip se situe bien en dehors de la plage confortable du modèle cible ou semble tendu, comparez avec un léger décalage vers le haut ou vers le bas. Pour chanter sur un instrument existant, comparez d'abord zéro. Un changement qui change la tonalité de la voix peut entrer en conflit avec la piste d'accompagnement. Les changements d'octave conservent les noms de notes, même si le modèle doit toujours gérer la plage résultante. Comparez les notes les plus basses et les plus hautes exposées avant de vous engager dans une chanson entière.

Les **Formants** décrivent les résonances qui aident à distinguer les voyelles et le caractère de la voix. Utilisez le traitement des formants uniquement une fois que le contour de hauteur fonctionne. La hauteur et la résonance peuvent nécessiter différents ajustements. Dans les constructions avec à la fois une hauteur d'inférence et un effet de changement de hauteur, le premier modifie la hauteur extraite avant la synthèse et le second agit sur l'audio résultant.

## Comparez les extracteurs de pitch

Commencez par **RMVPE**, la valeur par défaut pour l'inférence actuelle d'Ilaria RVC. Si le pitch est instable, testez un autre extracteur disponible dans votre build, tel que **FCPE** ou **Swift**. Conservez les mêmes entrées, pitch shift, ratio d’index et format de sortie pour chaque exécution.

- Pour une note tenue, écoutez un doublement ou une réduction de moitié soudaine de la hauteur. Si plusieurs extracteurs échouent au même horodatage, recherchez un autre chanteur, un instrument dans la racine vocale ou un écrêtage important.
- Pour une parole douce, assurez-vous que l'entrée contient une voyelle claire. Augmenter le niveau d'un clip contenant principalement du bruit peut rendre le diagnostic plus difficile.
- Pour un lot important, comparez d'abord un extrait des voix sources les plus basses et les plus hautes. Comparez le temps de traitement avec le même fichier et les mêmes paramètres sur la machine prévue.

L'extraction du pitch et l'extraction du contenu sont des étapes distinctes. La modification de l'extracteur F0 estime un contour de hauteur différent à partir du même audio. L'intégrateur de contenu doit toujours correspondre au modèle.

## Effectuez des ajustements ciblés

 | Si vous entendez | Essayez d'abord | Ce qu'il faut écouter |
| --- | --- | --- |
 | Une note saute, gazouille ou disparaît | Comparez un deuxième extracteur F0 supporté sur le même extrait. | Des notes soutenues qui suivent la source sans sauts d'octave brusques. |
 | Le timbre cible est faible | Vérifiez le modèle, l'intégrateur et l'index correspondant. Comparez l'indice désactivé avec une légère augmentation du **Ratio d'indice**. | Un ton plus reconnaissable avec des mots toujours intelligibles. |
 | Les mots deviennent flous après une récupération croissante | Réduisez le **Rapport d'indice** et rejouez les mêmes consonnes. | Les syllabes deviennent plus claires sans perdre le caractère souhaité. |
| Souffle ou consonnes métalliques | Testez le même modèle avec plusieurs enregistrements propres. Si le défaut persiste, vérifiez le jeu de données pour repérer la saturation, un débruitage excessif ou un manque de souffles et de consonnes propres. Corrigez le jeu de données et réentraînez le modèle. Nettoyer le signal pendant l’inférence ne corrige pas les artefacts appris. | Souffles et consonnes comme `s` et `f` nets, sans grésillement. |
 | Le volume diminue au sein d'une phrase | Comparez un autre paramètre **Enveloppe de volume**. Vérifiez la source d'une porte, puis testez **Split Audio** si le problème n'apparaît que sur les longs clips. | Fins de mots cohérentes sans avaler de pauses naturelles. |
 | Une voix traitée semble fragile | Désactivez le nettoyage, la correction automatique de la hauteur et les effets de sortie. Ajoutez-les individuellement après une conversion propre. | Moins d'artefacts sur les sifflantes et les voyelles soutenues. |
 | Déformation des pics de sortie | Vérifiez l'écrêtage sur la forme d'onde originale ou convertie. Réduisez les gains inutiles et comparez avant de limiter. | Pics nets et pas de crépitement sur les syllabes fortes. |

Évitez de changer l'embedder pour chasser un son. Il doit correspondre à la représentation des fonctionnalités sur laquelle le modèle a été formé. **Index Ratio** mélange les fonctionnalités extraites d'un index d'entraînement correspondant dans la conversion. Il ne fournit pas d’amélioration générique de la qualité. Un mélange élevé peut rendre la prononciation moins distincte, en particulier sur une source inconnue.

Dans le moteur de fichiers d'Applio, un paramètre **Volume Envelope** plus proche de zéro suit de plus près la dynamique de la source. Pour **Protéger les consonnes sans voix**, les valeurs inférieures à 0,5 renforcent la protection et 0,5 la désactive dans ce moteur. Vérifiez l'info-bulle de votre application et les notes de publication avant de transférer ces numéros vers un autre fork.

## Diagnostiquer à l'oreille et avec l'analyseur

1. Marquez l'horodatage du problème. Vérifiez s'il apparaît dans la source, dans la voix séparée ou uniquement dans le résultat converti.
2. Si c'est dans la source, corrigez d'abord l'entrée. Comparez une autre prise avant d'utiliser un débruitage important. Baisser le volume d'un enregistrement écrêté ne peut pas restaurer les pics manquants.
3. S'il apparaît dans la conversion, comparez les effets désactivés, l'index désactivé et un extracteur de hauteur compatible en passes séparées. Vérifiez l'intégration et le package de modèle avant de supposer que le point de contrôle est médiocre.
4. Utilisez **Audio Analyzer** d'Ilaria RVC, le cas échéant, pour comparer les formes d'onde, les estimations de hauteur, les spectres et les niveaux. Un tracé de hauteur peut vous indiquer un saut suspect, et l'audio source vous indique s'il faisait partie de la performance.
5. Confirmez l’amélioration sur un deuxième extrait. Conservez le paramètre uniquement s’il fonctionne sur le matériel que vous envisagez d’exporter.

Pour chanter, tester les respirations, les consonnes, le vibrato et les notes tenues. Pour la parole, testez des phrases calmes et fortes et au moins une phrase avec des consonnes pointues. Si la sortie échoue toujours, envoyez un court échantillon autorisé et vos paramètres avec un [rapport de dépannage](../reference/troubleshooting.md).
