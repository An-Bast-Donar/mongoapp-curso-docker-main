# Imagen base
FROM node:18

# Carpeta donde se encapsula el codigo fuente de la app
# Ruta dentro del mismo contenedor
RUN mkdir -p /home/app

# Acede a los archivos del sistema operativo anfitrion y los copia en el la ruta del contenedor
COPY . /home/app

# Puerto del contenedor, a donde se pueden conectar otros contenedores u el usuario desde la maquina anfitrion
EXPOSE 3000

# Comando a ejecutar para que la app corra
# ¿Que comando es el usado para que la aplicacion corra en la maquina anfitrion normalmente?
# Las diferentes partes de ese comando, indicarlas en este arreglo
CMD ["node", "/home/app/index.js"]
