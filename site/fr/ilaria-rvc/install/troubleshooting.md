# Journaux et récupération

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

> **RMVPE · 2.4.2** · Corrige l’inférence RMVPE quand cuDNN refuse une opération GRU. RMVPE utilise une entrée contiguë et réessaie cette GRU sur le CPU en cas de `CUDNN_STATUS_NOT_SUPPORTED`. Nécessite la version 2.4.0 ou ultérieure. Installez la 2.4.2 via **Other → Update Ilaria RVC**.

## L'application se ferme ou le navigateur reste vide

1. Exécutez `RUN_ILARIA_RVC_LOGS.bat` à partir du dossier entièrement extrait. Laissez la console ouverte et lisez la première erreur, y compris le fichier ou le périphérique qu'elle nomme.
2. Si la console indique que le serveur local est en cours d'exécution, ouvrez l'adresse qui y est imprimée. La valeur par défaut est `http://127.0.0.1:6969`. Si le port est occupé, recherchez une instance existante avant d'en lancer une deuxième. Enregistrez tout travail actif avant de le fermer.
3. Vérifiez le modèle de GPU exact dans **Gestionnaire des tâches → Performances** et comparez-le avec [GPU compatibles](gpu-compatibility.md). Le package Windows inclut CUDA 12.8. Sur un PC équipé uniquement de GPU Maxwell, Pascal ou Volta NVIDIA, cochez `cu126-runtime-install.log` pour la progression pendant que le lanceur prépare le runtime CUDA 12.6. Un téléchargement échoué nécessite de vérifier l’accès à Internet et l’espace disque libre.
4. Si un fichier est manquant après l'extraction, vérifiez que l'intégralité de l'archive a été extraite et que le raccourci pointe vers cette installation. Sauvegardez vos modèles, ensembles de données et dossiers d'expériences avant de remplacer les fichiers d'installation.

## Le modèle est manquant ou l'audio sonne mal

| Symptôme | Première vérification |
| --- | --- |
| Une voix est manquante dans **Voice Model** | Vérifiez le journal d'importation, puis cliquez sur **Actualiser**. Sélectionnez une exportation d'inférence `.pth`. Un point de contrôle de formation G ou D appartient à l’expérience. |
| Un fichier ne parvient pas à être décodé | Lisez-le en dehors de l'application. Exportez un court PCM WAV vers un dossier local accessible en écriture et testez cette copie. |
| La conversion échoue uniquement avec l'index | Définissez **Index Ratio** sur zéro et essayez sans index. Si cela fonctionne, vérifiez que le `.index` facultatif correspond au modèle et à son intégrateur. |
| La voix ressemble toujours à la source | Confirmez le modèle sélectionné et son intégration attendue. Les encodeurs HuBERT génériques peuvent conserver le timbre source. Testez la même phrase avec la récupération désactivée avant de comparer les paramètres. |
| Les souffles ou consonnes sont métalliques | Testez plusieurs clips propres avec effets désactivés. Si le même modèle continue de déformer ces sons, inspectez les exemples de respiration et de consonnes dans les données d'entraînement, corrigez-les et recyclez-vous. |
| Un fichier long échoue mais un fichier court fonctionne | Vérifiez la VRAM et essayez **Split Audio** ou des segments plus courts. Écoutez chaque jointure avant d'exporter. |

Commencez avec **Pitch 0**, un court WAV sec et un modèle connu. Modifiez un paramètre par test. Voir [Contrôles d'inférence](../convert/inference-buttons.md) pour les effets et les options d'exportation.

## L'entraînement s'arrête ou ne peut pas reprendre

1. Vérifiez quelle étape a échoué. Dans **Process Data**, vérifiez que le chemin de l'ensemble de données pointe vers des enregistrements lisibles et que le lecteur de sortie dispose d'espace. Dans **Feature Extraction**, vérifiez que le prétraitement est terminé et que les ressources de pitch et d'intégration choisies sont disponibles.
2. Si **Train Pth** manque de VRAM, déchargez le modèle d'inférence, fermez les tâches GPU concurrentes, réduisez la **Taille du lot** et désactivez la mise en cache de l'ensemble de données GPU si elle est activée. Consultez le **Journal d'entraînement** pour connaître les paramètres effectifs avant de réessayer.
3. Si **Train Index** échoue, vérifiez que les fonctionnalités extraites appartiennent à l'expérience sélectionnée. Un index est facultatif pour la conversion. Vous pouvez tester une exportation d'inférence fonctionnelle avec **Index Ratio 0** lors du diagnostic de l'index.
4. Pour interrompre l'entraînement, cliquez sur **Arrêter et enregistrer** et attendez la confirmation. Pour reprendre, utilisez le même nom d'expérience et les mêmes paramètres compatibles. Gardez les points de contrôle G/D et l’état de l’expérience ensemble. Une exportation d'inférence à elle seule ne peut pas reprendre la formation.
5. Si vous avez modifié la fréquence d'échantillonnage, le vocodeur ou l'embedder, créez une expérience distincte et préparez les fonctionnalités pour cette configuration. Gardez l'exécution originale disponible à des fins de comparaison.

## Récupérer une session Kaggle

Si le lien du navigateur cesse de fonctionner, vérifiez si la session Kaggle est toujours en cours d'exécution. Après avoir rouvert les services, utilisez les nouveaux liens et les informations d'identification actuelles affichées pour chaque service. WebUI et FileBrowser ont des connexions distinctes. Exportez et téléchargez vos résultats avant de réinitialiser la session. Suivez le [Kaggle guide](../cloud/kaggle.md) pour les étapes de sauvegarde.

## Collecter des détails pour un rapport

Copiez la version de l'application, le GPU exact et la première erreur. Incluez le bouton sur lequel vous avez appuyé et une courte séquence qui reproduit le problème. Pour la formation, indiquez l'étape ayant échoué, la fréquence d'échantillonnage, l'intégration et si vous avez repris une exécution. Pour la conversion, indiquez si le même clip a fonctionné avec un autre modèle ou avec la récupération désactivée. Si disponible, utilisez **Tableau de bord de formation → Rapport de diagnostic**. Consultez le rapport avant de le partager et supprimez les chemins privés, les mots de passe et les liens de session.
