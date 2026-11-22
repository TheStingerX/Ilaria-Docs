# YuneVoix Song Cover e Karaoke - Guia Completo para Iniciantes

[Visão Geral e Requisitos](overview.md) · [Configurações e Qualidade de Áudio](settings.md) · [Premium, Licença e Ajuda](premium-and-troubleshooting.md)

**Song Cover** e **Karaoke** são recursos musicais offline desbloqueados no **YuneVoix PREMIUM** (`license.yvl`). Diferente do modo **LIVE**, Song Cover e Karaoke possuem suas próprias abas de configurações dedicadas para que ajustes no LIVE não alterem acidentalmente seus renders de cover.

---

## 1. Song Cover (Passo a Passo)

O Song Cover separa uma música em vocal e instrumental, converte os vocais para a voz escolhida do seu Voice Bank e mixa a faixa finalizada (levando cerca de **1.3×** a duração da música na GPU - por exemplo, uma música de 5 minutos leva cerca de 6-7 minutos conforme notas do desenvolvedor).

1. Abra a aba **Song Cover** (requer uma `license.yvl` ativa).
2. **Escolha sua música:** Carregue um arquivo de áudio (WAV, MP3, FLAC, M4A, AAC, OGG, WMA ou AIFF, de até **15 minutos**).
3. **Selecione a voz de destino:** Escolha uma voz `.yvoice` do seu Voice Bank.
4. **Configure a separação vocal:**
   - **Vocal separator:** **`YUNE`** (padrão, recomendado, ~2× mais rápido).
   - **Vocals to convert:** **`Lead vocal only`** (padrão, resultado mais limpo).
5. **Abra `Settings → Song Cover`** *(ou clique em **Copy settings from LIVE** duas vezes para puxar modelo, timbre, filtros e efeitos do LIVE)*.
6. **Defina Octave:** Deixe em **`Auto`** (padrão); se a saída soar aguda ou grave demais, defina `−12`, `0` ou `+12`.
7. **Escolha Content engine:** **`Whisper`** (padrão, timbre mais próximo) ou **`WavLM+`** (menos zumbido em notas soprosas, palavras levemente menos exatas; suportado em NVIDIA e AMD DirectML).
8. **Escolha Model e Model method:**
   - **Model:** **`base`** (padrão, recomendado) ou **`fine-tuned`**.
   - **Model method:** **`Classic`** (`10 × Euler` recomendado para covers), **`Learned 4 steps`** ou **`FlowEdit 3+1`**.
   - **Prompt length** (`20 s`), **Timbre change** (`50%`), **Roughness** (`off`), **CFG** (`0.7`) e **Fix pitch detector errors** (`on`) correspondem aos seus equivalentes no LIVE.
9. **Configure nível, reverb e formato de exportação:**
   - **Vocal level:** `+2 dB` (padrão).
   - **Vocal reverb:** nível próprio `−17 dB` (padrão), igual ao original ou nenhum.
   - **Keep the separated tracks:** `Off` (padrão); ative **On** para pular a separação se for renderizar a mesma música novamente.
   - **File format:** **`WAV 24-bit`** (padrão) ou **`MP3 320 kbps`** (requer o codificador MP3 do Windows).
10. **Gere e exporte** o cover.

### FlowEdit 3+1 no Song Cover

Diferente do modo LIVE, **FlowEdit 3+1 no Song Cover usa o próprio vocal original separado da música como fonte**, e não a sua amostra `my_voice.yvoice`. Isso significa que o FlowEdit no Song Cover busca manter as respirações e a articulação do cantor original sem exigir uma gravação da sua própria voz.

---

## 2. Karaoke (Passo a Passo: PREPARE → SING → RENDER COVER)

O Karaoke permite que você cante uma música com letras sincronizadas na tela, e então converte seu vocal gravado para a voz de destino e o mixa na faixa.

### Passo 1: PREPARE

1. Abra a aba **Karaoke** e carregue sua **música** e **letra** (texto simples colado ou arquivo `.lrc`; japonês também funciona em romaji, e codificações legadas como Shift-JIS são suportadas).
2. Em **`Settings → Karaoke`**, escolha **Sing along to**:
   - **`Backing track`** (padrão): separa a música durante **PREPARE** (2-3 minutos na primeira vez) e oferece o alinhamento de letra mais preciso.
   - **`Original song`**: começa em segundos e executa a separação no primeiro render.
