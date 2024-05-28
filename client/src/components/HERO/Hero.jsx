import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.scss";
import arrow_icon from "../assets/arrow.png";
import nike from "../assets/nike_logo.png";

const Hero = () => {
  const [animationPaused, setAnimationPaused] = useState(false);

  const toggleAnimation = () => {
    setAnimationPaused(!animationPaused);
  };

  return (
    <div className="hero">
      <div className="hero-left">
        <h2>Step into Style . . .</h2>
        <div>
          <div className="new-logo">
            <p>Every</p>
            <img src={nike} alt="wave" />
          </div>
          <p>Stride Tells</p>
          <p>A story</p>
        </div>
        <div className="latest-btn">
          <Link to="/exclusive">
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="arrow" />
          </Link>
        </div>
      </div>
      <div
        className={`hero-rotate ${animationPaused ? "paused" : ""}`}
        onClick={toggleAnimation}
      ></div>
    </div>
  );
};

export default Hero;
