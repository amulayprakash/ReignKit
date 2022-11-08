import React, { useState } from "react";
import logo from "./../../assets/REIGNLABS.png";
import { useAccount } from "@web3modal/react";
import { useConnectModal } from "@web3modal/react";
import useWindowDimensions from "./../utils/getDimension";

import "./Navbar.css";
const Navbar = () => {
  const { account } = useAccount();
  const { open } = useConnectModal();
  const { width } = useWindowDimensions();
  const [change, setChange] = useState(false);

  const getListElement = () => {
    if (width > 800) {
      return (
        <div className="nav2">
          <a href="https://reignlabs.io/">Home</a>
          <a href="https://reignlabs.io/founder/">Founders Pass</a>
          <a href="https://reignlabs.io/about-us/">About Us</a>
          <a href="https://reignlabs.io/contact-us/">Contact Us</a>
          <a href="https://reignlabs.io/blog/">Blog</a>
        </div>
      );
    } else {
      return (
        <>
          <div className="nav-mob">
            <div
              className={`${change ? "change" : ""} container`}
              onClick={() => {
                setChange((curr) => !curr);
              }}
            >
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
          </div>
        </>
      );
    }
  };
  return (
    <>
      <div className="nav">
        <div className="nav1">
          <img className="nav-logo" src={logo} alt="logo" />
        </div>
        {getListElement()}
        <div className="nav3">
          {account.isConnected ? (
            <p>{`${account.address.slice(0, 5)}...${account.address.slice(
              -3
            )}`}</p>
          ) : (
            <p onClick={() => open()}>Connect</p>
          )}
        </div>
      </div>
      {change ? (
        <>
          <div className="nav-mob-2">
            <a href="https://reignlabs.io/">Home</a>
            <a href="https://reignlabs.io/founder/">Founders Pass</a>
            <a href="https://reignlabs.io/about-us/">About Us</a>
            <a href="https://reignlabs.io/contact-us/">Contact Us</a>
            <a href="https://reignlabs.io/blog/">Blog</a>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