3. Clique em **PREPARE**. Se a letra atrasar ou adiantar um pouco, sua correção de sincronia é lembrada.

### Passo 2: SING

1. Confira **Headphones** (saída padrão do Windows) e **Microphone** (igual ao LIVE) em `Settings → Karaoke`.
2. Clique em **SING** para abrir a janela de letras (iniciar o Karaoke libera o motor LIVE da GPU).
3. **Controles da janela de letras:**
   - **`Space`:** Pausar / retomar.
   - **`Esc`:** Parar de cantar (o cover termina 5 segundos após parar).
   - **`F11`:** Alternar tela cheia.
4. Observe o medidor de microfone integrado e cante a música inteira (o YuneVoix compensa desvio de clock e avisa se nenhuma voz foi gravada ou se o microfone clipou).

### Passo 3: RENDER COVER

1. Ajuste as opções de mixagem em **`Settings → Karaoke`** se necessário.
2. Clique em **RENDER COVER**. Modelo, método de modelo, timbre, filtros, efeitos e formato de arquivo de exportação vêm de **`Settings → Song Cover`**.

### Configurações do Karaoke: Monitoramento vs. Render Final

| Configuração (`Settings → Karaoke`) | Padrão | Afeta o que você ouve cantando | Afeta o cover renderizado final |
| --- | --- | --- | --- |
| **Original vocal in headphones** | `20%` | Sim | Não |
| **Backing vocals** | `On` | Sim | Mantidos no mix |
| **Music volume** | `0 dB` | Sim | Referência de mix |
| **Lyrics size** | `Normal` | Sim (exibição) | Não |
| **Clean the recording** (`Off` / `DF3`) | `Off` | Não | Sim |
| **Content engine** (`Whisper` / `WavLM+`) | `Whisper` | Não | Sim |
| **Octave** | `Auto` (registro do cantor na extensão alvo) | Não | Sim |
| **Pull to the original melody** | `Off` (`50-70%` natural) | Não | Sim |
| **Follow the original vocal's level** | `70%` (dinâmica + limiter) | Não | Sim |
| **Make room for the vocal** | `Up to 60%` (atenua `1-4 kHz` ao cantar) | Não | Sim |
| **Smooth out vocal fry** | `Off` | Não | Sim |

---

## 3. Solução de Problemas do Song Cover e Karaoke

| Sintoma | O que verificar e tentar |
| --- | --- |
| **Letra fora de sincronia** | Use **`Sing along to → Backing track`** em **PREPARE**, carregue um arquivo `.lrc` temporizado se disponível, ou aplique correção de sincronia no Karaoke (salva por música). |
| **Microfone não detectado / nada gravado** | Verifique **Microphone** em `Settings → Karaoke`, permissões de privacidade do microfone no Windows e observe o medidor na janela de letras. |
| **Voz gravada baixa demais** | Aumente o ganho do microfone no Windows para perto de `−6 dBFS`, ative **Follow the original vocal's level** (`70%` padrão) e mantenha **Make room for the vocal** ativado. |
| **Tom errado / desafinado** | Confira **Octave** (`Auto`, `−12`, `0` ou `+12`) e teste **Pull to the original melody** (`50-70%`) em `Settings → Karaoke`. |
| **Engasgos durante o Karaoke** | Feche outros aplicativos pesados de GPU, use **`Backing track`** (já separado no PREPARE) ou verifique as configurações de buffer de áudio. |
| **Música alta demais / voz encoberta** | Aumente **Vocal level** (`+2 dB` padrão), mantenha **Make room for the vocal** ativo ou abaixe **Music volume** enquanto canta. |
| **Respirações ou sussurros perdidos no cover** | Compare **`WavLM+`** vs. **`Whisper`**, ou mude **Model method** para **`FlowEdit 3+1`** em `Settings → Song Cover`. |
| **Excesso de reverb no vocal do cover** | Abaixe **Reverb on the vocal** (`−17 dB` padrão) ou defina como nenhum em `Settings → Song Cover`. |
| **Artefatos de separação vocal / duetos** | Mantenha **Vocal separator** em **`YUNE`** e **Vocals to convert** em **`Lead vocal only`** (duetos com dois cantores principais não permitem isolar automaticamente um único cantor). |

Próximo passo: [Premium, Licença e Ajuda](premium-and-troubleshooting.md).
