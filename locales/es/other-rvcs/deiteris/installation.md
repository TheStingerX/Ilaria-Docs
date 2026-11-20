---
label: "Instalar Deiteris Fork"
icon: ":package:"
order: 100
permalink: /ilaria-rvc/deiteris/installation/
---
# Instalar Deiteris w-okada Fork

[GitHub](https://github.com/Deiteris/voice-changer) · [Releases](https://github.com/Deiteris/voice-changer/releases)

**Deiteris w-okada Fork** es un conocido fork comunitario de `w-okada/voice-changer` (VCClient) centrado en menor latencia, audio más limpio, mejoras de estabilidad y backends actualizados para NVIDIA (CUDA), AMD/Intel (DirectML) y Apple Silicon.

## 1. Descarga la compilación adecuada

Abre la [página de Releases de Deiteris](https://github.com/Deiteris/voice-changer/releases) y despliega **Assets**:

| Hardware / SO | Paquete a descargar | Notas |
| --- | --- | --- |
| **Windows + GPU NVIDIA** | Archivo **CUDA** (a menudo dividido en `.zip.001`, `.zip.002`, etc.) | Recomendado para la latencia más baja en tarjetas GeForce GTX/RTX. |
| **Windows + GPU AMD / Intel** | Archivo **DML (DirectML)** | Usa aceleración DirectML (o CPU si no hay GPU compatible). |
| **macOS (Apple Silicon / Intel)** | Compilación **macOS** (CoreML / CPU) | Revisa las notas de la versión para Apple Silicon M1/M2/M3 vs. Intel. |

## 2. Extraer e iniciar (Windows)

1. Para archivos CUDA divididos (`.zip.001`, `.zip.002`, ...), descarga **todas las partes** en la misma carpeta y extrae empezando por **`.zip.001`** con **7-Zip** o **WinRAR**.
2. Extrae en una ruta simple con permisos de escritura en tu disco principal (ej. `C:\VoiceTools\Deiteris-VC`). Evita `Program Files`, `OneDrive` o rutas con caracteres especiales.
3. Abre la carpeta extraída y ejecuta el script de inicio (como `start_http.bat` o `MMVCServerSIO.exe`, según la release).
4. **Espera los pesos iniciales**: deja la consola abierta mientras el cliente descarga los pesos base necesarios en el primer arranque.
5. Abre la dirección web local impresa en la consola (habitualmente `http://localhost:7865` o `http://127.0.0.1:18888`, según la compilación).

## 3. Requisito previo: cable de audio virtual

Para enviar tu voz convertida a **Discord, OBS, VRChat o juegos**, instala un cable de audio virtual (como **VB-CABLE**) antes de configurar el audio en vivo:
1. Ejecuta el instalador del cable virtual como Administrador (`VBCABLE_Setup_x64.exe`).
2. **Reinicia Windows** para que el sistema reconozca los nuevos dispositivos virtuales.

Continúa en [Enrutar y ajustar Deiteris Fork](live-audio.md) para configurar dispositivos, chunk size y pitch.
