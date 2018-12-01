# Documentación Cambalache
## Awebxis Sánchez

![Cambalache Logo](https://i.imgur.com/iD1XXEO.png)

| Name             | Github                                           | Email             |
|--------------------|--------------------------------------------------|-------------------|
| José Manuel Comber | [@jmcomber](https://github.com/jmcomber)         | jmcomber@uc.cl    |
| Raimundo Herrera   | [@rjherrera](https://github.com/rjherrera)       | rjherrera@uc.cl   |
| Javier López       | [@javierlopeza](https://github.com/javierlopeza) | javierlopez@uc.cl |

**Ayudante: Daniela Vásquez**


## Introducción


Dentro de este mundo diverso, existen puntos en común entre nosotros. Alrededor de estos tópicos de encuentro es que se forman comunidades donde sus individuos son acogidos, comprendidos y escuchados. Esto ocurre con muchos temas y, entre ellos, ocurre con la lectura. Así, la comunidad de lectores siempre ha buscado lugares donde conocer más libros, recibir recomendaciones y compartir intereses (y, como veremos, algo más tangible que intereses).

Sin embargo, los libros son posesiones muy preciadas que una vez leídos se convierten en objetos inertes y meramente decorativos. Eso para su dueño, claro: para otra persona podría ser justo el libro que estaba buscando leer. Así nace Cambalache, como un lugar de encuentro donde puedas encontrar el siguiente libro que quieras leer y... conseguirlo. Sin gastar dinero. Simplemente intercambias algún libro que ya hayas leído por uno que quieras leer, formando una cadena cooperativa de trueques solo limitada por tu capacidad de devorar libros.

Solo como nota explicativa, una edición particular de un libro tiene un identificador único conocido como [ISBN](https://es.wikipedia.org/wiki/ISBN). Este permitió  consumir y exponer una API transparentemente. Esto además colabora para el uso de la plataforma, ya que los usuarios comprenden cabalmente de qué libro se está hablando.

---

Una vez registrado y verificada la cuenta de correo, puedes empezar a explorar la plataforma. Hay dos principales formas de navegar la aplicación:

### Libros

Buscando libros que tengas, y buscando libros que quieras. Todo esto en la pestaña **_Books_** que se muestra en la siguiente imagen:

![Vista books](https://i.imgur.com/PxZXQZq.jpg)

Ya sea utilizando la barra de búsqueda o vagabundeando por la aplicación encontraste un libro que quieres o tienes: pulsas en su *card*, y ves algo como lo siguiente:

![Perfil book](https://i.imgur.com/SL2VgA8.jpg)

Aquí puedes ver más detalles del libro, como una descripción, el *rating* dado del libro en *Goodreads* (obtenido al consumir la [API](https://www.goodreads.com/api) expuesta por Goodreads), y las reseñas que hayan escrito personas de la plataforma. Aquí podrás pulsar los botones *Want it* o *Have it* para indicar si quieres o tienes el libro, respectivamente. Toda esta información se ve reflejada en tu perfil, al que puedes acceder a través de la barra de navegación.

### Usuarios

Buscando amigos, conocidos o usuarios que te interesen. Todo esto en la pestaña **_Users_** que se muestra en la siguiente imagen:

![Vista usuarios](https://i.imgur.com/HSNuR75.jpg)

Ya sea utilizando la barra de búsqueda o vagabundeando por la aplicación encontraste un usuario que te interesa: pulsas en su *card*, y ves algo como lo siguiente:

![Perfil usuario](https://i.imgur.com/QyvX0yn.jpg)

Acá puedes decidir seguir al usuario, ver qué libros tiene, qué libros quiere y los *feedbacks* recibidos por otros usuarios de la página (donde relatan cómo les fue intercambiando un libro con el usuario).

Y, si ves que él tiene un libro que te interesa, ¡propónle un intercambio! Debajo del libro que te interesa, selecciona el libro que le quieres ofrecer a cambio, y pulsa *Propose exchange*. Al usuario le llegará un correo alertándole de esta nueva propuesta, y le aparecerá en su perfil.

Si fueras a ingresar a tu propio perfil de usuario, verías algo como lo siguiente:

![Perfil propio](https://i.imgur.com/ADDJvJS.jpg)

Tendrás las propuestas que has enviado (que puedes cancelar antes de que la acepte o rechace el otro usuario), las que has recibido (que podrás aceptar o rechazar), el interés suscitado por los libros que tú tienes, y un listado gráfico de los títulos que tienes y quieres.


## Modelo de datos
Aquí se presenta una visualización del modelo de datos que rige a la aplicación, a través de un diagrama Entidad - Relación.

![Entidad relación](https://i.imgur.com/udU1BKj.png)


## *Features* principales

## React

Se *reactizaron* varios componentes de la aplicación, a modo de dar un *feel* más natural y *responsive*. Estos fueron los botones de *Want it* y *Have it* en el perfil de los libros, el botón *Follow* (y la cuenta de seguidores aledaña) en el perfil de los usuarios y los "cuadrantes" de *Pending proposals*, *People looking for your books*, *Want* y *Own* en el perfil propio. Este último, por ejemplo, permite aceptar una propuesta y ver el cambio reflejado en tu biblioteca instantáneamente.

## API

Se privilegió el uso de rutas expresivas en toda la aplicación. Para las rutas de los libros se utilizó como identificador su [ISBN](https://en.wikipedia.org/wiki/International_Standard_Book_Number) (e.g., [/books/9780345300782](http://cambalache.herokuapp.com/books/9780345300782)). Mientras que para las rutas de autores y géneros se utilizaron sus nombres en *[kebab-case](http://wiki.c2.com/?KebabCase)* como sus identificadores (e.g., [/authors/albert-einstein](http://cambalache.herokuapp.com/authors/albert-einstein), [/genres/british-literature](http://cambalache.herokuapp.com/genres/british-literature)).

*Disclaimer*: En algunos *requests* GET existen parámetros *page* y *q*. Estos hablan de paginación y de filtro de búsqueda, y ambos son opcionales.

| Method | URL                              | Request Example (body or params)                                                                                                                                                                                                                                       | Response Example                                                                                                          |
|--------|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| POST   | auth/                            | {email: 'user@service.cl', password:'secret101'}                                                                                                                                                                                                                       | <token>                                                                                                                   |
| GET    | authors/                         | ?page=&q=rowling                                                                                                                                                                                                                                                       | {"authors": [{"id": 223,,"name": "J.K. Rowling", "kebabName": "j-k-rowling", ...,  "books": [...]}                        |
| POST   | authors/                         | {name: 'Alejandro Zambra'}                                                                                                                                                                                                                                             | {"id": 431, "name": "Alejandro Zambra", ...}                                                                              |
| PATCH  | authors/:kebab-name              | {name: 'Alejandro E. Zambra'}                                                                                                                                                                                                                                          | {"id": 431, "name": "Alejandro E. Zambra", ...}                                                                           |
| GET    | authors/:kebab-name              | -                                                                                                                                                                                                                                                                      | {author: {id: 13, ...}, books: [{isbn: ....}, ...]}                                                                       |
| DELETE | authors/:kebab-name              | -                                                                                                                                                                                                                                                                      | {deleted: true}                                                                                                           |
| GET    | books/                           | ?page=2&q=                                                                                                                                                                                                                                                             | {"books": [{isbn: ...}, ...]}                                                                                             |
| GET    | books/random                     | -                                                                                                                                                                                                                                                                      | {book: {isbn: ...}}                                                                                                       |
| POST   | books/                           | {isbn: '987654321', language: 'English', pages: 343,  title: 'Dreaming of dogs', author: 'Edward Snowden',  publisher: 'Penguin Books', datePublished: '29-06-1998', format: 'paperback', description: 'Once upon a time...',  genres: [3, 4, 5]} | {book: {isbn: ...}}                                                                                                       |
| PATCH  | books/:isbn                      | {author: 'New Author', genres: [4, 6, 7]}                                                                                                                                                                                                                          | {book: {isbn: ...}}                                                                                                       |
| GET    | books/:isbn                      | -                                                                                                                                                                                                                                                                      | {book: {isbn: ...}}                                                                                                       |
| DELETE | books/:isbn                      | -                                                                                                                                                                                                                                                                      | {deleted: true}                                                                                                           |
| GET    | users/:username/followers        | -                                                                                                                                                                                                                                                                      | {followers: [{id: 7, username: 43, ...}, ...]}                                                                            |
| GET    | users/:username/following        | -                                                                                                                                                                                                                                                                      | {following: [{id: 7, username: 43, ...}, ...]}                                                                            |
| GET    | users/:follower/follow/:followee | -                                                                                                                                                                                                                                                                      | {follow: false}                                                                                                           |
| POST   | users/:follower/follow/:followee | -                                                                                                                                                                                                                                                                      | {isFollowing: true}                                                                                                       |
| DELETE | users/:follower/follow/:followee | -                                                                                                                                                                                                                                                                      | {isFollowing: false}                                                                                                      |
| GET    | users/:username/interests        | -                                                                                                                                                                                                                                                                      | {interests: [{id: 43}, ...]}                                                                                              |
| GET    | users/:username/interests/other  | -                                                                                                                                                                                                                                                                      | {interests: [{id: 43, bookId: 32}, ...]}                                                                                  |
| GET    | users/:username/possessions      | -                                                                                                                                                                                                                                                                      | {possessions: [{id: 54, bookId: 78}, ...]}                                                                                |
| GET    | users/:username/proposers        | -                                                                                                                                                                                                                                                                      | {proposers: [{id: 14, ...}, ...]}                                                                                                      |
| GET    | users/:username/proposing        | -                                                                                                                                                                                                                                                                      | {proposing: [{id: 12, ...}, ...]}                                                                                                      |
| GET    | genres/                          | -                                                                                                                                                                                                                                                                      | {genres: [{id:1, name: 'Horror', ...}, ...]}                                                                              |
| PATCH  | genres/:id                       | {id: 1, name: 'Terror'}                                                                                                                                                                                                                                                | {genre: {id: 1, ...}}                                                                                                     |
| GET    | genres/:kebab-name               | -                                                                                                                                                                                                                                                                      | {genre: {id: 1, ...}}                                                                                                     |
| DELETE | genres/:id                       | -                                                                                                                                                                                                                                                                      | {deleted: true}                                                                                                           |
| GET    | instances/:username/:book        | -                                                                                                                                                                                                                                                                      | {id: 34}                                                                                                                  |
| POST   | matches/new                      | {proposerBookInstanceId: 12, proposeeBookInstanceId: 56}                                                                                                                                                                                                               | {match: {proposerBookInstance: {id: 12, bookId: 43, userId: 5},  proposeeBookInstance: {id: 56, bookId: 71, userId: 99}}} |
| PATCH  | matches/:id                      | -                                                                                                                                                                                                                                                                      | {match: {..., accepted: true}}                                                                                            |
| DELETE | matches/:id                      | -                                                                                                                                                                                                                                                                      | {deleted: true}                                                                                                           |
| POST   | reviews/:isbn                    | {rating: 4, comment:'Great book, filled with suspense...'}                                                                                                                                                                                                             | {book: {isbn: ...}, review: {id: ...}}                                                                                    |


## Testing

![Statement coverage](https://i.imgur.com/0DQBeYs.png)


Para corroborar la correctitud de las porciones críticas del código (como las rutas, los modelos y ciertas *utilities*) se crearon tres *test suites* en *Jest*: `routes`, `routes-logged`, y `models`. En conjunto, logran un *Statement coverage* de un **67%** con sus 35 tests. Para esto debió hacerse un *mock* del objeto `ctx` para no afectar la cadena de *middlewares* de Koa solamente para el testing.

## Seeds

Para el desarrollo, *testing* y demostración de la aplicación en producción, se utilizaron datos reales de libros obtenidos del sitio [Goodreads](https://www.goodreads.com/). Con una serie de *scripts* de [*web-scraping*](https://en.wikipedia.org/wiki/Web_scraping) se lograron obtener un total de más de 4000 libros, con sus respectivos autores, una lista de hasta 10 de los géneros literarios más asociados a cada uno, más de 30 *reviews* escritas por usuarios reales e información detallada del libro (como su descripción, imagen de portada, número de páginas, entre otros).

Los *scripts* escritos para obtener estos datos los hemos dejado disponibles de manera *open-source* en [este repositorio](https://github.com/javierlopeza/books_scraper).

## *Storage*

Para el manejo de archivos (principalmente las fotos de perfil de los usuarios), se utilizaron dos tecnologías: [Amazon S3](https://aws.amazon.com/es/s3/) para producción, y para ejecutar la aplicación en local en desarrollo se ocupó [Minio](https://www.minio.io/). Esto permitió un desarrollo fluido con mínimo esfuerzo de *deployment* en este ítem.

## *Mailers*

La aplicación envía un *email* de verificación de cuenta de correo al registrarse. Una vez validada esta, se permite el ingreso a Cambalache.

![Activation email](https://i.imgur.com/lAtIKFb.jpg)


Los otros correos que son enviados son de aviso cuando te llega una nueva propuesta, y cuando una propuesta que hayas enviado es aceptada.

Por otra parte, existe en el *footer* un vínculo a un *form* para enviar sugerencias de libros a agregar a la plataforma. Esta sugerencia se le envía a todos los usuarios administradores de Cambalache.

Un último *mailer* que se implementó es el de una *newsletter*, que corre con un *cron job* configurado cada 15 días a todos los usuarios, donde se muestran los nuevos títulos que han sido añadidos a al plataforma en las últimas semanas.

## Extensión Google Chrome

Cambalache ofrece una API REST que puede ser utilizada por otras aplicaciones. Se desarrolló una pequeña aplicación en la forma una extensión para Google Chrome para probar la API ofrecida.

Esta extensión esta publicada en *chrome web store* y puede ser instalada desde [aquí](https://chrome.google.com/webstore/detail/cambalache/gcigfkfnjgdlhgghbkeenkemjacddjbf).

Al igual que todo el código desarrollado en Cambalache, la extensión construida está disponible de manera *open-source* en [este repositorio](https://github.com/javierlopeza/cambalache-chrome-extension).

## Buenas prácticas

Se siguió un *gitflow* para asegurar buenas prácticas: cada *feature* en una *branch*, a la que se hacía una *Pull Request* que debía ser aprobada por al menos un otro miembro del equipo. Al crear ese *Pull Request*, automáticamente se creaba y provisionaba una [*Review App*](https://devcenter.heroku.com/articles/github-integration-review-apps), con todo lo necesario para poder revisar los cambios de esa rama. Luego se hacía *merge* a *master* (la que se deployaba automáticamente a cambalache-staging.herokuapp.com). Una vez listo para lanzarse a producción, se hacía un *merge* hacia *production*, la que se deployaba a su vez a cambalache.herokuapp.com.

Por otra parte, los mensajes de los *commits* siguieron un estilo definido que permitía entender inmediatamente su objetivo atómico. Por ejemplo, *commits* con mensajes del estilo *feat(books): add ISBN validation to new book form*. La primera palabra indicia si es un *feature*, un *fix* o un *chore*. La palabra entre paréntesis indica la entidad o contexto sobre la que se aplica el cambio, y la frase en inglés con un verbo en presente da mayores detalles de lo realizado.



## Posibles pasos a seguir

1. Sistema de sugerencias de intercambio con modelo de optimización o heurístico, ejecutado como *non-blocking child process*.
2. Crear boletines informativos curados específicamente para el usuario: de acuerdo a actividad de los usuarios a los que sigue y los géneros en los que ha manifestado mayor interés.
3. Agregar más *modals* que permitan al usuario ingresar más información o controlar su navegación sin tener que navegar a una parte distinta de la aplicación, siguiendo como base el que se implementó para mostrarle al usuario en su perfil quiénes están interesados en sus libros.
