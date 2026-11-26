# NoRegretsRVC · Cloud

NoRegretsRVC Beta 0.0 prépare des flux Applio via une interface web et génère des notebooks.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Kaggle notebook](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/NoRegretsRVC_Kaggle.ipynb)

## Kaggle

Exportez le `.ipynb` et importez-le dans un notebook Kaggle privé. Lisez les cellules. Activez le GPU et internet si nécessaire, commencez par l’installation et vérifiez le dossier de données.

Protégez les identifiants et l’adresse du tunnel. Téléchargez le modèle et ses checkpoints avant de fermer la session.

[Kaggle](https://www.kaggle.com/code)

## Ressources et récupération sur Kaggle

La WebUI détecte les jeux de données dans `/kaggle/input`. La parité Dual T4 vise à préserver les étapes d’Applio pour des lots d’au moins 4 et moins de 300 époques. Turbo est facultatif. Le contrôle préliminaire vérifie WAV, `.npy` et `filelist.txt`. L’heure estimée utilise l’horloge du navigateur. Vérifiez le `.pth` récupéré et sauvegardez les checkpoints de reprise.

[Installation](installation.md) · [Utilisation](usage.md)
