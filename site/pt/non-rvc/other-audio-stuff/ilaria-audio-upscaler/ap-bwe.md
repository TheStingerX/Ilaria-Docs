# Expandir a banda da fala com AP-BWE

## Escolhe um perfil de banda

Escolhe **AP-BWE** e ajusta o primeiro número do perfil à banda útil da fala. Um sinal a 8 kHz contém frequências até cerca de 4 kHz. Uma chamada guardada num WAV a 48 kHz pode manter essa banda estreita. Em caso de dúvida, observa um espectrograma ou compara perfis próximos no mesmo excerto. A aplicação reamostra para a frequência de entrada do perfil antes da inferência. Uma frequência demasiado baixa pode eliminar detalhes.

| Entrada (kHz) | Saída (kHz) |
| ---: | ---: |
| 2 | 16 |
| 4 | 16 |
| 8 | 16 |
| 8 | 48 |
| 12 | 48 |
| 16 | 48 |
| 24 | 48 |

## Compara os resultados

Descarrega os pesos do perfil escolhido, adiciona o áudio, seleciona o formato e carrega em **Enhance audio**. O AP-BWE estima em paralelo os espetros de amplitude e fase e reconstrói a forma de onda à frequência de saída. A aplicação processa cada canal separadamente. Se o ruído aumentar ou a voz ficar metálica, testa um perfil mais próximo da banda de origem.

[Visão geral](overview.md) · [Instalação e modelos](installation.md) · [Restaurar fala com Sidon](sidon.md) · [Pré-escuta, exportação e resolução de problemas](export.md)

## Fontes

[AP-BWE](https://github.com/yxlu-0102/AP-BWE) · [AP-BWE audio demos](https://yxlu-0102.github.io/AP-BWE/) · [studio_engine.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio_engine.py) · [AP-BWE weight license](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/LICENSE-AP-BWE-WEIGHTS.txt)
