---
label: "Installation et mises à jour"
icon: ":cd:"
order: 98
permalink: /non-rvc/yunevoix/installation/
---
# Installer et mettre à jour YuneVoix

[Télécharger sur Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Premium)](https://ko-fi.com/yunevoix)

YuneVoix est une application portable pour Windows : rien n'est installé dans Windows, et tous les paramètres, voix, journaux et licences restent à côté de `YuneVoix.exe`.

## 1. Télécharger le bon paquet

1. Ouvrez le [dépôt Hugging Face de YUNE](https://huggingface.co/JohnBlvck/YUNE/tree/main) (pour **PREMIUM**, l'accès est fourni en privé via Ko-fi ou DM).
2. Téléchargez la version correspondant à votre carte graphique :
   - Paquet **NVIDIA** pour les GPU GeForce RTX / CUDA.
   - Paquet **AMD** pour les GPU Radeon RX 7000+.
   > **Important** : les versions NVIDIA et AMD sont distinctes et non interchangeables.
3. Notez le mot de passe de l'archive : **`yunevoix`** (ou celui fourni avec votre téléchargement).

## 2. Extraire l'archive

L'archive ZIP est chiffrée en **AES-256**, que l'Explorateur Windows ne peut pas ouvrir (il affichera que le ZIP est invalide).

1. Installez ou ouvrez **7-Zip** (`7-zip.org`) ou **WinRAR**.
2. Extrayez l'archive avec le mot de passe `yunevoix` dans un dossier local accessible en écriture comme `D:\YuneVoix`.
   - **Ne l'extrayez pas** dans `Program Files` ni dans `OneDrive`.

## 3. Premier lancement et SmartScreen

1. Ouvrez le dossier extrait et lancez `YuneVoix.exe`.
2. Comme le programme n'est pas encore signé numériquement, Windows SmartScreen peut afficher *« Windows a protégé votre ordinateur »*. Cliquez sur **Informations complémentaires → Exécuter quand même**.
   - Si votre antivirus place un fichier en quarantaine, ajoutez le dossier `YuneVoix` aux exceptions.
3. **Attendez la préparation initiale du moteur** :
   - **NVIDIA** : quelques minutes au tout premier démarrage.
   - **AMD (MIGraphX)** : jusqu'à **10–30 minutes** au premier démarrage (Windows peut aussi télécharger AMD MIGraphX via Windows Update).
   - Après le premier lancement, le mode **LIVE** démarre en environ **10 secondes**.
4. Vous pouvez changer la langue de l'interface en haut de la fenêtre (**English, Deutsch, Italiano, Español, Polski, Português**).

## 4. Mettre à jour ou passer de BASIC → PREMIUM

Pour mettre à jour vers une nouvelle version ou passer de BASIC à PREMIUM sans perdre vos voix et paramètres :

1. Extrayez la nouvelle version dans un **nouveau** dossier (n'écrasez pas encore l'ancien).
2. Copiez ces fichiers/dossiers de l'ancien dossier vers le nouveau :
   - `models\yune\voices` (vos voix enregistrées)
   - `settings.json` et `yune.json` (vos paramètres)
   - `license.yvl` (pour PREMIUM)
3. Lancez le nouveau `YuneVoix.exe` et vérifiez que tout fonctionne avant de supprimer l'ancien dossier.

Pour désinstaller YuneVoix complètement, supprimez simplement son dossier.
