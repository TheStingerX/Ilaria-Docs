# Okada TG Developed Fork in der Cloud

Wenn dein Computer keine kompatible NVIDIA-, AMD- oder Intel-GPU besitzt, kannst du **Okada TG Developed Fork** auf einer Cloud-GPU über **Google Colab**, **Kaggle** oder **Lightning.AI** starten und per Browser steuern.

> **Warum "Server audio not available" erscheint:** Cloud-VMs haben keine physische Soundkarte. Diese Meldung ist völlig normal. Nutze immer den **Client-Modus**, damit dein Browser das lokale Mikrofon erfasst und die konvertierte Stimme an deine Kopfhörer oder dein virtuelles Audiokabel ausgibt.

> **Erwartete Latenz:** Cloud-Konvertierung fügt zusätzlich zur GPU-Inferenz Netzwerklatenz hinzu. Wähle die nächstgelegene **Ngrok**-Region (oder **Port Viewer** bei Lightning.AI) und nutze nach Möglichkeit LAN oder 5-GHz-WLAN.

## 1. Cloud-Anbieter auswählen

| Plattform | GPU & Kontingent | Speicher | Verfügbare Tunnel |
| --- | --- | --- | --- |
| **Google Colab** | Bezahlter Tarif für Web-UIs nötig | Temporär (pro Sitzung) | Ngrok |
| **Kaggle** | Kostenloses Wochenkontingent (**T4 x2**) | Sitzung + optionale Persistenz | Ngrok |
| **Lightning.AI** | Credit-basiert (`1 Credit = $1 USD` pro Sekunde; kostenloses 4-CPU-Studio + Startguthaben; siehe [Preise](https://lightning.ai/pricing)) | Persistent (**Teamspace Drive**, 10 GB frei) | Port Viewer (empfohlen), Tunnel-Auswahl |

## 2. Virtuelles Audiokabel einrichten (Discord, OBS, Spiele)

Installiere ein virtuelles Audiokabel, um die Browser-Ausgabe an Discord, OBS oder ein Spiel weiterzuleiten:

- **Windows**: lade [VAC Lite](https://software.muzychenko.net/freeware/vac470lite.zip) (oder **VB-CABLE**) herunter. Nutze `setup64` auf Intel/AMD-PCs bzw. `setup64a` auf ARM-Windows-Laptops (z. B. Snapdragon). Falls Windows deine Standard-Audiogeräte umstellt, drücke `Win + R`, starte `mmsys.cpl` und stelle **Wiedergabe** und **Aufnahme** (inklusive **Standardkommunikationsgerät**) wieder her.
- **macOS**: installiere [BlackHole](https://existential.audio/blackhole) oder [VB-Audio Cable](https://vb-audio.com/Cable).
- **Linux**: installiere PortAudio (`sudo apt-get update && sudo apt-get install -y portaudio19-dev` unter Debian/Ubuntu, `sudo yum install -y portaudio` unter Fedora/RHEL oder `sudo pacman -Syu portaudio` unter Arch).

Die vollständige Einrichtung für Discord und OBS findest du in der [Anleitung für virtuelle Audiokabel](../vonovox/live-audio.md).

## 3. Option A: Google Colab

> **Wichtiger Hinweis zu den Nutzungsbedingungen:** Web-UIs im **kostenlosen Google-Colab-Tarif** verstoßen gegen Googles [Richtlinie zu unzulässigen Aktivitäten](https://research.google.com/colaboratory/faq.html#disallowed-activities) und können zu GPU-Sperren oder Kontoeinschränkungen führen. Nutze für Web-UIs einen **bezahlten Colab-Tarif**.

1. Öffne das [Tg-Develop-Colab-Notebook](https://colab.research.google.com/github/tg-develop/voice-changer/blob/master-custom/Colab_RealtimeVoiceChanger.ipynb).
2. Führe die **erste Zelle** von oben aus, bis `Done! Proceed with the next steps` erscheint.
3. Führe die **zweite Zelle** aus.
4. Scrolle zur **letzten Zelle** und füge deinen [Ngrok-Authtoken](https://dashboard.ngrok.com/get-started/your-authtoken) in `TOKEN_HERE` ein.
5. *(Optional)* Wähle unter dem Token-Feld die nächstgelegene **Region** für geringere Latenz.
6. Starte die Zelle und öffne den erzeugten **Ngrok-Link**, sobald die Downloads fertig sind.

## 4. Option B: Kaggle (kostenlose T4 x2)

### Kontoverifizierung (einmalig)

1. Erstelle ein [Kaggle-Konto](https://www.kaggle.com/account/login?phase=startRegisterTab&returnUrl=%2F).
2. Verifiziere deine **Telefonnummer** in den Kontoeinstellungen, damit du **Internet** in Notebooks aktivieren kannst.

### Notebook einrichten und starten

1. Öffne [Kaggle](https://www.kaggle.com) und klicke auf **Create → New Notebook**.
2. Klicke auf **File → Import Notebook**, öffne den Tab **Link**, füge `https://github.com/tg-develop/voice-changer/blob/master-custom/Kaggle_RealtimeVoiceChanger.ipynb` ein und klicke auf **Import**.
3. In der rechten Seitenleiste:
   - Schalte **Internet** auf **ON**.
   - Setze Persistence auf **Files and variables**.
   - Wähle unter Accelerator **GPU T4 x2**.
4. *(Optional)* Nutze **Save version** nur bei Bedarf, da dein GPU-Kontingent im Leerlauf weiter verbraucht wird.
5. Führe die **erste Installationszelle** aus, bis `Done! Proceed with the next steps` erscheint, und starte dann die **dritte Zelle**.
6. Füge deinen [Ngrok-Authtoken](https://dashboard.ngrok.com/get-started/your-authtoken) in die **letzte Zelle** ein, starte sie und öffne die erzeugte öffentliche URL.

## 5. Option C: Lightning.AI (Persistentes Studio)

1. Erstelle ein [Lightning.AI-Konto](https://lightning.ai) und verifiziere deine **Telefonnummer** (Freischaltung dauert **2-3 Werktage**).
2. Klone das [Wokada-TgDevelop-Fork Studio](https://lightning.ai/nick088/studios/wokada-tg-develop-fork).
3. Wechsle über **Studio Environment → Switch To GPU** in eine GPU-Umgebung.
4. Führe die **erste Zelle** zur Installation und die **zweite Zelle** zur Server-Konfiguration aus.
5. Wähle in der **dritten Zelle** deinen Tunnel (**Port Viewer** empfohlen) und starte sie.
6. Lade über **Teamspace Drive** rechts deine `.pth`- und `.index`-Modelle hoch.
7. **Zurücksetzen / Aktualisieren**: Die letzte Zelle **"Delete everything"** löscht alle Dateien vom persistenten Speicher für eine saubere Neuinstallation.

## 6. Stimmmodelle und Audio einrichten

Sobald die Web-UI im Browser geöffnet ist, entsprechen Modell-Upload und **Client-Modus** der lokalen Version. Weiter mit [Modell, Mikrofon und Kabel](live-audio.md).

## 7. Cloud-Fehlerbehebung und Werkzeuge

### Debug-Modus aktivieren

Wenn der Cloud-Server abstürzt oder nicht startet, hänge `--log-level debug` an den Startbefehl der letzten Zelle an:

- **Google Colab**: `!./ML_Program --log-level debug`
- **Kaggle & Lightning.AI**: `!./VoiceChanger --log-level debug`

Kopiere bei Support-Anfragen die vollständige Konsolenausgabe (vermeide `warning`, `error` oder `critical`, da diese wichtige Startdetails ausfiltern).

### `.safetensors` zurück in `.pth` konvertieren

W-Okada speichert importierte Modelle in `model_dir` als `.safetensors`. Nutze den integrierten [Safetensors-Konverter](../../../ilaria-rvc/manage/safetensors-converter.md) in Ilaria RVC oder ein `torch` + `safetensors`-Skript (`!pip install torch safetensors`).
