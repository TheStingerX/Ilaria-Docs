---
label: "Installer et convertir avec RVC GUI"
icon: ":control_knobs:"
order: 99
permalink: /ilaria-rvc/rvc-gui/file-conversion/
---
# Installer et convertir avec RVC GUI

[GitHub](https://github.com/Tiger14n/RVC-GUI)

Ce guide couvre l'application de bureau archivée de Tiger14n pour convertir des fichiers audio. Préparez un point de contrôle vocal et un enregistrement WAV court et sec avant de commencer.

## 1. Ouvrez l'application Windows

1. Ouvrez le [package Windows](https://github.com/Tiger14n/RVC-GUI/releases/tag/Windows-pkg) du projet. Téléchargez l'actif packagé à partir de la version et extrayez le contenu dans un dossier accessible en écriture. Conservez les ressources d'exécution et de modèle dans la mise en page extraite.
2. Ouvrez le lanceur inclus. Une extraction de source peut être lancée avec `RVC-GUI.bat` sous Windows ou `python rvcgui.py` une fois le runtime configuré. La source archivée attend un environnement Python et PyTorch compatible plus `hubert_base.pt` à la racine de son projet. Utilisez un environnement distinct si vous testez la source afin que les autres installations RVC conservent leurs dépendances.
3. Si l'application packagée se ferme immédiatement, exécutez son lanceur à partir d'un terminal ouvert et lisez la première erreur. Une archive contenant uniquement des fichiers sources ne disposera pas du runtime packagé. Si l'erreur nomme HuBERT dans une installation source, placez les [poids HuBERT](https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/hubert_base.pt) du projet à la racine du projet.

> Les checkpoints HuBERT génériques sont déconseillés comme encodeur par défaut pour la conversion vocale. Entraînés pour représenter la parole, ils peuvent conserver des informations sur le timbre de la voix source dans le résultat. Utilisez l’encodeur attendu par le modèle RVC, par exemple ContentVec si le modèle a été entraîné avec lui.

## 2. Ajoutez une voix

Cliquez sur **Importer le modèle depuis .zip** et sélectionnez un ZIP contenant une inférence `.pth` et sa correspondance `.index` si fournie. Pour un placement manuel, placez les fichiers dans un sous-dossier par voix sous le répertoire `models` de l'application. Par exemple :

```text
models/
  MyVoice/
    MyVoice.pth
    MyVoice.index
```

Sélectionnez la voix importée dans l'interface graphique. S'il est absent, rouvrez la liste des modèles ou redémarrez l'application après avoir vérifié le dossier. Utilisez un modèle d'inférence compatible avec la version archivée. Un modèle créé avec un encodeur ou une architecture que la build ne peut pas charger doit être testé dans une application compatible.

## 3. Convertir un clip de base

1. Dans **Fichier audio d'entrée**, cliquez sur **Parcourir** et sélectionnez un enregistrement vocal court et sec avec une voyelle et une consonne clairement exprimées. Utilisez un fichier WAV complet comme référence ; séparez d'abord une racine vocale si la source est une chanson complète.
2. Sélectionnez la voix dans les commandes du modèle. Si votre modèle dispose de plusieurs emplacements pour haut-parleurs pris en charge, choisissez l'emplacement documenté ; sinon, utilisez la valeur par défaut.
3. Laissez **Pitch** à zéro et définissez le **Feature retrieval rate** sur zéro pour la ligne de base. Laissez la **méthode F0** par défaut pour ce test.
4. Cliquez une fois sur **Convertir** et attendez que le **Chemin de sortie** affiche le fichier généré. Cliquez sur **Ouvrir** pour le lire et comparer-le avec l'original à un volume similaire. Copiez le fichier généré sous un nom distinct si vous souhaitez le conserver à des fins de comparaison. Comparez la même phrase avant de faire un autre ajustement.
5. Si vous voulez un caractère cible plus fort et avoir l'index correspondant, essayez un petit mélange de récupération. Si les mots deviennent moins clairs, revenez à la ligne de base.

## Problèmes courants

| Que se passe-t-il | Que vérifier |
| --- | --- |
| Importer les rapports de poids manquants | Ouvrez l'archive et confirmez qu'elle contient une inférence `.pth` plutôt qu'un simple audio, une documentation ou un point de contrôle de formation. |
| Aucun modèle n'apparaît | Vérifiez la disposition du dossier extrait et assurez-vous que vous avez ouvert l'application à partir de la même installation. |
| Mauvaise sortie vocale ou métallique | Vérifiez le point de contrôle sélectionné, l'encodeur compatible, l'index optionnel et l'enregistrement source. Utilisez un clip non traité avec la récupération désactivée. |
| La conversion des fichiers semble s'arrêter | Testez un court WAV local et inspectez la console. Vérifiez la première erreur avant de réessayer un long rendu. |
| Les performances sont médiocres | Vérifiez quel appareil la version PyTorch installée utilise. Pour les anciennes plates-formes ou les fonctionnalités des modèles plus récents, consultez la [Comparaison des outils RVC](../../reference/tools.md). |
