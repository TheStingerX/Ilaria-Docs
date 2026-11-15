---
label: "💬 Synthèse vocale"
order: 93
permalink: /text-to-speech/
---
# Synthèse vocale et RVC

La synthèse vocale (TTS) génère un enregistrement source à partir des mots que vous tapez. RVC applique ensuite un modèle vocal distinct à cet enregistrement. La voix TTS fournit la prononciation, l'accent, le timing et la majeure partie de l'expression. Le modèle cible modifie le son de cette performance.

## Faites un petit test

1. Ouvrez l'espace de travail TTS. Tapez quelques phrases ou fournissez un fichier texte UTF-8.
2. Choisissez une langue et une voix source. Ilaria RVC propose des voix Microsoft Edge en ligne et des voix Windows installées pour une utilisation hors ligne. Chaque moteur vocal peut exposer un ensemble différent de commandes de débit, de volume et de hauteur de source.
3. Générez et écoutez la source avant de la convertir. Si un nom ou un acronyme est mal prononcé, ajustez le libellé ou sélectionnez une voix source plus appropriée.
4. Sélectionnez un modèle et convertissez-le. Commencez par une transposition neutre et jugez côte à côte les enregistrements originaux et convertis.
5. Générez de longs scripts en paragraphes lorsque cela est possible. Conservez les noms des modifications et des exportations de manière cohérente afin qu'une seule phrase puisse être régénérée ultérieurement.

## Diagnostiquez la bonne étape

 | Ce que vous entendez | Que essayer |
| --- | --- |
 | La source accentue le mauvais mot | Ajoutez de la ponctuation, réécrivez la phrase ou essayez une voix TTS différente. |
 | Les sons de la source sont précipités | Ralentissez la source ou divisez le texte en phrases plus courtes. |
 | La parole est claire avant la conversion et terne après | Essayez un extracteur de hauteur différent ou moins d'influence de récupération. |
 | La liste vocale en ligne n'est pas disponible | Vérifiez la connectivité ou choisissez une voix Windows installée. |
 | La voix change de ton entre les paragraphes | Utilisez la même voix source, les mêmes paramètres et le même modèle cible pour chaque paragraphe. |

La conversion vocale préserve une grande partie de la diffusion source. Choisissez la source en fonction des performances que vous souhaitez conserver. Pour plus de comparaisons, utilisez le [guide de qualité audio](audio-quality.md).

[Projet Ilaria RVC et moteurs TTS pris en charge](https://github.com/TheStingerX/Ilaria-RVC)
