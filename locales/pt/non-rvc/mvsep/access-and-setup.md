---
label: "Acesso, conta e API"
icon: ":globe_with_meridians:"
order: 98
permalink: /non-rvc/mvsep/access-and-setup/
description: "Como o MVSep corre na nuvem, não há nada para instalar. Ainda assim, configurar bem a conta e o formato de saída faz toda a diferença na qualidade."
---
# Usar o MVSep: acesso, conta e configuração

Como o MVSep corre na nuvem, **não há nada para instalar**. Ainda assim, configurar bem a conta e o formato de saída faz toda a diferença na qualidade.

## 1. Cria uma conta gratuita (Recomendado)

1. Acede a [mvsep.com](https://mvsep.com/) e cria uma conta gratuita.
2. **Porquê registar?**
   - **Áudio sem perdas**: sem conta só obténs **MP3** comprimido. Com conta gratuita desbloqueias **WAV 16-bit** e **FLAC 16-bit**.
   - **Sem CAPTCHA** e **prioridade mais rápida na fila**.
   - **Modelos Polar e BS-Roformer de 124 bandas** acessíveis gratuitamente (variantes BS permitem até 5 separações/dia por modelo).

## 2. Definições úteis no MVSep

- **Formato de saída**: escolhe sempre **WAV** (ou **FLAC**) antes de iniciar uma separação se vais treinar um modelo RVC ou encadear vários passos de limpeza.
- **Pós-processamento / encadeamento**: inicia sessão, vai a **Advanced settings → Home Screen** e ativa **"Show post-processing algorithm"** para aplicar um modelo de limpeza logo após a separação.
- **Envio ou transferência lenta?** O MVSep disponibiliza espelhos (mirrors) regionais - muda para a opção de mirror se o site principal estiver lento.

## 3. Créditos pré-pagos e API completa (Opcional)

Se processares ficheiros longos (até 100 minutos / 1 GB), quiseres **WAV 32-bit float / FLAC 24-bit** ou evitar filas em horas de ponta:
- Os modelos padrão custam **1 crédito por minuto** de áudio; ensembles pesados usam multiplicadores (`2×`–`6×`).
- **Acesso à API**: utilizadores registados podem gerar um token API na conta para automatizar lotes em Python via `https://mvsep.com/api`.

## Preços dos pacotes

O MVSEP oferece até 50 separações gratuitas por dia sem cartão. O Premium usa créditos pré-pagos.

| Preço (USD) | Créditos | Canções estimadas (4 min) | USD por minuto |
| ---: | ---: | ---: | ---: |
| 3 | 60 | ≈ 15 | 0,05 |
| 5 | 200 | ≈ 50 | 0,025 |
| 10 | 600 | ≈ 150 | 0,0167 |
| 30 | 2.000 | ≈ 500 | 0,015 |
| 50 | 4.000 | ≈ 1.000 | 0,0125 |
| 100 | 8.500 | ≈ 2.125 | 0,0118 |
| 200 | 18.000 | ≈ 4.500 | 0,0111 |
| 500 | 50.000 | ≈ 12.500 | 0,01 |
| 1.000 | 110.000 | ≈ 27.500 | 0,0091 |

As estimativas consideram uma separação por canção com um modelo padrão a 1 crédito por minuto. Uma canção de 4 minutos custa 4 créditos. Um modelo Ensemble a 2× usa 8 créditos para a mesma faixa. Um pacote de 60 cobre cerca de 7 canções completas em vez de 15. Opções e passagens adicionais podem aumentar o consumo.

[Planos do MVSEP](https://sg.mvsep.com/en/plans) · [Como são calculados os créditos](https://mvsep.com/en/credits)
