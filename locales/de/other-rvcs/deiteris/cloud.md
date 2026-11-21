---
label: "Cloud (Colab, Kaggle, Lightning.AI)"
icon: ":cloud:"
order: 98
permalink: /ilaria-rvc/deiteris/cloud/
description: "Führe Deiteris w-okada Fork in der Cloud über Google Colab, Kaggle oder Lightning.AI aus, wenn dein PC keine unterstützte GPU hat."
---
# Deiteris w-okada Fork in der Cloud

Wenn dein Computer keine unterstützte lokale GPU hat, kannst du **Deiteris w-okada Fork** über **Google Colab**, **Kaggle** oder **Lightning.AI** auf einer Cloud-GPU starten und im Browser bedienen.

> **Warum "Server audio not available" erscheint:** Cloud-Instanzen besitzen keine physische Soundkarte. Diese Meldung ist normal. Nutze immer den **Client-Modus**, damit dein Browser dein Mikrofon erfasst und die konvertierte Stimme lokal wiedergibt.

> **Erwartete Latenz:** Cloud-Tunnel fügen zusätzlich zur GPU-Inferenz Netzwerklatenz hinzu. Wähle die nächstgelegene **Ngrok**-Region (oder **Port Viewer** bei Lightning.AI) und nutze nach Möglichkeit LAN oder 5-GHz-WLAN.

## 1. Cloud-Anbieter auswählen

| Plattform | GPU & Kontingent | Speicher | Verfügbare Tunnel |
| --- | --- | --- | --- |
| **Google Colab** | Bezahlter Tarif für Web-UIs nötig | Temporär (pro Sitzung) | Ngrok |
| **Kaggle** | Kostenloses Wochenkontingent (**T4 x2**) | Sitzung + optionale Persistenz | Ngrok |
| **Lightning.AI** | Kostenlose Monats-Credits (75h T4 16GB / 31h L4 24GB / 15h L40 48GB) | Persistent (**Teamspace Drive**) | Port Viewer (empfohlen), Tunnel-Auswahl |

## 2. Virtuelles Audiokabel einrichten (Discord, OBS, Spiele)

Installiere ein virtuelles Audiokabel, um die Browser-Ausgabe an Discord, OBS oder ein Spiel zu leiten:

