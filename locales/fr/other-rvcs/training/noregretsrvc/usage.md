---
label: "Utilisation"
icon: ":control_knobs:"
order: 98
permalink: /ilaria-rvc/noregretsrvc/usage/
---

# NoRegretsRVC · Utilisation

NoRegretsRVC Beta 0.1.0 prépare des flux Applio via une interface web et génère des notebooks.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Beta 0.1.0](https://github.com/HunterThatsMe/NoRegretsRVC/releases/tag/v0.1.0) · [Kaggle notebook](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/NoRegretsRVC_Kaggle.ipynb)

## Utilisation

Créez un projet et choisissez fréquence, vocodeur, extracteur de hauteur, encodeur, lot et époques. Vérifiez leur compatibilité avec les poids de départ. L’estimation VRAM est indicative.

L’interface prépare les réglages. Faites l’entraînement ou la conversion dans un environnement Applio compatible.

## Entraînement et outils

Training propose quatre étapes: configuration, préparation des données, extraction de caractéristiques et entraînement. Kaggle ajoute l’export `.pth` et `.index`. Samples propose les files d’attente, réglages par clip, transposition, nettoyage dans le navigateur et six extraits à 32 kHz. Models gère les préentraînements, Voice Blender fusionne les voix et TTS utilise Edge. Vérifiez à l’écoute les suggestions de checkpoints de Diagnostics.

## Entraînement et diagnostic en 0.1.0

La normalisation cible −20 LUFS par défaut et la fréquence reste à 32 kHz. EMA, perte Mel avec des fenêtres 512/1024/2048, écrêtage des gradients et réglage de FAISS `nprobe` sont ajoutés. Vérifiez les checkpoints à l’écoute.

Le redémarrage s’appelle **Restart NoRegretsRVC**. Les champs numériques synchronisent les curseurs et les noms précédents ne sont plus suggérés.

[Installation](installation.md) · [Cloud](cloud.md)
