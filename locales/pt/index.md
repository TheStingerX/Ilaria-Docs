---
label: "🏠 Home"
order: 100
---
# Documentação do Ilaria RVC

<div class="docs-welcome" data-author-note="ilaria">

**Uma nota da Ilaria antes de começares**

Olá, sou a Ilaria. Escrevi estes guias para partilhar o que aprendi ao desenvolver o Ilaria RVC, treinar modelos de voz e experimentar outras ferramentas. As explicações refletem a minha experiência e o que sei no momento em que escrevo. Posso interpretar mal uma opção, deixar passar um caso específico ou descrever um passo que mude numa versão posterior.

Os mesmos passos podem dar resultados diferentes noutro computador. Uma atualização pode mudar um botão de lugar, uma função pode depender da GPU ou do controlador e uma opção que funciona com uma voz pode piorar outra. Usa os valores sugeridos como ponto de partida. Testa um excerto curto e muda uma opção de cada vez. Guarda uma cópia antes de substituir ficheiros ou atualizar uma instalação que funciona.

Se algo estiver diferente do que vês, confirma o nome e a versão do programa e a mensagem de erro exata. Consulta as notas dessa versão. Se encontrares um erro no guia, diz-me qual é a página, o passo, a versão e o que aconteceu, para que eu possa repetir o teste e corrigir o texto.

<div style="border-left:4px solid #FFC0CB;padding:.75rem 1rem;margin:1rem 0;background:#ffc0cb12;border-radius:.3rem">

Se tiveres algum problema, sugestão ou atualização, escreve-me no Discord.

