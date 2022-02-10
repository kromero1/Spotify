import React from "react";
import "./FloatingModal.css";

const FloatingModal = ({ data }) => {
  console.log("data:", data);

  return (
    <>
      <div className="list">
        <ul>
          {data.map((song, i) => {
            return <li>{song.name}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default FloatingModal;
