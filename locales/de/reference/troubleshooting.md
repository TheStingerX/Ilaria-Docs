---
label: "🩺 Fehlerbehebung"
order: 95
permalink: /troubleshooting/
description: "Schritt-für-Schritt-RVC-Fehlerbehebung für Einsteiger und Profis: Windows/Startfehler, GPU/CUDA/DirectML, Modelle, Training, Live-Mikrofon und Cloud-Notebooks."
---
# RVC Fehlerbehebung

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

!!!tip
**Neu bei RVC? Befolge zuerst diese 4 Regeln:**
1. **Nutze einen kurzen, einfachen Ordnerpfad** wie `C:\RVC` oder `D:\IlariaRVC`. Lege die App niemals in `OneDrive`, `Program Files` oder Ordner mit Leerzeichen, Umlauten oder Emojis.
2. **Entpacke die ZIP-Datei immer vollständig**, bevor du etwas startest. Starte `.bat`-Dateien niemals direkt aus WinRAR, 7-Zip oder der Windows-ZIP-Vorschau.
3. **Schließe niemals das schwarze Konsolenfenster.** Dieses Fenster führt die App aus und zeigt den echten Fehler an, wenn etwas abstürzt.
4. **Teste zuerst mit einer sauberen 10-Sekunden-`.wav`-Datei.** Wenn die App abstürzt, kopiere den **ersten** Fehler aus der Konsole. Wenn sie läuft, aber schlecht klingt, ändere immer **nur eine Einstellung gleichzeitig** an derselben Testdatei.
!!!

## Problem schnell finden

