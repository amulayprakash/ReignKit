import { ABI } from "./artifacts/PassABI";

// const network = { name: "homestead", chainId: 1 };
// const network = { name: "rinkeby", chainId: 4 };
const network = { name: "goerli", chainId: 5 };

let passContractAddress;

if (network.name === "rinkeby") {
  passContractAddress = "";
} else if (network.name === "homestead") {
  passContractAddress = "";
} else if (network.name === "goerli") {
  passContractAddress = "0x96B7c3B7E5D80252FE76122824f525E7AA906A17";
}

const final = {
  ABI: ABI,
  passContractAddress,
  network: network,
};

export { final };
