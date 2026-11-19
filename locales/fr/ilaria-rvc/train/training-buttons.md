---
label: "Contrôles d'entraînement expliqués"
icon: ":level_slider:"
order: 82
permalink: /ilaria-rvc/training-buttons/
---

# Chaque contrôle d'entraînement expliqué

[Télécharger Ilaria RVC 2.4.0 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

L'entraînement crée un nouveau modèle vocal à partir des enregistrements. Pour une première expérience, utilisez un nom unique, un petit ensemble de données propre et une paire pré-entraînée compatible. Conservez un enregistrement en dehors de l'ensemble de données afin de pouvoir écouter le modèle sur un clip qu'il n'a jamais vu. Commencez par le [workflow de formation](training-workflow.md) si vous souhaitez que les étapes soient dans l'ordre.

## Conception du nom, de l'audio et du modèle

| Contrôle | Ce qu'il fait et quand l'utiliser |
| --- | --- |
| `Model Name` | Identifie votre expérience et ses fichiers enregistrés. Utilisez un nouveau nom pour un nouvel ensemble de données ou une configuration incompatible. Pour reprendre, utilisez le nom d'origine avec ses paramètres d'origine. Un espace réservé dans la case vide est un exemple. |
| `Path to Dataset` | Dossier que l'application lit pour la formation. Après le téléchargement, vérifiez le chemin mis à jour avant d'appuyer sur Traiter les données. |
| `Drop dataset audio files or a ZIP` | Importe les enregistrements dans la bibliothèque d'ensembles de données de l'application. Attendez la fin du journal d'importation de l'ensemble de données avant de procéder au traitement. |
| `Manage datasets` | Actualiser les jeux de données recharge la liste. L'ensemble de données à supprimer sélectionne un élément importé. Supprimer l'ensemble de données sélectionné supprime cet élément importé. Vérifiez d'abord le nom et conservez une copie séparée de vos originaux. Le journal de suppression de l'ensemble de données rapporte ce qui s'est passé. |
| `Sample Rate` | Choisit le taux d'entraînement du modèle, 32, 40 ou 48 kHz si compatible. Faites correspondre l'architecture et la paire G/D. L'augmentation du taux ne peut pas restaurer les détails absents de vos enregistrements. |
| `Pitch Guidance` | Donne au générateur une piste de pitch estimée pendant l'entraînement. Utilisez la valeur par défaut pour un modèle typique et faites correspondre la paire pré-entraînée. Le désactiver modifie ce que le modèle attend. |
| `CPU Threads` | Contrôle la quantité de parallélisme CPU utilisée par l’étape de préparation ou d’extraction. Réduisez-le si le prétraitement épuise la RAM du système ou rend le PC inutilisable. |
| `Vocoder` | Sélectionne le générateur de forme d'onde. Commencez par HiFi-GAN, sauf si vous avez une raison compatible de choisir RefineGAN. Dans cette version, la formation RefineGAN nécessite RVC V2 à 32 kHz avec guidage de pitch. |
| `Embedder Model` | Choisit les fonctionnalités de contenu utilisées par le formateur. La formation expose ContentVec et Spin-v2. Le modifier nécessite de nouvelles fonctionnalités extraites et une expérience compatible. Utilisez l'encodeur correspondant lors de l'inférence. |
| `Silent training files` | Définit le nombre d'exemples silencieux inclus dans l'expérience. Comparez les mêmes pauses naturelles si vous les modifiez. |
| `Index Algorithm` | Choisissez de conserver tous les vecteurs de caractéristiques ou de les regrouper avant de créer l'index de récupération. Voir [Auto, Faiss et KMeans](training-controls.md). |
| `Speaker ID` | Choisit le numéro de haut-parleur attaché aux données. Laissez la valeur par défaut pour un premier modèle à haut-parleur unique. |
| `Pitch extraction algorithm` | Estime la hauteur des parties voisées. Commencez par RMVPE. Comparez les alternatives sur le même matériau lorsque le suivi du pitch est le véritable problème. |

## Combien de temps s'entraîner et quoi économiser

| Contrôle | Qu'est-ce que ça change |
| --- | --- |
| `Training Precision` | FP32 utilise la pleine précision. FP16 peut économiser de la VRAM sur du matériel compatible. Conservez la précision d'origine lors de la comparaison ou de la reprise d'une analyse. |
| `GPU IDs` et `GPU Information` | Lisez les appareils répertoriés avant de saisir les identifiants. Une liste telle que 0-2 signifie les GPU 0 et 2. Des contrôles de préparation distincts peuvent utiliser une liste de périphériques différente de celle de l'entraînement. |
| `Batch Size` | Nombre d'exemples regroupés pour une mise à jour. Réduisez-le si vous manquez de mémoire GPU. Consultez le journal d'entraînement pour connaître le lot efficace, en particulier sur [Kaggle](../cloud/kaggle.md). |
| `Training Target`, `Total Epochs`, `Total Steps` | Le nombre d'époques passe par l'ensemble de données préparé. Les étapes comptent les mises à jour. L'objectif est le total que vous souhaitez atteindre, y compris toute partie déjà réalisée. |
| `Save frequency` | Contrôle l'intervalle entre les sauvegardes en époques. Choisissez un intervalle qui vous permet de comparer plusieurs instantanés sans remplir le lecteur. |
| `Save last ckpt as final Model` | Sélectionne le comportement de rétention du dernier point de contrôle. Conservez les instantanés antérieurs si vous souhaitez les comparer ou y revenir et disposer d'espace. |
| `Create model at save frequency` | Produit des exportations d'inférence à la cadence de sauvegarde sélectionnée afin que vous puissiez auditionner les modèles intermédiaires. Conservez la paire G/D et l'état de l'expérience séparément si vous souhaitez reprendre. |
| `Cache data to GPU` | Stocke les données préparées dans la VRAM. Laissez-le désactivé pour un premier test si la mémoire est limitée et pour une exécution par étapes si nécessaire. |
| `Pretrained model (G + D)` | Choisit une paire de générateur et de discriminateur compatible. Actualisez la liste pré-entraînée après avoir téléchargé une paire. Le journal pré-entraîné explique la sélection. Choisir Aucun démarre sans poids pré-entraînés. |

## Les quatre boutons numérotés

1. **Process Data** lit l'ensemble de données, prépare les tranches et rééchantillonne selon la configuration d'entraînement sélectionnée. Lisez le journal de pré-traitement avant de continuer.
2. **Feature Extraction** extrait la représentation et, lorsqu'elle est activée, le pitch. Consultez le journal d’extraction de fonctionnalités pour connaître les échecs et les noms d’actifs.
3. **Train Index** construit l'index de récupération facultatif à partir des fonctionnalités extraites compatibles. Le modèle peut être converti sans cela. Conservez l'index avec sa voix correspondante.
4. **Train Pth** démarre la musculation. Regardez le journal d’entraînement. Pour interrompre en toute sécurité, cliquez sur **Arrêter et enregistrer**, attendez que **Arrêter/Reprendre** pour confirmer l'écriture, puis téléchargez ou sauvegardez l'expérience.

## Dataset Checker, aperçus, alertes et file d'attente

- **Dataset Checker** lit les enregistrements sélectionnés. Le seuil de silence définit ce qui est considéré comme silencieux, l'indicateur des silences plus longs que la durée à signaler et l'avertissement de différence de volume définit la différence de niveau à signaler. **Vérifier l'ensemble de données** exécute l'analyse. Choisissez un enregistrement, définissez l'heure de début ou activez Démarrer juste avant le silence le plus long, puis utilisez **Charger un aperçu de 12 secondes** pour entendre l'endroit concerné. Consultez le journal, l'état et l'audio avant de modifier la source.
- **Les aperçus de formation** sont facultatifs. Activez **Générer des aperçus d'entraînement**, choisissez une source d'une durée maximale de 30 secondes, définissez Aperçu toutes les N époques et utilisez Aperçu du pitch et Aperçu de l'extraction du pitch pour corriger les paramètres de comparaison. Sélectionnez une époque d'aperçu enregistré et utilisez **Actualiser les aperçus** pour mettre à jour la liste. Le journal d'aperçu et l'audio d'aperçu de la formation affichent le résultat.
- **Notifications de formation** vous permet de choisir des alertes sur le bureau et des alertes sonores en cas d'achèvement ou d'erreur. **Test d'alertes** vérifie les options sélectionnées. Lisez le journal de test de notification si rien n'apparaît ou ne joue.
- **File d'attente de formation** enregistre les paramètres actuels en tant que tâche. La préparation automatique exécute les données de processus, l'extraction de fonctionnalités et l'index de train pour cette tâche. Utilisez **Démarrer la file d'attente** pour commencer et **Pause après le modèle actuel** pour arrêter après la tâche active. **Actualiser la file d'attente** met à jour l'affichage. Choisissez une tâche avant de **Réessayer la sélection** ou de **Supprimer la tâche sélectionnée**. Lisez le journal des actions de la file d'attente et le journal de la file d'attente avant de réessayer.
