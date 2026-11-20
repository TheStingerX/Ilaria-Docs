---
label: "Descripción general y planes"
icon: ":book:"
order: 99
permalink: /non-rvc/mvsep/overview/
description: "MVSep (Music & Voice Separation) es una plataforma web gratuita en la nube para separación y restauración de audio con IA."
---
# MVSep

[Sitio oficial (mvsep.com)](https://mvsep.com/) · [Tabla de calidad](https://mvsep.com/quality_checker/multisong_leaderboard)

**MVSep** (Music & Voice Separation) es una plataforma web gratuita en la nube para separación y restauración de audio con IA. Como todos los modelos se ejecutan en los servidores remotos de MVSep, **no necesitas una GPU potente ni instalar nada localmente** - ideal si tu PC no soporta modelos Roformer pesados o si buscas algoritmos exclusivos como **BS Polarformer**, **MVSep DnR v3** y ensembles multimodelo.

## Qué puede hacer MVSep

- **Separación de voz e instrumental**: arquitecturas de última generación como **BS Polarformer**, BS-Roformer y Mel-Roformer.
- **Separación de voz hablada, música y SFX**: modelos cinematográficos multipista como **MVSep DnR v3** (separa diálogos de música y efectos de sonido).
- **Voz principal vs. coros**: **MVSep Karaoke** y variantes Roformer Karaoke.
- **Restauración de audio**: **DeReverb Stereo**, **DeReverb Room**, **DeNoise** (de aufr33 & gabox) y **DeEffect**.
- **Modelos multi-stem y especializados**: DrumSep de 4/6/10 stems, bajo, guitarras, piano, cuerdas, percusión synth y reescalado de audio.

## Gratis vs. Registrado vs. Premium

MVSep **no tiene suscripción mensual**: los algoritmos principales siguen siendo gratuitos y los créditos prepagados opcionales nunca caducan.

| Característica | Sin registro | Cuenta gratuita registrada | Premium (Con saldo de créditos) |
| --- | --- | --- | --- |
| **Duración máx. de audio** | 10 min | 10 min | **100 min** |
| **Tamaño máx. de archivo** | 100 MB | 100 MB | **1.000 MB (1 GB)** |
| **Separaciones diarias** | Hasta 50 | Hasta 50 *(BS 124-band: 5/día por modelo)* | **Ilimitadas** |
| **Tareas simultáneas** | 1 | 1 | **Ilimitadas** |
| **Prioridad en cola** | Baja | Media | **Alta** |
| **CAPTCHA** | Requerido | **Ninguno** | **Ninguno** |
| **Formato de salida** | MP3 | **WAV 16-bit / FLAC 16-bit** | **WAV 32-bit float / FLAC 24-bit** |
| **Lotes y API completa** | No | Limitado | **Acceso completo** |

> **Consejo**: crear una **cuenta gratuita** en [mvsep.com](https://mvsep.com/) elimina los CAPTCHA, mejora la prioridad de cola y desbloquea descargas sin pérdida en **WAV / FLAC** - indispensable al preparar datasets para RVC.
