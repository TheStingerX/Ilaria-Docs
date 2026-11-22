---
label: "Prestazioni GPU e Troubleshooting"
icon: ":zap:"
order: 91
permalink: /gpu-performance/
description: "Guida trasversale a utilizzo GPU, VRAM, limiti di potenza, thermal throttling, colli di bottiglia CUDA/CPU e conflitti con i giochi nelle app RVC."
---
# Prestazioni GPU e Troubleshooting

Conversione vocale e training RVC dipendono da calcolo GPU, banda di memoria e scheduling stabile. Usa questa guida per capire perché un'app rallenta, esaurisce la VRAM o scatta dal vivo.

## 1. Metriche GPU che contano davvero

- **Utilizzo GPU:** Nel **training** un utilizzo alto (80–99%) è normale. Nel **tempo reale** il carico arriva a brevi raffiche per blocco audio; se un gioco satura la GPU al 95–100%, l'audio attende e scoppietta.
- **VRAM:** **Batch Size**, sample rate e **cache GPU del dataset** determinano l'uso della VRAM. Se si riempie, Windows usa la RAM lenta o genera `CUDA out of memory`.
- **Temperatura e Thermal Throttling:** Oltre la soglia termica la GPU abbassa automaticamente i clock, causando cali di velocità nelle epoche o picchi di **GPU Delay**.
- **Limiti di potenza e laptop:** A batteria i portatili limitano watt e frequenze. Collega l'alimentatore e usa un profilo prestazioni adeguato.

## 2. Impostazioni con il maggiore impatto

| Impostazione | Impatto sul training | Impatto dal vivo |
| --- | --- | --- |
| **Batch Size** | Batch più grandi usano più VRAM e velocizzano le epoche; riduci in caso di OOM | Non usato in inferenza live |
| **Block / Chunk Size** | Non usato nel training | Blocchi più grandi danno più margine alla GPU (meno scatti, più latenza) |
| **Precisione (`FP32` / `FP16` / `BF16`)** | `BF16` (RTX 30/40/50) e `FP16` riducono VRAM e tempi; `FP32` è il fallback più sicuro | `FP16` è più rapido su NVIDIA compatibili; DirectML/schede datate richiedono spesso `FP32` |
| **Pitch Extractor (`rmvpe` / `fcpe`)** | `rmvpe` è lo standard per precisione F0 | `fcpe` o `rmvpe` sono rapidi; evita `crepe` full dal vivo |

## 3. Risolvere i colli di bottiglia comuni

1. **Gioco + Voice Changer dal vivo:** Limita gli FPS del gioco (mantenendo il carico GPU sotto ~80–85%), abbassa effetti pesanti o alza di un passo il **Block Size**.
2. **Windows HAGS:** Non è dannoso per impostazione predefinita, ma se noti contesa VRAM o scatti inspiegabili prova a disattivarlo nelle impostazioni grafiche di Windows, riavvia e confronta prima/dopo.
3. **Colli di bottiglia CPU:** Preprocessing lento, pochi **Workers** o ricampionamento audio possono frenare la GPU. Allinea tutto a `48000 Hz` in Audio di Windows.
4. **Driver e raffreddamento:** Usa driver NVIDIA Studio o Game Ready aggiornati e tieni pulite le prese d'aria.

## 4. Ottimizzazione avanzata facoltativa (NVIDIA)

Su GPU NVIDIA compatibili, bloccare i clock grafici con `nvidia-smi` è un test **facoltativo** che può ridurre le oscillazioni di latenza in app come Vonovox. Consulta [Ottimizzazione prestazioni avanzata Vonovox](../other-rvcs/vonovox/advanced-performance-optimization.md) per la procedura reversibile e gli script BAT.

[Stimatore VRAM e training](vram-estimator.md)
