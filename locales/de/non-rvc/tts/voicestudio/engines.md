---
label: "Modelle und Beschleunigung"
icon: ":package:"
order: 97
permalink: /non-rvc/tts/voicestudio/engines/
---

# VoiceStudio · Modelle und Beschleunigung

[VoiceStudio v0.5.8 · Modelle und Beschleunigung](https://github.com/debpalash/VoiceStudio/blob/v0.5.8/docs/engines/README.md)

## Vorbereitung

Jede Aufgabe benötigt eine Engine und passende Gewichte. Prüfe Sprache, Größe, Lizenz und unterstütztes Gerät vor dem Download.

## Erster Test

Die CPU dient als Referenz. CUDA ist für NVIDIA. Bei AMD hängt ROCm von Karte und Engine ab. Einige GGUF-Engines bieten Vulkan und Apple Silicon unterstützt Metal. Teste beim Wechsel denselben Satz.

## Schrittweise Prüfung

1. Entscheide zwischen TTS und ASR.
2. Prüfe Sprache und Gerät der Engine vor dem Download.
3. Vergleiche CPU und GPU nach einem Probelauf mit demselben Text.

[Erste Synthese](first-run.md) · [Fehlerbehebung](troubleshooting.md)
