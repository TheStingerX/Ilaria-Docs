---
label: "🗃️ Arquivos, configuração e manutenção da fonte"
order: 84
permalink: /ilaria-rvc/source-layout/
---
# Arquivos, configuração e manutenção da fonte

## Saiba o que fazer backup

 | Localização | Função |
| --- | --- |
 | modelos/ | Vozes prontas para inferência e seus índices correspondentes, geralmente agrupados em pastas por voz. |
 | conjuntos de dados/ | Gravações de treinamento importadas. Mantenha uma cópia separada dos seus originais. |
 | logs/ | Configuração do experimento, áudio preparado, recursos, índices, pontos de verificação recuperáveis ​​e visualizações. Faça backup de todo o experimento para retomar mais tarde. |
 | tempo de execução/ | Ambiente Windows Python incluído. |
 | ativos/ | Codificador principal e pesos de pitch, codificadores opcionais, pré-treinos de treinamento, arte e outros ativos do aplicativo. |

Uma exportação de inferência pode ser usada para conversão. Para um experimento retomável, mantenha o par G/D salvo, o otimizador e o estado de treinamento junto com a configuração, lista de arquivos e recursos extraídos.

## Trabalhe a partir do código-fonte no Windows

Comece com uma instalação limpa e correspondente. Copie o tempo de execução incluído, ffmpeg e ffprobe no checkout de origem no mesmo layout. Traga os pesos ContentVec e RMVPE instalados e os ativos FCPE, se necessário. Para treinar com os pré-treinos V2 padrão, copie os ativos pretrained_v2 instalados. Copie .env.example para .env e use o iniciador de logs. Ao diagnosticar a inicialização, verifique os caminhos agrupados antes de alterar as dependências do Python globalmente.

O projeto mantém os pontos de entrada a montante como referência. Seu aplicativo principal é ILARIA_RVC.py, com módulos específicos de recursos em ilaria/ e a inferência upstream e código de treinamento em infer/. Ilaria RVC baseia-se no Mainline RVC, inclui trabalho adaptado de Applio e Redpanda-vc, usa TorchFCPE para FCPE e estende Ilaria Audio Analyzer. Consulte a licença e os avisos do repositório ao redistribuir fontes ou ativos.

## Atualize sem perder trabalho

Conclua trabalhos, copie dados essenciais e use o painel de atualização para verificar as notas de lançamento. O atualizador verifica downloads e oferece suporte a backup e recuperação. Se a mesma instalação já tiver um processo em execução, use o endereço ou logs do navegador e aguarde a conclusão do trabalho ativo. Use **Restart Ilaria RVC** para uma reinicialização normal da UI.
