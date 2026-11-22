# Benchmark e Confronto delle Prestazioni

Non affidarti a stime o numeri isolati quando ottimizzi il training RVC o la conversione dal vivo. Misura il tuo hardware con **test A/B ripetibili** cambiando **una sola variabile alla volta**.

## 1. Metriche da misurare

### Metriche di training

- **Steps al secondo e durata epoca:** Velocità di ciascun aggiornamento e di ogni passaggio sul dataset (visibile nel log di training / TensorBoard).
- **Uso VRAM:** Picco di memoria GPU (`nvidia-smi` o Gestione attività) con il tuo **Batch Size**, **Precisione** (`FP32`/`FP16`/`BF16`) e **GPU Caching**.
- **Consumo e temperatura GPU:** Controlla eventuale **thermal** o **power throttling** (`nvidia-smi -i 0 -q -d PERFORMANCE`) su sessioni lunghe.

### Metriche di inferenza e tempo reale

- **Tempo di inferenza e Real-Time Factor (RTF):** Tempo necessario a convertire un file diviso per la durata del file (`RTF < 1.0` = più veloce del tempo reale).
- **GPU Delay vs. Latenza End-to-End:** Il **GPU Delay** misura solo il calcolo GPU per singolo blocco. La **latenza complessiva** include microfono, **Block Size**, crossfade/contesto, cavo virtuale e buffer di Discord/OBS/gioco.

## 2. Protocollo A/B ripetibile

1. **Definisci la baseline (Test A):** Ripristina eventuali modifiche facoltative, usa un modello fisso, la stessa clip o frase di prova e impostazioni identiche.
2. **Stabilizza e misura:** Esegui abbastanza a lungo da includere il riscaldamento termico (es. **10–15 minuti** dal vivo o più epoche complete in training).
3. **Cambia una sola impostazione (Test B):** Modifica un solo parametro (`Batch Size`, `BF16` vs `FP32`, `Block Size` o `rmvpe` vs `fcpe`) mantenendo identico il carico GPU di fondo.
4. **Confronta oggettivamente:**

| Metrica | Baseline (Test A) | Variante (Test B) |
| --- | --- | --- |
| Durata epoca / Steps al secondo (Training) | `____` | `____` |
| **GPU Delay** medio e picco massimo (Live) | `____ ms / ____ ms` | `____ ms / ____ ms` |
| Tagli o scoppiettii audio | `Sì / No (conteggio)` | `Sì / No (conteggio)` |
| Picco VRAM e temperatura GPU | `____ GB / ____ °C` | `____ GB / ____ °C` |
| Throttling osservato | `Sì / No` | `Sì / No` |

5. **Mantieni solo miglioramenti reali:** Se il Test B non migliora o introduce calore e instabilità, torna al Test A.
