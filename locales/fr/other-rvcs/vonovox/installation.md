---
label: "Installez Vonovox"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/vonovox/installation/
description: "Vonovox est un convertisseur vocal Windows en direct pour les GPU NVIDIA pris en charge."
---
# Installez Vonovox

[GitHub](https://github.com/dr87/Vonovox) · [Hugging Face](https://huggingface.co/dr87/vonovox)

Vonovox est un convertisseur vocal Windows en direct pour les GPU NVIDIA pris en charge. Utilisez ce guide pour réaliser un test propre du microphone local avant d’ouvrir Discord, OBS ou un jeu.

> **Dernière version bêta disponible dans le référentiel de téléchargement** · [Télécharger Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

## 1. Rassemblez les fichiers et les appareils

- Ouvrez Windows **Gestionnaire des tâches → Performance** et identifiez la carte graphique par son nom. Utilisez la [liste officielle des packages](https://huggingface.co/dr87/vonovox/tree/main) pour résoudre une version ou un correctif spécifique au matériel si nécessaire. Conservez les anciennes versions de travail dans leurs propres dossiers.
- Préparez un point de contrôle RVC V2 prêt pour l'inférence et vérifiez quelle intégration le modèle attend. Un point de contrôle d'entraînement tel que `G_*.pth` sert à reprendre l'entraînement. Pour la première exécution, choisissez un modèle dont la provenance est connue et exécutez-le sans index si la version le propose.
- Branchez un microphone physique et des écouteurs filaires. Fermez les autres programmes susceptibles de prendre le contrôle exclusif des périphériques audio et confirmez que Windows peut enregistrer votre micro brut.

## 2. Démarrez l'application

1. Téléchargez le ZIP, puis utilisez **Extract All** et placez l'intégralité du package dans un dossier local accessible en écriture tel que `C:\VoiceTools\Vonovox`. Exécutez les lanceurs à partir du dossier extrait, avec leurs fichiers de support à côté d'eux.
2. Le paquet est précompilé. Ouvrez le dossier extrait et exécutez `start.bat`. Vous pouvez ignorer `setup.bat`.
3. Attendez l'interface. Si la fenêtre se ferme immédiatement, exécutez le même lanceur à partir d'une invite de commande ouverte afin que la dernière erreur reste visible. Vérifiez que vous avez extrait l'intégralité de l'archive et que vous avez sélectionné une version de GPU compatible.
4. Sélectionnez le modèle RVC V2 dans la zone modèle. Choisissez l’intégrateur attendu lorsque l’interface utilisateur l’expose. Commencez avec les commandes de hauteur et de formants neutres, la taille des blocs par défaut et les effets optionnels désactivés.

## 3. Vérifiez le premier signal

Choisissez votre microphone physique comme **Périphérique d'entrée** et un moniteur de casque approprié ou l'extrémité de lecture de votre câble virtuel comme **Périphérique de sortie**. Si l'interface utilisateur expose le backend audio, commencez par WASAPI et le mode partagé. Appuyez sur **Démarrer**, attendez un instant et prononcez une phrase suivie d'une pause. Vous devriez entendre la voix convertie, suivie du silence. Appuyez sur **Stop** avant de changer de périphérique audio ou de commencer le test suivant.

Si le modèle ne parvient pas à se charger, vérifiez RVC V2 et l'intégrateur avant de modifier les paramètres audio. Si aucune voix n'est entendue, vérifiez le micro et les périphériques de sortie séparément. Continuez avec [routage et réglage du microphone](live-audio.md) une fois le modèle démarré.

## Liste de contrôle de première exécution

### Vérifiez le GPU avant de télécharger

1. Sous Windows, appuyez sur **Ctrl + Shift + Esc** et ouvrez **Performances**. Sélectionnez chaque entrée GPU et lisez son nom. Sur un ordinateur portable, vous pouvez voir à la fois des graphiques intégrés et un GPU NVIDIA dédié.
2. Faites correspondre le GPU dédié au package disponible auprès du développeur. Utilisez le lien Beta 3 ci-dessus pour cette version. Si la liste des packages inclut une version ou un correctif spécifique au matériel, vérifiez qu'il s'applique à votre archive avant de l'installer.
3. Gardez de la place pour le ZIP et le dossier extrait. Utilisez un dossier local dans lequel vous pouvez écrire. Évitez de lancer directement depuis le ZIP ou de copier un lanceur hors de son dossier.
4. Connectez votre microphone et vos écouteurs. Ouvrez **Paramètres → Système → Son → Entrée** et parlez. Si Windows ne détecte pas de signal ici, corrigez l'autorisation d'entrée ou du microphone avant d'ouvrir Vonovox.

### Vérifiez que la configuration est bien terminée

1. Le paquet est précompilé. Ouvrez le dossier extrait et exécutez `start.bat`. Vous pouvez ignorer `setup.bat`.
2. Si la fenêtre se ferme aussitôt, ouvrez l’invite de commandes dans ce dossier, exécutez `start.bat` et lisez la première erreur.
3. Si le programme d'installation signale un runtime Microsoft manquant, installez ou réparez le runtime Visual C++ lié et réessayez. S'il signale que CUDA ne peut pas s'initialiser, vérifiez le pilote NVIDIA et construisez la compatibilité. Conservez le paquet complet ensemble.
4. Si vous mettez à jour une installation fonctionnelle, extrayez-la dans un nouveau dossier et conservez la version précédente disponible. Testez la nouvelle version avant de remplacer une configuration fonctionnelle connue.

### Chargez une voix et vérifiez-la avant d'ouvrir un appel

1. Décompressez les archives vocales si nécessaire. Trouvez l'inférence `.pth`. Les fichiers nommés comme `G_*.pth` ou `D_*.pth` sont généralement des points de contrôle de formation.
2. Choisissez la voix RVC V2 et utilisez l'embedder spécifié par son éditeur. Gardez le pitch neutre, les effets désactivés et le tampon par défaut pour le premier test.
3. Sélectionnez le micro physique. Envoyez la sortie au casque pour un test direct si pris en charge, ou utilisez le câble virtuel et la surveillance Windows décrits dans [Router et régler Vonovox](live-audio.md).
4. Démarrez le convertisseur et prononcez une courte phrase, puis faites une pause. La sortie doit avoir votre timing et vos mots avec le timbre de la voix sélectionnée. Si vous entendez votre micro ordinaire ou le silence, suivez les vérifications de routage avant de modifier la hauteur ou les effets.

| Symptôme | Vérifiez d'abord |
| --- | --- |
| Aucune erreur GPU ou CUDA | Vérifiez que le package prend en charge votre GPU NVIDIA dédié et que Windows le voit. |
| Une voix ne parvient pas à se charger | Vérifiez la version RVC et l'encodeur. Testez une exportation d’inférence compatible avant de modifier les paramètres audio. |
| Aucun signal de microphone | Testez le micro physique dans Windows, puis resélectionnez le même appareil dans Vonovox. |
| Bon son local mais silence lors d'un appel | Parcourez les extrémités du câble et la sélection du micro de destination dans le guide de routage. |
| L'audio se coupe uniquement pendant une partie | Testez avec le jeu ouvert et augmentez la taille du bloc d'un cran si nécessaire. |

[Matrice interactive de compatibilité RVC](../../reference/compatibility-matrix.md)
