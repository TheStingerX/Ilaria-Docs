# Conversor ONNX ↔ PTH

Em **Other → Convert model weights**, escolhe um modelo instalado ou fornece um ficheiro. Exporta um modelo RVC HiFi-GAN com orientação de tom para ONNX para o usar num cliente externo compatível. O restauro exato para `.pth` está disponível para ONNX exportados pelo Ilaria RVC. Guarda o `.pth` original se usares outro exportador. [Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)

[ZIP de atualização para Windows](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.5.1/ILARIA_RVC-update-2.5.1.zip?download=true)

## O que contém cada ficheiro

O `.pth` é o checkpoint de inferência para o Ilaria RVC. O `.onnx` contém um grafo e pesos para um cliente compatível. Guarda o `.index` à parte e usa-o apenas se o cliente suportar recuperação de características.

## Antes de exportar

Usa **Ilaria RVC 2.5.1 ou posterior** e **PyTorch 2.6 ou posterior**. Precisas de um modelo de inferência **HiFi-GAN** com orientação de tom e um `.pth` de até **512 MiB**. Se só tens checkpoints de treino, exporta primeiro a voz. A exportação usa a CPU.

## Exportar um modelo para ONNX

Escolhe um modelo de inferência instalado ou indica o ficheiro `.pth` exportado. Seleciona a conversão para ONNX e guarda o resultado. Carrega-o no cliente externo e testa-o com uma gravação curta.

Escolhe **ONNX** como formato de saída. Com um `.pth`, a opção **Auto** seleciona Safetensors. Inicia a conversão, espera pela conclusão e descarrega o ficheiro.

## Como funciona o restauro exato

O exportador inclui no ONNX os bytes do `.pth` original. Ao restaurar, o conversor verifica a configuração RVC e os pesos. Otimizar ou voltar a exportar o ONNX pode remover o checkpoint incorporado.

## Restaurar o PTH original

Indica o ficheiro `.onnx` exportado pelo Ilaria RVC. Seleciona a conversão para `.pth`, guarda o modelo restaurado e testa-o em **Inference**.

Com um ONNX, escolhe **Auto** ou **PTH**. Inicia a conversão e descarrega o ficheiro. Se tiveres o original, compara as somas SHA-256.

## Testar o resultado

Testa o ONNX no cliente de destino com uma gravação curta. Testa o PTH restaurado no Ilaria RVC com o mesmo áudio e as definições originais.

## Resolução de problemas

Se a exportação falhar, verifica vocoder, orientação de tom, tamanho e versão do PyTorch. Se faltar o checkpoint incorporado, usa a exportação intacta ou recupera o PTH de uma cópia de segurança. Se o cliente rejeitar o ONNX, confirma os formatos RVC que aceita.

[Safetensors ↔ PTH](safetensors-converter.md)
