import React, { useEffect } from "react";
import {
  Web3Button,
  useAccount,
  // useNetwork,
  // useSigner,
} from "@web3modal/react";
import { chains } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
// import { ethers } from "ethers";

const config = {
  projectId: "6ea112bb251f26bee4cf7a5764cd3c63",
  theme: "dark",
  accentColor: "default",
  ethereum: {
    appName: "web3Modal",
    autoConnect: true,
    chains: [chains.mainnet, chains.polygon, chains.fantom],
  },
};

const Auth = () => {
  const account = useAccount();
  console.log(account);

  return (
    <>
      <Web3Modal config={config} />
      <div>
        <Web3Button></Web3Button>
      </div>
    </>
  );
};

export default Auth;
