---
label: "🎛️ Traitement et exportation"
order: 89
permalink: /ilaria-rvc/advanced-inference/
---
# Traitement et exportation

## Établir un préréglage

Ouvrir les **Paramètres d'inférence** pour un seul ou par lots. Choisissez le modèle et vérifiez **Speaker ID** pour un point de contrôle multi-enceintes. Zero est l'emplacement habituel pour une seule voix. Laissez le pitch à zéro, la récupération à zéro et le traitement désactivé pour une première référence. Un index chargé n'a aucun effet de récupération à zéro. Activez une option à la fois et rejouez la même phrase source.

 | Contrôle | Où il agit | Que écouter |
| --- | --- | --- |
 | Split Audio | Trouve des endroits calmes pour diviser un enregistrement tout en préservant le timing. | Vérifiez les jointures, les fins de mots, les respirations et les espaces. |
 | Autotune | Déplace le F0 exprimé vers les notes chromatiques proches. Utilise le guidage en hauteur. | Comparez les notes exposées et le vibrato. |
 | Emplacement proposé | Utilise une fréquence cible et la hauteur sonore médiane de la source pour estimer un décalage limité. | Testez les extrémités hautes et basses des performances avant une exécution complète. |
 | Formant Shifting | Modifie la résonance vocale avant la conversion. Un ratio de 1 conserve la ligne de base. | Comparez les voyelles de même hauteur et niveau d'écoute. |
 | Clean Audio | Applique la réduction du bruit après la conversion. | Écoutez les queues aqueuses ou les consonnes perdues. |
 | Post-traitement | Applique les effets sélectionnés à la sortie convertie. Gain, Pitch Shift et Limiter exposent les commandes. | Comparez le niveau correspondant avec les effets désactivés. Conservez une exportation sèche pour une édition ultérieure. |

La section d'inférence **Post-Process** applique des effets à l'audio converti. Les **Données de processus** de Training ont leur propre ajustement de niveau par tranche.

## Extraction de pitch et de contenu

RMVPE est l'estimateur de pitch de base. FCPE, Swift, Beatrice et Fourchemouth sont disponibles là où l'opération sélectionnée les prend en charge. Comparez les méthodes de pitch sur un test A/B restreint. La méthode pitch estime F0, tandis que le [embedder](embedders.md) extrait les fonctionnalités qui doivent correspondre au modèle.

## Exportez et comparez

Sélectionnez WAV ou FLAC pour l'édition et l'archivage des copies. MP3, OGG et M4A sont des options de distribution plus petites. Le lecteur de sortie télécharge le format sélectionné. Batch écrit également les fichiers dans le répertoire de sortie choisi. Vérifiez la première sortie et son nom avant de traiter de nombreuses entrées.

Le lecteur de forme d'onde prend en charge la lecture et la recherche, y compris les sauts avec les touches fléchées lors de la mise au point. Les entrées très longues, volumineuses ou non prises en charge peuvent utiliser le lecteur standard du navigateur. Pour une comparaison A/B utile, faites correspondre les volumes et écoutez des horodatages identiques.
