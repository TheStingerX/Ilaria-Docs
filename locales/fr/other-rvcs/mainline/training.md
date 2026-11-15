---
label: "🧪 Entraîner et exporter un modèle"
order: 20
permalink: /ilaria-rvc/mainline/training/
---

# Entraîner et exporter un modèle RVC Mainline

Commencez avec un seul locuteur et un nouveau nom d'expérience. La formation produit un modèle que vous pouvez tester sur de nouvelles performances dans l'[interface d'inférence](inference.md). Conservez l'audio brut et le journal de l'expérience afin de pouvoir reproduire votre résultat.

## Préparez les fichiers

1. Mettez les enregistrements vocaux propres dans un dossier local tel que `C:\RVC\datasets\voice_a`. Conservez les sauvegardes ailleurs. Utilisez les enregistrements avec lesquels vous êtes autorisé à vous entraîner. Vérifiez que vous pouvez lire plusieurs fichiers et qu'ils contiennent la voix souhaitée sans musique d'accompagnement ni haut-parleurs indépendants.
2. Conservez un ou deux courts enregistrements de phrases différentes en dehors de l'ensemble de données. Utilisez-les comme entrées de test pour chaque point de contrôle. Pour un ensemble de données destiné au chant, assurez-vous de disposer de matériel avec la tessiture pertinente et testez avec une voix isolée.
3. Si vous avez installé à partir de la source, ouvrez le même environnement que celui utilisé pour exécuter l'interface Web et obtenez les pondérations pré-entraînées et les actifs de silence correspondants. Les versions packagées peuvent déjà les contenir.

```text
hf download lj1995/VoiceConversionWebUI --include "pretrained/*" "pretrained_v2/*" --local-dir assets
hf download lj1995/VoiceConversionWebUI mute.zip --local-dir .model-downloads
python -m zipfile -e .model-downloads/mute.zip logs
```

Voir [préparation de l'ensemble de données](../../model-training/dataset-preparation.md) pour les détails d'enregistrement et de nettoyage.

## Configurez l'expérience et traitez l'audio

1. Ouvrez **Train**. Utilisez un nouveau nom tel que `voice_a_v2_40k` afin que Mainline crée un dossier séparé sous `logs/`.
2. Choisissez une fréquence d'échantillonnage cible et une version d'architecture prises en charge par votre version. La V2 est un point de départ raisonnable lorsque vous envisagez d'utiliser un client d'inférence V2 compatible. Le taux, l'architecture et le guidage en hauteur doivent être en accord avec les pré-entraînements du générateur et du discriminateur. Utilisez le guidage de hauteur pour un modèle vocal normal guidé par la hauteur.
3. Sélectionnez un ensemble de données à un seul locuteur, où la construction offre un choix. Utilisez l'ID de haut-parleur `0` pour la première exécution. Collez le chemin complet du dossier de l'ensemble de données, puis cliquez sur **Traiter les données** ou sur le bouton de prétraitement équivalent.
4. Attendez la fin du prétraitement. Examinez les avertissements dans le résultat et vérifiez que l’expérience a produit un son traité. Si l'exécution ne produit rien, vérifiez le chemin et testez si les fichiers audio inclus décodent. Corrigez cela avant de commencer l’extraction.

Pour une expérience multi-enceintes sur une version avec **Multi-speaker Dataset Helper**, conservez les fichiers de chaque enceinte séparés et attribuez des ID d'enceinte stables. Vérifiez le manifeste généré et utilisez ces mêmes identifiants plus tard lors de la conversion. Effectuez d’abord une passe avec un seul haut-parleur afin d’avoir une base de référence fonctionnelle.

## Extraire le pitch et les fonctionnalités

1. Choisissez l'index GPU affiché par l'interface. Pour un GPU, l'ID est généralement `0`. Les champs de périphérique pour différentes opérations peuvent être distincts. Copiez les identifiants disponibles au lieu de prendre un emplacement spécifique.
2. Sélectionnez un extracteur de pitch que la build peut exécuter. Si une option GPU RMVPE est disponible et fonctionne sur votre système, commencez par là. Une option CPU peut aider à isoler un problème de backend. L'extraction de fonctionnalités nécessite également les actifs HuBERT partagés installés dans [setup](installation.md).
3. Exécutez **l'extraction de fonctionnalités** et attendez la fin des étapes de présentation requise et de fonctionnalité de contenu. Si une étape n'enregistre aucun fichier utilisable, arrêtez-vous et corrigez la cause. La modification de l'ensemble de données, de la version du modèle ou du taux cible modifie l'expérience. Utilisez un nouveau nom d'expérience lorsque vous comparez des paramètres incompatibles.

> Les checkpoints HuBERT génériques sont déconseillés comme encodeur par défaut pour la conversion vocale. Entraînés pour représenter la parole, ils peuvent conserver des informations sur le timbre de la voix source dans le résultat. Utilisez l’encodeur attendu par le modèle RVC, par exemple ContentVec si le modèle a été entraîné avec lui.

## Entraînez-vous et enregistrez les points de contrôle

1. Vérifiez les champs générateur et discriminateur dans le panneau de formation. Ils doivent faire référence à une paire correspondante pour la version, la fréquence d'échantillonnage et le mode de pitch que vous avez sélectionnés. Si un journal indique que les fichiers ont été ignorés, assurez-vous que vous vous entraînez avec la configuration prévue avant de continuer.
2. Commencez avec un lot qui correspond à la mémoire et laissez l'ensemble de données mis en cache pour le premier test. Si le GPU manque de mémoire, arrêtez la tâche ayant échoué et réduisez la taille du lot. Évitez d'exécuter une conversion en direct parallèlement à la première exécution de formation.
3. Définissez un objectif d'essai fini et un intervalle qui enregistre plusieurs points de contrôle que vous pourrez comparer plus tard. Si vous souhaitez que des modèles intermédiaires soient prêts pour l'inférence, activez les exportations de petits modèles au moment de la sauvegarde, lorsque cela est disponible. Conserver uniquement les derniers points de contrôle de formation permet d'économiser de l'espace mais limite la reprise à partir de versions antérieures.
4. Cliquez sur **Modèle de train**. Observez l’état de l’expérience et confirmez les progrès du journal d’entraînement au fil des époques. Utilisez le contrôle d'arrêt de l'application lorsqu'il est disponible et attendez qu'elle ait fini d'écrire les fichiers avant de fermer le processus.

Les courbes d'entraînement révèlent si le travail est en cours d'exécution ou génère des erreurs. Choisissez le modèle final en convertissant les mêmes enregistrements de test avec plusieurs exportations d'inférence enregistrées. Comparez des mots, des consonnes, des pauses et des notes difficiles à volume similaire. Plus d'époques peuvent aider, stagner ou aggraver les résultats en fonction de l'ensemble de données.

## Créez, testez et sauvegardez

1. Cliquez sur **Train feature index** après une extraction réussie si vous souhaitez un index de récupération. Recherchez le `added_*.index` renseigné dans la sortie de l'expérience, avec une copie ou un lien détectable si fourni par votre build. Ignorez la récupération si vous souhaitez uniquement évaluer le point de contrôle lui-même.
2. Recherchez le petit modèle exporté sous `assets/weights/`. Si vous ne disposez que d'un point de contrôle de générateur, utilisez **ckpt Processing** et l'outil d'extraction de petit modèle, en fournissant le taux de correspondance, l'indicateur de pitch et la version. Actualisez la liste des modèles en inférence et sélectionnez la petite exportation.
3. Convertissez un clip suspendu à un taux d'index nul. Une fois que cela fonctionne, essayez l'index rempli correspondant. Enregistrez les deux sorties pour comparaison.
4. Sauvegardez le petit modèle d'inférence et son index correspondant pour l'utiliser ou le partager. Conservez le dossier d'expérience, y compris les correspondances `G_*.pth` et `D_*.pth`, la configuration et les journaux, si vous envisagez de reprendre l'entraînement.

| Symptôme | Où chercher |
| --- | --- |
| Le prétraitement se termine sans audio | Vérifiez le chemin de l'ensemble de données, les autorisations, les formats pris en charge et si les fichiers WAV s'ouvrent en dehors de RVC. |
| L'extraction des fonctionnalités s'arrête | Identifiez si l'extraction du contenu ou du pitch a échoué. Vérifiez les actifs du modèle et essayez un backend pris en charge. |
| La formation démarre puis manque de VRAM | Réduisez la taille du lot, désactivez la mise en cache et libérez la VRAM avant de réessayer. |
| L'inférence échoue avec un point de contrôle | Confirmez que vous avez sélectionné un modèle d'inférence exporté. Testez un point de contrôle fonctionnel connu avec la même entrée et sans index. |
| La génération d'index ne trouve aucune fonctionnalité | Revoyez l'extraction de fonctionnalités réussie pour la même expérience. Vérifiez la version et les noms de dossiers avant d'essayer de réutiliser des fichiers. |
