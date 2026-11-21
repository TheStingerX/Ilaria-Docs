---
label: "Cloud (Colab, Kaggle, Lightning.AI)"
icon: ":cloud:"
order: 98
permalink: /ilaria-rvc/deiteris/cloud/
description: "Ejecuta Deiteris w-okada Fork en la nube con Google Colab, Kaggle o Lightning.AI cuando tu PC no tenga una GPU local compatible."
---
# Deiteris w-okada Fork en la nube

Si tu ordenador no tiene una GPU local compatible, puedes ejecutar **Deiteris w-okada Fork** en una GPU en la nube con **Google Colab**, **Kaggle** o **Lightning.AI** y controlarlo desde tu navegador.

> **Por qué aparece "Server audio not available":** Las instancias en la nube no tienen tarjeta de sonido física. Es esperado. Usa siempre el modo **Client** para que el navegador capture tu micrófono y reproduzca la voz convertida localmente.

> **Latencia esperada:** Los túneles en la nube añaden retardo de red sobre la inferencia en GPU. Elige la región de **Ngrok** más cercana (o **Port Viewer** en Lightning.AI) y usa conexión por cable o Wi-Fi de 5 GHz cuando sea posible.

## 1. Elige un proveedor en la nube

| Plataforma | GPU y cuota | Almacenamiento | Ideal para |
| --- | --- | --- | --- |
| **Google Colab** | Plan de pago requerido para Web UIs | Temporal (por sesión) | Configuración rápida para usuarios de Colab Pro / Pay-As-You-Go |
| **Kaggle** | Cuota semanal gratuita de GPU (**T4 x2**) | Sesión + persistencia opcional | Mejor opción gratuita tras verificación telefónica |
| **Lightning.AI** | Créditos mensuales gratuitos (T4 / L4 / L40) | Persistente (**Teamspace Drive**) | Conservar modelos y ajustes entre sesiones |

## 2. Configura un cable de audio virtual (Discord, OBS o juegos)

Instala un cable de audio virtual para enviar la salida del navegador a Discord, OBS o un juego:

- **Windows**: descarga [VAC Lite](https://software.muzychenko.net/freeware/vac470lite.zip) (o **VB-CABLE**). Usa `setup64` en PCs Intel/AMD o `setup64a` en portátiles Windows ARM (p. ej. Snapdragon). Si Windows cambia tus dispositivos predeterminados, pulsa `Win + R`, ejecuta `mmsys.cpl` y restaura tus dispositivos de **Reproducción** y **Grabación** (incluido **Dispositivo de comunicación predeterminado**).
- **macOS**: instala [BlackHole](https://existential.audio/blackhole) o [VB-Audio Cable](https://vb-audio.com/Cable).
- **Linux**: instala PortAudio (`sudo apt-get update && sudo apt-get install -y portaudio19-dev` en Debian/Ubuntu, `sudo yum install -y portaudio` en Fedora/RHEL o `sudo pacman -Syu portaudio` en Arch).

Consulta la [guía del cable virtual](../vonovox/live-audio.md) para ver los pasos completos en Discord y OBS.

## 3. Opción A: Google Colab

> **Aviso de Términos de Servicio:** Ejecutar Web UIs en el **plan gratuito de Google Colab** infringe la [política de actividades no permitidas](https://research.google.com/colaboratory/faq.html#disallowed-activities) de Google y puede restringir o suspender tu acceso. Usa un **plan de pago de Colab**.

1. Abre el [notebook de Colab de Deiteris](https://colab.research.google.com/github/deiteris/voice-changer/blob/master-custom/Colab_RealtimeVoiceChanger.ipynb).
2. Ejecuta la **primera celda** desde arriba y espera a ver `Done! Proceed with the next steps`.
3. Ejecuta la **segunda celda**.
4. Baja hasta la **última celda** y pega tu [authtoken de Ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) en `TOKEN_HERE`.
5. *(Opcional)* Elige la **región** más cercana bajo el campo del token para reducir la latencia.
6. Ejecuta la celda y haz clic en la **URL de Ngrok** generada para abrir la Web UI.

## 4. Opción B: Kaggle (T4 x2 gratis)

### Verificación de cuenta (una vez)

1. Crea una [cuenta en Kaggle](https://www.kaggle.com/account/login?phase=startRegisterTab&returnUrl=%2F).
2. Verifica tu **número de teléfono** para poder activar el interruptor **Internet** en los notebooks.

### Configuración y ejecución

1. Abre el [notebook de Kaggle de Deiteris](https://www.kaggle.com/code/suneku/voice-changer-public) y pulsa **Copy and Edit**.
2. En la barra lateral derecha:
   - Activa **Internet** (**ON**).
   - Pon Persistence en **Files and variables**.
   - En Accelerator, selecciona **GPU T4 x2**.
3. *(Opcional)* Evita dejar **Save version** activado si no lo necesitas, ya que sigue consumiendo cuota de GPU en reposo.
4. Ejecuta la **primera celda de instalación** hasta ver `Done! Proceed with the next steps` y luego ejecuta la **tercera celda**.
5. Pega tu [authtoken de Ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) en la **última celda**, ejecútala y abre la URL pública generada.

## 5. Opción C: Lightning.AI (Studio persistente)

1. Crea una [cuenta de Lightning.AI](https://lightning.ai) y verifica tu **teléfono** (la aprobación tarda **2-3 días laborables**).
2. Clona el [Studio Wokada-Deiteris-Fork](https://lightning.ai/nick088/studios/wokada-deiteris-fork).
3. Cambia a GPU mediante **Studio Environment → Switch To GPU**.
4. Ejecuta la **primera celda** para instalar dependencias y la **segunda celda** para configurar el servidor.
5. En la **tercera celda**, elige el túnel (**Port Viewer** recomendado) y ejecútala.
6. Usa **Teamspace Drive** a la derecha para subir modelos y haz clic en el icono **Jupyter** a la derecha cuando quieras volver al código.

## 6. Configura modelos y audio

Cuando cargue la Web UI en el navegador, sigue [Configura y ajusta Deiteris w-okada Fork](live-audio.md) para configurar el modo Client, los modelos y el búfer.

## 7. Solución de problemas y utilidades

### Activar registros en modo Debug

Si el servidor en la nube falla al iniciar o se desconecta al instante, añade `--log-level debug` al comando de la última celda y vuelve a ejecutarla:

- **Google Colab**: `!./ML_Program --log-level debug`
- **Kaggle y Lightning.AI**: `!./VoiceChanger --log-level debug`

Copia la salida completa cuando pidas ayuda (evita `warning`, `error` o `critical`, ya que ocultan detalles del arranque).

### Convertir `.safetensors` a `.pth`

W-Okada guarda los modelos importados en `model_dir` como `.safetensors`. Para convertirlos de nuevo a `.pth` en local usa el [Conversor de Safetensors](../../ilaria-rvc/manage/safetensors-converter.md) de Ilaria RVC, o ejecuta un script con `torch` y `safetensors` (`!pip install torch safetensors`).
