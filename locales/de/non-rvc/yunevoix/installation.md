---
label: "Installation & Updates"
icon: ":cd:"
order: 98
permalink: /non-rvc/yunevoix/installation/
description: "YuneVoix ist eine portable Windows-Anwendung: Es wird nichts in Windows installiert, und alle Einstellungen, Stimmen, Logs und Lizenzen liegen direkt neben YuneVoix.exe."
---
# YuneVoix installieren und aktualisieren

[Auf Hugging Face herunterladen](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Premium)](https://ko-fi.com/yunevoix)

YuneVoix ist eine portable Windows-Anwendung: Es wird nichts in Windows installiert, und alle Einstellungen, Stimmen, Logs und Lizenzen liegen direkt neben `YuneVoix.exe`.

## 1. Das richtige Paket herunterladen (v0.7.1)

1. Lade den **v0.7.1**-Build passend zu deiner Grafikkarte und Edition von [Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) herunter (für **PREMIUM** ist eine privat über [Ko-fi](https://ko-fi.com/yunevoix) oder DMs erhaltene `license.yvl`-Datei nötig):
   - **BASIC (Kostenlos)**:
     - [YuneVoix BASIC NVIDIA v0.7.1 herunterladen (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_BASIC_NVIDIA_v0.7.1.zip?download=true) (~8,42 GB) - für GeForce RTX / CUDA-GPUs.
     - [YuneVoix BASIC AMD v0.7.1 herunterladen (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_BASIC_AMD_v0.7.1.zip?download=true) (~6,74 GB) - für Radeon RX 7000+ GPUs.
   - **PREMIUM** *(benötigt `license.yvl`)*:
     - [YuneVoix PREMIUM NVIDIA v0.7.1 herunterladen (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_PREMIUM_NVIDIA_v0.7.1.zip?download=true) (~9,88 GB)
     - [YuneVoix PREMIUM AMD v0.7.1 herunterladen (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_PREMIUM_AMD_v0.7.1.zip?download=true) (~8,20 GB)
   > **Wichtig**: Die NVIDIA- und AMD-Builds sind getrennt und nicht austauschbar.
2. Notiere das Archiv-Passwort: **`yunevoix`** (oder das mit deinem Download erhaltene Passwort).

## 2. Archiv entpacken

Das ZIP-Archiv ist mit **AES-256** verschlüsselt, sodass der Windows-Explorer es nicht öffnen kann (er meldet es als ungültig).

1. Installiere oder öffne **7-Zip** (`7-zip.org`) oder **WinRAR**.
2. Entpacke das Archiv mit dem Passwort `yunevoix` in einen beschreibbaren lokalen Ordner wie `D:\YuneVoix`.
   - **Nicht** nach `Program Files` oder `OneDrive` entpacken.

## 3. Erster Start & SmartScreen

1. Öffne den entpackten Ordner und starte `YuneVoix.exe`.
2. Da das Programm noch nicht digital signiert ist, zeigt Windows SmartScreen eventuell *„Der Computer wurde durch Windows geschützt“*. Klicke auf **Weitere Informationen → Trotzdem ausführen**.
   - Falls dein Antivirus Dateien in Quarantäne verschiebt, füge den Ordner `YuneVoix` als Ausnahme hinzu.
3. **Auf die erste Engine-Vorbereitung warten**:
   - **NVIDIA**: einige Minuten beim allerersten Start.
   - **AMD**: nutzt seit v0.7.1 standardmäßig **DirectML** auf der dedizierten Karte. Nur wenn du `Settings → General → "AMD graphics engine"` auf experimentelles **MIGraphX** umstellst, kann der erste Start **10–30 Minuten** dauern (Windows lädt ggf. AMD MIGraphX über Windows Update).
   - Nach dem ersten Start startet der **LIVE**-Modus in etwa **10 Sekunden**.
4. Oben im Fenster kannst du die Sprache wechseln (**English, Deutsch, Italiano, Español, Polski, Português**).

## 4. Aktualisieren oder Upgrade BASIC → PREMIUM

Lizenzen, Stimmen und Einstellungen aus **v0.6.0 / v0.7.0** funktionieren in **v0.7.1** weiter. Um auf eine neue Version zu aktualisieren oder von BASIC auf PREMIUM zu wechseln, ohne Stimmen und Einstellungen zu verlieren:

1. Entpacke die neue Version in einen **neuen** Ordner (überschreibe den alten noch nicht).
2. Kopiere diese Dateien/Ordner vom alten in den neuen YuneVoix-Ordner:
   - `models\yune\voices` (deine gespeicherten Stimmen)
   - `settings.json` und `yune.json` (deine Einstellungen)
   - `license.yvl` (für PREMIUM)
3. Starte die neue `YuneVoix.exe` und prüfe, ob alles läuft, bevor du den alten Ordner löschst.

Zum vollständigen Deinstallieren lösche einfach den Ordner.
