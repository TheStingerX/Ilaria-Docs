---
label: "Convertir les enregistrements"
icon: ":studio_microphone:"
order: 30
permalink: /ilaria-rvc/mainline/inference/
description: "Commencez par un court enregistrement que vous pouvez entendre clairement dans un lecteur multimédia normal, plus un modèle RVC exporté que vous êtes autorisé à utiliser."
---

# Convertir les enregistrements dans RVC WebUI (Mainline - Original RVC)

Commencez par un court enregistrement que vous pouvez entendre clairement dans un lecteur multimédia normal, plus un modèle RVC exporté que vous êtes autorisé à utiliser. Le modèle change la voix dans l'enregistrement. La source fournit les mots, le rythme et la prestation. Pour une chanson, utilisez une piste vocale enregistrée séparément ou isolée pour le premier passage.

## Mettez chaque fichier au bon endroit

| Ce que vous avez reçu | Où il va |
| --- | --- |
| Un ZIP ou 7z avec un modèle à l'intérieur | Extrayez les fichiers avant de les ajouter à RVC WebUI (Mainline - Original RVC). |
| Un fichier d'inférence `.pth` | Copiez-le dans `assets/weights/` à l'intérieur du dossier RVC WebUI (Mainline - Original RVC). Si vous l'avez formé vous-même, utilisez le petit modèle exporté. |
| Un `.index` rempli pour ce modèle exact | Dans les versions actuelles, copiez-le dans `assets/indices/`. Les versions plus anciennes découvrent généralement les index sous `logs/`. Si la détection automatique échoue, sélectionnez-la ou saisissez manuellement son chemin complet. |
| Un point de contrôle de formation `G_*.pth` ou `D_*.pth` | Gardez-le avec l'expérience en `logs/`. Utilisez le [guide de formation](training.md) pour identifier ou exporter un modèle à des fins d'inférence. |

Utilisez `added_*.index` lorsque la formation a produit à la fois des fichiers `trained_` et `added_`. Ce dernier contient les vecteurs de caractéristiques consultables. Votre modèle peut fonctionner sans index. Définissez **Index Rate** sur zéro lorsque vous ignorez l'index ou que vous ne parvenez pas à identifier le fichier correspondant.

## Convertissez votre premier clip

1. Ouvrez l'interface Web et recherchez l'onglet **Inférence de modèle**. Actualisez les listes de modèles et d'index après avoir copié les fichiers, puis sélectionnez l'inférence `.pth` dans la liste déroulante vocale. Donnez à l’interface le temps de lire le point de contrôle.
2. Choisissez un WAV court avec une seule voix parlant ou chantant seule. Les versions plus récentes exposent un contrôle de téléchargement. Si votre build affiche une zone de chemin, donnez-lui un chemin complet tel que `C:\RVC\test\voice.wav`. Essayez un chemin local court lors du diagnostic de l'accès aux fichiers dans un package plus ancien.
3. Réglez le pitch shift sur `0` pour le premier passage. Définissez le **Taux d'indexation** ou le **Rapport des fonctionnalités de recherche** sur `0` et laissez les paramètres supplémentaires tels quels. Sélectionnez `rmvpe` si disponible et ses poids sont installés. Avec un point de contrôle à haut-parleur unique, commencez par l'ID de haut-parleur `0`.
4. Cliquez une fois sur **Convertir** et attendez le panneau d'état et de lecture. Jouez le résultat depuis le début. Si cela semble utilisable, utilisez le menu du lecteur audio pour le télécharger. Si la conversion échoue, lisez l'état ou le terminal avant de modifier les paramètres.
5. Relisez la même source et la même sortie dos à dos. Vérifiez le premier mot, les notes les plus hautes et les plus basses et plusieurs pauses. Modifiez un contrôle et restituez la même entrée pour savoir quel changement a aidé.

## Comprendre les commandes que vous êtes susceptibles de toucher

