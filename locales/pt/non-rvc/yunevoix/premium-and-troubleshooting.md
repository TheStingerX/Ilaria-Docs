---
label: "Premium, Licença e Ajuda"
icon: ":wrench:"
order: 94
permalink: /pt/non-rvc/yunevoix/premium-and-troubleshooting/
description: "Licenciamento YuneVoix PREMIUM (Song Cover e Karaoke), ativação offline, regras de hardware, solução de problemas expandida NVIDIA e AMD e diagnósticos."
---
# Premium, Licença e Solução de Problemas

## YuneVoix PREMIUM: Song Cover e Karaoke

Apoiadores no [Ko-fi](https://ko-fi.com/yunevoix) ganham acesso ao **YuneVoix PREMIUM**, que desbloqueia recursos musicais offline além de tudo no BASIC:

- **Song Cover:** Escolha qualquer música e voz de destino. O YuneVoix separa os vocais do instrumental, converte a voz principal (e opcionalmente os backing vocals) e mixa tudo novamente.
- **Karaoke:** Cante junto com letras na tela; sua gravação é convertida para a voz escolhida e mixada com a música, ajustada ao tom e ao nível da original.

Para tutoriais completos passo a passo e todas as configurações de Song Cover / Karaoke, veja **[Song Cover e Karaoke - Guia Completo para Iniciantes](song-cover-karaoke.md)**.

---

## Licença PREMIUM e Ativação

1. Abra a aba **Song Cover** e clique em **"Copy request code"**.
2. Envie o código de solicitação junto com sua compra no Ko-fi.
3. Você receberá um arquivo `license.yvl`. Clique em **"Load license…"** e selecione-o (ele é copiado ao lado de `YuneVoix.exe`).

### Como funciona a licença

- **Nunca expira** e funciona **100% offline**.
- **Atualizações:** Copie `license.yvl` para o lado do novo `YuneVoix.exe` (ou carregue novamente).
- **Um PC por licença:** Uma pasta PREMIUM ou licença copiada não desbloqueará o Song Cover em outro computador.
- **Mudanças de hardware:** A licença é vinculada à sua **placa-mãe**, **disco do sistema** e **instalação do Windows**.
  - Trocar **um** deles não tem problema (e atualizar GPU, RAM ou monitor não conta).
  - Trocar **dois de uma vez** (ex.: um novo disco do sistema com uma instalação limpa do Windows) requer uma nova licença - copie o novo código de solicitação e fale com o suporte informando seu pedido.

---

## Solução de Problemas

| Sintoma | O que tentar primeiro |
| --- | --- |
| **Voz robótica, baixa ou "debaixo d'água"** | Aumente o ganho do microfone no Windows para que falas altas tenham picos perto de **−6 dBFS** (`Settings → General → Microphone level`) e mantenha Input cleaning em **`DF3`**. |
| **Digitação ou cliques viram tons** | Defina Input cleaning (`Settings → General`) como **`DF3`**. |
| **Chiado ou "granulação" nos agudos** | Mantenha **Smooth top** em `100%` e **Brightness** em `0 dB` (`Settings → EQ & Filters`). |
| **Oitava errada / som de esquilo** | Em `Settings → Pitch & Autotune`, ajuste **Pitch shift** ou teste **Automatic pitch** (`Octave from the target voice` para canto; `Match the target voice's pitch` para fala). |
| **Risadas, respirações ou sussurros somem** | Desative **Speech gate**, mude Input cleaning para **`Gentle`** (em sala silenciosa), teste **WavLM+** (NVIDIA e AMD DirectML) ou defina **Model method** como **`FlowEdit 3+1`** (exige uma amostra de 5-20 s da sua própria voz). |
| **FlowEdit mantém ruído de fundo ou eco da sala** | Ative a limpeza de entrada **`DF3`**, grave em um ambiente mais silencioso ou volte **Model method** para **`Classic`**. |
| **Estalos ou curtas interrupções** | Defina **Model method** como **`Learned 4 steps`**, encurte **Prompt length**, aumente **Output buffer** (`Settings → General`) e feche outros apps pesados de GPU. |
| **Engasgos enquanto joga** | Limite os **FPS** do jogo e reduza os gráficos do jogo, defina **Model method** como **`Learned 4 steps`**, encurte **Prompt length** e desative **Harmony**. |
| **LIVE parou: "the audio device stopped working"** | Seu microfone ou saída foi desconectado ou alterado. Reconecte-o, clique em **Refresh devices** e pressione **START**. |
| **AMD: fecha ao clicar em START / `ShapeInferenceNotRegistered`** | Atualize para a **v0.7.1** (usa **DirectML** na GPU dedicada por padrão, corrigindo tanto fechamentos quando há gráfico integrado AMD quanto `ShapeInferenceNotRegistered` quando o gráfico integrado está desativado). Verifique `check.txt` para a placa/motor ativo e mantenha os drivers Adrenalin atualizados. |
| **AMD: FlowEdit volta para fallback ou WavLM+ indisponível** | Verifique `Settings → General → "AMD graphics engine"`. Se você ativou o **MIGraphX** experimental, volte para **DirectML** e reinicie (`WavLM+` e `FlowEdit 3+1` não estão disponíveis no MIGraphX). Certifique-se também de que `Sample of your voice…` esteja definido para FlowEdit no LIVE. |
| **Explorador de Arquivos do Windows diz que o ZIP é inválido** | Use **7-Zip** ou **WinRAR** (ZIP criptografado com AES-256) com a senha `yunevoix`. |

---

## Diagnósticos e Suporte

Se algo ainda não funcionar:

1. Abra o Prompt de Comando na pasta do YuneVoix (digite `cmd` na barra de endereços do Explorador de Arquivos e pressione Enter).
2. Execute:
   ```bat
   YuneVoix.exe --check
   ```
3. **Arquivos criados ao lado de `YuneVoix.exe`:**
   - **`check.txt`**: relatório de hardware, edição, licença e detecção de GPU/motor.
   - **`live-diag.log`**: log de diagnóstico da sessão atual.
   - **`live-diag.prev.log`** e **`crash.log`**: log anterior e detalhes da falha preservados após um crash.
4. Envie **`check.txt`** e **`live-diag.log`**; após um crash envie também **`live-diag.prev.log`** e **`crash.log`** (todos ficam ao lado de `YuneVoix.exe`).
5. **Teste de velocidade AMD (opcional):** Você pode executar `YuneVoix.exe --bench` para gerar `bench.txt`, `bench_ort.log` e `bench_output.wav` mostrando a velocidade diagnóstica na sua placa AMD específica (os resultados variam conforme a placa e o sistema).
6. *(Lembrete de privacidade)* Antes de compartilhar logs ou arquivos WAV opcionais de **Save diagnostic recordings** em **`yune-support`**, por DM para **Kuroyuki** (`sxxyneko` no Discord) ou em [ko-fi.com/yunevoix](https://ko-fi.com/yunevoix), verifique se há nomes de usuário pessoais, caminhos de arquivos ou fala privada.
