---
label: "Cloud"
icon: ":cloud:"
order: 94
permalink: /ilaria-rvc/cloud/
description: "Comparez Kaggle, Google Colab et Lightning AI Studio pour exécuter Ilaria RVC dans le navigateur sans GPU NVIDIA local compatible."
---
# Ilaria RVC dans le cloud

Exécutez Ilaria RVC dans un navigateur avec un GPU fourni par le cloud. Choisissez un notebook ci-dessous et activez un accélérateur NVIDIA avant d'exécuter la première cellule.

[Kaggle](kaggle.md) · [Google Colab](colab.md) · [Lightning AI Studio](lightning-ai.md)

## Comparer les plateformes cloud

| Critère | Kaggle | Google Colab | Lightning AI Studio |
| --- | --- | --- | --- |
| **Disponibilité GPU** | Quota hebdomadaire gratuit (ex. **T4 x2**, selon limites Kaggle) | Offre gratuite (dynamique, non garantie) ou payante (**Pro / Pro+ / Pay-As-You-Go** en compute units) | Studio 4-CPU gratuit ; GPU facturés à la seconde via crédits de départ ou payants |
| **Coûts et crédits** | Gratuit dans le quota hebdomadaire (vérification téléphone requise) | Gratuit ou compute units (voir [Colab FAQ](https://research.google.com/colaboratory/faq.html)) | `1 crédit = $1 USD` à la seconde ; voir [Tarifs Lightning AI](https://lightning.ai/pricing) |
| **Restrictions** | Activer **Internet** ; garder les notebooks privés | Les [activités interdites](https://research.google.com/colaboratory/faq.html#disallowed-activities) limitent l'hébergement web public et les proxies | Vérification téléphone : 2–3 jours ouvrés ; disponibilité GPU variable |
| **Persistance** | Par session ; auto-export dans `ilaria-shared/models` | Stockage temporaire ; sauvegardez sur **Google Drive** | **Teamspace Drive** persistant (**10 Go gratuits**) |
| **Durée** | Coupures d'inactivité ; commits consomment le quota | Coupures d'inactivité et limites de session | Studio CPU gratuit jusqu'à 4h continues avant redémarrage |
| **Entraînement & Inférence** | Les deux (T4 en FP16) | Les deux (selon GPU) | Les deux |
| **Export** | ZIP `EXPORT = True` + **FileBrowser** | ZIP `EXPORT = True` + Google Drive | Teamspace Drive ou ZIP `EXPORT = True` |
| **Confidentialité** | Garder le notebook **privé** (mots de passe WebUI/FileBrowser affichés) | Garder les notebooks privés | Garder Studio et Port Viewer privés |
| **Facilité** | Moyenne | Facile | Moyenne |

## Quel service choisir ?

- **GPU gratuit pour entraîner ou tester :** Commencez par **[Kaggle](kaggle.md)**.
- **Déjà abonné Colab ou usage de Google Drive :** Utilisez **[Google Colab](colab.md)**.
- **Stockage persistant entre sessions :** Utilisez **[Lightning AI Studio](lightning-ai.md)**.
