# mongoapp-curso-docker-main

Docker

## Que es docket

Una tecnologia para encapsular dependencias, proyectos, archivos de configuracion y mas apartados que permiten que un pryecto corra correctamente

## Nociones basicas

- Docker es una especie de maquina virtual que usa el mismo kernel de nuestro sistema operativo para instanciar diferentes areas de trabajo
- Nuestra maquina anfitrion, fisica o host, corre esta maquina virtual y en esta maquina virtual pueden existir diferentes redes, cada red agrupa uno o varios contenedores y cada contenedor agrupa diferentes imagenes
- Una imagen es una dependencia, o archivo de configuracion, o proyecto, etc.
- Un contenedor es la agrupacion de diferentes imagenes que forman por ejemplo una dependencia, la dependencia de node.
- Todos los contenedores en una red se comunican entre si y pueden existir varias redes en nuestro host
- Los Docker se almacenan en plataformas privadas o publicas, una publica es Docker Hub, donde existen imagenes y contenedores ya creados que podemos usar para correr nuestras aplicaciones.
- Necesitamos tener Docker Desktop corriendo para abrir el CLI y ejecutar nuestros comandos
- En la carpeta del proyecto con el comando $ ls -> podemos visualizar por consola los archivos de esta fichero

## Instalacion

- Se requiere Docker Desktop el cual es una interfaz visual y un conjunto de herramientas para empezar a crear y gestionar nuestros contenedores
- Docker Desktop contiene Docker Compose que es el CLI donde correremos nuestros comandos
- Docker Hub es la pagina donde estara toda la documentacion para instalar y descargar nuestras dependencias, cada una se instala de forma diferente depende como se explique en la pagina

## Comandos imagenes

- $ docker images -> muestra todas las imagenes descargadas
- $ docker pull nombre_dependencia -> descarga la ultima imagen de la dependencia. Ej: $ docker pull node
- $ docker pull nombre_dependencia:version -> descarga una imagen con la version de la dependencia solicitada. Ej: $ docker pull node:18
- $ docker image rm nombre_dependencia -> elimina imagen. Ej: $ docker image rm node:18

## Comandos contenedores

- $ docker create nombre_imagen ó $ docker container create nombre_imagen ó $ docker create --name name_contenedor nombre_imagen ó $ docker create -p00000:00000 --name name_contenedor nombre_imagen -> esto nos regresa un id para el contenedor creado, la variable nombre_imagen, es la misma que nuesto nombre_dependencia con su respectiva version de ser el caso, la variable name_contenedor es el nombre del contenedor que estamos creando, si el comando -p tiene dos numeros, el primer numero es el puerto de nuestra maquina y el segundo numero el puerto de la maquina virtual que expone el contenedor para conectarse a el, si el comando -p tiene un solo numero (-p00000) este hace referencia al nombre del puerto que expone el contenedor y la maquina automaticamente captura un puerto de nuestro host para referenciarlo a ese puerto expuesto
- $ docker star id_contenedor -> ejecuta y pone a correr el contenedor especificado
- $ docker ps -> muestra los contenedores corriendo
- $ docker stop id_contenedor ó id_abreviado_contenedor ó name_contenedor -> detiene el docker especificado
- $ docker ps -a -> muestra todos los contenedores creados, asi esten corriendo o no
- $ docker rm id_nombre_abreviacion_contenedor -> elimina el contenedor en cuestion
- $ docker logs id_abreviado_contenedor -> muestra el log del contenedor actual y se detiene la escucha al log
- $ docker logs --follow id_abreviado_contenedor -> muestra el log del contenedor actual y se queda escuchando actualizaciones
- $ docker run nombre_imagen -> crea el contenedor en caso de encontrar la imagen y si no encuentra la imagen la descarga y lanza el contenedor, dejandonos en una escuha activa del log
- $ docker run -d nombre_imagen -> igual que sin el comando -d, pero nos regresa el id y no nos deja en escucha activa del log
- $ docker run --name name_contenedor -p00000:00000 -d nombre_imagen -> crea un contenedor con las configuraciones especificas y la ejecuta
- Un ejemplo para configurar un contenedor seria: $ docker create -p23400:23400 --name monguito -e MONGO_INITDB_ROOT_USERNAME=nico -e MONGO_INITDB_ROOT_PASSWORD=password mongo -> las variables posteriores a la regla -e (significa variable de entorno), son explicadas en la documentacion de Docker Hub
- $ docker create -p00000:00000 --name name_contenedor --network nombre_red nombre_imagen -> esto crea un contenedor dentro de una red, en caso de que se quieran añadir mas argumentos como en el ejemplo para crear un contenedor de la imagen de mongo, estos argumentos se añaden entre nombre_red y nombre_imagen

