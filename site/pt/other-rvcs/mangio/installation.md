# Mangio RVC Fork · Instalação

[GitHub](https://github.com/Mangio621/Mangio-RVC-Fork) · [Versão consultada](https://github.com/Mangio621/Mangio-RVC-Fork/tree/v23.7.0)

!!!warning Software antigo · Desaconselhado
Estes projetos estão desatualizados e já não parecem ter manutenção ativa. O rvc-cli está arquivado e os ramos principais do RVC Studio e do Mangio RVC Fork estão inativos há vários anos. Os guias continuam disponíveis para projetos existentes. Para uma nova instalação, escolhe uma aplicação com manutenção ativa. [Guias por aplicação](../app-guides.md)
!!!

## Versão histórica e ambiente

Mangio RVC Fork é um fork experimental da WebUI original. O guia refere-se à tag histórica **v23.7.0**. Mantém o ambiente e os recursos separados de instalações modernas. No Windows, o launcher incluído exige um pacote oficial com `runtime/python.exe`. O código-fonte requer dependências e modelos base. O README da tag recomenda Python 3.9.8 para instalação manual.

## Abrir a WebUI ou a interface de texto

No pacote Windows, executa `go-web.bat`. Este inicia `infer-web.py` com o interpretador incluído na porta 7897. Abre o URL local mostrado no terminal. Se falhar, confirma o interpretador antes de alterares dependências. Para a CLI interativa num ambiente preparado, executa `infer-web.py --is_cli`.

~~~bash
python infer-web.py --is_cli
~~~

[Utilização e resolução de problemas](usage.md)
