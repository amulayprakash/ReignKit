import React, { useEffect, useState } from "react";
import "./RoyalityPass.css";

import o1 from "./../../assets/1.mp4";
import o2 from "./../../assets/2.mp4";
import o3 from "./../../assets/3.mp4";
import { notifySuccess, notifyInfo, notifyError } from "./../notification";
import { ethers } from "ethers";

const passText = [
  {
    text: "This pass is perfect for someone who is just starting out and needs an NFT Smart Contract done. NFT Generation is not included in this pass.",
    price: 0,
    name: "Basic",
  },
  {
    text: "This is a perfect pass for someone who needs a little of everything. This pass gets your contract done, NFT generation up to 5k, staking & more!",
    price: 0,
    name: "Elite",
  },
  {
    text: "The Pro Pass is perfect for a creator who needs a custom solution. You need it all done and don’t want to worry. We have you covered!",
    price: 0,
    name: "Pro",
  },
];
const media = [o1, o2, o3];

const RoyalityPass = ({ account }) => {
  const [disable, setDisable] = useState(false);

  return (
    <div className="bg-01">
      <div className="main-cont">
        <div className="font-cont">
          <p className="top-font">R3IGNLABS founders pass!</p>
          <p className="sub-font">
            With the Founders Pass, you'll have access to our entire development
            team plus additional exclusive benefits.
          </p>
        </div>
        <div className="Royality-card">
          <video
            className="pass-vid"
            src={media[0]}
            autoPlay
            loop
            muted
          ></video>
          <p className="sub-font">{passText[0].text}</p>
          <p className="top-font">{passText[0].price}</p>
          <button disabled={disable} className="btn">
            {" "}
            {`Mint ${passText[0].name} Pass`}{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoyalityPass;
