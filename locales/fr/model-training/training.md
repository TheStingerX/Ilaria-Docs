---
label: "🛠️ Former un modèle vocal"
order: 94
permalink: /training/
description: "La formation apprend une voix cible à partir d'une collection audio préparée."
---
# Former un modèle vocal RVC

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

La formation apprend une voix cible à partir d'une collection audio préparée. Utilisez ce guide lorsque vous souhaitez créer un modèle à partir de vos propres enregistrements ou de ceux autorisés. Si vous disposez déjà d'un modèle d'inférence, consultez [Modèles et fichiers RVC](../start/models.md) pour commencer à l'utiliser.

## Planifiez votre première course

Préparez l'audio avec le [guide de l'ensemble de données](dataset-preparation.md), puis sélectionnez-le dans **Formation**. Donnez à l'expérience un nom unique et choisissez un court enregistrement en dehors de l'ensemble de formation pour les tests d'écoute. Commencez par une exécution modeste qui peut franchir toutes les étapes et produire une exportation utilisable. Cela vous donne une base de référence pour les modifications apportées aux données ou aux paramètres.

Enregistrez la version de l'application, la révision de l'ensemble de données, le format du modèle et la fréquence d'échantillonnage, l'intégration, la méthode de pitch, la paire pré-entraînée, la taille du lot et l'intervalle de sauvegarde prévu. Ajoutez le nom du clip de test retenu. Si une exécution ultérieure semble différente, ces notes vous aident à identifier ce qui a changé.

## Choisissez les paramètres compatibles

 | Paramètres | Que vérifier |
| --- | --- |
 | Format du modèle, vocodeur et fréquence d'échantillonnage | Sélectionnez une combinaison prise en charge par l'application et le client de lecture prévu. Une architecture spécifique à un fork peut limiter l'endroit où votre modèle se charge. |
 | Guidage et extraction de la hauteur | Le guidage de la hauteur est utile pour modéliser des éléments dépendant de la hauteur, en particulier le chant. Choisissez un extracteur disponible pour la formation dans votre build. |
 | Intégrateur | Ceci définit la représentation extraite de l’audio. Enregistrez le choix afin de pouvoir utiliser la représentation correspondante dans les clients d'inférence pris en charge. |
 | Générateur et discriminateur pré-entraînés | Utilisez une paire adaptée compatible avec l'architecture, le débit et la configuration de pas sélectionnés. Les fichiers générateurs et discriminateurs remplissent différents rôles dans la formation. |
 | Taille du lot | Contrôle la quantité de données traitées par mise à jour. Commencez par un paramètre que votre GPU peut adapter et réduisez-le si l'entraînement manque de mémoire. |
 | Intervalle cible et point de contrôle | Une époque correspond à environ un passage dans l'ensemble de données préparé. Les étapes sont des mises à jour de formation individuelles. Enregistrez périodiquement afin de pouvoir comparer les exportations et récupérer après une interruption. |

Utilisez les choix de pré-entraînement indiqués comme compatibles par votre version installée. Dans Ilaria RVC 2.1.0, par exemple, le projet documente la formation RefineGAN à 32 kHz avec RVC V2 et guidage de pitch. La même version documente également un téléchargeur pour les paires pré-entraînées compatibles.

### Conseils de formation pratiques

- **Époques :** Essayez une première comparaison avec un objectif d'environ 200 époques et écoutez plusieurs sauvegardes antérieures. C'est un point de départ pour l'audition, puisque le point de contrôle le plus fort peut arriver plus tôt ou plus tard. Une exécution de 1 000 époques n’offre aucune garantie de qualité.
- **Lot et précision :** Commencez par un lot modéré, par exemple 8, et traitez 16 comme un point de départ supérieur conservateur. Réduisez-le si la mémoire est épuisée. La précision mixte FP16 peut réduire l’utilisation de la VRAM et accélérer la formation sur le matériel pris en charge. Vérifiez si votre build le permet déjà et essayez FP32 si la précision mixte produit des pertes non finies.
- **TensorBoard :** Utilisez des métriques pour suivre les progrès et repérer les exécutions bloquées ou instables. Les courbes de perte ne peuvent à elles seules déterminer quel point de contrôle sonne le mieux. Comparez les conversions des mêmes clips retenus.
- **Normalisation :** Dans les versions Applio avec ces contrôles, Pre ajuste les niveaux avant le découpage et Post les ajuste après le découpage. Utilisez Aucun si les niveaux d'origine conviennent déjà. Dans Ilaria RVC, Process Data applique automatiquement l’ajustement du niveau à chaque tranche. L’implémentation publique n’a pas de bascule Post distincte.
- **Filtrage du bruit :** Commencez par désactiver la réduction du bruit en option pour des enregistrements clairs. Si le frontal expose également un filtre passe-haut, utilisez-le pour un grondement audible à basse fréquence et comparez le résultat à l'oreille. Le filtrage passe-haut et la réduction du bruit sont des opérations distinctes.
- **Cache de l'ensemble de données GPU :** Laissez-le désactivé comme référence. Cela consomme de la VRAM supplémentaire. Mesurez le temps par époque avant de l'activer pour une durée plus longue.
- **Poids pré-entraînés :** Faites correspondre la paire G/D à l'architecture, au vocodeur, à la fréquence d'échantillonnage et à la configuration du pitch, et utilisez l'intégrateur spécifié par l'auteur du pré-entraînement. Pour les pré-formations RVC standard créées avec ContentVec, sélectionnez ContentVec pour l'extraction et l'inférence de fonctionnalités.

