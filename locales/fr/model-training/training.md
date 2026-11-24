---
label: "🛠️ Entraîner un modèle vocal"
order: 94
permalink: /training/
description: "L'entraînement apprend une voix cible à partir d'une collection préparée d'audio. Utilisez ce guide pour créer un modèle à partir de vos propres enregistrements ou d'enregistrements autorisés."
---
# Entraîner un modèle vocal RVC

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

L'entraînement apprend une voix cible à partir d'une collection préparée d'audio. Utilisez ce guide lorsque vous souhaitez créer un modèle à partir de vos propres enregistrements ou d'enregistrements autorisés. Si vous avez déjà un modèle d'inférence, consultez [Modèles et fichiers RVC](../start/models.md) pour commencer à l'utiliser.

## Planifier votre premier entraînement

Préparez l'audio avec le [guide du dataset](dataset-preparation.md), puis sélectionnez-le dans **Training**. Donnez à l'expérience un nom unique et choisissez un court enregistrement en dehors du jeu d'entraînement pour les tests d'écoute. Commencez par une exécution modeste capable d'achever toutes les étapes et de produire un export utilisable. Cela vous donne une base pour évaluer vos changements de données ou de réglages.

Notez la version de l'application, la révision du dataset, le format et le taux d'échantillonnage du modèle, l'embedder, la méthode de hauteur, la paire pré-entraînée, la taille de lot (batch size) et l'intervalle de sauvegarde prévu. Ajoutez le nom de l'extrait de test mis de côté. Si une exécution ultérieure sonne différemment, ces notes aident à identifier ce qui a changé.

## Choisir des réglages compatibles

| Réglage | Quoi vérifier |
| --- | --- |
| Format de modèle, vocodeur et sample rate | Choisissez une combinaison prise en charge par l'appli et le client de lecture prévu. Une architecture propre à un fork peut limiter où le modèle se charge. |
| Guidage et extraction de hauteur | Le guidage de hauteur est utile pour modéliser des contenus dépendants de la justesse, surtout le chant. Choisissez un extracteur disponible pour l'entraînement dans votre version. |
| Embedder | Définit la représentation extraite de l'audio. Notez ce choix afin d'utiliser la représentation correspondante dans les clients d'inférence compatibles. |
| Générateur et discriminateur pré-entraînés | Utilisez une paire assortie compatible avec l'architecture, le taux et la configuration de hauteur choisis. Les fichiers générateur et discriminateur ont des rôles distincts pendant l'entraînement. |
| Batch size | Contrôle la quantité de données traitée par mise à jour. Commencez par une valeur qui tient dans votre GPU et baissez-la si la mémoire sature. |
| Cible et intervalle de checkpoint | Une époque correspond environ à un passage complet sur le dataset préparé. Les pas sont des mises à jour individuelles d'entraînement. Sauvegardez régulièrement pour comparer les exports et reprendre après une interruption. |

RefineGAN prend en charge l’entraînement et l’inférence à 32, 40 et 44,1 kHz avec RVC v2 et Pitch Guidance.

### Conseils pratiques d'entraînement

- **Époques :** Essayez un premier test comparatif visant environ 200 époques et écoutez plusieurs sauvegardes antérieures. C'est un point de départ pour l'écoute, car le meilleur checkpoint peut arriver plus tôt ou plus tard. Une exécution de 1,000 époques n'offre aucune garantie de qualité.
- **Batch et précision :** Commencez avec un batch modéré, par exemple 8, et considérez 16 comme un plafond de départ prudent. Réduisez-le si la mémoire manque. La précision mixte FP16 peut réduire la VRAM et accélérer l'entraînement sur matériel compatible. Vérifiez si votre build l'active déjà et essayez FP32 si la précision mixte produit des pertes non finies.
- **TensorBoard :** Utilisez les métriques pour suivre l'avancement et repérer les exécutions bloquées ou instables. Les courbes de perte seules ne disent pas quel checkpoint sonne le mieux. Comparez les conversions sur les mêmes extraits de test mis de côté.
- **Normalisation :** Dans les builds Applio dotés de ces contrôles, Pre ajuste les niveaux avant découpage et Post les ajuste après. Utilisez None si les niveaux d'origine conviennent déjà. Dans Ilaria RVC, Process Data ajuste automatiquement le niveau de chaque segment. L'implémentation publique n'a pas de bouton Post séparé.
- **Filtrage du bruit :** Commencez avec la réduction de bruit optionnelle désactivée pour les enregistrements propres. Si l'interface expose aussi un filtre passe-haut, utilisez-le en cas de grondement basse fréquence audible et comparez à l'oreille. Filtrage passe-haut et réduction de bruit sont deux opérations distinctes.
- **Cache GPU du dataset :** Laissez-le désactivé pour votre base de référence. Il consomme de la VRAM supplémentaire. Mesurez le temps par époque avant de l'activer pour une longue session.
- **Poids pré-entraînés :** Associez la paire G/D à l'architecture, au vocodeur, au sample rate et à la configuration de hauteur, et utilisez l'embedder indiqué par l'auteur du pré-entraînement. Pour les pré-entraînements RVC standard bâtis avec ContentVec, choisissez ContentVec pour l'extraction de caractéristiques et l'inférence.

