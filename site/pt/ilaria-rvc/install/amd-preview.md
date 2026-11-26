# Ilaria RVC 2.5.1 AMD Preview

A AMD Preview é um pacote separado da versão 2.5.1 para Radeon compatíveis no Windows 11 com WSL2 ou Ubuntu 22.04 nativo. Usa Python 3.10, PyTorch 2.6.0 e ROCm 6.4.2.

!!!warning Preview
O pacote e o launcher foram verificados. O treino completo, a retoma e a conversão de voz em Radeon continuam por validar.
!!!

## Descarregar

[AMD Preview ZIP · 5.9 GB](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.5.1/ILARIA_RVC-2.5.1-AMD.zip?download=true) · [SHA-256](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/ILARIA_RVC-2.5.1-AMD.zip.sha256)

Extrai o ZIP para uma pasta própria. Inclui quatro wheels da AMD para Linux, pesos base e amostras de silêncio. O primeiro arranque precisa de internet. Instala o controlador e o ROCm em separado.

## Radeon compatíveis com WSL2

A tabela segue a matriz da AMD para ROCm 6.4.2. Consulta a matriz Linux para Ubuntu nativo.

| Radeon | ROCm 6.4.2 · WSL2 |
| --- | --- |
| RX 9000 | RX 9060, RX 9060 XT, RX 9070, RX 9070 XT, RX 9070 GRE |
| RX 7000 | RX 7800 XT, RX 7900 GRE, RX 7900 XT, RX 7900 XTX |
| PRO | W7700, W7800, W7800 48GB, W7900, W7900 Dual Slot |
| AI PRO | R9700 |

[AMD · WSL2](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/compatibility/wsl/wsl_compatibility.html) · [AMD · Ubuntu](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/compatibility/native_linux/native_linux_compatibility.html)

## Instalar no Windows 11

~~~powershell
wsl --install -d Ubuntu-22.04
~~~

Instala Ubuntu 22.04 no WSL2 a partir do PowerShell. Cria o utilizador Ubuntu, instala o controlador Radeon no Windows e ROCm 6.4.2 no Ubuntu. Executa `rocminfo`, instala os pacotes e abre `RUN_ILARIA_RVC_AMD.bat` no Windows. [AMD WSL2](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/install/wsl/install-radeon.html)

O ROCm nativo no Windows não suporta oficialmente treino ML. O launcher usa WSL2. [AMD](https://rocm.docs.amd.com/projects/radeon-ryzen/en/latest/docs/limitations/limitationsrad.html)

## Instalar no Ubuntu nativo

Instala o controlador e ROCm 6.4.2. Verifica `rocminfo`, instala os pacotes e executa `bash RUN_ILARIA_RVC_AMD.sh` na pasta extraída. [AMD Linux](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/install/native_linux/install-radeon.html)

## Pacotes do Ubuntu

~~~bash
sudo apt update
sudo apt install python3.10 python3.10-venv python3.10-dev gcc-12 g++-12 make ffmpeg libsndfile1
~~~

Quando o servidor estiver pronto, abre a interface local. [Ilaria RVC](http://127.0.0.1:6969)

## Verificar a GPU

~~~powershell
.\RUN_ILARIA_RVC_AMD.bat --check
~~~

~~~bash
bash RUN_ILARIA_RVC_AMD.sh --check
~~~

O teste verifica retropropagação FP32 e ContentVec sem abrir a interface. O treino começa com uma GPU em FP32. A atualização integrada está desativada.
