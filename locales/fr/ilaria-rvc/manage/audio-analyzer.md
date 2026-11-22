---
label: "Analyseur Audio"
icon: ":chart_with_upwards_trend:"
order: 85
permalink: /ilaria-rvc/audio-analyzer/
description: "Ouvrez Other → Audio Analyzer dans Ilaria RVC pour comparer jusqu'à huit fichiers audio à l'aide de formes d'onde, spectrogrammes, spectre moyen, estimation de hauteur et tableaux de niveaux."
---
# Analyseur Audio

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Ouvrez **Other → Audio Analyzer**. Ajoutez jusqu'à huit fichiers audio à comparer. Un jeu utile contient l'entrée d'origine, une conversion de référence et une ou deux variantes réalisées en modifiant un seul paramètre.

## Ce que chaque vue mesure

| Vue | Ce qu'elle montre directement | Question à trancher |
| --- | --- | --- |
| **Waveform** | Amplitude dans le temps | Où se trouvent les crêtes fortes, l'écrêtage aplati au sommet, les passages calmes ou les raccords brusques ? |
| **Spectrogram** | Énergie fréquentielle dans le temps | Quelles fréquences sont présentes à l'instant exact où un souffle, un bourdonnement ou un artefact apparaît ? |
| **Average spectrum** | Équilibre fréquentiel global | Une version paraît-elle nettement plus brillante, plus sourde ou présente-t-elle une résonance persistante ? |
| **Pitch estimation** | Contour F0 estimé sur les segments voisés | La hauteur convertie suit-elle la mélodie/inflexion prévue sans sauts d'octave ? |
| **Level & silence tables** | Niveaux mesurés de sonie/crête et segments de silence | Comparez-vous des fichiers à des volumes similaires et avec le même seuil de silence ? |

> **Ce que mesure Audio Analyzer vs ce qu'il suggère :** Audio Analyzer trace et mesure directement les niveaux du signal, les intervalles de silence, l'énergie spectrale et les contours F0 estimés. Il **ne** diagnostique **pas** automatiquement un "bon" ou "mauvais" timbre vocal tout seul. **Écoutez toujours la région sélectionnée** dans le lecteur intégré avant de considérer une différence visuelle comme un problème.

## Exemples pratiques : quoi surveiller

- **Écrêtage (clipping) :** Crêtes aplaties au sommet atteignant l'amplitude maximale dans **Waveform** (souvent perçu comme un craquement dur). Baissez le gain d'entrée ou normalisez la source avant l'entraînement ou la conversion.
- **Bruit de fond / souffle :** Bande horizontale constante ou plancher lumineux dans les médiums/aigus du **Spectrogram** pendant les pauses. Nettoyez la source avec UVR5 ou MVSep avant l'entraînement.
- **Silence excessif ou vides :** Longues sections plates dans **Waveform** et forts taux de silence dans **Level and silence tables**. Coupez les longues pauses dans les datasets pour que l'entraînement ne gaspille pas de pas sur du silence.
- **Volume trop faible / trop fort :** Amplitude d'onde très fine (risque d'amplification bruitée) ou crêtes proches du maximum. Vérifiez **Level and silence tables** afin de juger les comparaisons A/B à niveau sonore équivalent.
- **Distorsion et réverbération :** Des traînées horizontales floues qui s'étirent après la fin des mots dans **Spectrogram** indiquent de la réverbération de pièce ; des pics verticaux durs ou des harmoniques brouillées suggèrent de la distorsion ou un sur-traitement.
- **Contrôle qualité du dataset :** Inspectez les extraits sources bruts *avant* l'entraînement, puis comparez la même phrase entre checkpoints. Quand l'estimation de hauteur paraît erratique sur des respirations ou consonnes sourdes (`s`, `f`, `t`), écoutez d'abord : les sons non voisés n'ont naturellement pas de hauteur stable.

## Conseils de comparaison et exports

Choisissez une plage temporelle et une vue de canaux correspondantes, et conservez la même **fenêtre FFT**, échelle de fréquences et seuil de silence d'une comparaison à l'autre. Une fenêtre FFT plus grande améliore la précision fréquentielle tout en lissant les événements rapides dans le temps. Exportez en **CSV** ou **JSON** pour les mesures numériques, ou en **ZIP avec graphiques** pour examen ultérieur.
