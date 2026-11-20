---
label: "🩺 Fehlerbehebung"
order: 95
permalink: /troubleshooting/
---
# RVC-Fehlerbehebung

[Ilaria RVC 2.4.0 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

!!!tip
Neu bei RVC? **Starte immer mit einer 10-Sekunden-WAV-Datei und einem Modell.** Stürzt die App ab, öffne das Log und kopiere den **ersten** Fehler. Läuft sie, klingt aber falsch, teste denselben Clip erneut und ändere jeweils nur eine Einstellung.
!!!

Eine gute Diagnose beginnt beim ersten fehlgeschlagenen Schritt. Notiere App-Version, den ersten Fehler und einen reproduzierbaren Test.

## Symptom finden

| Symptom | Erster Test |
| --- | --- |
| Launcher beendet sich oder Browser meldet Verbindungsfehler | Konsole offen lassen und die ausgegebene lokale Adresse prüfen. |
| Modell fehlt, lädt nicht oder meldet fehlende Keys | Prüfen, ob es ein Inferenz-Export ist, sowie RVC-Version und Embedder abgleichen. |
| Konverter kann Datei nicht lesen | Kurze PCM-WAV-Datei aus einem einfachen lokalen Pfad testen. |
| Konvertierung klappt nur ohne Index | Prüfen, ob der Index exakt zu diesem Modell und Embedder gehört. |
| Stimme klingt metallisch, undeutlich oder zu sehr nach dir | Mehrere saubere Clips und ein bekannt gutes Modell ohne Effekte/Retrieval testen. |
| Training stoppt oder liefert keinen brauchbaren Export | Fehlerhafte Phase bestimmen und Log sowie Experimentordner prüfen. |
| CUDA schlägt fehl oder Speicher läuft voll | Zwischen nicht unterstützter GPU, voller VRAM und erschöpftem RAM / Pagefile unterscheiden. |
| Mikrofon hat Latenz, Aussetzer, Stille oder Echo | Physisches Mikrofon, Monitor-Kopfhörer, virtuelles Kabel und Ziel-App getrennt testen. |

## Referenztest festlegen

1. Nimm 10-20 Sekunden eines einzelnen Sprechers mit klaren Vokalen, `s` oder `f` und natürlicher Pause als saubere lokale WAV auf.
2. Wähle ein zuverlässiges, kompatibles Inferenzmodell. Starte mit Pitch `0`, Standard-Pitch-Detektor, ohne Effekte und Retrieval (`index`) auf `0`.
3. Konvertiere in einen beschreibbaren lokalen Ordner und höre die Datei auch außerhalb des Browsers an.
4. Wiederhole den Test mit einem zweiten, sicher funktionierenden Modell, um Umgebungs- von Modellfehlern zu trennen.
5. Aktiviere Optionen einzeln und dokumentiere funktionierende Einstellungen.

---

## Bekannte Fehler & genaue Lösungen

### 1. Windows-, Pfad-, Python- & Launcher-Fehler

| Fehler / Meldung | Ursache | Lösung |
| --- | --- | --- |
| `[WinError 3] The system cannot find the path specified` / `[WinError 206] The filename or extension is too long` | Windows-260-Zeichen-Limit oder Leerzeichen/Sonderzeichen in Ordner- oder Dateinamen. | App und Datasets in einen kurzen Basispfad verschieben (z. B. `C:\RVC` oder `D:\IlariaRVC`). Leerzeichen, `()`, `[]` und Unicode-Sonderzeichen entfernen. |
| `[WinError 2] The system cannot find the file specified` (beim Laden/Exportieren) | `ffmpeg.exe` / `ffprobe.exe` fehlt oder ist nicht im `PATH`. | Prüfen, ob `ffmpeg` im App-Ordner liegt. Bei Quellcode-Installationen FFmpeg installieren, zum `PATH` hinzufügen und Terminal neu starten. |
| `PermissionError: [Errno 13] Permission denied` / `[WinError 5]` | Schreiben in `Program Files`, `OneDrive`, schreibgeschützte Ordner oder Datei durch anderes Programm/Antivirus gesperrt. | In einen eigenen beschreibbaren Ordner entpacken (nicht `Program Files` oder `OneDrive`), andere Player schließen und Antivirus-Ausnahme setzen. |
| `ModuleNotFoundError: No module named 'fairseq'` | `fairseq` lässt sich unter Python 3.11+ oder ohne C++-Build-Tools kaum kompilieren. | Portables Komplettpaket nutzen oder Umgebung mit **Python 3.9 oder 3.10** sowie **Microsoft Visual Studio Build Tools** (*Desktopentwicklung mit C++*) neu erstellen. |
| `llvmlite.dll` / `OSError: [WinError 126]` / fehlende DLL | Microsoft Visual C++ Redistributable fehlt/passt nicht oder Runtime-DLL beschädigt. | Offizielle **Microsoft Visual C++ 2015-2022 Redistributable (x64)** installieren oder reparieren; bei fehlender DLL Originalpaket neu entpacken. |
| `Expecting value: line 1 column 1` / leere Gradio-Seite | Server vor Antwort abgestürzt oder Proxy/VPN fängt `127.0.0.1` ab. | Konsole offen lassen und ersten Python-Traceback lesen. Port prüfen (`127.0.0.1:6969` bei Ilaria RVC, `7865` bei Gradio/Deiteris) und Proxy für `localhost` / `127.0.0.1` umgehen. |
| `urllib.error` / `ConnectionResetError` / `SSLError` | Netzwerkblockade, VPN oder Timeout von Hugging Face/GitHub beim Laden von `hubert_base.pt` oder `rmvpe.pt`. | VPN/Firewall vorübergehend deaktivieren oder `hubert_base.pt` und `rmvpe.pt` manuell nach `assets/hubert/` bzw. `assets/rmvpe/` herunterladen. |

### 2. GPU-, CUDA-, DirectML- & Speicherfehler

| Fehler / Meldung | Ursache | Lösung |
| --- | --- | --- |
| **VRAM läuft in RAM über / langsames Training / robotischer Live-Ton (Windows 10/11)** | **Hardwarebeschleunigte GPU-Planung (HAGS)** stört die PyTorch-VRAM-Verwaltung und entzieht Hintergrund-Voice-Changern Leistung. | Öffne **Windows-Einstellungen → System → Anzeige → Grafik → Erweiterte Grafikeinstellungen**, schalte **Hardwarebeschleunigte GPU-Planung** **AUS** und **starte den PC neu**. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (Inferenz) | Audiodatei zu lang oder andere Apps (Spiele, Browser mit Hardwarebeschleunigung) belegen VRAM. | Für lange Tracks **Split Audio** aktivieren, andere GPU-Apps schließen, ungenutzte Modelle entladen und Post-Processing deaktivieren. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (Training) | Batch-Größe zu hoch für deine VRAM oder Dataset-Caching im VRAM aktiv. | **Batch Size** senken (z. B. von `8` auf `4`, `2` oder `1`), VRAM-Dataset-Caching ausschalten und Live-Voice-Changer vor dem Training beenden. |
| `RuntimeError: CUDA error: an illegal memory access was encountered` | Treiber/PyTorch-Konflikt, instabiles GPU-Overclocking/Undervolting oder voller Shared-Memory. | NVIDIA-Treiber aktualisieren, GPU-Overclock/Undervolt zurücksetzen und passenden CUDA-PyTorch-Build prüfen. |
| `Torch not compiled with CUDA enabled` / `no kernel image is available for execution on the device` | Falsches Paket für deine GPU-Generation (z. B. altes CUDA auf RTX 50 oder CPU-only PyTorch). | Passende Runtime nutzen: Ilaria RVC enthält **CUDA 12.8** (GTX 16 / RTX 20-50) und lädt **CUDA 12.6** (`runtime-cu126`) für Maxwell/Pascal/Volta. AMD/Intel benötigen DirectML/ROCm oder Cloud-GPU. |
| `RuntimeError: expected scalar type Half but found Float` (oder `HalfTensor`-Fehler) | `FP16` auf nicht unterstützter GPU/Backend erzwungen (GTX-10-Serie, DirectML, CPU). | **FP16** in den Einstellungen deaktivieren und auf **FP32** wechseln. |
| `OSError: [WinError 1455] The paging file is too small for this operation to complete` | Virtueller Windows-Speicher (Auslagerungsdatei / Pagefile) bei Modell-Laden, Index-Bau oder Training erschöpft. | **Systemeigenschaften → Erweitert → Leistung (Einstellungen) → Erweitert → Virtueller Arbeitsspeicher** öffnen, Pagefile vergrößern (z. B. `16384–32768 MB`) und neu starten. |

### 3. Modell-Laden, Checkpoints, Embedder & Indexes

| Fehler / Meldung | Ursache | Lösung |
| --- | --- | --- |
| `UnpicklingError` / `Weights only load failed` (`fairseq.data.dictionary.Dictionary`) | PyTorch 2.6+ nutzt standardmäßig `weights_only=True` in `torch.load` und blockiert ältere fairseq-Objekte. | Auf die neueste App-Version aktualisieren (z. B. Ilaria RVC 2.4.0+ oder aktuelles Applio), die `safe_globals` für `Dictionary` automatisch behandelt. |
| `EOFError` / `RuntimeError: invalid load key` / `File is not a zip archive` | `.pth`-Download abgebrochen/beschädigt oder Browser hat eine HTML-Seite statt der Binärdatei gespeichert. | Dateigröße prüfen (gültige `.pth`-Dateien sind meist 40-100+ MB groß, nicht wenige KB). Defekte Datei löschen und sauber neu laden. |
| `Missing key(s) in state_dict` / `RuntimeError: Sizes of tensors must match` | Roher Trainings-Checkpoint (`G_*.pth` / `D_*.pth` aus `logs/`) statt Inferenz-Export geladen, oder `v1` (256-d) mit `v2` (768-d) gemischt. | Immer per **Export**-Funktion ein Inferenz-`.pth` erzeugen (keine rohen `G_*.pth` nach `models/` kopieren) und RVC-Version sowie Sample-Rate prüfen. |
| Verzerrte Aussprache oder starke Durchmischung mit deiner eigenen Stimme | **Falscher Embedder** zwischen Training und Inferenz oder allgemeiner HuBERT statt `contentvec`. | Exakt denselben Embedder wie beim Training wählen (fast immer **`contentvec`**). Zuerst mit Retrieval `0` testen. |
| Index-Fehler / Dimensionsfehler / RAM-Absturz beim Index-Bau | `trained_*.index` statt `added_*.index` gewählt, fremder Index oder zu viele Features für den RAM. | Immer `added_*.index` wählen (oder Retrieval zum Testen auf `0` setzen). Niemals Indexes zwischen verschiedenen Modellen mischen. |

### 4. Dataset-Preprocessing, Feature-Extraktion & Training

| Fehler / Meldung | Ursache | Lösung |
| --- | --- | --- |
| `ValueError: zero-size array to reduction operation` / Zero-Size-Tensor | Leerer Dataset-Ordner, komplett stummer Clip, Clip kürzer als 1 Sekunde, oder Leer-/Sonderzeichen im Pfad. | Einfachen Pfad ohne Leerzeichen nutzen, stumme/defekte Clips entfernen, gültige WAVs verwenden und Preprocessing in einem neuen Experiment ausführen. |
| `BrokenProcessPool` / Preprocessing-Worker stürzen ab | Zu viele parallele CPU-Worker erschöpfen den Arbeitsspeicher. | CPU-Thread-/Worker-Anzahl senken und freien Festplattenspeicher sicherstellen. |
| `NaN loss` oder komplett stummes exportiertes Modell | Beschädigtes/übersteuertes Audio im Dataset, inkompatibles `G`/`D`-Pretrain-Paar oder `FP16`-Überlauf. | Clips auf Clipping/Stille prüfen, Pretrain-`G/D` auf Sample-Rate/Vocoder prüfen (oder Stock-RVC nutzen) und `FP32` testen. |
| Fortsetzen des Trainings schlägt fehl oder startet bei Epoche 0 | `Fresh Training` noch aktiv, oder `G_*.pth` / `D_*.pth` / `config.json` verschoben bzw. umbenannt. | Gesamten Ordner `logs/<experiment>/` unverändert lassen, exakt denselben Namen/Sample-Rate/Embedder wählen, höheres Gesamt-Epochenziel setzen und `Fresh Training` **aus** lassen. |

### 5. Live-Voice-Changer, PortAudio & Audio-Routing

| Fehler / Meldung | Ursache | Lösung |
| --- | --- | --- |
| `PortAudioError` / `Invalid sample rate` / Gerät nicht verfügbar | Unterschiedliche Abtastraten der Windows-Audiogeräte oder Exklusivmodus durch andere App. | In den **Windows-Soundeinstellungen** Mikrofon, Kopfhörer und `VB-CABLE` einheitlich auf **48000 Hz** stellen, **Exklusivmodus** deaktivieren und nach Kabel-Installation neu starten. |
| Robotisches Stottern, Knackser oder hohe Latenz | GPU-Inferenzzeit überschreitet Chunk-Dauer, HAGS ist aktiv oder Spiele lasten die GPU aus. | **Chunk Size** erhöhen, **RMVPE** oder **FCPE** statt schwerem Crepe wählen, **HAGS** deaktivieren und konkurrierende GPU-Apps schließen. |
| Echo oder doppelte Stimme im Kopfhörer | Lautsprecher statt Kopfhörer aktiv oder doppeltes Monitoring (Windows „Dieses Gerät als Wiedergabequelle“ + App-Monitor). | Immer **Kopfhörer** tragen und Monitoring nur an **einer einzigen Stelle** aktivieren. |
| Atemzüge oder Wortenden werden in Discord abgeschnitten | Discords **Krisp-Rauschunterdrückung** oder **automatische Eingangsempfindlichkeit** schneidet sie ab, oder VAD/Noise Gate zu hoch. | Krisp und automatische Empfindlichkeit in Discord für das virtuelle Mikrofon deaktivieren und VAD / Noise Gate in der App senken. |

---

## App-spezifische Startprüfungen

- **Ilaria RVC:** Gesamtes Archiv entpacken und `RUN_ILARIA_RVC_LOGS.bat` starten. Erste Exception über der letzten Meldung lesen. Prüfen, ob Windows die NVIDIA-GPU erkennt und `127.0.0.1:6969` frei ist.
- **Applio Desktop:** **Setup** öffnen und Engine-Status prüfen; bei Fehlern **Install / Repair** nutzen. Bei **Gradio** Konsole offen lassen und die dort gedruckte `localhost`-Adresse öffnen.
- **RVC WebUI (Mainline) / w-okada / Deiteris / TGR:** Passenden CUDA- oder DirectML-Build wählen. Bei geteilten `.zip.001`-Archiven vor dem Entpacken alle Teile im selben Ordner ablegen.

## Problem melden

Gib bei Supportanfragen (z. B. über die [Kontaktseite](https://ilariarvc.shop/en/contact/) für Ilaria RVC) immer an:
1. App-Name, Edition und Version (z. B. `Ilaria RVC 2.4.0`).
2. Betriebssystem, genaues GPU-Modell und Backend (`CUDA` / `DirectML` / `CPU`).
3. Die **erste Fehlerzeile** samt umgebenden Log-Zeilen (ohne private Pfade/Kontodaten).
4. Beim Training: fehlgeschlagene Phase, Sample-Rate, Vocoder, Embedder, Neu- oder Fortsetzungslauf. Bei Live-Audio: vollständige Gerätekette (`Mikrofon → App → Virtuelles Kabel → Ziel-App`).
