# YuneVoix installieren und aktualisieren

[Auf Hugging Face herunterladen](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Premium)](https://ko-fi.com/yunevoix)

YuneVoix ist eine portable Windows-Anwendung: Es wird nichts in Windows installiert, und alle Einstellungen, Stimmen, Logs und Lizenzen liegen direkt neben `YuneVoix.exe`.

## 1. GPU prüfen & das richtige Paket herunterladen (v0.7.1)

1. Prüfe deine dedizierte Grafikkarte im **Windows Task-Manager → Leistung → GPU** (NVIDIA GeForce RTX vs. AMD Radeon RX 7000+).
2. Lade den passenden **v0.7.1**-Build von [Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) herunter (für **PREMIUM** erfordert die Aktivierung eine `license.yvl`, die privat über [Ko-fi](https://ko-fi.com/yunevoix) oder DMs bezogen wird):
   - **BASIC (Kostenlos)**:
     - [YuneVoix BASIC NVIDIA v0.7.1 herunterladen (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_BASIC_NVIDIA_v0.7.1.zip?download=true) - für NVIDIA-GPUs (8 GB+ VRAM, 12 GB empfohlen).
     - [YuneVoix BASIC AMD v0.7.1 herunterladen (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_BASIC_AMD_v0.7.1.zip?download=true) - für AMD Radeon RX 7000+ GPUs (12 GB+ VRAM, 16 GB empfohlen).
   - **PREMIUM** *(erfordert `license.yvl`)*:
     - [YuneVoix PREMIUM NVIDIA v0.7.1 herunterladen (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_PREMIUM_NVIDIA_v0.7.1.zip?download=true) - für NVIDIA-GPUs.
     - [YuneVoix PREMIUM AMD v0.7.1 herunterladen (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_PREMIUM_AMD_v0.7.1.zip?download=true) - für AMD Radeon RX 7000+ GPUs.
   > **Wichtig:** Die NVIDIA- und AMD-Pakete sind getrennt und nicht untereinander austauschbar. Verschiebe oder lösche **nicht** die mitgelieferten Ordner neben `YuneVoix.exe`:
   > - **NVIDIA-Paket:** behalte **`models`** und **`cuda`** neben `YuneVoix.exe`.
   > - **AMD-Paket:** behalte **`models`** und **`cache`** neben `YuneVoix.exe`.
3. Beachte das mit dem Release veröffentlichte Archiv-Passwort: **`yunevoix`** (hier wie vom Projekt-Maintainer dokumentiert angegeben).

## 2. Archiv entpacken

Das ZIP-Archiv ist mit **AES-256** verschlüsselt, weshalb der Windows-Explorer es nicht öffnen kann (er meldet das ZIP als ungültig).

1. Installiere oder öffne **7-Zip** (`7-zip.org`) oder **WinRAR**.
2. Entpacke das gesamte Archiv mit dem Passwort `yunevoix` in einen beschreibbaren lokalen Ordner wie `D:\YuneVoix`.
   - Entpacke **nicht** in `Program Files` oder `OneDrive`.

## 3. Erster Start, SmartScreen & Engine-Prüfung

1. Öffne den entpackten Ordner und starte `YuneVoix.exe`.
2. Vergewissere dich, dass das Archiv aus dem offiziellen [Hugging Face YUNE Repository](https://huggingface.co/JohnBlvck/YUNE/tree/main) stammt. Da die ausführbare Datei noch nicht digital signiert ist, kann Windows SmartScreen *"Der Computer wurde durch Windows geschützt"* anzeigen. Klicke nach Prüfung der Quelle auf **Weitere Informationen → Trotzdem ausführen**.
   - Falls dein Antivirusprogramm eine Datei meldet, prüfe **Windows-Sicherheit → Schutzverlauf** und verifiziere die Herkunft der Datei, bevor du sie zulässt; deaktiviere **niemals** Windows Defender oder den Virenschutz global.
3. **Auf erstmalige Vorbereitung warten**:
   - Der allererste Start entpackt Bibliotheken einmalig und dauert etwas länger.
   - **AMD:** verwendet in v0.7.1 standardmäßig **DirectML** auf der dedizierten GPU (kein Windows-Update-Download und kein Modell-Kompilieren). Nur wenn du `Settings → General → "AMD graphics engine"` auf das experimentelle **MIGraphX** umstellst (nach Neustart), kann das erstmalige Kompilieren **10-30 Minuten** dauern.
   - Prüfe die LIVE-Statuszeile oder führe `YuneVoix.exe --check` (`check.txt`) aus, um zu bestätigen, welche Grafik-Engine und GPU aktiv sind.
4. Du kannst die UI-Sprache oben im Fenster wechseln (**English, Deutsch, Italiano, Español, Polski, Português**).

## 4. Aktualisieren oder Upgrade (BASIC → PREMIUM)

Lizenzen, Stimmen und Einstellungen aus **v0.6.0 / v0.7.0** funktionieren in **v0.7.1** weiter. So aktualisierst du auf eine neue Version oder wechselst von BASIC zu PREMIUM, ohne deine Stimmen und Einstellungen zu verlieren:

1. Entpacke das neue Release in einen **neuen** Ordner (überschreibe den alten noch nicht).
2. Kopiere diese Dateien/Ordner aus dem alten YuneVoix-Ordner in den neuen:
   - `models\yune\voices` (deine gespeicherten Stimmen)
   - `settings.json` und `yune.json` (deine Konfiguration)
   - `my_voice.yvoice`, falls vorhanden (deine eigene Stimmprobe für **FlowEdit 3+1** in LIVE)
   - `license.yvl` (für PREMIUM)
3. Starte die neue `YuneVoix.exe` und prüfe, ob alles funktioniert, bevor du den alten Ordner löschst.

> **Update von v0.6.0:** Wenn du vor v0.7.0 eine Probe deiner eigenen Stimme festgelegt hattest, wähle sie einmal neu unter `Settings → Voice & Timbre → "Sample of your voice…"` aus; andernfalls fällt **FlowEdit 3+1** in LIVE auf **Learned 4 steps** zurück. Das ist nötig, weil v0.7.0+ die neu gewählte Referenz braucht, um `my_voice.yvoice` an FlowEdit und Timbre strength zu binden.

Um YuneVoix vollständig zu deinstallieren, lösche einfach den Ordner.

Nächster Schritt: [Voice Bank & Live-Nutzung](usage.md).
