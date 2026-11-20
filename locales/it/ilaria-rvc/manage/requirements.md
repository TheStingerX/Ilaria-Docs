---
label: "Requisiti di sistema"
icon: ":clipboard:"
order: 82
permalink: /ilaria-rvc/requirements/
description: "Ilaria RVC gira in locale sul tuo PC usando PyTorch 2.10.0 e NVIDIA CUDA. Poiché la conversione vocale (inferenza) e l'addestramento dei modelli..."
---
# Requisiti di sistema di Ilaria RVC

[Scarica Ilaria RVC 2.4.0 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true) · [GPU compatibili](../install/gpu-compatibility.md) · [Opzioni Cloud](../cloud/cloud.md)

Ilaria RVC gira in locale sul tuo PC usando **PyTorch 2.10.0** e **NVIDIA CUDA**. Poiché la conversione vocale (inferenza) e l'addestramento dei modelli (training) hanno esigenze hardware molto diverse, controlla entrambe le tabelle qui sotto prima di installare.

> **Non hai una GPU NVIDIA adatta?** Puoi eseguire Ilaria RVC da remoto su GPU gratuite o cloud seguendo le guide per [Kaggle](../cloud/kaggle.md), [Google Colab](../cloud/colab.md) o [Lightning AI Studio](../cloud/lightning-ai.md).

## 1. Riepilogo rapido: Minimi vs. Consigliati

| Componente | Minimi (Inferenza / Uso base) | Consigliati (Inferenza fluida e Training) |
| --- | --- | --- |
| **Sistema operativo** | Windows 10 64-bit | Windows 10 o Windows 11 (64-bit, aggiornato) |
| **GPU** | GPU **NVIDIA** dedicata con **4 GB VRAM** (Maxwell, Pascal, Volta, GTX 16 o RTX) | GPU **NVIDIA RTX** dedicata con **8–12 GB+ VRAM** (es. RTX 3060 12 GB, RTX 4060 Ti / 4070 o superiore) |
| **Runtime CUDA** | CUDA **12.8** (incluso) o CUDA **12.6** (scaricato automaticamente per Maxwell/Pascal/Volta) | CUDA **12.8** (incluso nello ZIP per GTX 16 / RTX 20–50) |
| **RAM di sistema** | **8 GB** | **16 GB** o **32 GB** (soprattutto per training e creazione dell'index) |
| **Spazio su disco** | **25 GB** liberi (ZIP + cartella estratta + modelli) | **50 GB+ liberi su SSD** (dataset, checkpoint, pretrained) |
| **CPU** | Processore x64 4 core moderno | Processore x64 6–8+ core (velocizza preprocessing e ricerca index) |
| **Browser** | Qualsiasi browser moderno (per `http://127.0.0.1:6969`) | Chrome, Edge o Firefox (aggiornato) |

## 2. Requisiti dettagliati GPU e VRAM

Ilaria RVC per Windows è sviluppato per **GPU NVIDIA**. Schede grafiche integrate Intel, Intel Arc e GPU AMD non sono supportate dal pacchetto Windows.

### Per generazione di GPU (runtime CUDA)

- **GeForce GTX 16 e RTX 20, 30, 40, 50**: usa direttamente il runtime **PyTorch 2.10.0 + CUDA 12.8** incluso nello ZIP. Assicurati di avere driver NVIDIA aggiornati (soprattutto su serie RTX 50).
- **Maxwell, Pascal e Volta** (es. serie GTX 750/900/1000, TITAN X/V, Tesla P4/P40/P100/V100): al primo avvio, `RUN_ILARIA_RVC.bat` scarica e verifica automaticamente **PyTorch 2.10.0 + CUDA 12.6** in `runtime-cu126` e lo riutilizza agli avvii successivi.
- **Nota sulla validazione**: calcolo, backpropagation e caricamento di ContentVec sono stati verificati direttamente su una **RTX 4070**. Le altre schede nella [lista GPU compatibili](../install/gpu-compatibility.md) dovrebbero funzionare in base ad architettura e supporto CUDA.

### Per quantità di VRAM (cosa puoi eseguire)

| VRAM | Inferenza (Conversione audio) | Training (Addestramento modelli) |
| --- | --- | --- |
| **4 GB** | Funziona su clip singole e audio brevi; chiudi app pesanti sulla GPU (giochi, browser con accelerazione hardware). | Molto limitato; solo batch size ridotti (`1–2`) con FP16/sample rate basso, oppure rischio di esaurire la memoria. |
| **6 GB** | Fluido per inferenza singola e in batch. | Possibile con batch size bassi (`2–4`) e precisione FP16. |
| **8 GB** | Senza problemi per inferenza e conversioni batch. | Buono per training a `32k` / `40k` / `48k` con batch size medi (`4–8`). |
| **12 GB+** | Fluido anche con altre app aperte. | **Ideale**: batch size comodi (`8–16+`), epoche più rapide e training a `48k` senza errori di memoria. |

## 3. Spazio su disco, RAM e Rete

### Dettaglio spazio su disco

- **Archivio da scaricare**: ~**5.00 GB** (`ILARIA_RVC-2.4.0.zip`). Lascia spazio sia per lo ZIP che per i file estratti durante l'installazione.
- **App estratta**: ~**10–15 GB** (include runtime PyTorch/CUDA, **ContentVec** e **RMVPE**).
- **Spazio extra eventuale**:
  - `runtime-cu126` (solo Maxwell/Pascal/Volta): diversi GB aggiuntivi scaricati al primo avvio.
  - Embedder opzionali (**Other → Download embedders**) e coppie pretrained G/D.
  - **Checkpoint di training** (`app/logs/`) e **dataset** (`app/datasets/`): ogni sessione di training può occupare **2–10+ GB** in base alla frequenza di salvataggio.
- **SSD consigliato**: estrazione, caricamento modelli e lettura dei dataset durante il training sono molto più rapidi su SSD NVMe/SATA rispetto a un HDD meccanico.

### RAM di sistema

- **8 GB di RAM** bastano per convertire clip brevi, chiudendo le applicazioni pesanti in background.
- **16 GB+ di RAM** sono fortemente consigliati per **training**, **preprocessing audio**, **costruzione dell'index FAISS** e uso di **Audio Analyzer** su più file.

### Connessione internet

- **Necessaria** per: scaricare lo ZIP della release, scaricare CUDA 12.6 al primo avvio su Maxwell/Pascal/Volta, scaricare embedder/pretrained opzionali, importare modelli da Hugging Face/Google Drive/MEGA o verificare aggiornamenti (**2.4.0 → 2.4.1**).
- **Non necessaria** per: eseguire inferenza o training una volta che runtime e modelli sono già sul PC.

## 4. Controlla il tuo PC automaticamente

Ilaria RVC include uno strumento integrato in **Other → PC training advisor**:

1. Seleziona **Sample rate to plan for**, **Precision to evaluate** e **GPU to evaluate**.
2. Clicca **Scan PC and suggest settings**.
3. Leggi **PC Advisor Log** per ottenere impostazioni iniziali consigliate (precisione, batch size) e verifica l'uso reale della VRAM con una breve prova.