[**Discord · thestingerx**](https://discord.com/users/740255187234717838)

</div>

&#45; Ilaria

</div>

Também podes usar o Ilaria RVC no Kaggle com a GPU remota, mesmo que o teu computador não tenha uma GPU NVIDIA. [Ilaria RVC on Kaggle](ilaria-rvc/cloud/kaggle.md)

<div class="docs-welcome">

Ilaria RVC é um aplicativo do Windows para converter gravações e treinar modelos de voz. Sua interface abre em um navegador e o mecanismo de conversão é executado no seu computador. O pacote Windows foi desenvolvido para GPUs NVIDIA.

[Descarregar o Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true) · [Navegar pelas demonstrações de voz](https://ilariarvc.shop/en/demos/) · [Leia o changelog](ilaria-rvc/install/version-history.md)

</div>

## Comece com sua configuração

### Windows com GPU NVIDIA

Verifique seu modelo exato em [Compatibilidade de GPU](ilaria-rvc/install/gpu-compatibility.md) e siga [Instalação e atualizações](ilaria-rvc/install/installation.md). Quando o aplicativo abrir, use um WAV curto e limpo e um modelo de inferência em [Single Inference](ilaria-rvc/convert/inference.md). O índice correspondente é opcional. Salve a primeira saída para ter uma referência antes de alterar os efeitos ou o tom.

### Um computador sem uma GPU adequada

Use o [passo a passo do Kaggle](ilaria-rvc/cloud/kaggle.md) para executar o Ilaria RVC em uma GPU remota. Abrange a inicialização do notebook, o acesso à interface, a execução de um teste e o download dos resultados antes do término da sessão.

## Escolha o fluxo de trabalho correto

- **Tenho uma gravação e quero uma voz diferente.** Use [Controles de inferência](ilaria-rvc/convert/inference-buttons.md) para escolher um modelo, converter o arquivo e encontrar o áudio exportado.
- **Tenho texto e quero áudio falado.** Comece com [Texto para fala](ilaria-rvc/convert/speech.md). Ouça a voz de origem antes de aplicar um modelo RVC para que você possa corrigir a pronúncia antecipadamente.
- **Quero criar meu próprio modelo de voz.** Prepare as gravações que você tem permissão para usar, reserve um pequeno clipe para teste e siga [Treinamento passo a passo](ilaria-rvc/train/training-workflow.md). Use a [Referência de controles de treinamento](ilaria-rvc/train/training-buttons.md) quando precisar entender uma configuração.
- **Quero usar um microfone convertido em uma chamada ou jogo.** Escolha um aplicativo em [Outros RVCs](other-rvcs/app-guides.md) e siga [roteamento de áudio ao vivo](conversion/real-time.md) para testar o microfone, o conversor e o destino nessa ordem.

## Quando algo dá errado

Se o aplicativo não iniciar, mantenha o log aberto e procure o primeiro erro. Se o aplicativo iniciar, mas o áudio soar errado, compare o mesmo clipe curto com o processamento opcional desativado. O [guia de solução de problemas](reference/troubleshooting.md) agrupa correções por sintoma. O [glossário](reference/glossary.md) explica termos como ponto de verificação, incorporador e índice, e [Outros controles](ilaria-rvc/manage/other-buttons.md) mostra como inspecionar, importar e exportar modelos.

 | Eu quero… | Comece aqui |
| --- | --- |
 | Explore o aplicativo Ilaria RVC em detalhes | [Visão geral do aplicativo](ilaria-rvc/overview.md), [instalação](ilaria-rvc/install/installation.md), [inferência](ilaria-rvc/convert/inference.md) e [fluxo de trabalho de treinamento](ilaria-rvc/train/training-workflow.md) |
 | Instale o aplicativo e converta meu primeiro clipe | [Primeiros passos](start/getting-started.md) |
 | Entenda como o RVC funciona | [Fundamentos do RVC](start/rvc-fundamentals.md) e [modelos e arquivos](start/models.md) |
 | Converta áudio, compare configurações ou processe uma pasta | [Conversão de voz](conversion/voice-conversion.md) e [qualidade de áudio](conversion/audio-quality.md) |
 | Gere uma fonte falada a partir do texto | [Texto para fala](conversion/text-to-speech.md) |
 | Converter um sinal de microfone ao vivo | [Conversão de voz em tempo real](conversion/real-time.md) |
 | Gravar um conjunto de dados e treinar meu próprio modelo | [Preparação do conjunto de dados](model-training/dataset-preparation.md) e [treinamento](model-training/training.md) |
 | Separar um vocal ou terminar um projeto musical | [Hales e mixagem](conversion/stems-and-mixing.md) |
 | Compare Ilaria RVC, Vonovox, Applio e mais | [Ferramentas RVC](reference/tools.md) |
 | Corrija um erro ou recupere uma instalação | [Solução de problemas](reference/troubleshooting.md) |

Use a navegação para encontrar guias de configuração, conversão, treinamento e solução de problemas para Ilaria RVC e outros aplicativos RVC.


---

## A documentação em números

- **Páginas no total:** **88** páginas (`87` guias + Início)
- **Total de páginas em todos os 6 idiomas (`en`, `it`, `es`, `fr`, `de`, `pt`):** **528** páginas (`88 x 6`)

## Algumas curiosidades sobre o site e a Ilaria

- **Nascido da prática real:** A Ilaria (`TheStingerX` / `thestingerx` no Discord) escreveu e expandiu estes guias diretamente enquanto desenvolvia o **Ilaria RVC**, treinava modelos de voz (como *Itaila*) e testava configurações reais no Windows, Kaggle, Google Colab e Lightning AI.
- **Da `1.1 Beta` à `2.4.6`:** O Ilaria RVC começou como uma interface personalizada para Windows e evoluiu para suportar **NVIDIA RTX série 50 (Blackwell)** com CUDA 12.8, **treino nativo em BF16**, **Kokoro v1.0 TTS**, conversão **Safetensors ↔ PTH** e catálogos integrados.
- **Mais do que um único app:** Com o tempo, o **Ilaria Docs** cresceu para cobrir **11 apps e forks RVC** (Ilaria RVC, Applio, Mainline, Okada, TGR, Deiteris, Vonovox, RedPanda, RVC Blue, RVC-GUI e RVC Model Merger), além de ferramentas **Non-RVC** como **YuneVoix**, **Causal Voice Changer**, **UVR5** e **MVSep**.
- **Sincronizado em 6 idiomas:** Cada página do site é mantida 1:1 em inglês, italiano, espanhol, francês, alemão e português.
