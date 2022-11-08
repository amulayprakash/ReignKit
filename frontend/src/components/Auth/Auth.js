import React from "react";
import { Web3Button, useAccount } from "@web3modal/react";

const Auth = () => {
  const account = useAccount();
  console.log(account);

  return (
    <>
      <div>
        <Web3Button></Web3Button>
      </div>
    </>
  );
};

export default Auth;
