---
label: "🧪 Entraîner et tester un modèle"
order: 94
permalink: /ilaria-rvc/applio/training/
---
# Entraîner, évaluer et exporter une voix dans Applio

Une première exécution prouve que vos enregistrements, votre configuration et votre matériel peuvent produire une exportation avec laquelle vous pouvez convertir. Travaillez sur des enregistrements copiés que vous êtes autorisé à utiliser. Conservez deux ou trois phrases en dehors du dossier de formation afin de pouvoir vérifier le comportement sur les enregistrements que le modèle n'a jamais vu.

## Préparez les entrées

1. Créez un nom d'expérience court et reconnaissable tel que `speaking_trial_01`. Conservez les tests scratch sous leurs propres noms afin de pouvoir retrouver les points de contrôle ultérieurs.
2. Vérifiez les enregistrements à l'oreille au début, au milieu et à la fin. Supprimez les clips avec un autre haut-parleur, de la musique, des coupures ou de longues sections silencieuses. Si Desktop dispose d’outils de révision des ensembles de données, inspectez les clips signalés et préparez-y une copie de formation. Couper le silence et ajuster le niveau ne peut pas réparer la distorsion audible.
3. Sélectionnez l'ensemble de données copié dans **Formation**. Si Gradio demande un chemin de dossier, utilisez-en un sur la machine exécutant le moteur. Pour un flux de travail multi-haut-parleurs pris en charge, conservez les dossiers numériques tels que `0` et `1` et enregistrez la personne que chaque ID représente.
4. Choisissez un vocodeur et un taux d'échantillonnage pris en charge ensemble. Sélectionnez une paire générateur/discriminateur compatible si vous utilisez le pré-entraînement. Taux de correspondance, conseils de présentation, architecture et exigences d'intégration de l'éditeur. Enregistrez l'intégrateur exact et tous les fichiers personnalisés pour une inférence ultérieure.
5. Choisissez une taille de lot adaptée à la mémoire GPU et enregistrez quelques exportations intermédiaires. Choisissez une époque cible initiale pour un test de pipeline. Prolongez-le plus tard si les tests retenus s'améliorent.

## Exécuter les étapes

Dans Desktop, vous pouvez choisir **Entraînement automatique** après avoir examiné l'ensemble de données, la configuration du modèle, les époques et enregistré les paramètres. Démarrez le travail une fois et suivez sa console. Pour un contrôle séparé de chaque étape, utilisez **Configuration manuelle de l'entraînement**. Gradio expose les étapes correspondantes dans son espace de travail **Formation**.

| Étape | Que se passe-t-il | Que confirmer avant de continuer |
| --- | --- | --- |
| Prétraitement | Applio lit l'ensemble de données, prépare les clips et rééchantillonne pour le rythme choisi. | Le journal affiche l'audio utilisable du dossier prévu. Si votre build propose une normalisation **Post**, elle ajuste chaque tranche après le fractionnement. Utilisez-le uniquement lorsque vous souhaitez ce traitement. |
| Extraire | Applio construit les fonctionnalités de contenu du modèle et toutes les informations de pitch nécessaires à la configuration. | L'enrobeur prévu chargé et l'extraction terminée. Si vous changez d'encodeur, relancez l'extraction pour ce choix. |
| Former | L'expérience apprend les caractéristiques vocales de ces fonctionnalités. | La progression des époques et le point de contrôle configuré ou les fichiers d'exportation apparaissent. En cas d'erreurs de mémoire insuffisante, arrêtez les autres travaux du GPU, réduisez la taille du lot et envisagez de désactiver la mise en cache des ensembles de données. |
| Générer un index | Applio construit des données de récupération facultatives à partir de l'expérience. | Conservez l'index généré avec l'export correspondant. Si vous avez choisi de sauter cette étape, laissez la récupération désactivée pendant votre test. |

Lorsqu'une étape échoue, copiez sa première erreur et confirmez ses entrées avant de la réexécuter. Si les enregistrements, le débit ou l'architecture changent sensiblement, une nouvelle expérience permet de séparer les fichiers incompatibles. Arrêtez le temps réel avant de commencer la formation sur le GPU de bureau.

## Comparez les points de contrôle avant de choisir un gagnant

Ouvrez **Modèles → Exporter** dans Desktop ou recherchez le contrôle d'exportation de formation dans Gradio. Enregistrez une inférence `.pth` à partir d'un point de contrôle intermédiaire et d'un point de contrôle ultérieur, ainsi que l'index s'il est généré. Pour chaque exportation, convertissez les mêmes phrases retenues avec le même identifiant de haut-parleur, le même intégrateur, les mêmes paramètres de hauteur et le même volume. Écoutez l'intelligibilité, la cohérence de la voix sur les syllabes douces et fortes, ainsi que les artefacts sur les respirations. Les mesures de formation peuvent révéler des progrès ratés. L’écoute aide à décider quelle exportation conserver.

## Reprendre sans reconstruire l'expérience

Conservez le répertoire d'expérience avec ses fichiers de prétraitement, ses fonctionnalités et les points de contrôle de formation `G_*.pth` et `D_*.pth`. Conservez le même nom, la même architecture, le même tarif et l'intégration lors de la continuation. Choisissez une nouvelle cible d'époque **total** supérieure au nombre d'époques terminées. Dans Desktop, laissez **Fresh Training** désactivé. Vérifiez les premières lignes du journal pour voir quel point de contrôle a été chargé et arrêtez-vous si l'exécution recommence de manière inattendue. La petite exportation d'inférence est le fichier que vous utilisez dans le convertisseur. La formation continue nécessite l’état de formation de l’expérimentation.
