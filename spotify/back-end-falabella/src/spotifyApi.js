import request from "request";
import dotenv from "dotenv";



dotenv.config();
let token
//variables de entorno
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

const clientId = SPOTIFY_CLIENT_ID; // CLIENT ID
const clientSecret = SPOTIFY_CLIENT_SECRET; // SECRET ID

//inicio de coneccion CCF para obtener acces_token
let authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
    "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
};

//post para obtener respuesta con  acces_token
request.post(authOptions, function (error, response, body) {
  if (!error && response.statusCode === 200) {
     token = body.access_token;
    
    console.log("token:", token);
  }
});


request.post(authOptions, function (error, response, body) {

  if (!error && response.statusCode === 200) {
    let options = {
      url: "https://api.spotify.com/v1/users/31lhwmjjkf6cebxgkbnr7mnmi5iu",
      headers: {
        Authorization: "Bearer " + token,
      },
      json: true,
    };
    request.get(options, function (error, response, body) {
      // console.log('body:',body);
    });
  }
});


//obtener album de spotify
const getAlbums = async (attribute) =>{
  return new Promise(async (resolve, reject) => {
    try {
      let items;
      await request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let options = {
              url: `https://api.spotify.com/v1/search?q=${attribute[1]}&type=album&market=Co&limit=1`,
              headers: {
                Authorization: "Bearer " + token,
              },
              json: true,
            };
            
            request.get(options, function (error, response, body) {
              items =  body.albums.items;
              resolve(items);
              
            });
          }
        });
        
      } catch (error) {
        app.log.error(`Error en: ${error}`);
        reject(error);
      }
    });
  }
  

export  {getAlbums} 