---
label: "Cloud"
icon: ":cloud:"
order: 94
permalink: /ilaria-rvc/cloud/
description: "Vergleiche Kaggle, Google Colab und Lightning AI Studio, um Ilaria RVC im Browser ohne lokale kompatible NVIDIA-GPU zu nutzen."
---
# Ilaria RVC in der Cloud

Nutze Ilaria RVC im Browser mit einer Cloud-GPU. Wähle unten ein Notebook und aktiviere einen NVIDIA-Beschleuniger vor der ersten Zelle.

[Kaggle](kaggle.md) · [Google Colab](colab.md) · [Lightning AI Studio](lightning-ai.md)

## Cloud-Plattformen im Vergleich

| Merkmal | Kaggle | Google Colab | Lightning AI Studio |
| --- | --- | --- | --- |
| **GPU-Verfügbarkeit** | Kostenloses Wochenkontingent (z. B. **T4 x2**, je nach Kaggle-Limit) | Gratis-Tarif (dynamisch, ohne Garantie) oder bezahlt (**Pro / Pro+ / Pay-As-You-Go** über Compute Units) | Kostenloses 4-CPU-Studio; GPUs sekundengenau über Start- oder Kauf-Credits |
| **Kosten & Credits** | Kostenlos im Wochenkontingent (Telefon-Verifizierung nötig) | Gratis oder Compute Units (siehe [Colab FAQ](https://research.google.com/colaboratory/faq.html)) | `1 Credit = $1 USD` pro Sekunde; siehe [Lightning AI Preise](https://lightning.ai/pricing) |
| **Einschränkungen** | **Internet** aktivieren; Notebooks privat halten | [Unzulässige Aktivitäten](https://research.google.com/colaboratory/faq.html#disallowed-activities) verbieten öffentliches Web-Hosting & Proxies | Telefon-Verifizierung dauert 2–3 Werktage; GPU-Verfügbarkeit variiert |
| **Persistenz** | Sitzungsbasiert; Auto-Export nach `ilaria-shared/models` | Temporär; Checkpoints auf **Google Drive** sichern | Persistentes **Teamspace Drive** (**10 GB frei**) |
| **Sitzungsdauer** | Leerlauf-Timeouts; Commits verbrauchen Kontingent | Leerlauf-Timeouts & Laufzeitlimits | Gratis-CPU-Studio bis zu 4 Std. am Stück vor Neustart |
| **Training & Inferenz** | Beides (T4 nutzt FP16) | Beides (je nach GPU) | Beides |
| **Export** | ZIP `EXPORT = True` + **FileBrowser** | ZIP `EXPORT = True` + Google Drive | Teamspace Drive oder ZIP `EXPORT = True` |
| **Privatsphäre** | Notebook **privat** halten (gibt WebUI/FileBrowser-Passwörter aus) | Notebooks privat halten | Studio & Port Viewer privat halten |
| **Einrichtung** | Mittel | Einfach | Mittel |

## Welchen Dienst wählen?

- **Kostenlose GPU für Training/Tests:** Starte mit **[Kaggle](kaggle.md)**.
- **Bezahltes Colab oder Google Drive:** Nutze **[Google Colab](colab.md)**.
- **Dauerhafter Speicher zwischen Sitzungen:** Nutze **[Lightning AI Studio](lightning-ai.md)**.
