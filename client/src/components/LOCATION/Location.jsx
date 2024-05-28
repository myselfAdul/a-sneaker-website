import React, { useState } from 'react';
import { GiConverseShoe } from 'react-icons/gi';

import './Location.scss';

const Location = () => {
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  const togglePopup1 = () => {
    setShowPopup1(!showPopup1);
  };

  const togglePopup2 = () => {
    setShowPopup2(!showPopup2);
  };

  return (
    <div className="location">
      <div className="shop-1" onClick={togglePopup1}>
        <GiConverseShoe size={'30px'} />
      </div>

      <div className="shop-2">
        <GiConverseShoe size={'30px'} onClick={togglePopup2} />
      </div>

      {showPopup1 && (
        <div className="popup1">
          <div className="popup-content1">
            <h3>SNEKHEAD 1</h3>
            <p>Address: Near Hatirjheel Lake, Dhaka</p>
            <p>Opening time: 9am -10pm</p>
            <p>Phone: 123-456-7890</p>
            <button onClick={togglePopup1}>Close</button>
          </div>
        </div>
      )}

      {showPopup2 && (
        <div className="popup2 popup1">
          <div className="popup-content1">
            <h3>SNEKHEAD 2</h3>
            <p>Address: Opposite of BRAC, Middle Badda</p>
            <p>Opening time: 9am -10pm</p>
            <p>Phone: 098-7654-321</p>
            <button onClick={togglePopup2}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Location;
