import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        style={{ width: "150px", height: "150px" }}
      >
        <div className="pa3">
          <img style={{ paddingTop: "7px" }} src={brain} alt="logo"></img>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