### Choisissez un tarif en utilisant la bande passante source

Vérifiez la fréquence d'échantillonnage dans les métadonnées du fichier et inspectez plusieurs clips représentatifs dans un visualiseur de spectrogramme tel que [Spek](https://www.spek.cc/p/download). Recherchez des détails vocaux utiles plutôt qu'un bruit isolé ou une coupure nette laissée par la compression. La moitié du taux d’échantillonnage d’entraînement est la fréquence la plus élevée que ce taux puisse représenter. Un modèle 32 kHz peut représenter des fréquences jusqu'à 16 kHz, un modèle 40 kHz jusqu'à 20 kHz et un modèle 48 kHz jusqu'à 24 kHz. Pour des détails utilisables au-dessus de 20 kHz, choisissez 48 kHz si l'architecture et la pré-formation le prennent en charge. Utilisez le débit compatible inférieur lorsqu’il couvre déjà la bande passante source. Le prétraitement peut rééchantillonner les enregistrements, mais ne peut pas restaurer les détails manquants.

## Exécuter les étapes dans l'ordre

 | Étape | Ce qu'elle produit | Que vérifier |
| --- | --- | --- |
 | Prétraitement de l'ensemble de données | Audio préparé pour la configuration du modèle de l'expérience. | Le journal nomme le dossier prévu et signale le traitement réussi des fichiers utilisables. Vérifiez les fichiers ignorés avant de continuer. |
 | Extraction de fonctionnalités | Fonctionnalités de contenu, ainsi que des données de pitch lorsque la configuration choisie l'exige. | L'extraction se termine pour l'expérience en cours en utilisant la méthode d'intégration et de pitch sélectionnée. |
 | Formation du modèle | Exportations de points de contrôle et d'inférences selon les options de sauvegarde configurées. | Les étapes de formation avancent et les fichiers attendus sont enregistrés. Lisez la première erreur si la progression s'arrête. |
 | Index de récupération | Une collection consultable de fonctionnalités d'ensemble de données pour une utilisation facultative lors de la conversion. | L'index appartient à cette expérience et correspond à la voix exportée. Si vous l'avez ignoré, testez le modèle indépendamment. |

Utilisez le flux de travail automatique lorsqu'il est disponible, ou terminez et vérifiez chaque étape avant de commencer la suivante. Un ensemble de données ou une fréquence d'échantillonnage modifiés peuvent invalider l'audio préparé et les fonctionnalités extraites. Un intégrateur modifié nécessite une nouvelle extraction de fonctionnalités. Lorsque vous testez une configuration incompatible, démarrez une expérience distincte afin que les caches et les points de contrôle existants restent disponibles.

## Suivez les progrès dans Ilaria RVC

- Utilisez **Training Dashboard** pour vérifier le nombre de pas, le temps par époque et les courbes de perte. Une courbe peut aider à expliquer une exécution bloquée, tandis que les tests d'écoute vous indiquent le son de la sortie.
- Configurez les **aperçus de formation** avec un clip de test constant afin que l'application puisse générer des conversions comparables à mesure que les points de contrôle sont enregistrés.
- Si vous utilisez la **file d'attente de formation**, définissez un nom d'expérience et un ensemble de données distincts pour chaque tâche. Avant de reprendre ou de réessayer, confirmez les étapes terminées par la tâche et l'endroit où la sortie sera enregistrée.
- Lorsque votre version expose **Arrêtez et enregistrez**, utilisez-la lorsque vous devez interrompre et continuer plus tard. Attendez que le point de contrôle ait fini d'écrire avant de fermer l'application.

Ilaria RVC 2.1.0 prend en charge les cibles d'époque et de pas total, y compris la reprise à mi-chemin d'une époque pour les cibles de pas. D'autres interfaces peuvent exposer différents contrôles et reprendre le comportement.

### Comparez les budgets de formation par étapes

Une époque est un passage dans l’ensemble de données préparé. Une étape de formation correspond à une mise à jour par lots. Divisez le nombre de clips après prétraitement par la taille effective du lot pour estimer les étapes par époque. Par exemple, 10 000 clips avec une taille de lot de 8 donnent 1 250 lots par époque dans une exécution avec un seul travailleur. L'abandon de lots partiels, l'utilisation de plusieurs GPU ou l'accumulation de gradients peuvent modifier la façon dont le formateur compte les mises à jour. Utilisez le nombre rapporté par votre exécution lorsque vous comparez les expériences.

