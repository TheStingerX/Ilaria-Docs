# Modelos y archivos RVC

Un modelo RVC cambia el timbre de una voz existente. Las palabras, el ritmo y las pausas proceden de la grabación original. Empieza con una voz aislada, sin música ni efectos.

## Entiende los archivos

| Archivo | Uso |
| --- | --- |
| `.pth` de inferencia | Pesos que debes seleccionar en el conversor. |
| `.index` asociado | Índice de búsqueda opcional. Puedes convertir sin él. |
| `.zip` | Paquete que puedes importar si tu aplicación lo admite, o descomprimir. |
| `G_*.pth` y `D_*.pth` | Archivos que pueden servir para reanudar el entrenamiento. Para convertir, selecciona el modelo exportado para inferencia. |

## ¿Qué archivo de índice debo usar?

En RVC WebUI (Mainline - Original RVC), `trained_*.index` es el índice FAISS entrenado antes de añadir los vectores. `added_*.index` contiene los vectores disponibles para la búsqueda. Si tienes ambos, usa el `added_*.index` correspondiente. Si solo tienes `trained_*.index`, desactiva la búsqueda o genera el índice completo. Los nombres pueden variar entre aplicaciones.

Un `.index` distribuido junto al modelo exportado muy probablemente ya contiene los vectores, aunque su nombre no empiece por `added_`. El nombre por sí solo no lo garantiza.

## ¿Para qué sirven las carpetas de entrenamiento?

Estas carpetas suelen encontrarse en `logs/<experimento>/`. Para convertir, basta con el `.pth` de inferencia y, si quieres, el índice correspondiente con sus vectores.

| Carpeta | Contenido |
| --- | --- |
| `0_gt_wavs` | Fragmentos preprocesados a la frecuencia de muestreo del experimento. |
| `1_16k_wavs` | Copias a 16 kHz para extraer características. |
| `2a_f0` | Tono fundamental representado con valores discretos. |
| `2b-f0nsf` | Frecuencia fundamental continua en hercios. |
| `3_feature768` | Vectores de 768 dimensiones de RVC v2 para el entrenamiento y el índice. |
| `eval` | Resultados de evaluación, como eventos de TensorBoard, según el programa. |

## Elige una voz

Escucha demos parecidas a tu grabación. Para el habla, fíjate en las consonantes y en las palabras más suaves. Para el canto, comprueba las notas largas y los extremos de tu registro. Revisa el motor, la versión y las condiciones de uso. Prueba cada idioma por separado.

## Importa y organiza

Descarga desde una fuente de confianza. Guarda cada versión en su propia carpeta con el índice correspondiente y las notas. En Ilaria RVC, abre **Other → Import Local Models** e importa el `.pth` de inferencia o un ZIP compatible. Añade el `.index` asociado si lo tienes.

## Haz una primera prueba

1. Graba unos diez segundos de una sola voz clara sin música.
2. Convierte con cero semitonos y con la búsqueda del índice desactivada. Guarda el WAV de referencia.
3. Si el registro suena forzado, ajusta el tono en pasos pequeños. Luego prueba un nivel bajo de búsqueda con el índice correcto.
4. Escucha siempre el mismo fragmento al mismo volumen y comprueba las consonantes y las respiraciones.

## Resuelve problemas

Si el modelo no carga, comprueba el motor y el tipo de archivo. Si aún se reconoce demasiado la voz original, compara con otro modelo. El origen puede estar en el entrenamiento o en el codificador, incluidas algunas variantes de HuBERT. Si las consonantes siguen sonando metálicas con varias grabaciones limpias, tal vez sea necesario volver a entrenar. Si los cortes solo aparecen en directo, revisa el enrutamiento y el búfer.

## Guarda una referencia

Anota las versiones del programa y del modelo, la transposición y el nivel de búsqueda. Guarda un fragmento breve para comparar después de una actualización.

## Sigue con las guías

- [Guías por aplicación](../other-rvcs/app-guides.md)
- [Biblioteca de modelos de Ilaria RVC](../ilaria-rvc/manage/model-library.md)
- [Inferencia](../ilaria-rvc/convert/inference.md)
- [Preparación de datos](../model-training/dataset-preparation.md)
- [Solución de problemas](../reference/troubleshooting.md)
