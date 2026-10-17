# Video PolliNode: notas de producción

Rama de trabajo: `video-dosel`. Estilo: la identidad de **Dosel** (bosque oscuro, lima, menta, coral; titulares gruesos con marcador, etiquetas mono, marcos tipo visor) sobre las ilustraciones de abejas, árboles, islas y mapas. Las ramas anteriores (`video-spiderverse` con cómic y `video-minimal` con serif sobre papel) quedaron como referencia.

## Cómo verlo
```bash
cd video
npx hyperframes preview --background   # abre el Studio en http://localhost:3002
npx hyperframes check                  # lint + layout + contraste (debe dar "Check passed")
npx hyperframes render --quality draft -o renders/pollinode-borrador.mp4   # borrador para revisar
npx hyperframes render                 # versión final (solo con el visto bueno del equipo)
```

## Línea de tiempo (110 s)
Cada escena dura lo que su voz más un respiro. Las voces empiezan 0,5 s después del inicio de su escena.

| Escena | Archivo | Desde | Dur. | Audio |
|---|---|---|---|---|
| 1 Gancho | `compositions/s1-hook.html` | 0:00 | 8 s | `vo1-gancho` |
| 2 Problema | `compositions/s2-problema.html` | 0:08 | 18 s | `vo2-problema` |
| 3 Solución | `compositions/s3-islas.html` | 0:26 | 18,5 s | `vo3-solucion` |
| 4 Pizarrón | `compositions/s4-pizarron.html` | 0:44,5 | 25 s | audio de la toma (18,5 s) + repaso animado (6,5 s) |
| 5 Tecnología | `compositions/s5-tecnologia.html` | 1:09,5 | 19 s | `vo5-tecnologia` |
| 6 Impacto | `compositions/s6-impacto.html` | 1:28,5 | 12,5 s | `vo6-impacto` |
| 7 Cierre | `compositions/s7-cierre.html` | 1:41 | 9 s | `vo7-cierre` |

Los tiempos están en `index.html` (`data-start` y `data-duration` de cada escena y cada `<audio>`, la lista de cortinas `[8, 26, 44.5, 69.5, 88.5, 101]` y el arreglo `S` de la cabecera). Si cambia la duración de una escena hay que mover las siguientes en esos tres lugares. Dentro de cada escena la animación está sincronizada con las palabras de su voz (tiempo de escena = tiempo de la voz + 0,5).

## Audio
- `assets/vo/*.m4a`: las seis voces en off, a partir de los audios originales de WhatsApp. Filtro de graves, reducción de ruido de voz (RNNoise), compresión suave, volumen a -16 LUFS y **fundidos de 0,18 s al entrar y 0,45 s al salir** para que no se noten cortes entre voces.
- `assets/pizarron.mp4`: la toma **completa** (18,5 s, con la charla del grupo al principio). Audio rehecho con RNNoise completo, ecualización suave, -16 LUFS y fundidos de entrada y salida.
- `assets/music/dreamy-flashback.m4a`: música de fondo muy baja (volumen 0,13; baja a 0,05 durante la toma del pizarrón, donde ya hay voz en vivo). Va con fundidos de 3 s al entrar y 6 s al salir. El volumen se automatiza con `data-automation` en el `<audio id="music">` de `index.html`.
- **Crédito obligatorio de la música** (licencia CC BY 4.0): "Dreamy Flashback" de Kevin MacLeod (incompetech.com). Ya aparece en la placa final y está en `assets/music/CREDITOS.txt`. Si la placa se rehace, mantener el crédito.

## Paleta y tipografías
- Bosque `#0a1a13`, superficie `#112419`, línea `#223c2d`, tinta `#eef3e4`, salvia `#9db3a4`, lima `#c8f25c`, menta `#6ee7b7`, miel `#f5b83d`, coral `#ff7a5c`, y tonos de follaje `#123524`, `#1d5c3e`, `#2f7d4f`, `#54a36a`.
- Titulares: **Montserrat** negra con tracking apretado y marcador lima en la palabra clave. Etiquetas: **IBM Plex Mono**. Estilos compartidos en `style.css`; ilustración en `kit.js`.

## Logo
Baldosa lima con una abeja vista desde arriba hecha de píxeles (inspirado en el logo de Dosel) y el nombre en Montserrat negra. En el video está en HTML en la escena 7 (la abeja se arma píxel por píxel). Versiones en imagen: `assets/logo.png` y `logo-pollinode.png` en la raíz del repo.

## La toma del pizarrón
Como la cámara se mueve durante la toma, no hay marcas pegadas al dibujo mientras él habla: solo subtítulos (desde que empieza a hablar del tema; la charla del grupo del principio queda sin subtítulos) y una etiqueta. Al terminar se congela el último cuadro (`assets/pizarron-last.jpg`, que sí está quieto) y se lo repasa con líneas limpias.

Para cambiar la toma: reemplazar `assets/pizarron.mp4`, sacar de nuevo el último cuadro (`ffmpeg -sseof -0.04 -i assets/pizarron.mp4 -frames:v 1 -q:v 2 assets/pizarron-last.jpg`), ajustar `data-duration` del `<video>` y los tiempos de subtítulos y del repaso (`T0`) en `s4-pizarron.html`. Las posiciones del repaso están en píxeles sobre el último cuadro actual.

## Pendiente
- Revisión del equipo del borrador y ajustes de texto.
- Cifras sin fuente (40% de rinde, 45 USD por nodo, 80 kg N/ha): no están en el video y no deben entrar sin respaldo.
