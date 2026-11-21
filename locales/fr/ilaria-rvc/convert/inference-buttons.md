---
label: "Contrôles d'inférence expliqués"
icon: ":control_knobs:"
order: 81
permalink: /ilaria-rvc/inference-buttons/
description: "L'inférence utilise une voix entraînée pour convertir un enregistrement."
---

# Chaque contrôle d'inférence expliqué

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

L'inférence utilise une voix entraînée pour convertir un enregistrement. Pour un premier test, téléchargez un court WAV clair, sélectionnez une voix, laissez le Pitch à zéro et désactivez les fonctionnalités optionnelles. Comparez l'entrée et la sortie avant de modifier une valeur.

> **Nouveautés de la 2.3.0** · [RMVPE High Register](advanced-inference.md#rmvpe-high-register)

## Voix, audio et sortie

| Contrôle | Ce qu'il fait |
| --- | --- |
| `Voice Model` | Charge l'exportation d'inférence sélectionnée. Choisissez la voix souhaitée après l'importation. Un point de contrôle de formation G ou D est destiné à la formation continue. |
| `Refresh` | Analyse à nouveau la bibliothèque de modèles. Vérifiez ensuite la voix sélectionnée. |
| `Unload Voice from VRAM` | Libère la voix chargée de la mémoire GPU. Utilisez-le pour libérer de la mémoire pour une autre tâche. |
| `Audio to convert` | Choisit l'enregistrement source. Utilisez une voix sèche plutôt qu'un mix avec des instruments pour un test clair. |
| `Pitch` | Change la hauteur par demi-tons, de −24 à +24. Zéro préserve le registre source. Douze demi-tons correspondent à une octave. |
| `Convert` | Démarre le travail. Lisez le journal de sortie et écoutez la sortie audio. Enregistrez la sortie du lecteur lorsqu'elle est disponible. |
| `Audio folder` et `Output` dans l'inférence par lots | Choisissez le dossier d'entrée et la destination de plusieurs fichiers. Testez d’abord un fichier représentatif et utilisez un dossier de sortie distinct. |

## Paramètres d'inférence

| Contrôle | Ce qu'il fait et comment le tester |
| --- | --- |
| `Speaker ID` | Choisit un emplacement vocal pris en charge par le modèle. Utilisez la valeur par défaut pour un modèle normal à une seule voix. |
| `Pitch Extraction` | Estime le pas de la source. Commencez par RMVPE et comparez une autre méthode disponible uniquement si les notes sautent ou si le contour semble instable. |
| `Path of index` et `Auto-detect index path` | Sélectionnez un index facultatif correspondant par chemin ou dans la liste détectée. Vérifiez qu'il appartient à ce modèle et à cet encodeur. |
| `Index Ratio` | Mélange les fonctionnalités récupérées en conversion. Zéro désactive la récupération. Augmentez progressivement avec un index correspondant et comparez la même phrase. |
| `Resampling, 0=none` | Modifie le débit audio de sortie. Zéro conserve le taux de sortie du modèle. Le rééchantillonnage ne peut pas restaurer les détails manquants. |
| `Input source volume / Normalized Output` | Mélange la source et les enveloppes de volume converties. Près de zéro suit de plus près la dynamique de la source. Un réglage de un laisse l’enveloppe convertie en place. |
| `Protect clear consonants and breathing sounds` | Réduit l'impact de la récupération sur les sons non voisés dans la conversion guidée par la hauteur. Des valeurs inférieures renforcent la protection ; 0,5 l'éteint. Son effet peut être limité lorsque la récupération est désactivée. |
| `Median filter` | Lisse l'estimation du pas de récolte lorsque le seuil affiché est activé. Commencez par la valeur par défaut et testez-la uniquement lors du dépannage de Harvest. |
| `Export Format` | WAV et FLAC sont sans perte. MP3, OGG et M4A peuvent économiser de l'espace pour la livraison. Utilisez WAV pour votre première comparaison. |
| `F0 curve file` | Saisie avancée pour une courbe de hauteur personnalisée dans les versions qui l'exposent. Laissez vide pour la conversion quotidienne. |

## Paramètres de traitement audio et d'intégration

- **Split Audio** traite les sections séparées par des passages silencieux. Essayez-le pour les entrées longues et écoutez les jointures.
- **Autotune** déplace les notes vocales vers les notes chromatiques proches. **Autotune Strength** contrôle la force avec laquelle il le fait. Commencez par le retirer.
- **Proposed Pitch** utilise la hauteur médiane et le **Target Pitch (Hz)** pour estimer un décalage. Essayez-le sur un court clip représentatif.
- **Clean Audio** applique une réduction du bruit après la conversion. **Clean Strength** contrôle son intensité. Comparez avec la sortie non traitée pour les respirations endommagées ou les sifflantes.
- **Formant Shifting** modifie la résonance avant la conversion. Un **Rapport de Formants** de 1 conserve la ligne de base. Écoutez les mêmes voyelles pendant le test.
- **Post-Process** exécute les **Effets** sélectionnés sur l'audio converti. **Post Pitch Shift** ajuste la hauteur de sortie, **Gain** modifie le niveau et **Limiter Threshold** contrôle l'endroit où le limiteur commence à agir. Utilisez un effet à la fois lors du diagnostic d’un problème.
- **Embedder Model** sélectionne l'encodeur de contenu. Auto utilise les informations du modèle lorsqu'elles sont disponibles. **Custom Embedder** accepte les poids .bin et la configuration .json correspondants. Donnez-lui un nom de dossier, cliquez sur **Installer l'intégration personnalisée**, vérifiez l'état d'importation de l'intégration et utilisez **Actualiser les intégrations** si nécessaire. Sélectionnez l'encodeur avec lequel la voix a été entraînée avant de tester son index.

Si votre version expose **TTS**, essayez d'abord une phrase courte. Choisissez Edge pour une voix en ligne ou une voix Windows disponible pour une synthèse hors ligne, sélectionnez la langue et la voix, puis prévisualisez le résultat. Ajustez le taux, le volume ou la hauteur de la source uniquement lorsque cela est pris en charge. Si la prononciation est incorrecte avant la conversion, corrigez d'abord le discours source. Voir [Texte en parole](speech.md).


> **2.2.1** · Le lecteur de forme d’onde propose un réglage du volume pour les entrées, les résultats et les aperçus. Utilisez-le pour écouter moins fort ou comparer des extraits à un niveau similaire. Il agit uniquement sur la lecture. Pour modifier le fichier converti, réglez Gain dans Post-Process et relancez la conversion.