## Comandos redes

- $ docker network ls -> muestra la lista de redes
- $ docker network create nombre_red -> crea red, regresa id
- $ docker network rm nombre_red -> elimina red

## En capsular nuestro proyecto en un contenedor

- Si nuestro proyecto se corre con el comando $ node index.js (por ejemplo), este comando debemos tenerlo presente para la configuracion de este encapsulamiento
- Para la encapsulacion debemos crear un archivo llamado dockerfile donde estara la configuracion para encapsular nuestro proyecto
- Para crear primero una imagen de nuestro proyecto requerimos ejecutar en la carpeta del proeycto (donde este el archivo dockerfile): $ docker build -t nombre_imagen:version ruta -> esto crea una imagen con el nombre y la version especifica en la ruta especifica (Ej: $ docker build -t miapp:8 .)
- Al finalizar la construccion podemos ver nuestra imagen con el comando para visualizar todoas las imagenes y crear un contenedor con esta imagen dentro de alguna red especifica dependiendo del caso

## Docker compose

- Es una forma de escribir todos los parametros necesarios para crear nuestra red, contenedores e imagenes necesarios para nuestro proyecto
- Pasos para crear un Docker Container para nuestro proyecto:

1. Descargar la imagen
2. Crear una red
3. Crear contenedor: asignarle: puertos, nombre, variables de entorno y especificar: re e imagen

- En el archivo docker-compose.yml se describe como las variables en estos pasos requeridas se pueden encapsular en un solo archivo que lo crea todo.
- $ docker compose up -> crea y levanta todas las imagenes, contenedores y redes espesificadas en nuestro archivo de configuracion, este comando se queda escuchando todos los log de todos los contenedores creados
- $ docker compose down -> borra los contenedores y red creados en el archivo de configuracion

## Volumenes

- Al borrar un contenedor se borrar los datos guardados en ese contenedor, por ejemplo datos de base de datos, al bajar un contenedor se pierden los datos ahi existiendo, o al cambiar codigo en nuestro proyecto habria que recrear constantemente una imagen, para subir cambios, todo esto se soluciona con los volumenes

- Los volumenes guardan parte de nuestros contenedores en nuestro host, persistiendo datos asi se detenga la ejecucion del contenedor o se eliminen
- Volumen anonimo: indica la ruta que se desea montar, docker se encargaa de guardarlo donde el quiera, luego ese contenido no se puede referenciar para por ejemplo ser usado en otros contenedores
- Volumen de anfitrion: se deside que montar y donde
- Volumen nombrado: igual que el anonimo pero si se puede referenciar el volumen
- Los volumenes tambien se configuran en el archivo de configuracion compose

## Ambientes y hot reload

- para cada ambiente requerimos tener nuestro Docrfile y nuestro docker-compose
- $ docker compose -f docker-compose.dev.yml -> indica un archivo docker-compose customisado que no sea el docker-compose.yml

## Compartir proyecto

Siendo esto el desarrollo con docker se facilita mucho, puesto que es solo compartir el poyecto o los docker y con el comando $ docker compose, todos tienen las mismas dependecias, librerias, entre otras cosas

## Kubernetes

Un sistema de gestion de contenedores de codigo abierto
