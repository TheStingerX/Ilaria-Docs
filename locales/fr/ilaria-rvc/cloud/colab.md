---
label: "Google Colab"
icon: ":tangerine:"
order: 97
permalink: /fr/ilaria-rvc/colab/
description: "Exécutez Ilaria RVC dans un navigateur avec un GPU fourni par la plateforme cloud. Choisissez un notebook ci-dessous. Activez un accélérateur NVIDIA avant d'exécuter la première cellule."
---
# Google Colab

[Ouvrir le notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb) · [Google Colab](https://colab.research.google.com/github/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb)

Exécutez Ilaria RVC dans un navigateur avec un GPU fourni par la plateforme cloud. Choisissez un notebook ci-dessous. Activez un accélérateur NVIDIA avant d'exécuter la première cellule.

## Avant de commencer

Préparez un court fichier WAV propre et un modèle d'inférence compatible. Pour l'entraînement, conservez le dataset d'origine et quelques extraits de test séparés sur votre propre ordinateur. Le notebook s'exécute sur une machine Linux distante.

### Limites, unités de calcul et règles de Google Colab

Avant de lancer une session longue, comprenez comment [Google Colab](https://research.google.com/colaboratory/faq.html) gère les ressources :

- **Offre gratuite vs offres payantes (Compute Units) :** L'offre gratuite de Colab fournit des GPU selon la disponibilité, mais la durée d'exécution, les délais d'inactivité et le type de GPU (comme T4) sont dynamiques et jamais garantis. Les offres payantes (**Colab Pro**, **Pro+** et **Pay As You Go**) utilisent des **compute units** consommées dynamiquement selon le GPU/TPU choisi ; une fois votre solde épuisé, le compte revient aux limites de l'offre gratuite.
- **Activités interdites et restrictions WebUI :** La politique d'[Activités interdites](https://research.google.com/colaboratory/faq.html#disallowed-activities) de Google interdit d'héberger des fichiers, de servir des applications web publiques sans lien avec le calcul interactif, d'exécuter des proxys distants, de contourner les limites de sécurité/accès, d'utiliser plusieurs comptes pour contourner les quotas ou de créer des deepfakes. Bien que les notebooks Gradio interactifs ne soient pas systématiquement bannis dans tous les cas, laisser tourner des tunnels WebUI publics persistants sur l'offre gratuite déclenche fréquemment des déconnexions ou des avertissements.
- **Déconnexions, sauvegarde et confidentialité :** Colab peut déconnecter les sessions inactives ou longues et effacer le stockage local de la VM. Exportez vos résultats (`EXPORT = True`) ou synchronisez régulièrement vos checkpoints importants sur Google Drive, et n'importez jamais d'audio confidentiel ou d'identifiants dans des notebooks publics ou partagés.
- **Alternatives :** Si Colab se déconnecte ou manque de GPU disponibles, utilisez [Kaggle](kaggle.md) (quota GPU hebdomadaire gratuit après vérification téléphonique) ou [Lightning AI Studio](lightning-ai.md).

## Exécuter sur Google Colab

1. Ouvrez dans Colab et sélectionnez un environnement d'exécution GPU.
2. Exécutez les cellules 1 à 4 dans l'ordre. Elles vérifient le GPU, installent les dépendances, téléchargent les poids de base et lancent la Web UI. Réglez `TRAINING_SAMPLE_RATES` sur `[]` pour l'inférence seule ou choisissez les taux d'échantillonnage avec lesquels vous comptez entraîner.
3. Ouvrez la vue intégrée générée par la cellule de lancement. Gardez l'environnement connecté.

## Vérifier chaque cellule avant de continuer

La vérification du GPU doit identifier un périphérique NVIDIA. Sinon, changez d'abord l'accélérateur. Attendez la fin de l'installation des dépendances avant de télécharger les poids. Réglez `TRAINING_SAMPLE_RATES = []` pour l'inférence seule. Pour l'entraînement, choisissez le taux correspondant à votre modèle et à votre paire de pré-entraînés. Laissez `DOWNLOAD_FCPE` activé si vous prévoyez d'utiliser FCPE.

{{ include "kaggle.md#cloud-inference-dataset" }}

{{ include "kaggle.md#cloud-training" }}

## Exporter et arrêter

Définissez `EXPORT = True` et exécutez la cellule d'exportation. Activez `INCLUDE_CHECKPOINTS` si vous devez reprendre l'entraînement. Enregistrez le ZIP localement avant d'arrêter la session, puis exécutez la cellule d'arrêt avec `STOP = True`.

## Si le démarrage échoue

Si la première cellule ne voit pas le GPU, vérifiez votre accélérateur et relancez-la. Si l'interface ne s'ouvre pas, lisez la sortie de la cellule de lancement, confirmez que le serveur est prêt et rouvrez la vue.

### Vérifier le ZIP de sortie

Pour l'inférence, vérifiez votre WAV exporté et les fichiers du modèle. Pour l'entraînement, activez `INCLUDE_CHECKPOINTS` afin d'inclure les journaux d'expérience, puis vérifiez l'archive avant de fermer la session. Conservez le dataset d'origine séparément.

## Résoudre les problèmes courants

Si l'installation échoue, lisez la première erreur et relancez la cellule en échec après l'avoir corrigée. Si l'application s'ouvre mais que votre modèle manque, vérifiez le journal d'importation et actualisez la liste. En cas d'erreur de mémoire insuffisante (OOM), commencez par un extrait plus court ou réduisez la taille de lot (batch size) d'entraînement. Si la Web UI se ferme, rouvrez-la depuis la même cellule de lancement ou le même port tant que la session est active.

[Ilaria RVC dans le cloud](cloud.md)
