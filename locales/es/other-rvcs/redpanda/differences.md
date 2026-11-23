---
label: "Redpanda VC frente a otras aplicaciones RVC"
icon: ":clipboard:"
order: 94
permalink: /ilaria-rvc/redpanda/comparison/
description: "Redpanda VC reúne RVC y Casual Voice Changer en una interfaz compartida para escritorio y navegador. Las compilaciones antiguas usaban Gradio e incluían motores y herramientas retirados de la versión actual."
---

# Redpanda VC frente a otras aplicaciones RVC

[Versión precompilada para Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) · [Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Redpanda VC reúne RVC y Casual Voice Changer en una interfaz compartida para escritorio y navegador. Las compilaciones antiguas usaban Gradio e incluían motores y herramientas retirados de la versión actual.

## Formatos de modelos y motores compatibles

La versión actual incluye entrenamiento, inferencia y modo en tiempo real para RVC y CVC. Se han retirado Beatrice, Rectified Flow y el entrenamiento independiente de vocoders. HiFi-GAN y RefineGAN siguen en el entrenamiento RVC. Una voz `.cvc` requiere un motor CVC. Antes de usar un `.pth` en Mainline, Applio o Ilaria RVC, comprueba arquitectura, vocoder y embedder.

| Aplicación | Interfaz | Diferencia principal |
| --- | --- | --- |
| Redpanda VC | Escritorio y navegador | RVC y CVC en una interfaz |
| RVC WebUI (Mainline - Original RVC) | Navegador y lanzador aparte para tiempo real | Implementación original de RVC |
| Applio | WebUI | Flujos de RVC y síntesis de voz |
| Ilaria RVC | Interfaz en navegador | Paquete Windows para NVIDIA y cuadernos en la nube |

[Instalar Redpanda VC](first-run.md) · [Inferencia con archivos](inference.md) · [Conversión de voz en tiempo real](live-audio.md) · [Entrenamiento con Casual Voice Changer](causal-training.md) · [RVC Training](training.md)

## Código fuente y versión

[Release README](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/README.md) · [Interface migration](https://github.com/redpanda343/Redpanda-vc/commit/2b1367c8c) · [Engine changes](https://github.com/redpanda343/Redpanda-vc/commit/577f02066)
