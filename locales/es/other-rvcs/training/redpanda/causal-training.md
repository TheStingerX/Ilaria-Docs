---
label: "Entrenamiento con Causal Voice Changer"
icon: ":studio_microphone:"
order: 95
permalink: /ilaria-rvc/redpanda/causal-training/
description: "La opción Causal Voice Changer de Redpanda integra Causal Voice Changer v0.4.0. El ajuste fino crea una voz .cvc para el motor CVC."
---

# Entrenamiento con Causal Voice Changer

[Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

La opción Causal Voice Changer de Redpanda integra Causal Voice Changer v0.4.0. El ajuste fino crea una voz .cvc para el motor CVC.

## Entrenar y reanudar una voz

Prepara grabaciones limpias de una sola persona y reserva una muestra para la prueba. Abre **Training → Causal Voice Changer**, ponle nombre a la voz, selecciona la carpeta y el dispositivo, y configura **Training steps**. La base se descarga al usarla por primera vez. La versión guarda cada 1.000 pasos por defecto. Para continuar, usa el mismo nombre y carpeta con un objetivo de pasos mayor. Guarda los archivos de entrenamiento y prueba el `.cvc` en Inference y Realtime.

## Exportaciones y licencia

El proyecto original indica uso no comercial para la base CVC predeterminada y sus ajustes finos. Usa grabaciones con permiso para entrenar. Busca la exportación en `logs/causalvc/` en la versión portátil o en `runs/models/voice-<name>/voices/` con el código fuente.

[Instalar Redpanda VC](first-run.md) · [Inferencia con archivos](inference.md) · [Conversión de voz en tiempo real](live-audio.md) · [RVC Training](training.md) · [Causal Voice Changer](../../../non-rvc/causal-voice-changer/overview.md)

## Código fuente y versión

[CVC trainer](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/causalvc/trainer.py) · [CVC upstream](https://github.com/mojowozo/Causal-Voice-Changer/tree/50dce9236854fef17f550571413367217e235155)
