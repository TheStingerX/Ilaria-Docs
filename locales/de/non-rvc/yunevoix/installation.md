---
label: "Installation & Updates"
icon: ":cd:"
order: 98
permalink: /non-rvc/yunevoix/installation/
---
# YuneVoix installieren und aktualisieren

[Auf Hugging Face herunterladen](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Premium)](https://ko-fi.com/yunevoix)

YuneVoix ist eine portable Windows-Anwendung: Es wird nichts in Windows installiert, und alle Einstellungen, Stimmen, Logs und Lizenzen liegen direkt neben `YuneVoix.exe`.

## 1. Das richtige Paket herunterladen

1. Öffne das [YUNE Hugging Face Repository](https://huggingface.co/JohnBlvck/YUNE/tree/main) (für **PREMIUM** erfolgt der Zugang privat über Ko-fi oder DMs).
2. Lade den Build passend zu deiner Grafikkarte herunter:
   - **NVIDIA**-Paket für GeForce RTX / CUDA-GPUs.
   - **AMD**-Paket für Radeon RX 7000+ GPUs.
   > **Wichtig**: Die NVIDIA- und AMD-Builds sind getrennt und nicht austauschbar.
3. Notiere das Archiv-Passwort: **`yunevoix`** (oder das mit deinem Download erhaltene Passwort).

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
   - **AMD (MIGraphX)**: bis zu **10–30 Minuten** beim ersten Start (Windows lädt ggf. AMD MIGraphX über Windows Update).
   - Nach dem ersten Start startet der **LIVE**-Modus in etwa **10 Sekunden**.
4. Oben im Fenster kannst du die Sprache wechseln (**English, Deutsch, Italiano, Español, Polski, Português**).

## 4. Aktualisieren oder Upgrade BASIC → PREMIUM

Um auf eine neue Version zu aktualisieren oder von BASIC auf PREMIUM zu wechseln, ohne Stimmen und Einstellungen zu verlieren:

1. Entpacke die neue Version in einen **neuen** Ordner (überschreibe den alten noch nicht).
2. Kopiere diese Dateien/Ordner vom alten in den neuen YuneVoix-Ordner:
   - `models\yune\voices` (deine gespeicherten Stimmen)
   - `settings.json` und `yune.json` (deine Einstellungen)
   - `license.yvl` (für PREMIUM)
3. Starte die neue `YuneVoix.exe` und prüfe, ob alles läuft, bevor du den alten Ordner löschst.

Zum vollständigen Deinstallieren lösche einfach den Ordner.
