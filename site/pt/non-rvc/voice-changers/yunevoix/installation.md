# Instalar e atualizar o YuneVoix

[Baixar no Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Premium)](https://ko-fi.com/yunevoix)

O YuneVoix é um aplicativo portátil para Windows: nada é instalado no Windows, e todas as configurações, vozes, logs e licenças ficam ao lado de `YuneVoix.exe`.

## 1. Identifique sua GPU e baixe o pacote correto (v0.7.1)

1. Verifique sua placa de vídeo dedicada em **Gerenciador de Tarefas do Windows → Desempenho → GPU** (NVIDIA GeForce RTX vs. AMD Radeon RX 7000+).
2. Baixe a compilação **v0.7.1** correspondente no [Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) (para **PREMIUM**, a ativação exige um arquivo `license.yvl` obtido em privado via [Ko-fi](https://ko-fi.com/yunevoix) ou DMs):
   - **BASIC (Gratuito)**:
     - [Baixar YuneVoix BASIC NVIDIA v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_BASIC_NVIDIA_v0.7.1.zip?download=true) - para GPUs NVIDIA (8 GB+ VRAM, 12 GB recomendados).
     - [Baixar YuneVoix BASIC AMD v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_BASIC_AMD_v0.7.1.zip?download=true) - para GPUs AMD Radeon RX 7000+ (12 GB+ VRAM, 16 GB recomendados).
   - **PREMIUM** *(requer `license.yvl`)*:
     - [Baixar YuneVoix PREMIUM NVIDIA v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_PREMIUM_NVIDIA_v0.7.1.zip?download=true) - para GPUs NVIDIA.
     - [Baixar YuneVoix PREMIUM AMD v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_PREMIUM_AMD_v0.7.1.zip?download=true) - para GPUs AMD Radeon RX 7000+.
   > **Importante:** Os pacotes NVIDIA e AMD são separados e não são intercambiáveis. **Não** mova nem exclua as pastas incluídas ao lado de `YuneVoix.exe`:
   > - **Pacote NVIDIA:** mantenha **`models`** e **`cuda`** ao lado de `YuneVoix.exe`.
   > - **Pacote AMD:** mantenha **`models`** e **`cache`** ao lado de `YuneVoix.exe`.
3. Anote a senha do arquivo publicada com o lançamento: **`yunevoix`** (mantida aqui conforme documentado pelo mantenedor do projeto).

## 2. Extrair o arquivo

O arquivo ZIP é criptografado com **AES-256**, que o Explorador de Arquivos do Windows não consegue abrir (ele informará que o ZIP é inválido).

1. Instale ou abra o **7-Zip** (`7-zip.org`) ou **WinRAR**.
2. Extraia todo o arquivo usando a senha `yunevoix` para uma pasta local gravável, como `D:\YuneVoix`.
   - **Não** extraia em `Program Files` nem no `OneDrive`.

## 3. Primeira execução, SmartScreen e verificação do motor

1. Abra a pasta extraída e execute `YuneVoix.exe`.
2. Verifique se o arquivo veio do [repositório oficial YUNE no Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main). Como o executável ainda não possui assinatura digital, o Windows SmartScreen pode exibir *"O Windows protegeu o computador"*. Clique em **Mais informações → Executar assim mesmo** após confirmar a origem.
   - Se o seu antivírus sinalizar algum arquivo, verifique **Segurança do Windows → Histórico de proteção** e confirme a origem do arquivo antes de permiti-lo; **não** desative o Windows Defender nem a proteção antivírus globalmente.
3. **Aguarde a preparação inicial**:
   - A primeira execução descompacta bibliotecas uma única vez e demora mais.
   - **AMD:** usa **DirectML** na GPU dedicada por padrão na v0.7.1 (sem download do Windows Update nem compilação de modelos). Somente se você mudar `Settings → General → "AMD graphics engine"` para o modo experimental **MIGraphX** (após reiniciar), a primeira compilação de modelos pode levar **10-30 minutos**.
   - Confira a linha de status LIVE ou execute `YuneVoix.exe --check` (`check.txt`) para confirmar qual motor gráfico e GPU estão ativos.
4. Você pode trocar o idioma da interface no topo da janela (**English, Deutsch, Italiano, Español, Polski, Português**).

## 4. Atualizar ou fazer upgrade (BASIC → PREMIUM)

Licenças, vozes e configurações da **v0.6.0 / v0.7.0** continuam funcionando na **v0.7.1**. Para atualizar para uma nova versão ou migrar de BASIC para PREMIUM sem perder suas vozes e ajustes:

1. Extraia a nova versão em uma pasta **nova** (não sobrescreva a antiga ainda).
2. Copie estes arquivos/pastas da pasta antiga do YuneVoix para a nova:
   - `models\yune\voices` (suas vozes salvas)
   - `settings.json` e `yune.json` (sua configuração)
   - `my_voice.yvoice`, se existir (a amostra da sua própria voz usada pelo **FlowEdit 3+1** no LIVE)
   - `license.yvl` (para PREMIUM)
3. Execute o novo `YuneVoix.exe` e confirme que tudo funciona antes de excluir a pasta antiga.

> **Atualizando da v0.6.0:** Se você havia definido uma amostra da sua própria voz antes da v0.7.0, selecione-a novamente uma vez em `Settings → Voice & Timbre → "Sample of your voice…"`; caso contrário, o **FlowEdit 3+1** volta para **Learned 4 steps** no LIVE. Isso é necessário porque a v0.7.0+ precisa da referência selecionada novamente para vincular `my_voice.yvoice` ao FlowEdit e à força de timbre.

Para desinstalar o YuneVoix completamente, basta excluir sua pasta.

Próximo passo: [Voice Bank e Uso ao Vivo](usage.md).
