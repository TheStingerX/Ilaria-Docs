---
label: "Audio en vivo y enrutamiento"
icon: ":studio_microphone:"
order: 90
permalink: /ilaria-rvc/okada/live-audio/
description: "Comience con auriculares y una única ruta de audio local. Cuando escuche una voz limpia y convertida en los auriculares, conéctela a una llamada o grabadora."
---
# Convierta su micrófono en w-okada VCClient

> Conecta el micrófono físico al conversor, envía la salida al extremo de reproducción del cable y selecciona el extremo de grabación en Discord u OBS. Para Vonovox recomendamos **VAC Lite**, con **VB-CABLE** como alternativa. Lee la guía completa antes de probar en una llamada. [VAC Lite / VB-CABLE](../vonovox/live-audio.md)

Comience con auriculares y una única ruta de audio local. Cuando escuche una voz limpia y convertida en los auriculares, conéctela a una llamada o grabadora. Este orden le permite localizar problemas antes de agregar el cable virtual.

## Agregue un modelo y escuche el primer resultado

1. Conecte su micrófono y auriculares antes de abrir VCClient. En el sistema operativo, hable por el micrófono y verifique que el medidor de entrada se mueva. Pausa Discord, OBS y otras aplicaciones de captura durante esta prueba.
2. En **Selección de modelo**, elija un modelo de muestra compatible si hay alguno disponible. Para su propio modelo, use **Editar**, elija una ranura libre y elija **Cargar**. Seleccione **RVC** cuando el cuadro de diálogo solicite un tipo de modelo. Proporcione el archivo de inferencia aceptado por su versión y un índice coincidente opcional. Espere la carga y luego seleccione el espacio lleno en la vista principal.
3. En los controles de audio, elija **Cliente** para una primera prueba del lado del navegador. Selecciona el nombre exacto del micrófono físico y el nombre exacto de los auriculares. Si el navegador solicita permiso, permita el acceso al micrófono para la página local.
4. Desactive el paso a través, deje el tono y el índice en cero y mantenga el fragmento, el contexto, el fundido cruzado y el estimador de tono predeterminados. Si importó un índice, puede evaluarlo después de escuchar la línea de base.
5. Presione **Iniciar**, espere a que el modelo se caliente y hable durante al menos 30 segundos. Incluya una oración tranquila, una oración normal, una frase más alta y una breve pausa. Con la conversión habilitada, deberías escuchar la voz seleccionada. Presione **Detener** cuando realice cambios que requieran reiniciar la transmisión.
6. Si escucha silencio, pruebe los mismos dispositivos en una grabadora simple. Si escucha su voz original dos veces o la escucha junto con la conversión, desactive el monitoreo directo del micrófono en su interfaz o elimine la ruta de software duplicada.

## Comprender el modo de dispositivo cliente y servidor

**Cliente** utiliza dispositivos disponibles para el cliente/navegador. Los permisos del micrófono y la selección de salida del navegador pueden afectar la lista de dispositivos. **Servidor** abre dispositivos en la computadora que ejecuta el motor de conversión. Esto es importante en dos computadoras: un micrófono USB conectado al cliente no aparece automáticamente en el servidor.

En una PC, pruebe primero la ruta del cliente más simple. Cambie a Servidor si su compilación expone un monitor separado o el navegador no puede seleccionar el punto final de salida deseado. En el modo Servidor, elija la API del host y los nombres de los dispositivos que ofrece el servidor. Si varias entradas comparten un nombre, intente usar la misma API de audio para entrada y salida. Una vez que la señal sea estable, puedes probar alternativas para determinar la latencia.

## Envíe la conversión a Discord, OBS u otra aplicación

1. Instale un cable virtual para su sistema operativo y vuelva a abrir ambas aplicaciones para que se actualicen sus listas de dispositivos. Debería exponer un punto final de reproducción y un punto final de grabación correspondiente.
2. Configure la entrada VCClient al micrófono físico. Configure la salida del convertidor al punto final de **reproducción** del cable. Con VB-CABLE, esto suele ser **Entrada de CABLE**.
3. Si la aplicación expone un dispositivo **Monitor** separado, configúrelo en los auriculares. Deje los parlantes de la aplicación de destino en los auriculares.
4. Seleccione el punto final de **grabación** del cable como micrófono de destino. Con VB-CABLE, eso comúnmente es **Salida CABLE**. En OBS, seleccione ese dispositivo para la captura de entrada de audio y silencie cualquier segunda captura del micrófono físico.
5. Utilice una llamada de prueba o realice una breve grabación local en la aplicación de destino. Pruebe el habla en voz baja y alta. Confirme que detener VCClient o silenciar la fuente convertida hace que su medidor se detenga. Si continúa, el objetivo tiene otra entrada activa o está recibiendo una ruta no deseada.
6. Compare la activación y desactivación de la supresión de ruido del destino o la ganancia automática solo si el convertidor suena bien localmente y el objetivo corta sílabas o cambia el nivel. Conserve las opciones que funcionen para su habitación y micrófono.

```text
Physical microphone → VCClient → cable playback → cable recording → call or recorder
                           └── optional monitor → headphones
```

## Ajusta una configuración que ya funciona

Comience desde el fragmento predeterminado y pruebe con su carga de trabajo real. Cuando la interfaz de usuario muestre la duración del fragmento y el tiempo de conversión, compárelos en unidades coincidentes. Cada bloque necesita tiempo suficiente para terminar. Deje margen para picos mientras ejecuta un juego o transmite. Reduzca la porción paso a paso y esté atento a los abandonos antes de conservar el cambio. Si se cortan palabras, auméntelas nuevamente o reduzca el contexto adicional. El fundido cruzado ayuda a suavizar los límites pero también consume parte del presupuesto de procesamiento disponible.

Elija un estimador de tono que maneje su rango de habla normal. Compara la misma frase en cada escenario. El tono cambia el registro, mientras que la combinación de índices cambia en qué medida la inferencia utiliza las características recuperadas del índice de entrenamiento coincidente. Aumente cualquiera de ellos gradualmente y registre el resultado. Mantenga estables la ganancia del modelo y del micrófono durante la comparación.

| Síntoma | Prueba específica |
| --- | --- |
| La voz original llega a la llamada | Desactiva el paso y elige el cable como único micrófono en la aplicación receptora. |
| La distorsión ya está presente en la grabación del micrófono simple. | Baje la ganancia de entrada física antes de sintonizar el modelo. |
| La primera sílaba desaparece después de una pausa | Compara el umbral de entrada y la activación por voz de destino. Pruebe una grabación con la activación por voz desactivada para aislar el escenario. |
| El monitor local está bien, pero el audio del cable cruje. | Haga coincidir las frecuencias de muestreo admitidas en el panel de sonido del sistema operativo y vuelva a abrir ambas transmisiones. Busque una segunda aplicación que mantenga el punto final en modo exclusivo. |
| La conversión de GPU falla y la CPU funciona | Verifique el paquete seleccionado, el formato del modelo y el proveedor de computación por separado. Pruebe con el mismo modelo que funciona en cada dispositivo. |
| La conversión se retrasa cuando se abre un juego | Aumente el tamaño del fragmento o reduzca la carga de trabajo de la GPU de la competencia. Repita una grabación más larga antes de transmitirla en vivo. |

Mantenga el nombre del paquete de trabajo, el modelo, el modo de audio, los nombres de los dispositivos, el método de tono y los controles del búfer en una nota. Esto le brinda una base confiable después de una actualización de software o dispositivo.
