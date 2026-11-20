# Préparer un ensemble de données vocales

[Télécharger Ilaria RVC 2.4.0 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Chaque clip apprend au modèle quelque chose sur sa voix cible. Avant l'entraînement, décidez quelles parties de cette voix vous souhaitez que le modèle gère, puis conservez des enregistrements qui démontrent clairement ces parties. Commencez par le matériel que vous êtes autorisé à utiliser pour la formation et conservez une copie séparée des fichiers originaux.

## Choisissez des enregistrements pour votre objectif

 | Objectif | Que collecter |
| --- | --- |
 | Discours conversationnel | Questions, déclarations, phrases plus longues et réponses courtes avec des consonnes et des voyelles variées. |
 | Discours expressif | Les styles de prestation prévus aux niveaux calme et emphatique. Enregistrez les variations sur plusieurs phrases. |
 | Chant | Voyelles soutenues, changements de notes et exemples proches des extrémités hautes et basses confortables de la plage prévue. |
 | Plus d'une langue | Des exemples clairs de sons et de phrases qui diffèrent selon les langues, enregistrés par le même locuteur. |

> ContentVec peut limiter les modèles multilingues. Même si la langue cible figure dans les données, l’encodeur peut perdre des distinctions phonétiques. Réservez des enregistrements de test pour chaque langue et comparez leur prononciation après un court entraînement. Si les mêmes erreurs se répètent sur des extraits propres, documentez la limite pour cette langue. Changer l’encodeur ou la configuration d’entraînement ne constitue pas une solution fiable.

Un ensemble d'enregistrements propres et variés est un meilleur point de départ qu'une plus grande collection de phrases répétées ou d'audio endommagé. Aucune durée ne garantit un bon résultat. Vérifiez ce que couvrent les enregistrements avant de décider si vous avez besoin de plus de matériel.

## Planifiez une séance d'enregistrement expressive

Un enregistrement peut être exempt de bruit et ne couvrir que très peu de voix. Construisez la session autour des performances que vous espérez convertir. Pour la narration, enregistrez une lecture claire avec une formulation intentionnelle. Pour la conversation, incluez des réponses spontanées et des changements de rythme. Pour le chant, le recueil sec a cappella traverse le registre prévu, avec des voyelles soutenues et des transitions entre les notes. Les lignes parlées à elles seules donnent au modèle peu d’exposition à ces sons chantés.

Enregistrez-vous, ou convenez du modèle prévu et de son utilisation avec l'interprète avant l'enregistrement. Pour une conversation à distance, demandez à l'orateur de capturer son propre microphone localement et d'utiliser uniquement cette piste.

 | Bloc de session | Exemple d'allocation | Que capturer |
| --- | --- | --- |
 | Narration expressive | 10 minutes | Lisez un passage avec des changements d'accent, d'émotion et de rythme. |
 | Conversation | 10 minutes | Recueillez des discours non scriptés avec des questions, des réactions courtes et des réponses plus longues. |
 | Couverture phonétique | 10 minutes | Utilisez du matériel tel que Harvard Sentences, Rainbow Passage ou Comma Gets a Cure pour exercer les voyelles, les diphtongues, les arrêts comme P/B/T/K et les sifflantes comme S/Z/SH. |
 | Plage de performance | 20 minutes | Enregistrez la prestation dont le modèle a besoin, de la parole douce à la projection. Essayez des tempos, des émotions variés et des rires ou des soupirs clairs, le cas échéant. Pour un modèle multilingue, incluez une couverture intentionnelle des langues cibles. |

Ce plan de 50 minutes est un exemple de discours expressif. Un ensemble ciblé de dix minutes peut être plus utile qu’un ensemble plus important d’enregistrements répétitifs ou endommagés. Ajoutez du matériau pour combler un espace audible dans la couverture. La durée de l'ensemble de données à elle seule ne détermine pas le surapprentissage.

### Configurer le microphone

Capturez un seul microphone sur une piste mono. Utilisez un filtre anti-pop ou un pare-brise, maintenez la distance du micro constante et réglez le gain tout en testant la ligne prévue la plus forte. Une pièce calme avec des meubles rembourrés réduit les reflets à la source. Préférez un original sec à un enregistrement très nettoyé avec une réverbération audible ou des artefacts de séparation. Si vous convertissez des enregistrements stéréo existants en mono, écoutez les deux canaux et le repli. Utilisez un canal clair si le signal combiné semble creux ou perd des détails.

### Vérifiez l'audio préparé

- **Taux d'échantillonnage :** Conservez les originaux à leur taux d'enregistrement. Choisissez un rythme d'entraînement pris en charge par l'architecture et les poids pré-entraînés. L'étape de prétraitement peut rééchantillonner si nécessaire. Le suréchantillonnage n’ajoute aucun détail à l’enregistrement original.
- **Niveaux :** Comparez les niveaux de session et corrigez les grandes différences de gain causées par le placement du micro ou les paramètres d'enregistrement. Préservez les changements intentionnels dans la livraison. Vérifiez ce que l'interface de formation normalise déjà avant d'appliquer une passe de volume distincte.
- **Respirations et réactions :** Gardez les respirations naturelles et les signaux expressifs propres là où ils servent à l'usage prévu. Coupez les rires coupés, les halètements durs et les éclats plosifs. Auditionnez des modifications incertaines dans un casque.
- **Pauses :** Conservez les pauses naturelles et supprimez les longues périodes vides. Si vous souhaitez tester un clip de silence autonome, effectuez une comparaison avec les mêmes paramètres et écoutez les pauses prolongées. Certains pipelines de prétraitement gèrent déjà le silence.

## Enregistrer ou sélectionner du matériel propre

- Utiliser une enceinte pour un premier modèle. Excluez les voix qui se chevauchent, les réponses de la foule et les dialogues dans lesquels l'orateur change au milieu du clip.
- Écoutez le bruit des ventilateurs, les échos, la musique et la distorsion numérique. Un clip qui semble acceptable dans un mixage fort peut néanmoins contenir des problèmes évidents lorsque la voix est isolée.
- Si vous enregistrez une nouvelle session, utilisez une position de micro cohérente et laissez une marge maximale. Testez la phrase la plus forte avant d'enregistrer la session complète.
- Lorsque vous combinez des sessions, écoutez-les côte à côte. Conservez des variations utiles dans la voix et éliminez les différences brusques causées par des effets lourds, le son de la pièce ou un microphone peu fiable.
- Supprimez les prises en double si elles ajoutent peu de variété. Mettez différentes sessions ou passages de côté pour évaluation avant de modifier les coupes adjacentes dans le dossier de formation.

## Nettoyez une copie de travail

1. **Isolez la voix cible.** Si la source comprend un accompagnement, essayez de séparer et d'auditionner la racine vocale résultante. Rejetez les sections comportant des saignements d'instruments, des chœurs ou des artefacts de séparation évidents.
2. **Faites des coupes aux limites naturelles.** Coupez l'air mort depuis longtemps et supprimez les sections inutilisables. Écoutez chaque morceau pour déceler les consonnes perdues, les changements brusques ou l'entrée d'un deuxième locuteur.
3. **Appliquez uniquement le nettoyage dont l'enregistrement a besoin.** Comparez toute passe de débruitage à l'original. Si la version nettoyée avale des consonnes, brouille les syllabes ou introduit un son pulsé, réduisez le traitement ou remplacez la prise.
4. **Vérifiez les niveaux dans les fichiers.** Gardez suffisamment de marge pour les passages forts et équilibrez les différences majeures de niveau d'enregistrement. Baisser le volume d'un fichier déjà écrêté laisse les pics endommagés dans l'enregistrement.
5. **Exportez dans un format sans perte que votre build peut lire.** WAV est un format de travail pratique. Le réencodage d'un fichier compressé au format WAV préserve le résultat de ce décodage et ne peut pas restaurer les détails perdus.

Le moteur de formation peut diviser les fichiers en ses propres segments et les rééchantillonner selon la configuration du modèle sélectionné. Conservez intacts les mots et les expressions utilisables lors de l’édition manuelle et laissez l’étape de prétraitement de la formation gérer sa propre segmentation.

## Organisez l'ensemble de données et les tests d'écoute

Conservez les entrées de comparaison, les enregistrements supprimés et les sorties converties en dehors du dossier de formation. Cet exemple utilise des dossiers distincts pour les originaux, la formation et l'évaluation.

```text
my-voice-project/
  originals/
  training-audio/
    session-a-01.wav
    session-a-02.wav
    session-b-01.wav
  evaluation/
    speech-test.wav
    expressive-test.wav
  notes.md
```

Pointez le prétraitement sur `training-audio/`. Gardez `evaluation/` séparé. Un ensemble de comparaison utile pourrait inclure une phrase parlée inconnue avec des consonnes pointues, un passage calme et une courte phrase expressive. Pour un modèle chantant, incluez une note tenue et une phrase traversant les registres. Retenez des passages ou des sessions entières lorsque vous le pouvez, afin que l'audio du test ne duplique pas les clips d'entraînement à proximité.

Si vous vous entraînez avec une interface prenant en charge plusieurs haut-parleurs, suivez ses règles de dossier de haut-parleur et d'identification. Un dossier à haut-parleur unique contenant directement des fichiers audio est plus facile à auditer pour une première exécution.

## Examiner l'ensemble de données dans Ilaria RVC

Les versions récentes d'Ilaria RVC vous permettent de faire glisser un fichier audio ou un ensemble de données ZIP dans l'interface de formation et d'y gérer les ensembles de données importés. Sélectionnez l'ensemble de données souhaité et exécutez le **Dataset Checker**. Utilisez ses courts aperçus pour inspecter les fichiers signalés pour des problèmes de silence, d'écrêtage, de niveaux incohérents ou de décodage. L'**Audio Analyzer** peut vous aider à comparer les fichiers suspects à l'aide de mesures de formes d'onde, de hauteur et de niveau. Confirmez le diagnostic en écoutant avant de retirer tout matériel autrement utile. Les étiquettes de disponibilité et de contrôle suivent votre version installée.

 | Ce que vous remarquez | Que faire avant l'entraînement |
| --- | --- |
 | Le fichier ne sera pas décodé | Vérifiez qu'il est lu dans un éditeur. Réexportez à partir de l'original si possible et vérifiez que la copie s'ouvre. |
 | Sections de quasi-silence | Écoutez la plage signalée et coupez les étendues vides. Conservez des pauses naturelles qui aident à préserver les limites des phrases. |
 | Pics déformés ou aplatis | Comparez avec l'enregistrement original. Remplacez une prise écrêtée de manière audible lorsque vous disposez d’une alternative propre. |
 | Les bruits de fond suivent la voix | Écoutez la tige isolée dans un casque et excluez les parties affectées lorsque la séparation semble instable. |
 | Une session est beaucoup plus silencieuse | Vérifiez si la performance de l'orateur est intentionnellement silencieuse. Ajustez les différences de gain d’enregistrement tout en conservant une dynamique naturelle utile. |

Avant de continuer, lisez quelques clips de chaque session, confirmez que vous avez sélectionné le dossier préparé et enregistrez la version du dossier dans vos notes. Ensuite, [lancez une expérience de formation](training.md).
