---
label: "GPT-SoVITS"
icon: ":studio_microphone:"
order: 97
permalink: /non-rvc/tts/gpt-sovits/
---

# GPT-SoVITS

## Escolher um fluxo

Começa com síntese zero-shot usando uma gravação, a sua transcrição e uma frase nova. O ajuste fino usa excertos anotados e produz pesos GPT e SoVITS. Usa vozes autorizadas e escolhe pesos da mesma família.

## Instalar e abrir a WebUI

No Windows, extrai totalmente o pacote integrado indicado no repositório oficial e abre `go-webui.bat`, se estiver presente. Abre o endereço local apresentado na consola e deixa o processo ativo. Para instalar a partir do código, cria um ambiente Conda com Python 3.10 e usa o instalador da versão escolhida. O Windows oferece CUDA ou CPU, o Linux também documenta ROCm e o macOS dispõe de MPS e CPU. Mantém as subpastas de `GPT_SoVITS/pretrained_models` e verifica o FFmpeg quando necessário.

## Gerar a primeira frase

1. Abre **1C-inference**, atualiza os caminhos dos modelos se necessário e inicia a interface TTS.
2. Escolhe pesos GPT e SoVITS compatíveis. Usa um excerto curto com uma só voz e sem música. Nas interfaces antigas, a referência tinha entre 3 e 10 segundos. Segue o intervalo indicado pela tua versão.
3. Escreve a transcrição exata com o seu idioma. Introduz o texto a gerar e o respetivo idioma nos campos separados.
4. Gera uma frase curta e ouve o início, o final e as pausas. Divide textos longos e muda uma opção de cada vez.

## Preparar os dados

1. Guarda os originais e reserva frases para teste. Experimenta **Audio Slicer** em poucos ficheiros e ouve os cortes antes de processares o conjunto inteiro.
2. Na ferramenta de transcrição automática, seleciona os excertos cortados e um reconhecedor adequado ao idioma. Abre o `.list` produzido no editor de anotações e corrige o texto.
3. Confirma que os caminhos existem e guarda as correções antes de formatar.

~~~text
audio/clip01.wav|speaker01|en|This is the first recording.
~~~

## Formatar e treinar

1. Em **1A-Dataset formatting**, escolhe a família, o nome da experiência e o `.list` corrigido. Lê o registo e confirma que os ficheiros foram gerados.
2. Em **1B-Fine-tuned training**, usa a mesma experiência para SoVITS e GPT. Numa só GPU, treina cada componente separadamente. Começa com os valores predefinidos e deixa DPO desativado.
3. Atualiza a lista e compara os checkpoints com frases de teste. Guarda GPT `.ckpt`, SoVITS `.pth`, versão e anotações em conjunto.

## Resolução de problemas

Se a interface não abrir, verifica a consola. Se faltarem pesos, confirma a pasta e a família. Se houver repetições, revê a transcrição e divide o texto. Se falta VRAM, reduz o lote e executa as etapas separadamente.

[GitHub · RVC-Boss](https://github.com/RVC-Boss/GPT-SoVITS)