Choisissez un intervalle de sauvegarde qui vous donne plusieurs points de contrôle à auditionner. Économiser environ toutes les 40 époques est un point de départ possible pour une course mesurée en centaines d’époques. Utilisez les mêmes clips retenus et paramètres d’inférence pour chaque comparaison. Écoutez l'intelligibilité, la hauteur stable, les pauses naturelles et les consonnes qui restent claires. Si les exportations ultérieures semblent plus dures ou fonctionnent bien sur quelques phrases seulement, comparez avec un point de contrôle antérieur et inspectez l'ensemble de données à la recherche de prises ou d'artefacts répétés. Choisissez le point de contrôle qui fonctionne le mieux pour vos entrées prévues.

## Comparez les exports en écoutant

Inférence ouverte avec un `.pth` exporté. Utilisez les mêmes courts enregistrements retenus et les mêmes paramètres de conversion pour comparer les modèles de différents points de contrôle. Si vous effectuez une comparaison d'index, maintenez le point de contrôle stable et comparez le même clip avec la récupération désactivée et activée.

Comparez ces quatre qualités à travers les exportations.

1. **Timbre.** L'enregistrement converti ressemble-t-il au caractère vocal prévu dans toute la phrase ?
2. **Intelligibilité.** Les consonnes et les terminaisons de mots sont-elles toujours faciles à comprendre ?
3. **Stabilité de la hauteur.** Les notes ou les syllabes sautent, gazouillent ou perdent leur inflexion prévue ?
4. **Artefacts.** La sortie ajoute-t-elle un bourdonnement, un bruit de pièce intégré, des queues dures ou des transitions étranges ?

Conservez la meilleure exportation et ses sorties de test. D’autres époques peuvent valoir la peine d’être essayées lorsque les résultats s’améliorent sur plusieurs exemples. Si les exportations ultérieures n’améliorent qu’un seul clip ou commencent à reproduire des défauts de l’ensemble de données, revenez à la meilleure référence et examinez les enregistrements.

## Exporter, reprendre ou partager

- **Utiliser en inférence.** Sélectionnez le modèle exporté `.pth`. Gardez son `.index` correspondant à côté lorsque vous souhaitez le récupérer. Enregistrez toutes les informations requises sur l'intégration, le client pris en charge et la fréquence d'échantillonnage.
- **Reprendre la formation.** Sauvegardez l'expérience et conservez les points de contrôle de formation du générateur et du discriminateur correspondants, communément appelés `G_*.pth` et `D_*.pth`. Reprenez avec la même expérience et la même configuration compatible, puis inspectez le journal pour connaître le point de contrôle et l'étape ou l'époque que vous attendiez. Une exportation d'inférence à elle seule ne dispose pas de l'état de formation complet.
- **Partagez un modèle.** Partagez uniquement les fichiers que vous êtes autorisé à distribuer. Incluez des exemples d'écoute, des notes de compatibilité, l'index correspondant si utile et tous les termes d'utilisation dont le destinataire a besoin.

Dans Ilaria RVC, les versions récentes utilisent la bibliothèque de modèles pour les exportations d'inférences et les index associés. Les chemins d’exportation et les noms peuvent différer selon les interfaces. Enregistrez les journaux d'expérience séparément si vous souhaitez recréer le modèle ultérieurement.

## Diagnostiquer un échec d'exécution

 | Symptôme | Vérifiez d'abord |
| --- | --- |
 | Le prétraitement n'a trouvé aucun audio | Vérifiez le dossier de l'ensemble de données sélectionné et lisez un clip d'entrée. Vérifiez si votre build lit les dossiers imbriqués. |
 | L'extraction échoue ou signale un modèle manquant | Vérifiez les actifs de l'intégrateur et du modèle de pitch sélectionnés, et lisez le premier message dans le journal d'extraction. |
 | La mémoire GPU s'épuise | Réduisez la taille du lot, arrêtez les tâches GPU concurrentes et désactivez la mise en cache des ensembles de données GPU si votre build offre ce contrôle. Réessayez l'étape défaillante. |
 | La formation redémarre au début | Vérifiez que l'expérience pointe vers des points de contrôle de formation compatibles et que toute option de nouveau départ est désactivée. |
 | Un `.pth` ne se chargera pas pour la conversion | Vérifiez si vous avez sélectionné un point de contrôle de formation au lieu d'une exportation d'inférence, et vérifiez la compatibilité de l'architecture et de l'intégration avec le client. |
 | Un modèle utilisable n'a pas d'index | Vérifiez si la génération d'index a été ignorée ou a échoué. Exportez et testez le point de contrôle indépendamment, puis créez son index à partir de l'expérience correspondante si nécessaire. |

Conserver le premier message d'échec et la configuration associée à l'exécution. Pour plus de vérifications, voir [Dépannage](../reference/troubleshooting.md).
