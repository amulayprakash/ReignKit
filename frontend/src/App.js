import React, { useState, useEffect } from "react";
import RoyalityPass from "./components/RoyalityPass/RoyalityPass";
import MutateToken from "./components/Owner/MutateToken";
import Signature from "./components/Owner/Signature";
import { Route, Switch } from "react-router-dom";
import { final } from "./web3Components/config";
import "./App.css";
import { ethers } from "ethers";
import { useAccount, useNetwork, useSigner } from "@web3modal/react";

function App() {
  const { data } = useSigner();
  const { account } = useAccount();
  const x = useNetwork();

  const [passContract, setPassContract] = useState(null);

  useEffect(() => {
    const run = async () => {
      const contract = new ethers.Contract(
        final.passContractAddress,
        final.ABI,
        data
      );
      setPassContract(() => contract);
      console.log(contract);
    };
    if (data) {
      run();
    }
  }, [data]);
  return (
    <Switch>
      <Route
        exact
        path="/buypass"
        component={() => <RoyalityPass passContract={passContract} />}
      />
      <Route
        exact
        path="/owner/mutatetoken"
        component={() => <MutateToken />}
      />
      <Route
        exact
        path="/owner/sign"
        component={() => (
          <Signature
            passContract={passContract}
            chain_id={x?.network?.chain?.id}
            address={account?.address}
            signer={data}
          />
        )}
      />
    </Switch>
  );
}

export default App;
