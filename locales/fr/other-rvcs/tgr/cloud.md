---
label: "Cloud (Colab, Kaggle, Lightning.AI)"
icon: ":cloud:"
order: 85
permalink: /ilaria-rvc/tgr/cloud/
description: "Exécutez Okada TG Developed Fork dans le cloud via Google Colab, Kaggle ou Lightning.AI si votre PC n'a pas de GPU local compatible."
---
# Okada TG Developed Fork dans le Cloud

Si votre ordinateur ne dispose pas d'un GPU NVIDIA, AMD ou Intel compatible, vous pouvez exécuter **Okada TG Developed Fork** sur un GPU cloud via **Google Colab**, **Kaggle** ou **Lightning.AI**, puis y accéder depuis votre navigateur.

> **Pourquoi "Server audio not available" s'affiche :** Les machines virtuelles cloud n'ont pas de carte son physique. Ce message est tout à fait normal. Utilisez toujours le mode **Client** afin que votre navigateur capture votre micro local et diffuse la voix convertie dans votre casque ou câble virtuel.

> **Latence attendue :** La conversion dans le cloud ajoute le délai réseau aller-retour à l'inférence GPU. Choisissez la région **Ngrok** la plus proche (ou **Port Viewer** sur Lightning.AI) et privilégiez une connexion filaire ou Wi-Fi 5 GHz.

## 1. Choisir un fournisseur cloud

