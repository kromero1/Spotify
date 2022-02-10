import React from "react";
import "./Card.css";

const Card = ({ data, onClick }) => {
  console.log("data:", data);
  console.log("onClick:", onClick);
  return (
    <div className="card-section">
      {data.map((album, i) => {
        const maxCharacter = 20;
        const albumName =
          album.name.length > maxCharacter
            ? album.name.substring(0, maxCharacter) + "..."
            : album.name;
        return (
          <div id={i} className="card" onClick={() =>onClick(album.id)}>
            <img className="image-card" src={album.images[0].url}></img>
            <h3 style={{ fontFamily: "Arial", fontSize: "medium" }}>
              {albumName}
            </h3>
            <h3 style={{ fontFamily: "Arial", fontSize: "small" }}>
              {album?.artists[0].name}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
