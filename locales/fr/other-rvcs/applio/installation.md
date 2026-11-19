---
label: "Installez Applio"
icon: ":cd:"
order: 97
permalink: /ilaria-rvc/applio/installation/
---
# Installez Applio et vérifiez le moteur

[GitHub](https://github.com/IAHispano/Applio) · [Hugging Face](https://huggingface.co/IAHispano/Applio)

Applio a deux interfaces. **Desktop** ouvre une fenêtre d'application installée et gère un environnement de moteur lors du premier lancement. **Gradio** ouvre une page Web locale et a besoin de son processus de lancement pour continuer à fonctionner. Ces étapes couvrent Desktop et le package Windows Gradio compilé. Choisissez l'interface affichée dans les instructions que vous souhaitez suivre.

## Bureau

1. Ouvrez les [téléchargements officiels du bureau](https://github.com/IAHispano/Applio-App/releases/latest). Recherchez **Assets** et développez la liste si le programme d'installation dont vous avez besoin est masqué. Choisissez l'actif pour votre système d'exploitation. Les archives du code source sont destinées aux développeurs.
2. Sous Windows, exécutez l'exécutable d'installation et choisissez un dossier dans lequel votre compte peut écrire. L'application packagée utilise un répertoire `data` à côté de son exécutable. Sur macOS, utilisez l'image disque de votre processeur, ARM64 pour Apple Silicon ou x64 pour Intel. Sous Linux, installez le package Debian disponible ou rendez l'AppImage exécutable et ouvrez-le.
3. Démarrez l'application et consultez les conditions de première exécution. Gardez l'application ouverte pendant qu'elle configure Python, installe la configuration requise du moteur, récupère les ressources et vérifie l'installation. Utilisez **Installer/Réparer** si votre build le propose en cas d'échec d'une vérification.
4. Une fois la vérification terminée, vérifiez le périphérique de calcul détecté dans la configuration. Enregistrez le backend et le matériel des rapports de l'application. Une machine dotée de plusieurs GPU peut signaler un périphérique différent de celui attendu.
5. Ouvrez **Modèles**. S'il s'ouvre et que le moteur est prêt, continuez à [installer une voix](models.md). Exécutez la [courte conversion](inference.md) avant d'essayer le mode direct ou l'entraînement.

Vous pouvez installer un package Desktop officiel sans Node.js ou pnpm. Ces outils permettent de créer l'application à partir des sources.

## Gradio sur Windows

1. Téléchargez un package Windows à partir des [téléchargements Gradio compilés](https://huggingface.co/IAHispano/Applio/tree/main/Compiled/Windows).
2. Extrayez le ZIP complet vers un chemin simple que vous possédez, par exemple `C:\Applio-Gradio`. Ouvrez ce dossier dans l'Explorateur. Si vous voyez un deuxième dossier contenant le lanceur, ouvrez-le.
3. Exécutez `run-applio.bat` à partir du dossier extrait. Si une console s'ouvre, laissez-la fonctionner. Attendez qu'il imprime une adresse locale et ouvrez cette adresse exacte dans votre navigateur.
4. Recherchez des **Modèles** ou des **Téléchargements**, selon la version. Ensuite, ouvrez **Convert Audio** ou **Inference**. Si le navigateur perd sa connexion, vérifiez si le lanceur est toujours en cours d'exécution avant de rouvrir la page.

## Si l'installation s'arrête

| Ce que vous voyez | Première chose à vérifier |
| --- | --- |
| Rien ne s'ouvre à partir du ZIP | Extrayez chaque fichier avant d'exécuter le lanceur. |
| L'étape de téléchargement ou de vérification échoue. | Lisez la première erreur dans le journal d'installation. Vérifiez la connectivité, l'espace disque disponible et l'accès en écriture avant de réessayer l'étape qui a échoué. |
| Gradio s'arrête avant d'afficher une adresse | Lisez la console au-dessus de la dernière ligne pour la première erreur pertinente. Le navigateur ne peut pas se connecter tant que le service n'a pas démarré. |
| Les fichiers audio ne parviennent pas à s'ouvrir ou à s'exporter | Vérifiez la vérification du moteur et l'état de FFmpeg. Testez avec un WAV local que vous pourrez jouer dans une autre application. |
| La conversion de fichiers démarre mais manque de mémoire | Fermez les tâches concurrentes et testez quelques secondes d’audio sans effets. Essayez un appareil pris en charge par votre build. |

Avant d'installer une nouvelle version ou de déplacer des dossiers, enregistrez votre audio de travail et sauvegardez les modèles personnalisés, les index, les ensembles de données et les expériences de formation complètes. Après la mise à jour, utilisez le même court enregistrement et la même voix pour confirmer que le nouveau moteur produit un résultat utilisable.
