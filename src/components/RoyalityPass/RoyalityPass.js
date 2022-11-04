import React from "react";
import "./RoyalityPass.css";

import o1 from "./../../assets/1.mp4";
import o2 from "./../../assets/2.mp4";
import o3 from "./../../assets/3.mp4";

const passText = [
  {
    text: "This pass is perfect for someone who is just starting out and needs an NFT Smart Contract done. NFT Generation is not included in this pass.",
    price: 0.35,
    name: "Basic",
  },
  {
    text: "This is a perfect pass for someone who needs a little of everything. This pass gets your contract done, NFT generation up to 5k, staking & more!",
    price: 1.5,
    name: "Pro",
  },
  {
    text: "The Pro Pass is perfect for a creator who needs a custom solution. You need it all done and don’t want to worry. We have you covered!",
    price: 8.25,
    name: "Elite",
  },
];
const media = [o1, o2, o3];

const RoyalityPass = ({ type, royalPassContract }) => {
  const val = Number(type);

  const mintPass = async () => {};

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
            src={media[val - 1]}
            autoPlay
            loop
            muted
          ></video>
          <p className="sub-font">{passText[val - 1].text}</p>
          <p className="top-font">{passText[val - 1].price}</p>
          <button className="btn">
            {" "}
            {`Mint ${passText[val - 1].name} Pass`}{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoyalityPass;
