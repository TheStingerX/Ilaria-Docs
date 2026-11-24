# rvc-cli · Uso e risoluzione dei problemi

[GitHub](https://github.com/blaisewf/rvc-cli) · [Versione consultata](https://github.com/blaisewf/rvc-cli/releases/tag/1.2.4)

!!!warning Software datato · Sconsigliato
**rvc-cli** è archiviato su GitHub e non è più mantenuto. Il programma è datato e sconsigliato per nuove installazioni. [Guide per app](../../app-guides.md)
!!!

## File singolo e cartelle

Parti da un WAV breve, un `.pth` esportato per inferenza e il suo indice. Nella 1.2.4 il parser richiede `--index_path`; imposta `--index_rate 0` per disattivare il retrieval. Per una cartella usa `batch_infer` con `--input_folder` e `--output_folder`. Usa una destinazione separata e prova pochi file. Il comando presuppone l’ambiente corretto attivo. Su Windows puoi sostituire `python` con `.\env\python.exe`.

~~~bash
python rvc_cli.py infer --input_path "input.wav" --output_path "output.wav" --pth_path "voice.pth" --index_path "voice.index" --f0_method rmvpe --pitch 0 --index_rate 0
python rvc_cli.py batch_infer -h
~~~

## Fasi del training

Usa `preprocess` per preparare il dataset, `extract` per pitch e feature, `train` per i pesi e `index` per l’indice facoltativo. Mantieni lo stesso nome del modello e impostazioni compatibili per frequenza, versione RVC, embedder e pitch. Leggi l’aiuto di ogni comando. Se riprende un run inatteso, controlla se il nome esiste già. Se l’inferenza non carica il modello, verifica che sia un export e non un checkpoint di training.

~~~bash
python rvc_cli.py preprocess -h
python rvc_cli.py extract -h
python rvc_cli.py train -h
python rvc_cli.py index -h
~~~

[Installazione](installation.md)
