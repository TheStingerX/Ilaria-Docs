# Glossaire

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

 | Terme | Signification |
| --- | --- |
 | Inférence | Utilisation d'un modèle entraîné pour convertir un enregistrement. |
 | Point de contrôle | Fichier contenant les poids du modèle appris. Les points de contrôle de reprise et les exportations d’inférences ont des rôles différents. |
 | Embedder | Composant qui extrait une représentation de l'audio source pour le moteur de conversion. |
 | Index | Collection facultative de vecteurs de caractéristiques apprises utilisés lors de la récupération. |
 | Taux d'index | Dans quelle mesure une implémentation utilise les fonctionnalités récupérées lors de la conversion. |
 | F0 | Fréquence fondamentale, utilisée pour représenter la hauteur dans le temps. |
 | Extracteur de pitch | Algorithme qui estime F0 à partir d'un enregistrement. |
 | Demi-ton | Un douzième d'octave. Un changement de 12 demi-tons équivaut à une octave. |
 | Vocoder | La partie du pipeline qui génère la forme d'onde à partir de ses entrées de conditionnement. |
 | Taux d'échantillonnage | Le nombre d'échantillons audio par seconde. Elle se distingue de la version modèle et de la transposition de hauteur. |
 | Pré-entraînement | Poids de départ utilisés lors de l'entraînement d'un nouveau modèle. |
 | Époque | Un passage dans l'ensemble de données de formation dans la configuration de formation habituelle. |
 | Étape | Une mise à jour de la formation. La taille du lot et la taille de l'ensemble de données affectent la relation entre les étapes et les époques. |
 | Stem | Une partie isolée d'un mix, généralement vocale ou instrumentale. |
 | Latence | Le temps entre un événement d'entrée et sa sortie audible. |

Voir [Fondements RVC](../start/rvc-fundamentals.md), [Modèles et fichiers](../start/models.md) et [Formation](../model-training/training.md) pour ces termes en contexte.

## Contrôles Ilaria RVC

Ces entrées sont adaptées du glossaire intégré à Ilaria RVC. Les commandes disponibles peuvent varier selon la version.

 | Contrôle | Signification |
| --- | --- |
 | Modèle vocal | Sélectionne un point de contrôle d'inférence et recherche son index correspondant. |
 | Actualiser | Réanalyse la bibliothèque de modèles. Vérifiez à nouveau votre sélection par la suite. |
 | Décharger la voix de la VRAM | Libère des ressources d'inférence pour libérer de la mémoire GPU pour d'autres tâches. |
 | Speaker ID | Sélectionne un emplacement vocal dans le modèle chargé. Utilisez 0 pour un modèle typique à un seul haut-parleur. |
 | RMVPE et FCPE | Extracteurs de pitch qui estiment F0 au fil du temps. |
 | ContentVec / HuBERT | ContentVec est un encodeur de contenu de style HuBERT utilisé dans les flux de travail RVC standard. Faites correspondre l'encodeur utilisé lors de la formation. |
 | Mixage d'enveloppe de volume | Définit dans quelle mesure la dynamique de sortie suit la source. |
 | Protéger | Réduit l'influence de la récupération sur les consonnes sourdes et les respirations. Une valeur inférieure donne une protection plus forte. Une valeur de 0,5 le désactive. |
 | Rééchantillonnage | Ajuste le taux de sortie. Une valeur de 0 conserve le taux de sortie du modèle. |
 | Traiter les données | Prépare, rééchantillonne et découpe les enregistrements. Ilaria RVC ajuste le niveau de chaque tranche pendant cette étape. |
 | Extraction de fonctionnalités | Calcule les fonctionnalités de contenu et les informations de pitch pour les modèles guidés par le pitch. |
 | Vérificateur d'ensemble de données | Signale les éventuels écrêtages, les longues pauses, les fichiers illisibles et les différences de niveau sans modifier la source. |
 | Aperçus de formation | Convertissez le même court enregistrement de référence sur plusieurs époques pour une comparaison à l'oreille. |
 | Générateur et discriminateur | Le générateur apprend à synthétiser l'audio et le discriminateur fournit un retour. Leur paire de points de contrôle G/D est utilisée pour reprendre l'entraînement. |
 | Arrêter et enregistrer | Demande un point de contrôle pouvant être repris. Attendez la confirmation avant de fermer. |
 | Époques totales | Cible d’époque finale, y compris les époques terminées avant la reprise. |
 | Informations sur le modèle | Affiche les propriétés des points de contrôle stockées telles que la vitesse, le guidage en tangage et la précision, le cas échéant. |
 | Fusionner les modèles | Mélange les poids d'inférence compatibles. Commencez à tester la voix fusionnée avec la récupération désactivée. |
 | FP16 et FP32 | Formats de précision numérique. La précision du poids dans une exportation décrit le fichier stocké. |

> Les checkpoints HuBERT génériques sont déconseillés comme encodeur par défaut pour la conversion vocale. Entraînés pour représenter la parole, ils peuvent conserver des informations sur le timbre de la voix source dans le résultat. Utilisez l’encodeur attendu par le modèle RVC, par exemple ContentVec si le modèle a été entraîné avec lui.

Voir [Conversion vocale](../conversion/voice-conversion.md) et [Formation](../model-training/training.md) pour les flux de travail utilisant ces commandes.
