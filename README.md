# Sorpresa de disculpas 💗

Página responsive hecha con HTML, CSS y JavaScript puro, lista para GitHub Pages.

## Imágenes diferentes para cada mensaje

Guarda tus propias imágenes en `img/` con estos nombres exactos:

- `inicio.jpg` — pregunta inicial: «¿Podríamos no estar así… piénsalo? 🥺»
- `segura.jpg` — «¿Segura que no? 🥺»
- `poquito.jpg` — «¿Ni un poquito? 💗»
- `corazon-roto.jpg` — «Me vas a romper el corazón 💔»
- `oportunidad.jpg` — «Dame una oportunidad 💗»
- `intentarlo.jpg` — «¿Y si lo intentamos? 🌷»
- `final.png` — ilustración alegre de un chico saltando de felicidad; al pulsar «Sí» también aparecen fuegos artificiales animados. Puedes reemplazarla por otra imagen.

Puedes usar JPG, PNG o WEBP. Si usas otra extensión, cambia también la ruta correspondiente en `script.js` (y en `index.html` para `final.png`).

Si todavía no colocas una de las imágenes, aparecerá un espacio reservado con el nombre del archivo que falta. No es obligatorio tenerlas todas para probar la página.

## Comportamiento

- Cada clic en «No» cambia el texto y la imagen.
- El botón «No» se encoge progresivamente hasta desaparecer.
- «Sí» abre el mensaje final.
- «Volver al inicio 😊» restablece la pregunta, imagen y botones.

## Probar localmente

Abre `index.html` en el navegador.

## Publicar en GitHub Pages

Sube todos los archivos y la carpeta `img` a un repositorio público. Luego entra a Settings → Pages → Deploy from a branch, selecciona `main` y `/ (root)`.