| Plateforme | GPU et quota | Stockage | Tunnels disponibles |
| --- | --- | --- | --- |
| **Google Colab** | Offre payante requise pour les Web UI | Temporaire (par session) | Ngrok |
| **Kaggle** | Quota GPU hebdomadaire gratuit (**T4 x2**) | Session + persistance optionnelle | Ngrok |
| **Lightning.AI** | Par crédits (`1 crédit = $1 USD` par seconde ; Studio 4-CPU gratuit + crédits de départ ; voir [Tarifs](https://lightning.ai/pricing)) | Persistant (**Teamspace Drive**, 10 Go gratuits) | Port Viewer (recommandé), sélecteur de tunnel |

## 2. Configurer un câble audio virtuel (Discord, OBS, jeux)

Installez un câble audio virtuel pour acheminer la sortie du navigateur vers Discord, OBS ou un jeu :

- **Windows** : téléchargez [VAC Lite](https://software.muzychenko.net/freeware/vac470lite.zip) (ou **VB-CABLE**). Lancez `setup64` sur PC Intel/AMD, ou `setup64a` sur PC portable Windows ARM (ex. Snapdragon). Si Windows modifie vos périphériques audio par défaut, faites `Win + R`, exécutez `mmsys.cpl` et rétablissez vos périphériques de **Lecture** et d'**Enregistrement** habituels (y compris **Périphérique de communication par défaut**).
- **macOS** : installez [BlackHole](https://existential.audio/blackhole) ou [VB-Audio Cable](https://vb-audio.com/Cable).
- **Linux** : installez PortAudio (`sudo apt-get update && sudo apt-get install -y portaudio19-dev` sur Debian/Ubuntu, `sudo yum install -y portaudio` sur Fedora/RHEL, ou `sudo pacman -Syu portaudio` sur Arch).

Consultez le [guide du câble virtuel](../vonovox/live-audio.md) pour le routage détaillé vers Discord et OBS.

## 3. Option A : Google Colab

> **Avertissement Conditions d'Utilisation :** Exécuter une Web UI sur l'**offre gratuite de Google Colab** enfreint la [politique d'activités interdites](https://research.google.com/colaboratory/faq.html#disallowed-activities) de Google et expose votre compte à des restrictions ou bannissements. Utilisez une **offre payante Colab**.

1. Ouvrez le [notebook Colab de Tg-Develop](https://colab.research.google.com/github/tg-develop/voice-changer/blob/master-custom/Colab_RealtimeVoiceChanger.ipynb).
2. Exécutez la **première cellule** jusqu'à voir `Done! Proceed with the next steps`.
3. Exécutez la **deuxième cellule**.
4. Descendez à la **dernière cellule** et collez votre [authtoken Ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) dans `TOKEN_HERE`.
5. *(Facultatif)* Choisissez la **région** la plus proche sous le champ du token pour réduire la latence.
6. Exécutez la cellule et cliquez sur l'**URL Ngrok** générée à la fin des téléchargements.

## 4. Option B : Kaggle (T4 x2 gratuit)

### Vérification du compte (une fois)

1. Créez un [compte Kaggle](https://www.kaggle.com/account/login?phase=startRegisterTab&returnUrl=%2F).
2. Vérifiez votre **numéro de téléphone** dans les paramètres du compte pour pouvoir activer l'option **Internet**.

### Configuration et lancement

1. Allez sur [Kaggle](https://www.kaggle.com) et cliquez sur **Create → New Notebook**.
2. Cliquez sur **File → Import Notebook**, ouvrez l'onglet **Link**, collez `https://github.com/tg-develop/voice-changer/blob/master-custom/Kaggle_RealtimeVoiceChanger.ipynb` et cliquez sur **Import**.
3. Dans la barre latérale droite :
   - Activez **Internet** (**ON**).
   - Réglez Persistence sur **Files and variables**.
   - Sous Accelerator, sélectionnez **GPU T4 x2**.
4. *(Facultatif)* N'activez **Save version** que si nécessaire, car votre quota GPU continue de diminuer au repos.
5. Exécutez la **première cellule d'installation** jusqu'à `Done! Proceed with the next steps`, puis exécutez la **troisième cellule**.
6. Collez votre [authtoken Ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) dans la **dernière cellule**, lancez-la et ouvrez l'URL publique générée.

## 5. Option C : Lightning.AI (Studio persistant)

1. Créez un [compte Lightning.AI](https://lightning.ai) et vérifiez votre **numéro de téléphone** (la validation prend **2 à 3 jours ouvrés**).
2. Clonez le [Studio Wokada-TgDevelop-Fork](https://lightning.ai/nick088/studios/wokada-tg-develop-fork).
3. Passez sur un environnement GPU via **Studio Environment → Switch To GPU**.
4. Exécutez la **première cellule** pour installer les dépendances et la **deuxième cellule** pour configurer le serveur.
5. Dans la **troisième cellule**, choisissez votre tunnel (**Port Viewer** recommandé) et lancez-la.
6. Utilisez **Teamspace Drive** à droite pour importer vos modèles `.pth` et `.index`.
7. **Réinitialisation / mise à jour** : exécutez la dernière cellule **"Delete everything"** pour nettoyer le stockage persistant.

## 6. Configurer les modèles et l'audio

Une fois l'interface ouverte dans le navigateur, le chargement des modèles et le mode **Client** sont identiques à l'installation locale. Poursuivez avec [Modèle, microphone et câble](live-audio.md).

## 7. Dépannage cloud et utilitaires

### Activer les logs en mode Debug

Si le serveur cloud plante au démarrage, ajoutez `--log-level debug` à la commande de lancement dans la dernière cellule et relancez-la :

- **Google Colab** : `!./ML_Program --log-level debug`
- **Kaggle et Lightning.AI** : `!./VoiceChanger --log-level debug`

Copiez la sortie complète pour demander de l'aide (évitez `warning`, `error` ou `critical` qui masquent le contexte).

### Convertir `.safetensors` en `.pth`

W-Okada enregistre les modèles importés dans `model_dir` au format `.safetensors`. Pour retrouver le `.pth`, utilisez le [Convertisseur Safetensors](../../ilaria-rvc/manage/safetensors-converter.md) d'Ilaria RVC ou un script `torch` + `safetensors` (`!pip install torch safetensors`).
