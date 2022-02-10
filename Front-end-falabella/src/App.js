import React, { useState } from "react";
import axios from "axios";
import Card from "./components/cards/Card";
import FloatingModal from "./components/FloatingModal/FloatingModal";
import "./App.css";
import falabella from "./img/falabella.png";

function App() {
  //variables
  const [album, setAlbum] = useState();
  const [albumList, setAlbumList] = useState();
  const [songList, setSongList] = useState([]);

  //metodos
  //obtener album de spotify
  const getAlbum = () => {
    axios
      .get(`http://localhost:4000/spotify/search?album=${album}`)
      .then((res) => {
        setAlbumList(res.data);
      });
  };

  // Trae las canciones de un album por su ID
  const getSongsByAlbum = (idAlbum) => {
    axios
      .get(`http://localhost:4000/spotify/albums?id=${idAlbum}`)
      .then((res) => {
        setSongList(res.data.items)
        document.getElementsByClassName("modal")[0].style.display = "block";
      });
  };
  window.onclick = function(event) {
    if (event.target === document.getElementsByClassName("modal")[0]) {
      document.getElementsByClassName("modal")[0].style.display = "none";
    }
  }
  console.log('songList.length:',songList.length);
  return (
    <>
      <div className="search-container">
        <div style= {{marginTop : "2%"}}>
          <img src={falabella} width="300px" height="100%"></img>
          
        </div>
        <div className="search-section">
          <input
            className="search-input"
            type="text"
            onChange={(e) => setAlbum(e.target.value)}
          ></input>
          <button
            disabled={!album}
            className="search-button"
            onClick={() => getAlbum()}
            value={"Search"}
          >
            Buscar
          </button>
        </div>
      </div>

      <div className="list-container">
        {albumList ? (
          <Card data={albumList} onClick={(e) => getSongsByAlbum(e)}></Card>
        ) : (
          <h3 className="flotant-text">Busca tu álbum favorito</h3>
        )}
      </div>
      <div className="modal">
        {songList.length > 0?(
          <FloatingModal data ={songList}></FloatingModal>
          
        ):""
          }
      </div>
    </>
  );
}
export default App;
