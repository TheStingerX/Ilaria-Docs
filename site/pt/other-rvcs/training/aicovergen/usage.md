# AICoverGen · Utilização e resolução de problemas

[GitHub](https://github.com/SociallyIneptWeeb/AICoverGen)

!!!warning Software antigo · Desaconselhado
**AICoverGen** é uma pipeline antiga para covers com RVC v2 que já não é mantida ativamente e depende de pacotes da era do Python 3.9+. Para uma nova instalação, escolhe uma aplicação com manutenção ativa. [Guias por aplicação](../../app-guides.md)
!!!

## Adicionar modelos de voz RVC v2

O AICoverGen só carrega modelos de inferência **RVC v2** exportados (`rvc_models/`):

- **Download model:** cola um URL direto para um arquivo comprimido com o `.pth` da voz (e o `.index` opcional) para o transferir e extrair automaticamente.
- **Upload model:** carrega os teus ficheiros `.pth` e `.index` opcional diretamente a partir da WebUI, ou coloca cada pasta de voz dentro de `rvc_models/`.

## Gerar covers na WebUI

Abre o separador **Generate**, cola um URL do YouTube ou carrega uma faixa de áudio local, escolhe o modelo vocal e ajusta os controlos principais:

- **Pitch Change:** ajusta a altura da voz para corresponder ao registo do modelo de destino (por exemplo, `+1` oitava / `+12` semitons de masculino para feminino, ou `-1` / `-12` de feminino para masculino).
- **Extração de pitch:** usa **`rmvpe`** como opção predefinida recomendada para um acompanhamento mais limpo, ou **`mangio-crepe`** com hop length ajustável para transições mais suaves.
- **Index Rate:** controla quanto o ficheiro `.index` influencia o timbre e a pronúncia. Reduz o valor se surgir grão ou artefactos.
- **Mistura de áudio e efeitos:** ajusta o volume para **Main Vocals**, **Backup Vocals** e **Instrumentals**, configura o **Reverb** integrado (room size, wetness, dryness, damping) e escolhe o formato de saída (**`mp3`** ou **`wav`**).

## Modo CLI (`src/main.py`)

Podes executar toda a pipeline sem abrir a WebUI através de `src/main.py`:

~~~bash
python src/main.py -i "https://www.youtube.com/watch?v=VIDEO_ID" -dir "VoiceFolderName" -p 0 -palgo rmvpe -ir 0.5 -mv 0 -bv 0 -iv 0 -rsize 0.15 -rwet 0.2 -rdry 0.8 -rdamp 0.7 -oformat mp3
~~~

Opções principais:

- `-i`: caminho do ficheiro local ou URL do YouTube de entrada
- `-dir`: nome da pasta do modelo vocal dentro de `rvc_models/`
- `-p`: alteração de pitch
- `-palgo`: algoritmo de extração de pitch (`rmvpe` ou `mangio-crepe`)
- `-ir`: index rate (`0`–`1`)
- `-mv` / `-bv` / `-iv`: ajustes de volume para voz principal, vozes de apoio e instrumental
- `-rsize` / `-rwet` / `-rdry` / `-rdamp`: room size, wetness, dryness e damping do reverb
- `-oformat`: formato do áudio de saída (`mp3` ou `wav`)

## Resolução de problemas

- **Erros de áudio ou conversão em execução:** confirma que tanto `ffmpeg` como `sox` estão instalados e acessíveis no `PATH` antes de iniciar `src/webui.py` ou `src/main.py`.
- **Falhas ao transferir do YouTube:** extratores antigos do YouTube deixam frequentemente de funcionar com o tempo. Transfere a faixa à parte em WAV/MP3 e passa o ficheiro local em vez do URL.
- **Erro ao carregar o modelo:** verifica se o ficheiro é um `.pth` de inferência RVC v2 exportado (não um modelo RVC v1 nem um checkpoint G/D de treino).

[Instalação](installation.md)
