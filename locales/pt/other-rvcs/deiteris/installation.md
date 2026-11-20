---
label: "Instalar Deiteris Fork"
icon: ":package:"
order: 100
permalink: /ilaria-rvc/deiteris/installation/
---
# Instalar Deiteris w-okada Fork

[GitHub](https://github.com/Deiteris/voice-changer) · [Releases](https://github.com/Deiteris/voice-changer/releases)

**Deiteris w-okada Fork** é um fork popular mantido pela comunidade de `w-okada/voice-changer` (VCClient), focado em menor latência, áudio mais limpo, correções de estabilidade e backends atualizados para NVIDIA (CUDA), AMD/Intel (DirectML) e Apple Silicon.

## 1. Transfere a compilação certa

Abre a [página de Releases do Deiteris](https://github.com/Deiteris/voice-changer/releases) e expande **Assets**:

| Hardware / SO | Pacote a transferir | Notas |
| --- | --- | --- |
| **Windows + GPU NVIDIA** | Arquivo **CUDA** (muitas vezes dividido em `.zip.001`, `.zip.002`, etc.) | Recomendado para a menor latência em placas GeForce GTX/RTX. |
| **Windows + GPU AMD / Intel** | Arquivo **DML (DirectML)** | Usa aceleração DirectML (ou CPU se não houver GPU compatível). |
| **macOS (Apple Silicon / Intel)** | Compilação **macOS** (CoreML / CPU) | Verifica as notas da release para Apple Silicon M1/M2/M3 vs. Intel. |

## 2. Extrair e iniciar (Windows)

1. Para arquivos CUDA divididos (`.zip.001`, `.zip.002`, ...), transfere **todas as partes** para a mesma pasta e extrai a partir de **`.zip.001`** usando **7-Zip** ou **WinRAR**.
2. Extrai para um caminho simples com permissão de escrita no disco principal (ex. `C:\VoiceTools\Deiteris-VC`). Evita `Program Files`, `OneDrive` ou caracteres especiais.
3. Abre a pasta extraída e executa o script de arranque (`start_http.bat` ou `MMVCServerSIO.exe`, consoante a release).
4. **Aguarda os pesos iniciais**: deixa a consola aberta enquanto o cliente transfere os pesos base no primeiro arranque.
5. Abre o endereço web local impresso na consola (normalmente `http://localhost:7865` ou `http://127.0.0.1:18888`).

## 3. Pré-requisito: cabo de áudio virtual

Para enviar a tua voz convertida para **Discord, OBS, VRChat ou jogos**, instala um cabo de áudio virtual (como o **VB-CABLE**) antes de configurar o áudio ao vivo:
1. Executa o instalador do cabo virtual como Administrador (`VBCABLE_Setup_x64.exe`).
2. **Reinicia o Windows** para que os novos dispositivos virtuais sejam reconhecidos corretamente.

Continua em [Encaminhar e afinar o Deiteris Fork](live-audio.md) para configurar dispositivos, chunk size e pitch.
