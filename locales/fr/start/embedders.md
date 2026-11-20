---
label: "🧩 Embedders"
order: 91
permalink: /embedders/
description: "Un embedder (également appelé content encoder) est le réseau neuronal qui lit votre audio d'entrée et transforme ce qui est dit ou chanté en caractéristiques numériques de contenu avant que le modèle vocal RVC ne le reconstruise dans le timbre du locuteur cible."
---
# Embedders RVC

Un **embedder** (également appelé **content encoder**) est le réseau neuronal qui lit votre audio d'entrée et transforme ce qui est dit ou chanté en caractéristiques numériques de contenu avant que le modèle vocal RVC ne le reconstruise dans le timbre du locuteur cible.

## Ce que fait un embedder et comment il fonctionne

Dans un pipeline RVC, l'audio est séparé en flux d'informations distincts :

1. **Contenu (ce que vous dites)** : extrait image par image par l'**embedder** (phonèmes, prononciation, articulation et rythme).
2. **Hauteur / F0 (la mélodie)** : extraite séparément par un détecteur de hauteur (comme RMVPE ou FCPE).
3. **Timbre du locuteur (qui parle)** : fourni par le modèle vocal `.pth` entraîné (et éventuellement renforcé par un fichier `.index`).

Le générateur RVC étant entraîné pour recevoir les caractéristiques d'**un embedder précis**, deux règles s'appliquent toujours :

- **Entraînement et inférence doivent correspondre** : si un modèle a été entraîné avec `contentvec`, vous devez convertir avec `contentvec`. Utiliser un autre embedder en inférence (ou en direct) provoque une prononciation déformée, des artefacts métalliques ou une voix cassée.
- **Fuite d'identité du locuteur** : les encodeurs génériques de reconnaissance vocale (comme HuBERT standard) ne suppriment pas l'identité du locuteur d'origine, ce qui peut laisser passer votre propre timbre dans la sortie.

---

## Embedders RVC connus

> [!WARNING]
> **À titre purement informatif - utilisation fortement déconseillée**
>
> Toutes les informations ci-dessous concernant les embedders alternatifs sont fournies **à titre purement informatif**. **Nous recommandons fortement de NE PAS utiliser d'embedders alternatifs** : les **réglages stock de RVC** (**`contentvec`**) restent le meilleur choix, le plus sûr et le plus fiable. Les embedders alternatifs augmentent le risque d'obtenir un mauvais modèle vocal ou une mauvaise conversion hors ligne et en ligne (en direct), tout en cassant la compatibilité avec les configurations et index standard.

| Embedder | Architecture / Notes | Support RVC | Recommandation |
| --- | --- | --- | --- |
| **`contentvec`** (`hubert_base.pt`) | Content encoder par défaut de RVC, entraîné pour conserver le contenu linguistique tout en retirant l'identité du locuteur. | RVC v1 (256-d) et RVC v2 (768-d) | **Recommandé (Stock RVC)** |
| **`spin`** | Encodeur alternatif Fairseq/HuBERT invariant au locuteur. | RVC v2 | Déconseillé pour un usage général |
| **`spin-v2`** (`spin-v2.pt`) | Encodeur Spin v2 mis à jour (~361 Mio) utilisé par certains pré-entraînés expérimentaux. | RVC v2 | Déconseillé pour un usage général |
| **`chinese-hubert-base`** | HuBERT Base pré-entraîné sur du chinois parlé. Peut laisser passer le timbre source. | RVC v2 | Informatif / spécialisé uniquement |
| **`japanese-hubert-base`** | HuBERT Base pré-entraîné sur du japonais parlé. Peut laisser passer le timbre source. | RVC v2 | Informatif / spécialisé uniquement |
| **`korean-hubert-base`** | HuBERT Base pré-entraîné sur du coréen parlé. Peut laisser passer le timbre source. | RVC v2 | Informatif / spécialisé uniquement |
| **`portuguese-hubert-base`** | Fairseq HuBERT portugais (`shiromiya/fairseq-hubert-portuguese`, ~1,13 Go). | RVC v2 | Informatif / spécialisé uniquement |
| **`custom` HuBERT Base** | Paire HuBERT Base fournie par l'utilisateur (`pytorch_model.bin` + `config.json`, 768 dimensions). | RVC v2 (v1 uniquement si projection 256-d présente) | Informatif / avancé uniquement |

## Quand faut-il vraiment modifier l'embedder ?

- **Laissez sur `Auto` ou `contentvec`** pour la quasi-totalité des modèles et entraînements.
- **Ne le changez que** si l'auteur d'une voix téléchargée indique explicitement un autre embedder (ex. `spin-v2` ou `japanese-hubert-base`), et uniquement pour convertir avec ce modèle précis.
- **Ne changez pas d'embedder en cours d'entraînement** : cela impose de ré-extraire les features (`3_feature768`) dans une nouvelle expérience.
