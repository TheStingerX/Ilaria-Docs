---
label: "Arquivos, configuração e manutenção da fonte"
icon: ":card_file_box:"
order: 84
permalink: /ilaria-rvc/source-layout/
description: "Uma exportação de inferência pode ser usada para conversão."
---
# Arquivos, configuração e manutenção da fonte

[Descarregar o Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

> **2.4.0** · No Windows, a aplicação e o runtime passam para app/ e os modelos ficam em models/ na raiz. Inclui notebooks Colab e Lightning AI Studio, indicações para descarregar embedders e Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). Corrige pip e inclui pywin32.

## Saiba o que fazer backup

 | Localização | Função |
| --- | --- |
 | modelos/ | Vozes prontas para inferência e seus índices correspondentes, geralmente agrupados em pastas por voz. |
 | conjuntos de dados/ | Gravações de treinamento importadas. Mantenha uma cópia separada dos seus originais. |
 | app/logs/ | Configuração do experimento, áudio preparado, recursos, índices, pontos de verificação recuperáveis ​​e visualizações. Faça backup de todo o experimento para retomar mais tarde. |
 | tempo de execução/ | Ambiente Windows Python incluído. |
 | ativos/ | Codificador principal e pesos de pitch, codificadores opcionais, pré-treinos de treinamento, arte e outros ativos do aplicativo. |

Uma exportação de inferência pode ser usada para conversão. Para um experimento retomável, mantenha o par G/D salvo, o otimizador e o estado de treinamento junto com a configuração, lista de arquivos e recursos extraídos.

## Trabalhe a partir do código-fonte no Windows

Comece com uma instalação limpa e correspondente. Copie o tempo de execução incluído, ffmpeg e ffprobe no checkout de origem no mesmo layout. Traga os pesos ContentVec e RMVPE instalados e os ativos FCPE, se necessário. Para treinar com os pré-treinos V2 padrão, copie os ativos pretrained_v2 instalados. Copie .env.example para .env e use o iniciador de logs. Ao diagnosticar a inicialização, verifique os caminhos agrupados antes de alterar as dependências do Python globalmente.

O projeto mantém os pontos de entrada a montante como referência. Seu aplicativo principal é app/ILARIA_RVC.py, com módulos específicos de recursos em app/ilaria/ e a inferência upstream e código de treinamento em app/infer/. Ilaria RVC baseia-se no RVC WebUI (Mainline - Original RVC), inclui trabalho adaptado de Applio e Redpanda-vc, usa TorchFCPE para FCPE e estende Ilaria Audio Analyzer. Consulte a licença e os avisos do repositório ao redistribuir fontes ou ativos.

## Atualize sem perder trabalho

Conclua trabalhos, copie dados essenciais e use o painel de atualização para verificar as notas de lançamento. O atualizador verifica downloads e oferece suporte a backup e recuperação. Se a mesma instalação já tiver um processo em execução, use o endereço ou logs do navegador e aguarde a conclusão do trabalho ativo. Use **Restart Ilaria RVC** para uma reinicialização normal da UI.
