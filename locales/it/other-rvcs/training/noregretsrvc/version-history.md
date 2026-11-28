---
label: "Cronologia delle versioni"
icon: ":scroll:"
order: 96
permalink: /ilaria-rvc/noregretsrvc/version-history/
---

# NoRegretsRVC · Cronologia delle versioni

> **Ultima release** · [Beta 0.1.0](https://github.com/HunterThatsMe/NoRegretsRVC/releases/tag/v0.1.0)

## Beta 0.1.0

Aggiunge la media mobile dei pesi del generatore (EMA), la Mel loss multiscala (512, 1024 e 2048), il clipping dei gradienti e la regolazione di `nprobe` in FAISS. La normalizzazione del dataset parte da −20 LUFS e il sample rate predefinito resta a 32 kHz.

Rimuove la parità con Applio su una GPU. Con Dual T4 un batch di 2 o 4 per GPU dà rispettivamente 4 o 8 effettivi. Migliora la stima di fine training e corregge il totale delle epoche e i marker di salvataggio duplicati. Senza dataset rilevato il percorso resta vuoto.

[Note di rilascio · 0.1.0](https://github.com/HunterThatsMe/NoRegretsRVC/releases/tag/v0.1.0) · [Cloud](cloud.md)

## Beta 0.0.0

Prima beta pubblica. Le note ufficiali la indicano come versione di base.

[Note di rilascio · 0.0.0](https://github.com/HunterThatsMe/NoRegretsRVC/releases/tag/v0.0.0)
