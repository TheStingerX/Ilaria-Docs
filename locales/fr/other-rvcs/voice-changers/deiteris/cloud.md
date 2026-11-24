---
label: "Cloud (Colab, Kaggle, Lightning.AI)"
icon: ":cloud:"
order: 98
permalink: /ilaria-rvc/deiteris/cloud/
description: "Exécutez Deiteris w-okada Fork dans le cloud via Google Colab, Kaggle ou Lightning.AI si votre PC n'a pas de GPU local compatible."
---
# Deiteris w-okada Fork dans le Cloud

Si votre ordinateur ne possède pas de GPU local compatible, vous pouvez exécuter **Deiteris w-okada Fork** sur un GPU cloud via **Google Colab**, **Kaggle** ou **Lightning.AI** et le piloter depuis votre navigateur.

> **Pourquoi "Server audio not available" s'affiche :** Les instances cloud n'ont pas de carte son physique. C'est normal. Utilisez toujours le mode **Client** pour que votre navigateur capture le micro et restitue la voix convertie localement.

> **Latence attendue :** Les tunnels cloud ajoutent un délai réseau à l'inférence GPU. Choisissez la région **Ngrok** la plus proche (ou **Port Viewer** sur Lightning.AI) et utilisez une connexion filaire ou Wi-Fi 5 GHz si possible.

## 1. Choisir un fournisseur cloud

| Plateforme | GPU et quota | Stockage | Tunnels disponibles |
| --- | --- | --- | --- |
| **Google Colab** | Offre payante requise pour les Web UI | Temporaire (par session) | Ngrok |
| **Kaggle** | Quota GPU hebdomadaire gratuit (**T4 x2**) | Session + persistance optionnelle | Ngrok |
| **Lightning.AI** | Par crédits (`1 crédit = $1 USD` par seconde ; Studio 4-CPU gratuit + crédits de départ ; voir [Tarifs](https://lightning.ai/pricing)) | Persistant (**Teamspace Drive**, 10 Go gratuits) | Port Viewer (recommandé), sélecteur de tunnel |

## 2. Configurer un câble audio virtuel (Discord, OBS, jeux)

Installez un câble audio virtuel pour diriger la sortie du navigateur vers Discord, OBS ou un jeu :

- **Windows** : téléchargez [VAC Lite](https://software.muzychenko.net/freeware/vac470lite.zip) (ou **VB-CABLE**). Utilisez `setup64` sur PC Intel/AMD ou `setup64a` sur portable Windows ARM (ex. Snapdragon). Si Windows modifie vos périphériques par défaut, faites `Win + R`, exécutez `mmsys.cpl` et rétablissez **Lecture** et **Enregistrement** (dont **Périphérique de communication par défaut**).
- **macOS** : installez [BlackHole](https://existential.audio/blackhole) ou [VB-Audio Cable](https://vb-audio.com/Cable).
- **Linux** : installez PortAudio (`sudo apt-get update && sudo apt-get install -y portaudio19-dev` sur Debian/Ubuntu, `sudo yum install -y portaudio` sur Fedora/RHEL, ou `sudo pacman -Syu portaudio` sur Arch).

Consultez le [guide du câble virtuel](../vonovox/live-audio.md) pour les étapes complètes sur Discord et OBS.

## 3. Option A : Google Colab

> **Avertissement Conditions d'Utilisation :** Exécuter une Web UI sur l'**offre gratuite de Google Colab** enfreint la [politique d'activités interdites](https://research.google.com/colaboratory/faq.html#disallowed-activities) de Google et risque de restreindre ou bloquer l'accès Colab. Utilisez une **offre payante Colab**.

1. Ouvrez le [notebook Colab de Deiteris](https://colab.research.google.com/github/deiteris/voice-changer/blob/master-custom/Colab_RealtimeVoiceChanger.ipynb).
2. Exécutez la **première cellule** jusqu'à voir `Done! Proceed with the next steps`.
3. Exécutez la **deuxième cellule**.
4. Descendez à la **dernière cellule** et collez votre [authtoken Ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) dans `TOKEN_HERE`.
5. *(Facultatif)* Choisissez la **région** la plus proche sous le champ du token pour réduire la latence.
6. Exécutez la cellule et cliquez sur l'**URL Ngrok** générée pour ouvrir l'interface.

## 4. Option B : Kaggle (T4 x2 gratuit)

### Vérification du compte (une fois)

1. Créez un [compte Kaggle](https://www.kaggle.com/account/login?phase=startRegisterTab&returnUrl=%2F).
2. Vérifiez votre **numéro de téléphone** afin de pouvoir activer l'option **Internet** dans les notebooks.

### Configuration et lancement

1. Ouvrez le [notebook Kaggle de Deiteris](https://www.kaggle.com/code/suneku/voice-changer-public) et cliquez sur **Copy and Edit**.
2. Dans la barre latérale droite :
   - Activez **Internet** (**ON**).
   - Réglez Persistence sur **Files and variables**.
   - Sous Accelerator, sélectionnez **GPU T4 x2**.
3. *(Facultatif)* Évitez de laisser **Save version** activé inutilement, car votre quota GPU continue de baisser à l'arrêt.
4. Exécutez la **première cellule d'installation** jusqu'à `Done! Proceed with the next steps`, puis exécutez la **troisième cellule**.
5. Collez votre [authtoken Ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) dans la **dernière cellule**, lancez-la et ouvrez l'URL publique générée.

## 5. Option C : Lightning.AI (Studio persistant)

1. Créez un [compte Lightning.AI](https://lightning.ai) et vérifiez votre **numéro de téléphone** (la validation prend **2 à 3 jours ouvrés**).
2. Clonez le [Studio Wokada-Deiteris-Fork](https://lightning.ai/nick088/studios/wokada-deiteris-fork).
3. Passez sur un GPU via **Studio Environment → Switch To GPU**.
4. Exécutez la **première cellule** pour installer les dépendances et la **deuxième cellule** pour configurer le serveur.
5. Dans la **troisième cellule**, choisissez votre tunnel (**Port Viewer** recommandé) et lancez-la.
6. Utilisez **Teamspace Drive** à droite pour importer des modèles, et cliquez sur l'icône **Jupyter** à droite pour revenir au code.

## 6. Configurer les modèles et l'audio

Une fois l'interface chargée dans le navigateur, suivez [Configurer et régler Deiteris w-okada Fork](live-audio.md) pour le mode Client, les modèles et les tampons.

## 7. Dépannage cloud et utilitaires

### Activer les logs en mode Debug

Si le serveur cloud ne démarre pas ou coupe aussitôt, ajoutez `--log-level debug` à la commande de la dernière cellule et relancez-la :

- **Google Colab** : `!./ML_Program --log-level debug`
- **Kaggle et Lightning.AI** : `!./VoiceChanger --log-level debug`

Copiez la sortie complète pour demander de l'aide (évitez `warning`, `error` ou `critical` qui filtrent les détails de démarrage).

### Convertir `.safetensors` en `.pth`

W-Okada enregistre les modèles importés dans `model_dir` en `.safetensors`. Pour les reconvertir en `.pth` en local, utilisez le [Convertisseur Safetensors](../../../ilaria-rvc/manage/safetensors-converter.md) d'Ilaria RVC, ou exécutez un script `torch` + `safetensors` (`!pip install torch safetensors`).
