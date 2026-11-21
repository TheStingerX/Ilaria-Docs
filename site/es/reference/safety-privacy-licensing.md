# Seguridad, Privacidad y Licencias en IA de Voz

> **Guía práctica, no asesoría legal:** Esta página resume buenas prácticas técnicas de seguridad y reglas comunes de licencias para modelos RVC, conjuntos de datos y notebooks en la nube. Revisa siempre la licencia específica de cada recurso.

## 1. Seguridad de los modelos descargados (`.pth` vs. `.safetensors`)

- **Por qué los archivos `.pth` requieren confianza:** Los archivos PyTorch `.pth` usan serialización `pickle` de Python. Aplicaciones modernas como **Ilaria RVC 2.4.0+** y **Applio** incluyen protecciones (`weights_only`), pero conviene descargar `.pth` únicamente de **autores de confianza y repositorios oficiales** (Hugging Face o GitHub Releases).
- **Por qué `.safetensors` es más seguro:** `.safetensors` almacena solo tensores y metadatos sin ejecutar código al cargar. Puedes convertir `.pth` con el [Conversor de Safetensors](../ilaria-rvc/manage/safetensors-converter.md).
- **Verifica antes de cargar:** Comprueba el tamaño del archivo (un `.pth` de inferencia RVC real suele pesar ~40–110 MB), verifica hashes SHA-256 o firmas digitales si están disponibles y no cargues checkpoints `G_*.pth` / `D_*.pth` de origen desconocido.

## 2. Consentimiento vocal, privacidad y licencias

- **Consentimiento:** Entrena solo con tu propia voz, locutores autorizados o conjuntos de datos con licencia explícita. Evita llamadas privadas o grabaciones protegidas sin permiso.
- **Uso comercial vs. no comercial:** Incluso cuando el software es de código abierto (MIT), **cada modelo y preentrenado tiene su propia licencia** (algunos permiten uso comercial y otros son **no comerciales / CC-BY-NC**). Revisa la ficha del modelo y [Modelos preentrenados](../start/pretrained.md).
- **Compartir responsablemente:** Incluye versión RVC (`v2`), frecuencia de muestreo (`32k`/`40k`/`48k`), embedder, su `added_*.index` y términos de uso.

## 3. Seguridad en notebooks y credenciales

- **Mantén privados Kaggle, Colab y Lightning AI:** Las celdas de arranque (como `Ilaria-RVC-Kaggle.ipynb`) muestran URLs activas y **contraseñas de WebUI / FileBrowser**. No compartas capturas ni registros con contraseñas activas.
- **Protege tokens:** Nunca pegues tokens de **Ngrok**, **Horizon ID** o Hugging Face con permisos de escritura en notebooks públicos y detén los túneles (`STOP = True`) al terminar.
- **Privacidad de datos:** Para grabaciones confidenciales, limpia y convierte el audio **en local**.
