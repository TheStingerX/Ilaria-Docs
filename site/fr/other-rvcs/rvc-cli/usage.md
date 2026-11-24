# rvc-cli · Utilisation et dépannage

[GitHub](https://github.com/blaisewf/rvc-cli) · [Version consultée](https://github.com/blaisewf/rvc-cli/releases/tag/1.2.4)

## Fichier unique et dossiers

Commencez par un WAV court, un `.pth` exporté pour l’inférence et son index. Dans la 1.2.4, le parseur exige `--index_path`; utilisez `--index_rate 0` pour désactiver le retrieval. Pour un dossier, utilisez `batch_infer` avec `--input_folder` et `--output_folder`. Testez quelques fichiers vers une sortie distincte. Activez le bon environnement. Sous Windows, vous pouvez remplacer `python` par `.\env\python.exe`.

~~~bash
python rvc_cli.py infer --input_path "input.wav" --output_path "output.wav" --pth_path "voice.pth" --index_path "voice.index" --f0_method rmvpe --pitch 0 --index_rate 0
python rvc_cli.py batch_infer -h
~~~

## Étapes de l’entraînement

Utilisez `preprocess` pour préparer les données, `extract` pour les caractéristiques et le pitch, `train` pour les poids et `index` pour l’index facultatif. Gardez le même nom et des réglages compatibles pour la fréquence, la version RVC, l’embedder et le pitch. Lisez l’aide de chaque commande. Si un entraînement reprend de manière inattendue, vérifiez son nom. En cas d’échec en inférence, vérifiez que les poids sont un export et non un checkpoint d’entraînement.

~~~bash
python rvc_cli.py preprocess -h
python rvc_cli.py extract -h
python rvc_cli.py train -h
python rvc_cli.py index -h
~~~

[Installation](installation.md)
