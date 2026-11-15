---
label: "🛠️ Journaux et récupération"
order: 92
permalink: /ilaria-rvc/troubleshooting/
---
# Journaux et récupération

## Rechercher la première étape défaillante

Pour les problèmes de démarrage, utilisez `ILARIA_RVC_LOGS.bat` et notez la première erreur. En cas d'échec d'inférence, testez un court WAV local avec la récupération désactivée et confirmez le modèle et l'intégration. En cas d'échec de la formation, identifiez si le prétraitement, l'extraction de fonctionnalités ou l'étape de formation ont échoué avant de réessayer.

## Gérer la pression de la mémoire

Fermez les tâches GPU concurrentes, déchargez la voix d'inférence et réessayez avec un lot d'entraînement plus petit ou la mise en cache de l'ensemble de données désactivée, le cas échéant. Enregistrez avant de redémarrer. Enregistrez la version de l'application, le GPU, l'action défaillante exacte et la première erreur avant de demander de l'aide.