### Choisir une fréquence selon la bande passante source

Vérifiez le sample rate dans les métadonnées du fichier et inspectez plusieurs extraits représentatifs dans un spectrogramme tel que [Spek](https://www.spek.cc/p/download). Cherchez du détail vocal utile plutôt que du bruit isolé ou une coupure nette due à la compression. La moitié du sample rate d'entraînement est la fréquence maximale représentable par ce taux. Un modèle 32 kHz représente jusqu'à 16 kHz, un modèle 40 kHz jusqu'à 20 kHz et un modèle 48 kHz jusqu'à 24 kHz. Pour du détail utile au-delà de 20 kHz, choisissez 48 kHz si l'architecture et le pré-entraînement le permettent. Utilisez le taux compatible inférieur lorsqu'il couvre déjà la bande passante source. Le prétraitement peut rééchantillonner, mais ne restaure pas un détail absent.

## Exécuter les étapes dans l'ordre

| Étape | Ce qu'elle produit | Quoi vérifier |
| --- | --- | --- |
| Prétraitement du dataset | Audio préparé pour la configuration modèle de l'expérience. | Le journal nomme le dossier prévu et signale le traitement réussi des fichiers utilisables. Vérifiez les fichiers ignorés avant de continuer. |
| Extraction de caractéristiques | Caractéristiques de contenu, plus données de hauteur lorsque la configuration choisie l'exige. | L'extraction se termine pour l'expérience courante avec l'embedder et la méthode de hauteur choisis. |
| Entraînement du modèle | Checkpoints et exports d'inférence selon les options de sauvegarde configurées. | Les pas d'entraînement avancent et les fichiers attendus sont enregistrés. Lisez la première erreur si la progression s'arrête. |
| Index de recherche (retrieval) | Collection consultable de caractéristiques du dataset pour usage optionnel en conversion. | L'index appartient à cette expérience et correspond à la voix exportée. Si vous l'avez ignoré, testez le modèle indépendamment. |

Utilisez le flux automatique lorsqu'il existe, ou terminez et vérifiez chaque étape avant de lancer la suivante. Modifier le dataset ou le sample rate peut invalider l'audio préparé et les caractéristiques extraites. Changer d'embedder impose une nouvelle extraction. Pour tester une configuration incompatible, démarrez une expérience séparée afin de préserver caches et checkpoints existants.

## Suivre l'avancement dans Ilaria RVC

- Utilisez **Training Dashboard** pour consulter le nombre de pas, le temps par époque et les courbes de perte. Une courbe aide à expliquer un blocage, tandis que l'écoute révèle la qualité sonore réelle.
- Configurez les **aperçus d'entraînement** avec un extrait de test constant pour générer des conversions comparables lors des sauvegardes.
- Si vous utilisez **Training Queue**, attribuez un nom d'expérience et un dataset distincts à chaque tâche. Avant de reprendre ou relancer, confirmez quelles étapes la tâche a terminées et où elle enregistrera la sortie.
- Lorsque votre version propose **Stop and save**, utilisez-le pour interrompre et reprendre plus tard. Attendez la fin de l'écriture du checkpoint avant de fermer l'application.

Ilaria RVC 2.1.0 prend en charge les cibles en époques et en pas totaux, y compris la reprise en milieu d'époque pour les cibles en pas. D'autres interfaces peuvent offrir des contrôles et comportements différents.

### Comparer les budgets d'entraînement en pas

Une époque est un passage sur le dataset préparé. Un pas d'entraînement est une mise à jour de batch. Divisez le nombre de clips après prétraitement par la taille de batch effective pour estimer les pas par époque. Par exemple, 10,000 clips avec un batch de 8 donnent 1,250 batches par époque sur un seul worker. Des batches partiels écartés, plusieurs GPU ou l'accumulation de gradient peuvent modifier le comptage. Utilisez le total rapporté par votre session lors des comparaisons.

Choisissez un intervalle de sauvegarde offrant plusieurs checkpoints à écouter. Sauvegarder environ toutes les 40 époques est un point de départ possible pour un entraînement en centaines d'époques. Utilisez les mêmes extraits mis de côté et les mêmes réglages d'inférence à chaque comparaison. Écoutez intelligibilité, stabilité de hauteur, pauses naturelles et consonnes nettes. Si les exports tardifs deviennent plus durs ou ne marchent que sur quelques phrases, comparez avec un checkpoint antérieur et vérifiez le dataset pour détecter doublons ou artefacts. Choisissez le checkpoint le plus homogène sur vos entrées prévues.

## Comparer les exports à l'écoute

Ouvrez l'inférence avec un `.pth` exporté. Utilisez les mêmes courts extraits mis de côté et les mêmes réglages de conversion pour comparer différents checkpoints. Pour comparer l'index, gardez le checkpoint fixe et testez le même extrait avec retrieval désactivé puis activé.

Comparez ces quatre qualités entre exports.

1. **Timbre.** L'enregistrement converti ressemble-t-il au caractère vocal visé sur toute la phrase ?
2. **Intelligibilité.** Les consonnes et fins de mots restent-elles faciles à comprendre ?
3. **Stabilité de hauteur.** Les notes ou syllabes sautent-elles, tremblent-elles ou perdent-elles l'inflexion voulue ?
4. **Artefacts.** La sortie ajoute-t-elle bourdonnement, bruit de pièce incrusté, queues dures ou transitions étranges ?

Conservez le meilleur export et ses rendus de test. Poursuivre les époques peut valoir la peine si plusieurs exemples s'améliorent. Si les exports suivants n'améliorent qu'un extrait ou reproduisent des défauts du dataset, revenez à la meilleure base et réexaminez vos enregistrements.

## Exporter, reprendre ou partager

- **Utiliser en inférence.** Sélectionnez le modèle `.pth` exporté. Gardez son `.index` correspondant à côté pour le retrieval. Notez l'embedder requis, le client compatible et le sample rate.
- **Reprendre l'entraînement.** Sauvegardez l'expérience et conservez les checkpoints d'entraînement assortis du générateur et du discriminateur, généralement nommés `G_*.pth` et `D_*.pth`. Reprenez avec la même expérience et une configuration compatible, puis vérifiez dans le journal le checkpoint et le pas/époque attendus. Un export d'inférence seul ne contient pas l'état complet d'entraînement.
- **Partager un modèle.** Ne partagez que les fichiers que vous avez le droit de distribuer. Joignez des extraits d'écoute, notes de compatibilité, l'index correspondant si utile et les conditions d'utilisation requises.

Dans Ilaria RVC, les versions récentes utilisent la bibliothèque de modèles pour les exports d'inférence et index associés. Les chemins et noms peuvent varier selon les interfaces. Conservez séparément les journaux d'expérience pour pouvoir recréer le modèle plus tard.

## Diagnostiquer une exécution échouée

| Symptôme | À vérifier en premier |
| --- | --- |
| Le prétraitement n'a trouvé aucun audio | Vérifiez le dossier dataset choisi et écoutez un extrait source. Vérifiez si votre version lit les sous-dossiers imbriqués. |
| L'extraction échoue ou signale un modèle manquant | Vérifiez les ressources embedder et pitch choisies, puis lisez le premier message du journal d'extraction. |
| La mémoire GPU sature | Réduisez le batch size, fermez d'autres tâches GPU et désactivez le cache dataset GPU si votre version propose ce réglage. Relancez l'étape. |
| L'entraînement repart du début | Vérifiez que l'expérience pointe vers des checkpoints d'entraînement compatibles et qu'aucune option de réinitialisation n'est cochée. |
| Un `.pth` ne se charge pas en conversion | Vérifiez si vous avez sélectionné un checkpoint d'entraînement au lieu d'un export d'inférence, et confirmez compatibilité architecture/embedder. |
| Un modèle utilisable n'a pas d'index | Vérifiez si la génération d'index a été ignorée ou a échoué. Exportez et testez le checkpoint seul, puis générez son index depuis l'expérience si besoin. |

Conservez le premier message d'erreur et la configuration associée. Pour d'autres vérifications, voir [Dépannage](../reference/troubleshooting.md).

## Profils indicatifs d'entraînement (à adapter aux données et au matériel)

Ces trois profils sont des **points de départ indicatifs**, pas des règles universelles. Adaptez toujours **Batch Size** à votre VRAM et jugez les checkpoints à l'écoute sur les mêmes extraits mis de côté.

### Entraînement Débutant (Base Sûre)

- **Idéal pour :** Premier modèle vocal, 5-15 minutes d'audio propre d'un seul locuteur, GPU 6-8 Go VRAM.
- **Réglages :** RVC **v2** · **40 kHz** · Pitch Guidance **ON** (`rmvpe`) · Embedder `contentvec` · Pré-entraîné HiFi-GAN standard/vérifié · **Batch Size `4-8`** · **Epochs `200`** (sauvegarde toutes les `25-50` époques) · Précision **FP32** (ou **BF16** sur RTX 30/40/50) · GPU Caching **OFF** · Workers `2` · Fused AdamW **OFF**.
- **Pourquoi :** Privilégie la stabilité et évite les manques de mémoire ou le surapprentissage précoce tout en produisant plusieurs checkpoints à comparer.

### Entraînement Intermédiaire (Équilibre Qualité et Vitesse)

- **Idéal pour :** 15-30 minutes de parole/chant propres, GPU 8-12 Go VRAM.
- **Réglages :** RVC **v2** · **40 kHz** ou **48 kHz** (si la bande source dépasse 20 kHz) · `rmvpe` · `contentvec` ou `klm-vocal-contentvec` / `spin-v2` (assorti au pré-entraîné) · **Batch Size `8-12`** · **Epochs `250-350`** (ou **Total Steps** équivalents) · Sauvegarde toutes les `25-50` époques · Précision **BF16** (RTX 30/40/50) ou **FP16** (T4/RTX 20) · Workers `4`, Prefetch `4-8` · Générer un **index FAISS `Auto`** après choix du meilleur checkpoint.
- **Pourquoi :** Utilise une précision mixte plus rapide et des lots plus grands tout en gardant des sauvegardes régulières et des aperçus d'écoute.

### Entraînement Avancé et Optimisation

- **Idéal pour :** Grands datasets ou multi-émotions/chant soignés, 12-24 Go+ VRAM, pré-entraînés personnalisés.
- **Réglages :** RVC **v2** · Sample rate assorti (`32/40/44.1/48 kHz`) et vocodeur (`HiFi-GAN`, `MRF HiFi-GAN`, ou `RefineGAN` à `32/40/44.1 kHz` dans Ilaria RVC) · Pré-entraîné G/D et embedder personnalisés/assortis · **Batch Size `12-16+`** · Cible **Total Steps** (mises à jour de gradient cohérentes quelle que soit la taille du dataset) · **GPU Caching ON** (uniquement si la VRAM contient aisément le dataset ; mesurez d'abord le temps par époque) · **Fused AdamW ON** (à tester sur une nouvelle session) · **Training Queue** pour tests A/B nocturnes · Suivi **TensorBoard** + comparaison **Audio Analyzer**.
- **Learning rate :** La plupart des WebUIs RVC (dont Ilaria RVC) utilisent le planning d'optimiseur RVC v2 standard (`1e-4` de base) ; ne modifiez le learning rate dans les interfaces qui l'exposent que si vous maîtrisez sa mise à l'échelle avec le batch size.

## Repérer Underfitting vs. Overfitting à l'oreille

1. **Underfitting (trop tôt) :** La sortie ressemble encore surtout au locuteur d'entrée, manque le timbre cible sur les voyelles tenues ou perd en caractère dans les aigus/graves. *Solution :* Poursuivez l'entraînement depuis le dernier checkpoint `G_*.pth`/`D_*.pth`.
2. **Overfitting (trop tard) :** La voix sonne robotique/métallique sur des mots nouveaux, reproduit le bruit de pièce ou les artefacts de respiration du dataset, ou ne sonne bien *que* sur des phrases proches du jeu d'entraînement. *Solution :* Revenez à un checkpoint antérieur (`50-100` époques plus tôt) et inspectez le dataset dans [Audio Analyzer](../ilaria-rvc/manage/audio-analyzer.md).

> Si vous entraînez avec **Redpanda-vc** (qui ajoute Generator EMA et sauvegarde de checkpoints par pas), consultez [Entraîner des modèles RVC dans Redpanda-vc](../other-rvcs/training/redpanda/training.md).
