import cors from "cors";
import express, { response } from "express";
import dotenv from "dotenv";
import {getAlbums, getSongsByAlbum} from "./src/spotifyApi.js";
dotenv.config();

//variables de entorno
const { LOCAL_WHITE_LIST, LOCAL_HOST_PORT } = process.env;
const port = LOCAL_HOST_PORT;
const whiteList = [LOCAL_WHITE_LIST];
const app = express();

//cors
app.use(cors({ origin: whiteList }));

//ajusta limite del json para comunicar al front
app.use(express.json({ limit: "50mb" }));

//borrar toda la base de datos
app.delete("/spotify/album", (req, res) => {
  album.deleteMany({}, (err) => {
    res.status(500).send(err);
  });
});

//mostrar base de datos
app.get("/spotify/database", (req, res) => {
  album.find({}, (err, elements) => {
    err ? res.status(500).send(err) : res.status(200).send(elements);
  });
});

app.get("/spotify/search", async (req, res) => {
  try {
  let attributes = req._parsedUrl.query.split("=");
    let album = await getAlbums(attributes[1]);
      attributes[0] === "album"
        ? res.status(200).send(album)
        : res.status(400).send(err);
  } catch (error) {
    console.log('error intentando obtener los albums:',error);
  }
});

app.get("/spotify/albums", async (req, res) => {
  try {
  let attributes = req._parsedUrl.query.split("=");
    let album = await getSongsByAlbum(attributes[1]);
      attributes[0] === "id"
        ? res.status(200).send(album)
        : res.status(400).send(err);
  } catch (error) {
    console.log('error intentando obtener el album:',error);
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
