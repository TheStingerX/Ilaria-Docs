---
label: "Cloud (Colab, Kaggle, Lightning.AI)"
icon: ":cloud:"
order: 91
permalink: /ilaria-rvc/applio/cloud/
description: "Führe Applio und den Realtime-Tab in der Cloud über Google Colab, Kaggle oder Lightning.AI aus, wenn dein PC keine unterstützte GPU hat."
---
# Applio Realtime in der Cloud

Wenn dein Computer keine unterstützte lokale GPU hat, kannst du die **Applio Web-UI** (einschließlich des **Realtime**-Tabs in unterstützten Cloud-Builds) auf **Google Colab**, **Kaggle** oder **Lightning.AI** ausführen und per öffentlichem Tunnel-Link öffnen.

> **Vor dem Live-Einsatz:** Teste dein Stimmmodell immer zuerst mit [einem kurzen Clip](inference.md), damit Modell und Pitch stimmen, bevor Netzwerklatenz und virtuelles Kabel hinzukommen.

> **Offizieller Applio-Discord:** Der offizielle Support ist auf den permanenten Discord-Server (`https://discord.gg/wY7gmqTyEV`) umgezogen.

## 1. Cloud-Anbieter auswählen

| Plattform | GPU & Kontingent | Speicher | Verfügbare Tunnel |
| --- | --- | --- | --- |
| **Google Colab** | Bezahlter Tarif für Web-UIs nötig | Google-Drive-Sync | Gradio, Ngrok, LocalTunnel |
| **Kaggle** | Kostenloses Wochenkontingent (**T4 x2**) | Sitzung + optionale Persistenz | Ngrok, Gradio + LocalTunnel, LocalTunnel, Horizon |
| **Lightning.AI** | Kostenlose Monats-Credits (75h T4 16GB / 31h L4 24GB / 15h L40 48GB) | Persistent (**Teamspace Drive**) | Gradio, Port Viewer (`6969`), Ngrok, Cloudflare, LocalTunnel, Horizon |

## 2. Option A: Google Colab Web-UI

> **Wichtiger Hinweis zu den Nutzungsbedingungen:** Web-UIs im **kostenlosen Google-Colab-Tarif** verstoßen gegen Googles [Richtlinie zu unzulässigen Aktivitäten](https://research.google.com/colaboratory/faq.html#disallowed-activities) und riskieren GPU-Limits oder Kontosperren. Nutze einen **bezahlten Colab-Tarif**.

1. Öffne das [Applio-Colab-Notebook](https://colab.research.google.com/github/iahispano/applio/blob/master/assets/Applio.ipynb) und melde dich mit deinem Google-Konto an.
2. Führe die Zellen **Install Applio** (~2 Minuten) aus und erlaube Google Drive, falls du Modelle speichern möchtest.
3. Führe bei Bedarf die **Google Drive Sync**-Zelle aus.
4. Wähle in **Run Server** eine `method`:
   - **Gradio (Standard)**: kein Konto nötig; gibt einen `.gradio.live`-Link aus.
   - **Ngrok**: füge deinen [Ngrok-Authtoken](https://dashboard.ngrok.com/get-started/your-authtoken) in `ngrok_token` ein, wähle optional die nächste `Region` und öffne die `ngrok.io`-URL (1 GB/Monat im Gratis-Tarif).
   - **LocalTunnel**: kein Konto nötig; gibt eine `loca.lt`-URL samt **Local Tunnel Password** aus.

## 3. Option B: Kaggle (kostenlose T4 x2)

1. Erstelle ein [Kaggle-Konto](https://www.kaggle.com/account/login?phase=startRegisterTab&returnUrl=%2F) und verifiziere deine **Telefonnummer** (erforderlich für **Internet**).
2. Klicke auf **Create → New Notebook**, dann **File → Import Notebook → Link**, füge `https://github.com/IAHispano/Applio/blob/main/assets/Applio_Kaggle.ipynb` ein und klicke auf **Import**.
3. In der rechten Seitenleiste:
   - Schalte **Internet** auf **ON**.
   - Setze Persistence auf **Files and variables**.
   - Wähle unter Accelerator **GPU T4 x2**.
4. Führe die Installationszellen aus.
5. Wähle in der Tunnel-Zelle einen `Tunnel`:
   - **Ngrok** (`ngrok_authtoken` einfügen)
   - **Gradio + LocalTunnel** (Gradio für Applio, LocalTunnel für TensorBoard)
   - **LocalTunnel** (`LocalTunnels Password` aus der Ausgabe kopieren)
   - **Horizon** (`horizon_id` von [hrzn.run/dashboard](https://hrzn.run/dashboard/) einfügen)
6. Öffne die gedruckte Applio-URL, sobald der Server startet.

## 4. Option C: Lightning.AI (Persistentes Studio)

1. Erstelle ein [Lightning.AI-Konto](https://lightning.ai) und verifiziere deine **Telefonnummer** (**2-3 Werktage**).
2. Klone das [Applio Notebook Studio](https://lightning.ai/nick088/studios/applio-ui?view=public&section=featured).
3. Klicke rechts auf **Studio Environment → Switch To GPU** und warte auf den Neustart.
4. *(Optional)* Passe in der ersten Zelle `branch` an (`"latest-stable"` Standard, `"main"` oder ein Versions-Tag) und führe sie bis `Installed Applio` aus.
5. Wähle unter **Run UI** einen `Tunnel` (**Gradio**, **Port Viewer** auf Port `6969`, **Ngrok**, **Cloudflare** `.trycloudflare.com`, **LocalTunnel** oder **Horizon**) und starte die Zelle.
   - Für **Port Viewer**: rechts `+ → Web Apps → Port Viewer`, Port `6969` hinzufügen und doppelt anklicken.
6. Nutze **Teamspace Drive** (`Studio > this_studio > Applio`) für Uploads/Downloads oder die letzte Zelle **"Delete everything"** für eine saubere Neuinstallation.

## 5. Virtuelles Kabel und Realtime-Tab einrichten

Sobald die Applio Web-UI im Browser geöffnet ist, installiere ein virtuelles Audiokabel (**VAC Lite** oder **VB-CABLE** unter Windows, **BlackHole** unter macOS) und folge [Applio mit Mikrofon verwenden](realtime.md) sowie der [Anleitung für virtuelle Audiokabel](../vonovox/live-audio.md).
