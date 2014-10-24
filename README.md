Automatas
=========

Libreria para testear Gramáticas. Hasta ahora sólo de Lenguajes Sensibles al Contexto.

***Nota:*** *Sólo funciona con [Harmony activado](http://blog.chromium.org/2012/02/future-of-javascript-take-peek-today.html). Estoy usando Sets*

### Bugs
- Agregar validación para reglas de producción que se invocan mutuamente porque no es detectable una vez que arranque la generación, con el approach actual. Termina en un loop que cuelga el browser.
