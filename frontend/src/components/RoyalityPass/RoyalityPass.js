import React, { useEffect, useState } from "react";
import "./RoyalityPass.css";
import { ToastContainer } from "react-toastify";
import MintOptions from "./../mintoptions";

import star from "./../../assets/icon-1.png";
import banner from "./../../assets/banner.webp";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useAccount } from "@web3modal/react";

import { notifySuccess, notifyInfo, notifyError } from "./../notification";
import { ethers } from "ethers";
import axios from "axios";
import { final } from "../../web3Components/config";

const RoyalityPass = ({ passContract }) => {
  const [disable, setDisable] = useState(false);
  const { account } = useAccount();
  const [nextIds, setNextIds] = useState([0, 0, 0]);
  const [passText, setPassText] = useState([
    {
      text: "This pass is perfect for someone who is just starting out and needs an NFT Smart Contract done. NFT Generation is not included in this pass.",
      price: 0,
      name: "Basic",
      sale: 4,
      charac: [
        "SMART CONTRACT CREATION",
        "LANDING PAGE FOR MINTING",
        "MINT BUTTON VIA SDK",
        "AIRDROPS",
        "LDR (LATER DATE REVEAL)",
        "REVENUE SPLIT",
        "PAUSABLE CONTRACTS",
        "DISCORD SUPPORT (5 DAYS)",
      ],
    },
    {
      text: "This is a perfect pass for someone who needs a little of everything. This pass gets your contract done, NFT generation up to 5k, staking & more!",
      price: 0,
      name: "Elite",
      sale: 2,
      charac: [
        "EVERYTHING IN THE BASIC PASS",
        "STAKING",
        "STAKE/UNSTAKE BUTTON VIA SDK",
        "SOUL BOUND NFTS",
        "DYNAMIC MINT PRICE",
        "NFT GENERATION (5K MAX)",
        "MULTIPLE CURRENCY MINTING",
        "DISCORD SUPPORT (15 DAYS)",
      ],
    },
    {
      text: "The Pro Pass is perfect for a creator who needs a custom solution. You need it all done and don’t want to worry. We have you covered!",
      price: 0,
      name: "Pro",
      sale: 0,
      charac: [
        "EVERYTHING IN THE BASIC & ELITE PASSES",
        "UNIQUE SMART CONTRACTS",
        "COMMUNITY TOKEN CREATION",
        "FULL STACK SOLUTIONS",
        "NFT GENERATION (10K MAX)",
        "DISCORD CREATION",
        "SOCIAL MEDIA ACCOUNT CREATION",
        "DISCORD SUPPORT (30 DAYS)",
      ],
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

        // next ids to be minted
        // basic
        const x = await passContract.basicId();
        // elite
        const y = await passContract.eliteId();
        // pro
        const z = await passContract.proId();
        setNextIds(() => {
          return [x, y, z];
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
      const receipt = await tx.wait();

      notifySuccess(`Your ${passText[t].name} Pass was minted successfully`);

      // update the database
      const data = await axios.post(`${final.url}/api/pass/newPass`, {
        t_id: nextIds[type],
        transactionHash: receipt.transactionHash,
      });

      window.location.assign("https://reignlabs.io/welcome/");
    } catch (err) {
      notifyError("Something went wrong!");
      console.log(err);
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
          <div className="tog">
            <div className="line"></div>
            <p className="join">JOIN R3IGNLABS</p>
          </div>
          <p className="top-font">R3IGNLABS founders pass!</p>
          <img className="star" src={star} alt="star icon" />
          <p className="sub-f">
            With the Founders Pass, you'll have access to our entire development
            team plus additional exclusive benefits. Please contact us before
            minting a pass. Once you mint a pass, we will show you how to
            activate it and get your project going ASAP!
          </p>
        </div>
        <div>
          <img className="banner" src={banner} alt="banner" />
        </div>

        <div className="m-auto w-[100%] min-[1600px]:max-w-[79vw] min-w-0">
          <div className="justify-center flex flex-wrap mt-28 mb-28">
            {passText.map((curr, i) => {
              return (
                <div key={i}>
                  <MintOptions
                    disable={disable}
                    mintPass={mintPass}
                    src={i}
                    description={curr.text}
                    title={curr.name}
                    features={curr.charac}
                    price={curr.price}
                    sale={curr.sale}
                  />
                </div>
              );
            })}
          </div>
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
