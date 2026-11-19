---
label: "Instalação e atualizações"
icon: ":cd:"
order: 98
permalink: /non-rvc/yunevoix/installation/
---
# Instalar e atualizar o YuneVoix

[Transferir no Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Premium)](https://ko-fi.com/yunevoix)

O YuneVoix é uma aplicação portátil para Windows: nada é instalado no Windows e todas as definições, vozes, registos e licenças ficam junto a `YuneVoix.exe`.

## 1. Transfere o pacote certo

1. Abre o [repositório Hugging Face do YUNE](https://huggingface.co/JohnBlvck/YUNE/tree/main) (para **PREMIUM**, o acesso é entregue em privado via Ko-fi ou DM).
2. Transfere a compilação correspondente à tua placa gráfica:
   - Pacote **NVIDIA** para GPUs GeForce RTX / CUDA.
   - Pacote **AMD** para GPUs Radeon RX 7000+.
   > **Importante**: as compilações NVIDIA e AMD são separadas e não intercambiáveis.
3. Anota a palavra-passe do arquivo: **`yunevoix`** (ou a recebida com a transferência).

## 2. Extrai o arquivo

O ficheiro ZIP está encriptado com **AES-256**, pelo que o Explorador do Windows não o consegue abrir (irá indicar que o ZIP é inválido).

1. Instala ou abre o **7-Zip** (`7-zip.org`) ou **WinRAR**.
2. Extrai o arquivo com a palavra-passe `yunevoix` para uma pasta local com permissão de escrita, como `D:\YuneVoix`.
   - **Não** extraias para `Program Files` nem para o `OneDrive`.

## 3. Primeiro arranque e SmartScreen

1. Abre a pasta extraída e executa `YuneVoix.exe`.
2. Como o programa ainda não está assinado digitalmente, o Windows SmartScreen pode mostrar *"O Windows protegeu o seu PC"*. Clica em **Mais informações → Executar mesmo assim**.
   - Se o antivírus colocar algum ficheiro em quarentena, adiciona a pasta `YuneVoix` como exceção.
3. **Aguarda a preparação inicial do motor**:
   - **NVIDIA**: alguns minutos no primeiro arranque.
   - **AMD (MIGraphX)**: até **10–30 minutos** no primeiro arranque (o Windows pode também transferir o AMD MIGraphX via Windows Update).
   - Após o primeiro arranque, o modo **LIVE** inicia em cerca de **10 segundos**.
4. Podes mudar o idioma da interface no topo da janela (**English, Deutsch, Italiano, Español, Polski, Português**).

## 4. Atualizar ou passar de BASIC → PREMIUM

Para atualizar para uma nova versão ou passar de BASIC para PREMIUM sem perder vozes nem definições:

1. Extrai a nova versão para uma **nova** pasta (não substituas a antiga ainda).
2. Copia estes ficheiros/pastas da pasta antiga para a nova:
   - `models\yune\voices` (as tuas vozes guardadas)
   - `settings.json` e `yune.json` (as tuas definições)
   - `license.yvl` (para PREMIUM)
3. Executa o novo `YuneVoix.exe` e confirma que tudo funciona antes de apagar a pasta antiga.

Para desinstalar completamente o YuneVoix, basta apagar a pasta.
