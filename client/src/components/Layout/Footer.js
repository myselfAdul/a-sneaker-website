import React from "react";
import logo from "../assets/logo1.png";
import instagram_icon from "../assets/instagram_icon.png";
import whatsapp_icon from "../assets/whatsapp_icon.png";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={logo} alt="" height="170px" />
        <p>SNEKHEAD</p>
      </div>
      <ul className="footer-links">
        <Link className="link" to="/company">
          <li>Company</li>
        </Link>
        <Link className="link" to="/products">
          <li>Products</li>
        </Link>
        <Link className="link" to="/offices">
          <li>Offices</li>
        </Link>
        <Link className="link" to="/about">
          <li>About</li>
        </Link>
        <Link className="link" to="/contact">
          <li>Contact</li>
        </Link>
      </ul>
      <div className="social-icons">
        <div className="footer-icon-container">
          <div className="footer-icon-container">
            <img src={instagram_icon} alt="insta" />
          </div>

          <div className="footer-icon-container">
            <img src={whatsapp_icon} alt="wapp" />
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
