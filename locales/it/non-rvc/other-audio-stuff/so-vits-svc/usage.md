---
label: "Uso e addestramento"
icon: ":microphone:"
order: 98
permalink: /non-rvc/so-vits-svc/usage/
---

# So-VITS-SVC · Uso e addestramento

[Installazione](installation.md) · [GitHub · 4.1 Stable](https://github.com/svc-develop-team/so-vits-svc/tree/4.1-Stable)

## Converti la prima registrazione

Metti un WAV vocale breve e pulito in `raw/`. Nell’esempio sostituisci i percorsi del checkpoint e della configurazione e il nome del parlante. Il nome deve comparire nella mappa `spk` del file di configurazione. Dopo `-n` indica il nome del WAV che hai messo in `raw/`. Il risultato finisce in `results/`.

~~~bash
python inference_main.py -m "logs/44k/G_30400.pth" -c "configs/config.json" -n "voice.wav" -t 0 -s "singer"
~~~

## Regola la conversione

Parti da `-t 0`, melodia originale e recupero delle feature disattivato. Una trasposizione di `12` alza di un’ottava. Per il canto lascia spenta la previsione automatica del pitch. Se le note saltano, confronta un estrattore F0 alla volta, ad esempio `-f0p rmvpe` se hai le dipendenze necessarie. Tieni spenti clustering, retrieval e diffusione finché la conversione di base non funziona.

## Addestra un modello

Per addestrare, raccogli le clip di ogni persona in una sottocartella `dataset_raw/<parlante>/`. Tieni da parte una registrazione per il test. Ricampiona, genera le liste e la configurazione, estrai feature e pitch, quindi avvia il training. Conserva il file di configurazione generato insieme al checkpoint. L’esempio usa un solo encoder. Prima di eseguirlo, prepara gli eventuali pesi iniziali indicati dal progetto.

~~~bash
python resample.py --skip_loudnorm
python preprocess_flist_config.py --speech_encoder vec768l12
python preprocess_hubert_f0.py --f0_predictor dio
python train.py -c configs/config.json -m 44k
~~~

## Risoluzione dei problemi

Se il modello non si carica, controlla che checkpoint, configurazione, parlante ed encoder corrispondano. Se falliscono le dipendenze, leggi il primo errore e ricrea l’ambiente separatamente. Se finisce la memoria GPU durante il training, prova clip più brevi o riduci il batch. I file `D_*.pth` sono checkpoint del discriminatore. Per questo percorso di inferenza usa il generatore.
