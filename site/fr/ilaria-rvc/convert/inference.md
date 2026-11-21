# Inférence unique et par lots

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

[Commandes d’inférence](inference-buttons.md)

## Établir une référence

Ouvrez **Single Inference**, choisissez une voix et chargez un clip court et sec. Réglez **Pitch** et **Index Ratio** sur zéro. Utilisez l'intégrateur attendu par le modèle, commencez par RMVPE et laissez les effets facultatifs désactivés. Enregistrez un WAV et comparez-le avec votre entrée avec un volume sonore correspondant.

## Réglez des passes séparées

Si un index correspondant est disponible, augmentez la récupération par petits incréments. Écoutez le caractère de la voix plus clair et un éventuel assourdissement. Réduisez **Protect** pour donner aux consonnes et aux respirations plus de protection lors de la conversion guidée par la tonalité. L'effet dépend de la récupération, qui ne contribue qu'au-dessus de zéro. Comparez les paramètres de hauteur séparément.

## Traiter plusieurs fichiers

Dans **Batch Inference**, regroupez les enregistrements par modèle et paramètre de hauteur. Utilisez un dossier de destination distinct. Exécutez d’abord un clip représentatif, puis vérifiez le journal du lot et écoutez le résultat de chaque groupe.
