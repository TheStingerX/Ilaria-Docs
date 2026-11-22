# Registro de Alterações do YuneVoix

## v0.7.1 (2026-11-20)

*Alterações desde a v0.7.0.*

### Corrigido

- **AMD**: corrigido um problema em que o YuneVoix fechava ao pressionar **START** em computadores cujo processador também possui gráficos integrados AMD, e com os gráficos integrados desativados parava com `ShapeInferenceNotRegistered`. O pacote AMD agora usa **DirectML** na placa dedicada por padrão (sem download do Windows Update, sem compilação inicial de modelos). **MIGraphX** ainda pode ser escolhido em `Settings → General → "AMD graphics engine"` (experimental, aplica após reiniciar). Licenças, vozes e configurações da `v0.7.0` continuam funcionando.

### Novo

- **AMD**: Windows 10 e versões do Windows 11 anteriores à 24H2 voltam a ser suportados (`24H2` é necessário apenas para o motor experimental **MIGraphX**).
- **AMD**: o motor de conteúdo **`WavLM+`** e o método de modelo **`FlowEdit 3+1`** agora também funcionam em placas AMD (**DirectML**) - no **LIVE**, **covers** e **karaoke**. Quando **AMD MIGraphX** está selecionado, eles não ficam disponíveis.

---

## v0.7.0 (2026-11-19)

*Alterações desde a v0.6.0.*

### Novo

- **Model method** (`Settings → Voice & Timbre`, e separadamente em `Settings → Song Cover` para covers e karaoke; aplica-se no próximo **START**):
  - **Classic**: igual a antes (opções de passos, solver e guidance).
  - **Learned 4 steps**: ajustado para soar como 10 passos usando cerca de **40%** do tempo de GPU e menos VRAM - ótimo para jogar e placas mais lentas.
  - **FlowEdit 3+1 (NVIDIA)** *(AMD: desde a v0.7.1)*: parte da sua própria voz em vez de ruído e muda apenas a identidade vocal, de modo que respirações, sussurros, risadas e articulação passam muito melhor (cerca de **60%** do tempo de GPU do modelo). No **LIVE**, usa sua amostra de voz (`Voice & Timbre → "Sample of your voice…"`; se definida em versão anterior, selecione-a novamente uma vez). Em covers e karaoke, usa o próprio vocal. Funciona tanto com **Whisper** quanto com **WavLM+**. Sem amostra de voz ou no AMD MIGraphX, o FlowEdit volta para **Learned 4 steps** (exibido na linha de status LIVE).
- **Karaoke (PREMIUM)**: cante você mesmo uma música com letras na tela - o YUNE converte seu canto na voz escolhida e o mixa com a música. As letras são sincronizadas automaticamente (texto colado ou `.lrc`; japonês também em romaji).
  - Cante junto com o instrumental (separado em **PREPARE**) ou com a música original (inicia em segundos; separada no primeiro render).
  - Rolagem suave com a linha atual centralizada; `Space` = pausar, `Esc` = parar (termina 5 s depois), `F11` = tela cheia, além de um medidor de microfone na janela de letras.
  - `Settings → Karaoke`: fones de ouvido, microfone, volume do vocal original e música, tamanho da letra, limpeza da gravação (`DF3`), motor de conteúdo, oitava, puxar para a melodia original, nível vocal, reverb, backing vocals, seguir o nível do vocal original, abrir espaço para o vocal e suavizar vocal fry.
  - **Correspondência de tom**: cantar alguns semitons acima ou abaixo não desafina mais o cover; **"Pull to the original melody"** corrige as notas.
  - **"Follow the original vocal's level"**: segue a dinâmica do original e passa picos por um limiter em vez de abaixar o cover inteiro.
  - **"Make room for the vocal"** (ligado por padrão): atenua a música principalmente nas bandas `1-4 kHz` enquanto você canta, deixando trechos instrumentais intactos.
  - **Karaoke octave `Auto`**: acompanha o registro do cantor original mantendo-se dentro da extensão da voz de destino.
- **"Smooth out vocal fry"** (`Settings → Voice & Timbre`, e `Settings → Karaoke`): mantém sonoras falas/cantos muito graves ou crepitantes e suaviza saltos de tom sem perder a soprosidade.
- **Monitoramento no LIVE** (`Settings → General`): níveis de entrada e saída em dB com luz de limiter, **"Listen to input"** (o que o motor ouve após limpeza) e **"Listen to output"** (voz convertida) em um dispositivo de monitoramento separado.

### Melhorado