- **Windows**: lade [VAC Lite](https://software.muzychenko.net/freeware/vac470lite.zip) (oder **VB-CABLE**) herunter. Nutze `setup64` auf Intel/AMD-PCs bzw. `setup64a` auf ARM-Windows-Laptops (z. B. Snapdragon). Falls Windows deine Standardgeräte ändert, drücke `Win + R`, starte `mmsys.cpl` und stelle **Wiedergabe** und **Aufnahme** (inkl. **Standardkommunikationsgerät**) wieder her.
- **macOS**: installiere [BlackHole](https://existential.audio/blackhole) oder [VB-Audio Cable](https://vb-audio.com/Cable).
- **Linux**: installiere PortAudio (`sudo apt-get update && sudo apt-get install -y portaudio19-dev` unter Debian/Ubuntu, `sudo yum install -y portaudio` unter Fedora/RHEL oder `sudo pacman -Syu portaudio` unter Arch).

Siehe die [Anleitung für virtuelle Audiokabel](../vonovox/live-audio.md) für vollständige Discord- und OBS-Schritte.

## 3. Option A: Google Colab

> **Wichtiger Hinweis zu den Nutzungsbedingungen:** Web-UIs im **kostenlosen Google-Colab-Tarif** verstoßen gegen Googles [Richtlinie zu unzulässigen Aktivitäten](https://research.google.com/colaboratory/faq.html#disallowed-activities) und können zu Einschränkungen oder Sperren führen. Nutze einen **bezahlten Colab-Tarif**.

1. Öffne das [Deiteris-Colab-Notebook](https://colab.research.google.com/github/deiteris/voice-changer/blob/master-custom/Colab_RealtimeVoiceChanger.ipynb).
2. Führe die **erste Zelle** von oben aus und warte auf `Done! Proceed with the next steps`.
3. Führe die **zweite Zelle** aus.
4. Scrolle zur **letzten Zelle** und füge deinen [Ngrok-Authtoken](https://dashboard.ngrok.com/get-started/your-authtoken) in `TOKEN_HERE` ein.
5. *(Optional)* Wähle unter dem Token-Feld die nächstgelegene **Region** für geringere Latenz.
6. Starte die Zelle und klicke auf die erzeugte **Ngrok-URL**, um die Web-UI zu öffnen.

## 4. Option B: Kaggle (kostenlose T4 x2)

### Kontoverifizierung (einmalig)

1. Erstelle ein [Kaggle-Konto](https://www.kaggle.com/account/login?phase=startRegisterTab&returnUrl=%2F).
2. Verifiziere deine **Telefonnummer**, damit du **Internet** in Notebooks aktivieren kannst.

### Notebook einrichten und starten

1. Öffne das [Deiteris-Kaggle-Notebook](https://www.kaggle.com/code/suneku/voice-changer-public) und klicke auf **Copy and Edit**.
2. In der rechten Seitenleiste:
   - Schalte **Internet** auf **ON**.
   - Setze Persistence auf **Files and variables**.
   - Wähle unter Accelerator **GPU T4 x2**.
3. *(Optional)* Lasse **Save version** nicht unnötig aktiv, da dein GPU-Kontingent im Leerlauf weiter sinkt.
4. Führe die **erste Installationszelle** aus, bis `Done! Proceed with the next steps` erscheint, und starte dann die **dritte Zelle**.
5. Füge deinen [Ngrok-Authtoken](https://dashboard.ngrok.com/get-started/your-authtoken) in die **letzte Zelle** ein, starte sie und öffne die erzeugte öffentliche URL.

## 5. Option C: Lightning.AI (Persistentes Studio)

1. Erstelle ein [Lightning.AI-Konto](https://lightning.ai) und verifiziere deine **Telefonnummer** (Freischaltung dauert **2-3 Werktage**).
2. Klone das [Wokada-Deiteris-Fork Studio](https://lightning.ai/nick088/studios/wokada-deiteris-fork).
3. Wechsle über **Studio Environment → Switch To GPU** zu einer GPU.
4. Führe die **erste Zelle** zur Installation und die **zweite Zelle** zur Server-Konfiguration aus.
5. Wähle in der **dritten Zelle** deinen Tunnel (**Port Viewer** empfohlen) und starte sie.
6. Lade über **Teamspace Drive** rechts deine Modelle hoch und klicke rechts auf das **Jupyter**-Symbol, um zum Code zurückzukehren.

## 6. Stimmmodelle und Audio einrichten

Sobald die Web-UI im Browser lädt, folge [Deiteris w-okada Fork einrichten und abstimmen](live-audio.md) für Client-Modus, Modelle und Puffer.

## 7. Cloud-Fehlerbehebung und Werkzeuge

### Debug-Modus aktivieren

Wenn der Cloud-Server nicht startet oder sofort abbricht, hänge `--log-level debug` an den Startbefehl der letzten Zelle an:

- **Google Colab**: `!./ML_Program --log-level debug`
- **Kaggle & Lightning.AI**: `!./VoiceChanger --log-level debug`

Kopiere bei Support-Anfragen die vollständige Konsolenausgabe (vermeide `warning`, `error` oder `critical`, da sie Startdetails herausfiltern).

### `.safetensors` zurück in `.pth` konvertieren

W-Okada speichert importierte Modelle in `model_dir` als `.safetensors`. Nutze lokal den [Safetensors-Konverter](../../ilaria-rvc/manage/safetensors-converter.md) in Ilaria RVC oder ein `torch` + `safetensors`-Skript im Notebook (`!pip install torch safetensors`).
