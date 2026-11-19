---
label: "Convertir un enregistrement"
icon: ":studio_microphone:"
order: 95
permalink: /ilaria-rvc/applio/inference/
---
# Convertir un enregistrement dans Applio

Commencez par un court enregistrement que vous pouvez reconnaître instantanément. Le matériel de test oral pourrait être « Pourriez-vous mettre le livre bleu près de la fenêtre ? » suivi d'une pause tranquille. Pour une chanson, utilisez quelques secondes d’une voix principale isolée. Le moteur reçoit le son présent dans ce fichier, y compris le bruit de la pièce, l'accompagnement ou d'autres haut-parleurs.

## Effectuez une conversion de référence

1. Ouvrez **Convert Audio**. Dans les anciennes versions de Gradio, recherchez **Inférence**. Sélectionnez le mode fichier unique.
2. Sélectionnez la voix d'inférence que vous avez [installée](models.md) et confirmez l'ID de l'intégrateur et du haut-parleur. Si les paramètres ont été restaurés lorsque vous avez modifié les voix dans Desktop, inspectez-les avant d'utiliser la nouvelle voix.
3. Ajoutez votre enregistrement audio. Utilisez **Pitch** à 0 et désactivez les traitements et effets supplémentaires. Commencez avec une influence de récupération à 0. Sélectionnez WAV ou FLAC pour pouvoir comparer les résultats sans perte.
4. Démarrez la conversion une fois. Dans Desktop, examinez l'état du travail si le résultat est mis en file d'attente. Dans Gradio, laissez la console de lancement ouverte pour voir les erreurs qui ne rentrent pas dans le navigateur.
5. Lisez les deux fichiers. Vérifiez que les mots atterrissent aux mêmes endroits et que la sortie contient la voix cible. Enregistrez la sortie dans un dossier que vous contrôlez et enregistrez les paramètres que vous avez utilisés.

## Changez une commande à la fois

| Contrôle | Une première expérience utile |
| --- | --- |
| Changement de hauteur | Essayez un petit décalage d'un demi-ton si la source se situe en dehors de la plage confortable de la voix cible. +12 double la fréquence et −12 la divise par deux. Rejouez une phrase haute et une phrase basse avant d'appliquer la modification à une chanson. |
| Extracteur de hauteur | Comparez les estimateurs disponibles lorsqu'une note saute ou qu'une phrase douce perd son harmonisation. Gardez le modèle, la transposition et l’entrée fixes. |
| Ratio des fonctionnalités de recherche | Avec le bon index chargé, augmentez l’influence par petites étapes. Écoutez le caractère cible plus fort, les consonnes étouffées ou les fuites de source indésirables. |
| Enveloppe de volume | Une valeur proche de 0 suit de plus près la dynamique de la source. Une valeur proche de 1 conserve davantage la dynamique générée. Comparez les syllabes faibles et fortes à un volume de lecture correspondant. |
| Protéger les consonnes sourdes | Sur le moteur à pitch guidé actuel, les réglages inférieurs à 0,5 activent la protection. Des valeurs inférieures l’augmentent. Essayez une phrase avec des respirations et des consonnes telles que S, F ou T. |

**Split Audio** peut aider à traiter un long fichier en plusieurs morceaux. Écoutez à travers les jointures. **Clean Audio** peut réduire les bruits indésirables, alors comparez-le à une ligne de base propre pour les modifications apportées aux détails. **Le pitch proposé** dérive un décalage dirigé vers la cible et peut interagir avec la transposition manuelle. Testez chacun par lui-même. Les effets activés via **Post-Process** s'appliquent à l'audio généré et peuvent masquer un problème de conversion.

## Exécutez un petit lot

1. Mettez deux fichiers de travail et un exemple plus silencieux ou plus long dans un dossier d'entrée de test.
2. Choisissez le mode batch. Sélectionnez l'entrée et utilisez une destination différente où le moteur peut écrire. Pour que Gradio s'exécute sur une autre machine, des chemins doivent exister sur cette machine.
3. Copiez les paramètres du modèle testé, de l'intégrateur, de l'index et du pitch. Démarrez le test et inspectez les résultats avant de traiter une collection entière.
4. Si une entrée échoue, convertissez ce fichier seul en utilisant les mêmes paramètres. S'il échoue uniquement dans le lot, vérifiez le chemin et le nom de sortie. Stockez les fichiers que vous souhaitez conserver en dehors du stockage de travail temporaire.

## Diagnostiquer le résultat

- **La tâche n'a produit aucun son.** Lisez d'abord l'erreur. Vérifiez que l'entrée est jouée, que le moteur vérifie et que le modèle sélectionné est une exportation d'inférence.
- **Le pitch semble nerveux ou électronique.** Testez le bon embedder, un estimateur de pitch et une entrée propre sans effets. Rejouez l'original pour voir si le bruit ou le saut était déjà présent.
- **La parole est présente mais la voix cible semble faible.** Vérifiez l'ID du locuteur, puis comparez la récupération uniquement si vous disposez du bon index.
- **Le fichier coupe ou impulse.** Testez à un niveau de source inférieur et désactivez le traitement qui modifie le gain. Pour le chant, comparez la voix isolée avant de la remixer dans la piste d'accompagnement.
