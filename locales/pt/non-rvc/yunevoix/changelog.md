---
label: "Changelog"
icon: ":memo:"
order: 95
permalink: /non-rvc/yunevoix/changelog/
---
# Registo de alterações do YuneVoix

## v0.7.1 (20/11/2026)

*Alterações desde a v0.7.0.*

### Correções

- **AMD**: corrigido o problema em que o YuneVoix fechava ao premir **START** em computadores cujo processador também tem gráficos AMD integrados. O pacote AMD passa a usar **DirectML** na placa dedicada por predefinição. **MIGraphX** continua a poder ser escolhido em `Settings → General → "AMD graphics engine"` (experimental, após reiniciar). Licenças, vozes e definições da `v0.7.0` continuam a funcionar.

### Novidades

- **AMD**: o motor de conteúdo **`WavLM+`** e o método de modelo **`FlowEdit 3+1`** agora também funcionam em placas AMD (**DirectML**) — em **LIVE**, **covers** e **karaoke**. Quando **AMD MIGraphX** está selecionado, não ficam disponíveis.

---

## v0.7.0 (19/11/2026)

*Alterações desde a v0.6.0.*

### Novidades

- **Método de modelo** (`Settings → Voice & Timbre`, e em separado em `Settings → Song Cover` para covers e karaoke; aplica-se no próximo **START**):
  - **Classic**: como antes (opções de passos, solver e guidance).
  - **Learned 4 steps**: afinado para soar como 10 passos usando cerca de **40%** do tempo de GPU e menos VRAM — ótimo para jogos e placas mais lentas.
  - **FlowEdit 3+1 (NVIDIA)**: parte da tua própria voz em vez de ruído e muda apenas a identidade vocal, deixando passar muito melhor respirações, sussurros, risos e articulação (cerca de **60%** do tempo de GPU do modelo). Em **LIVE** usa a amostra da tua voz (`Voice & Timbre → "Sample of your voice…"`; se a definiste numa versão anterior, volta a escolhê-la uma vez); em covers e karaoke usa a própria faixa vocal. Funciona com **Whisper** e **WavLM+**. Sem amostra de voz ou em AMD, o FlowEdit recua para **Learned 4 steps** (indicado na linha de estado LIVE).
- **Karaoke (PREMIUM)**: canta uma música com as letras no ecrã — o YUNE transforma o teu canto na voz escolhida e mistura-o com a música. As letras são sincronizadas automaticamente (texto colado ou `.lrc`; japonês também em romaji).
  - Canta sobre a faixa instrumental (separada em **PREPARE**) ou sobre a música original (arranca em segundos; separação na primeira renderização).
  - Deslocamento suave com a linha atual centrada; `Espaço` = pausa, `Esc` = parar (termina 5 s depois), `F11` = ecrã inteiro e medidor de microfone na janela das letras.
  - `Settings → Karaoke`: auscultadores, microfone, volume da voz original e da música, tamanho das letras, limpeza da gravação (`DF3`), motor de conteúdo, oitava, puxar para a melodia original, nível vocal, reverberação, coros, seguir o nível da voz original, abrir espaço para a voz e suavizar vocal fry.
  - **Correspondência de tonalidade**: cantar alguns semitons acima ou abaixo do original já não desafina o cover; **"Pull to the original melody"** corrige as notas.
  - **"Follow the original vocal's level"**: dá à voz convertida uma dinâmica semelhante à original e passa os picos por um limitador em vez de baixar todo o cover.
  - **"Make room for the vocal"** (ativo por predefinição): atenua a música sobretudo nas bandas `1–4 kHz` enquanto cantas, mantendo intactas as partes instrumentais.
  - **Oitava de Karaoke `Auto`**: segue o registo do cantor original mantendo-se dentro do alcance da voz alvo.
- **"Smooth out vocal fry"** (`Settings → Voice & Timbre` e `Settings → Karaoke`): falar ou cantar muito grave ou com voz crepitante já não deixa a voz alvo áspera, mantendo a respiração.
- **Monitorização em LIVE** (`Settings → General`): níveis de entrada e saída em dB com luz de limitador, **"Listen to input"** (o que o motor ouve após a limpeza) e **"Listen to output"** (voz convertida) num dispositivo de monitorização separado.

### Melhorias

