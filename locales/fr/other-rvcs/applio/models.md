---
label: "Installer et vérifier une voix"
icon: ":package:"
order: 96
permalink: /ilaria-rvc/applio/models/
---
# Installer une voix dans Applio

Placez les téléchargements de modèles dans un dossier connu et extrayez-y tout ZIP. Conservez les notes de l’éditeur à côté des fichiers. Utilisez des modèles provenant de sources fiables.

| Vous avez | Qu'en faire |
| --- | --- |
| Un export vocal tel que `ExampleVoice.pth` | Importez-le comme modèle d'inférence. |
| Un `.index` fourni pour cette voix | Gardez-le à côté de son modèle. Utilisez-le si vous souhaitez tester la récupération. |
| Les fichiers tels que `G_100.pth` et `D_100.pth` | Conservez-les pour une formation ou une reprise. Demandez l'exportation d'inférence si vous souhaitez uniquement convertir l'audio. |
| Informations sur l'identifiant de l'intégrateur, du vocodeur ou du haut-parleur | Notez-le. Vous en aurez peut-être besoin lors du choix des contrôles de conversion. |

Un intégrateur décrit le contenu audio du modèle vocal. Faites correspondre l'intégrateur de l'entraînement avant de modifier les paramètres de pas ou de récupération. Si une exportation utilise un intégrateur personnalisé, obtenez les fichiers correspondants auprès de l'éditeur.

## Importation de bureau

1. Ouvrez **Modèles → Télécharger des modèles**. Pour un lien public pris en charge, saisissez-le sous **Télécharger à partir du lien** et utilisez **Télécharger**. Attendez un statut de travail réussi avant d'actualiser la bibliothèque.
2. Pour les fichiers que vous avez déjà extraits, choisissez **Télécharger les fichiers de modèle** dans le même espace de travail. Sélectionnez le `.pth` et utilisez **Enregistrer le fichier**. Répétez l'opération pour son index si celui-ci est venu avec la voix.
3. Actualiser la **Bibliothèque de modèles**. Utilisez **Inspect** pour vérifier les métadonnées telles que le débit, l'intégration, le vocodeur ou les emplacements de haut-parleurs disponibles, là où ces champs existent. Choisissez ensuite **Utiliser** pour importer le modèle dans l'espace de travail de conversion.
4. Vérifiez que le modèle sélectionné est votre nouvelle voix avant de lancer la conversion.

## Importation Gradio

1. Ouvrez les **Modèles**, appelés **Téléchargements** dans certaines versions. Entrez le lien du modèle dans le panneau de téléchargement ou téléchargez la voix et l'index extraits via **Drop Files**.
2. Après l'installation, ouvrez **Convert Audio** ou **Inference** et actualisez la liste des modèles. Choisissez la nouvelle voix par son nom.
3. Si vous copiez des fichiers manuellement, recherchez le répertoire logs/models actif de l'installation que vous avez réellement lancée. Une installation Gradio utilise généralement une mise en page telle que `logs/ExampleVoice/ExampleVoice.pth`, avec l'index correspondant dans le même répertoire. Le chemin indiqué par une installation de bureau peut différer.

## Confirmez que le moteur peut l'utiliser

1. Utilisez un extrait de discours isolé qui dure une dizaine de secondes. Commencez avec un pitch à 0, des effets désactivés et un taux de récupération de 0. Si le modèle possède plusieurs enceintes, sélectionnez l'ID d'enceinte souhaité.
2. Choisissez l'intégrateur documenté et exécutez une seule conversion. Confirmez que le résultat est jouable et que vous pouvez reconnaître les mots que vous avez fournis.
3. Si vous disposez d'un index correspondant, enregistrez d'abord la ligne de base. Sélectionnez l'index, augmentez légèrement le taux de récupération et exécutez à nouveau le même clip. Conservez le résultat qui fonctionne le mieux pour cette voix.

Si un modèle disparaît après l'actualisation, vérifiez son extension de fichier et vérifiez où l'installation sélectionnée conserve les modèles. Si la voix est répertoriée mais produit une erreur au moment du chargement, lisez la première erreur de chargement du modèle. Vérifiez que vous avez fourni une exportation d'inférence et que votre build prend en charge l'architecture. Si un fichier provient d'un téléchargement du navigateur, vérifiez que le navigateur a enregistré l'archive du modèle réelle et n'a pas enregistré de page de connexion HTML.
