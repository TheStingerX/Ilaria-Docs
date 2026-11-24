# rvc-cli · Usage and troubleshooting

[GitHub](https://github.com/blaisewf/rvc-cli) · [Reviewed version](https://github.com/blaisewf/rvc-cli/releases/tag/1.2.4)

## Single file and folders

Start with a short clean WAV, an exported inference `.pth` and its matching index. In 1.2.4 the parser requires `--index_path`; set `--index_rate 0` to disable retrieval. For a batch, switch to `batch_infer` and use `--input_folder` and `--output_folder`. Use an output folder separate from the input and test a couple of files first. The command below assumes the correct environment is active. On Windows you can replace `python` with `.\env\python.exe`.

~~~bash
python rvc_cli.py infer --input_path "input.wav" --output_path "output.wav" --pth_path "voice.pth" --index_path "voice.index" --f0_method rmvpe --pitch 0 --index_rate 0
python rvc_cli.py batch_infer -h
~~~

## Training stages

Use `preprocess` to prepare the dataset, `extract` for pitch/content features, `train` for weights and `index` to build the optional retrieval index. Use the same model name and compatible sample rate, RVC version, embedder and pitch settings throughout. Inspect each command’s help first. If training resumes unexpectedly, check whether the experiment name already exists. If conversion cannot load a model, distinguish exported weights from resumable generator/discriminator checkpoints.

~~~bash
python rvc_cli.py preprocess -h
python rvc_cli.py extract -h
python rvc_cli.py train -h
python rvc_cli.py index -h
~~~

[Installation](installation.md)
