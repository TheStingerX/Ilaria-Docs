# Ilaria RVC nel cloud

Esegui Ilaria RVC nel browser con una GPU fornita da una piattaforma cloud. Scegli un notebook qui sotto e attiva un acceleratore NVIDIA prima di eseguire la prima cella.

[Kaggle](kaggle.md) · [Google Colab](colab.md) · [Lightning AI Studio](lightning-ai.md)

## Confronto tra piattaforme cloud

| Caratteristica | Kaggle | Google Colab | Lightning AI Studio |
| --- | --- | --- | --- |
| **Disponibilità GPU** | Quota GPU settimanale gratuita (es. **T4 x2**, soggetta ai limiti Kaggle) | Piano gratuito (dinamico, non garantito) o a pagamento (**Pro / Pro+ / Pay-As-You-Go** a compute unit) | Studio 4-CPU gratuito; GPU fatturate al secondo tramite crediti iniziali o a pagamento |
| **Costi e crediti** | Gratuito entro la quota settimanale (verifica telefonica richiesta) | Piano gratuito o compute unit a pagamento (vedi [Colab FAQ](https://research.google.com/colaboratory/faq.html)) | `1 credito = $1 USD` al secondo; vedi [Prezzi Lightning AI](https://lightning.ai/pricing) |
| **Restrizioni** | Devi attivare **Internet** (verifica telefonica); mantieni privati i notebook | Le [attività non consentite](https://research.google.com/colaboratory/faq.html#disallowed-activities) vietano web hosting pubblico e proxy; il piano gratuito può disconnettere le WebUI | Verifica telefonica può richiedere 2–3 giorni lavorativi; disponibilità GPU variabile |
| **Persistenza file** | Per sessione; esporta automaticamente i modelli in `ilaria-shared/models` | Storage temporaneo della VM; salva checkpoint/export su **Google Drive** | **Teamspace Drive** persistente (**10 GB gratis**; oltre i 10 GB a pagamento) |
| **Durata sessioni** | Timeout per inattività; commit in background consumano quota | Timeout di inattività e limiti massimi di sessione | Studio CPU gratuito fino a 4 ore continue prima del riavvio |
| **Training e Inferenza** | Entrambi supportati (T4 usa FP16) | Entrambi supportati (dipende dalla GPU assegnata) | Entrambi supportati (scegli il tier GPU necessario) |
| **Esportazione** | ZIP `EXPORT = True` + **FileBrowser** | ZIP `EXPORT = True` + Google Drive | Download diretto da Teamspace Drive o ZIP `EXPORT = True` |
| **Privacy** | Tieni il notebook **privato** (la cella di avvio stampa password WebUI e FileBrowser) | Tieni privati i notebook; non condividere celle con password o token | Tieni privati Studio e porte di Port Viewer |
| **Facilità di setup** | Media (copia notebook, attiva GPU + Internet, avvia 4 celle) | Facile (apri link Colab, scegli GPU, avvia 4 celle) | Media (crea Studio, carica notebook, passa a GPU, apri Port Viewer) |

## Quale servizio scegliere?

- **Vuoi una GPU gratuita per training o test:** Inizia con **[Kaggle](kaggle.md)** (verifica il numero di telefono, attiva **Internet** e **T4 x2**, e mantieni privato il notebook).
- **Hai già Colab a pagamento o vuoi usare Google Drive:** Usa **[Google Colab](colab.md)** con compute unit per sessioni WebUI più stabili.
- **Vuoi storage persistente tra le sessioni:** Usa **[Lightning AI Studio](lightning-ai.md)**, prepara l'ambiente sullo Studio CPU gratuito e passa alla GPU solo durante i lavori.
