# Conversão de voz em tempo real

[Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Abre Realtime na aplicação de desktop ou na WebUI. Testa uma voz nos auscultadores antes de enviares o som para Discord, OBS, um jogo ou outra aplicação.

## Configurar o encaminhamento de áudio

Para o primeiro teste, seleciona o microfone físico em **Microphone** e os auscultadores em **Output**. Para enviar a voz a outra aplicação, usa o lado de reprodução do cabo virtual como saída do Redpanda e o lado de gravação como microfone da aplicação de destino. Usa **Monitor** para os auscultadores e evita devolver o sinal ao microfone.

## Vozes RVC e CVC

RVC usa um `.pth` de inferência e o `.index` correspondente opcional. CVC usa uma voz `.cvc` e um percurso de áudio a 48 kHz. Carrega as definições de tom, ganho, gate e índice guardadas com a voz. Os ficheiros antigos `.causalvc.json` e `.nextvc.json` precisam dos respetivos pesos. O RNNoise pode filtrar o microfone. Se houver cortes, testa blocos mais longos e desativa os efeitos um de cada vez.

[Instalar o Redpanda VC](first-run.md) · [Inferência por ficheiros](inference.md) · [Treino com Causal Voice Changer](causal-training.md) · [RVC Training](training.md) · [VAC Lite / VB-CABLE](../../conversion/real-time.md)

## Código-fonte e versão

[Realtime UI](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/desktop/ui/index.html) · [Realtime engine](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/shared/desktop/realtime.py)
