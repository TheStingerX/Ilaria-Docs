# So-VITS-SVC · Utilisation et entraînement

[Installation](installation.md) · [GitHub · 4.1 Stable](https://github.com/svc-develop-team/so-vits-svc/tree/4.1-Stable)

## Convertir un premier extrait

Placez un WAV vocal dans `raw/`. Remplacez les chemins et le nom du locuteur de l’exemple. Le nom figure dans `spk`. La sortie se trouve dans `results/`.

~~~bash
python inference_main.py -m "logs/44k/G_30400.pth" -c "configs/config.json" -n "voice.wav" -t 0 -s "singer"
~~~

## Régler la conversion

Commencez à `-t 0`. Pour le chant, laissez la prédiction automatique de hauteur désactivée. Comparez les extracteurs F0 un à un.

## Entraîner un modèle

Rangez les enregistrements par locuteur dans `dataset_raw/`. Préparez les poids de base, exécutez les étapes de l’exemple et gardez la configuration avec le checkpoint.

~~~bash
python resample.py --skip_loudnorm
python preprocess_flist_config.py --speech_encoder vec768l12
python preprocess_hubert_f0.py --f0_predictor dio
python train.py -c configs/config.json -m 44k
~~~

## Dépannage

Vérifiez le modèle et le JSON si le chargement échoue. En cas de manque de mémoire, réduisez le lot ou la durée des extraits.
