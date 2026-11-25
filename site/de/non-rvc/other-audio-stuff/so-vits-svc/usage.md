# So-VITS-SVC · Nutzung und Training

[Installation](installation.md) · [GitHub · 4.1 Stable](https://github.com/svc-develop-team/so-vits-svc/tree/4.1-Stable)

## Erste Aufnahme konvertieren

Lege eine kurze Gesangs-WAV in `raw/`. Ersetze Modellpfade und Sprechername im Beispiel. Der Name steht unter `spk`. Das Ergebnis landet in `results/`.

~~~bash
python inference_main.py -m "logs/44k/G_30400.pth" -c "configs/config.json" -n "voice.wav" -t 0 -s "singer"
~~~

## Konvertierung einstellen

Beginne mit `-t 0`. Lasse automatische Tonhöhenvorhersage für Gesang aus. Vergleiche F0-Extraktoren einzeln.

## Modell trainieren

Lege Ausschnitte pro Sprecher unter `dataset_raw/` ab. Bereite die Basisgewichte vor, führe die Schritte aus und sichere die Konfiguration zusammen mit dem Checkpoint.

~~~bash
python resample.py --skip_loudnorm
python preprocess_flist_config.py --speech_encoder vec768l12
python preprocess_hubert_f0.py --f0_predictor dio
python train.py -c configs/config.json -m 44k
~~~

## Fehlerbehebung

Prüfe bei Ladefehlern Modell und JSON. Reduziere bei Speichermangel Stapelgröße oder Ausschnittlänge.
