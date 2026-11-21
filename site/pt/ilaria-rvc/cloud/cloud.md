# Ilaria RVC na nuvem

Executa o Ilaria RVC num navegador com uma GPU na nuvem. Escolhe um notebook abaixo e ativa um acelerador NVIDIA antes da primeira célula.

[Kaggle](kaggle.md) · [Google Colab](colab.md) · [Lightning AI Studio](lightning-ai.md)

## Comparar plataformas na nuvem

| Recurso | Kaggle | Google Colab | Lightning AI Studio |
| --- | --- | --- | --- |
| **Disponibilidade GPU** | Quota semanal gratuita (ex. **T4 x2**, sujeita aos limites Kaggle) | Plano gratuito (dinâmico, sem garantia) ou pago (**Pro / Pro+ / Pay-As-You-Go** com compute units) | Studio 4-CPU gratuito; GPUs cobradas ao segundo com créditos iniciais ou pagos |
| **Custos e créditos** | Gratuito na quota semanal (verificação telefónica exigida) | Gratuito ou compute units (ver [Colab FAQ](https://research.google.com/colaboratory/faq.html)) | `1 crédito = $1 USD` por segundo; ver [Preços Lightning AI](https://lightning.ai/pricing) |
| **Restrições** | Ligar **Internet**; manter notebooks privados | [Atividades proibidas](https://research.google.com/colaboratory/faq.html#disallowed-activities) restringem alojamento web público e proxies | Verificação telefónica demora 2–3 dias úteis; disponibilidade GPU varia |
| **Persistência** | Por sessão; auto-exporta para `ilaria-shared/models` | Temporário; guarda no **Google Drive** | **Teamspace Drive** persistente (**10 GB grátis**) |
| **Duração** | Timeouts de inatividade; commits gastam quota | Timeouts e limites de sessão | Studio CPU grátis até 4h contínuas antes de reiniciar |
| **Treino e Inferência** | Ambos suportados (T4 usa FP16) | Ambos suportados (consoante GPU) | Ambos suportados |
| **Exportação** | ZIP `EXPORT = True` + **FileBrowser** | ZIP `EXPORT = True` + Google Drive | Teamspace Drive ou ZIP `EXPORT = True` |
| **Privacidade** | Manter notebook **privado** (imprime passwords WebUI/FileBrowser) | Manter notebooks privados | Manter Studio e Port Viewer privados |
| **Facilidade** | Média | Fácil | Média |

## Qual serviço escolher?

- **GPU gratuita para treinar ou testar:** Começa pelo **[Kaggle](kaggle.md)**.
- **Já pagas Colab ou usas Google Drive:** Usa o **[Google Colab](colab.md)**.
- **Armazenamento persistente entre sessões:** Usa o **[Lightning AI Studio](lightning-ai.md)**.
