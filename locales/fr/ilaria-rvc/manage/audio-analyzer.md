---
label: "Analyseur audio"
icon: ":chart_with_upwards_trend:"
order: 85
permalink: /ilaria-rvc/audio-analyzer/
description: "Ouvrez Autre → Analyseur audio. Ajoutez jusqu'à huit fichiers audio à comparer."
---
# Analyseur audio

[Télécharger Ilaria RVC 2.4.0 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Ouvrez **Autre → Analyseur audio**. Ajoutez jusqu'à huit fichiers audio à comparer. Un ensemble utile contient l'entrée d'origine, une conversion de base et une ou deux variantes réalisées avec un paramètre modifié.

 | Vue | Question à répondre |
| --- | --- |
 | Forme d'onde | Où se trouvent les pics forts, les passages calmes ou les jointures brusques ? |
 | Spectrogramme | Quelles fréquences sont présentes au moment où un artefact démarre ? |
 | Spectre moyen | Une version présente-t-elle un déséquilibre de fréquence persistant ? |
 | Estimation de la hauteur | Le F0 converti suit-il le contour prévu dans les passages voisés ? |
 | Tableaux de niveaux et de silence | Comparez-vous à des volumes similaires et utilisez la même définition du silence ? |

Choisissez une plage horaire et une vue de chaîne. Utilisez la même fenêtre FFT, la même échelle de fréquence et le même seuil de silence dans les comparaisons. Une fenêtre FFT plus grande améliore la résolution en fréquence et lisse les événements rapides dans le temps. Écoutez la région sélectionnée dans le lecteur avant de décider si une différence visible constitue un problème.

Exportez CSV ou JSON pour les mesures, ou un ZIP avec des graphiques pour un examen ultérieur. Si vous souhaitez diagnostiquer un clip d'ensemble de données bruyant, vérifiez d'abord la source non traitée et comparez le même intervalle dans l'exportation. Lorsque les résultats de hauteur semblent étranges en termes de respirations ou de consonnes sourdes, écoutez l'audio avant d'interpréter l'estimation.
