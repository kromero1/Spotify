import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const url = "http://localhost:4000/spotify/album";
  const [album, setAlbum] = useState();

  
const getAlbum  = () => {
  
  axios.get(url).then(res=>{
    setAlbum(res.data)
    console.log('res.data:',res.data);
  })
}
const spotifyURL = `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.SPOTIFY_CLIENT_SECRET}&scope=user-read-private`
     
const handleLogin = () =>{
        window.location.replace(spotifyURL)
      }
      
    return(
      <div className = "home-container">
        <div className="home-left">
        <h3>Bienvenido de nuevo</h3>
        <h6>Bienvenido de nuevo</h6>
        </div>

        <button className="hola-mundo" onClick={handleLogin}>
        <input className = "home-input" type="text">

        </input>
        
        Search
        </button>
      </div>
    )
}
export default App;
