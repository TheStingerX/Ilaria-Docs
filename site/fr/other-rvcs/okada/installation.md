# Installez w-okada VCClient

[GitHub](https://github.com/w-okada/voice-changer) · [Hugging Face](https://huggingface.co/wok000/vcclient000)

VCClient convertit l'audio du microphone en direct. L'interface est le **client** et le processus de conversion est le **serveur**. Pour votre premier test, exécutez les deux sur le même ordinateur. La version client (v1 ou v2) et la version modèle (RVC V1 ou V2) identifient des choses différentes. Vérifiez la prise en charge du modèle du package avant de choisir un fichier.

## Avant de télécharger

1. Vérifiez votre système d'exploitation et l'architecture de votre processeur. Sous Windows, ouvrez **Task Manager → Performance** et lisez le modèle GPU. Sur Mac, ouvrez **À propos de ce Mac** et recherchez une puce Apple ou un processeur Intel.
2. Branchez votre micro et vos écouteurs. Effectuez un court enregistrement dans le système d'exploitation pour vérifier le microphone indépendamment de VCClient.
3. Gardez à disposition un modèle d'inférence RVC connu et fonctionnel. Un `.pth` est un modèle PyTorch, tandis qu'un `.onnx` utilise un runtime ONNX. Utilisez la correspondance facultative `.index` uniquement avec le modèle auquel elle appartient. Voir [Modèles et fichiers](../../start/models.md) si vous avez reçu un ZIP ou un ensemble de points de contrôle de formation.

## Choisissez un package

Ouvrez [Téléchargements VCClient sur Hugging Face](https://huggingface.co/wok000/vcclient000/tree/main). Choisissez un fichier parmi les versions de w-okada qui correspond à ce tableau. Le numéro de version remplace la partie variable du nom de fichier.

| Votre ordinateur | Package à rechercher | Que vérifier |
| --- | --- | --- |
| Windows avec GPU NVIDIA pris en charge | v2 Windows CUDA, `vcclient_win_cuda_….zip` | Sélectionnez la carte NVIDIA réelle dans l'application. Utilisez un processeur ou une version standard si le runtime installé ne peut pas utiliser votre GPU. |
| Windows avec AMD ou une configuration CPU uniquement | Norme Windows v2, `vcclient_win_std_….zip` | Testez le périphérique DirectML s’il est pris en charge. La conversion du processeur est une option, dont la vitesse est déterminée par le modèle et le processeur. Vérifiez les fournisseurs disponibles avant d’importer un modèle. |
| Windows avec graphiques Intel | Une version standard ou héritée compatible | Dans la configuration Windows v1 documentée, l'accélération GPU AMD et Intel est destinée aux modèles ONNX. Sélectionnez CPU si votre package standard ne détecte pas de fournisseur de GPU utilisable pour votre modèle. |
| Apple Silicon Mac | v2 Mac, `vcclient_mac_….zip` | Vérifiez que l'actif cible Apple Silicon. Testez avec les formats de fournisseur et de modèle RVC répertoriés par cette version. |
| Linux | Distribution source et runtime pris en charge | La configuration d'une source ou d'un conteneur dédié est distincte des binaires Windows et Mac. Faites correspondre CUDA, le runtime AMD pris en charge ou le processeur à votre matériel. |

Pour Windows v2, le projet répertorie à la fois la prise en charge de Torch et ONNX. Un fichier donné peut toujours utiliser un fournisseur différent d'un autre fichier sur la même version. Conservez le modèle original lorsque vous essayez un format différent. Renommer l'extension du nom de fichier ne le convertit pas.

## Démarrez sous Windows

1. Extrayez l'intégralité du ZIP dans un dossier ordinaire en écriture. Utilisez un dossier distinct pour chaque build que vous testez. L'exécution d'un lanceur depuis l'archive peut l'empêcher de trouver son environnement d'exécution.
2. Ouvrez le dossier extrait et exécutez `start_http.bat` pour une configuration sur le même ordinateur. Gardez sa console ouverte. Si le package propose plusieurs lanceurs, choisissez celui pour le runtime téléchargé et la connexion locale.
3. Attendez le démarrage et tout téléchargement d'actifs de première exécution. Ouvrez l'adresse locale affichée dans la console si l'interface ne s'ouvre pas d'elle-même.
4. Vérifiez que vous voyez les emplacements de modèle et les commandes pour démarrer la conversion. Laissez la page Web et la console ouvertes pour le [premier test du microphone](live-audio.md).

## Démarrez sur Mac

1. Développez l'archive Apple Silicon et conservez ses fichiers regroupés ensemble.
2. Ouvrez le lanceur local du bundle (`startHttp.command` le cas échéant). Laissez la configuration se terminer et ouvrez l'adresse signalée par la console si nécessaire.
3. Lorsque le système demande si le navigateur ou l'application peut utiliser le microphone, accordez l'accès au test. Si l'autorisation a été précédemment refusée, modifiez-la dans **Paramètres système → Confidentialité et sécurité → Microphone** et rouvrez l'application.
4. Confirmez que le serveur est en cours d'exécution avant d'ouvrir une deuxième copie. La fermeture du serveur arrête la conversion même lorsque le navigateur est toujours ouvert.

## S'il échoue avant l'ouverture

| Ce que vous voyez | Que vérifier |
| --- | --- |
| Le lanceur se ferme immédiatement | Exécutez-le à partir de son dossier entièrement extrait et lisez la première erreur de la console. Revérifiez l’architecture et la compatibilité d’exécution. |
| Le téléchargement de première exécution reste incomplet | Gardez le processus ouvert et vérifiez sa progression et les erreurs réseau. Réessayez avec le même package officiel après le retour de la connectivité. |
| La page locale donne une erreur de connexion | Vérifiez que le serveur est toujours en cours d'exécution et utilisez l'adresse qu'il a imprimée. La page du navigateur ne peut pas démarrer un serveur local arrêté. |
| Le matériel NVIDIA est installé, mais le processeur est actif | Vérifiez le nom du fichier backend, le pilote installé et le GPU sélectionné dans VCClient. Testez le chemin du processeur séparément pour distinguer un problème de modèle d'un problème de GPU. |
| Le panneau du modèle s'ouvre mais la liste des microphones est vide | Vérifiez le compteur d'entrée du système d'exploitation et l'autorisation du site du navigateur. Pour le mode client, rechargez après avoir accordé l’autorisation. Pour le mode serveur, actualisez la liste des appareils du serveur. |

Passez à [Audio en direct, routage et dépannage](live-audio.md).

[Matrice interactive de compatibilité RVC](../../reference/compatibility-matrix.md)
