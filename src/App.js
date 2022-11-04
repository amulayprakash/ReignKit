import React, { useState, useEffect } from "react";
import RoyalityPass from "./components/RoyalityPass/RoyalityPass";
import { Route, Switch } from "react-router-dom";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "./web3Components/providerOptions";
import { toHex } from "./web3Components/utils";
import { final } from "./web3Components/config";

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});
const App = () => {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [error, setError] = useState("");
  const [, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [royalPassContract, setRoyalPassContract] = useState();

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();

      const signer = library.getSigner();
      const contract = new ethers.Contract(
        final.passContractAddress,
        final.ABI,
        signer
      );

      setRoyalPassContract(contract);
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }],
      });
    } catch (switchError) {
      setError(switchError);
      console.log(switchError);
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  return (
    <Switch>
      <Route
        exact
        path="/1"
        component={() => (
          <RoyalityPass royalPassContract={royalPassContract} type={1} />
        )}
      />
      <Route
        exact
        path="/2"
        component={() => (
          <RoyalityPass royalPassContract={royalPassContract} type={2} />
        )}
      />
      <Route
        exact
        path="/3"
        component={() => (
          <RoyalityPass royalPassContract={royalPassContract} type={3} />
        )}
      />
    </Switch>
  );
};

export default App;
