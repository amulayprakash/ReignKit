import React from "react";
import logo from "./../../assets/REIGNLABS.png";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="nav1 x">
          <img className="nav-logo" src={logo} alt="logo" />
        </div>
        <div className="f2">
          <p>WEB3 YOU CAN TRUST!</p>
          <p>hello@reignlabs.io</p>
        </div>
        <div className="f3">
          <button className="btn">CONTACT R3IGNLABS</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
