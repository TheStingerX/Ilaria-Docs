# Conversão de voz em tempo real

Para uma gravação ou um cover, a conversão de arquivos permite renderizar e comparar várias tomadas. Em uma configuração ao vivo, o conversor precisa concluir cada bloco de áudio rápido o bastante para manter o fluxo do microfone contínuo. Configure primeiro um sinal local confiável e depois conecte-o a um aplicativo de chamada, gravação ou streaming.

## Escolha uma ferramenta para o trabalho

Consulte o [diretório de ferramentas RVC](../reference/tools.md) para downloads e notas de hardware, incluindo Vonovox para GPUs NVIDIA.

| Ferramenta | Por onde começar |
| --- | --- |
| Vonovox | Um conversor em tempo real para modelos RVC V2 no Windows com GPU NVIDIA. Baixe uma compilação para sua GPU, carregue o modelo e teste seu microfone com fones de ouvido antes de rotear o sinal convertido para outro aplicativo. [Downloads Vonovox](https://huggingface.co/dr87/vonovox/tree/main) · [Documentação do projeto](https://github.com/dr87/Vonovox) |
| RVC WebUI (Mainline - Original RVC) | O projeto original oferece uma WebUI de treino e inferência junto com uma GUI dedicada ao tempo real. Consulte as instruções de lançamento e execução para a plataforma que você usa. |
| Applio | Suas interfaces Desktop e Gradio têm fluxos próprios em tempo real. Siga as instruções de configuração para a interface e versão instaladas. |
| w-okada VCClient | Um modificador de voz para uso ao vivo. A disponibilidade de RVC depende da edição do lançamento e da plataforma. Verifique modelos suportados antes de instalar uma compilação. [w-okada VCClient](https://github.com/w-okada/voice-changer) |
| Deiteris e Tg-Develop | Forks independentes do w-okada com compilações e ajustes próprios. Leia as notas de lançamento do fork antes de aplicar instruções de outra edição. [Repositório Deiteris](https://github.com/deiteris/voice-changer) · [Repositório Tg-Develop](https://github.com/tg-develop/voice-changer) |

## Ouça primeiro um sinal limpo

1. Conecte um microfone e fones de ouvido. No conversor, selecione seu microfone físico como entrada e seus fones como saída.
2. Carregue um modelo de inferência compatível conhecido e seu índice correspondente se usar recuperação. Uma breve [conversão de arquivo](../start/getting-started.md) bem-sucedida é uma referência útil antes de testar o caminho ao vivo.
3. Inicie o fluxo e fale em volume normal. Confira o medidor de entrada ou faça uma gravação seca. Reduza o ganho de entrada se os picos cliparem antes da conversão.
4. Verifique se o sinal nos fones muda ao ativar/desativar a conversão. Se ouvir o original ao mesmo tempo, verifique monitoramento direto por hardware ou uma segunda rota no sistema operacional.
5. Teste por mais tempo que uma única palavra. Inclua fala baixa, uma frase alta e uma pausa curta. Ouça se há cortes, desvios ou falhas sob a mesma carga de trabalho planejada para o ao vivo.

Evite ouvir em caixas de som perto de um microfone ativo. Fones de ouvido ajudam a identificar problemas de roteamento sem devolver a saída para a entrada.

## Entenda os papéis dos dispositivos e backends de áudio

> **Roteamento de Áudio Correto (Correct Audio Routing)**
>
> **1. Dentro do Voice Changer**
> - **Dispositivo de Entrada:** Seu microfone físico.
> - **Dispositivo de Saída:** `Line 1` (VAC, recomendado) ou `CABLE Input` (VB-CABLE).
>
> **2. Dentro do Discord, Jogos, OBS ou Outros Aplicativos**
> - **Dispositivo de Entrada:** `Line 1` (VAC, recomendado) ou `CABLE Output` (VB-CABLE).
> - **Dispositivo de Saída:** Seus fones de ouvido (fortemente recomendados em relação a caixas de som).
>
> ```text
> Seu Microfone → Voice Changer → Line 1 (VAC) ou CABLE Input/Output (VB-CABLE) → Discord / Jogo / OBS
> ```
>
> O áudio vindo do Discord, do jogo ou de outros apps deve ir diretamente para seus **fones de ouvido** (nunca de volta para o cabo virtual).
>
> - **VAC vs. VB-CABLE:** **VAC** (`Line 1`) é sempre recomendado. Se você também (ou apenas) tiver o **VB-CABLE** instalado, lembre-se de que o voice changer envia para **`CABLE Input`** enquanto o Discord / jogos escutam **`CABLE Output`**.
> - **Caixas de som e vazamento de fones:** Evite usar caixas de som; o som delas pode vazar para o microfone e causar áudio duplo, eco ou converter também a voz de outras pessoas. Isso também pode acontecer com fones de ouvido se o volume estiver muito alto ou as conchas não forem fechadas e isoladas o bastante.
> - **Monitoramento:** Ouvir sua própria voz convertida nos fones é um recurso opcional separado para ativar apenas quando necessário. Evite caminhos de áudio duplicados, eco e loopback.

Antes de conectar qualquer aplicativo, entenda o que cada ponto faz:

| Termo | O que é |
| --- | --- |
| **Input Device** | Seu microfone físico (ou canal de interface de áudio) enviando voz bruta ao voice changer. |
| **Output Device** | Para onde vai a voz convertida (seu **ponto de reprodução do cabo virtual** para Discord/OBS/jogos, ou fones para um teste local). |
| **Monitor Device** | Segunda saída opcional para ouvir sua própria voz convertida nos fones enquanto **Output Device** alimenta um cabo virtual. |
| **Virtual Cable Input** *(lado Reprodução)* | Aparece em Reprodução do Windows (ex.: `Line 1` no VAC Lite ou `CABLE Input` no VB-CABLE). Defina como **Output Device** do voice changer. |
| **Virtual Cable Output** *(lado Gravação)* | Aparece em Gravação do Windows (ex.: `Line 1` no VAC Lite ou `CABLE Output` no VB-CABLE). Selecione como **Microfone** no Discord, OBS ou jogos. |

### Microfones USB, interfaces de áudio e backends

- **Microfones USB:** Conecte diretamente em uma porta USB traseira da placa-mãe (evite hubs sem fonte), ajuste o formato do Windows para **48000 Hz** e desative a suspensão seletiva USB se o microfone desconectar.
- **Interfaces de áudio (XLR):** Use **ASIO** quando suportado pelo voice changer (como RVC Blue ou w-okada) para menor latência de buffer de driver, ou **WASAPI** ao rotear para cabos virtuais padrão do Windows.
- **WASAPI Shared vs. WASAPI Exclusive:** **WASAPI Shared** é o ponto de partida mais seguro porque o Windows e cabos virtuais podem compartilhar fluxos `48000 Hz` sem problemas. **WASAPI Exclusive** ignora o mixer do Windows para menor latência de driver quando suportado, mas bloqueia o dispositivo para que outros apps não possam compartilhá-lo.

## Configuração específica por aplicativo (Discord, OBS, jogos, chamadas, gravação)

- **Discord / apps de chamada:** Defina **Input Device** como o ponto de gravação do seu cabo virtual (`Line 1` / `CABLE Output`), defina **Output Device** como seus fones de ouvido e desative (**OFF**) Krisp, cancelamento de eco e sensibilidade automática de entrada se o Discord cortar respirações ou finais de palavras.
- **OBS Studio e gravação local:** Adicione uma fonte **Captura de Entrada de Áudio** apontando para o ponto de gravação do cabo virtual, silencie qualquer fonte separada de microfone bruto e grave um pequeno clipe de teste para checar sincronia e níveis.
- **Jogos:** Selecione o ponto de gravação do cabo virtual como microfone dentro do jogo (ou defina como dispositivo padrão de comunicação no Windows). Sempre limite os FPS do jogo ou deixe folga de GPU para o jogo não sufocar o voice changer.

## Envie o áudio convertido para outro aplicativo

Um dispositivo de áudio virtual oferece um ponto de reprodução para o conversor e um ponto de gravação correspondente para o aplicativo receptor. Os nomes dependem do driver. Por exemplo, um cabo virtual pode chamar seu ponto de reprodução de "Input" e seu ponto de gravação de "Output" porque as instruções usam a perspectiva do cabo.

```text
Microfone físico → Conversor RVC → ponto de reprodução virtual
                                               ↓
                                ponto de gravação correspondente → chamada ou stream
```

Selecione o ponto de gravação correspondente como microfone no aplicativo receptor e faça lá uma breve gravação de teste. Se seu monitor local soar certo mas a gravação não, verifique a entrada de destino e remova qualquer fonte de microfone duplicada. Se monitorar o áudio convertido, use uma saída de fones separada. Evite rotear todo o mix da área de trabalho ou o áudio do app receptor de volta para o conversor.

## Ajuste a latência sem perder estabilidade

**Latência de processamento vs. latência total ponta a ponta:** O **GPU Delay** / tempo de inferência mostrado dentro do voice changer é **apenas** quanto tempo a GPU leva para converter um bloco. A **latência total ponta a ponta** soma buffer de entrada do micro, **Block Size / Chunk Size**, sobrecarga de crossfade/contexto, buffer do cabo virtual e buffers de áudio do Discord/OBS/jogo. Não confunda um GPU Delay baixo (ex.: `15 ms`) com a latência total de ida e volta.

| Controle | Ajuste prático |
| --- | --- |
| Tamanho do bloco ou chunk | Aumente se a fala falhar sob carga. Quando estiver estável, teste um valor menor e mantenha apenas se a fala normal continuar limpa. Blocos menores deixam menos tempo para processar. |
| Crossfade | Aumente com cautela se ouvir emendas ásperas entre blocos. Altera como blocos vizinhos se sobrepõem. |
| Contexto extra | Teste menos contexto se o conversor atrasar. Ajuda o modelo a acompanhar transições, ao custo de mais processamento. |
| Preditor de tom | Se uma configuração gerar tempo instável, compare os preditores disponíveis com as mesmas frases. Escolha o que lida com sua extensão vocal com folga suficiente. |
| Detecção de silêncio ou limiar de entrada | Abaixe um limiar que corte sílabas fracas. Avalie durante pausas e fala baixa, não apenas em entrada alta contínua. |
| Taxa do dispositivo | Verifique as taxas de amostragem do dispositivo e do cabo virtual se ouvir velocidade estranha ou estalos. Comece com ajustes compatíveis em toda a cadeia. |

Comece pelos padrões do aplicativo e mude uma configuração por vez. Se um jogo ou outro programa pesado de GPU compartilhar a máquina, repita o teste enquanto ele estiver rodando. Salve um perfil funcional para restaurar antes de entrar ao vivo. [GUI em tempo real RVC WebUI (Mainline - Original RVC)](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/main/realtime_gui.py)

## Solucione problemas por onde a falha aparece

| Sintoma | O que verificar primeiro |
| --- | --- |
| Nem o medidor do conversor nem uma gravação seca do microfone respondem | Verifique permissões de microfone do Windows, chave física de mudo e seleção de Input Device. |
| O microfone seco funciona, mas a saída convertida fica muda | Confirme que o fluxo iniciou, o modelo carregou e o Output Device está correto. Abaixe o limiar VAD/silêncio. |
| O monitor local funciona, mas a chamada recebe a voz original | Selecione o ponto de gravação virtual (`CABLE Output` / `Line 1`) como microfone da chamada e desative qualquer fonte separada de micro bruto. |
| Monitoramento duplo / eco / microfonia | Nunca use caixas de som perto de um microfone ativo. Desative **"Escutar o dispositivo"** no Windows se o app já monitora, e nunca envie áudio do desktop/chamada para o cabo virtual. |
| Estalos, engasgos ou falta de buffer | Alinhe **todos** os pontos (Microfone, Fones, Cable Input/Output) em **48000 Hz** (`mmsys.cpl`), aumente **Block/Chunk Size** um degrau e verifique sobrecarga de CPU. |
| Voz robótica ou sílabas cortadas | Extrator de tom pesado demais (`crepe` full) -> mude para **RMVPE** ou **FCPE**, ou reduza **Index Ratio**. |
| **GPU Delay** alto ou estalos apenas ao jogar | **Saturação de GPU**: limite FPS no jogo, reduza ajustes pesados de GPU ou aumente **Block Size**. |
| Um modelo funciona em arquivo mas falha ao vivo | Verifique a edição do cliente ao vivo, arquitetura e suporte a embedder. Teste um modelo listado como compatível nesse cliente antes de mexer nos dispositivos de áudio. |

[Fundamentos de RVC](../start/rvc-fundamentals.md) · [Solução de problemas](../reference/troubleshooting.md)

## RVC Blue

Conversão de voz desktop no Windows. [Instalação e configuração](../other-rvcs/voice-changers/rvc-blue/installation.md).
