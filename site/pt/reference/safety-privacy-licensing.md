# Segurança, Privacidade e Licenças em IA de Voz

> **Guia prático, não aconselhamento jurídico:** Esta página resume boas práticas técnicas de segurança e regras comuns de licenciamento para modelos RVC, conjuntos de dados e notebooks na nuvem. Lê sempre a licença específica de cada recurso.

## 1. Segurança dos modelos descarregados (`.pth` vs. `.safetensors`)

- **Porque os ficheiros `.pth` exigem confiança:** Ficheiros PyTorch `.pth` usam serialização `pickle`. Aplicações modernas como **Ilaria RVC 2.4.0+** e **Applio** incluem proteções (`weights_only`), mas deves descarregar `.pth` apenas de **autores de confiança e repositórios oficiais** (Hugging Face ou GitHub Releases).
- **Porque `.safetensors` é mais seguro:** `.safetensors` guarda apenas pesos e metadados, sem executar código ao carregar. Podes converter com o [Conversor Safetensors](../ilaria-rvc/manage/safetensors-converter.md).
- **Verifica antes de carregar:** Confirma o tamanho do ficheiro (~40–110 MB para um `.pth` de inferência RVC real), verifica hashes SHA-256 ou assinaturas digitais quando disponíveis e não carregues checkpoints `G_*.pth` / `D_*.pth` de origem desconhecida.

## 2. Consentimento vocal, privacidade e licenças

- **Consentimento:** Treina apenas com a tua própria voz, locutores autorizados ou datasets com licença explícita.
- **Uso comercial vs. não comercial:** Mesmo sendo software open-source (MIT), **cada modelo vocal e pretrained tem a sua própria licença** (alguns permitem uso comercial, outros são apenas **não comerciais / CC-BY-NC**). Consulta [Modelos pretrained](../start/pretrained.md).
- **Partilha responsável:** Inclui versão RVC (`v2`), taxa de amostragem (`32k`/`40k`/`48k`), embedder, `added_*.index` correspondente e termos de uso.

## 3. Segurança em notebooks na nuvem e credenciais

- **Mantém Kaggle, Colab e Lightning AI privados:** Células de arranque (como `Ilaria-RVC-Kaggle.ipynb`) imprimem URLs ativos e **palavras-passe WebUI / FileBrowser**. Nunca partilhes capturas ou logs com credenciais ativas.
- **Protege tokens:** Nunca coles tokens **Ngrok**, **Horizon ID** ou Hugging Face com permissão de escrita em notebooks públicos, e encerra os túneis (`STOP = True`) ao terminar.
- **Privacidade dos dados:** Para gravações confidenciais, limpa e converte o áudio **localmente**.
