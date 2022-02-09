import mongoose from "mongoose";
import album from "./src/album.js";
import dotenv from "dotenv";
dotenv.config();
//variables de entorno
const { MONGODB_URI } = process.env;
const mongoURL = MONGODB_URI;

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
const pushAlbums = (items) => {
  app.post("", (req, res) => {
    let mongoRecords = [];

    //guarda los atributos
    items.forEach((album) => {
      mongoRecords.push({
        album_type: album.album_type,
        artists: album.artists,
        external_urls: album.external_urls,
        spotify: album.spotify,
        href: album.href,
        id: album.id,
        images: album.images,
        name: album.name,
        release_date: album.release_date,
        release_date_precision: album.release_date_precision,
        total_tracks: album.total_tracks,
        type: album.type,
        uri: album.uri,
      });
    });
    // crea la biblioteca
    album.create(mongoRecords, (err, records) => {
      if (err) {
        res.sendStatus(500).send(err);
      } else {
        res.status(200).send(records);
      }
    });
  });
};

