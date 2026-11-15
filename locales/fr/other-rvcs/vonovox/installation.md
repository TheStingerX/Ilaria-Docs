---
label: "💿 Installez Vonovox"
order: 99
permalink: /ilaria-rvc/vonovox/installation/
---
# Installez Vonovox

Vonovox est un convertisseur vocal Windows en direct pour les GPU NVIDIA pris en charge. Utilisez ce guide pour réaliser un test propre du microphone local avant d’ouvrir Discord, OBS ou un jeu.

> **Dernière version bêta disponible dans le référentiel de téléchargement** · [Télécharger Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

## 1. Rassemblez les fichiers et les appareils

- Ouvrez Windows **Gestionnaire des tâches → Performance** et identifiez la carte graphique par son nom. Utilisez la [liste officielle des packages](https://huggingface.co/dr87/vonovox/tree/main) pour résoudre une version ou un correctif spécifique au matériel si nécessaire. Conservez les anciennes versions de travail dans leurs propres dossiers.
- Préparez un point de contrôle RVC V2 prêt pour l'inférence et vérifiez quelle intégration le modèle attend. Un point de contrôle d'entraînement tel que `G_*.pth` sert à reprendre l'entraînement. Pour la première exécution, choisissez un modèle dont la provenance est connue et exécutez-le sans index si la version le propose.
- Branchez un microphone physique et des écouteurs filaires. Fermez les autres programmes susceptibles de prendre le contrôle exclusif des périphériques audio et confirmez que Windows peut enregistrer votre micro brut.

## 2. Démarrez l'application

1. Téléchargez le ZIP, puis utilisez **Extract All** et placez l'intégralité du package dans un dossier local accessible en écriture tel que `C:\VoiceTools\Vonovox`. Exécutez les lanceurs à partir du dossier extrait, avec leurs fichiers de support à côté d'eux.
2. Dans la distribution documentée par le développeur, installez le [runtime Microsoft Visual C++ x64](https://aka.ms/vs/16/release/vc_redist.x64.exe), exécutez `setup.bat`, puis exécutez `start.bat`. Utilisez le lanceur fourni pour l'archive exacte que vous avez extraite. Le premier lancement peut prendre plus de temps pendant l'initialisation des dépendances.
3. Attendez l'interface. Si la fenêtre se ferme immédiatement, exécutez le même lanceur à partir d'une invite de commande ouverte afin que la dernière erreur reste visible. Vérifiez que vous avez extrait l'intégralité de l'archive et que vous avez sélectionné une version de GPU compatible.
4. Sélectionnez le modèle RVC V2 dans la zone modèle. Choisissez l’intégrateur attendu lorsque l’interface utilisateur l’expose. Commencez avec les commandes de hauteur et de formants neutres, la taille des blocs par défaut et les effets optionnels désactivés.

## 3. Vérifiez le premier signal

Choisissez votre microphone physique comme **Périphérique d'entrée** et un moniteur de casque approprié ou l'extrémité de lecture de votre câble virtuel comme **Périphérique de sortie**. Si l'interface utilisateur expose le backend audio, commencez par WASAPI et le mode partagé. Appuyez sur **Démarrer**, attendez un instant et prononcez une phrase suivie d'une pause. Vous devriez entendre la voix convertie, suivie du silence. Appuyez sur **Stop** avant de changer de périphérique audio ou de commencer le test suivant.

Si le modèle ne parvient pas à se charger, vérifiez RVC V2 et l'intégrateur avant de modifier les paramètres audio. Si aucune voix n'est entendue, vérifiez le micro et les périphériques de sortie séparément. Continuez avec [routage et réglage du microphone](live-audio.md) une fois le modèle démarré.
