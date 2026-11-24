# rvc-cli · Utilização e resolução de problemas

[GitHub](https://github.com/blaisewf/rvc-cli) · [Versão consultada](https://github.com/blaisewf/rvc-cli/releases/tag/1.2.4)

!!!warning Software antigo · Desaconselhado
**rvc-cli** está arquivado no GitHub e deixou de ser mantido. O programa está desatualizado e é desaconselhado para novas instalações. [Guias por aplicação](../../app-guides.md)
!!!

## Ficheiro individual e pastas

Começa com um WAV curto, um `.pth` exportado para inferência e o índice correspondente. Na versão 1.2.4, o parser exige `--index_path`; usa `--index_rate 0` para desativar a recuperação. Para pastas, usa `batch_infer` com `--input_folder` e `--output_folder`. Testa poucos ficheiros num destino separado. Ativa o ambiente correto. No Windows, podes substituir `python` por `.\env\python.exe`.

~~~bash
python rvc_cli.py infer --input_path "input.wav" --output_path "output.wav" --pth_path "voice.pth" --index_path "voice.index" --f0_method rmvpe --pitch 0 --index_rate 0
python rvc_cli.py batch_infer -h
~~~

## Etapas de treino

Usa `preprocess` para preparar os dados, `extract` para tom e características, `train` para pesos e `index` para o índice opcional. Mantém o nome do modelo e definições compatíveis de frequência, versão RVC, embedder e tom. Consulta a ajuda de cada comando. Se um treino retomar inesperadamente, verifica o nome. Se a inferência falhar, distingue os pesos exportados dos checkpoints de treino.

~~~bash
python rvc_cli.py preprocess -h
python rvc_cli.py extract -h
python rvc_cli.py train -h
python rvc_cli.py index -h
~~~

[Instalação](installation.md)
