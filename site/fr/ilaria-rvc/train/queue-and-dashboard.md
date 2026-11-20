# File d'attente, tableau de bord et alertes

[Télécharger Ilaria RVC 2.4.0 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

## Mettre plusieurs expériences en file d'attente

Configurez l'expérience dans Training, confirmez son ensemble de données et le nom du modèle, et ajoutez-la à la **File d'attente de formation**. Utilisez des noms distincts pour des configurations distinctes. Passez en revue les entrées enregistrées avant de commencer, puis vérifiez le travail en cours et son étape. La file d'attente persiste d'une session à l'autre. Suspendez ou reprenez ses contrôles et inspectez les tâches ayant échoué avant de réessayer. Corrigez les chemins d'accès aux ensembles de données manquants et les paramètres incompatibles avant de soumettre à nouveau.

## Suivre un travail en cours

Le **Tableau de bord de formation** affiche la durée des époques, les mises à jour cumulatives, les pas par seconde, les graphiques et un message d'état. Pendant qu'un modèle est en formation, le tableau de bord suit les métriques en direct. Lorsque vous êtes inactif, choisissez un nom de modèle existant pour consulter ses métriques enregistrées. Utilisez le journal des travaux pour identifier le premier échec. Les compteurs sont utiles pour le timing et la progression. Jugez le son à partir des [aperçus d'entraînement](training-workflow.md) du même clip retenu.

## TensorBoard et diagnostics

Utilisez les commandes Start et Stop du panneau TensorBoard. Le tableau de bord 2.1.0 attend les événements scalaires utilisables avant de les afficher. Vérifiez l'expérience sélectionnée et l'état du tableau de bord si les graphiques sont vides. Les courbes de perte peuvent aider à repérer une exécution bloquée. Ils ne peuvent pas évaluer le caractère naturel des voix.

Ouvrez **PC Training Advisor** sous Autre, sélectionnez le débit, la précision et le GPU prévu, puis exécutez l'analyse. Essayez les paramètres suggérés sur un petit travail avant une longue expérience. Le **Rapport de diagnostic** inclut les erreurs de système d'exploitation, de GPU, de CUDA, de disque et d'entraînement récentes. Examinez les rapports sur les chemins de fichiers personnels avant de les partager.

## Notifications et arrêts sécurisés

Utilisez les notifications facultatives du bureau et du son pour remarquer l'achèvement ou les erreurs, puis confirmez l'état final dans les journaux. Enregistrez avant de redémarrer ou de fermer le dernier onglet. Avec **Arrêter et enregistrer**, attendez la confirmation et conservez la paire G/D et l'état de l'expérience avant de déplacer ou de redémarrer l'analyse.
