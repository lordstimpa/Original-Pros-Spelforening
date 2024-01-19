import React from "react";
import Silhouette from "../../assets/silhouette.png";

const Board = () => {
  return (
    <>
      <div className="Title">
        <h1>OM ORG</h1>
      </div>

      <div className="Info">
        <div>
          <h2>Styrelse för Original Pros Spelförening</h2>
        </div>
        <div className="CardContainer">
          <div className="Card">
            <img src={Silhouette}></img>
            <h2>Ordförande</h2>
            <p>Martin Norgren</p>
            <p>example.mail@hotmail.com</p>
          </div>
          <div className="Card">
            <img src={Silhouette}></img>
            <h2>Vice Ordförande</h2>
            <p>Rasmus Asplund</p>
            <p>orgrasmus@hotmail.com</p>
          </div>
          <div className="Card">
            <img src={Silhouette}></img>
            <h2>Kassör</h2>
            <p>Samuel Bergström</p>
            <p>example.mail@hotmail.com</p>
          </div>
          <div className="Card">
            <img src={Silhouette}></img>
            <h2>Sekreterare</h2>
            <p>Steven Dalfall</p>
            <p>steven.dalfall@live.se</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Board;
