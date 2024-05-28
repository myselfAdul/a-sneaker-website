import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import './Spinner.scss'

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(2); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => prevValue - 1);
    }, 1000); 

    const timeout = setTimeout(() => {
      navigate(`/${path}`, {
        state: location.pathname,
      });
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate, location.pathname, path]);

  return (
    <div className="spinner" style={{ height: "100vh", textAlign: "center" }}>
      <h1>Redirecting within {count} second{count !== 1 ? "s" : ""}</h1>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
