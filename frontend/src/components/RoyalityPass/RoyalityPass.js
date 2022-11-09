import React, { useEffect, useState } from "react";
import "./RoyalityPass.css";
import { ToastContainer } from "react-toastify";

import o1 from "./../../assets/1.mp4";
import o2 from "./../../assets/2.mp4";
import o3 from "./../../assets/3.mp4";
import star from "./../../assets/icon-1.png";
import banner from "./../../assets/banner.webp";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useAccount } from "@web3modal/react";

import { notifySuccess, notifyInfo, notifyError } from "./../notification";
import { ethers } from "ethers";

const media = [o1, o2, o3];

const RoyalityPass = ({ passContract }) => {
  const [disable, setDisable] = useState(false);
  const { account } = useAccount();
  const [passText, setPassText] = useState([
    {
      text: "This pass is perfect for someone who is just starting out and needs an NFT Smart Contract done. NFT Generation is not included in this pass.",
      price: 0,
      name: "Basic",
      sale: 4,
    },
    {
      text: "This is a perfect pass for someone who needs a little of everything. This pass gets your contract done, NFT generation up to 5k, staking & more!",
      price: 0,
      name: "Elite",
      sale: 2,
    },
    {
      text: "The Pro Pass is perfect for a creator who needs a custom solution. You need it all done and don’t want to worry. We have you covered!",
      price: 0,
      name: "Pro",
      sale: 0,
    },
  ]);

  useEffect(() => {
    setDisable(true);
    const run = async () => {
      try {
        const bp = await passContract.BasicFee();
        setPassText((curr) => {
          const arr = [...curr];
          arr[0].price = ethers.utils.formatEther(bp);
          return arr;
        });
        //---
        const ep = await passContract.EliteFee();
        setPassText((curr) => {
          const arr = [...curr];
          arr[1].price = ethers.utils.formatEther(ep);
          return arr;
        });
        //---
        const pp = await passContract.ProFee();
        setPassText((curr) => {
          const arr = [...curr];
          arr[2].price = ethers.utils.formatEther(pp);
          return arr;
        });
      } catch (err) {
        console.log(err);
      }
    };
    if (passContract) {
      run();
    }

    setDisable(false);
  }, [passContract]);

  const mintPass = async (t) => {
    setDisable(true);
    try {
      notifyInfo("The transaction has started");
      let type = Number(t);
      const option = {
        value: ethers.utils.parseEther(passText[type].price),
      };

      const tx = await passContract.buyTokenPass(account.address, type, option);
      tx.wait();

      notifySuccess(`Your ${passText[t].name} was minted successfully`);
      window.location.assign("https://reignlabs.io/welcome/");
    } catch (err) {
      notifyError("Something went wrong!");
    }
    setDisable(false);
  };

  return (
    <div className="bg-01">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        pauseOnHover
      />
      <Navbar />
      <div className="main-cont">
        <div className="font-cont">
          <div className="t">
            <div></div>
          </div>
          <p className="join">JOIN R3IGNLABS</p>
          <p className="top-font">R3IGNLABS founders pass!</p>
          <img className="star" src={star} alt="star icon" />
          <p style={{ width: "60vw" }} className="sub-font">
            With the Founders Pass, you'll have access to our entire development
            team plus additional exclusive benefits. Please contact us before
            minting a pass. Once you mint a pass, we will show you how to
            activate it and get your project going ASAP!
          </p>
        </div>
        <div>
          <img className="banner" src={banner} alt="banner" />
        </div>
        <div className="cards">
          {passText.map((curr, i) => {
            return (
              <div key={i} className="Royality-card">
                <video
                  className="pass-vid"
                  src={media[i]}
                  autoPlay
                  loop
                  muted
                ></video>
                <p className="sub-font xx">{passText[i].text}</p>
                <p className="top-font">{passText[i].price} ETH</p>
                <div className="sale-box">
                  <div>{`${passText[i].name} FOUNDERS PASS`}</div>
                  <div>{`${passText[i].sale}% SALES FEES`}</div>
                </div>
                <button
                  onClick={() => {
                    mintPass(i);
                  }}
                  disabled={disable}
                  className="btn"
                >
                  {" "}
                  {`Mint ${passText[i].name} Pass`}{" "}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="questions">
        <h1>have questions?</h1>
        <p>
          We want to answer them. Contact us today and let's see how we can help
          you get started!
        </p>
        <button className="btn">CONTACT R3IGNLABS</button>
      </div>
      <Footer />
    </div>
  );
};

export default RoyalityPass;
