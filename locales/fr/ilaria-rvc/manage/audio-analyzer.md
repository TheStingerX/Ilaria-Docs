---
label: "Audio Analyzer"
icon: ":chart_with_upwards_trend:"
order: 85
permalink: /ilaria-rvc/audio-analyzer/
description: "Ouvrez Other → Audio Analyzer dans Ilaria RVC pour comparer jusqu'à huit fichiers audio (forme d'onde, spectrogramme, spectre moyen, hauteur et niveaux)."
---
# Audio Analyzer

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Ouvrez **Other → Audio Analyzer** et ajoutez jusqu'à huit fichiers audio (original, conversion de référence et variantes avec un seul réglage modifié).

## Ce que mesure chaque vue

| Vue | Ce qu'elle affiche directement | Question associée |
| --- | --- | --- |
| **Waveform** | Amplitude temporelle | Où sont les crêtes, l'écrêtage plat, les silences ou coupures ? |
| **Spectrogram** | Énergie fréquentielle dans le temps | Quelles fréquences apparaissent au début d'un artefact ? |
| **Average spectrum** | Équilibre spectral moyen | Une version a-t-elle un déséquilibre ou une résonance ? |
| **Pitch estimation** | Contour F0 estimé | La hauteur suit-elle la ligne voulue sans saut d'octave ? |
| **Level & silence tables** | Niveaux mesurés et silences | Comparez-vous à volume égal et même seuil de silence ? |

> **Mesure directe vs interprétation :** Audio Analyzer mesure niveaux, silences, spectre et F0 estimé, mais **ne** juge pas seul la qualité vocale. **Écoutez toujours l'extrait** avant de conclure à un défaut.

## Exemples pratiques

- **Écrêtage (clipping) :** Crêtes plates en haut de la **Waveform** : baissez le gain d'entrée.
- **Bruit de fond / souffle :** Bande horizontale constante dans le **Spectrogram** pendant les pauses : nettoyez avec UVR5 ou MVSep.
- **Silences trop longs / volume faible ou fort :** Vérifiez les **Level & silence tables** pour comparer à volume égal.
- **Réverbération & distorsion :** Traînées floues après les mots dans le **Spectrogram**.
- **Consonnes sourdes (`s`, `f`, `t`) :** Une estimation F0 instable sur les souffles est normale.

Exportez en **CSV**, **JSON** ou **ZIP avec graphiques** avec la même **FFT window**.
