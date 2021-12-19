import { pinJSONToIPFS } from "./pinata.js";
require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const contract = require("../components/contracts/WasteMans.json");
const contractAddress = "0x9700e8707CdC5209Aa45B439c352d218Fc41097B";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: `Youre connected using ${addressArray[0]}`,
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          status: `Youre connected using ${addressArray[0]}`,
          address: addressArray[0],
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

async function loadContract() {
  return new web3.eth.Contract(contract, contractAddress);
}

export const mintNFTs = async (numToMint = 1) => {
  console.log(contract, contractAddress)
  window.contract = await new web3.eth.Contract(contract.abi, contractAddress);

  var presalePrice = 80000000000000000;
  var totalCostNum = presalePrice * numToMint;
  console.log(totalCostNum, totalCostNum.toString(16))

  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    value: totalCostNum.toString(16), //'0x11c37937e080000', // 0.08 ether
    data: window.contract.methods
      .presaleBuy(numToMint)
      .encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};