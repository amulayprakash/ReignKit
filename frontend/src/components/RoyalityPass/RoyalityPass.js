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

const RoyalityPass = ({ type, royalPassContract, account }) => {
  const val = Number(type);
  const [disable, setDisable] = useState(false);
  const [basicFee, setBasicFee] = useState(0);
  const [eliteFee, setEliteFee] = useState(0);
  const [proFee, setProFee] = useState(0);
  const [whichPass, setWhichPass] = useState(null);
  // 0 - basic Pass
  // 1 - elite Pass
  // 2 - pro Pass
  // 3 - no Pass

  useEffect(() => {
    setDisable(true);

    const run = async () => {
      let one = await royalPassContract.BasicFee();
      let two = await royalPassContract.EliteFee();
      let three = await royalPassContract.ProFee();

      let x = await royalPassContract.balanceOf(account, 0);
      let y = await royalPassContract.balanceOf(account, 1);
      let z = await royalPassContract.balanceOf(account, 2);

      x = parseInt(x);
      y = parseInt(y);
      z = parseInt(z);

      if (x > 0) {
        setWhichPass(0);
      } else if (y > 0) {
        setWhichPass(1);
      } else if (z > 0) {
        setWhichPass(2);
      } else {
        setWhichPass(3);
      }

      one = ethers.utils.formatEther(one);
      two = ethers.utils.formatEther(two);
      three = ethers.utils.formatEther(three);

      passText[0].price = one;
      setBasicFee(() => one);
      passText[1].price = two;
      setEliteFee(() => two);
      passText[2].price = three;
      setProFee(() => three);
    };
    try {
      if (account && royalPassContract) {
        run();
      }
    } catch (err) {
      console.log(err);
    }
    setDisable(false);
    return () => {
      setBasicFee(0);
      setDisable(false);
      setEliteFee(0);
      setProFee(0);
    };
  }, [royalPassContract]);

  const mintPass = async () => {
    setDisable(true);
    try {
      // basic pass mint
      if (type === 1) {
        notifyInfo("Your Transaction Has Started");
        const transaction = await royalPassContract.buyBasic(account, {
          value: ethers.utils.parseEther(basicFee),
        });
        const transactionReceipt = await transaction.wait();
        notifySuccess("Your NFT is Minted successfully");
        console.log(transactionReceipt);
      }

      // pro pass mint
      if (type === 2) {
        notifyInfo("Your Transaction Has Started");
        let send;
        if (whichPass === 0) {
          send = 0;
        } else if (whichPass === 2) {
          send = 1;
        } else if (whichPass === 3) {
          send = 2;
        }
        const transaction = await royalPassContract.buyPro(account, send, {
          value: ethers.utils.parseEther(proFee),
        });
        const transactionReceipt = await transaction.wait();
        notifySuccess("Your NFT is Minted successfully");
        console.log(transactionReceipt);
      }

      // elite pass mint
      if (type === 3) {
        notifyInfo("Your Transaction Has Started");
        const transaction = await royalPassContract.buyElite(account, {
          value: ethers.utils.parseEther(eliteFee),
        });
        const transactionReceipt = await transaction.wait();
        notifySuccess("Your NFT is Minted successfully");
        console.log(transactionReceipt);
      }
    } catch (err) {}
    setDisable(false);
  };

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
          <button disabled={disable} className="btn">
            {" "}
            {`Mint ${passText[val - 1].name} Pass`}{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoyalityPass;
