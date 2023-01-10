/*
//Dependencia
Framework de nodejs
*/
import express, { urlencoded } from "express";
/*
//Dependencia
Libreria para conectarse con mongo
*/
import mongoose from "mongoose";

/*
Modelo de datos
*/
const Animal = mongoose.model(
  "Animal",
  new mongoose.Schema({
    tipo: String,
    estado: String,
  })
);

/*
Se crea la app
*/
const app = express();

/*
Conexion a la bd
- usuario, contraseña, maquina a la que se conecta con su puerto, base de datos, tipo de usuario
- la maquina a la que se conecta varia segun cual sea, si es nuestro host es local host si es otra es el nombre de esa otra
- en el caso de docker la maquina a la que se conecta es el contenedor en el que se encuentra la dependencia
- "mongodb://nico:password@localhost:27017/miapp?authSource=admin"
- "mongodb://nico:password@name_contenedor:27017/miapp?authSource=admin"
*/
mongoose.connect(
  "mongodb://nico:password@monguito:27017/miapp?authSource=admin"
);

/*
Endpoint raiz que regresa los animales en la bd
*/
app.get("/", async (_req, res) => {
  console.log("listando... chanchitos...");
  const animales = await Animal.find();
  return res.send(animales);
});

/*
Endpoint para crear un animal
*/
app.get("/crear", async (_req, res) => {
  console.log("creando...");
  await Animal.create({ tipo: "Chanchito", estado: "Feliz" });
  return res.send("ok");
});

/*
Se queda escuchando la aplicacion
*/
app.listen(3000, () => console.log("listening..."));
