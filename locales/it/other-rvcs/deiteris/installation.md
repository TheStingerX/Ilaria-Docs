---
label: "Installa Deiteris Fork"
icon: ":package:"
order: 100
permalink: /ilaria-rvc/deiteris/installation/
---
# Installa Deiteris w-okada Fork

[GitHub](https://github.com/Deiteris/voice-changer) · [Release](https://github.com/Deiteris/voice-changer/releases)

**Deiteris w-okada Fork** è un noto fork mantenuto dalla community di `w-okada/voice-changer` (VCClient), focalizzato su latenza più bassa, audio più pulito, correzioni di stabilità e backend aggiornati per GPU NVIDIA (CUDA), AMD/Intel (DirectML) e Apple Silicon.

## 1. Scarica la build giusta

Apri la [pagina Release di Deiteris](https://github.com/Deiteris/voice-changer/releases) ed espandi **Assets**:

| Hardware / OS | Pacchetto da scaricare | Note |
| --- | --- | --- |
| **Windows + GPU NVIDIA** | Archivio **CUDA** (spesso diviso in `.zip.001`, `.zip.002`, ecc.) | Consigliato per la latenza minima su schede GeForce GTX/RTX. |
| **Windows + GPU AMD / Intel** | Archivio **DML (DirectML)** | Usa l'accelerazione DirectML (o CPU se non c'è una GPU compatibile). |
| **macOS (Apple Silicon / Intel)** | Build **macOS** (CoreML / CPU) | Controlla le note di rilascio per il supporto Apple Silicon M1/M2/M3 vs. Intel. |

## 2. Estrai e avvia (Windows)

1. Per gli archivi CUDA divisi in più parti (`.zip.001`, `.zip.002`, ...), scarica **tutte le parti** nella stessa cartella ed estrai partendo da **`.zip.001`** con **7-Zip** o **WinRAR**.
2. Estrai in un percorso semplice e scrivibile sul disco principale (ad esempio `C:\VoiceTools\Deiteris-VC`). Evita `Program Files`, `OneDrive` o percorsi con caratteri speciali.
3. Apri la cartella estratta ed esegui lo script di avvio (come `start_http.bat` o `MMVCServerSIO.exe`, a seconda della release).
4. **Attendi i pesi iniziali**: lascia aperta la finestra console mentre il client scarica i pesi base richiesti al primo avvio.
5. Apri l'indirizzo web locale stampato nella console (di solito `http://localhost:7865` o `http://127.0.0.1:18888`, a seconda della build).

## 3. Prerequisito cavo audio virtuale

Per inviare la voce convertita su **Discord, OBS, VRChat o nei giochi**, installa un cavo audio virtuale (come **VB-CABLE**) prima di configurare l'audio live:
1. Esegui l'installer del cavo virtuale come Amministratore (`VBCABLE_Setup_x64.exe`).
2. **Riavvia Windows** affinché i nuovi dispositivi virtuali vengano riconosciuti correttamente.

Prosegui con [Instrada e regola Deiteris Fork](live-audio.md) per configurare dispositivi, chunk size e pitch.
