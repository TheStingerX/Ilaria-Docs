---
label: "Historique des versions et différences de version"
icon: ":clock3:"
order: 81
permalink: /ilaria-rvc/version-history/
description: "La dernière version Windows est la 2.4.6. Vérifiez votre version installée sous Autre → Mettre à jour Ilaria RVC et consultez les notes de version."
---
# Historique des versions et différences de version

[Télécharger Ilaria RVC 2.4.0 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

## Quelle version cette documentation décrit-elle ?

La dernière version Windows est la **2.4.6**. Vérifiez votre version installée sous **Autre → Mettre à jour Ilaria RVC**. Utilisez **Toutes les modifications jusqu'à présent** pour parcourir les notes version par version, même hors ligne.

## Toutes les versions

 | Version | Points forts |
| --- | --- |
| 2.4.6 | Ajoute **KLM Vocal ContentVec** (`klm-vocal-contentvec`) en téléchargement optionnel pour l'Inférence et l'Entraînement RVC v2, et ajoute **43 paires G/D KLM vérifiées** dans **Recommended pretrained models** avec leurs sample rates (la compatibilité varie selon la paire). Depuis **2.4.5**, ouvrez **Other → Update Ilaria RVC → Check for updates** puis **Download and restart**. |
| 2.4.5 | Ajoute la conversion `.pth` ↔ `.safetensors` dans **Other → Convert model weights**, en conservant les métadonnées RVC avec un bouton **Move .pth to models**. Améliore le message d'Inférence pour les fichiers sans configuration vocale et installe automatiquement `safetensors` au premier usage. Depuis **2.4.4**, ouvrez **Other → Update Ilaria RVC → Check for updates** puis **Download and restart**. |
| 2.4.4 | Supprime les six options de téléchargement pretrained Legacy Core de Lyery suite au retrait des fichiers sources (les poids déjà téléchargés restent utilisables). Nécessite **2.4.2** ou ultérieure. |
| 2.4.3 | Ajoute l'entraînement natif en précision mixte **BF16**, sélectionné automatiquement sur les GPU NVIDIA RTX séries 30, 40 et 50 lorsque tous les GPU sélectionnés le prennent en charge (Kaggle T4 reste sur FP16). Mémorise les choix manuels `FP16` et `FP32`, conserve la précision des entraînements existants sauf changement explicite, met à jour Training Queue et PC training advisor et garde l'extraction de traits en `FP32` ainsi que le format d'export RVC standard. Nécessite **2.4.2** via **Other → Update Ilaria RVC**. |
| 2.4.2 | Ajoute **RMVPE cuDNN recovery** pour récupérer proprement après des erreurs cuDNN d'extraction de pitch en inférence et prétraitement. Mettez à jour depuis **2.4.1** via **Other → Update Ilaria RVC**. |
| 2.4.1 | Ajoute la synthèse locale facultative Kokoro v1.0, avec 54 voix dont Sara et Nicola en italien. Précise les prérequis des moteurs TTS, corrige le chemin des poids RMVPE et masque les messages INFO verbeux de HuBERT tout en conservant les avertissements et les erreurs. Installez et lancez la 2.4.0. Ouvrez **Other → Update Ilaria RVC** et installez la **2.4.1** quand elle apparaît. |
| 2.4.0 | Le paquet Windows déplace l’application et le runtime dans app/. Les modèles restent à la racine dans models/. Ajout de Colab, Lightning AI Studio, des indications de téléchargement des embedders, et de Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). pip est réparé et pywin32 est inclus. |
| 2.3.0 | RMVPE High Register propose des modes de détection, des limites et un graphique comparatif de F0 pour les notes aiguës. ElevenLabs rejoint les moteurs TTS. Saisissez votre clé API ElevenLabs, choisissez une voix et testez une phrase courte. MRF HiFi-GAN prend en charge l’entraînement et l’inférence. Le catalogue ajoute 15 paires générateur/discriminateur, dont KLM 4.4 X1 et X2 à 40 kHz. Portuguese HuBERT Base est disponible en inférence. En entraînement RVC v2, importez et enregistrez un HuBERT personnalisé. Sa configuration est conservée dans le modèle exporté. |
| 2.2.2.1 | Version intermédiaire qui prépare l’installation 2.2.2 actualisée à la 2.3.0. |
| 2.2.2 | Active le chargement restreint de PyTorch pour les modèles vocaux, les outils de modèles, l’export ONNX et les poids d’entraînement. Le ZIP Windows inclut Python 3.10 et PyTorch 2.10.0 avec CUDA 12.8. Les anciens GPU NVIDIA utilisent le runtime CUDA 12.6 téléchargeable. Le décodage PyAV et l’export WAV sont corrigés. La progression s’affiche pendant l’écriture des segments. Le notebook Kaggle 2.2.2 installe PyTorch et TorchAudio 2.10.0 avec CUDA 12.8. |
| 2.2.1 | Le lecteur de forme d’onde propose un réglage du volume pour les entrées, les résultats et les aperçus. Utilisez-le pour écouter moins fort ou comparer des extraits à un niveau similaire. Il agit uniquement sur la lecture. Pour modifier le fichier converti, réglez Gain dans Post-Process et relancez la conversion. |
| 2.2.0 | Ajoute la conversion et l’entraînement sous Windows sur les GeForce RTX série 50 (Blackwell), avec PyTorch 2.7.1 et CUDA 12.8. Le lanceur prépare l’environnement au premier lancement et vérifie les opérations CUDA. Internet et de l’espace libre sont nécessaires. Les autres GPU conservent leur environnement. Le chargement de ContentVec, la reprise et la STFT ont été adaptés. |
| 2.1.2 | Harmonisation des libellés de l’en-tête : **Ilaria’s Ko-Fi Shop**, **Ilaria’s RVC Website** et **Ilaria’s Docs**. |
| 2.1.1 | Ajout d’un bouton en forme de cœur pour Ilaria Docs à côté du lien vers le site. |
| 2.1.0 | Ajout du bouton du site Web, des métriques du tableau de bord en direct pour l'exécution active et d'un meilleur comportement de démarrage et d'actualisation dans TensorBoard intégré. |
 | 2.0.0 | Introduction du tableau de bord de formation, du TensorBoard intégré, des rapports de diagnostic et des aperçus de 12 secondes du Dataset Checker. Les intégrateurs facultatifs sont devenus des téléchargements individuels. |
 | 1.9.3 | Introduction du traitement audio avancé, de cinq formats d'exportation d'inférence, d'intégrateurs configurables et d'une installation HuBERT personnalisée. |
 | 1.9.2 | Ajout de liens publics Google Drive et MEGA vers le téléchargeur de modèles vocaux. |
 | 1.9.1 | Ajout de contrôles de fréquence d'échantillonnage lors de la réutilisation d'un nom d'expérience, évitant ainsi un crash de formation sur des configurations incompatibles. |
 | 1.9.0 | Ajout de FCPE, d'importations de modèles en streaming avec annulation, d'un onglet Autre réorganisé et de notes de version hors ligne extensibles. |
 | 1.8.1 | Mise à jour des sons d'achèvement et de test tout en conservant le son d'erreur Windows. |
 | 1.8.0 | Introduction du lanceur de console cachée, du contrôle de redémarrage de l'interface utilisateur, de l'analyseur audio et d'une disposition de dossiers partagés pour les modèles et leurs index. |
 | 1.7.2 | Correction de la conversion sans index et noms des fichiers de sortie Single et Batch d'après la voix sélectionnée. |
 | 1.7.1 | Suppression d'un traçage spécifique de fermeture de connexion Windows tout en préservant les autres messages d'erreur. |
 | 1.7.0 | Ajout de Edge et Windows TTS hors ligne, lecteurs de forme d'onde et préparation en arrière-plan pour l'extraction de hauteur et modèles par défaut pris en charge. |
 | 1.6.0 | Ajout de la file d'attente d'entraînement persistante, des cibles d'étape exactes, des options RefineGAN et Spin-v2, des téléchargements pré-entraînés couplés, davantage d'extracteurs de pitch et d'exportation ZIP. |
 | 1.5.2 | Amélioration des diagnostics de lancement en double et vérification de la disponibilité des ensembles de données avant chaque étape de formation. |
 | 1.5.1 | Prétraitement bloqué alors qu'une importation d'ensemble de données était active ou que le chemin de l'ensemble de données était inutilisable. Ajout du panneau d'historique des modifications hors ligne. |
 | 1.5.0 | Introduction de l'importation et de la gestion des ensembles de données par glisser-déposer, du conseiller de formation PC et des alertes d'achèvement et d'erreur facultatives. |
 | 1.4.0 | Ajout d'aperçus de formation, d'arrêt et d'enregistrement avec reprise et du vérificateur d'ensemble de données. |
 | 1.3.0 | J'ai validé le chemin de mise à jour à partir de 1.2, affiché la version installée dans la console et préparé un package Windows plus petit. |
 | 1.2.0 | Ajout du programme de mise à jour intégré avec vérification et récupération, sélection de formation FP32/FP16 et informations sur le modèle. |
 | 1.1 Bêta | Introduction de l'interface thématique, du flux de travail de formation numéroté, de la conversion par glisser-déposer, de la correspondance automatique d'index, des importations et de la fusion de modèles, ainsi que du glossaire de l'application. |


Si un bouton ou un backend diffère sur votre build, comparez ses notes de version avant de supposer un échec d'installation.
