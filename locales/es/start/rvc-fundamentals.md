---
label: "🧠 Fundamentos de RVC"
order: 94
permalink: /rvc-fundamentals/
---
# Fundamentos de RVC

[Descarga Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

La conversión de voz basada en recuperación (RVC) toma una grabación vocal y sintetiza una versión con el carácter de una voz entrenada. La grabación proporciona la interpretación, incluidas las palabras, el ritmo y gran parte del contorno del tono. El modelo determina cómo se representa ese rendimiento. Para una línea hablada, registre la pronunciación y la entrega que desea escuchar en el resultado. Un ajuste de tono cambia el registro sin traducir ni reescribir la línea.

## Sigue la señal

 | Etapa | Qué hace | Qué escuchar |
| --- | --- | --- |
 | Decodifica la fuente | Lee el audio y lo prepara para su análisis. | Los picos recortados, el eco ambiental y otras voces pueden contaminar etapas posteriores. |
 | Extraer características del contenido | Un incrustador representa el sonido de cada sección corta de la entrada. Los flujos de trabajo comunes de RVC utilizan ContentVec o un extractor de funciones basado en HuBERT. | Las palabras poco claras pueden seguir la entrada hasta la salida, incluso con un buen modelo. |
 | Estimar el tono | Un predictor de tono estima la frecuencia fundamental, o F0, en secciones sonoras. Los modelos guiados por tono pueden utilizar este contorno durante la síntesis. | Los saltos de notas inesperados o las notas sostenidas inestables pueden indicar un seguimiento del tono. |
 | Recuperar características de entrenamiento similares | Cuando hay un índice compatible disponible, el convertidor puede combinar características cercanas de los datos de entrenamiento del modelo con las características de origen. | Compare la activación y desactivación de la recuperación si el resultado suena apagado o el timbre de origen es demasiado prominente. |
 | Sintetizar la salida | El modelo convierte las características condicionadas en una forma de onda a su velocidad de síntesis admitida. | Escuche texturas metálicas, consonantes faltantes y cambios de nivel. |

> Los checkpoints HuBERT genéricos no se recomiendan como codificador predeterminado para conversión de voz. Se entrenan para representar el habla y pueden conservar el timbre de origen en el audio convertido. Usa el codificador previsto por el modelo RVC, como ContentVec si se entrenó con él.

### Mantenga los controles separados

- **El cambio de tono** compensa el contorno detectado en semitonos. Comience en cero y cámbielo si la interpretación está fuera del registro cómodo de la voz objetivo.
- **Predictor de tono** cambia la forma en que se mide el contorno. Compare los predictores de un pasaje que contenga el problema, como una nota sostenida o la transición de una conversación a una respiración.
- **La tasa de índice** cambia el equilibrio entre las funciones de origen y recuperadas. Zero desactiva la contribución de recuperación en los flujos de trabajo RVC estándar. Una configuración alta puede enfatizar las características de los datos de entrenamiento, incluidos los artefactos no deseados.
- **Frecuencia de muestreo** describe cuántas muestras de audio representan un segundo. La velocidad del archivo fuente, la velocidad de síntesis del modelo y la velocidad del archivo exportado pueden diferir. Al volver a muestrear un archivo se cambia su representación sin que se pueda cargar un punto de control incompatible.

Para conocer los controles de conversión específicos de la aplicación, consulte [Conversión de voz](../conversion/voice-conversion.md).

## Verifique la compatibilidad del modelo antes de importar

1. **Confirme la familia y la arquitectura del modelo.** Utilice un tiempo de ejecución que admita explícitamente el modelo. Los RVC clásicos v1 y v2 utilizan diferentes dimensiones de funciones, comúnmente 256 y 768 respectivamente en RVC WebUI (Mainline - Original RVC). Algunas bifurcaciones también admiten arquitecturas que requieren su propio tiempo de ejecución.
2. **Verifique el incrustador.** El tiempo de ejecución debe proporcionar la representación de características que el modelo fue entrenado para esperar. Un modelo entrenado con un integrador personalizado puede necesitar ese integrador en el momento de la inferencia. Una extensión de archivo similar o una frecuencia de muestreo coincidente por sí solas proporcionan poca evidencia de respaldo.
3. **Utilice la exportación de inferencia.** Un `.pth` listo para usar y un punto de control de entrenamiento pueden tener la misma extensión. Seleccione el archivo identificado por el editor como modelo de inferencia. Un ZIP es un contenedor para los archivos y solo se puede importar directamente cuando la aplicación admite la importación de ZIP.
4. **Emparejar datos de recuperación con su punto de control.** Un `.index` creado para otra voz o incrustador puede fallar o degradar el resultado. Mantenga el modelo y su índice juntos y verifique que la aplicación haya seleccionado el par esperado. Si solo tiene un modelo compatible, utilice el flujo de trabajo sin recuperación admitido por su cliente.
5. **Pruebe un archivo corto.** Pruebe con un clip limpio con la configuración predeterminada. Un modelo que se carga aún puede sonar mal si el tiempo de ejecución utiliza el extractor de funciones incorrecto o si la entrada está muy fuera del rango de la voz.


!!!warning Archivos de modelos confiables
Obtenga archivos de modelo del editor original o de otra fuente de confianza. Cargar un punto de control de PyTorch puede implicar deserializar objetos de Python. Mantenga habilitadas las protecciones en su cargador y solicite una exportación compatible si rechaza un archivo. [Referencia de carga de PyTorch](https://docs.pytorch.org/docs/stable/generated/torch.load.html)
!!!

## Juzgue el resultado con una prueba repetible

Mantenga un clip de referencia seco y use ese mismo clip para cada comparación. Incluye una frase tranquila, una oración con consonantes agudas y una vocal sostenida. Mantenga niveles de reproducción similares para que el volumen por sí solo no haga que una salida parezca mejor.

1. Renderice una línea de base utilizando los valores predeterminados de la aplicación.
2. Primero verifique la claridad de las palabras. Si tanto los clips secos como los convertidos son difíciles de entender, vuelva a grabar la fuente.
3. Para la oscilación del tono, compare dos predictores de tono admitidos antes de cambiar la recuperación.
4. Para un problema de timbre o textura, compare con la recuperación desactivada, luego ajuste la tasa de índice si el índice coincidente ayuda.
5. Guarde la configuración de trabajo con el nombre del modelo, la versión y la entrada. Cuando una actualización posterior cambia el sonido, esas notas te dan un punto de partida.

[Comenzar con Ilaria RVC](getting-started.md) · [Modelos y archivos RVC](models.md) · [Conversión de voz en tiempo real](../conversion/real-time.md)
