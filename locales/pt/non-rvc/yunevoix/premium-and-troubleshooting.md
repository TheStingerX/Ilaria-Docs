---
label: "Premium, licença e ajuda"
icon: ":wrench:"
order: 96
permalink: /non-rvc/yunevoix/premium-and-troubleshooting/
---
# Premium, licença e resolução de problemas

## YuneVoix PREMIUM: Song Cover e Karaoke

Os apoiantes no [Ko-fi](https://ko-fi.com/yunevoix) ganham acesso ao **YuneVoix PREMIUM**, que desbloqueia funcionalidades musicais offline além de tudo o que existe no BASIC:

- **Song Cover**: escolhe uma música e uma voz alvo. O YuneVoix separa a voz do instrumental, converte a voz principal (e opcionalmente os coros) e mistura tudo de novo.
  - **Formatos suportados**: WAV, MP3, FLAC, M4A, AAC, OGG, WMA, AIFF (até **15 minutos**).
  - **Tempo de processamento**: cerca de **1,3×** a duração da música (uma música de 5 minutos demora cerca de 6–7 minutos).
  - **Formatos de saída**: **WAV 24-bit** ou **MP3 320 kbps**.
- **Karaoke**: canta acompanhando as letras no ecrã; a tua gravação é convertida para a voz escolhida e misturada com a música, ajustada à tonalidade e ao nível do original.

### Dicas para Song Cover

- **Tom errado**: define manualmente **Settings → Song Cover → Octave** para **`−12`**, **`0`** ou **`+12`** em vez de `Auto`.
- **Duetos e coros**: **"Lead vocal only"** dá o resultado mais limpo. Se houver dois cantores principais, ambos recebem a voz escolhida (não é possível isolar apenas um).
- **Direitos de autor**: a música continua a pertencer aos respetivos autores — verifica as regras da plataforma e os direitos antes de publicar covers.

## Licença PREMIUM e ativação

1. Abre o separador **Song Cover** e clica em **"Copy request code"**.
2. Envia o código juntamente com a tua compra no Ko-fi.
3. Receberás um ficheiro `license.yvl`. Clica em **"Load license…"** e seleciona-o.

### Como funciona a licença

- **Nunca expira** e funciona **100% offline**.
- **Atualizações**: copia `license.yvl` para junto do novo `YuneVoix.exe` (ou volta a carregá-lo).
- **Um PC por licença**: copiar a pasta PREMIUM ou a licença para outro computador não desbloqueia o Song Cover lá.
- **Alterações de hardware**: a licença está associada à **motherboard**, ao **disco do sistema** e à **instalação do Windows**.
  - Mudar **um** deles não tem problema (e atualizar GPU, RAM ou monitor não conta de todo).
  - Mudar **dois ao mesmo tempo** (por exemplo, novo disco do sistema com instalação limpa do Windows) requer uma nova licença: copia o novo request code e contacta o suporte com a tua encomenda.

## Resolução de problemas

| Sintoma | O que verificar primeiro |
| --- | --- |
| **Voz robótica, baixa ou "debaixo de água"** | Aumenta o ganho do microfone no Windows para que a fala forte atinja picos perto de **−6 dBFS** (`Settings → General → Microphone level`) e mantém Input cleaning em **`DF3`**. |
| **Oitava errada / voz de esquilo** | Em `Settings → Pitch & Autotune`, ajusta **Pitch shift** (`+12` homem→mulher, `0` mesmo registo, `−12` mulher→homem) ou ativa o pitch automático. |
| **Risos, respirações ou sussurros desaparecem** | Desativa **Speech gate**, muda Input cleaning para **`Gentle`** (em sala silenciosa) e experimenta o motor **WavLM+** (suportado em NVIDIA e AMD DirectML). |
| **AMD: fecha ao carregar em START / WavLM+ ou FlowEdit indisponíveis** | Atualiza para a **v0.7.1** (corrige falhas em CPUs com gráfica AMD integrada ao usar DirectML na GPU dedicada por predefinição). Se ativaste o MIGraphX experimental em `Settings → General → "AMD graphics engine"`, volta a **DirectML** e reinicia para reativar `WavLM+` e `FlowEdit 3+1`. |
| **Estalidos ou breves cortes** | Aumenta **Output buffer** (`Settings → General`), fecha outras apps que usem a GPU, reduz **Model steps** ou o tamanho do prompt e desativa **Harmony**. |
| **Engasgos durante jogos** | Baixa os gráficos ou o limite de FPS do jogo, ou reduz **Model steps** e o tamanho do prompt em `Settings → Voice & Timbre`. |
| **Explorador do Windows diz que o ZIP é inválido** | Usa **7-Zip** ou **WinRAR** (o arquivo usa encriptação AES-256) com a palavra-passe `yunevoix`. |

## Diagnóstico e suporte

Se algo continuar a não funcionar:

1. Abre a Linha de Comandos na pasta do YuneVoix (escreve `cmd` na barra de endereços do Explorador e prime Enter).
2. Executa:
   ```bat
   YuneVoix.exe --check
   ```
3. Envia o ficheiro **`check.txt`** gerado juntamente com **`live-diag.log`** ao pedir ajuda em **`yune-support`**, por DM ou em [ko-fi.com/yunevoix](https://ko-fi.com/yunevoix).