| Contrôle | Comment l'utiliser |
| --- | --- |
| Pitch Shift | Transpose la source en demi-tons. `+12` l'élève d'une octave, `-12` l'abaisse d'une octave. Faites d’abord de petits mouvements lorsque les mots ou les notes semblent tendus. |
| Extraction du pitch | Estime le contour du pitch utilisé dans la conversion guidée par le pitch. Essayez une autre méthode lorsque des coupures de voix apparaissent sur certaines notes. Comparez le même clip et gardez tout le reste constant. |
| Taux d'index | Mélange les fonctionnalités à proximité de la voix cible lorsqu'un index correspondant existe. Augmentez-le progressivement si le résultat conserve trop le timbre source. Reculez si la diction devient trouble. |
| Protéger | Contrôle dans quelle mesure la conversion préserve les détails non voisés, tels que les respirations et les consonnes. Des valeurs inférieures renforcent la protection dans le contrôle RVC WebUI (Mainline - Original RVC) `0–0.5` habituel. Essayez un petit ajustement une fois la récupération de l'index terminée. |
| Enveloppe de volume | Modifie la mesure dans laquelle le résultat suit les moments forts et calmes de l'entrée. Plus proche de zéro, la source suit davantage. |
| ID du haut-parleur | Sélectionne une voix dans un point de contrôle multi-haut-parleurs. Choisissez un identifiant réellement présent dans ce modèle. |
| Rééchantillonner la sortie | Définit la fréquence d'échantillonnage audio exportée là où la construction l'expose. Laissez-le à la valeur par défaut du modèle lors de votre premier test. |

### Un test de réglage répétable

Enregistrez une source non traitée de 10 secondes sous `test.wav`. Convertissez-le avec un pitch shift nul et aucun index pour obtenir `baseline.wav`. Chargez l'index correspondant et augmentez son taux pour `retrieval.wav`. Comparez ces deux fichiers de volume similaire. Une fois que vous avez choisi un paramètre de récupération, essayez un réglage de la hauteur et enregistrez un troisième fichier. Conservez le paramètre qui améliore la même ligne problématique sans dégrader le reste.

## Convertir un dossier

1. Terminez avec succès un test de fichier unique en utilisant la même voix et les mêmes paramètres.
2. Créez des dossiers `input` et `output` séparés. Mettez uniquement l'audio que vous souhaitez convertir dans `input`.
3. Sous **Batch Inference**, choisissez vos fichiers ou entrez le chemin complet du dossier d'entrée. Définissez explicitement le chemin du dossier de sortie et choisissez WAV si vous envisagez de modifier l'audio ultérieurement.
4. Commencez avec deux fichiers courts. Confirmez que chaque résultat apparaît dans le dossier de sortie et est lu jusqu'à la fin. Ensuite, exécutez l'ensemble complet. Vérifiez l'état des échecs individuels afin de pouvoir réessayer uniquement les fichiers concernés.

## Diagnostiquer les échecs courants de conversion de fichiers

| Symptôme | Test suivant |
| --- | --- |
| La liste des modèles est vide | Confirmez que le `.pth` est extrait, sous le `assets/weights/` de l'installation active, et visible après l'actualisation. |
| Le modèle apparaît mais ne peut pas être chargé | Vérifiez que le fichier est une exportation d'inférence compatible. Un point de contrôle de formation ou un modèle provenant d'un autre moteur vocal peut apparaître dans la liste sans être utilisable. |
| L'index échoue ou il n'y a pas de résultat audible | Réglez la récupération à zéro, exécutez une conversion et confirmez que le point de contrôle fonctionne. Sélectionnez ensuite l'index renseigné correspondant et réessayez. |
| Le résultat est granuleux ou les syllabes vacillent | Écoutez d’abord l’entrée. Retestez une voix claire avec l'index désactivé. Comparez ensuite les méthodes de hauteur et un léger changement de transposition. |
| La sortie est manquante en mode batch | Vérifiez que les fichiers d'entrée s'ouvrent, que le dossier de destination est accessible en écriture et que le terminal signale le succès pour le nom de fichier concerné. |

Pour plus d'informations, voir [Modèles et fichiers RVC](../../../start/models.md) et [qualité audio](../../../conversion/audio-quality.md).
