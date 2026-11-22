# Modelos y archivos RVC

Un modelo RVC cambia el timbre de una interpretación existente. La grabación de origen sigue aportando las palabras, el fraseo y el ritmo. Necesitas un modelo de inferencia compatible y una grabación o señal de micrófono. Empieza con una sola voz aislada para poder oír qué está haciendo el modelo.

## Qué hace cada archivo

| Archivo | Qué contiene | Qué hacer |
| --- | --- | --- |
| `.pth` de inferencia | Los pesos del modelo usados para la conversión. | Cárgalo en el selector de modelos. |
| `.index` coincidente | Características que la aplicación puede recuperar durante la conversión. | Añádelo si está disponible. Puedes convertir sin él. |
| `.zip` | Un archivo comprimido que puede incluir el modelo, el índice y un README. | Usa la importación ZIP si tu app admite el archivo, o extráelo y selecciona los archivos por separado. |
| Checkpoints de entrenamiento, como `G_*.pth` y `D_*.pth` | Archivos intermedios usados para reanudar el entrenamiento, según la aplicación. | Usa el modelo de inferencia exportado en tu conversor. La extensión `.pth` por sí sola no identifica el rol del archivo. |

## ¿Qué archivo index debo usar?

En el entrenamiento de RVC WebUI (Mainline - RVC original), `trained_*.index` es el índice FAISS después de haber aprendido a organizar características, antes de añadir los vectores de características. `added_*.index` es la versión poblada. Para convertir, elige el `added_*.index` coincidente si existen ambos. Si solo tienes `trained_*.index`, mantén desactivada la recuperación (retrieval) o genera el índice poblado desde el experimento. Otras apps pueden usar nombres distintos.

Un `.index` incluido junto a un modelo exportado es muy probablemente ya poblado, aunque su nombre no lleve el prefijo `added_`. El nombre por sí solo no puede confirmar su contenido.

## ¿Qué son las carpetas de entrenamiento?

Estas carpetas suelen aparecer dentro de `logs/<experiment>/`. Son archivos de trabajo para entrenamiento y evaluación. Una voz terminada solo necesita su `.pth` de inferencia exportado y, opcionalmente, el índice poblado coincidente.

| Carpeta | Qué contiene |
| --- | --- |
| `0_gt_wavs` | Clips de voz preprocesados a la frecuencia de muestreo del experimento. Se usan como objetivos de audio durante el entrenamiento. |
| `1_16k_wavs` | Copias a 16 kHz de los clips usadas para extracción de características. |
| `2a_f0` | Tono extraído guardado como valores discretos para modelos condicionados por tono. |
| `2b-f0nsf` | Tono continuo en hercios para modelos condicionados por tono. |
| `3_feature768` | Vectores de características por clip con 768 dimensiones en la estructura RVC v2. Estas características se usan para entrenar y también pueden poblar el índice de recuperación. |
| `eval` | Salida de evaluación, como archivos de eventos de TensorBoard si la compilación los escribe ahí. Su contenido depende del entrenador. |

## Elige un modelo para la tarea

Escucha demos que se parezcan a tu entrada prevista. Para habla, fíjate en consonantes, palabras suaves y pausas naturales. Para canto, comprueba notas sostenidas y los extremos agudo y grave de tu rango. Si planeas usarlo en vivo, prueba hablando libremente y cambiando el volumen. Comprueba el motor y versión del modelo documentados, limitaciones de idioma conocidas y términos de uso. Un modelo que suena bien en un idioma puede sonar irregular en otro, incluso si el dataset de entrenamiento incluye ambos.

## Importa y organiza tus modelos

1. Descarga desde una fuente de confianza y lee las notas incluidas. Los archivos de modelo pueden ser inseguros al cargarse en software que deserializa objetos arbitrarios.
2. Guarda cada voz y versión en su propia carpeta, con el `.pth` exportado, su `.index` opcional y cualquier nota. Los nombres de archivo por sí solos no bastan para emparejar un índice con un modelo.
3. En Ilaria RVC, abre **Other → Import Local Models**. Elige el `.pth` de inferencia o un ZIP compatible, y añade el `.index` coincidente si lo tienes. Otras aplicaciones pueden pedirte actualizar la lista de modelos tras importar.

## Ejecuta una primera conversión

1. Graba unos diez segundos de una sola voz en una sala silenciosa, sin música, reverberación intensa ni clipping.
2. Selecciona el modelo deseado, deja desactivada la recuperación del índice y empieza con desplazamiento de tono cero. Guarda el WAV convertido como referencia.
3. Si el registro suena forzado, compara pequeños cambios de tono en semitonos usando la misma entrada. El cambio de tono modifica el registro, así que júzgalo por separado de la identidad vocal.
4. Una vez ajustado el tono, prueba un pequeño aumento en la recuperación (retrieval) con el índice coincidente. Escucha si mejora el carácter vocal y luego comprueba si respiraciones o consonantes se vuelven ásperas. Quédate con el ajuste que suene mejor, incluido cero.

## Diagnosticar problemas comunes

| Síntoma | Qué comprobar |
| --- | --- |
| La app no puede cargar el modelo | Confirma el motor, la versión y el tipo de archivo. Extrae el ZIP si el importador lo rechaza y luego selecciona los pesos de inferencia exportados. |
| El resultado sigue sonando como la fuente | Compara con otro modelo conocido que funcione bien usando el mismo clip. El timbre de origen persistente puede venir del modelo o su embedder de entrenamiento, incluidas variantes de HuBERT. Subir más la recuperación puede no resolverlo. |
| Respiraciones o consonantes suenan metálicas | Compara con la recuperación desactivada. Si el problema persiste con entradas limpias y distintos ajustes, puede estar en el modelo y requerir reentrenamiento. |
| Solo la salida en vivo da tirones | Prueba el mismo modelo con un archivo. Si la conversión de archivos funciona, revisa el micrófono, el enrutamiento de audio y el búfer en la app en vivo. |

## Mantén un modelo listo para reutilizar

Guarda la versión funcional de la app, la versión del modelo, el tono seleccionado y los ajustes de recuperación junto con un breve clip de referencia. Vuelve a probar tras cambiar de aplicación o actualizar el modelo. Si entrenas tus propias voces, guarda la exportación para inferencia y los archivos necesarios para reanudar el entrenamiento en carpetas separadas.

## Continúa con las guías

- [Guías de aplicaciones](../other-rvcs/app-guides.md)
- [Biblioteca de modelos de Ilaria RVC](../ilaria-rvc/manage/model-library.md)
- [Inferencia](../ilaria-rvc/convert/inference.md)
- [Preparación del dataset](../model-training/dataset-preparation.md)
- [Solución de problemas](../reference/troubleshooting.md)
