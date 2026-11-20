---
label: "Addestrare voci (.cvc)"
icon: ":mortar_board:"
order: 97
permalink: /non-rvc/causal-voice-changer/training/
description: "Creare una voce in Causal Voice Changer significa fare fine-tuning del decoder base sul tuo audio target. A differenza di molti strumenti più vecchi, non..."
---
# Addestrare una voce in CVC

Creare una voce in Causal Voice Changer significa fare fine-tuning del decoder base sul tuo audio target. A differenza di molti strumenti più vecchi, **non devi tagliare i file audio né rimuovere manualmente i silenzi**, e le registrazioni possono avere **qualsiasi sample rate**.

> **Promemoria licenza**: le voci addestrate sul modello base pre-addestrato incluso non possono essere usate per scopi commerciali.

## 1. Prepara l'audio

- Raccogli registrazioni pulite di **un solo parlante** (senza musica di sottofondo, riverbero forte o voci sovrapposte).
- Puoi indicare a CVC un **singolo file audio** oppure una **cartella** con più file.
- Non serve tagliare o ricampionare a mano: ci pensa CVC automaticamente.

## 2. Addestra tramite finestra grafica (Metodo per principianti)

1. Avvia **`run-training.bat`** (Windows) o **`run-training.sh`** (Linux).
2. Compila i campi:
   - **Dataset path**: seleziona il file audio o la cartella.
   - **Model name**: scegli un nome breve senza caratteri speciali (es. `lamiavoce`).
   - **Batch size**: predefinito **`8`** (abbassalo se finisci la memoria GPU).
   - **Steps**: predefinito **`10,000` step** (richiede circa **35 minuti** su una RTX 4080).
   - **Save every**: ogni quanti step salvare un checkpoint `.cvc` (predefinito `10,000`).
   - **Custom base** *(opzionale)*: attivalo se vuoi partire da un modello base personalizzato messo in `custom-base/` invece del base EARS predefinito.
3. Clicca **Start**.
4. Puoi cliccare **Stop** (o chiudere la finestra) in qualsiasi momento: CVC salva un checkpoint e potrai **riprendere** in seguito usando lo stesso nome modello.

## 3. Addestra da riga di comando (Opzionale)

Se preferisci il terminale:

```bash
uv run python -m causalvc.build --name NOME --audio /percorso/cartella-o-file
```

Opzioni utili:
- `--save-every N`: salva un checkpoint ogni `N` step.
- `--app-models DIR`: copia automaticamente ogni voce salvata nella cartella `models/` dell'app real-time.
- `--base VALORE`: accetta `default`, il nome di una cartella dentro `custom-base/`, oppure il percorso a un modello base.

## 4. Capire e condividere i file `.cvc`

Ogni checkpoint salvato è un unico file **`.cvc`** autonomo in:
```text
runs/models/voice-NOME/voices/NOME-STEPstep.cvc
```

Un file `.cvc` contiene tutto il necessario per quella voce (e le nuove voci includono anche il proprio **index** dentro il `.cvc`, aggiungendo circa 12 MB). Nulla nel file dipende dal PC su cui è stato addestrato.

### Come caricare una voce `.cvc` in Realtime

- **Trascina** il file `.cvc` direttamente sulla finestra di **CausalVC Realtime**, **oppure**
- Copialo in `realtime/models/` e clicca **Reload** nell'app.

### Esportare, convertire vecchie voci e aggiungere un Index

- **Esportare una voce**: nella pagina **Library**, clicca **Export** per salvare una voce installata (con le sue impostazioni di pitch e guadagno) in un file `.cvc` condivisibile.
- **Convertire vecchie voci in cartella**: se hai voci create da versioni vecchie di CVC salvate come cartelle, convertile con:
  ```bash
  python -m causalvc.voice cvc CARTELLA
  ```
  oppure con lo script autonomo `scripts/convert_to_cvc.py`.
- **Aggiungere un index a un vecchio `.cvc`**:
  ```bash
  python -m causalvc.index VOCE.cvc --audio /percorso/audio-training
  ```
