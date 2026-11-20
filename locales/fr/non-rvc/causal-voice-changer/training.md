---
label: "Entraîner des voix (.cvc)"
icon: ":mortar_board:"
order: 97
permalink: /non-rvc/causal-voice-changer/training/
---
# Entraîner une voix dans CVC

Créer une voix dans Causal Voice Changer consiste à affiner (fine-tune) le décodeur de base sur votre audio cible. Contrairement à d'anciens outils, **vous n'avez pas besoin de découper vos fichiers audio ni de supprimer les silences manuellement**, et vos enregistrements peuvent être à **n'importe quel sample rate**.

> **Rappel de licence** : les voix entraînées sur le modèle de base pré-entraîné inclus ne peuvent pas être utilisées à des fins commerciales.

## 1. Préparer votre audio

- Rassemblez des enregistrements propres d'**un seul locuteur** (sans musique de fond, forte réverbération ni voix superposées).
- Vous pouvez pointer vers un **fichier audio unique** ou un **dossier** contenant plusieurs fichiers.
- Aucun découpage ni rééchantillonnage manuel n'est nécessaire - CVC s'en charge automatiquement.

## 2. Entraîner avec l'interface graphique (Méthode débutant)

1. Lancez **`run-training.bat`** (Windows) ou **`run-training.sh`** (Linux).
2. Remplissez le formulaire :
   - **Dataset path** : sélectionnez votre fichier audio ou dossier.
   - **Model name** : choisissez un nom court sans caractères spéciaux (ex. `mavoix`).
   - **Batch size** : **`8`** par défaut (baissez-le si vous manquez de mémoire GPU).
   - **Steps** : **`10 000` pas** par défaut (environ **35 minutes** sur une RTX 4080).
   - **Save every** : fréquence d'enregistrement d'un checkpoint `.cvc` (`10 000` par défaut).
   - **Custom base** *(optionnel)* : activez pour partir d'une base personnalisée placée dans `custom-base/` au lieu de la base EARS par défaut.
3. Cliquez sur **Start**.
4. Vous pouvez cliquer sur **Stop** (ou fermer la fenêtre) à tout moment : CVC sauvegarde un checkpoint pour **reprendre** plus tard si le nom correspond.

## 3. Entraîner en ligne de commande (Optionnel)

Si vous préférez le terminal :

```bash
uv run python -m causalvc.build --name NOM --audio /chemin/dossier-ou-fichier
```

Options utiles :
- `--save-every N` : sauvegarde un checkpoint tous les `N` pas.
- `--app-models DIR` : copie automatiquement chaque voix enregistrée dans le dossier `models/` de l'app temps réel.
- `--base VALEUR` : accepte `default`, un nom de dossier dans `custom-base/` ou un chemin vers un modèle de base.

## 4. Comprendre et partager les fichiers `.cvc`

Chaque checkpoint est un fichier **`.cvc`** autonome enregistré dans :
```text
runs/models/voice-NOM/voices/NOM-PASs.cvc
```

Un fichier `.cvc` contient tout le nécessaire pour cette voix (et les nouvelles voix embarquent leur propre **index** dans le `.cvc`, soit environ 12 Mo de plus). Rien ne dépend du PC qui l'a entraîné.

### Charger une voix `.cvc` dans Realtime

- **Glissez-déposez** le fichier `.cvc` directement sur la fenêtre **CausalVC Realtime**, **ou**
- Copiez-le dans `realtime/models/` et cliquez sur **Reload** dans l'application.

### Exporter, convertir d'anciennes voix et ajouter un Index

- **Exporter une voix** : dans la page **Library**, cliquez sur **Export** pour enregistrer une voix installée (avec ses réglages de pitch et de gain) dans un fichier `.cvc` partageable.
- **Convertir d'anciennes voix en dossier** :
  ```bash
  python -m causalvc.voice cvc DOSSIER
  ```
  ou utilisez le script autonome `scripts/convert_to_cvc.py`.
- **Ajouter un index à un ancien `.cvc`** :
  ```bash
  python -m causalvc.index VOIX.cvc --audio /chemin/audio-entrainement
  ```
