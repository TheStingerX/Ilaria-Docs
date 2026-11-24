---
label: "Cloud (Colab, Kaggle, Lightning.AI)"
icon: ":cloud:"
order: 91
permalink: /ilaria-rvc/applio/cloud/
description: "Exécutez Applio et son onglet Realtime dans le cloud avec Google Colab, Kaggle ou Lightning.AI sans GPU local compatible."
---
# Applio Realtime dans le Cloud

Lorsque votre PC ne dispose pas d'un GPU local compatible, vous pouvez exécuter l'**interface Web d'Applio** (y compris son onglet **Realtime** sur les builds cloud pris en charge) sur **Google Colab**, **Kaggle** ou **Lightning.AI** via une URL publique.

> **Avant de passer en direct :** Testez toujours votre modèle vocal sur [un extrait enregistré](inference.md) pour valider la voix et la hauteur avant d'ajouter la latence réseau et le câble virtuel.

> **Discord officiel d'Applio :** Le support officiel d'Applio a migré vers le serveur permanent (`https://discord.gg/wY7gmqTyEV`).

## 1. Choisir un fournisseur cloud

| Plateforme | GPU et quota | Stockage | Tunnels disponibles |
| --- | --- | --- | --- |
| **Google Colab** | Offre payante requise pour les Web UI | Synchronisation Google Drive | Gradio, Ngrok, LocalTunnel |
| **Kaggle** | Quota GPU hebdomadaire gratuit (**T4 x2**) | Session + persistance optionnelle | Ngrok, Gradio + LocalTunnel, LocalTunnel, Horizon |
| **Lightning.AI** | Par crédits (`1 crédit = $1 USD` par seconde ; Studio 4-CPU gratuit + crédits de départ ; voir [Tarifs](https://lightning.ai/pricing)) | Persistant (**Teamspace Drive**, 10 Go gratuits) | Gradio, Port Viewer (`6969`), Ngrok, Cloudflare, LocalTunnel, Horizon |

## 2. Option A : Google Colab Web UI

> **Avertissement Conditions d'Utilisation :** Exécuter des Web UI sur l'**offre gratuite de Google Colab** enfreint la [politique d'activités interdites](https://research.google.com/colaboratory/faq.html#disallowed-activities) de Google et risque des restrictions ou bannissements. Utilisez une **offre payante Colab**.

1. Ouvrez le [notebook Colab d'Applio](https://colab.research.google.com/github/iahispano/applio/blob/master/assets/Applio.ipynb) et connectez-vous à votre compte Google.
2. Exécutez les cellules **Install Applio** (~2 minutes) et autorisez l'accès à Google Drive si vous voulez sauvegarder vos modèles.
3. Exécutez la cellule de synchronisation **Google Drive** si besoin.
4. Dans **Run Server**, choisissez une méthode `method` :
   - **Gradio (Par défaut)** : sans compte ; affiche un lien `.gradio.live`.
   - **Ngrok** : collez votre [authtoken Ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) dans `ngrok_token`, choisissez éventuellement la `Region` la plus proche et ouvrez l'URL `ngrok.io` (limite gratuite de 1 Go/mois).
   - **LocalTunnel** : sans compte ; affiche une URL `loca.lt` et un **Local Tunnel Password** à saisir à l'ouverture.

## 3. Option B : Kaggle (T4 x2 gratuit)

1. Créez un [compte Kaggle](https://www.kaggle.com/account/login?phase=startRegisterTab&returnUrl=%2F) et vérifiez votre **numéro de téléphone** (requis pour activer **Internet**).
2. Cliquez sur **Create → New Notebook**, puis **File → Import Notebook → Link**, collez `https://github.com/IAHispano/Applio/blob/main/assets/Applio_Kaggle.ipynb` et cliquez sur **Import**.
3. Dans la barre latérale droite :
   - Activez **Internet** (**ON**).
   - Réglez Persistence sur **Files and variables**.
   - Sous Accelerator, sélectionnez **GPU T4 x2**.
4. Exécutez les cellules d'installation.
5. Dans la cellule de tunnel, choisissez un `Tunnel` :
   - **Ngrok** (collez `ngrok_authtoken`)
   - **Gradio + LocalTunnel** (Gradio pour Applio, LocalTunnel pour TensorBoard)
   - **LocalTunnel** (copiez le `LocalTunnels Password` affiché)
   - **Horizon** (collez votre `horizon_id` depuis [hrzn.run/dashboard](https://hrzn.run/dashboard/))
6. Cliquez sur l'URL Applio affichée une fois le serveur prêt.

## 4. Option C : Lightning.AI (Studio persistant)

1. Créez un [compte Lightning.AI](https://lightning.ai) et vérifiez votre **numéro de téléphone** (**2 à 3 jours ouvrés** pour la validation).
2. Clonez le [Studio Applio Notebook](https://lightning.ai/nick088/studios/applio-ui?view=public&section=featured).
3. Cliquez sur **Studio Environment → Switch To GPU** à droite et attendez le redémarrage.
4. *(Facultatif)* Dans la première cellule, choisissez `branch` (`"latest-stable"` par défaut, `"main"` ou un tag précis) puis exécutez-la jusqu'à `Installed Applio`.
5. Allez à **Run UI**, choisissez un `Tunnel` (**Gradio**, **Port Viewer** sur le port `6969`, **Ngrok**, **Cloudflare** `.trycloudflare.com`, **LocalTunnel** ou **Horizon**) et lancez la cellule.
   - Pour **Port Viewer**, cliquez sur `+ → Web Apps → Port Viewer` à droite, ajoutez le port `6969` et double-cliquez dessus.
6. Utilisez **Teamspace Drive** (`Studio > this_studio > Applio`) pour transférer vos modèles, ou la dernière cellule **"Delete everything"** pour réinitialiser.

## 5. Configurer câble virtuel et onglet Realtime

Une fois l'interface Web d'Applio ouverte, installez un câble virtuel (**VAC Lite** ou **VB-CABLE** sous Windows, **BlackHole** sous macOS) et suivez [Utiliser Applio avec un microphone](realtime.md) et le [guide du câble virtuel](../../voice-changers/vonovox/live-audio.md) pour router l'audio vers Discord, OBS ou un jeu.
