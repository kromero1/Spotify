import cors from "cors";
import express, { response } from "express";
import dotenv from "dotenv";
import {getAlbums} from "./src/spotifyApi.js";
dotenv.config();

//variables de entorno
const { LOCAL_WHITE_lLIST, LOCAL_HOST_PORT } = process.env;
const port = LOCAL_HOST_PORT;
const whiteList = [LOCAL_WHITE_lLIST];
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
app.get("/spotify/album", (req, res) => {
  album.find({}, (err, elements) => {
    err ? res.status(500).send(err) : res.status(200).send(elements);
  });
});

app.get("/spotify/search", async (req, res) => {
  let attributes = req._parsedUrl.query.split("=");
  let a = await getAlbums(attributes[1]);
console.log('a:',a);
  attributes[0] === "album"
    ? res.status(200).send(a)
    : res.status(400).send(err);
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
