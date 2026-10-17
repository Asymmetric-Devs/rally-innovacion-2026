# Video PolliNode: notas de producción

Rama de trabajo: `video-dosel`. Estilo: la identidad de **Dosel en tono claro** (fondo crema liso, sin rejilla ni numeración de escenas; verde bosque para texto, lima como marcador, menta, coral; titulares gruesos con marcador, etiquetas mono, marcos tipo visor) sobre las ilustraciones de abejas, árboles, islas y mapas. Las ramas anteriores (`video-spiderverse` con cómic y `video-minimal` con serif sobre papel) quedaron como referencia.

## Cómo verlo
```bash
cd video
npx hyperframes preview --background   # abre el Studio en http://localhost:3002
npx hyperframes check                  # lint + layout + contraste (debe dar "Check passed")
npx hyperframes render --quality draft -o renders/pollinode-borrador.mp4   # borrador para revisar
npx hyperframes render                 # versión final (solo con el visto bueno del equipo)
```

## Línea de tiempo (119,65 s; el límite del rally es 2:00)
Las voces están aceleradas 1,10x (`atempo`, mismo tono) y empiezan 0,3 s después del inicio de su escena. Los originales sin acelerar están en `assets/vo-original-velocidad/`.

| Escena | Archivo | Desde | Dur. | Audio |
|---|---|---|---|---|
| 1 Gancho | `compositions/s1-hook.html` | 0:00 | 6,7 s | `vo1-gancho` |
| 2 Los polinizadores | `compositions/s2b-polinizadores.html` | 0:06,7 | 22,3 s | `vo2b-polinizadores` |
| 3 Problema | `compositions/s2-problema.html` | 0:29 | 15,7 s | `vo2-problema` |
| 4 Solución | `compositions/s3-islas.html` | 0:44,7 | 16,4 s | `vo3-solucion` |
| 5 Pizarrón | `compositions/s4-pizarron.html` | 1:01,1 | 22,5 s | audio de la toma (18,5 s) + repaso animado de 4 s |
| 6 Tecnología | `compositions/s5-tecnologia.html` | 1:23,6 | 16,7 s | `vo5-tecnologia` |
| 7 Impacto | `compositions/s6-impacto.html` | 1:40,3 | 10,75 s | `vo6-impacto` |
| 8 Cierre | `compositions/s7-cierre.html` | 1:51,05 | 8,6 s | `vo7-cierre` |

Los nombres de archivo no siguen el orden (se agregó una escena en el medio). Los tiempos están en `index.html` (escenas, `<audio>`, cortinas `[6.7, 29, 44.7, 61.1, 83.6, 100.3, 111.05]`, arreglo `S` y volumen de la música). Las escenas con voz usan `PN.timeline()` (en `kit.js`), que comprime la animación escrita para la voz sin acelerar: tiempo local = 0,3 + (t - 0,5) / 1,1. Se escribe como siempre (voz + 0,5 s) y se registra con `PN.raw(tl)`.

## Audio
- `assets/vo/*.m4a`: las siete voces en off, a partir de los audios originales de WhatsApp. Filtro de graves, reducción de ruido de voz (RNNoise), compresión suave, volumen a -16 LUFS y aceleración 1,10x y **fundidos de 0,15 s al entrar y 0,4 s al salir** para que no se noten cortes entre voces.
- `assets/pizarron.mp4`: la toma **completa** (18,5 s, con la charla del grupo al principio). Audio rehecho con RNNoise completo, ecualización suave, -16 LUFS y fundidos de entrada y salida.
- `assets/music/dreamy-flashback.m4a`: música de fondo muy baja (volumen 0,13; baja a 0,05 durante la toma del pizarrón, donde ya hay voz en vivo). Recortada a 119,4 s; fundidos de 3 s al entrar y 6 s al salir. El volumen se automatiza con `data-automation` en el `<audio id="music">` de `index.html`.
- **Crédito obligatorio de la música** (licencia CC BY 4.0): "Dreamy Flashback" de Kevin MacLeod (incompetech.com). Ya aparece en la placa final y está en `assets/music/CREDITOS.txt`. Si la placa se rehace, mantener el crédito.

## Paleta y tipografías
- Fondo crema `#f2f6e6`, panel `#e6eed4`, tarjeta `#fbfdf4`, línea `#c5d1b1`, tinta verde bosque `#12301f`, salvia `#5a7564`, lima `#c8f25c` (marcador; `#8cc21f` y `#4f8a0b` para rellenos y textos), menta `#138a5f`, miel `#f5b83d`, coral `#ff7a5c`, y tonos de follaje `#123524`, `#1d5c3e`, `#2f7d4f`, `#54a36a`.
- Titulares: **Montserrat** negra con tracking apretado y marcador lima en la palabra clave. Etiquetas: **IBM Plex Mono**. Estilos compartidos en `style.css`; ilustración en `kit.js`.

## Logo
Baldosa lima con una abeja vista desde arriba hecha de píxeles (inspirado en el logo de Dosel) y el nombre en Montserrat negra. En el video está en HTML en la escena 7 (la abeja se arma píxel por píxel). Versiones en imagen: `assets/logo.png` y `logo-pollinode.png` en la raíz del repo.

## La toma del pizarrón
Como la cámara se mueve durante la toma, no hay marcas pegadas al dibujo mientras él habla: solo subtítulos (desde que empieza a hablar del tema; la charla del grupo del principio queda sin subtítulos) y una etiqueta. Al terminar se congela el último cuadro (`assets/pizarron-last.jpg`, que sí está quieto) y se lo repasa con líneas limpias.

Para cambiar la toma: reemplazar `assets/pizarron.mp4`, sacar de nuevo el último cuadro (`ffmpeg -sseof -0.04 -i assets/pizarron.mp4 -frames:v 1 -q:v 2 assets/pizarron-last.jpg`), ajustar `data-duration` del `<video>` y los tiempos de subtítulos y del repaso (`T0`) en `s4-pizarron.html`. Las posiciones del repaso están en píxeles sobre el último cuadro actual.

## Pendiente
- Revisión del equipo del borrador y ajustes de texto.
- Cifras sin fuente (40% de rinde, 45 USD por nodo, 80 kg N/ha): no están en el video y no deben entrar sin respaldo.
