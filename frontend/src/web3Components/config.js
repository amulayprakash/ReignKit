import { ABI } from "./artifacts/PassABI";

// const network = { name: "homestead", chainId: 1 };
// const network = { name: "rinkeby", chainId: 4 };
// const network = { name: "goerli", chainId: 5 };
const network = { name: "mumbai", chainId: 80001 };

let passContractAddress;

if (network.name === "rinkeby") {
  passContractAddress = "";
} else if (network.name === "homestead") {
  passContractAddress = "";
} else if (network.name === "goerli") {
  passContractAddress = "0x52EeC0f4543Edd631378BBd9D22B74c537EaC31E";
} else if (network.name === "mumbai") {
  passContractAddress = "0x8d55B7E009A0E9c2645F33157CF521BA33cADebF";
}

const final = {
  ABI: ABI,
  passContractAddress,
  network: network,
};

export { final };
