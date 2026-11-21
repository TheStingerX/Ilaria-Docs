---
label: "Cloud (Colab, Kaggle, Lightning.AI)"
icon: ":cloud:"
order: 91
permalink: /ilaria-rvc/applio/cloud/
description: "Run Applio and its Realtime tab in the cloud using Google Colab, Kaggle, or Lightning.AI when your PC lacks a supported GPU."
---
# Applio Realtime on Cloud

When your computer does not have a supported local GPU, you can run the **Applio Web UI** (including its **Realtime** tab in supported cloud builds) on **Google Colab**, **Kaggle**, or **Lightning.AI** and open it via a public tunnel URL.

> **Before going live:** Always test your voice model with [one recorded clip](inference.md) first so you know the model and pitch settings work before adding cloud network latency and virtual cable routing.

> **Official Applio Discord:** Official Applio support moved from the old IA Hispano server to their permanent Discord (`https://discord.gg/wY7gmqTyEV`).

## 1. Choose a cloud provider

| Platform | GPU & Quota | Storage | Tunnels available |
| --- | --- | --- | --- |
| **Google Colab** | Paid tier required for Web UIs | Google Drive sync | Gradio, Ngrok, LocalTunnel |
| **Kaggle** | Free weekly GPU quota (**T4 x2**) | Session + optional persistence | Ngrok, Gradio + LocalTunnel, LocalTunnel, Horizon |
| **Lightning.AI** | Free monthly credits (75h T4 16GB / 31h L4 24GB / 15h L40 48GB) | Persistent (**Teamspace Drive**) | Gradio, Port Viewer (`6969`), Ngrok, Cloudflare, LocalTunnel, Horizon |

## 2. Option A: Google Colab Web UI

> **Important Terms of Service warning:** Running Web UIs on the **Google Colab Free Tier** violates Google's [Disallowed Activities policy](https://research.google.com/colaboratory/faq.html#disallowed-activities) and risks GPU limits or account bans. Use **Colab Paid Tier** for Web UI notebooks.

1. Open the [Applio Colab notebook](https://colab.research.google.com/github/iahispano/applio/blob/master/assets/Applio.ipynb) and sign in to your Google account.
2. Run the **Install Applio** cells (~2 minutes) and grant Google Drive permission if you want your models saved across sessions.
3. Run the **Google Drive sync** cell if needed.
4. In the **Run Server** cell, pick a tunnel `method`:
   - **Gradio (Default)**: no account needed; prints a `.gradio.live` link.
   - **Ngrok**: paste your [Ngrok authtoken](https://dashboard.ngrok.com/get-started/your-authtoken) into `ngrok_token`, optionally pick the closest `Region` for lower latency, and open the `ngrok.io` URL (free Ngrok tier has a 1 GB monthly bandwidth cap).
   - **LocalTunnel**: no account needed; prints a `loca.lt` URL plus a **Local Tunnel Password** to paste when opening the page.

## 3. Option B: Kaggle (Free T4 x2)

1. Create a [Kaggle account](https://www.kaggle.com/account/login?phase=startRegisterTab&returnUrl=%2F) and verify your **phone number** (required for **Internet** access).
2. Click **Create → New Notebook**, then **File → Import Notebook → Link**, paste `https://github.com/IAHispano/Applio/blob/main/assets/Applio_Kaggle.ipynb`, and click **Import**.
3. In the right sidebar:
   - Turn **Internet** **ON**.
   - Set Persistence to **Files and variables**.
   - Under Accelerator, select **GPU T4 x2**.
4. Run the installation cells.
5. In the tunnel cell, choose a `Tunnel`:
   - **Ngrok** (paste `ngrok_authtoken`)
   - **Gradio + LocalTunnel** (Gradio for Applio, LocalTunnel for TensorBoard)
   - **LocalTunnel** (copy the printed `LocalTunnels Password`)
   - **Horizon** (paste your `horizon_id` from [hrzn.run/dashboard](https://hrzn.run/dashboard/))
6. Click the printed Applio URL once the server starts.

## 4. Option C: Lightning.AI (Persistent Studio)

1. Create a [Lightning.AI account](https://lightning.ai) and verify your **phone number** (approval takes **2-3 business days**).
2. Clone the [Applio Notebook Studio](https://lightning.ai/nick088/studios/applio-ui?view=public&section=featured).
3. Click **Studio Environment → Switch To GPU** on the right sidebar and wait for the GPU instance to restart.
4. *(Optional)* In the first code cell, adjust `branch` (`"latest-stable"` by default, `"main"` for latest updates, or a specific version tag), then run the cell until it prints `Installed Applio`.
5. Scroll to **Run UI**, choose a `Tunnel` (**Gradio**, **Port Viewer** on port `6969`, **Ngrok**, **Cloudflare** `.trycloudflare.com`, **LocalTunnel**, or **Horizon**), and run the cell.
   - For **Port Viewer**, click `+ → Web Apps → Port Viewer` in the right sidebar, add port `6969`, and double-click it to open the UI.
6. Use **Teamspace Drive** (`Studio > this_studio > Applio`) to upload/download models directly, or run the final **"Delete everything"** cell if you ever need a clean reinstall.

## 5. Set up virtual cable and Realtime tab

Once the Applio Web UI is open in your browser, install a virtual audio cable (**VAC Lite** or **VB-CABLE** on Windows, **BlackHole** on macOS) and follow [Use Applio with a microphone](realtime.md) and the [virtual cable walkthrough](../vonovox/live-audio.md) to route audio into Discord, OBS, or your game.
