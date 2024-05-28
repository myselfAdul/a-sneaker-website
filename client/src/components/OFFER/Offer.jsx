import React from "react";
import "./Offer.scss";

import hot_deal from "../assets/hot.png";

const Offer = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h2>Exclusive</h2>
        <h2>Deal for you</h2>
        <p>Only for Today⚡⚡</p>
        <button>Check it out now</button>
      </div>

      <div className="offers-right">
        <img src={hot_deal} alt="hot deal" height="510px" />
      </div>
    </div>
  );
};

export default Offer;