- **Jogos e LIVE**: enquanto o LIVE roda, o YuneVoix eleva sua própria prioridade (processo, GPU, threads de áudio) e desativa a redução de desempenho em segundo plano do Windows (também no Windows 10) para que jogos em tela cheia interfiram menos na voz.
- **Atraso de entrada menor e mais estável**: o microfone é lido assim que o Windows tem novo áudio (cerca de a cada **10 ms** em vez de 50 ms).
- **Takes do Karaoke**: compensa desvio de clock entre microfone e fones, salva takes em segundo plano e avisa se nenhuma voz foi gravada ou se o microfone distorceu.
- Arquivos de letra em codificações legadas (como **Shift-JIS** japonês) abrem corretamente.
- A sincronização de letras roda na CPU em placas não NVIDIA (pacote AMD).
- Começar a cantar no Karaoke libera o motor LIVE da GPU.
- **"Play sample"** no Voice Bank agora toca na saída padrão do Windows (seus fones), não na saída LIVE.
- **Microphone level** em `Settings → General` é exibido em dB.
- Novas dicas integradas (*"Playing games with YUNE"*, *"Monitoring and audio devices"*, *"Karaoke"*, além de dicas sobre método de modelo e vocal fry) e um `FAQ.txt` expandido incluído no pacote.

### Corrigido

- Desconectar ou trocar um dispositivo de áudio durante LIVE ou Karaoke agora para de forma limpa e explica o motivo em vez de permanecer silenciosamente "rodando".
- Um dispositivo desconectado na inicialização não é mais substituído silenciosamente por outro dispositivo nas configurações.
- Mensagens claras e legíveis para erros de áudio comuns (modo exclusivo, bloqueio de privacidade do microfone no Windows, formato não suportado, dispositivo desconectado, serviço de Áudio do Windows parado).
- Microfones de 24 bits compactados são lidos corretamente no LIVE.
- Salvamento seguro de configurações (evita redefinições em crash/queda de energia) com cópia de backup.
- Imposição de instância única (apenas uma janela do YuneVoix por vez).
- Preserva o log anterior (`live-diag.prev.log`) e `crash.log` após um crash para suporte.
- Gravações de diagnóstico param automaticamente após 10 minutos e voltam a ficar desativadas a cada início.
- **Cancel** agora encerra tarefas sem resposta.
- Mensagem de erro clara se o pacote NVIDIA for iniciado sem uma GPU NVIDIA; o pacote AMD também roda em outras placas compatíveis com DirectML.

### Compatibilidade

- Licenças **PREMIUM** da `v0.6.0` continuam funcionando: copie `license.yvl` ao lado do novo `YuneVoix.exe`, junto com `models\yune\voices`, `yune.json` e `settings.json`. Novas opções iniciam com seus valores padrão (`Model method: Classic`).

---

## v0.6.0 (2026-11-05)

*Alterações desde a v0.4.0 (`v0.5.0` foi uma build interna nunca lançada).*

### Novo

- **Duas edições**: **BASIC** (conversão de voz ao vivo, Voice Bank, todos os efeitos) e **PREMIUM** (tudo do BASIC + Song Cover).
- **Licença PREMIUM por PC**: `Song Cover → "Copy request code"` → `"Load license…"` (sem expiração, offline, válida se mudar 1 entre placa-mãe / disco do sistema / instalação do Windows).
- **Motor de conteúdo `WavLM+`** (`Settings → Voice & Timbre → Content engine`; `Settings → Song Cover` para covers - **apenas NVIDIA**; *AMD: desde a v0.7.1*): fala ao vivo mais nítida, preserva suas risadas, sussurros e respirações e reduz zumbido em risadas/suspiros. `Whisper` continua sendo o padrão para fidelidade de timbre mais próxima.
- **Alternância "Silence stays silent"** (`Settings → EQ & Filters → YUNE output` e `Settings → Song Cover`; ligada por padrão).
- **Link do Ko-fi** (`ko-fi.com/yunevoix`) e selo da edição exibidos abaixo do número da versão.

### Alterado e Removido

- Descrições e dicas mais curtas e precisas em todos os seis idiomas, correspondendo aos nomes dos botões.
- `YuneVoix.exe --check` também informa a edição, o estado da licença PREMIUM e os arquivos do modelo `WavLM+`.
- **Removido** o vocoder `BigVGAN` - **PC-NSF** agora é o único vocoder (anteriormente padrão, melhor para canto e respiração).
- Removidas referências desatualizadas ao filtro de artefatos de quadro (removido na `v0.4.0`).
