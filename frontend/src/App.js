import React, { useState, useEffect } from "react";
import RoyalityPass from "./components/RoyalityPass/RoyalityPass";
import { Route, Switch } from "react-router-dom";
import { useSigner } from "@web3modal/react";
import { final } from "./web3Components/config";
import "./App.css";
import { ethers } from "ethers";

function App() {
  const { data } = useSigner();
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
    </Switch>
  );
}

export default App;
