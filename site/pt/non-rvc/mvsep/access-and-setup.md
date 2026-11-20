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
- Os **pacotes de créditos** nunca expiram (a partir de cerca de \$3 por 60 créditos, \$5 por 200, \$10 por 600).
- Os modelos padrão custam **1 crédito por minuto** de áudio; ensembles pesados usam multiplicadores (`2×`–`6×`).
- **Acesso à API**: utilizadores registados podem gerar um token API na conta para automatizar lotes em Python via `https://mvsep.com/api`.
