import mongoose from "mongoose";
import dotenv from "dotenv";
import album from "./album.js"
dotenv.config();
//variables de entorno

const { MONGODB_URI } = process.env;
const mongoURL = MONGODB_URI;
//variables de mongo

const Schema = mongoose.Schema;
const db = mongoose.connection;
//CONECCION A BASE DE DATOS MONGO
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((DB) => console.log("database is connected"))
  .catch((err) => console.log(err));

//insertar en base de datos

function saveData(attribute) {
  mongoose.create(attribute, (err, records) => {
    if (err) {
      res.sendStatus(500).send(err);
    } else {
      res.status(200).send(records);
    }
  });

  mongoose.find({},(err, elements) => {
    err ? res.status(500).send(err) : res.status(200).send(elements);
  })
}

export default saveData;