| Was passiert? | Wahrscheinlichste Ursache | Wo nachsehen |
| --- | --- | --- |
| Schwarzes Fenster öffnet und schließt nach 1 Sekunde | Aus ZIP gestartet, vom Antivirus blockiert oder Runtime fehlt | [1. Start, Windows, Antivirus & Downloads](#1-start-windows-antivirus--downloads) |
| Browser zeigt Verbindungsfehler oder weiße Seite | App beim Start abgestürzt, falscher Port oder VPN/Proxy auf `127.0.0.1` | [1. Start, Windows, Antivirus & Downloads](#1-start-windows-antivirus--downloads) |
| App ist extrem langsam oder meldet `CUDA out of memory` | CPU statt GPU genutzt, Windows HAGS ist an oder Batch/Audio zu groß | [2. GPU, CUDA, AMD/Intel & Speicher](#2-gpu-cuda-amdintel--speicher) |
| Modell erscheint nicht oder lädt nicht (`.pth` / `.index`) | Refresh vergessen, ZIP nicht entpackt, defekter Download oder falsche Datei | [3. Modelle, Checkpoints & Indexe](#3-modelle-checkpoints--indexe) |
| Stimme klingt wie Streifenhörnchen, Monster, Roboter oder Originalstimme | Falscher Pitch (Transpose), verrauschtes Audio oder falscher Pitch Extractor | [4. Stimmqualität, Pitch & Audiodateien](#4-stimmqualität-pitch--audiodateien) |
| Training stoppt, stürzt ab oder exportiert eine stumme Stimme | Leerer/stummer Clip im Dataset, zu viele CPU-Worker oder `Fresh Training` aktiv | [5. Dataset-Vorbereitung & Training](#5-dataset-vorbereitung--training) |
| Mikrofon hat Verzögerung, Aussetzer, Echo oder Discord hört nichts | Unterschiedliche Abtastraten (`44100` vs `48000 Hz`), falsches Kabel oder Krisp | [6. Live Voice Changer, Mikrofon & Discord](#6-live-voice-changer-mikrofon--discord) |
| Google Colab oder Kaggle schlägt fehl oder trennt Verbindung | GPU-Beschleuniger aus, Kontingent erschöpft oder Zeitlimit erreicht | [7. Cloud-Notebooks (Colab & Kaggle)](#7-cloud-notebooks-colab--kaggle) |

## Einfacher 5-Schritte-Basistest

Wenn alles falsch klingt oder du nicht weißt, welche Einstellung den Ton ruiniert hat, starte mit einem sauberen Test:

1. **Sauberen Clip vorbereiten:** Nimm 10 bis 20 Sekunden einer einzelnen, klaren Stimme in einem ruhigen Raum auf (keine Musik, kein Hall). Speichere sie als Standard-`.wav` in einem einfachen Ordner wie `C:\RVC\test.wav`.
2. **Ein zuverlässiges Modell wählen:** Wähle ein `.pth`-Modell, das sicher funktioniert. Lasse `.index` beim ersten Test aus (`Index Rate = 0`).
3. **Sichere Standardwerte nutzen:**
   - **Pitch / Transpose:** `0` (gleiches Geschlecht), `+12` (Mann zu Frau), `-12` (Frau zu Mann).
   - **Pitch Extractor:** `rmvpe` (bestes Verhältnis aus Tempo und Qualität).
   - **Optionale Effekte / Bereinigung:** Alle **AUS**.
4. **Konvertieren und anhören:** Speichere in einen normalen lokalen Ordner (nicht `OneDrive`). Falls der Browser-Player stumm bleibt, lade die Datei herunter und öffne sie in VLC oder dem Windows Media Player.
5. **Immer nur eine Sache ändern:** Sobald der saubere Test klappt, schalte die `.index`-Datei ein (starte bei `0.5` bis `0.75`) oder passe den Pitch um `1` oder `2` Halbtöne an.

---

## Bekannte Fehler & Schritt-für-Schritt-Lösungen

### 1. Start, Windows, Antivirus & Downloads

| Problem oder Fehler | Was das bedeutet (einfach erklärt) | So behebst du es |
| --- | --- | --- |
| **Schwarzes Konsolenfenster öffnet und schließt sofort** | Du hast aus einer ZIP-Vorschau gestartet oder Python hatte direkt einen Fehler. | 1. Rechtsklick auf die `.zip` und zuerst alles entpacken.<br>2. In Ilaria RVC starte `RUN_ILARIA_RVC_LOGS.bat`, damit das Fenster offen bleibt und den Fehler anzeigt. |
| **Antivirus / Windows Defender löscht `.bat`, `.exe` oder `.dll`** | Sicherheitssoftware stuft portable KI-Skripte fälschlich als verdächtig ein. | Öffne **Windows-Sicherheit → Viren- & Bedrohungsschutz → Schutzverlauf**, stelle die Datei wieder her und füge deinen RVC-Ordner (z. B. `C:\RVC`) zu den **Ausschlüssen** hinzu. |
| `WinError 10048` / `Address already in use` / Port belegt | Eine andere Kopie von RVC oder ein anderes Programm nutzt bereits diesen Port (`6969` oder `7865`). | Schließe alle offenen schwarzen Konsolenfenster (oder beende `python.exe` im **Task-Manager**) und starte die App einmal neu. |
| `[WinError 3]` / `[WinError 206]` (Pfad nicht gefunden / zu lang) | Windows streikt bei Pfaden über 260 Zeichen oder mit Leerzeichen, Umlauten oder Sonderzeichen (`()`, `[]`). | Verschiebe App und Audios in einen kurzen Pfad wie `C:\RVC\`. Benenne Ordner und `.wav`-Dateien nur mit Buchstaben, Zahlen und `_`. |
| `[WinError 2]` (beim Laden/Exportieren von Audio) | `ffmpeg.exe` oder `ffprobe.exe` (das Tool zum Lesen von Audiodateien) fehlt. | Prüfe, ob `ffmpeg.exe` im App-Ordner liegt (ZIP ggf. neu entpacken, falls Defender es entfernt hat). Bei manueller Python-Installation FFmpeg installieren, zum `PATH` hinzufügen und Terminal neu starten. |
| `PermissionError: [Errno 13]` / `[WinError 5] Zugriff verweigert` | Windows blockiert Schreibzugriff in `Program Files`, `OneDrive` oder bei einer Datei, die noch offen ist. | Verschiebe die App aus `Program Files` und `OneDrive` nach `C:\RVC\`. Schließe alle Player oder Editoren, die die Audiodatei geöffnet haben. |
| `Expecting value: line 1 column 1` oder weiße Browserseite | App ist vor dem Start abgestürzt, falscher Port oder VPN/Proxy blockiert lokale Verbindungen. | Lies den **ersten** Fehler im schwarzen Fenster. Prüfe die genaue Adresse (`127.0.0.1:6969` bei Ilaria RVC, `127.0.0.1:7865` bei Gradio/Deiteris). Deaktiviere VPN/Proxy für `localhost` und `127.0.0.1`. |
| Geteiltes Archiv lässt sich nicht entpacken (`.zip.001`, `.zip.002`) | Windows kann mehrteilige Archive nicht entpacken oder ein Teil fehlt. | Lege alle Teile (`.001`, `.002` usw.) in denselben Ordner, installiere **7-Zip**, Rechtsklick **nur** auf `.001` und wähle **7-Zip → Hier entpacken**. |
| `ModuleNotFoundError: No module named 'fairseq'` | Manuelle Installation unter Python 3.11+ oder ohne C++-Build-Tools. | Einsteiger sollten das fertige portable ZIP-Paket nutzen. Bei manueller Installation **Python 3.9 oder 3.10** und **Microsoft Visual Studio Build Tools** (*Desktopentwicklung mit C++*) nutzen. |
| `llvmlite.dll` / `OSError: [WinError 126]` / fehlende `.dll` | Windows fehlen die Visual C++-Laufzeitbibliotheken für Python-KI-Pakete. | Installiere das offizielle **Microsoft Visual C++ 2015-2022 Redistributable (x64)** von Microsoft und starte den PC neu. |
| `urllib.error` / `ConnectionResetError` / `SSLError` | Netzwerk, Firewall oder VPN hat den automatischen Download von `hubert_base.pt` oder `rmvpe.pt` blockiert. | Deaktiviere kurzzeitig VPN/Firewall-Regeln oder lade `hubert_base.pt` und `rmvpe.pt` manuell herunter und lege sie in `assets/hubert/` und `assets/rmvpe/`. |

### 2. GPU, CUDA, AMD/Intel & Speicher

| Problem oder Fehler | Was das bedeutet (einfach erklärt) | So behebst du es |
| --- | --- | --- |
| **Alles läuft extrem langsam (CPU statt GPU)** | Die App erkennt deine Grafikkarte nicht oder du nutzt ein NVIDIA-Paket auf einer AMD/Intel-GPU. | 1. NVIDIA-Nutzer: Treiber prüfen und sicherstellen, dass nicht die integrierte Grafik genutzt wird.<br>2. AMD/Intel-Nutzer: Standard-CUDA-Builds nutzen deine GPU nicht. Nutze einen **DirectML**-Build (YuneVoix, Deiteris DirectML, Mainline DirectML) oder ein Cloud-Notebook. |
| **PC ruckelt, VRAM läuft in RAM über oder Live-Stimme klingt robotisch** | Eine Windows-Funktion namens **HAGS** (Hardwarebeschleunigte GPU-Planung) stört die VRAM-Zuweisung von KI-Apps. | Gehe zu **Windows-Einstellungen → System → Bildschirm → Grafik → Erweiterte Grafikeinstellungen**, schalte **Hardwarebeschleunigte GPU-Planung** auf **AUS** und **starte den PC neu**. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (Konvertierung) | Grafikspeicher ist voll, weil der Track zu lang ist oder ein Spiel/Browser VRAM verbraucht. | Aktiviere **Split Audio** für lange Tracks, schließe Spiele und schwere Browser-Tabs (oder deaktiviere Browser-Hardwarebeschleunigung) und schalte Extra-Effekte aus. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (Training) | Die **Batch Size** ist zu groß für deinen Grafikspeicher. | Senke **Batch Size** schrittweise (von `8` auf `4`, `2` oder `1`). Deaktiviere "Cache dataset in GPU/VRAM" und schließe Live Voice Changer vor dem Training. |
| `Torch not compiled with CUDA enabled` / `no kernel image is available` | Die CUDA-Version der App passt nicht zu deiner NVIDIA-Generation (z. B. neue RTX 50 vs ältere GTX 10). | Nutze den passenden Build: **Ilaria RVC** enthält **CUDA 12.8** für GTX 16 / RTX 20-50 und lädt automatisch **CUDA 12.6** (`runtime-cu126`) für Maxwell/Pascal/Volta. |
| `CUDA driver version is insufficient for CUDA runtime version` | Dein NVIDIA-Treiber ist zu alt für die KI-Engine. | Aktualisiere deinen NVIDIA-Treiber über die **NVIDIA App / GeForce Experience** oder die NVIDIA-Website und starte neu. |
| `RuntimeError: CUDA error: an illegal memory access was encountered` | GPU-Absturz durch instabiles Overclock/Undervolt, Überhitzung oder Treiberkonflikt. | Setze jedes GPU-Overclocking/Undervolting in MSI Afterburner zurück, aktualisiere den NVIDIA-Treiber und teste erneut. |
| `RuntimeError: expected scalar type Half but found Float` / `HalfTensor` | Der schnelle `FP16`-Modus ist an, wird von deiner GPU (GTX 10-Serie, DirectML, CPU) aber nicht unterstützt. | Deaktiviere in den Einstellungen **FP16** (wechsle auf **FP32**). |
| `OSError: [WinError 1455]` (Auslagerungsdatei zu klein) | Windows hat beim Laden von Modellen oder Erstellen des Index zu wenig Virtuellen Speicher auf der Festplatte. | Suche **Erweiterte Systemeinstellungen anzeigen → Leistungseinstellungen → Erweitert → Virtueller Arbeitsspeicher → Ändern**, deaktiviere die Automatik, stelle eine benutzerdefinierte Größe ein (z. B. Anfangsgröße `16384` MB, Maximal `32768` MB), klicke **Festlegen** und **starte neu**. |

### 3. Modelle, Checkpoints & Indexe

| Problem oder Fehler | Was das bedeutet (einfach erklärt) | So behebst du es |
| --- | --- | --- |
| **Modell in Ordner gelegt, warum erscheint es nicht?** | Refresh vergessen, noch im `.zip` oder falscher Unterordner. | 1. Entpacke die `.zip`, sodass `.pth` und `.index` direkt sichtbar sind.<br>2. Lege `.pth` in `assets/weights/` (oder `weights/`) und `.index` in `logs/`.<br>3. Klicke auf **Refresh** neben der Modellauswahl. |
| `UnpicklingError` / `Weights only load failed` (`fairseq.data.dictionary.Dictionary`) | PyTorch 2.6+ blockiert ältere RVC-Modellformate standardmäßig aus Sicherheitsgründen. | Aktualisiere auf die neueste App-Version (z. B. **Ilaria RVC 2.4.0+** oder aktuelles **Applio**), die den sicheren Loader bereits enthält. |
| `EOFError` / `RuntimeError: invalid load key` / `File is not a zip archive` | Download abgebrochen, beschädigt oder es wurde eine Webseite statt der Datei gespeichert. | Prüfe die Dateigröße: Eine echte `.pth` ist meist **40 bis 100+ MB** groß. Wenn sie nur wenige KB oder 0 KB hat, lösche sie und lade sie neu herunter. |
| `Missing key(s) in state_dict` / `Sizes of tensors must match` | Du hast einen rohen Trainings-Checkpoint (`G_*.pth` oder `D_*.pth`) statt des exportierten Modells geladen oder `v1` und `v2` gemischt. | Kopiere niemals rohe `G_*.pth`-Dateien aus `logs/` nach `weights/`. Nutze den **Export**-Button der App und prüfe, ob `v1` / `v2` und Abtastrate übereinstimmen. |
| **Index-Fehler / falsche Dimensionen / RAM-Absturz beim Indexbau** | Du hast `trained_*.index` statt `added_*.index` gewählt, den Index eines anderen Modells genutzt oder das Dataset ist riesig. | Wähle immer **`added_*.index`** (nie `trained_*.index`). Falls der Fehler bleibt, setze **Index Rate** auf `0`, um ohne Index zu testen. Mische niemals `.index`-Dateien verschiedener Modelle. |

### 4. Stimmqualität, Pitch & Audiodateien

| Problem oder Fehler | Was das bedeutet (einfach erklärt) | So behebst du es |
| --- | --- | --- |
| **Stimme klingt wie ein Streifenhörnchen oder tiefes Monster** | Die Einstellung **Pitch (Transpose)** passt nicht zum Abstand zwischen Ausgangs- und Zielstimme. | Nutze `0` bei gleichem Geschlecht, `+12` von Mann zu Frau und `-12` von Frau zu Mann. Danach fein in `1`er-Schritten anpassen. |
| **Stimme klingt metallisch, wässrig, robotisch oder verzerrt** | Ausgangsaudio hat Musik/Hall, falscher Pitch Extractor oder falscher Embedder. | 1. Bereinige das Ausgangsaudio zuerst mit **UVR5** oder **MVSep** (null Musik/Hall).<br>2. Stelle Pitch Extractor auf **`rmvpe`**.<br>3. Nutze denselben Embedder wie beim Training (fast immer **`contentvec`**).<br>4. Senke **Index Rate** von `1.0` auf `0.5` oder `0.3`. |
| **Ergebnis klingt noch zu sehr nach der eigenen Stimme** | **Index Rate** ist zu niedrig oder der **Pitch** liegt noch in deiner natürlichen Tonlage. | Passe Pitch näher an die Zielstimme an (`+12` / `-12`), erhöhe **Index Rate** leicht (`0.6` bis `0.75`) oder teste ein saubereres Modell. |
| **Konverter öffnet Audiodatei nicht** | Nicht unterstütztes Format (`.m4a`, `.opus`, defekte `.mp3`) oder Sonderzeichen im Dateinamen. | Wandle die Datei in Standard-**PCM-`.wav`** (44100 Hz oder 48000 Hz) um und benenne sie einfach wie `input.wav`. |

### 5. Dataset-Vorbereitung & Training

| Problem oder Fehler | Was das bedeutet (einfach erklärt) | So behebst du es |
| --- | --- | --- |
| `ValueError: zero-size array` / leerer Tensor | Dataset-Ordner ist leer, enthält komplett stumme Clips, Clips unter 1 Sekunde oder Leerzeichen/Umlaute im Pfad. | Nutze nicht-leere `.wav`-Dateien (jeweils 2 bis 10 Sekunden), entferne stumme oder defekte Clips, wähle einen einfachen Pfad ohne Leerzeichen und starte ein neues Experiment. |
| `BrokenProcessPool` / PC friert bei Vorbereitung ein | Zu viele CPU-Threads gleichzeitig verbrauchen den gesamten Arbeitsspeicher. | Reduziere die **CPU-Threads / Worker** beim Preprocessing (z. B. von `8` auf `2` oder `4`) und prüfe auf genug freien Speicherplatz. |
| `NaN loss` oder exportiertes Modell ist komplett stumm | Übersteuerter/defekter Clip im Dataset, `FP16`-Überlauf oder unpassendes `G/D`-Pretrain. | Prüfe alle Clips auf starkes Clipping oder totale Stille. Nutze das **Standard-RVC-Pretrain** passend zur Abtastrate, schalte `FP16` **AUS** (nutze `FP32`) und starte ein neues Training. |
| **Training setzt nicht fort / startet bei Epoch 0** | `Fresh Training` war noch aktiviert oder Dateien in `logs/` wurden verschoben/umbenannt. | Lasse den gesamten Ordner `logs/<Experiment>/` unverändert, gib exakt denselben **Experimentnamen**, **Sample Rate** und **Embedder** ein, erhöhe die Ziel-Epochen und schalte `Fresh Training` **AUS**. |
| **Stimme klingt dumpf, verrauscht oder hat "Overfitting"** | Das Modell wurde zu viele Epochen auf einem kleinen/unsauberen Dataset trainiert. | Stoppe früher (teste Checkpoints alle 50-100 Epochen, z. B. 200-400 Epochen bei kleinen Datasets) und reinige das Dataset vorher mit **UVR5** oder **MVSep**. |

### 6. Live Voice Changer, Mikrofon & Discord

| Problem oder Fehler | Was das bedeutet (einfach erklärt) | So behebst du es |
| --- | --- | --- |
| **In Discord oder im Spiel hört niemand die veränderte Stimme** | Die Ziel-App nutzt noch dein echtes Mikrofon statt des virtuellen Kabels oder der Voice Changer läuft nicht. | 1. Installiere **VB-CABLE** und starte den PC neu.<br>2. Im Voice Changer: **Input** = physisches Mikrofon, **Output** = `CABLE Input (VB-Audio Virtual Cable)`.<br>3. In **Discord / Spiel**: **Eingabegerät** = `CABLE Output (VB-Audio Virtual Cable)`. |
| `PortAudioError` / `Invalid sample rate` / Gerät startet nicht | Mikrofon, Kopfhörer und VB-CABLE laufen mit verschiedenen Abtastraten (`44100 Hz` vs `48000 Hz`) oder im Exklusiv-Modus. | Öffne die **Windows-Sound-Systemsteuerung (`mmsys.cpl`)**, gehe unter **Eigenschaften → Erweitert** für Mikrofon, Kopfhörer, `CABLE Input` und `CABLE Output`, stelle **alle auf 48000 Hz**, entferne den Haken bei **Anwendungen die alleinige Kontrolle erlauben** und starte die App neu. |
| **Ruckler, Knacken oder starke Verzögerung** | Deine GPU braucht pro Audio-Block länger als die Blockdauer selbst. | 1. Erhöhe **Chunk Size** leicht.<br>2. Nutze **RMVPE** oder **FCPE** für Pitch.<br>3. Deaktiviere **HAGS** in Windows.<br>4. Begrenze Spiel-FPS oder schließe schwere GPU-Apps. |
| **Echo oder man hört sich doppelt** | Du nutzt Lautsprecher (Mikrofon nimmt sie auf) oder zwei Programme geben dein Mikro gleichzeitig aus. | Trage immer **Kopfhörer**. Schalte **"Dieses Gerät als Wiedergabequelle verwenden"** in Windows-Aufnahme **AUS** und aktiviere Monitor nur im Voice Changer, wenn nötig. |
| **Discord schneidet Atemzüge oder Wortenden ab** | Discords Rauschunterdrückung hält leise Stimmenden für Hintergrundlärm. | Deaktiviere in Discord unter **Sprache & Video** die **Krisp-Rauschunterdrückung**, **Echounterdrückung** und **Eingangsempfindlichkeit automatisch bestimmen** (Regler manuell setzen). Senke zudem VAD / Noise Gate im Voice Changer. |

### 7. Cloud-Notebooks (Colab & Kaggle)

| Problem oder Fehler | Was das bedeutet (einfach erklärt) | So behebst du es |
| --- | --- | --- |
| `CUDA not available` / `No GPU found` in Colab oder Kaggle | GPU-Beschleuniger in den Notebook-Einstellungen nicht aktiviert oder Gratis-Kontingent erschöpft. | **Colab:** **Laufzeit → Laufzeittyp ändern → T4 GPU**.<br>**Kaggle:** rechte Leiste **Settings → Accelerator → GPU T4 x2** (Telefonverifizierung nötig). |
| **Download im Notebook schlägt fehl (`403` / Drive- oder Mega-Limit)** | Öffentlicher Link hat das Tageslimit erreicht oder wurde privat gestellt. | Lade Dataset oder Modell zuerst auf **Hugging Face** oder dein eigenes Google Drive hoch und lade es von dort. |
| **Notebook trennt Verbindung mitten im Training** | Cloud-Notebooks beenden sich bei Inaktivität oder langen Sitzungen und löschen temporäre Daten. | Sichere `logs/` und `weights/` immer auf **Google Drive** (oder Kaggle Output) und setze vom letzten gespeicherten `G_*.pth` / `D_*.pth` fort. |

---

## Schnelle App-Checks

- **Ilaria RVC:** Entpacke das gesamte ZIP in einen kurzen Pfad wie `C:\IlariaRVC`. Nutze `RUN_ILARIA_RVC_LOGS.bat`, falls es beim Start schließt, prüfe ob `127.0.0.1:6969` frei ist und lies den **ersten** Fehler über der Abschlussmeldung.
- **Applio Desktop:** Öffne den Tab **Setup** und prüfe den Engine-Status. Klicke **Install / Repair**, falls ein Check rot ist. Bei **Gradio** lasse die Konsole offen und kopiere genau die dort gedruckte `localhost`-Adresse.
- **RVC Mainline / w-okada / Deiteris / TGR:** Wähle vor dem Download passend zu deiner GPU **CUDA** (NVIDIA) oder **DirectML** (AMD/Intel). Entpacke geteilte `.zip.001`-Archive mit 7-Zip erst, wenn alle Teile im selben Ordner liegen.

## So fragst du richtig nach Hilfe

Wenn du Unterstützung suchst (z. B. über die [Ilaria RVC Kontaktseite](https://ilariarvc.shop/en/contact/)), gib diese 4 Punkte an:
1. **App-Name und Version** (z. B. `Ilaria RVC 2.4.0`, `Applio Desktop`, `Deiteris`).
2. **PC-Daten:** Windows-Version, genaues GPU-Modell (z. B. `RTX 3060` oder `RX 6700 XT`) und Backend (`CUDA` / `DirectML` / `CPU`).
3. **Die ERSTE Fehlerzeile** aus der Konsole (privaten Windows-Benutzernamen ggf. unkenntlich machen).
4. **Was du gemacht hast:** Training (Abtastrate, Vocoder, Embedder, neu vs fortsetzen) oder Live Voice Changer (genaue Kette: `Mic -> App -> VB-CABLE -> Discord`).
