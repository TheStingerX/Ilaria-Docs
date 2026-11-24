# Inferência única e em lote

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · O RefineGAN suporta treino e inferência a 32, 40 e 44,1 kHz com RVC v2 e Pitch Guidance. A aplicação gera automaticamente o áudio silencioso a 44,1 kHz. Seleciona **None** para treinar do zero quando os pesos usam outra arquitetura, como nos pares testados KLM 5 (40 kHz) e VCTK (44,1 kHz).

[Descarregar o Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

[Controlos de inferência](inference-buttons.md)

## Estabeleça uma referência

Abra **Inferência Única**, escolha uma voz e carregue um clipe curto e seco. Defina **Pitch** e **Index Ratio** como zero. Use o incorporador esperado pelo modelo, comece com RMVPE e deixe os efeitos opcionais desativados. Salve um WAV e compare-o com sua entrada no volume correspondente.

## Sintonize passagens separadas

Se um índice correspondente estiver disponível, aumente a recuperação em pequenos incrementos. Ouça a voz mais clara e possível abafamento. Abaixe **Protect** para dar mais proteção às consoantes e respirações na conversão guiada pelo tom. O efeito depende da recuperação, que contribui apenas acima de zero. Compare as configurações de tom separadamente.

## Processar vários arquivos

Em **Inferência em lote**, agrupe gravações por modelo e configuração de pitch. Use uma pasta de destino separada. Execute primeiro um clipe representativo, depois verifique o log do lote e ouça o resultado de cada grupo.
