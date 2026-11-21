---
label: "Datasets, Checker et Audio Analyzer"
icon: ":level_slider:"
order: 95
permalink: /ilaria-rvc/datasets/
description: "Votre dataset est le facteur le plus déterminant pour le naturel, la propreté et l'expressivité de votre modèle RVC."
---
# Datasets, Dataset Checker et Audio Analyzer

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Votre dataset est le facteur le plus déterminant pour le naturel, la propreté et l'expressivité de votre modèle RVC. Même les meilleurs réglages d'entraînement ne peuvent pas rattraper des enregistrements bruités, réverbérants ou saturés.

!!!tip
**Règle d'or : la qualité l'emporte toujours sur la quantité.**
10 minutes d'audio sec, propre et varié d'une seule voix donneront un modèle bien meilleur que 60 minutes de clips avec écho, bruit ou répétitions.
!!!

## 1. Ce qui fait un excellent dataset RVC

### Durée et variété vocale
- **Durée minimale utile :** Environ **5 à 10 minutes** de parole ou de chant pur (hors silences) suffisent déjà pour obtenir une voix fonctionnelle si l'audio est très propre.
- **Objectif recommandé :** **15 à 30+ minutes** d'audio propre et varié offrent assez de richesse phonétique pour gérer naturellement différents mots, hauteurs et émotions.
- **La variété compte :** Incluez voix calme, voix énergique, hauteurs variées, passages doux et forts, et consonnes nettes (`s`, `f`, `t`, `k`). Si vous n'entraînez que sur une voix monotone, le modèle peinera en chant ou en discours expressif.

### Propreté audio et format
- **Un seul locuteur :** Ne laissez jamais de voix superposées, bruits de foule ou chœurs en arrière-plan.
- **Pièce sèche (réverbération minimale) :** RVC apprend l'écho de la pièce comme faisant partie du timbre. Les prises studio proches du micro sont idéales.
- **Format sans perte :** Préférez le **`.wav` PCM** (ou `.flac`) aux `.mp3` très compressés pour ne pas incruster d'artefacts de compression dans le modèle.
- **Aucune musique ni bruitage :** Retirez toute musique de fond, audio de jeu et SFX avant le prétraitement.

## 2. Préparer et nettoyer votre audio

1. **Séparez la voix de la musique/SFX :** Si la source vient de chansons, vidéos ou jeux, isolez d'abord la voix sèche avec [UVR5](../../non-rvc/uvr5/overview.md) ou [MVSep](../../non-rvc/mvsep/overview.md).
2. **Prudence avec le débruitage ou dereverb intensif :** N'appliquez ces filtres que si nécessaire. Un traitement trop fort coupe les aigus et crée des artefacts liquides ou métalliques. Comparez toujours l'original et le clip traité.
3. **Coupez les longs silences et bruits parasites :** Supprimez les longues pauses vides, chocs sur le micro, toux, clics et saturations extrêmes. Gardez de courtes pauses naturelles entre les mots.
4. **Gardez des durées raisonnables :** Découpez les longs enregistrements en segments propres (environ **3 à 15 secondes**), ou laissez le découpage automatique d'Ilaria RVC s'en charger au prétraitement.
5. **Utilisez des chemins simples :** Placez votre dataset dans un dossier court sans espaces, accents ni symboles spéciaux (ex. `C:\RVC\datasets\ma_voix\`).

## 3. Utiliser le Dataset Checker d'Ilaria RVC

Avant de lancer l'entraînement sur GPU, utilisez le **Dataset Checker** intégré d'Ilaria RVC pour repérer les défauts cachés :

- **Détection de clipping :** Repère les zones où les crêtes atteignent `0 dBFS` et s'aplatissent, causant distorsion ou crash `NaN loss`.
- **Longs silences :** Signale les clips composés presque uniquement de vide pour les raccourcir ou les retirer.
- **Fichiers illisibles ou cassés :** Détecte les en-têtes corrompus, fichiers de 0 octet ou clips de moins d'1 seconde qui feraient planter le prétraitement (`zero-size array`).
- **Niveaux actifs incohérents :** Met en avant les clips beaucoup plus faibles ou plus forts que le reste du dataset.

**Méthode conseillée :**
1. Indiquez le dossier du dataset dans **Dataset Checker** et lancez l'analyse.
2. Écoutez chaque fichier signalé avant de le supprimer ou de le modifier.
3. Gardez les passages calmes naturels et pauses voulues, et ne retirez ou nettoyez que les fichiers vraiment cassés, saturés ou bruités.

## 4. Utiliser l'Audio Analyzer d'Ilaria RVC

Servez-vous de l'**Audio Analyzer** pour comprendre *pourquoi* une prise ou une conversion sonne mal :

- **Crêtes de forme d'onde :** Des sommets aplatis indiquent un clipping numérique. Baissez le gain ou remplacez la prise saturée.
- **Spectrogramme :** Regardez les silences entre les mots. Une ligne horizontale fixe à 50/60 Hz révèle un ronflement électrique ; des traînées diffuses indiquent un reste de musique ou de réverbération.
- **Pitch et niveaux actifs :** Vérifiez si la hauteur saute anormalement ou si le niveau chute trop bas.
- **Comparaison Avant / Après :** Chargez exactement le même passage de l'entrée originale et de la sortie convertie pour savoir si le défaut vient du dataset, de la séparation ou de l'inférence.

## 5. Erreurs courantes à éviter

| Erreur | Effet sur le modèle entraîné | Comment corriger |
| --- | --- | --- |
| **Laisser réverbération/écho** | La voix sonne toujours comme dans une salle de bain ou une grotte. | Utilisez des prises plus sèches ou nettoyez prudemment avec UVR5/MVSep DeReverb. |
| **Restes de musique de fond** | Gazouillis musicaux ou artefacts métalliques aléatoires à la conversion. | Re-séparez la voix avec `BS-Roformer` / `BS Polarformer` et supprimez les clips sales. |
| **Plusieurs voix dans un dataset** | Le timbre change brutalement au milieu des phrases. | Gardez strictement un seul locuteur par dossier de dataset. |
| **Dataset minuscule et répétitif (< 2 min)** | Le modèle mémorise le bruit ("overfitting") et échoue sur de nouveaux mots. | Ajoutez des phrases variées et arrêtez l'entraînement plus tôt (moins d'époques). |
| **Prises saturées / clippées** | Grésillements durs, voix robotique ou erreur `NaN loss`. | Supprimez les prises saturées et normalisez l'audio propre sous `0 dBFS`. |

Lisez également [Préparer un dataset vocal](../../model-training/dataset-preparation.md) pour d'autres conseils généraux d'enregistrement et d'évaluation.
