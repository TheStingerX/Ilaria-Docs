---
label: "Cloud (Colab, Kaggle, Lightning.AI)"
icon: ":cloud:"
order: 91
permalink: /ilaria-rvc/applio/cloud/
description: "Ejecuta Applio y su pestaña Realtime en la nube con Google Colab, Kaggle o Lightning.AI cuando tu PC no tenga una GPU compatible."
---
# Applio Realtime en la nube

Cuando tu ordenador no tiene una GPU local compatible, puedes ejecutar la **Web UI de Applio** (incluida su pestaña **Realtime** en las versiones en la nube compatibles) en **Google Colab**, **Kaggle** o **Lightning.AI** y abrirla mediante una URL pública.

> **Antes de ir en directo:** Prueba siempre tu modelo de voz con [un clip grabado](inference.md) para comprobar que la voz y el tono funcionan antes de añadir la latencia de red y el cable de audio virtual.

> **Discord oficial de Applio:** El soporte oficial de Applio pasó del antiguo servidor IA Hispano a su Discord permanente (`https://discord.gg/wY7gmqTyEV`).

## 1. Elige un proveedor en la nube

| Plataforma | GPU y cuota | Almacenamiento | Túneles disponibles |
| --- | --- | --- | --- |
| **Google Colab** | Plan de pago requerido para Web UIs | Sincronización con Google Drive | Gradio, Ngrok, LocalTunnel |
| **Kaggle** | Cuota semanal gratuita de GPU (**T4 x2**) | Sesión + persistencia opcional | Ngrok, Gradio + LocalTunnel, LocalTunnel, Horizon |
| **Lightning.AI** | Por créditos (`1 crédito = $1 USD` por segundo; Studio 4-CPU gratis + créditos iniciales; ver [Precios](https://lightning.ai/pricing)) | Persistente (**Teamspace Drive**, 10 GB gratis) | Gradio, Port Viewer (`6969`), Ngrok, Cloudflare, LocalTunnel, Horizon |

## 2. Opción A: Google Colab Web UI

> **Aviso de Términos de Servicio:** Ejecutar Web UIs en el **plan gratuito de Google Colab** infringe la [política de actividades no permitidas](https://research.google.com/colaboratory/faq.html#disallowed-activities) de Google y arriesga límites de GPU o bloqueos de cuenta. Usa un **plan de pago de Colab**.

1. Abre el [notebook Colab de Applio](https://colab.research.google.com/github/iahispano/applio/blob/master/assets/Applio.ipynb) e inicia sesión con tu cuenta de Google.
2. Ejecuta las celdas **Install Applio** (~2 minutos) y concede permiso a Google Drive si quieres guardar modelos entre sesiones.
3. Ejecuta la celda de sincronización de **Google Drive** si lo necesitas.
4. En la celda **Run Server**, elige un `method` de túnel:
   - **Gradio (Predeterminado)**: no requiere cuenta; muestra un enlace `.gradio.live`.
   - **Ngrok**: pega tu [authtoken de Ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) en `ngrok_token`, elige opcionalmente la `Region` más cercana para menor latencia y abre la URL `ngrok.io` (el plan gratuito de Ngrok tiene límite de 1 GB mensual).
   - **LocalTunnel**: no requiere cuenta; muestra una URL `loca.lt` y una **Local Tunnel Password** para pegarla al abrir la página.

## 3. Opción B: Kaggle (T4 x2 gratis)

1. Crea una [cuenta en Kaggle](https://www.kaggle.com/account/login?phase=startRegisterTab&returnUrl=%2F) y verifica tu **número de teléfono** (necesario para activar **Internet**).
2. Pulsa **Create → New Notebook**, luego **File → Import Notebook → Link**, pega `https://github.com/IAHispano/Applio/blob/main/assets/Applio_Kaggle.ipynb` y pulsa **Import**.
3. En la barra lateral derecha:
   - Activa **Internet** (**ON**).
   - Pon Persistence en **Files and variables**.
   - En Accelerator, selecciona **GPU T4 x2**.
4. Ejecuta las celdas de instalación.
5. En la celda del túnel, elige un `Tunnel`:
   - **Ngrok** (pega `ngrok_authtoken`)
   - **Gradio + LocalTunnel** (Gradio para Applio, LocalTunnel para TensorBoard)
   - **LocalTunnel** (copia la `LocalTunnels Password` impresa)
   - **Horizon** (pega tu `horizon_id` desde [hrzn.run/dashboard](https://hrzn.run/dashboard/))
6. Haz clic en la URL de Applio cuando arranque el servidor.

## 4. Opción C: Lightning.AI (Studio persistente)

1. Crea una [cuenta de Lightning.AI](https://lightning.ai) y verifica tu **número de teléfono** (tarda **2-3 días laborables**).
2. Clona el [Studio Applio Notebook](https://lightning.ai/nick088/studios/applio-ui?view=public&section=featured).
3. Pulsa **Studio Environment → Switch To GPU** en la barra derecha y espera a que reinicie con GPU.
4. *(Opcional)* En la primera celda ajusta `branch` (`"latest-stable"` por defecto, `"main"` para últimos cambios o una etiqueta concreta) y ejecútala hasta ver `Installed Applio`.
5. Baja hasta **Run UI**, elige un `Tunnel` (**Gradio**, **Port Viewer** en el puerto `6969`, **Ngrok**, **Cloudflare** `.trycloudflare.com`, **LocalTunnel** u **Horizon**) y ejecuta la celda.
   - Con **Port Viewer**, pulsa `+ → Web Apps → Port Viewer` a la derecha, añade el puerto `6969` y haz doble clic para abrir la interfaz.
6. Usa **Teamspace Drive** (`Studio > this_studio > Applio`) para subir/bajar modelos directamente, o ejecuta la última celda **"Delete everything"** para empezar limpio.

## 5. Configura cable virtual y pestaña Realtime

Con la Web UI de Applio abierta en tu navegador, instala un cable de audio virtual (**VAC Lite** o **VB-CABLE** en Windows, **BlackHole** en macOS) y sigue [Usar Applio con micrófono](realtime.md) y la [guía del cable virtual](../vonovox/live-audio.md) para enviar el audio a Discord, OBS o tu juego.
