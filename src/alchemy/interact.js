require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const contract = require("../components/contracts/MiamiAfterDark.json");
const contractAddress = "0x70F3F21a0405bAB234AF7Bcbf2B33237E126B594";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
const configs = require("../components/config/web3projects/config.json");

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: `Youre connected using ${addressArray[0]}`,
        address: addressArray[0],
        variant: 'success'
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
        variant: 'error'
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>You must install <a target="_blank" style={{color: "aliceblue"}} href={`https://metamask.io/download.html`}> Metamask</a>, a virtual Ethereum wallet, to use this website.</span>
      ),
      variant: 'error'
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
          variant: 'success'
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the connect wallet button.",
          variant: 'default'
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
        variant: 'error'
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>You must install <a target="_blank" style={{color: "aliceblue"}} href={`https://metamask.io/download.html`}> Metamask</a>, a virtual Ethereum wallet, to use this website.</span>
      ),
      variant: 'error'
    };
  }
};

async function loadContract() {
  // const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
  // var provider = alchemyKey;
  // var web3Provider = new Web3.providers.HttpProvider(provider);
  // const web3 = new Web3(web3Provider);
  // const contractAddr = '0x70F3F21a0405bAB234AF7Bcbf2B33237E126B594';

  // const contract = new web3.eth.Contract(MiamiAfterDark.abi, contractAddr);
  // return contract;
}

// returns {canMint, reason}
export async function verifyPossibleTransaction(selectedBackground, selectedProjectTicker, tokenId, walletAddress) {
  // call out contract to make sure backgrounds exist. Call proj to make sure they own it
  // let tokenContract = await IERC721.at(configs[selectedProjectTicker]);
  // let owner = await tokenContract.ownerOf(tokenId);
  // if (owner != walletAddress) {
  //   return {
  //     canMint: false,
  //     reason: "Looks like you do not own this token. Please make sure are connected using the right account"
  //   }
  // }
  // let numBackgroundsLeft = await loadContract().methods.getBackgroundsLeft().call();
  // if (numBackgroundsLeft - 1 <= 0) {
  //   return {
  //     canMint: false,
  //     reason: "Looks like the background you want is out of stock"
  //   }
  // }

  return {
    canMint: true
  }
}

export const mintNFT = async (selectedBackground) => {
  console.log(contract, contractAddress)
  window.contract = await new web3.eth.Contract(contract.abi, contractAddress);

  var presalePrice = 80000000000000000;
  var totalCostNum = presalePrice;
  console.log(totalCostNum, totalCostNum.toString(16))

  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    value: totalCostNum.toString(16), //'0x11c37937e080000', // 0.08 ether
    data: window.contract.methods
      .buy(selectedBackground)
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
        <span>Check out your transaction on Etherscan: <a href={"https://rinkeby.etherscan.io/tx/" + txHash}>{txHash}</a></span>,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};

export const refundMe = async (tokenId) => {
  window.contract = await new web3.eth.Contract(contract.abi, contractAddress);

  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .refundMe(tokenId)
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
        <span>Check out your transaction on Etherscan: <a href={"https://rinkeby.etherscan.io/tx/" + txHash}>{txHash}</a></span>,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};

export const getMyNFTs = async () => {
  window.contract = await new web3.eth.Contract(contract.abi, contractAddress);

};

export const addWalletListener = (setWallet, enqueueSnackbar) => {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0]);
        enqueueSnackbar("Changed wallet successfully", { variant: "success" })
      } else {
        setWallet("");
      }
    });
  }
}
