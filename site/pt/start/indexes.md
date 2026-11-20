# Arquivos Index do RVC e Feature Retrieval (`.index`)

Ao baixar ou treinar um modelo de voz RVC, você geralmente vê dois arquivos: um `.pth` e um `.index`. Enquanto o `.pth` é obrigatório, o arquivo `.index` costuma gerar muitas dúvidas.

Este guia explica o que um `.index` realmente faz, a diferença essencial entre `added_*.index` e `trained_*.index`, como ajustar o **Index Rate**, quando abaixá-lo ou desligá-lo e o que fazer se estiver faltando.

---

## 1. O que é um arquivo `.index` (Feature Retrieval)?

A conversão de voz no RVC funciona em duas partes:
1. **O arquivo `.pth` (o Gerador):** A rede neural que aprendeu a transformar características da fala no timbre da voz alvo.
2. **O arquivo `.index` (o Banco de Características):** Um **índice vetorial FAISS** que guarda os vetores acústicos reais extraídos pelo [embedder](embedders.md) (como `contentvec`) de cada clipe do dataset de treino.

Durante a conversão, o **Feature Retrieval** compara cada pequeno trecho do seu áudio de entrada com o banco `.index`, busca os trechos mais parecidos das gravações originais do locutor e os mistura antes de enviar ao gerador `.pth`.

**Em palavras simples:**
- O `.pth` é o **motor** (obrigatório).
- O `.index` é uma **biblioteca de referência dos hábitos reais da voz** (opcional): respirações, cor das vogais, leve rouquidão e nuances de entonação que um `.pth` sozinho pode suavizar.

!!!tip
**Compatibilidade:**
Um modelo `.pth` funciona perfeitamente **sem** arquivo `.index` (`Index Rate = 0`). Se um modelo baixado não veio com `.index`, você ainda pode usá-lo normalmente.
!!!

---

## 2. `added_*.index` vs `trained_*.index`

Quando o RVC gera o índice em `logs/<nome_experimento>/`, costuma salvar dois arquivos `.index`:

| Nome do arquivo | O que contém | Você deve usar? |
| --- | --- | --- |
| **`added_*.index`** | O índice FAISS completo **com todos os vetores do dataset adicionados** (ex. `added_IVF256_Flat_nprobe_1_MinhaVoz_v2.index`). | **SIM. Use sempre este** para inferência e compartilhamento. |
| **`trained_*.index`** | Apenas a estrutura intermediária de clusters criada antes de inserir os vetores do dataset. | **NÃO.** Não selecione nem compartilhe este arquivo; gera resultados fracos ou vazios. |

Ao exportar ou compartilhar um modelo (por exemplo com **Export model ZIP** no Ilaria RVC), junte sempre o `.pth` com **`added_*.index`**, nunca com `trained_*.index`.

---

## 3. Como ajustar o `Index Rate` (de `0` a `1.0`)

O controle **Index Rate** (às vezes chamado de *Search Feature Ratio* ou *Retrieval Ratio*) define o quanto o banco `.index` puxa o áudio convertido para os trechos exatos do dataset de treino:

| Index Rate | Efeito na voz | Melhor uso |
| --- | --- | --- |
| **`0.0` (Desligado)** | 100% pesos `.pth`, 0% `.index`. | Pronúncia mais limpa, menor uso de CPU, melhor base para testes, voice changers ao vivo e modelos mesclados. |
| **`0.25 - 0.50`** | Adiciona textura natural da voz mantendo intactos sua pronúncia e ritmo. | **Fala**, **conversão entre idiomas** (ex. português em modelo inglês/japonês) ou datasets com leve ruído. |
| **`0.60 - 0.75`** | Forte semelhança e realismo sem abafar seu áudio de entrada. | **Padrão recomendado** para canto limpo e locuções no mesmo idioma. |
| **`0.85 - 1.00`** | Recuperação máxima; força as características o mais perto possível do dataset. | Só para datasets de estúdio impecáveis no mesmo idioma. Alto risco de palavras emboladas ou ruído do dataset. |

---

## 4. Quando você deve baixar ou desligar o `Index Rate`

Subir o **Index Rate** até `1.0` **não** melhora a voz automaticamente. Abaixe para `0.2 - 0.4` (ou `0`) sempre que notar:

1. **Chiado de fundo, estalos ou eco da sala voltando:** Como o `.index` puxa direto das gravações de treino, qualquer ruído ou reverberação do dataset volta na sua saída.
2. **Palavras emboladas ou sotaque estranho:** Se você fala outro idioma além do usado no dataset, um Index Rate alto tenta forçar vogais e consoantes estrangeiras na sua fala.
3. **Vozes mescladas (Voice Blender):** Mesclar dois `.pth` no [Voice Blender](../ilaria-rvc/manage/voice-blender.md) **não** cria um novo `.index`. Teste sempre modelos mesclados em `Index Rate = 0` primeiro.
4. **Engasgos no Voice Changer ao vivo:** Pesquisar um índice FAISS grande a cada bloco de áudio pesa na CPU. Abaixar ou zerar `Index Rate` reduz latência e cortes.

---

## 5. Regras de compatibilidade (por que não misturar `.index`)

Um arquivo `.index` é preso estritamente ao **modelo exato** e ao **embedder** usados para criá-lo:

- **Mesma dimensão / versão RVC:** Modelos `v1` usam **256 dimensões** (`3_feature256`), enquanto `v2` usam **768 dimensões** (`3_feature768`). Misturar `v1` e `v2` causa erro de dimensão.
- **Mesmo embedder:** Um índice gerado com `contentvec` não combina com um modelo que espera outro codificador.
- **Mesmo locutor:** Colocar o `.index` da Voz A no `.pth` da Voz B **não** mistura duas vozes de forma limpa; envia características erradas ao decodificador e deixa o som abafado ou quebrado.

---

## 6. Como recriar um arquivo `.index` ausente

### Caso A: Você só baixou um arquivo `.pth`
**Não** é possível recriar um `.index` real apenas a partir de um `.pth`. O `.index` é montado a partir dos vetores extraídos (`.npy`) do áudio original do dataset, que não ficam dentro de um `.pth` exportado. Basta definir **Index Rate = 0** e usar o `.pth` sozinho.

### Caso B: Você treinou o modelo e ainda tem `logs/<nome_experimento>/`
Se a pasta ainda tiver as características extraídas (`3_feature256` ou `3_feature768`), você pode reconstruir o índice em segundos sem retreinar:
1. Abra a aba **Train** no Ilaria RVC (ou Applio / RVC Mainline).
2. Digite exatamente o mesmo **Nome do Experimento**, **Versão RVC (`v1`/`v2`)**, **Sample Rate** e **Embedder**.
3. Clique apenas em **Train Feature Index** (sem rodar novamente pré-processamento nem treino do modelo).
4. Ao terminar, pegue o novo **`added_*.index`** em `logs/<nome_experimento>/`.

### Caso C: Criar o índice trava por falta de RAM / Pagefile
Datasets grandes (milhares de clipes) consomem muita RAM no agrupamento FAISS. Se travar com `WinError 1455` ou congelar o Windows, feche outros programas, aumente a **Memória Virtual (Pagefile)** (veja [Resolução de problemas](../reference/troubleshooting.md)) ou remova clipes repetitivos.
