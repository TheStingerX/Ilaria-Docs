# NoRegretsRVC · Cloud

NoRegretsRVC Beta 0.1.0 prépare des flux Applio via une interface web et génère des notebooks.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Changelog](version-history.md) · [Kaggle notebook](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/NoRegretsRVC_Kaggle.ipynb)

## Kaggle

Exportez le `.ipynb` et importez-le dans un notebook Kaggle privé. Lisez les cellules. Activez le GPU et internet si nécessaire, commencez par l’installation et vérifiez le dossier de données.

Protégez les identifiants et l’adresse du tunnel. Téléchargez le modèle et ses checkpoints avant de fermer la session.

[Kaggle](https://www.kaggle.com/code)

## Ressources et récupération sur Kaggle

La WebUI détecte les jeux de données dans `/kaggle/input`. Turbo est facultatif. Le contrôle préliminaire vérifie WAV, `.npy` et `filelist.txt`. L’heure estimée utilise l’horloge du navigateur. Vérifiez le `.pth` récupéré et sauvegardez les checkpoints de reprise.

## Dual T4 et lot effectif

La bêta 0.1.0 supprime la parité avec Applio sur un GPU. Sur deux GPU, des lots de 2 ou 4 par GPU donnent 4 ou 8 au total.

Si aucun jeu de données n’est détecté, le chemin reste vide. L’ETA filtre l’échauffement et les sauvegardes. Le moniteur corrige le total d’époques et les marqueurs en double. Les fichiers `.nr_*` quittent `logs/`.

[Installation](installation.md) · [Utilisation](usage.md)
