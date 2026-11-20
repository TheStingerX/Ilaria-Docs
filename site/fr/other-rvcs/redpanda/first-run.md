# Configurer Redpanda-vc

[GitHub](https://github.com/redpanda343/Redpanda-vc)

Redpanda-vc étend Applio et propose plusieurs familles de modèles vocaux. Cette procédure pas à pas utilise la famille **RVC** partout. Choisissez une installation et séparez ses dépendances des autres programmes RVC.

## 1. Choisissez un chemin de lancement

1. Téléchargez la source ou un package compatible depuis le [Projet Redpanda-vc](https://github.com/redpanda343/Redpanda-vc). Pour une configuration source, extrayez-la dans un dossier local accessible en écriture et vérifiez que le fichier de dépendances et le lanceur du projet sont présents. Installez les dépendances requises par votre paiement dans un environnement Python dédié. Les installations CUDA nécessitent une version PyTorch prenant en charge le GPU NVIDIA et le pilote utilisés.
2. Sous Windows, commencez par `run-install.bat` et laissez-le terminer la préparation de l'environnement de projet fourni. Utilisez ensuite `run-applio.bat` pour la WebUI du navigateur ou `run-realtime-gui.bat` pour la fenêtre autonome en temps réel. Les deux lanceurs attendent l'environnement créé dans le dossier du projet. Ouvrez un terminal dans le dossier du projet lorsque vous devez lire les journaux de démarrage. Gardez-le en marche pendant son utilisation.
3. Attendez l'interface utilisateur ou ouvrez l'adresse de bouclage imprimée par le processus. Si le lanceur se termine sans ouvrir de page, vérifiez la sortie du terminal pour une erreur d'importation, un échec d'initialisation CUDA ou un conflit de port. Réparez le problème nommé dans cette installation avant de la rouvrir.
4. Confirmez le bon périphérique d'exécution. Testez une tâche à la fois avec l'interface locale avant d'ajouter des flux de navigateur ou d'autres tâches gourmandes en GPU.

## 2. Choisissez le moteur et le modèle

Dans la vue de conversion appropriée, sélectionnez le workflow **RVC**, choisissez un point de contrôle d'inférence compatible et associez-le à l'index correspondant uniquement lorsque vous l'avez. L'application expose également Beatrice et Rectified Flow dans les vues prises en charge. Chacun utilise son propre format de modèle. Un modèle appartenant à une autre famille a besoin de son propre moteur.

Si votre build expose une conversion hors ligne, commencez avec un WAV sec et court et une transposition nulle. Enregistrez une nouvelle sortie et vérifiez les mêmes mots dans les deux fichiers. Si vous avez principalement besoin d'une conversion de microphone, passez directement au [test en temps réel](live-audio.md) avec un modèle compatible connu.

## 3. Diagnostiquez le démarrage avant de modifier les paramètres audio

- **Erreur d'importation** : confirmez que l'interpréteur exécutant le lanceur est celui de votre environnement de projet et qu'il possède les dépendances de la build.
- **Modèle manquant** : revérifiez le dossier attendu par votre build, le moteur actuel et si le fichier est une exportation d'inférence.
- **Erreur CUDA** : confirmez le périphérique RVC choisi et testez avec d'autres jobs GPU fermés. Enregistrez la première erreur au lieu d'interpréter le message d'arrêt final.
- **Compatibilité peu claire** : notez la version de paiement ou du package, le GPU et la famille de modèles prévue. Testez une base de référence avant d’essayer des vocodeurs ou des fonctionnalités personnalisés.