- **Jogos e LIVE**: enquanto o LIVE corre, o YuneVoix eleva a sua prioridade (processo, GPU, threads de áudio) e desativa a redução em segundo plano do Windows (também no Windows 10) para que jogos em ecrã inteiro interfiram menos com a voz.
- **Atraso de entrada menor e mais estável**: o microfone é lido assim que o Windows tem som novo (cerca de cada **10 ms** em vez de 50 ms).
- **Gravações de Karaoke**: compensa o desvio de relógio entre microfone e auscultadores, guarda a gravação em segundo plano e avisa se nenhuma voz foi gravada ou se o microfone distorceu.
- Ficheiros de letras em codificações antigas (ex. **Shift-JIS** japonês) abrem corretamente.
- A sincronização de letras corre no processador em placas não-NVIDIA (pacote AMD).
- Começar a cantar em Karaoke liberta o motor LIVE da GPU.
- **"Play sample"** no Voice Bank toca agora na saída predefinida do Windows (os teus auscultadores), não na saída LIVE.
- **Microphone level** em `Settings → General` é mostrado em dB.
- Novas dicas integradas (*"Playing games with YUNE"*, *"Monitoring and audio devices"*, *"Karaoke"*, além de dicas sobre método de modelo e vocal fry) e `FAQ.txt` alargado incluído no pacote.

### Correções

- Desligar ou mudar um dispositivo de áudio durante o LIVE ou Karaoke agora para de forma limpa explicando o motivo, em vez de ficar "em execução" sem som.
- Um dispositivo desligado no arranque já não é substituído automaticamente por outro nas tuas definições.
- Mensagens claras para erros de áudio comuns (modo exclusivo, bloqueio de privacidade de microfone do Windows, formato não suportado, dispositivo desligado, serviço de Áudio do Windows parado).
- Microfones com áudio de 24 bits empacotado são lidos corretamente em LIVE.
- Gravação segura das definições (evita reposições em falhas ou cortes de energia) com cópia de segurança.
- Apenas uma janela do YuneVoix pode correr de cada vez.
- O registo anterior (`live-diag.prev.log`) e `crash.log` são mantidos após uma falha para suporte.
- As gravações de diagnóstico param após 10 minutos e vêm desligadas em cada arranque.
- **Cancel** agora termina tarefas que deixaram de responder.
- Mensagem clara se o pacote NVIDIA for aberto sem GPU NVIDIA; o pacote AMD também corre noutras placas compatíveis com DirectML.

### Compatibilidade

- As licenças **PREMIUM** emitidas para a `v0.6.0` continuam a funcionar: copia `license.yvl` para junto do novo `YuneVoix.exe`, juntamente com `models\yune\voices`, `yune.json` e `settings.json`. As novas opções começam com os valores predefinidos (`Model method: Classic`).

---

## v0.6.0 (05/11/2026)

*Alterações desde a v0.4.0 (`v0.5.0` foi uma compilação interna nunca lançada).*

### Novidades

- **Duas edições**: **BASIC** (conversão de voz ao vivo, Voice Bank, todos os efeitos) e **PREMIUM** (tudo no BASIC + Song Cover).
- **Licença PREMIUM por PC**: `Song Cover → "Copy request code"` → `"Load license…"` (não expira, offline, permanece válida ao trocar 1 componente entre motherboard, disco do sistema ou instalação do Windows).
- **Motor de conteúdo `WavLM+`** (`Settings → Voice & Timbre → Content engine`; `Settings → Song Cover` para covers — **apenas NVIDIA**): fala ao vivo mais nítida, preserva risos, sussurros e respirações próprios e reduz o zumbido em risos e suspiros. `Whisper` mantém-se como predefinição para um timbre mais fiel.
- **Interruptor "Silence stays silent"** (`Settings → EQ & Filters → YUNE output` e `Settings → Song Cover`; ativo por predefinição).
- **Link Ko-fi** (`ko-fi.com/yunevoix`) e indicação da edição abaixo do número de versão.

### Alterações e remoções

- Descrições e dicas mais curtas e precisas nos seis idiomas, correspondendo aos nomes dos botões.
- `YuneVoix.exe --check` também reporta a edição, o estado da licença PREMIUM e os ficheiros do modelo `WavLM+`.
- **Removida** a opção de vocoder `BigVGAN` — **PC-NSF** é agora o único vocoder (anteriormente predefinido, melhor para canto e respiração).
- Removidas referências desatualizadas ao filtro de artefactos de fotograma (removido na `v0.4.0`).
