# Explication de tous les autres panneaux

[Télécharger Ilaria RVC 2.4.0 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Utilisez **Autre** pour gérer les fichiers, inspecter ou combiner des modèles, réviser l'audio et maintenir l'application. Commencez par décider si vous avez besoin d'un modèle d'inférence, d'un encodeur de contenu ou d'une paire de formation G/D. Ils appartiennent à différentes parties de RVC.

## Obtenez des modèles et des ressources de formation

| Panneau et contrôles | Que saisir et à quoi s'attendre |
| --- | --- |
| `Import local models` | Supprimez un .pth d'inférence, son .index correspondant facultatif ou un ZIP pris en charge. Certaines versions exposent un bouton Importer les fichiers de modèle. Vérifiez le journal d'importation avant de passer à l'inférence et d'actualiser la liste des modèles. |
| `Download models from Hugging Face, Google Drive or MEGA` | Collez un lien de modèle public, cliquez sur Télécharger et installer le modèle et attendez le journal de téléchargement. Des liens de modèle et d'index distincts peuvent être importés dans des opérations distinctes. |
| `Download embedders` | Choisissez l'encodeur exact requis par un modèle, puis cliquez sur Télécharger l'intégrateur sélectionné. Lisez l’état de téléchargement d’Embedder avant d’essayer de le sélectionner dans Inférence. |
| `Download pretrained models` | Fournir un référentiel, un ZIP compatible ou un lien générateur. Entrez le lien discriminateur correspondant lorsque la découverte automatique ne peut pas le trouver. Cliquez sur Télécharger la paire pré-entraînée et inspectez le journal. |
| `Recommended pretraineds` | Choisissez une variante nommée et une fréquence d'échantillonnage, puis cliquez sur Télécharger le pré-entraînement sélectionné (G + D). Vérifiez les exigences en matière d'architecture, de vocodeur, de pitch et d'encodeur avant de les sélectionner dans la formation. |

## Inspecter, fusionner et partager des voix

**Informations sur le modèle** vous permet de sélectionner une voix, **Actualiser la liste des modèles** et **Lire les informations sur le modèle**. Lisez le journal d'inspection pour confirmer quel fichier a été inspecté. Développez **Métadonnées et architecture enregistrées** pour les propriétés enregistrées et **Tenseurs stockés** pour les détails de poids. Les métadonnées manquantes doivent être traitées comme inconnues.

**Fusionner les modèles** mélange les poids d'inférence compatibles. Choisissez **Modèle A** et **Modèle B**, puis cliquez sur **Vérifier la compatibilité du modèle** avant d'enregistrer. **La contribution du modèle A (%)** contrôle l'équilibre du poids, donc 70 donne à A une contribution de 70 % dans le mélange, le reste provenant de B. **Le taux d'échantillonnage** doit correspondre aux modèles ; utilisez Auto si disponible. **Précision de sortie** définit la manière dont les poids générés sont stockés. Entrez un nouveau nom et des notes facultatives, cliquez sur **Fusionner et enregistrer le modèle** et lisez le journal de fusion. Testez la voix fusionnée avant de décider de la conserver. Commencez avec la récupération désactivée.

**Le modèle d'exportation ZIP** regroupe la voix d'inférence choisie et un index de correspondance facultatif. Utilisez **Actualiser la liste des modèles** si la voix est manquante, sélectionnez **Modèle vocal** et éventuellement **Index**, puis cliquez sur **Créer un modèle ZIP**. Lisez le journal d'exportation et téléchargez le fichier affiché par **Télécharger le modèle ZIP**. Ouvrez le ZIP localement et vérifiez les deux noms de fichiers. Conservez l’ensemble de l’expérience de formation séparément si vous avez besoin de points de contrôle pouvant être repris.

## Outils audio et matériels

- **Audio Analyzer** compare les enregistrements à l'aide d'affichages de forme d'onde, de spectrogramme, de hauteur et de niveau. Sélectionnez la même région en entrée et en sortie et écoutez-la. Faites correspondre la fenêtre FFT, le canal et le seuil de silence dans les comparaisons. Utilisez les contrôles d'exportation disponibles pour enregistrer des données d'analyse ou des graphiques. Voir [Audio Analyzer](audio-analyzer.md).
- **PC Training Advisor** utilise **Taux d'échantillonnage pour planifier**, **Précision pour évaluer** et **GPU pour évaluer**. Cliquez sur **Analyser le PC et suggérer des paramètres** et consultez le journal PC Advisor. Considérez les suggestions comme un point de départ et vérifiez l'utilisation de la mémoire pendant une courte période.

## Mises à jour et redémarrage

Dans **Mettre à jour Ilaria RVC**, comparez la **Version installée** avec la version affichée après **Vérifier les mises à jour**. Lisez le **journal des modifications de version** et développez **Toutes les modifications jusqu'à présent** pour les notes plus anciennes. Lorsque **Télécharger et redémarrer** est proposé, terminez ou enregistrez le travail actif avant de l'utiliser. Suivez **Mise à jour du journal** jusqu'à la réouverture de l'application. **Redémarrer Ilaria RVC** redémarre l'installation en cours et **Reload status** signale cette opération. Sur Kaggle, utilisez le workflow [enregistrer, arrêter et redémarrer](../cloud/kaggle.md) du notebook.
