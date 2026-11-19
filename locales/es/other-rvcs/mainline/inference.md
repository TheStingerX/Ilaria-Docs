---
label: "Convierta grabaciones"
icon: ":studio_microphone:"
order: 30
permalink: /ilaria-rvc/mainline/inference/
---

# Convierta grabaciones en RVC WebUI (Mainline - Original RVC)

Comience con una grabación corta que pueda escuchar claramente en un reproductor multimedia normal, además de un modelo RVC exportado que tenga permiso para usar. La modelo cambia la voz en la grabación. La fuente proporciona las palabras, el ritmo y la entrega. Para una canción, utilice una pista vocal aislada o grabada por separado para el primer pase.

## Coloque cada archivo en el lugar correcto

| Lo que recibió | Dónde va |
| --- | --- |
| Un ZIP o 7z con un modelo dentro | Extraiga los archivos antes de agregarlos a RVC WebUI (Mainline - Original RVC). |
| Un archivo de inferencia `.pth` | Cópielo en `assets/weights/` dentro de la carpeta RVC WebUI (Mainline - Original RVC). Si lo entrenó usted mismo, utilice el modelo pequeño exportado. |
| Un `.index` completo para ese modelo exacto | En las compilaciones actuales, cópielo en `assets/indices/`. Las compilaciones más antiguas suelen descubrir índices en `logs/`. Si la detección automática falla, selecciónela o ingrese su ruta completa manualmente. |
| Un punto de control de entrenamiento `G_*.pth` o `D_*.pth` | Guárdelo con el experimento en `logs/`. Utilice la [guía de capacitación](training.md) para identificar o exportar un modelo para inferencia. |

Utilice `added_*.index` cuando el entrenamiento haya producido archivos `trained_` y `added_`. Este último contiene los vectores de características buscables. Su modelo puede funcionar sin índice. Establezca **Tasa de índice** en cero cuando omita el índice o no pueda identificar el archivo coincidente.

## Convierta su primer clip

1. Abra la WebUI y busque la pestaña **Inferencia de modelo**. Actualice las listas de modelos e índices después de copiar archivos, luego seleccione la inferencia `.pth` en el menú desplegable de voz. Dé tiempo a la interfaz para leer el punto de control.
2. Elija un WAV corto con una voz hablando o cantando sola. Las compilaciones más nuevas exponen un control de carga. Si su compilación muestra un cuadro de ruta, asígnele una ruta completa como `C:\RVC\test\voice.wav`. Pruebe una ruta local corta al diagnosticar el acceso a archivos en un paquete anterior.
3. Establezca el cambio de tono en `0` para la primera pasada. Establezca **Tasa de índice** o **Proporción de función de búsqueda** en `0` y deje las configuraciones adicionales como están. Seleccione `rmvpe` si está disponible y sus pesos están instalados. Con un punto de control de un solo hablante, comience con la identificación del hablante `0`.
4. Haga clic en **Convertir** una vez y espere el panel de estado y reproducción. Juega el resultado desde el principio. Si suena utilizable, use el menú del reproductor de audio para descargarlo. Si la conversión falla, lea el estado o el terminal antes de cambiar la configuración.
5. Reproduzca la misma fuente y emita consecutivamente. Comprueba la primera palabra, las notas más altas y más bajas y varias pausas. Cambie un control y vuelva a representar la misma entrada para saber qué cambio ayudó.

## Comprenda los controles que probablemente toque

| Control | Cómo usarlo |
| --- | --- |
| Cambio de tono | Transpone la fuente en semitonos. `+12` lo sube una octava, `-12` lo baja una octava. Primero haga pequeños movimientos cuando las palabras o notas suenen forzadas. |
| Extracción de tono | Estima el contorno de tono utilizado en la conversión guiada por tono. Pruebe con otro método cuando aparezcan interrupciones de voz en determinadas notas. Compara el mismo clip y mantén todo lo demás constante. |
| Tasa de índice | Mezcla funciones cercanas de la voz de destino cuando existe un índice coincidente. Auméntelo gradualmente si el resultado conserva demasiado del timbre original. Retroceda si la dicción se vuelve turbia. |
| Proteger | Controla en qué medida la conversión conserva los detalles sordos, como respiraciones y consonantes. Los valores más bajos refuerzan la protección en el control RVC WebUI (Mainline - Original RVC) `0–0.5` habitual. Pruebe un pequeño ajuste después de que funcione la recuperación del índice. |
| Envolvente de volumen | Cambia qué tan cerca el resultado sigue los momentos ruidosos y silenciosos en la entrada. Más cerca de cero sigue más la fuente. |
| ID de altavoz | Selecciona una voz dentro de un punto de control de varios altavoces. Elija una identificación realmente presente en ese modelo. |
| Salida de remuestreo | Establece la frecuencia de muestreo de audio exportado donde la compilación lo expone. Déjelo en el valor predeterminado del modelo durante su primera prueba. |

### Una prueba de sintonización repetible

Guarde una fuente de 10 segundos sin procesar como `test.wav`. Conviértalo con cambio de tono cero y sin índice para obtener `baseline.wav`. Cargue el índice coincidente y aumente su tasa para `retrieval.wav`. Compare esos dos archivos en un volumen similar. Una vez que elija una configuración de recuperación, intente ajustar el tono y guarde un tercer archivo. Mantenga cualquier configuración que mejore la misma línea problemática sin degradar el resto.

## Convertir una carpeta

1. Finalice exitosamente una prueba de un solo archivo usando la misma voz y configuración.
2. Cree carpetas `input` y `output` separadas. Coloque solo el audio que desea convertir en `input`.
3. En **Inferencia por lotes**, elija sus archivos o ingrese la ruta completa de la carpeta de entrada. Establezca explícitamente la ruta de la carpeta de salida y elija WAV si planea editar el audio más adelante.
4. Comience con dos archivos cortos. Confirme que cada resultado aparezca en la carpeta de salida y se reproduzca hasta el final. Luego ejecute el conjunto completo. Verifique el estado de fallas individuales para que pueda volver a intentar solo los archivos afectados.

## Diagnosticar fallas comunes de conversión de archivos

| Síntoma | Próxima prueba |
| --- | --- |
| La lista de modelos está vacía | Confirme que `.pth` está extraído, debajo de `assets/weights/` de la instalación activa, y es visible después de la actualización. |
| El modelo aparece pero no se puede cargar | Compruebe que el archivo sea una exportación de inferencia compatible. Un punto de control de entrenamiento o un modelo de un motor de voz diferente puede aparecer en la lista sin ser utilizable. |
| El índice falla o no hay ningún resultado audible | Establezca la recuperación en cero, ejecute una conversión y confirme que el punto de control funciona. Luego seleccione el índice poblado correspondiente e inténtelo nuevamente. |
| La salida es arenosa o las sílabas se tambalean | Escuche la entrada primero. Vuelva a probar una voz limpia con el índice desactivado. Luego compare los métodos de tono y un cambio modesto en la transposición. |
| Falta la salida en el modo por lotes | Verifique que los archivos de entrada se abran, que se pueda escribir en la carpeta de destino y que el terminal informe que el nombre de archivo correspondiente se ha realizado correctamente. |

Para obtener más información, consulte [modelos y archivos RVC](../../start/models.md) y [calidad de audio](../../conversion/audio-quality.md)].
