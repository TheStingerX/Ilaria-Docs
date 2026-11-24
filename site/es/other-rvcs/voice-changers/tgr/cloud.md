# Okada TG Developed Fork en la nube

Si tu ordenador no tiene una GPU NVIDIA, AMD o Intel compatible, puedes ejecutar **Okada TG Developed Fork** en una GPU en la nube mediante **Google Colab**, **Kaggle** o **Lightning.AI** y controlarlo desde el navegador.

> **Por qué aparece "Server audio not available":** Las máquinas virtuales en la nube no tienen tarjeta de sonido física. Es completamente normal. Usa siempre el modo **Client** para que el navegador capture tu micrófono local y reproduzca la voz convertida por tus auriculares o cable virtual.

> **Latencia esperada:** La conversión en la nube añade el tiempo de ida y vuelta de red a la inferencia en GPU. Elige la región de **Ngrok** más cercana (o **Port Viewer** en Lightning.AI) y usa conexión por cable o Wi-Fi de 5 GHz para reducir el retardo.

## 1. Elige un proveedor en la nube

| Plataforma | GPU y cuota | Almacenamiento | Túneles disponibles |
| --- | --- | --- | --- |
| **Google Colab** | Plan de pago requerido para Web UIs | Temporal (por sesión) | Ngrok |
| **Kaggle** | Cuota semanal gratuita de GPU (**T4 x2**) | Sesión + persistencia opcional | Ngrok |
| **Lightning.AI** | Por créditos (`1 crédito = $1 USD` por segundo; Studio 4-CPU gratis + créditos iniciales; ver [Precios](https://lightning.ai/pricing)) | Persistente (**Teamspace Drive**, 10 GB gratis) | Port Viewer (recomendado), selector de túnel |

## 2. Configura un cable de audio virtual (para Discord, OBS o juegos)

Instala un cable de audio virtual para enviar la salida del navegador a Discord, OBS o tu juego:

- **Windows**: descarga [VAC Lite](https://software.muzychenko.net/freeware/vac470lite.zip) (o **VB-CABLE**). Ejecuta `setup64` en PCs Intel/AMD o `setup64a` en portátiles Windows ARM (p. ej. Snapdragon). Si Windows cambia tus dispositivos de sonido predeterminados, pulsa `Win + R`, ejecuta `mmsys.cpl` y restablece tus dispositivos de **Reproducción** y **Grabación** (incluido **Dispositivo de comunicación predeterminado**).
- **macOS**: instala [BlackHole](https://existential.audio/blackhole) o [VB-Audio Cable](https://vb-audio.com/Cable).
- **Linux**: instala PortAudio (`sudo apt-get update && sudo apt-get install -y portaudio19-dev` en Debian/Ubuntu, `sudo yum install -y portaudio` en Fedora/RHEL o `sudo pacman -Syu portaudio` en Arch).

Consulta la [guía del cable virtual](../vonovox/live-audio.md) para ver los pasos completos en Discord y OBS.

## 3. Opción A: Google Colab

> **Aviso de Términos de Servicio:** Ejecutar Web UIs en el **plan gratuito de Google Colab** infringe la [política de actividades no permitidas](https://research.google.com/colaboratory/faq.html#disallowed-activities) de Google y puede provocar bloqueos o restricciones de GPU. Usa un **plan de pago de Colab** para Web UIs.

1. Abre el [notebook de Colab de Tg-Develop](https://colab.research.google.com/github/tg-develop/voice-changer/blob/master-custom/Colab_RealtimeVoiceChanger.ipynb).
2. Ejecuta la **primera celda** desde arriba hasta que muestre `Done! Proceed with the next steps`.
3. Ejecuta la **segunda celda**.
4. Baja hasta la **última celda** y pega tu [authtoken de Ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) en `TOKEN_HERE`.
5. *(Opcional)* Selecciona la **región** más cercana bajo el campo del token para bajar la latencia.
6. Ejecuta la celda y abre el **enlace de Ngrok** generado al terminar las descargas.

## 4. Opción B: Kaggle (T4 x2 gratis)

### Verificación de cuenta (una vez)

1. Crea una [cuenta en Kaggle](https://www.kaggle.com/account/login?phase=startRegisterTab&returnUrl=%2F).
2. Verifica tu **número de teléfono** en los ajustes para poder activar la opción **Internet** en los notebooks.

### Configuración y ejecución

1. Ve a [Kaggle](https://www.kaggle.com) y pulsa **Create → New Notebook**.
2. Pulsa **File → Import Notebook**, abre la pestaña **Link**, pega `https://github.com/tg-develop/voice-changer/blob/master-custom/Kaggle_RealtimeVoiceChanger.ipynb` y pulsa **Import**.
3. En la barra lateral derecha:
   - Activa **Internet** (**ON**).
   - Pon Persistence en **Files and variables**.
   - En Accelerator, elige **GPU T4 x2**.
4. *(Opcional)* Activa **Save version** solo si necesitas persistencia en segundo plano, ya que sigue consumiendo cuota de GPU en reposo.
5. Ejecuta la **primera celda de instalación** hasta ver `Done! Proceed with the next steps` y luego ejecuta la **tercera celda**.
6. Pega tu [authtoken de Ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) en la **última celda**, ejecútala y abre la URL pública generada.

## 5. Opción C: Lightning.AI (Studio persistente)

1. Crea una [cuenta de Lightning.AI](https://lightning.ai) y verifica tu **teléfono** (puede tardar **2-3 días laborables**).
2. Clona el [Studio Wokada-TgDevelop-Fork](https://lightning.ai/nick088/studios/wokada-tg-develop-fork).
3. Cambia a un entorno GPU en **Studio Environment → Switch To GPU**.
4. Ejecuta la **primera celda** para instalar dependencias y la **segunda celda** para configurar el servidor.
5. En la **tercera celda**, elige el túnel (**Port Viewer** es recomendable) y ejecútala.
6. Usa **Teamspace Drive** en la barra lateral derecha para subir modelos `.pth` e `.index`.
7. **Reiniciar / limpiar**: si necesitas reinstalar de cero, ejecuta la última celda **"Delete everything"**.

## 6. Configura modelos y audio

Cuando se abra la Web UI en el navegador, la carga de modelos y el modo **Client** funcionan igual que en local. Continúa con [Modelo, micrófono y cable](live-audio.md).

## 7. Solución de problemas y utilidades

### Activar registros en modo Debug

Si el servidor en la nube falla al iniciar, añade `--log-level debug` al comando de lanzamiento en la última celda y vuelve a ejecutarla:

- **Google Colab**: `!./ML_Program --log-level debug`
- **Kaggle y Lightning.AI**: `!./VoiceChanger --log-level debug`

Copia la salida completa al pedir ayuda (evita `warning`, `error` o `critical`, ya que ocultan el contexto del arranque).

### Convertir `.safetensors` a `.pth`

W-Okada guarda los modelos importados en `model_dir` como `.safetensors`. Para recuperar el `.pth`, usa el [Conversor de Safetensors](../../../ilaria-rvc/manage/safetensors-converter.md) de Ilaria RVC o ejecuta un script con `torch` y `safetensors` (`!pip install torch safetensors`).
