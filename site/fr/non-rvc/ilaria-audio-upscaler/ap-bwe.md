# Élargir la bande de parole avec AP-BWE

## Choisir un profil de bande

Choisissez **AP-BWE** et adaptez le premier nombre du profil à la bande utile de la parole. Un signal à 8 kHz contient des fréquences jusqu’à environ 4 kHz. Un appel enregistré dans un WAV à 48 kHz peut conserver cette bande étroite. En cas de doute, examinez un spectrogramme ou comparez deux profils voisins sur le même extrait. L’application rééchantillonne à la fréquence d’entrée du profil, qui peut éliminer des détails si elle est trop basse.

| Entrée (kHz) | Sortie (kHz) |
| ---: | ---: |
| 2 | 16 |
| 4 | 16 |
| 8 | 16 |
| 8 | 48 |
| 12 | 48 |
| 16 | 48 |
| 24 | 48 |

## Comparer les résultats

Téléchargez les poids du profil choisi, ajoutez l’audio, choisissez un format et lancez **Enhance audio**. AP-BWE prédit en parallèle les spectres d’amplitude et de phase et reconstruit le signal à la fréquence cible. Le modèle traite les canaux séparément. Si le souffle augmente ou que la voix devient métallique, essayez un profil plus proche de la bande source.

[Présentation](overview.md) · [Installation et modèles](installation.md) · [Restaurer la parole avec Sidon](sidon.md) · [Écoute, export et dépannage](export.md)

## Sources

[AP-BWE](https://github.com/yxlu-0102/AP-BWE) · [AP-BWE audio demos](https://yxlu-0102.github.io/AP-BWE/) · [studio_engine.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio_engine.py) · [AP-BWE weight license](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/LICENSE-AP-BWE-WEIGHTS.txt)
