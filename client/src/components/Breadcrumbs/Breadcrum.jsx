import React from 'react';
import './Breadcrum.scss';
import arrow_icon from '../assets/breadcrum_arrow.png';

const Breadcrum = ({ category, productName }) => {
  return (
    <div className='breadcrum'>
      HOME <img src={arrow_icon} alt='' /> 
      {category} <img src={arrow_icon} alt='' /> {productName}
    </div>
  );
};

export default Breadcrum;
