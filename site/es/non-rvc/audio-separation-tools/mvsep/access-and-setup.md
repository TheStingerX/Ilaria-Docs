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
- Los modelos estándar cuestan **1 crédito por minuto** de audio; los ensembles pesados usan multiplicadores (`2×`–`6×`).
- **Acceso API**: los usuarios registrados pueden generar un token API en su cuenta para automatizar lotes en Python mediante `https://mvsep.com/api`.

## Precios de los paquetes

MVSEP ofrece hasta 50 separaciones gratuitas al día sin tarjeta. Premium usa créditos prepagados.

| Precio (USD) | Créditos | Canciones estimadas (4 min) | USD por minuto |
| ---: | ---: | ---: | ---: |
| 3 | 60 | ≈ 15 | 0,05 |
| 5 | 200 | ≈ 50 | 0,025 |
| 10 | 600 | ≈ 150 | 0,0167 |
| 30 | 2.000 | ≈ 500 | 0,015 |
| 50 | 4.000 | ≈ 1.000 | 0,0125 |
| 100 | 8.500 | ≈ 2.125 | 0,0118 |
| 200 | 18.000 | ≈ 4.500 | 0,0111 |
| 500 | 50.000 | ≈ 12.500 | 0,01 |
| 1.000 | 110.000 | ≈ 27.500 | 0,0091 |

Las estimaciones suponen una separación por canción con un modelo estándar de 1 crédito por minuto. Una canción de 4 minutos cuesta 4 créditos. Un modelo Ensemble de 2× consume 8 créditos para la misma pista y un paquete de 60 cubre unas 7 canciones completas en vez de 15. Las opciones extra y las pasadas adicionales pueden aumentar el consumo.

[Planes de MVSEP](https://sg.mvsep.com/en/plans) · [Cómo se calculan los créditos](https://mvsep.com/en/credits)
