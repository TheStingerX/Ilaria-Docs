---
label: "Acceso, cuenta y API"
icon: ":globe_with_meridians:"
order: 98
permalink: /non-rvc/mvsep/access-and-setup/
---
# Usar MVSep: acceso, cuenta y configuración

Al ejecutarse en la nube, MVSep **no requiere ninguna instalación**. Aun así, configurar bien tu cuenta y el formato de salida marca una gran diferencia en calidad.

## 1. Crea una cuenta gratuita (Recomendado)

1. Entra en [mvsep.com](https://mvsep.com/) y crea una cuenta gratuita.
2. **¿Por qué registrarse?**
   - **Audio sin pérdida**: los usuarios sin cuenta solo obtienen **MP3** comprimido. Con cuenta gratuita desbloqueas **WAV 16-bit** y **FLAC 16-bit**.
   - **Sin CAPTCHA** y **mayor prioridad en la cola**.
   - **Modelos Polar y BS-Roformer de 124 bandas** disponibles también gratis (las variantes BS permiten hasta 5 separaciones al día por modelo).

## 2. Ajustes útiles en MVSep

- **Formato de salida**: elige siempre **WAV** (o **FLAC**) antes de iniciar la separación si vas a entrenar RVC o encadenar varios pasos de limpieza.
- **Post-procesamiento / encadenado**: inicia sesión, ve a **Advanced settings → Home Screen** y activa **"Show post-processing algorithm"** para aplicar un modelo de limpieza justo después de separar.
- **¿Subida o descarga lenta?** MVSep ofrece espejos (mirrors) regionales; si el sitio principal va lento transfiriendo archivos, prueba el mirror.

## 3. Créditos prepagados y API completa (Opcional)

Si procesas archivos largos (hasta 100 minutos / 1 GB), necesitas **WAV 32-bit float / FLAC 24-bit** o quieres evitar esperas en horas pico:
- Los **paquetes de créditos** nunca caducan (desde \$3 por 60 créditos, \$5 por 200, \$10 por 600).
- Los modelos estándar cuestan **1 crédito por minuto** de audio; los ensembles pesados usan multiplicadores (`2×`–`6×`).
- **Acceso API**: los usuarios registrados pueden generar un token API en su cuenta para automatizar lotes en Python mediante `https://mvsep.com/api`.
