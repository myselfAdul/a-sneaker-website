import React from "react";
import Layout from "../components/Layout/Layout";
import Location from "../components/LOCATION/Location";

import "./Offices.scss";

const Offices = () => {
  return (
    <Layout>
      <div className="offices">
        <h1>Our Showroom's Location</h1>
        <Location />
      </div>
    </Layout>
  );
};

export default Offices;
